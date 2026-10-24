//! Small, dependency-free linear algebra and geometric primitives.
//!
//! Conventions: meters, Y-up, right-handed. `Vec3`/`Quat`/`Mat3` are f32,
//! `DVec3` is f64 (used by the ballistics integrator).

use core::ops::{Add, AddAssign, Div, Index, Mul, MulAssign, Neg, Sub, SubAssign};

#[derive(Clone, Copy, Debug, Default, PartialEq)]
#[repr(C)]
pub struct Vec3 {
    pub x: f32,
    pub y: f32,
    pub z: f32,
}

#[inline(always)]
pub const fn v3(x: f32, y: f32, z: f32) -> Vec3 {
    Vec3 { x, y, z }
}

impl Vec3 {
    pub const ZERO: Vec3 = v3(0.0, 0.0, 0.0);
    pub const X: Vec3 = v3(1.0, 0.0, 0.0);
    pub const Y: Vec3 = v3(0.0, 1.0, 0.0);
    pub const Z: Vec3 = v3(0.0, 0.0, 1.0);

    #[inline(always)]
    pub fn splat(s: f32) -> Vec3 {
        v3(s, s, s)
    }
    #[inline(always)]
    pub fn dot(self, o: Vec3) -> f32 {
        self.x * o.x + self.y * o.y + self.z * o.z
    }
    #[inline(always)]
    pub fn cross(self, o: Vec3) -> Vec3 {
        v3(
            self.y * o.z - self.z * o.y,
            self.z * o.x - self.x * o.z,
            self.x * o.y - self.y * o.x,
        )
    }
    #[inline(always)]
    pub fn length_sq(self) -> f32 {
        self.dot(self)
    }
    #[inline(always)]
    pub fn length(self) -> f32 {
        self.length_sq().sqrt()
    }
    /// Normalized vector, or `fallback` if the length is ~0 / not finite.
    #[inline]
    pub fn normalize_or(self, fallback: Vec3) -> Vec3 {
        let l2 = self.length_sq();
        if l2 > 1e-30 && l2.is_finite() {
            self * (1.0 / l2.sqrt())
        } else {
            fallback
        }
    }
    #[inline(always)]
    pub fn min(self, o: Vec3) -> Vec3 {
        v3(self.x.min(o.x), self.y.min(o.y), self.z.min(o.z))
    }
    #[inline(always)]
    pub fn max(self, o: Vec3) -> Vec3 {
        v3(self.x.max(o.x), self.y.max(o.y), self.z.max(o.z))
    }
    #[inline(always)]
    pub fn abs(self) -> Vec3 {
        v3(self.x.abs(), self.y.abs(), self.z.abs())
    }
    #[inline(always)]
    pub fn mul_elem(self, o: Vec3) -> Vec3 {
        v3(self.x * o.x, self.y * o.y, self.z * o.z)
    }
    #[inline(always)]
    pub fn is_finite(self) -> bool {
        self.x.is_finite() && self.y.is_finite() && self.z.is_finite()
    }
    #[inline(always)]
    pub fn max_elem(self) -> f32 {
        self.x.max(self.y).max(self.z)
    }
    #[inline(always)]
    pub fn get(self, i: usize) -> f32 {
        match i {
            0 => self.x,
            1 => self.y,
            _ => self.z,
        }
    }
    /// Any unit vector perpendicular to `self` (which must be unit length).
    #[inline]
    pub fn any_perp(self) -> Vec3 {
        let a = if self.x.abs() < 0.57 { Vec3::X } else { Vec3::Y };
        self.cross(a).normalize_or(Vec3::Z)
    }
    #[inline(always)]
    pub fn lerp(self, o: Vec3, t: f32) -> Vec3 {
        self + (o - self) * t
    }
    #[inline(always)]
    pub fn to_d(self) -> DVec3 {
        DVec3 { x: self.x as f64, y: self.y as f64, z: self.z as f64 }
    }
}

impl Index<usize> for Vec3 {
    type Output = f32;
    #[inline(always)]
    fn index(&self, i: usize) -> &f32 {
        match i {
            0 => &self.x,
            1 => &self.y,
            _ => &self.z,
        }
    }
}

