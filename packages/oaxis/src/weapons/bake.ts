// Per-part texture bake: the tiled procedural material of a part is re-sampled into a unique atlas laid out from
// the part's own UVs (lofts, plates, lathes and sweeps all have injective metre UVs; small primitives get a chart
// each), and ray-cast ambient occlusion against the whole weapon is multiplied into the atlas (ORM.r, plus a
// little grime in the albedo and extra roughness in recesses). The baked material keeps the same tangent frame
// as the tiled one (charts are pure translations of the original UVs), so normal maps stay valid.
//
// Everything runs on the GPU per material bucket: a render pass rasterises the mesh in atlas space (world position +
// normal per AO texel), then two compute passes:
//   1. AO: for every atlas texel that a triangle covers, N cosine-weighted hemisphere rays are traced through a
//      uniform grid of the weapon's triangles (3D-DDA, Möller–Trumbore); occlusion is distance-weighted.
//   2. compose: tiled albedo / normal / ORM sampled at the texel's original metre UV, AO folded in, written to the
//      atlas textures (mipmapped like the synthesised sets).
// Results are cached per renderer by a geometry hash, so rebuilding the same model is free.

import { Geometry, Material, Mesh, Renderer, VERTEX_LAYOUT } from '@fondaine/gl';

const mipCount = (w: number, h: number) => Math.floor(Math.log2(Math.max(w, h))) + 1;

export interface BakeOptions {
  /** Target atlas texel size (m). Default 0.1 mm; coarser when the atlas would exceed `maxTexels`. */
  texelM?: number;
  /** Atlas texel budget (default 2048², i.e. one 2048 texture's worth). */
  maxTexels?: number;
  /** Hemisphere rays per AO texel (default 32). */
  rays?: number;
  /** AO ray range (m): recesses deeper than this are fully dark; default 25 mm. */
  range?: number;
  /** AO map resolution relative to the atlas (default 1/4 per axis, at most 1024 px). */
  aoScale?: number;
  /** Strength of the baked occlusion in ORM.r (default 1). */
  strength?: number;
  label?: string;
}

/** Triangle soup + uniform grid of the whole weapon (occluders for every bucket). */
export class OccluderGrid {
  readonly tris: Float32Array;        // 9 floats per triangle
  readonly cellStart: Uint32Array;    // nx*ny*nz + 1 (prefix sums)
  readonly cellItems: Uint32Array;
  readonly min: [number, number, number];
  readonly dims: [number, number, number];
  readonly cell: number;
  readonly triangleCount: number;

