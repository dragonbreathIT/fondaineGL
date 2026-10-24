//! Kinematic capsule character controller (collide-and-slide).
//!
//! The capsule is upright; `pos` is the FEET (bottom of the capsule). The
//! core segment runs from `pos + r*Y` to `pos + (h - r)*Y`.
//!
//! Movement is sub-stepped so no sub-step exceeds `0.45 * radius`, followed by
//! Gauss–Seidel depenetration against nearby static triangles (closest points
//! between the capsule segment and each triangle). Contacts are classified
//! by normal:
//!   * walkable ground (n.y >= cos(max_slope), or the rounded bottom resting
//!     on the edge of a walkable face within step height): resolved by pushing
//!     straight up, so standing on a slope does not creep downhill;
//!   * ceiling (n.y < -0.5): resolved along the contact normal;
//!   * walls and too-steep slopes: resolved horizontally only, so the
//!     character can never climb them and slides off them under gravity.
//!
//! The remaining displacement is clipped against each contact plane, which
//! produces sliding. Step-up and snap-down are layered on top.

use crate::bvh::StaticWorld;
use crate::math::*;

pub const FLAG_GROUNDED: u32 = 1;
pub const FLAG_CEILING: u32 = 2;
pub const FLAG_WALL: u32 = 4;

/// Normals with y below this are ceilings.
const CEILING_NY: f32 = -0.5;
/// Minimum contact-normal Y for a ledge-edge contact to count as support.
const LEDGE_MIN_NY: f32 = 0.1;
/// A ledge edge supports the character only if it is within this fraction
/// of the radius (horizontally) from the capsule axis; beyond that the
/// character slides off the edge.
const LEDGE_MAX_DIST: f32 = 0.95;
/// Minimum forward distance (fraction of radius) tried during step-up, so
/// slow walkers still get far enough over a ledge to be supported by it.
const STEP_MIN_FORWARD: f32 = 0.3;
const MAX_SUBSTEPS: usize = 2048;
const DEPEN_ITERS: usize = 8;

#[derive(Clone, Debug)]
pub struct Character {
    pub pos: Vec3,
    pub radius: f32,
    pub height: f32,
    pub step_height: f32,
    pub cos_max_slope: f32,
    pub grounded: bool,
    pub ground_normal: Vec3,
    pub ground_material: u32,
}

#[derive(Clone, Copy, Debug)]
struct Slide {
    pos: Vec3,
    flags: u32,
}

#[derive(Clone, Copy, Debug)]
pub struct Ground {
    pub grounded: bool,
    pub normal: Vec3,
    pub material: u32,
}

impl Character {
    pub fn new(radius: f32, height: f32, step_height: f32, max_slope_deg: f32) -> Option<Character> {
        if !(radius > 0.0 && radius.is_finite() && height.is_finite() && step_height.is_finite() && max_slope_deg.is_finite()) {
            return None;
        }
        let height = height.max(2.0 * radius);
        Some(Character {
            pos: Vec3::ZERO,
            radius,
            height,
            step_height: step_height.max(0.0),
            cos_max_slope: max_slope_deg.clamp(0.0, 89.9).to_radians().cos(),
            grounded: false,
            ground_normal: Vec3::Y,
            ground_material: 0,
        })
    }

    #[inline]
    fn skin(&self) -> f32 {
        (self.radius * 0.05).clamp(0.002, 0.02)
    }

    #[inline]
    fn segment(&self, pos: Vec3, height: f32) -> (Vec3, Vec3) {
        let r = self.radius;
        let top = (height - r).max(r);
        (pos + Vec3::Y * r, pos + Vec3::Y * top)
    }

    /// Collect nearby triangles; triangles with walkable faces are ordered
    /// first so ground resolution (vertical lift) wins over wall resolution
    /// at shared ledge edges.
    fn gather(&self, w: &StaticWorld, pos: Vec3, height: f32, margin: f32, out: &mut Vec<u32>) {
        let (a, b) = self.segment(pos, height);
        let e = self.radius + margin;
        let bb = Aabb { min: a.min(b) - Vec3::splat(e), max: a.max(b) + Vec3::splat(e) };
        w.query_aabb(&bb, out);
        let cm = self.cos_max_slope;
        out.sort_unstable_by_key(|&t| {
            let n = crate::bvh::tri_normal(&w.tris[t as usize]);
            n.y.abs() < cm
        });
    }

