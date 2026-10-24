// Particles (smoke, muzzle flash, sparks, dust) and projected surface decals (bullet holes, impact marks).
// Both render in the transparent stage, lit by the same sun/sky model as the opaque geometry.

import { WGSL_ATMOS, WGSL_BRDF, WGSL_CONSTANTS, WGSL_FRAME, WGSL_SHADOW, WGSL_UTIL } from './shaders/common';
import { FGLDevice } from './device';
import { mat4, Mat4, vec3, Vec3, rng } from './math';
import type { RenderObject } from './scene';

// =============================================================================================== particles
export const enum ParticleKind { Smoke = 0, Flash = 1, Spark = 2, Dust = 3 }

export interface ParticleSpawn {
  kind: ParticleKind;
  position: ArrayLike<number>;
  velocity?: ArrayLike<number>;
  life: number;
  size0: number;
  size1: number;
  /** Linear albedo for lit particles, emission colour for emissive ones. */
  color?: [number, number, number];
  alpha0?: number;
  alpha1?: number;
  /** Emitted luminance (cd/m²) — flashes/sparks. Decays with age^2. */
  luminance?: number;
  rotation?: number;
  spin?: number;
  /** Linear drag coefficient (1/s). */
  drag?: number;
  gravity?: number;
  /** Upward acceleration from hot gas (m/s²). */
  buoyancy?: number;
  /** Velocity-aligned stretch factor (sparks). */
  stretch?: number;
  /** Texture layer override. */
  layer?: number;
  /** Fraction of life spent fading in. */
  fadeIn?: number;
}

interface Particle extends Required<Omit<ParticleSpawn, 'position' | 'velocity' | 'color' | 'layer'>> {
  pos: Float32Array; vel: Float32Array; color: [number, number, number]; age: number; layer: number; fresh: boolean;
}

const PARTICLE_WGSL = WGSL_CONSTANTS + WGSL_FRAME + WGSL_UTIL + WGSL_BRDF + WGSL_ATMOS + /* wgsl */ `
struct Inst {
  @location(0) posSize: vec4f,
  @location(1) color: vec4f,      // rgb, alpha
  @location(2) params: vec4f,     // rotation, kind, luminance, stretch
  @location(3) vel: vec4f,        // velocity xyz, layer
};
struct VO {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
  @location(1) color: vec4f,
  @location(2) params: vec4f,
  @location(3) world: vec3f,
  @location(4) layer: f32,
  @location(5) viewZ: f32,
};
@group(1) @binding(0) var atlas: texture_2d_array<f32>;
@group(1) @binding(1) var samp: sampler;
@group(1) @binding(2) var sceneDepth: texture_depth_2d;

@vertex fn vs(@builtin(vertex_index) vi: u32, inst: Inst) -> VO {
  let corner = vec2f(f32(vi & 1u), f32((vi >> 1u) & 1u)) * 2.0 - 1.0;
  let camRight = vec3f(frame.view[0][0], frame.view[1][0], frame.view[2][0]);
  let camUp = vec3f(frame.view[0][1], frame.view[1][1], frame.view[2][1]);
  let rot = inst.params.x;
  var right = camRight * cos(rot) + camUp * sin(rot);
  var up = -camRight * sin(rot) + camUp * cos(rot);
  var half = vec2f(inst.posSize.w);
  let stretch = inst.params.w;
  if (stretch > 0.0) {
    // velocity-aligned streak (sparks / tracers)
    let toCam = normalize(frame.camPos.xyz - inst.posSize.xyz);
    let v = inst.vel.xyz;
    let vl = length(v);
    if (vl > 1e-3) {
      let d = v / vl;
      right = d;
      up = normalize(cross(d, toCam));
      half = vec2f(inst.posSize.w + vl * stretch, inst.posSize.w);
    }
  }
  let world = inst.posSize.xyz + right * corner.x * half.x + up * corner.y * half.y;
  var o: VO;
  o.pos = frame.viewProj * vec4f(world, 1.0);
  o.uv = corner * 0.5 + 0.5;
  o.color = inst.color;
  o.params = inst.params;
  o.world = world;
  o.layer = inst.vel.w;
  o.viewZ = -(frame.view * vec4f(world, 1.0)).z;
  return o;
}

fn linearDepth(d: f32) -> f32 { return frame.camPos.w / max(d, 1e-7); }

@fragment fn fs(i: VO) -> @location(0) vec4f {
  let tex = textureSample(atlas, samp, i.uv, i32(i.layer + 0.5));
  // soft particles: fade where the sprite intersects opaque geometry
  let sd = textureLoad(sceneDepth, vec2i(i.pos.xy), 0);
  let sceneZ = select(1e6, linearDepth(sd), sd > 0.0);
  let soft = saturate((sceneZ - i.viewZ) / max(0.15 * i.params.x * 0.0 + 0.25, 0.01));
  let kind = u32(i.params.y + 0.5);
  var rgb = vec3f(0.0);
  var a = tex.a * i.color.a * soft;
  if (kind == 1u || kind == 2u) {
    // emissive (flash core / hot sparks): additive via premultiplied alpha = 0
    rgb = i.color.rgb * tex.rgb * i.params.z * i.color.a * soft;
    a = 0.0;
  } else {
    // lit participating medium: sun with HG forward scattering + sky ambient
    let V = normalize(frame.camPos.xyz - i.world);
    let phase = phaseHG(dot(-V, frame.sunDir.xyz), 0.55) * 4.0 * PI;
    let ambient = shIrradiance(vec3f(0.0, 1.0, 0.0)) * 0.6 + shIrradiance(-V) * 0.4;
    let lit = i.color.rgb * (frame.sunColor.rgb * INV_PI * mix(0.35, phase, 0.6) * 0.8 + ambient);
    let fog = heightFog(frame.camPos.xyz, i.world);
    rgb = (lit * fog.a + fog.rgb) * tex.rgb * a;
  }
  return vec4f(min(rgb * exposure.current, vec3f(HALF_MAX)), a);
}
`;

