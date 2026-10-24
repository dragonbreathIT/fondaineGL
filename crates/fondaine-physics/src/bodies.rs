//! Impulse-based rigid bodies (sphere, box, Y-axis capsule).
//!
//! Solver overview (per `step(dt)`):
//!  * `dt` is split into N sub-steps, N chosen so that a sub-step is at most
//!    1/240 s AND no awake body travels more than ~1 cm per sub-step
//!    (capped at `MAX_SUBSTEPS`).
//!  * Each sub-step: integrate forces -> regenerate contacts against the
//!    static BVH and other bodies (with a speculative margin of at least the
//!    distance travelled this sub-step, so fast/small bodies cannot tunnel)
//!    -> sequential-impulse solve with penetration bias -> integrate
//!    positions -> relax (solve without bias, removes bias energy) ->
//!    restitution pass -> rolling/torsional resistance.
//!  * Speculative contacts constrain the approach speed to `gap / h`, which
//!    makes them a form of continuous collision detection.
//!  * Per-body sleeping after ~0.5 s of rest. Sleeping bodies act as static
//!    for awake ones and are woken by impulses, setters, or impacts from
//!    moving bodies.

use crate::bvh::StaticWorld;
use crate::math::*;
use crate::Material;

pub const SHAPE_SPHERE: u32 = 0;
pub const SHAPE_BOX: u32 = 1;
pub const SHAPE_CAPSULE: u32 = 2;

/// Floats per body in the exported body buffer.
pub const BODY_STRIDE: usize = 16;
/// Floats per contact event.
pub const CONTACT_STRIDE: usize = 10;

const MAX_SUBSTEPS: u32 = 64;
const BASE_SUBSTEP_HZ: f32 = 240.0;
const MAX_TRAVEL_PER_SUBSTEP: f32 = 0.01;
const SOLVE_ITERS: usize = 6;
const RELAX_ITERS: usize = 2;
const BAUMGARTE: f32 = 0.25;
const MAX_BIAS_VEL: f32 = 2.0;
const RESTITUTION_THRESHOLD: f32 = 0.25;
const SLEEP_TIME: f32 = 0.5;
const SLEEP_SPEED: f32 = 0.05;
const MAX_LIN_SPEED: f32 = 1000.0;
const MAX_ANG_SPEED: f32 = 600.0;
const LINEAR_DAMPING: f32 = 0.01;
const ANGULAR_DAMPING: f32 = 0.05;
/// Extra angular damping while in contact (per second).
const CONTACT_ANGULAR_DAMPING: f32 = 1.5;
/// Rolling resistance coefficient (torque = c * N * r).
const ROLLING_RESISTANCE: f32 = 0.06;
const EVENT_MIN_IMPULSE: f32 = 1e-4;
const EVENT_MIN_SPEED: f32 = 0.2;
const MAX_EVENTS: usize = 512;
const NONE: u32 = u32::MAX;

#[derive(Clone, Copy, Debug, PartialEq)]
pub enum Shape {
    Sphere { r: f32 },
    Box { he: Vec3 },
    Capsule { r: f32, hl: f32 },
}

impl Shape {
    pub fn kind(&self) -> u32 {
        match self {
            Shape::Sphere { .. } => SHAPE_SPHERE,
            Shape::Box { .. } => SHAPE_BOX,
            Shape::Capsule { .. } => SHAPE_CAPSULE,
        }
    }
    fn bound_radius(&self) -> f32 {
        match *self {
            Shape::Sphere { r } => r,
            Shape::Box { he } => he.length(),
            Shape::Capsule { r, hl } => r + hl,
        }
    }
    fn min_dim(&self) -> f32 {
        match *self {
            Shape::Sphere { r } => r,
            Shape::Box { he } => he.x.min(he.y).min(he.z),
            Shape::Capsule { r, .. } => r,
        }
    }
    /// Principal moments of inertia (local frame).
    fn inertia(&self, m: f32) -> Vec3 {
        match *self {
            Shape::Sphere { r } => Vec3::splat(0.4 * m * r * r),
            Shape::Box { he } => {
                let (x2, y2, z2) = (he.x * he.x, he.y * he.y, he.z * he.z);
                v3(m / 3.0 * (y2 + z2), m / 3.0 * (x2 + z2), m / 3.0 * (x2 + y2))
            }
            Shape::Capsule { r, hl } => {
                let hh = 2.0 * hl;
                let vc = core::f32::consts::PI * r * r * hh;
                let vs = 4.0 / 3.0 * core::f32::consts::PI * r * r * r;
                let mc = m * vc / (vc + vs);
                let ms = m - mc;
                let iy = mc * r * r * 0.5 + ms * 0.4 * r * r;
                let ix = mc * (r * r * 0.25 + hh * hh / 12.0) + ms * (0.4 * r * r + hh * hh * 0.25 + 0.375 * hh * r);
                v3(ix, iy, ix)
            }
        }
    }
}

#[derive(Clone, Debug)]
pub struct Body {
    pub alive: bool,
    pub shape: Shape,
    pub mass: f32,
    pub inv_mass: f32,
    pub inv_inertia_local: Vec3,
    pub material: u8,
    pub pos: Vec3,
    pub rot: Quat,
    pub vel: Vec3,
    pub angvel: Vec3,
    pub sleeping: bool,
    pub sleep_timer: f32,
    inv_inertia_world: Mat3,
    rot_m: Mat3,
    support_impulse: f32,
}

impl Body {
    fn dead() -> Body {
        Body {
            alive: false,
            shape: Shape::Sphere { r: 0.0 },
            mass: 0.0,
            inv_mass: 0.0,
            inv_inertia_local: Vec3::ZERO,
            material: 0,
            pos: Vec3::ZERO,
            rot: Quat::IDENTITY,
            vel: Vec3::ZERO,
            angvel: Vec3::ZERO,
            sleeping: false,
            sleep_timer: 0.0,
            inv_inertia_world: Mat3::ZERO,
            rot_m: Mat3::ZERO,
            support_impulse: 0.0,
        }
    }

    pub fn new(shape: Shape, mass: f32, material: u8) -> Body {
        let inertia = shape.inertia(mass);
        let mut b = Body::dead();
        b.alive = true;
        b.shape = shape;
        b.mass = mass;
        b.inv_mass = 1.0 / mass;
        b.inv_inertia_local = v3(1.0 / inertia.x, 1.0 / inertia.y, 1.0 / inertia.z);
        b.material = material;
        b.update_derived();
        b
    }

    fn update_derived(&mut self) {
        self.rot_m = self.rot.to_mat3();
        self.inv_inertia_world = Mat3::rotate_diag(&self.rot_m, self.inv_inertia_local);
    }

    #[inline]
    fn eff_inv_mass(&self) -> f32 {
        if self.sleeping {
            0.0
        } else {
            self.inv_mass
        }
    }

    #[inline]
    fn inv_i(&self, v: Vec3) -> Vec3 {
        if self.sleeping {
            Vec3::ZERO
        } else {
            self.inv_inertia_world.mul_vec(v)
        }
    }

    #[inline]
    fn vel_at(&self, r: Vec3) -> Vec3 {
        self.vel + self.angvel.cross(r)
    }

    #[inline]
    fn apply_impulse(&mut self, p: Vec3, r: Vec3) {
        if self.sleeping {
            return;
        }
        self.vel += p * self.inv_mass;
        self.angvel += self.inv_inertia_world.mul_vec(r.cross(p));
    }

    fn capsule_ends(&self, hl: f32) -> (Vec3, Vec3) {
        let ax = self.rot_m.c[1] * hl;
        (self.pos - ax, self.pos + ax)
    }

