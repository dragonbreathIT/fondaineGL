// First-person arms for oAxis: procedurally generated, skinned bare hands (or gloves) with articulated
// fingers (forward kinematics from grip poses authored per weapon) and forearms / upper arms solved with
// two-bone IK from the shoulders. Everything is real-scale (adult male, 19 cm hand) and rendered as
// viewmodel geometry. The hand + wrist + lower forearm is ONE skinned mesh (see hand-mesh.ts); the
// sleeved part of the forearm and the upper arm are stretched tubes.
//
// Hand frame (both hands): origin at the wrist centre, −z = towards the fingers (wrist → knuckles),
// +y = back of the hand (dorsal), palm faces −y. Right thumb on −x, left thumb on +x.

import { Geometry, Material, Mesh, RenderObject, Renderer, mat4, Mat4, quat, Quat, vec3, Vec3, cylinder, lathe, roundedBox } from '@fondaine/gl';
import { OAXIS, seg } from '../tuning';
import { BONES, BoneFrame, basisQuat, bindInverses, buildHandMesh, handBoneFrames, mirrorX } from './hand-mesh';

export { basisQuat } from './hand-mesh';

export interface FingerPose { curl: [number, number, number]; spread?: number; /** Keep as authored when grips are fitted to the weapon (trigger finger). */ lock?: boolean }
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
  /** Bare skin (default) or a tactical glove (same mesh, fabric material, no nails). */
  skin?: 'bare' | 'glove';
  /** Skin tone (linear RGB). */
  skinColor?: [number, number, number];
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
  /** SDF sampling cell for the hand mesh (m); default from the oAxis detail setting (≈2.2 mm). */
  meshCell?: number;
}

/** Where the skinned forearm hands over to the sleeve (hand space z, m). */
const SLEEVE_START = 0.10;
/** The skinned mesh extends a little past the sleeve start so the cuff always covers the cap. */
const SKINNED_FOREARM = 0.12;

interface Side {
  trim: RenderObject[];
  side: 1 | -1;
  hand: RenderObject;
  nails: RenderObject;
  sleeve: RenderObject;
  upper: RenderObject;
  joints: Float32Array;
  bindInv: Mat4[];
  frames: BoneFrame[];
}

export class FirstPersonArms {
  readonly objects: RenderObject[] = [];
  readonly options: Required<ArmsOptions>;
  visible = true;
  /** Generation statistics of the hand mesh (triangles, ms). */
  readonly meshStats: ReturnType<typeof buildHandMesh>['stats'];
  private sides: Side[] = [];
  private sleeveLength: number;
  private tmp = mat4.create();
  private tmp2 = mat4.create();