function makeAtlas(size: number): Uint8Array<ArrayBuffer> {
  const layers = 4;
  const out = new Uint8Array(size * size * 4 * layers);
  const r = rng(1234);
  // value-noise helpers
  const lattice = new Float32Array(64 * 64).map(() => r.next());
  const vnoise = (x: number, y: number) => {
    const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi;
    const g = (i: number, j: number) => lattice[((j & 63) * 64 + (i & 63))];
    const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
    return (g(xi, yi) * (1 - sx) + g(xi + 1, yi) * sx) * (1 - sy) + (g(xi, yi + 1) * (1 - sx) + g(xi + 1, yi + 1) * sx) * sy;
  };
  const fbm = (x: number, y: number) => { let s = 0, a = 0.5, f = 1; for (let o = 0; o < 5; o++) { s += a * vnoise(x * f, y * f); a *= 0.5; f *= 2; } return s; };
  for (let L = 0; L < layers; L++) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const u = (x + 0.5) / size * 2 - 1, v = (y + 0.5) / size * 2 - 1;
        const d = Math.hypot(u, v);
        let a = 0, c = 255;
        if (L === 0) { // smoke puff: billowy noise inside a soft circle
          const n = fbm(u * 2.2 + 5, v * 2.2 + 3);
          a = Math.max(0, Math.min(1, (1 - d * d) * 1.2)) * Math.max(0, Math.min(1, n * 1.8 - 0.25));
          c = Math.round(200 + 55 * n);
        } else if (L === 1) { // muzzle flash: star of tapered petals + hot core
          const ang = Math.atan2(v, u);
          const petals = Math.pow(Math.abs(Math.cos(ang * 2.5)), 6) * 0.6 + Math.pow(Math.abs(Math.cos(ang * 4 + 0.6)), 10) * 0.4;
          const n = fbm(u * 4 + 11, v * 4 + 7);
          const reach = 0.25 + 0.75 * petals * (0.6 + 0.6 * n);
          a = Math.max(0, 1 - d / reach) ** 1.5 + Math.max(0, 1 - d / 0.25) ** 2;
          a = Math.min(1, a);
          c = 255;
        } else if (L === 2) { // spark streak: gaussian line
          a = Math.exp(-(v * v) * 40) * Math.max(0, 1 - Math.abs(u)) ;
          c = 255;
        } else { // dust: grainy irregular puff
          const n = fbm(u * 5 + 21, v * 5 + 13);
          a = Math.max(0, 1 - d) ** 1.4 * Math.max(0, n * 1.6 - 0.35);
          c = Math.round(180 + 75 * n);
        }
        const o = ((L * size + y) * size + x) * 4;
        out[o] = c; out[o + 1] = c; out[o + 2] = c; out[o + 3] = Math.round(Math.max(0, Math.min(1, a)) * 255);
      }
    }
  }
  return out;
}

