// Physically based material (metallic-roughness, glTF-compatible) with physical-unit emission.

import { FGLDevice } from './device';
import { TextureCache } from './texture';

export type AlphaMode = 'opaque' | 'mask' | 'blend';

export const MATERIAL_UNIFORM_BYTES = 128;

export const MATERIAL_FLAGS = {
  ALPHA_MASK: 1,
  UNLIT: 2,
  WORLD_UV: 4,
  /** Vegetation: thin-surface translucency (sunlight transmitted through leaves/blades). */
  FOLIAGE: 8,
  /** Vertex wind sway (uv.y = bend weight, 0 at the root → 1 at the tip). */
  WIND: 16,
  /**
   * Terrain: three texture layers (2D array textures) blended per pixel from vertex weights packed in the
   * UV attribute (uv.x = layer 1, uv.y = layer 2, layer 0 = remainder), world-space projected (implies WORLD_UV).
   */
  TERRAIN: 32,
} as const;

/** Terrain layer texture arrays: 3 layers each (albedo sRGB, tangent-space normal, ORM). */
export interface TerrainLayerTextures { albedo: GPUTexture; normal: GPUTexture; orm: GPUTexture }

export interface MaterialParams {
  name?: string;
  baseColor?: [number, number, number, number];
  /** Linear RGB emission colour. */
  emissive?: [number, number, number];
  /** Emitted luminance in cd/m² (nits) for emissive = 1. A lit LED ≈ 100–1000, a muzzle flash core ≈ 1e6. */
  emissiveLuminance?: number;
  metallic?: number;
  roughness?: number;
  normalScale?: number;
  occlusionStrength?: number;
  /** Dielectric specular level (Filament convention, 0.5 → F0 = 4%). */
  specular?: number;
  /** Curvature-driven edge wear (0..1): convex edges go to bare metal (metals) or scuffed (dielectrics). */
  edgeWear?: number;
  /** Edge radius (m) below which an edge is fully worn. Default 0.003. */
  edgeWearRadius?: number;
  uvScale?: [number, number];
  uvOffset?: [number, number];
  uvRotation?: number;
  alphaMode?: AlphaMode;
  alphaCutoff?: number;
  doubleSided?: boolean;
  unlit?: boolean;
  /** Project UVs from world XZ (terrain/large surfaces; avoids stretching). */
  worldUV?: boolean;
  /** Vegetation shading (see MATERIAL_FLAGS.FOLIAGE). */
  foliage?: boolean;
  /** Vertex wind (see MATERIAL_FLAGS.WIND). */
  wind?: boolean;
  /** Terrain layer blend (see MATERIAL_FLAGS.TERRAIN). Set `layerTextures`, `layerScale`. */
  terrain?: boolean;
  /** Terrain: 2D-array textures with one layer per terrain layer (built by `Terrain`). */
  layerTextures?: TerrainLayerTextures | null;
  /** Terrain: UV scale (1 / tile metres) per layer. */
  layerScale?: [number, number, number];
  /** Terrain: how hard the height-based layer transitions are (0 = linear cross-fade, 1 = stones poke through). Default 0.75. */
  blendSharpness?: number;
  /** Terrain: per-pixel blend noise — world-space scale (m) and strength (weight units). Default [1.7, 0.22]. */
  blendNoise?: [number, number];
  baseColorMap?: GPUTexture | null;
  normalMap?: GPUTexture | null;
  /** R = AO, G = roughness, B = metallic. */
  ormMap?: GPUTexture | null;
  emissiveMap?: GPUTexture | null;
  sampler?: GPUSampler;
}

let MATERIAL_ID = 0;

export class Material {
  readonly id = ++MATERIAL_ID;
  name: string;
  baseColor: [number, number, number, number];
  emissive: [number, number, number];
  emissiveLuminance: number;
  metallic: number;
  roughness: number;
  normalScale: number;
  occlusionStrength: number;
  specular: number;
  edgeWear: number;
  edgeWearRadius: number;
  uvScale: [number, number];
  uvOffset: [number, number];
  uvRotation: number;
  alphaMode: AlphaMode;
  alphaCutoff: number;
  doubleSided: boolean;
  unlit: boolean;
  worldUV: boolean;
  foliage: boolean;
  wind: boolean;
  terrain: boolean;
  layerTextures: TerrainLayerTextures | null;
  layerScale: [number, number, number];
  blendSharpness: number;
  blendNoise: [number, number];
  baseColorMap: GPUTexture | null;
  normalMap: GPUTexture | null;
  ormMap: GPUTexture | null;
  emissiveMap: GPUTexture | null;
  sampler: GPUSampler | null;