  constructor(geoms: Geometry[], cellM = 0.0025) {
    let nt = 0;
    const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
    for (const g of geoms) {
      nt += g.triangleCount;
      const p = g.positions;
      for (let i = 0; i < p.length; i += 3) for (let k = 0; k < 3; k++) { if (p[i + k] < min[k]) min[k] = p[i + k]; if (p[i + k] > max[k]) max[k] = p[i + k]; }
    }
    for (let k = 0; k < 3; k++) { min[k] -= 0.002; max[k] += 0.002; }
    // cell size: ~cellM, capped at 300k cells
    let cell = cellM;
    const ext = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    while ((ext[0] / cell + 1) * (ext[1] / cell + 1) * (ext[2] / cell + 1) > 300000) cell *= 1.25;
    const dims: [number, number, number] = [Math.max(1, Math.ceil(ext[0] / cell)), Math.max(1, Math.ceil(ext[1] / cell)), Math.max(1, Math.ceil(ext[2] / cell))];
    const tris = new Float32Array(nt * 9);
    let t = 0;
    for (const g of geoms) {
      const p = g.positions, ix = g.indices;
      for (let i = 0; i < ix.length; i += 3) {
        for (let k = 0; k < 3; k++) { const v = ix[i + k] * 3; tris[t++] = p[v]; tris[t++] = p[v + 1]; tris[t++] = p[v + 2]; }
      }
    }
    // bin triangle AABBs
    const ncell = dims[0] * dims[1] * dims[2];
    const counts = new Uint32Array(ncell + 1);
    const cellOf = (x: number, y: number, z: number): [number, number, number] => [
      Math.min(dims[0] - 1, Math.max(0, Math.floor((x - min[0]) / cell))),
      Math.min(dims[1] - 1, Math.max(0, Math.floor((y - min[1]) / cell))),
      Math.min(dims[2] - 1, Math.max(0, Math.floor((z - min[2]) / cell)))];
    const ranges = new Int32Array(nt * 6);
    for (let i = 0; i < nt; i++) {
      const o = i * 9;
      const lo = cellOf(Math.min(tris[o], tris[o + 3], tris[o + 6]), Math.min(tris[o + 1], tris[o + 4], tris[o + 7]), Math.min(tris[o + 2], tris[o + 5], tris[o + 8]));
      const hi = cellOf(Math.max(tris[o], tris[o + 3], tris[o + 6]), Math.max(tris[o + 1], tris[o + 4], tris[o + 7]), Math.max(tris[o + 2], tris[o + 5], tris[o + 8]));
      ranges.set([lo[0], lo[1], lo[2], hi[0], hi[1], hi[2]], i * 6);
      for (let z = lo[2]; z <= hi[2]; z++) for (let y = lo[1]; y <= hi[1]; y++) for (let x = lo[0]; x <= hi[0]; x++) counts[(z * dims[1] + y) * dims[0] + x + 1]++;
    }
    for (let i = 1; i <= ncell; i++) counts[i] += counts[i - 1];
    const items = new Uint32Array(counts[ncell]);
    const fill = counts.slice(0, ncell);
    for (let i = 0; i < nt; i++) {
      const r = ranges.subarray(i * 6, i * 6 + 6);
      for (let z = r[2]; z <= r[5]; z++) for (let y = r[1]; y <= r[4]; y++) for (let x = r[0]; x <= r[3]; x++) { const c = (z * dims[1] + y) * dims[0] + x; items[fill[c]++] = i; }
    }
    this.tris = tris; this.cellStart = counts; this.cellItems = items;
    this.min = min as [number, number, number]; this.dims = dims; this.cell = cell; this.triangleCount = nt;
  }
}

const WGSL_COMMON = /* wgsl */ `
fn pcg(v: u32) -> u32 { let s = v * 747796405u + 2891336453u; let w = ((s >> ((s >> 28u) + 4u)) ^ s) * 277803737u; return (w >> 22u) ^ w; }
fn rnd(seed: u32) -> f32 { return f32(pcg(seed)) / 4294967295.0; }
`;

