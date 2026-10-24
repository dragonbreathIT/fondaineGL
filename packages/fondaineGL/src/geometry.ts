// CPU-side geometry container + procedural builders. Units: metres. UVs on builders are in metres
// (1 uv unit = 1 m) unless noted, so materials tile at physical scale via Material.uvScale.

import { aabb, AABB, mat4, Mat4, vec3 } from './math';

export class Geometry {
  positions: Float32Array;
  normals: Float32Array;
  uvs: Float32Array;
  tangents: Float32Array | null = null;
  indices: Uint32Array;
  joints: Uint16Array | null = null;
  weights: Float32Array | null = null;

  constructor(positions: ArrayLike<number>, normals: ArrayLike<number>, uvs: ArrayLike<number>, indices: ArrayLike<number>) {
    this.positions = Float32Array.from(positions);
    this.normals = Float32Array.from(normals);
    this.uvs = Float32Array.from(uvs);
    this.indices = Uint32Array.from(indices);
  }

  get vertexCount() { return this.positions.length / 3; }
  get triangleCount() { return this.indices.length / 3; }

  clone(): Geometry {
    const g = new Geometry(this.positions, this.normals, this.uvs, this.indices);
    if (this.tangents) g.tangents = Float32Array.from(this.tangents);
    if (this.joints) g.joints = Uint16Array.from(this.joints);
    if (this.weights) g.weights = Float32Array.from(this.weights);
    return g;
  }

  bounds(): AABB { return aabb.fromPositions(this.positions); }

  /** Apply a transform in place (normals use the inverse-transpose). */
  transform(m: Mat4): this {
    const p = vec3.create(), n = vec3.create();
    const nm = mat4.invert(mat4.create(), m)!;
    mat4.transpose(nm, nm);
    for (let i = 0; i < this.positions.length; i += 3) {
      vec3.transformMat4(p, this.positions.subarray(i, i + 3), m);
      this.positions.set(p, i);
      vec3.transformDirMat4(n, this.normals.subarray(i, i + 3), nm);
      vec3.normalize(n, n);
      this.normals.set(n, i);
    }
    if (this.tangents) {
      const t = vec3.create();
      for (let i = 0; i < this.tangents.length; i += 4) {
        vec3.transformDirMat4(t, this.tangents.subarray(i, i + 3), m);
        vec3.normalize(t, t);
        this.tangents.set(t, i);
      }
    }
    // mirrored transforms flip winding
    const det = m[0] * (m[5] * m[10] - m[6] * m[9]) - m[4] * (m[1] * m[10] - m[2] * m[9]) + m[8] * (m[1] * m[6] - m[2] * m[5]);
    if (det < 0) this.flipWinding();
    return this;
  }

  translate(x: number, y: number, z: number): this { return this.transform(mat4.fromTranslation(mat4.create(), [x, y, z])); }
  rotateX(rad: number): this { const m = mat4.create(); m[5] = Math.cos(rad); m[6] = Math.sin(rad); m[9] = -Math.sin(rad); m[10] = Math.cos(rad); return this.transform(m); }
  rotateY(rad: number): this { const m = mat4.create(); m[0] = Math.cos(rad); m[2] = -Math.sin(rad); m[8] = Math.sin(rad); m[10] = Math.cos(rad); return this.transform(m); }
  rotateZ(rad: number): this { const m = mat4.create(); m[0] = Math.cos(rad); m[1] = Math.sin(rad); m[4] = -Math.sin(rad); m[5] = Math.cos(rad); return this.transform(m); }
  scale(x: number, y = x, z = x): this { return this.transform(mat4.fromScaling(mat4.create(), [x, y, z])); }

  flipWinding(): this {
    const ix = this.indices;
    for (let i = 0; i < ix.length; i += 3) { const t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; }
    return this;
  }

  scaleUVs(su: number, sv = su): this {
    for (let i = 0; i < this.uvs.length; i += 2) { this.uvs[i] *= su; this.uvs[i + 1] *= sv; }
    return this;
  }

  /** Displace vertices with a function (x,y,z) -> new position, then recompute smooth normals. */
  displace(fn: (p: [number, number, number]) => [number, number, number]): this {
    for (let i = 0; i < this.positions.length; i += 3) {
      const r = fn([this.positions[i], this.positions[i + 1], this.positions[i + 2]]);
      this.positions[i] = r[0]; this.positions[i + 1] = r[1]; this.positions[i + 2] = r[2];
    }
    return this.computeNormals();
  }

