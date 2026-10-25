#!/usr/bin/env node
// fondaine asset fetcher — scanned, legally usable assets for the engine, written to assets/ + manifest.json.
//
//   node tools/fetch-assets.mjs                      default CC0 set from Poly Haven (trees, shrubs, rocks,
//                                                    ground/concrete/wood scans) — no account needed
//   node tools/fetch-assets.mjs polyhaven <id> --slot <slot> [--type model|texture] [--res 2k|4k] [--tris 60000]
//   node tools/fetch-assets.mjs sketchfab search "<query>" [--license by|cc0] [--max 24]
//   node tools/fetch-assets.mjs sketchfab get <uid> --slot weapons.pistol      (needs SKETCHFAB_TOKEN)
//   node tools/fetch-assets.mjs weapons [--pistol <uid>] [--carbine <uid>] [--only pistol|carbine] [--list]
//                                                    curated CC0/CC-BY weapon set → slots weapons.carbine, weapons.pistol
//                                                    (without SKETCHFAB_TOKEN: prints what it would fetch and exits 0)
//   node tools/fetch-assets.mjs convert <file.fbx|.obj> --slot arms             (FBX → glTF via fbx2gltf)
//   node tools/fetch-assets.mjs local <file.gltf|.glb> --slot <slot> [--tris N] (import your own file)
//   node tools/fetch-assets.mjs credits                                         (assets/CREDITS.md)
//
// Licences: Poly Haven is CC0. Sketchfab downloads are restricted to CC0 / CC-BY (attribution recorded in
// the manifest and CREDITS.md) unless you pass --allow-license <slug>. Mixamo characters are free to use in
// games under Adobe's terms but may not be redistributed as raw files — keep them out of public repos.
//
// Film-quality scans (Poly Haven trees are 0.3–17 M polygons) are decimated here with meshoptimizer to a
// game budget (--tris, default 60 000) before the browser ever sees them; the engine builds further LODs.

import { mkdirSync, writeFileSync, readFileSync, existsSync, copyFileSync, statSync } from 'node:fs';
import { dirname, join, resolve, basename, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(root, 'assets');
const MANIFEST = join(ASSETS, 'manifest.json');
const UA = { 'User-Agent': 'fondaine-asset-fetcher/1.0 (+https://github.com/)' };

// ------------------------------------------------------------------------------------------- defaults
// Poly Haven CC0 picks for an outdoor range. Slots are what the engine looks for.
const DEFAULT_SET = {
  textures: [
    ['range.concrete', 'brushed_concrete_03', 2.5],
    ['range.gravel', 'gravel_ground_01', 2],
    ['range.dirt', 'dirt_aerial_03', 4],
    ['range.berm', 'aerial_ground_rock', 5],
    ['range.meadow', 'aerial_grass_rock', 4],
    ['range.wood', 'rough_wood', 1.2],
    ['range.lumber', 'brown_planks_03', 1.5],
    ['nature.bark', 'pine_bark', 1.5],
  ],
  models: [
    // [slot, id, triangle budget]
    ['tree.fir', 'fir_tree_01', 70000],
    ['tree.pine', 'pine_tree_01', 70000],
    ['tree.fir_sapling', 'fir_sapling', 25000],
    ['tree.pine_sapling', 'pine_sapling_small', 25000],
    ['shrub.01', 'shrub_01', 12000],
    ['shrub.02', 'shrub_02', 12000],
    ['shrub.03', 'shrub_03', 12000],
    ['grass.clump', 'grass_medium_02', 6000],
    ['deadwood.trunk', 'dead_tree_trunk', 20000],
    ['deadwood.stump', 'tree_stump_01', 12000],
    ['rock.boulder', 'boulder_01', 20000],
    ['props.barrel', 'Barrel_01', 20000],
  ],
};

// ------------------------------------------------------------------------------------------- helpers
const args = process.argv.slice(2);
const flag = (name, def) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : def; };
const positional = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')));
const log = (...m) => console.log('[fetch-assets]', ...m);

function loadManifest() {
  if (existsSync(MANIFEST)) return { version: 1, textures: {}, models: {}, ...JSON.parse(readFileSync(MANIFEST, 'utf8')) };
  return { version: 1, textures: {}, models: {} };
}
function saveManifest(m) { mkdirSync(ASSETS, { recursive: true }); writeFileSync(MANIFEST, JSON.stringify(m, null, 2)); writeCredits(m); }

async function getJSON(url, headers = {}) {
  const r = await fetch(url, { headers: { ...UA, ...headers } });
  if (!r.ok) throw new Error(`${url}: ${r.status} ${r.statusText} ${await r.text().catch(() => '')}`.slice(0, 400));
  return r.json();
}
async function download(url, dest, headers = {}) {
  if (existsSync(dest) && statSync(dest).size > 0) return dest;
  mkdirSync(dirname(dest), { recursive: true });
  const r = await fetch(url, { headers: { ...UA, ...headers } });
  if (!r.ok) throw new Error(`${url}: ${r.status} ${r.statusText}`);
  const buf = Buffer.from(await r.arrayBuffer());
  writeFileSync(dest, buf);
  log(`  ↓ ${relative(root, dest)} (${(buf.length / 1048576).toFixed(1)} MB)`);
  return dest;
}

