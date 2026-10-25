// Shared helpers for procedural weapon models.
// Weapon space: +x right, +y up, −z towards the muzzle, bore axis on y = 0, real-world metres.
//
// The workhorse is `loft`: a cross-section (x, y) swept along z through a list of stations. Consecutive
// stations at the same z make vertical walls, so grooves (cocking serrations, Picatinny slots, M-LOK slots'
// end faces, ejection ports) are modelled as real recesses in one watertight-looking surface rather than as
// dark boxes glued on. Profile points carry a `smooth` flag: fillets share normals (and catch the renderer's
// curvature-driven edge wear), chamfers and machined steps stay crisp.

import { Geometry, Mesh, Material, RenderObject, mat4, Mat4, cylinder, lathe, extrude, Renderer, triangulate } from '@fondaine/gl';
import type { FirearmModel } from '@fondaine/gl';
import { OccluderGrid, bakeBucket, layoutAtlas, BakeOptions } from './bake';

export type P2 = [number, number];

/** Side-profile extrusion: polygon in (forward, up) metres → weapon space, `width` across x. */
export function side(profile: P2[], width: number, bevel = 0.0015, holes: P2[][] = [], bevelSegments = 4): Geometry {
  const g = extrude(profile, width, { bevel, bevelSegments, holes });
  return g.rotateY(Math.PI / 2); // (a, y, z) → (z, y, −a): forward a becomes −z
}

/** Cross-section extrusion: polygon in (x, y) extruded along z, centred on z = zc. */
export function section(profile: P2[], depth: number, zc: number, bevel = 0.0008, holes: P2[][] = [], bevelSegments = 4): Geometry {
  return extrude(profile, depth, { bevel, bevelSegments, holes }).translate(0, 0, zc);
}

/** Cylinder along −z (barrels, tubes, pins along z). */
export function tubeZ(r: number, z0: number, z1: number, y = 0, x = 0, radial = 64): Geometry {
  const len = Math.abs(z1 - z0);
  return cylinder(r, r, len, radial).rotateX(Math.PI / 2).translate(x, y, (z0 + z1) / 2);
}

/** Cylinder along x (pins, buttons, dots facing sideways). */
export function tubeX(r: number, length: number, x: number, y: number, z: number, radial = 32): Geometry {
  return cylinder(r, r, length, radial).rotateZ(Math.PI / 2).translate(x, y, z);
}

/** Cylinder along y (screws, posts). */
export function tubeY(r: number, length: number, x: number, y: number, z: number, radial = 32): Geometry {
  return cylinder(r, r, length, radial).translate(x, y, z);
}

/** Disc facing +z (towards the shooter): sight dots, crowns. */
export function discZ(r: number, thickness: number, x: number, y: number, z: number, radial = 48): Geometry {
  return cylinder(r, r, thickness, radial).rotateX(Math.PI / 2).translate(x, y, z);
}

/** Lathe profile along −z: points (radius, distance forward from z0). */
export function latheZ(prof: P2[], z0: number, y = 0, radial = 64): Geometry {
  return lathe(prof, radial).rotateX(-Math.PI / 2).translate(0, y, z0);
}

/** Lathe profile along +x: points (radius, distance along +x from x0). */
export function latheX(prof: P2[], x0: number, y: number, z: number, radial = 48): Geometry {
  return lathe(prof, radial).rotateZ(-Math.PI / 2).translate(x0, y, z);
}

/**
 * Pan-head / button-head screw or pin end facing ±x: domed cap with a slot or hex socket.
 * `dir` = +1 for a head on the right side (facing +x), −1 for the left side.
 */
export function screwHeadX(r: number, x: number, y: number, z: number, dir: 1 | -1, kind: 'slot' | 'hex' | 'dome' = 'hex', radial = 40): Geometry {
  const h = r * 0.55;
  // domed cap: a real arc (6 steps) from the rim to the crown, 0.1 mm chamfer at the rim
  const prof: P2[] = [[0, 0], [r, 0], [r, h * 0.45]];
  for (let k = 1; k <= 6; k++) { const a = (k / 6) * (Math.PI / 2); prof.push([r * Math.cos(a) * 0.98 + r * 0.02 * (1 - k / 6), h * 0.45 + h * 0.55 * Math.sin(a)]); }
  prof.push([0, h]);
  let g = lathe(prof, radial, 40);
  if (kind === 'hex') {
    const s = r * 0.5, d = h * 0.6;
    const hex: P2[] = Array.from({ length: 6 }, (_, i) => [Math.cos((i / 6) * Math.PI * 2) * s, Math.sin((i / 6) * Math.PI * 2) * s]);
    g = Geometry.merge([g, extrude(hex, d, {}).rotateX(-Math.PI / 2).translate(0, h - d / 2 + 0.00002, 0).flipWinding()]);
  } else if (kind === 'slot') {
    g = Geometry.merge([g, extrude([[-r * 0.8, -r * 0.12], [r * 0.8, -r * 0.12], [r * 0.8, r * 0.12], [-r * 0.8, r * 0.12]], h * 0.5, {}).rotateX(-Math.PI / 2).translate(0, h - h * 0.25 + 0.00002, 0).flipWinding()]);
  }
  return g.rotateZ(dir > 0 ? -Math.PI / 2 : Math.PI / 2).translate(x, y, z);
}