  /** Area-weighted smooth normals (vertices sharing an index share the normal). */
  computeNormals(): this {
    const n = new Float32Array(this.positions.length);
    const p = this.positions, ix = this.indices;
    for (let t = 0; t < ix.length; t += 3) {
      const a = ix[t] * 3, b = ix[t + 1] * 3, c = ix[t + 2] * 3;
      const e1x = p[b] - p[a], e1y = p[b + 1] - p[a + 1], e1z = p[b + 2] - p[a + 2];
      const e2x = p[c] - p[a], e2y = p[c + 1] - p[a + 1], e2z = p[c + 2] - p[a + 2];
      const nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x;
      for (const v of [a, b, c]) { n[v] += nx; n[v + 1] += ny; n[v + 2] += nz; }
    }
    for (let i = 0; i < n.length; i += 3) {
      const l = Math.hypot(n[i], n[i + 1], n[i + 2]) || 1;
      n[i] /= l; n[i + 1] /= l; n[i + 2] /= l;
    }
    this.normals = n;
    return this;
  }

  /** Per-vertex tangents (xyz + handedness w), Lengyel accumulation + Gram–Schmidt. */
  computeTangents(): this {
    this.tangents = computeTangents(this.positions, this.normals, this.uvs, this.indices);
    return this;
  }

  /** Duplicate vertices so every triangle is flat-shaded. */
  toFlat(): Geometry {
    const ix = this.indices;
    const pos = new Float32Array(ix.length * 3), uv = new Float32Array(ix.length * 2);
    for (let i = 0; i < ix.length; i++) {
      pos.set(this.positions.subarray(ix[i] * 3, ix[i] * 3 + 3), i * 3);
      uv.set(this.uvs.subarray(ix[i] * 2, ix[i] * 2 + 2), i * 2);
    }
    const g = new Geometry(pos, new Float32Array(pos.length), uv, Array.from({ length: ix.length }, (_, i) => i));
    return g.computeNormals();
  }

  static merge(list: Geometry[]): Geometry {
    let nv = 0, ni = 0;
    for (const g of list) { nv += g.vertexCount; ni += g.indices.length; }
    const pos = new Float32Array(nv * 3), nrm = new Float32Array(nv * 3), uv = new Float32Array(nv * 2), ix = new Uint32Array(ni);
    const anyTan = list.some((g) => g.tangents);
    const tan = anyTan ? new Float32Array(nv * 4) : null;
    let vo = 0, io = 0;
    for (const g of list) {
      pos.set(g.positions, vo * 3);
      nrm.set(g.normals, vo * 3);
      uv.set(g.uvs, vo * 2);
      if (tan && g.tangents) tan.set(g.tangents, vo * 4);
      for (let i = 0; i < g.indices.length; i++) ix[io + i] = g.indices[i] + vo;
      vo += g.vertexCount;
      io += g.indices.length;
    }
    const out = new Geometry(pos, nrm, uv, ix);
    out.tangents = tan;
    return out;
  }
}

export function computeTangents(pos: Float32Array, nrm: Float32Array, uv: Float32Array, ix: Uint32Array): Float32Array {
  const n = pos.length / 3;
  const tan1 = new Float32Array(n * 3), tan2 = new Float32Array(n * 3);
  for (let t = 0; t < ix.length; t += 3) {
    const i1 = ix[t], i2 = ix[t + 1], i3 = ix[t + 2];
    const x1 = pos[i2 * 3] - pos[i1 * 3], y1 = pos[i2 * 3 + 1] - pos[i1 * 3 + 1], z1 = pos[i2 * 3 + 2] - pos[i1 * 3 + 2];
    const x2 = pos[i3 * 3] - pos[i1 * 3], y2 = pos[i3 * 3 + 1] - pos[i1 * 3 + 1], z2 = pos[i3 * 3 + 2] - pos[i1 * 3 + 2];
    const s1 = uv[i2 * 2] - uv[i1 * 2], t1 = uv[i2 * 2 + 1] - uv[i1 * 2 + 1];
    const s2 = uv[i3 * 2] - uv[i1 * 2], t2 = uv[i3 * 2 + 1] - uv[i1 * 2 + 1];
    const d = s1 * t2 - s2 * t1;
    if (Math.abs(d) < 1e-12) continue;
    const r = 1 / d;
    const sx = (t2 * x1 - t1 * x2) * r, sy = (t2 * y1 - t1 * y2) * r, sz = (t2 * z1 - t1 * z2) * r;
    const tx = (s1 * x2 - s2 * x1) * r, ty = (s1 * y2 - s2 * y1) * r, tz = (s1 * z2 - s2 * z1) * r;
    for (const i of [i1, i2, i3]) {
      tan1[i * 3] += sx; tan1[i * 3 + 1] += sy; tan1[i * 3 + 2] += sz;
      tan2[i * 3] += tx; tan2[i * 3 + 1] += ty; tan2[i * 3 + 2] += tz;
    }
  }
  const out = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) {
    const nx = nrm[i * 3], ny = nrm[i * 3 + 1], nz = nrm[i * 3 + 2];
    let tx = tan1[i * 3], ty = tan1[i * 3 + 1], tz = tan1[i * 3 + 2];
    const dn = nx * tx + ny * ty + nz * tz;
    tx -= nx * dn; ty -= ny * dn; tz -= nz * dn;
    let l = Math.hypot(tx, ty, tz);
    if (l < 1e-8) {
      // degenerate UVs: any vector orthogonal to N
      const ax = Math.abs(nx) < 0.9 ? 1 : 0, ay = ax ? 0 : 1;
      tx = ay * nz - 0 * ny; ty = 0 * nx - ax * nz; tz = ax * ny - ay * nx;
      l = Math.hypot(tx, ty, tz) || 1;
    }
    tx /= l; ty /= l; tz /= l;
    const bx = ny * tz - nz * ty, by = nz * tx - nx * tz, bz = nx * ty - ny * tx;
    const w = bx * tan2[i * 3] + by * tan2[i * 3 + 1] + bz * tan2[i * 3 + 2] < 0 ? -1 : 1;
    out[i * 4] = tx; out[i * 4 + 1] = ty; out[i * 4 + 2] = tz; out[i * 4 + 3] = w;
  }
  return out;
}

