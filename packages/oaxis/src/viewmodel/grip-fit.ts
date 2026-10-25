// Grip fitting: wraps the fingers of a HandPose around the actual weapon geometry.
//
// Authored grip poses give the hand placement and the *intent* (which finger wraps, which lies along the frame);
// the exact curl of each phalanx is solved here against the weapon's triangles so fingertips rest on the surface
// instead of floating or sinking into it. Works for any FirearmModel (procedural or glTF): it only needs the parts'
// CPU geometry (Mesh.source, kept by PartBuilder / the glTF loader).
//
// Per finger, proximal → distal, each joint's curl is the largest value for which the phalanx capsule still clears
// the weapon (binary search; signed distance from the closest triangle's facing). A phalanx that already touches
// keeps the authored value if that is smaller. Fingers flagged `lock` (the trigger finger) are left as authored.

import { mat4, Mat4, quat, Quat, vec3, Vec3 } from '@fondaine/gl';
import type { FirearmModel } from '@fondaine/gl';
import { FINGERS, THUMB, PALM, handBoneFrames, basisQuat, BONES } from './hand-mesh';
import type { HandPose, FingerPose, WeaponGrips } from './hands';

export interface GripFitOptions {
  /** Target gap between skin and metal (m). Default 0.0008. */
  clearance?: number;
  /** Max curl per joint (MCP, PIP, DIP), rad. */
  maxCurl?: [number, number, number];
  /** Max thumb bend per joint, rad. */
  maxThumbBend?: [number, number];
  /** Push the whole hand out along its dorsal axis when the palm itself is inside the weapon. Default true. */
  fixPalm?: boolean;
  /** Lock the index finger of this hand (trigger finger) — default true for `right`. */
  lockIndex?: boolean;
}

export interface GripFitReport { changed: number; /** distance the hand was moved (m) */ palmPush: number; /** [along dorsal, along fingerDir] (m) */ offset?: [number, number]; /** thumb metacarpal rotated (deg) to clear the weapon */ thumbTurnDeg?: number; fingers: { finger: number; from: number[]; to: number[] }[] }

// ----------------------------------------------------------------------------------------------- triangle soup
interface Soup { pos: Float32Array; tri: Uint32Array; nrm: Float32Array; grid: Map<number, number[]>; cell: number; min: Vec3 }

function signedVolume(p: ArrayLike<number>, ix: ArrayLike<number>): number {
  let v = 0;
  for (let t = 0; t + 2 < ix.length; t += 3) {
    const a = ix[t] * 3, b = ix[t + 1] * 3, c = ix[t + 2] * 3;
    v += p[a] * (p[b + 1] * p[c + 2] - p[b + 2] * p[c + 1]) - p[a + 1] * (p[b] * p[c + 2] - p[b + 2] * p[c]) + p[a + 2] * (p[b] * p[c + 1] - p[b + 1] * p[c]);
  }
  return v / 6;
}

