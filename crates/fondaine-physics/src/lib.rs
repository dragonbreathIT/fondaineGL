//! fondaine-physics: the physics core of the fondaine engine.
//!
//! * `bvh`        static triangle BVH (binned SAH), ray and AABB queries
//! * `bake`       sky-visibility grid bake
//! * `gi`         path-traced irradiance-probe bake (baked diffuse global illumination)
//! * `character`  kinematic capsule character controller
//! * `bodies`     impulse-based rigid bodies with contact events
//! * `ballistics` G7 external ballistics with ricochets
//! * `ffi`        the plain C ABI used from TypeScript (wasm32)
//!
//! Units: meters, kilograms, seconds. Y-up, right-handed.
//!
//! All state lives in one global `World` (wasm is single-threaded). The
//! native test-suite uses the same global through a mutex-guarded helper.

// `!(x > 0.0)` is used deliberately throughout: it also rejects NaN.
#![allow(clippy::neg_cmp_op_on_partial_ord)]
// Index loops over fixed 3-axis arrays read better than zipped iterators.
#![allow(clippy::needless_range_loop)]

pub mod bake;
pub mod ballistics;
pub mod bodies;
pub mod bvh;
pub mod character;
pub mod ffi;
pub mod gi;
pub mod math;

use math::*;

/// Surface material. Ids 0..=255.
#[derive(Clone, Copy, Debug, PartialEq)]
pub struct Material {
    pub friction: f32,
    pub restitution: f32,
    /// Max grazing angle (from the surface plane) at which projectiles
    /// ricochet; 0 = never.
    pub ricochet_max_angle_deg: f32,
    /// Fraction of kinetic energy kept on ricochet (0..1).
    pub ricochet_energy_keep: f32,
}

impl Default for Material {
    fn default() -> Self {
        Material { friction: 0.6, restitution: 0.2, ricochet_max_angle_deg: 0.0, ricochet_energy_keep: 0.0 }
    }
}

/// Size of the single-result scratch buffer, in f32s.
pub const RESULT_LEN: usize = 64;

pub struct World {
    pub statics: bvh::StaticWorld,
    pub materials: [Material; 256],
    pub bodies: bodies::Bodies,
    pub characters: Vec<Option<character::Character>>,
    pub ballistics: ballistics::Ballistics,
    pub gravity: Vec3,
    pub result: [f32; RESULT_LEN],
    pub scratch: Vec<u32>,
}

impl Default for World {
    fn default() -> Self {
        World {
            statics: bvh::StaticWorld::default(),
            materials: [Material::default(); 256],
            bodies: bodies::Bodies::default(),
            characters: Vec::new(),
            ballistics: ballistics::Ballistics::default(),
            gravity: v3(0.0, -9.81, 0.0),
            result: [0.0; RESULT_LEN],
            scratch: Vec::new(),
        }
    }
}

/// Raycast result (public API form).
#[derive(Clone, Copy, Debug)]
pub struct WorldHit {
    pub t: f32,
    pub point: Vec3,
    /// Faces against the ray.
    pub normal: Vec3,
    pub material: u32,
    /// Global triangle index (insertion order) or -1 for bodies.
    pub triangle: i64,
    /// Body id or -1 for static geometry.
    pub body: i64,
}

impl World {
    /// Clears static geometry, bodies, characters and projectiles.
    /// Materials, gravity and atmosphere are kept.
    pub fn reset(&mut self) {
        self.statics.clear();
        self.bodies.clear();
        self.characters.clear();
        self.ballistics.clear();
    }

    pub fn raycast(&mut self, o: Vec3, d: Vec3, max_dist: f32, include_bodies: bool) -> Option<WorldHit> {
        self.statics.ensure_built();
        if !o.is_finite() || !d.is_finite() || !(max_dist > 0.0) {
            return None;
        }
        let dir = d.normalize_or(Vec3::ZERO);
        if dir == Vec3::ZERO {
            return None;
        }
        let mut best: Option<WorldHit> = None;
        let mut lim = max_dist;
        if let Some(h) = self.statics.raycast(o, dir, lim) {
            lim = h.t;
            let tri = &self.statics.tris[h.tri as usize];
            let mut n = bvh::tri_normal(tri);
            if n.dot(dir) > 0.0 {
                n = -n;
            }
            best = Some(WorldHit {
                t: h.t,
                point: o + dir * h.t,
                normal: n,
                material: self.statics.mats[h.tri as usize] as u32,
                triangle: self.statics.orig[h.tri as usize] as i64,
                body: -1,
            });
        }
        if include_bodies {
            if let Some((t, mut n, id)) = self.bodies.raycast(o, dir, lim) {
                if n.dot(dir) > 0.0 {
                    n = -n;
                }
                best = Some(WorldHit {
                    t,
                    point: o + dir * t,
                    normal: n,
                    material: self.bodies.list[id as usize].material as u32,
                    triangle: -1,
                    body: id as i64,
                });
            }
        }
        best
    }

    pub fn step(&mut self, dt: f32) {
        self.statics.ensure_built();
        self.bodies.step(&self.statics, &self.materials, self.gravity, dt);
        self.ballistics.step(&self.statics, &mut self.bodies, &self.materials, self.gravity, dt);
        // Projectile impulses may have woken/pushed bodies: refresh exports.
        self.bodies.sync_all();
    }
}

// ---------------------------------------------------------------------------
// Global world
// ---------------------------------------------------------------------------

struct GlobalCell(core::cell::UnsafeCell<Option<World>>);
// SAFETY: wasm32 is single-threaded. On native targets the global is only
// accessed by tests, which serialize through `test_lock()`.
unsafe impl Sync for GlobalCell {}
static WORLD: GlobalCell = GlobalCell(core::cell::UnsafeCell::new(None));

/// Access the global world.
///
/// # Safety contract
/// Callers must not hold the returned reference across another call to
/// `world()`; every exported function obtains it once and drops it before
/// returning. Single-threaded use only.
#[allow(clippy::mut_from_ref)]
pub(crate) fn world() -> &'static mut World {
    // SAFETY: see above.
    unsafe {
        let slot = &mut *WORLD.0.get();
        slot.get_or_insert_with(World::default)
    }
}

/// Serializes native tests that touch the global world.
#[cfg(test)]
pub(crate) fn test_lock() -> std::sync::MutexGuard<'static, ()> {
    static L: std::sync::Mutex<()> = std::sync::Mutex::new(());
    L.lock().unwrap_or_else(|e| e.into_inner())
}