  constructor(private renderer: Renderer, o: ArmsOptions = {}) {
    this.options = {
      skin: o.skin ?? 'bare',
      skinColor: o.skinColor ?? [0.56, 0.36, 0.27],
      gloveColor: o.gloveColor ?? [0.035, 0.033, 0.03],
      palmColor: o.palmColor ?? [0.06, 0.05, 0.04],
      sleeveColor: o.sleeveColor ?? [0.075, 0.08, 0.065],
      shoulderRight: o.shoulderRight ?? [0.2, -0.31, 0.1],
      shoulderLeft: o.shoulderLeft ?? [-0.2, -0.31, 0.1],
      forearmLength: o.forearmLength ?? 0.27,
      upperArmLength: o.upperArmLength ?? 0.31,
      viewmodel: o.viewmodel ?? true,
      meshCell: o.meshCell ?? Math.min(0.0035, Math.max(0.0016, 0.0033 / OAXIS.detail)),
    };
    const synth = renderer.synth;
    const size = Math.min(OAXIS.textureSize, 2048);
    const bare = this.options.skin === 'bare';
    const skin = bare
      ? synth.material('skin', { size, tileMeters: 0.05, color: this.options.skinColor, seed: 71 }, { name: 'skin', specular: 0.35, normalScale: 0.85 })
      : synth.material('glove', { size, tileMeters: 0.04, color: this.options.gloveColor, seed: 61 }, { name: 'glove-knit', specular: 0.3, normalScale: 0.9 });
    const gloveTrim = synth.material('glove', { size: 1024, tileMeters: 0.05, color: this.options.palmColor, extra: 1, seed: 64 }, { name: 'glove-leather', specular: 0.4 });
    const nail = synth.material('skin', { size: 512, tileMeters: 0.02, color: this.options.skinColor, extra: 1, seed: 72 }, { name: 'nail', specular: 0.6, normalScale: 0.5 });
    const sleeve = synth.material('webbing', { size, tileMeters: 0.06, color: this.options.sleeveColor, seed: 63 }, { name: 'sleeve' });
    const dev = renderer.dev;
    const mk = (g: Geometry, m: Material, label: string) => {
      const obj = new RenderObject(new Mesh(dev, g, { label }), m);
      obj.viewmodel = this.options.viewmodel;
      obj.castShadow = !this.options.viewmodel;
      this.objects.push(obj);
      return obj;
    };
    const Lf = this.options.forearmLength;
    const built = buildHandMesh({ cell: this.options.meshCell, forearmLength: Lf, skinnedForearm: SKINNED_FOREARM });
    this.meshStats = built.stats;
    // sleeve: pushed-up combat-shirt sleeve from the lower forearm to just past the elbow, real length
    this.sleeveLength = Lf - SLEEVE_START + 0.03;
    const sleeveGeo = sleeveTube(this.sleeveLength);
    const upperGeo = cylinder(0.046, 0.054, 1, seg(20)).rotateX(Math.PI / 2).translate(0, 0, -0.5).scale(1, 0.88, 1);
    // glove trim: a leather wrist cuff with a hook-and-loop closure strap + pull tab, and a padded knuckle panel.
    // Both are rigid to the hand root (the cuff sits on the wrist, the panel on the metacarpals).
    const cuffGeo = gloveCuff();
    const knuckleGeo = knucklePanel();
    for (const side of [1, -1] as const) {
      const geo = side === 1 ? built.geometry : mirrorX(built.geometry);
      const nailGeo = side === 1 ? built.nails : mirrorX(built.nails);
      const joints = new Float32Array(BONES.count * 16);
      for (let b = 0; b < BONES.count; b++) mat4.identity(joints.subarray(b * 16, b * 16 + 16) as unknown as Mat4);
      const hand = mk(geo, skin, `hand-${side}`);
      const nails = mk(nailGeo, nail, `nails-${side}`);
      hand.joints = joints;
      nails.joints = joints;
      nails.visible = bare;
      const trim: RenderObject[] = [];
      if (!bare) {
        trim.push(mk(side === 1 ? cuffGeo : mirrorX(cuffGeo), gloveTrim, `cuff-${side}`));
        trim.push(mk(side === 1 ? knuckleGeo : mirrorX(knuckleGeo), gloveTrim, `knuckles-${side}`));
      }
      this.sides.push({
        side, hand, nails, joints, trim,
        sleeve: mk(sleeveGeo, sleeve, `sleeve-${side}`),
        upper: mk(upperGeo, sleeve, `upper-${side}`),
        bindInv: side === 1 ? built.bindInverse : bindInverses(-1, Lf),
        frames: Array.from({ length: BONES.count }, () => ({ p: vec3.create(), q: quat.create() })),
      });
    }
  }

  addTo(scene: { add(o: RenderObject): unknown }) { for (const o of this.objects) scene.add(o); return this; }
  setVisible(v: boolean) {
    this.visible = v;
    for (const o of this.objects) o.visible = v;
    if (v && this.options.skin !== 'bare') for (const s of this.sides) s.nails.visible = false;
  }

