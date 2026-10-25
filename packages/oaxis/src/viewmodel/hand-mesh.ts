// Procedural bare hand + forearm for the first-person arms: an anatomical SDF (smooth unions of round
// cones / ellipsoids for the carpus, metacarpals, muscle pads, phalanges, knuckles, nails, webbing and
// forearm) polygonised with naive surface nets, relaxed and re-projected onto the SDF, then skinned with
// linear-blend weights for 18 bones. Right hand, canonical open bind pose, hand space (see hands.ts).
//
// Hand frame: origin at the wrist centre, −z towards the fingers, +y dorsal, palm −y, right thumb on −x.
// The left hand is a mirror in x of this geometry (same bone indices; the FK mirrors with `side`).

import { Geometry, mat4, Mat4, quat, Quat, vec3, Vec3, sphere } from '@fondaine/gl';
import type { FingerPose, ThumbPose } from './hands';

// ---------------------------------------------------------------------------------------- anatomy (m)
export interface DigitAnatomy {
  /** Joint centre of the first phalanx (MCP; thumb: CMC) relative to the wrist, right hand. */
  base: [number, number, number];
  /** Phalanx lengths (joint to joint; the last one to the fingertip surface). */
  len: [number, number, number];
  /** Radius at the start of each phalanx. */
  r: [number, number, number];
}

/** Index, middle, ring, little (adult male, 19 cm hand). */
export const FINGERS: DigitAnatomy[] = [
  { base: [-0.029, 0.003, -0.089], len: [0.044, 0.026, 0.023], r: [0.0092, 0.0083, 0.0076] },
  { base: [-0.009, 0.004, -0.092], len: [0.048, 0.029, 0.024], r: [0.0094, 0.0085, 0.0078] },
  { base: [0.011, 0.003, -0.089], len: [0.045, 0.028, 0.023], r: [0.0090, 0.0082, 0.0075] },
  { base: [0.029, 0.001, -0.080], len: [0.036, 0.020, 0.021], r: [0.0080, 0.0073, 0.0068] },
];
/** Thumb: metacarpal (from the CMC joint), proximal, distal. */
export const THUMB: DigitAnatomy = { base: [-0.030, -0.006, -0.022], len: [0.044, 0.032, 0.027], r: [0.0115, 0.0100, 0.0090] };
/** Metacarpal bases on the carpal row (right hand), one per finger. */
const CARPAL: [number, number, number][] = [[-0.016, 0.003, -0.030], [-0.004, 0.004, -0.032], [0.008, 0.003, -0.030], [0.018, 0.001, -0.028]];
/** Palm slab: wrist end / knuckle end, half widths, half thicknesses, transverse arch. */
export const PALM = { z0: -0.012, z1: -0.080, w0: 0.028, w1: 0.041, t0: 0.013, t1: 0.0105, cup: 0.003 };
/** Forearm cross-section profile from the wrist (z = 0) to the elbow: [z, half width (x), half thickness (y)]. */
const FOREARM_PROFILE: [number, number, number][] = [
  [-0.07, 0.026, 0.009], [-0.035, 0.029, 0.015], [0, 0.029, 0.0185], [0.04, 0.031, 0.023], [0.10, 0.036, 0.030], [0.18, 0.044, 0.040], [0.24, 0.042, 0.039], [0.30, 0.038, 0.036],
];

/** Canonical bind pose: relaxed open hand, fingers slightly curled and fanned, thumb abducted. */
export const BIND_FINGERS: FingerPose[] = [
  { curl: [0.18, 0.22, 0.12], spread: 0.12 }, { curl: [0.20, 0.25, 0.12], spread: 0.03 },
  { curl: [0.22, 0.27, 0.14], spread: -0.06 }, { curl: [0.25, 0.30, 0.15], spread: -0.14 },
];
export const BIND_THUMB: ThumbPose = { dir: [-0.45, -0.33, -0.83], bend: [0.2, 0.15] };

/** Bone indices of the hand skeleton (shared by the mesh weights and the runtime FK). */
export const BONES = {
  root: 0,
  finger: (f: number, j: number) => 1 + f * 3 + j,
  thumb: (j: number) => 13 + j,
  /** Forearm at the wrist end (twists with the hand) and at the elbow end (twists with the upper arm). */
  foreA: 16, foreB: 17,
  count: 18,
};

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

export interface BoneFrame { p: Vec3; q: Quat }

/**
 * Forward kinematics of the hand bones in hand space: root (identity), 3 per finger, 3 for the thumb.
 * Finger flexion rotates −z towards −y (palm) about +x, spread about +y; `side` −1 mirrors in x.
 */
export function handBoneFrames(fingers: readonly FingerPose[], thumb: ThumbPose, side: 1 | -1, out?: BoneFrame[]): BoneFrame[] {
  const frames = out ?? Array.from({ length: BONES.count }, () => ({ p: vec3.create(), q: quat.create() }));
  vec3.set(frames[0].p, 0, 0, 0); quat.identity(frames[0].q);
  const step = vec3.create(), rot = quat.create();
  FINGERS.forEach((f, fi) => {
    const fp = fingers[fi];
    const p = vec3.set(vec3.create(), f.base[0] * side, f.base[1], f.base[2]);
    const acc = quat.fromEuler(quat.create(), 0, (fp.spread ?? 0) * side, 0);
    for (let j = 0; j < 3; j++) {
      quat.multiply(acc, acc, quat.fromEuler(rot, -fp.curl[j], 0, 0));
      const fr = frames[BONES.finger(fi, j)];
      vec3.copy(fr.p, p); quat.copy(fr.q, acc);
      vec3.add(p, p, vec3.transformQuat(step, [0, 0, -f.len[j]], acc));
    }
  });
  const d0 = vec3.normalize(vec3.create(), vec3.set(vec3.create(), thumb.dir[0] * side, thumb.dir[1], thumb.dir[2]));
  const acc = basisQuat(d0, [0, 1, 0]);
  if (thumb.twist) quat.multiply(acc, acc, quat.setAxisAngle(rot, [0, 0, 1], thumb.twist * side));
  const p = vec3.set(vec3.create(), THUMB.base[0] * side, THUMB.base[1], THUMB.base[2]);
  for (let j = 0; j < 3; j++) {
    if (j > 0) quat.multiply(acc, acc, quat.fromEuler(rot, -thumb.bend[j - 1], 0, 0));
    const fr = frames[BONES.thumb(j)];
    vec3.copy(fr.p, p); quat.copy(fr.q, acc);
    vec3.add(p, p, vec3.transformQuat(step, [0, 0, -THUMB.len[j]], acc));
  }
  return frames;
}

// ------------------------------------------------------------------------------------------------ SDF
const K_ROUNDCONE = 0, K_ELLIPSOID = 1, K_PALM = 2, K_FOREARM = 3, K_SPHERE = 4;
const STRIDE = 20;

/** Smooth-min union of analytic primitives with per-primitive blend radius and AABB broad phase. */
class HandSDF {
  kind: number[] = [];
  k: number[] = [];
  prm: number[] = [];
  bmin: number[] = [];
  bmax: number[] = [];
  clipZ = Infinity;
  private n = 0;

