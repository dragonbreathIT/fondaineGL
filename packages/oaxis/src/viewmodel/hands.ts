// First-person arms for oAxis: gloved hands with articulated fingers (forward kinematics from grip poses
// authored per weapon) and sleeved forearms / upper arms solved with two-bone IK from the shoulders.
// Everything is real-scale (adult male, size L tactical gloves) and rendered as viewmodel geometry.
//
// Hand frame (both hands): origin at the wrist centre, −z = towards the fingers (wrist → knuckles),
// +y = back of the hand (dorsal), palm faces −y. Right thumb on −x, left thumb on +x.

import { Geometry, Material, Mesh, RenderObject, Renderer, mat4, Mat4, quat, Quat, vec3, Vec3, cylinder, roundedBox, sphere, lathe } from '@fondaine/gl';
import { OAXIS, seg } from '../tuning';

export interface FingerPose { curl: [number, number, number]; spread?: number }
export interface ThumbPose {
  /** Metacarpal direction in hand space (normalised internally). */
  dir: [number, number, number];
  /** Bend of the two thumb phalanges (radians), towards the palm. */
  bend: [number, number];
}
export interface HandPose {
  /** Wrist centre in weapon space. */
  position: [number, number, number];
  /** Finger direction (wrist → knuckles) and back-of-hand direction, weapon space. */
  fingerDir: [number, number, number];
  dorsal: [number, number, number];
  fingers: [FingerPose, FingerPose, FingerPose, FingerPose];
  thumb: ThumbPose;
}
export interface WeaponGrips {
  right: HandPose;
  left?: HandPose;
  /** Index finger while pressing the trigger (blended by trigger travel). */
  indexPressed?: FingerPose;
  /** Support-hand pose on the magazine baseplate during a reload (magazine space = weapon space at rest). */
  leftOnMagazine?: HandPose;
}

export interface ArmsOptions {
  gloveColor?: [number, number, number];
  palmColor?: [number, number, number];
  sleeveColor?: [number, number, number];
  /** Shoulder positions in eye space (+x right, +y up, −z forward), metres. */
  shoulderRight?: [number, number, number];
  shoulderLeft?: [number, number, number];
  forearmLength?: number;
  upperArmLength?: number;
  /** Render as first-person viewmodel geometry (default true; the viewer uses false). */
  viewmodel?: boolean;
}

// ---------------------------------------------------------------------------------------- anatomy (m)
// finger bases relative to the wrist (right hand), phalanx lengths and radii (gloved)
const FINGERS = [
  { base: [-0.030, 0.004, -0.093], len: [0.046, 0.027, 0.023], r: [0.0098, 0.0091, 0.0084] }, // index
  { base: [-0.0095, 0.005, -0.097], len: [0.051, 0.031, 0.024], r: [0.0101, 0.0094, 0.0086] }, // middle
  { base: [0.0115, 0.004, -0.094], len: [0.048, 0.029, 0.023], r: [0.0096, 0.0089, 0.0082] }, // ring
  { base: [0.0305, 0.002, -0.085], len: [0.037, 0.022, 0.020], r: [0.0088, 0.0082, 0.0076] }, // pinky
];
const THUMB = { base: [-0.030, -0.008, -0.024], len: [0.044, 0.034, 0.029], r: [0.0128, 0.0112, 0.0102] };
const PALM = { w: 0.084, h: 0.027, l: 0.097 };

/** Unit quaternion whose local −z = `fwd` and local +y ≈ `up` (orthogonalised). */
export function basisQuat(fwd: ArrayLike<number>, up: ArrayLike<number>, out: Quat = quat.create()): Quat {
  const z = vec3.normalize(vec3.create(), vec3.set(vec3.create(), -fwd[0], -fwd[1], -fwd[2]));
  const u = vec3.set(vec3.create(), up[0], up[1], up[2]);
  const y = vec3.normalize(vec3.create(), vec3.scaleAndAdd(vec3.create(), u, z, -vec3.dot(u, z)));
  const x = vec3.cross(vec3.create(), y, z);
  const m = mat4.create();
  m[0] = x[0]; m[1] = x[1]; m[2] = x[2];
  m[4] = y[0]; m[5] = y[1]; m[6] = y[2];
  m[8] = z[0]; m[9] = z[1]; m[10] = z[2];
  return mat4.getRotation(out, m);
}

