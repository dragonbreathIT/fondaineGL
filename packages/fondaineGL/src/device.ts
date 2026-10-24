// fondaineGL — GPU device bootstrap and small resource helpers.

export interface FGLDeviceOptions {
  canvas: HTMLCanvasElement;
  powerPreference?: GPUPowerPreference;
  /** Extra adapter features to request when available. */
  optionalFeatures?: GPUFeatureName[];
  /** Don't configure the canvas swapchain (headless capture / tests). */
  offscreen?: boolean;
}

export class FGLDevice {
  readonly adapter: GPUAdapter;
  readonly device: GPUDevice;
  readonly context: GPUCanvasContext;
  readonly canvas: HTMLCanvasElement;
  readonly presentationFormat: GPUTextureFormat;
  readonly features: Set<string>;
  /** Called with validation / OOM errors and device loss. */
  onError: (msg: string) => void = (m) => console.error('[fondaineGL]', m);

  readonly offscreen: boolean;
  private constructor(adapter: GPUAdapter, device: GPUDevice, canvas: HTMLCanvasElement, offscreen: boolean) {
    this.adapter = adapter;
    this.device = device;
    this.canvas = canvas;
    this.offscreen = offscreen;
    this.presentationFormat = offscreen ? 'rgba8unorm' : navigator.gpu.getPreferredCanvasFormat();
    const ctx = offscreen ? null : canvas.getContext('webgpu');
    if (!offscreen && !ctx) throw new Error('fondaineGL: could not get a WebGPU canvas context');
    this.context = ctx as GPUCanvasContext;
    if (!offscreen) this.context.configure({ device, format: this.presentationFormat, alphaMode: 'opaque' });
    this.features = new Set([...device.features]);
    device.addEventListener('uncapturederror', (e) => this.onError((e as GPUUncapturedErrorEvent).error.message));
    device.lost.then((info) => this.onError(`device lost (${info.reason}): ${info.message}`));
  }

  static async create(opts: FGLDeviceOptions): Promise<FGLDevice> {
    if (!('gpu' in navigator)) throw new Error('fondaineGL requires WebGPU (Chrome/Edge 113+, Safari 26+, Firefox 141+).');
    const adapter = await navigator.gpu.requestAdapter({ powerPreference: opts.powerPreference ?? 'high-performance' });
    if (!adapter) throw new Error('fondaineGL: no WebGPU adapter available');
    const want: GPUFeatureName[] = ['float32-filterable', 'rg11b10ufloat-renderable', 'texture-compression-bc', 'texture-compression-astc', 'texture-compression-etc2', ...(opts.optionalFeatures ?? [])];
    const requiredFeatures = want.filter((f) => adapter.features.has(f));
    const lim = adapter.limits;
    const device = await adapter.requestDevice({
      requiredFeatures,
      requiredLimits: {
        maxTextureDimension2D: lim.maxTextureDimension2D,
        maxTextureArrayLayers: lim.maxTextureArrayLayers,
        maxStorageBufferBindingSize: lim.maxStorageBufferBindingSize,
        maxBufferSize: lim.maxBufferSize,
        maxComputeWorkgroupStorageSize: lim.maxComputeWorkgroupStorageSize,
        maxComputeInvocationsPerWorkgroup: lim.maxComputeInvocationsPerWorkgroup,
        maxStorageTexturesPerShaderStage: lim.maxStorageTexturesPerShaderStage,
        maxSampledTexturesPerShaderStage: lim.maxSampledTexturesPerShaderStage,
        maxColorAttachmentBytesPerSample: lim.maxColorAttachmentBytesPerSample,
      },
    });
    return new FGLDevice(adapter, device, opts.canvas, !!opts.offscreen);
  }

  get floatFilterable(): boolean { return this.features.has('float32-filterable'); }

  createBuffer(size: number, usage: GPUBufferUsageFlags, label?: string, data?: ArrayBufferView): GPUBuffer {
    const aligned = Math.max(16, Math.ceil(size / 16) * 16);
    const buf = this.device.createBuffer({ size: aligned, usage: usage | GPUBufferUsage.COPY_DST, label });
    if (data) this.device.queue.writeBuffer(buf, 0, data.buffer, data.byteOffset, data.byteLength);
    return buf;
  }

  createTexture(desc: GPUTextureDescriptor): GPUTexture { return this.device.createTexture(desc); }

  shader(code: string, label?: string): GPUShaderModule {
    const m = this.device.createShaderModule({ code, label });
    // Surface compile errors with line context — invaluable when editing WGSL.
    m.getCompilationInfo?.().then((info) => {
      for (const msg of info.messages) {
        if (msg.type !== 'error') continue;
        const lines = code.split('\n');
        const ctx = lines.slice(Math.max(0, msg.lineNum - 3), msg.lineNum + 1).join('\n');
        this.onError(`WGSL error in ${label ?? 'shader'} @${msg.lineNum}:${msg.linePos}: ${msg.message}\n${ctx}`);
      }
    });
    return m;
  }
}

/** Builds std140-ish uniform data with explicit offsets (WGSL alignment rules for vec4/mat4 layouts). */
export class UniformWriter {
  readonly f32: Float32Array;
  readonly u32: Uint32Array;
  readonly buffer: ArrayBuffer;
  constructor(byteSize: number) {
    this.buffer = new ArrayBuffer(Math.ceil(byteSize / 16) * 16);
    this.f32 = new Float32Array(this.buffer);
    this.u32 = new Uint32Array(this.buffer);
  }
  mat4(byteOffset: number, m: ArrayLike<number>) { this.f32.set(m as Float32Array, byteOffset / 4); }
  vec4(byteOffset: number, x: number, y = 0, z = 0, w = 0) {
    const o = byteOffset / 4;
    this.f32[o] = x; this.f32[o + 1] = y; this.f32[o + 2] = z; this.f32[o + 3] = w;
  }
  uvec4(byteOffset: number, x: number, y = 0, z = 0, w = 0) {
    const o = byteOffset / 4;
    this.u32[o] = x; this.u32[o + 1] = y; this.u32[o + 2] = z; this.u32[o + 3] = w;
  }
  f(byteOffset: number, v: number) { this.f32[byteOffset / 4] = v; }
}

// numeric values from the WebGPU spec, so importing the engine in Node (tools, tests) doesn't need the GPU globals
export const TEX_USAGE_RT = 0x10 /* RENDER_ATTACHMENT */ | 0x04 /* TEXTURE_BINDING */;
export const TEX_USAGE_STORAGE = 0x08 /* STORAGE_BINDING */ | 0x04 /* TEXTURE_BINDING */;

export function mipCount(w: number, h = w): number { return Math.floor(Math.log2(Math.max(w, h))) + 1; }