impl Add for Vec3 {
    type Output = Vec3;
    #[inline(always)]
    fn add(self, o: Vec3) -> Vec3 {
        v3(self.x + o.x, self.y + o.y, self.z + o.z)
    }
}
impl Sub for Vec3 {
    type Output = Vec3;
    #[inline(always)]
    fn sub(self, o: Vec3) -> Vec3 {
        v3(self.x - o.x, self.y - o.y, self.z - o.z)
    }
}
impl Mul<f32> for Vec3 {
    type Output = Vec3;
    #[inline(always)]
    fn mul(self, s: f32) -> Vec3 {
        v3(self.x * s, self.y * s, self.z * s)
    }
}
impl Mul<Vec3> for f32 {
    type Output = Vec3;
    #[inline(always)]
    fn mul(self, v: Vec3) -> Vec3 {
        v * self
    }
}
impl Div<f32> for Vec3 {
    type Output = Vec3;
    #[inline(always)]
    fn div(self, s: f32) -> Vec3 {
        self * (1.0 / s)
    }
}
impl Neg for Vec3 {
    type Output = Vec3;
    #[inline(always)]
    fn neg(self) -> Vec3 {
        v3(-self.x, -self.y, -self.z)
    }
}
impl AddAssign for Vec3 {
    #[inline(always)]
    fn add_assign(&mut self, o: Vec3) {
        *self = *self + o;
    }
}
impl SubAssign for Vec3 {
    #[inline(always)]
    fn sub_assign(&mut self, o: Vec3) {
        *self = *self - o;
    }
}
impl MulAssign<f32> for Vec3 {
    #[inline(always)]
    fn mul_assign(&mut self, s: f32) {
        *self = *self * s;
    }
}

// ---------------------------------------------------------------------------
// f64 vector (ballistics)
// ---------------------------------------------------------------------------

#[derive(Clone, Copy, Debug, Default, PartialEq)]
pub struct DVec3 {
    pub x: f64,
    pub y: f64,
    pub z: f64,
}

#[inline(always)]
pub const fn dv3(x: f64, y: f64, z: f64) -> DVec3 {
    DVec3 { x, y, z }
}

impl DVec3 {
    #[inline(always)]
    pub fn dot(self, o: DVec3) -> f64 {
        self.x * o.x + self.y * o.y + self.z * o.z
    }
    #[inline(always)]
    pub fn length(self) -> f64 {
        self.dot(self).sqrt()
    }
    #[inline(always)]
    pub fn to_f(self) -> Vec3 {
        v3(self.x as f32, self.y as f32, self.z as f32)
    }
    #[inline(always)]
    pub fn is_finite(self) -> bool {
        self.x.is_finite() && self.y.is_finite() && self.z.is_finite()
    }
}
impl Add for DVec3 {
    type Output = DVec3;
    #[inline(always)]
    fn add(self, o: DVec3) -> DVec3 {
        dv3(self.x + o.x, self.y + o.y, self.z + o.z)
    }
}
impl Sub for DVec3 {
    type Output = DVec3;
    #[inline(always)]
    fn sub(self, o: DVec3) -> DVec3 {
        dv3(self.x - o.x, self.y - o.y, self.z - o.z)
    }
}
impl Mul<f64> for DVec3 {
    type Output = DVec3;
    #[inline(always)]
    fn mul(self, s: f64) -> DVec3 {
        dv3(self.x * s, self.y * s, self.z * s)
    }
}
impl Neg for DVec3 {
    type Output = DVec3;
    #[inline(always)]
    fn neg(self) -> DVec3 {
        dv3(-self.x, -self.y, -self.z)
    }
}

// ---------------------------------------------------------------------------
// Quaternion / Mat3
// ---------------------------------------------------------------------------

#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Quat {
    pub x: f32,
    pub y: f32,
    pub z: f32,
    pub w: f32,
}

impl Default for Quat {
    fn default() -> Self {
        Quat::IDENTITY
    }
}