const WGSL_AO = /* wgsl */ `
struct Params {
  gridMin: vec4f,           // xyz, w = cell size
  gridDims: vec4u,          // xyz, w = ray count
  misc: vec4f,              // range (m), aoW, aoH, bias
};
@group(0) @binding(0) var<uniform> P: Params;
@group(0) @binding(1) var<storage, read> tris: array<f32>;
@group(0) @binding(2) var<storage, read> cellStart: array<u32>;
@group(0) @binding(3) var<storage, read> cellItems: array<u32>;
@group(0) @binding(4) var surfPos: texture_2d<f32>;              // world position, a = coverage
@group(0) @binding(5) var surfNrm: texture_2d<f32>;              // world normal
@group(0) @binding(6) var<storage, read_write> ao: array<f32>;
${WGSL_COMMON}

fn hitTri(o: vec3f, d: vec3f, t: u32, tMax: f32) -> f32 {
  let b = t * 9u;
  let v0 = vec3f(tris[b], tris[b + 1u], tris[b + 2u]);
  let v1 = vec3f(tris[b + 3u], tris[b + 4u], tris[b + 5u]);
  let v2 = vec3f(tris[b + 6u], tris[b + 7u], tris[b + 8u]);
  let e1 = v1 - v0; let e2 = v2 - v0;
  let p = cross(d, e2);
  let det = dot(e1, p);
  if (abs(det) < 1e-12) { return -1.0; }
  let inv = 1.0 / det;
  let s = o - v0;
  let u = dot(s, p) * inv;
  if (u < 0.0 || u > 1.0) { return -1.0; }
  let q = cross(s, e1);
  let v = dot(d, q) * inv;
  if (v < 0.0 || u + v > 1.0) { return -1.0; }
  let tt = dot(e2, q) * inv;
  if (tt > 1e-5 && tt < tMax) { return tt; }
  return -1.0;
}

/// Nearest hit distance along the ray within range, or -1 (3D-DDA through the uniform grid).
fn trace(o: vec3f, d: vec3f, range: f32) -> f32 {
  let cell = P.gridMin.w;
  let dims = vec3i(P.gridDims.xyz);
  var c = vec3i(floor((o - P.gridMin.xyz) / cell));
  if (any(c < vec3i(0)) || any(c >= dims)) { return -1.0; }
  let step = vec3i(select(vec3i(-1), vec3i(1), d >= vec3f(0.0)));
  let nextB = (vec3f(c) + vec3f(select(vec3f(0.0), vec3f(1.0), d >= vec3f(0.0)))) * cell + P.gridMin.xyz;
  let invD = 1.0 / select(d, vec3f(1e-9), abs(d) < vec3f(1e-9));
  var tMaxV = (nextB - o) * invD;
  let tDelta = abs(cell * invD);
  var best = range;
  var hit = false;
  for (var it = 0; it < 256; it++) {
    let ci = u32((c.z * dims.y + c.y) * dims.x + c.x);
    let s = cellStart[ci]; let e = cellStart[ci + 1u];
    for (var k = s; k < e; k++) {
      let t = hitTri(o, d, cellItems[k], best);
      if (t > 0.0) { best = t; hit = true; }
    }
    // advance; stop once the next cell starts beyond the best hit
    let tNext = min(tMaxV.x, min(tMaxV.y, tMaxV.z));
    if (tNext > best) { break; }
    if (tMaxV.x < tMaxV.y && tMaxV.x < tMaxV.z) { c.x += step.x; tMaxV.x += tDelta.x; }
    else if (tMaxV.y < tMaxV.z) { c.y += step.y; tMaxV.y += tDelta.y; }
    else { c.z += step.z; tMaxV.z += tDelta.z; }
    if (any(c < vec3i(0)) || any(c >= dims)) { break; }
  }
  return select(-1.0, best, hit);
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let W = u32(P.misc.y); let H = u32(P.misc.z);
  if (id.x >= W || id.y >= H) { return; }
  let i = id.y * W + id.x;
  let sp = textureLoad(surfPos, vec2i(id.xy), 0);
  if (sp.a < 0.5) { ao[i] = -1.0; return; }
  let pos = sp.xyz;
  let n = normalize(textureLoad(surfNrm, vec2i(id.xy), 0).xyz);
  // tangent frame
  let a = select(vec3f(1.0, 0.0, 0.0), vec3f(0.0, 1.0, 0.0), abs(n.x) > 0.9);
  let t = normalize(cross(a, n));
  let bt = cross(n, t);
  let o = pos + n * P.misc.w;
  let N = P.gridDims.w;
  let rot = rnd(i * 7u + 1u) * 6.2831853;
  var occ = 0.0;
  for (var k = 0u; k < N; k++) {
    // stratified cosine-weighted hemisphere (Fibonacci spiral with a per-texel rotation)
    let fk = (f32(k) + 0.5) / f32(N);
    let r = sqrt(fk);
    let phi = f32(k) * 2.39996323 + rot;
    let x = r * cos(phi); let y = r * sin(phi);
    let z = sqrt(max(0.0, 1.0 - fk));
    let d = normalize(t * x + bt * y + n * z);
    let h = trace(o, d, P.misc.x);
    if (h > 0.0) { occ += 1.0 - h / P.misc.x; }
  }
  ao[i] = 1.0 - occ / f32(N);
}
`;