// ------------------------------------------------------------------------------------------- zip (store/deflate)
function unzip(buf, outDir) {
  // find end of central directory
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw new Error('not a zip file');
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const files = [];
  for (let n = 0; n < count; n++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('bad zip central directory');
    const method = buf.readUInt16LE(p + 10), csize = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28), extraLen = buf.readUInt16LE(p + 30), commentLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.slice(p + 46, p + 46 + nameLen).toString('utf8');
    p += 46 + nameLen + extraLen + commentLen;
    if (name.endsWith('/')) continue;
    const lNameLen = buf.readUInt16LE(local + 26), lExtraLen = buf.readUInt16LE(local + 28);
    const data = buf.slice(local + 30 + lNameLen + lExtraLen, local + 30 + lNameLen + lExtraLen + csize);
    const out = method === 0 ? data : method === 8 ? inflateRawSync(data) : null;
    if (!out) { log(`  skipping ${name} (zip method ${method})`); continue; }
    const safe = name.replace(/\\/g, '/').split('/').filter((s) => s && s !== '..').join('/');
    const dest = join(outDir, safe);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, out);
    files.push(safe);
  }
  return files;
}

// ------------------------------------------------------------------------------------------- minimal glTF I/O
const COMP = { 5120: [Int8Array, 1], 5121: [Uint8Array, 1], 5122: [Int16Array, 2], 5123: [Uint16Array, 2], 5125: [Uint32Array, 4], 5126: [Float32Array, 4] };
const NCOMP = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };

function readGLTF(file) {
  const dir = dirname(file);
  let json, bin = null;
  const raw = readFileSync(file);
  if (raw.readUInt32LE(0) === 0x46546c67) {
    let off = 12;
    while (off < raw.length) {
      const len = raw.readUInt32LE(off), type = raw.readUInt32LE(off + 4);
      const chunk = raw.slice(off + 8, off + 8 + len);
      if (type === 0x4e4f534a) json = JSON.parse(chunk.toString('utf8'));
      else if (type === 0x004e4942) bin = chunk;
      off += 8 + len;
    }
  } else json = JSON.parse(raw.toString('utf8'));
  if ((json.extensionsRequired ?? []).some((e) => /draco|meshopt|basisu/i.test(e))) throw new Error(`${basename(file)} is compressed (${json.extensionsRequired.join(', ')}); export it uncompressed`);
  const buffers = (json.buffers ?? []).map((b, i) => (b.uri === undefined ? bin : b.uri.startsWith('data:') ? Buffer.from(b.uri.split(',')[1], 'base64') : readFileSync(join(dir, decodeURIComponent(b.uri)))));
  const accessor = (i) => {
    const a = json.accessors[i];
    const [T, size] = COMP[a.componentType];
    const n = NCOMP[a.type];
    const out = new Float64Array(a.count * n);
    if (a.bufferView === undefined) return { data: out, n };
    const bv = json.bufferViews[a.bufferView];
    const buf = buffers[bv.buffer];
    const stride = bv.byteStride || size * n;
    const base = (bv.byteOffset ?? 0) + (a.byteOffset ?? 0);
    const dv = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    const rd = { 5120: (o) => dv.getInt8(o), 5121: (o) => dv.getUint8(o), 5122: (o) => dv.getInt16(o, true), 5123: (o) => dv.getUint16(o, true), 5125: (o) => dv.getUint32(o, true), 5126: (o) => dv.getFloat32(o, true) }[a.componentType];
    const norm = a.normalized ? { 5120: 127, 5121: 255, 5122: 32767, 5123: 65535 }[a.componentType] : 0;
    for (let k = 0; k < a.count; k++) for (let c = 0; c < n; c++) {
      let v = rd(base + k * stride + c * size);
      if (norm) v = Math.max(v / norm, -1);
      out[k * n + c] = v;
    }
    void T;
    return { data: out, n };
  };
  return { json, accessor, dir };
}

function nodeMatrix(n) {
  if (n.matrix) return n.matrix;
  const [x, y, z, w] = n.rotation ?? [0, 0, 0, 1], [sx, sy, sz] = n.scale ?? [1, 1, 1], [tx, ty, tz] = n.translation ?? [0, 0, 0];
  const x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
  return [(1 - (yy + zz)) * sx, (xy + wz) * sx, (xz - wy) * sx, 0, (xy - wz) * sy, (1 - (xx + zz)) * sy, (yz + wx) * sy, 0, (xz + wy) * sz, (yz - wx) * sz, (1 - (xx + yy)) * sz, 0, tx, ty, tz, 1];
}
const mul = (a, b) => { const o = new Array(16); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3]; return o; };

/**
 * Bake every mesh primitive into world space → [{material, name, pos, nrm, uv, idx}], merged by material (props,
 * vegetation) or kept one primitive per node (`perNode`: weapons — the slide, magazine, trigger … must stay separate
 * meshes with their node names so the engine can animate them).
 */