impl Quat {
    pub const IDENTITY: Quat = Quat { x: 0.0, y: 0.0, z: 0.0, w: 1.0 };

    pub fn from_axis_angle(axis: Vec3, angle: f32) -> Quat {
        let a = axis.normalize_or(Vec3::Y);
        let (s, c) = (angle * 0.5).sin_cos();
        Quat { x: a.x * s, y: a.y * s, z: a.z * s, w: c }
    }
    #[inline]
    pub fn normalize(self) -> Quat {
        let l2 = self.x * self.x + self.y * self.y + self.z * self.z + self.w * self.w;
        if l2 > 1e-20 && l2.is_finite() {
            let inv = 1.0 / l2.sqrt();
            Quat { x: self.x * inv, y: self.y * inv, z: self.z * inv, w: self.w * inv }
        } else {
            Quat::IDENTITY
        }
    }
    /// Hamilton product `self * o`.
    #[inline]
    pub fn mul_quat(self, o: Quat) -> Quat {
        Quat {
            w: self.w * o.w - self.x * o.x - self.y * o.y - self.z * o.z,
            x: self.w * o.x + self.x * o.w + self.y * o.z - self.z * o.y,
            y: self.w * o.y - self.x * o.z + self.y * o.w + self.z * o.x,
            z: self.w * o.z + self.x * o.y - self.y * o.x + self.z * o.w,
        }
    }
    #[inline]
    pub fn rotate(self, v: Vec3) -> Vec3 {
        let q = v3(self.x, self.y, self.z);
        let t = q.cross(v) * 2.0;
        v + t * self.w + q.cross(t)
    }
    #[inline]
    pub fn conj(self) -> Quat {
        Quat { x: -self.x, y: -self.y, z: -self.z, w: self.w }
    }
    /// Integrate orientation by angular velocity `w` (world frame) over `dt`
    /// using the exact exponential map of the rotation increment.
    #[inline]
    pub fn integrate(self, w: Vec3, dt: f32) -> Quat {
        let ang = w.length() * dt;
        if ang < 1e-9 {
            return self;
        }
        let dq = Quat::from_axis_angle(w, ang);
        dq.mul_quat(self).normalize()
    }
    pub fn to_mat3(self) -> Mat3 {
        let (x, y, z, w) = (self.x, self.y, self.z, self.w);
        let (x2, y2, z2) = (x + x, y + y, z + z);
        let (xx, yy, zz) = (x * x2, y * y2, z * z2);
        let (xy, xz, yz) = (x * y2, x * z2, y * z2);
        let (wx, wy, wz) = (w * x2, w * y2, w * z2);
        Mat3 {
            c: [
                v3(1.0 - (yy + zz), xy + wz, xz - wy),
                v3(xy - wz, 1.0 - (xx + zz), yz + wx),
                v3(xz + wy, yz - wx, 1.0 - (xx + yy)),
            ],
        }
    }
    #[inline(always)]
    pub fn is_finite(self) -> bool {
        self.x.is_finite() && self.y.is_finite() && self.z.is_finite() && self.w.is_finite()
    }
}

/// Column-major 3x3 matrix: `c[i]` is column i.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Mat3 {
    pub c: [Vec3; 3],
}

impl Mat3 {
    pub const ZERO: Mat3 = Mat3 { c: [Vec3::ZERO; 3] };
    #[inline]
    pub fn mul_vec(&self, v: Vec3) -> Vec3 {
        self.c[0] * v.x + self.c[1] * v.y + self.c[2] * v.z
    }
    #[inline]
    pub fn transpose_mul_vec(&self, v: Vec3) -> Vec3 {
        v3(self.c[0].dot(v), self.c[1].dot(v), self.c[2].dot(v))
    }
    /// R * diag(d) * R^T
    pub fn rotate_diag(r: &Mat3, d: Vec3) -> Mat3 {
        let mut out = Mat3::ZERO;
        for j in 0..3 {
            // column j of R diag(d) R^T = sum_k R[:,k] d_k R[j,k]
            let mut col = Vec3::ZERO;
            for k in 0..3 {
                col += r.c[k] * (d.get(k) * r.c[k].get(j));
            }
            out.c[j] = col;
        }
        out
    }
}

