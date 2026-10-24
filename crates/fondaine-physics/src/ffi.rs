//! Plain C ABI. Every export validates its inputs and silently ignores
//! invalid ids / null pointers; none of them panic.
//!
//! Invalid creation results are reported as `u32::MAX` (0xFFFFFFFF).

use crate::ballistics::{Atmosphere, HIT_STRIDE, LIVE_STRIDE};
use crate::bodies::{BODY_STRIDE, CONTACT_STRIDE};
use crate::character::Character;
use crate::math::*;
use crate::{world, Material};
use std::alloc::{alloc, dealloc, Layout};

const ALIGN: usize = 8;
const INVALID: u32 = u32::MAX;

/// Reads `n` items from a raw pointer, returning an empty slice for null/0.
///
/// # Safety
/// `p` must point to `n` valid items (guaranteed by the TypeScript caller).
unsafe fn slice<'a, T>(p: *const T, n: usize) -> &'a [T] {
    if p.is_null() || n == 0 {
        &[]
    } else {
        core::slice::from_raw_parts(p, n)
    }
}

unsafe fn slice_mut<'a, T>(p: *mut T, n: usize) -> &'a mut [T] {
    if p.is_null() || n == 0 {
        &mut []
    } else {
        core::slice::from_raw_parts_mut(p, n)
    }
}

#[inline]
fn empty_ptr() -> *const f32 {
    // A valid, aligned (dangling but never dereferenced when count = 0) pointer.
    core::ptr::NonNull::<f32>::dangling().as_ptr()
}

// ---------------------------------------------------------------------------
// Memory / results
// ---------------------------------------------------------------------------

/// Allocate `bytes` (8-byte aligned). Returns null on failure / 0 bytes.
#[no_mangle]
pub extern "C" fn fp_alloc(bytes: u32) -> *mut u8 {
    if bytes == 0 {
        return core::ptr::null_mut();
    }
    match Layout::from_size_align(bytes as usize, ALIGN) {
        // SAFETY: non-zero size.
        Ok(l) => unsafe { alloc(l) },
        Err(_) => core::ptr::null_mut(),
    }
}

/// Free memory from `fp_alloc` (same `bytes`).
///
/// # Safety
/// `ptr` must come from `fp_alloc(bytes)` and not be freed twice.
#[no_mangle]
pub unsafe extern "C" fn fp_free(ptr: *mut u8, bytes: u32) {
    if ptr.is_null() || bytes == 0 {
        return;
    }
    if let Ok(l) = Layout::from_size_align(bytes as usize, ALIGN) {
        dealloc(ptr, l);
    }
}

/// Static scratch buffer (64 f32) written by single-result queries.
#[no_mangle]
pub extern "C" fn fp_result_ptr() -> *const f32 {
    world().result.as_ptr()
}

// ---------------------------------------------------------------------------
// Materials / world
// ---------------------------------------------------------------------------

#[no_mangle]
pub extern "C" fn fp_set_material(id: u32, friction: f32, restitution: f32, ricochet_max_angle_deg: f32, ricochet_energy_keep: f32) {
    if id > 255 {
        return;
    }
    let f = |x: f32, lo: f32, hi: f32, d: f32| if x.is_finite() { x.clamp(lo, hi) } else { d };
    world().materials[id as usize] = Material {
        friction: f(friction, 0.0, 10.0, 0.6),
        restitution: f(restitution, 0.0, 1.0, 0.2),
        ricochet_max_angle_deg: f(ricochet_max_angle_deg, 0.0, 90.0, 0.0),
        ricochet_energy_keep: f(ricochet_energy_keep, 0.0, 1.0, 0.0),
    };
}

#[no_mangle]
pub extern "C" fn fp_world_reset() {
    world().reset();
}

/// # Safety
/// `positions` must hold `vertex_count*3` f32, `indices` `index_count` u32.
#[no_mangle]
pub unsafe extern "C" fn fp_add_static_mesh(positions: *const f32, vertex_count: u32, indices: *const u32, index_count: u32, material_id: u32) -> u32 {
    let pos = slice(positions, vertex_count as usize * 3);
    let idx = slice(indices, index_count as usize);
    world().statics.add_mesh(pos, idx, material_id.min(255) as u8)
}

