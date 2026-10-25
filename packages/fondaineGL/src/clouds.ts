// Volumetric clouds. A planet-curved slab (base altitude + thickness) is ray-marched into a low-resolution
// "cloud dome" texture (paraboloid map of the upper hemisphere: direction → texel, independent of camera
// rotation so no reprojection is needed; only a fraction of the texels is refreshed each frame and blended
// temporally). The sky pass composites the dome over the atmosphere per pixel; a second compute pass projects
// the slab's sun transmittance into a 2D cloud-shadow map sampled by surface shading; a third composites the
// clouds into the environment cube that feeds IBL/SH so ambient light darkens and whitens under cloud.
//
// Model (Schneider/Hillaire "Nubis"-style): Perlin-Worley base shape (3D, GPU generated), Worley erosion
// detail, cloud type → vertical density profile, 2D weather field (coverage / flat coverage / type) that games
// can paint into with `addCloud`. Lighting: Beer-Lambert extinction, dual-lobe Henyey-Greenstein, Wrenninge
// multi-scattering octaves, powder term, sky/ground ambient from the atmosphere cube. Everything is in
// absolute photometric units (sun lux in, cd/m² out) like the rest of the renderer.

import { FGLDevice } from './device';
import { TextureCache } from './texture';

export type CloudMode = 'volumetric' | 'flat';
export type CloudQuality = 'auto' | 'low' | 'medium' | 'high';

export interface CloudSettings {
  enabled: boolean;
  /** How the global coverage is rendered: ray-marched volumes or the cheap 2D layer. */
  mode: CloudMode;
  /** Dome resolution / march steps. 'auto' = high on a GPU, low on a software adapter (headless captures). */
  quality: CloudQuality;
  /** Fraction of sky covered (scattered ≈ 0.3–0.5, broken ≈ 0.6–0.85, overcast 1). */
  coverage: number;
  /** Cloud type: 0 flat stratus / stratocumulus … 1 towering cumulus. */
  type: number;
  /** Extinction coefficient of a fully dense cloud (1/km). Real cumulus ≈ 20–80. */
  density: number;
  /** Cloud base altitude above sea level (m). */
  altitude: number;
  /** Slab thickness (m). Tops of type-1 clouds reach altitude + thickness. */
  thickness: number;
  /** Weather feature size (m): the size of individual cloud systems / gaps. */
  featureScale: number;
  /** Base shape noise tile (m). */
  shapeScale: number;
  /** Erosion detail noise tile (m). */
  detailScale: number;
  /** Wind at cloud level / ground wind speed (clouds drift faster than the surface wind). */
  windFactor: number;
  /** Extra clockwise veer of the wind at cloud level (deg, Ekman spiral ≈ 20–40). */
  windVeer: number;
  /** How much a thick cloud dims direct sunlight on the ground (1 = physical). */
  shadowStrength: number;
  /** Multiplier on the sky/ground ambient scattered by the clouds (1 ≈ physical). */
  ambient: number;
  /** Multiple-scattering energy boost (1 = single scattering octaves only). */
  multiScatter: number;
  /** Scattering albedo of the droplets (0.9–1). */
  albedo: number;
}

export const defaultClouds: CloudSettings = {
  enabled: true,
  mode: 'volumetric',
  quality: 'auto',
  coverage: 0.45,
  type: 0.55,
  density: 32,
  altitude: 1500,
  thickness: 1900,
  featureScale: 7000,
  shapeScale: 5200,
  detailScale: 520,
  windFactor: 2.5,
  windVeer: 25,
  shadowStrength: 1,
  ambient: 1,
  multiScatter: 1.6,
  albedo: 0.97,
};

export interface CloudBlobOptions {
  /** World position (x, [y], z); y is ignored — the cloud sits in the slab. */
  position: ArrayLike<number>;
  /** Radius (m). */
  size?: number;
  /** Peak coverage inside the blob (0..1). */
  density?: number;
  /** Rendering style of this cloud; defaults to the global mode. */
  mode?: CloudMode;
  /** Cloud type (0 stratus … 1 cumulus); defaults to the global type. */
  type?: number;
}

export interface CloudHandle {
  readonly id: number;
  /** Change the blob (same options as addCloud). */
  set(o: Partial<CloudBlobOptions>): void;
  remove(): void;
}

interface Blob { id: number; x: number; z: number; size: number; density: number; mode: CloudMode; type: number }

interface QualityPreset { dome: number; steps: number; lightSteps: number; updateDiv: number; shadow: number; shadowSteps: number; baseNoise: number; detailNoise: number }
const QUALITY: Record<Exclude<CloudQuality, 'auto'>, QualityPreset> = {
  low: { dome: 256, steps: 40, lightSteps: 3, updateDiv: 2, shadow: 192, shadowSteps: 8, baseNoise: 64, detailNoise: 32 },
  medium: { dome: 384, steps: 64, lightSteps: 5, updateDiv: 4, shadow: 384, shadowSteps: 16, baseNoise: 128, detailNoise: 32 },
  high: { dome: 640, steps: 96, lightSteps: 6, updateDiv: 4, shadow: 512, shadowSteps: 24, baseNoise: 128, detailNoise: 32 },
};

const MAX_BLOBS = 64;
const WEATHER_SIZE = 512;
/** Weather field period (m): the field tiles beyond this, far past the visible horizon haze. */
const WEATHER_EXTENT = 48000;
/** Cloud shadow map half extent around the camera (m). */
const SHADOW_HALF = 3600;
/** Paraboloid map radius: covers directions down to y ≈ -0.18 (planet-curved horizon from any altitude). */
const DOME_R = 1.2;
const CUBE_SIZE = 128;

/** Software WebGPU adapters (SwiftShader, lavapipe) get the low preset in 'auto'. */
function isSoftwareAdapter(adapter: GPUAdapter): boolean {
  const info = (adapter as unknown as { info?: GPUAdapterInfo }).info;
  const s = `${info?.vendor ?? ''} ${info?.architecture ?? ''} ${info?.device ?? ''} ${info?.description ?? ''}`.toLowerCase();
  return /swiftshader|lavapipe|llvmpipe|software/.test(s) || !!(adapter as unknown as { isFallbackAdapter?: boolean }).isFallbackAdapter;
}