// ---------------------------------------------------------------------------
// AABB
// ---------------------------------------------------------------------------

#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Aabb {
    pub min: Vec3,
    pub max: Vec3,
}

impl Aabb {
    pub const EMPTY: Aabb = Aabb { min: Vec3::splat_const(f32::INFINITY), max: Vec3::splat_const(f32::NEG_INFINITY) };

    #[inline]
    pub fn grow_point(&mut self, p: Vec3) {
        self.min = self.min.min(p);
        self.max = self.max.max(p);
    }
    #[inline]
    pub fn grow(&mut self, o: &Aabb) {
        self.min = self.min.min(o.min);
        self.max = self.max.max(o.max);
    }
    #[inline]
    pub fn expand(&self, m: f32) -> Aabb {
        Aabb { min: self.min - Vec3::splat(m), max: self.max + Vec3::splat(m) }
    }
    #[inline]
    pub fn half_area(&self) -> f32 {
        let e = self.max - self.min;
        if e.x < 0.0 || e.y < 0.0 || e.z < 0.0 {
            return 0.0;
        }
        e.x * e.y + e.y * e.z + e.z * e.x
    }
    #[inline]
    pub fn overlaps(&self, o: &Aabb) -> bool {
        self.min.x <= o.max.x
            && self.max.x >= o.min.x
            && self.min.y <= o.max.y
            && self.max.y >= o.min.y
            && self.min.z <= o.max.z
            && self.max.z >= o.min.z
    }
    #[inline]
    pub fn from_points(a: Vec3, b: Vec3) -> Aabb {
        Aabb { min: a.min(b), max: a.max(b) }
    }
}

impl Vec3 {
    pub const fn splat_const(s: f32) -> Vec3 {
        v3(s, s, s)
    }
}

// ---------------------------------------------------------------------------
// Closest-point routines (Ericson, "Real-Time Collision Detection")
// ---------------------------------------------------------------------------

/// Which feature of a triangle the closest point lies on.
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum TriFeature {
    Face,
    Edge,
    Vertex,
}

/// Closest point on triangle (a,b,c) to point p.
pub fn closest_point_triangle(p: Vec3, a: Vec3, b: Vec3, c: Vec3) -> (Vec3, TriFeature) {
    let ab = b - a;
    let ac = c - a;
    let ap = p - a;
    let d1 = ab.dot(ap);
    let d2 = ac.dot(ap);
    if d1 <= 0.0 && d2 <= 0.0 {
        return (a, TriFeature::Vertex);
    }
    let bp = p - b;
    let d3 = ab.dot(bp);
    let d4 = ac.dot(bp);
    if d3 >= 0.0 && d4 <= d3 {
        return (b, TriFeature::Vertex);
    }
    let vc = d1 * d4 - d3 * d2;
    if vc <= 0.0 && d1 >= 0.0 && d3 <= 0.0 {
        let den = d1 - d3;
        let v = if den != 0.0 { d1 / den } else { 0.0 };
        return (a + ab * v, TriFeature::Edge);
    }
    let cp = p - c;
    let d5 = ab.dot(cp);
    let d6 = ac.dot(cp);
    if d6 >= 0.0 && d5 <= d6 {
        return (c, TriFeature::Vertex);
    }
    let vb = d5 * d2 - d1 * d6;
    if vb <= 0.0 && d2 >= 0.0 && d6 <= 0.0 {
        let den = d2 - d6;
        let w = if den != 0.0 { d2 / den } else { 0.0 };
        return (a + ac * w, TriFeature::Edge);
    }
    let va = d3 * d6 - d5 * d4;
    if va <= 0.0 && (d4 - d3) >= 0.0 && (d5 - d6) >= 0.0 {
        let den = (d4 - d3) + (d5 - d6);
        let w = if den != 0.0 { (d4 - d3) / den } else { 0.0 };
        return (b + (c - b) * w, TriFeature::Edge);
    }
    let sum = va + vb + vc;
    if sum == 0.0 || !sum.is_finite() {
        // Degenerate triangle: fall back to closest vertex.
        let (da, db, dc) = ((p - a).length_sq(), (p - b).length_sq(), (p - c).length_sq());
        let q = if da <= db && da <= dc { a } else if db <= dc { b } else { c };
        return (q, TriFeature::Vertex);
    }
    let denom = 1.0 / sum;
    let v = vb * denom;
    let w = vc * denom;
    (a + ab * v + ac * w, TriFeature::Face)
}