#[no_mangle]
pub extern "C" fn fp_build() {
    world().statics.build();
}

// ---------------------------------------------------------------------------
// Ray queries
// ---------------------------------------------------------------------------

#[no_mangle]
#[allow(clippy::too_many_arguments)]
pub extern "C" fn fp_raycast(ox: f32, oy: f32, oz: f32, dx: f32, dy: f32, dz: f32, max_dist: f32, include_bodies: u32) -> u32 {
    let w = world();
    match w.raycast(v3(ox, oy, oz), v3(dx, dy, dz), max_dist, include_bodies != 0) {
        Some(h) => {
            w.result[..10].copy_from_slice(&[
                h.t,
                h.point.x,
                h.point.y,
                h.point.z,
                h.normal.x,
                h.normal.y,
                h.normal.z,
                h.material as f32,
                h.triangle as f32,
                h.body as f32,
            ]);
            1
        }
        None => 0,
    }
}

/// # Safety
/// `rays` holds `count*6` f32, `out_t` holds `count` f32.
#[no_mangle]
pub unsafe extern "C" fn fp_raycast_batch(rays: *const f32, count: u32, max_dist: f32, out_t: *mut f32) {
    let n = count as usize;
    let rays = slice(rays, n * 6);
    let out = slice_mut(out_t, n);
    if rays.len() < n * 6 || out.len() < n {
        return;
    }
    let w = world();
    w.statics.ensure_built();
    for i in 0..n {
        let r = &rays[i * 6..i * 6 + 6];
        let o = v3(r[0], r[1], r[2]);
        let d = v3(r[3], r[4], r[5]).normalize_or(Vec3::ZERO);
        out[i] = if d == Vec3::ZERO || !o.is_finite() || !(max_dist > 0.0) {
            -1.0
        } else {
            w.statics.raycast(o, d, max_dist).map_or(-1.0, |h| h.t)
        };
    }
}

/// # Safety
/// `out` holds `nx*ny*nz` f32.
#[no_mangle]
#[allow(clippy::too_many_arguments)]
pub unsafe extern "C" fn fp_bake_sky_visibility(min_x: f32, min_y: f32, min_z: f32, cell: f32, nx: u32, ny: u32, nz: u32, rays_per_cell: u32, max_dist: f32, out: *mut f32) {
    let total = (nx as u64) * (ny as u64) * (nz as u64);
    if total == 0 || total > (1u64 << 28) || !(cell > 0.0) || !cell.is_finite() {
        return;
    }
    let out = slice_mut(out, total as usize);
    if out.is_empty() {
        return;
    }
    let w = world();
    w.statics.ensure_built();
    crate::bake::bake_sky_visibility(&w.statics, v3(min_x, min_y, min_z), cell, nx, ny, nz, rays_per_cell, max_dist, out);
}

/// Path-traced irradiance probes (see `gi.rs`). `sky_sh` = 27 f32 (9 coeffs × RGB, renderer convention),
/// `albedo` = `albedo_count` × 3 f32 (linear RGB per surface id). `out` holds `nx*ny*nz*12` f32.
/// Returns the number of probes that were inside geometry and got filled from neighbours.
///
/// # Safety
/// Pointers must be valid for the stated lengths.
#[no_mangle]
#[allow(clippy::too_many_arguments)]
pub unsafe extern "C" fn fp_bake_gi(
    min_x: f32, min_y: f32, min_z: f32, cell: f32, nx: u32, ny: u32, nz: u32, rays: u32, passes: u32,
    sun_x: f32, sun_y: f32, sun_z: f32, sun_r: f32, sun_g: f32, sun_b: f32,
    sky_sh: *const f32, albedo: *const f32, albedo_count: u32, max_dist: f32, out: *mut f32,
) -> u32 {
    let total = (nx as u64) * (ny as u64) * (nz as u64);
    if total == 0 || total > (1u64 << 24) || !(cell > 0.0) || !cell.is_finite() || sky_sh.is_null() || out.is_null() {
        return 0;
    }
    let out = slice_mut(out, total as usize * 12);
    let sky = slice(sky_sh, 27);
    let alb = if albedo.is_null() { &[][..] } else { slice(albedo, albedo_count as usize * 3) };
    let w = world();
    w.statics.ensure_built();
    let p = crate::gi::GiParams {
        min: v3(min_x, min_y, min_z), cell, nx, ny, nz, rays: rays.clamp(8, 4096), passes: passes.clamp(1, 8),
        sun_dir: v3(sun_x, sun_y, sun_z), sun_rgb: [sun_r, sun_g, sun_b], sky_sh: sky, albedo: alb,
        max_dist: if max_dist > 0.0 { max_dist } else { 500.0 },
    };
    crate::gi::bake_gi(&w.statics, &p, out)
}