// ------------------------------------------------------------------ builders
class Builder {
  pos: number[] = []; nrm: number[] = []; uv: number[] = []; ix: number[] = [];
  v(px: number, py: number, pz: number, nx: number, ny: number, nz: number, u: number, w: number): number {
    this.pos.push(px, py, pz); this.nrm.push(nx, ny, nz); this.uv.push(u, w);
    return this.pos.length / 3 - 1;
  }
  tri(a: number, b: number, c: number) { this.ix.push(a, b, c); }
  quad(a: number, b: number, c: number, d: number) { this.ix.push(a, b, c, a, c, d); }
  build(): Geometry { return new Geometry(this.pos, this.nrm, this.uv, this.ix); }
}

/** Axis-aligned box centred at origin; UVs in metres per face. */
export function box(w: number, h: number, d: number, segments = 1): Geometry {
  const b = new Builder();
  const hx = w / 2, hy = h / 2, hz = d / 2;
  const faces: [number[], number[], number[], number, number][] = [
    // normal, u axis, v axis, u size, v size
    [[1, 0, 0], [0, 0, -1], [0, 1, 0], d, h],
    [[-1, 0, 0], [0, 0, 1], [0, 1, 0], d, h],
    [[0, 1, 0], [1, 0, 0], [0, 0, -1], w, d],
    [[0, -1, 0], [1, 0, 0], [0, 0, 1], w, d],
    [[0, 0, 1], [1, 0, 0], [0, 1, 0], w, h],
    [[0, 0, -1], [-1, 0, 0], [0, 1, 0], w, h],
  ];
  const half = [hx, hy, hz];
  for (const [n, u, v, us, vs] of faces) {
    const base = b.pos.length / 3;
    for (let j = 0; j <= segments; j++) {
      for (let i = 0; i <= segments; i++) {
        const su = (i / segments - 0.5) * us, sv = (j / segments - 0.5) * vs;
        const px = n[0] * half[0] + u[0] * su + v[0] * sv;
        const py = n[1] * half[1] + u[1] * su + v[1] * sv;
        const pz = n[2] * half[2] + u[2] * su + v[2] * sv;
        b.v(px, py, pz, n[0], n[1], n[2], su + us / 2, sv + vs / 2);
      }
    }
    for (let j = 0; j < segments; j++) {
      for (let i = 0; i < segments; i++) {
        const a = base + j * (segments + 1) + i;
        b.quad(a, a + 1, a + segments + 2, a + segments + 1);
      }
    }
  }
  return b.build();
}