export class ParticleSystem {
  readonly particles: Particle[] = [];
  maxParticles = 4096;
  /** Wind (m/s) applied to smoke/dust. */
  readonly wind: Vec3 = vec3.create(1.5, 0, 0.5);
  private instanceBuffer: GPUBuffer;
  private capacity = 1024;
  private data = new Float32Array(1024 * 16);
  private atlas: GPUTexture;
  private sampler: GPUSampler;
  pipeline: GPURenderPipeline | null = null;
  private bg: GPUBindGroup | null = null;
  private bgDepth: GPUTexture | null = null;
  private random = rng(77);
  count = 0;

  constructor(private dev: FGLDevice) {
    this.instanceBuffer = dev.createBuffer(this.capacity * 64, GPUBufferUsage.VERTEX, 'particles.inst');
    const size = 128;
    this.atlas = dev.device.createTexture({ size: [size, size, 4], format: 'rgba8unorm', usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST, label: 'particle.atlas' });
    dev.device.queue.writeTexture({ texture: this.atlas }, makeAtlas(size), { bytesPerRow: size * 4, rowsPerImage: size }, [size, size, 4]);
    this.sampler = dev.device.createSampler({ magFilter: 'linear', minFilter: 'linear' });
  }

  get random01() { return this.random.next(); }

  spawn(p: ParticleSpawn) {
    if (this.particles.length >= this.maxParticles) this.particles.shift();
    this.particles.push({
      kind: p.kind,
      pos: Float32Array.from(p.position as ArrayLike<number>),
      vel: Float32Array.from((p.velocity ?? [0, 0, 0]) as ArrayLike<number>),
      life: p.life,
      size0: p.size0,
      size1: p.size1,
      color: p.color ?? [1, 1, 1],
      alpha0: p.alpha0 ?? 1,
      alpha1: p.alpha1 ?? 0,
      luminance: p.luminance ?? 0,
      rotation: p.rotation ?? this.random.next() * Math.PI * 2,
      spin: p.spin ?? 0,
      drag: p.drag ?? 0,
      gravity: p.gravity ?? 0,
      buoyancy: p.buoyancy ?? 0,
      stretch: p.stretch ?? 0,
      layer: p.layer ?? (p.kind === ParticleKind.Spark ? 2 : p.kind),
      fadeIn: p.fadeIn ?? 0.05,
      age: 0,
      fresh: true,
    });
  }

