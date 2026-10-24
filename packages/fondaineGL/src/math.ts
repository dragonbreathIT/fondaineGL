// fondaineGL math — column-major, right-handed, Y-up. Float32Array storage, allocation-free ops (out params).
// Projection conventions: WebGPU clip z in [0,1], REVERSED-Z (near = 1, far/infinity = 0) for perspective cameras.

export type Vec2 = Float32Array;
export type Vec3 = Float32Array;
export type Vec4 = Float32Array;
export type Quat = Float32Array;
export type Mat3 = Float32Array;
export type Mat4 = Float32Array;

export const DEG2RAD = Math.PI / 180;
export const RAD2DEG = 180 / Math.PI;
export const EPSILON = 1e-6;

export const clamp = (x: number, lo: number, hi: number) => (x < lo ? lo : x > hi ? hi : x);
export const saturate = (x: number) => clamp(x, 0, 1);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smoothstep = (e0: number, e1: number, x: number) => {
  const t = saturate((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};
/** Frame-rate independent exponential approach. `halfLife` in seconds. */
export const damp = (current: number, target: number, halfLife: number, dt: number) =>
  halfLife <= 0 ? target : lerp(target, current, Math.pow(2, -dt / halfLife));

// ---------------------------------------------------------------- vec3
export const vec3 = {
  create(x = 0, y = 0, z = 0): Vec3 {
    const v = new Float32Array(3);
    v[0] = x; v[1] = y; v[2] = z;
    return v;
  },
  clone(a: ArrayLike<number>): Vec3 { return vec3.create(a[0], a[1], a[2]); },
  set(out: Vec3, x: number, y: number, z: number): Vec3 { out[0] = x; out[1] = y; out[2] = z; return out; },
  copy(out: Vec3, a: ArrayLike<number>): Vec3 { out[0] = a[0]; out[1] = a[1]; out[2] = a[2]; return out; },
  add(out: Vec3, a: Vec3, b: Vec3): Vec3 { out[0] = a[0] + b[0]; out[1] = a[1] + b[1]; out[2] = a[2] + b[2]; return out; },
  sub(out: Vec3, a: Vec3, b: Vec3): Vec3 { out[0] = a[0] - b[0]; out[1] = a[1] - b[1]; out[2] = a[2] - b[2]; return out; },
  mul(out: Vec3, a: Vec3, b: Vec3): Vec3 { out[0] = a[0] * b[0]; out[1] = a[1] * b[1]; out[2] = a[2] * b[2]; return out; },
  scale(out: Vec3, a: Vec3, s: number): Vec3 { out[0] = a[0] * s; out[1] = a[1] * s; out[2] = a[2] * s; return out; },
  scaleAndAdd(out: Vec3, a: Vec3, b: Vec3, s: number): Vec3 {
    out[0] = a[0] + b[0] * s; out[1] = a[1] + b[1] * s; out[2] = a[2] + b[2] * s; return out;
  },
  dot(a: ArrayLike<number>, b: ArrayLike<number>): number { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; },
  cross(out: Vec3, a: Vec3, b: Vec3): Vec3 {
    const ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2];
    out[0] = ay * bz - az * by; out[1] = az * bx - ax * bz; out[2] = ax * by - ay * bx; return out;
  },
  length(a: ArrayLike<number>): number { return Math.hypot(a[0], a[1], a[2]); },
  lengthSq(a: ArrayLike<number>): number { return a[0] * a[0] + a[1] * a[1] + a[2] * a[2]; },
  distance(a: ArrayLike<number>, b: ArrayLike<number>): number { return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); },
  normalize(out: Vec3, a: Vec3): Vec3 {
    const l = Math.hypot(a[0], a[1], a[2]);
    const s = l > 0 ? 1 / l : 0;
    out[0] = a[0] * s; out[1] = a[1] * s; out[2] = a[2] * s; return out;
  },
  negate(out: Vec3, a: Vec3): Vec3 { out[0] = -a[0]; out[1] = -a[1]; out[2] = -a[2]; return out; },
  lerp(out: Vec3, a: Vec3, b: Vec3, t: number): Vec3 {
    out[0] = a[0] + (b[0] - a[0]) * t; out[1] = a[1] + (b[1] - a[1]) * t; out[2] = a[2] + (b[2] - a[2]) * t; return out;
  },
  min(out: Vec3, a: Vec3, b: Vec3): Vec3 {
    out[0] = Math.min(a[0], b[0]); out[1] = Math.min(a[1], b[1]); out[2] = Math.min(a[2], b[2]); return out;
  },
  max(out: Vec3, a: Vec3, b: Vec3): Vec3 {
    out[0] = Math.max(a[0], b[0]); out[1] = Math.max(a[1], b[1]); out[2] = Math.max(a[2], b[2]); return out;
  },
  transformMat4(out: Vec3, a: ArrayLike<number>, m: Mat4): Vec3 {
    const x = a[0], y = a[1], z = a[2];
    let w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  },
  /** Transform a direction (ignores translation). */
  transformDirMat4(out: Vec3, a: ArrayLike<number>, m: Mat4): Vec3 {
    const x = a[0], y = a[1], z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z;
    out[1] = m[1] * x + m[5] * y + m[9] * z;
    out[2] = m[2] * x + m[6] * y + m[10] * z;
    return out;
  },
  transformQuat(out: Vec3, a: ArrayLike<number>, q: Quat): Vec3 {
    const qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    const x = a[0], y = a[1], z = a[2];
    let uvx = qy * z - qz * y, uvy = qz * x - qx * z, uvz = qx * y - qy * x;
    let uuvx = qy * uvz - qz * uvy, uuvy = qz * uvx - qx * uvz, uuvz = qx * uvy - qy * uvx;
    const w2 = qw * 2;
    uvx *= w2; uvy *= w2; uvz *= w2;
    uuvx *= 2; uuvy *= 2; uuvz *= 2;
    out[0] = x + uvx + uuvx; out[1] = y + uvy + uuvy; out[2] = z + uvz + uuvz;
    return out;
  },
};