  private push(kind: number, k: number, params: number[], min: number[], max: number[]) {
    this.kind.push(kind); this.k.push(k);
    for (let i = 0; i < STRIDE; i++) this.prm.push(params[i] ?? 0);
    this.bmin.push(...min); this.bmax.push(...max);
    this.n++;
  }

  /** Round cone from `a` (radius r1) to `b` (radius r2). */
  roundCone(a: ArrayLike<number>, b: ArrayLike<number>, r1: number, r2: number, k: number) {
    const ba = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const l2 = ba[0] * ba[0] + ba[1] * ba[1] + ba[2] * ba[2];
    const rr = r1 - r2, a2 = l2 - rr * rr, il2 = 1 / l2;
    const rm = Math.max(r1, r2);
    this.push(K_ROUNDCONE, k, [a[0], a[1], a[2], b[0], b[1], b[2], r1, r2, ba[0], ba[1], ba[2], l2, rr, a2, il2],
      [Math.min(a[0], b[0]) - rm, Math.min(a[1], b[1]) - rm, Math.min(a[2], b[2]) - rm],
      [Math.max(a[0], b[0]) + rm, Math.max(a[1], b[1]) + rm, Math.max(a[2], b[2]) + rm]);
  }

  sphere(c: ArrayLike<number>, r: number, k: number) {
    this.push(K_SPHERE, k, [c[0], c[1], c[2], r], [c[0] - r, c[1] - r, c[2] - r], [c[0] + r, c[1] + r, c[2] + r]);
  }

  /** Ellipsoid with radii (rx, ry, rz) in a local frame whose −z = `fwd` and +y ≈ `up`. */
  ellipsoid(c: ArrayLike<number>, radii: [number, number, number], k: number, fwd: ArrayLike<number> = [0, 0, -1], up: ArrayLike<number> = [0, 1, 0]) {
    const q = basisQuat(fwd, up);
    const m = mat4.fromQuat(mat4.create(), q);
    // rows of the inverse rotation (= columns of m) → local = R^T (p − c)
    const rmax = Math.max(...radii);
    this.push(K_ELLIPSOID, k, [c[0], c[1], c[2], radii[0], radii[1], radii[2], m[0], m[1], m[2], m[4], m[5], m[6], m[8], m[9], m[10]],
      [c[0] - rmax, c[1] - rmax, c[2] - rmax], [c[0] + rmax, c[1] + rmax, c[2] + rmax]);
  }

  palm(k: number) {
    const P = PALM;
    const w = Math.max(P.w0, P.w1), t = Math.max(P.t0, P.t1) + P.cup;
    this.push(K_PALM, k, [], [-w, -t, P.z1 - 0.01], [w, t, P.z0 + 0.01]);
  }

  forearm(k: number) {
    const zs = FOREARM_PROFILE;
    this.push(K_FOREARM, k, [], [-0.05, -0.045, zs[0][0] - 0.01], [0.05, 0.045, zs[zs.length - 1][0] + 0.01]);
  }

  bounds(): { min: Vec3; max: Vec3 } {
    const min = vec3.set(vec3.create(), Infinity, Infinity, Infinity), max = vec3.set(vec3.create(), -Infinity, -Infinity, -Infinity);
    for (let i = 0; i < this.n; i++) for (let a = 0; a < 3; a++) {
      min[a] = Math.min(min[a], this.bmin[i * 3 + a]); max[a] = Math.max(max[a], this.bmax[i * 3 + a]);
    }
    max[2] = Math.min(max[2], this.clipZ);
    return { min, max };
  }

  // spatial buckets: per bucket the primitives that can influence the smooth union within `margin` of the surface
  private bk = { o: [0, 0, 0], size: 0.02, nx: 0, ny: 0, nz: 0, start: new Int32Array(0), list: new Int32Array(0), margin: 0 };

  /** Build the bucket grid. `eval` is exact wherever |d| ≤ margin and a correct lower bound elsewhere. */
  finalize(margin: number) {
    const { min, max } = this.bounds();
    const B = this.bk;
    B.margin = margin;
    B.o = [min[0] - 0.005, min[1] - 0.005, min[2] - 0.005];
    B.nx = Math.ceil((max[0] - B.o[0] + 0.01) / B.size); B.ny = Math.ceil((max[1] - B.o[1] + 0.01) / B.size); B.nz = Math.ceil((max[2] - B.o[2] + 0.01) / B.size);
    const lists: number[][] = Array.from({ length: B.nx * B.ny * B.nz }, () => []);
    for (let i = 0; i < this.n; i++) {
      const e = margin + this.k[i];
      const lo = [0, 1, 2].map((a) => Math.max(0, Math.floor((this.bmin[i * 3 + a] - e - B.o[a]) / B.size)));
      const hi = [0, 1, 2].map((a) => Math.min([B.nx, B.ny, B.nz][a] - 1, Math.floor((this.bmax[i * 3 + a] + e - B.o[a]) / B.size)));
      for (let bx = lo[0]; bx <= hi[0]; bx++) for (let by = lo[1]; by <= hi[1]; by++) for (let bz = lo[2]; bz <= hi[2]; bz++) lists[(bx * B.ny + by) * B.nz + bz].push(i);
    }
    B.start = new Int32Array(lists.length + 1);
    let total = 0;
    lists.forEach((l, i) => { B.start[i] = total; total += l.length; });
    B.start[lists.length] = total;
    B.list = new Int32Array(total);
    lists.forEach((l, i) => B.list.set(l, B.start[i]));
  }

  /** Evaluation counter (profiling). */
  evals = 0;

