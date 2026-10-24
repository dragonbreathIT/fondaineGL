// fondaineGL renderer: shadow cascades → depth/normal/velocity prepass → GTAO → forward PBR (+ sky, decals,
// transparents, particles) → TAA → motion blur → auto-exposure → bloom → lens/sensor/tonemap composite.
// Everything is driven by `RenderSettings`, all in physical or perceptual units.

import { FGLDevice, UniformWriter, mipCount } from './device';
import { FRAME_BYTES, LIGHT_BYTES, MAX_LIGHTS } from './shaders/common';
import { MESH_WGSL, OBJECT_BYTES, SHADOW_WGSL } from './shaders/mesh';
import {
  AO_BLUR_WGSL, BLOOM_DOWN_WGSL, BLOOM_UP_WGSL, COMPOSITE_WGSL, EXPOSURE_WGSL, GTAO_WGSL, HISTOGRAM_WGSL,
  MOTION_BLUR_WGSL, SKY_PASS_WGSL, TAA_WGSL,
} from './shaders/post';
import { DEBUG_WGSL } from './shaders/debug';
import { DOF_FOCUS_WGSL, DOF_GATHER_WGSL } from './shaders/dof';
import { VERTEX_LAYOUT, SKIN_LAYOUT } from './mesh';
import { Material } from './material';
import { TextureCache } from './texture';
import { MaterialSynth } from './procedural';
import { Sky } from './sky';
import { IBL } from './ibl';
import { computeCascades, defaultShadows, ShadowSettings } from './shadows';
import { Camera, RenderObject, Scene } from './scene';
import { ParticleSystem, DecalSystem } from './effects';
import { aabbInFrustum, extractFrustumPlanes, halton, mat4, Mat4, vec3 } from './math';
import { ev100FromCamera } from './color';

export type ExposureMode = 'auto' | 'manual' | 'camera';
export type Tonemapper = 'agx' | 'aces' | 'neutral' | 'none';

export interface RenderSettings {
  renderScale: number;
  maxDevicePixelRatio: number;
  taa: { enabled: boolean; feedbackMin: number; feedbackMax: number; velocityWeight: number; jitterSamples: number };
  exposure: {
    mode: ExposureMode; ev100: number; compensation: number; minEv100: number; maxEv100: number;
    speedUp: number; speedDown: number; lowPercent: number; highPercent: number; centerWeight: number;
  };
  bloom: { enabled: boolean; intensity: number; radius: number; clamp: number };
  gtao: { enabled: boolean; radius: number; falloff: number; power: number; strength: number; slices: number; steps: number; blur: boolean };
  motionBlur: { enabled: boolean; shutterAngle: number; maxPixels: number; samples: number };
  /**
   * Depth of field from a thin lens / the human eye. apertureMm: pupil (≈2–4 mm daylight, 7 mm dark) or
   * focal length / f-number for a camera. Focus follows the screen centre (accommodation) unless overridden.
   */
  dof: { enabled: boolean; apertureMm: number; autoFocus: boolean; focusDistance: number; focusSpeed: number; maxBlurPx: number; overrideDistance: number; overrideWeight: number; minFocus: number; quality: number };
  lens: { distortion: number; distortion2: number; chromaticAberration: number; naturalVignette: number; vignette: number; vignetteRoundness: number; sharpen: number; fillZoom: number };
  sensor: { enabled: boolean; readNoise: number; shotNoise: number; isoCoupled: boolean; gain: number };
  grade: { tonemapper: Tonemapper; contrast: number; saturation: number; temperature: number; tint: number; lift: number; gamma: number; gain: number; exposureBias: number; dither: number };
  fog: { density: number; heightFalloff: number; baseHeight: number; startDistance: number; inscatter: number; mieG: number };
  ibl: { intensity: number; specularOcclusion: number; occludedAmbient: number; groundBounce: number; /** Ambient multiplier on first-person (viewmodel) surfaces: the eye adapts to what it holds, and dark gear in roof shadow would otherwise read black. 1 = physical. */ viewmodelFill: number };
  /** Baked GI probe volume. */
  gi: { enabled: boolean; intensity: number };
  /** Procedural cloud deck (visible clouds + matching drifting cloud shadows). */
  clouds: { enabled: boolean; coverage: number; density: number; altitude: number; scale: number; windSpeed: number; windDirDeg: number; shadowStrength: number };
  /** Wind for foliage (m/s along the horizontal unit direction [x, z]). */
  wind: { direction: [number, number]; speed: number; bend: number; turbulence: number };
  shadows: ShadowSettings;
  viewmodelDepthSqueeze: number;
  /** 0 off, 1 normals, 2 AO, 3 velocity, 4 depth, 5 luminance false colour (cd/m²), 6 sky visibility */
  debugView: number;
}

export function defaultRenderSettings(): RenderSettings {
  return {
    renderScale: 1,
    maxDevicePixelRatio: 2,
    taa: { enabled: true, feedbackMin: 0.82, feedbackMax: 0.94, velocityWeight: 0.06, jitterSamples: 16 },
    exposure: { mode: 'auto', ev100: 14, compensation: 0, minEv100: -2, maxEv100: 17, speedUp: 2.2, speedDown: 1.4, lowPercent: 0.45, highPercent: 0.96, centerWeight: 0.6 },
    bloom: { enabled: true, intensity: 0.035, radius: 1.0, clamp: 6e4 },
    gtao: { enabled: true, radius: 0.9, falloff: 0.4, power: 1.25, strength: 1, slices: 2, steps: 6, blur: true },
    motionBlur: { enabled: true, shutterAngle: 180, maxPixels: 48, samples: 10 },
    dof: { enabled: true, apertureMm: 3.2, autoFocus: true, focusDistance: 10, focusSpeed: 6, maxBlurPx: 14, overrideDistance: 0.6, overrideWeight: 0, minFocus: 0.12, quality: 1 },
    lens: { distortion: 0, distortion2: 0, chromaticAberration: 0.15, naturalVignette: 0.6, vignette: 0.12, vignetteRoundness: 0.6, sharpen: 0.25, fillZoom: 1 },
    sensor: { enabled: true, readNoise: 0.0025, shotNoise: 0.0018, isoCoupled: true, gain: 1 },
    grade: { tonemapper: 'agx', contrast: 1.04, saturation: 1.02, temperature: 0, tint: 0, lift: 0, gamma: 1, gain: 1, exposureBias: 0, dither: 1 },
    fog: { density: 0.00035, heightFalloff: 0.045, baseHeight: 0, startDistance: 15, inscatter: 1, mieG: 0.72 },
    ibl: { intensity: 1, specularOcclusion: 1, occludedAmbient: 0.15, groundBounce: 0.6, viewmodelFill: 1.7 },
    gi: { enabled: true, intensity: 1 },
    wind: { direction: [0.94, 0.35], speed: 1.7, bend: 0.045, turbulence: 0.25 },
    clouds: { enabled: true, coverage: 0.42, density: 1.6, altitude: 1800, scale: 2600, windSpeed: 9, windDirDeg: 25, shadowStrength: 0.88 },
    shadows: { ...defaultShadows },
    viewmodelDepthSqueeze: 0.5,
    debugView: 0,
  };
}

const TONEMAP_ID: Record<Tonemapper, number> = { agx: 0, aces: 1, neutral: 2, none: 3 };

interface Targets {
  w: number; h: number;
  depth: GPUTexture; normal: GPUTexture; velocity: GPUTexture; hdr: GPUTexture;
  aoRaw: GPUTexture; ao: GPUTexture;
  history: [GPUTexture, GPUTexture];
  mb: GPUTexture; debug: GPUTexture; dof: GPUTexture;
  bloomDown: GPUTexture[]; bloomUp: GPUTexture[];
}

