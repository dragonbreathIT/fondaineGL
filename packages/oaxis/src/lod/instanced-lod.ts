// Instanced LOD sets: draw hundreds of copies of a (scanned, high-poly) model with GPU instancing, using
// lower-detail versions generated at load with meshoptimizer's simplifier and chosen per instance by
// distance. A forest of 100k-triangle scanned trees becomes a handful of draw calls.

import { Geometry, Mesh, RenderObject, Renderer, Mat4, MeshSource } from '@fondaine/gl';
import { MeshoptSimplifier } from 'meshoptimizer/simplifier';
import type { GLTFInstance } from '../gltf/instantiate';

export interface LODLevel { ratio: number; distance: number }

export interface InstancedLODOptions {
  /** Detail levels: triangle ratio (1 = full) and the distance (m) up to which the level is used. */
  levels?: LODLevel[];
  /** Instances beyond this distance are not drawn. */
  maxDistance?: number;
  castShadow?: boolean;
  /** Shadows from levels at or beyond this index are skipped (cheap far trees). */
  shadowMaxLevel?: number;
  /** Re-bucket instances every N updates (amortises CPU cost). */
  updateEvery?: number;
}

/** Simplify a mesh source to ~ratio of its triangles (attribute-aware so UV seams/normals survive). */
export async function simplifySource(src: MeshSource, ratio: number): Promise<Geometry> {
  await MeshoptSimplifier.ready;
  const target = Math.max(3, Math.floor((src.indices.length * ratio) / 3) * 3);
  const attrs = new Float32Array((src.positions.length / 3) * 5);
  const nv = src.positions.length / 3;
  for (let i = 0; i < nv; i++) {
    attrs[i * 5] = src.normals[i * 3]; attrs[i * 5 + 1] = src.normals[i * 3 + 1]; attrs[i * 5 + 2] = src.normals[i * 3 + 2];
    attrs[i * 5 + 3] = src.uvs ? src.uvs[i * 2] : 0; attrs[i * 5 + 4] = src.uvs ? src.uvs[i * 2 + 1] : 0;
  }
  let [idx] = MeshoptSimplifier.simplifyWithAttributes(Uint32Array.from(src.indices), Float32Array.from(src.positions), 3, attrs, 5, [0.5, 0.5, 0.5, 1, 1], null, target, 0.08);
  // foliage cards resist simplification: fall back to sloppy decimation when the result is still far too dense
  if (idx.length > target * 2.5) [idx] = MeshoptSimplifier.simplifySloppy(Uint32Array.from(src.indices), Float32Array.from(src.positions), 3, null, target, 0.2);
  const g = new Geometry(src.positions, src.normals, src.uvs ?? new Float32Array(nv * 2), idx);
  if (src.tangents) g.tangents = Float32Array.from(src.tangents);
  return g;
}

export class InstancedLODSet {
  readonly objects: RenderObject[] = [];
  private levels: { objs: { obj: RenderObject; world: Mat4 }[]; level: LODLevel }[] = [];
  private instances: Float32Array;
  private positions: Float32Array;
  private frame = 0;
  readonly triangles: number[] = [];

  private constructor(private opts: Required<InstancedLODOptions>, instances: Float32Array) {
    this.instances = instances;
    const n = instances.length / 16;
    this.positions = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { this.positions[i * 3] = instances[i * 16 + 12]; this.positions[i * 3 + 1] = instances[i * 16 + 13]; this.positions[i * 3 + 2] = instances[i * 16 + 14]; }
  }

  /** Build LODs for every drawable of `inst` (meshes must have been instantiated with keepSource). */
  static async create(renderer: Renderer, inst: GLTFInstance, instances: Float32Array, o: InstancedLODOptions = {}): Promise<InstancedLODSet> {
    const opts: Required<InstancedLODOptions> = {
      levels: o.levels ?? [{ ratio: 1, distance: 30 }, { ratio: 0.3, distance: 90 }, { ratio: 0.08, distance: 220 }, { ratio: 0.02, distance: 600 }],
      maxDistance: o.maxDistance ?? 900,
      castShadow: o.castShadow ?? true,
      shadowMaxLevel: o.shadowMaxLevel ?? 2,
      updateEvery: o.updateEvery ?? 6,
    };
    const set = new InstancedLODSet(opts, instances);
    for (let li = 0; li < opts.levels.length; li++) {
      const lvl = opts.levels[li];
      const objs: { obj: RenderObject; world: Mat4 }[] = [];
      let tris = 0;
      for (const d of inst.drawables) {
        const src = d.mesh.source;
        let mesh = d.mesh;
        if (lvl.ratio < 0.999 && src) {
          const g = await simplifySource(src, lvl.ratio);
          mesh = new Mesh(renderer.dev, g, { label: `${d.nodeName}-lod${li}` });
        }
        tris += mesh.indexCount / 3;
        const obj = new RenderObject(mesh, d.material);
        obj.castShadow = opts.castShadow && li <= opts.shadowMaxLevel;
        objs.push({ obj, world: d.world });
        set.objects.push(obj);
      }
      set.triangles.push(tris);
      set.levels.push({ objs, level: lvl });
    }
    return set;
  }

  addTo(scene: { add(o: RenderObject): unknown }) { for (const o of this.objects) scene.add(o); return this; }

  /** Re-bucket instances by distance to the camera (call once per frame; work is amortised). */
  update(camPos: ArrayLike<number>, force = false) {
    if (!force && this.frame++ % this.opts.updateEvery !== 0) return;
    const n = this.positions.length / 3;
    const L = this.levels.length;
    const counts = new Array(L).fill(0);
    const bucket = new Int8Array(n);
    const maxD2 = this.opts.maxDistance * this.opts.maxDistance;
    for (let i = 0; i < n; i++) {
      const dx = this.positions[i * 3] - camPos[0], dy = this.positions[i * 3 + 1] - camPos[1], dz = this.positions[i * 3 + 2] - camPos[2];
      const d2 = dx * dx + dy * dy + dz * dz;
      if (d2 > maxD2) { bucket[i] = -1; continue; }
      let l = L - 1;
      for (let k = 0; k < L; k++) if (d2 <= this.levels[k].level.distance * this.levels[k].level.distance) { l = k; break; }
      bucket[i] = l;
      counts[l]++;
    }
    for (let l = 0; l < L; l++) {
      for (const { obj, world } of this.levels[l].objs) {
        const m = new Float32Array(Math.max(1, counts[l]) * 16);
        let k = 0;
        for (let i = 0; i < n; i++) {
          if (bucket[i] !== l) continue;
          // instance matrix × node world (asset space) → the object transform stays identity
          mulInto(m, k * 16, this.instances, i * 16, world);
          k++;
        }
        obj.setInstances(m, counts[l]);
      }
    }
  }
}

function mulInto(out: Float32Array, o: number, a: Float32Array, ao: number, b: ArrayLike<number>) {
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    out[o + c * 4 + r] = a[ao + r] * b[c * 4] + a[ao + 4 + r] * b[c * 4 + 1] + a[ao + 8 + r] * b[c * 4 + 2] + a[ao + 12 + r] * b[c * 4 + 3];
  }
}