    pub fn aabb(&self) -> Aabb {
        match self.shape {
            Shape::Sphere { r } => Aabb { min: self.pos - Vec3::splat(r), max: self.pos + Vec3::splat(r) },
            Shape::Capsule { r, hl } => {
                let (a, b) = self.capsule_ends(hl);
                Aabb { min: a.min(b) - Vec3::splat(r), max: a.max(b) + Vec3::splat(r) }
            }
            Shape::Box { he } => {
                let m = &self.rot_m;
                let e = v3(
                    m.c[0].x.abs() * he.x + m.c[1].x.abs() * he.y + m.c[2].x.abs() * he.z,
                    m.c[0].y.abs() * he.x + m.c[1].y.abs() * he.y + m.c[2].y.abs() * he.z,
                    m.c[0].z.abs() * he.x + m.c[1].z.abs() * he.y + m.c[2].z.abs() * he.z,
                );
                Aabb { min: self.pos - e, max: self.pos + e }
            }
        }
    }

    /// Ray (unit dir) vs this body. Returns (t, world normal).
    pub fn raycast(&self, o: Vec3, d: Vec3, tmax: f32) -> Option<(f32, Vec3)> {
        // bounding sphere reject
        let br = self.shape.bound_radius();
        let m = o - self.pos;
        let b = m.dot(d);
        let c = m.length_sq() - br * br;
        if c > 0.0 && b > 0.0 {
            return None;
        }
        if b * b - c < 0.0 {
            return None;
        }
        match self.shape {
            Shape::Sphere { r } => ray_sphere(o, d, self.pos, r, tmax),
            Shape::Capsule { r, hl } => {
                let (a, bb) = self.capsule_ends(hl);
                ray_capsule(o, d, a, bb, r, tmax)
            }
            Shape::Box { he } => {
                let lo = self.rot_m.transpose_mul_vec(o - self.pos);
                let ld = self.rot_m.transpose_mul_vec(d);
                ray_box_local(lo, ld, he, tmax).map(|(t, n)| (t, self.rot_m.mul_vec(n)))
            }
        }
    }

    fn rest_metric(&self) -> f32 {
        let r = self.shape.bound_radius();
        self.vel.length_sq() + self.angvel.length_sq() * r * r
    }
}

/// Raw contact produced by narrow phase: normal pushes the first object.
#[derive(Clone, Copy, Debug)]
struct Raw {
    p: Vec3,
    n: Vec3,
    sep: f32,
}

#[derive(Clone, Copy, Debug)]
struct Contact {
    a: u32,
    b: u32,
    other_mat: u8,
    n: Vec3,
    t1: Vec3,
    t2: Vec3,
    ra: Vec3,
    rb: Vec3,
    p: Vec3,
    sep: f32,
    mass_n: f32,
    mass_t1: f32,
    mass_t2: f32,
    friction: f32,
    restitution: f32,
    vn0: f32,
    jn: f32,
    jt1: f32,
    jt2: f32,
    slop: f32,
}

#[derive(Default)]
pub struct Bodies {
    pub list: Vec<Body>,
    /// Exported dense body buffer, `BODY_STRIDE` floats per body id.
    pub buf: Vec<f32>,
    /// Exported contact events, `CONTACT_STRIDE` floats per event.
    pub events: Vec<f32>,
    contacts: Vec<Contact>,
    raw: Vec<Raw>,
    tri_scratch: Vec<u32>,
    order: Vec<u32>,
    aabbs: Vec<Aabb>,
    /// (body, other key) -> index into events, for merging within a step.
    event_keys: Vec<(u32, u32)>,
}

#[inline]
fn combine_friction(a: f32, b: f32) -> f32 {
    (a.max(0.0) * b.max(0.0)).sqrt()
}
#[inline]
fn combine_restitution(a: f32, b: f32) -> f32 {
    a.max(b).clamp(0.0, 1.0)
}

impl Bodies {
    pub fn clear(&mut self) {
        self.list.clear();
        self.buf.clear();
        self.events.clear();
        self.contacts.clear();
        self.event_keys.clear();
    }

    pub fn get_mut(&mut self, id: u32) -> Option<&mut Body> {
        self.list.get_mut(id as usize).filter(|b| b.alive)
    }
    pub fn get(&self, id: u32) -> Option<&Body> {
        self.list.get(id as usize).filter(|b| b.alive)
    }

    /// Create a body. Returns `u32::MAX` on invalid input. Dead slots are reused.
    pub fn create(&mut self, shape: u32, a: f32, b: f32, c: f32, mass: f32, material: u32) -> u32 {
        let ok = |x: f32| x.is_finite() && x > 0.0;
        let shape = match shape {
            SHAPE_SPHERE if ok(a) => Shape::Sphere { r: a },
            SHAPE_BOX if ok(a) && ok(b) && ok(c) => Shape::Box { he: v3(a, b, c) },
            SHAPE_CAPSULE if ok(a) && b.is_finite() && b >= 0.0 => Shape::Capsule { r: a, hl: b },
            _ => return NONE,
        };
        if !ok(mass) {
            return NONE;
        }
        let body = Body::new(shape, mass, material.min(255) as u8);
        let id = match self.list.iter().position(|b| !b.alive) {
            Some(i) => {
                self.list[i] = body;
                i
            }
            None => {
                self.list.push(body);
                self.list.len() - 1
            }
        };
        self.sync(id as u32);
        id as u32
    }

    pub fn remove(&mut self, id: u32) {
        if let Some(b) = self.list.get_mut(id as usize) {
            *b = Body::dead();
            self.sync(id);
        }
        // trim trailing dead slots
        while self.list.last().is_some_and(|b| !b.alive) {
            self.list.pop();
        }
        self.buf.truncate(self.list.len() * BODY_STRIDE);
    }

    pub fn wake(&mut self, id: u32) {
        if let Some(b) = self.get_mut(id) {
            b.sleeping = false;
            b.sleep_timer = 0.0;
        }
    }

    pub fn wake_all(&mut self) {
        for b in self.list.iter_mut() {
            b.sleeping = false;
            b.sleep_timer = 0.0;
        }
    }

    /// Write one body's state into the exported buffer.
    pub fn sync(&mut self, id: u32) {
        let i = id as usize;
        let need = self.list.len() * BODY_STRIDE;
        if self.buf.len() < need {
            self.buf.resize(need, 0.0);
        }
        let Some(b) = self.list.get(i) else { return };
        let s = &mut self.buf[i * BODY_STRIDE..(i + 1) * BODY_STRIDE];
        if !b.alive {
            s.fill(0.0);
            return;
        }
        s.copy_from_slice(&[
            1.0,
            b.pos.x,
            b.pos.y,
            b.pos.z,
            b.rot.x,
            b.rot.y,
            b.rot.z,
            b.rot.w,
            b.vel.x,
            b.vel.y,
            b.vel.z,
            b.angvel.x,
            b.angvel.y,
            b.angvel.z,
            if b.sleeping { 1.0 } else { 0.0 },
            b.shape.kind() as f32,
        ]);
    }

    pub fn sync_all(&mut self) {
        self.buf.resize(self.list.len() * BODY_STRIDE, 0.0);
        for i in 0..self.list.len() {
            self.sync(i as u32);
        }
    }

    pub fn set_transform(&mut self, id: u32, p: Vec3, q: Quat) {
        if !p.is_finite() || !q.is_finite() {
            return;
        }
        if let Some(b) = self.get_mut(id) {
            b.pos = p;
            b.rot = q.normalize();
            b.update_derived();
            b.sleeping = false;
            b.sleep_timer = 0.0;
            self.sync(id);
        }
    }

    pub fn set_velocity(&mut self, id: u32, v: Vec3, w: Vec3) {
        if !v.is_finite() || !w.is_finite() {
            return;
        }
        if let Some(b) = self.get_mut(id) {
            b.vel = v;
            b.angvel = w;
            b.sleeping = false;
            b.sleep_timer = 0.0;
            self.sync(id);
        }
    }

    pub fn apply_impulse_at(&mut self, id: u32, imp: Vec3, point: Vec3) {
        if !imp.is_finite() || !point.is_finite() {
            return;
        }
        if let Some(b) = self.get_mut(id) {
            b.sleeping = false;
            b.sleep_timer = 0.0;
            b.update_derived();
            let r = point - b.pos;
            b.apply_impulse(imp, r);
            clamp_speeds(b);
            self.sync(id);
        }
    }