  eval(x: number, y: number, z: number): number {
    this.evals++;
    let d = 1e9;
    const prm = this.prm, bmin = this.bmin, bmax = this.bmax, B = this.bk;
    let s0 = 0, s1 = this.n;
    let fromList = false;
    if (B.nx > 0) {
      const bx = Math.floor((x - B.o[0]) / B.size), by = Math.floor((y - B.o[1]) / B.size), bz = Math.floor((z - B.o[2]) / B.size);
      if (bx < 0 || by < 0 || bz < 0 || bx >= B.nx || by >= B.ny || bz >= B.nz) { s0 = s1 = 0; d = B.margin; }
      else { const c = (bx * B.ny + by) * B.nz + bz; s0 = B.start[c]; s1 = B.start[c + 1]; fromList = true; }
    }
    for (let li = s0; li < s1; li++) {
      const i = fromList ? B.list[li] : li;
      const ki = this.k[i];
      // broad phase: a primitive farther than d + k from the point cannot change the smooth union
      const o3 = i * 3;
      const ex = Math.max(bmin[o3] - x, 0, x - bmax[o3]), ey = Math.max(bmin[o3 + 1] - y, 0, y - bmax[o3 + 1]), ez = Math.max(bmin[o3 + 2] - z, 0, z - bmax[o3 + 2]);
      if (ex * ex + ey * ey + ez * ez >= (d + ki) * (d + ki)) continue;
      const o = i * STRIDE;
      let di: number;
      switch (this.kind[i]) {
        case K_ROUNDCONE: {
          const pax = x - prm[o], pay = y - prm[o + 1], paz = z - prm[o + 2];
          const bax = prm[o + 8], bay = prm[o + 9], baz = prm[o + 10];
          const l2 = prm[o + 11], rr = prm[o + 12], a2 = prm[o + 13], il2 = prm[o + 14];
          const r1 = prm[o + 6], r2 = prm[o + 7];
          const yy = pax * bax + pay * bay + paz * baz;
          const zz = yy - l2;
          const qx = pax * l2 - bax * yy, qy = pay * l2 - bay * yy, qz = paz * l2 - baz * yy;
          const x2 = qx * qx + qy * qy + qz * qz;
          const y2 = yy * yy * l2, z2 = zz * zz * l2;
          const kk = (rr < 0 ? -1 : 1) * rr * rr * x2;
          if ((zz < 0 ? -1 : 1) * a2 * z2 > kk) di = Math.sqrt(x2 + z2) * il2 - r2;
          else if ((yy < 0 ? -1 : 1) * a2 * y2 < kk) di = Math.sqrt(x2 + y2) * il2 - r1;
          else di = (Math.sqrt(x2 * a2 * il2) + yy * rr) * il2 - r1;
          break;
        }
        case K_ELLIPSOID: {
          const px = x - prm[o], py = y - prm[o + 1], pz = z - prm[o + 2];
          const lx = prm[o + 6] * px + prm[o + 7] * py + prm[o + 8] * pz;
          const ly = prm[o + 9] * px + prm[o + 10] * py + prm[o + 11] * pz;
          const lz = prm[o + 12] * px + prm[o + 13] * py + prm[o + 14] * pz;
          const rx = prm[o + 3], ry = prm[o + 4], rz = prm[o + 5];
          const ex = lx / rx, ey = ly / ry, ez = lz / rz;
          const k0 = Math.sqrt(ex * ex + ey * ey + ez * ez);
          const k1 = Math.sqrt((ex / rx) * (ex / rx) + (ey / ry) * (ey / ry) + (ez / rz) * (ez / rz));
          di = k1 > 1e-12 ? (k0 * (k0 - 1)) / k1 : -Math.min(rx, ry, rz);
          break;
        }
        case K_SPHERE: {
          const px = x - prm[o], py = y - prm[o + 1], pz = z - prm[o + 2];
          di = Math.sqrt(px * px + py * py + pz * pz) - prm[o + 3];
          break;
        }
        case K_PALM: {
          const P = PALM;
          const u = Math.min(1, Math.max(0, (P.z0 - z) / (P.z0 - P.z1)));
          const su = u * u * (3 - 2 * u);
          const a = P.w0 + (P.w1 - P.w0) * su, b = P.t0 + (P.t1 - P.t0) * u;
          const xn = x / a;
          const yy = y + P.cup * xn * xn; // transverse metacarpal arch (edges bend towards the palm)
          const qx = Math.abs(x) - (a - b), qy = Math.abs(yy);
          const mx = Math.max(qx, 0), my = Math.max(qy, 0);
          const dxy = Math.sqrt(mx * mx + my * my) - b + Math.min(Math.max(qx, qy - b), 0);
          const zc = (P.z0 + P.z1) / 2, hz = (P.z0 - P.z1) / 2;
          const dz = Math.abs(z - zc) - hz;
          const ax = Math.max(dxy, 0), az = Math.max(dz, 0);
          di = Math.sqrt(ax * ax + az * az) + Math.min(Math.max(dxy, dz), 0);
          break;
        }
        default: { // forearm: elliptical tube with a z profile
          const ti = Math.min(ARM_LUT_N - 1, Math.max(0, Math.round((z - ARM_LUT_Z0) / ARM_LUT_DZ)));
          const a = ARM_LUT_A[ti], b = ARM_LUT_B[ti];
          const rho = Math.sqrt(x * x + y * y);
          let dr: number;
          if (rho < 1e-9) dr = -Math.min(a, b);
          else { const cx = x / (rho * a), cy = y / (rho * b); dr = rho - 1 / Math.sqrt(cx * cx + cy * cy); }
          const z0 = FOREARM_PROFILE[0][0];
          const dz = z0 - z; // capped at the carpal end (inside the palm)
          const ar = Math.max(dr, 0), az = Math.max(dz, 0);
          di = Math.sqrt(ar * ar + az * az) + Math.min(Math.max(dr, dz), 0);
          break;
        }
      }
      // polynomial smooth min
      const h = Math.max(ki - Math.abs(d - di), 0) / ki;
      d = Math.min(d, di) - h * h * ki * 0.25;
    }
    if (fromList && d > B.margin) d = B.margin; // only a lower bound is known this far out
    if (this.clipZ < Infinity) d = Math.max(d, z - this.clipZ);
    return d;
  }

  /** Normalised central-difference gradient. */
  grad(x: number, y: number, z: number, out: Vec3, h = 0.0004): Vec3 {
    out[0] = this.eval(x + h, y, z) - this.eval(x - h, y, z);
    out[1] = this.eval(x, y + h, z) - this.eval(x, y - h, z);
    out[2] = this.eval(x, y, z + h) - this.eval(x, y, z - h);
    const l = Math.hypot(out[0], out[1], out[2]) || 1;
    out[0] /= l; out[1] /= l; out[2] /= l;
    return out;
  }

  /** Value + normalised forward-difference gradient (4 evaluations). */
  evalGrad(x: number, y: number, z: number, out: Vec3, h = 0.0003): number {
    const d = this.eval(x, y, z);
    out[0] = this.eval(x + h, y, z) - d;
    out[1] = this.eval(x, y + h, z) - d;
    out[2] = this.eval(x, y, z + h) - d;
    const l = Math.sqrt(out[0] * out[0] + out[1] * out[1] + out[2] * out[2]) || 1;
    out[0] /= l; out[1] /= l; out[2] /= l;
    return d;
  }
}

const ARM_LUT_Z0 = -0.25, ARM_LUT_DZ = 0.0005, ARM_LUT_N = 1200;
const ARM_LUT_A = new Float32Array(ARM_LUT_N), ARM_LUT_B = new Float32Array(ARM_LUT_N);
for (let i = 0; i < ARM_LUT_N; i++) { const [a, b] = armSection(ARM_LUT_Z0 + i * ARM_LUT_DZ); ARM_LUT_A[i] = a; ARM_LUT_B[i] = b; }

/** Half axes (x, y) of the arm cross-section at hand-space z (palm included, for UVs and the forearm SDF). */
function armSection(z: number): [number, number] {
  const zs = FOREARM_PROFILE;
  if (z <= zs[0][0]) return [zs[0][1], zs[0][2]];
  for (let i = 0; i < zs.length - 1; i++) {
    const A = zs[i], B = zs[i + 1];
    if (z <= B[0]) {
      const t = (z - A[0]) / (B[0] - A[0]), s = t * t * (3 - 2 * t);
      return [A[1] + (B[1] - A[1]) * s, A[2] + (B[2] - A[2]) * s];
    }
  }
  return [zs[zs.length - 1][1], zs[zs.length - 1][2]];
}