function flatten(g, perNode = false) {
  const { json, accessor } = g;
  const byMat = new Map();
  const visit = (ni, parent) => {
    const node = json.nodes[ni];
    const M = mul(parent, nodeMatrix(node));
    if (node.mesh !== undefined && node.skin === undefined) {
      for (const p of json.meshes[node.mesh].primitives) {
        if ((p.mode ?? 4) !== 4) continue;
        const P = accessor(p.attributes.POSITION);
        const N = p.attributes.NORMAL !== undefined ? accessor(p.attributes.NORMAL) : null;
        const U = p.attributes.TEXCOORD_0 !== undefined ? accessor(p.attributes.TEXCOORD_0) : null;
        const I = p.indices !== undefined ? accessor(p.indices).data : Float64Array.from({ length: P.data.length / 3 }, (_, i) => i);
        const key = perNode ? `${ni}|${p.material ?? -1}|${byMat.size}` : (p.material ?? -1);
        const t = byMat.get(key) ?? { material: p.material ?? -1, name: node.name ?? json.meshes[node.mesh].name, pos: [], nrm: [], uv: [], idx: [] };
        const base = t.pos.length / 3, nv = P.data.length / 3;
        const nm = [M[0], M[1], M[2], M[4], M[5], M[6], M[8], M[9], M[10]];
        for (let v = 0; v < nv; v++) {
          const x = P.data[v * 3], y = P.data[v * 3 + 1], z = P.data[v * 3 + 2];
          t.pos.push(M[0] * x + M[4] * y + M[8] * z + M[12], M[1] * x + M[5] * y + M[9] * z + M[13], M[2] * x + M[6] * y + M[10] * z + M[14]);
          if (N) {
            const a = N.data[v * 3], b = N.data[v * 3 + 1], c = N.data[v * 3 + 2];
            let nx = nm[0] * a + nm[3] * b + nm[6] * c, ny = nm[1] * a + nm[4] * b + nm[7] * c, nz = nm[2] * a + nm[5] * b + nm[8] * c;
            const l = Math.hypot(nx, ny, nz) || 1; t.nrm.push(nx / l, ny / l, nz / l);
          } else t.nrm.push(0, 1, 0);
          if (U) t.uv.push(U.data[v * 2], U.data[v * 2 + 1]); else t.uv.push(0, 0);
        }
        for (let k = 0; k < I.length; k++) t.idx.push(I[k] + base);
        byMat.set(key, t);
      }
    }
    for (const c of node.children ?? []) visit(c, M);
  };
  const I4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  const scene = json.scenes?.[json.scene ?? 0];
  for (const ni of scene ? scene.nodes : json.nodes.map((_, i) => i)) visit(ni, I4);
  return [...byMat.values()].map((t) => ({ material: t.material, name: t.name, pos: Float32Array.from(t.pos), nrm: Float32Array.from(t.nrm), uv: Float32Array.from(t.uv), idx: Uint32Array.from(t.idx) }));
}

async function decimate(prims, budget) {
  const total = prims.reduce((a, p) => a + p.idx.length / 3, 0);
  if (total <= budget) return prims;
  const { MeshoptSimplifier } = await import('meshoptimizer/simplifier');
  await MeshoptSimplifier.ready;
  log(`  decimating ${total.toLocaleString()} → ${budget.toLocaleString()} triangles`);
  return prims.map((p) => {
    const tris = p.idx.length / 3;
    const target = Math.max(1, Math.floor((budget * tris) / total)) * 3;
    const nv = p.pos.length / 3;
    const attrs = new Float32Array(nv * 5);
    for (let i = 0; i < nv; i++) { attrs.set(p.nrm.subarray(i * 3, i * 3 + 3), i * 5); attrs[i * 5 + 3] = p.uv[i * 2]; attrs[i * 5 + 4] = p.uv[i * 2 + 1]; }
    let [idx] = MeshoptSimplifier.simplifyWithAttributes(p.idx, p.pos, 3, attrs, 5, [0.4, 0.4, 0.4, 0.8, 0.8], null, target, 0.05, ['Prune']);
    if (idx.length > target * 2) [idx] = MeshoptSimplifier.simplifySloppy(p.idx, p.pos, 3, null, target, 0.1);
    // compact: drop unreferenced vertices
    const remap = new Int32Array(nv).fill(-1);
    let k = 0;
    for (const i of idx) if (remap[i] < 0) remap[i] = k++;
    const pos = new Float32Array(k * 3), nrm = new Float32Array(k * 3), uv = new Float32Array(k * 2);
    for (let i = 0; i < nv; i++) if (remap[i] >= 0) { const j = remap[i]; pos.set(p.pos.subarray(i * 3, i * 3 + 3), j * 3); nrm.set(p.nrm.subarray(i * 3, i * 3 + 3), j * 3); uv.set(p.uv.subarray(i * 2, i * 2 + 2), j * 2); }
    return { material: p.material, name: p.name, pos, nrm, uv, idx: Uint32Array.from(idx, (i) => remap[i]) };
  });
}

