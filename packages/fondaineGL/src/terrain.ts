// Terrain: a heightfield over a rectangle, meshed on a non-uniform grid (fine inside a detail region,
// geometrically coarser outside so a square kilometre stays under a few hundred thousand triangles),
// with analytic smooth normals and a three-layer material blend. Layer weights are chosen per vertex
// from authored masks and slope / height rules, perturbed by noise where layers meet, then blended per
// pixel by the renderer's TERRAIN material path (2D-array layer textures, relief-based sharpening) so
// gravel grades into dirt and dirt into grass without a straight seam anywhere.
//
// Embankments (berms, backstops, mounds) are part of the height function — see `berm` and `mound` —
// so nothing intersects anything. Physics gets one static mesh per dominant layer (correct footstep
// and impact surfaces). Units: metres, world space (the mesh is generated in place, transform = identity).

import { FGLDevice } from './device';
import { Geometry } from './geometry';
import { Material, TerrainLayerTextures } from './material';
import { MipMode, TextureCache } from './texture';

export type HeightFn = (x: number, z: number) => number;

export interface TerrainLayer {
  /** Material whose maps (base colour, normal, ORM) and tile size feed this layer. */
  material: Material;
  /** Authored weight 0..1 at (x, z). Default 1 (slope / height rules alone decide). */
  mask?: (x: number, z: number) => number;
  /** Slope rule (degrees): full weight at or below slope[0], none at or above slope[1]; reverse the pair to favour steep ground. */
  slope?: [number, number];
  /** Height rule (m): full weight at or above height[0], none at or below height[1]; reverse the pair to favour low ground. */
  height?: [number, number];
  /** Surface id handed to physics for triangles where this layer dominates (see gameplay/surfaces SURFACE). */
  surface?: number;
}

export interface TerrainOptions {
  /** Extent (m) along x and z. */
  size: [number, number];
  /** Centre of the rectangle (world x, z). Default origin. */
  center?: [number, number];
  /** Vertex spacing (m) inside the detail region. */
  resolution: number;
  /** Region meshed at full `resolution` (world coordinates). Default: the whole terrain. */
  detail?: { minX: number; maxX: number; minZ: number; maxZ: number };
  /** Outside the detail region the spacing grows by this factor per row until `maxSpacing`. Default 1.22 / 24 m. */
  growth?: number;
  maxSpacing?: number;
  /** Height (m) at world (x, z). Compose with `berm`, `mound`, `terrainFbm`. */
  heightFn: HeightFn;
  /** 1 to 3 material layers; layer 0 is the fallback where nothing else applies. */
  layers: TerrainLayer[];
  /** Vertex-level transition noise: [world scale (m), strength in weight units]. Default [2.5, 0.35]. */
  weightNoise?: [number, number];
  /** Pixel-level relief sharpening 0..1 (see Material.blendSharpness). Default 0.75. */
  blendSharpness?: number;
  /** Pixel-level blend noise [scale (m), strength] (see Material.blendNoise). Default [1.7, 0.22]. */
  blendNoise?: [number, number];
  /** Layer texture array resolution; default the largest source map, capped at 2048. */
  textureSize?: number;
  seed?: number;
  name?: string;
}

export interface TerrainStats { vertices: number; triangles: number; buildMs: number; textureSize: number; columns: number; rows: number }

// ------------------------------------------------------------------------------------------------ noise
/** Smooth value noise in [-1, 1] (deterministic, seedable). */
export function terrainNoise(x: number, z: number, seed = 0): number {
  const h = (i: number, j: number) => { const s = Math.sin(i * 127.1 + j * 311.7 + seed * 74.7) * 43758.5453; return s - Math.floor(s); };
  const xi = Math.floor(x), zi = Math.floor(z), fx = x - xi, fz = z - zi;
  const u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
  const a = h(xi, zi), b = h(xi + 1, zi), c = h(xi, zi + 1), d = h(xi + 1, zi + 1);
  return (a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v) * 2 - 1;
}
/** Fractal noise in roughly [-1, 1]. */
export function terrainFbm(x: number, z: number, octaves = 3, seed = 0): number {
  let sum = 0, amp = 0.5, f = 1, norm = 0;
  for (let o = 0; o < octaves; o++) { sum += amp * terrainNoise(x * f + o * 17.3, z * f - o * 9.1, seed + o); norm += amp; amp *= 0.5; f *= 2.1; }
  return sum / norm;
}
const smooth01 = (t: number) => { const u = t < 0 ? 0 : t > 1 ? 1 : t; return u * u * (3 - 2 * u); };
/** 0 below `a`, 1 above `b` (or the reverse when a > b). */
export function heightRule(v: number, a: number, b: number): number { return a <= b ? smooth01((v - a) / Math.max(b - a, 1e-6)) : 1 - smooth01((v - b) / Math.max(a - b, 1e-6)); }