/** Capsule along −z from 0 to −len. */
function capsuleZ(r: number, len: number): Geometry {
  const n = seg(14);
  const prof: [number, number][] = [];
  for (let i = 0; i <= 6; i++) { const a = (i / 6) * Math.PI / 2; prof.push([Math.sin(a) * r, -Math.cos(a) * r]); }
  for (let i = 0; i <= 6; i++) { const a = (i / 6) * Math.PI / 2; prof.push([Math.cos(a) * r, len + Math.sin(a) * r]); }
  return lathe(prof, n).rotateX(-Math.PI / 2);
}

/** Tapered tube along −z (r0 at z = 0, r1 at z = −len), slightly elliptical. */
function limbZ(r0: number, r1: number, len: number, flat = 0.85): Geometry {
  return cylinder(r0, r1, len, seg(20)).rotateX(Math.PI / 2).translate(0, 0, -len / 2).scale(1, flat, 1);
}

interface Piece { obj: RenderObject; key: string }

export class FirstPersonArms {
  readonly objects: RenderObject[] = [];
  readonly options: Required<ArmsOptions>;
  visible = true;
  private hands: { pieces: Map<string, RenderObject>; side: 1 | -1 }[] = [];
  private arms: { fore: RenderObject; upper: RenderObject; cuff: RenderObject }[] = [];
  private tmp = mat4.create();

  constructor(private renderer: Renderer, o: ArmsOptions = {}) {
    this.options = {
      gloveColor: o.gloveColor ?? [0.035, 0.033, 0.03],
      palmColor: o.palmColor ?? [0.06, 0.05, 0.04],
      sleeveColor: o.sleeveColor ?? [0.075, 0.08, 0.065],
      shoulderRight: o.shoulderRight ?? [0.2, -0.31, 0.1],
      shoulderLeft: o.shoulderLeft ?? [-0.2, -0.31, 0.1],
      forearmLength: o.forearmLength ?? 0.27,
      upperArmLength: o.upperArmLength ?? 0.31,
      viewmodel: o.viewmodel ?? true,
    };
    const synth = renderer.synth;
    const size = Math.min(OAXIS.textureSize, 2048);
    const glove = synth.material('webbing', { size, tileMeters: 0.025, color: this.options.gloveColor, seed: 61 }, { name: 'glove-fabric' });
    const palm = synth.material('rubber', { size: 1024, tileMeters: 0.04, color: this.options.palmColor, seed: 62 }, { name: 'glove-palm' });
    const sleeve = synth.material('webbing', { size, tileMeters: 0.06, color: this.options.sleeveColor, seed: 63 }, { name: 'sleeve' });
    const dev = renderer.dev;
    const mk = (g: Geometry, m: Material) => {
      const obj = new RenderObject(new Mesh(dev, g.computeTangents()), m);
      obj.viewmodel = this.options.viewmodel;
      obj.castShadow = !this.options.viewmodel;
      this.objects.push(obj);
      return obj;
    };
    for (const side of [1, -1] as const) {
      const pieces = new Map<string, RenderObject>();
      // palm: dorsal fabric shell + grippy palm pad
      // palm: rounded, narrower at the wrist, thinner at the knuckles, with the thenar (thumb) muscle pad
      const pg = roundedBox(PALM.w, PALM.h, PALM.l, 0.0125, 5).translate(0, 0.002, -PALM.l / 2 - 0.004);
      { const p = pg.positions; for (let k = 0; k < p.length; k += 3) {
        const u = Math.min(1, Math.max(0, -p[k + 2] / PALM.l));
        p[k] *= 0.8 + 0.2 * Math.sin(u * Math.PI * 0.6);
        p[k + 1] *= 1 - 0.18 * u * u;
        // domed back of the hand with metacarpal ridges towards the knuckles
        if (p[k + 1] > 0) { const xn = p[k] / (PALM.w / 2); p[k + 1] += (0.0045 * (1 - xn * xn) + 0.0012 * Math.cos(xn * Math.PI * 3.5) * u) * Math.sin(Math.PI * Math.min(1, u * 1.1)); }
      } }
      pieces.set('palm', mk(pg, glove));
      const pad = sphere(1, 18, 12).scale(PALM.w * 0.42, 0.011, PALM.l * 0.36).translate(0, -PALM.h / 2 + 0.004, -PALM.l * 0.55);
      pieces.set('pad', mk(Geometry.merge([pad, sphere(1, 14, 10).scale(0.02, 0.014, 0.033).translate(-0.025 * side, -0.007, -0.032)]), palm));
      FINGERS.forEach((f, i) => f.len.forEach((L, j) => pieces.set(`f${i}${j}`, mk(capsuleZ(f.r[j], L), j === 0 ? glove : palm))));
      THUMB.len.forEach((L, j) => pieces.set(`t${j}`, mk(capsuleZ(THUMB.r[j], L), j === 0 ? glove : palm)));
      // knuckle guard (moulded strip across the back of the hand)
      pieces.set('guard', mk(roundedBox(PALM.w * 0.9, 0.008, 0.022, 0.004).translate(0, PALM.h / 2 + 0.002, -PALM.l + 0.012), palm));
      this.hands.push({ pieces, side });
      const L = this.options.forearmLength, U = this.options.upperArmLength;
      this.arms.push({
        cuff: mk(limbZ(0.031, 0.033, 0.055), glove),
        // unit-length limbs, stretched to the solved segment length each frame
        fore: mk(limbZ(0.034, 0.044, 1), sleeve),
        upper: mk(limbZ(0.045, 0.052, 1), sleeve),
      });
    }
    void sphere;
  }

