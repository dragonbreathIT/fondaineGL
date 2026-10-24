// fondaine animation — Pose: local TRS per joint, struct-of-arrays, allocation-free blend helpers.

import { quat, type Quat } from '@fondaine/gl/math';

const _qa = quat.create();
const _qb = quat.create();
const _qi = quat.create();

export class Pose {
  readonly count: number;
  /** xyz per joint. */
  readonly translations: Float32Array;
  /** xyzw per joint (unit). */
  readonly rotations: Float32Array;
  /** xyz per joint. */
  readonly scales: Float32Array;

  constructor(count: number) {
    this.count = count;
    this.translations = new Float32Array(count * 3);
    this.rotations = new Float32Array(count * 4);
    this.scales = new Float32Array(count * 3);
    this.setIdentity();
  }

  setIdentity(): this {
    this.translations.fill(0);
    this.rotations.fill(0);
    this.scales.fill(1);
    for (let i = 0; i < this.count; i++) this.rotations[i * 4 + 3] = 1;
    return this;
  }

  copy(src: Pose): this {
    if (src.count !== this.count) throw new Error(`Pose.copy: joint count mismatch (${src.count} vs ${this.count})`);
    this.translations.set(src.translations);
    this.rotations.set(src.rotations);
    this.scales.set(src.scales);
    return this;
  }

  clone(): Pose { return new Pose(this.count).copy(this); }

  /** Copy a single joint from another pose. */
  copyJoint(src: Pose, j: number): this {
    const t = j * 3, r = j * 4;
    this.translations[t] = src.translations[t]; this.translations[t + 1] = src.translations[t + 1]; this.translations[t + 2] = src.translations[t + 2];
    this.rotations[r] = src.rotations[r]; this.rotations[r + 1] = src.rotations[r + 1];
    this.rotations[r + 2] = src.rotations[r + 2]; this.rotations[r + 3] = src.rotations[r + 3];
    this.scales[t] = src.scales[t]; this.scales[t + 1] = src.scales[t + 1]; this.scales[t + 2] = src.scales[t + 2];
    return this;
  }

  getTranslation(j: number, out: Float32Array): Float32Array {
    out[0] = this.translations[j * 3]; out[1] = this.translations[j * 3 + 1]; out[2] = this.translations[j * 3 + 2]; return out;
  }
  setTranslation(j: number, v: ArrayLike<number>): this {
    this.translations[j * 3] = v[0]; this.translations[j * 3 + 1] = v[1]; this.translations[j * 3 + 2] = v[2]; return this;
  }
  getRotation(j: number, out: Quat): Quat {
    out[0] = this.rotations[j * 4]; out[1] = this.rotations[j * 4 + 1]; out[2] = this.rotations[j * 4 + 2]; out[3] = this.rotations[j * 4 + 3];
    return out;
  }
  setRotation(j: number, q: ArrayLike<number>): this {
    this.rotations[j * 4] = q[0]; this.rotations[j * 4 + 1] = q[1]; this.rotations[j * 4 + 2] = q[2]; this.rotations[j * 4 + 3] = q[3];
    return this;
  }
  getScale(j: number, out: Float32Array): Float32Array {
    out[0] = this.scales[j * 3]; out[1] = this.scales[j * 3 + 1]; out[2] = this.scales[j * 3 + 2]; return out;
  }
  setScale(j: number, v: ArrayLike<number>): this {
    this.scales[j * 3] = v[0]; this.scales[j * 3 + 1] = v[1]; this.scales[j * 3 + 2] = v[2]; return this;
  }

  /**
   * out = lerp(a, b, t) per joint (slerp for rotations, shortest path). `mask` (per joint 0..1) scales t.
   * `out` may alias `a` or `b`.
   */
  static blend(out: Pose, a: Pose, b: Pose, t: number, mask?: ArrayLike<number>): Pose {
    const n = out.count;
    for (let j = 0; j < n; j++) {
      const w = mask ? t * mask[j] : t;
      const i3 = j * 3, i4 = j * 4;
      if (w <= 0) { if (out !== a) out.copyJoint(a, j); continue; }
      if (w >= 1) { if (out !== b) out.copyJoint(b, j); continue; }
      for (let k = 0; k < 3; k++) {
        out.translations[i3 + k] = a.translations[i3 + k] + (b.translations[i3 + k] - a.translations[i3 + k]) * w;
        out.scales[i3 + k] = a.scales[i3 + k] + (b.scales[i3 + k] - a.scales[i3 + k]) * w;
      }
      _qa[0] = a.rotations[i4]; _qa[1] = a.rotations[i4 + 1]; _qa[2] = a.rotations[i4 + 2]; _qa[3] = a.rotations[i4 + 3];
      _qb[0] = b.rotations[i4]; _qb[1] = b.rotations[i4 + 1]; _qb[2] = b.rotations[i4 + 2]; _qb[3] = b.rotations[i4 + 3];
      quat.slerp(_qa, _qa, _qb, w);
      quat.normalize(_qa, _qa);
      out.rotations[i4] = _qa[0]; out.rotations[i4 + 1] = _qa[1]; out.rotations[i4 + 2] = _qa[2]; out.rotations[i4 + 3] = _qa[3];
    }
    return out;
  }

  /**
   * Additive delta: delta = reference^-1 * pose (rotations, local), pose - reference (translations),
   * pose / reference (scales). Apply with `applyAdditive`.
   */
  static makeAdditive(outDelta: Pose, pose: Pose, reference: Pose): Pose {
    const n = outDelta.count;
    for (let j = 0; j < n; j++) {
      const i3 = j * 3, i4 = j * 4;
      for (let k = 0; k < 3; k++) {
        outDelta.translations[i3 + k] = pose.translations[i3 + k] - reference.translations[i3 + k];
        const rs = reference.scales[i3 + k];
        outDelta.scales[i3 + k] = rs !== 0 ? pose.scales[i3 + k] / rs : 1;
      }
      reference.getRotation(j, _qa); quat.invert(_qa, _qa);
      pose.getRotation(j, _qb);
      quat.multiply(_qa, _qa, _qb);
      quat.normalize(_qa, _qa);
      outDelta.setRotation(j, _qa);
    }
    return outDelta;
  }

  /**
   * out = base (+) weight * delta: T += w*dT, R = R * slerp(I, dR, w), S *= lerp(1, dS, w).
   * `delta` is a pose produced by `makeAdditive`. `out` may alias `base`.
   */
  static applyAdditive(out: Pose, base: Pose, delta: Pose, weight: number, mask?: ArrayLike<number>): Pose {
    const n = out.count;
    quat.identity(_qi);
    for (let j = 0; j < n; j++) {
      const w = mask ? weight * mask[j] : weight;
      if (w === 0) { if (out !== base) out.copyJoint(base, j); continue; }
      const i3 = j * 3;
      for (let k = 0; k < 3; k++) {
        out.translations[i3 + k] = base.translations[i3 + k] + delta.translations[i3 + k] * w;
        out.scales[i3 + k] = base.scales[i3 + k] * (1 + (delta.scales[i3 + k] - 1) * w);
      }
      delta.getRotation(j, _qb);
      if (w !== 1) quat.slerp(_qb, _qi, _qb, w);
      base.getRotation(j, _qa);
      quat.multiply(_qa, _qa, _qb);
      quat.normalize(_qa, _qa);
      out.setRotation(j, _qa);
    }
    return out;
  }
}