  update(dt: number) {
    const ps = this.particles;
    let w = 0;
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      // particles spawned this frame are always drawn once (a 1 ms muzzle flash must reach the image)
      if (p.fresh) { p.fresh = false; ps[w++] = p; continue; }
      p.age += dt;
      if (p.age >= p.life) continue;
      const windFollow = p.kind === ParticleKind.Smoke || p.kind === ParticleKind.Dust ? 1 : 0;
      for (let k = 0; k < 3; k++) {
        const rel = p.vel[k] - this.wind[k] * windFollow;
        p.vel[k] -= rel * Math.min(1, p.drag * dt);
      }
      p.vel[1] += (p.buoyancy - p.gravity) * dt;
      p.pos[0] += p.vel[0] * dt; p.pos[1] += p.vel[1] * dt; p.pos[2] += p.vel[2] * dt;
      p.rotation += p.spin * dt;
      ps[w++] = p;
    }
    ps.length = w;
  }

  /** Writes instance data; returns instance count. Sorted back-to-front for correct blending. */
  upload(camPos: ArrayLike<number>): number {
    const ps = this.particles;
    const n = ps.length;
    if (n > this.capacity) {
      this.capacity = Math.ceil(n * 1.5);
      this.instanceBuffer.destroy();
      this.instanceBuffer = this.dev.createBuffer(this.capacity * 64, GPUBufferUsage.VERTEX, 'particles.inst');
      this.data = new Float32Array(this.capacity * 16);
    }
    const d2 = (p: Particle) => (p.pos[0] - camPos[0]) ** 2 + (p.pos[1] - camPos[1]) ** 2 + (p.pos[2] - camPos[2]) ** 2;
    ps.sort((a, b) => d2(b) - d2(a));
    const D = this.data;
    for (let i = 0; i < n; i++) {
      const p = ps[i], o = i * 16;
      const t = p.age / p.life;
      const fade = Math.min(1, t / Math.max(p.fadeIn, 1e-3));
      const size = p.size0 + (p.size1 - p.size0) * Math.sqrt(t);
      const alpha = (p.alpha0 + (p.alpha1 - p.alpha0) * t) * fade;
      D[o] = p.pos[0]; D[o + 1] = p.pos[1]; D[o + 2] = p.pos[2]; D[o + 3] = size;
      D[o + 4] = p.color[0]; D[o + 5] = p.color[1]; D[o + 6] = p.color[2]; D[o + 7] = alpha;
      D[o + 8] = p.rotation; D[o + 9] = p.kind; D[o + 10] = p.luminance * (1 - t) * (1 - t); D[o + 11] = p.stretch;
      D[o + 12] = p.vel[0]; D[o + 13] = p.vel[1]; D[o + 14] = p.vel[2]; D[o + 15] = p.layer;
    }
    if (n) this.dev.device.queue.writeBuffer(this.instanceBuffer, 0, D, 0, n * 16);
    this.count = n;
    return n;
  }

  createPipeline(frameLayout: GPUBindGroupLayout, colorFormat: GPUTextureFormat) {
    const d = this.dev.device;
    const module = this.dev.shader(PARTICLE_WGSL, 'particles');
    const layout1 = d.createBindGroupLayout({
      entries: [
        { binding: 0, visibility: GPUShaderStage.FRAGMENT, texture: { viewDimension: '2d-array' } },
        { binding: 1, visibility: GPUShaderStage.FRAGMENT, sampler: {} },
        { binding: 2, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth' } },
      ],
    });
    this.pipeline = d.createRenderPipeline({
      label: 'particles',
      layout: d.createPipelineLayout({ bindGroupLayouts: [frameLayout, layout1] }),
      vertex: {
        module, entryPoint: 'vs',
        buffers: [{
          arrayStride: 64, stepMode: 'instance',
          attributes: [
            { shaderLocation: 0, offset: 0, format: 'float32x4' },
            { shaderLocation: 1, offset: 16, format: 'float32x4' },
            { shaderLocation: 2, offset: 32, format: 'float32x4' },
            { shaderLocation: 3, offset: 48, format: 'float32x4' },
          ],
        }],
      },
      fragment: {
        module, entryPoint: 'fs',
        targets: [{ format: colorFormat, blend: { color: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha' }, alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha' } } }],
      },
      primitive: { topology: 'triangle-strip' },
      depthStencil: { format: 'depth32float', depthWriteEnabled: false, depthCompare: 'greater-equal' },
    });
    this.bg = null;
    return layout1;
  }

  draw(pass: GPURenderPassEncoder, depth: GPUTexture) {
    if (!this.pipeline || this.count === 0) return;
    if (!this.bg || this.bgDepth !== depth) {
      this.bg = this.dev.device.createBindGroup({
        layout: this.pipeline.getBindGroupLayout(1),
        entries: [
          { binding: 0, resource: this.atlas.createView({ dimension: '2d-array' }) },
          { binding: 1, resource: this.sampler },
          { binding: 2, resource: depth.createView() },
        ],
      });
      this.bgDepth = depth;
    }
    pass.setPipeline(this.pipeline);
    pass.setBindGroup(1, this.bg);
    pass.setVertexBuffer(0, this.instanceBuffer);
    pass.draw(4, this.count);
  }
}