  addTo(scene: { add(o: RenderObject): unknown }) { for (const o of this.objects) scene.add(o); return this; }
  setVisible(v: boolean) { this.visible = v; for (const o of this.objects) o.visible = v; }

  /**
   * Pose the arms. `weaponRoot` = weapon world matrix; `eye` = eye position + rotation (for the shoulders);
   * `trigger` 0..1 blends the index finger to `indexPressed`. Pass `left: null` to hide the support hand.
   */
  update(weaponRoot: Mat4, grips: WeaponGrips, eye: { position: ArrayLike<number>; rotation: Quat } | null, o: { trigger?: number; leftOverride?: HandPose | null; leftWeight?: number } = {}) {
    if (!this.visible) return;
    const right = grips.right;
    const idx = grips.indexPressed && (o.trigger ?? 0) > 0 ? blendFinger(right.fingers[0], grips.indexPressed, o.trigger ?? 0) : right.fingers[0];
    const rp: HandPose = { ...right, fingers: [idx, right.fingers[1], right.fingers[2], right.fingers[3]] };
    this.poseHand(0, weaponRoot, rp, eye, this.options.shoulderRight);
    let left = grips.left ?? null;
    if (o.leftOverride && left) left = blendPose(left, o.leftOverride, o.leftWeight ?? 1);
    else if (o.leftOverride) left = o.leftOverride;
    const lh = this.hands[1], la = this.arms[1];
    const show = !!left;
    for (const p of lh.pieces.values()) p.visible = show;
    la.fore.visible = la.upper.visible = la.cuff.visible = show;
    if (left) this.poseHand(1, weaponRoot, left, eye, this.options.shoulderLeft);
  }