/// Parallel GI baking (one call per worker per z-slab). Same parameters as `fp_bake_gi`; `pos` (total·3 f32)
/// and `valid` (total u8) are written for layers [z0, z1).
///
/// # Safety
/// Pointers must be valid for the stated lengths.
#[no_mangle]
#[allow(clippy::too_many_arguments)]
pub unsafe extern "C" fn fp_gi_positions(min_x: f32, min_y: f32, min_z: f32, cell: f32, nx: u32, ny: u32, nz: u32, rays: u32, z0: u32, z1: u32, pos: *mut f32, valid: *mut u8) {
    let total = (nx as usize) * (ny as usize) * (nz as usize);
    if total == 0 || pos.is_null() || valid.is_null() || !(cell > 0.0) { return; }
    let w = world();
    w.statics.ensure_built();
    let sky = [0.0f32; 27];
    let p = crate::gi::GiParams { min: v3(min_x, min_y, min_z), cell, nx, ny, nz, rays: rays.clamp(8, 4096), passes: 1, sun_dir: Vec3::Y, sun_rgb: [0.0; 3], sky_sh: &sky, albedo: &[], max_dist: 500.0 };
    crate::gi::probe_positions(&w.statics, &p, z0, z1, slice_mut(pos, total * 3), slice_mut(valid, total));
}

/// One GI bounce pass for layers [z0, z1). `prev` may be null (first pass). `out` = total·12 f32.
///
/// # Safety
/// Pointers must be valid for the stated lengths.
#[no_mangle]
#[allow(clippy::too_many_arguments)]
pub unsafe extern "C" fn fp_gi_pass(
    min_x: f32, min_y: f32, min_z: f32, cell: f32, nx: u32, ny: u32, nz: u32, rays: u32, pass: u32,
    sun_x: f32, sun_y: f32, sun_z: f32, sun_r: f32, sun_g: f32, sun_b: f32,
    sky_sh: *const f32, albedo: *const f32, albedo_count: u32, max_dist: f32,
    pos: *const f32, valid: *const u8, prev: *const f32, z0: u32, z1: u32, out: *mut f32,
) {
    let total = (nx as usize) * (ny as usize) * (nz as usize);
    if total == 0 || sky_sh.is_null() || out.is_null() || pos.is_null() || valid.is_null() { return; }
    let w = world();
    w.statics.ensure_built();
    let sky = slice(sky_sh, 27);
    let alb = if albedo.is_null() { &[][..] } else { slice(albedo, albedo_count as usize * 3) };
    let p = crate::gi::GiParams {
        min: v3(min_x, min_y, min_z), cell, nx, ny, nz, rays: rays.clamp(8, 4096), passes: 1,
        sun_dir: v3(sun_x, sun_y, sun_z), sun_rgb: [sun_r, sun_g, sun_b], sky_sh: sky, albedo: alb,
        max_dist: if max_dist > 0.0 { max_dist } else { 500.0 },
    };
    let prev = if prev.is_null() { None } else { Some(slice(prev, total * 12)) };
    crate::gi::pass_slab(&w.statics, &p, slice(pos, total * 3), slice(valid, total), prev, pass, z0, z1, slice_mut(out, total * 12));
}

// ---------------------------------------------------------------------------
// Character controller
// ---------------------------------------------------------------------------

