// fondaineGL glTF 2.0 — geometry utilities: topology conversion, flat normals (with un-welding),
// per-vertex tangent generation. Pure data.

import { GL } from './gltf';

/**
 * Per-vertex tangents (xyzw) via Lengyel's accumulation + Gram-Schmidt orthogonalization.
 *
 * - `w` holds handedness. With `gltfConvention` (default true) the sign follows glTF:
 *   bitangent = cross(N, T.xyz) * w points toward DECREASING v (glTF UV origin is top-left, normal maps are
 *   "+Y up"), matching tangents exported by DCC tools and the MikkTSpace-with-negated-sign convention.
 *   Pass `false` to get the raw Lengyel sign (bitangent toward increasing v).
 * - Triangles with degenerate UVs (zero UV area) or zero area are skipped; vertices that end up with no
 *   usable accumulated tangent get an arbitrary unit vector perpendicular to the normal.
 */
export function generateTangents(
  positions: ArrayLike<number>,
  normals: ArrayLike<number>,
  uvs: ArrayLike<number>,
  indices: ArrayLike<number>,
  gltfConvention = true,
): Float32Array {
  const n = Math.floor(positions.length / 3);
  const tan = new Float64Array(n * 3);
  const bit = new Float64Array(n * 3);
  for (let i = 0; i + 2 < indices.length; i += 3) {
    const i0 = indices[i], i1 = indices[i + 1], i2 = indices[i + 2];
    if (i0 >= n || i1 >= n || i2 >= n) continue;
    const p0x = positions[i0 * 3], p0y = positions[i0 * 3 + 1], p0z = positions[i0 * 3 + 2];
    const e1x = positions[i1 * 3] - p0x, e1y = positions[i1 * 3 + 1] - p0y, e1z = positions[i1 * 3 + 2] - p0z;
    const e2x = positions[i2 * 3] - p0x, e2y = positions[i2 * 3 + 1] - p0y, e2z = positions[i2 * 3 + 2] - p0z;
    const u0 = uvs[i0 * 2], v0 = uvs[i0 * 2 + 1];
    const du1 = uvs[i1 * 2] - u0, dv1 = uvs[i1 * 2 + 1] - v0;
    const du2 = uvs[i2 * 2] - u0, dv2 = uvs[i2 * 2 + 1] - v0;
    const det = du1 * dv2 - du2 * dv1;
    if (!Number.isFinite(det) || Math.abs(det) < 1e-12) continue; // degenerate UV mapping
    const r = 1 / det;
    // Area-weighted: (e1*dv2 - e2*dv1)/det scales with geometric/uv area ratio; we keep the raw
    // Lengyel weighting (implicitly area-weighted by edge lengths).
    const tx = (e1x * dv2 - e2x * dv1) * r, ty = (e1y * dv2 - e2y * dv1) * r, tz = (e1z * dv2 - e2z * dv1) * r;
    const bx = (e2x * du1 - e1x * du2) * r, by = (e2y * du1 - e1y * du2) * r, bz = (e2z * du1 - e1z * du2) * r;
    if (!Number.isFinite(tx + ty + tz + bx + by + bz)) continue;
    for (const v of [i0, i1, i2]) {
      tan[v * 3] += tx; tan[v * 3 + 1] += ty; tan[v * 3 + 2] += tz;
      bit[v * 3] += bx; bit[v * 3 + 1] += by; bit[v * 3 + 2] += bz;
    }
  }
  const out = new Float32Array(n * 4);
  for (let v = 0; v < n; v++) {
    let nx = normals[v * 3], ny = normals[v * 3 + 1], nz = normals[v * 3 + 2];
    const nl = Math.hypot(nx, ny, nz);
    if (nl > 0) { nx /= nl; ny /= nl; nz /= nl; } else { nx = 0; ny = 0; nz = 1; }
    let tx = tan[v * 3], ty = tan[v * 3 + 1], tz = tan[v * 3 + 2];
    // Gram-Schmidt: t = normalize(t - n * dot(n, t))
    const d = nx * tx + ny * ty + nz * tz;
    tx -= nx * d; ty -= ny * d; tz -= nz * d;
    let tl = Math.hypot(tx, ty, tz);
    if (tl < 1e-10) {
      // No usable UV gradient: pick any vector perpendicular to n.
      if (Math.abs(nx) < 0.9) { tx = 0; ty = nz; tz = -ny; } // cross(n, X) up to sign
      else { tx = -nz; ty = 0; tz = nx; }                     // cross(n, Y) up to sign
      tl = Math.hypot(tx, ty, tz);
    }
    tx /= tl; ty /= tl; tz /= tl;
    // handedness from dot(cross(n, t), b)
    const cx = ny * tz - nz * ty, cy = nz * tx - nx * tz, cz = nx * ty - ny * tx;
    const s = cx * bit[v * 3] + cy * bit[v * 3 + 1] + cz * bit[v * 3 + 2];
    let w = s < 0 ? -1 : 1;
    if (gltfConvention) w = -w;
    out[v * 4] = tx; out[v * 4 + 1] = ty; out[v * 4 + 2] = tz; out[v * 4 + 3] = w;
  }
  return out;
}