// ------------------------------------------------------------------------------------------------- WGSL
const WGSL_NOISE = /* wgsl */ `
fn hash33(p: vec3f) -> vec3f {
  var q = fract(p * vec3f(0.1031, 0.1030, 0.0973));
  q += dot(q, q.yxz + 33.33);
  return fract((q.xxy + q.yxx) * q.zyx);
}
fn hash21(p: vec2f) -> f32 {
  var q = fract(vec3f(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}
fn modv3(p: vec3f, period: f32) -> vec3f { return p - period * floor(p / period); }
fn modv2(p: vec2f, period: f32) -> vec2f { return p - period * floor(p / period); }
fn remap(v: f32, lo: f32, hi: f32, nlo: f32, nhi: f32) -> f32 { return nlo + (v - lo) * (nhi - nlo) / max(hi - lo, 1e-5); }
fn remapc(v: f32, lo: f32, hi: f32, nlo: f32, nhi: f32) -> f32 { return clamp(remap(v, lo, hi, nlo, nhi), min(nlo, nhi), max(nlo, nhi)); }

/// Tileable 3D gradient (Perlin) noise, period in cells. Range ≈ [-0.9, 0.9].
fn perlin3(x: vec3f, period: f32) -> f32 {
  let i = floor(x);
  let f = fract(x);
  let u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  var s = array<f32, 8>();
  for (var c = 0u; c < 8u; c++) {
    let o = vec3f(f32(c & 1u), f32((c >> 1u) & 1u), f32((c >> 2u) & 1u));
    let g = normalize(hash33(modv3(i + o, period)) * 2.0 - 1.0 + vec3f(1e-4));
    s[c] = dot(g, f - o);
  }
  let x0 = mix(mix(s[0], s[1], u.x), mix(s[2], s[3], u.x), u.y);
  let x1 = mix(mix(s[4], s[5], u.x), mix(s[6], s[7], u.x), u.y);
  return mix(x0, x1, u.z);
}
/// Tileable 3D Worley (cellular) noise, inverted so cell centres are 1: billowy cloud puffs.
fn worley3(x: vec3f, period: f32) -> f32 {
  let i = floor(x);
  let f = fract(x);
  var md = 1e9;
  for (var dz = -1; dz <= 1; dz++) {
    for (var dy = -1; dy <= 1; dy++) {
      for (var dx = -1; dx <= 1; dx++) {
        let c = vec3f(f32(dx), f32(dy), f32(dz));
        let o = hash33(modv3(i + c, period));
        let d = c + o - f;
        md = min(md, dot(d, d));
      }
    }
  }
  return saturate(1.0 - sqrt(md));
}
/// Tileable 2D value noise.
fn vnoise2(x: vec2f, period: f32) -> f32 {
  let i = floor(x);
  let f = fract(x);
  let u = f * f * (3.0 - 2.0 * f);
  let a = hash21(modv2(i, period));
  let b = hash21(modv2(i + vec2f(1.0, 0.0), period));
  let c = hash21(modv2(i + vec2f(0.0, 1.0), period));
  let d = hash21(modv2(i + vec2f(1.0, 1.0), period));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
fn fbm2(p: vec2f, period: f32, octaves: i32) -> f32 {
  var v = 0.0;
  var a = 0.5;
  var norm = 0.0;
  var q = p;
  var per = period;
  for (var o = 0; o < 8; o++) {
    if (o >= octaves) { break; }
    v += a * vnoise2(q, per);
    norm += a;
    q = q * 2.0 + vec2f(13.7, 7.1);
    per *= 2.0;
    a *= 0.5;
  }
  return v / norm;
}
`;

/** Base shape: R = Perlin-Worley, GBA = Worley at rising frequencies. */
const BASE_NOISE_WGSL = WGSL_NOISE + /* wgsl */ `
struct P { size: vec4f };
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var outTex: texture_storage_3d<rgba8unorm, write>;
@compute @workgroup_size(4, 4, 4)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let n = u32(U.size.x);
  if (id.x >= n || id.y >= n || id.z >= n) { return; }
  let p = (vec3f(id) + 0.5) / f32(n);
  let fs = U.size.y; // frequency scale (1 at 128³)
  let f0 = 4.0 * fs;
  var pf = perlin3(p * f0, f0) * 0.5 + perlin3(p * f0 * 2.0, f0 * 2.0) * 0.25 + perlin3(p * f0 * 4.0, f0 * 4.0) * 0.125;
  pf = saturate(pf * 0.78 / 0.875 + 0.5);
  let w0 = worley3(p * f0, f0);
  let w1 = worley3(p * f0 * 2.0, f0 * 2.0);
  let w2 = worley3(p * f0 * 4.0, f0 * 4.0);
  let wfbm = w0 * 0.625 + w1 * 0.25 + w2 * 0.125;
  let pw = remapc(pf, 0.0, 1.0, wfbm, 1.0);
  let g = worley3(p * f0 * 2.0 + 17.0, f0 * 2.0);
  let b = worley3(p * f0 * 4.0 + 31.0, f0 * 4.0);
  let a = worley3(p * f0 * 8.0 + 47.0, f0 * 8.0);
  textureStore(outTex, vec3i(id), vec4f(pw, g, b, a));
}
`;

/** Erosion detail: three Worley octaves. */
const DETAIL_NOISE_WGSL = WGSL_NOISE + /* wgsl */ `
struct P { size: vec4f };
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var outTex: texture_storage_3d<rgba8unorm, write>;
@compute @workgroup_size(4, 4, 4)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let n = u32(U.size.x);
  if (id.x >= n || id.y >= n || id.z >= n) { return; }
  let p = (vec3f(id) + 0.5) / f32(n);
  let r = worley3(p * 4.0 + 3.0, 4.0);
  let g = worley3(p * 8.0 + 5.0, 8.0);
  let b = worley3(p * 16.0 + 9.0, 16.0);
  textureStore(outTex, vec3i(id), vec4f(r, g, b, 1.0));
}
`;

/** Weather field: R volumetric coverage, G flat-layer coverage, B cloud type, A unused. Tiles over WEATHER_EXTENT. */
const WEATHER_WGSL = WGSL_NOISE + /* wgsl */ `
struct P {
  params: vec4f,   // coverage, type, feature scale (m), mode flag (0 volumetric, 1 flat)
  size: vec4f,     // texture size, extent (m), blob count, seed
};
struct Blob { a: vec4f, b: vec4f };   // a = x, z (weather space, m), radius, density; b = mode, type, 0, 0
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var<storage, read> blobs: array<Blob>;
@group(0) @binding(2) var outTex: texture_storage_2d<rgba8unorm, write>;
@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let n = u32(U.size.x);
  if (id.x >= n || id.y >= n) { return; }
  let uv = (vec2f(id.xy) + 0.5) / f32(n);
  let extent = U.size.y;
  let xz = (uv - 0.5) * extent;
  // feature-scale periodic noise (period = whole field)
  let cells = max(2.0, round(extent / max(U.params.z, 500.0)));
  let n1 = fbm2(uv * cells + U.size.w, cells, 5);
  let n2 = fbm2(uv * cells * 0.7 + 41.0 + U.size.w, cells * 0.7, 4);
  let cov = U.params.x;
  // value noise fbm sits around 0.5 ± 0.15: threshold so that coverage ≈ covered fraction
  let th = mix(0.74, 0.22, cov);
  var c = saturate((n1 - th) / 0.26);
  c = c * c * (3.0 - 2.0 * c);
  // wider systems grow a denser core: cumulus congestus in the middle, wisps at the rim
  c = saturate(c * (0.85 + 0.3 * cov));
  var volCov = select(c, 0.0, U.params.w > 0.5);
  var flatCov = select(0.0, c, U.params.w > 0.5);
  var ctype = saturate(U.params.y + (n2 - 0.5) * 0.6);
  let count = i32(U.size.z);
  for (var i = 0; i < count; i++) {
    let bl = blobs[i];
    var d = xz - bl.a.xy;
    d -= extent * round(d / extent);
    let r = max(bl.a.z, 50.0);
    let dist = length(d) / r;
    let edgeNoise = 0.75 + 0.5 * fbm2(uv * cells * 3.0 + 7.0, cells * 3.0, 3);
    let shape = smoothstep(1.0, 0.2, dist * edgeNoise);
    let bc = bl.a.w * shape;
    if (bc <= 0.001) { continue; }
    if (bl.b.x > 0.5) { flatCov = max(flatCov, bc); } else { volCov = max(volCov, bc); }
    ctype = mix(ctype, bl.b.y, saturate(bc * 2.0));
  }
  textureStore(outTex, vec2i(id.xy), vec4f(volCov, flatCov, ctype, 1.0));
}
`;