/** Box with rounded (filleted) edges and corners of `radius`. Smooth normals — catches highlights like real machined parts. */
export function roundedBox(w: number, h: number, d: number, radius: number, segments = 3): Geometry {
  const r = Math.min(radius, w / 2, h / 2, d / 2) * 0.999;
  // build a subdivided box with extra rows at the fillet boundaries, then project
  const g = box(w, h, d, 1);
  const inner = [w / 2 - r, h / 2 - r, d / 2 - r];
  const b = new Builder();
  // re-tessellate each face with fillet-aware grid
  const faces: [number[], number[], number[]][] = [
    [[1, 0, 0], [0, 0, -1], [0, 1, 0]],
    [[-1, 0, 0], [0, 0, 1], [0, 1, 0]],
    [[0, 1, 0], [1, 0, 0], [0, 0, -1]],
    [[0, -1, 0], [1, 0, 0], [0, 0, 1]],
    [[0, 0, 1], [1, 0, 0], [0, 1, 0]],
    [[0, 0, -1], [-1, 0, 0], [0, 1, 0]],
  ];
  const half = [w / 2, h / 2, d / 2];
  const axisIdx = (a: number[]) => (a[0] !== 0 ? 0 : a[1] !== 0 ? 1 : 2);
  for (const [n, u, v] of faces) {
    const ua = axisIdx(u), va = axisIdx(v), na = axisIdx(n);
    // coordinate stops along u and v: -half..-inner (fillet) .. inner..half
    const stops = (axis: number) => {
      const s: number[] = [];
      const hi = half[axis], inn = inner[axis];
      for (let k = 0; k <= segments; k++) s.push(-hi + (k / segments) * (hi - inn));
      if (inn > 1e-6) s.push(inn);
      for (let k = 1; k <= segments; k++) s.push(inn + (k / segments) * (hi - inn));
      return s;
    };
    const su = stops(ua), sv = stops(va);
    const base = b.pos.length / 3;
    for (let j = 0; j < sv.length; j++) {
      for (let i = 0; i < su.length; i++) {
        const p = [0, 0, 0];
        p[na] = n[na] * half[na];
        p[ua] = su[i] * Math.sign(u[ua]);
        p[va] = sv[j] * Math.sign(v[va]);
        // project onto rounded box: clamp to inner box, push out by radius along the delta
        const c = [Math.max(-inner[0], Math.min(inner[0], p[0])), Math.max(-inner[1], Math.min(inner[1], p[1])), Math.max(-inner[2], Math.min(inner[2], p[2]))];
        let dx = p[0] - c[0], dy = p[1] - c[1], dz = p[2] - c[2];
        const l = Math.hypot(dx, dy, dz) || 1;
        dx /= l; dy /= l; dz /= l;
        const q = [c[0] + dx * r, c[1] + dy * r, c[2] + dz * r];
        b.v(q[0], q[1], q[2], dx, dy, dz, su[i] + half[ua], sv[j] + half[va]);
      }
    }
    const cols = su.length;
    for (let j = 0; j < sv.length - 1; j++) {
      for (let i = 0; i < cols - 1; i++) {
        const a = base + j * cols + i;
        b.quad(a, a + 1, a + cols + 1, a + cols);
      }
    }
  }
  void g;
  return b.build();
}

export interface CylinderOptions { capTop?: boolean; capBottom?: boolean; heightSegments?: number; thetaStart?: number; thetaLength?: number; }
/** Cylinder along +Y, centred at origin. UV u = arc length (m), v = height (m). */
export function cylinder(rTop: number, rBottom: number, height: number, radial = 24, opts: CylinderOptions = {}): Geometry {
  const b = new Builder();
  const hs = opts.heightSegments ?? 1;
  const t0 = opts.thetaStart ?? 0, tl = opts.thetaLength ?? Math.PI * 2;
  const slope = (rBottom - rTop) / height;
  const rMax = Math.max(rTop, rBottom);
  for (let j = 0; j <= hs; j++) {
    const v = j / hs;
    const r = rBottom + (rTop - rBottom) * v;
    const y = -height / 2 + v * height;
    for (let i = 0; i <= radial; i++) {
      const th = t0 + (i / radial) * tl;
      const s = Math.sin(th), c = Math.cos(th);
      const nl = Math.hypot(1, slope);
      b.v(r * s, y, r * c, s / nl, slope / nl, c / nl, (i / radial) * tl * rMax, y + height / 2);
    }
  }
  for (let j = 0; j < hs; j++) {
    for (let i = 0; i < radial; i++) {
      const a = j * (radial + 1) + i;
      b.quad(a, a + 1, a + radial + 2, a + radial + 1);
    }
  }
  const cap = (top: boolean) => {
    const r = top ? rTop : rBottom;
    if (r <= 0) return;
    const y = top ? height / 2 : -height / 2, ny = top ? 1 : -1;
    const center = b.v(0, y, 0, 0, ny, 0, 0, 0);
    const start = b.pos.length / 3;
    for (let i = 0; i <= radial; i++) {
      const th = t0 + (i / radial) * tl;
      b.v(r * Math.sin(th), y, r * Math.cos(th), 0, ny, 0, r * Math.sin(th), r * Math.cos(th));
    }
    for (let i = 0; i < radial; i++) {
      if (top) b.tri(center, start + i, start + i + 1); else b.tri(center, start + i + 1, start + i);
    }
  };
  if (opts.capTop !== false) cap(true);
  if (opts.capBottom !== false) cap(false);
  return b.build();
}