// =============================================================================================== decals
export const enum DecalKind { MetalHit = 0, WoodHole = 1, ConcreteChip = 2, PaperHole = 3, LeadSplash = 4, DirtMark = 5 }

export interface Decal {
  local: Mat4;
  parent: RenderObject | null;
  kind: DecalKind;
  /** Additional tint for the decal albedo. */
  tint: [number, number, number];
  age: number;
}

const DECAL_WGSL = WGSL_CONSTANTS + WGSL_FRAME + WGSL_UTIL + WGSL_BRDF + WGSL_SHADOW + WGSL_ATMOS + /* wgsl */ `
struct Inst {
  @location(0) m0: vec4f, @location(1) m1: vec4f, @location(2) m2: vec4f, @location(3) m3: vec4f,
  @location(4) params: vec4f, // layer, tint rgb packed? -> x layer, yzw tint
};
struct VO {
  @builtin(position) pos: vec4f,
  @location(0) uv: vec2f,
  @location(1) world: vec3f,
  @location(2) n: vec3f,
  @location(3) t: vec3f,
  @location(4) params: vec4f,
  @location(5) viewDepth: f32,
};
@group(1) @binding(0) var albedoArr: texture_2d_array<f32>;
@group(1) @binding(1) var normalArr: texture_2d_array<f32>;
@group(1) @binding(2) var samp: sampler;
@vertex fn vs(@builtin(vertex_index) vi: u32, inst: Inst) -> VO {
  let c = vec2f(f32(vi & 1u), f32((vi >> 1u) & 1u)) - 0.5;
  let m = mat4x4f(inst.m0, inst.m1, inst.m2, inst.m3);
  let wp = m * vec4f(c.x, c.y, 0.0, 1.0);
  var o: VO;
  o.pos = frame.viewProj * wp;
  o.uv = c + 0.5;
  o.world = wp.xyz;
  o.n = normalize((m * vec4f(0.0, 0.0, 1.0, 0.0)).xyz);
  o.t = normalize((m * vec4f(1.0, 0.0, 0.0, 0.0)).xyz);
  o.params = inst.params;
  o.viewDepth = -(frame.view * wp).z;
  return o;
}
@fragment fn fs(i: VO) -> @location(0) vec4f {
  let layer = i32(i.params.x + 0.5);
  let alb = textureSample(albedoArr, samp, i.uv, layer);
  let nm = textureSample(normalArr, samp, i.uv, layer);
  let a = alb.a;
  if (a < 0.01) { discard; }
  let T = normalize(i.t - i.n * dot(i.t, i.n));
  let B = cross(i.n, T);
  let nt = nm.xyz * 2.0 - 1.0;
  var s: Surface;
  s.N = normalize(T * nt.x + B * nt.y + i.n * nt.z);
  s.pos = i.world;
  s.V = normalize(frame.camPos.xyz - i.world);
  s.NoV = max(dot(s.N, s.V), 1e-4);
  let rough = nm.a;
  s.perceptualRoughness = max(rough, 0.05);
  s.a = s.perceptualRoughness * s.perceptualRoughness;
  // decal albedo alpha channel encodes metalness in the upper half of values: bright metal ring on painted steel
  let metal = select(0.0, 1.0, layer == 0 || layer == 4) * smoothstep(0.55, 0.85, alb.r) ;
  let base = alb.rgb * i.params.yzw;
  s.metallic = metal;
  s.f0 = mix(vec3f(0.04), base, metal);
  s.albedo = base * (1.0 - metal);
  s.energyComp = vec3f(1.0);
  s.ao = 1.0;
  let noise = ign(i.pos.xy, frame.time.z);
  let vis = sunShadow(i.world, i.n, i.viewDepth, noise);
  var c = shadeLight(s, frame.sunDir.xyz, areaRoughness(s.a, frame.shadow.z)) * frame.sunColor.rgb * vis;
  c += shIrradiance(s.N) * s.albedo * frame.time.w;
  let R = reflect(-s.V, s.N);
  c += textureSampleLevel(envSpecular, linearClamp, R, s.perceptualRoughness * frame.envParams.x).rgb * s.f0 * frame.time.w * 0.8;
  let fog = heightFog(frame.camPos.xyz, i.world);
  c = c * fog.a + fog.rgb;
  return vec4f(min(c * exposure.current, vec3f(HALF_MAX)) * a, a);
}
`;