    /// Closest body hit by a ray (unit dir). Returns (t, normal, body id).
    pub fn raycast(&self, o: Vec3, d: Vec3, tmax: f32) -> Option<(f32, Vec3, u32)> {
        let mut best: Option<(f32, Vec3, u32)> = None;
        let mut lim = tmax;
        for (i, b) in self.list.iter().enumerate() {
            if !b.alive {
                continue;
            }
            if let Some((t, n)) = b.raycast(o, d, lim) {
                if t < lim {
                    lim = t;
                    best = Some((t, n, i as u32));
                }
            }
        }
        best
    }

    /// Advance all bodies by `dt`.
    pub fn step(&mut self, statics: &StaticWorld, mats: &[Material; 256], gravity: Vec3, dt: f32) {
        self.events.clear();
        self.event_keys.clear();
        if !(dt > 0.0) || !dt.is_finite() || self.list.is_empty() {
            self.sync_all();
            return;
        }
        let dt = dt.min(0.1);
        let mut max_speed = 0.0f32;
        for b in self.list.iter() {
            if b.alive && !b.sleeping {
                let s = b.vel.length() + b.angvel.length() * b.shape.bound_radius() + gravity.length() * dt;
                max_speed = max_speed.max(s);
            }
        }
        let n_base = (dt * BASE_SUBSTEP_HZ).ceil() as u32;
        let n_speed = (max_speed * dt / MAX_TRAVEL_PER_SUBSTEP).ceil() as u32;
        let n = n_base.max(n_speed).clamp(1, MAX_SUBSTEPS);
        let h = dt / n as f32;
        for _ in 0..n {
            self.substep(statics, mats, gravity, h);
        }
        // Sleep bookkeeping once per step.
        for b in self.list.iter_mut() {
            if !b.alive || b.sleeping {
                continue;
            }
            if b.rest_metric() < SLEEP_SPEED * SLEEP_SPEED {
                b.sleep_timer += dt;
                if b.sleep_timer >= SLEEP_TIME {
                    b.sleeping = true;
                    b.vel = Vec3::ZERO;
                    b.angvel = Vec3::ZERO;
                }
            } else {
                b.sleep_timer = 0.0;
            }
        }
        self.sync_all();
    }

    fn substep(&mut self, statics: &StaticWorld, mats: &[Material; 256], gravity: Vec3, h: f32) {
        // 1. Integrate forces.
        let lin_damp = 1.0 / (1.0 + LINEAR_DAMPING * h);
        let ang_damp = 1.0 / (1.0 + ANGULAR_DAMPING * h);
        for b in self.list.iter_mut() {
            if !b.alive {
                continue;
            }
            b.update_derived();
            b.support_impulse = 0.0;
            if b.sleeping {
                continue;
            }
            b.vel = (b.vel + gravity * h) * lin_damp;
            b.angvel *= ang_damp;
        }

        // 2. Contacts.
        self.contacts.clear();
        self.gen_static_contacts(statics, mats, h);
        self.gen_body_contacts(mats, h);

        // 3. Prepare.
        for c in self.contacts.iter_mut() {
            let (ba, bb) = pair(&self.list, c.a, c.b);
            c.ra = c.p - ba.pos;
            c.rb = bb.map_or(Vec3::ZERO, |b| c.p - b.pos);
            let k = |dir: Vec3| -> f32 {
                let mut k = ba.eff_inv_mass() + ba.inv_i(c.ra.cross(dir)).cross(c.ra).dot(dir);
                if let Some(b) = bb {
                    k += b.eff_inv_mass() + b.inv_i(c.rb.cross(dir)).cross(c.rb).dot(dir);
                }
                if k > 1e-30 {
                    1.0 / k
                } else {
                    0.0
                }
            };
            c.mass_n = k(c.n);
            c.t1 = c.n.any_perp();
            c.t2 = c.n.cross(c.t1);
            c.mass_t1 = k(c.t1);
            c.mass_t2 = k(c.t2);
            let vr = ba.vel_at(c.ra) - bb.map_or(Vec3::ZERO, |b| b.vel_at(c.rb));
            c.vn0 = vr.dot(c.n);
        }

        // 4. Solve with bias, integrate, relax, restitution.
        for _ in 0..SOLVE_ITERS {
            self.solve_iteration(h, true);
        }
        for b in self.list.iter_mut() {
            if !b.alive || b.sleeping {
                continue;
            }
            clamp_speeds(b);
            b.pos += b.vel * h;
            // Conserve angular momentum through the rotation update (free
            // rigid body precession), then integrate orientation.
            let l = Mat3::rotate_diag(&b.rot_m, inv3(b.inv_inertia_local)).mul_vec(b.angvel);
            b.rot = b.rot.integrate(b.angvel, h);
            b.update_derived();
            let w = b.inv_inertia_world.mul_vec(l);
            if w.is_finite() && w.length_sq() <= b.angvel.length_sq() * 1.0001 + 1e-12 {
                b.angvel = w;
            }
        }
        for _ in 0..RELAX_ITERS {
            self.solve_iteration(h, false);
        }
        self.restitution_pass();
        self.rolling_resistance(h);
        self.record_events();
    }

    fn solve_iteration(&mut self, h: f32, use_bias: bool) {
        let inv_h = 1.0 / h;
        for ci in 0..self.contacts.len() {
            let mut c = self.contacts[ci];
            let (ba, bb) = pair_mut(&mut self.list, c.a, c.b);
            let rel = |ba: &Body, bb: &Option<&mut Body>| -> Vec3 {
                ba.vel_at(c.ra) - bb.as_ref().map_or(Vec3::ZERO, |b| b.vel_at(c.rb))
            };
            // Friction first (uses the normal impulse of the previous iteration).
            let maxf = c.friction * c.jn;
            let vr = rel(ba, &bb);
            let d1 = -vr.dot(c.t1) * c.mass_t1;
            let new1 = (c.jt1 + d1).clamp(-maxf, maxf);
            let d1 = new1 - c.jt1;
            c.jt1 = new1;
            let d2 = -vr.dot(c.t2) * c.mass_t2;
            let new2 = (c.jt2 + d2).clamp(-maxf, maxf);
            let d2 = new2 - c.jt2;
            c.jt2 = new2;
            let pt = c.t1 * d1 + c.t2 * d2;
            ba.apply_impulse(pt, c.ra);
            let mut bb = bb;
            if let Some(b) = bb.as_mut() {
                b.apply_impulse(-pt, c.rb);
            }

            // Normal.
            let vn = rel(ba, &bb).dot(c.n);
            let target = if c.sep > 0.0 {
                -c.sep * inv_h
            } else if use_bias {
                ((-c.sep - c.slop).max(0.0) * BAUMGARTE * inv_h).min(MAX_BIAS_VEL)
            } else {
                0.0
            };
            let dj = (target - vn) * c.mass_n;
            let newj = (c.jn + dj).max(0.0);
            let dj = newj - c.jn;
            c.jn = newj;
            let pn = c.n * dj;
            ba.apply_impulse(pn, c.ra);
            if let Some(b) = bb.as_mut() {
                b.apply_impulse(-pn, c.rb);
            }
            self.contacts[ci] = c;
        }
    }

    fn restitution_pass(&mut self) {
        for ci in 0..self.contacts.len() {
            let mut c = self.contacts[ci];
            if c.restitution <= 0.0 || c.vn0 > -RESTITUTION_THRESHOLD || c.jn <= 0.0 {
                continue;
            }
            let (ba, mut bb) = pair_mut(&mut self.list, c.a, c.b);
            let vn = (ba.vel_at(c.ra) - bb.as_ref().map_or(Vec3::ZERO, |b| b.vel_at(c.rb))).dot(c.n);
            let target = -c.restitution * c.vn0;
            let dj = (target - vn) * c.mass_n;
            let newj = (c.jn + dj).max(0.0);
            let dj = newj - c.jn;
            c.jn = newj;
            let pn = c.n * dj;
            ba.apply_impulse(pn, c.ra);
            if let Some(b) = bb.as_mut() {
                b.apply_impulse(-pn, c.rb);
            }
            self.contacts[ci] = c;
        }
    }

