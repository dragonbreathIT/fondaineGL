// First-person arms from a real rigged character (Mixamo / any humanoid with Mixamo-style bone names,
// e.g. a scanned body rig from Sketchfab). The same WeaponGrips that pose the procedural hands drive the
// rig: two-bone IK places shoulders → elbows → wrists, hands take the grip orientation, fingers curl.
// Everything that isn't shoulders/arms/hands is collapsed so the camera never sees the inside of the head.

import { Material, RenderObject, Renderer, mat4, Mat4, quat, Quat, vec3, Vec3 } from '@fondaine/gl';
import { instantiateGLTF, computeNodeWorld, GLTFInstance } from '../gltf/instantiate';
import type { GLTFAsset } from '../gltf/gltf';
import { basisQuat, type HandPose, type WeaponGrips, type FingerPose, blendPose } from './hands';

const FINGER_NAMES = ['Index', 'Middle', 'Ring', 'Pinky'] as const;

interface Side {
  s: 1 | -1;
  shoulder: number; arm: number; fore: number; hand: number;
  fingers: number[][]; // [finger][1..3]
  thumb: number[];
  armLen: number; foreLen: number;
  /** Rest hand frame in rig world space: finger axis, dorsal. */
  restFinger: Vec3; restDorsal: Vec3; restHandQ: Quat;
  /** Per finger-bone flexion axis in the bone's local space (positive = curl towards the palm). */
  flexLocal: Map<number, Vec3>;
}

export interface SkinnedArmsOptions {
  shoulderRight?: [number, number, number];
  shoulderLeft?: [number, number, number];
  /** Bone names (normalised, without 'mixamorig:') that stay visible besides the arms. */
  keep?: string[];
  viewmodel?: boolean;
}

const norm = (name: string) => name.replace(/^.*[:|]/, '').replace(/^mixamorig\d*_?/i, '');

export class SkinnedArms {
  readonly objects: RenderObject[] = [];
  private asset: GLTFAsset;
  private inst: GLTFInstance;
  private skin: { joints: number[]; ibm: Float32Array };
  private restLocal: { t: Vec3; r: Quat; s: Vec3 }[];
  private restWorld: Mat4[];
  private parent: number[];
  private order: number[];
  private sides: Side[];
  private keepSet: Set<number>;
  private jointData: Float32Array;
  private rigScale = 1;
  visible = true;
  private opts: Required<SkinnedArmsOptions>;