/// Closest point on segment [a,b] to p; returns (point, t).
#[inline]
pub fn closest_point_segment(p: Vec3, a: Vec3, b: Vec3) -> (Vec3, f32) {
    let ab = b - a;
    let l2 = ab.length_sq();
    if l2 <= 1e-20 {
        return (a, 0.0);
    }
    let t = ((p - a).dot(ab) / l2).clamp(0.0, 1.0);
    (a + ab * t, t)
}

/// Closest points between segments [p1,q1] and [p2,q2].
/// Returns (s, t, c1, c2).
pub fn closest_segment_segment(p1: Vec3, q1: Vec3, p2: Vec3, q2: Vec3) -> (f32, f32, Vec3, Vec3) {
    const EPS: f32 = 1e-12;
    let d1 = q1 - p1;
    let d2 = q2 - p2;
    let r = p1 - p2;
    let a = d1.length_sq();
    let e = d2.length_sq();
    let f = d2.dot(r);
    let (s, t);
    if a <= EPS && e <= EPS {
        return (0.0, 0.0, p1, p2);
    }
    if a <= EPS {
        s = 0.0;
        t = (f / e).clamp(0.0, 1.0);
    } else {
        let c = d1.dot(r);
        if e <= EPS {
            t = 0.0;
            s = (-c / a).clamp(0.0, 1.0);
        } else {
            let b = d1.dot(d2);
            let denom = a * e - b * b;
            let mut s0 = if denom > EPS * a * e { ((b * f - c * e) / denom).clamp(0.0, 1.0) } else { 0.0 };
            let mut t0 = (b * s0 + f) / e;
            if t0 < 0.0 {
                t0 = 0.0;
                s0 = (-c / a).clamp(0.0, 1.0);
            } else if t0 > 1.0 {
                t0 = 1.0;
                s0 = ((b - c) / a).clamp(0.0, 1.0);
            }
            s = s0;
            t = t0;
        }
    }
    (s, t, p1 + d1 * s, p2 + d2 * t)
}

/// Segment [p,q] vs triangle intersection (two-sided). Returns the segment
/// parameter of the intersection.
pub fn segment_triangle_intersect(p: Vec3, q: Vec3, a: Vec3, b: Vec3, c: Vec3) -> Option<f32> {
    let d = q - p;
    let e1 = b - a;
    let e2 = c - a;
    let pv = d.cross(e2);
    let det = e1.dot(pv);
    if det.abs() < 1e-20 {
        return None;
    }
    let inv = 1.0 / det;
    let tv = p - a;
    let u = tv.dot(pv) * inv;
    if !(0.0..=1.0).contains(&u) {
        return None;
    }
    let qv = tv.cross(e1);
    let v = d.dot(qv) * inv;
    if v < 0.0 || u + v > 1.0 {
        return None;
    }
    let t = e2.dot(qv) * inv;
    if (0.0..=1.0).contains(&t) {
        Some(t)
    } else {
        None
    }
}

/// Result of a segment-vs-triangle closest-point query.
#[derive(Clone, Copy, Debug)]
pub struct SegTriClosest {
    /// Closest point on the segment.
    pub ps: Vec3,
    /// Closest point on the triangle.
    pub pt: Vec3,
    /// Segment parameter of `ps`.
    pub s: f32,
    pub dist_sq: f32,
    /// True if the segment actually pierces the triangle.
    pub intersects: bool,
}