/** Shared uniform + density model for the dome march and the shadow projection. */
const WGSL_CLOUD_COMMON = WGSL_NOISE + /* wgsl */ `
struct CloudU {
  camPos: vec4f,     // xyz world, w = time (s)
  sunDir: vec4f,     // xyz towards the sun, w = sky luminance scale
  sunL: vec4f,       // rgb sun illuminance at cloud altitude (lux), w = albedo
  layer: vec4f,      // base altitude (m), thickness (m), shape tile (m), detail tile (m)
  params: vec4f,     // extinction (1/m), coverage multiplier, type bias, mode (0 vol, 1 flat)
  wind: vec4f,       // drift x, z (m), detail drift x, z (m)
  weather: vec4f,    // 1/extent, flat altitude (m), flat detail scale (m), flat optical depth
  dome: vec4f,       // dome size (px), map radius, blend alpha, frame
  quality: vec4f,    // steps, light steps, max distance (m), update divisor
  atmo: vec4f,       // rayleigh mult, turbidity, multi-scatter boost, ambient mult
  shadow: vec4f,     // shadow centre x, z, 1/(2·half extent), shadow steps
  misc: vec4f,       // bayer offset x, y, cube size, enabled
};
@group(0) @binding(0) var<uniform> U: CloudU;
@group(0) @binding(1) var baseNoise: texture_3d<f32>;
@group(0) @binding(2) var detailNoise: texture_3d<f32>;
@group(0) @binding(3) var weatherTex: texture_2d<f32>;
@group(0) @binding(4) var sampRepeat: sampler;
@group(0) @binding(5) var skyCube: texture_cube<f32>;
@group(0) @binding(6) var sampClamp: sampler;

const PI: f32 = 3.14159265359;
const RG: f32 = 6360e3;

fn sphereEnter(o: vec3f, d: vec3f, r: f32) -> f32 {
  let b = dot(o, d);
  let c = dot(o, o) - r * r;
  let disc = b * b - c;
  if (disc < 0.0) { return -1.0; }
  return -b - sqrt(disc);
}
fn sphereExit(o: vec3f, d: vec3f, r: f32) -> f32 {
  let b = dot(o, d);
  let c = dot(o, o) - r * r;
  let disc = b * b - c;
  if (disc < 0.0) { return -1.0; }
  return -b + sqrt(disc);
}
fn phaseHG(c: f32, g: f32) -> f32 {
  let g2 = g * g;
  return (1.0 - g2) / (4.0 * PI * pow(max(1.0 + g2 - 2.0 * g * c, 1e-4), 1.5));
}
/// Dual-lobe droplet phase: strong forward peak (silver lining) + mild back-scatter (glory side).
fn phaseCloud(c: f32, g: f32) -> f32 { return mix(phaseHG(c, g), phaseHG(c, -0.25 * g), 0.3); }

fn weatherAt(xz: vec2f) -> vec3f {
  let uv = (xz + U.wind.xy) * U.weather.x + 0.5;
  return textureSampleLevel(weatherTex, sampRepeat, uv, 0.0).rgb;
}
/// Vertical density profile for a cloud type: stratus hug the base, cumulus tower with rounded tops.
fn heightGradient(h: f32, ctype: f32) -> f32 {
  let top = mix(0.28, 1.0, ctype);
  let bottom = smoothstep(0.0, 0.08, h);
  let upper = 1.0 - smoothstep(top * 0.5, top, h);
  // stratus: flat, dense all the way across; cumulus: densest in the lower-middle
  let bulge = mix(1.0, 1.0 - 0.35 * smoothstep(0.2, top, h), ctype);
  return bottom * upper * bulge;
}
/// Cloud density (0..1) at world p with slab height fraction h. cheap = base shape only (no erosion).
fn cloudDensity(p: vec3f, h: f32, cov: f32, ctype: f32, cheap: bool) -> f32 {
  // wind shear: tops lag behind the bases
  let shear = vec3f(h * U.layer.y * 0.18, 0.0, h * U.layer.y * 0.08);
  let pb = (p + vec3f(U.wind.x, 0.0, U.wind.y) + shear) / U.layer.z;
  let b = textureSampleLevel(baseNoise, sampRepeat, pb, 0.0);
  let lowFbm = b.g * 0.625 + b.b * 0.25 + b.a * 0.125;
  var shape = remapc(b.r, lowFbm - 1.0, 1.0, 0.0, 1.0);
  shape *= heightGradient(h, ctype);
  // coverage: thin the shape at the edges of a cloud system
  let c = saturate(cov);
  shape = remapc(shape, 1.0 - c, 1.0, 0.0, 1.0) * c;
  if (cheap || shape <= 0.0) { return shape; }
  let pd = (p + vec3f(U.wind.z, 0.0, U.wind.w)) / U.layer.w;
  let d = textureSampleLevel(detailNoise, sampRepeat, pd, 0.0).rgb;
  let hf = d.r * 0.625 + d.g * 0.25 + d.b * 0.125;
  // wispy at the base, billowy (inverted worley) higher up
  let hfMod = mix(hf, 1.0 - hf, saturate(h * 8.0));
  shape = remapc(shape, hfMod * 0.38, 1.0, 0.0, 1.0);
  return saturate(shape);
}
fn slabHeight(p: vec3f) -> f32 {
  let r = length(p + vec3f(0.0, RG, 0.0)) - RG;
  return (r - U.layer.x) / U.layer.y;
}
/// Optical depth towards the sun from p (light march with growing steps; base shape only).
fn sunOpticalDepth(p: vec3f, cov: f32, ctype: f32) -> f32 {
  let n = i32(U.quality.y);
  let thick = U.layer.y;
  let ls = thick * 0.75 / f32(n);
  var tau = 0.0;
  var t = 0.0;
  for (var i = 0; i < n; i++) {
    let step = ls * (0.6 + 0.8 * f32(i));
    t += step * 0.5;
    let q = p + U.sunDir.xyz * t;
    let h = slabHeight(q);
    if (h < 0.0 || h > 1.0) { t += step * 0.5; continue; }
    let w = weatherAt(q.xz);
    tau += cloudDensity(q, h, w.r * U.params.y, w.b, i > 0) * step;
    t += step * 0.5;
  }
  // distant occlusion by the rest of the slab
  let far = p + U.sunDir.xyz * thick * 2.2;
  let hf = slabHeight(far);
  if (hf > 0.0 && hf < 1.0) { let w = weatherAt(far.xz); tau += cloudDensity(far, hf, w.r * U.params.y, w.b, true) * thick * 0.5; }
  return tau * U.params.x;
}
/// 2D detail for the flat layer (old-style deck).
fn flatDensity(xz: vec2f) -> f32 {
  let w = weatherAt(xz).g;
  if (w <= 0.002) { return 0.0; }
  let s = U.weather.z;
  var p = (xz + U.wind.xy) / s;
  var v = 0.0;
  var a = 0.5;
  var norm = 0.0;
  for (var o = 0; o < 6; o++) {
    v += a * vnoise2(p, 1e6);
    norm += a;
    p = mat2x2f(1.6, 1.2, -1.2, 1.6) * p + vec2f(7.3, -3.1);
    a *= 0.5;
  }
  v /= norm;
  return saturate((v - (1.0 - w)) / max(w * 0.6, 1e-3));
}
`;