  private poseHand(i: number, root: Mat4, pose: HandPose, eye: { position: ArrayLike<number>; rotation: Quat } | null, shoulderEye: [number, number, number]) {
    const h = this.hands[i], side = h.side;
    const q = basisQuat(pose.fingerDir, pose.dorsal);
    const local = mat4.fromRotationTranslation(mat4.create(), q, pose.position);
    const hand = mat4.multiply(mat4.create(), root, local);
    const mirror = (v: ArrayLike<number>): [number, number, number] => [v[0] * side, v[1], v[2]];
    h.pieces.get('palm')!.setTransform(hand);
    h.pieces.get('pad')!.setTransform(hand);
    h.pieces.get('guard')!.setTransform(hand);
    // fingers: FK — flexion rotates −z towards −y (palm) about +x; spread about +y
    FINGERS.forEach((f, fi) => {
      const fp = pose.fingers[fi];
      const m = mat4.translate(mat4.create(), hand, mirror(f.base));
      const spread = (fp.spread ?? 0) * side;
      let acc = quat.fromEuler(quat.create(), 0, spread, 0);
      for (let j = 0; j < 3; j++) {
        acc = quat.multiply(quat.create(), acc, quat.fromEuler(quat.create(), -fp.curl[j], 0, 0));
        const segM = mat4.multiply(mat4.create(), m, mat4.fromQuat(mat4.create(), acc));
        h.pieces.get(`f${fi}${j}`)!.setTransform(segM);
        // advance to the next joint along the rotated −z
        const d = vec3.transformQuat(vec3.create(), [0, 0, -f.len[j]], acc);
        mat4.translate(m, m, d); // m stays a translation-only joint frame in hand space
      }
    });
    // thumb: metacarpal along `dir`, phalanges bend towards the palm
    {
      const d0 = vec3.normalize(vec3.create(), vec3.create(pose.thumb.dir[0] * side, pose.thumb.dir[1], pose.thumb.dir[2]));
      const qa = basisQuat(d0, [0, 1, 0]);
      const m = mat4.translate(mat4.create(), hand, mirror(THUMB.base));
      let acc = qa;
      for (let j = 0; j < 3; j++) {
        if (j > 0) acc = quat.multiply(quat.create(), acc, quat.fromEuler(quat.create(), -pose.thumb.bend[j - 1], 0, 0));
        h.pieces.get(`t${j}`)!.setTransform(mat4.multiply(mat4.create(), m, mat4.fromQuat(mat4.create(), acc)));
        mat4.translate(m, m, vec3.transformQuat(vec3.create(), [0, 0, -THUMB.len[j]], acc));
      }
    }
    // arm: wrist → elbow → shoulder (two-bone IK), or straight back along the hand when no eye is given
    const wrist = vec3.transformMat4(vec3.create(), [0, 0, 0.004], hand);
    const handBack = vec3.normalize(vec3.create(), vec3.transformQuat(vec3.create(), [0, 0, 1], mat4.getRotation(quat.create(), hand)));
    const A = this.arms[i];
    const Lf = this.options.forearmLength, Lu = this.options.upperArmLength;
    let elbow: Vec3, shoulder: Vec3;
    if (eye) {
      shoulder = vec3.add(vec3.create(), vec3.set(vec3.create(), eye.position[0], eye.position[1], eye.position[2]), vec3.transformQuat(vec3.create(), shoulderEye, eye.rotation));
      // arms at full extension: the shoulder girdle protracts towards the target instead of the arm stretching
      const reach = (Lu + Lf) * 0.995, dsw = vec3.distance(shoulder, wrist);
      if (dsw > reach) shoulder = vec3.scaleAndAdd(vec3.create(), wrist, vec3.normalize(vec3.create(), vec3.sub(vec3.create(), shoulder, wrist)), reach);
      const pole = vec3.transformQuat(vec3.create(), [side * 0.7, -1, 0.15], eye.rotation);
      elbow = solveElbow(shoulder, wrist, Lu, Lf, pole, handBack);
    } else {
      elbow = vec3.scaleAndAdd(vec3.create(), wrist, handBack, Lf);
      shoulder = vec3.scaleAndAdd(vec3.create(), elbow, handBack, Lu);
    }
    const segTo = (obj: RenderObject, a: Vec3, b: Vec3, up: ArrayLike<number>, stretch = 0) => {
      const d = vec3.sub(vec3.create(), b, a);
      const len = vec3.length(d);
      const dir = vec3.scale(vec3.create(), d, 1 / Math.max(len, 1e-6));
      const m = mat4.fromRotationTranslation(this.tmp, basisQuat(dir, up), a);
      if (stretch >= 0 && obj !== A.cuff) { const k = len + stretch; m[8] *= k; m[9] *= k; m[10] *= k; }
      obj.setTransform(m);
    };
    const handUp = vec3.transformQuat(vec3.create(), [0, 1, 0], mat4.getRotation(quat.create(), hand));
    segTo(A.cuff, vec3.scaleAndAdd(vec3.create(), wrist, handBack, -0.012), elbow, handUp);
    segTo(A.fore, vec3.scaleAndAdd(vec3.create(), wrist, handBack, 0.035), elbow, handUp, 0.02);
    const ue = vec3.normalize(vec3.create(), vec3.sub(vec3.create(), shoulder, elbow));
    // the upper arm continues past the shoulder joint into the torso (its end is never visible)
    segTo(A.upper, vec3.scaleAndAdd(vec3.create(), elbow, ue, -0.025), vec3.scaleAndAdd(vec3.create(), shoulder, ue, 0.4), handUp);
  }
}

