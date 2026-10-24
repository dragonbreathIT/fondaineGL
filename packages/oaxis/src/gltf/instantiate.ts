// glTF → fondaineGL: GPU meshes, PBR materials (with textures), node hierarchy and world transforms.
// Works for scanned assets from Poly Haven / Sketchfab (metal-rough PBR) and for skinned rigs.

import { Geometry, Material, Mesh, RenderObject, Renderer, mat4, Mat4 } from '@fondaine/gl';
import type { GLTFAsset, GLTFTextureInfo, GLTFPrimitive } from './gltf';

export interface GLTFDrawable {
  node: number;
  nodeName: string;
  mesh: Mesh;
  material: Material;
  /** World matrix of the node (asset space). */
  world: Mat4;
  skinned: boolean;
  primitive: GLTFPrimitive;
}

export interface GLTFInstance {
  asset: GLTFAsset;
  drawables: GLTFDrawable[];
  materials: Material[];
  /** World matrix per node (asset space). */
  nodeWorld: Mat4[];
  /** Asset-space bounds of all drawables. */
  bounds: { min: [number, number, number]; max: [number, number, number] };
}

export interface InstantiateOptions {
  /** Keep CPU geometry on meshes (needed for LOD simplification / physics / GLB export). */
  keepSource?: boolean;
  /** Override for material creation. */
  material?: (m: Material, index: number) => Material;
  /** Anisotropy etc. are taken from the glTF sampler; this forces mipmaps. */
  forceMips?: boolean;
}

/** Local matrix of a glTF node. */
export function nodeLocal(n: { translation: [number, number, number]; rotation: [number, number, number, number]; scale: [number, number, number] }): Mat4 {
  return mat4.fromRotationTranslationScale(mat4.create(), n.rotation, n.translation, n.scale);
}

export function computeNodeWorld(asset: GLTFAsset): Mat4[] {
  const world: Mat4[] = asset.nodes.map(() => mat4.create());
  const visit = (i: number, parent: Mat4 | null) => {
    const L = nodeLocal(asset.nodes[i]);
    if (parent) mat4.multiply(world[i], parent, L); else mat4.copy(world[i], L);
    for (const c of asset.nodes[i].children) visit(c, world[i]);
  };
  for (let i = 0; i < asset.nodes.length; i++) if (asset.nodes[i].parent < 0) visit(i, null);
  return world;
}