/** Dome march: writes (premultiplied cloud radiance cd/m², transmittance) per direction texel. */
const DOME_WGSL = WGSL_CLOUD_COMMON + /* wgsl */ `
@group(0) @binding(7) var domeOut: texture_storage_2d<rgba16float, write>;
@group(0) @binding(8) var domePrev: texture_2d<f32>;

fn ign(p: vec2f, f: f32) -> f32 {
  let q = p + 5.588238 * (f % 64.0);
  return fract(52.9829189 * fract(0.06711056 * q.x + 0.00583715 * q.y));
}
fn dirFromDome(uv: vec2f) -> vec3f {
  let p = (uv - 0.5) * 2.0 * U.dome.y;
  let q = dot(p, p);
  let y = (1.0 - q) / (1.0 + q);
  return normalize(vec3f(p.x * (1.0 + y), y, p.y * (1.0 + y)));
}

/// Old-style 2D deck at the slab middle for the flat weather channel. Returns (L, T).
fn flatLayer(o: vec3f, dir: vec3f, cosA: f32, skyDir: vec3f, skyUp: vec3f) -> vec4f {
  if (dir.y <= 0.004) { return vec4f(0.0, 0.0, 0.0, 1.0); }
  let alt = U.weather.y;
  let t = (alt - o.y) / dir.y;
  if (t <= 0.0) { return vec4f(0.0, 0.0, 0.0, 1.0); }
  let p = o.xz + dir.xz * t;
  let d = flatDensity(p);
  if (d <= 0.001) { return vec4f(0.0, 0.0, 0.0, 1.0); }
  let tau = d * U.weather.w * (1.0 + 2.0 / max(dir.y, 0.08));
  let alpha = 1.0 - exp(-tau);
  let sp = p + U.sunDir.xz / max(U.sunDir.y, 0.15) * U.weather.z * 0.35;
  let selfShadow = exp(-flatDensity(sp) * U.weather.w * 2.5);
  let powder = 1.0 - exp(-tau * 2.0);
  let ph = phaseCloud(cosA, 0.7);
  let sunL = U.sunL.rgb * ((1.0 / PI) * 0.5 * powder * (0.35 + 0.65 * selfShadow) * U.atmo.z + ph * 0.8 * selfShadow);
  let amb = skyUp * U.atmo.w * 0.9;
  let cl = sunL + amb * (0.6 + 0.4 * (1.0 - d));
  let fade = exp(-t / 45000.0);
  let a = alpha * fade;
  return vec4f(mix(skyDir * a, cl * a, fade), 1.0 - a);
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let size = u32(U.dome.x);
  let div = u32(U.quality.w);
  let px = id.xy * div + vec2u(U.misc.xy);
  if (px.x >= size || px.y >= size) { return; }
  let uv = (vec2f(px) + 0.5) / f32(size);
  let pm = (uv - 0.5) * 2.0 * U.dome.y;
  if (dot(pm, pm) > U.dome.y * U.dome.y || U.misc.w < 0.5) { textureStore(domeOut, vec2i(px), vec4f(0.0, 0.0, 0.0, 1.0)); return; }
  let dir = dirFromDome(uv);
  let o = U.camPos.xyz;
  let oc = o + vec3f(0.0, RG, 0.0);          // planet-centred
  let rIn = RG + U.layer.x;
  let rOut = rIn + U.layer.y;
  let skyDir = textureSampleLevel(skyCube, sampClamp, dir, 1.0).rgb * U.sunDir.w;
  let skyUp = textureSampleLevel(skyCube, sampClamp, vec3f(0.0, 1.0, 0.0), 4.0).rgb * U.sunDir.w;
  let skyHoriz = textureSampleLevel(skyCube, sampClamp, normalize(vec3f(dir.x, 0.08, dir.z) + vec3f(1e-3, 0.0, 0.0)), 3.0).rgb * U.sunDir.w;
  let groundL = textureSampleLevel(skyCube, sampClamp, vec3f(0.0, -1.0, 0.0), 4.0).rgb * U.sunDir.w;
  let cosA = dot(dir, U.sunDir.xyz);
  var L = vec3f(0.0);
  var T = 1.0;
  // ground hit: no cloud
  let tGround = sphereEnter(oc, dir, RG);
  let hitsGround = tGround > 0.0;
  var tStart = -1.0;
  var tEnd = -1.0;
  let rc = length(oc);
  if (rc < rIn) {
    tStart = sphereExit(oc, dir, rIn);
    tEnd = sphereExit(oc, dir, rOut);
  } else if (rc < rOut) {
    tStart = 0.0;
    let dIn = sphereEnter(oc, dir, rIn);
    tEnd = select(sphereExit(oc, dir, rOut), dIn, dIn > 0.0);
  } else {
    tStart = sphereEnter(oc, dir, rOut);
    let dIn = sphereEnter(oc, dir, rIn);
    tEnd = select(sphereExit(oc, dir, rOut), dIn, dIn > 0.0);
  }
  var domeL = vec3f(0.0);
  var domeT = 1.0;
  // the volumetric channel is always marched: in flat mode it only holds painted volumetric clouds
  if (!hitsGround && tStart >= 0.0 && tEnd > tStart) {
    let maxDist = U.quality.z;
    tEnd = min(tEnd, tStart + maxDist);
    let steps = i32(U.quality.x);
    let pathLen = tEnd - tStart;
    let jitter = ign(vec2f(px), U.dome.w);
    let ext = U.params.x;
    let albedo = U.sunL.w;
    var tw = 0.0;
    var wsum = 0.0;
    var zeroRun = 0;
    var prevT = tStart;
    for (var i = 0; i < steps; i++) {
      let x0 = (f32(i) + jitter) / f32(steps);
      let x1 = (f32(i) + 1.0 + jitter) / f32(steps);
      let ta = tStart + pathLen * pow(x0, 1.35);
      let tb = tStart + pathLen * pow(min(x1, 1.0), 1.35);
      let dt = max(tb - ta, 1.0);
      let t = ta;
      let p = o + dir * t;
      let h = slabHeight(p);
      if (h < 0.0 || h > 1.0) { continue; }
      let w = weatherAt(p.xz);
      let cov = w.r * U.params.y;
      if (cov <= 0.01) { continue; }
      let dens = cloudDensity(p, h, cov, w.b, false);
      if (dens <= 0.0005) { continue; }
      let sigma = dens * ext;
      let tauSun = sunOpticalDepth(p, cov, w.b);
      // multiple-scattering octaves (Wrenninge): each octave softer, less attenuated, more isotropic
      // (the user boost stands in for the diffuse higher orders only: it must not scale the forward peak)
      var scatt = 0.0;
      var a = 1.0; var b = 1.0; var g = 0.78;
      for (var n = 0; n < 3; n++) {
        scatt += a * exp(-b * tauSun) * phaseCloud(cosA, g) * select(U.atmo.z, 1.0, n == 0);
        a *= 0.5; b *= 0.5; g *= 0.6;
      }
      // powder: multiple-scattering darkening of crevices on the lit side (sun behind the viewer)
      let powder = mix(1.0, 1.0 - 0.6 * exp(-2.0 * sigma * dt * 6.0 - tauSun * 0.5), saturate(-cosA) * 0.7 + 0.15);
      let sun = U.sunL.rgb * scatt * powder;
      // ambient: sky from above (tops), horizon sky + lit ground from below (bases), shadowed by cloud above
      let occUp = exp(-tauSun * 0.15 - (1.0 - h) * 1.2 * dens);
      let amb = (skyUp * mix(0.35, 1.0, h) * occUp + (skyHoriz * 0.5 + groundL * 0.55) * mix(0.75, 0.2, h) * exp(-dens * h * 1.5)) * U.atmo.w;
      let S = (sun + amb) * sigma * albedo;
      let Tstep = exp(-sigma * dt);
      let Sint = (S - S * Tstep) / sigma;
      L += T * Sint;
      let contrib = T * (1.0 - Tstep);
      tw += t * contrib; wsum += contrib;
      T *= Tstep;
      if (T < 0.008) { break; }
    }
    // aerial perspective: the air between us and the cloud both dims it and adds haze in its place
    if (wsum > 0.0) {
      let tMean = tw / wsum;
      let od = (vec3f(5.802e-6, 13.558e-6, 33.1e-6) * U.atmo.x * 0.72 + vec3f(4.4e-6 * U.atmo.y * 0.4)) * tMean;
      let Ta = exp(-od);
      let blocked = 1.0 - T;
      domeL = L * Ta + skyDir * blocked * (1.0 - Ta);
      domeT = T;
    }
  }
  // flat deck (global flat mode or flat blobs) composited behind the volumes
  let fl = flatLayer(o, dir, cosA, skyDir, skyUp);
  if (fl.a < 1.0 && !hitsGround) {
    domeL += domeT * fl.rgb;
    domeT *= fl.a;
  }
  // rgba16float: keep below half-float range (a thin cloud in front of the sun is blinding anyway)
  var cur = vec4f(min(domeL, vec3f(6.0e4)), domeT);
  let prev = textureLoad(domePrev, vec2i(px), 0);
  let alpha = U.dome.z;
  let outv = mix(prev, cur, alpha);
  textureStore(domeOut, vec2i(px), outv);
}
`;