/**
 * Surface of revolution around +Y. `profile` = [radius, y] points (bottom→top). Hard edges where the
 * profile turns more than `creaseDeg` (machined shoulders stay crisp).
 */
export function lathe(profile: [number, number][], radial = 32, creaseDeg = 35): Geometry {
  const b = new Builder();
  // split profile into smooth segments at creases by duplicating points
  const pts: { r: number; y: number; nr: number; ny: number; s: number }[] = [];
  let arc = 0;
  for (let i = 0; i < profile.length; i++) {
    const [r, y] = profile[i];
    if (i > 0) arc += Math.hypot(r - profile[i - 1][0], y - profile[i - 1][1]);
    const prev = profile[Math.max(0, i - 1)], next = profile[Math.min(profile.length - 1, i + 1)];
    const tIn = i > 0 ? [r - prev[0], y - prev[1]] : null;
    const tOut = i < profile.length - 1 ? [next[0] - r, next[1] - y] : null;
    const nrm = (t: number[]) => { const l = Math.hypot(t[0], t[1]) || 1; return [t[1] / l, -t[0] / l]; }; // outward for CCW-up profile
    if (tIn && tOut) {
      const a = Math.atan2(tIn[1], tIn[0]), c = Math.atan2(tOut[1], tOut[0]);
      let dA = Math.abs(a - c); if (dA > Math.PI) dA = 2 * Math.PI - dA;
      if (dA > (creaseDeg * Math.PI) / 180) {
        const n1 = nrm(tIn), n2 = nrm(tOut);
        pts.push({ r, y, nr: n1[0], ny: n1[1], s: arc });
        pts.push({ r, y, nr: n2[0], ny: n2[1], s: arc });
        continue;
      }
      const avg = [tIn[0] / (Math.hypot(tIn[0], tIn[1]) || 1) + tOut[0] / (Math.hypot(tOut[0], tOut[1]) || 1), tIn[1] / (Math.hypot(tIn[0], tIn[1]) || 1) + tOut[1] / (Math.hypot(tOut[0], tOut[1]) || 1)];
      const n = nrm(avg);
      pts.push({ r, y, nr: n[0], ny: n[1], s: arc });
    } else {
      const n = nrm((tIn ?? tOut)!);
      pts.push({ r, y, nr: n[0], ny: n[1], s: arc });
    }
  }
  const rMax = Math.max(...profile.map((p) => p[0]), 1e-4);
  const ring = radial + 1;
  for (const p of pts) {
    for (let i = 0; i <= radial; i++) {
      const th = (i / radial) * Math.PI * 2;
      const s = Math.sin(th), c = Math.cos(th);
      b.v(p.r * s, p.y, p.r * c, p.nr * s, p.ny, p.nr * c, (i / radial) * Math.PI * 2 * rMax, p.s);
    }
  }
  for (let j = 0; j < pts.length - 1; j++) {
    if (pts[j].r === pts[j + 1].r && pts[j].y === pts[j + 1].y) continue; // crease duplicate
    for (let i = 0; i < radial; i++) {
      const a = j * ring + i;
      b.quad(a, a + 1, a + ring + 1, a + ring);
    }
  }
  return b.build();
}

export function sphere(r: number, wSeg = 24, hSeg = 16): Geometry {
  const b = new Builder();
  for (let j = 0; j <= hSeg; j++) {
    const v = j / hSeg, phi = v * Math.PI;
    for (let i = 0; i <= wSeg; i++) {
      const u = i / wSeg, th = u * Math.PI * 2;
      const x = -Math.cos(th) * Math.sin(phi), y = Math.cos(phi), z = Math.sin(th) * Math.sin(phi);
      b.v(x * r, y * r, z * r, x, y, z, u * Math.PI * 2 * r, v * Math.PI * r);
    }
  }
  for (let j = 0; j < hSeg; j++) {
    for (let i = 0; i < wSeg; i++) {
      const a = j * (wSeg + 1) + i;
      if (j !== 0) b.tri(a, a + wSeg + 1, a + 1);
      if (j !== hSeg - 1) b.tri(a + 1, a + wSeg + 1, a + wSeg + 2);
    }
  }
  return b.build();
}

/** Horizontal grid in XZ, facing +Y, centred. */
export function plane(w: number, d: number, segW = 1, segD = 1): Geometry {
  const b = new Builder();
  for (let j = 0; j <= segD; j++) {
    for (let i = 0; i <= segW; i++) {
      const x = (i / segW - 0.5) * w, z = (j / segD - 0.5) * d;
      b.v(x, 0, z, 0, 1, 0, x + w / 2, z + d / 2);
    }
  }
  for (let j = 0; j < segD; j++) {
    for (let i = 0; i < segW; i++) {
      const a = j * (segW + 1) + i;
      b.quad(a, a + segW + 1, a + segW + 2, a + 1);
    }
  }
  return b.build();
}

