// Physically based sky: single-scattering Rayleigh + Mie + ozone atmosphere (Nishita, with Bruneton/
// Hillaire coefficients), rendered into an HDR cube map in absolute luminance (cd/m²) for a sun of given
// top-of-atmosphere illuminance. The same model runs on the CPU to give the sun's transmitted colour.

import { FGLDevice, mipCount } from './device';
import { TextureCache } from './texture';
import { Clouds, CloudBlobOptions, CloudHandle } from './clouds';

export interface SkySettings {
  /** Sun elevation above horizon (degrees). */
  sunElevation: number;
  /** Sun azimuth (degrees, 0 = -Z/north, 90 = +X/east). */
  sunAzimuth: number;
  /** Extraterrestrial solar illuminance (lux). Real value ≈ 128 000. */
  sunIlluminance: number;
  /** Sun angular diameter (degrees). Real ≈ 0.53. Larger = softer shadows. */
  sunAngularDiameter: number;
  /** Mie (aerosol/haze) density multiplier: 0.5 = very clear, 1 = average, 3+ = hazy. */
  turbidity: number;
  /** Rayleigh density multiplier (1 = Earth). */
  rayleigh: number;
  /** Ozone multiplier (1 = Earth). Gives the blue hour / twilight tint. */
  ozone: number;
  /** Mie asymmetry g. */
  mieG: number;
  /** Average ground albedo seen in the lower hemisphere of the environment. */
  groundAlbedo: number;
  /** Observer altitude above sea level (m). */
  altitude: number;
  /** Approximate multiple-scattering boost of the single-scattering result. */
  multiScatter: number;
}

export const defaultSky: SkySettings = {
  sunElevation: 38,
  sunAzimuth: 130,
  sunIlluminance: 128000,
  sunAngularDiameter: 0.53,
  turbidity: 1.0,
  rayleigh: 1.0,
  ozone: 1.0,
  mieG: 0.8,
  groundAlbedo: 0.18,
  altitude: 100,
  multiScatter: 1.25,
};

const R_GROUND = 6360e3;
const R_TOP = 6460e3;
const BETA_R = [5.802e-6, 13.558e-6, 33.1e-6];
const BETA_M_S = 3.996e-6;
const BETA_M_EXT = 4.4e-6;
const BETA_O = [0.65e-6, 1.881e-6, 0.085e-6];
const H_R = 8000;
const H_M = 1200;

export function sunDirection(s: SkySettings): [number, number, number] {
  const el = (s.sunElevation * Math.PI) / 180, az = (s.sunAzimuth * Math.PI) / 180;
  return [Math.cos(el) * Math.sin(az), Math.sin(el), -Math.cos(el) * Math.cos(az)];
}

function raySphereExit(oy: number, dy: number, dxz: number, r: number): number {
  // ray from (0, oy, 0) dir (dxz, dy) in 2D; |o + t d| = r
  const b = oy * dy;
  const c = oy * oy - r * r;
  const disc = b * b - c;
  if (disc < 0) return -1;
  void dxz;
  return -b + Math.sqrt(disc);
}

/** Transmittance of the atmosphere from the observer towards the sun (linear RGB). */
export function sunTransmittance(s: SkySettings): [number, number, number] {
  const d = sunDirection(s);
  const y0 = R_GROUND + s.altitude;
  // horizon / below-horizon: compute along the actual ray, which may clip the Earth
  const tEarth = (() => {
    const b = y0 * d[1], c = y0 * y0 - R_GROUND * R_GROUND, disc = b * b - c;
    if (disc < 0) return -1;
    const t = -b - Math.sqrt(disc);
    return t > 0 ? t : -1;
  })();
  if (tEarth > 0) return [0, 0, 0];
  const tMax = raySphereExit(y0, d[1], 0, R_TOP);
  const N = 64;
  const dt = tMax / N;
  let odR = 0, odM = 0, odO = 0;
  for (let i = 0; i < N; i++) {
    const t = (i + 0.5) * dt;
    const px = d[0] * t, py = y0 + d[1] * t, pz = d[2] * t;
    const h = Math.hypot(px, py, pz) - R_GROUND;
    odR += Math.exp(-h / H_R) * dt;
    odM += Math.exp(-h / H_M) * dt;
    odO += Math.max(0, 1 - Math.abs(h - 25000) / 15000) * dt;
  }
  return [0, 1, 2].map((c) => Math.exp(-(BETA_R[c] * s.rayleigh * odR + BETA_M_EXT * s.turbidity * odM + BETA_O[c] * s.ozone * odO))) as [number, number, number];
}