/** Sun transmittance through the slab, parameterised over the slab-base plane around the camera. */
const SHADOW_WGSL = WGSL_CLOUD_COMMON + /* wgsl */ `
@group(0) @binding(7) var shadowOut: texture_storage_2d<rgba8unorm, write>;
@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let size = u32(U.misc.z);
  if (id.x >= size || id.y >= size) { return; }
  if (U.misc.w < 0.5 || U.sunDir.y <= 0.01) { textureStore(shadowOut, vec2i(id.xy), vec4f(1.0)); return; }
  let uv = (vec2f(id.xy) + 0.5) / f32(size);
  let half = 0.5 / U.shadow.z;
  let xz = U.shadow.xy + (uv - 0.5) * 2.0 * half;
  let s = U.sunDir.xyz;
  let p0 = vec3f(xz.x, U.layer.x, xz.y);
  let n = i32(U.shadow.w);
  let len = U.layer.y / max(s.y, 0.25);
  let dl = len / f32(n);
  var tau = 0.0;
  for (var i = 0; i < n; i++) {
    let p = p0 + s * ((f32(i) + 0.5) * dl);
    let h = slabHeight(p);
    if (h < 0.0 || h > 1.0) { continue; }
    let w = weatherAt(p.xz);
    let cov = w.r * U.params.y;
    if (cov <= 0.01) { continue; }
    tau += cloudDensity(p, h, cov, w.b, i % 2 == 1) * dl;
  }
  tau *= U.params.x;
  // flat deck
  let tf = (U.weather.y - U.layer.x) / max(s.y, 0.05);
  let fp = xz + s.xz * tf;
  tau += flatDensity(fp) * U.weather.w * 3.0;
  textureStore(shadowOut, vec2i(id.xy), vec4f(exp(-tau), 0.0, 0.0, 1.0));
}
`;

/** Composite the dome over the clear atmosphere cube → environment cube for IBL / SH. */
const COMPOSITE_WGSL = /* wgsl */ `
struct P { params: vec4f };  // cube size, dome radius, 0, 0
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var skyCube: texture_cube<f32>;
@group(0) @binding(2) var dome: texture_2d<f32>;
@group(0) @binding(3) var samp: sampler;
@group(0) @binding(4) var outCube: texture_storage_2d_array<rgba16float, write>;
fn faceDir(face: u32, uv: vec2f) -> vec3f {
  let a = uv * 2.0 - 1.0;
  switch (face) {
    case 0u: { return normalize(vec3f(1.0, -a.y, -a.x)); }
    case 1u: { return normalize(vec3f(-1.0, -a.y, a.x)); }
    case 2u: { return normalize(vec3f(a.x, 1.0, a.y)); }
    case 3u: { return normalize(vec3f(a.x, -1.0, -a.y)); }
    case 4u: { return normalize(vec3f(a.x, -a.y, 1.0)); }
    default: { return normalize(vec3f(-a.x, -a.y, -1.0)); }
  }
}
@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let size = u32(U.params.x);
  if (id.x >= size || id.y >= size) { return; }
  let uv = (vec2f(id.xy) + 0.5) / f32(size);
  let dir = faceDir(id.z, uv);
  var L = textureSampleLevel(skyCube, samp, dir, 0.0).rgb;
  let p = dir.xz / (1.0 + max(dir.y, -0.3));
  if (dot(p, p) < U.params.y * U.params.y) {
    let c = textureSampleLevel(dome, samp, p / U.params.y * 0.5 + 0.5, 0.0);
    L = L * c.a + c.rgb;
  }
  textureStore(outCube, vec2i(id.xy), i32(id.z), vec4f(min(L, vec3f(6.0e4)), 1.0));
}
`;

