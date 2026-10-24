// fondaine animation — inverse kinematics on a Pose, solved in world space and written back as local rotations.
//  * solveTwoBoneIK: analytic (law of cosines) root->mid->end chain with a pole vector.
//  * solveAim: rotate one joint so a local axis points at a world target, with weight and angle limit.

import { mat4, quat, vec3, clamp, type Mat4, type Quat, type Vec3 } from '@fondaine/gl/math';
import type { Pose } from './pose';
import type { Skeleton } from './skeleton';

const _mA = mat4.create();
const _mB = mat4.create();
const _mC = mat4.create();
const _pA = vec3.create(), _pB = vec3.create(), _pC = vec3.create();
const _ab = vec3.create(), _ac = vec3.create(), _at = vec3.create(), _bc = vec3.create();
const _tmp = vec3.create(), _tmp2 = vec3.create(), _axis = vec3.create();
const _q = quat.create(), _qr = quat.create(), _qw = quat.create(), _qp = quat.create(), _qi = quat.create();
const AXIS_X = vec3.create(1, 0, 0), AXIS_Z = vec3.create(0, 0, 1);

export interface TwoBoneIKOptions {
  /** Root joint (e.g. shoulder / hip). */
  root: number;
  /** Middle joint (elbow / knee). Must be a child of root. */
  mid: number;
  /** End effector joint (hand / foot). Must be a child of mid. */
  end: number;
  /** World-space target for the end joint. */
  target: ArrayLike<number>;
  /** World-space pole position the mid joint should bend towards (optional: keeps the current bend plane). */
  pole?: ArrayLike<number>;
  /** 0..1 blend between the input pose and the IK solution (default 1). */
  weight?: number;
  /** Model/instance world transform used by the skeleton (default identity). */
  rootWorld?: Mat4;
  /** Also rotate the end joint so it keeps this world rotation (e.g. planted foot). */
  endWorldRotation?: ArrayLike<number>;
  /** Max reach fraction to avoid the hyper-extension pop (default 0.9999). */
  softLimit?: number;
}

/**
 * Rotate joint `j` (in `pose`) by a WORLD-space delta rotation `dq`:
 * worldNew = dq * world  =>  localNew = parentWorld^-1 * dq * parentWorld * local.
 * `parentWorldRot` is the world rotation of j's parent frame (including baked pre-transforms).
 */
function applyWorldRotationDelta(pose: Pose, j: number, parentWorldRot: Quat, dq: Quat): void {
  quat.invert(_qi, parentWorldRot);
  pose.getRotation(j, _q);
  // local' = inv(P) * dq * P * local
  quat.multiply(_qr, dq, parentWorldRot);
  quat.multiply(_qr, _qi, _qr);
  quat.multiply(_q, _qr, _q);
  quat.normalize(_q, _q);
  pose.setRotation(j, _q);
}

/** World rotation of the frame joint j's local rotation is expressed in (parent world * pre-transform). */
function parentFrameRotation(skel: Skeleton, pose: Pose, j: number, rootWorld: Mat4 | undefined, out: Quat): Quat {
  const p = skel.parents[j];
  if (p >= 0) skel.jointWorldMatrix(pose, p, rootWorld, _mC);
  else if (rootWorld) mat4.copy(_mC, rootWorld);
  else mat4.identity(_mC);
  const pre = skel.preTransforms[j];
  if (pre) mat4.multiply(_mC, _mC, pre);
  mat4.getRotation(out, _mC);
  return quat.normalize(out, out);
}

function worldPos(skel: Skeleton, pose: Pose, j: number, rootWorld: Mat4 | undefined, out: Vec3): Vec3 {
  skel.jointWorldMatrix(pose, j, rootWorld, _mA);
  return mat4.getTranslation(out, _mA);
}

/** Smallest rotation turning direction a onto b (both non-zero, normalized internally). */
function rotationBetween(out: Quat, a: Vec3, b: Vec3): Quat {
  vec3.normalize(_tmp, a); vec3.normalize(_tmp2, b);
  return quat.rotationTo(out, _tmp, _tmp2);
}

/**
 * Analytic two-bone IK. Modifies `pose` (local rotations of root and mid, optionally end).
 * Returns the distance between the end joint and the target after solving (0 when reachable).
 */
