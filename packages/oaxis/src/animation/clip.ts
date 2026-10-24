// fondaine animation — AnimationClip: keyframe tracks targeting glTF node indices.
// LINEAR (slerp for rotations, shortest path), STEP, CUBICSPLINE (Hermite, tangents scaled by key delta).

import type { GLTFAsset } from '../gltf';
import type { Pose } from './pose';

export type TrackPath = 'translation' | 'rotation' | 'scale' | 'weights';
export type Interpolation = 'LINEAR' | 'STEP' | 'CUBICSPLINE';

export interface AnimationTrack {
  /** glTF node index this track animates. */
  node: number;
  path: TrackPath;
  interpolation: Interpolation;
  /** Key times (seconds, strictly increasing). */
  times: Float32Array;
  /** LINEAR/STEP: `components` per key. CUBICSPLINE: [inTangent, value, outTangent] per key. */
  values: Float32Array;
  /** Floats per value: 3 (T/S), 4 (R), morph target count (weights). */
  components: number;
}

export interface AnimationEvent {
  time: number;
  name: string;
  data?: unknown;
}

/** Maps track index -> joint index of a skeleton (-1 = track not bound). */
export type ClipBinding = Int32Array;

export class AnimationClip {
  name: string;
  tracks: AnimationTrack[];
  /** Seconds. Defaults to the last key time over all tracks. */
  duration: number;
  /** Markers, kept sorted by time. */
  events: AnimationEvent[] = [];
  /** Per-track last-used key index (search hint; always validated, so sharing a clip between players is safe). */
  private readonly cursor: Int32Array;

  constructor(name: string, tracks: AnimationTrack[], duration?: number) {
    this.name = name;
    this.tracks = tracks;
    let d = 0;
    for (const t of tracks) if (t.times.length) d = Math.max(d, t.times[t.times.length - 1]);
    this.duration = duration ?? d;
    this.cursor = new Int32Array(tracks.length);
  }

  static fromGLTF(asset: GLTFAsset, animIndex: number): AnimationClip {
    const anim = asset.animations[animIndex];
    if (!anim) throw new Error(`AnimationClip.fromGLTF: animation ${animIndex} does not exist`);
    const tracks: AnimationTrack[] = [];
    for (const ch of anim.channels) {
      const s = anim.samplers[ch.sampler];
      if (!s || s.input.length === 0) continue;
      tracks.push({
        node: ch.node, path: ch.path, interpolation: s.interpolation,
        times: s.input, values: s.output, components: s.components,
      });
    }
    return new AnimationClip(anim.name, tracks, anim.duration);
  }

  /** All animations of an asset. */
  static allFromGLTF(asset: GLTFAsset): AnimationClip[] {
    return asset.animations.map((_, i) => AnimationClip.fromGLTF(asset, i));
  }

  addEvent(time: number, name: string, data?: unknown): this {
    this.events.push({ time, name, data });
    this.events.sort((a, b) => a.time - b.time);
    return this;
  }

