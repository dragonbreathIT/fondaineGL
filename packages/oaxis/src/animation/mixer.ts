// fondaine animation — AnimationMixer: layered playback with smooth cross-fades, additive layers,
// bone masks, events/markers, and root-motion extraction.

import { mat4, quat, smoothstep, type Mat4 } from '@fondaine/gl/math';
import { AnimationClip, type AnimationEvent, type ClipBinding } from './clip';
import { Pose } from './pose';
import type { Skeleton } from './skeleton';

export type LayerMode = 'base' | 'additive';

export interface LayerOptions {
  mode?: LayerMode;
  weight?: number;
  /** Per-joint weight 0..1 (length = joint count). */
  mask?: Float32Array | null;
  name?: string;
}

export interface PlayOptions {
  /** Layer index (default 0). Created on demand as a base layer if it doesn't exist. */
  layer?: number;
  /** Cross-fade duration in seconds (0 = cut). Other actions on the layer fade out over the same time. */
  fadeIn?: number;
  loop?: boolean;
  speed?: number;
  /** Start time in seconds (default 0, or the clip end when speed < 0). */
  startTime?: number;
  /** User weight multiplier for this action (default 1). */
  weight?: number;
  /** Additive layers only: reference pose for the delta. Default: the clip's first frame. */
  additiveReference?: Pose | 'firstFrame';
}

export type EventCallback = (event: AnimationEvent, action: AnimationAction) => void;

export interface RootMotionOptions {
  /** Extract vertical translation too (default false: XZ only). */
  includeY?: boolean;
  /** Extract yaw (rotation about +Y in the root joint's parent space). Default true. */
  yaw?: boolean;
  /** Remove the extracted motion from the pose (default true). */
  removeFromPose?: boolean;
}

/** One playing instance of a clip. */
export class AnimationAction {
  readonly clip: AnimationClip;
  readonly binding: ClipBinding;
  readonly layer: number;
  time: number;
  speed: number;
  loop: boolean;
  /** User weight multiplier. */
  weight: number;
  /** True once a non-looping action reached its end (it keeps holding the last frame). */
  finished = false;
  /** Set when an action has fully faded out; the mixer drops it. */
  stopped = false;
  /** Additive delta reference (resolved at play time). */
  additiveReference: Pose | null = null;

  // fade state
  fadeFrom = 0;
  fadeTo = 1;
  fadeDuration = 0;
  fadeElapsed = 0;
  /** Includes `startTime` in the first event scan. */
  justStarted = true;

  constructor(clip: AnimationClip, binding: ClipBinding, layer: number, time: number, speed: number, loop: boolean, weight: number) {
    this.clip = clip; this.binding = binding; this.layer = layer;
    this.time = time; this.speed = speed; this.loop = loop; this.weight = weight;
  }

  /** Current smooth fade weight (0..1), excluding the user weight. */
  get fadeWeight(): number {
    if (this.fadeDuration <= 0 || this.fadeElapsed >= this.fadeDuration) return this.fadeTo;
    const s = smoothstep(0, 1, this.fadeElapsed / this.fadeDuration);
    return this.fadeFrom + (this.fadeTo - this.fadeFrom) * s;
  }

  /** Effective weight = fade weight * user weight. */
  get effectiveWeight(): number { return this.fadeWeight * this.weight; }

  fadeTowards(target: number, duration: number): void {
    this.fadeFrom = this.fadeWeight;
    this.fadeTo = target;
    this.fadeDuration = Math.max(0, duration);
    this.fadeElapsed = 0;
  }
}

export class AnimationLayer {
  mode: LayerMode;
  weight: number;
  mask: Float32Array | null;
  name: string;
  actions: AnimationAction[] = [];
  constructor(o: LayerOptions = {}, index = 0) {
    this.mode = o.mode ?? 'base';
    this.weight = o.weight ?? 1;
    this.mask = o.mask ?? null;
    this.name = o.name ?? `layer${index}`;
  }
}

const _q0 = quat.create();
const _q1 = quat.create();
const _qy = quat.create();
const _v0 = new Float32Array(4);
const _v1 = new Float32Array(4);