    /// Rolling + torsional resistance, applied as a bounded angular impulse
    /// opposing the body's spin, proportional to the support impulse.
    fn rolling_resistance(&mut self, h: f32) {
        for c in self.contacts.iter() {
            if c.jn > 0.0 {
                self.list[c.a as usize].support_impulse += c.jn;
                if c.b != NONE {
                    self.list[c.b as usize].support_impulse += c.jn;
                }
            }
        }
        let damp = 1.0 / (1.0 + CONTACT_ANGULAR_DAMPING * h);
        for b in self.list.iter_mut() {
            if !b.alive || b.sleeping || b.support_impulse <= 0.0 {
                continue;
            }
            let w = b.angvel.length();
            if w < 1e-9 {
                continue;
            }
            let axis = b.angvel / w;
            let k = b.inv_inertia_world.mul_vec(axis).dot(axis);
            if k <= 0.0 {
                continue;
            }
            let stop = w / k;
            let cap = ROLLING_RESISTANCE * b.support_impulse * b.shape.min_dim();
            let imp = stop.min(cap);
            b.angvel -= b.inv_inertia_world.mul_vec(axis * imp);
            b.angvel *= damp;
        }
    }

    fn record_events(&mut self) {
        for ci in 0..self.contacts.len() {
            let c = self.contacts[ci];
            if c.jn < EVENT_MIN_IMPULSE || -c.vn0 < EVENT_MIN_SPEED {
                continue;
            }
            let mat_a = self.list[c.a as usize].material;
            let key_b = if c.b == NONE { 0x8000_0000 | c.other_mat as u32 } else { c.b };
            self.push_event(c.a, key_b, c.p, c.n, c.jn, -c.vn0, c.other_mat);
            if c.b != NONE && !self.list[c.b as usize].sleeping {
                self.push_event(c.b, c.a, c.p, -c.n, c.jn, -c.vn0, mat_a);
            }
        }
    }

    #[allow(clippy::too_many_arguments)]
    fn push_event(&mut self, body: u32, other_key: u32, p: Vec3, n: Vec3, jn: f32, speed: f32, mat: u8) {
        let rec = [body as f32, p.x, p.y, p.z, n.x, n.y, n.z, jn, speed, mat as f32];
        if let Some(k) = self.event_keys.iter().position(|&(b, o)| b == body && o == other_key) {
            let s = &mut self.events[k * CONTACT_STRIDE..(k + 1) * CONTACT_STRIDE];
            if jn > s[7] {
                s.copy_from_slice(&rec);
            }
            return;
        }
        if self.event_keys.len() >= MAX_EVENTS {
            return;
        }
        self.event_keys.push((body, other_key));
        self.events.extend_from_slice(&rec);
    }

    // -------------------------------------------------------------------
    // Narrow phase
    // -------------------------------------------------------------------

    fn margin_for(b: &Body, h: f32) -> f32 {
        let travel = (b.vel.length() + b.angvel.length() * b.shape.bound_radius()) * h;
        travel * 1.5 + (b.shape.min_dim() * 0.25).min(0.02) + 1e-4
    }

    fn slop_for(b: &Body) -> f32 {
        (b.shape.min_dim() * 0.05).min(0.001)
    }

    fn gen_static_contacts(&mut self, w: &StaticWorld, mats: &[Material; 256], h: f32) {
        if w.nodes.is_empty() {
            return;
        }
        for i in 0..self.list.len() {
            let b = &self.list[i];
            if !b.alive || b.sleeping {
                continue;
            }
            let margin = Self::margin_for(b, h);
            let bb = b.aabb().expand(margin);
            w.query_aabb(&bb, &mut self.tri_scratch);
            let mat_b = mats[b.material as usize];
            let slop = Self::slop_for(b);
            for k in 0..self.tri_scratch.len() {
                let ti = self.tri_scratch[k] as usize;
                let tri = &w.tris[ti];
                self.raw.clear();
                shape_vs_triangle(b, tri, margin, &mut self.raw);
                let tm = w.mats[ti];
                let mat_s = mats[tm as usize];
                for r in self.raw.iter() {
                    self.contacts.push(Contact {
                        a: i as u32,
                        b: NONE,
                        other_mat: tm,
                        n: r.n,
                        t1: Vec3::ZERO,
                        t2: Vec3::ZERO,
                        ra: Vec3::ZERO,
                        rb: Vec3::ZERO,
                        p: r.p,
                        sep: r.sep,
                        mass_n: 0.0,
                        mass_t1: 0.0,
                        mass_t2: 0.0,
                        friction: combine_friction(mat_b.friction, mat_s.friction),
                        restitution: combine_restitution(mat_b.restitution, mat_s.restitution),
                        vn0: 0.0,
                        jn: 0.0,
                        jt1: 0.0,
                        jt2: 0.0,
                        slop,
                    });
                }
            }
        }
    }

    fn gen_body_contacts(&mut self, mats: &[Material; 256], h: f32) {
        let n = self.list.len();
        if n < 2 {
            return;
        }
        // sort-and-sweep on x
        self.aabbs.clear();
        self.order.clear();
        for (i, b) in self.list.iter().enumerate() {
            if b.alive {
                let m = if b.sleeping { 0.0 } else { Self::margin_for(b, h) };
                self.aabbs.push(b.aabb().expand(m));
                self.order.push(i as u32);
            } else {
                self.aabbs.push(Aabb::EMPTY);
            }
        }
        let aabbs = &self.aabbs;
        self.order.sort_unstable_by(|&a, &b| aabbs[a as usize].min.x.partial_cmp(&aabbs[b as usize].min.x).unwrap_or(core::cmp::Ordering::Equal));
        for oi in 0..self.order.len() {
            let i = self.order[oi] as usize;
            for oj in oi + 1..self.order.len() {
                let j = self.order[oj] as usize;
                if self.aabbs[j].min.x > self.aabbs[i].max.x {
                    break;
                }
                if !self.aabbs[i].overlaps(&self.aabbs[j]) {
                    continue;
                }
                let (si, sj) = (self.list[i].sleeping, self.list[j].sleeping);
                if si && sj {
                    continue;
                }
                // Wake a sleeping body hit by a moving one.
                let wake_thr = SLEEP_SPEED * SLEEP_SPEED * 4.0;
                if si && self.list[j].rest_metric() > wake_thr {
                    self.list[i].sleeping = false;
                    self.list[i].sleep_timer = 0.0;
                }
                if sj && self.list[i].rest_metric() > wake_thr {
                    self.list[j].sleeping = false;
                    self.list[j].sleep_timer = 0.0;
                }
                let (ba, bb) = (&self.list[i], &self.list[j]);
                let margin = Self::margin_for(ba, h) + Self::margin_for(bb, h);
                self.raw.clear();
                shape_vs_shape(ba, bb, margin, &mut self.raw);
                let (ma, mb) = (mats[ba.material as usize], mats[bb.material as usize]);
                let slop = Self::slop_for(ba).min(Self::slop_for(bb));
                for r in self.raw.iter() {
                    self.contacts.push(Contact {
                        a: i as u32,
                        b: j as u32,
                        other_mat: bb.material,
                        n: r.n,
                        t1: Vec3::ZERO,
                        t2: Vec3::ZERO,
                        ra: Vec3::ZERO,
                        rb: Vec3::ZERO,
                        p: r.p,
                        sep: r.sep,
                        mass_n: 0.0,
                        mass_t1: 0.0,
                        mass_t2: 0.0,
                        friction: combine_friction(ma.friction, mb.friction),
                        restitution: combine_restitution(ma.restitution, mb.restitution),
                        vn0: 0.0,
                        jn: 0.0,
                        jt1: 0.0,
                        jt2: 0.0,
                        slop,
                    });
                }
            }
        }
    }
}

#[inline]
fn inv3(v: Vec3) -> Vec3 {
    v3(1.0 / v.x, 1.0 / v.y, 1.0 / v.z)
}