export function solveTwoBoneIK(skel: Skeleton, pose: Pose, o: TwoBoneIKOptions): number {
  const weight = clamp(o.weight ?? 1, 0, 1);
  const rw = o.rootWorld;
  const { root, mid, end } = o;
  if (skel.parents[mid] !== root || skel.parents[end] !== mid) {
    // Allow intermediate non-joint nodes (baked into preTransforms) but require direct joint parenting.
    throw new Error('solveTwoBoneIK: expected chain root -> mid -> end (direct joint parents)');
  }
  const target = vec3.clone(o.target);
  // Keep input rotations for weighting.
  const r0 = quat.create(), m0 = quat.create(), e0 = quat.create();
  pose.getRotation(root, r0); pose.getRotation(mid, m0); pose.getRotation(end, e0);

  worldPos(skel, pose, root, rw, _pA);
  worldPos(skel, pose, mid, rw, _pB);
  worldPos(skel, pose, end, rw, _pC);
  const lab = vec3.distance(_pA, _pB);
  const lcb = vec3.distance(_pB, _pC);
  if (lab < 1e-8 || lcb < 1e-8) return vec3.distance(_pC, target);
  const soft = o.softLimit ?? 0.9999;
  let lat = vec3.distance(_pA, target);
  lat = clamp(lat, Math.abs(lab - lcb) + 1e-6, (lab + lcb) * soft);

  vec3.sub(_ab, _pB, _pA);
  vec3.sub(_ac, _pC, _pA);
  vec3.sub(_at, target, _pA);
  vec3.sub(_bc, _pC, _pB);

  // Current interior angles.
  const angle = (u: Vec3, v: Vec3) => {
    const lu = vec3.length(u), lv = vec3.length(v);
    return Math.acos(clamp(vec3.dot(u, v) / (lu * lv || 1), -1, 1));
  };
  const ac_ab_0 = angle(_ac, _ab);
  vec3.negate(_tmp, _ab);
  const ba_bc_0 = angle(_tmp, _bc);
  // Desired interior angles (law of cosines).
  const ac_ab_1 = Math.acos(clamp((lcb * lcb - lab * lab - lat * lat) / (-2 * lab * lat), -1, 1));
  const ba_bc_1 = Math.acos(clamp((lat * lat - lab * lab - lcb * lcb) / (-2 * lab * lcb), -1, 1));

  // Bend-plane normal: from the pole if given, else from the current chain.
  const n = vec3.create();
  if (o.pole) {
    const pole = vec3.clone(o.pole);
    vec3.sub(_tmp, pole, _pA);
    vec3.cross(n, _at, _tmp); // normal of plane (root, target, pole)
    // ab must be rotated so the mid joint lies on the pole side: plane normal orientation chosen so that
    // rotating ac towards ab around n moves toward the pole.
  }
  if (!o.pole || vec3.length(n) < 1e-8) {
    vec3.cross(n, _ac, _ab);
    if (vec3.length(n) < 1e-8) {
      // Fully straight: pick any perpendicular axis.
      vec3.cross(n, _ac, AXIS_Z);
      if (vec3.length(n) < 1e-8) vec3.cross(n, _ac, AXIS_X);
    }
  }
  vec3.normalize(n, n);

  if (o.pole) {
    // Step 1 (pole variant): compute the desired world positions directly, then rotate bones onto them.
    // Mid lies in plane(root, target, pole), at angle ac_ab_1 from the root->target line, on the pole side.
    const dirT = vec3.normalize(vec3.create(), _at);
    const side = vec3.cross(vec3.create(), n, dirT); // in-plane, perpendicular to dirT; points toward pole
    vec3.sub(_tmp, vec3.clone(o.pole), _pA);
    if (vec3.dot(side, _tmp) < 0) vec3.negate(side, side);
    vec3.normalize(side, side);
    const midTarget = vec3.create();
    vec3.scaleAndAdd(midTarget, _pA, dirT, Math.cos(ac_ab_1) * lab);
    vec3.scaleAndAdd(midTarget, midTarget, side, Math.sin(ac_ab_1) * lab);
    // Rotate root so ab -> (midTarget - A)
    vec3.sub(_tmp2, midTarget, _pA);
    const dq = quat.create();
    rotationBetween(dq, _ab, _tmp2);
    parentFrameRotation(skel, pose, root, rw, _qp);
    applyWorldRotationDelta(pose, root, _qp, dq);
    // Rotate mid so bc -> (clampedTarget - midTarget)
    worldPos(skel, pose, mid, rw, _pB);
    worldPos(skel, pose, end, rw, _pC);
    vec3.sub(_bc, _pC, _pB);
    const tgt = vec3.scaleAndAdd(vec3.create(), _pA, dirT, lat);
    vec3.sub(_tmp2, tgt, _pB);
    rotationBetween(dq, _bc, _tmp2);
    parentFrameRotation(skel, pose, mid, rw, _qp);
    applyWorldRotationDelta(pose, mid, _qp, dq);
  } else {
    // Classic formulation (keeps the current bend plane): adjust interior angles about n, then swing to target.
    const dq = quat.create();
    // root: rotate by (ac_ab_1 - ac_ab_0) about n
    quat.setAxisAngle(dq, n, ac_ab_1 - ac_ab_0);
    parentFrameRotation(skel, pose, root, rw, _qp);
    applyWorldRotationDelta(pose, root, _qp, dq);
    // mid: rotate by (ba_bc_1 - ba_bc_0) about n
    quat.setAxisAngle(dq, n, ba_bc_1 - ba_bc_0);
    parentFrameRotation(skel, pose, mid, rw, _qp);
    applyWorldRotationDelta(pose, mid, _qp, dq);
    // swing root so (A->C) aligns with (A->T)
    worldPos(skel, pose, end, rw, _pC);
    vec3.sub(_ac, _pC, _pA);
    rotationBetween(dq, _ac, _at);
    parentFrameRotation(skel, pose, root, rw, _qp);
    applyWorldRotationDelta(pose, root, _qp, dq);
  }

  if (o.endWorldRotation) {
    // local_end = inv(parentFrame) * desiredWorld
    parentFrameRotation(skel, pose, end, rw, _qp);
    quat.invert(_qi, _qp);
    quat.copy(_qw, o.endWorldRotation);
    quat.multiply(_q, _qi, _qw);
    quat.normalize(_q, _q);
    pose.setRotation(end, _q);
  }

  if (weight < 1) {
    blendRot(pose, root, r0, weight);
    blendRot(pose, mid, m0, weight);
    blendRot(pose, end, e0, weight);
  }
  worldPos(skel, pose, end, rw, _pC);
  return vec3.distance(_pC, target);
}