function soupFromModel(model: FirearmModel): Soup | null {
  const P: number[] = [], T: number[] = [];
  const tmp = vec3.create();
  for (const part of model.parts) {
    const src = part.object.mesh.source;
    if (!src) continue;
    // inner surfaces (bores, magwell interiors, hollow grips: inverted winding → negative volume) would make the
    // closest-facet sign test call open air "inside"; only the outer shells count
    if (signedVolume(src.positions, src.indices) < 0) continue;
    const base = P.length / 3;
    const n = src.positions.length / 3;
    for (let i = 0; i < n; i++) {
      vec3.transformMat4(tmp, [src.positions[i * 3], src.positions[i * 3 + 1], src.positions[i * 3 + 2]], part.local as Mat4);
      P.push(tmp[0], tmp[1], tmp[2]);
    }
    for (let i = 0; i < src.indices.length; i++) T.push(base + src.indices[i]);
  }
  if (!T.length) return null;
  const pos = new Float32Array(P), tri = new Uint32Array(T);
  const nt = tri.length / 3, nrm = new Float32Array(nt * 3);
  const min = vec3.create(Infinity, Infinity, Infinity);
  for (let i = 0; i < pos.length; i += 3) { min[0] = Math.min(min[0], pos[i]); min[1] = Math.min(min[1], pos[i + 1]); min[2] = Math.min(min[2], pos[i + 2]); }
  const cell = 0.012;
  const grid = new Map<number, number[]>();
  const key = (x: number, y: number, z: number) => ((x & 1023) << 20) | ((y & 1023) << 10) | (z & 1023);
  for (let t = 0; t < nt; t++) {
    const a = tri[t * 3] * 3, b = tri[t * 3 + 1] * 3, c = tri[t * 3 + 2] * 3;
    const e1 = vec3.create(pos[b] - pos[a], pos[b + 1] - pos[a + 1], pos[b + 2] - pos[a + 2]);
    const e2 = vec3.create(pos[c] - pos[a], pos[c + 1] - pos[a + 1], pos[c + 2] - pos[a + 2]);
    const n = vec3.cross(vec3.create(), e1, e2);
    const l = vec3.length(n) || 1;
    nrm[t * 3] = n[0] / l; nrm[t * 3 + 1] = n[1] / l; nrm[t * 3 + 2] = n[2] / l;
    const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
    for (const v of [a, b, c]) for (let k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], pos[v + k]); hi[k] = Math.max(hi[k], pos[v + k]); }
    const c0 = lo.map((v, k) => Math.floor((v - min[k]) / cell)), c1 = hi.map((v, k) => Math.floor((v - min[k]) / cell));
    for (let x = c0[0]; x <= c1[0]; x++) for (let y = c0[1]; y <= c1[1]; y++) for (let z = c0[2]; z <= c1[2]; z++) {
      const k = key(x, y, z);
      let list = grid.get(k);
      if (!list) grid.set(k, (list = []));
      list.push(t);
    }
  }
  return { pos, tri, nrm, grid, cell, min };
}

/** Closest point on triangle abc to p (Ericson, Real-Time Collision Detection 5.1.5). */
function closestOnTri(p: Vec3, a: Vec3, b: Vec3, c: Vec3, out: Vec3): Vec3 {
  const ab = vec3.sub(vec3.create(), b, a), ac = vec3.sub(vec3.create(), c, a), ap = vec3.sub(vec3.create(), p, a);
  const d1 = vec3.dot(ab, ap), d2 = vec3.dot(ac, ap);
  if (d1 <= 0 && d2 <= 0) return vec3.copy(out, a);
  const bp = vec3.sub(vec3.create(), p, b);
  const d3 = vec3.dot(ab, bp), d4 = vec3.dot(ac, bp);
  if (d3 >= 0 && d4 <= d3) return vec3.copy(out, b);
  const vc = d1 * d4 - d3 * d2;
  if (vc <= 0 && d1 >= 0 && d3 <= 0) { const v = d1 / (d1 - d3); return vec3.scaleAndAdd(out, a, ab, v); }
  const cp = vec3.sub(vec3.create(), p, c);
  const d5 = vec3.dot(ab, cp), d6 = vec3.dot(ac, cp);
  if (d6 >= 0 && d5 <= d6) return vec3.copy(out, c);
  const vb = d5 * d2 - d1 * d6;
  if (vb <= 0 && d2 >= 0 && d6 <= 0) { const w = d2 / (d2 - d6); return vec3.scaleAndAdd(out, a, ac, w); }
  const va = d3 * d6 - d5 * d4;
  if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) { const w = (d4 - d3) / (d4 - d3 + (d5 - d6)); vec3.sub(out, c, b); return vec3.scaleAndAdd(out, b, out, w); }
  const den = 1 / (va + vb + vc), v = vb * den, w = vc * den;
  vec3.scaleAndAdd(out, a, ab, v);
  return vec3.scaleAndAdd(out, out, ac, w);
}