// ---------------------------------------------------------------------------------------------- profiles
/** 2D cross-section with per-point smoothness (true = tangent-continuous: share normals with neighbours). */
export interface Profile { pts: P2[]; smooth: boolean[]; /** optional exact outward 2D normals (arcs), null for crisp points */ nrm?: (P2 | null)[] }

/** Fluent builder for cross-sections: straight points are crisp, arcs are smooth fillets. CCW in (x, y). */
export class Prof {
  pts: P2[] = [];
  smooth: boolean[] = [];
  nrm: (P2 | null)[] = [];
  pt(x: number, y: number, smooth = false, nrm: P2 | null = null): this { this.pts.push([x, y]); this.smooth.push(smooth); this.nrm.push(nrm); return this; }
  /**
   * Fillet arc around (cx, cy) from angle a0 to a1 (rad) with n segments; endpoints are tangent-continuous and every
   * point carries its exact radial normal (CCW arcs are convex, CW arcs concave, for a CCW profile).
   */
  arc(cx: number, cy: number, r: number, a0: number, a1: number, n = 6): this {
    const sgn = a1 >= a0 ? 1 : -1;
    for (let k = 0; k <= n; k++) { const a = a0 + ((a1 - a0) * k) / n; this.pt(cx + Math.cos(a) * r, cy + Math.sin(a) * r, true, [Math.cos(a) * sgn, Math.sin(a) * sgn]); }
    return this;
  }
  /**
   * Fillet of radius r at the corner (cx, cy) between the incoming unit direction `inDir` and the outgoing
   * `outDir` (CCW profile): replaces the crisp corner point with a tangent arc.
   */
  corner(cx: number, cy: number, inDir: P2, outDir: P2, r: number, n = 4): this {
    const cross = inDir[0] * outDir[1] - inDir[1] * outDir[0], dot = inDir[0] * outDir[0] + inDir[1] * outDir[1];
    const phi = Math.atan2(Math.abs(cross), dot);
    if (phi < 0.02 || r <= 0) return this.pt(cx, cy, phi < 0.02);
    const t = r * Math.tan(phi / 2);
    const p0: P2 = [cx - inDir[0] * t, cy - inDir[1] * t];
    const convex = cross > 0;
    const nl: P2 = convex ? [-inDir[1], inDir[0]] : [inDir[1], -inDir[0]];
    const ctr: P2 = [p0[0] + nl[0] * r, p0[1] + nl[1] * r];
    const a0 = Math.atan2(p0[1] - ctr[1], p0[0] - ctr[0]);
    return this.arc(ctr[0], ctr[1], r, a0, a0 + (convex ? phi : -phi), n);
  }
  /** Append another profile's points. */
  append(p: Profile): this { this.pts.push(...p.pts); this.smooth.push(...p.smooth); this.nrm.push(...(p.nrm ?? p.pts.map(() => null))); return this; }
  done(): Profile { return { pts: this.pts, smooth: this.smooth, nrm: this.nrm }; }
}

/** Rounded rectangle centred on (cx, cy), width w, height h, corner radius r (n segments per corner). CCW. */
export function rrect(w: number, h: number, r: number, n = 6, cx = 0, cy = 0): Profile {
  const p = new Prof();
  const rr = Math.min(r, w / 2 - 1e-6, h / 2 - 1e-6);
  const x0 = cx - w / 2 + rr, x1 = cx + w / 2 - rr, y0 = cy - h / 2 + rr, y1 = cy + h / 2 - rr;
  p.arc(x1, y0, rr, -Math.PI / 2, 0, n).arc(x1, y1, rr, 0, Math.PI / 2, n).arc(x0, y1, rr, Math.PI / 2, Math.PI, n).arc(x0, y0, rr, Math.PI, Math.PI * 1.5, n);
  return p.done();
}

/** Rectangle with 45° chamfers of size c on the top corners and small fillets rf elsewhere. CCW. */
export function chamferTopRect(w: number, y0: number, y1: number, c: number, rf = 0.0005, n = 4): Profile {
  const p = new Prof();
  const hw = w / 2;
  p.arc(hw - rf, y0 + rf, rf, -Math.PI / 2, 0, n);                   // bottom right
  p.pt(hw, y1 - c);                                                  // right wall top → chamfer
  p.pt(hw - c, y1);
  p.pt(-hw + c, y1);
  p.pt(-hw, y1 - c);
  p.arc(-hw + rf, y0 + rf, rf, Math.PI, Math.PI * 1.5, n);            // bottom left
  return p.done();
}

/** Circle profile (all smooth). */
export function circleProf(r: number, n = 64, cx = 0, cy = 0, a0 = 0): Profile {
  const p = new Prof();
  for (let i = 0; i < n; i++) { const a = a0 + (i / n) * Math.PI * 2; p.pt(cx + Math.cos(a) * r, cy + Math.sin(a) * r, true, [Math.cos(a), Math.sin(a)]); }
  return p.done();
}