// ------------------------------------------------------------------------------------------------ landforms
export interface BermOptions {
  /** Crest line start and end (world x, z). Ends are rounded. */
  from: [number, number]; to: [number, number];
  /** Crest height above the base (m). */
  height: number;
  /** Flat(ish) crest width and footprint width (m). */
  crestWidth: number; baseWidth: number;
  /** Irregularity 0..1: wobbling crest, uneven slopes, a few gullies, slumped toe. Default 0.6. */
  erosion?: number;
  /** Toe apron length (m) beyond the base where the slumped soil fades out. Default 1.5. */
  toe?: number;
  seed?: number;
}
/**
 * Eroded earth embankment: smooth S-profile between crest and base (rounded crest, no hard toe), with
 * noise-driven variation along its length and a slumped toe apron. Returns a height contribution ≥ 0.
 */
export function berm(o: BermOptions): HeightFn {
  const [ax, az] = o.from, [bx, bz] = o.to;
  const dx = bx - ax, dz = bz - az, len = Math.hypot(dx, dz) || 1, ux = dx / len, uz = dz / len;
  const e = o.erosion ?? 0.6, toe = Math.max(0.01, o.toe ?? 1.5), seed = o.seed ?? 1;
  const toeH = 0.05 + 0.05 * e;
  return (x, z) => {
    const px = x - ax, pz = z - az;
    const along = Math.max(0, Math.min(len, px * ux + pz * uz));
    const cx = ax + ux * along, cz = az + uz * along;
    const lateral = Math.hypot(x - cx, z - cz);
    const baseHalf = (o.baseWidth / 2) * (1 + 0.18 * e * terrainNoise(along * 0.11 + 3.3, 0.5, seed));
    if (lateral > baseHalf + toe) return 0;
    const crestHalf = Math.min(baseHalf * 0.8, (o.crestWidth / 2) * (1 + 0.25 * e * terrainNoise(along * 0.21, 1.5, seed + 1)));
    // crest line sags and bulges a little along its length
    const h = o.height * (1 + 0.05 * e * terrainNoise(along * 0.17 + 9.1, 2.5, seed + 2));
    if (lateral >= baseHalf) {
      const v = (lateral - baseHalf) / toe;
      return h * toeH * (1 - v) * (1 - v);
    }
    const u = (baseHalf - lateral) / Math.max(baseHalf - crestHalf, 1e-3); // 0 at the base … 1 at the crest
    const s = smooth01(u);
    let y = h * (toeH + (1 - toeH) * s);
    if (e > 0 && u < 1) {
      const mid = Math.sin(Math.PI * Math.min(u, 1));
      // uneven slope face and rain gullies running down it (strongest mid-slope, fading at crest and toe)
      const face = terrainNoise(along * 0.45 + 5, lateral * 0.6, seed + 3) * 0.07;
      const g = 1 - Math.abs(terrainNoise(along * 0.9 + 2.2, 0.3, seed + 4));
      const gully = Math.max(0, g - 0.72) / 0.28 * 0.12 * smooth01((u - 0.1) / 0.5);
      y *= 1 + e * (face * mid - gully * mid);
    }
    return y;
  };
}