/** Signed distance from p to the soup (negative inside, by the facing of the closest triangle), searched within `maxR`. */
function signedDistance(s: Soup, p: Vec3, maxR: number): number {
  const cx = Math.floor((p[0] - s.min[0]) / s.cell), cy = Math.floor((p[1] - s.min[1]) / s.cell), cz = Math.floor((p[2] - s.min[2]) / s.cell);
  const R = Math.ceil(maxR / s.cell);
  let best = Infinity, bestT = -1, bestFacing = Infinity; // bestFacing: closest triangle whose plane faces p
  const q = vec3.create(), a = vec3.create(), b = vec3.create(), c = vec3.create();
  const key = (x: number, y: number, z: number) => ((x & 1023) << 20) | ((y & 1023) << 10) | (z & 1023);
  const seen = new Set<number>();
  for (let r = 0; r <= R; r++) {
    for (let x = cx - r; x <= cx + r; x++) for (let y = cy - r; y <= cy + r; y++) for (let z = cz - r; z <= cz + r; z++) {
      if (Math.max(Math.abs(x - cx), Math.abs(y - cy), Math.abs(z - cz)) !== r) continue;
      const list = s.grid.get(key(x, y, z));
      if (!list) continue;
      for (const t of list) {
        if (seen.has(t)) continue;
        seen.add(t);
        const ia = s.tri[t * 3] * 3, ib = s.tri[t * 3 + 1] * 3, ic = s.tri[t * 3 + 2] * 3;
        vec3.set(a, s.pos[ia], s.pos[ia + 1], s.pos[ia + 2]); vec3.set(b, s.pos[ib], s.pos[ib + 1], s.pos[ib + 2]); vec3.set(c, s.pos[ic], s.pos[ic + 1], s.pos[ic + 2]);
        closestOnTri(p, a, b, c, q);
        const d = vec3.distance(p, q);
        if (d < best) { best = d; bestT = t; }
        if (d < bestFacing && (p[0] - s.pos[ia]) * s.nrm[t * 3] + (p[1] - s.pos[ia + 1]) * s.nrm[t * 3 + 1] + (p[2] - s.pos[ia + 2]) * s.nrm[t * 3 + 2] >= 0) bestFacing = d;
      }
    }
    // everything in rings ≤ r has been seen; a closer triangle cannot be further out than (r) cells
    if (bestT >= 0 && best < r * s.cell) break;
  }
  if (bestT < 0) return maxR;
  // Sign: inside only when every surface at (about) the closest distance faces away. A facet facing away with a
  // facing one at nearly the same distance is an edge / a medial-axis point in open air (concave corner, the mouth
  // of a cavity); and no part of a firearm is thicker than 5 cm, so a "depth" beyond 25 mm is open air as well.
  if (bestFacing <= best + 0.0015) return bestFacing;
  return best < 0.025 ? -best : best;
}

// ----------------------------------------------------------------------------------------------- fitting
const MAX_CURL: [number, number, number] = [1.65, 1.95, 1.25];
const MAX_THUMB: [number, number] = [1.0, 1.3];

function handMatrix(pose: HandPose): Mat4 {
  return mat4.fromRotationTranslation(mat4.create(), basisQuat(pose.fingerDir, pose.dorsal), pose.position);
}

/** Minimum skin clearance (m) of the capsule of bone `bone` for the given finger/thumb poses. */
function phalanxClearance(s: Soup, hand: Mat4, fingers: FingerPose[], thumb: HandPose['thumb'], side: 1 | -1, bone: number, len: number, r: number, samples = 5): number {
  const frames = handBoneFrames(fingers, thumb, side);
  const f = frames[bone];
  const dir = vec3.transformQuat(vec3.create(), [0, 0, -1], f.q);
  let worst = Infinity;
  const p = vec3.create(), w = vec3.create();
  for (let i = 0; i <= samples; i++) {
    // from 30% of the phalanx (the joint end sits inside the previous phalanx' cap) to the tip centre
    vec3.scaleAndAdd(p, f.p, dir, len * (0.3 + 0.7 * (i / samples)));
    vec3.transformMat4(w, p, hand);
    const d = signedDistance(s, w, 0.06) - r;
    if (d < worst) worst = d;
  }
  return worst;
}

/** Largest value in [lo, hi] for which `clear(v) >= target` (clear decreasing with v near contact), by bisection. */
function largestClear(clear: (v: number) => number, lo: number, hi: number, target: number): number {
  if (clear(hi) >= target) return hi;
  if (clear(lo) < target) return lo;
  for (let i = 0; i < 14; i++) { const mid = (lo + hi) / 2; if (clear(mid) >= target) lo = mid; else hi = mid; }
  return lo;
}

