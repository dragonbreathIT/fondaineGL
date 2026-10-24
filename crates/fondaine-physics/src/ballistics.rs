//! External ballistics: G7 drag, RK4 in f64, collision sweeps, ricochets.
//!
//! Drag deceleration (point-mass model):
//!   a_drag = -rho * |v_rel| * v_rel * Cd_G7(M) * PI / (8 * BC_SI)
//! with BC_SI = BC[lb/in^2] * 703.0696 kg/m^2, v_rel = v - wind and
//! M = |v_rel| / c. Gravity is added on top. Each `step` is split into
//! sub-steps of at most 0.5 ms, each integrated with classic RK4; the chord
//! between sub-step endpoints is swept against the static BVH and live rigid
//! bodies.

use crate::bodies::Bodies;
use crate::bvh::StaticWorld;
use crate::math::*;
use crate::Material;

pub const HIT_STRIDE: usize = 16;
pub const LIVE_STRIDE: usize = 8;
pub const LB_PER_IN2_TO_KG_PER_M2: f64 = 703.0696;
pub const MAX_SUBSTEP: f64 = 0.0005;
pub const MIN_SPEED: f64 = 30.0;
pub const MIN_Y: f64 = -1000.0;
const MAX_RICOCHETS: u32 = 8;
const MAX_PROJECTILES: usize = 4096;
const MAX_HITS: usize = 4096;
/// Random deflection added on ricochet (max, degrees).
const RICOCHET_SCATTER_DEG: f32 = 2.0;
/// Minimum departure angle from the surface after a ricochet (degrees).
const RICOCHET_MIN_EXIT_DEG: f32 = 0.5;
const SURFACE_OFFSET: f64 = 1e-3;

/// G7 standard drag function (Mach, Cd).
pub const G7_TABLE: [(f64, f64); 84] = [
    (0.0, 0.1198), (0.05, 0.1197), (0.1, 0.1196), (0.15, 0.1194), (0.2, 0.1193), (0.25, 0.1194),
    (0.3, 0.1194), (0.35, 0.1194), (0.4, 0.1193), (0.45, 0.1193), (0.5, 0.1194), (0.55, 0.1193),
    (0.6, 0.1194), (0.65, 0.1197), (0.7, 0.1202), (0.725, 0.1207), (0.75, 0.1215), (0.775, 0.1226),
    (0.8, 0.1242), (0.825, 0.1266), (0.85, 0.1306), (0.875, 0.1368), (0.9, 0.1464), (0.925, 0.166),
    (0.95, 0.2054), (0.975, 0.2993), (1.0, 0.3803), (1.025, 0.4015), (1.05, 0.4043), (1.075, 0.4034),
    (1.1, 0.4014), (1.125, 0.3987), (1.15, 0.3955), (1.2, 0.3884), (1.25, 0.381), (1.3, 0.3732),
    (1.35, 0.3657), (1.4, 0.358), (1.5, 0.344), (1.55, 0.3376), (1.6, 0.3315), (1.65, 0.326),
    (1.7, 0.3209), (1.75, 0.316), (1.8, 0.3117), (1.85, 0.3078), (1.9, 0.3042), (1.95, 0.301),
    (2.0, 0.298), (2.05, 0.2951), (2.1, 0.2922), (2.15, 0.2892), (2.2, 0.2864), (2.25, 0.2835),
    (2.3, 0.2807), (2.35, 0.2779), (2.4, 0.2752), (2.45, 0.2725), (2.5, 0.2697), (2.55, 0.267),
    (2.6, 0.2643), (2.65, 0.2615), (2.7, 0.2588), (2.75, 0.2561), (2.8, 0.2533), (2.85, 0.2506),
    (2.9, 0.2479), (2.95, 0.2451), (3.0, 0.2424), (3.1, 0.2368), (3.2, 0.2313), (3.3, 0.2258),
    (3.4, 0.2205), (3.5, 0.2154), (3.6, 0.2106), (3.7, 0.206), (3.8, 0.2017), (3.9, 0.1975),
    (4.0, 0.1935), (4.2, 0.1861), (4.4, 0.1793), (4.6, 0.173), (4.8, 0.1672), (5.0, 0.1618),
];