/** Yaw (rotation angle about +Y) of a quaternion via swing-twist decomposition. */
export function quatYaw(q: ArrayLike<number>): number {
  return 2 * Math.atan2(q[1], q[3]);
}
function wrapPi(a: number): number {
  a = (a + Math.PI) % (2 * Math.PI);
  if (a < 0) a += 2 * Math.PI;
  return a - Math.PI;
}

export class AnimationMixer {
  readonly skeleton: Skeleton;
  readonly layers: AnimationLayer[] = [];
  /** Final evaluated local pose. */
  readonly pose: Pose;
  /** Skinning matrices (16 per joint), refreshed by `update`. */
  readonly jointMatrices: Float32Array;
  /** Model/instance world transform passed to `computeJointMatrices`. */
  rootWorld: Mat4 = mat4.create();
  /** Global time scale. */
  timeScale = 1;
  /** Skip the joint-matrix step in `update` (e.g. when IK runs afterwards and you call computeJointMatrices yourself). */
  autoComputeMatrices = true;

  /** Root motion of the last update: translation delta in the root's facing frame at the start of the step. */
  readonly rootMotion = { deltaTranslation: new Float32Array(3), deltaYaw: 0 };
  private rootJoint = -1;
  private rootOpts: Required<RootMotionOptions> = { includeY: false, yaw: true, removeFromPose: true };

  private readonly bindings = new Map<AnimationClip, ClipBinding>();
  private readonly firstFrames = new Map<AnimationClip, Pose>();
  private readonly listeners: EventCallback[] = [];
  private readonly scratch: Pose;
  private readonly layerPose: Pose;
  private readonly delta: Pose;
  private readonly morph = new Map<number, Float32Array>();

  constructor(skeleton: Skeleton, layers: LayerOptions[] = [{}]) {
    this.skeleton = skeleton;
    this.pose = skeleton.restPose.clone();
    this.scratch = skeleton.restPose.clone();
    this.layerPose = skeleton.restPose.clone();
    this.delta = skeleton.restPose.clone();
    this.jointMatrices = new Float32Array(skeleton.jointCount * 16);
    for (const l of layers) this.addLayer(l);
  }

  // ------------------------------------------------------------ layers

  addLayer(o: LayerOptions = {}): number {
    if (o.mask && o.mask.length !== this.skeleton.jointCount) throw new Error('AnimationMixer: mask length must equal joint count');
    this.layers.push(new AnimationLayer(o, this.layers.length));
    return this.layers.length - 1;
  }
  private ensureLayer(i: number): AnimationLayer {
    while (this.layers.length <= i) this.addLayer();
    return this.layers[i];
  }
  setLayerWeight(i: number, w: number): void { this.ensureLayer(i).weight = w; }
  setLayerMask(i: number, mask: Float32Array | null): void {
    if (mask && mask.length !== this.skeleton.jointCount) throw new Error('AnimationMixer: mask length must equal joint count');
    this.ensureLayer(i).mask = mask;
  }

  // ------------------------------------------------------------ playback

  /** Cached track -> joint binding for a clip. */
  getBinding(clip: AnimationClip): ClipBinding {
    let b = this.bindings.get(clip);
    if (!b) { b = clip.bind((n) => this.skeleton.nodeToJoint(n)); this.bindings.set(clip, b); }
    return b;
  }

  private firstFrame(clip: AnimationClip): Pose {
    let p = this.firstFrames.get(clip);
    if (!p) {
      p = this.skeleton.restPose.clone();
      clip.samplePose(0, this.getBinding(clip), p);
      this.firstFrames.set(clip, p);
    }
    return p;
  }

