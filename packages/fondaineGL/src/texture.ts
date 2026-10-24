// Textures: upload, GPU mip generation, default textures, sampler cache.

import { FGLDevice, mipCount } from './device';

const MIP_WGSL = /* wgsl */ `
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
// normal maps: renormalise the averaged vector so mips keep unit length (and lose detail correctly)
@fragment fn fsNormal(i: VO) -> @location(0) vec4f {
  let c = textureSampleLevel(src, samp, i.uv, 0.0);
  let n = c.xyz * 2.0 - 1.0;
  let l = length(n);
  return vec4f(normalize(n) * 0.5 + 0.5, c.a);
}
`;

export type MipMode = 'color' | 'normal';

export class MipGenerator {
  private pipelines = new Map<string, GPURenderPipeline>();
  private sampler: GPUSampler;
  private module: GPUShaderModule;
  constructor(private dev: FGLDevice) {
    this.sampler = dev.device.createSampler({ minFilter: 'linear', magFilter: 'linear' });
    this.module = dev.shader(MIP_WGSL, 'mipgen');
  }
  private pipeline(format: GPUTextureFormat, mode: MipMode) {
    const key = `${format}:${mode}`;
    let p = this.pipelines.get(key);
    if (!p) {
      p = this.dev.device.createRenderPipeline({
        layout: 'auto',
        vertex: { module: this.module, entryPoint: 'vs' },
        fragment: { module: this.module, entryPoint: mode === 'normal' ? 'fsNormal' : 'fs', targets: [{ format }] },
        primitive: { topology: 'triangle-list' },
      });
      this.pipelines.set(key, p);
    }
    return p;
  }
  /** Fills mips 1..n of a 2D (or 2D-array) texture from mip 0. */
  generate(tex: GPUTexture, mode: MipMode = 'color', encoder?: GPUCommandEncoder) {
    const enc = encoder ?? this.dev.device.createCommandEncoder({ label: 'mipgen' });
    const pipe = this.pipeline(tex.format, mode);
    const layers = tex.depthOrArrayLayers;
    for (let layer = 0; layer < layers; layer++) {
      for (let m = 1; m < tex.mipLevelCount; m++) {
        const bg = this.dev.device.createBindGroup({
          layout: pipe.getBindGroupLayout(0),
          entries: [
            { binding: 0, resource: tex.createView({ dimension: '2d', baseMipLevel: m - 1, mipLevelCount: 1, baseArrayLayer: layer, arrayLayerCount: 1 }) },
            { binding: 1, resource: this.sampler },
          ],
        });
        const pass = enc.beginRenderPass({
          colorAttachments: [{
            view: tex.createView({ dimension: '2d', baseMipLevel: m, mipLevelCount: 1, baseArrayLayer: layer, arrayLayerCount: 1 }),
            loadOp: 'clear', storeOp: 'store', clearValue: [0, 0, 0, 0],
          }],
        });
        pass.setPipeline(pipe);
        pass.setBindGroup(0, bg);
        pass.draw(3);
        pass.end();
      }
    }
    if (!encoder) this.dev.device.queue.submit([enc.finish()]);
  }
}

export interface TextureOptions {
  srgb?: boolean;
  mips?: boolean;
  normalMap?: boolean;
  label?: string;
}

export class TextureCache {
  readonly mipgen: MipGenerator;
  readonly white: GPUTexture;
  readonly black: GPUTexture;
  readonly flatNormal: GPUTexture;
  /** glTF ORM convention: R = occlusion, G = roughness, B = metallic (factors multiply). */
  readonly defaultOrm: GPUTexture;
  readonly white3d: GPUTexture;
  private samplers = new Map<string, GPUSampler>();

  constructor(private dev: FGLDevice) {
    this.mipgen = new MipGenerator(dev);
    this.white = this.solid([255, 255, 255, 255], 'rgba8unorm-srgb', 'white');
    this.black = this.solid([0, 0, 0, 255], 'rgba8unorm-srgb', 'black');
    this.flatNormal = this.solid([128, 128, 255, 255], 'rgba8unorm', 'flatNormal');
    this.defaultOrm = this.solid([255, 255, 255, 255], 'rgba8unorm', 'orm');
    this.white3d = dev.device.createTexture({ size: [1, 1, 1], dimension: '3d', format: 'r16float', usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST });
    dev.device.queue.writeTexture({ texture: this.white3d }, new Uint16Array([0x3c00]), { bytesPerRow: 2 }, [1, 1, 1]);
  }

  solid(rgba: number[], format: GPUTextureFormat, label: string): GPUTexture {
    const t = this.dev.device.createTexture({ size: [1, 1], format, usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST, label });
    this.dev.device.queue.writeTexture({ texture: t }, new Uint8Array(rgba), { bytesPerRow: 4 }, [1, 1]);
    return t;
  }

  fromImage(img: ImageBitmap | HTMLCanvasElement | OffscreenCanvas, opts: TextureOptions = {}): GPUTexture {
    const format: GPUTextureFormat = opts.srgb ? 'rgba8unorm-srgb' : 'rgba8unorm';
    const mips = opts.mips !== false ? mipCount(img.width, img.height) : 1;
    const t = this.dev.device.createTexture({
      size: [img.width, img.height],
      format,
      mipLevelCount: mips,
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
      label: opts.label,
    });
    this.dev.device.queue.copyExternalImageToTexture({ source: img }, { texture: t }, [img.width, img.height]);
    if (mips > 1) this.mipgen.generate(t, opts.normalMap ? 'normal' : 'color');
    return t;
  }

  fromRGBA8(data: Uint8Array<ArrayBuffer>, w: number, h: number, opts: TextureOptions = {}): GPUTexture {
    const format: GPUTextureFormat = opts.srgb ? 'rgba8unorm-srgb' : 'rgba8unorm';
    const mips = opts.mips !== false ? mipCount(w, h) : 1;
    const t = this.dev.device.createTexture({
      size: [w, h], format, mipLevelCount: mips,
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
      label: opts.label,
    });
    this.dev.device.queue.writeTexture({ texture: t }, data, { bytesPerRow: w * 4 }, [w, h]);
    if (mips > 1) this.mipgen.generate(t, opts.normalMap ? 'normal' : 'color');
    return t;
  }

  async fromURL(url: string, opts: TextureOptions = {}): Promise<GPUTexture> {
    const blob = await (await fetch(url)).blob();
    const img = await createImageBitmap(blob, { colorSpaceConversion: 'none', premultiplyAlpha: 'none' });
    return this.fromImage(img, { label: url, ...opts });
  }

  sampler(desc: { address?: GPUAddressMode; addressV?: GPUAddressMode; filter?: GPUFilterMode; anisotropy?: number } = {}): GPUSampler {
    const a = desc.address ?? 'repeat', av = desc.addressV ?? a, f = desc.filter ?? 'linear', an = desc.anisotropy ?? 16;
    const key = `${a}|${av}|${f}|${an}`;
    let s = this.samplers.get(key);
    if (!s) {
      s = this.dev.device.createSampler({
        addressModeU: a, addressModeV: av, addressModeW: a,
        magFilter: f, minFilter: f, mipmapFilter: f,
        maxAnisotropy: f === 'linear' ? an : 1,
      });
      this.samplers.set(key, s);
    }
    return s;
  }
}