function makeDecalAtlas(size: number): { albedo: Uint8Array<ArrayBuffer>; normal: Uint8Array<ArrayBuffer>; layers: number } {
  const layers = 6;
  const alb = new Uint8Array(size * size * 4 * layers);
  const nrm = new Uint8Array(size * size * 4 * layers);
  const r = rng(99);
  const jag = Array.from({ length: 64 }, () => r.next());
  for (let L = 0; L < layers; L++) {
    const height = new Float32Array(size * size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const u = (x + 0.5) / size * 2 - 1, v = (y + 0.5) / size * 2 - 1;
        const d = Math.hypot(u, v);
        const ang = Math.atan2(v, u);
        const ragged = 1 + 0.18 * (jag[Math.floor(((ang + Math.PI) / (2 * Math.PI)) * 63)] - 0.5) * 2;
        let col = [0, 0, 0], a = 0, h = 0, rough = 0.6;
        switch (L) {
          case 0: { // hit on painted steel: lead-smeared crater, ring of bare polished metal, paint spall
            const core = d < 0.14 * ragged, ring = d < 0.32 * ragged, spall = d < 0.62 * ragged;
            if (core) { col = [0.16, 0.16, 0.17]; a = 1; h = -0.6; rough = 0.55; }
            else if (ring) { col = [0.78, 0.79, 0.8]; a = 1; h = -0.15 + 0.15 * Math.cos(d * 30); rough = 0.22; }
            else if (spall) { col = [0.22, 0.21, 0.2]; a = Math.min(1, (0.62 * ragged - d) * 12); h = -0.05; rough = 0.5; }
            break;
          }
          case 1: { // hole in wood: dark hole + splintered lighter fibres
            const hole = d < 0.12 * ragged;
            const splinter = Math.abs(Math.sin(ang * 7 + jag[3] * 6)) > 0.6 && d < 0.45 * ragged;
            if (hole) { col = [0.02, 0.015, 0.01]; a = 1; h = -1; rough = 0.95; }
            else if (splinter) { col = [0.75, 0.6, 0.42]; a = Math.min(1, (0.45 * ragged - d) * 6); h = 0.2; rough = 0.75; }
            else if (d < 0.25 * ragged) { col = [0.3, 0.2, 0.12]; a = 0.8; h = -0.2; rough = 0.8; }
            break;
          }
          case 2: { // concrete chip: light grey crater with dust ring
            if (d < 0.3 * ragged) { col = [0.62, 0.61, 0.58]; a = 1; h = -0.8 * (1 - d / (0.3 * ragged)); rough = 0.95; }
            else if (d < 0.75) { col = [0.58, 0.57, 0.54]; a = Math.max(0, 0.6 * (1 - (d - 0.3) / 0.45)); h = 0; rough = 0.95; }
            break;
          }
          case 3: { // paper hole: clean punched hole, slight grey wipe ring (bullet wipe)
            if (d < 0.2) { col = [0.01, 0.01, 0.01]; a = 1; h = -1; rough = 1; }
            else if (d < 0.27) { col = [0.25, 0.25, 0.26]; a = 0.85; h = 0; rough = 0.8; }
            break;
          }
          case 4: { // lead splash on steel (radial grey streaks)
            const streak = Math.pow(Math.abs(Math.cos(ang * 9 + jag[7] * 5)), 4);
            if (d < 0.18) { col = [0.55, 0.55, 0.57]; a = 1; h = 0.2; rough = 0.35; }
            else if (d < (0.3 + 0.6 * streak) * ragged) { col = [0.5, 0.5, 0.52]; a = Math.max(0, 1 - d) * 0.9; h = 0.05; rough = 0.4; }
            break;
          }
          default: { // dirt impact mark: dark disturbed soil
            if (d < 0.7 * ragged) { col = [0.12, 0.09, 0.06]; a = Math.max(0, 1 - d / (0.7 * ragged)) * 0.9; h = -0.3 * (1 - d); rough = 1; }
          }
        }
        height[y * size + x] = h;
        const o = ((L * size + y) * size + x) * 4;
        // albedo stored sRGB-ish (texture created as srgb)
        alb[o] = Math.round(Math.pow(col[0], 1 / 2.2) * 255); alb[o + 1] = Math.round(Math.pow(col[1], 1 / 2.2) * 255); alb[o + 2] = Math.round(Math.pow(col[2], 1 / 2.2) * 255);
        alb[o + 3] = Math.round(Math.max(0, Math.min(1, a)) * 255);
        nrm[o + 3] = Math.round(rough * 255);
      }
    }
    const scale = 6;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const hx = height[y * size + Math.min(size - 1, x + 1)] - height[y * size + Math.max(0, x - 1)];
        const hy = height[Math.min(size - 1, y + 1) * size + x] - height[Math.max(0, y - 1) * size + x];
        let nx = -hx * scale, ny = hy * scale, nz = 1;
        const l = Math.hypot(nx, ny, nz); nx /= l; ny /= l; nz /= l;
        const o = ((L * size + y) * size + x) * 4;
        nrm[o] = Math.round((nx * 0.5 + 0.5) * 255); nrm[o + 1] = Math.round((ny * 0.5 + 0.5) * 255); nrm[o + 2] = Math.round((nz * 0.5 + 0.5) * 255);
      }
    }
  }
  return { albedo: alb, normal: nrm, layers };
}