/** Write a .gltf + .bin next to the source textures, keeping the source materials/textures/samplers. */
function writeGLTF(src, prims, outFile, scale = 1) {
  const J = src.json;
  const chunks = [];
  let off = 0;
  const views = [], accessors = [];
  const add = (arr, target, type, comp, minmax) => {
    const b = Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength);
    const pad = (4 - (b.length % 4)) % 4;
    chunks.push(b, Buffer.alloc(pad));
    views.push({ buffer: 0, byteOffset: off, byteLength: b.length, target });
    off += b.length + pad;
    const a = { bufferView: views.length - 1, componentType: comp, count: arr.length / NCOMP[type], type };
    if (minmax) { const n = NCOMP[type], mn = Array(n).fill(Infinity), mx = Array(n).fill(-Infinity); for (let i = 0; i < arr.length; i++) { const c = i % n; mn[c] = Math.min(mn[c], arr[i]); mx[c] = Math.max(mx[c], arr[i]); } a.min = mn; a.max = mx; }
    accessors.push(a);
    return accessors.length - 1;
  };
  const meshes = [], nodes = [];
  for (const p of prims) {
    if (scale !== 1) for (let i = 0; i < p.pos.length; i++) p.pos[i] *= scale;
    const prim = { attributes: { POSITION: add(p.pos, 34962, 'VEC3', 5126, true), NORMAL: add(p.nrm, 34962, 'VEC3', 5126), TEXCOORD_0: add(p.uv, 34962, 'VEC2', 5126) }, indices: add(p.idx, 34963, 'SCALAR', 5125) };
    if (p.material >= 0) prim.material = p.material;
    const name = p.name ?? J.materials?.[p.material]?.name ?? `part${nodes.length}`;
    meshes.push({ name, primitives: [prim] });
    nodes.push({ name, mesh: meshes.length - 1 });
  }
  const binName = basename(outFile, extname(outFile)) + '.bin';
  const out = {
    asset: { version: '2.0', generator: 'fondaine fetch-assets (decimated)' },
    scene: 0, scenes: [{ nodes: nodes.map((_, i) => i) }], nodes, meshes,
    materials: J.materials ?? [], textures: J.textures ?? [], images: (J.images ?? []).map((im) => (im.uri ? { ...im, uri: relative(dirname(outFile), join(src.dir, decodeURIComponent(im.uri))).replace(/\\/g, '/') } : im)),
    samplers: J.samplers ?? [], accessors, bufferViews: views, buffers: [{ uri: binName, byteLength: off }],
    extensionsUsed: (J.extensionsUsed ?? []).filter((e) => !/draco|meshopt/i.test(e)),
  };
  writeFileSync(join(dirname(outFile), binName), Buffer.concat(chunks));
  writeFileSync(outFile, JSON.stringify(out));
  return outFile;
}

async function importModel(file, slot, budget, credit, scale, o = {}) {
  const g = readGLTF(file);
  if ((g.json.skins ?? []).length) {
    // rigged characters / arms keep their skeleton: registered as-is (no flattening or decimation)
    const m = loadManifest();
    m.models[slot] = { ...credit, file: relative(ASSETS, file).replace(/\\/g, '/'), rigged: true, scale: scale !== 1 ? scale : undefined };
    saveManifest(m);
    log(`  ✓ ${slot} ← ${relative(root, file)} (rigged: ${g.json.skins[0].joints.length} bones)`);
    return;
  }
  const prims = await decimate(flatten(g, !!o.perNode), budget);
  const tris = prims.reduce((a, p) => a + p.idx.length / 3, 0);
  const outFile = join(dirname(file), basename(file, extname(file)) + `.game.gltf`);
  writeGLTF(g, prims, outFile, scale);
  const m = loadManifest();
  m.models[slot] = { ...credit, file: relative(ASSETS, outFile).replace(/\\/g, '/'), triangles: tris, ...(o.hints ? { hints: o.hints } : {}) };
  saveManifest(m);
  log(`  ✓ ${slot} ← ${relative(root, outFile)} (${tris.toLocaleString()} triangles${o.perNode ? `, ${prims.length} parts` : ''})`);
}

// ------------------------------------------------------------------------------------------- Poly Haven (CC0)
async function polyhavenModel(id, slot, res, budget) {
  log(`Poly Haven model ${id} → ${slot}`);
  const [files, info] = await Promise.all([getJSON(`https://api.polyhaven.com/files/${id}`), getJSON(`https://api.polyhaven.com/info/${id}`)]);
  const entry = files.gltf?.[res]?.gltf ?? files.gltf?.['2k']?.gltf ?? files.gltf?.['1k']?.gltf;
  if (!entry) throw new Error(`${id}: no glTF download`);
  const dir = join(ASSETS, 'polyhaven', id);
  const main = await download(entry.url, join(dir, basename(new URL(entry.url).pathname)));
  for (const [rel, f] of Object.entries(entry.include ?? {})) await download(f.url, join(dir, rel));
  const authors = Object.keys(info.authors ?? {}).join(', ');
  await importModel(main, slot, budget, { title: info.name, author: authors, license: 'CC0', url: `https://polyhaven.com/a/${id}`, source: 'polyhaven' }, 1);
}

async function polyhavenTexture(id, slot, res, tileMeters) {
  log(`Poly Haven texture ${id} → ${slot}`);
  const [files, info] = await Promise.all([getJSON(`https://api.polyhaven.com/files/${id}`), getJSON(`https://api.polyhaven.com/info/${id}`)]);
  const pick = (k) => files[k]?.[res]?.jpg?.url ?? files[k]?.['2k']?.jpg?.url;
  const dir = join(ASSETS, 'polyhaven', id);
  const get = async (k) => { const u = pick(k); return u ? relative(ASSETS, await download(u, join(dir, basename(new URL(u).pathname)))).replace(/\\/g, '/') : undefined; };
  const [diff, nor, arm] = [await get('Diffuse'), await get('nor_gl'), await get('arm')];
  if (!diff) throw new Error(`${id}: no diffuse map`);
  const real = info.dimensions ? Math.max(...info.dimensions.slice(0, 2)) / 1000 : undefined;
  const m = loadManifest();
  m.textures[slot] = { diff, nor, arm, tileMeters: tileMeters ?? real ?? 2, title: info.name, author: Object.keys(info.authors ?? {}).join(', '), license: 'CC0', url: `https://polyhaven.com/a/${id}`, source: 'polyhaven' };
  saveManifest(m);
  log(`  ✓ ${slot}`);
}