  /**
   * Pose the arms. `weaponRoot` = weapon world matrix; `eye` = eye position + rotation (for the shoulders);
   * `trigger` 0..1 blends the index finger to `indexPressed`. Pass `left: null` to hide the support hand.
   */
  update(weaponRoot: Mat4, grips: WeaponGrips, eye: { position: ArrayLike<number>; rotation: Quat } | null, o: { trigger?: number; leftOverride?: HandPose | null; leftWeight?: number } = {}) {
    if (!this.visible) return;
    const right = grips.right;
    const idx = grips.indexPressed && (o.trigger ?? 0) > 0 ? blendFinger(right.fingers[0], grips.indexPressed, o.trigger ?? 0) : right.fingers[0];
    const rp: HandPose = { ...right, fingers: [idx, right.fingers[1], right.fingers[2], right.fingers[3]] };
    this.poseHand(this.sides[0], weaponRoot, rp, eye, this.options.shoulderRight);
    let left = grips.left ?? null;
    if (o.leftOverride && left) left = blendPose(left, o.leftOverride, o.leftWeight ?? 1);
    else if (o.leftOverride) left = o.leftOverride;
    const L = this.sides[1];
    const show = !!left;
    L.hand.visible = L.sleeve.visible = L.upper.visible = show;
    for (const t of L.trim) t.visible = show;
    L.nails.visible = show && this.options.skin === 'bare';
    if (left) this.poseHand(L, weaponRoot, left, eye, this.options.shoulderLeft);
  }

  private poseHand(S: Side, root: Mat4, pose: HandPose, eye: { position: ArrayLike<number>; rotation: Quat } | null, shoulderEye: [number, number, number]) {
    const side = S.side;
    const q = basisQuat(pose.fingerDir, pose.dorsal);
    const local = mat4.fromRotationTranslation(mat4.create(), q, pose.position);
    const hand = mat4.multiply(mat4.create(), root, local);
    for (const t of S.trim) t.setTransform(hand);
    // NB: the skinned vertex path still applies the object transform, so skinned objects stay at identity
    // (joint matrices are world-space). Culling uses the bind-pose bounds around the weapon origin.
    // hand bones: FK in hand space → world → joint matrix (world × inverse bind)
    const frames = handBoneFrames(pose.fingers, pose.thumb, side, S.frames);
    const J = S.joints, tmp = this.tmp, tmp2 = this.tmp2;
    for (let b = 0; b < BONES.foreA; b++) {
      mat4.fromRotationTranslation(tmp, frames[b].q, frames[b].p);
      mat4.multiply(tmp2, hand, tmp);
      mat4.multiply(tmp, tmp2, S.bindInv[b]);
      J.set(tmp, b * 16);
    }
    // arm: wrist → elbow → shoulder (two-bone IK), or straight back along the hand when no eye is given
    const wrist = vec3.transformMat4(vec3.create(), [0, 0, 0], hand);
    const handQ = mat4.getRotation(quat.create(), hand);
    const handBack = vec3.normalize(vec3.create(), vec3.transformQuat(vec3.create(), [0, 0, 1], handQ));
    const handUp = vec3.transformQuat(vec3.create(), [0, 1, 0], handQ);
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
    const toElbow = vec3.sub(vec3.create(), elbow, wrist);
    const foreLen = vec3.length(toElbow);
    const axis = vec3.scale(vec3.create(), toElbow, 1 / Math.max(foreLen, 1e-6));
    const fwd = vec3.negate(vec3.create(), axis); // bone frames have +z along the forearm (wrist → elbow)
    // forearm twist: the wrist end follows the hand (pronation), the elbow end faces away from the upper arm
    const ue = vec3.sub(vec3.create(), shoulder, elbow);
    const proj = vec3.scaleAndAdd(vec3.create(), ue, axis, -vec3.dot(ue, axis));
    const upB = vec3.normalize(vec3.create(), vec3.scaleAndAdd(vec3.create(), handUp, proj, -1 / Lu * 1.4));
    {
      // bone A (wrist end): bind = identity at the wrist
      mat4.fromRotationTranslation(tmp, basisQuat(fwd, handUp), wrist);
      J.set(tmp, BONES.foreA * 16);
      // bone B (elbow end): bind = translation (0, 0, Lf); the mesh stretches to the solved length
      mat4.fromRotationTranslation(tmp2, basisQuat(fwd, upB), elbow);
      mat4.multiply(tmp, tmp2, S.bindInv[BONES.foreB]);
      J.set(tmp, BONES.foreB * 16);
    }
    // sleeve + upper arm: rigid tubes
    const segTo = (obj: RenderObject, a: Vec3, b: Vec3, up: ArrayLike<number>, unitLen: number) => {
      const d = vec3.sub(vec3.create(), b, a);
      const len = vec3.length(d);
      const dir = vec3.scale(vec3.create(), d, 1 / Math.max(len, 1e-6));
      const m = mat4.fromRotationTranslation(this.tmp, basisQuat(dir, up), a);
      const k = len / unitLen; m[8] *= k; m[9] *= k; m[10] *= k;
      obj.setTransform(m);
    };
    const sleeveUp = vec3.normalize(vec3.create(), vec3.lerp(vec3.create(), handUp, upB, 0.4));
    segTo(S.sleeve, vec3.scaleAndAdd(vec3.create(), wrist, axis, SLEEVE_START * (foreLen / Lf)), vec3.scaleAndAdd(vec3.create(), elbow, axis, 0.03), sleeveUp, this.sleeveLength);
    const ued = vec3.normalize(vec3.create(), ue);
    // the upper arm continues past the shoulder joint into the torso (its end is never visible)
    segTo(S.upper, vec3.scaleAndAdd(vec3.create(), elbow, ued, -0.02), vec3.scaleAndAdd(vec3.create(), shoulder, ued, 0.4), upB, 1);
  }
}