fn clamp_speeds(b: &mut Body) {
    if !b.vel.is_finite() {
        b.vel = Vec3::ZERO;
    }
    if !b.angvel.is_finite() {
        b.angvel = Vec3::ZERO;
    }
    let v = b.vel.length();
    if v > MAX_LIN_SPEED {
        b.vel *= MAX_LIN_SPEED / v;
    }
    let w = b.angvel.length();
    if w > MAX_ANG_SPEED {
        b.angvel *= MAX_ANG_SPEED / w;
    }
}

fn pair(list: &[Body], a: u32, b: u32) -> (&Body, Option<&Body>) {
    (&list[a as usize], if b == NONE { None } else { Some(&list[b as usize]) })
}

fn pair_mut(list: &mut [Body], a: u32, b: u32) -> (&mut Body, Option<&mut Body>) {
    let (a, b) = (a as usize, b as usize);
    if b == NONE as usize {
        return (&mut list[a], None);
    }
    debug_assert!(a != b);
    if a < b {
        let (l, r) = list.split_at_mut(b);
        (&mut l[a], Some(&mut r[0]))
    } else {
        let (l, r) = list.split_at_mut(a);
        (&mut r[0], Some(&mut l[b]))
    }
}

// ---------------------------------------------------------------------------
// Shape vs triangle
// ---------------------------------------------------------------------------

/// Sphere at `c` (radius r) vs triangle; normal pushes the sphere.
fn sphere_tri(c: Vec3, r: f32, tri: &[Vec3; 3], body_center: Vec3, margin: f32, out: &mut Vec<Raw>) -> Option<Raw> {
    let (cp, _) = closest_point_triangle(c, tri[0], tri[1], tri[2]);
    let d = c - cp;
    let dist2 = d.length_sq();
    let lim = r + margin;
    if dist2 >= lim * lim {
        return None;
    }
    let dist = dist2.sqrt();
    let n = if dist > 1e-6 {
        d / dist
    } else {
        let f = crate::bvh::tri_normal(tri);
        if f.dot(body_center - tri[0]) >= 0.0 {
            f
        } else {
            -f
        }
    };
    let raw = Raw { p: cp, n, sep: dist - r };
    out.push(raw);
    Some(raw)
}

fn shape_vs_triangle(b: &Body, tri: &[Vec3; 3], margin: f32, out: &mut Vec<Raw>) {
    match b.shape {
        Shape::Sphere { r } => {
            sphere_tri(b.pos, r, tri, b.pos, margin, out);
        }
        Shape::Capsule { r, hl } => {
            let (a, e) = b.capsule_ends(hl);
            let ra = sphere_tri(a, r, tri, b.pos, margin, out);
            let re = sphere_tri(e, r, tri, b.pos, margin, out);
            let q = closest_segment_triangle(a, e, tri[0], tri[1], tri[2]);
            if q.s > 0.02 && q.s < 0.98 {
                let lim = r + margin;
                let best_end = ra.map_or(f32::INFINITY, |x| x.sep).min(re.map_or(f32::INFINITY, |x| x.sep));
                if q.dist_sq < lim * lim {
                    let dist = q.dist_sq.sqrt();
                    if dist - r < best_end - (r * 0.05).max(1e-5) {
                        let n = if dist > 1e-6 && !q.intersects {
                            (q.ps - q.pt) / dist
                        } else {
                            let f = crate::bvh::tri_normal(tri);
                            if f.dot(b.pos - tri[0]) >= 0.0 {
                                f
                            } else {
                                -f
                            }
                        };
                        let sep = if q.intersects { -r } else { dist - r };
                        out.push(Raw { p: q.pt, n, sep });
                    }
                }
            }
        }
        Shape::Box { he } => box_tri(b, he, tri, margin, out),
    }
}

#[inline]
fn point_in_triangle(p: Vec3, tri: &[Vec3; 3], n: Vec3, tol: f32) -> bool {
    for k in 0..3 {
        let a = tri[k];
        let b = tri[(k + 1) % 3];
        let edge_n = (b - a).cross(n);
        // edge_n points outward for CCW about n
        let len = edge_n.length();
        if len <= 0.0 {
            return false;
        }
        if (p - a).dot(edge_n) / len > tol {
            return false;
        }
    }
    true
}

fn box_tri(b: &Body, he: Vec3, tri: &[Vec3; 3], margin: f32, out: &mut Vec<Raw>) {
    let m = &b.rot_m;
    let c = b.pos;
    let mut nf = crate::bvh::tri_normal(tri);
    if nf.dot(c - tri[0]) < 0.0 {
        nf = -nf;
    }
    // Box must not be completely on the far side or too far away.
    let r_proj = he.x * m.c[0].dot(nf).abs() + he.y * m.c[1].dot(nf).abs() + he.z * m.c[2].dot(nf).abs();
    let cd = (c - tri[0]).dot(nf);
    if cd - r_proj > margin {
        return;
    }
    let tol = 1e-4;
    let start = out.len();
    // (1) box corners vs triangle face
    for k in 0..8 {
        let sx = if k & 1 != 0 { 1.0 } else { -1.0 };
        let sy = if k & 2 != 0 { 1.0 } else { -1.0 };
        let sz = if k & 4 != 0 { 1.0 } else { -1.0 };
        let p = c + m.c[0] * (sx * he.x) + m.c[1] * (sy * he.y) + m.c[2] * (sz * he.z);
        let d = (p - tri[0]).dot(nf);
        if d >= margin || d < -2.0 * r_proj {
            continue;
        }
        let proj = p - nf * d;
        if point_in_triangle(proj, tri, nf, tol) {
            out.push(Raw { p: proj, n: nf, sep: d });
        }
    }
    // (2) triangle vertices inside the box
    for v in tri.iter() {
        let l = m.transpose_mul_vec(*v - c);
        let pen = v3(he.x + margin - l.x.abs(), he.y + margin - l.y.abs(), he.z + margin - l.z.abs());
        if pen.x <= 0.0 || pen.y <= 0.0 || pen.z <= 0.0 {
            continue;
        }
        // least penetration axis (in terms of distance to face)
        let dist = v3(he.x - l.x.abs(), he.y - l.y.abs(), he.z - l.z.abs());
        let mut ax = 0;
        if dist.y < dist.get(ax) {
            ax = 1;
        }
        if dist.z < dist.get(ax) {
            ax = 2;
        }
        let s = if l.get(ax) >= 0.0 { 1.0 } else { -1.0 };
        let face_n = m.c[ax] * s;
        // Normal pushes the box away from the vertex: -face_n.
        let n = -face_n;
        // Only meaningful if it doesn't fight the triangle's own side.
        if n.dot(nf) < -0.1 {
            continue;
        }
        out.push(Raw { p: *v, n, sep: -dist.get(ax) });
    }
    // (3) edge-edge (separated, within margin)
    let corners = |k: usize| -> Vec3 {
        let sx = if k & 1 != 0 { 1.0 } else { -1.0 };
        let sy = if k & 2 != 0 { 1.0 } else { -1.0 };
        let sz = if k & 4 != 0 { 1.0 } else { -1.0 };
        c + m.c[0] * (sx * he.x) + m.c[1] * (sy * he.y) + m.c[2] * (sz * he.z)
    };
    const EDGES: [(usize, usize); 12] = [(0, 1), (2, 3), (4, 5), (6, 7), (0, 2), (1, 3), (4, 6), (5, 7), (0, 4), (1, 5), (2, 6), (3, 7)];
    for &(i0, i1) in EDGES.iter() {
        let (p0, p1) = (corners(i0), corners(i1));
        for k in 0..3 {
            let (q0, q1) = (tri[k], tri[(k + 1) % 3]);
            let (s, t, cb, ct) = closest_segment_segment(p0, p1, q0, q1);
            if s <= 1e-3 || s >= 1.0 - 1e-3 || t <= 1e-3 || t >= 1.0 - 1e-3 {
                continue;
            }
            let d = cb - ct;
            let dist = d.length();
            if dist <= 1e-5 || dist >= margin {
                continue;
            }
            let n = d / dist;
            if n.dot(c - ct) <= 0.0 || n.dot(nf) < 0.0 {
                continue;
            }
            out.push(Raw { p: ct, n, sep: dist });
        }
    }
    // Cap contact count per triangle: keep the 4 deepest.
    let cnt = out.len() - start;
    if cnt > 4 {
        out[start..].sort_unstable_by(|a, b| a.sep.partial_cmp(&b.sep).unwrap_or(core::cmp::Ordering::Equal));
        out.truncate(start + 4);
    }
}