/** Torus in the XY plane around Z (chain links: scale X to elongate). */
export function torus(R: number, r: number, radial = 16, tubular = 24): Geometry {
  const b = new Builder();
  for (let j = 0; j <= radial; j++) {
    for (let i = 0; i <= tubular; i++) {
      const u = (i / tubular) * Math.PI * 2, v = (j / radial) * Math.PI * 2;
      const cx = R * Math.cos(u), cy = R * Math.sin(u);
      const x = (R + r * Math.cos(v)) * Math.cos(u), y = (R + r * Math.cos(v)) * Math.sin(u), z = r * Math.sin(v);
      const nx = x - cx, ny = y - cy, nz = z, l = Math.hypot(nx, ny, nz) || 1;
      b.v(x, y, z, nx / l, ny / l, nz / l, u * R, v * r);
    }
  }
  for (let j = 1; j <= radial; j++) {
    for (let i = 1; i <= tubular; i++) {
      const a = (tubular + 1) * j + i - 1, bb = (tubular + 1) * (j - 1) + i - 1, c = (tubular + 1) * (j - 1) + i, d = (tubular + 1) * j + i;
      b.tri(a, bb, d); b.tri(bb, c, d);
    }
  }
  return b.build();
}

/** Capsule along Y (total height includes the hemispheres). */
export function capsule(r: number, height: number, radial = 16, rings = 6): Geometry {
  const prof: [number, number][] = [];
  const half = Math.max(height / 2 - r, 0);
  for (let i = 0; i <= rings; i++) { const a = -Math.PI / 2 + (i / rings) * (Math.PI / 2); prof.push([Math.cos(a) * r, -half + Math.sin(a) * r]); }
  for (let i = 0; i <= rings; i++) { const a = (i / rings) * (Math.PI / 2); prof.push([Math.cos(a) * r, half + Math.sin(a) * r]); }
  prof[0][0] = 0; prof[prof.length - 1][0] = 0;
  return lathe(prof, radial, 80);
}

/** Tube swept along a polyline (parallel-transport frames). */
export function tube(path: [number, number, number][], radius: number, radial = 8): Geometry {
  const b = new Builder();
  const n = path.length;
  let prevNormal = [0, 1, 0];
  let arc = 0;
  for (let i = 0; i < n; i++) {
    const p = path[i];
    const nxt = path[Math.min(n - 1, i + 1)], prv = path[Math.max(0, i - 1)];
    let t = [nxt[0] - prv[0], nxt[1] - prv[1], nxt[2] - prv[2]];
    const tl = Math.hypot(t[0], t[1], t[2]) || 1; t = t.map((x) => x / tl);
    // project previous normal onto plane orthogonal to t
    const dn = prevNormal[0] * t[0] + prevNormal[1] * t[1] + prevNormal[2] * t[2];
    let nn = [prevNormal[0] - t[0] * dn, prevNormal[1] - t[1] * dn, prevNormal[2] - t[2] * dn];
    let nl = Math.hypot(nn[0], nn[1], nn[2]);
    if (nl < 1e-5) { nn = Math.abs(t[0]) < 0.9 ? [1, 0, 0] : [0, 0, 1]; nl = 1; }
    nn = nn.map((x) => x / nl);
    const bn = [t[1] * nn[2] - t[2] * nn[1], t[2] * nn[0] - t[0] * nn[2], t[0] * nn[1] - t[1] * nn[0]];
    prevNormal = nn;
    if (i > 0) arc += Math.hypot(p[0] - path[i - 1][0], p[1] - path[i - 1][1], p[2] - path[i - 1][2]);
    for (let k = 0; k <= radial; k++) {
      const a = (k / radial) * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
      const dx = nn[0] * c + bn[0] * s, dy = nn[1] * c + bn[1] * s, dz = nn[2] * c + bn[2] * s;
      b.v(p[0] + dx * radius, p[1] + dy * radius, p[2] + dz * radius, dx, dy, dz, (k / radial) * Math.PI * 2 * radius, arc);
    }
  }
  for (let i = 0; i < n - 1; i++) {
    for (let k = 0; k < radial; k++) {
      const a = i * (radial + 1) + k;
      b.quad(a, a + 1, a + radial + 2, a + radial + 1);
    }
  }
  return b.build();
}

// ------------------------------------------------------------------ polygon extrusion
type P2 = [number, number];

