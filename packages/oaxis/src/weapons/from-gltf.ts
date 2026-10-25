// Scanned / authored weapon models → FirearmModel (+ grips).
//
// Name the nodes (or meshes/materials) in your DCC tool, or pass a mapping:
//   slide / bolt / carrier      → reciprocating part     magazine / mag      → drops on reload
//   trigger                     → moves when pulled       selector / safety   → fire-selector lever
//   charging_handle / charge    → non-reciprocating charging handle (rifles)
//   muzzle, ejection_port, rear_sight, front_sight      → empties (sockets) or tiny marker meshes
// Orientation: the engine wants +x right, +y up, −z towards the muzzle, metres, bore axis on x = y = 0.
// `forward`/`up` describe the asset's axes, `scale` its units; or give `lengthM` and the model is scaled to
// that overall length; or `autoOrient: true` and the frame is found from the geometry (principal axes, the
// grip hanging down, the thin muzzle end) and the scale from the `kind` (pistol ≈ 0.19 m, carbine ≈ 0.85 m).
//
// Whatever the names don't give is detected from the geometry (and listed in `warnings`):
//   * bore = centre of the barrel cross-section at the muzzle; muzzle = foremost point on the bore line
//   * sights = topmost points of the front / rear quarter; ejection port = right side above the chamber
//   * parts: the long mesh above the bore = slide (pistol), the tall mesh under the bore = magazine, the small
//     mesh in the trigger guard = trigger, the flat mesh on the rear of the receiver = charging handle (rifle)
//   * magAxis from the magazine's long axis, magBox from its bounds; `charge` grip from the charging handle
//   * grips: the pistol grip is the column hanging below the bore behind the trigger; the firing hand wraps it
//     (wrist beside its back strap, fingers forward tilted down by the grip rake), the support hand goes on
//     the handguard (rifle) or over the firing hand (pistol). Finger curls come from `fitWeaponGrips`.
// Everything auto-detected can be overridden from the mapping (assets/weapons/<slot>.mapping.json).

import { Mesh, RenderObject, Renderer, mat4, Mat4, vec3, Vec3, lathe, FirearmModel, casingGeometry } from '@fondaine/gl';
import type { GLTFInstance } from '../gltf/instantiate';
import type { WeaponGrips, HandPose } from '../viewmodel/hands';

type Axis = '+x' | '-x' | '+y' | '-y' | '+z' | '-z';
type V3 = [number, number, number];
export type WeaponKind = 'pistol' | 'carbine' | 'rifle';

export interface WeaponMapping {
  /** Asset axis pointing towards the muzzle (default '-z', glTF/three convention; Sketchfab guns are often '+x'). */
  forward?: Axis;
  /** Asset axis pointing up (default '+y'). */
  up?: Axis;
  /** Metres per asset unit (default 1), or `lengthM` to fit the overall length. */
  scale?: number;
  lengthM?: number;
  /** Typical length for the kind, used ONLY when the asset's units can't be recognised (autoOrient). */
  nominalLengthM?: number;
  /** Find forward/up from the geometry (principal axes) when `forward`/`up` are not given, and the scale from `kind`. */
  autoOrient?: boolean;
  /** What this is (sets default length, grip templates, charge contract). Inferred from the proportions when absent. */
  kind?: WeaponKind;
  /** Regexes (case-insensitive) matched against node, mesh and material names. */
  slide?: string; magazine?: string; trigger?: string; selector?: string; charge?: string;
  muzzle?: string; ejectionPort?: string; rearSight?: string; frontSight?: string;
  /** Explicit socket positions in *engine* weapon space (override name lookup and detection). */
  sockets?: Partial<Record<'muzzle' | 'ejectionPort' | 'rearSight' | 'frontSight', V3>>;
  magAxis?: V3;
  magBox?: { center: V3; half: V3 };
  triggerTravelM?: number;
  /** Charging contract (rifles); `false` disables the detected one. */
  chargeContract?: { grip: V3; travelM?: number; release?: 'slingshot' | 'boltRelease'; pullDir?: V3 } | false;
  casing?: { lengthM: number; diameterM: number; straight?: boolean };
  /** Authored grips (weapon space) — skips the geometric derivation. */
  grips?: WeaponGrips;
  /** Derive grips from the geometry when none are given (default true). */
  autoGrips?: boolean;
}

const AX: Record<Axis, V3> = { '+x': [1, 0, 0], '-x': [-1, 0, 0], '+y': [0, 1, 0], '-y': [0, -1, 0], '+z': [0, 0, 1], '-z': [0, 0, -1] };

const DEFAULT_RX = {
  slide: 'slide|\\bbolt\\b|carrier', magazine: '\\bmag(azine)?\\b|mag_|magazine', trigger: 'trigger', selector: 'selector|safety|fire_?mode',
  charge: 'charg(e|ing)', muzzle: 'muzzle', ejectionPort: 'eject|port', rearSight: 'rear_?sight|sight_?rear|notch', frontSight: 'front_?sight|sight_?front|post',
};

/** Per-kind defaults: overall length, trigger reference z (where the procedural models have theirs), charge travel. */
const KIND = {
  pistol: { lengthM: 0.19, triggerZ: -0.01, portBack: 0.012, triggerTravelM: 0.0045 },
  carbine: { lengthM: 0.85, triggerZ: 0.015, portBack: 0.035, triggerTravelM: 0.003, chargeTravelM: 0.085 },
  rifle: { lengthM: 1.0, triggerZ: 0.015, portBack: 0.035, triggerTravelM: 0.003, chargeTravelM: 0.085 },
} as const;

export interface WeaponAnalysis {
  kind: WeaponKind;
  min: V3; max: V3;
  /** Bore (x, y) — 0, 0 after centring; kept for reports. */
  bore: [number, number];
  muzzle: V3; rearSight: V3; frontSight: V3; ejectionPort: V3;
  /** Pistol-grip column: z range, bottom, wrist-height data, rake (rad, bottom further back). */
  grip: { z0: number; z1: number; bottom: number; top: number; yWrist: number; zBack: number; zFront: number; /** front strap at knuckle height */ zFrontKnuckle: number; halfWidth: number; rake: number } | null;
  /** Magazine region hanging under the receiver (rifle; pistol magazines live inside the grip). */
  mag: { z0: number; z1: number; bottom: number; zBottom: number } | null;
  /** Trigger centre (detected part or estimate) and whether it was a part. */
  trigger: V3;
  /** Handguard support-hand spot (rifle) */
  handguard: { z: number; floor: number; halfWidth: number } | null;
  /** A scope / red dot found on top of a rifle: the sights then sit on its centre line at its ends. */
  optic: { z0: number; z1: number; railY: number } | null;
  length: number; height: number;
}

export interface GLTFWeapon {
  model: FirearmModel;
  grips?: WeaponGrips;
  warnings: string[];
  /** What the geometry analysis found (debugging / viewer overlays). */
  analysis: WeaponAnalysis;
  kind: WeaponKind;
}