const WGSL_SURF = /* wgsl */ `
struct Params { atlas: vec4f };   // atlas W (m), H (m), unused, unused
@group(0) @binding(0) var<uniform> P: Params;
struct VOut { @builtin(position) pos: vec4f, @location(0) wpos: vec3f, @location(1) nrm: vec3f };
@vertex fn vs(@location(0) pos: vec3f, @location(1) nrm: vec3f, @location(2) tan: vec4f, @location(3) uv: vec2f) -> VOut {
  var o: VOut;
  o.pos = vec4f(uv.x / P.atlas.x * 2.0 - 1.0, 1.0 - uv.y / P.atlas.y * 2.0, 0.0, 1.0);
  o.wpos = pos; o.nrm = nrm;
  return o;
}
struct FOut { @location(0) pos: vec4f, @location(1) nrm: vec4f };
@fragment fn fs(i: VOut) -> FOut { var o: FOut; o.pos = vec4f(i.wpos, 1.0); o.nrm = vec4f(normalize(i.nrm), 1.0); return o; }
`;

const WGSL_COMPOSE = /* wgsl */ `
struct Chart { rect: vec4f, delta: vec4f };   // rect: x0 y0 x1 y1 (atlas metres); delta.xy = atlas uv − metre uv
struct Params {
  atlas: vec4f,        // atlas W (m), H (m), tex W (px), tex H (px)
  tile: vec4f,         // 1 / tileMeters (u, v), lod, chart count
  ao: vec4f,           // ao W, ao H, strength, grime
};
@group(0) @binding(0) var<uniform> P: Params;
@group(0) @binding(1) var<storage, read> charts: array<Chart>;
@group(0) @binding(2) var<storage, read> ao: array<f32>;
@group(0) @binding(3) var samp: sampler;
@group(0) @binding(4) var srcAlbedo: texture_2d<f32>;
@group(0) @binding(5) var srcNormal: texture_2d<f32>;
@group(0) @binding(6) var srcOrm: texture_2d<f32>;
@group(0) @binding(7) var outAlbedo: texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(8) var outNormal: texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(9) var outOrm: texture_storage_2d<rgba8unorm, write>;

fn srgbEncode(c: vec3f) -> vec3f {
  let lo = c * 12.92;
  let hi = 1.055 * pow(max(c, vec3f(0.0)), vec3f(1.0 / 2.4)) - 0.055;
  return select(hi, lo, c <= vec3f(0.0031308));
}
fn aoAt(x: i32, y: i32) -> f32 {
  let W = i32(P.ao.x); let H = i32(P.ao.y);
  let v = ao[u32(clamp(y, 0, H - 1) * W + clamp(x, 0, W - 1))];
  return v;
}
/// Bilinear AO with dilation: uncovered texels take the mean of covered neighbours (3×3, then 5×5).
fn aoSample(x: i32, y: i32) -> f32 {
  let v = aoAt(x, y);
  if (v >= 0.0) { return v; }
  for (var r = 1; r <= 3; r++) {
    var sum = 0.0; var n = 0.0;
    for (var dy = -r; dy <= r; dy++) { for (var dx = -r; dx <= r; dx++) { let q = aoAt(x + dx, y + dy); if (q >= 0.0) { sum += q; n += 1.0; } } }
    if (n > 0.0) { return sum / n; }
  }
  return 1.0;
}
fn aoBilinear(uv: vec2f) -> f32 {
  let p = uv * P.ao.xy - 0.5;
  let f = fract(p); let i = vec2i(floor(p));
  let a = aoSample(i.x, i.y); let b = aoSample(i.x + 1, i.y); let c = aoSample(i.x, i.y + 1); let d = aoSample(i.x + 1, i.y + 1);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let W = u32(P.atlas.z); let H = u32(P.atlas.w);
  if (id.x >= W || id.y >= H) { return; }
  let uv = (vec2f(id.xy) + 0.5) / vec2f(f32(W), f32(H));
  let pm = uv * P.atlas.xy;                      // atlas position in metres
  // chart lookup (nearest chart when outside all: padding)
  var delta = vec2f(0.0);
  var bestD = 1e9;
  let n = u32(P.tile.w);
  for (var k = 0u; k < n; k++) {
    let c = charts[k];
    let dx = max(max(c.rect.x - pm.x, pm.x - c.rect.z), 0.0);
    let dy = max(max(c.rect.y - pm.y, pm.y - c.rect.w), 0.0);
    let d = dx * dx + dy * dy;
    if (d < bestD) { bestD = d; delta = c.delta.xy; }
  }
  let muv = (pm - delta) * P.tile.xy;           // tiled-texture uv (repeats)
  let lod = P.tile.z;
  let alb = textureSampleLevel(srcAlbedo, samp, muv, lod);
  let nrm = textureSampleLevel(srcNormal, samp, muv, lod);
  let orm = textureSampleLevel(srcOrm, samp, muv, lod);
  let a = aoBilinear(uv);
  let k = P.ao.z;
  let occ = mix(1.0, a, k);
  // cavities collect grime: darker, rougher
  let cav = (1.0 - occ) * P.ao.w;
  textureStore(outAlbedo, vec2i(id.xy), vec4f(srgbEncode(alb.rgb * (1.0 - 0.6 * cav)), alb.a));
  textureStore(outNormal, vec2i(id.xy), nrm);
  textureStore(outOrm, vec2i(id.xy), vec4f(orm.r * occ, min(1.0, orm.g + 0.35 * cav), orm.b, orm.a));
}
`;