interface PipelineSet { prepass: GPURenderPipeline; main: GPURenderPipeline; transparent: GPURenderPipeline; shadow: GPURenderPipeline }

function floatToHalf(v: number): number {
  const f = new Float32Array(1); const u = new Uint32Array(f.buffer);
  f[0] = v;
  const x = u[0];
  const sign = (x >>> 16) & 0x8000;
  let e = ((x >>> 23) & 0xff) - 127 + 15;
  let m = x & 0x7fffff;
  if (e <= 0) { if (e < -10) return sign; m = (m | 0x800000) >> (1 - e); return sign | (m >> 13); }
  if (e >= 31) return sign | 0x7c00;
  return sign | (e << 10) | (m >> 13);
}

export class Renderer {
  readonly dev: FGLDevice;
  readonly device: GPUDevice;
  readonly settings: RenderSettings;
  readonly textures: TextureCache;
  readonly synth: MaterialSynth;
  readonly sky: Sky;
  readonly ibl: IBL;
  readonly particles: ParticleSystem;
  readonly decals: DecalSystem;
  /** Frame statistics. */
  readonly stats = { drawCalls: 0, triangles: 0, objects: 0, culled: 0, frameMs: 0, gpuInfo: '' };

  // layouts
  private frameLayout: GPUBindGroupLayout;
  private objectLayout: GPUBindGroupLayout;
  private materialLayout: GPUBindGroupLayout;
  private shadowLayout: GPUBindGroupLayout;
  // buffers
  private frameBuf: GPUBuffer;
  private lightBuf: GPUBuffer;
  private exposureBuf: GPUBuffer;
  private histBuf: GPUBuffer;
  private objBuf: GPUBuffer;
  private objCapacity = 0;
  private objData = new Float32Array(0);
  private cascadeBuf: GPUBuffer;
  private dummyJoints: GPUBuffer;
  private staticObjectBG!: GPUBindGroup;
  private frameBG: GPUBindGroup | null = null;
  private frameBGKey = '';
  // resources
  private shadowMap!: GPUTexture;
  private shadowRes = 0;
  private shadowCount = 0;
  private skyVis: GPUTexture;
  private skyVisParams = { min: [0, 0, 0], cell: 1, size: [1, 1, 1], enabled: false };
  private probes: GPUTexture[] = [];
  private cloudDrift = [0, 0];
  private probeParams = { min: [0, 0, 0], cell: 1, size: [1, 1, 1], enabled: false };
  private targets: Targets | null = null;
  private linearClamp: GPUSampler;
  private shadowSampler: GPUSampler;
  // pipelines
  private meshModule: GPUShaderModule;
  private shadowModule: GPUShaderModule;
  private pipelines = new Map<string, PipelineSet>();
  private skyPipe: GPURenderPipeline;
  private gtaoPipe: GPUComputePipeline;
  private aoBlurPipe: GPUComputePipeline;
  private taaPipe: GPUComputePipeline;
  private mbPipe: GPUComputePipeline;
  private dofFocusPipe: GPUComputePipeline;
  private dofGatherPipe: GPUComputePipeline;
  private dofState: GPUBuffer;
  private bloomDownPipe: GPUComputePipeline;
  private bloomUpPipe: GPUComputePipeline;
  private histPipe: GPUComputePipeline;
  private exposurePipe: GPUComputePipeline;
  private compositePipe: GPURenderPipeline;
  private debugPipe: GPUComputePipeline;
  private postUniforms = new Map<string, GPUBuffer>();
  // state
  private frameIndex = 0;
  private prevViewProj: Mat4 = mat4.create();
  private prevVmViewProj: Mat4 = mat4.create();
  private historyValid = false;
  private time = 0;
  private lastSkyVersion = -1;
  private fw = new UniformWriter(FRAME_BYTES);

