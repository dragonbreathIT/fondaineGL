// Image-based lighting: GGX-prefiltered specular cube (filtered importance sampling), L2 SH irradiance,
// and the split-sum DFG LUT (with multiple-scattering energy compensation inputs).

import { FGLDevice, mipCount } from './device';

const COMMON = /* wgsl */ `
const PI: f32 = 3.14159265359;
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
fn hammersley(i: u32, n: u32) -> vec2f {
  var b = i;
  b = (b << 16u) | (b >> 16u);
  b = ((b & 0x55555555u) << 1u) | ((b & 0xAAAAAAAAu) >> 1u);
  b = ((b & 0x33333333u) << 2u) | ((b & 0xCCCCCCCCu) >> 2u);
  b = ((b & 0x0F0F0F0Fu) << 4u) | ((b & 0xF0F0F0F0u) >> 4u);
  b = ((b & 0x00FF00FFu) << 8u) | ((b & 0xFF00FF00u) >> 8u);
  return vec2f(f32(i) / f32(n), f32(b) * 2.3283064365386963e-10);
}
fn importanceGGX(xi: vec2f, N: vec3f, a: f32) -> vec3f {
  let phi = 2.0 * PI * xi.x;
  let cosT = sqrt((1.0 - xi.y) / (1.0 + (a * a - 1.0) * xi.y));
  let sinT = sqrt(1.0 - cosT * cosT);
  let H = vec3f(cos(phi) * sinT, sin(phi) * sinT, cosT);
  let up = select(vec3f(1.0, 0.0, 0.0), vec3f(0.0, 0.0, 1.0), abs(N.z) < 0.999);
  let T = normalize(cross(up, N));
  let B = cross(N, T);
  return normalize(T * H.x + B * H.y + N * H.z);
}
fn D_GGX(NoH: f32, a: f32) -> f32 {
  let a2 = a * a;
  let f = (NoH * a2 - NoH) * NoH + 1.0;
  return a2 / (PI * f * f);
}
`;

const PREFILTER_WGSL = COMMON + /* wgsl */ `
struct PU { roughness: f32, outSize: f32, srcSize: f32, samples: f32 };
@group(0) @binding(0) var<uniform> U: PU;
@group(0) @binding(1) var src: texture_cube<f32>;
@group(0) @binding(2) var samp: sampler;
@group(0) @binding(3) var dst: texture_storage_2d_array<rgba16float, write>;
@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let size = u32(U.outSize);
  if (id.x >= size || id.y >= size) { return; }
  let N = faceDir(id.z, (vec2f(id.xy) + 0.5) / U.outSize);
  let a = max(U.roughness * U.roughness, 1e-4);
  if (U.roughness < 1e-3) {
    textureStore(dst, vec2i(id.xy), i32(id.z), textureSampleLevel(src, samp, N, 0.0));
    return;
  }
  let n = u32(U.samples);
  var acc = vec3f(0.0);
  var w = 0.0;
  let texelSA = 4.0 * PI / (6.0 * U.srcSize * U.srcSize);
  for (var i = 0u; i < n; i++) {
    let H = importanceGGX(hammersley(i, n), N, a);
    let L = normalize(2.0 * dot(N, H) * H - N);
    let NoL = dot(N, L);
    if (NoL > 0.0) {
      let NoH = saturate(dot(N, H));
      let pdf = D_GGX(NoH, a) * 0.25; // V = N: pdf = D*NoH/(4 VoH) = D/4
      let sampleSA = 1.0 / (f32(n) * pdf + 1e-4);
      let lod = max(0.5 * log2(sampleSA / texelSA) + 1.0, 0.0);
      acc += textureSampleLevel(src, samp, L, lod).rgb * NoL;
      w += NoL;
    }
  }
  textureStore(dst, vec2i(id.xy), i32(id.z), vec4f(acc / max(w, 1e-4), 1.0));
}
fn saturate(x: f32) -> f32 { return clamp(x, 0.0, 1.0); }
`;