// ---------------------------------------------------------------- vec4
export const vec4 = {
  create(x = 0, y = 0, z = 0, w = 0): Vec4 {
    const v = new Float32Array(4);
    v[0] = x; v[1] = y; v[2] = z; v[3] = w;
    return v;
  },
  transformMat4(out: Vec4, a: ArrayLike<number>, m: Mat4): Vec4 {
    const x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
  },
};

// ---------------------------------------------------------------- quat (x, y, z, w)
export const quat = {
  create(): Quat { const q = new Float32Array(4); q[3] = 1; return q; },
  fromValues(x: number, y: number, z: number, w: number): Quat {
    const q = new Float32Array(4); q[0] = x; q[1] = y; q[2] = z; q[3] = w; return q;
  },
  identity(out: Quat): Quat { out[0] = 0; out[1] = 0; out[2] = 0; out[3] = 1; return out; },
  copy(out: Quat, a: ArrayLike<number>): Quat { out[0] = a[0]; out[1] = a[1]; out[2] = a[2]; out[3] = a[3]; return out; },
  setAxisAngle(out: Quat, axis: ArrayLike<number>, rad: number): Quat {
    const h = rad * 0.5, s = Math.sin(h);
    out[0] = s * axis[0]; out[1] = s * axis[1]; out[2] = s * axis[2]; out[3] = Math.cos(h);
    return out;
  },
  multiply(out: Quat, a: Quat, b: Quat): Quat {
    const ax = a[0], ay = a[1], az = a[2], aw = a[3];
    const bx = b[0], by = b[1], bz = b[2], bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  },
  rotateX(out: Quat, a: Quat, rad: number): Quat {
    const h = rad * 0.5, bx = Math.sin(h), bw = Math.cos(h);
    const ax = a[0], ay = a[1], az = a[2], aw = a[3];
    out[0] = ax * bw + aw * bx; out[1] = ay * bw + az * bx; out[2] = az * bw - ay * bx; out[3] = aw * bw - ax * bx;
    return out;
  },
  rotateY(out: Quat, a: Quat, rad: number): Quat {
    const h = rad * 0.5, by = Math.sin(h), bw = Math.cos(h);
    const ax = a[0], ay = a[1], az = a[2], aw = a[3];
    out[0] = ax * bw - az * by; out[1] = ay * bw + aw * by; out[2] = az * bw + ax * by; out[3] = aw * bw - ay * by;
    return out;
  },
  rotateZ(out: Quat, a: Quat, rad: number): Quat {
    const h = rad * 0.5, bz = Math.sin(h), bw = Math.cos(h);
    const ax = a[0], ay = a[1], az = a[2], aw = a[3];
    out[0] = ax * bw + ay * bz; out[1] = ay * bw - ax * bz; out[2] = az * bw + aw * bz; out[3] = aw * bw - az * bz;
    return out;
  },
  /** Yaw (Y), pitch (X), roll (Z) applied in that order: q = yaw * pitch * roll. Radians. */
  fromEuler(out: Quat, pitch: number, yaw: number, roll: number): Quat {
    quat.identity(out);
    quat.rotateY(out, out, yaw);
    quat.rotateX(out, out, pitch);
    quat.rotateZ(out, out, roll);
    return out;
  },
  normalize(out: Quat, a: Quat): Quat {
    const l = Math.hypot(a[0], a[1], a[2], a[3]);
    const s = l > 0 ? 1 / l : 0;
    out[0] = a[0] * s; out[1] = a[1] * s; out[2] = a[2] * s; out[3] = a[3] * s;
    return out;
  },
  conjugate(out: Quat, a: Quat): Quat { out[0] = -a[0]; out[1] = -a[1]; out[2] = -a[2]; out[3] = a[3]; return out; },
  invert(out: Quat, a: Quat): Quat {
    const d = a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
    const s = d ? 1 / d : 0;
    out[0] = -a[0] * s; out[1] = -a[1] * s; out[2] = -a[2] * s; out[3] = a[3] * s;
    return out;
  },
  dot(a: Quat, b: Quat): number { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]; },
  slerp(out: Quat, a: ArrayLike<number>, b: ArrayLike<number>, t: number): Quat {
    const ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bx = b[0], by = b[1], bz = b[2], bw = b[3];
    let cos = ax * bx + ay * by + az * bz + aw * bw;
    if (cos < 0) { cos = -cos; bx = -bx; by = -by; bz = -bz; bw = -bw; }
    let s0: number, s1: number;
    if (1 - cos > 1e-6) {
      const om = Math.acos(cos), so = Math.sin(om);
      s0 = Math.sin((1 - t) * om) / so;
      s1 = Math.sin(t * om) / so;
    } else { s0 = 1 - t; s1 = t; }
    out[0] = s0 * ax + s1 * bx; out[1] = s0 * ay + s1 * by; out[2] = s0 * az + s1 * bz; out[3] = s0 * aw + s1 * bw;
    return out;
  },
  /** Rotation taking unit vector a onto unit vector b. */
  rotationTo(out: Quat, a: Vec3, b: Vec3): Quat {
    const d = vec3.dot(a, b);
    if (d < -0.999999) {
      const tmp = vec3.create();
      vec3.cross(tmp, vec3.create(1, 0, 0), a);
      if (vec3.length(tmp) < 1e-6) vec3.cross(tmp, vec3.create(0, 1, 0), a);
      vec3.normalize(tmp, tmp);
      return quat.setAxisAngle(out, tmp, Math.PI);
    }
    if (d > 0.999999) return quat.identity(out);
    const c = vec3.cross(vec3.create(), a, b);
    out[0] = c[0]; out[1] = c[1]; out[2] = c[2]; out[3] = 1 + d;
    return quat.normalize(out, out);
  },
  /** Quaternion for a basis whose -Z looks along `forward` with `up` hint (camera convention). */
  lookRotation(out: Quat, forward: Vec3, up: Vec3): Quat {
    const m = mat4.create();
    const z = vec3.normalize(vec3.create(), vec3.negate(vec3.create(), forward));
    const x = vec3.normalize(vec3.create(), vec3.cross(vec3.create(), up, z));
    const y = vec3.cross(vec3.create(), z, x);
    m[0] = x[0]; m[1] = x[1]; m[2] = x[2];
    m[4] = y[0]; m[5] = y[1]; m[6] = y[2];
    m[8] = z[0]; m[9] = z[1]; m[10] = z[2];
    return mat4.getRotation(out, m);
  },
};