function blendRot(pose: Pose, j: number, from: Quat, w: number): void {
  pose.getRotation(j, _q);
  quat.slerp(_q, from, _q, w);
  quat.normalize(_q, _q);
  pose.setRotation(j, _q);
}

export interface AimOptions {
  joint: number;
  /** World-space point to aim at. */
  target: ArrayLike<number>;
  /** Joint-local axis that should point at the target (default +Z; use [0,0,-1] for camera-style). */
  localAxis?: ArrayLike<number>;
  /** 0..1 blend (default 1). */
  weight?: number;
  /** Maximum rotation away from the animated pose in radians (default PI = unlimited). */
  maxAngle?: number;
  rootWorld?: Mat4;
}

/**
 * Aim / look-at: rotate `joint` so `localAxis` points toward `target`, limited to `maxAngle` from the
 * input (animated) orientation and blended by `weight`. Returns the remaining angle (radians) to the target.
 */
export function solveAim(skel: Skeleton, pose: Pose, o: AimOptions): number {
  const rw = o.rootWorld;
  const weight = clamp(o.weight ?? 1, 0, 1);
  const maxAngle = o.maxAngle ?? Math.PI;
  skel.jointWorldMatrix(pose, o.joint, rw, _mB);
  mat4.getTranslation(_pA, _mB);
  const axis = o.localAxis ?? [0, 0, 1];
  vec3.transformDirMat4(_axis, axis, _mB); // current world aim direction
  vec3.normalize(_axis, _axis);
  vec3.sub(_at, vec3.clone(o.target), _pA);
  if (vec3.length(_at) < 1e-8) return 0;
  vec3.normalize(_at, _at);
  const full = Math.acos(clamp(vec3.dot(_axis, _at), -1, 1));
  if (full < 1e-7) return 0;
  const dq = quat.create();
  quat.rotationTo(dq, _axis, _at);
  const applied = Math.min(full, maxAngle) * weight;
  if (applied < full) {
    // scale the rotation angle: slerp from identity
    quat.slerp(dq, quat.create(), dq, applied / full);
    quat.normalize(dq, dq);
  }
  parentFrameRotation(skel, pose, o.joint, rw, _qp);
  applyWorldRotationDelta(pose, o.joint, _qp, dq);
  return full - applied;
}