/** Nail plate placement on a distal phalanx (local frame of the distal bone: −z along the bone, +y dorsal). */
function nailPlacement(d: DigitAnatomy) {
  const L = d.len[2], r = d.r[2], rEnd = r * 0.72;
  const tilt = Math.atan2(r - rEnd, L - rEnd);
  const t = 0.56;
  const rAt = r + (rEnd - r) * Math.min(1, (L * t) / (L - rEnd));
  return { centre: [0, rAt - 0.0016, -L * t] as [number, number, number], radii: [r * 0.58, 0.0014, L * 0.30] as [number, number, number], tilt, r, L };
}

function buildSDF(frames: BoneFrame[], clipZ: number): HandSDF {
  const S = new HandSDF();
  S.clipZ = clipZ;
  const tq = (v: ArrayLike<number>, q: Quat) => vec3.transformQuat(vec3.create(), v, q);
  const addv = (a: ArrayLike<number>, b: ArrayLike<number>, s = 1) => vec3.set(vec3.create(), a[0] + b[0] * s, a[1] + b[1] * s, a[2] + b[2] * s);
  const mid = (a: ArrayLike<number>, b: ArrayLike<number>) => vec3.set(vec3.create(), (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);

  S.forearm(0.016);
  S.palm(0.009);
  // metacarpals from the carpal row to the knuckles (ridges on the back of the hand, heads = knuckle row)
  FINGERS.forEach((f, i) => { const F = frames[BONES.finger(i, 0)]; S.roundCone(CARPAL[i], addv(F.p, tq([0, 0, 1], F.q), 0.003), 0.0070, 0.0090, 0.008); });
  // thumb column: metacarpal buried in the thenar eminence (palmar side), first web to the index
  const T0 = frames[BONES.thumb(0)], tdir = tq([0, 0, -1], T0.q);
  const thumbMCP = addv(T0.p, tdir, THUMB.len[0]);
  const I0 = frames[BONES.finger(0, 0)];
  S.ellipsoid(addv(addv(T0.p, tdir, 0.024), [0.005, -0.008, -0.002]), [0.019, 0.010, 0.031], 0.012, tdir, [0, 1, 0]); // thenar
  {
    const indexSide = addv(I0.p, [0.0, -0.002, 0.014]);
    const line = vec3.normalize(vec3.create(), vec3.sub(vec3.create(), indexSide, thumbMCP));
    const half = vec3.distance(indexSide, thumbMCP) / 2;
    const webN = vec3.cross(vec3.create(), tdir, line);
    S.ellipsoid(addv(mid(thumbMCP, indexSide), [0, -0.002, 0.004]), [half + 0.004, 0.0040, 0.014], 0.009, tdir, webN); // first web
  }
  S.ellipsoid([0.026, -0.007, -0.048], [0.012, 0.0095, 0.034], 0.012, [0.10, 0, -1]);                                 // hypothenar
  const mcpLine = vec3.normalize(vec3.create(), vec3.sub(vec3.create(), frames[BONES.finger(3, 0)].p, I0.p));
  S.ellipsoid([0.0, -0.0075, -0.079], [0.016, 0.0065, 0.036], 0.010, mcpLine);                                         // distal palmar pad
  // ulnar styloid at the wrist
  S.sphere([0.026, 0.006, 0.012], 0.006, 0.010);
  // extensor tendons: shallow ridges from the wrist to each knuckle on the back of the hand
  FINGERS.forEach((f, i) => {
    const F = frames[BONES.finger(i, 0)];
    const x0 = CARPAL[i][0] * 1.2;
    const y0 = 0.0125 - PALM.cup * (x0 / 0.033) ** 2;
    S.roundCone([x0, y0 - 0.0005, -0.038], addv(F.p, [0, f.r[0] * 0.9, 0.010]), 0.0016, 0.0019, 0.007);
  });

  const digit = (d: DigitAnatomy, bone: (j: number) => number, kBase: number) => {
    for (let j = 0; j < 3; j++) {
      const F = frames[bone(j)];
      const axis = tq([0, 0, -1], F.q), up = tq([0, 1, 0], F.q);
      const r = d.r[j];
      if (j < 2) {
        const end = addv(F.p, axis, d.len[j]);
        S.roundCone(F.p, end, r * 0.95, d.r[j + 1] * 0.95, j === 0 ? kBase : 0.005);
        // slightly oval cross-section (wider than deep) and a fleshy, flatter palmar pad
        S.ellipsoid(addv(F.p, axis, d.len[j] * 0.5), [r * 1.0, r * 0.8, d.len[j] * 0.46], 0.004, axis, up);
        S.ellipsoid(addv(addv(F.p, axis, d.len[j] * 0.5), up, -r * 0.3), [r * 0.86, r * 0.8, d.len[j] * 0.38], 0.004, axis, up);
        // joint: subtly wider, dorsally offset
        S.sphere(addv(end, up, 0.0005), d.r[j + 1] * 1.03, 0.008);
      } else {
        const rEnd = r * 0.72;
        S.roundCone(F.p, addv(addv(F.p, axis, d.len[j] - rEnd), up, -r * 0.12), r * 0.97, rEnd, 0.005);
        // pulp on the palmar side (the fingertip is fullest below the axis) and the nail plate on the dorsal side
        S.ellipsoid(addv(addv(F.p, axis, d.len[j] * 0.5), up, -r * 0.25), [r * 0.92, r * 0.9, d.len[j] * 0.42], 0.004, axis, up);
        const n = nailPlacement(d);
        const tiltQ = quat.multiply(quat.create(), F.q, quat.fromEuler(quat.create(), n.tilt, 0, 0));
        S.ellipsoid(vec3.add(vec3.create(), F.p, tq(n.centre, F.q)), n.radii, 0.0015, tq([0, 0, -1], tiltQ), tq([0, 1, 0], tiltQ));
      }
      // MCP knuckle (prominent on the back of the hand)
      if (j === 0) S.sphere(addv(F.p, up, 0.0015), r * 1.10, 0.007);
    }
  };
  FINGERS.forEach((f, i) => digit(f, (j) => BONES.finger(i, j), 0.0065));
  digit(THUMB, (j) => BONES.thumb(j), 0.012);
  // webbing between the fingers: thin skin folds ~1 cm up the proximal phalanges
  for (let i = 0; i < 3; i++) {
    const A = frames[BONES.finger(i, 0)], B = frames[BONES.finger(i + 1, 0)];
    const ax = tq([0, 0, -1], A.q), bx = tq([0, 0, -1], B.q);
    const a = addv(A.p, ax, 0.006), b = addv(B.p, bx, 0.006);
    const fwd = vec3.normalize(vec3.create(), vec3.add(vec3.create(), ax, bx));
    S.ellipsoid(addv(mid(a, b), [0, -0.0015, 0]), [vec3.distance(a, b) / 2 + 0.002, 0.0055, 0.007], 0.008, fwd, [0, 1, 0]);
  }
  return S;
}

// --------------------------------------------------------------------------------------- surface nets
interface NetMesh { pos: Float32Array; tris: Uint32Array }

function surfaceNets(S: HandSDF, cell: number): NetMesh {
  const { min, max } = S.bounds();
  const ox = min[0] - cell, oy = min[1] - cell, oz = min[2] - cell;
  const nx = Math.ceil((max[0] - min[0]) / cell) + 3, ny = Math.ceil((max[1] - min[1]) / cell) + 3, nz = Math.ceil((max[2] - min[2]) / cell) + 3;
  const field = new Float32Array(nx * ny * nz);
  const idx = (i: number, j: number, k: number) => (i * ny + j) * nz + k;
  // sparse sampling: coarse blocks of BLK³ cells; blocks whose corner distances all exceed the block
  // diagonal cannot contain the surface and are filled by interpolation (the SDF is ~1-Lipschitz)
  const BLK = 2, diag = BLK * cell * Math.sqrt(3) * 1.05 + cell;
  const bnx = Math.ceil((nx - 1) / BLK), bny = Math.ceil((ny - 1) / BLK), bnz = Math.ceil((nz - 1) / BLK);
  const coarse = new Float32Array((bnx + 1) * (bny + 1) * (bnz + 1));
  const cidx = (i: number, j: number, k: number) => (i * (bny + 1) + j) * (bnz + 1) + k;
  for (let i = 0; i <= bnx; i++) for (let j = 0; j <= bny; j++) for (let k = 0; k <= bnz; k++) {
    coarse[cidx(i, j, k)] = S.eval(ox + Math.min(i * BLK, nx - 1) * cell, oy + Math.min(j * BLK, ny - 1) * cell, oz + Math.min(k * BLK, nz - 1) * cell);
  }
  const cc = new Float32Array(8);
  for (let bi = 0; bi < bnx; bi++) for (let bj = 0; bj < bny; bj++) for (let bk = 0; bk < bnz; bk++) {
    let near = false;
    for (let c = 0; c < 8; c++) { cc[c] = coarse[cidx(bi + (c & 1), bj + ((c >> 1) & 1), bk + (c >> 2))]; if (Math.abs(cc[c]) < diag) near = true; }
    const i0 = bi * BLK, j0 = bj * BLK, k0 = bk * BLK;
    const i1 = Math.min(i0 + BLK, nx - 1), j1 = Math.min(j0 + BLK, ny - 1), k1 = Math.min(k0 + BLK, nz - 1);
    const ie = i1 === nx - 1 ? i1 : i1 - 1, je = j1 === ny - 1 ? j1 : j1 - 1, ke = k1 === nz - 1 ? k1 : k1 - 1;
    for (let i = i0; i <= ie; i++) for (let j = j0; j <= je; j++) {
      const x = ox + i * cell, y = oy + j * cell;
      const row = (i * ny + j) * nz;
      if (near) { for (let k = k0; k <= ke; k++) field[row + k] = S.eval(x, y, oz + k * cell); }
      else {
        const fx = (i - i0) / (i1 - i0 || 1), fy = (j - j0) / (j1 - j0 || 1);
        const c00 = cc[0] + (cc[1] - cc[0]) * fx, c10 = cc[2] + (cc[3] - cc[2]) * fx, c01 = cc[4] + (cc[5] - cc[4]) * fx, c11 = cc[6] + (cc[7] - cc[6]) * fx;
        const c0 = c00 + (c10 - c00) * fy, c1 = c01 + (c11 - c01) * fy;
        for (let k = k0; k <= ke; k++) field[row + k] = c0 + (c1 - c0) * ((k - k0) / (k1 - k0 || 1));
      }
    }
  }
  const cx = nx - 1, cy = ny - 1, cz = nz - 1;
  const cellVert = new Int32Array(cx * cy * cz).fill(-1);
  const pos: number[] = [];
  let nv = 0;
  // edge table: corner index bits (x,y,z) → the 12 cube edges
  const EDGES: [number, number][] = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
  const cv = new Float32Array(8);
  for (let i = 0; i < cx; i++) for (let j = 0; j < cy; j++) for (let k = 0; k < cz; k++) {
    let mask = 0;
    for (let c = 0; c < 8; c++) {
      const v = field[idx(i + (c & 1), j + ((c >> 1) & 1), k + (c >> 2))];
      cv[c] = v;
      if (v <= 0) mask |= 1 << c;
    }
    if (mask === 0 || mask === 255) continue;
    let sx = 0, sy = 0, sz = 0, n = 0;
    for (const [e0, e1] of EDGES) {
      const in0 = (mask >> e0) & 1, in1 = (mask >> e1) & 1;
      if (in0 === in1) continue;
      const v0 = cv[e0], v1 = cv[e1];
      const t = v0 / (v0 - v1);
      sx += (e0 & 1) + ((e1 & 1) - (e0 & 1)) * t;
      sy += ((e0 >> 1) & 1) + (((e1 >> 1) & 1) - ((e0 >> 1) & 1)) * t;
      sz += (e0 >> 2) + ((e1 >> 2) - (e0 >> 2)) * t;
      n++;
    }
    pos.push(ox + (i + sx / n) * cell, oy + (j + sy / n) * cell, oz + (k + sz / n) * cell);
    cellVert[(i * cy + j) * cz + k] = nv++;
  }
  const tris: number[] = [];
  const cvi = (i: number, j: number, k: number) => cellVert[(i * cy + j) * cz + k];
  const quad = (a: number, b: number, c: number, d: number, flip: boolean) => {
    if (a < 0 || b < 0 || c < 0 || d < 0) return;
    if (flip) tris.push(a, d, c, a, c, b); else tris.push(a, b, c, a, c, d);
  };
  for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) for (let k = 0; k < nz; k++) {
    const f0 = field[idx(i, j, k)] <= 0;
    if (i < cx && j > 0 && k > 0 && j < cy && k < cz) {
      const f1 = field[idx(i + 1, j, k)] <= 0;
      if (f0 !== f1) quad(cvi(i, j - 1, k - 1), cvi(i, j, k - 1), cvi(i, j, k), cvi(i, j - 1, k), f0);
    }
    if (j < cy && i > 0 && k > 0 && i < cx && k < cz) {
      const f1 = field[idx(i, j + 1, k)] <= 0;
      if (f0 !== f1) quad(cvi(i - 1, j, k - 1), cvi(i, j, k - 1), cvi(i, j, k), cvi(i - 1, j, k), !f0);
    }
    if (k < cz && i > 0 && j > 0 && i < cx && j < cy) {
      const f1 = field[idx(i, j, k + 1)] <= 0;
      if (f0 !== f1) quad(cvi(i - 1, j - 1, k), cvi(i, j - 1, k), cvi(i, j, k), cvi(i - 1, j, k), f0);
    }
  }
  return { pos: Float32Array.from(pos), tris: Uint32Array.from(tris) };
}