#[no_mangle]
pub extern "C" fn fp_character_create(radius: f32, height: f32, step_height: f32, max_slope_deg: f32) -> u32 {
    let Some(c) = Character::new(radius, height, step_height, max_slope_deg) else { return INVALID };
    let w = world();
    if let Some(i) = w.characters.iter().position(|c| c.is_none()) {
        w.characters[i] = Some(c);
        i as u32
    } else {
        w.characters.push(Some(c));
        (w.characters.len() - 1) as u32
    }
}

#[no_mangle]
pub extern "C" fn fp_character_set_position(id: u32, x: f32, y: f32, z: f32) {
    let p = v3(x, y, z);
    if !p.is_finite() {
        return;
    }
    if let Some(Some(c)) = world().characters.get_mut(id as usize) {
        c.pos = p;
        c.grounded = false;
    }
}

#[no_mangle]
pub extern "C" fn fp_character_move(id: u32, dx: f32, dy: f32, dz: f32) -> u32 {
    let w = world();
    w.statics.ensure_built();
    let Some(Some(c)) = w.characters.get_mut(id as usize) else { return 0 };
    let flags = c.do_move(&w.statics, v3(dx, dy, dz), &mut w.scratch);
    w.result[..8].copy_from_slice(&[
        c.pos.x,
        c.pos.y,
        c.pos.z,
        c.ground_normal.x,
        c.ground_normal.y,
        c.ground_normal.z,
        c.ground_material as f32,
        flags as f32,
    ]);
    flags
}

#[no_mangle]
pub extern "C" fn fp_character_set_height(id: u32, height: f32) -> u32 {
    let w = world();
    w.statics.ensure_built();
    let Some(Some(c)) = w.characters.get_mut(id as usize) else { return 0 };
    c.set_height(&w.statics, height, &mut w.scratch) as u32
}

#[no_mangle]
pub extern "C" fn fp_character_remove(id: u32) {
    let w = world();
    if let Some(slot) = w.characters.get_mut(id as usize) {
        *slot = None;
    }
    while matches!(w.characters.last(), Some(None)) {
        w.characters.pop();
    }
}

// ---------------------------------------------------------------------------
// Rigid bodies
// ---------------------------------------------------------------------------

#[no_mangle]
pub extern "C" fn fp_body_create(shape: u32, a: f32, b: f32, c: f32, mass: f32, material_id: u32) -> u32 {
    world().bodies.create(shape, a, b, c, mass, material_id)
}

#[no_mangle]
#[allow(clippy::too_many_arguments)]
pub extern "C" fn fp_body_set_transform(id: u32, px: f32, py: f32, pz: f32, qx: f32, qy: f32, qz: f32, qw: f32) {
    world().bodies.set_transform(id, v3(px, py, pz), Quat { x: qx, y: qy, z: qz, w: qw });
}

#[no_mangle]
pub extern "C" fn fp_body_set_velocity(id: u32, vx: f32, vy: f32, vz: f32, wx: f32, wy: f32, wz: f32) {
    world().bodies.set_velocity(id, v3(vx, vy, vz), v3(wx, wy, wz));
}

#[no_mangle]
pub extern "C" fn fp_body_apply_impulse(id: u32, ix: f32, iy: f32, iz: f32, px: f32, py: f32, pz: f32) {
    world().bodies.apply_impulse_at(id, v3(ix, iy, iz), v3(px, py, pz));
}

#[no_mangle]
pub extern "C" fn fp_body_remove(id: u32) {
    world().bodies.remove(id);
}

#[no_mangle]
pub extern "C" fn fp_bodies_ptr() -> *const f32 {
    let b = &world().bodies.buf;
    if b.is_empty() {
        empty_ptr()
    } else {
        b.as_ptr()
    }
}

/// Number of body slots in the body buffer (max id + 1).
#[no_mangle]
pub extern "C" fn fp_body_count() -> u32 {
    (world().bodies.buf.len() / BODY_STRIDE) as u32
}

#[no_mangle]
pub extern "C" fn fp_body_stride() -> u32 {
    BODY_STRIDE as u32
}

#[no_mangle]
pub extern "C" fn fp_set_gravity(x: f32, y: f32, z: f32) {
    let g = v3(x, y, z);
    if g.is_finite() {
        let w = world();
        if w.gravity != g {
            w.bodies.wake_all();
        }
        w.gravity = g;
    }
}