  constructor(renderer: Renderer, inst: GLTFInstance, o: SkinnedArmsOptions = {}) {
    this.inst = inst;
    this.asset = inst.asset;
    this.opts = {
      shoulderRight: o.shoulderRight ?? [0.19, -0.3, 0.1],
      shoulderLeft: o.shoulderLeft ?? [-0.19, -0.3, 0.1],
      keep: o.keep ?? [],
      viewmodel: o.viewmodel ?? true,
    };
    const A = this.asset;
    if (!A.skins.length) throw new Error('SkinnedArms: the model has no skin');
    this.skin = { joints: A.skins[0].joints, ibm: A.skins[0].inverseBindMatrices };
    this.parent = A.nodes.map((n) => n.parent);
    this.restLocal = A.nodes.map((n) => ({ t: vec3.create(...n.translation), r: quat.fromValues(...n.rotation), s: vec3.create(...n.scale) }));
    this.restWorld = computeNodeWorld(A);
    // topological order (parents first)
    this.order = [];
    const visit = (i: number) => { this.order.push(i); for (const c of A.nodes[i].children) visit(c); };
    A.nodes.forEach((n, i) => { if (n.parent < 0) visit(i); });
    const find = (n: string) => A.nodes.findIndex((x) => norm(x.name) === n);
    const need = (n: string) => { const i = find(n); if (i < 0) throw new Error(`SkinnedArms: bone "${n}" not found (Mixamo naming expected)`); return i; };
    const pos = (i: number) => vec3.create(this.restWorld[i][12], this.restWorld[i][13], this.restWorld[i][14]);
    this.sides = (['Right', 'Left'] as const).map((P, k) => {
      const s = (k === 0 ? 1 : -1) as 1 | -1;
      const arm = need(`${P}Arm`), fore = need(`${P}ForeArm`), hand = need(`${P}Hand`);
      const fingers = FINGER_NAMES.map((f) => [1, 2, 3].map((j) => find(`${P}Hand${f}${j}`)));
      const thumb = [1, 2, 3].map((j) => find(`${P}HandThumb${j}`));
      const hp = pos(hand);
      const mid = fingers[1][0] >= 0 ? pos(fingers[1][0]) : vec3.add(vec3.create(), hp, vec3.sub(vec3.create(), hp, pos(fore)));
      const restFinger = vec3.normalize(vec3.create(), vec3.sub(vec3.create(), mid, hp));
      const across = fingers[0][0] >= 0 && fingers[3][0] >= 0 ? vec3.normalize(vec3.create(), vec3.sub(vec3.create(), pos(fingers[0][0]), pos(fingers[3][0]))) : vec3.create(0, 0, 1);
      let restDorsal = vec3.normalize(vec3.create(), vec3.cross(vec3.create(), across, restFinger));
      // the thumb sits on the palm side: flip if needed
      if (thumb[0] >= 0 && vec3.dot(vec3.sub(vec3.create(), pos(thumb[0]), hp), restDorsal) > 0) vec3.scale(restDorsal, restDorsal, -1);
      const side: Side = {
        s, shoulder: find(`${P}Shoulder`), arm, fore, hand, fingers, thumb,
        armLen: vec3.distance(pos(arm), pos(fore)), foreLen: vec3.distance(pos(fore), hp),
        restFinger, restDorsal, restHandQ: mat4.getRotation(quat.create(), this.restWorld[hand]), flexLocal: new Map(),
      };
      // flexion axes: rotating the finger axis towards the palm
      const palm = vec3.scale(vec3.create(), restDorsal, -1);
      const flexWorld = vec3.normalize(vec3.create(), vec3.cross(vec3.create(), restFinger, palm));
      for (const b of [...fingers.flat(), thumb[1], thumb[2]]) {
        if (b < 0) continue;
        const qb = mat4.getRotation(quat.create(), this.restWorld[b]);
        const inv = quat.invert(quat.create(), qb);
        side.flexLocal.set(b, vec3.normalize(vec3.create(), vec3.transformQuat(vec3.create(), flexWorld, inv)));
      }
      return side;
    });
    // world scale of the rig (cm rigs come with a 0.01 armature scale)
    this.rigScale = Math.hypot(this.restWorld[this.sides[0].arm][0], this.restWorld[this.sides[0].arm][1], this.restWorld[this.sides[0].arm][2]);
    // bones that stay: shoulders, arms, hands, fingers (+ user keep list)
    this.keepSet = new Set<number>();
    const keepNames = /^(Right|Left)(Shoulder|Arm|ForeArm|Hand.*)$/;
    A.nodes.forEach((n, i) => { const nn = norm(n.name); if (keepNames.test(nn) || this.opts.keep.includes(nn)) this.keepSet.add(i); });
    this.jointData = new Float32Array(this.skin.joints.length * 16);
    for (const d of inst.drawables) {
      if (!d.skinned) continue;
      const obj = new RenderObject(d.mesh, d.material);
      obj.viewmodel = this.opts.viewmodel;
      obj.castShadow = !this.opts.viewmodel;
      obj.joints = this.jointData;
      this.objects.push(obj);
    }
    void renderer; void (null as unknown as Material);
  }

  static async fromAsset(renderer: Renderer, asset: GLTFAsset, o: SkinnedArmsOptions = {}) {
    return new SkinnedArms(renderer, instantiateGLTF(renderer, asset), o);
  }

  addTo(scene: { add(o: RenderObject): unknown }) { for (const o of this.objects) scene.add(o); return this; }
  setVisible(v: boolean) { this.visible = v; for (const o of this.objects) o.visible = v; }