/// Closest points between segment [p,q] and triangle (a,b,c).
pub fn closest_segment_triangle(p: Vec3, q: Vec3, a: Vec3, b: Vec3, c: Vec3) -> SegTriClosest {
    if let Some(s) = segment_triangle_intersect(p, q, a, b, c) {
        let x = p.lerp(q, s);
        return SegTriClosest { ps: x, pt: x, s, dist_sq: 0.0, intersects: true };
    }
    let (cp, _) = closest_point_triangle(p, a, b, c);
    let mut best = SegTriClosest { ps: p, pt: cp, s: 0.0, dist_sq: (p - cp).length_sq(), intersects: false };
    let (cq, _) = closest_point_triangle(q, a, b, c);
    let dq = (q - cq).length_sq();
    if dq < best.dist_sq {
        best = SegTriClosest { ps: q, pt: cq, s: 1.0, dist_sq: dq, intersects: false };
    }
    for (e0, e1) in [(a, b), (b, c), (c, a)] {
        let (s, _t, c1, c2) = closest_segment_segment(p, q, e0, e1);
        let d = (c1 - c2).length_sq();
        if d < best.dist_sq {
            best = SegTriClosest { ps: c1, pt: c2, s, dist_sq: d, intersects: false };
        }
    }
    best
}

// ---------------------------------------------------------------------------
// Ray vs primitive
// ---------------------------------------------------------------------------

/// Ray (origin o, unit dir d) vs sphere. Returns entry distance and normal.
pub fn ray_sphere(o: Vec3, d: Vec3, c: Vec3, r: f32, tmax: f32) -> Option<(f32, Vec3)> {
    let m = o - c;
    let b = m.dot(d);
    let cc = m.length_sq() - r * r;
    if cc > 0.0 && b > 0.0 {
        return None;
    }
    let disc = b * b - cc;
    if disc < 0.0 {
        return None;
    }
    let mut t = -b - disc.sqrt();
    if t < 0.0 {
        // Origin inside: report hit at origin with outward-ish normal.
        t = 0.0;
    }
    if t > tmax {
        return None;
    }
    let p = o + d * t;
    Some((t, (p - c).normalize_or(-d)))
}

/// Ray vs oriented box given in local space (o,d already transformed).
/// Returns (t, local normal).
pub fn ray_box_local(o: Vec3, d: Vec3, he: Vec3, tmax: f32) -> Option<(f32, Vec3)> {
    let mut tmin = 0.0f32;
    let mut tfar = tmax;
    let mut n = Vec3::ZERO;
    for i in 0..3 {
        let (oi, di, hi) = (o.get(i), d.get(i), he.get(i));
        if di.abs() < 1e-12 {
            if oi < -hi || oi > hi {
                return None;
            }
        } else {
            let inv = 1.0 / di;
            let mut t1 = (-hi - oi) * inv;
            let mut t2 = (hi - oi) * inv;
            let mut sign = -1.0;
            if t1 > t2 {
                core::mem::swap(&mut t1, &mut t2);
                sign = 1.0;
            }
            if t1 > tmin {
                tmin = t1;
                n = Vec3::ZERO;
                match i {
                    0 => n.x = sign,
                    1 => n.y = sign,
                    _ => n.z = sign,
                }
            }
            tfar = tfar.min(t2);
            if tmin > tfar {
                return None;
            }
        }
    }
    if n == Vec3::ZERO {
        n = -d; // origin inside
    }
    Some((tmin, n))
}