export interface MoundOptions { center: [number, number]; radius: number; height: number; erosion?: number; seed?: number }
/** Rounded earth mound (baffle, spoil heap). Height contribution ≥ 0. */
export function mound(o: MoundOptions): HeightFn {
  const e = o.erosion ?? 0.5, seed = o.seed ?? 7;
  return (x, z) => {
    const dx = x - o.center[0], dz = z - o.center[1];
    const ang = Math.atan2(dz, dx);
    const r = o.radius * (1 + 0.15 * e * terrainNoise(Math.cos(ang) * 2.3 + 5, Math.sin(ang) * 2.3 + 5, seed));
    const d = Math.hypot(dx, dz) / r;
    if (d >= 1) return 0;
    const s = smooth01(1 - d);
    return o.height * s * (1 + 0.08 * e * terrainNoise(dx * 0.7, dz * 0.7, seed + 1) * Math.sin(Math.PI * d));
  };
}
/** Height function that is the largest of its parts (embankments that meet or cross merge cleanly). */
export function heightMax(...fns: HeightFn[]): HeightFn { return (x, z) => { let m = -Infinity; for (const f of fns) { const v = f(x, z); if (v > m) m = v; } return m; }; }
/** Height function that is the sum of its parts. */
export function heightSum(...fns: HeightFn[]): HeightFn { return (x, z) => { let s = 0; for (const f of fns) s += f(x, z); return s; }; }
/** Soft rectangular region mask: 1 inside, fading to 0 over `feather` metres outside, with a noisy edge. */
export function regionMask(minX: number, maxX: number, minZ: number, maxZ: number, feather = 1, edgeNoise = 0.5, seed = 3): (x: number, z: number) => number {
  return (x, z) => {
    const d = Math.max(minX - x, x - maxX, minZ - z, z - maxZ); // signed distance (negative inside)
    const n = edgeNoise * feather * terrainFbm(x * 0.6 + 2.1, z * 0.6 - 4.4, 2, seed);
    return 1 - smooth01((d + n) / feather + 0.5);
  };
}

// ------------------------------------------------------------------------------------------------ mesh
/** Grid stops along one axis: uniform `res` inside [d0, d1], geometric growth outside. */
function gridStops(min: number, max: number, d0: number, d1: number, res: number, growth: number, maxSpacing: number): Float64Array {
  d0 = Math.max(min, Math.min(max, d0)); d1 = Math.max(d0, Math.min(max, d1));
  const inner: number[] = [];
  const nIn = Math.max(1, Math.round((d1 - d0) / res));
  for (let i = 0; i <= nIn; i++) inner.push(d0 + ((d1 - d0) * i) / nIn);
  const grow = (from: number, to: number): number[] => {
    // from → to (either direction), spacing growing from res; the last stop lands exactly on `to`
    const out: number[] = [];
    const dir = Math.sign(to - from);
    let p = from, sp = res;
    while (dir * (to - p) > sp * 1.5) { sp = Math.min(sp * growth, maxSpacing); p += dir * sp; out.push(p); }
    if (Math.abs(to - from) > 1e-9) out.push(to);
    return out;
  };
  const lo = grow(d0, min).reverse(), hi = grow(d1, max);
  return Float64Array.from([...lo, ...inner, ...hi]);
}

export class Terrain {
  readonly geometry: Geometry;
  /** Terrain material (layer textures + blend parameters); null when built without a renderer (tests, tools). */
  readonly material: Material | null = null;
  /** Index buffers (into `geometry`) grouped by dominant layer, for per-surface physics registration. */
  readonly layerIndices: Uint32Array[];
  readonly stats: TerrainStats;
  readonly options: TerrainOptions;
  private readonly xs: Float64Array;
  private readonly zs: Float64Array;