  /** Index k such that times[k] <= t < times[k+1] (clamped to [0, n-2]); uses the cached cursor first. */
  findKey(trackIndex: number, t: number): number {
    const times = this.tracks[trackIndex].times;
    const n = times.length;
    if (n < 2) return 0;
    let k = this.cursor[trackIndex];
    if (k < 0 || k > n - 2) k = 0;
    if (t >= times[k] && t < times[k + 1]) return k;
    // Next segment (the common forward-playback case).
    if (k + 2 < n && t >= times[k + 1] && t < times[k + 2]) { this.cursor[trackIndex] = k + 1; return k + 1; }
    if (t <= times[0]) { this.cursor[trackIndex] = 0; return 0; }
    if (t >= times[n - 1]) { this.cursor[trackIndex] = n - 2; return n - 2; }
    let lo = 0, hi = n - 1; // invariant: times[lo] <= t < times[hi]
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (times[mid] <= t) lo = mid; else hi = mid;
    }
    this.cursor[trackIndex] = lo;
    return lo;
  }

  /** Sample one track at time `t` (clamped to the track's key range) into `out` (`components` floats). */
  sampleTrack(trackIndex: number, t: number, out: Float32Array | number[], outOffset = 0): void {
    const tr = this.tracks[trackIndex];
    const { times, values, components: c } = tr;
    const n = times.length;
    const cubic = tr.interpolation === 'CUBICSPLINE';
    const stride = cubic ? c * 3 : c;
    const valOff = cubic ? c : 0; // value lives after the in-tangent
    if (n === 1 || t <= times[0]) {
      for (let i = 0; i < c; i++) out[outOffset + i] = values[valOff + i];
      if (tr.path === 'rotation') normalizeQuatAt(out, outOffset);
      return;
    }
    if (t >= times[n - 1]) {
      const b = (n - 1) * stride + valOff;
      for (let i = 0; i < c; i++) out[outOffset + i] = values[b + i];
      if (tr.path === 'rotation') normalizeQuatAt(out, outOffset);
      return;
    }
    const k = this.findKey(trackIndex, t);
    const t0 = times[k], t1 = times[k + 1];
    const td = t1 - t0;
    const u = td > 0 ? (t - t0) / td : 0;

    if (tr.interpolation === 'STEP') {
      const b = k * stride;
      for (let i = 0; i < c; i++) out[outOffset + i] = values[b + i];
      return;
    }

    if (cubic) {
      // glTF Appendix C: p(u) = h00 v_k + h10 td b_k + h01 v_k+1 + h11 td a_k+1
      // where b_k = out-tangent of key k, a_k+1 = in-tangent of key k+1.
      const u2 = u * u, u3 = u2 * u;
      const h00 = 2 * u3 - 3 * u2 + 1, h10 = u3 - 2 * u2 + u, h01 = -2 * u3 + 3 * u2, h11 = u3 - u2;
      const b0 = k * stride, b1 = (k + 1) * stride;
      for (let i = 0; i < c; i++) {
        const v0 = values[b0 + c + i];
        const outTan0 = values[b0 + 2 * c + i];
        const inTan1 = values[b1 + i];
        const v1 = values[b1 + c + i];
        out[outOffset + i] = h00 * v0 + h10 * td * outTan0 + h01 * v1 + h11 * td * inTan1;
      }
      if (tr.path === 'rotation') normalizeQuatAt(out, outOffset);
      return;
    }

    // LINEAR
    const b0 = k * c, b1 = (k + 1) * c;
    if (tr.path === 'rotation') {
      slerpInto(out, outOffset, values, b0, values, b1, u);
      return;
    }
    for (let i = 0; i < c; i++) out[outOffset + i] = values[b0 + i] + (values[b1 + i] - values[b0 + i]) * u;
  }

  /** Track -> joint mapping for a skeleton (by glTF node index). */
  bind(nodeToJoint: (node: number) => number): ClipBinding {
    const b = new Int32Array(this.tracks.length);
    for (let i = 0; i < this.tracks.length; i++) {
      const tr = this.tracks[i];
      b[i] = tr.path === 'weights' ? -1 : nodeToJoint(tr.node);
    }
    return b;
  }

  /**
   * Sample all bound TRS tracks into `out`. Joints without a track keep whatever `out` holds — call
   * `out.copy(restPose)` first to get rest values for unanimated joints.
   */
  samplePose(t: number, binding: ClipBinding, out: Pose): Pose {
    const tmp = _tmp;
    for (let i = 0; i < this.tracks.length; i++) {
      const j = binding[i];
      if (j < 0) continue;
      const tr = this.tracks[i];
      this.sampleTrack(i, t, tmp, 0);
      if (tr.path === 'translation') out.setTranslation(j, tmp);
      else if (tr.path === 'rotation') out.setRotation(j, tmp);
      else if (tr.path === 'scale') out.setScale(j, tmp);
    }
    return out;
  }

  /** Sample morph-target weight tracks: node -> weights. Reuses arrays in `out` when sizes match. */
  sampleMorphWeights(t: number, out: Map<number, Float32Array>): Map<number, Float32Array> {
    for (let i = 0; i < this.tracks.length; i++) {
      const tr = this.tracks[i];
      if (tr.path !== 'weights') continue;
      let arr = out.get(tr.node);
      if (!arr || arr.length !== tr.components) { arr = new Float32Array(tr.components); out.set(tr.node, arr); }
      this.sampleTrack(i, t, arr, 0);
    }
    return out;
  }
}

const _tmp = new Float32Array(64);

function normalizeQuatAt(q: Float32Array | number[], o: number): void {
  const l = Math.hypot(q[o], q[o + 1], q[o + 2], q[o + 3]);
  const s = l > 0 ? 1 / l : 0;
  q[o] *= s; q[o + 1] *= s; q[o + 2] *= s; q[o + 3] *= s;
}

/** Shortest-path slerp between quats stored in arrays, normalized result. */
function slerpInto(out: Float32Array | number[], o: number, a: ArrayLike<number>, ai: number, b: ArrayLike<number>, bi: number, t: number): void {
  const ax = a[ai], ay = a[ai + 1], az = a[ai + 2], aw = a[ai + 3];
  let bx = b[bi], by = b[bi + 1], bz = b[bi + 2], bw = b[bi + 3];
  let cos = ax * bx + ay * by + az * bz + aw * bw;
  if (cos < 0) { cos = -cos; bx = -bx; by = -by; bz = -bz; bw = -bw; }
  let s0: number, s1: number;
  if (1 - cos > 1e-6) {
    const om = Math.acos(Math.min(cos, 1)), so = Math.sin(om);
    s0 = Math.sin((1 - t) * om) / so;
    s1 = Math.sin(t * om) / so;
  } else { s0 = 1 - t; s1 = t; }
  out[o] = s0 * ax + s1 * bx; out[o + 1] = s0 * ay + s1 * by; out[o + 2] = s0 * az + s1 * bz; out[o + 3] = s0 * aw + s1 * bw;
  normalizeQuatAt(out, o);
}