    /// Ledge-edge support test (see `ground_lift`).
    #[inline]
    fn is_ledge(&self, pos: Vec3, pt: Vec3, n: Vec3, face: Vec3) -> bool {
        let r = self.radius;
        let hd = ((pt.x - pos.x).powi(2) + (pt.z - pos.z).powi(2)).sqrt();
        face.y >= self.cos_max_slope
            && n.y > LEDGE_MIN_NY
            && pt.y <= pos.y + r + 1e-5
            && pt.y - pos.y <= self.step_height + 1e-4
            && hd <= r * LEDGE_MAX_DIST
    }

    /// Classify a contact. Returns Some(lift) if it should be resolved as
    /// ground (by moving straight up by `lift`), None otherwise.
    ///
    /// Ground = contact normal is walkable, or the triangle FACE is walkable
    /// and the contact is a ledge edge touching the lower hemisphere within
    /// `step_height` of the feet (rounded capsule bottom resting on an edge).
    fn ground_lift(&self, pos: Vec3, q: &SegTriClosest, n: Vec3, face: Vec3, depth: f32) -> Option<f32> {
        let r = self.radius;
        let face_contact = n.dot(face).abs() > 0.999;
        if n.y >= self.cos_max_slope {
            if face_contact || n.y > 0.999 {
                return Some((depth / n.y).min(r));
            }
        } else {
            if !self.is_ledge(pos, q.pt, n, face) {
                return None;
            }
        }
        // Edge/vertex contact: lift the bottom sphere until it is exactly r
        // from the contact point.
        let d = q.ps - q.pt;
        let dh2 = d.x * d.x + d.z * d.z;
        let dy = d.y;
        let need = (r * r - dh2).max(0.0).sqrt();
        Some((need - dy).clamp(0.0, r + self.step_height))
    }

    /// Iterative depenetration at `pos`. Returns the corrected position, the
    /// contact flags, and pushes the (mode-adjusted) contact plane normals
    /// into `planes` (used to clip the remaining displacement).
    fn depenetrate(&self, w: &StaticWorld, mut pos: Vec3, ref_center: Vec3, tris: &[u32], planes: &mut Vec<Vec3>) -> (Vec3, u32) {
        let r = self.radius;
        let tol = 1e-5 + r * 1e-4;
        let mut flags = 0;
        for iter in 0..DEPEN_ITERS {
            // Last two iterations: plain normal push to escape any wedge.
            let plain = iter >= DEPEN_ITERS - 2;
            let mut any = false;
            for &ti in tris {
                let tri = &w.tris[ti as usize];
                let (a, b) = self.segment(pos, self.height);
                let q = closest_segment_triangle(a, b, tri[0], tri[1], tri[2]);
                if q.dist_sq >= (r - tol) * (r - tol) {
                    continue;
                }
                let dist = q.dist_sq.sqrt();
                let mut face = crate::bvh::tri_normal(tri);
                if face.dot(ref_center - q.pt) < 0.0 {
                    face = -face;
                }
                let n = if dist > 1e-6 && !q.intersects { (q.ps - q.pt) / dist } else { face };
                let depth = if q.intersects { r + 1e-4 } else { r - dist };
                let push;
                let plane;
                let lift = if plain { None } else { self.ground_lift(pos, &q, n, face, depth) };
                if let Some(l) = lift {
                    // Walkable: lift straight up.
                    push = Vec3::Y * (l + 1e-5);
                    plane = Vec3::Y;
                } else if n.y < CEILING_NY {
                    push = n * depth;
                    plane = n;
                    flags |= FLAG_CEILING;
                } else {
                    let h = v3(n.x, 0.0, n.z);
                    let hl = h.length();
                    if hl > 0.2 && !plain {
                        let hn = h / hl;
                        push = hn * (depth / hl).min(r);
                        plane = hn;
                    } else {
                        push = n * depth;
                        plane = n;
                    }
                    if n.y < self.cos_max_slope {
                        flags |= FLAG_WALL;
                    }
                }
                pos += push;
                if planes.len() < 32 && !planes.iter().any(|p| p.dot(plane) > 0.999) {
                    planes.push(plane);
                }
                any = true;
            }
            if !any {
                break;
            }
        }
        (pos, flags)
    }