// ------------------------------------------------------------------------------------------- Sketchfab
const SF = 'https://api.sketchfab.com/v3';
function sfAuth() {
  const t = process.env.SKETCHFAB_TOKEN, o = process.env.SKETCHFAB_OAUTH;
  if (o) return { Authorization: `Bearer ${o}` };
  if (t) return { Authorization: `Token ${t}` };
  return null;
}
const OK_LICENSES = new Set(['cc0', 'by']);
// the search API returns licences as { uid, label } only; the model endpoint also has a slug
const LICENSE_LABELS = { 'cc attribution': 'by', 'cc0 public domain': 'cc0', 'cc0': 'cc0', 'cc attribution-sharealike': 'by-sa', 'cc attribution-noncommercial': 'by-nc', 'cc attribution-noderivs': 'by-nd', 'cc attribution-noncommercial-sharealike': 'by-nc-sa', 'cc attribution-noncommercial-noderivs': 'by-nc-nd', 'standard': 'st', 'editorial': 'ed', 'free standard': 'free-st' };
const licenseSlug = (l) => { if (!l) return '?'; if (l.slug) return String(l.slug).toLowerCase(); const label = String(l.label ?? l).toLowerCase().trim(); return LICENSE_LABELS[label] ?? label; };

async function sketchfabSearch(q) {
  const lic = flag('license');
  const max = Number(flag('max', 24));
  const url = `${SF}/search?type=models&downloadable=true&q=${encodeURIComponent(q)}&count=${Math.min(max, 24)}${lic ? `&license=${lic}` : ''}`;
  const res = await getJSON(url, sfAuth() ?? {});
  const rows = (res.results ?? []).slice(0, max);
  if (!rows.length) { log('no downloadable results'); return; }
  for (const r of rows) {
    const license = licenseSlug(r.license);
    const ok = OK_LICENSES.has(license) ? '✓' : '✗';
    console.log(`${ok} ${r.uid}  ${license.padEnd(6)} ${String(r.faceCount ?? '?').padStart(8)} tris ${String(r.likeCount ?? 0).padStart(5)} ♥  ${r.name}  — ${r.user?.displayName ?? r.user?.username ?? ''}`);
  }
  log('get one with: node tools/fetch-assets.mjs sketchfab get <uid> --slot <slot>   (✓ = CC0/CC-BY)');
}

async function sketchfabGet(uid, slot, o = {}) {
  const auth = sfAuth();
  if (!auth) throw new Error('set SKETCHFAB_TOKEN (sketchfab.com → Settings → Password & API → API token)');
  const info = await getJSON(`${SF}/models/${uid}`, auth);
  const slug = licenseSlug(info.license);
  const allowed = new Set([...OK_LICENSES, ...(flag('allow-license') ? [flag('allow-license')] : [])]);
  if (!allowed.has(slug)) throw new Error(`${info.name}: licence "${slug}" is not CC0/CC-BY (pass --allow-license ${slug} if you have the rights)`);
  const dl = await getJSON(`${SF}/models/${uid}/download`, auth);
  const url = dl.gltf?.url ?? dl.glb?.url;
  if (!url) throw new Error('no glTF download offered for this model');
  const dir = join(ASSETS, 'sketchfab', uid);
  mkdirSync(dir, { recursive: true });
  const zipPath = join(dir, 'download.zip');
  const r = await fetch(url);
  if (!r.ok) throw new Error(`download failed: ${r.status}`);
  writeFileSync(zipPath, Buffer.from(await r.arrayBuffer()));
  const files = unzip(readFileSync(zipPath), dir);
  const main = files.find((f) => /scene\.gltf$/i.test(f)) ?? files.find((f) => /\.(gltf|glb)$/i.test(f));
  if (!main) throw new Error('archive has no .gltf');
  const author = info.user?.displayName ?? info.user?.username ?? 'unknown';
  if (o.maxTex) limitTextures(join(dir, main), o.maxTex);
  await importModel(join(dir, main), slot, Number(flag('tris', o.tris ?? 150000)), { title: info.name, author, license: slug === 'by' ? 'CC-BY-4.0' : 'CC0', url: info.viewerUrl ?? `https://sketchfab.com/3d-models/${uid}`, source: 'sketchfab', id: uid }, Number(flag('scale', 1)), o);
  if (slug === 'by') log(`  CC-BY: credit "${info.name}" by ${author} (added to assets/CREDITS.md)`);
  return info;
}

/** PNG / JPEG pixel size from the header (no image library needed). */
function imageSize(buf) {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let p = 2;
    while (p + 9 < buf.length) {
      if (buf[p] !== 0xff) { p++; continue; }
      const m = buf[p + 1];
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { h: buf.readUInt16BE(p + 5), w: buf.readUInt16BE(p + 7) };
      p += 2 + buf.readUInt16BE(p + 2);
    }
  }
  return null;
}

/** Textures above `max` px are downscaled in place with ImageMagick when it is on the PATH, otherwise reported. */
function limitTextures(gltfFile, max) {
  const J = JSON.parse(readFileSync(gltfFile, 'utf8'));
  const magick = ['magick', 'convert'].find((c) => spawnSync(c, ['-version'], { stdio: 'ignore' }).status === 0);
  for (const im of J.images ?? []) {
    if (!im.uri || im.uri.startsWith('data:')) continue;
    const f = join(dirname(gltfFile), decodeURIComponent(im.uri));
    if (!existsSync(f)) continue;
    const sz = imageSize(readFileSync(f));
    if (!sz || Math.max(sz.w, sz.h) <= max) continue;
    if (magick) { spawnSync(magick, [f, '-resize', `${max}x${max}>`, f], { stdio: 'ignore' }); log(`  ↓ ${basename(f)} ${sz.w}×${sz.h} → ≤ ${max}`); }
    else log(`  ! ${basename(f)} is ${sz.w}×${sz.h} (> ${max}); install ImageMagick to downscale automatically`);
  }
}