/** Scale a profile about (cx, cy). */
export function scaleProf(p: Profile, sx: number, sy = sx, cx = 0, cy = 0): Profile {
  // normals survive uniform scaling; non-uniform scaling falls back to geometric normals
  return { pts: p.pts.map(([x, y]) => [cx + (x - cx) * sx, cy + (y - cy) * sy] as P2), smooth: p.smooth.slice(), nrm: Math.abs(sx - sy) < 1e-9 ? p.nrm?.slice() : undefined };
}
export function offsetProf(p: Profile, dx: number, dy: number): Profile {
  return { pts: p.pts.map(([x, y]) => [x + dx, y + dy] as P2), smooth: p.smooth.slice(), nrm: p.nrm?.slice() };
}
/** Mirror in x (keeps CCW winding by reversing). */
export function mirrorProf(p: Profile): Profile {
  const n = p.pts.length;
  return { pts: p.pts.map(([x, y]) => [-x, y] as P2).reverse(), smooth: Array.from({ length: n }, (_, i) => p.smooth[n - 1 - i]), nrm: p.nrm ? Array.from({ length: n }, (_, i) => { const q = p.nrm![n - 1 - i]; return q ? [-q[0], q[1]] as P2 : null; }) : undefined };
}
/** Linear blend of two profiles with the same point count (geometric normals). */
export function lerpProf(a: Profile, b: Profile, t: number): Profile {
  return { pts: a.pts.map(([x, y], i) => [x + (b.pts[i][0] - x) * t, y + (b.pts[i][1] - y) * t] as P2), smooth: a.smooth.slice() };
}


/**
 * Fillet every corner of a closed polygon with a tangent arc (true machined/moulded fillets, not chamfers).
 * `r` is one radius or one per corner (0 = keep the corner crisp); radii are clamped so the arcs fit the
 * adjacent edges. Output is CCW with exact normals on the arcs, so lofts shade them perfectly smooth.
 */
export function filletPoly(pts: P2[], r: number | number[], n = 6): Profile {
  let q = pts.slice();
  let area = 0;
  for (let i = 0, j = q.length - 1; i < q.length; j = i++) area += (q[j][0] - q[i][0]) * (q[j][1] + q[i][1]);
  let radii = Array.isArray(r) ? r.slice() : q.map(() => r);
  if (area < 0) { q = q.reverse(); radii = radii.reverse(); }   // normalise to CCW (positive area in this convention)
  const N = q.length;
  const p = new Prof();
  for (let i = 0; i < N; i++) {
    const a = q[(i + N - 1) % N], c = q[i], b = q[(i + 1) % N];
    let d1x = c[0] - a[0], d1y = c[1] - a[1], d2x = b[0] - c[0], d2y = b[1] - c[1];
    const l1 = Math.hypot(d1x, d1y) || 1, l2 = Math.hypot(d2x, d2y) || 1;
    d1x /= l1; d1y /= l1; d2x /= l2; d2y /= l2;
    const cross = d1x * d2y - d1y * d2x, dot = d1x * d2x + d1y * d2y;
    const phi = Math.atan2(Math.abs(cross), dot);                  // turning angle 0..π
    const ri = radii[i] ?? 0;
    if (ri <= 0 || phi < 0.02 || phi > Math.PI - 0.02) { p.pt(c[0], c[1], phi < 0.02); continue; }
    let t = ri * Math.tan(phi / 2);
    const tMax = 0.49 * Math.min(l1, l2);
    const rr = t > tMax ? (t = tMax) / Math.tan(phi / 2) : ri;
    const p0: P2 = [c[0] - d1x * t, c[1] - d1y * t];
    const convex = cross > 0;                                       // left turn on a CCW polygon
    const nl: P2 = convex ? [-d1y, d1x] : [d1y, -d1x];
    const ctr: P2 = [p0[0] + nl[0] * rr, p0[1] + nl[1] * rr];
    const a0 = Math.atan2(p0[1] - ctr[1], p0[0] - ctr[0]);
    const a1 = a0 + (convex ? phi : -phi);
    p.arc(ctr[0], ctr[1], rr, a0, a1, n);
  }
  return p.done();
}

/** Offset a profile inwards by `d` (negative = outwards): exact normals on arcs, mitred corners elsewhere. */
export function insetProfile(p: Profile, d: number): Profile {
  const N = p.pts.length;
  const out: P2[] = [];
  for (let i = 0; i < N; i++) {
    const ex = p.nrm?.[i];
    let nx: number, ny: number;
    if (ex) { nx = ex[0]; ny = ex[1]; }
    else {
      const a = p.pts[(i + N - 1) % N], c = p.pts[i], b = p.pts[(i + 1) % N];
      let e1x = c[0] - a[0], e1y = c[1] - a[1], e2x = b[0] - c[0], e2y = b[1] - c[1];
      const l1 = Math.hypot(e1x, e1y) || 1, l2 = Math.hypot(e2x, e2y) || 1;
      e1x /= l1; e1y /= l1; e2x /= l2; e2y /= l2;
      const n1x = e1y, n1y = -e1x, n2x = e2y, n2y = -e2x;             // right-hand normals = outward for CCW
      nx = n1x + n2x; ny = n1y + n2y;
      const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l;
      const cosHalf = Math.max(0.35, nx * n1x + ny * n1y);
      nx /= cosHalf; ny /= cosHalf;
    }
    out.push([p.pts[i][0] - nx * d, p.pts[i][1] - ny * d]);
  }
  return { pts: out, smooth: p.smooth.slice(), nrm: p.nrm?.slice() };
}