interface Chart { gi: number; u0: number; v0: number; w: number; h: number; x: number; y: number }

const PIPES = new WeakMap<Renderer, { ao: GPUComputePipeline; compose: GPUComputePipeline; surf: GPURenderPipeline; cache: Map<string, Material> }>();
function pipes(renderer: Renderer) {
  let p = PIPES.get(renderer);
  if (!p) {
    const dev = renderer.dev;
    const surfMod = dev.shader(WGSL_SURF, 'bake-surf');
    p = {
      ao: dev.device.createComputePipeline({ layout: 'auto', compute: { module: dev.shader(WGSL_AO, 'bake-ao'), entryPoint: 'main' } }),
      compose: dev.device.createComputePipeline({ layout: 'auto', compute: { module: dev.shader(WGSL_COMPOSE, 'bake-compose'), entryPoint: 'main' } }),
      surf: dev.device.createRenderPipeline({
        layout: 'auto', label: 'bake-surf',
        vertex: { module: surfMod, entryPoint: 'vs', buffers: [VERTEX_LAYOUT] },
        fragment: { module: surfMod, entryPoint: 'fs', targets: [{ format: 'rgba32float' }, { format: 'rgba16float' }] },
        primitive: { topology: 'triangle-list', cullMode: 'none' },
      }),
      cache: new Map(),
    };
    PIPES.set(renderer, p);
  }
  return p;
}

function nextPow2(n: number): number { let p = 1; while (p < n) p *= 2; return p; }

/** Cheap content hash of a geometry list (positions + uvs sampled) for the bake cache. */
function hashGeoms(geoms: Geometry[]): string {
  let h = 2166136261 >>> 0, n = 0;
  for (const g of geoms) {
    n += g.vertexCount;
    const p = g.positions;
    const step = Math.max(1, Math.floor(p.length / 4096));
    for (let i = 0; i < p.length; i += step) { h ^= Math.round(p[i] * 1e6) & 0xffff; h = Math.imul(h, 16777619) >>> 0; }
  }
  return `${n}:${h.toString(16)}`;
}

export interface BakeResult { material: Material; atlasM: [number, number]; texSize: [number, number]; texelM: number; ms: number }

export interface AtlasLayout { charts: Chart[]; texel: number; texW: number; texH: number; atlasW: number; atlasH: number; key: string }