// ---------------------------------------------------------------------------
// Shape vs shape (normal pushes body `a`)
// ---------------------------------------------------------------------------

/// Core segment of a round shape (sphere = degenerate segment) and its radius.
fn round_core(b: &Body) -> Option<(Vec3, Vec3, f32)> {
    match b.shape {
        Shape::Sphere { r } => Some((b.pos, b.pos, r)),
        Shape::Capsule { r, hl } => {
            let (a, e) = b.capsule_ends(hl);
            Some((a, e, r))
        }
        Shape::Box { .. } => None,
    }
}

fn push_round(pa: Vec3, pb: Vec3, ra: f32, rb: f32, fallback_n: Vec3, margin: f32, out: &mut Vec<Raw>) {
    let d = pa - pb;
    let dist2 = d.length_sq();
    let lim = ra + rb + margin;
    if dist2 >= lim * lim {
        return;
    }
    let dist = dist2.sqrt();
    let n = if dist > 1e-6 { d / dist } else { fallback_n };
    let sep = dist - ra - rb;
    // midpoint between the two surfaces
    let p = pb + n * (rb + sep * 0.5);
    out.push(Raw { p, n, sep });
}

/// Point-sphere (center c, radius r) vs box body; normal pushes the sphere.
fn sphere_box(c: Vec3, r: f32, bx: &Body, he: Vec3, margin: f32) -> Option<Raw> {
    let m = &bx.rot_m;
    let l = m.transpose_mul_vec(c - bx.pos);
    let cl = v3(l.x.clamp(-he.x, he.x), l.y.clamp(-he.y, he.y), l.z.clamp(-he.z, he.z));
    if cl == l {
        // center inside box
        let dist = v3(he.x - l.x.abs(), he.y - l.y.abs(), he.z - l.z.abs());
        let mut ax = 0;
        if dist.y < dist.get(ax) {
            ax = 1;
        }
        if dist.z < dist.get(ax) {
            ax = 2;
        }
        let s = if l.get(ax) >= 0.0 { 1.0 } else { -1.0 };
        let n = m.c[ax] * s;
        let sep = -dist.get(ax) - r;
        return Some(Raw { p: c - n * (r + sep * 0.5), n, sep });
    }
    let q = bx.pos + m.mul_vec(cl);
    let d = c - q;
    let dist = d.length();
    let sep = dist - r;
    if sep >= margin {
        return None;
    }
    let n = d / dist.max(1e-12);
    Some(Raw { p: q + n * (sep * 0.5), n, sep })
}

fn box_point_dist2(bx: &Body, he: Vec3, p: Vec3) -> f32 {
    let l = bx.rot_m.transpose_mul_vec(p - bx.pos);
    let d = v3((l.x.abs() - he.x).max(0.0), (l.y.abs() - he.y).max(0.0), (l.z.abs() - he.z).max(0.0));
    d.length_sq()
}

fn capsule_box(a: Vec3, e: Vec3, r: f32, bx: &Body, he: Vec3, margin: f32, out: &mut Vec<Raw>) {
    // Distance from a point moving along the segment to a convex set is
    // convex: ternary search for the closest parameter.
    let (mut lo, mut hi) = (0.0f32, 1.0f32);
    for _ in 0..24 {
        let m1 = lo + (hi - lo) / 3.0;
        let m2 = hi - (hi - lo) / 3.0;
        if box_point_dist2(bx, he, a.lerp(e, m1)) <= box_point_dist2(bx, he, a.lerp(e, m2)) {
            hi = m2;
        } else {
            lo = m1;
        }
    }
    let t = 0.5 * (lo + hi);
    let mut ts = [0.0, 1.0, t];
    let mut cnt = 3;
    if !(0.05..=0.95).contains(&t) {
        cnt = 2;
    }
    if (a - e).length_sq() < 1e-12 {
        ts[0] = 0.0;
        cnt = 1;
    }
    for &tt in ts.iter().take(cnt) {
        if let Some(raw) = sphere_box(a.lerp(e, tt), r, bx, he, margin) {
            out.push(raw);
        }
    }
}

fn shape_vs_shape(a: &Body, b: &Body, margin: f32, out: &mut Vec<Raw>) {
    let fallback = (a.pos - b.pos).normalize_or(Vec3::Y);
    match (round_core(a), round_core(b)) {
        (Some((a0, a1, ra)), Some((b0, b1, rb))) => {
            let (_, _, ca, cb) = closest_segment_segment(a0, a1, b0, b1);
            push_round(ca, cb, ra, rb, fallback, margin, out);
            // Two contacts for nearly parallel capsules.
            let da = a1 - a0;
            let db = b1 - b0;
            if da.length_sq() > 1e-12 && db.length_sq() > 1e-12 {
                let par = da.normalize_or(Vec3::Y).dot(db.normalize_or(Vec3::Y)).abs();
                if par > 0.98 {
                    for p in [a0, a1] {
                        let (q, t) = closest_point_segment(p, b0, b1);
                        if t > 0.0 && t < 1.0 && (p - ca).length_sq() > 1e-8 {
                            push_round(p, q, ra, rb, fallback, margin, out);
                        }
                    }
                }
            }
        }
        (Some((a0, a1, ra)), None) => {
            if let Shape::Box { he } = b.shape {
                capsule_box(a0, a1, ra, b, he, margin, out);
            }
        }
        (None, Some((b0, b1, rb))) => {
            if let Shape::Box { he } = a.shape {
                let s = out.len();
                capsule_box(b0, b1, rb, a, he, margin, out);
                for r in out[s..].iter_mut() {
                    r.n = -r.n;
                }
            }
        }
        (None, None) => {
            if let (Shape::Box { he: ha }, Shape::Box { he: hb }) = (a.shape, b.shape) {
                box_box(a, ha, b, hb, margin, out);
            }
        }
    }
}