export class DecalSystem {
  readonly decals: Decal[] = [];
  maxDecals = 512;
  private buffer: GPUBuffer;
  private capacity = 512;
  private data = new Float32Array(512 * 20);
  private albedo: GPUTexture;
  private normal: GPUTexture;
  private sampler: GPUSampler;
  pipeline: GPURenderPipeline | null = null;
  private bg: GPUBindGroup | null = null;
  count = 0;
  private tmp = mat4.create();

  constructor(private dev: FGLDevice) {
    this.buffer = dev.createBuffer(this.capacity * 80, GPUBufferUsage.VERTEX, 'decals.inst');
    const size = 128;
    const at = makeDecalAtlas(size);
    const mk = (fmt: GPUTextureFormat, data: Uint8Array<ArrayBuffer>, label: string) => {
      const t = dev.device.createTexture({ size: [size, size, at.layers], format: fmt, usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST, label });
      dev.device.queue.writeTexture({ texture: t }, data, { bytesPerRow: size * 4, rowsPerImage: size }, [size, size, at.layers]);
      return t;
    };
    this.albedo = mk('rgba8unorm-srgb', at.albedo, 'decal.albedo');
    this.normal = mk('rgba8unorm', at.normal, 'decal.normal');
    this.sampler = dev.device.createSampler({ magFilter: 'linear', minFilter: 'linear', addressModeU: 'clamp-to-edge', addressModeV: 'clamp-to-edge' });
  }