/**
 * Smooth-shaded slab: a profile in (x, y) lofted along z over `depth` (centred on z = 0) with a quarter-round
 * fillet of radius `bevel` on both faces (n segments). Unlike `extrude`, every arc in the profile and the fillet
 * across the depth share normals, so a filleted block reads as one machined/moulded body with no facets.
 */
export function slab(prof: Profile, depth: number, bevel = 0.0015, n = 4, opts: { uvStack?: boolean; capStart?: boolean; capEnd?: boolean } = {}): Geometry {
  const hd = depth / 2, b = Math.min(bevel, hd * 0.95);
  const st: Station[] = [];
  const ring = (k: number): { inset: number; dz: number } => { const a = (k / n) * (Math.PI / 2); return { inset: b * (1 - Math.sin(a)), dz: b * (1 - Math.cos(a)) }; };
  const at = (inset: number) => (inset > 1e-9 ? insetProfile(prof, inset) : prof);
  if (b > 1e-9) {
    for (let k = 0; k <= n; k++) { const r = ring(k); st.push({ z: -hd + r.dz, prof: at(r.inset), smooth: k > 0 }); }
    for (let k = n; k >= 0; k--) { const r = ring(k); st.push({ z: hd - r.dz, prof: at(r.inset), smooth: true }); }
  } else st.push({ z: -hd, prof }, { z: hd, prof });
  return loft(st, { capUV: opts.uvStack === false ? 'planar' : 'stack', capStart: opts.capStart, capEnd: opts.capEnd });
}

/** Side-profile slab (forward a, up y) across the width: like `side` but filleted and smooth. a → −z, width along x. */
export function plate(prof: Profile, width: number, bevel = 0.0015, n = 4, opts: { uvStack?: boolean } = {}): Geometry {
  return slab(prof, width, bevel, n, opts).rotateY(Math.PI / 2);
}