  play(clip: AnimationClip, opts: PlayOptions = {}): AnimationAction {
    const li = opts.layer ?? 0;
    const layer = this.ensureLayer(li);
    const speed = opts.speed ?? 1;
    const start = opts.startTime ?? (speed < 0 ? clip.duration : 0);
    const action = new AnimationAction(clip, this.getBinding(clip), li, start, speed, opts.loop ?? true, opts.weight ?? 1);
    if (layer.mode === 'additive') {
      const ref = opts.additiveReference;
      action.additiveReference = ref instanceof Pose ? ref : this.firstFrame(clip);
    }
    const fade = Math.max(0, opts.fadeIn ?? 0);
    if (fade <= 0) {
      layer.actions.length = 0; // hard cut
      action.fadeFrom = 1; action.fadeTo = 1; action.fadeDuration = 0;
    } else {
      // Cross-fade: outgoing actions go to 0 and the new one to 1 along the same smoothstep curve, so
      // (for a fully-weighted outgoing action) the weights sum to exactly 1 throughout the fade.
      // On an empty layer this fades the layer in from the layers below / rest pose.
      for (const a of layer.actions) a.fadeTowards(0, fade);
      action.fadeFrom = 0; action.fadeTo = 1; action.fadeDuration = fade; action.fadeElapsed = 0;
    }
    layer.actions.push(action);
    return action;
  }

  /** Fade out everything on a layer. */
  stop(layer = 0, fadeOut = 0): void {
    const l = this.layers[layer];
    if (!l) return;
    if (fadeOut <= 0) { l.actions.length = 0; return; }
    for (const a of l.actions) a.fadeTowards(0, fadeOut);
  }

  stopAll(): void { for (const l of this.layers) l.actions.length = 0; }

  onEvent(cb: EventCallback): () => void {
    this.listeners.push(cb);
    return () => { const i = this.listeners.indexOf(cb); if (i >= 0) this.listeners.splice(i, 1); };
  }

  /** Enable root-motion extraction for a joint (index or name). Pass -1 / null to disable. */
  setRootMotion(joint: number | string | null, opts: RootMotionOptions = {}): void {
    this.rootJoint = joint === null ? -1 : typeof joint === 'string' ? this.skeleton.jointIndex(joint) : joint;
    if (typeof joint === 'string' && this.rootJoint < 0) throw new Error(`AnimationMixer: root joint "${joint}" not found`);
    this.rootOpts = { includeY: opts.includeY ?? false, yaw: opts.yaw ?? true, removeFromPose: opts.removeFromPose ?? true };
  }

  /** Morph-target weights (node -> weights) of the dominant base actions from the last update. */
  get morphWeights(): ReadonlyMap<number, Float32Array> { return this.morph; }

  // ------------------------------------------------------------ update

  update(dt: number): Pose {
    const sdt = dt * this.timeScale;
    const rm = this.rootMotion;
    rm.deltaTranslation.fill(0); rm.deltaYaw = 0;
    let rmWeight = 0;

    // 1) advance time / fades, fire events, accumulate root motion
    for (const layer of this.layers) {
      for (const a of layer.actions) {
        a.fadeElapsed += Math.abs(sdt);
        const prev = a.time;
        const adv = sdt * a.speed;
        const dur = a.clip.duration;
        let next = prev + adv;
        let wraps = 0;
        if (dur > 0) {
          if (a.loop) {
            if (next >= dur || next < 0) {
              wraps = Math.floor(next / dur);
              next -= wraps * dur;
              if (next >= dur) next = 0;
            }
          } else if (next >= dur) { next = dur; a.finished = adv > 0 || a.finished; }
          else if (next <= 0) { next = 0; a.finished = adv < 0 || a.finished; }
        } else next = 0;
        this.fireEvents(a, prev, adv, dur);
        a.justStarted = false;
        if (this.rootJoint >= 0 && layer.mode === 'base' && adv !== 0) {
          const w = a.effectiveWeight * layer.weight * (layer.mask ? layer.mask[this.rootJoint] : 1);
          if (w > 0) { this.accumulateRootMotion(a, prev, next, wraps, w); rmWeight += w; }
        }
        a.time = next;
      }
      // drop fully faded actions
      for (let i = layer.actions.length - 1; i >= 0; i--) {
        const a = layer.actions[i];
        if (a.fadeTo === 0 && a.fadeElapsed >= a.fadeDuration) layer.actions.splice(i, 1);
      }
    }
    if (rmWeight > 0) {
      const k = rmWeight > 1 ? 1 / rmWeight : 1;
      rm.deltaTranslation[0] *= k; rm.deltaTranslation[1] *= k; rm.deltaTranslation[2] *= k; rm.deltaYaw *= k;
    }

    // 2) evaluate layers
    this.evaluate(this.pose);

    // 3) strip root motion from the pose
    if (this.rootJoint >= 0 && this.rootOpts.removeFromPose) this.stripRootMotion(this.pose);

    // 4) skinning matrices
    if (this.autoComputeMatrices) this.skeleton.computeJointMatrices(this.rootWorld, this.jointMatrices, this.pose);
    return this.pose;
  }