  /** Builds the mesh and, given a renderer (`dev` + `textures`), the GPU layer textures and material. */
  constructor(opts: TerrainOptions, renderer?: { dev: FGLDevice; textures: TextureCache } | null) {
    if (!opts.layers.length || opts.layers.length > 3) throw new Error('Terrain: 1 to 3 layers');
    this.options = opts;
    const t0 = performance.now();
    const [w, d] = opts.size, [cx, cz] = opts.center ?? [0, 0];
    const minX = cx - w / 2, maxX = cx + w / 2, minZ = cz - d / 2, maxZ = cz + d / 2;
    const det = opts.detail ?? { minX, maxX, minZ, maxZ };
    const growth = opts.growth ?? 1.22, maxSp = opts.maxSpacing ?? 24;
    this.xs = gridStops(minX, maxX, det.minX, det.maxX, opts.resolution, growth, maxSp);
    this.zs = gridStops(minZ, maxZ, det.minZ, det.maxZ, opts.resolution, growth, maxSp);
    const xs = this.xs, zs = this.zs, nx = xs.length, nz = zs.length, nv = nx * nz;
    const pos = new Float32Array(nv * 3), nrm = new Float32Array(nv * 3), uv = new Float32Array(nv * 2), tan = new Float32Array(nv * 4);
    const H = opts.heightFn;
    const wts = new Float32Array(nv * 3);
    const wtmp = [0, 0, 0];
    // heights first (one evaluation per vertex), normals from the grid's own finite differences
    const hs = new Float64Array(nv);
    for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) hs[j * nx + i] = H(xs[i], zs[j]);
    for (let j = 0; j < nz; j++) {
      const z = zs[j];
      const j0 = Math.max(0, j - 1), j1 = Math.min(nz - 1, j + 1);
      for (let i = 0; i < nx; i++) {
        const x = xs[i], v = j * nx + i;
        const i0 = Math.max(0, i - 1), i1 = Math.min(nx - 1, i + 1);
        const h = hs[v];
        let nxv = -(hs[j * nx + i1] - hs[j * nx + i0]) / (xs[i1] - xs[i0]), nyv = 1, nzv = -(hs[j1 * nx + i] - hs[j0 * nx + i]) / (zs[j1] - zs[j0]);
        const nl = Math.hypot(nxv, nyv, nzv); nxv /= nl; nyv /= nl; nzv /= nl;
        pos[v * 3] = x; pos[v * 3 + 1] = h; pos[v * 3 + 2] = z;
        nrm[v * 3] = nxv; nrm[v * 3 + 1] = nyv; nrm[v * 3 + 2] = nzv;
        // tangent along +x (world UV = (x, −z)), handedness +1
        const tx = 1 - nxv * nxv, ty = -nyv * nxv, tz = -nzv * nxv;
        const tl = Math.hypot(tx, ty, tz) || 1;
        tan[v * 4] = tx / tl; tan[v * 4 + 1] = ty / tl; tan[v * 4 + 2] = tz / tl; tan[v * 4 + 3] = 1;
        const slope = Math.acos(Math.min(1, nyv)) * (180 / Math.PI);
        this.evalWeights(x, z, h, slope, wtmp);
        wts[v * 3] = wtmp[0]; wts[v * 3 + 1] = wtmp[1]; wts[v * 3 + 2] = wtmp[2];
        uv[v * 2] = wtmp[1]; uv[v * 2 + 1] = wtmp[2];
      }
    }
    // triangles: split each cell along the diagonal with the smaller height difference (clean ridges)
    const nq = (nx - 1) * (nz - 1);
    const idx = new Uint32Array(nq * 6);
    const perLayer: number[][] = opts.layers.map(() => []);
    let k = 0;
    const dominant = (a: number, b: number, c: number) => {
      let best = 0, bw = -1;
      for (let l = 0; l < opts.layers.length; l++) { const s = wts[a * 3 + l] + wts[b * 3 + l] + wts[c * 3 + l]; if (s > bw) { bw = s; best = l; } }
      return best;
    };
    const tri = (a: number, b: number, c: number) => { idx[k++] = a; idx[k++] = b; idx[k++] = c; perLayer[dominant(a, b, c)].push(a, b, c); };
    for (let j = 0; j < nz - 1; j++) {
      for (let i = 0; i < nx - 1; i++) {
        const a = j * nx + i, b = a + 1, c = a + nx + 1, dd = a + nx; // a: (i,j) b: (i+1,j) c: (i+1,j+1) d: (i,j+1)
        const dac = Math.abs(pos[a * 3 + 1] - pos[c * 3 + 1]), dbd = Math.abs(pos[b * 3 + 1] - pos[dd * 3 + 1]);
        // counter-clockwise seen from +y: +x to the right, +z towards the viewer
        if (dac <= dbd) { tri(a, c, b); tri(a, dd, c); } else { tri(a, dd, b); tri(b, dd, c); }
      }
    }
    const g = new Geometry(pos, nrm, uv, idx);
    g.tangents = tan;
    this.geometry = g;
    this.layerIndices = perLayer.map((l) => Uint32Array.from(l));
    const buildMs = performance.now() - t0;
    this.stats = { vertices: nv, triangles: nq * 2, buildMs, textureSize: 0, columns: nx, rows: nz };
    if (!renderer) return;
    // ---- GPU: layer texture arrays + material
    const texSize = buildLayerTextures(renderer, opts.layers, opts.textureSize);
    this.stats.textureSize = texSize.size;
    const scale = (m: Material) => m.uvScale[0];
    const L = opts.layers;
    this.material = new Material({
      name: opts.name ?? 'terrain',
      terrain: true,
      layerTextures: texSize.textures,
      layerScale: [scale(L[0].material), scale(L[Math.min(1, L.length - 1)].material), scale(L[Math.min(2, L.length - 1)].material)],
      blendSharpness: opts.blendSharpness ?? 0.75,
      blendNoise: opts.blendNoise ?? [1.7, 0.22],
      baseColor: [1, 1, 1, 1], roughness: 1, metallic: 1, occlusionStrength: 1,
    });
  }

  /** Layer weights at (x, z) exactly as the vertices get them (sum to 1). */
  weights(x: number, z: number, out: number[] = [0, 0, 0]): number[] {
    const h = this.options.heightFn(x, z);
    const e = 0.25;
    const sx = (this.options.heightFn(x + e, z) - h) / e, sz = (this.options.heightFn(x, z + e) - h) / e;
    const slope = Math.atan(Math.hypot(sx, sz)) * (180 / Math.PI);
    return this.evalWeights(x, z, h, slope, out);
  }

  private evalWeights(x: number, z: number, h: number, slopeDeg: number, out: number[]): number[] {
    const L = this.options.layers;
    const [nScale, nStr] = this.options.weightNoise ?? [2.5, 0.35];
    const seed = this.options.seed ?? 11;
    let sum = 0, mx = 0;
    for (let l = 0; l < 3; l++) {
      const layer = L[l];
      if (!layer) { out[l] = 0; continue; }
      let wv = layer.mask ? layer.mask(x, z) : 1;
      if (wv > 0 && layer.slope) wv *= heightRule(slopeDeg, layer.slope[1], layer.slope[0]);
      if (wv > 0 && layer.height) wv *= heightRule(h, layer.height[1], layer.height[0]);
      wv = Math.max(0, wv);
      out[l] = wv; sum += wv; if (wv > mx) mx = wv;
    }
    if (sum <= 1e-6) { out[0] = 1; out[1] = 0; out[2] = 0; return out; }
    for (let l = 0; l < 3; l++) out[l] /= sum;
    // transition noise only where layers already meet
    const mixed = Math.max(0, Math.min(1, 2 * (1 - mx / sum)));
    if (mixed > 0 && nStr > 0 && L.length > 1) {
      const n1 = terrainFbm(x / nScale, z / nScale, 2, seed), n2 = terrainFbm(x / (nScale * 0.47) + 7.7, z / (nScale * 0.47) - 2.3, 2, seed + 5);
      const k = nStr * mixed;
      out[0] += (-n1 - 0.5 * n2) * k; out[1] += (n1 - 0.5 * n2) * k; out[2] += L.length > 2 ? n2 * k : 0;
      let s2 = 0;
      for (let l = 0; l < 3; l++) { out[l] = Math.max(0, out[l]); s2 += out[l]; }
      for (let l = 0; l < 3; l++) out[l] /= s2 || 1;
    }
    return out;
  }

  /** Terrain height at (x, z) (the height function; the mesh interpolates it linearly between vertices). */
  height(x: number, z: number): number { return this.options.heightFn(x, z); }

  /** Unit surface normal at (x, z). */
  normal(x: number, z: number, out: [number, number, number] = [0, 1, 0]): [number, number, number] {
    const e = 0.25, H = this.options.heightFn, h = H(x, z);
    let nx = -(H(x + e, z) - h) / e, nz = -(H(x, z + e) - h) / e;
    const l = Math.hypot(nx, 1, nz); nx /= l; nz /= l;
    out[0] = nx; out[1] = 1 / l; out[2] = nz;
    return out;
  }

  /** Registers one static mesh per dominant layer with the physics world (`surface` per layer, default 0). */
  addToPhysics(world: { addStaticMesh(positions: ArrayLike<number>, indices: ArrayLike<number>, material: number): number }): number[] {
    return this.layerIndices.map((ix, l) => (ix.length ? world.addStaticMesh(this.geometry.positions, ix, this.options.layers[l].surface ?? 0) : -1));
  }
}