/// Ray vs capsule (segment a-b, radius r).
pub fn ray_capsule(o: Vec3, d: Vec3, a: Vec3, b: Vec3, r: f32, tmax: f32) -> Option<(f32, Vec3)> {
    // Infinite cylinder test, then the two caps.
    let ab = b - a;
    let ab_len2 = ab.length_sq();
    let mut best: Option<(f32, Vec3)> = None;
    if ab_len2 > 1e-20 {
        let ao = o - a;
        let abd = ab.dot(d);
        let abao = ab.dot(ao);
        let qa = ab_len2 - abd * abd;
        let qb = ab_len2 * ao.dot(d) - abao * abd;
        let qc = ab_len2 * ao.length_sq() - abao * abao - r * r * ab_len2;
        if qa.abs() > 1e-12 {
            let disc = qb * qb - qa * qc;
            if disc >= 0.0 {
                let t = (-qb - disc.sqrt()) / qa;
                if t >= 0.0 && t <= tmax {
                    let y = abao + t * abd;
                    if y > 0.0 && y < ab_len2 {
                        let p = o + d * t;
                        let axis_p = a + ab * (y / ab_len2);
                        best = Some((t, (p - axis_p).normalize_or(-d)));
                    }
                }
            }
        }
    }
    for c in [a, b] {
        if let Some((t, n)) = ray_sphere(o, d, c, r, tmax) {
            if best.is_none_or(|(bt, _)| t < bt) {
                best = Some((t, n));
            }
        }
    }
    best
}

// ---------------------------------------------------------------------------
// Tiny deterministic RNG
// ---------------------------------------------------------------------------

#[derive(Clone, Debug)]
pub struct Rng(pub u64);

impl Rng {
    #[inline]
    pub fn next_u32(&mut self) -> u32 {
        // xorshift64*
        let mut x = self.0;
        x ^= x >> 12;
        x ^= x << 25;
        x ^= x >> 27;
        self.0 = x;
        (x.wrapping_mul(0x2545F4914F6CDD1D) >> 32) as u32
    }
    /// Uniform in [0,1).
    #[inline]
    pub fn next_f32(&mut self) -> f32 {
        (self.next_u32() >> 8) as f32 * (1.0 / 16_777_216.0)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn quat_rotate_matches_matrix() {
        let q = Quat::from_axis_angle(v3(0.3, 1.0, -0.2), 1.1);
        let m = q.to_mat3();
        let v = v3(0.5, -2.0, 3.0);
        let a = q.rotate(v);
        let b = m.mul_vec(v);
        assert!((a - b).length() < 1e-5);
        let back = q.conj().rotate(a);
        assert!((back - v).length() < 1e-5);
    }

    #[test]
    fn seg_tri_closest() {
        let (a, b, c) = (v3(0.0, 0.0, 0.0), v3(1.0, 0.0, 0.0), v3(0.0, 0.0, 1.0));
        let r = closest_segment_triangle(v3(0.2, 1.0, 0.2), v3(0.2, 0.5, 0.2), a, b, c);
        assert!((r.dist_sq.sqrt() - 0.5).abs() < 1e-6);
        let r = closest_segment_triangle(v3(0.2, 1.0, 0.2), v3(0.2, -1.0, 0.2), a, b, c);
        assert!(r.intersects);
        let r = closest_segment_triangle(v3(-1.0, 0.3, -0.5), v3(2.0, 0.3, -0.5), a, b, c);
        assert!((r.dist_sq - (0.09 + 0.25)).abs() < 1e-5);
    }

    #[test]
    fn ray_prims() {
        let (t, n) = ray_sphere(v3(0.0, 0.0, -5.0), Vec3::Z, Vec3::ZERO, 1.0, 100.0).unwrap();
        assert!((t - 4.0).abs() < 1e-5 && (n.z + 1.0).abs() < 1e-5);
        let (t, n) = ray_box_local(v3(0.0, 5.0, 0.0), -Vec3::Y, v3(1.0, 2.0, 1.0), 100.0).unwrap();
        assert!((t - 3.0).abs() < 1e-5 && (n.y - 1.0).abs() < 1e-5);
        let (t, n) = ray_capsule(v3(-5.0, 0.0, 0.0), Vec3::X, v3(0.0, -1.0, 0.0), v3(0.0, 1.0, 0.0), 0.5, 100.0).unwrap();
        assert!((t - 4.5).abs() < 1e-5 && (n.x + 1.0).abs() < 1e-5);
        let (t, _) = ray_capsule(v3(0.0, 5.0, 0.0), -Vec3::Y, v3(0.0, -1.0, 0.0), v3(0.0, 1.0, 0.0), 0.5, 100.0).unwrap();
        assert!((t - 3.5).abs() < 1e-5);
    }
}