const SH_WGSL = COMMON + /* wgsl */ `
@group(0) @binding(0) var src: texture_cube<f32>;
@group(0) @binding(1) var samp: sampler;
@group(0) @binding(2) var<storage, read_write> outSH: array<vec4f, 9>;
const N: u32 = 64u;           // threads
const RES: u32 = 32u;         // sample grid per face
var<workgroup> acc: array<array<vec3f, 9>, 64>;
@compute @workgroup_size(64)
fn main(@builtin(local_invocation_index) li: u32) {
  var c: array<vec3f, 9>;
  for (var k = 0u; k < 9u; k++) { c[k] = vec3f(0.0); }
  let total = 6u * RES * RES;
  for (var idx = li; idx < total; idx += N) {
    let face = idx / (RES * RES);
    let rem = idx % (RES * RES);
    let px = rem % RES;
    let py = rem / RES;
    let uv = (vec2f(f32(px), f32(py)) + 0.5) / f32(RES);
    let a = uv * 2.0 - 1.0;
    // texel solid angle on a unit cube face
    let tmp = 1.0 + a.x * a.x + a.y * a.y;
    let dA = 4.0 / f32(RES * RES);
    let sa = dA / (tmp * sqrt(tmp));
    let d = faceDir(face, uv);
    let L = textureSampleLevel(src, samp, d, 2.0).rgb * sa;
    c[0] += L * 0.282095;
    c[1] += L * 0.488603 * d.y;
    c[2] += L * 0.488603 * d.z;
    c[3] += L * 0.488603 * d.x;
    c[4] += L * 1.092548 * d.x * d.y;
    c[5] += L * 1.092548 * d.y * d.z;
    c[6] += L * 0.315392 * (3.0 * d.z * d.z - 1.0);
    c[7] += L * 1.092548 * d.x * d.z;
    c[8] += L * 0.546274 * (d.x * d.x - d.y * d.y);
  }
  for (var k = 0u; k < 9u; k++) { acc[li][k] = c[k]; }
  workgroupBarrier();
  if (li == 0u) {
    var s: array<vec3f, 9>;
    for (var k = 0u; k < 9u; k++) { s[k] = vec3f(0.0); }
    for (var t = 0u; t < N; t++) { for (var k = 0u; k < 9u; k++) { s[k] += acc[t][k]; } }
    // convolve with clamped cosine (A0 = pi, A1 = 2pi/3, A2 = pi/4), fold basis constants, divide by pi
    var A = array<f32, 9>(PI, 2.0 * PI / 3.0, 2.0 * PI / 3.0, 2.0 * PI / 3.0, PI / 4.0, PI / 4.0, PI / 4.0, PI / 4.0, PI / 4.0);
    var Y = array<f32, 9>(0.282095, 0.488603, 0.488603, 0.488603, 1.092548, 1.092548, 0.315392, 1.092548, 0.546274);
    for (var k = 0u; k < 9u; k++) { outSH[k] = vec4f(s[k] * A[k] * Y[k] / PI, 0.0); }
  }
}
`;

const DFG_WGSL = COMMON + /* wgsl */ `
@group(0) @binding(0) var dst: texture_storage_2d<rgba16float, write>;
fn V_SmithGGXCorrelated(NoV: f32, NoL: f32, a: f32) -> f32 {
  let a2 = a * a;
  let gv = NoL * sqrt(NoV * NoV * (1.0 - a2) + a2);
  let gl = NoV * sqrt(NoL * NoL * (1.0 - a2) + a2);
  return 0.5 / (gv + gl);
}
@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let size = textureDimensions(dst);
  if (id.x >= size.x || id.y >= size.y) { return; }
  let NoV = max((f32(id.x) + 0.5) / f32(size.x), 1e-3);
  let rough = (f32(id.y) + 0.5) / f32(size.y);
  let a = rough * rough;
  let V = vec3f(sqrt(1.0 - NoV * NoV), 0.0, NoV);
  let N = vec3f(0.0, 0.0, 1.0);
  var A = 0.0;
  var B = 0.0;
  let n = 512u;
  for (var i = 0u; i < n; i++) {
    let H = importanceGGX(hammersley(i, n), N, a);
    let L = normalize(2.0 * dot(V, H) * H - V);
    let NoL = clamp(L.z, 0.0, 1.0);
    let NoH = clamp(H.z, 0.0, 1.0);
    let VoH = clamp(dot(V, H), 0.0, 1.0);
    if (NoL > 0.0) {
      let Gv = V_SmithGGXCorrelated(NoV, NoL, a) * 4.0 * NoL * VoH / NoH;
      let Fc = pow(1.0 - VoH, 5.0);
      A += (1.0 - Fc) * Gv;
      B += Fc * Gv;
    }
  }
  textureStore(dst, vec2i(id.xy), vec4f(A / f32(n), B / f32(n), 0.0, 1.0));
}
`;