/** Fit one hand pose to the weapon. Returns the fitted pose (new object) and a report. */
export function fitHandPose(pose: HandPose, soup: Soup, side: 1 | -1, o: GripFitOptions = {}): { pose: HandPose; report: GripFitReport } {
  const gap = o.clearance ?? 0.0008;
  const maxCurl = o.maxCurl ?? MAX_CURL, maxThumb = o.maxThumbBend ?? MAX_THUMB;
  const fitted: HandPose = { ...pose, position: [...pose.position] as [number, number, number], fingers: pose.fingers.map((f) => ({ ...f, curl: [...f.curl] as [number, number, number] })) as HandPose['fingers'], thumb: { dir: [...pose.thumb.dir] as [number, number, number], bend: [...pose.thumb.bend] as [number, number] } };
  const report: GripFitReport = { changed: 0, palmPush: 0, fingers: [] };
  let hand = handMatrix(fitted);
  const lockIndex = o.lockIndex ?? false;
  const free = (fi: number) => !(fitted.fingers[fi].lock || (fi === 0 && lockIndex));
  const straight = fitted.fingers.map((f, fi) => (free(fi) ? { ...f, curl: [0, 0, 0] as [number, number, number] } : f)) as HandPose['fingers'];
  // 1. placement: the palm's palmar surface and the proximal phalanges of the free fingers (straight) must start
  //    outside the weapon, otherwise no curl can fix them. Poses are authored by eye, so the hand is moved by the
  //    smallest offset in the plane (dorsal = away from the palm, fingerDir = along the fingers) that clears them.
  if (o.fixPalm !== false) {
    const dorsal = vec3.normalize(vec3.create(), vec3.set(vec3.create(), pose.dorsal[0], pose.dorsal[1], pose.dorsal[2]));
    const fwd = vec3.normalize(vec3.create(), vec3.set(vec3.create(), pose.fingerDir[0], pose.fingerDir[1], pose.fingerDir[2]));
    const base = [...fitted.position] as [number, number, number];
    const w = vec3.create();
    const penetration = (): number => {
      let worst = Infinity;
      for (let i = 0; i <= 3; i++) for (let j = -1; j <= 1; j++) {
        const z = PALM.z0 + (PALM.z1 - PALM.z0) * (i / 3), t = PALM.t0 + (PALM.t1 - PALM.t0) * (i / 3), hw = (PALM.w0 + (PALM.w1 - PALM.w0) * (i / 3)) * 0.8;
        vec3.transformMat4(w, [j * hw * side, -t, z], hand);
        worst = Math.min(worst, signedDistance(soup, w, 0.05));
      }
      fitted.fingers.forEach((_f, fi) => {
        if (!free(fi)) return;
        worst = Math.min(worst, phalanxClearance(soup, hand, straight, fitted.thumb, side, BONES.finger(fi, 0), FINGERS[fi].len[0], FINGERS[fi].r[0]));
      });
      return Math.max(0, -worst);
    };
    let best = { score: penetration() * 1000, a: 0, b: 0 };
    if (best.score > 0) {
      for (let a = 0; a <= 16; a += 2) for (let b = -16; b <= 16; b += 2) {
        if (a === 0 && b === 0) continue;
        for (let k = 0; k < 3; k++) fitted.position[k] = base[k] + dorsal[k] * a * 1e-3 + fwd[k] * b * 1e-3;
        hand = handMatrix(fitted);
        const score = penetration() * 1000 + 0.12 * Math.hypot(a, b); // mm of penetration, small moves preferred
        if (score < best.score) best = { score, a, b };
      }
      for (let k = 0; k < 3; k++) fitted.position[k] = base[k] + dorsal[k] * best.a * 1e-3 + fwd[k] * best.b * 1e-3;
      hand = handMatrix(fitted);
      report.palmPush = Math.hypot(best.a, best.b) * 1e-3;
      report.offset = [best.a * 1e-3, best.b * 1e-3];
    }
  }
  // 2. fingers: each phalanx closes (proximal → distal) until it touches; joints further out don't affect it
  fitted.fingers.forEach((fp, fi) => {
    if (!free(fi)) return;
    const from = [...fp.curl];
    const anat = FINGERS[fi];
    for (let j = 0; j < 3; j++) {
      const clear = (v: number) => {
        // this joint at v, the joints beyond it straight: the whole remaining finger must clear, because a later
        // joint can only close further (no hyperextension), never undo a proximal bend that aims into the weapon
        const test = fitted.fingers.map((f, k) => (k === fi ? { ...f, curl: f.curl.map((c, jj) => (jj === j ? v : jj > j ? 0 : c)) as [number, number, number] } : f)) as HandPose['fingers'];
        let worst = Infinity;
        for (let jj = j; jj < 3; jj++) worst = Math.min(worst, phalanxClearance(soup, hand, test, fitted.thumb, side, BONES.finger(fi, jj), anat.len[jj], anat.r[jj]));
        return worst;
      };
      fp.curl[j] = largestClear(clear, 0, Math.min(maxCurl[j], from[j] + 0.4), gap);
    }
    if (from.some((c, k) => Math.abs(c - fp.curl[k]) > 1e-3)) { report.changed++; report.fingers.push({ finger: fi, from, to: [...fp.curl] }); }
  });
  // 3. thumb: the metacarpal direction is authored; if it stabs into the weapon, rotate it the least that clears
  //    (about the finger axis, towards the back of the hand), then bend the two phalanges onto the surface
  {
    const from = [...fitted.thumb.bend];
    const d0 = [...fitted.thumb.dir] as [number, number, number];
    // the whole thumb straight (bending only moves it towards the palm, i.e. into the weapon the palm presses on)
    const metaClear = (dir: [number, number, number]) => { let w = Infinity; for (let j = 0; j < 3; j++) w = Math.min(w, phalanxClearance(soup, hand, fitted.fingers, { dir, bend: [0, 0] }, side, BONES.thumb(j), THUMB.len[j], THUMB.r[j])); return w; };
    if (metaClear(d0) < 0) {
      let best = { pen: -metaClear(d0) * 1000, ang: 0 };
      for (let deg = 5; deg <= 60; deg += 5) for (const sgn of [1, -1]) {
        const q = quat.setAxisAngle(quat.create(), [0, 0, 1], (sgn * deg * Math.PI) / 180);
        const d = vec3.transformQuat(vec3.create(), d0, q);
        const dir: [number, number, number] = [d[0], d[1], d[2]];
        const pen = Math.max(0, -metaClear(dir)) * 1000 + deg * 0.03;
        if (pen < best.pen) best = { pen, ang: sgn * deg };
      }
      if (best.ang) {
        const q = quat.setAxisAngle(quat.create(), [0, 0, 1], (best.ang * Math.PI) / 180);
        const d = vec3.transformQuat(vec3.create(), d0, q);
        fitted.thumb.dir = [d[0], d[1], d[2]];
        report.thumbTurnDeg = best.ang;
      }
    }
    for (let j = 0; j < 2; j++) {
      const clear = (v: number) => {
        const t = { dir: fitted.thumb.dir, bend: fitted.thumb.bend.map((b, k) => (k === j ? v : k > j ? 0 : b)) as [number, number] };
        let worst = Infinity;
        for (let jj = j + 1; jj < 3; jj++) worst = Math.min(worst, phalanxClearance(soup, hand, fitted.fingers, t, side, BONES.thumb(jj), THUMB.len[jj], THUMB.r[jj]));
        return worst;
      };
      fitted.thumb.bend[j] = largestClear(clear, 0, Math.min(maxThumb[j], from[j] + 0.4), gap);
    }
    if (from.some((b, k) => Math.abs(b - fitted.thumb.bend[k]) > 1e-3)) { report.changed++; report.fingers.push({ finger: 4, from, to: [...fitted.thumb.bend] }); }
  }
  return { pose: fitted, report };
}