  /** Evaluate the current layer stack into `out` (no time advance). */
  evaluate(out: Pose): Pose {
    out.copy(this.skeleton.restPose);
    this.morph.clear();
    for (const layer of this.layers) {
      if (layer.weight <= 0 || layer.actions.length === 0) continue;
      if (layer.mode === 'base') {
        let acc = 0;
        for (const a of layer.actions) {
          const w = a.effectiveWeight;
          if (w <= 0) continue;
          this.scratch.copy(this.skeleton.restPose);
          a.clip.samplePose(a.time, a.binding, this.scratch);
          if (acc === 0) this.layerPose.copy(this.scratch);
          else Pose.blend(this.layerPose, this.layerPose, this.scratch, w / (acc + w));
          acc += w;
          if (w >= 0.5) a.clip.sampleMorphWeights(a.time, this.morph);
        }
        if (acc <= 0) continue;
        Pose.blend(out, out, this.layerPose, layer.weight * Math.min(1, acc), layer.mask ?? undefined);
      } else {
        for (const a of layer.actions) {
          const w = a.effectiveWeight * layer.weight;
          if (w <= 0) continue;
          const ref = a.additiveReference ?? this.firstFrame(a.clip);
          this.scratch.copy(ref);
          a.clip.samplePose(a.time, a.binding, this.scratch);
          Pose.makeAdditive(this.delta, this.scratch, ref);
          Pose.applyAdditive(out, out, this.delta, w, layer.mask ?? undefined);
        }
      }
    }
    return out;
  }

  // ------------------------------------------------------------ events

  private fireEvents(a: AnimationAction, prev: number, adv: number, dur: number): void {
    const evs = a.clip.events;
    if (evs.length === 0 || (this.listeners.length === 0) || dur <= 0) return;
    const emit = (lo: number, hi: number, incLo: boolean, incHi: boolean) => {
      // forward-ordered emission over [lo, hi]
      for (const e of evs) {
        if ((e.time > lo || (incLo && e.time === lo)) && (e.time < hi || (incHi && e.time === hi))) this.emit(e, a);
      }
    };
    const emitRev = (hi: number, lo: number, incHi: boolean, incLo: boolean) => {
      for (let i = evs.length - 1; i >= 0; i--) {
        const e = evs[i];
        if ((e.time < hi || (incHi && e.time === hi)) && (e.time > lo || (incLo && e.time === lo))) this.emit(e, a);
      }
    };
    const inc = a.justStarted;
    if (adv > 0) {
      let end = prev + adv;
      if (!a.loop) { emit(prev, Math.min(end, dur), inc, true); return; }
      if (end < dur) { emit(prev, end, inc, true); return; }
      emit(prev, dur, inc, false);
      end -= dur;
      let loops = 0;
      while (end >= dur && loops++ < 2) { emit(0, dur, true, false); end -= dur; }
      end = end % dur;
      emit(0, end, true, true);
    } else if (adv < 0) {
      let end = prev + adv;
      if (!a.loop) { emitRev(prev, Math.max(end, 0), inc, true); return; }
      if (end > 0) { emitRev(prev, end, inc, true); return; }
      emitRev(prev, 0, inc, true);
      end += dur;
      let loops = 0;
      while (end <= 0 && loops++ < 2) { emitRev(dur, 0, false, true); end += dur; }
      end = ((end % dur) + dur) % dur;
      emitRev(dur, end, false, true);
    } else if (inc) {
      emit(prev, prev, true, true);
    }
  }