// ------------------------------------------------------------------------------------------------- class
export interface CloudFrameInput {
  camPos: ArrayLike<number>;
  dt: number;
  /** Towards the sun. */
  sunDir: ArrayLike<number>;
  /** Sun illuminance (lux, linear RGB) at cloud altitude. */
  sunRGB: ArrayLike<number>;
  rayleigh: number;
  turbidity: number;
  /** Changes whenever the atmosphere/sun changed (forces a full dome refresh). */
  skyKey: string;
  /** Wind at cloud altitude (m/s, x and z). */
  windAloft: ArrayLike<number>;
}

/**
 * Volumetric cloud system. Owned by `Sky` (`sky.clouds`), driven once per frame by the renderer.
 * Textures it exposes to the frame bind group: `dome` (direction → premultiplied radiance + transmittance)
 * and `shadow` (sun transmittance over the slab-base plane around the camera).
 */
export class Clouds {
  readonly settings: CloudSettings = { ...defaultClouds };
  /** Cloud dome: rgb = premultiplied cloud radiance (cd/m²), a = transmittance. Paraboloid map (see domeUV). */
  dome!: GPUTexture;
  /** Sun transmittance through the clouds, parameterised over the slab base around the camera. */
  shadow!: GPUTexture;
  /** Bumped whenever `dome` / `shadow` are recreated (bind groups holding them must be rebuilt). */
  resourceVersion = 0;
  /** Mapping radius of the dome (frame uniform). */
  readonly domeRadius = DOME_R;

  private dev: FGLDevice;
  private tex: TextureCache;
  private skyCube: GPUTexture;
  private preset!: QualityPreset;
  private presetName: Exclude<CloudQuality, 'auto'> | '' = '';
  private baseNoise!: GPUTexture;
  private detailNoise!: GPUTexture;
  private weather: GPUTexture;
  private domeWork!: GPUTexture;
  private ubuf: GPUBuffer;
  private blobBuf: GPUBuffer;
  private weatherU: GPUBuffer;
  private compU: GPUBuffer;
  private pipeBase: GPUComputePipeline;
  private pipeDetail: GPUComputePipeline;
  private pipeWeather: GPUComputePipeline;
  private pipeDome: GPUComputePipeline;
  private pipeShadow: GPUComputePipeline;
  private pipeComposite: GPUComputePipeline;
  private bgDome: GPUBindGroup | null = null;
  private bgShadow: GPUBindGroup | null = null;
  private bgWeather: GPUBindGroup;
  private sampRepeat: GPUSampler;
  private sampClamp: GPUSampler;
  private blobs: Blob[] = [];
  private blobId = 1;
  private blobsDirty = true;
  private weatherKey = '';
  private domeKey = '';
  private frame = 0;
  private sinceComposite = 1e9;
  private drift = [0, 0];
  private lastCam = [0, 100, 0];
  private software: boolean;
  private u = new Float32Array(48);

  constructor(dev: FGLDevice, tex: TextureCache, skyCube: GPUTexture) {
    this.dev = dev;
    this.tex = tex;
    this.skyCube = skyCube;
    this.software = isSoftwareAdapter(dev.adapter);
    const d = dev.device;
    const cp = (code: string, label: string) => d.createComputePipeline({ label, layout: 'auto', compute: { module: dev.shader(code, label), entryPoint: 'main' } });
    this.pipeBase = cp(BASE_NOISE_WGSL, 'clouds.noise.base');
    this.pipeDetail = cp(DETAIL_NOISE_WGSL, 'clouds.noise.detail');
    this.pipeWeather = cp(WEATHER_WGSL, 'clouds.weather');
    // explicit layouts: the shadow shader does not reference every shared binding ('auto' would drop them)
    const C = GPUShaderStage.COMPUTE;
    const commonEntries: GPUBindGroupLayoutEntry[] = [
      { binding: 0, visibility: C, buffer: { type: 'uniform' } },
      { binding: 1, visibility: C, texture: { viewDimension: '3d' } },
      { binding: 2, visibility: C, texture: { viewDimension: '3d' } },
      { binding: 3, visibility: C, texture: {} },
      { binding: 4, visibility: C, sampler: {} },
      { binding: 5, visibility: C, texture: { viewDimension: 'cube' } },
      { binding: 6, visibility: C, sampler: {} },
    ];
    const domeLayout = d.createBindGroupLayout({ label: 'clouds.dome', entries: [...commonEntries,
      { binding: 7, visibility: C, storageTexture: { format: 'rgba16float', access: 'write-only' } },
      { binding: 8, visibility: C, texture: {} }] });
    const shadowLayout = d.createBindGroupLayout({ label: 'clouds.shadow', entries: [...commonEntries,
      { binding: 7, visibility: C, storageTexture: { format: 'rgba8unorm', access: 'write-only' } }] });
    const cpl = (code: string, label: string, bgl: GPUBindGroupLayout) => d.createComputePipeline({ label, layout: d.createPipelineLayout({ bindGroupLayouts: [bgl] }), compute: { module: dev.shader(code, label), entryPoint: 'main' } });
    this.pipeDome = cpl(DOME_WGSL, 'clouds.dome', domeLayout);
    this.pipeShadow = cpl(SHADOW_WGSL, 'clouds.shadow', shadowLayout);
    this.pipeComposite = cp(COMPOSITE_WGSL, 'clouds.composite');
    this.ubuf = dev.createBuffer(48 * 4, GPUBufferUsage.UNIFORM, 'clouds.u');
    this.weatherU = dev.createBuffer(32, GPUBufferUsage.UNIFORM, 'clouds.weather.u');
    this.compU = dev.createBuffer(16, GPUBufferUsage.UNIFORM, 'clouds.composite.u');
    this.blobBuf = dev.createBuffer(MAX_BLOBS * 32, GPUBufferUsage.STORAGE, 'clouds.blobs');
    this.sampRepeat = d.createSampler({ magFilter: 'linear', minFilter: 'linear', addressModeU: 'repeat', addressModeV: 'repeat', addressModeW: 'repeat' });
    this.sampClamp = d.createSampler({ magFilter: 'linear', minFilter: 'linear', mipmapFilter: 'linear', addressModeU: 'clamp-to-edge', addressModeV: 'clamp-to-edge', addressModeW: 'clamp-to-edge' });
    this.weather = d.createTexture({ size: [WEATHER_SIZE, WEATHER_SIZE], format: 'rgba8unorm', usage: GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.TEXTURE_BINDING, label: 'clouds.weather' });
    this.bgWeather = d.createBindGroup({
      layout: this.pipeWeather.getBindGroupLayout(0),
      entries: [{ binding: 0, resource: { buffer: this.weatherU } }, { binding: 1, resource: { buffer: this.blobBuf } }, { binding: 2, resource: this.weather.createView() }],
    });
    this.ensureResources();
  }