/** Glove cuff around the wrist (hand space: wrist at the origin, forearm towards +z): leather band, closure strap, pull tab. */
function gloveCuff(): Geometry {
  // wrist skin ≈ 58 × 37 mm; the cuff hugs it with 2 mm of leather, from 6 mm before the wrist to 38 mm up the forearm
  const band = lathe([[0.0295, -0.006], [0.0315, -0.004], [0.0325, 0.0], [0.0335, 0.014], [0.0345, 0.03], [0.0335, 0.038], [0.0310, 0.040], [0.0295, 0.038]], seg(26)).rotateX(-Math.PI / 2).scale(1, 0.66, 1);
  // closure strap across the back of the wrist (dorsal = +y), 18 mm wide, ending in a pull tab
  const strap = roundedBox(0.056, 0.0024, 0.016, 0.0009).translate(0.002, 0.0238, 0.021);
  const tab = roundedBox(0.011, 0.003, 0.012, 0.001).translate(0.0335, 0.023, 0.021);
  return Geometry.merge([band, strap, tab]).computeTangents();
}

/** Padded knuckle panel on the back of the hand (metacarpals): a low rounded plate, hand space. */
function knucklePanel(): Geometry {
  const plate = roundedBox(0.064, 0.0055, 0.028, 0.0026, 4).translate(0, 0.0205, -0.071);
  { const p = plate.positions; for (let k = 0; k < p.length; k += 3) { const xn = p[k] / 0.033; p[k + 1] -= 0.0032 * xn * xn; } } // arched across the hand
  return plate.computeNormals().computeTangents();
}

/** Pushed-up shirt sleeve along −z: rolled cuff, then a loose tube to the elbow (length `len`). */
function sleeveTube(len: number): Geometry {
  // [radius, distance from the cuff]; the forearm skin under the cuff is ≈ 38 × 33 mm, the lip rolls inwards
  const prof: [number, number][] = [
    [0.039, 0.007], [0.041, 0], [0.0445, 0.003], [0.047, 0.009], [0.0475, 0.017], [0.046, 0.026], [0.044, 0.034],
    [0.044, len * 0.45], [0.0465, len * 0.8], [0.048, len], [0.040, len + 0.004], [0.0, len + 0.004],
  ];
  return lathe(prof, seg(22)).rotateX(-Math.PI / 2).scale(1, 0.88, 1);
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
