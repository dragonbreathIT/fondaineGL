// Asset library: loads assets/manifest.json (written by tools/fetch-assets.mjs) and hands out scanned
// models and PBR texture sets by slot name. Every slot is optional — callers fall back to procedural
// content when a slot is missing, so the engine runs with zero downloaded assets.

import { Material, Renderer } from '@fondaine/gl';
import { loadGLTF } from '../gltf/loader';
import { instantiateGLTF, GLTFInstance } from '../gltf/instantiate';

export interface AssetCredit { slot: string; title?: string; author?: string; license: string; url?: string; source?: string }

export interface TextureEntry extends AssetCredit {
  /** Relative to the manifest. */
  diff: string; nor?: string; arm?: string; rough?: string; ao?: string;
  /** Real-world size of one texture tile (m). */
  tileMeters?: number;
}

export interface ModelEntry extends AssetCredit {
  file: string;
  /** Uniform scale applied to the asset (metres per asset unit). */
  scale?: number;
  /** Free-form engine hints (e.g. weapon part mapping, rig type). */
  hints?: Record<string, unknown>;
}

export interface AssetManifest {
  version: number;
  textures: Record<string, TextureEntry>;
  models: Record<string, ModelEntry>;
}

export class AssetLibrary {
  private models = new Map<string, Promise<GLTFInstance | null>>();
  private materials = new Map<string, Promise<Material | null>>();

  private constructor(private renderer: Renderer, readonly baseUrl: string, readonly manifest: AssetManifest) {}

  /** Load `<baseUrl>manifest.json`. A missing manifest yields an empty library (procedural fallbacks). */
  static async load(renderer: Renderer, baseUrl = '../../assets/'): Promise<AssetLibrary> {
    const base = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    let manifest: AssetManifest = { version: 1, textures: {}, models: {} };
    try {
      const r = await fetch(base + 'manifest.json', { cache: 'no-cache' });
      if (r.ok) manifest = { textures: {}, models: {}, ...(await r.json()) };
    } catch { /* no assets downloaded yet */ }
    return new AssetLibrary(renderer, base, manifest);
  }

  get empty() { return !Object.keys(this.manifest.textures).length && !Object.keys(this.manifest.models).length; }
  hasModel(slot: string) { return slot in this.manifest.models; }
  hasTexture(slot: string) { return slot in this.manifest.textures; }
  /** Slots whose name starts with `prefix` (e.g. 'tree.'). */
  modelSlots(prefix: string) { return Object.keys(this.manifest.models).filter((k) => k.startsWith(prefix)); }

  /** Scanned model by slot (cached). `keepSource` keeps CPU geometry for LOD generation. */
  model(slot: string, keepSource = true): Promise<GLTFInstance | null> {
    let p = this.models.get(slot);
    if (!p) {
      const e = this.manifest.models[slot];
      p = e ? loadGLTF(this.baseUrl + e.file).then((a) => instantiateGLTF(this.renderer, a, { keepSource })).catch((err) => { console.warn(`[oAxis] model ${slot} failed to load`, err); return null; }) : Promise.resolve(null);
      this.models.set(slot, p);
    }
    return p;
  }

  modelEntry(slot: string): ModelEntry | undefined { return this.manifest.models[slot]; }

  /** PBR material from a scanned texture set (diffuse / normal / packed AO-rough-metal). */
  texture(slot: string, o: { worldUV?: boolean; name?: string; roughness?: number; edgeWear?: number } = {}): Promise<Material | null> {
    let p = this.materials.get(slot);
    if (!p) {
      const e = this.manifest.textures[slot];
      p = e ? this.buildMaterial(slot, e, o).catch((err) => { console.warn(`[oAxis] texture ${slot} failed`, err); return null; }) : Promise.resolve(null);
      this.materials.set(slot, p);
    }
    return p;
  }

  private async buildMaterial(slot: string, e: TextureEntry, o: { worldUV?: boolean; name?: string; roughness?: number; edgeWear?: number }): Promise<Material> {
    const T = this.renderer.textures;
    const img = (rel: string, srgb: boolean, normalMap = false) => T.fromURL(this.baseUrl + rel, { srgb, normalMap });
    const [diff, nor, arm] = await Promise.all([img(e.diff, true), e.nor ? img(e.nor, false, true) : null, e.arm ? img(e.arm, false) : null]);
    const s = 1 / (e.tileMeters ?? 2);
    return new Material({
      name: o.name ?? slot,
      baseColorMap: diff, normalMap: nor, ormMap: arm,
      baseColor: [1, 1, 1, 1], metallic: arm ? 1 : 0, roughness: o.roughness ?? 1, occlusionStrength: arm ? 1 : 0,
      uvScale: [s, s], worldUV: o.worldUV ?? false, edgeWear: o.edgeWear ?? 0,
    });
  }

  /** Attribution lines for everything in the manifest (CC-BY assets must be credited). */
  credits(): AssetCredit[] {
    const out: AssetCredit[] = [];
    for (const [slot, e] of Object.entries(this.manifest.textures)) out.push({ ...e, slot });
    for (const [slot, e] of Object.entries(this.manifest.models)) out.push({ ...e, slot });
    return out;
  }
}