  /** Effective quality preset name after resolving 'auto'. */
  get qualityPreset(): Exclude<CloudQuality, 'auto'> {
    const q = this.settings.quality;
    if (q !== 'auto') return q;
    return this.software ? 'low' : 'high';
  }

  /** Current cloud drift (m) of the weather/shape fields (what the wind has blown so far). */
  get driftXZ(): [number, number] { return [this.drift[0], this.drift[1]]; }

  // ----------------------------------------------------------------------------------------- weather API
  /**
   * Paint an individual cloud into the weather field at a world position. It drifts with the wind from
   * then on. `mode: 'flat'` draws it as the cheap 2D deck instead of a ray-marched volume.
   */
  addCloud(o: CloudBlobOptions): CloudHandle {
    const b: Blob = {
      id: this.blobId++,
      x: o.position[0] + this.drift[0], z: o.position[o.position.length >= 3 ? 2 : 1] + this.drift[1],
      size: o.size ?? 900, density: o.density ?? 1, mode: o.mode ?? this.settings.mode, type: o.type ?? this.settings.type,
    };
    if (this.blobs.length >= MAX_BLOBS) this.blobs.shift();
    this.blobs.push(b);
    this.blobsDirty = true;
    const self = this;
    return {
      id: b.id,
      set(n) {
        if (n.position) { b.x = n.position[0] + self.drift[0]; b.z = n.position[n.position.length >= 3 ? 2 : 1] + self.drift[1]; }
        if (n.size !== undefined) b.size = n.size;
        if (n.density !== undefined) b.density = n.density;
        if (n.mode) b.mode = n.mode;
        if (n.type !== undefined) b.type = n.type;
        self.blobsDirty = true;
      },
      remove() { const i = self.blobs.indexOf(b); if (i >= 0) { self.blobs.splice(i, 1); self.blobsDirty = true; } },
    };
  }
  /** Remove every painted cloud. */
  clearClouds() { this.blobs.length = 0; this.blobsDirty = true; }
  get cloudCount() { return this.blobs.length; }