  private constructor(dev: FGLDevice) {
    this.dev = dev;
    this.device = dev.device;
    const d = this.device;
    this.settings = defaultRenderSettings();
    this.textures = new TextureCache(dev);
    this.synth = new MaterialSynth(dev, this.textures);
    this.sky = new Sky(dev, this.textures, 128);
    this.ibl = new IBL(dev, 128);
    this.particles = new ParticleSystem(dev);
    this.decals = new DecalSystem(dev);
    const VF = GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT;
    this.frameLayout = d.createBindGroupLayout({
      label: 'frame',
      entries: [
        { binding: 0, visibility: VF, buffer: { type: 'uniform' } },
        { binding: 1, visibility: VF, buffer: { type: 'read-only-storage' } },
        { binding: 2, visibility: VF, buffer: { type: 'read-only-storage' } },
        { binding: 3, visibility: VF, buffer: { type: 'read-only-storage' } },
        { binding: 4, visibility: VF, texture: { viewDimension: 'cube' } },
        { binding: 5, visibility: VF, texture: {} },
        { binding: 6, visibility: VF, texture: { sampleType: 'depth', viewDimension: '2d-array' } },
        { binding: 7, visibility: VF, sampler: { type: 'comparison' } },
        { binding: 8, visibility: VF, sampler: {} },
        { binding: 9, visibility: VF, texture: { sampleType: 'unfilterable-float' } },
        { binding: 10, visibility: VF, texture: { viewDimension: '3d' } },
        { binding: 11, visibility: VF, texture: { viewDimension: 'cube' } },
        { binding: 12, visibility: VF, texture: { viewDimension: '3d' } },
        { binding: 13, visibility: VF, texture: { viewDimension: '3d' } },
        { binding: 14, visibility: VF, texture: { viewDimension: '3d' } },
      ],
    });
    this.objectLayout = d.createBindGroupLayout({
      label: 'object',
      entries: [
        { binding: 0, visibility: VF, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: OBJECT_BYTES } },
        { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } },
        { binding: 2, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } },
      ],
    });
    this.materialLayout = d.createBindGroupLayout({
      label: 'material',
      entries: [
        { binding: 0, visibility: VF, buffer: { type: 'uniform' } },
        { binding: 1, visibility: GPUShaderStage.FRAGMENT, sampler: {} },
        { binding: 2, visibility: GPUShaderStage.FRAGMENT, texture: {} },
        { binding: 3, visibility: GPUShaderStage.FRAGMENT, texture: {} },
        { binding: 4, visibility: GPUShaderStage.FRAGMENT, texture: {} },
        { binding: 5, visibility: GPUShaderStage.FRAGMENT, texture: {} },
      ],
    });
    this.shadowLayout = d.createBindGroupLayout({
      label: 'shadow',
      entries: [{ binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 64 } }],
    });
    this.frameBuf = dev.createBuffer(FRAME_BYTES, GPUBufferUsage.UNIFORM, 'frame');
    this.lightBuf = dev.createBuffer(MAX_LIGHTS * LIGHT_BYTES, GPUBufferUsage.STORAGE, 'lights');
    this.exposureBuf = dev.createBuffer(16, GPUBufferUsage.STORAGE, 'exposure', new Float32Array([1 / (1.2 * 2 ** 14), 14, 14, 1 / (1.2 * 2 ** 14)]));
    this.histBuf = dev.createBuffer(256 * 4, GPUBufferUsage.STORAGE, 'histogram');
    this.cascadeBuf = dev.createBuffer(256 * 4, GPUBufferUsage.UNIFORM, 'cascades');
    this.dummyJoints = dev.createBuffer(64, GPUBufferUsage.STORAGE, 'dummyJoints', mat4.create());
    this.objBuf = this.ensureObjectCapacity(256);
    this.linearClamp = d.createSampler({ magFilter: 'linear', minFilter: 'linear', mipmapFilter: 'linear', addressModeU: 'clamp-to-edge', addressModeV: 'clamp-to-edge', addressModeW: 'clamp-to-edge' });
    this.shadowSampler = d.createSampler({ compare: 'less', magFilter: 'linear', minFilter: 'linear' });
    this.skyVis = this.textures.white3d;
    this.probes = [this.textures.white3d, this.textures.white3d, this.textures.white3d];
    this.createShadowMap();

    this.meshModule = dev.shader(MESH_WGSL, 'mesh');
    this.shadowModule = dev.shader(SHADOW_WGSL, 'shadow');
    const hdrFormat: GPUTextureFormat = 'rgba16float';
    const skyModule = dev.shader(SKY_PASS_WGSL, 'skypass');
    this.skyPipe = d.createRenderPipeline({
      label: 'sky',
      layout: d.createPipelineLayout({ bindGroupLayouts: [this.frameLayout] }),
      vertex: { module: skyModule, entryPoint: 'vsFull' },
      fragment: { module: skyModule, entryPoint: 'fsSky', targets: [{ format: hdrFormat }] },
      depthStencil: { format: 'depth32float', depthWriteEnabled: false, depthCompare: 'greater-equal' },
    });
    const cp = (code: string, label: string) => d.createComputePipeline({ label, layout: 'auto', compute: { module: dev.shader(code, label), entryPoint: 'main' } });
    this.gtaoPipe = cp(GTAO_WGSL, 'gtao');
    this.aoBlurPipe = cp(AO_BLUR_WGSL, 'aoblur');
    this.taaPipe = cp(TAA_WGSL, 'taa');
    this.mbPipe = cp(MOTION_BLUR_WGSL, 'motionblur');
    this.dofFocusPipe = cp(DOF_FOCUS_WGSL, 'dof-focus');
    this.dofGatherPipe = cp(DOF_GATHER_WGSL, 'dof-gather');
    this.dofState = dev.createBuffer(16, GPUBufferUsage.STORAGE, 'dof.state', new Float32Array([0, 0, 0, 0]));
    this.bloomDownPipe = cp(BLOOM_DOWN_WGSL, 'bloomdown');
    this.bloomUpPipe = cp(BLOOM_UP_WGSL, 'bloomup');
    this.histPipe = cp(HISTOGRAM_WGSL, 'histogram');
    this.exposurePipe = cp(EXPOSURE_WGSL, 'exposure');
    this.debugPipe = cp(DEBUG_WGSL, 'debug');
    const compModule = dev.shader(COMPOSITE_WGSL, 'composite');
    this.compositePipe = d.createRenderPipeline({
      label: 'composite',
      layout: 'auto',
      vertex: { module: compModule, entryPoint: 'vsFull' },
      fragment: { module: compModule, entryPoint: 'fsComposite', targets: [{ format: dev.presentationFormat }] },
    });
    this.particles.createPipeline(this.frameLayout, hdrFormat);
    this.decals.createPipeline(this.frameLayout, hdrFormat);
    this.staticObjectBG = this.makeObjectBG(this.dummyJoints, this.dummyJoints);
  }

  static async create(canvas: HTMLCanvasElement, opts: { powerPreference?: GPUPowerPreference; offscreen?: boolean } = {}): Promise<Renderer> {
    const dev = await FGLDevice.create({ canvas, powerPreference: opts.powerPreference, offscreen: opts.offscreen });
    return new Renderer(dev);
  }

  /** Assign the material layout to a new material (bind group creation). */
  get materialBindGroupLayout() { return this.materialLayout; }

  // ------------------------------------------------------------------------------------------- resources
  private ensureObjectCapacity(n: number): GPUBuffer {
    if (n <= this.objCapacity) return this.objBuf;
    const cap = Math.max(n, Math.ceil(this.objCapacity * 1.5), 256);
    this.objBuf?.destroy?.();
    this.objBuf = this.dev.createBuffer(cap * OBJECT_BYTES, GPUBufferUsage.UNIFORM, 'objects');
    this.objData = new Float32Array((cap * OBJECT_BYTES) / 4);
    this.objCapacity = cap;
    if (this.dummyJoints) this.staticObjectBG = this.makeObjectBG(this.dummyJoints, this.dummyJoints);
    for (const set of this.skinnedObjects) if (set._skin) set._skin.bg = null;
    return this.objBuf;
  }
  private skinnedObjects = new Set<RenderObject>();

  private makeObjectBG(cur: GPUBuffer, prev: GPUBuffer): GPUBindGroup {
    return this.device.createBindGroup({
      layout: this.objectLayout,
      entries: [
        { binding: 0, resource: { buffer: this.objBuf, size: OBJECT_BYTES } },
        { binding: 1, resource: { buffer: cur } },
        { binding: 2, resource: { buffer: prev } },
      ],
    });
  }

  private createShadowMap() {
    const s = this.settings.shadows;
    const res = Math.max(256, Math.min(8192, s.resolution | 0));
    const count = Math.max(1, Math.min(4, s.cascades | 0));
    if (this.shadowMap && res === this.shadowRes && count === this.shadowCount) return;
    this.shadowMap?.destroy();
    this.shadowMap = this.device.createTexture({
      size: [res, res, 4], format: 'depth32float',
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING, label: 'shadowmap',
    });
    this.shadowRes = res;
    this.shadowCount = count;
    this.frameBG = null;
  }

  /** Upload a sky-visibility volume (values 0..1, x fastest) used to occlude sky light indoors/under roofs. */
  setSkyVisibility(data: Float32Array, nx: number, ny: number, nz: number, min: [number, number, number], cell: number) {
    const half = new Uint16Array(data.length);
    for (let i = 0; i < data.length; i++) half[i] = floatToHalf(data[i]);
    const t = this.device.createTexture({ size: [nx, ny, nz], dimension: '3d', format: 'r16float', usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST, label: 'skyvis' });
    this.device.queue.writeTexture({ texture: t }, half, { bytesPerRow: nx * 2, rowsPerImage: ny }, [nx, ny, nz]);
    if (this.skyVis !== this.textures.white3d) this.skyVis.destroy();
    this.skyVis = t;
    this.skyVisParams = { min: [...min], cell, size: [nx, ny, nz], enabled: true };
    this.frameBG = null;
  }

  /**
   * Upload a baked GI probe grid (from PhysicsWorld.bakeGI): nx·ny·nz·12 floats, probe (i,j,k) centred at
   * min + (i+½, j+½, k+½)·cell.
   */
  setProbeVolume(data: Float32Array, nx: number, ny: number, nz: number, min: ArrayLike<number>, cell: number) {
    const n = nx * ny * nz;
    for (let c = 0; c < 3; c++) {
      const half = new Uint16Array(n * 4);
      for (let i = 0; i < n; i++) for (let k = 0; k < 4; k++) half[i * 4 + k] = floatToHalf(data[i * 12 + c * 4 + k]);
      const t = this.device.createTexture({ size: [nx, ny, nz], dimension: '3d', format: 'rgba16float', usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST, label: `gi.probes.${'rgb'[c]}` });
      this.device.queue.writeTexture({ texture: t }, half, { bytesPerRow: nx * 8, rowsPerImage: ny }, [nx, ny, nz]);
      if (this.probes[c] !== this.textures.white3d) this.probes[c].destroy();
      this.probes[c] = t;
    }
    this.probeParams = { min: [min[0], min[1], min[2]], cell, size: [nx, ny, nz], enabled: true };
    this.frameBG = null;
  }

  /** Bake the sky now and read its SH (27 floats: 9 coefficients × RGB, irradiance/π convention). */
  async readSkySH(): Promise<Float32Array> {
    const d = this.device;
    const enc = d.createCommandEncoder({ label: 'sky-sh-readback' });
    this.sky.update(enc);
    if (this.sky.version !== this.lastSkyVersion) { this.ibl.update(this.sky.cube, enc); this.lastSkyVersion = this.sky.version; }
    const rb = d.createBuffer({ size: 144, usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST, label: 'sh-readback' });
    enc.copyBufferToBuffer(this.ibl.sh, 0, rb, 0, 144);
    d.queue.submit([enc.finish()]);
    await rb.mapAsync(GPUMapMode.READ);
    const v = new Float32Array(rb.getMappedRange().slice(0));
    rb.unmap(); rb.destroy();
    const out = new Float32Array(27);
    for (let k = 0; k < 9; k++) for (let c = 0; c < 3; c++) out[k * 3 + c] = v[k * 4 + c];
    return out;
  }

  private makeTargets(w: number, h: number): Targets {
    const d = this.device;
    const tex = (label: string, format: GPUTextureFormat, usage: number, size: [number, number] = [w, h]) =>
      d.createTexture({ label, size, format, usage });
    const RT = GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING;
    const ST = GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.TEXTURE_BINDING;
    const bloomDown: GPUTexture[] = [], bloomUp: GPUTexture[] = [];
    const levels = Math.min(6, mipCount(w, h) - 2);
    for (let i = 0; i < levels; i++) {
      const bw = Math.max(1, w >> (i + 1)), bh = Math.max(1, h >> (i + 1));
      bloomDown.push(tex(`bloom.down${i}`, 'rgba16float', ST, [bw, bh]));
      bloomUp.push(tex(`bloom.up${i}`, 'rgba16float', ST, [bw, bh]));
    }
    return {
      w, h,
      depth: tex('depth', 'depth32float', RT),
      normal: tex('normal', 'rgba16float', RT),
      velocity: tex('velocity', 'rg16float', RT),
      hdr: tex('hdr', 'rgba16float', RT),
      aoRaw: tex('ao.raw', 'r32float', ST),
      ao: tex('ao', 'r32float', ST),
      history: [tex('taa.a', 'rgba16float', ST), tex('taa.b', 'rgba16float', ST)],
      mb: tex('motionblur', 'rgba16float', ST),
      dof: tex('dof', 'rgba16float', ST),
      debug: tex('debug', 'rgba16float', ST),
      bloomDown, bloomUp,
    };
  }

  private destroyTargets(t: Targets) {
    for (const x of [t.depth, t.normal, t.velocity, t.hdr, t.aoRaw, t.ao, t.history[0], t.history[1], t.mb, t.dof, t.debug, ...t.bloomDown, ...t.bloomUp]) x.destroy();
  }

  private uniform(key: string, data: ArrayBufferView): GPUBuffer {
    let b = this.postUniforms.get(key);
    if (!b) {
      b = this.dev.createBuffer(Math.max(16, data.byteLength), GPUBufferUsage.UNIFORM, key);
      this.postUniforms.set(key, b);
    }
    this.device.queue.writeBuffer(b, 0, data.buffer, data.byteOffset, data.byteLength);
    return b;
  }

  private getFrameBG(t: Targets): GPUBindGroup {
    const key = `${t.w}x${t.h}`;
    if (this.frameBG && this.frameBGKey === key) return this.frameBG;
    this.frameBG = this.device.createBindGroup({
      layout: this.frameLayout,
      label: 'frame',
      entries: [
        { binding: 0, resource: { buffer: this.frameBuf } },
        { binding: 1, resource: { buffer: this.lightBuf } },
        { binding: 2, resource: { buffer: this.ibl.sh } },
        { binding: 3, resource: { buffer: this.exposureBuf } },
        { binding: 4, resource: this.ibl.specular.createView({ dimension: 'cube' }) },
        { binding: 5, resource: this.ibl.brdfLut.createView() },
        { binding: 6, resource: this.shadowMap.createView({ dimension: '2d-array' }) },
        { binding: 7, resource: this.shadowSampler },
        { binding: 8, resource: this.linearClamp },
        { binding: 9, resource: t.ao.createView() },
        { binding: 10, resource: this.skyVis.createView() },
        { binding: 11, resource: this.sky.cube.createView({ dimension: 'cube' }) },
        { binding: 12, resource: this.probes[0].createView() },
        { binding: 13, resource: this.probes[1].createView() },
        { binding: 14, resource: this.probes[2].createView() },
      ],
    });
    this.frameBGKey = key;
    return this.frameBG;
  }

  // ------------------------------------------------------------------------------------------- pipelines
  private getPipelines(skinned: boolean, mat: Material): PipelineSet {
    const key = `${skinned ? 1 : 0}|${mat.variantKey}`;
    let p = this.pipelines.get(key);
    if (p) return p;
    const d = this.device;
    const layout = d.createPipelineLayout({ bindGroupLayouts: [this.frameLayout, this.objectLayout, this.materialLayout] });
    const buffers = skinned ? [VERTEX_LAYOUT, SKIN_LAYOUT] : [VERTEX_LAYOUT];
    const vertex = { module: this.meshModule, entryPoint: skinned ? 'vsSkinned' : 'vsStatic', buffers };
    const cullMode: GPUCullMode = mat.doubleSided ? 'none' : 'back';
    const prepass = d.createRenderPipeline({
      label: `prepass ${key}`, layout, vertex,
      fragment: { module: this.meshModule, entryPoint: 'fsPrepass', targets: [{ format: 'rgba16float' }, { format: 'rg16float' }] },
      primitive: { topology: 'triangle-list', cullMode },
      depthStencil: { format: 'depth32float', depthWriteEnabled: true, depthCompare: 'greater' },
    });
    const main = d.createRenderPipeline({
      label: `main ${key}`, layout, vertex,
      fragment: { module: this.meshModule, entryPoint: 'fsMain', targets: [{ format: 'rgba16float' }] },
      primitive: { topology: 'triangle-list', cullMode },
      depthStencil: { format: 'depth32float', depthWriteEnabled: false, depthCompare: 'equal' },
    });
    const transparent = d.createRenderPipeline({
      label: `transparent ${key}`, layout, vertex,
      fragment: {
        module: this.meshModule, entryPoint: 'fsTransparent',
        targets: [{ format: 'rgba16float', blend: { color: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha' }, alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha' } } }],
      },
      primitive: { topology: 'triangle-list', cullMode },
      depthStencil: { format: 'depth32float', depthWriteEnabled: false, depthCompare: 'greater' },
    });
    const s = this.settings.shadows;
    const shadow = d.createRenderPipeline({
      label: `shadow ${key}`,
      layout: d.createPipelineLayout({ bindGroupLayouts: [this.shadowLayout, this.objectLayout, this.materialLayout] }),
      vertex: { module: this.shadowModule, entryPoint: skinned ? 'vsShadowSkinned' : 'vsShadow', buffers },
      fragment: mat.alphaMode === 'mask' ? { module: this.shadowModule, entryPoint: 'fsShadowMask', targets: [] } : undefined,
      primitive: { topology: 'triangle-list', cullMode: 'none' },
      depthStencil: { format: 'depth32float', depthWriteEnabled: true, depthCompare: 'less', depthBias: 1, depthBiasSlopeScale: s.slopeBias, depthBiasClamp: 0.01 },
    });
    p = { prepass, main, transparent, shadow };
    this.pipelines.set(key, p);
    return p;
  }

  // ------------------------------------------------------------------------------------------- frame
  /** Renders one frame. `dt` in seconds. */
  render(scene: Scene, camera: Camera, dt: number) {
    const t0 = performance.now();
    const S = this.settings;
    const d = this.device;
    const canvas = this.dev.canvas;
    // ---- size
    const dpr = Math.min(globalThis.devicePixelRatio ?? 1, S.maxDevicePixelRatio);
    const cw = Math.max(1, Math.floor((canvas.clientWidth || canvas.width) * dpr));
    const ch = Math.max(1, Math.floor((canvas.clientHeight || canvas.height) * dpr));
    if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }
    const w = Math.max(16, Math.round(cw * S.renderScale)), h = Math.max(16, Math.round(ch * S.renderScale));
    if (!this.targets || this.targets.w !== w || this.targets.h !== h) {
      if (this.targets) this.destroyTargets(this.targets);
      this.targets = this.makeTargets(w, h);
      this.frameBG = null;
      this.historyValid = false;
    }
    const T = this.targets;
    this.createShadowMap();
    this.time += dt;
    const encoder = d.createCommandEncoder({ label: 'frame' });

    // ---- environment
    this.sky.update(encoder);
    if (this.sky.version !== this.lastSkyVersion) {
      this.ibl.update(this.sky.cube, encoder);
      this.lastSkyVersion = this.sky.version;
    }

    // ---- camera matrices
    camera.updateMatrices();
    const aspect = w / h;
    const n = S.taa.enabled ? Math.max(1, S.taa.jitterSamples) : 1;
    const ji = (this.frameIndex % n) + 1;
    const jx = S.taa.enabled ? ((halton(ji, 2) - 0.5) * 2) / w : 0;
    const jy = S.taa.enabled ? ((halton(ji, 3) - 0.5) * 2) / h : 0;
    const proj = mat4.perspectiveReversedInfinite(mat4.create(), camera.fovY, aspect, camera.near, jx, jy);
    const projNJ = mat4.perspectiveReversedInfinite(mat4.create(), camera.fovY, aspect, camera.near);
    const vmProj = mat4.perspectiveReversedInfinite(mat4.create(), camera.viewmodelFovY, aspect, camera.near * 0.25, jx, jy);
    const vmProjNJ = mat4.perspectiveReversedInfinite(mat4.create(), camera.viewmodelFovY, aspect, camera.near * 0.25);
    const viewProj = mat4.multiply(mat4.create(), proj, camera.view);
    const viewProjNJ = mat4.multiply(mat4.create(), projNJ, camera.view);
    const vmViewProj = mat4.multiply(mat4.create(), vmProj, camera.view);
    const vmViewProjNJ = mat4.multiply(mat4.create(), vmProjNJ, camera.view);
    if (!this.historyValid) { mat4.copy(this.prevViewProj, viewProjNJ); mat4.copy(this.prevVmViewProj, vmViewProjNJ); }
    const invProj = mat4.invert(mat4.create(), proj)!;
    const invViewProj = mat4.invert(mat4.create(), viewProj)!;
    const invViewProjNJ = mat4.invert(mat4.create(), viewProjNJ)!;

    // ---- sun / sky / shadows
    const sunDir = this.sky.sunDir;
    const sunRGB = this.sky.sunIlluminanceRGB();
    const sunAngR = (this.sky.settings.sunAngularDiameter * Math.PI) / 360;
    const sh = S.shadows;
    const cascades = sh.enabled ? computeCascades(camera, aspect, vec3.clone(sunDir), sh) : null;

    // ---- frame uniforms
    const F = this.fw;
    F.mat4(0, viewProj); F.mat4(64, viewProjNJ); F.mat4(128, this.prevViewProj);
    F.mat4(192, vmViewProj); F.mat4(256, vmViewProjNJ); F.mat4(320, this.prevVmViewProj);
    F.mat4(384, camera.view); F.mat4(448, camera.world); F.mat4(512, invProj); F.mat4(576, invViewProj); F.mat4(640, proj);
    F.vec4(704, camera.position[0], camera.position[1], camera.position[2], camera.near);
    F.vec4(720, sunDir[0], sunDir[1], sunDir[2], Math.cos(sunAngR));
    F.vec4(736, sunRGB[0], sunRGB[1], sunRGB[2], 1);
    F.vec4(752, w, h, 1 / w, 1 / h);
    F.vec4(768, jx, jy, 0, 0);
    // fog inscatter: ambient sky luminance approximated from sun illuminance & sky brightness
    const fogAmbient = 0.06 * this.sky.settings.sunIlluminance / Math.PI * Math.max(0.05, Math.sin(Math.max(0.03, sunDir[1]))) * S.fog.inscatter;
    F.vec4(784, S.fog.density, S.fog.heightFalloff, S.fog.baseHeight, S.fog.startDistance);
    F.vec4(800, fogAmbient * 0.62, fogAmbient * 0.75, fogAmbient, S.fog.mieG);
    F.vec4(816, this.time, dt, this.frameIndex, S.ibl.intensity);
    F.vec4(832, cascades ? cascades.viewProj.length : 0, sh.maxPenumbraTexels, Math.tan(sunAngR), sh.blendFraction);
    if (cascades) {
      F.vec4(848, cascades.splits[0] ?? 1e9, cascades.splits[1] ?? 1e9, cascades.splits[2] ?? 1e9, cascades.splits[3] ?? 1e9);
      for (let i = 0; i < 4; i++) F.mat4(864 + i * 64, cascades.viewProj[i] ?? mat4.create());
      F.vec4(1120, cascades.texelWorld[0] ?? 1, cascades.texelWorld[1] ?? 1, cascades.texelWorld[2] ?? 1, cascades.texelWorld[3] ?? 1);
      F.vec4(1216, cascades.depthRange[0] ?? 1, cascades.depthRange[1] ?? 1, cascades.depthRange[2] ?? 1, cascades.depthRange[3] ?? 1);
    }
    const sv = this.skyVisParams;
    F.vec4(1136, sv.min[0], sv.min[1], sv.min[2], sv.cell);
    F.vec4(1152, sv.size[0], sv.size[1], sv.size[2], sv.enabled ? 1 : 0);
    // lights
    const lightData = new Float32Array(MAX_LIGHTS * 16);
    let lc = 0;
    for (const l of scene.lights) {
      if (!l.enabled || lc >= MAX_LIGHTS || l.intensity <= 0) continue;
      const o = lc * 16;
      lightData.set([l.position[0], l.position[1], l.position[2], l.range], o);
      lightData.set([l.color[0] * l.intensity, l.color[1] * l.intensity, l.color[2] * l.intensity, 0], o + 4);
      const spot = l.spotOuter > 0;
      const dn = vec3.normalize(vec3.create(), l.direction);
      lightData.set([dn[0], dn[1], dn[2], Math.cos((l.spotOuter * Math.PI) / 180)], o + 8);
      lightData.set([Math.cos((Math.min(l.spotInner, l.spotOuter) * Math.PI) / 180), l.radius, spot ? 1 : 0, 0], o + 12);
      lc++;
    }
    d.queue.writeBuffer(this.lightBuf, 0, lightData, 0, Math.max(16, lc * 16));
    F.vec4(1168, lc, S.ibl.specularOcclusion, S.gtao.enabled ? S.gtao.strength : 0, sh.normalBias);
    F.vec4(1184, this.ibl.mips - 1, 1, this.sky.settings.groundAlbedo, S.debugView);
    F.vec4(1200, S.viewmodelDepthSqueeze, 0, 0, 0);
    F.vec4(1232, sh.constantBias, sh.slopeBias, Math.min(16, sh.blockerSamples), Math.min(32, sh.pcfSamples));
    F.vec4(1248, S.ibl.occludedAmbient, S.ibl.groundBounce, S.ibl.viewmodelFill, 0);
    F.vec4(1264, S.wind.direction[0] * S.wind.speed, S.wind.direction[1] * S.wind.speed, S.wind.bend, S.wind.turbulence);
    const C = S.clouds;
    this.cloudDrift[0] += Math.cos(C.windDirDeg * Math.PI / 180) * C.windSpeed * dt;
    this.cloudDrift[1] += Math.sin(C.windDirDeg * Math.PI / 180) * C.windSpeed * dt;
    F.vec4(1312, C.coverage, C.density, C.altitude, C.scale);
    F.vec4(1328, this.cloudDrift[0] % 1e6, this.cloudDrift[1] % 1e6, C.shadowStrength, C.enabled ? 1 : 0);
    const pp = this.probeParams;
    F.vec4(1280, pp.min[0], pp.min[1], pp.min[2], pp.cell);
    F.vec4(1296, pp.size[0], pp.size[1], pp.size[2], pp.enabled && S.gi.enabled ? S.gi.intensity : 0);
    d.queue.writeBuffer(this.frameBuf, 0, F.buffer);

    // ---- objects: cull + uniforms
    const planes = extractFrustumPlanes(viewProj);
    const visible: RenderObject[] = [];
    const casters: RenderObject[] = [];
    let culled = 0;
    const all = [...scene.objects];
    this.ensureObjectCapacity(all.length + 1);
    const OD = this.objData;
    const slot = new Map<RenderObject, number>();
    let idx = 0;
    const nm12 = new Float32Array(12);
    for (const o of all) {
      if (!o.visible) continue;
      o._beginFrame();
      const base = (idx * OBJECT_BYTES) / 4;
      OD.set(o.transform, base);
      OD.set(o.prevTransform, base + 16);
      mat4.normalMatrix12(nm12, o.transform);
      OD.set(nm12, base + 32);
      OD[base + 44] = (o.viewmodel ? 1 : 0) + (o.instances ? 4 : 0);
      OD[base + 45] = o.id;
      slot.set(o, idx++);
      if (o.joints && o.mesh.skinned) this.updateSkin(o);
      if (o.instances) { this.updateInstances(o); if (o.instanceCount === 0) { idx--; slot.delete(o); continue; } }
      if (o.castShadow && !o.viewmodel) casters.push(o);
      if (o.viewmodel || aabbInFrustum(planes, o.worldBounds)) visible.push(o); else culled++;
    }
    if (idx) d.queue.writeBuffer(this.objBuf, 0, OD, 0, (idx * OBJECT_BYTES) / 4);
    this.stats.objects = visible.length;
    this.stats.culled = culled;
    let draws = 0, tris = 0;

    const objBG = (o: RenderObject) => (o._skin ? this.skinBG(o) : o._inst ? this.instBG(o) : this.staticObjectBG);
    const drawMesh = (pass: GPURenderPassEncoder, o: RenderObject) => {
      pass.setBindGroup(1, objBG(o), [slot.get(o)! * OBJECT_BYTES]);
      pass.setBindGroup(2, o.material.getBindGroup(this.dev, this.textures, this.materialLayout));
      pass.setVertexBuffer(0, o.mesh.vertexBuffer);
      if (o.mesh.skinBuffer && o._skin) pass.setVertexBuffer(1, o.mesh.skinBuffer);
      pass.setIndexBuffer(o.mesh.indexBuffer, 'uint32');
      const n = o.instances ? o.instanceCount : 1;
      pass.drawIndexed(o.mesh.indexCount, n);
      draws++;
      tris += (o.mesh.indexCount / 3) * n;
    };

    // ---- shadow cascades
    if (cascades) {
      const cdata = new Float32Array(256 * 4 / 4 * 1);
      for (let i = 0; i < cascades.viewProj.length; i++) cdata.set(cascades.viewProj[i], i * 64);
      d.queue.writeBuffer(this.cascadeBuf, 0, cdata);
      const shadowBG = d.createBindGroup({ layout: this.shadowLayout, entries: [{ binding: 0, resource: { buffer: this.cascadeBuf, size: 64 } }] });
      for (let c = 0; c < cascades.viewProj.length; c++) {
        const pass = encoder.beginRenderPass({
          label: `shadow ${c}`,
          colorAttachments: [],
          depthStencilAttachment: {
            view: this.shadowMap.createView({ dimension: '2d', baseArrayLayer: c, arrayLayerCount: 1 }),
            depthLoadOp: 'clear', depthStoreOp: 'store', depthClearValue: 1,
          },
        });
        pass.setBindGroup(0, shadowBG, [c * 256]);
        const cp = extractFrustumPlanes(cascades.viewProj[c]);
        for (const o of casters) {
          if (o.material.alphaMode === 'blend') continue;
          if (!aabbInFrustum(cp, o.worldBounds)) continue;
          pass.setPipeline(this.getPipelines(!!o._skin, o.material).shadow);
          drawMesh(pass, o);
        }
        pass.end();
      }
    }

    const frameBG = this.getFrameBG(T);
    const opaque = visible.filter((o) => o.material.alphaMode !== 'blend');
    const transparent = visible.filter((o) => o.material.alphaMode === 'blend');
    // sort opaque by pipeline/material for fewer state changes; viewmodel first (early-z rejects world behind it)
    opaque.sort((a, b) => (Number(b.viewmodel) - Number(a.viewmodel)) || (a.material.id - b.material.id));
    const cp3 = camera.position;
    transparent.sort((a, b) => vec3.distance(mat4.getTranslation(vec3.create(), b.transform), cp3) - vec3.distance(mat4.getTranslation(vec3.create(), a.transform), cp3));

    // ---- prepass
    {
      const pass = encoder.beginRenderPass({
        label: 'prepass',
        colorAttachments: [
          { view: T.normal.createView(), loadOp: 'clear', storeOp: 'store', clearValue: [0, 1, 0, 1] },
          { view: T.velocity.createView(), loadOp: 'clear', storeOp: 'store', clearValue: [0, 0, 0, 0] },
        ],
        depthStencilAttachment: { view: T.depth.createView(), depthLoadOp: 'clear', depthStoreOp: 'store', depthClearValue: 0 },
      });
      pass.setBindGroup(0, frameBG);
      for (const o of opaque) { pass.setPipeline(this.getPipelines(!!o._skin, o.material).prepass); drawMesh(pass, o); }
      pass.end();
    }

    // ---- GTAO
    if (S.gtao.enabled) {
      const g = S.gtao;
      const u = new Float32Array(16 * 2 + 12);
      u.set(invProj, 0); u.set(camera.view, 16);
      u.set([w, h, 1 / w, 1 / h], 32);
      u.set([g.radius, g.falloff, g.power, this.frameIndex], 36);
      u.set([projNJ[0], projNJ[5], g.steps, g.slices], 40);
      const pass = encoder.beginComputePass({ label: 'gtao' });
      pass.setPipeline(this.gtaoPipe);
      pass.setBindGroup(0, d.createBindGroup({
        layout: this.gtaoPipe.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: this.uniform('gtao', u) } },
          { binding: 1, resource: T.depth.createView() },
          { binding: 2, resource: T.normal.createView() },
          { binding: 3, resource: (g.blur ? T.aoRaw : T.ao).createView() },
        ],
      }));
      pass.dispatchWorkgroups(Math.ceil(w / 8), Math.ceil(h / 8));
      if (g.blur) {
        pass.setPipeline(this.aoBlurPipe);
        pass.setBindGroup(0, d.createBindGroup({
          layout: this.aoBlurPipe.getBindGroupLayout(0),
          entries: [
            { binding: 0, resource: T.aoRaw.createView() },
            { binding: 1, resource: T.depth.createView() },
            { binding: 2, resource: T.ao.createView() },
          ],
        }));
        pass.dispatchWorkgroups(Math.ceil(w / 8), Math.ceil(h / 8));
      }
      pass.end();
    }

    // ---- main forward pass (+ sky, decals, transparents, particles)
    this.decals.upload();
    this.particles.update(dt);
    this.particles.upload(camera.position);
    {
      const pass = encoder.beginRenderPass({
        label: 'main',
        colorAttachments: [{ view: T.hdr.createView(), loadOp: 'clear', storeOp: 'store', clearValue: [0, 0, 0, 1] }],
        depthStencilAttachment: { view: T.depth.createView(), depthReadOnly: true },
      });
      pass.setBindGroup(0, frameBG);
      for (const o of opaque) { pass.setPipeline(this.getPipelines(!!o._skin, o.material).main); drawMesh(pass, o); }
      pass.setPipeline(this.skyPipe);
      pass.draw(3);
      this.decals.draw(pass);
      pass.setBindGroup(0, frameBG);
      for (const o of transparent) { pass.setPipeline(this.getPipelines(!!o._skin, o.material).transparent); drawMesh(pass, o); }
      this.particles.draw(pass, T.depth);
      pass.end();
    }

    // ---- TAA
    const histIn = T.history[this.frameIndex & 1];
    const histOut = T.history[(this.frameIndex + 1) & 1];
    let resolved: GPUTexture = T.hdr;
    if (S.taa.enabled) {
      const u = new Float32Array(16 * 2 + 12);
      u.set(invViewProjNJ, 0); u.set(this.prevViewProj, 16);
      u.set([w, h, 1 / w, 1 / h], 32);
      u.set([S.taa.feedbackMin, S.taa.feedbackMax, S.taa.velocityWeight, this.historyValid ? 0 : 1], 36);
      u.set([jx * 0.5, -jy * 0.5, 0, 0], 40);
      const pass = encoder.beginComputePass({ label: 'taa' });
      pass.setPipeline(this.taaPipe);
      pass.setBindGroup(0, d.createBindGroup({
        layout: this.taaPipe.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: this.uniform('taa', u) } },
          { binding: 1, resource: T.hdr.createView() },
          { binding: 2, resource: histIn.createView() },
          { binding: 3, resource: T.velocity.createView() },
          { binding: 4, resource: T.depth.createView() },
          { binding: 5, resource: this.linearClamp },
          { binding: 6, resource: histOut.createView() },
          { binding: 7, resource: { buffer: this.exposureBuf } },
        ],
      }));
      pass.dispatchWorkgroups(Math.ceil(w / 8), Math.ceil(h / 8));
      pass.end();
      resolved = histOut;
    }

    // ---- depth of field (eye / lens): focus (accommodation) then gather
    if (S.dof.enabled && S.debugView === 0) {
      const D = S.dof;
      const pprW = h / (2 * Math.tan(camera.fovY / 2)), pprVm = h / (2 * Math.tan(camera.viewmodelFovY / 2));
      const u = new Float32Array([
        w, h, 1 / w, 1 / h,
        D.apertureMm / 1000, pprW, pprVm, D.maxBlurPx * (h / 1080),
        camera.near, camera.near * 0.25, S.viewmodelDepthSqueeze, 1,
        D.focusDistance, D.autoFocus ? 1 : 0, D.overrideDistance, D.overrideWeight,
        Math.min(dt, 0.1), D.focusSpeed, D.minFocus, 1.6 / Math.max(0.25, D.quality),
      ]);
      const ub = this.uniform('dof', u);
      const pass = encoder.beginComputePass({ label: 'dof' });
      pass.setPipeline(this.dofFocusPipe);
      pass.setBindGroup(0, d.createBindGroup({
        layout: this.dofFocusPipe.getBindGroupLayout(0),
        entries: [{ binding: 0, resource: { buffer: ub } }, { binding: 1, resource: T.depth.createView() }, { binding: 2, resource: { buffer: this.dofState } }],
      }));
      pass.dispatchWorkgroups(1);
      pass.setPipeline(this.dofGatherPipe);
      pass.setBindGroup(0, d.createBindGroup({
        layout: this.dofGatherPipe.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: ub } },
          { binding: 1, resource: resolved.createView() },
          { binding: 2, resource: T.depth.createView() },
          { binding: 3, resource: { buffer: this.dofState } },
          { binding: 4, resource: T.dof.createView() },
        ],
      }));
      pass.dispatchWorkgroups(Math.ceil(w / 8), Math.ceil(h / 8));
      pass.end();
      resolved = T.dof;
    }

    // ---- motion blur
    {
      const mb = S.motionBlur;
      const scale = (mb.shutterAngle / 360);
      const u = new Float32Array([w, h, 1 / w, 1 / h, scale, mb.maxPixels, mb.samples, mb.enabled ? 1 : 0]);
      const pass = encoder.beginComputePass({ label: 'motionblur' });
      pass.setPipeline(this.mbPipe);
      pass.setBindGroup(0, d.createBindGroup({
        layout: this.mbPipe.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: this.uniform('mb', u) } },
          { binding: 1, resource: resolved.createView() },
          { binding: 2, resource: T.velocity.createView() },
          { binding: 3, resource: T.depth.createView() },
          { binding: 4, resource: this.linearClamp },
          { binding: 5, resource: T.mb.createView() },
        ],
      }));
      pass.dispatchWorkgroups(Math.ceil(w / 8), Math.ceil(h / 8));
      pass.end();
    }
    const finalHdr = T.mb;

    // ---- auto exposure (histogram of this frame → exposure for the next)
    {
      const e = S.exposure;
      const logMin = -10, logRange = 40;
      let manualEv = e.ev100;
      if (e.mode === 'camera') manualEv = ev100FromCamera(camera.aperture, camera.shutter, camera.iso);
      const pass = encoder.beginComputePass({ label: 'exposure' });
      pass.setPipeline(this.histPipe);
      pass.setBindGroup(0, d.createBindGroup({
        layout: this.histPipe.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: this.uniform('hist', new Float32Array([w, h, 1 / w, 1 / h, logMin, logRange, e.centerWeight, 0])) } },
          { binding: 1, resource: finalHdr.createView() },
          { binding: 2, resource: { buffer: this.histBuf } },
          { binding: 3, resource: { buffer: this.exposureBuf } },
        ],
      }));
      pass.dispatchWorkgroups(Math.ceil(w / 32), Math.ceil(h / 32));
      pass.setPipeline(this.exposurePipe);
      pass.setBindGroup(0, d.createBindGroup({
        layout: this.exposurePipe.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: this.uniform('expo', new Float32Array([e.mode === 'auto' ? 0 : 1, manualEv, e.compensation, Math.min(dt, 0.1), e.minEv100, e.maxEv100, e.speedUp, e.speedDown, e.lowPercent, e.highPercent, logMin, logRange])) } },
          { binding: 1, resource: { buffer: this.histBuf } },
          { binding: 2, resource: { buffer: this.exposureBuf } },
        ],
      }));
      pass.dispatchWorkgroups(1);
      pass.end();
    }

    // ---- bloom
    const B = S.bloom;
    if (B.enabled && T.bloomDown.length > 1) {
      const pass = encoder.beginComputePass({ label: 'bloom' });
      pass.setPipeline(this.bloomDownPipe);
      let src: GPUTexture = finalHdr;
      for (let i = 0; i < T.bloomDown.length; i++) {
        const dst = T.bloomDown[i];
        pass.setBindGroup(0, d.createBindGroup({
          layout: this.bloomDownPipe.getBindGroupLayout(0),
          entries: [
            { binding: 0, resource: { buffer: this.uniform(`bd${i}`, new Float32Array([1 / src.width, 1 / src.height, 0, 0, i === 0 ? 1 : 0, B.clamp, 0, 0])) } },
            { binding: 1, resource: src.createView() },
            { binding: 2, resource: this.linearClamp },
            { binding: 3, resource: dst.createView() },
          ],
        }));
        pass.dispatchWorkgroups(Math.ceil(dst.width / 8), Math.ceil(dst.height / 8));
        src = dst;
      }
      pass.setPipeline(this.bloomUpPipe);
      const L = T.bloomDown.length;
      for (let i = L - 2; i >= 0; i--) {
        const low = i === L - 2 ? T.bloomDown[L - 1] : T.bloomUp[i + 1];
        const dst = T.bloomUp[i];
        pass.setBindGroup(0, d.createBindGroup({
          layout: this.bloomUpPipe.getBindGroupLayout(0),
          entries: [
            { binding: 0, resource: { buffer: this.uniform(`bu${i}`, new Float32Array([1 / low.width, 1 / low.height, 0, 0, B.radius, 0, 0, 0])) } },
            { binding: 1, resource: low.createView() },
            { binding: 2, resource: T.bloomDown[i].createView() },
            { binding: 3, resource: this.linearClamp },
            { binding: 4, resource: dst.createView() },
          ],
        }));
        pass.dispatchWorkgroups(Math.ceil(dst.width / 8), Math.ceil(dst.height / 8));
      }
      pass.end();
    }

    // ---- debug visualisation
    if (S.debugView > 0) {
      const pass = encoder.beginComputePass({ label: 'debug' });
      pass.setPipeline(this.debugPipe);
      pass.setBindGroup(0, d.createBindGroup({
        layout: this.debugPipe.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: this.uniform('dbg', new Float32Array([S.debugView, camera.near, w, h])) } },
          { binding: 1, resource: T.normal.createView() },
          { binding: 2, resource: T.ao.createView() },
          { binding: 3, resource: T.velocity.createView() },
          { binding: 4, resource: T.depth.createView() },
          { binding: 5, resource: finalHdr.createView() },
          { binding: 6, resource: { buffer: this.exposureBuf } },
          { binding: 7, resource: T.debug.createView() },
        ],
      }));
      pass.dispatchWorkgroups(Math.ceil(w / 8), Math.ceil(h / 8));
      pass.end();
    }

    // ---- composite → swapchain
    {
      const L = S.lens, G = S.grade, sn = S.sensor;
      // auto-exposure already normalises brightness; noise grows ~ with the 4th root of gain in that space
      const iso = sn.isoCoupled ? Math.pow(Math.max(camera.iso, 50) / 100, 0.25) : 1;
      const u = new Float32Array([
        cw, ch, 1 / cw, 1 / ch,
        L.distortion, L.distortion2, L.chromaticAberration, L.fillZoom,
        L.naturalVignette, L.vignette, L.vignetteRoundness, camera.fovY,
        B.enabled ? B.intensity : 0, 0, 0, 0,
        sn.readNoise, sn.shotNoise, sn.enabled ? iso * sn.gain : 0, this.frameIndex % 1024,
        G.contrast, G.saturation, G.temperature, G.tint,
        G.lift, G.gamma, G.gain, TONEMAP_ID[G.tonemapper],
        L.sharpen, G.dither, S.debugView, G.exposureBias,
      ]);
      const bloomTex = B.enabled && T.bloomUp.length > 1 ? T.bloomUp[0] : finalHdr;
      const pass = encoder.beginRenderPass({
        label: 'composite',
        colorAttachments: [{ view: this.outputView(cw, ch), loadOp: 'clear', storeOp: 'store', clearValue: [0, 0, 0, 1] }],
      });
      pass.setPipeline(this.compositePipe);
      pass.setBindGroup(0, d.createBindGroup({
        layout: this.compositePipe.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: this.uniform('composite', u) } },
          { binding: 1, resource: finalHdr.createView() },
          { binding: 2, resource: bloomTex.createView() },
          { binding: 3, resource: this.linearClamp },
          { binding: 5, resource: T.debug.createView() },
        ],
      }));
      pass.draw(3);
      pass.end();
    }

    d.queue.submit([encoder.finish()]);

    // ---- end of frame
    mat4.copy(this.prevViewProj, viewProjNJ);
    mat4.copy(this.prevVmViewProj, vmViewProjNJ);
    for (const o of all) if (o.visible) o._endFrame();
    for (const o of this.skinnedObjects) this.rotateSkin(o);
    this.historyValid = true;
    this.frameIndex++;
    this.stats.drawCalls = draws;
    this.stats.triangles = tris;
    this.stats.frameMs = performance.now() - t0;
  }

  private offscreenOut: GPUTexture | null = null;
  private outputView(w: number, h: number): GPUTextureView {
    if (!this.dev.offscreen) return this.dev.context.getCurrentTexture().createView();
    if (!this.offscreenOut || this.offscreenOut.width !== w || this.offscreenOut.height !== h) {
      this.offscreenOut?.destroy();
      this.offscreenOut = this.device.createTexture({ size: [w, h], format: 'rgba8unorm', usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC, label: 'offscreen.out' });
    }
    return this.offscreenOut.createView();
  }

  /** Offscreen mode: read the last composited frame back as RGBA8 (for tests, thumbnails, photo mode). */
  async readback(): Promise<{ width: number; height: number; data: Uint8Array }> {
    const t = this.offscreenOut;
    if (!t) throw new Error('readback requires Renderer.create(canvas, { offscreen: true })');
    const bpr = Math.ceil((t.width * 4) / 256) * 256;
    const buf = this.device.createBuffer({ size: bpr * t.height, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ });
    const enc = this.device.createCommandEncoder();
    enc.copyTextureToBuffer({ texture: t }, { buffer: buf, bytesPerRow: bpr }, [t.width, t.height]);
    this.device.queue.submit([enc.finish()]);
    await buf.mapAsync(GPUMapMode.READ);
    const src = new Uint8Array(buf.getMappedRange());
    const data = new Uint8Array(t.width * t.height * 4);
    for (let y = 0; y < t.height; y++) data.set(src.subarray(y * bpr, y * bpr + t.width * 4), y * t.width * 4);
    buf.unmap();
    buf.destroy();
    return { width: t.width, height: t.height, data };
  }

  /** Forget temporal history (camera cuts, teleports). */
  resetHistory() { this.historyValid = false; }

  // ------------------------------------------------------------------------------------------- skinning
  private updateSkin(o: RenderObject) {
    const j = o.joints!;
    const count = j.length / 16;
    if (!o._skin || o._skin.count !== count) {
      const size = Math.max(64, j.byteLength);
      o._skin?.cur.destroy(); o._skin?.prev.destroy();
      const cur = this.dev.createBuffer(size, GPUBufferUsage.STORAGE, 'joints');
      const prev = this.dev.createBuffer(size, GPUBufferUsage.STORAGE, 'joints.prev', j);
      o._skin = { cur, prev, bg: null, count };
      this.skinnedObjects.add(o);
    }
    this.device.queue.writeBuffer(o._skin.cur, 0, j as Float32Array<ArrayBuffer>);
  }
  private updateInstances(o: RenderObject) {
    const m = o.instances!;
    const bytes = Math.max(64, o.instanceCount * 64);
    if (!o._inst || o._inst.cap < bytes) {
      o._inst?.buf.destroy();
      const cap = Math.max(bytes, (o._inst?.cap ?? 0) * 2);
      o._inst = { buf: this.dev.createBuffer(cap, GPUBufferUsage.STORAGE, 'instances'), bg: null, cap };
      o.instancesDirty = true;
    }
    if (o.instancesDirty && o.instanceCount > 0) {
      this.device.queue.writeBuffer(o._inst.buf, 0, m as Float32Array<ArrayBuffer>, 0, o.instanceCount * 16);
      o.instancesDirty = false;
    }
  }
  private instBG(o: RenderObject): GPUBindGroup {
    const s = o._inst!;
    if (!s.bg) s.bg = this.makeObjectBG(s.buf, s.buf);
    return s.bg;
  }
  private skinBG(o: RenderObject): GPUBindGroup {
    const s = o._skin!;
    if (!s.bg) s.bg = this.makeObjectBG(s.cur, s.prev);
    return s.bg;
  }
  private rotateSkin(o: RenderObject) {
    // previous-frame joints = this frame's joints (copied for next frame's motion vectors)
    if (!o._skin || !o.joints) return;
    this.device.queue.writeBuffer(o._skin.prev, 0, o.joints as Float32Array<ArrayBuffer>);
  }
}