/** Newton re-projection onto the zero level set, then tangential Laplacian relaxation. */
function relax(S: HandSDF, m: NetMesh, iterations: number, normals: Float32Array) {
  const n = m.pos.length / 3, p = m.pos, g = vec3.create();
  const project = (i: number, steps: number) => {
    for (let s = 0; s < steps; s++) {
      const x = p[i * 3], y = p[i * 3 + 1], z = p[i * 3 + 2];
      const d = S.evalGrad(x, y, z, g);
      const step = Math.max(-0.0015, Math.min(0.0015, d));
      p[i * 3] -= g[0] * step; p[i * 3 + 1] -= g[1] * step; p[i * 3 + 2] -= g[2] * step;
    }
  };
  for (let i = 0; i < n; i++) project(i, 1);
  // adjacency (unique neighbours per vertex)
  const nb: number[][] = Array.from({ length: n }, () => []);
  const t = m.tris;
  for (let k = 0; k < t.length; k += 3) {
    const a = t[k], b = t[k + 1], c = t[k + 2];
    if (!nb[a].includes(b)) nb[a].push(b); if (!nb[a].includes(c)) nb[a].push(c);
    if (!nb[b].includes(a)) nb[b].push(a); if (!nb[b].includes(c)) nb[b].push(c);
    if (!nb[c].includes(a)) nb[c].push(a); if (!nb[c].includes(b)) nb[c].push(b);
  }
  const next = new Float32Array(p.length);
  for (let it = 0; it < iterations; it++) {
    for (let i = 0; i < n; i++) {
      const L = nb[i];
      if (!L.length) { next[i * 3] = p[i * 3]; next[i * 3 + 1] = p[i * 3 + 1]; next[i * 3 + 2] = p[i * 3 + 2]; continue; }
      let mx = 0, my = 0, mz = 0;
      for (const j of L) { mx += p[j * 3]; my += p[j * 3 + 1]; mz += p[j * 3 + 2]; }
      mx = mx / L.length - p[i * 3]; my = my / L.length - p[i * 3 + 1]; mz = mz / L.length - p[i * 3 + 2];
      // tangential relaxation plus a Newton step back onto the surface, from one value + gradient
      const d = S.evalGrad(p[i * 3], p[i * 3 + 1], p[i * 3 + 2], g);
      const dn = mx * g[0] + my * g[1] + mz * g[2] + Math.max(-0.0015, Math.min(0.0015, d));
      next[i * 3] = p[i * 3] + 0.6 * mx - g[0] * dn;
      next[i * 3 + 1] = p[i * 3 + 1] + 0.6 * my - g[1] * dn;
      next[i * 3 + 2] = p[i * 3 + 2] + 0.6 * mz - g[2] * dn;
    }
    p.set(next);
  }
  for (let i = 0; i < n; i++) {
    S.grad(p[i * 3], p[i * 3 + 1], p[i * 3 + 2], g);
    normals[i * 3] = g[0]; normals[i * 3 + 1] = g[1]; normals[i * 3 + 2] = g[2];
  }
  // consistent winding: triangle normals must agree with the SDF gradient
  for (let k = 0; k < t.length; k += 3) {
    const a = t[k] * 3, b = t[k + 1] * 3, c = t[k + 2] * 3;
    const e1x = p[b] - p[a], e1y = p[b + 1] - p[a + 1], e1z = p[b + 2] - p[a + 2];
    const e2x = p[c] - p[a], e2y = p[c + 1] - p[a + 1], e2z = p[c + 2] - p[a + 2];
    const nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x;
    const gx = normals[a] + normals[b] + normals[c], gy = normals[a + 1] + normals[b + 1] + normals[c + 1], gz = normals[a + 2] + normals[b + 2] + normals[c + 2];
    if (nx * gx + ny * gy + nz * gz < 0) { const tmp = t[k + 1]; t[k + 1] = t[k + 2]; t[k + 2] = tmp; }
  }
}