  // ----------------------------------------------------------------------------------------- resources
  private ensureResources() {
    const name = this.qualityPreset;
    if (name === this.presetName) return;
    this.presetName = name;
    const q = (this.preset = QUALITY[name]);
    const d = this.dev.device;
    this.baseNoise?.destroy(); this.detailNoise?.destroy(); this.dome?.destroy(); this.domeWork?.destroy(); this.shadow?.destroy();
    const n3 = (size: number, label: string) => d.createTexture({ size: [size, size, size], dimension: '3d', format: 'rgba8unorm', usage: GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.TEXTURE_BINDING, label });
    this.baseNoise = n3(q.baseNoise, 'clouds.noise.base');
    this.detailNoise = n3(q.detailNoise, 'clouds.noise.detail');
    this.dome = d.createTexture({ size: [q.dome, q.dome], format: 'rgba16float', usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST, label: 'clouds.dome' });
    this.domeWork = d.createTexture({ size: [q.dome, q.dome], format: 'rgba16float', usage: GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.COPY_SRC, label: 'clouds.dome.work' });
    this.shadow = d.createTexture({ size: [q.shadow, q.shadow], format: 'rgba8unorm', usage: GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.TEXTURE_BINDING, label: 'clouds.shadow' });
    this.generateNoise();
    const common = (pipe: GPUComputePipeline, extra: GPUBindGroupEntry[]) => d.createBindGroup({
      layout: pipe.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this.ubuf } },
        { binding: 1, resource: this.baseNoise.createView() },
        { binding: 2, resource: this.detailNoise.createView() },
        { binding: 3, resource: this.weather.createView() },
        { binding: 4, resource: this.sampRepeat },
        { binding: 5, resource: this.skyCube.createView({ dimension: 'cube' }) },
        { binding: 6, resource: this.sampClamp },
        ...extra,
      ],
    });
    this.bgDome = common(this.pipeDome, [{ binding: 7, resource: this.domeWork.createView() }, { binding: 8, resource: this.dome.createView() }]);
    this.bgShadow = common(this.pipeShadow, [{ binding: 7, resource: this.shadow.createView() }]);
    this.domeKey = '';
    this.resourceVersion++;
  }

  /** Generates the tileable 3D noise textures (once per quality preset; a few ms on a GPU). */
  private generateNoise() {
    const d = this.dev.device;
    const q = this.preset;
    const enc = d.createCommandEncoder({ label: 'clouds.noise' });
    const pass = enc.beginComputePass();
    const run = (pipe: GPUComputePipeline, tex: GPUTexture, size: number, freqScale: number, label: string) => {
      const ub = this.dev.createBuffer(16, GPUBufferUsage.UNIFORM, label, new Float32Array([size, freqScale, 0, 0]));
      pass.setPipeline(pipe);
      pass.setBindGroup(0, d.createBindGroup({ layout: pipe.getBindGroupLayout(0), entries: [{ binding: 0, resource: { buffer: ub } }, { binding: 1, resource: tex.createView() }] }));
      const g = Math.ceil(size / 4);
      pass.dispatchWorkgroups(g, g, g);
    };
    run(this.pipeBase, this.baseNoise, q.baseNoise, q.baseNoise / 128, 'clouds.noise.base.u');
    run(this.pipeDetail, this.detailNoise, q.detailNoise, 1, 'clouds.noise.detail.u');
    pass.end();
    d.queue.submit([enc.finish()]);
  }

  private updateWeather(enc: GPUCommandEncoder) {
    const s = this.settings;
    const key = `${s.coverage}|${s.type}|${s.featureScale}|${s.mode}|${this.blobs.length}`;
    if (!this.blobsDirty && key === this.weatherKey) return false;
    this.weatherKey = key;
    this.blobsDirty = false;
    const d = this.dev.device;
    const data = new Float32Array(MAX_BLOBS * 8);
    this.blobs.forEach((b, i) => data.set([b.x, b.z, b.size, b.density, b.mode === 'flat' ? 1 : 0, b.type, 0, 0], i * 8));
    d.queue.writeBuffer(this.blobBuf, 0, data);
    d.queue.writeBuffer(this.weatherU, 0, new Float32Array([s.coverage, s.type, s.featureScale, s.mode === 'flat' ? 1 : 0, WEATHER_SIZE, WEATHER_EXTENT, this.blobs.length, 7.0]));
    const pass = enc.beginComputePass({ label: 'clouds.weather' });
    pass.setPipeline(this.pipeWeather);
    pass.setBindGroup(0, this.bgWeather);
    pass.dispatchWorkgroups(Math.ceil(WEATHER_SIZE / 8), Math.ceil(WEATHER_SIZE / 8));
    pass.end();
    return true;
  }

  /** Values for the frame uniform `cloud` / `cloud2` (shadow lookup + dome mapping), 8 floats. */
  frameParams(): number[] {
    const s = this.settings;
    const [cx, cz] = this.shadowCentre(this.lastCam, this.lastSun);
    const edgeT = 1 - 0.55 * s.coverage * Math.min(1, s.density / 25);
    return [cx, cz, 1 / (2 * SHADOW_HALF), s.enabled ? 1 : 0, edgeT, s.altitude, s.shadowStrength, DOME_R];
  }
  private lastSun = [0, 1, 0];
  private shadowCentre(cam: ArrayLike<number>, sun: ArrayLike<number>): [number, number] {
    const sy = Math.max(sun[1], 0.05);
    const t = (this.settings.altitude - cam[1]) / sy;
    return [cam[0] + sun[0] * t, cam[2] + sun[2] * t];
  }

  // ----------------------------------------------------------------------------------------- per frame
  /**
   * Advance drift, refresh weather / dome / shadow. Returns true when the environment cube should be
   * re-composited (sun or clouds changed, or periodically as the clouds drift).
   */
  update(enc: GPUCommandEncoder, f: CloudFrameInput): boolean {
    const s = this.settings;
    this.ensureResources();
    const q = this.preset;
    const d = this.dev.device;
    this.lastCam = [f.camPos[0], f.camPos[1], f.camPos[2]];
    this.lastSun = [f.sunDir[0], f.sunDir[1], f.sunDir[2]];
    this.drift[0] += f.windAloft[0] * f.dt;
    this.drift[1] += f.windAloft[1] * f.dt;
    // keep the drift bounded (fields are periodic over the weather extent)
    for (let i = 0; i < 2; i++) this.drift[i] = ((this.drift[i] % WEATHER_EXTENT) + WEATHER_EXTENT) % WEATHER_EXTENT;
    const weatherChanged = this.updateWeather(enc);
    const key = JSON.stringify([s.enabled, s.mode, s.density, s.altitude, s.thickness, s.shapeScale, s.detailScale, s.shadowStrength, s.ambient, s.multiScatter, s.albedo, f.skyKey, f.rayleigh, f.turbidity]) + (weatherChanged ? `|${this.frame}` : '');
    const dirty = key !== this.domeKey;
    this.domeKey = key;
    const div = dirty ? 1 : q.updateDiv;
    const slot = this.frame % (div * div);
    const [ox, oy] = div === 1 ? [0, 0] : div === 2 ? BAYER2[slot] : BAYER4[slot];
    const [cx, cz] = this.shadowCentre(f.camPos, f.sunDir);
    const u = this.u;
    const flatAlt = s.altitude + s.thickness * 0.5;
    u.set([f.camPos[0], f.camPos[1], f.camPos[2], this.frame / 60], 0);
    u.set([f.sunDir[0], f.sunDir[1], f.sunDir[2], 1], 4);
    u.set([f.sunRGB[0], f.sunRGB[1], f.sunRGB[2], s.albedo], 8);
    u.set([s.altitude, s.thickness, s.shapeScale * (q.baseNoise / 128), s.detailScale], 12);
    u.set([s.density / 1000, 1, s.type, s.mode === 'flat' ? 1 : 0], 16);
    u.set([this.drift[0], this.drift[1], this.drift[0] * 1.25 + this.frame * 0.15, this.drift[1] * 1.25 + this.frame * 0.07], 20);
    u.set([1 / WEATHER_EXTENT, flatAlt, s.shapeScale * 0.5, s.density * s.thickness * 0.5 / 1000 * 0.12], 24);
    u.set([q.dome, DOME_R, dirty ? 1 : 0.55, this.frame], 28);
    u.set([q.steps, q.lightSteps, 60000, div], 32);
    u.set([f.rayleigh, f.turbidity, s.multiScatter, s.ambient], 36);
    u.set([cx, cz, 1 / (2 * SHADOW_HALF), q.shadowSteps], 40);
    u.set([ox, oy, q.shadow, s.enabled ? 1 : 0], 44);
    d.queue.writeBuffer(this.ubuf, 0, u);

    const pass = enc.beginComputePass({ label: 'clouds' });
    pass.setPipeline(this.pipeDome);
    pass.setBindGroup(0, this.bgDome!);
    const g = Math.ceil(q.dome / div / 8);
    pass.dispatchWorkgroups(g, g);
    pass.setPipeline(this.pipeShadow);
    pass.setBindGroup(0, this.bgShadow!);
    pass.dispatchWorkgroups(Math.ceil(q.shadow / 8), Math.ceil(q.shadow / 8));
    pass.end();
    // the dome is read (previous frame) and written (work) in the same pass; publish the result
    enc.copyTextureToTexture({ texture: this.domeWork }, { texture: this.dome }, [q.dome, q.dome]);
    this.frame++;
    this.sinceComposite++;
    // environment (IBL) refresh: on change, then every ~5 s as the clouds drift (cheap: 128² cube + prefilter)
    const refresh = dirty || this.sinceComposite > 300;
    if (refresh) this.sinceComposite = 0;
    return refresh;
  }

  /** Composite clouds over the clear-sky cube into `outCube` (mip 0; caller generates mips). */
  compositeEnv(enc: GPUCommandEncoder, outCube: GPUTexture) {
    const d = this.dev.device;
    d.queue.writeBuffer(this.compU, 0, new Float32Array([CUBE_SIZE, DOME_R, 0, 0]));
    const pass = enc.beginComputePass({ label: 'clouds.composite' });
    pass.setPipeline(this.pipeComposite);
    pass.setBindGroup(0, d.createBindGroup({
      layout: this.pipeComposite.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this.compU } },
        { binding: 1, resource: this.skyCube.createView({ dimension: 'cube' }) },
        { binding: 2, resource: this.dome.createView() },
        { binding: 3, resource: this.sampClamp },
        { binding: 4, resource: outCube.createView({ dimension: '2d-array', baseMipLevel: 0, mipLevelCount: 1 }) },
      ],
    }));
    pass.dispatchWorkgroups(Math.ceil(CUBE_SIZE / 8), Math.ceil(CUBE_SIZE / 8), 6);
    pass.end();
  }
}

export const CLOUD_ENV_CUBE_SIZE = CUBE_SIZE;
const BAYER2: [number, number][] = [[0, 0], [1, 1], [1, 0], [0, 1]];
const BAYER4: [number, number][] = [[0, 0], [2, 2], [2, 0], [0, 2], [1, 1], [3, 3], [3, 1], [1, 3], [1, 0], [3, 2], [3, 0], [1, 2], [0, 1], [2, 3], [2, 1], [0, 3]];