export function instantiateGLTF(renderer: Renderer, asset: GLTFAsset, o: InstantiateOptions = {}): GLTFInstance {
  const tex = renderer.textures;
  // textures: colour data in sRGB, data maps linear; one GPU texture per (image, colour space)
  const cache = new Map<string, GPUTexture>();
  const texture = (info: GLTFTextureInfo | undefined, srgb: boolean, normalMap = false): GPUTexture | null => {
    if (!info) return null;
    const img = asset.images[info.image];
    if (!img) return null;
    const key = `${info.image}|${srgb ? 1 : 0}`;
    let t = cache.get(key);
    if (!t) { t = tex.fromImage(img, { srgb, normalMap, label: asset.imageData[info.image]?.name }); cache.set(key, t); }
    return t;
  };
  const materials = asset.materials.map((m, i) => {
    const mr = m.metallicRoughnessTexture;
    // our ORM map packs AO in R; glTF's metal-rough texture leaves R undefined unless it is the same image as occlusion
    const occlusionShared = !!m.occlusionTexture && !!mr && m.occlusionTexture.image === mr.image;
    const ormTex = texture(mr ?? m.occlusionTexture, false);
    const tt = m.baseColorTexture?.transform;
    let mat = new Material({
      name: m.name || `gltf-mat-${i}`,
      baseColorMap: texture(m.baseColorTexture, true),
      normalMap: texture(m.normalTexture, false, true),
      ormMap: ormTex,
      emissiveMap: texture(m.emissiveTexture, true),
      baseColor: [...m.baseColorFactor] as [number, number, number, number],
      metallic: mr ? m.metallicFactor : m.metallicFactor,
      roughness: m.roughnessFactor,
      normalScale: m.normalScale,
      occlusionStrength: occlusionShared || (!mr && m.occlusionTexture) ? m.occlusionStrength : 0,
      emissive: m.emissiveFactor,
      emissiveLuminance: (m.emissiveFactor[0] + m.emissiveFactor[1] + m.emissiveFactor[2]) > 0 ? 100 * (m.emissiveStrength ?? 1) : 0,
      alphaMode: m.alphaMode === 'MASK' ? 'mask' : m.alphaMode === 'BLEND' ? 'blend' : 'opaque',
      alphaCutoff: m.alphaCutoff,
      doubleSided: m.doubleSided,
      unlit: m.unlit,
      uvScale: tt ? tt.scale : [1, 1],
      uvOffset: tt ? tt.offset : [0, 0],
      uvRotation: tt ? tt.rotation : 0,
      specular: m.specularFactor !== undefined ? 0.5 * m.specularFactor : 0.5,
    });
    // metal-rough texture without packed AO: tell the shader not to read R as occlusion
    if (mr && !occlusionShared && !m.occlusionTexture) mat.occlusionStrength = 0;
    if (o.material) mat = o.material(mat, i);
    return mat;
  });
  const fallback = new Material({ name: 'gltf-default', baseColor: [0.8, 0.8, 0.8, 1], roughness: 0.6, metallic: 0 });
  const nodeWorld = computeNodeWorld(asset);
  const drawables: GLTFDrawable[] = [];
  const meshCache = new Map<GLTFPrimitive, Mesh>();
  const bmin: [number, number, number] = [Infinity, Infinity, Infinity], bmax: [number, number, number] = [-Infinity, -Infinity, -Infinity];
  asset.nodes.forEach((n, ni) => {
    if (n.mesh === undefined) return;
    for (const prim of asset.meshes[n.mesh].primitives) {
      if (prim.topology !== 'triangle-list') continue;
      let mesh = meshCache.get(prim);
      if (!mesh) {
        const g = new Geometry(prim.positions, prim.normals ?? new Float32Array(prim.positions.length), prim.uvs ?? new Float32Array(prim.vertexCount * 2), prim.indices);
        if (prim.tangents) g.tangents = prim.tangents;
        if (prim.joints && prim.weights) { g.joints = prim.joints; g.weights = prim.weights; }
        mesh = new Mesh(renderer.dev, g.tangents ? g : g.computeTangents(), { label: `${asset.meshes[n.mesh].name}`, keepSource: o.keepSource });
        meshCache.set(prim, mesh);
      }
      const world = nodeWorld[ni];
      drawables.push({ node: ni, nodeName: n.name, mesh, material: prim.material >= 0 ? materials[prim.material] : fallback, world, skinned: n.skin !== undefined && !!prim.joints, primitive: prim });
      // bounds in asset space (8 corners of the primitive bounds)
      for (let c = 0; c < 8; c++) {
        const p = [c & 1 ? prim.bounds.max[0] : prim.bounds.min[0], c & 2 ? prim.bounds.max[1] : prim.bounds.min[1], c & 4 ? prim.bounds.max[2] : prim.bounds.min[2]];
        const x = world[0] * p[0] + world[4] * p[1] + world[8] * p[2] + world[12];
        const y = world[1] * p[0] + world[5] * p[1] + world[9] * p[2] + world[13];
        const z = world[2] * p[0] + world[6] * p[1] + world[10] * p[2] + world[14];
        bmin[0] = Math.min(bmin[0], x); bmin[1] = Math.min(bmin[1], y); bmin[2] = Math.min(bmin[2], z);
        bmax[0] = Math.max(bmax[0], x); bmax[1] = Math.max(bmax[1], y); bmax[2] = Math.max(bmax[2], z);
      }
    }
  });
  return { asset, drawables, materials, nodeWorld, bounds: { min: bmin, max: bmax } };
}

/** Create one RenderObject per drawable, placed at `root × nodeWorld`. */
export function spawnGLTF(scene: { add(o: RenderObject): unknown }, inst: GLTFInstance, root: Mat4 = mat4.create(), o: { castShadow?: boolean; viewmodel?: boolean } = {}): RenderObject[] {
  return inst.drawables.map((d) => {
    const obj = new RenderObject(d.mesh, d.material, mat4.multiply(mat4.create(), root, d.world));
    obj.castShadow = o.castShadow ?? true;
    obj.viewmodel = o.viewmodel ?? false;
    scene.add(obj);
    return obj;
  });
}