#[no_mangle]
pub extern "C" fn fp_contact_count() -> u32 {
    (world().bodies.events.len() / CONTACT_STRIDE) as u32
}

#[no_mangle]
pub extern "C" fn fp_contacts_ptr() -> *const f32 {
    let e = &world().bodies.events;
    if e.is_empty() {
        empty_ptr()
    } else {
        e.as_ptr()
    }
}

// ---------------------------------------------------------------------------
// Ballistics
// ---------------------------------------------------------------------------

#[no_mangle]
pub extern "C" fn fp_set_atmosphere(temperature_c: f32, pressure_hpa: f32, relative_humidity_0_1: f32, wind_x: f32, wind_y: f32, wind_z: f32) {
    world().ballistics.atmo = Atmosphere::new(
        temperature_c as f64,
        pressure_hpa as f64,
        relative_humidity_0_1 as f64,
        dv3(wind_x as f64, wind_y as f64, wind_z as f64),
    );
}

/// Writes [rho_kg_m3, speed_of_sound_m_s] to the result buffer and returns 1.
#[no_mangle]
pub extern "C" fn fp_get_atmosphere() -> u32 {
    let w = world();
    w.result[0] = w.ballistics.atmo.rho as f32;
    w.result[1] = w.ballistics.atmo.speed_of_sound as f32;
    1
}

#[no_mangle]
#[allow(clippy::too_many_arguments)]
pub extern "C" fn fp_projectile_spawn(px: f32, py: f32, pz: f32, vx: f32, vy: f32, vz: f32, bc_g7_lb_in2: f32, mass_kg: f32, diameter_m: f32, max_time_s: f32, user_id: u32) -> u32 {
    world().ballistics.spawn(
        dv3(px as f64, py as f64, pz as f64),
        dv3(vx as f64, vy as f64, vz as f64),
        bc_g7_lb_in2 as f64,
        mass_kg as f64,
        diameter_m as f64,
        max_time_s as f64,
        user_id,
    )
}

#[no_mangle]
pub extern "C" fn fp_projectile_hit_count() -> u32 {
    (world().ballistics.hits.len() / HIT_STRIDE) as u32
}

#[no_mangle]
pub extern "C" fn fp_projectile_hits_ptr() -> *const f32 {
    let h = &world().ballistics.hits;
    if h.is_empty() {
        empty_ptr()
    } else {
        h.as_ptr()
    }
}

#[no_mangle]
pub extern "C" fn fp_projectile_count() -> u32 {
    (world().ballistics.live.len() / LIVE_STRIDE) as u32
}

#[no_mangle]
pub extern "C" fn fp_projectiles_ptr() -> *const f32 {
    let l = &world().ballistics.live;
    if l.is_empty() {
        empty_ptr()
    } else {
        l.as_ptr()
    }
}

// ---------------------------------------------------------------------------
// Stepping
// ---------------------------------------------------------------------------

#[no_mangle]
pub extern "C" fn fp_step(dt: f32) {
    world().step(dt);
}

// ---------------------------------------------------------------------------
// Tests through the C ABI (exercise the same path TypeScript uses)
// ---------------------------------------------------------------------------

#[cfg(test)]
mod tests {
    use super::*;
    use crate::bvh::{box_mesh, grid_mesh};
    use crate::test_lock;