    /// Collide-and-slide `disp` starting at `start`.
    fn slide(&self, w: &StaticWorld, start: Vec3, disp: Vec3, scratch: &mut Vec<u32>) -> Slide {
        let r = self.radius;
        let len = disp.length();
        if !len.is_finite() {
            return Slide { pos: start, flags: 0 };
        }
        let max_step = r * 0.45;
        let n = ((len / max_step).ceil() as usize).clamp(1, MAX_SUBSTEPS);
        let mut pos = start;
        let mut rem = disp;
        let mut flags = 0u32;
        let mut planes: Vec<Vec3> = Vec::new();
        for i in 0..n {
            let step = rem / (n - i) as f32;
            let prev_center = pos + Vec3::Y * (self.height * 0.5);
            pos += step;
            rem -= step;
            self.gather(w, pos, self.height, r * 0.5 + self.skin(), scratch);
            planes.clear();
            let (p, f) = self.depenetrate(w, pos, prev_center, scratch, &mut planes);
            pos = p;
            flags |= f;
            for pl in &planes {
                let d = rem.dot(*pl);
                if d < 0.0 {
                    rem -= *pl * d;
                }
            }
            if rem.length_sq() < 1e-14 && i + 1 < n {
                break;
            }
        }
        Slide { pos, flags }
    }

    /// Ground probe at `pos`: a walkable contact within `skin` of the capsule.
    pub fn probe_ground(&self, w: &StaticWorld, pos: Vec3, scratch: &mut Vec<u32>) -> Ground {
        let r = self.radius;
        let skin = self.skin();
        self.gather(w, pos, self.height, skin, scratch);
        let mut best = Ground { grounded: false, normal: Vec3::Y, material: 0 };
        let mut best_d = f32::INFINITY;
        let (a, b) = self.segment(pos, self.height);
        for &ti in scratch.iter() {
            let tri = &w.tris[ti as usize];
            let q = closest_segment_triangle(a, b, tri[0], tri[1], tri[2]);
            let lim = r + skin;
            if q.dist_sq >= lim * lim {
                continue;
            }
            let dist = q.dist_sq.sqrt();
            let mut f = crate::bvh::tri_normal(tri);
            if f.dot(a - q.pt) < 0.0 {
                f = -f;
            }
            let n = if dist > 1e-6 && !q.intersects { (q.ps - q.pt) / dist } else { f };
            let walkable = n.y >= self.cos_max_slope || self.is_ledge(pos, q.pt, n, f);
            if walkable && dist < best_d {
                best_d = dist;
                // Report the face normal when the contact is on the walkable
                // face (or a ledge edge of it); else the rounded-edge normal.
                let normal = if f.dot(n) > 0.995 || n.y < self.cos_max_slope { f } else { n };
                best = Ground { grounded: true, normal, material: w.mats[ti as usize] as u32 };
            }
        }
        best
    }