/** Two-bone IK: elbow position for upper arm `a` (shoulder→elbow) and forearm `b` (elbow→wrist). */
function solveElbow(s: Vec3, w: Vec3, a: number, b: number, pole: Vec3, fallbackBack: Vec3): Vec3 {
  const sw = vec3.sub(vec3.create(), w, s);
  let d = vec3.length(sw);
  if (d < 1e-5) return vec3.scaleAndAdd(vec3.create(), w, fallbackBack, b);
  const dir = vec3.scale(vec3.create(), sw, 1 / d);
  d = Math.min(d, (a + b) * 0.9995);
  const x = (a * a - b * b + d * d) / (2 * d);           // distance from shoulder along s→w to the elbow plane
  const r = Math.sqrt(Math.max(0, a * a - x * x));       // elbow circle radius
  const p = vec3.scaleAndAdd(vec3.create(), pole, dir, -vec3.dot(pole, dir));
  const pn = vec3.length(p) > 1e-6 ? vec3.normalize(p, p) : vec3.normalize(vec3.create(), vec3.cross(vec3.create(), dir, vec3.create(0, 1, 0)));
  const e = vec3.scaleAndAdd(vec3.create(), s, dir, x);
  return vec3.scaleAndAdd(e, e, pn, r);
}

function blendFinger(a: FingerPose, b: FingerPose, t: number): FingerPose {
  return { curl: [a.curl[0] + (b.curl[0] - a.curl[0]) * t, a.curl[1] + (b.curl[1] - a.curl[1]) * t, a.curl[2] + (b.curl[2] - a.curl[2]) * t], spread: (a.spread ?? 0) + ((b.spread ?? 0) - (a.spread ?? 0)) * t };
}

function lerp3(a: ArrayLike<number>, b: ArrayLike<number>, t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

export function blendPose(a: HandPose, b: HandPose, t: number): HandPose {
  return {
    position: lerp3(a.position, b.position, t),
    fingerDir: lerp3(a.fingerDir, b.fingerDir, t),
    dorsal: lerp3(a.dorsal, b.dorsal, t),
    fingers: [0, 1, 2, 3].map((i) => blendFinger(a.fingers[i], b.fingers[i], t)) as HandPose['fingers'],
    thumb: { dir: lerp3(a.thumb.dir, b.thumb.dir, t), bend: [a.thumb.bend[0] + (b.thumb.bend[0] - a.thumb.bend[0]) * t, a.thumb.bend[1] + (b.thumb.bend[1] - a.thumb.bend[1]) * t] },
  };
}

void ({} as Piece);
