// Scene description consumed by the renderer: objects, lights, physical camera.

import { Material } from './material';
import { Mesh } from './mesh';
import { aabb, AABB, mat4, Mat4, quat, Quat, vec3, Vec3, DEG2RAD } from './math';
import { kelvinToLinearY1, lumensToCandela } from './color';

let OBJ_ID = 0;

export class RenderObject {
  readonly id = ++OBJ_ID;
  mesh: Mesh;
  material: Material;
  /** World transform. Set it each frame; the previous one is tracked automatically for motion vectors. */
  readonly transform: Mat4 = mat4.create();
  readonly prevTransform: Mat4 = mat4.create();
  visible = true;
  castShadow = true;
  /** Rendered with the viewmodel projection (first-person weapon/arms): own FOV, never clips into walls. */
  viewmodel = false;
  /** Joint matrices (16 floats per joint) for skinned meshes. Update each frame. */
  joints: Float32Array | null = null;
  /** Internal: GPU joint buffers + bind group. */
  _skin: { cur: GPUBuffer; prev: GPUBuffer; bg: GPUBindGroup | null; count: number } | null = null;
  /**
   * GPU instancing: 16 floats (column-major matrix) per instance; each instance is drawn at
   * transform × instance. Call `setInstances` (or mark `instancesDirty`) after changing them.
   */
  instances: Float32Array | null = null;
  instanceCount = 0;
  instancesDirty = false;
  /** Internal: GPU instance buffer + bind group. */
  _inst: { buf: GPUBuffer; bg: GPUBindGroup | null; cap: number } | null = null;
  private instBounds: AABB | null = null;
  readonly worldBounds: AABB = aabb.create();
  private first = true;
  /** User data (entity id etc.). */
  userData: unknown = null;

  constructor(mesh: Mesh, material: Material, transform?: Mat4) {
    this.mesh = mesh;
    this.material = material;
    if (transform) { mat4.copy(this.transform, transform); mat4.copy(this.prevTransform, transform); }
  }

  setTransform(m: ArrayLike<number>) { mat4.copy(this.transform, m); }

  /** Replace the instance list (count defaults to all matrices in `mats`). */
  setInstances(mats: Float32Array, count = mats.length / 16) {
    this.instances = mats;
    this.instanceCount = count;
    this.instancesDirty = true;
    // local-space bounds of all instances (relative to `transform`)
    const b = aabb.create();
    const tmp = aabb.create();
    for (let i = 0; i < count; i++) {
      aabb.transform(tmp, this.mesh.bounds, mats.subarray(i * 16, i * 16 + 16) as unknown as Mat4);
      for (let k = 0; k < 3; k++) { b.min[k] = Math.min(b.min[k], tmp.min[k]); b.max[k] = Math.max(b.max[k], tmp.max[k]); }
    }
    this.instBounds = b;
  }

  /** Called by the renderer at the end of a frame. */
  _endFrame() { mat4.copy(this.prevTransform, this.transform); this.first = false; }
  /** Called by the renderer before rendering: teleports don't produce motion blur on the first frame. */
  _beginFrame() {
    if (this.first) mat4.copy(this.prevTransform, this.transform);
    aabb.transform(this.worldBounds, this.instances && this.instBounds ? this.instBounds : this.mesh.bounds, this.transform);
  }
  /** Skip motion vectors for this frame (teleport). */
  resetHistory() { this.first = true; }
}

export class PointLight {
  readonly position: Vec3 = vec3.create();
  /** Linear RGB colour (luminance-normalised internally). */
  color: [number, number, number] = [1, 1, 1];
  /** Luminous intensity in candela. */
  intensity = 100;
  /** Influence range (m) — physically the light is unbounded; this windows it smoothly to zero. */
  range = 20;
  /** Emitter radius (m) — widens specular highlights (sphere light). */
  radius = 0.02;
  /** Spot cone (degrees); 0 = point light. */
  spotOuter = 0;
  spotInner = 0;
  readonly direction: Vec3 = vec3.create(0, -1, 0);
  enabled = true;

  static fromLumens(lumens: number, kelvin = 6500): PointLight {
    const l = new PointLight();
    l.intensity = lumensToCandela(lumens);
    l.color = kelvinToLinearY1(kelvin);
    return l;
  }
}

export class Camera {
  readonly position: Vec3 = vec3.create(0, 1.7, 0);
  readonly rotation: Quat = quat.create();
  /** Vertical field of view (radians). */
  fovY = 70 * DEG2RAD;
  /** Viewmodel (first-person weapon) vertical FOV. */
  viewmodelFovY = 55 * DEG2RAD;
  near = 0.04;
  // ---- physical exposure (used when renderer exposure mode = 'manual', and for sensor noise)
  aperture = 8; // f-number
  shutter = 1 / 250; // seconds
  iso = 100;

  readonly view: Mat4 = mat4.create();
  readonly world: Mat4 = mat4.create();

  updateMatrices() {
    mat4.fromRotationTranslation(this.world, this.rotation, this.position);
    mat4.invert(this.view, this.world);
  }
  forward(out: Vec3 = vec3.create()): Vec3 { return vec3.transformQuat(out, [0, 0, -1], this.rotation); }
  up(out: Vec3 = vec3.create()): Vec3 { return vec3.transformQuat(out, [0, 1, 0], this.rotation); }
  right(out: Vec3 = vec3.create()): Vec3 { return vec3.transformQuat(out, [1, 0, 0], this.rotation); }
  /** Set vertical FOV from a lens focal length and sensor height (mm). */
  setFocalLength(mm: number, sensorHeightMm = 24) { this.fovY = 2 * Math.atan(sensorHeightMm / (2 * mm)); }
}

export class Scene {
  readonly objects = new Set<RenderObject>();
  readonly lights = new Set<PointLight>();
  add(o: RenderObject) { this.objects.add(o); return o; }
  remove(o: RenderObject) { this.objects.delete(o); }
  addLight(l: PointLight) { this.lights.add(l); return l; }
  removeLight(l: PointLight) { this.lights.delete(l); }
}