  update(weaponRoot: Mat4, grips: WeaponGrips, eye: { position: ArrayLike<number>; rotation: Quat } | null, o: { trigger?: number; leftOverride?: HandPose | null; leftWeight?: number } = {}) {
    if (!this.visible || !eye) return;
    const N = this.asset.nodes.length;
    const local: { t: Vec3; r: Quat; s: Vec3 }[] = this.restLocal.map((l) => ({ t: vec3.clone(l.t), r: quat.copy(quat.create(), l.r), s: vec3.clone(l.s) }));
    // rig root: body faces the view yaw; mid-shoulder placed at the eye-space shoulder midpoint
    const fwd = vec3.transformQuat(vec3.create(), [0, 0, -1], eye.rotation);
    const yaw = Math.atan2(-fwd[0], -fwd[2]);
    const yawQ = quat.fromEuler(quat.create(), 0, yaw, 0);
    const ra = this.restWorld[this.sides[0].arm], la = this.restWorld[this.sides[1].arm];
    const midRest = vec3.create((ra[12] + la[12]) / 2, (ra[13] + la[13]) / 2, (ra[14] + la[14]) / 2);
    const shoulderMidEye = vec3.create((this.opts.shoulderRight[0] + this.opts.shoulderLeft[0]) / 2, (this.opts.shoulderRight[1] + this.opts.shoulderLeft[1]) / 2, (this.opts.shoulderRight[2] + this.opts.shoulderLeft[2]) / 2);
    const target = vec3.add(vec3.create(), vec3.create(eye.position[0], eye.position[1], eye.position[2]), vec3.transformQuat(vec3.create(), shoulderMidEye, eye.rotation));
    // the rig faces +z in Mixamo exports; our forward is −z → rotate 180° about y
    const face = quat.multiply(quat.create(), yawQ, quat.fromEuler(quat.create(), 0, Math.PI, 0));
    const rootM = mat4.fromRotationTranslation(mat4.create(), face, target);
    mat4.translate(rootM, rootM, [-midRest[0], -midRest[1], -midRest[2]]);

    const world: Mat4[] = new Array(N);
    const worldQ: Quat[] = new Array(N);
    const compute = (from = 0) => {
      for (let k = from; k < this.order.length; k++) {
        const i = this.order[k];
        const L = mat4.fromRotationTranslationScale(mat4.create(), local[i].r, local[i].t, local[i].s);
        const p = this.parent[i];
        world[i] = p >= 0 ? mat4.multiply(mat4.create(), world[p], L) : mat4.multiply(mat4.create(), rootM, L);
        worldQ[i] = mat4.getRotation(quat.create(), world[i]);
      }
    };
    compute();
    const posOf = (i: number) => vec3.create(world[i][12], world[i][13], world[i][14]);
    const setWorldRot = (i: number, q: Quat) => {
      const p = this.parent[i];
      const pq = p >= 0 ? worldQ[p] : mat4.getRotation(quat.create(), rootM);
      quat.multiply(local[i].r, quat.invert(quat.create(), pq), q);
    };
    const aim = (bone: number, child: number, targetPos: Vec3) => {
      const cur = vec3.normalize(vec3.create(), vec3.sub(vec3.create(), posOf(child), posOf(bone)));
      const want = vec3.normalize(vec3.create(), vec3.sub(vec3.create(), targetPos, posOf(bone)));
      const d = quat.rotationTo(quat.create(), cur, want);
      setWorldRot(bone, quat.multiply(quat.create(), d, worldQ[bone]));
    };

    const right = grips.right;
    const idx = grips.indexPressed && (o.trigger ?? 0) > 0 ? lerpFinger(right.fingers[0], grips.indexPressed, o.trigger ?? 0) : right.fingers[0];
    let left: HandPose | null = grips.left ?? null;
    if (o.leftOverride && left) left = blendPose(left, o.leftOverride, o.leftWeight ?? 1);
    else if (o.leftOverride) left = o.leftOverride;
    const poses: (HandPose | null)[] = [{ ...right, fingers: [idx, right.fingers[1], right.fingers[2], right.fingers[3]] }, left];

    this.sides.forEach((S, k) => {
      const pose = poses[k];
      if (!pose) return;
      const hq = quat.multiply(quat.create(), mat4.getRotation(quat.create(), weaponRoot), basisQuat(pose.fingerDir, pose.dorsal));
      const wrist = vec3.transformMat4(vec3.create(), pose.position, weaponRoot);
      // shoulder protraction at full reach, then two-bone IK
      const sh = posOf(S.arm);
      const a = S.armLen * this.rigScaleAt(S.arm, world), b = S.foreLen * this.rigScaleAt(S.arm, world);
      const reach = (a + b) * 0.995, dsw = vec3.distance(sh, wrist);
      const shoulderPos = dsw > reach ? vec3.scaleAndAdd(vec3.create(), wrist, vec3.normalize(vec3.create(), vec3.sub(vec3.create(), sh, wrist)), reach) : sh;
      if (S.shoulder >= 0 && dsw > reach) {
        // move the clavicle so the arm joint lands on the protracted shoulder
        // (parent-local units: undo the parent's world scale — Mixamo rigs are authored in centimetres)
        const ps = this.parent[S.shoulder], pscale = ps >= 0 ? Math.hypot(world[ps][0], world[ps][1], world[ps][2]) : 1;
        const dl = vec3.transformQuat(vec3.create(), vec3.sub(vec3.create(), shoulderPos, sh), quat.invert(quat.create(), worldQ[ps]));
        local[S.shoulder].t = vec3.scaleAndAdd(local[S.shoulder].t, local[S.shoulder].t, dl, 1 / Math.max(pscale, 1e-9));
        compute();
      }
      const pole = vec3.transformQuat(vec3.create(), [S.s * 0.7, -1, 0.15], eye.rotation);
      const elbow = solveElbow(posOf(S.arm), wrist, a, b, pole);
      aim(S.arm, S.fore, elbow); compute();
      aim(S.fore, S.hand, wrist); compute();
      // hand orientation: rest hand frame → grip frame (mirror x for the left hand's thumb side)
      const restFrame = basisQuat(S.restFinger, S.restDorsal);
      const restFrameWorld = quat.multiply(quat.create(), mat4.getRotation(quat.create(), rootM), restFrame);
      const restHandWorld = quat.multiply(quat.create(), mat4.getRotation(quat.create(), rootM), S.restHandQ);
      const delta = quat.multiply(quat.create(), hq, quat.invert(quat.create(), restFrameWorld));
      setWorldRot(S.hand, quat.multiply(quat.create(), delta, restHandWorld));
      // fingers: flexion about each bone's palm-ward axis on top of the rest pose
      FINGER_NAMES.forEach((_, fi) => {
        const fp = pose.fingers[fi];
        S.fingers[fi].forEach((bone, j) => {
          if (bone < 0) return;
          const ax = S.flexLocal.get(bone);
          if (ax) local[bone].r = quat.multiply(quat.create(), this.restLocal[bone].r, quat.setAxisAngle(quat.create(), ax, fp.curl[j]));
        });
      });
      for (let j = 1; j < 3; j++) {
        const bone = S.thumb[j];
        const ax = bone >= 0 ? S.flexLocal.get(bone) : undefined;
        if (ax) local[bone].r = quat.multiply(quat.create(), this.restLocal[bone].r, quat.setAxisAngle(quat.create(), ax, pose.thumb.bend[j - 1] * 0.8));
      }
      compute();
    });
    // joint matrices; collapse everything that isn't kept (head, torso, legs) to a point behind the shoulders
    const hide = mat4.fromRotationTranslationScale(mat4.create(), quat.create(), vec3.scaleAndAdd(vec3.create(), target, fwd, -0.25), [1e-4, 1e-4, 1e-4]);
    this.skin.joints.forEach((ji, k) => {
      const ibm = this.skin.ibm.subarray(k * 16, k * 16 + 16);
      const m = this.keepSet.has(ji) ? mat4.multiply(mat4.create(), world[ji], ibm) : hide;
      this.jointData.set(m, k * 16);
    });
  }