export type V3 = [number, number, number];
/** Fillet the corners of a 3D polyline with circular arcs (for swept bars: trigger guards, levers, loops). */
export function roundedPath(pts: V3[], r: number | number[], n = 8): V3[] {
  const out: V3[] = [pts[0]];
  for (let i = 1; i < pts.length - 1; i++) {
    const a = pts[i - 1], c = pts[i], b = pts[i + 1];
    const d1 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]], d2 = [b[0] - c[0], b[1] - c[1], b[2] - c[2]];
    const l1 = Math.hypot(...d1) || 1, l2 = Math.hypot(...d2) || 1;
    for (let k = 0; k < 3; k++) { d1[k] /= l1; d2[k] /= l2; }
    const dot = Math.max(-1, Math.min(1, d1[0] * d2[0] + d1[1] * d2[1] + d1[2] * d2[2]));
    const phi = Math.acos(dot);
    const ri = Array.isArray(r) ? r[i] : r;
    if (phi < 0.02 || ri <= 0) { out.push(c); continue; }
    let t = ri * Math.tan(phi / 2);
    const tMax = 0.49 * Math.min(l1, l2);
    const rr = t > tMax ? (t = tMax) / Math.tan(phi / 2) : ri;
    const p0: V3 = [c[0] - d1[0] * t, c[1] - d1[1] * t, c[2] - d1[2] * t];
    // in-plane normal of d1 pointing towards d2's side: the arc centre lies along it
    let bx = d2[0] - d1[0] * dot, by = d2[1] - d1[1] * dot, bz = d2[2] - d1[2] * dot;
    const bl = Math.hypot(bx, by, bz) || 1; bx /= bl; by /= bl; bz /= bl;
    const ctr: V3 = [p0[0] + bx * rr, p0[1] + by * rr, p0[2] + bz * rr];
    // arc from p0 rotating towards p1 in the plane (d1, bisector)
    const u: V3 = [p0[0] - ctr[0], p0[1] - ctr[1], p0[2] - ctr[2]];       // radius vector (length rr)
    const v: V3 = [d1[0] * rr, d1[1] * rr, d1[2] * rr];                   // tangent at p0 scaled to rr
    for (let k = 0; k <= n; k++) {
      const th = (k / n) * phi, ca = Math.cos(th), sa = Math.sin(th);
      out.push([ctr[0] + u[0] * ca + v[0] * sa, ctr[1] + u[1] * ca + v[1] * sa, ctr[2] + u[2] * ca + v[2] * sa]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

/**
 * Rounded bar swept along a path in the weapon's side plane (x = 0): `thick` along the in-plane normal,
 * `wide` across x, with fillet radius `r` on the section. Trigger guards, bows, loops.
 */
export function bar(path: V3[], thick: number, wide: number, r: number, n = 6, scale?: (t: number) => [number, number], opts: LoftOptions = {}): Geometry {
  const prof = rrect(thick, wide, Math.min(r, thick / 2 - 1e-5, wide / 2 - 1e-5), n);
  return sweep(prof, path, [1, 0, 0], scale ?? (() => [1, 1]), { capStart: true, capEnd: true, ...opts });
}

/** Cross pin along x with chamfered ends (centred on x). */
export function pinX(r: number, length: number, x: number, y: number, z: number, radial = 32, chamfer = 0.00025): Geometry {
  const c = Math.min(chamfer, r * 0.5, length * 0.25);
  return latheX([[0, 0], [r - c, 0], [r, c], [r, length - c], [r - c, length], [0, length]], x - length / 2, y, z, radial);
}

// ---------------------------------------------------------------------------------------------- loft
export interface Station {
  z: number;
  prof: Profile;
  /** Tangent-continuous transition from the previous station (curved sweeps); default crisp (machined steps). */
  smooth?: boolean;
  /** Shear along z proportional to (y − shearY0): raked serrations. */
  shear?: number;
  shearY0?: number;
  /** Shear along z proportional to (x − shearX0). */
  shearX?: number;
  shearX0?: number;
}
export interface LoftOptions {
  capStart?: boolean; capEnd?: boolean; /** UV v offset (m) */ v0?: number;
  /** Cap UVs: 'planar' (x, y in metres, overlaps the body: tiled materials) or 'stack' (laid out after the body in v: unique, bakeable). */
  capUV?: 'planar' | 'stack';
}

/**
 * Sweep profiles along z. Stations must be monotone in z (either direction); equal-z neighbours form walls.
 * Normals: per-quad geometric normals, averaged across smooth profile points and smooth station transitions.
 * UVs: u = profile arc length (m), v = z distance (m).
 */
export function loft(stations: Station[], opts: LoftOptions = {}): Geometry {
  if (stations.length < 2) throw new Error('loft needs ≥ 2 stations');
  // normalise to CCW profiles (signed area of the first station)
  let area = 0;
  { const q = stations[0].prof.pts; for (let i = 0, j = q.length - 1; i < q.length; j = i++) area += (q[j][0] - q[i][0]) * (q[j][1] + q[i][1]); }
  if (area < 0) stations = stations.map((st) => ({ ...st, prof: { pts: [...st.prof.pts].reverse(), smooth: [...st.prof.smooth].reverse(), nrm: st.prof.nrm ? [...st.prof.nrm].reverse().map((q) => (q ? [-q[0], -q[1]] as P2 : null)) : undefined } }));
  const S = stations.length;
  const N = stations[0].prof.pts.length;
  for (const st of stations) if (st.prof.pts.length !== N) throw new Error(`loft: profile point count mismatch (${st.prof.pts.length} vs ${N})`);
  const dirSign = stations[S - 1].z >= stations[0].z ? 1 : -1;
  // 3D positions per station/point
  const pos = (j: number, i: number): [number, number, number] => {
    const st = stations[j], [x, y] = st.prof.pts[i];
    let z = st.z;
    if (st.shear) z += st.shear * (y - (st.shearY0 ?? 0));
    if (st.shearX) z += st.shearX * (x - (st.shearX0 ?? 0));
    return [x, y, z];
  };
  // quad normals Q[j][i] for the quad between stations j, j+1 along segment i
  const Q: Float64Array[] = [];
  for (let j = 0; j < S - 1; j++) {
    const q = new Float64Array(N * 3);
    for (let i = 0; i < N; i++) {
      const i1 = (i + 1) % N;
      const a = pos(j, i), b = pos(j, i1), c = pos(j + 1, i1), d = pos(j + 1, i);
      // Newell normal of the quad a-b-c-d (robust for degenerate/non-planar)
      const vs = [a, b, c, d];
      let nx = 0, ny = 0, nz = 0;
      for (let k = 0; k < 4; k++) {
        const p = vs[k], n = vs[(k + 1) % 4];
        nx += (p[1] - n[1]) * (p[2] + n[2]);
        ny += (p[2] - n[2]) * (p[0] + n[0]);
        nz += (p[0] - n[0]) * (p[1] + n[1]);
      }
      const l = Math.hypot(nx, ny, nz);
      if (l > 1e-14) { q[i * 3] = (nx / l) * dirSign; q[i * 3 + 1] = (ny / l) * dirSign; q[i * 3 + 2] = (nz / l) * dirSign; }
    }
    Q.push(q);
  }
  const P: number[] = [], Nn: number[] = [], UV: number[] = [], IX: number[] = [];
  const vtx = (p: [number, number, number], n: [number, number, number], u: number, v: number) => { P.push(p[0], p[1], p[2]); Nn.push(n[0], n[1], n[2]); UV.push(u, v); return P.length / 3 - 1; };
  // vertex normal at (pair j, station end e∈{0,1}, point i, as endpoint of segment seg∈{i (start), i-1 (end)})
  const normalAt = (j: number, e: 0 | 1, i: number, segIdx: number, smoothPt: boolean): [number, number, number] => {
    // exact 2D normal (arcs): rotate into 3D and make it orthogonal to the sweep direction at this point
    const ex = stations[j + e].prof.nrm?.[i];
    if (ex) {
      const a = pos(j, i), b = pos(j + 1, i);
      let dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2];
      const jj = e === 0 ? j - 1 : j + 1;
      if (((e === 0 && stations[j].smooth) || (e === 1 && stations[j + 1]?.smooth)) && jj >= 0 && jj < S - 1) {
        const a2 = pos(jj, i), b2 = pos(jj + 1, i);
        dx += b2[0] - a2[0]; dy += b2[1] - a2[1]; dz += b2[2] - a2[2];
      }
      const dl = Math.hypot(dx, dy, dz);
      let nx = ex[0], ny = ex[1], nz = 0;
      if (dl > 1e-12) { dx /= dl; dy /= dl; dz /= dl; const d = nx * dx + ny * dy; nx -= dx * d; ny -= dy * d; nz -= dz * d; }
      const l = Math.hypot(nx, ny, nz) || 1;
      return [nx / l, ny / l, nz / l];
    }
    let nx = 0, ny = 0, nz = 0;
    const addQ = (jj: number, ii: number) => { if (jj < 0 || jj >= S - 1) return; const q = Q[jj]; nx += q[ii * 3]; ny += q[ii * 3 + 1]; nz += q[ii * 3 + 2]; };
    const pairs: number[] = [j];
    if (e === 0 && stations[j].smooth) pairs.push(j - 1);
    if (e === 1 && stations[j + 1]?.smooth) pairs.push(j + 1);
    for (const jj of pairs) {
      addQ(jj, segIdx);
      if (smoothPt) addQ(jj, segIdx === i ? (i + N - 1) % N : i); // the point's other segment (i−1 for a start point, i for an end point)
    }
    const l = Math.hypot(nx, ny, nz);
    if (l < 1e-9) { const q = Q[j]; const l2 = Math.hypot(q[segIdx * 3], q[segIdx * 3 + 1], q[segIdx * 3 + 2]) || 1; return [q[segIdx * 3] / l2, q[segIdx * 3 + 1] / l2, q[segIdx * 3 + 2] / l2]; }
    return [nx / l, ny / l, nz / l];
  };
  // arc-length u per point of the first station (same for all; profiles are morphs of one another)
  const uAt = new Float64Array(N + 1);
  for (let i = 0; i < N; i++) { const a = stations[0].prof.pts[i], b = stations[0].prof.pts[(i + 1) % N]; uAt[i + 1] = uAt[i] + Math.hypot(b[0] - a[0], b[1] - a[1]); }
  let v = opts.v0 ?? 0;
  for (let j = 0; j < S - 1; j++) {
    const st0 = stations[j], st1 = stations[j + 1];
    // walls between equal-z stations still get texture space: v advances by the mean in-plane displacement
    let disp = 0;
    for (let i = 0; i < N; i++) disp += Math.hypot(st1.prof.pts[i][0] - st0.prof.pts[i][0], st1.prof.pts[i][1] - st0.prof.pts[i][1]);
    const dv = Math.max(Math.abs(st1.z - st0.z), disp / N);
    for (let i = 0; i < N; i++) {
      const i1 = (i + 1) % N;
      const q = Q[j];
      if (q[i * 3] === 0 && q[i * 3 + 1] === 0 && q[i * 3 + 2] === 0) continue; // degenerate
      const sm0 = st0.prof.smooth[i], sm1 = st0.prof.smooth[i1];
      const a = vtx(pos(j, i), normalAt(j, 0, i, i, sm0), uAt[i], v);
      const b = vtx(pos(j, i1), normalAt(j, 0, i1, i, sm1), uAt[i + 1], v);
      const c = vtx(pos(j + 1, i1), normalAt(j, 1, i1, i, sm1), uAt[i + 1], v + dv);
      const d = vtx(pos(j + 1, i), normalAt(j, 1, i, i, sm0), uAt[i], v + dv);
      if (dirSign > 0) IX.push(a, b, c, a, c, d); else IX.push(a, c, b, a, d, c);
    }
    v += dv;
  }
  // caps
  const stack = opts.capUV === 'stack';
  let capV = v + 0.002;
  const cap = (j: number, nz: number) => {
    const pts = stations[j].prof.pts;
    const tris = triangulate(pts);
    const base = P.length / 3;
    let x0 = Infinity, y0 = Infinity, y1 = -Infinity;
    for (const q of pts) { x0 = Math.min(x0, q[0]); y0 = Math.min(y0, q[1]); y1 = Math.max(y1, q[1]); }
    for (let i = 0; i < N; i++) vtx(pos(j, i), [0, 0, nz], stack ? pts[i][0] - x0 : pts[i][0], stack ? capV + pts[i][1] - y0 : pts[i][1]);
    if (stack) capV += y1 - y0 + 0.002;
    for (let t = 0; t < tris.length; t += 3) {
      if (nz > 0) IX.push(base + tris[t], base + tris[t + 1], base + tris[t + 2]);
      else IX.push(base + tris[t], base + tris[t + 2], base + tris[t + 1]);
    }
  };
  if (opts.capStart !== false) cap(0, -dirSign);
  if (opts.capEnd !== false) cap(S - 1, dirSign);
  return new Geometry(P, Nn, UV, IX);
}

/** Straight prism of one profile from z0 to z1 (capped). */
export function prism(prof: Profile, z0: number, z1: number, opts: LoftOptions = {}): Geometry {
  return loft([{ z: z0, prof }, { z: z1, prof }], opts);
}

/**
 * Grooved sweep: `full` profile along [z0, z1] with `recess` profile cut in over each groove span.
 * Grooves are [zStart, zEnd] pairs (any order); `shear` rakes the groove walls (z += shear·(y − shearY0)).
 */
export function groovedLoft(full: Profile, recess: Profile, z0: number, z1: number, grooves: [number, number][], shear = 0, shearY0 = 0, opts: LoftOptions = {}): Geometry {
  const dir = z1 >= z0 ? 1 : -1;
  const gs = grooves.map(([a, b]) => (dir > 0 ? [Math.min(a, b), Math.max(a, b)] : [Math.max(a, b), Math.min(a, b)]) as [number, number]).sort((a, b) => (a[0] - b[0]) * dir);
  const st: Station[] = [{ z: z0, prof: full }];
  for (const [ga, gb] of gs) {
    st.push({ z: ga, prof: full, shear, shearY0 }, { z: ga, prof: recess, shear, shearY0 }, { z: gb, prof: recess, shear, shearY0 }, { z: gb, prof: full, shear, shearY0 });
  }
  st.push({ z: z1, prof: full });
  return loft(st, opts);
}

/**
 * Sweep a profile along an arbitrary 3D polyline (centre path) with per-station scale; the profile's local
 * +y maps to `up`. Used for curved magazines and grips. Normals are smooth along the path.
 */
export function sweep(prof: Profile, path: [number, number, number][], up: [number, number, number] = [0, 0, -1], scale: (t: number) => [number, number] = () => [1, 1], opts: LoftOptions = {}): Geometry {
  // build a straight loft along z, then bend it: simplest robust approach is to emit a loft in "path space"
  // where z = arc length, then displace each vertex into the frame at its arc length.
  const n = path.length;
  const arc: number[] = [0];
  for (let i = 1; i < n; i++) arc.push(arc[i - 1] + Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1], path[i][2] - path[i - 1][2]));
  const total = arc[n - 1];
  const stations: Station[] = path.map((_, i) => { const [sx, sy] = scale(arc[i] / total); return { z: arc[i], prof: scaleProf(prof, sx, sy), smooth: i > 0 }; });
  const g = loft(stations, opts);
  // frames
  const frames = path.map((p, i) => {
    const a = path[Math.max(0, i - 1)], b = path[Math.min(n - 1, i + 1)];
    let t = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const tl = Math.hypot(t[0], t[1], t[2]) || 1; t = t.map((v) => v / tl);
    let u = up;
    const d = u[0] * t[0] + u[1] * t[1] + u[2] * t[2];
    let yv = [u[0] - t[0] * d, u[1] - t[1] * d, u[2] - t[2] * d];
    const yl = Math.hypot(yv[0], yv[1], yv[2]) || 1; yv = yv.map((v) => v / yl);
    const xv = [yv[1] * t[2] - yv[2] * t[1], yv[2] * t[0] - yv[0] * t[2], yv[0] * t[1] - yv[1] * t[0]];
    return { p, t, x: xv, y: yv };
  });
  const place = (x: number, y: number, s: number): [number, number, number] => {
    let i = 0;
    while (i < n - 2 && arc[i + 1] < s - 1e-9) i++;
    const f0 = frames[i], f1 = frames[Math.min(n - 1, i + 1)];
    const seg = arc[i + 1] - arc[i] || 1;
    const k = Math.max(0, Math.min(1, (s - arc[i]) / seg));
    const lerp = (a: number[], b: number[]) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
    const p = lerp(f0.p, f1.p), xv = lerp(f0.x, f1.x), yv = lerp(f0.y, f1.y);
    return [p[0] + xv[0] * x + yv[0] * y, p[1] + xv[1] * x + yv[1] * y, p[2] + xv[2] * x + yv[2] * y];
  };
  const frameAt = (s: number) => {
    let i = 0;
    while (i < n - 2 && arc[i + 1] < s - 1e-9) i++;
    const f0 = frames[i], f1 = frames[Math.min(n - 1, i + 1)];
    const seg = arc[i + 1] - arc[i] || 1;
    const k = Math.max(0, Math.min(1, (s - arc[i]) / seg));
    const lerp = (a: number[], b: number[]) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
    return { x: lerp(f0.x, f1.x), y: lerp(f0.y, f1.y), t: lerp(f0.t, f1.t) };
  };
  const P = g.positions, Nn = g.normals;
  for (let i = 0; i < P.length; i += 3) {
    const f = frameAt(P[i + 2]);
    const q = place(P[i], P[i + 1], P[i + 2]);
    // rotate the loft-space normal into the path frame (keeps the analytic smooth/crease normals)
    const nx = Nn[i], ny = Nn[i + 1], nz = Nn[i + 2];
    const wx = f.x[0] * nx + f.y[0] * ny + f.t[0] * nz, wy = f.x[1] * nx + f.y[1] * ny + f.t[1] * nz, wz = f.x[2] * nx + f.y[2] * ny + f.t[2] * nz;
    const l = Math.hypot(wx, wy, wz) || 1;
    P[i] = q[0]; P[i + 1] = q[1]; P[i + 2] = q[2];
    Nn[i] = wx / l; Nn[i + 1] = wy / l; Nn[i + 2] = wz / l;
  }
  return g;
}