// ------------------------------------------------------------------------------------------------ small math
const sub = (a: ArrayLike<number>, b: ArrayLike<number>): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: ArrayLike<number>, b: ArrayLike<number>): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a: ArrayLike<number>, b: ArrayLike<number>) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a: ArrayLike<number>): V3 => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
const xf = (m: Mat4, p: ArrayLike<number>): V3 => [m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12], m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13], m[2] * p[0] + m[6] * p[1] + m[10] * p[2] + m[14]];

/** Eigenvectors of a symmetric 3×3 (row-major), sorted by eigenvalue, largest first (cyclic Jacobi). */
function eigen3(m: number[]): V3[] {
  const a = m.slice(), v = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  for (let it = 0; it < 48; it++) {
    let p = 0, q = 1, mx = Math.abs(a[1]);
    if (Math.abs(a[2]) > mx) { p = 0; q = 2; mx = Math.abs(a[2]); }
    if (Math.abs(a[5]) > mx) { p = 1; q = 2; mx = Math.abs(a[5]); }
    if (mx < 1e-14 * (Math.abs(a[0]) + Math.abs(a[4]) + Math.abs(a[8]) + 1e-30)) break;
    const th = 0.5 * Math.atan2(2 * a[p * 3 + q], a[q * 3 + q] - a[p * 3 + p]);
    const c = Math.cos(th), s = Math.sin(th);
    for (let k = 0; k < 3; k++) { const kp = a[k * 3 + p], kq = a[k * 3 + q]; a[k * 3 + p] = c * kp - s * kq; a[k * 3 + q] = s * kp + c * kq; }
    for (let k = 0; k < 3; k++) { const pk = a[p * 3 + k], qk = a[q * 3 + k]; a[p * 3 + k] = c * pk - s * qk; a[q * 3 + k] = s * pk + c * qk; }
    for (let k = 0; k < 3; k++) { const kp = v[k * 3 + p], kq = v[k * 3 + q]; v[k * 3 + p] = c * kp - s * kq; v[k * 3 + q] = s * kp + c * kq; }
  }
  const order = [0, 1, 2].sort((i, j) => a[j * 3 + j] - a[i * 3 + i]);
  return order.map((i) => norm([v[i], v[3 + i], v[6 + i]]));
}

/** Area-weighted triangle centroids of a baked triangle soup (robust against tessellation density). */
function centroids(pos: Float32Array, idx: ArrayLike<number> | null): { c: Float32Array; w: Float32Array } {
  const nt = idx ? idx.length / 3 : pos.length / 9;
  const c = new Float32Array(nt * 3), w = new Float32Array(nt);
  for (let t = 0; t < nt; t++) {
    const a = (idx ? idx[t * 3] : t * 3) * 3, b = (idx ? idx[t * 3 + 1] : t * 3 + 1) * 3, d = (idx ? idx[t * 3 + 2] : t * 3 + 2) * 3;
    const e1 = [pos[b] - pos[a], pos[b + 1] - pos[a + 1], pos[b + 2] - pos[a + 2]], e2 = [pos[d] - pos[a], pos[d + 1] - pos[a + 1], pos[d + 2] - pos[a + 2]];
    const n = cross(e1, e2);
    w[t] = 0.5 * Math.hypot(n[0], n[1], n[2]);
    c[t * 3] = (pos[a] + pos[b] + pos[d]) / 3; c[t * 3 + 1] = (pos[a + 1] + pos[b + 1] + pos[d + 1]) / 3; c[t * 3 + 2] = (pos[a + 2] + pos[b + 2] + pos[d + 2]) / 3;
  }
  return { c, w };
}

/**
 * Engine basis (right, up, back) in asset coordinates from the geometry. The thin axis of the covariance is the
 * reliable one (guns are 3–8 cm wide, 15–30 cm tall, 19–100 cm long); in the plane across it the rotation is the one
 * with the smallest bounding rectangle (a diagonal frame would wrap the slide/receiver in a bigger box), the long
 * side being the bore axis. Signs: the grip hangs down (short slices at the bottom, the full-length slide/receiver on
 * top) and the muzzle end is the thin one (barrel / slide nose vs grip / stock).
 */