// ------------------------------------------------------------------------------------------- skinning
interface Chain {
  /** Bone indices along the chain (parent → tip). */
  bones: number[];
  /** Segments (start, end, radius) used for the chain membership distance. */
  segs: { a: Vec3; b: Vec3; r: number }[];
  /** Gates between consecutive bones: joint position, blend axis, half width. gates[j] opens bones[j]. */
  gates: { p: Vec3; axis: Vec3; h: number; linearTo?: number }[];
  island: number;
}

/** Skin weight tuning. */
export const SKIN_WEIGHTS = {
  /** Sharpness of the per-chain membership (distance to the chain's bones / radius)^-n. */
  membershipPower: 7,
  /** Blend half widths (m) along the chain axis at the MCP / PIP / DIP joints, the thumb CMC / MCP / IP and the wrist. */
  fingerGates: [0.008, 0.005, 0.0045],
  thumbGates: [0.024, 0.0065, 0.005],
  wristGate: 0.012,
};

function segDist(p: ArrayLike<number>, a: Vec3, b: Vec3): number {
  const abx = b[0] - a[0], aby = b[1] - a[1], abz = b[2] - a[2];
  const apx = p[0] - a[0], apy = p[1] - a[1], apz = p[2] - a[2];
  const l2 = abx * abx + aby * aby + abz * abz;
  const t = l2 > 0 ? Math.min(1, Math.max(0, (apx * abx + apy * aby + apz * abz) / l2)) : 0;
  return Math.hypot(apx - abx * t, apy - aby * t, apz - abz * t);
}
const smooth = (e0: number, e1: number, x: number) => { const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };

function buildChains(frames: BoneFrame[], foreLen: number): Chain[] {
  const tq = (v: ArrayLike<number>, q: Quat) => vec3.transformQuat(vec3.create(), v, q);
  const chains: Chain[] = [];
  const digitChain = (d: DigitAnatomy, bone: (j: number) => number, gates: number[], island: number) => {
    const c: Chain = { bones: [], segs: [], gates: [], island };
    let prevAxis: Vec3 | null = null;
    for (let j = 0; j < 3; j++) {
      const F = frames[bone(j)];
      const axis = tq([0, 0, -1], F.q);
      c.bones.push(bone(j));
      c.segs.push({ a: vec3.clone(F.p), b: vec3.scaleAndAdd(vec3.create(), F.p, axis, d.len[j]), r: d.r[j] });
      const blendAxis = prevAxis ? vec3.normalize(vec3.create(), vec3.add(vec3.create(), prevAxis, axis)) : vec3.clone(axis);
      // the first gate sits a little distal of the joint: the skin over the knuckle and the webbing stays
      // anchored to the palm and stretches, instead of swinging rigidly with the finger
      c.gates.push({ p: j === 0 ? vec3.scaleAndAdd(vec3.create(), F.p, axis, gates[j] * 0.5) : vec3.clone(F.p), axis: blendAxis, h: gates[j] });
      prevAxis = axis;
    }
    chains.push(c);
  };
  FINGERS.forEach((f, i) => digitChain(f, (j) => BONES.finger(i, j), SKIN_WEIGHTS.fingerGates, 1 + i));
  digitChain(THUMB, (j) => BONES.thumb(j), SKIN_WEIGHTS.thumbGates, 5);
  // forearm: wrist gate, then a linear ramp to the elbow bone (twist distribution)
  chains.push({
    bones: [BONES.foreA, BONES.foreB],
    segs: [{ a: vec3.create(0, 0, -0.02), b: vec3.create(0, 0, foreLen), r: 0.03 }],
    gates: [{ p: vec3.create(0, 0, 0.006), axis: vec3.create(0, 0, 1), h: SKIN_WEIGHTS.wristGate }, { p: vec3.create(0, 0, 0.03), axis: vec3.create(0, 0, 1), h: 0, linearTo: foreLen }],
    island: 0,
  });
  // root "chain": the palm itself (metacarpals + carpus); no gates → pure root weight
  const root: Chain = { bones: [], segs: [], gates: [], island: 0 };
  FINGERS.forEach((f, i) => root.segs.push({ a: vec3.clone(CARPAL[i]), b: vec3.clone(frames[BONES.finger(i, 0)].p), r: 0.0095 }));
  root.segs.push({ a: vec3.create(0, 0, -0.035), b: vec3.create(0, 0, -0.005), r: 0.02 });
  chains.push(root);
  return chains;
}