/**
 * Lay the bucket's geometries out in an atlas, translating their UVs in place (one chart per geometry: lofts,
 * plates, lathes and sweeps have injective metre UVs). Returns null when nothing is there to lay out.
 */
export function layoutAtlas(geoms: Geometry[], o: BakeOptions = {}): AtlasLayout | null {
  const charts: Chart[] = [];
  for (let gi = 0; gi < geoms.length; gi++) {
    const uv = geoms[gi].uvs;
    let u0 = Infinity, v0 = Infinity, u1 = -Infinity, v1 = -Infinity;
    for (let i = 0; i < uv.length; i += 2) { if (uv[i] < u0) u0 = uv[i]; if (uv[i] > u1) u1 = uv[i]; if (uv[i + 1] < v0) v0 = uv[i + 1]; if (uv[i + 1] > v1) v1 = uv[i + 1]; }
    if (!Number.isFinite(u0)) continue;
    charts.push({ gi, u0, v0, w: Math.max(u1 - u0, 1e-5), h: Math.max(v1 - v0, 1e-5), x: 0, y: 0 });
  }
  if (!charts.length) return null;
  const maxTexels = o.maxTexels ?? 2048 * 2048;
  let texel = o.texelM ?? 0.0001;
  const padT = 4;
  let area = 0;
  for (const c of charts) area += (c.w + 2 * padT * texel) * (c.h + 2 * padT * texel);
  texel = Math.max(texel, Math.sqrt((area * 1.25) / maxTexels));
  const sorted = charts.slice().sort((a, b) => b.h - a.h);
  let texW = 0, texH = 0;
  // shelf-pack; if the power-of-two rounding blows the texel budget, coarsen and pack again
  for (let attempt = 0; attempt < 4; attempt++) {
    const pad = padT * texel;
    const widthM = Math.max(Math.sqrt(area * 1.25), ...charts.map((c) => c.w + 2 * pad));
    let x = 0, y = 0, shelf = 0, usedW = 0;
    for (const c of sorted) {
      const cw = c.w + 2 * pad, ch = c.h + 2 * pad;
      if (x + cw > widthM + 1e-9 && x > 0) { y += shelf; x = 0; shelf = 0; }
      c.x = x + pad; c.y = y + pad;
      x += cw; shelf = Math.max(shelf, ch); usedW = Math.max(usedW, x);
    }
    const heightM = y + shelf;
    texW = nextPow2(Math.ceil(usedW / texel)); texH = nextPow2(Math.ceil(heightM / texel));
    if (texW * texH <= maxTexels * 1.05 && texW <= 4096 && texH <= 4096) break;
    texel *= Math.max(1.05, Math.sqrt((texW * texH) / maxTexels));
  }
  const key = hashGeoms(geoms);
  for (const c of charts) {
    const uv = geoms[c.gi].uvs;
    const du = c.x - c.u0, dv = c.y - c.v0;
    for (let i = 0; i < uv.length; i += 2) { uv[i] += du; uv[i + 1] += dv; }
  }
  return { charts, texel, texW, texH, atlasW: texW * texel, atlasH: texH * texel, key };
}

/**
 * Bake the base material plus ray-cast AO into the atlas of `layout` for `mesh` (built from the laid-out
 * geometries). Returns null when the material has no maps to resample.
 */