function principalFrame(c: Float32Array, w: Float32Array): { ex: V3; ey: V3; ez: V3; snapped: boolean } {
  const n = w.length;
  let W = 0; const mean = [0, 0, 0];
  for (let i = 0; i < n; i++) { W += w[i]; mean[0] += c[i * 3] * w[i]; mean[1] += c[i * 3 + 1] * w[i]; mean[2] += c[i * 3 + 2] * w[i]; }
  W = W || 1; mean[0] /= W; mean[1] /= W; mean[2] /= W;
  const cov = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < n; i++) {
    const x = c[i * 3] - mean[0], y = c[i * 3 + 1] - mean[1], z = c[i * 3 + 2] - mean[2], k = w[i] / W;
    cov[0] += x * x * k; cov[1] += x * y * k; cov[2] += x * z * k; cov[4] += y * y * k; cov[5] += y * z * k; cov[8] += z * z * k;
  }
  cov[3] = cov[1]; cov[6] = cov[2]; cov[7] = cov[5];
  let thin = eigen3(cov)[2];
  let snapped = false;
  const snap = (a: V3): V3 => { const k = [0, 1, 2].reduce((b, i) => (Math.abs(a[i]) > Math.abs(a[b]) ? i : b), 0); if (Math.abs(a[k]) > 0.985) { snapped = true; const o: V3 = [0, 0, 0]; o[k] = Math.sign(a[k]); return o; } return a; };
  thin = snap(thin);
  // basis of the plane across the thin axis
  const seed: V3 = Math.abs(thin[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  const a = norm(cross(thin, seed)), b = norm(cross(thin, a));
  const step = Math.max(1, Math.ceil(n / 60000));
  const pa: number[] = [], pb: number[] = [];
  for (let i = 0; i < n; i += step) { const p = [c[i * 3], c[i * 3 + 1], c[i * 3 + 2]]; pa.push(dot(p, a)); pb.push(dot(p, b)); }
  const rect = (th: number) => {
    const cs = Math.cos(th), sn = Math.sin(th);
    let u0 = Infinity, u1 = -Infinity, v0 = Infinity, v1 = -Infinity;
    for (let i = 0; i < pa.length; i++) { const u = cs * pa[i] + sn * pb[i], v = -sn * pa[i] + cs * pb[i]; if (u < u0) u0 = u; if (u > u1) u1 = u; if (v < v0) v0 = v; if (v > v1) v1 = v; }
    return { area: (u1 - u0) * (v1 - v0), du: u1 - u0, dv: v1 - v0 };
  };
  let best = { th: 0, ...rect(0) };
  for (let d = 1; d < 180; d++) { const th = (d * Math.PI) / 180, r = rect(th); if (r.area < best.area) best = { th, ...r }; }
  for (let d = -9; d <= 9; d++) { const th = best.th + (d * Math.PI) / 1800, r = rect(th); if (r.area < best.area) best = { th, ...r }; }
  const cs = Math.cos(best.th), sn = Math.sin(best.th);
  const U: V3 = [cs * a[0] + sn * b[0], cs * a[1] + sn * b[1], cs * a[2] + sn * b[2]], V: V3 = [-sn * a[0] + cs * b[0], -sn * a[1] + cs * b[1], -sn * a[2] + cs * b[2]];
  let f = best.du >= best.dv ? U : V, u = best.du >= best.dv ? V : U;
  f = snap(f); u = norm(cross(thin, f)); u = snap(u); f = norm(cross(u, thin));
  // sign of up: the side whose slices are long (slide / receiver / barrel) is the top, the short grip hangs down
  const fv = new Float32Array(n), uv = new Float32Array(n);
  let f0 = Infinity, f1 = -Infinity, u0 = Infinity, u1 = -Infinity;
  for (let i = 0; i < n; i++) {
    const p = [c[i * 3], c[i * 3 + 1], c[i * 3 + 2]];
    fv[i] = dot(p, f); uv[i] = dot(p, u);
    f0 = Math.min(f0, fv[i]); f1 = Math.max(f1, fv[i]); u0 = Math.min(u0, uv[i]); u1 = Math.max(u1, uv[i]);
  }
  const B = 20, lo = new Float32Array(B).fill(Infinity), hi = new Float32Array(B).fill(-Infinity);
  for (let i = 0; i < n; i++) { const bi = Math.min(B - 1, Math.floor(((uv[i] - u0) / (u1 - u0 || 1)) * B)); lo[bi] = Math.min(lo[bi], fv[i]); hi[bi] = Math.max(hi[bi], fv[i]); }
  const ext = (x: number, y: number) => { let s = 0, k = 0; for (let i = x; i < y; i++) if (hi[i] > lo[i]) { s += hi[i] - lo[i]; k++; } return k ? s / k : 0; };
  if (ext(0, 6) > ext(B - 6, B)) u = [-u[0], -u[1], -u[2]];
  // sign of forward: the muzzle end is the thin one (barrel / slide nose), the rear carries the grip or stock
  const L = f1 - f0;
  let fr0 = Infinity, fr1 = -Infinity, bk0 = Infinity, bk1 = -Infinity;
  for (let i = 0; i < n; i++) {
    if (fv[i] < f0 + 0.2 * L) { fr0 = Math.min(fr0, uv[i]); fr1 = Math.max(fr1, uv[i]); }
    if (fv[i] > f1 - 0.2 * L) { bk0 = Math.min(bk0, uv[i]); bk1 = Math.max(bk1, uv[i]); }
  }
  // Primary cue: the grip and magazine hang below the bore and sit behind the middle of the gun on every pistol and
  // rifle, so the muzzle is the end FARTHER from the centroid of the lowest hanging material. (The "thin end" test
  // alone fails on scoped rifles and anything with a bulky muzzle device or a slim stock.)
  let hs = 0, hn = 0;
  const uLow = u0 + 0.22 * (u1 - u0), upIsU = ext(0, 6) <= ext(B - 6, B);
  for (let i = 0; i < n; i++) {
    const low = upIsU ? uv[i] < uLow : uv[i] > u1 - 0.22 * (u1 - u0);
    if (low) { hs += fv[i]; hn++; }
  }
  const hang = hn ? hs / hn : (f0 + f1) / 2;
  const toLow = hang - f0, toHigh = f1 - hang; // distance from the hanging mass to each end
  if (Math.abs(toLow - toHigh) > 0.06 * L) {
    if (toLow > toHigh) f = [-f[0], -f[1], -f[2]]; // muzzle at the low-f end → f must point there (−z = towards the muzzle = f)
  } else if (fr1 - fr0 < bk1 - bk0) f = [-f[0], -f[1], -f[2]]; // ambiguous: fall back to the thin end
  const ez: V3 = [-f[0], -f[1], -f[2]], ey = u, ex = norm(cross(ey, ez));
  return { ex, ey, ez, snapped };
}

// ------------------------------------------------------------------------------------------------ analysis
interface Draw { i: number; min: V3; max: V3; size: V3; center: V3; tris: number; name: string; pos: Float32Array; idx: ArrayLike<number> | null }

function boundsOf(pos: Float32Array): { min: V3; max: V3 } {
  const min: V3 = [Infinity, Infinity, Infinity], max: V3 = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < pos.length; i += 3) for (let k = 0; k < 3; k++) { const v = pos[i + k]; if (v < min[k]) min[k] = v; if (v > max[k]) max[k] = v; }
  return { min, max };
}

/** Long axis (unit) of a vertex cloud, pointing down (y ≤ 0). */
function longAxis(pos: Float32Array): V3 {
  const n = pos.length / 3; const m = [0, 0, 0];
  for (let i = 0; i < pos.length; i += 3) { m[0] += pos[i]; m[1] += pos[i + 1]; m[2] += pos[i + 2]; }
  m[0] /= n || 1; m[1] /= n || 1; m[2] /= n || 1;
  const cov = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < pos.length; i += 3) { const x = pos[i] - m[0], y = pos[i + 1] - m[1], z = pos[i + 2] - m[2]; cov[0] += x * x; cov[1] += x * y; cov[2] += x * z; cov[4] += y * y; cov[5] += y * z; cov[8] += z * z; }
  cov[3] = cov[1]; cov[6] = cov[2]; cov[7] = cov[5];
  const a = eigen3(cov)[0];
  return a[1] > 0 ? [-a[0], -a[1], -a[2]] : a;
}

export interface Soup { pos: Float32Array; idx: ArrayLike<number> | null }

