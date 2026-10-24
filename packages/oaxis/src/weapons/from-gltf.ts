// Scanned / authored weapon models → FirearmModel.
//
// Name the nodes (or meshes/materials) in your DCC tool, or pass a mapping:
//   slide / bolt / carrier      → reciprocating part     magazine / mag      → drops on reload
//   trigger                     → moves when pulled       selector / safety   → fire-selector lever
//   muzzle, ejection_port, rear_sight, front_sight      → empties (sockets) or tiny marker meshes
// Orientation: the engine wants +x right, +y up, −z towards the muzzle, metres. `forward`/`up` describe the
// asset's axes, `scale` its units; or give `lengthM` and the model is scaled to that overall length.

import { Mesh, Material, RenderObject, Renderer, mat4, Mat4, vec3, Vec3, quat, lathe, FirearmModel, casingGeometry } from '@fondaine/gl';
import type { GLTFInstance } from '../gltf/instantiate';
import type { WeaponGrips } from '../viewmodel/hands';

type Axis = '+x' | '-x' | '+y' | '-y' | '+z' | '-z';

export interface WeaponMapping {
  /** Asset axis pointing towards the muzzle (default '-z', glTF/three convention; Sketchfab guns are often '+x'). */
  forward?: Axis;
  /** Asset axis pointing up (default '+y'). */
  up?: Axis;
  /** Metres per asset unit (default 1), or `lengthM` to fit the overall length. */
  scale?: number;
  lengthM?: number;
  /** Regexes (case-insensitive) matched against node, mesh and material names. */
  slide?: string; magazine?: string; trigger?: string; selector?: string;
  muzzle?: string; ejectionPort?: string; rearSight?: string; frontSight?: string;
  /** Explicit socket positions in *engine* weapon space (override name lookup). */
  sockets?: Partial<Record<'muzzle' | 'ejectionPort' | 'rearSight' | 'frontSight', [number, number, number]>>;
  magAxis?: [number, number, number];
  casing?: { lengthM: number; diameterM: number; straight?: boolean };
}

const AX: Record<Axis, [number, number, number]> = { '+x': [1, 0, 0], '-x': [-1, 0, 0], '+y': [0, 1, 0], '-y': [0, -1, 0], '+z': [0, 0, 1], '-z': [0, 0, -1] };

const DEFAULT_RX = {
  slide: 'slide|bolt|carrier', magazine: '\\bmag(azine)?\\b|mag_|magazine', trigger: 'trigger', selector: 'selector|safety|fire_?mode',
  muzzle: 'muzzle', ejectionPort: 'eject|port', rearSight: 'rear_?sight|sight_?rear|notch', frontSight: 'front_?sight|sight_?front|post',
};

export interface GLTFWeapon { model: FirearmModel; grips?: WeaponGrips; warnings: string[] }