  private rigScaleAt(i: number, world: Mat4[]) {
    const m = world[i];
    return Math.hypot(m[0], m[1], m[2]) / Math.max(this.rigScale, 1e-9) * this.rigScale / Math.max(Math.hypot(this.restWorld[i][0], this.restWorld[i][1], this.restWorld[i][2]), 1e-9);
  }
}

function lerpFinger(a: FingerPose, b: FingerPose, t: number): FingerPose {
  return { curl: [a.curl[0] + (b.curl[0] - a.curl[0]) * t, a.curl[1] + (b.curl[1] - a.curl[1]) * t, a.curl[2] + (b.curl[2] - a.curl[2]) * t], spread: a.spread };
}

function solveElbow(s: Vec3, w: Vec3, a: number, b: number, pole: Vec3): Vec3 {
  const sw = vec3.sub(vec3.create(), w, s);
  let d = vec3.length(sw);
  const dir = vec3.scale(vec3.create(), sw, 1 / Math.max(d, 1e-6));
  d = Math.min(d, (a + b) * 0.9995);
  const x = (a * a - b * b + d * d) / (2 * d);
  const r = Math.sqrt(Math.max(0, a * a - x * x));
  const p = vec3.scaleAndAdd(vec3.create(), pole, dir, -vec3.dot(pole, dir));
  vec3.normalize(p, p);
  const e = vec3.scaleAndAdd(vec3.create(), s, dir, x);
  return vec3.scaleAndAdd(e, e, p, r);
}