/**
 * Fit every pose of a weapon's grips against its geometry: every finger wraps until contact (the trigger finger's
 * contact is the frame above the guard, its pressed pose the trigger shoe). Returns new grips; the originals are
 * not modified. Fingers flagged `lock` keep their authored curl.
 */
export function fitWeaponGrips(grips: WeaponGrips, model: FirearmModel, o: GripFitOptions = {}): { grips: WeaponGrips; reports: Record<string, GripFitReport> } {
  const soup = soupFromModel(model);
  if (!soup) return { grips, reports: {} };
  const reports: Record<string, GripFitReport> = {};
  const fit = (name: string, pose: HandPose | undefined, side: 1 | -1, lockIndex: boolean) => {
    if (!pose) return pose;
    const r = fitHandPose(pose, soup, side, { ...o, lockIndex });
    reports[name] = r.report;
    return r.pose;
  };
  const out: WeaponGrips = {
    ...grips,
    right: fit('right', grips.right, 1, false)!,
    left: fit('left', grips.left, -1, false),
    leftOnMagazine: fit('leftOnMagazine', grips.leftOnMagazine, -1, false),
  };
  if (grips.indexPressed) {
    // the trigger finger pressed: fitted on the (already placed) right hand so the pad lands on the trigger shoe
    const pressed = fit('indexPressed', { ...out.right, fingers: [grips.indexPressed, out.right.fingers[1], out.right.fingers[2], out.right.fingers[3]] }, 1, false)!;
    out.indexPressed = pressed.fingers[0];
  }
  for (const k of Object.keys(grips) as (keyof WeaponGrips)[]) {
    if (k === 'right' || k === 'left' || k === 'leftOnMagazine' || k === 'indexPressed') continue;
    const v = (grips as unknown as Record<string, unknown>)[k];
    if (v && typeof v === 'object' && 'fingers' in (v as object)) (out as unknown as Record<string, unknown>)[k] = fit(k, v as HandPose, -1, false);
  }
  return { grips: out, reports };
}