export function weaponFromGLTF(renderer: Renderer, inst: GLTFInstance, map: WeaponMapping = {}, grips?: WeaponGrips): GLTFWeapon {
  const warnings: string[] = [];
  // asset → engine basis: engine −z = asset forward, engine +y = asset up
  const f = AX[map.forward ?? '-z'], u = AX[map.up ?? '+y'];
  const ez = vec3.scale(vec3.create(), vec3.create(f[0], f[1], f[2]), -1); // engine +z (towards the shooter) in asset space
  const ey = vec3.create(u[0], u[1], u[2]);
  const ex = vec3.cross(vec3.create(), ey, ez);
  // rows of the rotation = engine axes expressed in asset coordinates
  const R = mat4.create();
  R[0] = ex[0]; R[4] = ex[1]; R[8] = ex[2];
  R[1] = ey[0]; R[5] = ey[1]; R[9] = ey[2];
  R[2] = ez[0]; R[6] = ez[1]; R[10] = ez[2];
  let scale = map.scale ?? 1;
  const b = inst.bounds;
  const lenAsset = Math.abs(vec3.dot(vec3.create(b.max[0] - b.min[0], b.max[1] - b.min[1], b.max[2] - b.min[2]), vec3.create(Math.abs(f[0]), Math.abs(f[1]), Math.abs(f[2]))));
  if (map.lengthM) scale = map.lengthM / Math.max(lenAsset, 1e-6);
  const S = mat4.fromScaling(mat4.create(), [scale, scale, scale]);
  const toEngine = mat4.multiply(mat4.create(), R, S);
  const rx = (k: keyof typeof DEFAULT_RX) => new RegExp((map[k] as string | undefined) ?? DEFAULT_RX[k], 'i');
  const nameOf = (i: number) => {
    const d = inst.drawables[i];
    const n = inst.asset.nodes[d.node];
    return `${n.name} ${n.mesh !== undefined ? inst.asset.meshes[n.mesh].name : ''} ${d.material.name}`;
  };
  // sockets: from empties first, then marker meshes
  const socket = (k: 'muzzle' | 'ejectionPort' | 'rearSight' | 'frontSight'): Vec3 | null => {
    const given = map.sockets?.[k];
    if (given) return vec3.create(given[0], given[1], given[2]);
    const re = rx(k);
    const ni = inst.asset.nodes.findIndex((n) => re.test(n.name));
    if (ni >= 0) { const w = inst.nodeWorld[ni]; return vec3.transformMat4(vec3.create(), [w[12], w[13], w[14]], toEngine); }
    return null;
  };
  const parts: FirearmModel['parts'] = [];
  const markers = new Set<number>();
  inst.drawables.forEach((d, i) => {
    const name = nameOf(i);
    if (/(^|\s)(muzzle|ejection|rear_?sight_?marker|front_?sight_?marker|socket)/i.test(inst.asset.nodes[d.node].name) && d.mesh.indexCount <= 36) { markers.add(i); return; }
    const local = mat4.multiply(mat4.create(), toEngine, d.world);
    const obj = new RenderObject(d.mesh, d.material);
    parts.push({ object: obj, local, bolt: rx('slide').test(name), magazine: rx('magazine').test(name), trigger: rx('trigger').test(name), selector: rx('selector').test(name) });
  });
  // engine-space bounds for fallbacks
  const eb = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
  for (let c = 0; c < 8; c++) {
    const p = vec3.transformMat4(vec3.create(), [c & 1 ? b.max[0] : b.min[0], c & 2 ? b.max[1] : b.min[1], c & 4 ? b.max[2] : b.min[2]], toEngine);
    for (let k = 0; k < 3; k++) { eb.min[k] = Math.min(eb.min[k], p[k]); eb.max[k] = Math.max(eb.max[k], p[k]); }
  }
  const pick = (k: 'muzzle' | 'ejectionPort' | 'rearSight' | 'frontSight', fallback: [number, number, number]) => {
    const s = socket(k);
    if (s) return s;
    warnings.push(`no "${k}" socket found — using an estimate; add an empty named "${k}" or pass mapping.sockets.${k}`);
    return vec3.create(...fallback);
  };
  const top = eb.max[1];
  const model: FirearmModel = {
    parts,
    muzzle: pick('muzzle', [0, 0, eb.min[2]]),
    ejectionPort: pick('ejectionPort', [eb.max[0], top * 0.4, (eb.min[2] + eb.max[2]) * 0.35]),
    rearSight: pick('rearSight', [0, top, eb.max[2] - (eb.max[2] - eb.min[2]) * 0.1]),
    frontSight: pick('frontSight', [0, top, eb.min[2] + (eb.max[2] - eb.min[2]) * 0.05]),
    casingMesh: new Mesh(renderer.dev, casingGeometry(map.casing?.lengthM ?? 0.019, map.casing?.diameterM ?? 0.0099, lathe, { straight: map.casing?.straight ?? true })),
    casingMaterial: renderer.synth.material('brass', { size: 512, tileMeters: 0.03, seed: 5 }, { name: 'brass' }),
    magAxis: map.magAxis ? vec3.normalize(vec3.create(), vec3.create(...map.magAxis)) : vec3.create(0, -1, 0),
  };
  if (!parts.some((p) => p.bolt)) warnings.push('no slide/bolt part found (name it "slide" or pass mapping.slide) — the action will not animate');
  if (!parts.some((p) => p.magazine)) warnings.push('no magazine part found — reloads will not show the mag');
  void markers; void quat; void (null as unknown as Material);
  return { model, grips, warnings };
}