  private buffer: GPUBuffer | null = null;
  private bindGroup: GPUBindGroup | null = null;
  private dirtyUniform = true;
  private dirtyBinding = true;

  constructor(p: MaterialParams = {}) {
    this.name = p.name ?? `material${this.id}`;
    this.baseColor = p.baseColor ?? [0.8, 0.8, 0.8, 1];
    this.emissive = p.emissive ?? [0, 0, 0];
    this.emissiveLuminance = p.emissiveLuminance ?? 0;
    this.metallic = p.metallic ?? 0;
    this.roughness = p.roughness ?? 0.6;
    this.normalScale = p.normalScale ?? 1;
    this.occlusionStrength = p.occlusionStrength ?? 1;
    this.specular = p.specular ?? 0.5;
    this.edgeWear = p.edgeWear ?? 0;
    this.edgeWearRadius = p.edgeWearRadius ?? 0.003;
    this.uvScale = p.uvScale ?? [1, 1];
    this.uvOffset = p.uvOffset ?? [0, 0];
    this.uvRotation = p.uvRotation ?? 0;
    this.alphaMode = p.alphaMode ?? 'opaque';
    this.alphaCutoff = p.alphaCutoff ?? 0.5;
    this.doubleSided = p.doubleSided ?? false;
    this.unlit = p.unlit ?? false;
    this.worldUV = p.worldUV ?? false;
    this.foliage = p.foliage ?? false;
    this.wind = p.wind ?? false;
    this.terrain = p.terrain ?? false;
    this.layerTextures = p.layerTextures ?? null;
    this.layerScale = p.layerScale ?? [1, 1, 1];
    this.blendSharpness = p.blendSharpness ?? 0.75;
    this.blendNoise = p.blendNoise ?? [1.7, 0.22];
    this.baseColorMap = p.baseColorMap ?? null;
    this.normalMap = p.normalMap ?? null;
    this.ormMap = p.ormMap ?? null;
    this.emissiveMap = p.emissiveMap ?? null;
    this.sampler = p.sampler ?? null;
  }

  /** Call after changing any scalar parameter. */
  markDirty() { this.dirtyUniform = true; }
  /** Call after swapping textures or sampler. */
  markBindingsDirty() { this.dirtyBinding = true; this.dirtyUniform = true; }

  get flags(): number {
    let f = 0;
    if (this.alphaMode === 'mask') f |= MATERIAL_FLAGS.ALPHA_MASK;
    if (this.unlit) f |= MATERIAL_FLAGS.UNLIT;
    if (this.worldUV) f |= MATERIAL_FLAGS.WORLD_UV;
    if (this.foliage) f |= MATERIAL_FLAGS.FOLIAGE;
    if (this.wind) f |= MATERIAL_FLAGS.WIND;
    if (this.terrain) f |= MATERIAL_FLAGS.TERRAIN | MATERIAL_FLAGS.WORLD_UV;
    return f;
  }

  /** Pipeline variant key bits that depend on the material. */
  get variantKey(): string { return `${this.alphaMode}|${this.doubleSided ? 2 : 1}|${this.terrain ? 'T' : 'S'}`; }