const SKY_WGSL = /* wgsl */ `
struct SkyU {
  sunDir: vec4f,       // xyz, w = sun illuminance (lux)
  coeffs: vec4f,       // rayleigh mult, mie mult, ozone mult, mie g
  ground: vec4f,       // albedo, altitude, multi scatter, size
  sunGround: vec4f,    // rgb = ground illuminance (lux, sun+sky approx)
};
@group(0) @binding(0) var<uniform> U: SkyU;
@group(0) @binding(1) var outCube: texture_storage_2d_array<rgba16float, write>;

const PI: f32 = 3.14159265359;
const RG: f32 = 6360e3;
const RT: f32 = 6460e3;
const BR: vec3f = vec3f(5.802e-6, 13.558e-6, 33.1e-6);
const BMS: f32 = 3.996e-6;
const BME: f32 = 4.4e-6;
const BO: vec3f = vec3f(0.65e-6, 1.881e-6, 0.085e-6);

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
fn sphereExit(o: vec3f, d: vec3f, r: f32) -> f32 {
  let b = dot(o, d);
  let c = dot(o, o) - r * r;
  let disc = b * b - c;
  if (disc < 0.0) { return -1.0; }
  return -b + sqrt(disc);
}
fn sphereEnter(o: vec3f, d: vec3f, r: f32) -> f32 {
  let b = dot(o, d);
  let c = dot(o, o) - r * r;
  let disc = b * b - c;
  if (disc < 0.0) { return -1.0; }
  return -b - sqrt(disc);
}
fn densities(p: vec3f) -> vec3f {
  let h = max(length(p) - RG, 0.0);
  return vec3f(exp(-h / 8000.0), exp(-h / 1200.0), max(0.0, 1.0 - abs(h - 25000.0) / 15000.0));
}
fn extinction(d: vec3f) -> vec3f {
  return BR * U.coeffs.x * d.x + vec3f(BME * U.coeffs.y * d.y) + BO * U.coeffs.z * d.z;
}
fn transmittanceToSun(p: vec3f, s: vec3f) -> vec3f {
  if (sphereEnter(p, s, RG) > 0.0) { return vec3f(0.0); }
  let tMax = sphereExit(p, s, RT);
  let n = 12;
  let dt = tMax / f32(n);
  var od = vec3f(0.0);
  for (var i = 0; i < n; i++) {
    od += extinction(densities(p + s * ((f32(i) + 0.5) * dt))) * dt;
  }
  return exp(-od);
}
fn phaseR(c: f32) -> f32 { return 3.0 / (16.0 * PI) * (1.0 + c * c); }
fn phaseM(c: f32, g: f32) -> f32 {
  // Cornette-Shanks
  let g2 = g * g;
  return 3.0 / (8.0 * PI) * ((1.0 - g2) * (1.0 + c * c)) / ((2.0 + g2) * pow(max(1.0 + g2 - 2.0 * g * c, 1e-4), 1.5));
}

fn skyRadiance(dir: vec3f) -> vec3f {
  let o = vec3f(0.0, RG + U.ground.y, 0.0);
  let s = U.sunDir.xyz;
  let tGround = sphereEnter(o, dir, RG);
  let hitGround = tGround > 0.0;
  let tMax = select(sphereExit(o, dir, RT), tGround, hitGround);
  let n = 32;
  let dt = tMax / f32(n);
  var od = vec3f(0.0);
  var inR = vec3f(0.0);
  var inM = vec3f(0.0);
  for (var i = 0; i < n; i++) {
    let p = o + dir * ((f32(i) + 0.5) * dt);
    let d = densities(p);
    let ext = extinction(d) * dt;
    let tv = exp(-(od + ext * 0.5));
    let ts = transmittanceToSun(p, s);
    inR += tv * ts * d.x * dt;
    inM += tv * ts * d.y * dt;
    od += ext;
  }
  let c = dot(dir, s);
  let E = U.sunDir.w;
  var L = E * (inR * BR * U.coeffs.x * phaseR(c) + inM * BMS * U.coeffs.y * phaseM(c, U.coeffs.w));
  L *= U.ground.z; // multiple-scattering approximation
  if (hitGround) {
    // Lambertian ground lit by (transmitted) sun + sky, attenuated back to the observer
    let groundL = U.ground.x / PI * U.sunGround.rgb;
    L += groundL * exp(-od);
  }
  return L;
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let size = u32(U.ground.w);
  if (id.x >= size || id.y >= size) { return; }
  let uv = (vec2f(id.xy) + 0.5) / f32(size);
  let dir = faceDir(id.z, uv);
  let L = skyRadiance(dir);
  textureStore(outCube, vec2i(id.xy), i32(id.z), vec4f(min(L, vec3f(6.0e4)), 1.0));
}
`;