/// G7 drag coefficient, linear interpolation; clamped outside [0, 5].
pub fn cd_g7(mach: f64) -> f64 {
    let t = &G7_TABLE;
    if !(mach > t[0].0) {
        return t[0].1;
    }
    let last = t[t.len() - 1];
    if mach >= last.0 {
        return last.1;
    }
    // binary search for the segment [i, i+1] containing mach
    let (mut lo, mut hi) = (0usize, t.len() - 1);
    while hi - lo > 1 {
        let mid = (lo + hi) / 2;
        if t[mid].0 <= mach {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    let (m0, c0) = t[lo];
    let (m1, c1) = t[hi];
    c0 + (c1 - c0) * (mach - m0) / (m1 - m0)
}

#[derive(Clone, Copy, Debug)]
pub struct Atmosphere {
    pub temperature_c: f64,
    pub pressure_hpa: f64,
    pub humidity: f64,
    pub wind: DVec3,
    /// Air density, kg/m^3.
    pub rho: f64,
    /// Speed of sound, m/s.
    pub speed_of_sound: f64,
}

impl Default for Atmosphere {
    fn default() -> Self {
        Atmosphere::new(15.0, 1013.25, 0.0, dv3(0.0, 0.0, 0.0))
    }
}

/// Saturation vapour pressure over water in hPa (Buck 1981/1996).
pub fn saturation_vapor_pressure_hpa(t_c: f64) -> f64 {
    6.1121 * ((18.678 - t_c / 234.5) * (t_c / (257.14 + t_c))).exp()
}

impl Atmosphere {
    pub fn new(temperature_c: f64, pressure_hpa: f64, humidity: f64, wind: DVec3) -> Atmosphere {
        let t = if temperature_c.is_finite() { temperature_c.clamp(-90.0, 70.0) } else { 15.0 };
        let p = if pressure_hpa.is_finite() && pressure_hpa > 1.0 { pressure_hpa.min(1200.0) } else { 1013.25 };
        let rh = if humidity.is_finite() { humidity.clamp(0.0, 1.0) } else { 0.0 };
        let wind = if wind.is_finite() { wind } else { dv3(0.0, 0.0, 0.0) };
        let tk = t + 273.15;
        let pv = (rh * saturation_vapor_pressure_hpa(t)).min(p * 0.99);
        let pd = p - pv;
        // R_dry = 287.058 J/(kg K), R_vapour = 461.495 J/(kg K)
        let rho = (pd * 100.0) / (287.058 * tk) + (pv * 100.0) / (461.495 * tk);
        let c = 331.3 * (1.0 + t / 273.15).max(0.0).sqrt();
        Atmosphere { temperature_c: t, pressure_hpa: p, humidity: rh, wind, rho, speed_of_sound: c }
    }
}

#[derive(Clone, Debug)]
pub struct Projectile {
    pub id: u32,
    pub user_id: u32,
    pub pos: DVec3,
    pub vel: DVec3,
    /// rho-independent drag factor PI / (8 * BC_SI).
    pub drag_k: f64,
    pub mass: f64,
    pub diameter: f64,
    pub max_time: f64,
    pub time: f64,
    pub distance: f64,
    pub ricochets: u32,
}

#[derive(Default)]
pub struct Ballistics {
    pub atmo: Atmosphere,
    pub list: Vec<Projectile>,
    pub hits: Vec<f32>,
    pub live: Vec<f32>,
    next_id: u32,
    rng: Rng,
    body_candidates: Vec<u32>,
}

impl Default for Rng {
    fn default() -> Self {
        Rng(0x9E37_79B9_7F4A_7C15)
    }
}

#[derive(Clone, Copy)]
struct DragCtx {
    g: DVec3,
    wind: DVec3,
    rho_k: f64,
    inv_c: f64,
}

#[inline]
fn accel(v: DVec3, c: &DragCtx) -> DVec3 {
    let vr = v - c.wind;
    let s = vr.length();
    let cd = cd_g7(s * c.inv_c);
    c.g - vr * (c.rho_k * cd * s)
}

/// One classic RK4 step of (p, v).
#[inline]
fn rk4(p: DVec3, v: DVec3, h: f64, c: &DragCtx) -> (DVec3, DVec3) {
    let a1 = accel(v, c);
    let v2 = v + a1 * (h * 0.5);
    let a2 = accel(v2, c);
    let v3_ = v + a2 * (h * 0.5);
    let a3 = accel(v3_, c);
    let v4 = v + a3 * h;
    let a4 = accel(v4, c);
    let p1 = p + (v + v2 * 2.0 + v3_ * 2.0 + v4) * (h / 6.0);
    let v1 = v + (a1 + a2 * 2.0 + a3 * 2.0 + a4) * (h / 6.0);
    (p1, v1)
}

struct Hit {
    frac: f64,
    n: Vec3,
    material: u8,
    body: Option<u32>,
}

impl Ballistics {
    pub fn clear(&mut self) {
        self.list.clear();
        self.hits.clear();
        self.live.clear();
    }

    #[allow(clippy::too_many_arguments)]
    pub fn spawn(&mut self, p: DVec3, v: DVec3, bc_g7: f64, mass: f64, diameter: f64, max_time: f64, user_id: u32) -> u32 {
        if !p.is_finite() || !v.is_finite() || !(bc_g7 > 0.0) || !bc_g7.is_finite() || !(max_time > 0.0) || !mass.is_finite() || !diameter.is_finite() {
            return u32::MAX;
        }
        if self.list.len() >= MAX_PROJECTILES {
            return u32::MAX;
        }
        let id = self.next_id;
        self.next_id = self.next_id.wrapping_add(1) & 0x00FF_FFFF; // exact in f32
        let bc_si = bc_g7 * LB_PER_IN2_TO_KG_PER_M2;
        self.list.push(Projectile {
            id,
            user_id,
            pos: p,
            vel: v,
            drag_k: core::f64::consts::PI / (8.0 * bc_si),
            mass: mass.max(0.0),
            diameter: diameter.max(0.0),
            max_time: if max_time.is_finite() { max_time } else { 1e9 },
            time: 0.0,
            distance: 0.0,
            ricochets: 0,
        });
        self.write_live();
        id
    }

    pub fn write_live(&mut self) {
        self.live.clear();
        for p in &self.list {
            self.live.extend_from_slice(&[
                p.id as f32,
                p.user_id as f32,
                p.pos.x as f32,
                p.pos.y as f32,
                p.pos.z as f32,
                p.vel.x as f32,
                p.vel.y as f32,
                p.vel.z as f32,
            ]);
        }
    }

    /// Advance all projectiles by `dt` seconds.
    pub fn step(&mut self, statics: &StaticWorld, bodies: &mut Bodies, mats: &[Material; 256], gravity: Vec3, dt: f32) {
        self.hits.clear();
        if !(dt > 0.0) || !dt.is_finite() {
            self.write_live();
            return;
        }
        let dt = (dt as f64).min(1.0);
        let ctx_base = DragCtx {
            g: gravity.to_d(),
            wind: self.atmo.wind,
            rho_k: 0.0,
            inv_c: 1.0 / self.atmo.speed_of_sound.max(1.0),
        };
        let mut i = 0;
        while i < self.list.len() {
            let mut p = self.list[i].clone();
            let ctx = DragCtx { rho_k: self.atmo.rho * p.drag_k, ..ctx_base };
            let alive = self.advance(&mut p, statics, bodies, mats, &ctx, dt);
            if alive {
                self.list[i] = p;
                i += 1;
            } else {
                self.list.swap_remove(i);
            }
        }
        self.write_live();
    }

    fn gather_bodies(&mut self, p: &Projectile, bodies: &Bodies, dt: f64) {
        self.body_candidates.clear();
        if bodies.list.is_empty() {
            return;
        }
        let v = p.vel.length() + 10.0 * dt + 1.0;
        let reach = (v * dt) as f32 + 0.5;
        let c = p.pos.to_f();
        let bb = Aabb { min: c - Vec3::splat(reach), max: c + Vec3::splat(reach) };
        for (i, b) in bodies.list.iter().enumerate() {
            if b.alive && b.aabb().overlaps(&bb) {
                self.body_candidates.push(i as u32);
            }
        }
    }

    fn sweep(&self, statics: &StaticWorld, bodies: &Bodies, p0: DVec3, p1: DVec3) -> Option<Hit> {
        let d = p1 - p0;
        let len = d.length();
        if !(len > 0.0) {
            return None;
        }
        let o = p0.to_f();
        let dir = (d * (1.0 / len)).to_f().normalize_or(Vec3::X);
        let lenf = len as f32;
        let mut best: Option<Hit> = None;
        let mut best_t = lenf;
        if let Some(h) = statics.raycast(o, dir, best_t) {
            best_t = h.t;
            let n = crate::bvh::tri_normal(&statics.tris[h.tri as usize]);
            best = Some(Hit { frac: 0.0, n, material: statics.mats[h.tri as usize], body: None });
        }
        for &bi in &self.body_candidates {
            if let Some(b) = bodies.get(bi) {
                if let Some((t, n)) = b.raycast(o, dir, best_t) {
                    if t < best_t {
                        best_t = t;
                        best = Some(Hit { frac: 0.0, n, material: b.material, body: Some(bi) });
                    }
                }
            }
        }
        best.map(|mut h| {
            h.frac = (best_t as f64 / len).clamp(0.0, 1.0);
            if h.n.dot(dir) > 0.0 {
                h.n = -h.n;
            }
            h
        })
    }

    /// Returns false when the projectile is finished.
    fn advance(&mut self, p: &mut Projectile, statics: &StaticWorld, bodies: &mut Bodies, mats: &[Material; 256], ctx: &DragCtx, dt: f64) -> bool {
        self.gather_bodies(p, bodies, dt);
        let mut remaining = dt;
        let mut guard = (dt / MAX_SUBSTEP).ceil() as u32 + 2 * MAX_RICOCHETS + 8;
        while remaining > 1e-12 && guard > 0 {
            guard -= 1;
            let h = remaining.min(MAX_SUBSTEP).min(p.max_time - p.time);
            if !(h > 0.0) {
                return false;
            }
            let (p1, v1) = rk4(p.pos, p.vel, h, ctx);
            if !p1.is_finite() || !v1.is_finite() {
                return false;
            }
            if let Some(hit) = self.sweep(statics, bodies, p.pos, p1) {
                let f = hit.frac;
                let hp = p.pos + (p1 - p.pos) * f;
                let vin = p.vel + (v1 - p.vel) * f;
                p.distance += (hp - p.pos).length();
                p.time += h * f;
                remaining -= h * f;
                let mat = mats[hit.material as usize];
                let vin_f = vin.to_f();
                let speed = vin_f.length();
                let dirn = vin_f / speed.max(1e-12);
                let grazing_deg = (-dirn.dot(hit.n)).clamp(0.0, 1.0).asin().to_degrees();
                let ricochet = mat.ricochet_max_angle_deg > 0.0 && grazing_deg < mat.ricochet_max_angle_deg && p.ricochets < MAX_RICOCHETS && mat.ricochet_energy_keep > 0.0;
                let mut vout = DVec3::default();
                if ricochet {
                    let keep = (mat.ricochet_energy_keep.clamp(0.0, 1.0) as f64).sqrt();
                    let refl = vin_f - hit.n * (2.0 * vin_f.dot(hit.n));
                    let rdir = refl.normalize_or(hit.n);
                    let t1 = rdir.any_perp();
                    let t2 = rdir.cross(t1);
                    let ang = RICOCHET_SCATTER_DEG.to_radians() * self.rng.next_f32();
                    let phi = core::f32::consts::TAU * self.rng.next_f32();
                    let mut nd = (rdir + (t1 * phi.cos() + t2 * phi.sin()) * ang.tan()).normalize_or(rdir);
                    // keep it leaving the surface
                    let min_up = RICOCHET_MIN_EXIT_DEG.to_radians().sin();
                    let up = nd.dot(hit.n);
                    if up < min_up {
                        nd = (nd + hit.n * (min_up - up)).normalize_or(hit.n);
                    }
                    vout = (nd * speed).to_d() * keep;
                }
                self.emit_hit(p, hp, hit.n, vin, hit.material, hit.body, ricochet);
                if let Some(bi) = hit.body {
                    let dv = vin - vout;
                    let imp = (dv * p.mass).to_f();
                    bodies.apply_impulse_at(bi, imp, hp.to_f());
                }
                if !ricochet {
                    return false;
                }
                p.ricochets += 1;
                p.pos = hp + hit.n.to_d() * SURFACE_OFFSET;
                p.vel = vout;
                if p.vel.length() < MIN_SPEED {
                    return false;
                }
                continue;
            }
            p.distance += (p1 - p.pos).length();
            p.pos = p1;
            p.vel = v1;
            p.time += h;
            remaining -= h;
            if p.time >= p.max_time - 1e-12 || p.vel.length() < MIN_SPEED || p.pos.y < MIN_Y {
                return false;
            }
        }
        true
    }

    #[allow(clippy::too_many_arguments)]
    fn emit_hit(&mut self, p: &Projectile, hp: DVec3, n: Vec3, vin: DVec3, material: u8, body: Option<u32>, ricochet: bool) {
        if self.hits.len() / HIT_STRIDE >= MAX_HITS {
            return;
        }
        self.hits.extend_from_slice(&[
            p.user_id as f32,
            hp.x as f32,
            hp.y as f32,
            hp.z as f32,
            n.x,
            n.y,
            n.z,
            vin.x as f32,
            vin.y as f32,
            vin.z as f32,
            material as f32,
            p.distance as f32,
            p.time as f32,
            body.map_or(-1.0, |b| b as f32),
            if ricochet { 1.0 } else { 0.0 },
            p.id as f32,
        ]);
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::bvh::box_mesh;

    fn mats() -> [Material; 256] {
        let mut m = [Material::default(); 256];
        m[5] = Material { friction: 0.5, restitution: 0.1, ricochet_max_angle_deg: 15.0, ricochet_energy_keep: 0.5 };
        m
    }

    /// Fire level along +X and record (time, velocity, y, z) when crossing `targets`.
    fn fly(atmo: Atmosphere, v0: f64, targets: &[f64]) -> Vec<(f64, f64, f64, f64)> {
        let w = StaticWorld::default();
        let mut bodies = Bodies::default();
        let mut b = Ballistics { atmo, ..Default::default() };
        b.spawn(dv3(0.0, 1.5, 0.0), dv3(v0, 0.0, 0.0), 0.186, 0.004990, 0.00570, 5.0, 7);
        let mut out = Vec::new();
        let mut prev = b.list[0].clone();
        let mut ti = 0;
        while ti < targets.len() && !b.list.is_empty() {
            b.step(&w, &mut bodies, &mats(), v3(0.0, -9.81, 0.0), 1.0 / 240.0);
            let cur = b.list[0].clone();
            while ti < targets.len() && cur.pos.x >= targets[ti] {
                let f = (targets[ti] - prev.pos.x) / (cur.pos.x - prev.pos.x);
                let lerp = |a: f64, b: f64| a + (b - a) * f;
                out.push((lerp(prev.time, cur.time), lerp(prev.vel.length(), cur.vel.length()), lerp(prev.pos.y, cur.pos.y), lerp(prev.pos.z, cur.pos.z)));
                ti += 1;
            }
            prev = cur;
        }
        out
    }

    #[test]
    fn atmosphere_standard() {
        let a = Atmosphere::default();
        assert!((a.rho - 1.2250).abs() < 0.001, "{}", a.rho);
        assert!((a.speed_of_sound - 340.3).abs() < 0.3, "{}", a.speed_of_sound);
        // humid air is less dense
        let h = Atmosphere::new(30.0, 1013.25, 1.0, dv3(0.0, 0.0, 0.0));
        let d = Atmosphere::new(30.0, 1013.25, 0.0, dv3(0.0, 0.0, 0.0));
        assert!(h.rho < d.rho);
        assert!((d.rho - h.rho - 0.0156).abs() < 0.003, "{}", d.rho - h.rho);
        assert!((saturation_vapor_pressure_hpa(20.0) - 23.39).abs() < 0.05);
    }

    #[test]
    fn g7_interp() {
        assert!((cd_g7(0.0) - 0.1198).abs() < 1e-9);
        assert!((cd_g7(1.0) - 0.3803).abs() < 1e-9);
        assert!((cd_g7(1.0125) - (0.3803 + 0.4015) / 2.0).abs() < 1e-9);
        assert!((cd_g7(9.0) - 0.1618).abs() < 1e-9);
        assert!((cd_g7(-1.0) - 0.1198).abs() < 1e-9);
    }

    #[test]
    fn rifle_556_77gr() {
        let r = fly(Atmosphere::default(), 840.0, &[100.0, 500.0]);
        assert_eq!(r.len(), 2);
        let (t100, _v100, y100, _) = r[0];
        let (t500, v500, _, _) = r[1];
        let drop100 = 1.5 - y100;
        eprintln!("t100={t100:.4} drop100={drop100:.4} t500={t500:.4} v500={v500:.1}");
        assert!((t500 - 0.80).abs() <= 0.08, "tof {t500}");
        assert!(v500 > 470.0 && v500 < 560.0, "v500 {v500}");
        assert!((drop100 - 0.07).abs() <= 0.02, "drop {drop100}");
    }

    #[test]
    fn crosswind_drift() {
        let calm = fly(Atmosphere::default(), 840.0, &[500.0]);
        let windy = fly(Atmosphere::new(15.0, 1013.25, 0.0, dv3(0.0, 0.0, 10.0)), 840.0, &[500.0]);
        let drift = windy[0].3 - calm[0].3;
        eprintln!("drift500={drift:.3}");
        assert!(drift > 1.0 && drift < 2.5, "drift {drift}");
        // Didion's rule: drift = w * (t - x/v0)
        let lag = 10.0 * (calm[0].0 - 500.0 / 840.0);
        assert!((drift - lag).abs() < 0.1 * lag, "drift {drift} vs lag rule {lag}");
    }

    #[test]
    fn wall_hit_event() {
        let mut w = StaticWorld::default();
        let (p, i) = box_mesh(v3(50.0, -5.0, -5.0), v3(51.0, 5.0, 5.0));
        w.add_mesh(&p, &i, 3);
        w.build();
        let mut bodies = Bodies::default();
        let mut b = Ballistics::default();
        let id = b.spawn(dv3(0.0, 1.5, 0.0), dv3(840.0, 0.0, 0.0), 0.186, 0.00499, 0.0057, 3.0, 42);
        let m = mats();
        let mut got = None;
        for _ in 0..30 {
            b.step(&w, &mut bodies, &m, v3(0.0, -9.81, 0.0), 1.0 / 60.0);
            if !b.hits.is_empty() {
                got = Some(b.hits[..HIT_STRIDE].to_vec());
                break;
            }
        }
        let h = got.expect("no hit");
        assert_eq!(h[0], 42.0);
        assert!((h[1] - 50.0).abs() < 1e-3, "x {}", h[1]);
        assert!(h[2] < 1.5 && h[2] > 1.45, "y {}", h[2]);
        assert!((h[4] + 1.0).abs() < 1e-5);
        assert!(h[7] > 780.0);
        assert_eq!(h[10], 3.0);
        assert!((h[11] - 50.0).abs() < 0.01);
        assert!(h[12] > 0.055 && h[12] < 0.065);
        assert_eq!(h[13], -1.0);
        assert_eq!(h[14], 0.0);
        assert_eq!(h[15], id as f32);
        assert!(b.list.is_empty());
    }

    #[test]
    fn shallow_ricochet() {
        let mut w = StaticWorld::default();
        let (p, i) = box_mesh(v3(-1.0, -1.0, -10.0), v3(200.0, 0.0, 10.0));
        w.add_mesh(&p, &i, 5);
        w.build();
        let m = mats();
        let mut bodies = Bodies::default();
        let mut b = Ballistics::default();
        // 5 degrees down onto the ground
        let a = 5f64.to_radians();
        b.spawn(dv3(0.0, 1.0, 0.0), dv3(800.0 * a.cos(), -800.0 * a.sin(), 0.0), 0.186, 0.00499, 0.0057, 2.0, 1);
        let mut first = None;
        for _ in 0..30 {
            b.step(&w, &mut bodies, &m, v3(0.0, -9.81, 0.0), 1.0 / 60.0);
            if first.is_none() && !b.hits.is_empty() {
                first = Some(b.hits[..HIT_STRIDE].to_vec());
                break;
            }
        }
        let h = first.expect("no hit");
        assert_eq!(h[14], 1.0, "expected ricochet");
        assert!((h[2]).abs() < 1e-3);
        assert!((h[1] - 1.0 / a.tan() as f32).abs() < 0.3, "x {}", h[1]);
        // still alive, moving up and slower
        assert_eq!(b.list.len(), 1);
        let pr = &b.list[0];
        assert!(pr.vel.y > 0.0 && pr.pos.y > 0.0);
        assert!(pr.vel.length() < 800.0 * 0.75);

        // steep impact on the same material stops
        let mut b = Ballistics::default();
        b.spawn(dv3(0.0, 1.0, 0.0), dv3(400.0, -400.0, 0.0), 0.186, 0.00499, 0.0057, 2.0, 1);
        b.step(&w, &mut bodies, &m, v3(0.0, -9.81, 0.0), 1.0 / 60.0);
        assert_eq!(b.hits.len(), HIT_STRIDE);
        assert_eq!(b.hits[14], 0.0);
        assert!(b.list.is_empty());
    }

    #[test]
    fn hits_body_and_pushes_it() {
        let w = StaticWorld::default();
        let m = mats();
        let mut bodies = Bodies::default();
        let id = bodies.create(crate::bodies::SHAPE_BOX, 0.2, 0.2, 0.2, 1.0, 0);
        bodies.set_transform(id, v3(20.0, 1.5, 0.0), Quat::IDENTITY);
        let mut b = Ballistics::default();
        b.spawn(dv3(0.0, 1.5, 0.0), dv3(800.0, 0.0, 0.0), 0.186, 0.00499, 0.0057, 2.0, 9);
        b.step(&w, &mut bodies, &m, v3(0.0, 0.0, 0.0), 1.0 / 30.0);
        assert_eq!(b.hits.len(), HIT_STRIDE);
        assert_eq!(b.hits[13], id as f32);
        assert!((b.hits[1] - 19.8).abs() < 1e-3);
        let body = bodies.get(id).unwrap();
        // momentum 0.00499 * ~790 = ~3.9 kg m/s on a 1 kg box
        assert!(body.vel.x > 3.5 && body.vel.x < 4.1, "{}", body.vel.x);
    }

    #[test]
    fn stops_on_max_time_and_low_y() {
        let w = StaticWorld::default();
        let mut bodies = Bodies::default();
        let mut b = Ballistics::default();
        b.spawn(dv3(0.0, 0.0, 0.0), dv3(800.0, 0.0, 0.0), 0.186, 0.00499, 0.0057, 0.1, 0);
        for _ in 0..10 {
            b.step(&w, &mut bodies, &mats(), v3(0.0, -9.81, 0.0), 1.0 / 60.0);
        }
        assert!(b.list.is_empty());
        assert_eq!(b.spawn(dv3(0.0, 0.0, 0.0), dv3(1.0, 0.0, 0.0), -1.0, 0.0, 0.0, 1.0, 0), u32::MAX);
    }
}