/** Per-vertex chain memberships (normalised) and the blended bone weights. */
function skinVertex(p: ArrayLike<number>, chains: Chain[], outW: Float64Array, m: Float64Array): void {
  let sum = 0;
  for (let ci = 0; ci < chains.length; ci++) {
    const c = chains[ci];
    let best = Infinity;
    for (const s of c.segs) best = Math.min(best, segDist(p, s.a, s.b) / s.r);
    const v = Math.pow(best + 0.05, -SKIN_WEIGHTS.membershipPower);
    m[ci] = v; sum += v;
  }
  outW.fill(0);
  for (let ci = 0; ci < chains.length; ci++) {
    const c = chains[ci];
    const mu = m[ci] / sum;
    m[ci] = mu;
    if (mu < 1e-5) continue;
    let open = 1; // product of the gates passed so far
    let rootW = 1;
    for (let j = 0; j < c.bones.length; j++) {
      const g = c.gates[j];
      const t = (p[0] - g.p[0]) * g.axis[0] + (p[1] - g.p[1]) * g.axis[1] + (p[2] - g.p[2]) * g.axis[2];
      const gate = g.linearTo !== undefined ? Math.min(1, Math.max(0, t / (g.linearTo - g.p[2]))) : smooth(-g.h, g.h, t);
      if (j === 0) rootW = 1 - gate;
      if (j > 0) outW[c.bones[j - 1]] += mu * open * (1 - gate);
      open *= gate;
    }
    if (c.bones.length) outW[c.bones[c.bones.length - 1]] += mu * open;
    outW[BONES.root] += mu * (c.bones.length ? rootW : 1);
  }
}

// ------------------------------------------------------------------------------------------------ UVs
/** Arc length of the ellipse (a cos φ, b sin φ) from φ = 0. */
function ellipseArc(a: number, b: number, phi: number): number {
  const n = 24, dphi = phi / n;
  let s = 0;
  for (let i = 0; i < n; i++) { const t = (i + 0.5) * dphi; s += Math.hypot(a * Math.sin(t), b * Math.cos(t)); }
  return s * dphi;
}

interface Island { uv(p: ArrayLike<number>): [number, number, number] } // u, v, u period

function buildIslands(frames: BoneFrame[]): Island[] {
  const islands: Island[] = [];
  // 0: palm + forearm — arc length around the arm axis, v along z; seam on the ulnar (+x) edge
  islands.push({
    uv(p) {
      const [a, b] = armSection(p[2]);
      const phi = Math.atan2(p[1] / b, -p[0] / a);
      const per = ellipseArc(a, b, Math.PI * 2);
      return [ellipseArc(a, b, phi), p[2], per];
    },
  });
  const digitIsland = (d: DigitAnatomy, bone: (j: number) => number): Island => {
    const segs = [0, 1, 2].map((j) => {
      const F = frames[bone(j)];
      return { p: F.p, q: quat.invert(quat.create(), F.q), len: d.len[j] };
    });
    const rMean = (d.r[0] + d.r[1] + d.r[2]) / 3;
    const per = Math.PI * 2 * rMean;
    const tmp = vec3.create();
    return {
      uv(p) {
        // closest phalanx: local z in [−len, 0] (clamped), pick the one with the smallest lateral distance
        let bestD = Infinity, bu = 0, bv = 0, cum = 0;
        for (let j = 0; j < 3; j++) {
          const s = segs[j];
          vec3.transformQuat(tmp, vec3.set(tmp, p[0] - s.p[0], p[1] - s.p[1], p[2] - s.p[2]), s.q);
          const lz = Math.min(0, Math.max(-s.len, tmp[2]));
          const dd = Math.hypot(tmp[0], tmp[1], tmp[2] - lz);
          if (dd < bestD) { bestD = dd; bu = Math.atan2(tmp[1], -tmp[0]) * rMean; bv = cum - tmp[2]; }
          cum += s.len;
        }
        return [bu, bv, per];
      },
    };
  };
  FINGERS.forEach((f, i) => islands.push(digitIsland(f, (j) => BONES.finger(i, j))));
  islands.push(digitIsland(THUMB, (j) => BONES.thumb(j)));
  return islands;
}

// ------------------------------------------------------------------------------------------- builder
export interface HandMeshOptions {
  /** Sampling cell size (m). 0.0022 ≈ 30k triangles. */
  cell?: number;
  /** Forearm length wrist → elbow (bind pose of the elbow-end bone). */
  forearmLength?: number;
  /** The skinned mesh ends this far up the forearm (the rest is the sleeve). */
  skinnedForearm?: number;
  /** Tangential relaxation passes. */
  smoothIterations?: number;
}

export interface HandMeshResult {
  /** Skinned right-hand geometry in hand space (joints/weights set). */
  geometry: Geometry;
  /** Skinned nail plates (weights to the distal bones), same bone indices. */
  nails: Geometry;
  /** Inverse bind matrices per bone (hand space), right hand. */
  bindInverse: Mat4[];
  /** Bind-pose bone frames (right hand). */
  bindFrames: BoneFrame[];
  forearmLength: number;
  stats: { vertices: number; triangles: number; cell: number; ms: number; gridSamples: number; phases: { grid: number; relax: number; skin: number }; sdfEvals: number };
}

export function bindInverses(side: 1 | -1, forearmLength: number): Mat4[] {
  const frames = handBoneFrames(BIND_FINGERS, BIND_THUMB, side);
  const inv: Mat4[] = [];
  for (let b = 0; b < BONES.count; b++) {
    const m = mat4.create();
    if (b === BONES.foreA) { /* identity */ }
    else if (b === BONES.foreB) mat4.fromTranslation(m, [0, 0, forearmLength]);
    else mat4.fromRotationTranslation(m, frames[b].q, frames[b].p);
    inv.push(mat4.invert(mat4.create(), m)!);
  }
  return inv;
}

const cache = new Map<string, HandMeshResult>();