/** Per-frame inputs the sky needs for its clouds (camera, time step, wind aloft). */
export interface SkyFrameInput {
  camPos: ArrayLike<number>;
  dt: number;
  /** Wind at cloud altitude (m/s, x and z). Defaults to still air. */
  windAloft?: ArrayLike<number>;
}

/**
 * Bakes the clear atmosphere into a cube texture (with mips) in absolute luminance, owns the volumetric
 * cloud system (`clouds`) and composites both into `envCube`, the environment the IBL/SH are filtered from.
 */
export class Sky {
  readonly settings: SkySettings = { ...defaultSky };
  /** Clear-sky atmosphere (no clouds): what the sky pass draws behind the cloud dome. */
  cube!: GPUTexture;
  /** Atmosphere + clouds: the environment used for image-based lighting. */
  envCube!: GPUTexture;
  /** Volumetric / flat cloud layer (settings, `addCloud`). */
  readonly clouds: Clouds;
  readonly size: number;
  private pipeline: GPUComputePipeline;
  private ubuf: GPUBuffer;
  private bg!: GPUBindGroup;
  /** Bumps when the clear-sky cube is re-baked. */
  version = 0;
  /** Bumps when `envCube` changed (IBL must then be re-filtered). */
  envVersion = 0;
  private lastKey = '';
  private lastView: SkyFrameInput = { camPos: [0, 100, 0], dt: 0 };