// ------------------------------------------------------------------------------------------------ layer textures
const BLIT_WGSL = /* wgsl */ `
@group(0) @binding(0) var src: texture_2d<f32>;
@group(0) @binding(1) var samp: sampler;
struct VO { @builtin(position) pos: vec4f, @location(0) uv: vec2f };
@vertex fn vs(@builtin(vertex_index) i: u32) -> VO {
  let p = vec2f(f32((i << 1u) & 2u), f32(i & 2u));
  var o: VO;
  o.pos = vec4f(p * 2.0 - 1.0, 0.0, 1.0);
  o.uv = vec2f(p.x, 1.0 - p.y);
  return o;
}
@fragment fn fs(i: VO) -> @location(0) vec4f { return textureSampleLevel(src, samp, i.uv, 0.0); }
`;
const blitPipelines = new WeakMap<FGLDevice, Map<GPUTextureFormat, GPURenderPipeline>>();

/**
 * Packs the layers' maps into three 2D-array textures (albedo sRGB, normal, ORM), resampling each source
 * to a common size (mip-selected so downsampling does not alias) and regenerating mips. Missing maps use
 * the renderer's defaults so a layer may be a plain colour.
 */
export function buildLayerTextures(renderer: { dev: FGLDevice; textures: TextureCache }, layers: TerrainLayer[], sizeOpt?: number): { textures: TerrainLayerTextures; size: number } {
  const dev = renderer.dev, d = dev.device, T = renderer.textures;
  let size = 0;
  for (const l of layers) for (const t of [l.material.baseColorMap, l.material.normalMap, l.material.ormMap]) if (t) size = Math.max(size, t.width);
  size = Math.min(sizeOpt ?? 2048, Math.max(size, 4));
  const mips = Math.floor(Math.log2(size)) + 1;
  let pipes = blitPipelines.get(dev);
  if (!pipes) { pipes = new Map(); blitPipelines.set(dev, pipes); }
  const module = dev.shader(BLIT_WGSL, 'terrain-blit');
  const sampler = d.createSampler({ minFilter: 'linear', magFilter: 'linear', addressModeU: 'clamp-to-edge', addressModeV: 'clamp-to-edge' });
  const pipe = (format: GPUTextureFormat) => {
    let p = pipes!.get(format);
    if (!p) {
      p = d.createRenderPipeline({ label: `terrain-blit ${format}`, layout: 'auto', vertex: { module, entryPoint: 'vs' }, fragment: { module, entryPoint: 'fs', targets: [{ format }] }, primitive: { topology: 'triangle-list' } });
      pipes!.set(format, p);
    }
    return p;
  };
  const enc = d.createCommandEncoder({ label: 'terrain layers' });
  const pack = (pick: (m: Material) => GPUTexture | null, fallback: GPUTexture, format: GPUTextureFormat, mode: MipMode, label: string): GPUTexture => {
    const arr = d.createTexture({ size: [size, size, 3], format, mipLevelCount: mips, usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_DST, label });
    const p = pipe(format);
    for (let l = 0; l < 3; l++) {
      const src = pick(layers[Math.min(l, layers.length - 1)].material) ?? fallback;
      // sample the source mip closest to the destination size (box-filtered downsampling for free)
      const lvl = Math.max(0, Math.min(src.mipLevelCount - 1, Math.floor(Math.log2(Math.max(1, src.width / size)))));
      const bg = d.createBindGroup({ layout: p.getBindGroupLayout(0), entries: [{ binding: 0, resource: src.createView({ dimension: '2d', baseMipLevel: lvl, mipLevelCount: 1, baseArrayLayer: 0, arrayLayerCount: 1 }) }, { binding: 1, resource: sampler }] });
      const pass = enc.beginRenderPass({ colorAttachments: [{ view: arr.createView({ dimension: '2d', baseMipLevel: 0, mipLevelCount: 1, baseArrayLayer: l, arrayLayerCount: 1 }), loadOp: 'clear', storeOp: 'store', clearValue: [0, 0, 0, 1] }] });
      pass.setPipeline(p); pass.setBindGroup(0, bg); pass.draw(3); pass.end();
    }
    T.mipgen.generate(arr, mode, enc);
    return arr;
  };
  const albedo = pack((m) => m.baseColorMap, T.white, 'rgba8unorm-srgb', 'color', 'terrain.albedo');
  const normal = pack((m) => m.normalMap, T.flatNormal, 'rgba8unorm', 'normal', 'terrain.normal');
  // a layer without an ORM map is a rough dielectric (AO 1, roughness 1, metallic 0)
  const orm = pack((m) => m.ormMap, T.solid([255, 255, 0, 255], 'rgba8unorm', 'terrain.orm.default'), 'rgba8unorm', 'color', 'terrain.orm');
  d.queue.submit([enc.finish()]);
  return { textures: { albedo, normal, orm }, size };
}
