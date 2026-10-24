// Hierarchical transforms (position / rotation / scale) with cached world matrices.

import { mat4, Mat4, quat, Quat, vec3, Vec3 } from '../math';
import { defineComponent } from './ecs';

export class Transform {
  readonly position: Vec3 = vec3.create();
  readonly rotation: Quat = quat.create();
  readonly scale: Vec3 = vec3.create(1, 1, 1);
  parent: Transform | null = null;
  readonly local: Mat4 = mat4.create();
  readonly world: Mat4 = mat4.create();
  private version = 0;
  private worldVersion = -1;
  private parentVersion = -1;

  constructor(pos?: ArrayLike<number>, rot?: ArrayLike<number>, scale?: ArrayLike<number>) {
    if (pos) vec3.copy(this.position, pos);
    if (rot) quat.copy(this.rotation, rot);
    if (scale) vec3.copy(this.scale, scale);
  }

  /** Mark dirty after mutating position/rotation/scale. */
  touch() { this.version++; }

  setPosition(x: number, y: number, z: number) { vec3.set(this.position, x, y, z); this.version++; return this; }
  setRotation(q: ArrayLike<number>) { quat.copy(this.rotation, q); this.version++; return this; }
  setEuler(pitch: number, yaw: number, roll = 0) { quat.fromEuler(this.rotation, pitch, yaw, roll); this.version++; return this; }

  get stamp(): number { return this.version + (this.parent ? this.parent.stamp * 31 : 0); }

  /** World matrix (recomputed lazily). */
  getWorld(): Mat4 {
    const ps = this.parent ? this.parent.stamp : 0;
    if (this.worldVersion !== this.version || this.parentVersion !== ps) {
      mat4.fromRotationTranslationScale(this.local, this.rotation, this.position, this.scale);
      if (this.parent) mat4.multiply(this.world, this.parent.getWorld(), this.local);
      else mat4.copy(this.world, this.local);
      this.worldVersion = this.version;
      this.parentVersion = ps;
    }
    return this.world;
  }

  worldPosition(out: Vec3 = vec3.create()): Vec3 { return mat4.getTranslation(out, this.getWorld()); }
  worldRotation(out: Quat = quat.create()): Quat { return mat4.getRotation(out, this.getWorld()); }
  forward(out: Vec3 = vec3.create()): Vec3 { const m = this.getWorld(); return vec3.normalize(out, vec3.set(out, -m[8], -m[9], -m[10])); }
  right(out: Vec3 = vec3.create()): Vec3 { const m = this.getWorld(); return vec3.normalize(out, vec3.set(out, m[0], m[1], m[2])); }
  up(out: Vec3 = vec3.create()): Vec3 { const m = this.getWorld(); return vec3.normalize(out, vec3.set(out, m[4], m[5], m[6])); }
  /** Local point → world. */
  transformPoint(p: ArrayLike<number>, out: Vec3 = vec3.create()): Vec3 { return vec3.transformMat4(out, p, this.getWorld()); }
}

export const TransformC = defineComponent<Transform>('Transform');