  constructor(private dev: FGLDevice, private tex: TextureCache, size = 128) {
    this.size = size;
    this.pipeline = dev.device.createComputePipeline({ layout: 'auto', compute: { module: dev.shader(SKY_WGSL, 'sky'), entryPoint: 'main' } });
    this.ubuf = dev.createBuffer(64, GPUBufferUsage.UNIFORM, 'sky.u');
    const cubeDesc = (label: string): GPUTextureDescriptor => ({
      size: [size, size, 6], format: 'rgba16float', mipLevelCount: mipCount(size),
      usage: GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.RENDER_ATTACHMENT,
      label,
    });
    this.cube = dev.device.createTexture(cubeDesc('sky.cube'));
    this.envCube = dev.device.createTexture(cubeDesc('sky.env'));
    this.bg = dev.device.createBindGroup({
      layout: this.pipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: this.ubuf } },
        { binding: 1, resource: this.cube.createView({ dimension: '2d-array', baseMipLevel: 0, mipLevelCount: 1 }) },
      ],
    });
    this.clouds = new Clouds(dev, tex, this.cube);
  }

  /** Sun direction (towards the sun). */
  get sunDir(): [number, number, number] { return sunDirection(this.settings); }

  /** Sun illuminance at the observer (lux per channel, linear RGB). */
  sunIlluminanceRGB(): [number, number, number] {
    const t = sunTransmittance(this.settings);
    const E = this.settings.sunIlluminance;
    return [t[0] * E, t[1] * E, t[2] * E];
  }

  /** Sun illuminance at an altitude above sea level (lux, linear RGB): less reddened than at the ground. */
  sunIlluminanceAt(altitude: number): [number, number, number] {
    const t = sunTransmittance({ ...this.settings, altitude });
    const E = this.settings.sunIlluminance;
    return [t[0] * E, t[1] * E, t[2] * E];
  }

  /**
   * Place an individual cloud (see `Clouds.addCloud`): `{ position, size, density, mode: 'volumetric' | 'flat' }`.
   * The cloud is painted into the weather field and drifts with the wind.
   */
  addCloud(o: CloudBlobOptions): CloudHandle { return this.clouds.addCloud(o); }

  /** Atmosphere parameters that change the look of everything (used to invalidate caches). */
  get atmosphereKey(): string {
    const s = this.settings;
    return [s.sunElevation, s.sunAzimuth, s.sunIlluminance, s.turbidity, s.rayleigh, s.ozone, s.mieG, s.altitude].join('|');
  }

  /**
   * Per frame: re-bakes the atmosphere if its settings changed, advances/renders the clouds, and refreshes
   * `envCube` when either changed. Returns true when `envCube` changed (IBL must then be refiltered).
   */
  update(encoder?: GPUCommandEncoder, view?: SkyFrameInput): boolean {
    if (view) this.lastView = view;
    const v = this.lastView;
    const enc = encoder ?? this.dev.device.createCommandEncoder({ label: 'sky' });
    const key = JSON.stringify(this.settings);
    let skyChanged = false;
    if (key !== this.lastKey) {
      this.lastKey = key;
      this.bakeAtmosphere(enc);
      skyChanged = true;
    }
    const s = this.settings;
    const c = this.clouds.settings;
    const cloudsChanged = this.clouds.update(enc, {
      camPos: v.camPos, dt: v.dt, sunDir: this.sunDir,
      sunRGB: this.sunIlluminanceAt(c.altitude + c.thickness * 0.5),
      rayleigh: s.rayleigh, turbidity: s.turbidity, skyKey: this.atmosphereKey,
      windAloft: v.windAloft ?? [0, 0],
    });
    let envChanged = false;
    if (skyChanged || cloudsChanged || this.envVersion === 0) {
      this.clouds.compositeEnv(enc, this.envCube);
      this.tex.mipgen.generate(this.envCube, 'color', enc);
      this.envVersion++;
      envChanged = true;
    }
    if (!encoder) this.dev.device.queue.submit([enc.finish()]);
    return envChanged;
  }

  private bakeAtmosphere(enc: GPUCommandEncoder) {
    const s = this.settings;
    const sd = this.sunDir;
    const sun = this.sunIlluminanceRGB();
    // ground illuminance: direct sun * cos + rough sky term (≈ 15-20% of direct for a clear day, more when hazy)
    const cosS = Math.max(0, sd[1]);
    const skyE = 0.12 * s.sunIlluminance * Math.max(0.02, Math.sin(Math.max(sd[1], 0.02))) * (0.8 + 0.2 * s.turbidity);
    const ground = [sun[0] * cosS + skyE * 0.85, sun[1] * cosS + skyE * 0.95, sun[2] * cosS + skyE * 1.15];
    const u = new Float32Array([
      sd[0], sd[1], sd[2], s.sunIlluminance,
      s.rayleigh, s.turbidity, s.ozone, s.mieG,
      s.groundAlbedo, s.altitude, s.multiScatter, this.size,
      ground[0], ground[1], ground[2], 0,
    ]);
    this.dev.device.queue.writeBuffer(this.ubuf, 0, u);
    const pass = enc.beginComputePass({ label: 'sky bake' });
    pass.setPipeline(this.pipeline);
    pass.setBindGroup(0, this.bg);
    pass.dispatchWorkgroups(Math.ceil(this.size / 8), Math.ceil(this.size / 8), 6);
    pass.end();
    this.tex.mipgen.generate(this.cube, 'color', enc);
    this.version++;
  }
}
