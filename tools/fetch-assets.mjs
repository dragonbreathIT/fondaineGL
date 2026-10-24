#!/usr/bin/env node
// fondaine asset fetcher — scanned, legally usable assets for the engine, written to assets/ + manifest.json.
//
//   node tools/fetch-assets.mjs                      default CC0 set from Poly Haven (trees, shrubs, rocks,
//                                                    ground/concrete/wood scans) — no account needed
//   node tools/fetch-assets.mjs polyhaven <id> --slot <slot> [--type model|texture] [--res 2k|4k] [--tris 60000]
//   node tools/fetch-assets.mjs sketchfab search "<query>" [--license by|cc0] [--max 24]
//   node tools/fetch-assets.mjs sketchfab get <uid> --slot weapons.pistol      (needs SKETCHFAB_TOKEN)
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

/** Bake every mesh primitive into world space and merge by material → [{material, pos, nrm, uv, idx}]. */
function flatten(g) {
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
        const key = p.material ?? -1;
        const t = byMat.get(key) ?? { material: key, pos: [], nrm: [], uv: [], idx: [] };
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
  return [...byMat.values()].map((t) => ({ material: t.material, pos: Float32Array.from(t.pos), nrm: Float32Array.from(t.nrm), uv: Float32Array.from(t.uv), idx: Uint32Array.from(t.idx) }));
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
    return { material: p.material, pos, nrm, uv, idx: Uint32Array.from(idx, (i) => remap[i]) };
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
    meshes.push({ name: `m${meshes.length}`, primitives: [prim] });
    nodes.push({ name: J.materials?.[p.material]?.name ?? `part${nodes.length}`, mesh: meshes.length - 1 });
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

async function importModel(file, slot, budget, credit, scale) {
  const g = readGLTF(file);
  if ((g.json.skins ?? []).length) {
    // rigged characters / arms keep their skeleton: registered as-is (no flattening or decimation)
    const m = loadManifest();
    m.models[slot] = { ...credit, file: relative(ASSETS, file).replace(/\\/g, '/'), rigged: true, scale: scale !== 1 ? scale : undefined };
    saveManifest(m);
    log(`  ✓ ${slot} ← ${relative(root, file)} (rigged: ${g.json.skins[0].joints.length} bones)`);
    return;
  }
  const prims = await decimate(flatten(g), budget);
  const tris = prims.reduce((a, p) => a + p.idx.length / 3, 0);
  const outFile = join(dirname(file), basename(file, extname(file)) + `.game.gltf`);
  writeGLTF(g, prims, outFile, scale);
  const m = loadManifest();
  m.models[slot] = { ...credit, file: relative(ASSETS, outFile).replace(/\\/g, '/'), triangles: tris };
  saveManifest(m);
  log(`  ✓ ${slot} ← ${relative(root, outFile)} (${tris.toLocaleString()} triangles)`);
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

async function sketchfabSearch(q) {
  const lic = flag('license');
  const max = Number(flag('max', 24));
  const url = `${SF}/search?type=models&downloadable=true&q=${encodeURIComponent(q)}&count=${Math.min(max, 24)}${lic ? `&license=${lic}` : ''}`;
  const res = await getJSON(url, sfAuth() ?? {});
  const rows = (res.results ?? []).slice(0, max);
  if (!rows.length) { log('no downloadable results'); return; }
  for (const r of rows) {
    const license = r.license?.slug ?? r.license?.label ?? '?';
    const ok = OK_LICENSES.has(String(license).toLowerCase()) ? '✓' : '✗';
    console.log(`${ok} ${r.uid}  ${String(license).padEnd(6)} ${String(r.faceCount ?? '?').padStart(8)} tris  ${r.name}  — ${r.user?.displayName ?? r.user?.username ?? ''}`);
  }
  log('get one with: node tools/fetch-assets.mjs sketchfab get <uid> --slot <slot>   (✓ = CC0/CC-BY)');
}

async function sketchfabGet(uid, slot) {
  const auth = sfAuth();
  if (!auth) throw new Error('set SKETCHFAB_TOKEN (sketchfab.com → Settings → Password & API → API token)');
  const info = await getJSON(`${SF}/models/${uid}`, auth);
  const slug = String(info.license?.slug ?? info.license?.label ?? '').toLowerCase();
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
  await importModel(join(dir, main), slot, Number(flag('tris', 150000)), { title: info.name, author, license: slug === 'by' ? 'CC-BY-4.0' : 'CC0', url: info.viewerUrl ?? `https://sketchfab.com/3d-models/${uid}`, source: 'sketchfab' }, Number(flag('scale', 1)));
  if (slug === 'by') log(`  CC-BY: credit "${info.name}" by ${author} (added to assets/CREDITS.md)`);
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
  const rows = [...Object.entries(m.textures), ...Object.entries(m.models)];
  const lines = ['# Asset credits', '', 'Downloaded by `tools/fetch-assets.mjs`. CC-BY assets require this attribution when you ship.', '', '| Slot | Asset | Author | Licence | Link |', '|---|---|---|---|---|'];
  for (const [slot, e] of rows) lines.push(`| ${slot} | ${e.title ?? ''} | ${e.author ?? ''} | ${e.license ?? ''} | ${e.url ?? ''} |`);
  writeFileSync(join(ASSETS, 'CREDITS.md'), lines.join('\n') + '\n');
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
  else if (cmd === 'sketchfab' && a1 === 'get') await sketchfabGet(a2, flag('slot') ?? `custom.${a2}`);
  else if (cmd === 'convert') await convert(a1, flag('slot') ?? 'arms');
  else if (cmd === 'local') await local(a1, flag('slot') ?? `custom.${basename(a1, extname(a1))}`);
  else if (cmd === 'credits') { writeCredits(loadManifest()); log('wrote assets/CREDITS.md'); }
  else { console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 20).join('\n')); process.exitCode = 1; }
}

main().catch((e) => { console.error('[fetch-assets] error:', e.message); process.exitCode = 1; });