  private emit(e: AnimationEvent, a: AnimationAction): void {
    for (const cb of this.listeners) cb(e, a);
  }

  // ------------------------------------------------------------ root motion

  /** Sample the root joint's (translation, rotation) of an action's clip at time t. */
  private sampleRoot(a: AnimationAction, t: number, tOut: Float32Array, qOut: Float32Array): void {
    const j = this.rootJoint;
    this.skeleton.restPose.getTranslation(j, tOut);
    this.skeleton.restPose.getRotation(j, qOut);
    for (let i = 0; i < a.binding.length; i++) {
      if (a.binding[i] !== j) continue;
      const tr = a.clip.tracks[i];
      if (tr.path === 'translation') a.clip.sampleTrack(i, t, tOut, 0);
      else if (tr.path === 'rotation') a.clip.sampleTrack(i, t, qOut, 0);
    }
  }

  private segmentDelta(a: AnimationAction, t0: number, t1: number, outT: Float32Array, wYaw: { v: number }): void {
    this.sampleRoot(a, t0, _v0, _q0);
    this.sampleRoot(a, t1, _v1, _q1);
    const yaw0 = quatYaw(_q0);
    // translation delta in the facing frame at t0 (rotate by -yaw0 about Y)
    const dx = _v1[0] - _v0[0], dy = _v1[1] - _v0[1], dz = _v1[2] - _v0[2];
    const c = Math.cos(-yaw0), s = Math.sin(-yaw0);
    outT[0] += c * dx + s * dz;
    outT[1] += dy;
    outT[2] += -s * dx + c * dz;
    wYaw.v += wrapPi(quatYaw(_q1) - yaw0);
  }

  private accumulateRootMotion(a: AnimationAction, prev: number, next: number, wraps: number, w: number): void {
    const dur = a.clip.duration;
    const dT = new Float32Array(3);
    const dYaw = { v: 0 };
    if (wraps === 0) this.segmentDelta(a, prev, next, dT, dYaw);
    else if (wraps > 0) {
      this.segmentDelta(a, prev, dur, dT, dYaw);
      for (let i = 1; i < Math.min(wraps, 3); i++) this.segmentDelta(a, 0, dur, dT, dYaw);
      this.segmentDelta(a, 0, next, dT, dYaw);
    } else {
      this.segmentDelta(a, prev, 0, dT, dYaw);
      for (let i = 1; i < Math.min(-wraps, 3); i++) this.segmentDelta(a, dur, 0, dT, dYaw);
      this.segmentDelta(a, dur, next, dT, dYaw);
    }
    // NOTE: multi-segment deltas are summed in each segment's own facing frame; for typical per-frame dt
    // (at most one wrap) this is exact enough.
    const rm = this.rootMotion;
    if (!this.rootOpts.includeY) dT[1] = 0;
    rm.deltaTranslation[0] += dT[0] * w; rm.deltaTranslation[1] += dT[1] * w; rm.deltaTranslation[2] += dT[2] * w;
    if (this.rootOpts.yaw) rm.deltaYaw += dYaw.v * w;
  }

  private stripRootMotion(p: Pose): void {
    const j = this.rootJoint;
    const rest = this.skeleton.restPose;
    p.translations[j * 3] = rest.translations[j * 3];
    p.translations[j * 3 + 2] = rest.translations[j * 3 + 2];
    if (this.rootOpts.includeY) p.translations[j * 3 + 1] = rest.translations[j * 3 + 1];
    if (this.rootOpts.yaw) {
      p.getRotation(j, _q0);
      const yaw = quatYaw(_q0);
      quat.setAxisAngle(_qy, [0, 1, 0], -yaw);
      quat.multiply(_q0, _qy, _q0); // remove twist about parent-space Y
      quat.normalize(_q0, _q0);
      p.setRotation(j, _q0);
    }
  }
}