/** Build (or fetch from the cache) the right-hand skinned mesh. */
export function buildHandMesh(o: HandMeshOptions = {}): HandMeshResult {
  const cell = o.cell ?? 0.0022, foreLen = o.forearmLength ?? 0.27, clipZ = o.skinnedForearm ?? 0.12, iters = o.smoothIterations ?? 2;
  const key = JSON.stringify([cell, foreLen, clipZ, iters]);
  const hit = cache.get(key);
  if (hit) return hit;
  const t0 = performance.now();
  const frames = handBoneFrames(BIND_FINGERS, BIND_THUMB, 1);
  const S = buildSDF(frames, clipZ);
  S.finalize(cell * 10);
  const net = surfaceNets(S, cell);
  const tGrid = performance.now();
  const nv = net.pos.length / 3;
  const normals = new Float32Array(nv * 3);
  relax(S, net, iters, normals);
  const tRelax = performance.now();
  const { min, max } = S.bounds();
  const gridSamples = Math.ceil((max[0] - min[0]) / cell + 3) * Math.ceil((max[1] - min[1]) / cell + 3) * Math.ceil((max[2] - min[2]) / cell + 3);

  // skin weights + UV island per vertex
  const chains = buildChains(frames, foreLen);
  const islands = buildIslands(frames);
  const joints = new Uint16Array(nv * 4), weights = new Float32Array(nv * 4);
  const vIsland = new Uint8Array(nv);
  const wAll = new Float64Array(BONES.count), mAll = new Float64Array(chains.length);
  const pv = vec3.create();
  for (let i = 0; i < nv; i++) {
    vec3.set(pv, net.pos[i * 3], net.pos[i * 3 + 1], net.pos[i * 3 + 2]);
    skinVertex(pv, chains, wAll, mAll);
    let bi = 0; for (let c = 1; c < mAll.length; c++) if (mAll[c] > mAll[bi]) bi = c;
    vIsland[i] = chains[bi].island;
    // four largest influences, renormalised
    let s = 0;
    for (let k = 0; k < 4; k++) {
      let best = -1, bw = 1e-7;
      for (let b = 0; b < BONES.count; b++) if (wAll[b] > bw) { bw = wAll[b]; best = b; }
      if (best < 0) { joints[i * 4 + k] = 0; weights[i * 4 + k] = 0; continue; }
      joints[i * 4 + k] = best; weights[i * 4 + k] = bw; s += bw; wAll[best] = 0;
    }
    for (let k = 0; k < 4; k++) weights[i * 4 + k] /= s || 1;
  }

  // UVs: per triangle island (majority), seam splitting by duplicating vertices
  const outPos: number[] = [], outNrm: number[] = [], outUV: number[] = [], outJ: number[] = [], outW: number[] = [], outIx: number[] = [];
  const dup = new Map<number, number>();
  const uvCache = new Map<number, [number, number, number]>();
  const uvOf = (v: number, isl: number) => {
    const k = v * 8 + isl;
    let r = uvCache.get(k);
    if (!r) { r = islands[isl].uv(net.pos.subarray(v * 3, v * 3 + 3)); uvCache.set(k, r); }
    return r;
  };
  const emit = (v: number, isl: number, u: number, vv: number, wrapped: boolean) => {
    const k = (v * 8 + isl) * 2 + (wrapped ? 1 : 0);
    let id = dup.get(k);
    if (id === undefined) {
      id = outPos.length / 3;
      dup.set(k, id);
      outPos.push(net.pos[v * 3], net.pos[v * 3 + 1], net.pos[v * 3 + 2]);
      outNrm.push(normals[v * 3], normals[v * 3 + 1], normals[v * 3 + 2]);
      outUV.push(u, vv);
      for (let k2 = 0; k2 < 4; k2++) { outJ.push(joints[v * 4 + k2]); outW.push(weights[v * 4 + k2]); }
    }
    return id;
  };
  const T = net.tris;
  for (let k = 0; k < T.length; k += 3) {
    const a = T[k], b = T[k + 1], c = T[k + 2];
    const ia = vIsland[a], ib = vIsland[b], ic = vIsland[c];
    const isl = ia === ib || ia === ic ? ia : ib === ic ? ib : ia;
    const ua = uvOf(a, isl), ub = uvOf(b, isl), uc = uvOf(c, isl);
    const per = ua[2];
    const u = [ua[0], ub[0], uc[0]], wrap = [false, false, false];
    // unwrap around the seam: shift the low side up by one period
    const lo = Math.min(u[0], u[1], u[2]), hi = Math.max(u[0], u[1], u[2]);
    if (hi - lo > per / 2) for (let i = 0; i < 3; i++) if (u[i] - lo <= per / 2) { u[i] += per; wrap[i] = true; }
    outIx.push(emit(a, isl, u[0], ua[1], wrap[0]), emit(b, isl, u[1], ub[1], wrap[1]), emit(c, isl, u[2], uc[1], wrap[2]));
  }
  const geometry = new Geometry(outPos, outNrm, outUV, outIx);
  geometry.joints = Uint16Array.from(outJ);
  geometry.weights = Float32Array.from(outW);
  geometry.computeTangents();

  const nails = buildNails(frames);
  const result: HandMeshResult = {
    geometry, nails, bindInverse: bindInverses(1, foreLen), bindFrames: frames, forearmLength: foreLen,
    stats: { vertices: geometry.vertexCount, triangles: geometry.triangleCount, cell, ms: performance.now() - t0, gridSamples, phases: { grid: tGrid - t0, relax: tRelax - tGrid, skin: performance.now() - tRelax }, sdfEvals: S.evals },
  };
  cache.set(key, result);
  return result;
}

function buildNails(frames: BoneFrame[]): Geometry {
  const parts: Geometry[] = [];
  const joints: number[] = [], weights: number[] = [];
  const one = (d: DigitAnatomy, bone: number) => {
    const n = nailPlacement(d);
    const F = frames[bone];
    const g = sphere(1, 20, 12).scale(n.radii[0] * 0.95, n.radii[1] * 0.9, n.radii[2] * 0.95).rotateX(n.tilt).translate(n.centre[0], n.centre[1] + 0.0005, n.centre[2]);
    g.transform(mat4.fromRotationTranslation(mat4.create(), F.q, F.p));
    g.scaleUVs(0.004);
    for (let i = 0; i < g.vertexCount; i++) { joints.push(bone, 0, 0, 0); weights.push(1, 0, 0, 0); }
    parts.push(g);
  };
  FINGERS.forEach((f, i) => one(f, BONES.finger(i, 2)));
  one(THUMB, BONES.thumb(2));
  const g = Geometry.merge(parts);
  g.joints = Uint16Array.from(joints);
  g.weights = Float32Array.from(weights);
  return g.computeTangents();
}

/** Mirror a skinned geometry in x (left hand). Bone indices are unchanged; the FK mirrors with `side`. */
export function mirrorX(g: Geometry): Geometry {
  const out = g.clone();
  for (let i = 0; i < out.positions.length; i += 3) { out.positions[i] = -out.positions[i]; out.normals[i] = -out.normals[i]; }
  out.flipWinding();
  out.tangents = null;
  return out.computeTangents();
}

/** Anatomy facts for fitting grip poses (hand space, right hand, fingers straight). */
export function anatomyReport() {
  const straight: FingerPose[] = FINGERS.map(() => ({ curl: [0, 0, 0], spread: 0 }));
  const fr = handBoneFrames(straight, BIND_THUMB, 1);
  const tip = (i: number) => { const F = fr[BONES.finger(i, 2)]; return [F.p[0], F.p[1], F.p[2] - FINGERS[i].len[2]]; };
  const indexPad = (() => { const F = fr[BONES.finger(0, 2)]; const n = nailPlacement(FINGERS[0]); return [F.p[0], F.p[1] - n.r * 0.95, F.p[2] - FINGERS[0].len[2] * 0.55]; })();
  return { fingers: FINGERS, thumb: THUMB, palm: PALM, bind: { fingers: BIND_FINGERS, thumb: BIND_THUMB }, fingertipsStraight: [0, 1, 2, 3].map(tip), indexPadStraight: indexPad, wristSection: armSection(0) };
}