  getBindGroup(dev: FGLDevice, tex: TextureCache, layout: GPUBindGroupLayout): GPUBindGroup {
    if (!this.buffer) this.buffer = dev.createBuffer(MATERIAL_UNIFORM_BYTES, GPUBufferUsage.UNIFORM, `${this.name}.ub`);
    if (this.dirtyUniform) {
      const d = new Float32Array(MATERIAL_UNIFORM_BYTES / 4);
      d.set(this.baseColor, 0);
      d.set(this.emissive, 4);
      d[7] = this.emissiveLuminance;
      d[8] = this.metallic; d[9] = this.roughness; d[10] = this.normalScale; d[11] = this.occlusionStrength;
      d[12] = this.uvScale[0]; d[13] = this.uvScale[1]; d[14] = this.uvOffset[0]; d[15] = this.uvOffset[1];
      d[16] = this.alphaCutoff; d[17] = this.specular; d[18] = this.uvRotation;
      d[19] = this.flags; // stored as float (denormal bit patterns may be flushed on some GPUs)
      d[20] = this.edgeWear; d[21] = this.edgeWearRadius;
      d[24] = this.layerScale[0]; d[25] = this.layerScale[1]; d[26] = this.layerScale[2]; d[27] = this.blendSharpness;
      d[28] = this.blendNoise[0]; d[29] = this.blendNoise[1];
      dev.device.queue.writeBuffer(this.buffer, 0, d);
      this.dirtyUniform = false;
    }
    if (this.dirtyBinding || !this.bindGroup) {
      if (this.terrain) {
        if (!this.layerTextures) throw new Error(`material ${this.name}: terrain materials need layerTextures`);
        const L = this.layerTextures;
        const arr = (t: GPUTexture) => t.createView({ dimension: '2d-array' });
        this.bindGroup = dev.device.createBindGroup({
          layout,
          label: this.name,
          entries: [
            { binding: 0, resource: { buffer: this.buffer } },
            { binding: 1, resource: this.sampler ?? tex.sampler() },
            { binding: 2, resource: arr(L.albedo) },
            { binding: 3, resource: arr(L.normal) },
            { binding: 4, resource: arr(L.orm) },
            { binding: 5, resource: (this.emissiveMap ?? tex.white).createView() },
          ],
        });
        this.dirtyBinding = false;
        return this.bindGroup;
      }
      this.bindGroup = dev.device.createBindGroup({
        layout,
        label: this.name,
        entries: [
          { binding: 0, resource: { buffer: this.buffer } },
          { binding: 1, resource: this.sampler ?? tex.sampler() },
          { binding: 2, resource: (this.baseColorMap ?? tex.white).createView() },
          { binding: 3, resource: (this.normalMap ?? tex.flatNormal).createView() },
          { binding: 4, resource: (this.ormMap ?? tex.defaultOrm).createView() },
          { binding: 5, resource: (this.emissiveMap ?? tex.white).createView() },
        ],
      });
      this.dirtyBinding = false;
    }
    return this.bindGroup;
  }
}

/**
 * Material bindings (group 2). The terrain variant binds the three colour/normal/ORM maps as 2D array
 * textures (one layer per terrain layer); `sampleBase/Normal/Orm(uv, layer)` hide the difference so the
 * mesh shader is written once.
 */
export function wgslMaterial(terrain = false): string {
  const T = terrain ? 'texture_2d_array<f32>' : 'texture_2d<f32>';
  const L = terrain ? ', layer' : '';
  return /* wgsl */ `
struct MaterialU {
  baseColor: vec4f,
  emissive: vec4f,      // rgb, w = luminance (cd/m^2)
  pbr: vec4f,           // metallic, roughness, normal scale, occlusion strength
  uvTransform: vec4f,   // scale.xy, offset.xy
  params: vec4f,        // alpha cutoff, specular, uv rotation, flags (bits)
  wear: vec4f,          // edge wear amount, full-wear edge radius (m), unused, unused
  layers: vec4f,        // terrain: uv scale of layer 0, 1, 2; blend sharpness
  layers2: vec4f,       // terrain: blend noise scale (m), blend noise strength, unused, unused
};
@group(2) @binding(0) var<uniform> material: MaterialU;
@group(2) @binding(1) var matSampler: sampler;
@group(2) @binding(2) var baseColorTex: ${T};
@group(2) @binding(3) var normalTex: ${T};
@group(2) @binding(4) var ormTex: ${T};
@group(2) @binding(5) var emissiveTex: texture_2d<f32>;
const MATERIAL_IS_TERRAIN: bool = ${terrain ? 'true' : 'false'};
fn sampleBase(uv: vec2f, layer: i32) -> vec4f { return textureSample(baseColorTex, matSampler, uv${L}); }
fn sampleNormalMap(uv: vec2f, layer: i32) -> vec4f { return textureSample(normalTex, matSampler, uv${L}); }
fn sampleOrm(uv: vec2f, layer: i32) -> vec4f { return textureSample(ormTex, matSampler, uv${L}); }

fn materialFlags() -> u32 { return u32(material.params.w + 0.5); }
fn materialUV(uv: vec2f, worldPos: vec3f) -> vec2f {
  var base = uv;
  if ((materialFlags() & 4u) != 0u) { base = vec2f(worldPos.x, -worldPos.z); }
  let r = material.params.z;
  let c = cos(r);
  let s = sin(r);
  let ruv = vec2f(base.x * c - base.y * s, base.x * s + base.y * c);
  return ruv * material.uvTransform.xy + material.uvTransform.zw;
}
`;
}

export const WGSL_MATERIAL = wgslMaterial(false);