function polyArea(p: P2[]): number {
  let a = 0;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) a += (p[j][0] - p[i][0]) * (p[j][1] + p[i][1]);
  return a / 2;
}

/** Ear-clipping triangulation of a simple polygon (CCW). Returns index triples into `pts`. */
export function triangulate(pts: P2[]): number[] {
  const n = pts.length;
  if (n < 3) return [];
  const idx = Array.from({ length: n }, (_, i) => i);
  if (polyArea(pts) < 0) idx.reverse();
  const out: number[] = [];
  const cross = (a: P2, b: P2, c: P2) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  const inside = (p: P2, a: P2, b: P2, c: P2) => cross(a, b, p) >= 0 && cross(b, c, p) >= 0 && cross(c, a, p) >= 0;
  let guard = 0;
  while (idx.length > 3 && guard++ < 10000) {
    let clipped = false;
    for (let i = 0; i < idx.length; i++) {
      const ia = idx[(i + idx.length - 1) % idx.length], ib = idx[i], ic = idx[(i + 1) % idx.length];
      const a = pts[ia], b = pts[ib], c = pts[ic];
      if (cross(a, b, c) <= 1e-12) continue; // reflex
      let ear = true;
      for (const j of idx) {
        if (j === ia || j === ib || j === ic) continue;
        const p = pts[j];
        if ((p[0] === a[0] && p[1] === a[1]) || (p[0] === b[0] && p[1] === b[1]) || (p[0] === c[0] && p[1] === c[1])) continue;
        if (inside(p, a, b, c)) { ear = false; break; }
      }
      if (!ear) continue;
      out.push(ia, ib, ic);
      idx.splice(i, 1);
      clipped = true;
      break;
    }
    if (!clipped) { // degenerate — fall back to fan
      for (let i = 1; i < idx.length - 1; i++) out.push(idx[0], idx[i], idx[i + 1]);
      return out;
    }
  }
  if (idx.length === 3) out.push(idx[0], idx[1], idx[2]);
  return out;
}

/** Merge holes into the outer contour with bridge edges (holes must lie inside the outer). */
function bridgeHoles(outer: P2[], holes: P2[][]): P2[] {
  let poly = polyArea(outer) < 0 ? [...outer].reverse() : [...outer];
  const sorted = holes.map((h) => (polyArea(h) > 0 ? [...h].reverse() : [...h])).sort((a, b) => Math.max(...b.map((p) => p[0])) - Math.max(...a.map((p) => p[0])));
  for (const h of sorted) {
    let hi = 0;
    for (let i = 1; i < h.length; i++) if (h[i][0] > h[hi][0]) hi = i;
    const hp = h[hi];
    let best = -1, bestD = Infinity;
    for (let i = 0; i < poly.length; i++) {
      const p = poly[i];
      if (p[0] < hp[0]) continue;
      const d = Math.hypot(p[0] - hp[0], p[1] - hp[1]);
      if (d < bestD) { bestD = d; best = i; }
    }
    if (best < 0) best = 0;
    const holeSeq = [...h.slice(hi), ...h.slice(0, hi + 1)];
    poly = [...poly.slice(0, best + 1), ...holeSeq, poly[best], ...poly.slice(best + 1)];
  }
  return poly;
}

/** Inset a closed contour by `d` (miter), keeping winding. */
function inset(c: P2[], d: number): P2[] {
  const ccw = polyArea(c) > 0;
  const s = ccw ? 1 : -1;
  return c.map((p, i) => {
    const a = c[(i + c.length - 1) % c.length], b = c[(i + 1) % c.length];
    const e1 = [p[0] - a[0], p[1] - a[1]], e2 = [b[0] - p[0], b[1] - p[1]];
    const l1 = Math.hypot(e1[0], e1[1]) || 1, l2 = Math.hypot(e2[0], e2[1]) || 1;
    const n1 = [-e1[1] / l1 * s, e1[0] / l1 * s], n2 = [-e2[1] / l2 * s, e2[0] / l2 * s];
    let mx = n1[0] + n2[0], my = n1[1] + n2[1];
    const ml = Math.hypot(mx, my) || 1;
    mx /= ml; my /= ml;
    const cosHalf = Math.max(0.35, mx * n1[0] + my * n1[1]);
    return [p[0] + (mx * d) / cosHalf, p[1] + (my * d) / cosHalf] as P2;
  });
}

export interface ExtrudeOptions { holes?: P2[][]; bevel?: number; bevelSegments?: number; }
/**
 * Extrude a 2D profile (XY plane) along Z from -depth/2 to +depth/2 with optional rounded bevel.
 * Used for receivers, stocks, grips, triggers, steel target outlines.
 */