/** Repeat a geometry n times along z with the given pitch (merged). */
export function repeatZ(g: Geometry, n: number, pitch: number, z0 = 0): Geometry {
  const list: Geometry[] = [];
  for (let i = 0; i < n; i++) list.push(g.clone().translate(0, 0, z0 + i * pitch));
  return Geometry.merge(list);
}

/** Mirror a geometry in x (fixes winding). */
export function mirrorX(g: Geometry): Geometry { return g.clone().scale(-1, 1, 1); }

// ---------------------------------------------------------------------------------------------- parts
export interface PartFlags { magazine?: boolean; bolt?: boolean; trigger?: boolean; selector?: boolean; charge?: boolean; /** the top cartridge in the magazine: hidden when the magazine is empty */ round?: boolean }

export interface FinishOptions {
  /**
   * Bake each sizeable bucket's tiled material into a unique atlas with ray-cast ambient occlusion (see bake.ts).
   * Buckets whose material has no maps (plain colours), alpha-masked decals and tiny parts keep their material.
   */
  bake?: boolean | BakeOptions;
  /** Minimum triangle count for a bucket to be baked (default 400). */
  bakeMinTriangles?: number;
}

/**
 * Collects geometry per (material, animation flags) and merges each bucket into one draw call.
 * Animated groups (slide/bolt, magazine, trigger, selector, charging handle) stay separate so the Firearm can move them.
 */