    /// Move by `disp` with collide-and-slide, step-up and snap-down.
    pub fn do_move(&mut self, w: &StaticWorld, disp: Vec3, scratch: &mut Vec<u32>) -> u32 {
        if !disp.is_finite() || !self.pos.is_finite() {
            return if self.grounded { FLAG_GROUNDED } else { 0 };
        }
        let was_grounded = self.grounded;
        let start = self.pos;
        let skin = self.skin();
        let plain = self.slide(w, start, disp, scratch);
        let mut result = plain;

        let horiz = v3(disp.x, 0.0, disp.z);
        let hlen = horiz.length();
        if (plain.flags & FLAG_WALL) != 0 && hlen > 1e-6 && self.step_height > 0.0 {
            let plain_ground = self.probe_ground(w, plain.pos, scratch).grounded;
            if was_grounded || plain_ground {
                let hdir = horiz / hlen;
                let up = self.slide(w, start, Vec3::Y * self.step_height, scratch);
                let raised = up.pos.y - start.y;
                if raised > 1e-4 {
                    let fwd_len = hlen.max(self.radius * STEP_MIN_FORWARD);
                    let fwd = self.slide(w, up.pos, hdir * fwd_len, scratch);
                    let down_dist = raised + (-disp.y).max(0.0) + skin * 2.0;
                    let down = self.slide(w, fwd.pos, Vec3::Y * -down_dist, scratch);
                    let g = self.probe_ground(w, down.pos, scratch);
                    let prog_plain = (plain.pos - start).dot(hdir);
                    let prog_step = (down.pos - start).dot(hdir);
                    if g.grounded && prog_step > prog_plain + 1e-4 && down.pos.y - start.y <= self.step_height + skin {
                        result = Slide { pos: down.pos, flags: (up.flags & FLAG_CEILING) | fwd.flags | down.flags };
                    }
                }
            }
        }

        let mut ground = self.probe_ground(w, result.pos, scratch);
        if was_grounded && !ground.grounded && disp.y <= 1e-6 && self.step_height > 0.0 {
            let snap = self.slide(w, result.pos, Vec3::Y * -(self.step_height + skin), scratch);
            let g = self.probe_ground(w, snap.pos, scratch);
            if g.grounded {
                result.pos = snap.pos;
                ground = g;
            }
        }

        self.pos = result.pos;
        self.grounded = ground.grounded;
        if ground.grounded {
            self.ground_normal = ground.normal;
            self.ground_material = ground.material;
        } else {
            self.ground_normal = Vec3::ZERO;
            self.ground_material = 0;
        }
        let mut flags = result.flags & (FLAG_CEILING | FLAG_WALL);
        if ground.grounded {
            flags |= FLAG_GROUNDED;
        }
        flags
    }

    /// True if the capsule at `pos` with `height` overlaps static geometry by
    /// more than a small tolerance.
    pub fn overlaps(&self, w: &StaticWorld, pos: Vec3, height: f32, scratch: &mut Vec<u32>) -> bool {
        let r = self.radius;
        let tol = (r * 0.01).clamp(0.001, 0.005);
        self.gather(w, pos, height, 0.0, scratch);
        let (a, b) = self.segment(pos, height);
        scratch.iter().any(|&ti| {
            let tri = &w.tris[ti as usize];
            let q = closest_segment_triangle(a, b, tri[0], tri[1], tri[2]);
            q.intersects || q.dist_sq < (r - tol) * (r - tol)
        })
    }