  /**
   * Place a decal at `point` facing `normal`, `size` metres across. If `parent` is given, the decal follows it
   * (e.g. swinging steel targets).
   */
  add(kind: DecalKind, point: ArrayLike<number>, normal: ArrayLike<number>, size: number, parent: RenderObject | null = null, tint: [number, number, number] = [1, 1, 1], rotation = Math.random() * Math.PI * 2) {
    const n = vec3.normalize(vec3.create(), vec3.clone(normal));
    const up = Math.abs(n[1]) > 0.95 ? vec3.create(1, 0, 0) : vec3.create(0, 1, 0);
    const t = vec3.normalize(vec3.create(), vec3.cross(vec3.create(), up, n));
    const b = vec3.cross(vec3.create(), n, t);
    const c = Math.cos(rotation), s = Math.sin(rotation);
    const tx = vec3.create(t[0] * c + b[0] * s, t[1] * c + b[1] * s, t[2] * c + b[2] * s);
    const bx = vec3.cross(vec3.create(), n, tx);
    const offset = 0.0015; // lift off the surface to avoid z-fighting
    const m = mat4.create();
    m[0] = tx[0] * size; m[1] = tx[1] * size; m[2] = tx[2] * size;
    m[4] = bx[0] * size; m[5] = bx[1] * size; m[6] = bx[2] * size;
    m[8] = n[0]; m[9] = n[1]; m[10] = n[2];
    m[12] = point[0] + n[0] * offset; m[13] = point[1] + n[1] * offset; m[14] = point[2] + n[2] * offset;
    let local = m;
    if (parent) {
      const inv = mat4.invert(mat4.create(), parent.transform)!;
      local = mat4.multiply(mat4.create(), inv, m);
    }
    if (this.decals.length >= this.maxDecals) this.decals.shift();
    this.decals.push({ local, parent, kind, tint, age: 0 });
  }

  clear() { this.decals.length = 0; }

  upload(): number {
    const n = this.decals.length;
    if (n > this.capacity) {
      this.capacity = Math.ceil(n * 1.5);
      this.buffer.destroy();
      this.buffer = this.dev.createBuffer(this.capacity * 80, GPUBufferUsage.VERTEX, 'decals.inst');
      this.data = new Float32Array(this.capacity * 20);
    }
    for (let i = 0; i < n; i++) {
      const d = this.decals[i];
      const w = d.parent ? mat4.multiply(this.tmp, d.parent.transform, d.local) : d.local;
      this.data.set(w, i * 20);
      this.data[i * 20 + 16] = d.kind;
      this.data[i * 20 + 17] = d.tint[0]; this.data[i * 20 + 18] = d.tint[1]; this.data[i * 20 + 19] = d.tint[2];
    }
    if (n) this.dev.device.queue.writeBuffer(this.buffer, 0, this.data, 0, n * 20);
    this.count = n;
    return n;
  }

  createPipeline(frameLayout: GPUBindGroupLayout, colorFormat: GPUTextureFormat) {
    const d = this.dev.device;
    const module = this.dev.shader(DECAL_WGSL, 'decals');
    const layout1 = d.createBindGroupLayout({
      entries: [
        { binding: 0, visibility: GPUShaderStage.FRAGMENT, texture: { viewDimension: '2d-array' } },
        { binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: { viewDimension: '2d-array' } },
        { binding: 2, visibility: GPUShaderStage.FRAGMENT, sampler: {} },
      ],
    });
    this.pipeline = d.createRenderPipeline({
      label: 'decals',
      layout: d.createPipelineLayout({ bindGroupLayouts: [frameLayout, layout1] }),
      vertex: {
        module, entryPoint: 'vs',
        buffers: [{
          arrayStride: 80, stepMode: 'instance',
          attributes: [0, 1, 2, 3, 4].map((k) => ({ shaderLocation: k, offset: k * 16, format: 'float32x4' as GPUVertexFormat })),
        }],
      },
      fragment: {
        module, entryPoint: 'fs',
        targets: [{ format: colorFormat, blend: { color: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha' }, alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha' } } }],
      },
      primitive: { topology: 'triangle-strip' },
      depthStencil: { format: 'depth32float', depthWriteEnabled: false, depthCompare: 'greater-equal', depthBias: 2, depthBiasSlopeScale: 2 },
    });
    this.bg = d.createBindGroup({
      layout: layout1,
      entries: [
        { binding: 0, resource: this.albedo.createView({ dimension: '2d-array' }) },
        { binding: 1, resource: this.normal.createView({ dimension: '2d-array' }) },
        { binding: 2, resource: this.sampler },
      ],
    });
  }

  draw(pass: GPURenderPassEncoder) {
    if (!this.pipeline || !this.bg || this.count === 0) return;
    pass.setPipeline(this.pipeline);
    pass.setBindGroup(1, this.bg);
    pass.setVertexBuffer(0, this.buffer);
    pass.draw(4, this.count);
  }
}