    fn result() -> &'static [f32] {
        unsafe { core::slice::from_raw_parts(fp_result_ptr(), crate::RESULT_LEN) }
    }

    fn add(p: &[f32], i: &[u32], mat: u32) -> u32 {
        unsafe { fp_add_static_mesh(p.as_ptr(), (p.len() / 3) as u32, i.as_ptr(), i.len() as u32, mat) }
    }

    #[test]
    fn abi_raycast_box() {
        let _g = test_lock();
        fp_world_reset();
        let (p, i) = box_mesh(v3(-1.0, 0.0, -1.0), v3(1.0, 2.0, 1.0));
        assert_eq!(add(&p, &i, 7), 0);
        fp_build();
        // outside, from -Z, non-normalized dir
        assert_eq!(fp_raycast(0.2, 1.0, -5.0, 0.0, 0.0, 3.0, 100.0, 0), 1);
        let r = result();
        assert!((r[0] - 4.0).abs() < 1e-5);
        assert!((r[3] + 1.0).abs() < 1e-5);
        assert_eq!(&r[4..7], &[0.0, 0.0, -1.0]);
        assert_eq!(r[7], 7.0);
        assert!(r[8] == 0.0 || r[8] == 1.0, "tri {}", r[8]); // -Z face = tris 0,1
        assert_eq!(r[9], -1.0);
        // from inside: backface, normal flipped to face the ray
        assert_eq!(fp_raycast(0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 100.0, 0), 1);
        let r = result();
        assert!((r[0] - 1.0).abs() < 1e-5);
        assert!((r[4] + 1.0).abs() < 1e-5, "normal {:?}", &r[4..7]);
        // from above
        assert_eq!(fp_raycast(0.3, 10.0, 0.3, 0.0, -1.0, 0.0, 100.0, 0), 1);
        assert!((result()[5] - 1.0).abs() < 1e-5);
        // misses
        assert_eq!(fp_raycast(5.0, 1.0, -5.0, 0.0, 0.0, 1.0, 100.0, 0), 0);
        assert_eq!(fp_raycast(0.0, 1.0, -5.0, 0.0, 0.0, 1.0, 3.0, 0), 0);
        assert_eq!(fp_raycast(0.0, 1.0, -5.0, 0.0, 0.0, 0.0, 100.0, 0), 0);
        assert_eq!(fp_raycast(f32::NAN, 1.0, -5.0, 0.0, 0.0, 1.0, 100.0, 0), 0);
    }

    #[test]
    fn abi_raycast_bodies() {
        let _g = test_lock();
        fp_world_reset();
        let (p, i) = grid_mesh(-10.0, -10.0, 20.0, 0.0, 4);
        add(&p, &i, 1);
        fp_build();
        fp_set_material(9, 0.5, 0.1, 0.0, 0.0);
        let b = fp_body_create(0, 0.5, 0.0, 0.0, 1.0, 9);
        fp_body_set_transform(b, 0.0, 2.0, 0.0, 0.0, 0.0, 0.0, 1.0);
        assert_eq!(fp_raycast(0.0, 10.0, 0.0, 0.0, -1.0, 0.0, 100.0, 1), 1);
        let r = result();
        assert!((r[0] - 7.5).abs() < 1e-4);
        assert_eq!(r[7], 9.0);
        assert_eq!(r[8], -1.0);
        assert_eq!(r[9], b as f32);
        assert_eq!(fp_raycast(0.0, 10.0, 0.0, 0.0, -1.0, 0.0, 100.0, 0), 1);
        assert!((result()[0] - 10.0).abs() < 1e-4);
        assert_eq!(result()[9], -1.0);
    }

    #[test]
    fn abi_batch() {
        let _g = test_lock();
        fp_world_reset();
        let (p, i) = box_mesh(v3(-1.0, 0.0, -1.0), v3(1.0, 2.0, 1.0));
        add(&p, &i, 0);
        fp_build();
        let rays = [
            0.0, 1.0, -5.0, 0.0, 0.0, 1.0, // hit at 4
            0.0, 10.0, 0.0, 0.0, -2.0, 0.0, // hit at 8
            5.0, 1.0, -5.0, 0.0, 0.0, 1.0, // miss
            0.0, 1.0, -5.0, 0.0, 0.0, 0.0, // zero dir
            0.0, 1.0, -50.0, 0.0, 0.0, 1.0, // beyond max
        ];
        let mut out = [0.0f32; 5];
        unsafe { fp_raycast_batch(rays.as_ptr(), 5, 20.0, out.as_mut_ptr()) };
        assert!((out[0] - 4.0).abs() < 1e-5);
        assert!((out[1] - 8.0).abs() < 1e-5);
        assert_eq!(&out[2..], &[-1.0, -1.0, -1.0]);
        // null safety
        unsafe { fp_raycast_batch(core::ptr::null(), 5, 20.0, out.as_mut_ptr()) };
    }

    #[test]
    fn abi_sky_bake() {
        let _g = test_lock();
        fp_world_reset();
        let (p, i) = grid_mesh(-100.0, -100.0, 200.0, 0.0, 10);
        add(&p, &i, 0);
        let (p, i) = box_mesh(v3(-10.0, 3.0, -10.0), v3(10.0, 3.3, 10.0));
        add(&p, &i, 0);
        fp_build();
        // two cells: x=0 center (-0.5+0.5)=0 under roof, x=1 center 60 open
        let mut out = [0.0f32; 2];
        unsafe { fp_bake_sky_visibility(-0.5, 0.5, -0.5, 1.0, 1, 1, 1, 64, 200.0, out.as_mut_ptr()) };
        unsafe { fp_bake_sky_visibility(59.5, 0.5, -0.5, 1.0, 1, 1, 1, 64, 200.0, out[1..].as_mut_ptr()) };
        assert!(out[0] < 0.3, "{}", out[0]);
        assert!(out[1] > 0.95, "{}", out[1]);
    }

    #[test]
    fn abi_character() {
        let _g = test_lock();
        fp_world_reset();
        let (p, i) = grid_mesh(-10.0, -10.0, 20.0, 0.0, 10);
        add(&p, &i, 4);
        fp_build();
        let c = fp_character_create(0.3, 1.8, 0.35, 50.0);
        assert_ne!(c, INVALID);
        fp_character_set_position(c, 0.0, 2.0, 0.0);
        let mut vy = 0.0;
        let mut f = 0;
        for _ in 0..120 {
            vy -= 9.81 / 60.0;
            f = fp_character_move(c, 0.0, vy / 60.0, 0.0);
            if f & 1 != 0 {
                vy = 0.0;
            }
        }
        assert_eq!(f & 1, 1);
        let r = result();
        assert!(r[1].abs() < 0.01);
        assert!((r[4] - 1.0).abs() < 1e-4);
        assert_eq!(r[6], 4.0);
        assert_eq!(r[7], f as f32);
        assert_eq!(fp_character_move(999, 1.0, 0.0, 0.0), 0);
        assert_eq!(fp_character_set_height(c, 1.0), 1);
        assert_eq!(fp_character_set_height(c, 1.8), 1);
        fp_character_remove(c);
        assert_eq!(fp_character_move(c, 1.0, 0.0, 0.0), 0);
        assert_eq!(fp_character_create(-1.0, 1.0, 0.0, 45.0), INVALID);
    }

    #[test]
    fn abi_bodies_and_contacts() {
        let _g = test_lock();
        fp_world_reset();
        let (p, i) = grid_mesh(-10.0, -10.0, 20.0, 0.0, 10);
        add(&p, &i, 2);
        fp_build();
        fp_set_material(2, 0.6, 0.5, 0.0, 0.0);
        fp_set_gravity(0.0, -9.81, 0.0);
        let b = fp_body_create(1, 0.1, 0.1, 0.1, 1.0, 2);
        fp_body_set_transform(b, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
        assert_eq!(fp_body_stride(), BODY_STRIDE as u32);
        let mut contacts = 0;
        for _ in 0..240 {
            fp_step(1.0 / 60.0);
            let n = fp_contact_count();
            if n > 0 {
                let e = unsafe { core::slice::from_raw_parts(fp_contacts_ptr(), n as usize * CONTACT_STRIDE) };
                assert_eq!(e[0], b as f32);
                assert_eq!(e[9], 2.0);
            }
            contacts += n;
        }
        assert!(contacts >= 1);
        let s = fp_body_stride() as usize;
        let buf = unsafe { core::slice::from_raw_parts(fp_bodies_ptr(), s * fp_body_count() as usize) };
        assert_eq!(buf[b as usize * s], 1.0);
        assert!((buf[b as usize * s + 2] - 0.1).abs() < 0.01);
        assert_eq!(buf[b as usize * s + 14], 1.0, "should be asleep");
        // impulse wakes it
        fp_body_apply_impulse(b, 0.0, 3.0, 0.0, 0.0, 0.1, 0.0);
        let buf = unsafe { core::slice::from_raw_parts(fp_bodies_ptr(), s * fp_body_count() as usize) };
        assert_eq!(buf[b as usize * s + 14], 0.0);
        // invalid ids are ignored
        fp_body_set_transform(77, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0);
        fp_body_set_velocity(77, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);
        fp_body_apply_impulse(77, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0);
        fp_body_remove(77);
        fp_body_remove(b);
        assert_eq!(fp_body_count(), 0);
    }

    #[test]
    fn abi_ballistics() {
        let _g = test_lock();
        fp_world_reset();
        fp_set_atmosphere(15.0, 1013.25, 0.0, 0.0, 0.0, 0.0);
        assert_eq!(fp_get_atmosphere(), 1);
        assert!((result()[0] - 1.225).abs() < 0.001);
        let (p, i) = box_mesh(v3(-5.0, -5.0, 100.0), v3(5.0, 5.0, 101.0));
        add(&p, &i, 3);
        fp_build();
        let id = fp_projectile_spawn(0.0, 1.0, 0.0, 0.0, 0.0, 900.0, 0.186, 0.005, 0.0057, 3.0, 11);
        assert_ne!(id, INVALID);
        assert_eq!(fp_projectile_count(), 1);
        let mut hit = None;
        for _ in 0..30 {
            fp_step(1.0 / 60.0);
            if fp_projectile_count() > 0 {
                let l = unsafe { core::slice::from_raw_parts(fp_projectiles_ptr(), 8) };
                assert_eq!(l[0], id as f32);
                assert_eq!(l[1], 11.0);
            }
            if fp_projectile_hit_count() > 0 {
                hit = Some(unsafe { core::slice::from_raw_parts(fp_projectile_hits_ptr(), 16) }.to_vec());
                break;
            }
        }
        let h = hit.expect("no hit");
        assert_eq!(h[0], 11.0);
        assert!((h[3] - 100.0).abs() < 1e-3);
        assert!((h[6] + 1.0).abs() < 1e-5);
        assert_eq!(h[10], 3.0);
        assert_eq!(h[15], id as f32);
        assert_eq!(fp_projectile_count(), 0);
        fp_step(1.0 / 60.0);
        assert_eq!(fp_projectile_hit_count(), 0);
    }

    #[test]
    fn abi_alloc_and_bad_inputs() {
        let _g = test_lock();
        let p = fp_alloc(1024);
        assert!(!p.is_null());
        assert_eq!(p as usize % 8, 0);
        unsafe { fp_free(p, 1024) };
        assert!(fp_alloc(0).is_null());
        unsafe { fp_free(core::ptr::null_mut(), 16) };
        fp_set_material(300, 1.0, 1.0, 1.0, 1.0);
        unsafe {
            assert_eq!(fp_add_static_mesh(core::ptr::null(), 10, core::ptr::null(), 30, 0), fp_add_static_mesh(core::ptr::null(), 0, core::ptr::null(), 0, 0) - 1);
            fp_bake_sky_visibility(0.0, 0.0, 0.0, 1.0, 2, 2, 2, 8, 10.0, core::ptr::null_mut());
        }
        fp_step(f32::NAN);
        fp_step(-1.0);
        fp_world_reset();
        fp_build();
        assert_eq!(fp_raycast(0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 10.0, 1), 0);
        // out-of-range indices are skipped but keep their triangle index
        let pos = [0.0f32, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0];
        let idx = [0u32, 1, 5, 0, 2, 1];
        add(&pos, &idx, 0);
        fp_build();
        assert_eq!(world().statics.triangle_count(), 1);
        assert_eq!(fp_raycast(0.2, 1.0, 0.2, 0.0, -1.0, 0.0, 10.0, 0), 1);
        assert_eq!(result()[8], 1.0);
        // second mesh: indices continue after all submitted triangles
        add(&[0.0, 0.0, 5.0, 1.0, 0.0, 5.0, 0.0, 0.0, 6.0], &[0, 1, 2], 0);
        assert_eq!(fp_raycast(0.2, 1.0, 5.2, 0.0, -1.0, 0.0, 10.0, 0), 1);
        assert_eq!(result()[8], 2.0);
        fp_world_reset();
    }
}