// ------------------------------------------------------------------------------------------- curated weapons
// Photoreal guns come from authored / scanned models, not from procedural geometry. This picks the most liked
// CC0 / CC-BY downloadable Sketchfab model per slot from a few searches, filtered: pistols must not carry a brand
// or a trademarked model name (the engine's C15 is fictional on purpose — a generic AR-pattern rifle is fine),
// character / attachment / stylised results and sub-5k-triangle low-poly are skipped. Override with --pistol/--carbine.
// Each model keeps its node structure (slide, magazine, trigger as separate meshes), textures ≤ 2k, and is only
// decimated above 300k triangles. `weaponFromGLTF` (oAxis) then finds orientation, parts, sockets and grips.
const WEAPON_SET = {
  'weapons.carbine': { kind: 'carbine', lengthM: 0.85, queries: ['AR-15 rifle', 'M4 carbine'], brandFree: false, flag: 'carbine', exclude: ['pistol', 'handgun'] },
  'weapons.pistol': { kind: 'pistol', lengthM: 0.19, queries: ['9mm pistol polymer', 'compact pistol', 'handgun', 'generic pistol'], brandFree: true, flag: 'pistol', exclude: ['rifle', 'carbine', 'mosin', 'flintlock', 'musket', 'double barrel', 'double-barrel', 'cannon'] },
};
/** Brands and trademarked model names that must not appear in a curated pistol title (matched as words, case-insensitive). */
const BRANDS = [
  'glock', 'g17', 'g19', 'g26', 'g43', 'g45', 'sig', 'sauer', 'p320', 'p226', 'p229', 'p365', 'p938', 'm17', 'm18', 'h&k', 'hk', 'heckler', 'koch', 'usp', 'vp9', 'vp70', 'vp70m', 'mk23', 'p7', 'p30',
  'beretta', 'px4', 'm9', 'm9a1', '92fs', 'cz', 'cz75', 'p-07', 'p-09', 'p-10', 'walther', 'ppq', 'pdp', 'p99', 'pp', 'ppk', 'p88', 'smith', 'wesson', 's&w', 'm&p', 'shield', 'colt', '1911', 'm1911', 'fn', 'fnh', 'fnx', 'fns', 'five-seven', 'five seven', '509', '502',
  'ruger', 'springfield', 'xd', 'xdm', 'hellcat', 'taurus', 'g2c', 'g3', 'kimber', 'canik', 'tp9', 'steyr', 'daniel defense', 'bcm', 'lwrc', 'noveske', 'norinco', 'qsz', 'polymer80', 'p80', 'pfc9', 'pf940', 'shadow systems', 'mr920', 'keltec', 'kel-tec', 'pr57', 'pr 57',
  'makarov', 'pm', 'tokarev', 'tt-33', 'browning', 'hi-point', 'detonics', 'wilson', 'staccato', 'iwi', 'jericho', 'masada', 'arex', 'grand power', 'stoeger', 'girsan', 'tisas', 'sar', 'zastava', 'bersa', 'ingram', 'mac-10', 'mac-11', 'mac 10', 'mac 11', 'uzi', 'fort-17', 'fort 17', 'fort',
  'desert eagle', 'deagle', 'imi', 'magnum research', 'luger', 'p08', 'mauser', 'c96', 'nambu', 'webley', 'enfield', 'stechkin', 'aps', 'grach', 'mp-443', 'yarygin', 'lebedev', 'gsh-18', 'type 54', 'type-64', 'type 64', 'qsz-92', 'px-4', 'nano', 'apx', 'm1934', 'px', 'xm177', 'resident evil', 'samurai edge',
];
/** Results that are not a weapon model (characters, attachments, stylised / sci-fi, low-poly). */
const NOT_A_WEAPON = ['operator', 'soldier', 'police', 'character', 'animation', 'animations', 'animated', 'rigged', 'scope', 'sight', 'suppressor', 'silencer', 'magazine', 'pmag', 'handguard', 'holster', 'ammo', 'bullet', 'cartridge', 'knife', 'stock', 'rail', 'flashlight', 'laser', 'brake', 'skin', 'texture', 'concept', 'cyberpunk', 'sci-fi', 'scifi', 'sci fi', 'futuristic', 'fantasy', 'steampunk', 'toy', 'nerf', 'water gun', 'airsoft', 'revolver', 'smg', 'submachine', 'shotgun', 'sniper', 'low-poly', 'low poly', 'lowpoly', 'ps1', 'stylized', 'stylised', 'cartoon', 'blade', 'sword', 'cs2', 'csgo', 'cod', 'call of duty', 'black ops', 'battlefield', 'pack', 'frame'];
/** Whole-word match on a title; a brand followed by a model number counts too (cz100, hk416, g17, p320). */
const normWords = (x) => x.toLowerCase().replace(/[^a-z0-9&]+/g, ' ').trim();
const wordHit = (title, words) => {
  const t = ` ${normWords(title)} `, tokens = t.trim().split(' ');
  return words.find((w) => { const n = normWords(w); return n.includes(' ') ? t.includes(` ${n} `) : tokens.some((tok) => tok === n || (tok.startsWith(n) && /^\d+[a-z]{0,2}$/.test(tok.slice(n.length)))); });
};
/** Automatic picks need some detail (photoreal is the point); smaller candidates stay listed for a manual --pistol/--carbine. */
const MIN_PICK_TRIS = 10000;