export function extrude(shape: P2[], depth: number, opts: ExtrudeOptions = {}): Geometry {
  const b = new Builder();
  const bevel = Math.min(opts.bevel ?? 0, depth * 0.45);
  const bs = bevel > 0 ? Math.max(1, opts.bevelSegments ?? 2) : 0;
  const outerCCW = polyArea(shape) > 0 ? shape : [...shape].reverse();
  const holes = (opts.holes ?? []).map((h) => (polyArea(h) < 0 ? h : [...h].reverse()));
  const contours: P2[][] = [outerCCW, ...holes];
  // rings: for each bevel step on front, the straight side, and back
  const profile: { off: number; z: number; nz: number; nxy: number }[] = [];
  const hz = depth / 2;
  if (bs > 0) {
    for (let k = 0; k <= bs; k++) {
      const a = (k / bs) * (Math.PI / 2);
      profile.push({ off: bevel * (1 - Math.sin(a)), z: -hz + bevel * (1 - Math.cos(a)), nz: -Math.cos(a), nxy: Math.sin(a) });
    }
    for (let k = 0; k <= bs; k++) {
      const a = (k / bs) * (Math.PI / 2);
      profile.push({ off: bevel * (1 - Math.cos(a)), z: hz - bevel + bevel * Math.sin(a), nz: Math.sin(a), nxy: Math.cos(a) });
    }
  } else {
    profile.push({ off: 0, z: -hz, nz: 0, nxy: 1 }, { off: 0, z: hz, nz: 0, nxy: 1 });
  }
  for (const c of contours) {
    const isHole = c !== outerCCW;
    const insets = profile.map((p) => (p.off > 0 ? inset(c, isHole ? -p.off : p.off) : c));
    // side walls with hard edges between polygon segments (duplicate verts per segment)
    let perim = 0;
    for (let i = 0; i < c.length; i++) {
      const p0 = c[i], p1 = c[(i + 1) % c.length];
      const segLen = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
      let ex = p1[0] - p0[0], ey = p1[1] - p0[1];
      const el = Math.hypot(ex, ey) || 1; ex /= el; ey /= el;
      const nx = ey, ny = -ex; // right-hand normal: outward for the CCW outer, into the void for CW holes
      const base = b.pos.length / 3;
      for (let k = 0; k < profile.length; k++) {
        const pr = profile[k], ring = insets[k];
        const a = ring[i], bb = ring[(i + 1) % ring.length];
        const nn = [nx * pr.nxy, ny * pr.nxy, pr.nz];
        b.v(a[0], a[1], pr.z, nn[0], nn[1], nn[2], perim, pr.z + hz);
        b.v(bb[0], bb[1], pr.z, nn[0], nn[1], nn[2], perim + segLen, pr.z + hz);
      }
      for (let k = 0; k < profile.length - 1; k++) {
        const a = base + k * 2;
        b.quad(a, a + 1, a + 3, a + 2);
      }
      perim += segLen;
    }
  }
  // caps (use innermost bevel ring)
  const capOuter = bs > 0 ? inset(outerCCW, bevel) : outerCCW;
  const capHoles = holes.map((h) => (bs > 0 ? inset(h, -bevel) : h));
  const merged = capHoles.length ? bridgeHoles(capOuter, capHoles) : capOuter;
  const tris = triangulate(merged);
  for (const [z, nz] of [[-hz, -1], [hz, 1]] as const) {
    const base = b.pos.length / 3;
    for (const p of merged) b.v(p[0], p[1], z, 0, 0, nz, p[0], p[1]);
    for (let t = 0; t < tris.length; t += 3) {
      if (nz > 0) b.tri(base + tris[t], base + tris[t + 1], base + tris[t + 2]);
      else b.tri(base + tris[t], base + tris[t + 2], base + tris[t + 1]);
    }
  }
  return b.build();
}

/** Circle polygon helper for extrusions. */
export function circle2(cx: number, cy: number, r: number, n = 24): P2[] {
  return Array.from({ length: n }, (_, i) => [cx + Math.cos((i / n) * Math.PI * 2) * r, cy + Math.sin((i / n) * Math.PI * 2) * r] as P2);
}
/** Rounded rectangle polygon. */
export function roundRect2(x0: number, y0: number, x1: number, y1: number, r: number, n = 4): P2[] {
  const pts: P2[] = [];
  const corners: [number, number, number][] = [[x1 - r, y0 + r, -Math.PI / 2], [x1 - r, y1 - r, 0], [x0 + r, y1 - r, Math.PI / 2], [x0 + r, y0 + r, Math.PI]];
  for (const [cx, cy, a0] of corners) for (let k = 0; k <= n; k++) { const a = a0 + (k / n) * (Math.PI / 2); pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); }
  return pts;
}