/** Every edge of every triangle (authored lofts have long edges with no vertices in between — profiles must use edges, not vertices). */
function forEachEdge(soups: Soup[], fn: (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => void) {
  for (const s of soups) {
    const p = s.pos, n = s.idx ? s.idx.length : p.length / 3;
    for (let t = 0; t + 2 < n; t += 3) {
      const i0 = (s.idx ? s.idx[t] : t) * 3, i1 = (s.idx ? s.idx[t + 1] : t + 1) * 3, i2 = (s.idx ? s.idx[t + 2] : t + 2) * 3;
      fn(p[i0], p[i0 + 1], p[i0 + 2], p[i1], p[i1 + 1], p[i1 + 2]);
      fn(p[i1], p[i1 + 1], p[i1 + 2], p[i2], p[i2 + 1], p[i2 + 2]);
      fn(p[i2], p[i2 + 1], p[i2 + 2], p[i0], p[i0 + 1], p[i0 + 2]);
    }
  }
}

/** Where the surface crosses the plane y = level inside a z window: back (max z), front (min z), half width (max |x - cx|). */
function sliceY(soups: Soup[], level: number, z0: number, z1: number, cx: number): { back: number; front: number; hw: number } {
  let back = -Infinity, front = Infinity, hw = 0;
  forEachEdge(soups, (ax, ay, az, bx, by, bz) => {
    if ((ay - level) * (by - level) > 0 || ay === by) return;
    const t = (level - ay) / (by - ay);
    const z = az + (bz - az) * t;
    if (z < z0 || z > z1) return;
    const x = Math.abs(ax + (bx - ax) * t - cx);
    if (z > back) back = z; if (z < front) front = z; if (x > hw) hw = x;
  });
  return { back, front, hw };
}

/** Geometry analysis of an engine-space triangle soup (bore already on x = y = 0 is *not* assumed). */
export function analyzeWeaponGeometry(soups: Soup[], kindHint: WeaponKind | undefined, found: { trigger?: V3 | null; charge?: Draw | null; magazine?: Draw | null } = {}): WeaponAnalysis {
  const total = soups.reduce((n, s) => n + s.pos.length, 0);
  const all = new Float32Array(total);
  { let o = 0; for (const s of soups) { all.set(s.pos, o); o += s.pos.length; } }
  const { min, max } = boundsOf(all);
  const L = max[2] - min[2], H = max[1] - min[1];
  // bore: centre of the muzzle slab (front 4 %) — slide nose / barrel / flash hider
  let bx = 0, by = 0, bn = 0;
  for (let i = 0; i < all.length; i += 3) if (all[i + 2] < min[2] + 0.04 * L) { bx += all[i]; by += all[i + 1]; bn++; }
  bx /= bn || 1; by /= bn || 1;
  const kind: WeaponKind = kindHint ?? (L / H > 2.2 ? 'carbine' : 'pistol');
  const rifle = kind !== 'pistol';
  // profiles along z (floor, top, half width), rasterised from the edges
  const B = 60, bin = L / B;
  const floor = new Float32Array(B).fill(Infinity), top = new Float32Array(B).fill(-Infinity), hw = new Float32Array(B);
  const zOf = (b: number) => min[2] + (b + 0.5) * bin;
  const binOf = (z: number) => Math.max(0, Math.min(B - 1, Math.floor((z - min[2]) / bin)));
  const upd = (b: number, y: number, x: number) => { y -= by; x = Math.abs(x - bx); if (y < floor[b]) floor[b] = y; if (y > top[b]) top[b] = y; if (x > hw[b]) hw[b] = x; };
  forEachEdge(soups, (ax, ay, az, bx2, by2, bz) => {
    const ba = binOf(az), bb = binOf(bz);
    upd(ba, ay, ax); upd(bb, by2, bx2);
    if (Math.abs(ba - bb) < 2) return;
    const lo = Math.min(ba, bb), hi = Math.max(ba, bb);
    for (let b = lo + 1; b < hi; b++) { const t = (zOf(b) - az) / (bz - az); upd(b, ay + (by2 - ay) * t, ax + (bx2 - ax) * t); }
  });
  const depth = min[1] - by; // negative
  // hanging runs: bins whose floor is deeper than half the max depth (grip, magazine; not trigger guards / stock toes)
  const runs: { b0: number; b1: number }[] = [];
  for (let b = 0; b < B; b++) {
    if (!(floor[b] < 0.5 * depth)) continue;
    const last = runs[runs.length - 1];
    if (last && b - last.b1 <= 2) last.b1 = b; else runs.push({ b0: b, b1: b });
  }
  let grip: WeaponAnalysis['grip'] = null, mag: WeaponAnalysis['mag'] = null;
  if (runs.length) {
    let g = runs[runs.length - 1];
    // a run wider than a hand (stock merged with the grip): only its front 6 cm is the grip
    if ((g.b1 - g.b0 + 1) * bin > 0.12) g = { b0: g.b0, b1: g.b0 + Math.ceil(0.06 / bin) };
    const z0 = min[2] + g.b0 * bin, z1 = min[2] + (g.b1 + 1) * bin;
    let bottom = Infinity;
    for (let b = g.b0; b <= g.b1; b++) bottom = Math.min(bottom, floor[b]);
    const yWrist = Math.min(bottom + 0.088, 0.2 * depth - 0.005);
    // the column: back strap (outer surface — internal magazines don't count) at 12 heights → rake by least squares;
    // back / front strap and width at wrist height
    const S = 12, sy0 = bottom + 0.012, sy1 = yWrist - 0.004;
    let n = 0, sx = 0, sy = 0, sxx = 0, sxy = 0;
    for (let k = 0; k < S; k++) {
      const y = sy0 + ((k + 0.5) / S) * (sy1 - sy0);
      const sl = sliceY(soups, y + by, z0 - 0.015, z1 + 0.03, bx);
      if (!isFinite(sl.back)) continue;
      n++; sx += y; sy += sl.back; sxx += y * y; sxy += y * sl.back;
    }
    const d = n * sxx - sx * sx;
    let rake = n >= 4 && Math.abs(d) > 1e-12 ? Math.atan(-(n * sxy - sx * sy) / d) : 0.3;
    rake = Math.max(0, Math.min(0.6, rake));
    const w = sliceY(soups, yWrist + by, z0 - 0.015, z1 + 0.03, bx);
    const zBack = isFinite(w.back) ? w.back : z1, zFront = isFinite(w.front) ? w.front : z0, halfWidth = w.hw > 0 ? w.hw : 0.015;
    // the front strap at knuckle height (the trigger guard, in front of the run, is excluded by the window)
    const kn = sliceY(soups, yWrist - 0.085 * Math.sin(rake) + by, z0 - 0.005, z1 + 0.03, bx);
    const zFrontKnuckle = isFinite(kn.front) ? kn.front : zFront;
    grip = { z0, z1, bottom, top: 0.2 * depth, yWrist, zBack, zFront, zFrontKnuckle, halfWidth, rake };
    // magazine region: the hanging run in front of the grip (rifles)
    const mr = runs.length > 1 ? runs[runs.length - 2] : null;
    if (mr && rifle) {
      const mz0 = min[2] + mr.b0 * bin, mz1 = min[2] + (mr.b1 + 1) * bin;
      let mb = Infinity; for (let b = mr.b0; b <= mr.b1; b++) mb = Math.min(mb, floor[b]);
      let zs = 0, zn = 0;
      for (let i = 0; i < all.length; i += 3) if (all[i + 2] >= mz0 && all[i + 2] <= mz1 && all[i + 1] - by < mb + 0.015) { zs += all[i + 2]; zn++; }
      mag = { z0: mz0, z1: mz1, bottom: mb, zBottom: zn ? zs / zn : (mz0 + mz1) / 2 };
    }
  }
  if (found.magazine) {
    const d = found.magazine;
    let zs = 0, zn = 0;
    for (let i = 0; i < d.pos.length; i += 3) if (d.pos[i + 1] < d.min[1] + 0.015) { zs += d.pos[i + 2]; zn++; }
    mag = { z0: d.min[2], z1: d.max[2], bottom: d.min[1] - by, zBottom: zn ? zs / zn : d.center[2] };
  }
  // trigger: detected part, else a kind-specific offset in front of the grip
  const gripFront = grip ? grip.z0 : min[2] + 0.6 * L;
  const trigger: V3 = found.trigger ? [found.trigger[0], found.trigger[1] - by, found.trigger[2]] : [bx, -0.04, gripFront - (rifle ? 0.055 : 0.04)];
  // sockets
  let mz = Infinity;
  for (let i = 0; i < all.length; i += 3) if (Math.abs(all[i] - bx) < 0.012 && Math.abs(all[i + 1] - by) < 0.012 && all[i + 2] < mz) mz = all[i + 2];
  const muzzle: V3 = [bx, by, isFinite(mz) ? mz : min[2]];
  const zMid = (min[2] + max[2]) / 2;
  const topIn = (za: number, zb: number, rearmost: boolean): V3 => {
    const a = binOf(za), b = binOf(zb);
    let m = -Infinity; for (let i = a; i <= b; i++) m = Math.max(m, top[i]);
    let pick = rearmost ? a : b;
    if (rearmost) { for (let i = b; i >= a; i--) if (top[i] >= m - 0.002) { pick = i; break; } } else { for (let i = a; i <= b; i++) if (top[i] >= m - 0.002) { pick = i; break; } }
    return [bx, by + m, zOf(pick)];
  };
  let rearSight = rifle ? topIn(zMid - 0.1 * L, max[2] - 0.25 * L, true) : topIn(zMid, max[2], true);
  let frontSight = topIn(min[2], min[2] + 0.25 * L, false);
  // pistols: the eye lines up the notch, a hair below the top of the rear sight
  if (!rifle) { rearSight = [rearSight[0], rearSight[1] - 0.0015, rearSight[2]]; frontSight = [frontSight[0], frontSight[1] - 0.001, frontSight[2]]; }
  // rifles with an optic: the top profile has a raised plateau (scope / red dot) well above the rail line. The eye looks
  // THROUGH it, so the sight line is the optic's centre, taken at its ends (eyepiece / objective, clear of the turrets).
  let optic: WeaponAnalysis['optic'] = null;
  if (rifle) {
    const tops: number[] = [];
    for (let i = 0; i < B; i++) if (isFinite(top[i]) && top[i] > 0) tops.push(top[i]);
    tops.sort((a, b) => a - b);
    const rail = tops.length ? tops[Math.floor(tops.length * 0.3)] : 0; // the receiver / handguard top line
    const plateau: number[] = [];
    for (let i = 0; i < B; i++) if (top[i] - rail > 0.028) plateau.push(i);
    // keep the longest contiguous run between the magazine and the stock end (not a tall front sight post)
    let run: [number, number] | null = null, s0 = -1;
    for (let k = 0; k <= plateau.length; k++) {
      if (k < plateau.length && (k === 0 || plateau[k] === plateau[k - 1] + 1)) { if (s0 < 0) s0 = plateau[k]; continue; }
      if (s0 >= 0) { const e = plateau[k - 1]; if (!run || e - s0 > run[1] - run[0]) run = [s0, e]; }
      s0 = k < plateau.length ? plateau[k] : -1;
    }
    if (run && (run[1] - run[0] + 1) * bin > 0.08) {
      // centre of the bell at that end: its top minus its radius (a bell is round, so its half-width is the radius);
      // clamped so a wide receiver under a slim optic can't drag the line below the optic
      const end = (i: number) => top[i] - Math.min(hw[i], 0.6 * (top[i] - rail));
      const rb = run[1], fb = run[0];
      rearSight = [bx, by + end(rb), zOf(rb) + bin * 0.5];
      frontSight = [bx, by + end(fb), zOf(fb) - bin * 0.5];
      optic = { z0: zOf(fb), z1: zOf(rb), railY: rail };
    }
  }
  const pz = trigger[2] - KIND[kind].portBack;
  const ejectionPort: V3 = [bx + Math.max(0.008, hw[binOf(pz)] - 0.003), by + 0.012, pz];
  // rifle support hand: the handguard between the magazine and the front sight
  let handguard: WeaponAnalysis['handguard'] = null;
  if (rifle) {
    const front = mag ? mag.z0 : gripFront - 0.1;
    const z = Math.max(min[2] + 0.12, Math.min(front - 0.06, front - 0.145));
    const b = binOf(z);
    let fl = Infinity, w = 0;
    for (let i = Math.max(0, b - 1); i <= Math.min(B - 1, b + 1); i++) { fl = Math.min(fl, floor[i]); w = Math.max(w, hw[i]); }
    handguard = { z, floor: isFinite(fl) ? fl : -0.02, halfWidth: w || 0.02 };
  }
  void found.charge;
  return { kind, min, max, bore: [bx, by], muzzle, rearSight, frontSight, ejectionPort, grip, mag, trigger, handguard, optic, length: L, height: H };
}

// ------------------------------------------------------------------------------------------------ grips
const PISTOL_FINGERS: HandPose['fingers'] = [{ curl: [0.5, 0.7, 0.3], spread: 0.1 }, { curl: [1.25, 1.35, 0.7] }, { curl: [1.3, 1.35, 0.7] }, { curl: [1.35, 1.3, 0.7] }];
const RIFLE_FINGERS: HandPose['fingers'] = [{ curl: [0.25, 0.55, 0.3], spread: 0.08 }, { curl: [1.3, 1.3, 0.7] }, { curl: [1.3, 1.3, 0.7] }, { curl: [1.3, 1.25, 0.7] }];
const WRAP_FINGERS: HandPose['fingers'] = [{ curl: [1.15, 1.2, 0.6] }, { curl: [1.2, 1.2, 0.6] }, { curl: [1.2, 1.2, 0.6] }, { curl: [1.2, 1.15, 0.6] }];
const UNDER_FINGERS: HandPose['fingers'] = [{ curl: [0.9, 0.9, 0.4] }, { curl: [0.95, 0.9, 0.4] }, { curl: [0.95, 0.9, 0.4] }, { curl: [0.95, 0.9, 0.4] }];
const copyF = (f: HandPose['fingers']) => f.map((x) => ({ ...x, curl: [...x.curl] as V3 })) as HandPose['fingers'];

/**
 * Grip poses from the analysis (weapon space, bore on x = y = 0): firing hand on the pistol grip, support hand on the
 * handguard (rifle) or wrapped over the firing hand (pistol), support hand under the magazine. Curls are templates —
 * run `fitWeaponGrips` to close the fingers onto the actual surface.
 */
export function gripsFromAnalysis(a: WeaponAnalysis): WeaponGrips | null {
  const g = a.grip;
  if (!g) return null;
  const rifle = a.kind !== 'pistol';
  const r = g.rake;
  // the knuckles sit ~13 mm behind the front strap, the proximal phalanges wrap it: wrist = knuckles − hand length along fingerDir
  const right: HandPose = {
    position: [g.halfWidth + 0.013, g.yWrist, g.zFrontKnuckle + 0.013 + 0.085 * Math.cos(r)],
    fingerDir: [0, -Math.sin(r), -Math.cos(r)], dorsal: [1, 0, 0],
    fingers: copyF(rifle ? RIFLE_FINGERS : PISTOL_FINGERS),
    thumb: rifle ? { dir: [-0.6, -0.6, -0.5], bend: [0.25, 0.15] } : { dir: [-0.55, -0.55, -0.62], bend: [0.15, 0.1] },
  };
  let left: HandPose;
  if (rifle && a.handguard) {
    const h = a.handguard;
    left = { position: [-(h.halfWidth + 0.044), h.floor - 0.026, h.z], fingerDir: [0.8, 0.15, -0.55], dorsal: [0, -1, 0], fingers: copyF(WRAP_FINGERS), thumb: { dir: [-0.3, 0.7, -0.6], bend: [0.15, 0.1] } };
  } else {
    const r2 = r + 0.21;
    left = { position: [-(g.halfWidth + 0.018), g.yWrist, right.position[2] - 0.043], fingerDir: [0, -Math.sin(r2), -Math.cos(r2)], dorsal: [-1, 0, 0], fingers: copyF(WRAP_FINGERS), thumb: { dir: [-0.5, -0.1, -0.86], bend: [0.05, 0.05] } };
  }
  // under the magazine baseplate (rifle: the magazine; pistol: the grip bottom, where the magazine sits)
  const bottom = a.mag ? a.mag.bottom : g.bottom;
  let zb: number;
  if (a.mag) zb = a.mag.zBottom; else zb = (g.zFront + g.zBack) / 2 + Math.tan(r) * (g.yWrist - g.bottom) * 0.5;
  const leftOnMagazine: HandPose = { position: [-0.01, bottom - 0.027, zb + 0.055], fingerDir: [0.15, 0.27, -0.95], dorsal: [-0.1, -1, 0], fingers: copyF(UNDER_FINGERS), thumb: { dir: [-0.7, 0.25, -0.6], bend: [0.2, 0.1] } };
  return { right, left, indexPressed: rifle ? { curl: [0.35, 0.8, 0.45], spread: 0.06 } : { curl: [0.55, 0.95, 0.45], spread: 0.08 }, leftOnMagazine };
}

/** Grips for any FirearmModel (procedural or glTF) from its CPU geometry (`Mesh.source`). Null when there is no grip to find. */
export function deriveWeaponGrips(model: FirearmModel, kind?: WeaponKind): { grips: WeaponGrips; analysis: WeaponAnalysis } | null {
  const chunks: Soup[] = [];
  let magPart: Draw | null = null, trig: V3 | null = null;
  for (const p of model.parts) {
    const src = p.object.mesh.source;
    if (!src) continue;
    const out = new Float32Array(src.positions.length);
    for (let i = 0; i < src.positions.length; i += 3) { const q = xf(p.local, [src.positions[i], src.positions[i + 1], src.positions[i + 2]]); out[i] = q[0]; out[i + 1] = q[1]; out[i + 2] = q[2]; }
    chunks.push({ pos: out, idx: src.indices });
    if (p.magazine && !p.round && !magPart) { const b = boundsOf(out); magPart = { i: -1, ...b, size: sub(b.max, b.min), center: [(b.min[0] + b.max[0]) / 2, (b.min[1] + b.max[1]) / 2, (b.min[2] + b.max[2]) / 2], tris: src.indices.length / 3, name: '', pos: out, idx: src.indices }; }
    if (p.trigger && !trig) { const b = boundsOf(out); trig = [(b.min[0] + b.max[0]) / 2, (b.min[1] + b.max[1]) / 2, (b.min[2] + b.max[2]) / 2]; }
  }
  if (!chunks.length) return null;
  const analysis = analyzeWeaponGeometry(chunks, kind, { trigger: trig, magazine: magPart });
  const grips = gripsFromAnalysis(analysis);
  return grips ? { grips, analysis } : null;
}

// ------------------------------------------------------------------------------------------------ main
export function weaponFromGLTF(renderer: Renderer, inst: GLTFInstance, map: WeaponMapping = {}, grips?: WeaponGrips): GLTFWeapon {
  const warnings: string[] = [];
  const guessed: string[] = [];
  const rx = (k: keyof typeof DEFAULT_RX) => new RegExp((map[k] as string | undefined) ?? DEFAULT_RX[k], 'i');
  const nameOf = (i: number) => {
    const d = inst.drawables[i];
    const n = inst.asset.nodes[d.node];
    return `${n.name} ${n.mesh !== undefined ? inst.asset.meshes[n.mesh].name : ''} ${d.material.name}`;
  };
  const isMarker = (i: number) => /(^|\s)(muzzle|ejection|rear_?sight_?marker|front_?sight_?marker|socket)/i.test(inst.asset.nodes[inst.drawables[i].node].name) && inst.drawables[i].mesh.indexCount <= 36;
  // ---- bake every drawable into asset space
  const baked = inst.drawables.map((d, i) => {
    if (isMarker(i)) return null;
    const src = d.primitive.positions;
    const out = new Float32Array(src.length);
    for (let k = 0; k < src.length; k += 3) { const q = xf(d.world, [src[k], src[k + 1], src[k + 2]]); out[k] = q[0]; out[k + 1] = q[1]; out[k + 2] = q[2]; }
    return out;
  });
  const total = baked.reduce((n, b) => n + (b ? b.length : 0), 0);
  const assetAll = new Float32Array(total);
  { let o = 0; for (const b of baked) if (b) { assetAll.set(b, o); o += b.length; } }
  // ---- rotation
  let ex: V3, ey: V3, ez: V3;
  if (map.forward || map.up || !map.autoOrient) {
    const f = AX[map.forward ?? '-z'], u = AX[map.up ?? '+y'];
    ez = [-f[0], -f[1], -f[2]]; ey = [u[0], u[1], u[2]]; ex = norm(cross(ey, ez));
  } else {
    // area-weighted centroids of every triangle
    const cs: Float32Array[] = [], ws: Float32Array[] = [];
    baked.forEach((b, i) => { if (!b) return; const { c, w } = centroids(b, inst.drawables[i].primitive.indices ?? null); cs.push(c); ws.push(w); });
    const C = new Float32Array(cs.reduce((n, c) => n + c.length, 0)), W = new Float32Array(ws.reduce((n, w) => n + w.length, 0));
    { let o = 0, p = 0; for (let k = 0; k < cs.length; k++) { C.set(cs[k], o); o += cs[k].length; W.set(ws[k], p); p += ws[k].length; } }
    const fr = principalFrame(C, W);
    ex = fr.ex; ey = fr.ey; ez = fr.ez;
    guessed.push(`orientation from principal axes (forward ${fmtAxis([-ez[0], -ez[1], -ez[2]])}, up ${fmtAxis(ey)}${fr.snapped ? '' : ', not axis-aligned'})`);
  }
  const R = mat4.create();
  R[0] = ex[0]; R[4] = ex[1]; R[8] = ex[2];
  R[1] = ey[0]; R[5] = ey[1]; R[9] = ey[2];
  R[2] = ez[0]; R[6] = ez[1]; R[10] = ez[2];
  // ---- scale: explicit, fit to lengthM, or the kind's default length
  const lenAsset = (() => { let a = Infinity, b = -Infinity; for (let i = 0; i < assetAll.length; i += 3) { const z = dot([assetAll[i], assetAll[i + 1], assetAll[i + 2]], ez); a = Math.min(a, z); b = Math.max(b, z); } return Math.max(b - a, 1e-6); })();
  let kind: WeaponKind | undefined = map.kind;
  let scale = map.scale ?? 1;
  if (map.lengthM) scale = map.lengthM / lenAsset;
  else if (map.scale === undefined && map.autoOrient) {
    if (!kind) {
      // proportions in the oriented frame
      let y0 = Infinity, y1 = -Infinity;
      for (let i = 0; i < assetAll.length; i += 3) { const y = dot([assetAll[i], assetAll[i + 1], assetAll[i + 2]], ey); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
      kind = lenAsset / Math.max(y1 - y0, 1e-6) > 2.2 ? 'carbine' : 'pistol';
      guessed.push(`kind "${kind}" from the proportions`);
    }
    // keep the real size: try metres, centimetres, millimetres, inches, decimetres and take the first unit that gives a
    // plausible length for the kind (a scoped, suppressed rifle is longer than a bare carbine and must stay so)
    const range: [number, number] = kind === 'pistol' ? [0.13, 0.32] : kind === 'carbine' ? [0.6, 1.25] : [0.75, 1.6];
    const units: [number, string][] = [[1, 'm'], [0.01, 'cm'], [0.001, 'mm'], [0.0254, 'in'], [0.1, 'dm']];
    const unit = units.find(([u]) => lenAsset * u >= range[0] && lenAsset * u <= range[1]);
    if (unit) {
      scale = unit[0];
      guessed.push(`units ${unit[1]} (overall length ${(lenAsset * scale).toFixed(3)} m)`);
    } else {
      const nominal = map.nominalLengthM ?? KIND[kind].lengthM;
      scale = nominal / lenAsset;
      guessed.push(`scale ${scale.toPrecision(4)} (units not recognised; fitted to ${nominal} m for a ${kind})`);
    }
  }
  const RS = mat4.multiply(mat4.create(), R, mat4.fromScaling(mat4.create(), [scale, scale, scale]));
  // ---- engine-space clouds + per-drawable bounds
  const draws: Draw[] = [];
  const engAll = new Float32Array(total);
  { let o = 0; baked.forEach((b, i) => { if (!b) return; const out = new Float32Array(b.length); for (let k = 0; k < b.length; k += 3) { const q = xf(RS, [b[k], b[k + 1], b[k + 2]]); out[k] = q[0]; out[k + 1] = q[1]; out[k + 2] = q[2]; } engAll.set(out, o); o += out.length; const bb = boundsOf(out); draws.push({ i, ...bb, size: sub(bb.max, bb.min), center: [(bb.min[0] + bb.max[0]) / 2, (bb.min[1] + bb.max[1]) / 2, (bb.min[2] + bb.max[2]) / 2], tris: inst.drawables[i].mesh.indexCount / 3, name: nameOf(i), pos: out, idx: inst.drawables[i].primitive.indices ?? null }); }); }
  // ---- parts by name
  const flags = draws.map((d) => ({ bolt: rx('slide').test(d.name), magazine: rx('magazine').test(d.name), trigger: rx('trigger').test(d.name), selector: rx('selector').test(d.name), charge: rx('charge').test(d.name) }));
  const has = (k: keyof (typeof flags)[number]) => flags.some((f) => f[k]);
  // ---- first pass analysis (bore, grip) to drive part guessing
  const pre = analyzeWeaponGeometry(draws, kind, {});
  kind = pre.kind;
  const [bx, by] = pre.bore;
  const L = pre.length, depth = pre.min[1] - by;
  const rifle = kind !== 'pistol';
  const largest = draws.reduce((b, d) => (d.tris > (b?.tris ?? -1) ? d : b), null as Draw | null);
  if (!has('bolt') && !rifle && draws.length > 1) {
    // pistol slide: the long mesh riding above the bore that does not reach down into the grip
    const cands = draws.filter((d) => d.center[1] > by - 0.004 && d.min[1] > by - 0.03 && d.size[2] > 0.5 * L);
    const slide = cands.sort((p, q) => q.size[2] - p.size[2])[0];
    if (slide) {
      flags[draws.indexOf(slide)].bolt = true;
      for (const d of draws) if (d !== slide && d.size[2] < 0.12 * L && d.min[1] > slide.center[1] && d.min[2] > slide.min[2] - 0.005 && d.max[2] < slide.max[2] + 0.005) flags[draws.indexOf(d)].bolt = true;
      guessed.push(`slide = "${slide.name.trim()}" (+ ${flags.filter((f) => f.bolt).length - 1} small meshes riding on it)`);
    }
  }
  if (!has('charge') && rifle && draws.length > 1) {
    const zMid = (pre.min[2] + pre.max[2]) / 2;
    const cands = draws.filter((d) => d.min[1] > by + 0.01 && d.center[2] > zMid && d.size[2] > 0.05 * L && d.size[2] < 0.2 * L && d.size[1] < 0.025 && d.size[0] < 0.08);
    const ch = cands.sort((p, q) => q.max[2] - p.max[2])[0];
    if (ch) { flags[draws.indexOf(ch)].charge = true; guessed.push(`charging handle = "${ch.name.trim()}"`); }
  }
  if (!has('magazine') && draws.length > 1) {
    const cands = draws.filter((d) => d !== largest && d.max[1] < by + 0.005 && d.size[1] > 0.35 * -depth && d.size[2] < 0.3 * L && d.size[1] / Math.max(d.size[2], 1e-6) > 1.2);
    const mg = cands.sort((p, q) => p.min[1] - q.min[1])[0];
    if (mg) { flags[draws.indexOf(mg)].magazine = true; guessed.push(`magazine = "${mg.name.trim()}"`); }
  }
  if (!has('trigger') && draws.length > 1 && pre.grip) {
    const gf = pre.grip.z0;
    const cands = draws.filter((d) => d.size[0] < 0.035 && d.size[1] < 0.035 && d.size[2] < 0.035 && d.size[1] > 0.008 && d.center[1] - by > -0.07 && d.center[1] - by < -0.02 && d.center[2] > gf - 0.075 && d.center[2] < gf);
    const tr = cands.sort((p, q) => q.size[1] - p.size[1])[0];
    if (tr) { flags[draws.indexOf(tr)].trigger = true; guessed.push(`trigger = "${tr.name.trim()}"`); }
  }
  const magDraw = draws.find((d) => flags[draws.indexOf(d)].magazine) ?? null;
  const trigDraw = draws.find((d) => flags[draws.indexOf(d)].trigger) ?? null;
  const chargeDraw = draws.find((d) => flags[draws.indexOf(d)].charge) ?? null;
  // ---- final analysis with the parts known
  const an = analyzeWeaponGeometry(draws, kind, { trigger: trigDraw ? trigDraw.center : null, magazine: magDraw, charge: chargeDraw });
  // ---- translation: bore → (0, 0), trigger → the kind's reference z (so specs' hip offsets / eye relief match)
  const T: V3 = [-bx, -by, KIND[kind].triggerZ - an.trigger[2]];
  const toEngine = mat4.multiply(mat4.create(), mat4.fromTranslation(mat4.create(), T), RS);
  const sh = (p: V3): Vec3 => vec3.create(p[0] + T[0], p[1] + T[1], p[2] + T[2]);
  // the analysis is reported in final weapon space
  const shiftA = (p: V3): V3 => [p[0] + T[0], p[1] + T[1], p[2] + T[2]];
  an.muzzle = shiftA(an.muzzle); an.rearSight = shiftA(an.rearSight); an.frontSight = shiftA(an.frontSight); an.ejectionPort = shiftA(an.ejectionPort);
  an.min = shiftA(an.min); an.max = shiftA(an.max);
  an.trigger = [an.trigger[0] + T[0], an.trigger[1], an.trigger[2] + T[2]];
  if (an.grip) { an.grip.z0 += T[2]; an.grip.z1 += T[2]; an.grip.zBack += T[2]; an.grip.zFront += T[2]; an.grip.zFrontKnuckle += T[2]; }
  if (an.mag) { an.mag.z0 += T[2]; an.mag.z1 += T[2]; an.mag.zBottom += T[2]; }
  if (an.handguard) an.handguard.z += T[2];
  an.bore = [0, 0];
  // ---- parts
  const parts: FirearmModel['parts'] = draws.map((d, k) => {
    const dr = inst.drawables[d.i];
    const local = mat4.multiply(mat4.create(), toEngine, dr.world);
    const f = flags[k];
    return { object: new RenderObject(dr.mesh, dr.material), local, bolt: f.bolt || undefined, magazine: f.magazine || undefined, trigger: f.trigger || undefined, selector: f.selector || undefined, charge: f.charge || undefined };
  });
  // ---- sockets: explicit → named empty → detected
  const socket = (k: 'muzzle' | 'ejectionPort' | 'rearSight' | 'frontSight'): Vec3 => {
    const given = map.sockets?.[k];
    if (given) return vec3.create(given[0], given[1], given[2]);
    const re = rx(k);
    const ni = inst.asset.nodes.findIndex((n) => re.test(n.name));
    if (ni >= 0) { const w = inst.nodeWorld[ni]; return vec3.transformMat4(vec3.create(), [w[12], w[13], w[14]], toEngine); }
    guessed.push(`${k} socket from the geometry`);
    return vec3.create(an[k][0], an[k][1], an[k][2]);
  };
  const casingL = map.casing?.lengthM ?? (rifle ? 0.0448 : 0.019), casingD = map.casing?.diameterM ?? (rifle ? 0.0095 : 0.0099);
  const model: FirearmModel = {
    parts,
    muzzle: socket('muzzle'),
    ejectionPort: socket('ejectionPort'),
    rearSight: socket('rearSight'),
    frontSight: socket('frontSight'),
    casingMesh: new Mesh(renderer.dev, casingGeometry(casingL, casingD, lathe, { straight: map.casing?.straight ?? !rifle })),
    casingMaterial: renderer.synth.material('brass', { size: 512, tileMeters: 0.03, seed: 5 }, { name: 'brass' }),
  };
  // ---- magazine axis / box
  if (map.magAxis) model.magAxis = vec3.normalize(vec3.create(), vec3.create(...map.magAxis));
  else if (magDraw) {
    const a = longAxis(magDraw.pos);
    if (a[1] < -0.7) { model.magAxis = vec3.create(a[0], a[1], a[2]); guessed.push('magAxis from the magazine\'s long axis'); }
  }
  if (!model.magAxis) {
    const r = an.grip?.rake ?? 0.3;
    model.magAxis = rifle ? vec3.create(0, -0.985, -0.17) : vec3.create(0, -Math.cos(r), Math.sin(r));
  }
  if (map.magBox) model.magBox = { center: vec3.create(...map.magBox.center), half: vec3.create(...map.magBox.half) };
  else if (magDraw) model.magBox = { center: sh(magDraw.center), half: vec3.create(magDraw.size[0] / 2, magDraw.size[1] / 2, magDraw.size[2] / 2) };
  else if (an.mag) model.magBox = { center: vec3.create(0, (an.mag.bottom + 0.4 * depth) / 2, (an.mag.z0 + an.mag.z1) / 2), half: vec3.create(0.013, (0.4 * depth - an.mag.bottom) / 2, (an.mag.z1 - an.mag.z0) / 2) };
  if (map.triggerTravelM !== undefined) model.triggerTravelM = map.triggerTravelM;
  else if (trigDraw) model.triggerTravelM = KIND[kind].triggerTravelM;
  // ---- charging contract (rifles: charging handle latch; pistols rack the slide, whose default grip the Firearm derives from the rear sight)
  if (map.chargeContract) {
    const c = map.chargeContract;
    model.charge = { grip: vec3.create(...c.grip), travelM: c.travelM, release: c.release, pullDir: c.pullDir ? vec3.create(...c.pullDir) : undefined };
  } else if (map.chargeContract !== false && rifle) {
    const travelM = KIND[kind as 'carbine' | 'rifle'].chargeTravelM;
    if (chargeDraw) model.charge = { grip: sh([chargeDraw.min[0] + 0.005, chargeDraw.center[1], chargeDraw.max[2] - 0.011]), travelM, release: 'boltRelease', pullDir: vec3.create(0, 0, 1) };
    else if (an.grip) {
      const zb = an.grip.zBack;
      let topAt = -Infinity;
      for (let i = 0; i < engAll.length; i += 3) if (Math.abs(engAll[i + 2] + T[2] - zb) < 0.01) topAt = Math.max(topAt, engAll[i + 1] - by);
      model.charge = { grip: vec3.create(-0.03, (isFinite(topAt) ? topAt : an.rearSight[1]) - 0.007, zb + 0.002), travelM, release: 'boltRelease', pullDir: vec3.create(0, 0, 1) };
      guessed.push('charging handle position (rear of the receiver)');
    }
  }
  // ---- grips
  let outGrips = grips ?? map.grips;
  if (!outGrips && map.autoGrips !== false) {
    const g = gripsFromAnalysis(an);
    if (g) { outGrips = g; guessed.push('grips from the grip column' + (rifle ? ' and handguard' : '')); }
    else warnings.push('no pistol grip found below the bore — pass mapping.grips');
  }
  // ---- warnings
  if (guessed.length) warnings.push(`guessed: ${guessed.join('; ')}`);
  if (!parts.some((p) => p.bolt) && !rifle) warnings.push('no slide part (one mesh?) — the action will not animate; name it "slide" or split the mesh');
  if (!parts.some((p) => p.magazine)) warnings.push('no magazine part — reloads will not show the magazine');
  if (!parts.some((p) => p.trigger)) warnings.push('no trigger part — the trigger will not move');
  return { model, grips: outGrips, warnings, analysis: an, kind };
}

function fmtAxis(a: V3): string {
  const k = [0, 1, 2].reduce((b, i) => (Math.abs(a[i]) > Math.abs(a[b]) ? i : b), 0);
  const s = (a[k] >= 0 ? '+' : '-') + 'xyz'[k];
  return Math.abs(a[k]) > 0.985 ? s : `≈${s} [${a.map((v) => v.toFixed(2)).join(', ')}]`;
}