async function weaponCandidates(set) {
  const seen = new Map();
  for (const q of set.queries) for (const lic of ['by', 'cc0']) {
    const url = `${SF}/search?type=models&downloadable=true&q=${encodeURIComponent(q)}&count=24&sort_by=-likeCount&license=${lic}`;
    let res;
    try { res = await getJSON(url, sfAuth() ?? {}); } catch (e) { log(`  search "${q}" (${lic}) failed: ${e.message}`); continue; }
    for (const r of res.results ?? []) if (!seen.has(r.uid)) seen.set(r.uid, { ...r, query: q });
  }
  const rows = [...seen.values()].map((r) => {
    const license = licenseSlug(r.license);
    const title = r.name ?? '';
    let skip = null;
    if (!OK_LICENSES.has(license)) skip = `licence ${license}`;
    else if (!r.isDownloadable && r.isDownloadable !== undefined) skip = 'not downloadable';
    else if (wordHit(title, NOT_A_WEAPON)) skip = `not a weapon model (${wordHit(title, NOT_A_WEAPON)})`;
    else if (wordHit(title, set.exclude ?? [])) skip = `not a ${set.kind} (${wordHit(title, set.exclude ?? [])})`;
    else if (set.brandFree && wordHit(title, BRANDS)) skip = `brand / trademark (${wordHit(title, BRANDS)})`;
    else if ((r.faceCount ?? 0) < MIN_PICK_TRIS) skip = `under ${MIN_PICK_TRIS / 1000}k triangles (pass --${set.flag} ${r.uid} to use it anyway)`;
    else if ((r.faceCount ?? 0) > 1500000) skip = 'over 1.5M triangles';
    return { uid: r.uid, title, author: r.user?.displayName ?? r.user?.username ?? '', license, tris: r.faceCount ?? 0, likes: r.likeCount ?? 0, url: `https://sketchfab.com/3d-models/${r.uid}`, query: r.query, skip };
  });
  rows.sort((a, b) => b.likes - a.likes);
  return rows;
}

function weaponMappingFile(slot) { return join(ASSETS, 'weapons', `${slot}.mapping.json`); }

async function weapons() {
  const only = flag('only');
  const listOnly = args.includes('--list');
  const auth = sfAuth();
  if (!auth) log('SKETCHFAB_TOKEN is not set — showing what would be fetched (public search API). Set the token (sketchfab.com → Settings → Password & API) to download.');
  const picks = [];
  for (const [slot, set] of Object.entries(WEAPON_SET)) {
    if (only && !slot.endsWith(only)) continue;
    log(`${slot}: ${set.queries.map((q) => `"${q}"`).join(', ')} — CC0 / CC-BY, most liked first${set.brandFree ? ', no brand names' : ''}`);
    const rows = await weaponCandidates(set);
    const forced = flag(set.flag);
    const pick = forced ? (rows.find((r) => r.uid === forced) ?? { uid: forced, title: '(not in the search results — fetched as given)', author: '', license: '?', tris: 0, likes: 0, skip: null }) : rows.find((r) => !r.skip);
    for (const r of rows.slice(0, 40)) {
      const mark = pick && r.uid === pick.uid ? '→' : r.skip ? ' ' : '✓';
      console.log(`  ${mark} ${r.uid}  ${r.license.padEnd(4)} ${String(r.tris).padStart(8)} tris ${String(r.likes).padStart(5)} ♥  ${r.title}  — ${r.author}${r.skip ? `   [skipped: ${r.skip}]` : ''}`);
    }
    if (!pick) { log(`  ✗ ${slot}: nothing left after filtering — pass --${set.flag} <uid>`); continue; }
    log(`  → ${slot}: ${pick.title} by ${pick.author} (${pick.license}, ${pick.tris.toLocaleString()} tris) ${pick.url ?? ''}`);
    picks.push({ slot, set, pick });
  }
  if (!auth || listOnly) {
    if (picks.length) log(`would fetch: ${picks.map((p) => `${p.slot} ← ${p.pick.uid}`).join(', ')}  (SKETCHFAB_TOKEN=… node tools/fetch-assets.mjs weapons${picks.map((p) => ` --${p.set.flag} ${p.pick.uid}`).join('')})`);
    return;
  }
  for (const { slot, set, pick } of picks) {
    try {
      const hints = { weapon: { kind: set.kind, autoOrient: true, lengthM: set.lengthM } };
      await sketchfabGet(pick.uid, slot, { tris: Number(flag('tris', 300000)), perNode: true, hints, maxTex: Number(flag('maxtex', 2048)) });
      const mf = weaponMappingFile(slot);
      if (!existsSync(mf)) {
        mkdirSync(dirname(mf), { recursive: true });
        writeFileSync(mf, JSON.stringify({ kind: set.kind, autoOrient: true, lengthM: set.lengthM }, null, 2));
        log(`  mapping overrides: ${relative(root, mf)} (part regexes, sockets, grips, forward/up — see README → Scanned weapons)`);
      }
    } catch (e) { log(`  ✗ ${slot}: ${e.message}`); process.exitCode = 1; }
  }
  log('done → assets/manifest.json (the range and the viewer use weapons.* automatically; ?weapon=weapons.pistol in the viewer)');
}