    /// Resize. Shrinking always succeeds; growing is refused if the taller
    /// capsule would overlap geometry.
    pub fn set_height(&mut self, w: &StaticWorld, height: f32, scratch: &mut Vec<u32>) -> bool {
        if !height.is_finite() {
            return false;
        }
        let h = height.max(2.0 * self.radius);
        if h > self.height && self.overlaps(w, self.pos, h, scratch) {
            return false;
        }
        self.height = h;
        true
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::bvh::{box_mesh, grid_mesh};

    fn add_box(w: &mut StaticWorld, min: Vec3, max: Vec3, mat: u8) {
        let (p, i) = box_mesh(min, max);
        w.add_mesh(&p, &i, mat);
    }

    fn floor_world() -> StaticWorld {
        let mut w = StaticWorld::default();
        let (p, i) = grid_mesh(-20.0, -20.0, 40.0, 0.0, 20);
        w.add_mesh(&p, &i, 1);
        w
    }

    fn ch() -> Character {
        Character::new(0.3, 1.8, 0.35, 50.0).unwrap()
    }

    /// Simulate `secs` of walking with horizontal velocity `vel` and gravity.
    fn walk(c: &mut Character, w: &StaticWorld, vel: Vec3, secs: f32) -> u32 {
        let dt = 1.0 / 60.0;
        let mut vy = 0.0f32;
        let mut s = Vec::new();
        let mut flags = 0;
        let mut acc = 0u32;
        for _ in 0..(secs / dt) as usize {
            vy -= 9.81 * dt;
            flags = c.do_move(w, v3(vel.x * dt, vy * dt, vel.z * dt), &mut s);
            acc |= flags;
            if flags & FLAG_GROUNDED != 0 && vy < 0.0 {
                vy = 0.0;
            }
            if flags & FLAG_CEILING != 0 && vy > 0.0 {
                vy = 0.0;
            }
        }
        flags | (acc & FLAG_WALL)
    }

    #[test]
    fn falls_and_lands() {
        let mut w = floor_world();
        w.build();
        let mut c = ch();
        c.pos = v3(0.3, 5.0, 0.7);
        let f = walk(&mut c, &w, Vec3::ZERO, 2.0);
        assert!(f & FLAG_GROUNDED != 0, "flags {f}");
        assert!(c.pos.y.abs() < 0.01, "y = {}", c.pos.y);
        assert!((c.ground_normal.y - 1.0).abs() < 1e-4);
        assert_eq!(c.ground_material, 1);
    }

    #[test]
    fn fast_fall_does_not_tunnel_thin_floor() {
        let mut w = StaticWorld::default();
        add_box(&mut w, v3(-5.0, -0.02, -5.0), v3(5.0, 0.0, 5.0), 0);
        w.build();
        let mut c = ch();
        c.pos = v3(0.0, 3.0, 0.0);
        let mut s = Vec::new();
        // one huge displacement of 6 m straight down
        let f = c.do_move(&w, v3(0.0, -6.0, 0.0), &mut s);
        assert!(f & FLAG_GROUNDED != 0);
        assert!(c.pos.y.abs() < 0.01, "{}", c.pos.y);
    }

    #[test]
    fn slides_along_wall_without_penetrating() {
        let mut w = floor_world();
        add_box(&mut w, v3(1.0, 0.0, -10.0), v3(1.2, 3.0, 10.0), 2);
        w.build();
        let mut c = ch();
        c.pos = v3(0.0, 0.0, 0.0);
        let mut s = Vec::new();
        c.do_move(&w, v3(0.0, -0.01, 0.0), &mut s);
        let f = walk(&mut c, &w, v3(3.0, 0.0, 3.0), 2.0);
        assert!(f & FLAG_WALL != 0);
        assert!(c.pos.x <= 1.0 - 0.3 + 1e-3, "x {}", c.pos.x);
        assert!(c.pos.x > 0.6, "x {}", c.pos.x);
        assert!(c.pos.z > 5.0, "z {}", c.pos.z);
        assert!(c.pos.y.abs() < 0.01);
    }

    #[test]
    fn does_not_tunnel_thin_wall_at_speed() {
        let mut w = floor_world();
        add_box(&mut w, v3(2.0, 0.0, -10.0), v3(2.01, 3.0, 10.0), 2);
        w.build();
        let mut c = ch();
        let mut s = Vec::new();
        c.do_move(&w, v3(0.0, -0.01, 0.0), &mut s);
        c.do_move(&w, v3(10.0, 0.0, 0.0), &mut s);
        assert!(c.pos.x < 2.0 - 0.29, "x {}", c.pos.x);
    }

    #[test]
    fn steps_up_onto_step() {
        let mut w = floor_world();
        add_box(&mut w, v3(1.0, 0.0, -3.0), v3(4.0, 0.25, 3.0), 3);
        w.build();
        let mut c = ch();
        let mut s = Vec::new();
        c.do_move(&w, v3(0.0, -0.01, 0.0), &mut s);
        let f = walk(&mut c, &w, v3(2.0, 0.0, 0.0), 1.5);
        assert!(f & FLAG_GROUNDED != 0);
        assert!((c.pos.y - 0.25).abs() < 0.01, "y {}", c.pos.y);
        assert!(c.pos.x > 2.0, "x {}", c.pos.x);
        assert_eq!(c.ground_material, 3);
    }

    #[test]
    fn refuses_too_tall_step() {
        let mut w = floor_world();
        add_box(&mut w, v3(1.0, 0.0, -3.0), v3(4.0, 0.5, 3.0), 3);
        w.build();
        let mut c = ch();
        let f = walk(&mut c, &w, v3(2.0, 0.0, 0.0), 1.5);
        assert!(f & FLAG_WALL != 0);
        assert!(c.pos.y.abs() < 0.01);
        assert!(c.pos.x < 0.71);
    }

    #[test]
    fn snaps_down_stairs() {
        // descending stairs of 0.2 m: character should stay grounded every frame
        let mut w = StaticWorld::default();
        for k in 0..6 {
            let x0 = k as f32 * 0.5;
            let top = 1.2 - k as f32 * 0.2;
            add_box(&mut w, v3(x0, -1.0, -2.0), v3(x0 + 0.5, top, 2.0), 0);
        }
        add_box(&mut w, v3(3.0, -1.0, -2.0), v3(8.0, 0.0, 2.0), 0);
        w.build();
        let mut c = ch();
        c.pos = v3(0.2, 1.2, 0.0);
        let mut s = Vec::new();
        c.do_move(&w, v3(0.0, -0.01, 0.0), &mut s);
        assert!(c.grounded);
        let dt = 1.0 / 60.0;
        let mut ungrounded = 0;
        // 3 s at 1.5 m/s: ends at x ~4.7, well clear of the last stair edge
        for _ in 0..180 {
            let f = c.do_move(&w, v3(1.5 * dt, -9.81 * dt * dt, 0.0), &mut s);
            if f & FLAG_GROUNDED == 0 {
                ungrounded += 1;
            }
        }
        assert!(c.pos.x > 3.0);
        assert!(c.pos.y.abs() < 0.01, "{}", c.pos.y);
        assert_eq!(ungrounded, 0);
    }

    fn ramp_world(angle_deg: f32) -> StaticWorld {
        let mut w = floor_world();
        let a = angle_deg.to_radians();
        let len = 6.0;
        let (x0, x1) = (1.0, 1.0 + len * a.cos());
        let y1 = len * a.sin();
        let pos = [x0, 0.0, -5.0, x0, 0.0, 5.0, x1, y1, 5.0, x1, y1, -5.0];
        // CCW from above-left (normal pointing to -x/+y)
        let idx = [0, 1, 2, 0, 2, 3];
        w.add_mesh(&pos, &idx, 4);
        w
    }

    #[test]
    fn refuses_steep_slope() {
        let mut w = ramp_world(60.0);
        w.build();
        let mut c = ch();
        walk(&mut c, &w, v3(3.0, 0.0, 0.0), 3.0);
        assert!(c.pos.y < 0.15, "climbed to y {}", c.pos.y);
        assert!(c.pos.x < 1.2, "x {}", c.pos.x);
    }

    #[test]
    fn walks_up_gentle_slope() {
        let mut w = ramp_world(30.0);
        w.build();
        let mut c = ch();
        walk(&mut c, &w, v3(3.0, 0.0, 0.0), 2.0);
        assert!(c.pos.y > 1.0, "y {}", c.pos.y);
        assert!(c.grounded);
        assert!((c.ground_normal.y - 30f32.to_radians().cos()).abs() < 0.01);
    }

    #[test]
    fn slides_off_steep_slope() {
        let mut w = ramp_world(60.0);
        w.build();
        let mut c = ch();
        c.pos = v3(2.5, 4.0, 0.0);
        walk(&mut c, &w, Vec3::ZERO, 4.0);
        assert!(c.pos.y < 0.05, "stuck on slope at y {}", c.pos.y);
    }

    #[test]
    fn crouch_stand() {
        let mut w = floor_world();
        add_box(&mut w, v3(-2.0, 1.2, -2.0), v3(2.0, 1.5, 2.0), 0);
        w.build();
        let mut c = ch();
        let mut s = Vec::new();
        assert!(c.set_height(&w, 1.0, &mut s));
        c.pos = v3(0.0, 0.0, 0.0);
        c.do_move(&w, v3(0.0, -0.01, 0.0), &mut s);
        assert!(!c.set_height(&w, 1.8, &mut s));
        assert!((c.height - 1.0).abs() < 1e-6);
        // walk out from under the ceiling
        walk(&mut c, &w, v3(3.0, 0.0, 0.0), 1.5);
        assert!(c.pos.x > 2.5);
        assert!(c.set_height(&w, 1.8, &mut s));
        assert!((c.height - 1.8).abs() < 1e-6);
    }

    #[test]
    fn hits_ceiling_when_jumping() {
        let mut w = floor_world();
        add_box(&mut w, v3(-2.0, 2.2, -2.0), v3(2.0, 2.5, 2.0), 0);
        w.build();
        let mut c = ch();
        let mut s = Vec::new();
        c.do_move(&w, v3(0.0, -0.01, 0.0), &mut s);
        let f = c.do_move(&w, v3(0.0, 1.0, 0.0), &mut s);
        assert!(f & FLAG_CEILING != 0);
        assert!(c.pos.y + 1.8 <= 2.2 + 1e-3);
    }
}