export class PartBuilder {
  private buckets = new Map<string, { m: Material; geoms: Geometry[]; flags: PartFlags }>();
  /** Triangles added so far (budget tracking). */
  triangles = 0;
  /** Bake statistics after finish(). */
  bakes: { material: string; texSize: [number, number]; texelMm: number; ms: number }[] = [];
  constructor(private renderer: Renderer) {}

  add(g: Geometry, m: Material, flags: PartFlags = {}) {
    const key = `${m.id}|${flags.magazine ? 1 : 0}${flags.bolt ? 1 : 0}${flags.trigger ? 1 : 0}${flags.selector ? 1 : 0}${flags.charge ? 1 : 0}${flags.round ? 1 : 0}`;
    const b = this.buckets.get(key) ?? { m, geoms: [], flags };
    b.geoms.push(g.tangents ? g : g.computeTangents());
    this.triangles += g.triangleCount;
    this.buckets.set(key, b);
    return this;
  }

  finish(opts: FinishOptions = {}): FirearmModel['parts'] {
    const parts: FirearmModel['parts'] = [];
    const bakeOpts: BakeOptions | null = opts.bake ? (typeof opts.bake === 'object' ? opts.bake : {}) : null;
    let occ: OccluderGrid | null = null, occKey = '';
    if (bakeOpts) {
      const occluders: Geometry[] = [];
      for (const b of this.buckets.values()) if (b.m.alphaMode === 'opaque') occluders.push(...b.geoms);
      occ = new OccluderGrid(occluders);
      occKey = `${occ.triangleCount}`;
    }
    const minTris = opts.bakeMinTriangles ?? 400;
    for (const b of this.buckets.values()) {
      let m = b.m;
      const bakeable = !!(occ && bakeOpts && m.alphaMode === 'opaque' && m.baseColorMap && b.geoms.reduce((n, g) => n + g.triangleCount, 0) >= minTris);
      const layout = bakeable ? layoutAtlas(b.geoms, bakeOpts!) : null;
      const mesh = new Mesh(this.renderer.dev, Geometry.merge(b.geoms), { label: m.name, keepSource: true });
      if (layout) {
        try {
          const r = bakeBucket(this.renderer, mesh, layout, m, occ!, occKey, bakeOpts!);
          if (r) { m = r.material; this.bakes.push({ material: b.m.name, texSize: r.texSize, texelMm: r.texelM * 1000, ms: r.ms }); }
        } catch (e) { console.warn(`[oaxis] bake failed for ${m.name}:`, e); }
      }
      parts.push({ object: new RenderObject(mesh, m), local: mat4.create() as Mat4, ...b.flags });
    }
    return parts;
  }
}