/// Box-box via SAT + incident-face clipping. Normal pushes body `a`.
fn box_box(a: &Body, ha: Vec3, b: &Body, hb: Vec3, margin: f32, out: &mut Vec<Raw>) {
    let ua = a.rot_m.c;
    let ub = b.rot_m.c;
    let t = b.pos - a.pos;
    let proj = |u: &[Vec3; 3], he: Vec3, l: Vec3| he.x * u[0].dot(l).abs() + he.y * u[1].dot(l).abs() + he.z * u[2].dot(l).abs();

    // (pen, axis, kind) kind: 0..3 face A, 3..6 face B, 6.. edge
    let mut best_face = (f32::INFINITY, Vec3::ZERO, 0usize);
    for i in 0..3 {
        let l = ua[i];
        let pen = ha.get(i) + proj(&ub, hb, l) - t.dot(l).abs();
        if pen < -margin {
            return;
        }
        if pen < best_face.0 {
            best_face = (pen, l, i);
        }
    }
    for i in 0..3 {
        let l = ub[i];
        let pen = proj(&ua, ha, l) + hb.get(i) - t.dot(l).abs();
        if pen < -margin {
            return;
        }
        if pen < best_face.0 {
            best_face = (pen, l, 3 + i);
        }
    }
    let mut best_edge = (f32::INFINITY, Vec3::ZERO, 0usize, 0usize);
    for i in 0..3 {
        for j in 0..3 {
            let l = ua[i].cross(ub[j]);
            let len = l.length();
            if len < 1e-4 {
                continue;
            }
            let l = l / len;
            let pen = proj(&ua, ha, l) + proj(&ub, hb, l) - t.dot(l).abs();
            if pen < -margin {
                return;
            }
            if pen < best_edge.0 {
                best_edge = (pen, l, i, j);
            }
        }
    }
    let scale = ha.max_elem().max(hb.max_elem());
    if best_edge.0 < best_face.0 - 0.02 * scale.max(1e-3) {
        // edge-edge
        let (pen, mut n, i, j) = best_edge;
        if n.dot(t) < 0.0 {
            n = -n;
        } // n: A -> B
        let mut pa = a.pos;
        for k in 0..3 {
            if k != i {
                pa += ua[k] * (ha.get(k) * if ua[k].dot(n) >= 0.0 { 1.0 } else { -1.0 });
            }
        }
        let mut pb = b.pos;
        for k in 0..3 {
            if k != j {
                pb -= ub[k] * (hb.get(k) * if ub[k].dot(n) >= 0.0 { 1.0 } else { -1.0 });
            }
        }
        let (_, _, ca, cb) = closest_segment_segment(pa - ua[i] * ha.get(i), pa + ua[i] * ha.get(i), pb - ub[j] * hb.get(j), pb + ub[j] * hb.get(j));
        // normal pushes A: -n
        out.push(Raw { p: (ca + cb) * 0.5, n: -n, sep: -pen });
        return;
    }
    let (_, axis, kind) = best_face;
    // reference box R, incident box I; n points from R to I
    let (rb, rhe, ib, ihe, flip) = if kind < 3 { (a, ha, b, hb, false) } else { (b, hb, a, ha, true) };
    let ri = kind % 3;
    let mut n = axis;
    if n.dot(ib.pos - rb.pos) < 0.0 {
        n = -n;
    }
    let ru = rb.rot_m.c;
    let iu = ib.rot_m.c;
    // incident face: most anti-parallel to n
    let mut k = 0;
    let mut best = -1.0;
    for q in 0..3 {
        let d = iu[q].dot(n).abs();
        if d > best {
            best = d;
            k = q;
        }
    }
    let s = if iu[k].dot(n) > 0.0 { -1.0 } else { 1.0 };
    let fc = ib.pos + iu[k] * (s * ihe.get(k));
    let (k1, k2) = ((k + 1) % 3, (k + 2) % 3);
    let e1 = iu[k1] * ihe.get(k1);
    let e2 = iu[k2] * ihe.get(k2);
    let mut poly = [Vec3::ZERO; 16];
    let mut tmp = [Vec3::ZERO; 16];
    poly[0] = fc + e1 + e2;
    poly[1] = fc - e1 + e2;
    poly[2] = fc - e1 - e2;
    poly[3] = fc + e1 - e2;
    let mut cnt = 4usize;
    for q in [(ri + 1) % 3, (ri + 2) % 3] {
        for sgn in [1.0f32, -1.0] {
            let pn = ru[q] * sgn;
            let off = pn.dot(rb.pos) + rhe.get(q);
            // clip poly against plane pn.x <= off
            let mut oc = 0usize;
            for v in 0..cnt {
                let p0 = poly[v];
                let p1 = poly[(v + 1) % cnt];
                let d0 = pn.dot(p0) - off;
                let d1 = pn.dot(p1) - off;
                if d0 <= 0.0 && oc < 16 {
                    tmp[oc] = p0;
                    oc += 1;
                }
                if (d0 < 0.0) != (d1 < 0.0) && oc < 16 {
                    let tt = d0 / (d0 - d1);
                    tmp[oc] = p0.lerp(p1, tt);
                    oc += 1;
                }
            }
            cnt = oc;
            poly[..cnt].copy_from_slice(&tmp[..cnt]);
            if cnt == 0 {
                return;
            }
        }
    }
    let ref_off = n.dot(rb.pos) + rhe.get(ri);
    let mut pts: [(Vec3, f32); 16] = [(Vec3::ZERO, 0.0); 16];
    let mut pc = 0;
    for p in poly.iter().take(cnt) {
        let sep = n.dot(*p) - ref_off;
        if sep < margin {
            pts[pc] = (*p - n * (sep * 0.5), sep);
            pc += 1;
        }
    }
    // reduce to <= 4 points: deepest, farthest, max area, max distance to segment
    let mut chosen = [usize::MAX; 4];
    let mut nch = 0;
    if pc <= 4 {
        for (i, ch) in chosen.iter_mut().enumerate().take(pc) {
            *ch = i;
        }
        nch = pc;
    } else {
        let mut i0 = 0;
        for i in 1..pc {
            if pts[i].1 < pts[i0].1 {
                i0 = i;
            }
        }
        let mut i1 = usize::MAX;
        let mut bd = -1.0;
        for i in 0..pc {
            let d = (pts[i].0 - pts[i0].0).length_sq();
            if d > bd {
                bd = d;
                i1 = i;
            }
        }
        let mut i2 = usize::MAX;
        let mut ba = -1.0;
        for i in 0..pc {
            let ar = (pts[i1].0 - pts[i0].0).cross(pts[i].0 - pts[i0].0).dot(n);
            if ar > ba {
                ba = ar;
                i2 = i;
            }
        }
        let mut i3 = usize::MAX;
        let mut ba3 = -1.0;
        for i in 0..pc {
            let ar = -(pts[i1].0 - pts[i0].0).cross(pts[i].0 - pts[i0].0).dot(n);
            if ar > ba3 {
                ba3 = ar;
                i3 = i;
            }
        }
        for c in [i0, i1, i2, i3] {
            if c != usize::MAX && !chosen[..nch].contains(&c) {
                chosen[nch] = c;
                nch += 1;
            }
        }
    }
    // normal pushes body a
    let na = if flip { n } else { -n };
    for &c in chosen.iter().take(nch) {
        out.push(Raw { p: pts[c].0, n: na, sep: pts[c].1 });
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::bvh::{box_mesh, grid_mesh};

    fn mats() -> [Material; 256] {
        let mut m = [Material::default(); 256];
        m[1] = Material { friction: 0.7, restitution: 0.6, ricochet_max_angle_deg: 0.0, ricochet_energy_keep: 0.0 };
        // concrete
        m[2] = Material { friction: 0.6, restitution: 0.2, ricochet_max_angle_deg: 0.0, ricochet_energy_keep: 0.0 };
        // brass
        m[3] = Material { friction: 0.4, restitution: 0.4, ricochet_max_angle_deg: 0.0, ricochet_energy_keep: 0.0 };
        m
    }

    fn floor() -> StaticWorld {
        let mut w = StaticWorld::default();
        let (p, i) = grid_mesh(-10.0, -10.0, 20.0, 0.0, 10);
        w.add_mesh(&p, &i, 1);
        w.build();
        w
    }

    #[test]
    fn inertia_capsule_reasonable() {
        let s = Shape::Capsule { r: 0.0048, hl: 0.02 };
        let i = s.inertia(0.0068);
        assert!(i.x > i.y * 5.0);
        assert!(i.x > 1e-7 && i.x < 1e-5, "{:?}", i);
    }

    #[test]
    fn sphere_bounces_and_sleeps() {
        let w = floor();
        let m = mats();
        let mut bs = Bodies::default();
        let id = bs.create(SHAPE_SPHERE, 0.1, 0.0, 0.0, 1.0, 1);
        bs.set_transform(id, v3(0.0, 2.0, 0.0), Quat::IDENTITY);
        let mut bounced = false;
        let mut prev_vy = 0.0;
        let mut min_y = f32::INFINITY;
        let mut events = 0;
        for f in 0..600 {
            bs.step(&w, &m, v3(0.0, -9.81, 0.0), 1.0 / 60.0);
            let b = bs.get(id).unwrap();
            if prev_vy < -1.0 && b.vel.y > 0.5 {
                bounced = true;
            }
            prev_vy = b.vel.y;
            min_y = min_y.min(b.pos.y);
            events += bs.events.len() / CONTACT_STRIDE;
            if f == 599 {
                assert!(b.sleeping, "not sleeping, v={:?}", b.vel);
            }
        }
        assert!(bounced);
        assert!(events >= 2, "events {}", events);
        assert!(min_y > 0.1 - 0.01, "penetrated: {}", min_y);
        let b = bs.get(id).unwrap();
        assert!((b.pos.y - 0.1).abs() < 0.005, "rest y {}", b.pos.y);
        // buffer reflects state
        assert_eq!(bs.buf[0], 1.0);
        assert_eq!(bs.buf[14], 1.0);
    }

    #[test]
    fn first_impact_event() {
        let w = floor();
        let m = mats();
        let mut bs = Bodies::default();
        let id = bs.create(SHAPE_SPHERE, 0.1, 0.0, 0.0, 1.0, 3);
        bs.set_transform(id, v3(0.0, 1.0, 0.0), Quat::IDENTITY);
        for _ in 0..120 {
            bs.step(&w, &m, v3(0.0, -9.81, 0.0), 1.0 / 60.0);
            if !bs.events.is_empty() {
                let e = &bs.events[..CONTACT_STRIDE];
                assert_eq!(e[0], id as f32);
                assert!(e[2].abs() < 0.05);
                assert!((e[5] - 1.0).abs() < 1e-3);
                // v at impact ~ sqrt(2 g 0.9) = 4.2 m/s
                assert!(e[8] > 3.5 && e[8] < 4.6, "speed {}", e[8]);
                assert!(e[7] > 4.0, "impulse {}", e[7]);
                assert_eq!(e[9], 1.0);
                return;
            }
        }
        panic!("no impact event");
    }

    #[test]
    fn brass_casing_on_slab() {
        let mut w = StaticWorld::default();
        // Large footprint so tumbling casings never slide off the edge; the
        // slab is only 0.1 m thick, which is what matters for tunneling.
        let (p, i) = box_mesh(v3(-20.0, -0.1, -20.0), v3(20.0, 0.0, 20.0));
        w.add_mesh(&p, &i, 2);
        w.build();
        let m = mats();
        for (k, (vel, ang)) in [
            (v3(1.5, -6.0, 0.4), v3(30.0, 5.0, 60.0)),
            (v3(0.0, -6.0, 0.0), v3(0.0, 0.0, 0.0)),
            (v3(4.0, -4.5, -1.0), v3(-80.0, 20.0, 10.0)),
            (v3(0.3, -6.0, 0.2), v3(0.0, 200.0, 0.0)),
        ]
        .iter()
        .enumerate()
        {
            let mut bs = Bodies::default();
            let id = bs.create(SHAPE_CAPSULE, 0.0048, 0.02, 0.0, 0.0068, 3);
            let q = Quat::from_axis_angle(v3(1.0, 0.2, 0.3), 0.7 * k as f32);
            bs.set_transform(id, v3(0.0, 0.3, 0.0), q);
            bs.set_velocity(id, *vel, *ang);
            let mut min_low = f32::INFINITY;
            let mut slept_at = None;
            for f in 0..600 {
                bs.step(&w, &m, v3(0.0, -9.81, 0.0), 1.0 / 60.0);
                let b = bs.get(id).unwrap();
                let (a, e) = b.capsule_ends(0.02);
                let low = a.y.min(e.y) - 0.0048;
                min_low = min_low.min(low);
                assert!(b.pos.y > -0.05, "case {k}: casing fell through slab at frame {f}: {:?}", b.pos);
                if b.sleeping && slept_at.is_none() {
                    slept_at = Some(f);
                }
            }
            let b = bs.get(id).unwrap();
            assert!(min_low > -0.003, "case {k}: max penetration {}", min_low);
            assert!(b.sleeping, "case {k}: casing not at rest: v={:?} w={:?}", b.vel, b.angvel);
            // lying on the slab, roughly flat
            assert!(b.pos.y > 0.0 && b.pos.y < 0.03, "case {k}: rest y {}", b.pos.y);
        }
    }

    #[test]
    fn box_settles_flat() {
        let w = floor();
        let m = mats();
        let mut bs = Bodies::default();
        let id = bs.create(SHAPE_BOX, 0.3, 0.2, 0.25, 10.0, 2);
        bs.set_transform(id, v3(0.0, 1.5, 0.0), Quat::from_axis_angle(v3(1.0, 0.5, 0.2), 0.9));
        bs.set_velocity(id, v3(1.0, 0.0, 0.0), v3(0.0, 2.0, 3.0));
        for _ in 0..600 {
            bs.step(&w, &m, v3(0.0, -9.81, 0.0), 1.0 / 60.0);
        }
        let b = bs.get(id).unwrap();
        assert!(b.sleeping, "box not asleep v={:?} w={:?}", b.vel, b.angvel);
        let ys = [0.3, 0.2, 0.25];
        assert!(ys.iter().any(|&y| (b.pos.y - y).abs() < 0.01), "box rest height {}", b.pos.y);
    }

    #[test]
    fn box_stack_and_sphere_on_box() {
        let w = floor();
        let m = mats();
        let mut bs = Bodies::default();
        let a = bs.create(SHAPE_BOX, 0.5, 0.25, 0.5, 20.0, 2);
        let b = bs.create(SHAPE_BOX, 0.3, 0.2, 0.3, 5.0, 2);
        let s = bs.create(SHAPE_SPHERE, 0.1, 0.0, 0.0, 1.0, 2);
        bs.set_transform(a, v3(0.0, 0.26, 0.0), Quat::IDENTITY);
        bs.set_transform(b, v3(0.05, 0.75, 0.0), Quat::from_axis_angle(Vec3::Y, 0.4));
        bs.set_transform(s, v3(0.0, 1.5, 0.0), Quat::IDENTITY);
        for _ in 0..480 {
            bs.step(&w, &m, v3(0.0, -9.81, 0.0), 1.0 / 60.0);
        }
        let (ba, bb) = (bs.get(a).unwrap(), bs.get(b).unwrap());
        assert!((ba.pos.y - 0.25).abs() < 0.01, "a {}", ba.pos.y);
        assert!((bb.pos.y - 0.70).abs() < 0.015, "b {}", bb.pos.y);
        let sy = bs.get(s).unwrap().pos.y;
        // the sphere either stays on top or rolled off to the floor
        assert!((sy - 1.0).abs() < 0.02 || (sy - 0.1).abs() < 0.01, "s {}", sy);
    }

    #[test]
    fn wakes_on_impulse() {
        let w = floor();
        let m = mats();
        let mut bs = Bodies::default();
        let id = bs.create(SHAPE_BOX, 0.2, 0.2, 0.2, 2.0, 2);
        bs.set_transform(id, v3(0.0, 0.2, 0.0), Quat::IDENTITY);
        for _ in 0..120 {
            bs.step(&w, &m, v3(0.0, -9.81, 0.0), 1.0 / 60.0);
        }
        assert!(bs.get(id).unwrap().sleeping);
        bs.apply_impulse_at(id, v3(4.0, 0.0, 0.0), v3(0.0, 0.3, 0.0));
        assert!(!bs.get(id).unwrap().sleeping);
        bs.step(&w, &m, v3(0.0, -9.81, 0.0), 1.0 / 60.0);
        assert!(bs.get(id).unwrap().vel.x > 0.5);
    }

    #[test]
    fn invalid_ids_ignored() {
        let mut bs = Bodies::default();
        bs.set_transform(99, Vec3::ZERO, Quat::IDENTITY);
        bs.apply_impulse_at(5, Vec3::X, Vec3::ZERO);
        bs.remove(42);
        assert_eq!(bs.create(SHAPE_SPHERE, -1.0, 0.0, 0.0, 1.0, 0), NONE);
        assert_eq!(bs.create(7, 1.0, 0.0, 0.0, 1.0, 0), NONE);
        assert_eq!(bs.create(SHAPE_SPHERE, 1.0, 0.0, 0.0, 0.0, 0), NONE);
        let a = bs.create(SHAPE_SPHERE, 1.0, 0.0, 0.0, 1.0, 0);
        let b = bs.create(SHAPE_SPHERE, 1.0, 0.0, 0.0, 1.0, 0);
        bs.remove(a);
        assert!(bs.get(a).is_none());
        let c = bs.create(SHAPE_SPHERE, 1.0, 0.0, 0.0, 1.0, 0);
        assert_eq!(c, a);
        assert!(bs.get(b).is_some());
    }
}