// ------------------------------------------------------------------------------------------- FBX / local
async function convert(file, slot) {
  const out = join(ASSETS, 'converted', basename(file, extname(file)));
  mkdirSync(dirname(out), { recursive: true });
  log(`converting ${file} with fbx2gltf (npx downloads it the first time)…`);
  const r = spawnSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['--yes', 'fbx2gltf', '-i', resolve(file), '-o', out, '--khr-materials-unlit=false'], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('fbx2gltf failed (install it with: npm i -g fbx2gltf)');
  const gltf = existsSync(out + '_out/' + basename(out) + '.gltf') ? out + '_out/' + basename(out) + '.gltf' : out + '.glb';
  const m = loadManifest();
  m.models[slot] = { file: relative(ASSETS, gltf).replace(/\\/g, '/'), license: flag('license', 'own / Mixamo terms'), author: flag('author', ''), source: 'converted' };
  saveManifest(m);
  log(`  ✓ ${slot} ← ${relative(root, gltf)}`);
}

async function local(file, slot) {
  const dest = join(ASSETS, 'local', basename(dirname(resolve(file))) + '-' + basename(file));
  mkdirSync(dirname(dest), { recursive: true });
  if (resolve(file) !== dest) copyFileSync(file, dest);
  // copy sibling resources (bin / textures) for .gltf
  if (/\.gltf$/i.test(file)) {
    const J = JSON.parse(readFileSync(file, 'utf8'));
    for (const u of [...(J.buffers ?? []), ...(J.images ?? [])].map((x) => x.uri).filter((u) => u && !u.startsWith('data:'))) {
      const from = join(dirname(file), decodeURIComponent(u)), to = join(dirname(dest), decodeURIComponent(u));
      mkdirSync(dirname(to), { recursive: true }); copyFileSync(from, to);
    }
  }
  await importModel(dest, slot, Number(flag('tris', 150000)), { title: basename(file), author: flag('author', ''), license: flag('license', 'own'), source: 'local' }, Number(flag('scale', 1)));
}

function writeCredits(m) {
  // shared with tools/fetch-sounds.mjs (same table, `sounds` section included) — keep both in sync
  const esc = (x) => String(x ?? '').replace(/\|/g, '\\|');
  const lines = ['# Asset credits', '', 'Downloaded by `tools/fetch-assets.mjs` (textures, models) and `tools/fetch-sounds.mjs` (sounds). Only CC0 and CC-BY content is accepted; CC-BY assets require this attribution when you ship. Nothing in this folder is committed.', ''];
  for (const [title, rows] of [['Textures', m.textures ?? {}], ['Models', m.models ?? {}], ['Sounds', m.sounds ?? {}]]) {
    const entries = Object.entries(rows);
    if (!entries.length) continue;
    lines.push(`## ${title}`, '', '| Slot | Asset | Author | Licence | Link |', '|---|---|---|---|---|');
    for (const [slot, e] of entries) lines.push(`| ${esc(slot)} | ${esc(e.title)} | ${esc(e.author)} | ${esc(e.license)} | ${esc(e.url)} |`);
    lines.push('');
  }
  writeFileSync(join(ASSETS, 'CREDITS.md'), lines.join('\n'));
}

// ------------------------------------------------------------------------------------------- main
async function main() {
  const [cmd, a1, a2] = positional;
  const res = flag('res', '2k');
  if (!cmd || cmd === 'default' || cmd === 'polyhaven' && !a1) {
    log(`downloading the default CC0 set from Poly Haven (${res}) into assets/ — first run takes a while`);
    for (const [slot, id, tile] of DEFAULT_SET.textures) {
      try { await polyhavenTexture(id, slot, flag('texres', res === '2k' ? '2k' : res), tile); } catch (e) { log(`  ✗ ${slot}: ${e.message}`); }
    }
    for (const [slot, id, tris] of DEFAULT_SET.models) {
      if (flag('only') && !slot.startsWith(flag('only'))) continue;
      try { await polyhavenModel(id, slot, res, Number(flag('tris', tris))); } catch (e) { log(`  ✗ ${slot}: ${e.message}`); }
    }
    log('done → assets/manifest.json (reload the range; scanned assets replace the procedural ones)');
  } else if (cmd === 'polyhaven') {
    const slot = flag('slot') ?? `custom.${a1}`;
    if ((flag('type') ?? 'model') === 'texture') await polyhavenTexture(a1, slot, res, flag('tile') ? Number(flag('tile')) : undefined);
    else await polyhavenModel(a1, slot, res, Number(flag('tris', 60000)));
  } else if (cmd === 'sketchfab' && a1 === 'search') await sketchfabSearch(a2 ?? '');
  else if (cmd === 'sketchfab' && a1 === 'get') await sketchfabGet(a2, flag('slot') ?? `custom.${a2}`, { perNode: (flag('slot') ?? '').startsWith('weapons.'), maxTex: Number(flag('maxtex', 2048)) });
  else if (cmd === 'weapons') await weapons();
  else if (cmd === 'convert') await convert(a1, flag('slot') ?? 'arms');
  else if (cmd === 'local') await local(a1, flag('slot') ?? `custom.${basename(a1, extname(a1))}`);
  else if (cmd === 'credits') { writeCredits(loadManifest()); log('wrote assets/CREDITS.md'); }
  else { console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 23).join('\n')); process.exitCode = 1; }
}

main().catch((e) => { console.error('[fetch-assets] error:', e.message); process.exitCode = 1; });