export class IBL {
  readonly specular: GPUTexture;
  readonly sh: GPUBuffer;
  readonly brdfLut: GPUTexture;
  readonly mips: number;
  private prefilter: GPUComputePipeline;
  private shPipe: GPUComputePipeline;
  private sampler: GPUSampler;
  private uniforms: GPUBuffer[] = [];

  constructor(private dev: FGLDevice, readonly size = 128, samples = 96) {
    const d = dev.device;
    this.mips = Math.min(mipCount(size), 6);
    this.specular = d.createTexture({
      size: [size, size, 6], format: 'rgba16float', mipLevelCount: this.mips,
      usage: GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.TEXTURE_BINDING, label: 'ibl.specular',
    });
    this.sh = dev.createBuffer(9 * 16, GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC, 'ibl.sh');
    this.brdfLut = d.createTexture({ size: [128, 128], format: 'rgba16float', usage: GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.TEXTURE_BINDING, label: 'brdf.lut' });
    this.sampler = d.createSampler({ magFilter: 'linear', minFilter: 'linear', mipmapFilter: 'linear' });
    this.prefilter = d.createComputePipeline({ layout: 'auto', compute: { module: dev.shader(PREFILTER_WGSL, 'ibl-prefilter'), entryPoint: 'main' } });
    this.shPipe = d.createComputePipeline({ layout: 'auto', compute: { module: dev.shader(SH_WGSL, 'ibl-sh'), entryPoint: 'main' } });
    for (let m = 0; m < this.mips; m++) {
      const rough = m / (this.mips - 1);
      const outSize = Math.max(1, size >> m);
      this.uniforms.push(dev.createBuffer(16, GPUBufferUsage.UNIFORM, `ibl.u${m}`, new Float32Array([rough, outSize, size, m === 0 ? 1 : samples])));
    }
    // DFG LUT once
    const dfg = d.createComputePipeline({ layout: 'auto', compute: { module: dev.shader(DFG_WGSL, 'dfg'), entryPoint: 'main' } });
    const enc = d.createCommandEncoder({ label: 'dfg' });
    const p = enc.beginComputePass();
    p.setPipeline(dfg);
    p.setBindGroup(0, d.createBindGroup({ layout: dfg.getBindGroupLayout(0), entries: [{ binding: 0, resource: this.brdfLut.createView() }] }));
    p.dispatchWorkgroups(16, 16);
    p.end();
    d.queue.submit([enc.finish()]);
  }

  /** Re-filter from an environment cube (with mips). */
  update(env: GPUTexture, encoder: GPUCommandEncoder) {
    const d = this.dev.device;
    const srcView = env.createView({ dimension: 'cube' });
    const pass = encoder.beginComputePass({ label: 'ibl' });
    pass.setPipeline(this.prefilter);
    for (let m = 0; m < this.mips; m++) {
      const outSize = Math.max(1, this.size >> m);
      pass.setBindGroup(0, d.createBindGroup({
        layout: this.prefilter.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: this.uniforms[m] } },
          { binding: 1, resource: srcView },
          { binding: 2, resource: this.sampler },
          { binding: 3, resource: this.specular.createView({ dimension: '2d-array', baseMipLevel: m, mipLevelCount: 1 }) },
        ],
      }));
      pass.dispatchWorkgroups(Math.ceil(outSize / 8), Math.ceil(outSize / 8), 6);
    }
    pass.setPipeline(this.shPipe);
    pass.setBindGroup(0, d.createBindGroup({
      layout: this.shPipe.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: srcView },
        { binding: 1, resource: this.sampler },
        { binding: 2, resource: { buffer: this.sh } },
      ],
    }));
    pass.dispatchWorkgroups(1);
    pass.end();
  }
}