export function bakeBucket(renderer: Renderer, mesh: Mesh, layout: AtlasLayout, base: Material, occ: OccluderGrid, occKey: string, o: BakeOptions = {}): BakeResult | null {
  if (!base.baseColorMap || !base.normalMap || !base.ormMap) return null;
  const t0 = performance.now();
  const dev = renderer.dev, device = dev.device;
  const pp = pipes(renderer);
  const { charts, texel, texW, texH, atlasW, atlasH } = layout;
  const key = `${occKey}|${base.name}|${base.uvScale[0]}|${layout.key}|${JSON.stringify(o)}`;
  const cached = pp.cache.get(key);
  if (cached) return { material: cached, atlasM: [atlasW, atlasH], texSize: [texW, texH], texelM: texel, ms: performance.now() - t0 };

  // --- surface maps (position + normal per AO texel): the mesh rendered in atlas space
  const aoScale = Math.min(o.aoScale ?? 0.25, 1024 / Math.max(texW, texH));
  const aoW = Math.max(16, Math.round(texW * aoScale)), aoH = Math.max(16, Math.round(texH * aoScale));
  const surfPos = device.createTexture({ size: [aoW, aoH], format: 'rgba32float', usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING, label: 'bake.surfPos' });
  const surfNrm = device.createTexture({ size: [aoW, aoH], format: 'rgba16float', usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING, label: 'bake.surfNrm' });
  const psB = dev.createBuffer(16, GPUBufferUsage.UNIFORM, 'bake.surfParams', new Float32Array([atlasW, atlasH, 0, 0]));
  const bgS = device.createBindGroup({ layout: pp.surf.getBindGroupLayout(0), entries: [{ binding: 0, resource: { buffer: psB } }] });
  // --- GPU buffers
  const sb = (data: ArrayBufferView, label: string) => dev.createBuffer(Math.max(16, data.byteLength), GPUBufferUsage.STORAGE, label, data);
  const trisB = sb(occ.tris, 'bake.tris'), startB = sb(occ.cellStart, 'bake.cellStart'), itemsB = sb(occ.cellItems, 'bake.cellItems');
  const aoB = dev.createBuffer(aoW * aoH * 4, GPUBufferUsage.STORAGE, 'bake.ao');
  const rays = o.rays ?? 32, range = o.range ?? 0.025;
  const pa = new ArrayBuffer(48);
  { const f = new Float32Array(pa), u = new Uint32Array(pa);
    f.set([occ.min[0], occ.min[1], occ.min[2], occ.cell], 0);
    u.set([occ.dims[0], occ.dims[1], occ.dims[2], rays], 4);
    f.set([range, aoW, aoH, 0.00005], 8); }
  const paB = dev.createBuffer(48, GPUBufferUsage.UNIFORM, 'bake.aoParams', new Uint8Array(pa));
  const chartData = new Float32Array(charts.length * 8);
  charts.forEach((c, i) => chartData.set([c.x, c.y, c.x + c.w, c.y + c.h, c.x - c.u0, c.y - c.v0, 0, 0], i * 8));
  const chartsB = sb(chartData, 'bake.charts');
  const pc = new Float32Array(12);
  const tiledTexel = 1 / (base.uvScale[0] * base.baseColorMap.width);   // metres per tiled texel
  const lod = Math.max(0, Math.log2(texel / tiledTexel));
  pc.set([atlasW, atlasH, texW, texH, base.uvScale[0], base.uvScale[1], lod, charts.length, aoW, aoH, o.strength ?? 1, 0.5]);
  const pcB = dev.createBuffer(48, GPUBufferUsage.UNIFORM, 'bake.composeParams', pc);
  const mk = (label: string) => device.createTexture({ size: [texW, texH], format: 'rgba8unorm', usage: GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.COPY_SRC, label });
  const sa = mk('bake.albedo.tmp'), sn = mk('bake.normal.tmp'), so = mk('bake.orm.tmp');
  const mips = mipCount(texW, texH);
  const final = (label: string, format: GPUTextureFormat) => device.createTexture({ size: [texW, texH], format, mipLevelCount: mips, usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT, label });
  const label = o.label ?? base.name;
  const albedo = final(`${label}.baked.albedo`, 'rgba8unorm-srgb'), normal = final(`${label}.baked.normal`, 'rgba8unorm'), orm = final(`${label}.baked.orm`, 'rgba8unorm');
  const bgAO = device.createBindGroup({ layout: pp.ao.getBindGroupLayout(0), entries: [
    { binding: 0, resource: { buffer: paB } }, { binding: 1, resource: { buffer: trisB } }, { binding: 2, resource: { buffer: startB } },
    { binding: 3, resource: { buffer: itemsB } }, { binding: 4, resource: surfPos.createView() }, { binding: 5, resource: surfNrm.createView() }, { binding: 6, resource: { buffer: aoB } }] });
  const bgC = device.createBindGroup({ layout: pp.compose.getBindGroupLayout(0), entries: [
    { binding: 0, resource: { buffer: pcB } }, { binding: 1, resource: { buffer: chartsB } }, { binding: 2, resource: { buffer: aoB } },
    { binding: 3, resource: renderer.textures.sampler({ address: 'repeat', filter: 'linear' }) },
    { binding: 4, resource: base.baseColorMap.createView() }, { binding: 5, resource: base.normalMap.createView() }, { binding: 6, resource: base.ormMap.createView() },
    { binding: 7, resource: sa.createView() }, { binding: 8, resource: sn.createView() }, { binding: 9, resource: so.createView() }] });
  const enc = device.createCommandEncoder({ label: `bake ${label}` });
  const rp = enc.beginRenderPass({ label: 'bake-surf', colorAttachments: [
    { view: surfPos.createView(), loadOp: 'clear', storeOp: 'store', clearValue: [0, 0, 0, 0] },
    { view: surfNrm.createView(), loadOp: 'clear', storeOp: 'store', clearValue: [0, 0, 0, 0] }] });
  rp.setPipeline(pp.surf); rp.setBindGroup(0, bgS); rp.setVertexBuffer(0, mesh.vertexBuffer); rp.setIndexBuffer(mesh.indexBuffer, 'uint32'); rp.drawIndexed(mesh.indexCount); rp.end();
  let pass = enc.beginComputePass({ label: 'bake-ao' });
  pass.setPipeline(pp.ao); pass.setBindGroup(0, bgAO); pass.dispatchWorkgroups(Math.ceil(aoW / 8), Math.ceil(aoH / 8)); pass.end();
  pass = enc.beginComputePass({ label: 'bake-compose' });
  pass.setPipeline(pp.compose); pass.setBindGroup(0, bgC); pass.dispatchWorkgroups(Math.ceil(texW / 8), Math.ceil(texH / 8)); pass.end();
  enc.copyTextureToTexture({ texture: sa }, { texture: albedo }, [texW, texH]);
  enc.copyTextureToTexture({ texture: sn }, { texture: normal }, [texW, texH]);
  enc.copyTextureToTexture({ texture: so }, { texture: orm }, [texW, texH]);
  renderer.textures.mipgen.generate(albedo, 'color', enc);
  renderer.textures.mipgen.generate(normal, 'normal', enc);
  renderer.textures.mipgen.generate(orm, 'color', enc);
  device.queue.submit([enc.finish()]);
  device.queue.onSubmittedWorkDone().then(() => { sa.destroy(); sn.destroy(); so.destroy(); surfPos.destroy(); surfNrm.destroy(); trisB.destroy(); startB.destroy(); itemsB.destroy(); aoB.destroy(); paB.destroy(); psB.destroy(); chartsB.destroy(); pcB.destroy(); });
  const material = new Material({
    name: `${base.name}-baked`, baseColorMap: albedo, normalMap: normal, ormMap: orm,
    baseColor: base.baseColor, roughness: base.roughness, metallic: base.metallic, normalScale: base.normalScale, specular: base.specular,
    occlusionStrength: base.occlusionStrength, edgeWear: base.edgeWear, edgeWearRadius: base.edgeWearRadius, emissive: base.emissive, emissiveLuminance: base.emissiveLuminance,
    uvScale: [1 / atlasW, 1 / atlasH], uvOffset: [0, 0], alphaMode: base.alphaMode, alphaCutoff: base.alphaCutoff, doubleSided: base.doubleSided,
    sampler: renderer.textures.sampler({ address: 'clamp-to-edge', filter: 'linear', anisotropy: 8 }),
  });
  pp.cache.set(key, material);
  return { material, atlasM: [atlasW, atlasH], texSize: [texW, texH], texelM: texel, ms: performance.now() - t0 };
}