/** Debug: signed distance (m, negative inside) from a weapon-space point to the model's surface. */
export function weaponSignedDistance(model: FirearmModel, p: ArrayLike<number>, maxR = 0.1): number {
  const soup = soupFromModel(model);
  return soup ? signedDistance(soup, vec3.create(p[0], p[1], p[2]), maxR) : maxR;
}

/** Debug: per-phalanx signed clearance samples (m) of a pose against the weapon, plus palm samples. */
export function debugHandClearance(pose: HandPose, model: FirearmModel, side: 1 | -1) {
  const soup = soupFromModel(model);
  if (!soup) return null;
  const hand = handMatrix(pose);
  const frames = handBoneFrames(pose.fingers, pose.thumb, side);
  const out: Record<string, number[]> = {};
  const p = vec3.create(), w = vec3.create();
  const sample = (name: string, bone: number, len: number, r: number) => {
    const f = frames[bone];
    const dir = vec3.transformQuat(vec3.create(), [0, 0, -1], f.q);
    const arr: number[] = [];
    for (let i = 0; i <= 5; i++) { vec3.scaleAndAdd(p, f.p, dir, (len * (i + 0.5)) / 6); vec3.transformMat4(w, p, hand); arr.push(Math.round((signedDistance(soup, w, 0.06) - r) * 1e4) / 10); }
    out[name] = arr;
  };
  FINGERS.forEach((f, fi) => { for (let j = 0; j < 3; j++) sample(`f${fi}${j}`, BONES.finger(fi, j), f.len[j], f.r[j]); });
  for (let j = 0; j < 3; j++) sample(`t${j}`, BONES.thumb(j), THUMB.len[j], THUMB.r[j]);
  const palm: number[] = [];
  for (let i = 0; i <= 3; i++) for (let j = -1; j <= 1; j++) {
    const z = PALM.z0 + (PALM.z1 - PALM.z0) * (i / 3), t = PALM.t0 + (PALM.t1 - PALM.t0) * (i / 3), hw = (PALM.w0 + (PALM.w1 - PALM.w0) * (i / 3)) * 0.8;
    vec3.transformMat4(w, [j * hw * side, -t, z], hand);
    palm.push(Math.round(signedDistance(soup, w, 0.05) * 1e4) / 10);
  }
  out.palm = palm;
  const wr = vec3.transformMat4(vec3.create(), [0, 0, 0], hand);
  const k0 = vec3.transformMat4(vec3.create(), frames[BONES.finger(1, 0)].p, hand);
  // index finger sample positions in weapon space (debugging what it hits)
  for (let j = 0; j < 3; j++) {
    const f = frames[BONES.finger(0, j)];
    const dir = vec3.transformQuat(vec3.create(), [0, 0, -1], f.q);
    const pts: number[] = [];
    for (let i = 0; i <= 2; i++) { vec3.scaleAndAdd(p, f.p, dir, FINGERS[0].len[j] * (0.3 + 0.7 * (i / 2))); vec3.transformMat4(w, p, hand); pts.push(...Array.from(w).map((v) => Math.round(v * 1e4) / 1e4)); }
    out[`f0${j}_pos`] = pts;
  }
  out.wristW = Array.from(wr).map((v) => Math.round(v * 1e4) / 1e4);
  out.middleKnuckleW = Array.from(k0).map((v) => Math.round(v * 1e4) / 1e4);
  return out;
}

/** Fit a single support-hand pose (e.g. a racking pose derived at runtime) against the weapon. */
export function fitSupportPose(pose: HandPose, model: FirearmModel, o: GripFitOptions = {}): HandPose {
  const soup = soupFromModel(model);
  return soup ? fitHandPose(pose, soup, -1, o).pose : pose;
}

void (null as unknown as Quat);