// ---------------------------------------------------------------- mat4 (column-major)
export const mat4 = {
  create(): Mat4 { const m = new Float32Array(16); m[0] = m[5] = m[10] = m[15] = 1; return m; },
  clone(a: Mat4): Mat4 { return new Float32Array(a); },
  copy(out: Mat4, a: ArrayLike<number>): Mat4 { for (let i = 0; i < 16; i++) out[i] = a[i]; return out; },
  identity(out: Mat4): Mat4 { out.fill(0); out[0] = out[5] = out[10] = out[15] = 1; return out; },
  multiply(out: Mat4, a: Mat4, b: Mat4): Mat4 {
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    for (let c = 0; c < 4; c++) {
      const b0 = b[c * 4], b1 = b[c * 4 + 1], b2 = b[c * 4 + 2], b3 = b[c * 4 + 3];
      out[c * 4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[c * 4 + 1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[c * 4 + 2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[c * 4 + 3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    }
    return out;
  },
  invert(out: Mat4, a: Mat4): Mat4 | null {
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
    const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
    const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
    const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    const b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10;
    const b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12;
    const b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30;
    const b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) return null;
    det = 1 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  },
  transpose(out: Mat4, a: Mat4): Mat4 {
    if (out === a) {
      const a01 = a[1], a02 = a[2], a03 = a[3], a12 = a[6], a13 = a[7], a23 = a[11];
      out[1] = a[4]; out[2] = a[8]; out[3] = a[12]; out[4] = a01; out[6] = a[9]; out[7] = a[13];
      out[8] = a02; out[9] = a12; out[11] = a[14]; out[12] = a03; out[13] = a13; out[14] = a23;
      return out;
    }
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) out[c * 4 + r] = a[r * 4 + c];
    return out;
  },
  fromRotationTranslationScale(out: Mat4, q: ArrayLike<number>, v: ArrayLike<number>, s: ArrayLike<number>): Mat4 {
    const x = q[0], y = q[1], z = q[2], w = q[3];
    const x2 = x + x, y2 = y + y, z2 = z + z;
    const xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2;
    const wx = w * x2, wy = w * y2, wz = w * z2;
    const sx = s[0], sy = s[1], sz = s[2];
    out[0] = (1 - (yy + zz)) * sx; out[1] = (xy + wz) * sx; out[2] = (xz - wy) * sx; out[3] = 0;
    out[4] = (xy - wz) * sy; out[5] = (1 - (xx + zz)) * sy; out[6] = (yz + wx) * sy; out[7] = 0;
    out[8] = (xz + wy) * sz; out[9] = (yz - wx) * sz; out[10] = (1 - (xx + yy)) * sz; out[11] = 0;
    out[12] = v[0]; out[13] = v[1]; out[14] = v[2]; out[15] = 1;
    return out;
  },
  fromRotationTranslation(out: Mat4, q: ArrayLike<number>, v: ArrayLike<number>): Mat4 {
    return mat4.fromRotationTranslationScale(out, q, v, ONE3);
  },
  /** out = a × translation(v) (translate in a's local frame). */
  translate(out: Mat4, a: ArrayLike<number>, v: ArrayLike<number>): Mat4 {
    const x = v[0], y = v[1], z = v[2];
    if (out !== a) for (let i = 0; i < 12; i++) out[i] = a[i];
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    return out;
  },
  fromTranslation(out: Mat4, v: ArrayLike<number>): Mat4 {
    mat4.identity(out); out[12] = v[0]; out[13] = v[1]; out[14] = v[2]; return out;
  },
  fromScaling(out: Mat4, v: ArrayLike<number>): Mat4 {
    mat4.identity(out); out[0] = v[0]; out[5] = v[1]; out[10] = v[2]; return out;
  },
  fromQuat(out: Mat4, q: ArrayLike<number>): Mat4 { return mat4.fromRotationTranslationScale(out, q, ZERO3, ONE3); },
  getTranslation(out: Vec3, m: Mat4): Vec3 { out[0] = m[12]; out[1] = m[13]; out[2] = m[14]; return out; },
  getScaling(out: Vec3, m: Mat4): Vec3 {
    out[0] = Math.hypot(m[0], m[1], m[2]); out[1] = Math.hypot(m[4], m[5], m[6]); out[2] = Math.hypot(m[8], m[9], m[10]);
    return out;
  },
  getRotation(out: Quat, m: Mat4): Quat {
    const sx = Math.hypot(m[0], m[1], m[2]) || 1, sy = Math.hypot(m[4], m[5], m[6]) || 1, sz = Math.hypot(m[8], m[9], m[10]) || 1;
    const m00 = m[0] / sx, m01 = m[1] / sx, m02 = m[2] / sx;
    const m10 = m[4] / sy, m11 = m[5] / sy, m12 = m[6] / sy;
    const m20 = m[8] / sz, m21 = m[9] / sz, m22 = m[10] / sz;
    const tr = m00 + m11 + m22;
    if (tr > 0) {
      const s = Math.sqrt(tr + 1) * 2;
      out[3] = 0.25 * s; out[0] = (m12 - m21) / s; out[1] = (m20 - m02) / s; out[2] = (m01 - m10) / s;
    } else if (m00 > m11 && m00 > m22) {
      const s = Math.sqrt(1 + m00 - m11 - m22) * 2;
      out[3] = (m12 - m21) / s; out[0] = 0.25 * s; out[1] = (m01 + m10) / s; out[2] = (m20 + m02) / s;
    } else if (m11 > m22) {
      const s = Math.sqrt(1 + m11 - m00 - m22) * 2;
      out[3] = (m20 - m02) / s; out[0] = (m01 + m10) / s; out[1] = 0.25 * s; out[2] = (m12 + m21) / s;
    } else {
      const s = Math.sqrt(1 + m22 - m00 - m11) * 2;
      out[3] = (m01 - m10) / s; out[0] = (m20 + m02) / s; out[1] = (m12 + m21) / s; out[2] = 0.25 * s;
    }
    return out;
  },
  /** View matrix (world -> view). Camera looks down -Z. */
  lookAt(out: Mat4, eye: ArrayLike<number>, center: ArrayLike<number>, up: ArrayLike<number>): Mat4 {
    let zx = eye[0] - center[0], zy = eye[1] - center[1], zz = eye[2] - center[2];
    let l = Math.hypot(zx, zy, zz) || 1; zx /= l; zy /= l; zz /= l;
    let xx = up[1] * zz - up[2] * zy, xy = up[2] * zx - up[0] * zz, xz = up[0] * zy - up[1] * zx;
    l = Math.hypot(xx, xy, xz) || 1; xx /= l; xy /= l; xz /= l;
    const yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
    out[0] = xx; out[1] = yx; out[2] = zx; out[3] = 0;
    out[4] = xy; out[5] = yy; out[6] = zy; out[7] = 0;
    out[8] = xz; out[9] = yz; out[10] = zz; out[11] = 0;
    out[12] = -(xx * eye[0] + xy * eye[1] + xz * eye[2]);
    out[13] = -(yx * eye[0] + yy * eye[1] + yz * eye[2]);
    out[14] = -(zx * eye[0] + zy * eye[1] + zz * eye[2]);
    out[15] = 1;
    return out;
  },
  /**
   * Infinite reversed-Z perspective (WebGPU depth [0,1], near -> 1, infinity -> 0).
   * jitterX/Y are sub-pixel offsets in NDC units (added to ndc.xy) for TAA.
   */
  perspectiveReversedInfinite(out: Mat4, fovY: number, aspect: number, near: number, jitterX = 0, jitterY = 0): Mat4 {
    const f = 1 / Math.tan(fovY / 2);
    out.fill(0);
    out[0] = f / aspect;
    out[5] = f;
    out[8] = -jitterX; // clip.x += jitter * w, with w = -z_view
    out[9] = -jitterY;
    out[11] = -1;
    out[14] = near;
    return out;
  },
  /** Standard perspective with finite far, depth [0,1] non-reversed (used for local light shadows / probes). */
  perspectiveZO(out: Mat4, fovY: number, aspect: number, near: number, far: number): Mat4 {
    const f = 1 / Math.tan(fovY / 2);
    out.fill(0);
    out[0] = f / aspect; out[5] = f; out[11] = -1;
    const nf = 1 / (near - far);
    out[10] = far * nf; out[14] = far * near * nf;
    return out;
  },
  /** Orthographic, depth [0,1]. */
  orthoZO(out: Mat4, left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4 {
    const lr = 1 / (left - right), bt = 1 / (bottom - top), nf = 1 / (near - far);
    out.fill(0);
    out[0] = -2 * lr; out[5] = -2 * bt; out[10] = nf; out[15] = 1;
    out[12] = (left + right) * lr; out[13] = (top + bottom) * bt; out[14] = near * nf;
    return out;
  },
  /** Upper-left 3x3 inverse transpose packed as 3 vec4 columns (12 floats) — WGSL mat3x3f uniform layout. */
  normalMatrix12(out: Float32Array, m: Mat4, offset = 0): Float32Array {
    const a00 = m[0], a01 = m[1], a02 = m[2], a10 = m[4], a11 = m[5], a12 = m[6], a20 = m[8], a21 = m[9], a22 = m[10];
    const b01 = a22 * a11 - a12 * a21, b11 = -a22 * a10 + a12 * a20, b21 = a21 * a10 - a11 * a20;
    let det = a00 * b01 + a01 * b11 + a02 * b21;
    det = det ? 1 / det : 0;
    // inverse (row-major r,c) then transpose => we write inverse-transpose column-major
    const i00 = b01 * det, i01 = (-a22 * a01 + a02 * a21) * det, i02 = (a12 * a01 - a02 * a11) * det;
    const i10 = b11 * det, i11 = (a22 * a00 - a02 * a20) * det, i12 = (-a12 * a00 + a02 * a10) * det;
    const i20 = b21 * det, i21 = (-a21 * a00 + a01 * a20) * det, i22 = (a11 * a00 - a01 * a10) * det;
    // inverse matrix in column-major is [i00 i01 i02 | i10 i11 i12 | i20 i21 i22]; transpose it:
    out[offset + 0] = i00; out[offset + 1] = i10; out[offset + 2] = i20; out[offset + 3] = 0;
    out[offset + 4] = i01; out[offset + 5] = i11; out[offset + 6] = i21; out[offset + 7] = 0;
    out[offset + 8] = i02; out[offset + 9] = i12; out[offset + 10] = i22; out[offset + 11] = 0;
    return out;
  },
};

const ONE3 = new Float32Array([1, 1, 1]);
const ZERO3 = new Float32Array([0, 0, 0]);

// ---------------------------------------------------------------- bounds
export interface AABB { min: Vec3; max: Vec3; }
export const aabb = {
  create(): AABB { return { min: vec3.create(Infinity, Infinity, Infinity), max: vec3.create(-Infinity, -Infinity, -Infinity) }; },
  fromPositions(pos: ArrayLike<number>): AABB {
    const b = aabb.create();
    for (let i = 0; i < pos.length; i += 3) {
      const x = pos[i], y = pos[i + 1], z = pos[i + 2];
      if (x < b.min[0]) b.min[0] = x; if (y < b.min[1]) b.min[1] = y; if (z < b.min[2]) b.min[2] = z;
      if (x > b.max[0]) b.max[0] = x; if (y > b.max[1]) b.max[1] = y; if (z > b.max[2]) b.max[2] = z;
    }
    return b;
  },
  /** World-space AABB of a local AABB transformed by m (Arvo's method). */
  transform(out: AABB, b: AABB, m: Mat4): AABB {
    for (let i = 0; i < 3; i++) {
      let lo = m[12 + i], hi = m[12 + i];
      for (let j = 0; j < 3; j++) {
        const e = m[j * 4 + i];
        const a = e * b.min[j], c = e * b.max[j];
        if (a < c) { lo += a; hi += c; } else { lo += c; hi += a; }
      }
      out.min[i] = lo; out.max[i] = hi;
    }
    return out;
  },
};

/** Frustum planes (ax+by+cz+d >= 0 inside) extracted from a view-projection matrix (reversed-Z infinite ok: far plane skipped). */
export function extractFrustumPlanes(vp: Mat4, out: Float32Array = new Float32Array(20)): Float32Array {
  const r = (i: number) => [vp[i], vp[4 + i], vp[8 + i], vp[12 + i]];
  const r0 = r(0), r1 = r(1), r2 = r(2), r3 = r(3);
  const planes = [
    [r3[0] + r0[0], r3[1] + r0[1], r3[2] + r0[2], r3[3] + r0[3]], // left
    [r3[0] - r0[0], r3[1] - r0[1], r3[2] - r0[2], r3[3] - r0[3]], // right
    [r3[0] + r1[0], r3[1] + r1[1], r3[2] + r1[2], r3[3] + r1[3]], // bottom
    [r3[0] - r1[0], r3[1] - r1[1], r3[2] - r1[2], r3[3] - r1[3]], // top
    [r3[0] - r2[0], r3[1] - r2[1], r3[2] - r2[2], r3[3] - r2[3]], // near (reversed-z: z <= w)
  ];
  for (let p = 0; p < 5; p++) {
    const l = Math.hypot(planes[p][0], planes[p][1], planes[p][2]) || 1;
    for (let k = 0; k < 4; k++) out[p * 4 + k] = planes[p][k] / l;
  }
  return out;
}

export function aabbInFrustum(planes: Float32Array, b: AABB): boolean {
  for (let p = 0; p < 5; p++) {
    const a = planes[p * 4], bb = planes[p * 4 + 1], c = planes[p * 4 + 2], d = planes[p * 4 + 3];
    const x = a >= 0 ? b.max[0] : b.min[0];
    const y = bb >= 0 ? b.max[1] : b.min[1];
    const z = c >= 0 ? b.max[2] : b.min[2];
    if (a * x + bb * y + c * z + d < 0) return false;
  }
  return true;
}

// ---------------------------------------------------------------- random / sequences
/** Deterministic PRNG (mulberry32). */
export function rng(seed = 0x9e3779b9) {
  let s = seed >>> 0;
  const next = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    next,
    range: (lo: number, hi: number) => lo + (hi - lo) * next(),
    /** Standard normal (Box–Muller). */
    gauss: () => {
      const u = Math.max(next(), 1e-12), v = next();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    },
    sign: () => (next() < 0.5 ? -1 : 1),
  };
}
export type RNG = ReturnType<typeof rng>;

export function halton(index: number, base: number): number {
  let f = 1, r = 0, i = index;
  while (i > 0) { f /= base; r += f * (i % base); i = Math.floor(i / base); }
  return r;
}