/** Convert any glTF primitive mode to an index list of the matching base topology. */
export function convertTopology(
  mode: number, indices: Uint32Array,
): { indices: Uint32Array; topology: 'triangle-list' | 'line-list' | 'point-list' } {
  switch (mode) {
    case GL.TRIANGLES: {
      const n = indices.length - (indices.length % 3);
      return { indices: n === indices.length ? indices : indices.slice(0, n), topology: 'triangle-list' };
    }
    case GL.TRIANGLE_STRIP: {
      const out: number[] = [];
      for (let i = 0; i + 2 < indices.length; i++) {
        // glTF 3.7.2.1: p_i = {v_i, v_{i+(1+i%2)}, v_{i+(2-i%2)}}
        const a = indices[i], b = indices[i + 1 + (i & 1)], c = indices[i + 2 - (i & 1)];
        if (a === b || b === c || a === c) continue; // stitching degenerates
        out.push(a, b, c);
      }
      return { indices: Uint32Array.from(out), topology: 'triangle-list' };
    }
    case GL.TRIANGLE_FAN: {
      const out: number[] = [];
      // glTF 3.7.2.1: p_i = {v_{i+1}, v_{i+2}, v_0}
      for (let i = 0; i + 2 < indices.length; i++) out.push(indices[i + 1], indices[i + 2], indices[0]);
      return { indices: Uint32Array.from(out), topology: 'triangle-list' };
    }
    case GL.LINES: {
      const n = indices.length - (indices.length % 2);
      return { indices: n === indices.length ? indices : indices.slice(0, n), topology: 'line-list' };
    }
    case GL.LINE_STRIP:
    case GL.LINE_LOOP: {
      const out: number[] = [];
      for (let i = 0; i + 1 < indices.length; i++) out.push(indices[i], indices[i + 1]);
      if (mode === GL.LINE_LOOP && indices.length > 2) out.push(indices[indices.length - 1], indices[0]);
      return { indices: Uint32Array.from(out), topology: 'line-list' };
    }
    case GL.POINTS:
      return { indices, topology: 'point-list' };
    default:
      throw new Error(`glTF: unknown primitive mode ${mode}`);
  }
}

/** Expand an attribute through an index list (un-weld). */
export function unweldAttribute<T extends Float32Array | Uint16Array>(src: T, comps: number, indices: Uint32Array): T {
  const Ctor = src.constructor as { new(n: number): T };
  const out = new Ctor(indices.length * comps);
  for (let i = 0; i < indices.length; i++) {
    const s = indices[i] * comps, d = i * comps;
    for (let c = 0; c < comps; c++) out[d + c] = src[s + c];
  }
  return out;
}

/** Face normals for an un-welded triangle list (vertex i belongs to triangle floor(i/3)). */
export function flatNormalsUnwelded(positions: Float32Array): Float32Array {
  const n = positions.length / 3;
  const out = new Float32Array(n * 3);
  for (let t = 0; t + 2 < n; t += 3) {
    const o = t * 3;
    const e1x = positions[o + 3] - positions[o], e1y = positions[o + 4] - positions[o + 1], e1z = positions[o + 5] - positions[o + 2];
    const e2x = positions[o + 6] - positions[o], e2y = positions[o + 7] - positions[o + 1], e2z = positions[o + 8] - positions[o + 2];
    let nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x;
    const l = Math.hypot(nx, ny, nz);
    if (l > 0) { nx /= l; ny /= l; nz /= l; } else { nx = 0; ny = 1; nz = 0; }
    for (let k = 0; k < 3; k++) { out[o + k * 3] = nx; out[o + k * 3 + 1] = ny; out[o + k * 3 + 2] = nz; }
  }
  return out;
}

export function computeBounds(positions: ArrayLike<number>): { min: [number, number, number]; max: [number, number, number] } {
  const min: [number, number, number] = [Infinity, Infinity, Infinity];
  const max: [number, number, number] = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i + 2 < positions.length; i += 3) {
    for (let k = 0; k < 3; k++) {
      const v = positions[i + k];
      if (v < min[k]) min[k] = v;
      if (v > max[k]) max[k] = v;
    }
  }
  if (positions.length < 3) return { min: [0, 0, 0], max: [0, 0, 0] };
  return { min, max };
}
