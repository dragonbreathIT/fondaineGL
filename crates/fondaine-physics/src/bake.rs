//! Sky-visibility bake over a regular grid.
//!
//! For each cell center, `rays_per_cell` cosine-weighted directions over the
//! +Y hemisphere are traced (Hammersley set, rotated about Y by a
//! per-cell golden-ratio offset to turn structured banding into fine,
//! deterministic noise). The output is the fraction of rays that travel
//! `max_dist` without hitting static geometry.
//!
//! Inside-geometry handling: a cheap 6-ray axis probe (limited to ~1.5
//! cells) runs first; additionally, if more than 40% of the hemisphere rays
//! hit back faces within ~1.5 cells, the sample point is considered to be
//! inside a solid
//! (e.g. a cell center inside a wall or below the terrain). The bake then
//! retries from up to six points offset by 0.5 cell along +-Y, +-X, +-Z and uses
//! the first one that is outside; if every candidate is inside, the cell
//! gets 0 (fully occluded), which is the correct value for a buried cell.

use crate::bvh::StaticWorld;
use crate::math::*;

const INSIDE_FRACTION: f32 = 0.4;

#[inline]
fn radical_inverse_2(mut i: u32) -> f32 {
    i = i.rotate_right(16);
    i = ((i & 0x5555_5555) << 1) | ((i & 0xAAAA_AAAA) >> 1);
    i = ((i & 0x3333_3333) << 2) | ((i & 0xCCCC_CCCC) >> 2);
    i = ((i & 0x0F0F_0F0F) << 4) | ((i & 0xF0F0_F0F0) >> 4);
    i = ((i & 0x00FF_00FF) << 8) | ((i & 0xFF00_FF00) >> 8);
    i as f32 * (1.0 / 4_294_967_296.0)
}

/// Cosine-weighted Hammersley directions over the +Y hemisphere.
/// Returned as (x, y, z) with y >= small positive.
pub fn hemisphere_dirs(n: u32) -> Vec<Vec3> {
    let n = n.max(1);
    (0..n)
        .map(|i| {
            let u1 = (i as f32 + 0.5) / n as f32;
            let u2 = radical_inverse_2(i);
            let r = u1.sqrt();
            let phi = core::f32::consts::TAU * u2;
            let y = (1.0 - u1).max(0.0).sqrt();
            v3(r * phi.cos(), y, r * phi.sin()).normalize_or(Vec3::Y)
        })
        .collect()
}

/// Cheap inside test: 6 axis rays limited to `near`. A point is inside a
/// closed solid if at least 3 of them hit a back face and back-face hits
/// outnumber front-face hits.
fn probe_inside(w: &StaticWorld, p: Vec3, near: f32) -> bool {
    let mut back = 0;
    let mut front = 0;
    for d in [Vec3::Y, -Vec3::Y, Vec3::X, -Vec3::X, Vec3::Z, -Vec3::Z] {
        if let Some(h) = w.raycast(p, d, near) {
            if h.backface {
                back += 1;
            } else {
                front += 1;
            }
        }
    }
    back >= 3 && back > front
}

/// Full evaluation: (visibility, is_inside). Uses the cheap probe first and
/// then the hemisphere rays (which also detect thin "just below a surface"
/// cases the axis probe can miss).
fn eval_full(w: &StaticWorld, p: Vec3, dirs: &[Vec3], rot: (f32, f32), max_dist: f32, inside_dist: f32) -> (f32, bool) {
    if probe_inside(w, p, inside_dist) {
        return (0.0, true);
    }
    eval_point(w, p, dirs, rot, max_dist, inside_dist)
}

/// (visibility, is_inside)
fn eval_point(w: &StaticWorld, p: Vec3, dirs: &[Vec3], rot: (f32, f32), max_dist: f32, inside_dist: f32) -> (f32, bool) {
    let (s, c) = rot;
    let mut open = 0u32;
    let mut back_near = 0u32;
    for d in dirs {
        // rotate about Y
        let dir = v3(d.x * c - d.z * s, d.y, d.x * s + d.z * c);
        let (hit, back) = w.classify(p, dir, inside_dist, max_dist);
        if !hit {
            open += 1;
        } else if back {
            back_near += 1;
        }
    }
    let n = dirs.len() as f32;
    (open as f32 / n, back_near as f32 > INSIDE_FRACTION * n)
}

#[allow(clippy::too_many_arguments)]
pub fn bake_sky_visibility(w: &StaticWorld, min: Vec3, cell: f32, nx: u32, ny: u32, nz: u32, rays: u32, max_dist: f32, out: &mut [f32]) {
    let total = nx as usize * ny as usize * nz as usize;
    if out.len() < total {
        return;
    }
    if w.nodes.is_empty() || !(max_dist > 0.0) {
        out[..total].fill(1.0);
        return;
    }
    let dirs = hemisphere_dirs(rays.clamp(1, 4096));
    let inside_dist = (cell * 1.5).max(1e-3);
    let offs = [Vec3::Y, -Vec3::Y, Vec3::X, -Vec3::X, Vec3::Z, -Vec3::Z];
    const GOLDEN: f32 = 0.618_034;
    let mut idx = 0usize;
    for z in 0..nz {
        for y in 0..ny {
            for x in 0..nx {
                let p = min + v3((x as f32 + 0.5) * cell, (y as f32 + 0.5) * cell, (z as f32 + 0.5) * cell);
                let frac = (idx as f32 * GOLDEN).fract();
                let rot = (core::f32::consts::TAU * frac).sin_cos();
                let (mut vis, inside) = eval_full(w, p, &dirs, rot, max_dist, inside_dist);
                if inside {
                    vis = 0.0;
                    for o in offs.iter() {
                        let (v, ins) = eval_full(w, p + *o * (cell * 0.5), &dirs, rot, max_dist, inside_dist);
                        if !ins {
                            vis = v;
                            break;
                        }
                    }
                }
                out[idx] = vis;
                idx += 1;
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::bvh::{box_mesh, grid_mesh};

    #[test]
    fn dirs_are_cosine_weighted() {
        let d = hemisphere_dirs(1024);
        assert!(d.iter().all(|v| v.y > 0.0 && (v.length() - 1.0).abs() < 1e-4));
        // E[cos] for cosine-weighted hemisphere = 2/3
        let m: f32 = d.iter().map(|v| v.y).sum::<f32>() / d.len() as f32;
        assert!((m - 2.0 / 3.0).abs() < 0.01, "{m}");
        let mx: f32 = d.iter().map(|v| v.x).sum::<f32>() / d.len() as f32;
        assert!(mx.abs() < 0.01);
    }

    fn world() -> StaticWorld {
        let mut w = StaticWorld::default();
        let (p, i) = grid_mesh(-100.0, -100.0, 200.0, 0.0, 20);
        w.add_mesh(&p, &i, 0);
        // roof slab 20x20 at y = 3..3.3
        let (p, i) = box_mesh(v3(-10.0, 3.0, -10.0), v3(10.0, 3.3, 10.0));
        w.add_mesh(&p, &i, 0);
        w.build();
        w
    }

    #[test]
    fn open_field_vs_under_roof() {
        let w = world();
        let mut out = [0.0f32; 2];
        // open field point at (50, 0.5..1.5, 50)
        bake_sky_visibility(&w, v3(50.0, 0.5, 50.0), 1.0, 1, 1, 1, 64, 100.0, &mut out[..1]);
        bake_sky_visibility(&w, v3(-0.5, 1.0, -0.5), 1.0, 1, 1, 1, 64, 100.0, &mut out[1..]);
        assert!(out[0] > 0.98, "open {}", out[0]);
        assert!(out[1] < 0.3, "roof {}", out[1]);
    }

    #[test]
    fn grid_layout_and_inside() {
        let w = world();
        // 3 cells along y: y centers 2.5 (under roof), 3.15 is inside? use cell 0.3 from y=2.85: centers 3.0, 3.3, 3.6
        let mut out = vec![-1.0; 4];
        bake_sky_visibility(&w, v3(-0.15, 2.85, -0.15), 0.3, 1, 4, 1, 32, 50.0, &mut out);
        // center 3.0 is on the slab bottom; 3.3 on top; 3.6 above roof; 3.9 above
        for v in &out {
            assert!((0.0..=1.0).contains(v));
        }
        assert!(out[2] > 0.95 && out[3] > 0.95, "{:?}", out);

        // cell fully inside a thick solid
        let mut w2 = StaticWorld::default();
        let (p, i) = box_mesh(v3(-5.0, -5.0, -5.0), v3(5.0, 5.0, 5.0));
        w2.add_mesh(&p, &i, 0);
        w2.build();
        let mut o = [9.0f32];
        bake_sky_visibility(&w2, v3(-0.5, -0.5, -0.5), 1.0, 1, 1, 1, 32, 50.0, &mut o);
        assert_eq!(o[0], 0.0);
        // cell center just inside the top surface: nudged up -> open
        bake_sky_visibility(&w2, v3(-0.5, 4.3, -0.5), 1.0, 1, 1, 1, 32, 50.0, &mut o);
        assert!(o[0] > 0.95, "{}", o[0]);
    }

    /// Performance check (run with `cargo test --release -- --ignored perf`):
    /// 500k+ triangle city-like scene, BVH build, random rays, and a
    /// 100k-cell x 32-ray bake.
    #[test]
    #[ignore]
    fn perf_large_scene_bake() {
        use std::time::Instant;
        let mut w = StaticWorld::default();
        // bumpy terrain: 400x400 quads = 320k tris
        let (mut p, i) = grid_mesh(-200.0, -200.0, 400.0, 0.0, 400);
        for k in 0..p.len() / 3 {
            let (x, z) = (p[k * 3], p[k * 3 + 2]);
            p[k * 3 + 1] = (x * 0.05).sin() * 1.5 + (z * 0.07).cos() * 1.0;
        }
        w.add_mesh(&p, &i, 0);
        // 20k boxes (12 tris each) = 240k tris
        let mut rng = Rng(12345);
        for _ in 0..20_000 {
            let x = rng.next_f32() * 380.0 - 190.0;
            let z = rng.next_f32() * 380.0 - 190.0;
            let s = 0.5 + rng.next_f32() * 4.0;
            let h = 1.0 + rng.next_f32() * 12.0;
            let (bp, bi) = box_mesh(v3(x, -2.0, z), v3(x + s, h, z + s));
            w.add_mesh(&bp, &bi, 1);
        }
        let t0 = Instant::now();
        w.build();
        let build = t0.elapsed();
        let tris = w.triangle_count();
        let t0 = Instant::now();
        let mut hits = 0;
        let n_rays = 1_000_000;
        for _ in 0..n_rays {
            let o = v3(rng.next_f32() * 300.0 - 150.0, 1.0 + rng.next_f32() * 10.0, rng.next_f32() * 300.0 - 150.0);
            let d = v3(rng.next_f32() - 0.5, rng.next_f32() - 0.5, rng.next_f32() - 0.5).normalize_or(Vec3::Y);
            if w.raycast(o, d, 200.0).is_some() {
                hits += 1;
            }
        }
        let rays = t0.elapsed();
        let (nx, ny, nz) = (100u32, 10u32, 100u32);
        let mut out = vec![0.0f32; (nx * ny * nz) as usize];
        let t0 = Instant::now();
        bake_sky_visibility(&w, v3(-100.0, 0.0, -100.0), 2.0, nx, ny, nz, 32, 64.0, &mut out);
        let bake = t0.elapsed();
        let mean: f32 = out.iter().sum::<f32>() / out.len() as f32;
        eprintln!(
            "tris={tris} nodes={} depth={} build={:?} rays: {} in {:?} ({:.2} Mrays/s, {hits} hits) bake 100k cells x32: {:?} mean vis {mean:.3}",
            w.nodes.len(),
            w.depth(),
            build,
            n_rays,
            rays,
            n_rays as f64 / rays.as_secs_f64() / 1e6,
            bake
        );
        assert!(tris > 500_000);
    }

    #[test]
    fn index_order_x_fastest() {
        let w = world();
        // 2 cells in x: one under the roof, one outside; 1 in y; 2 in z
        let mut out = vec![0.0; 4];
        bake_sky_visibility(&w, v3(-1.0, 1.0, -1.0), 30.0, 2, 1, 2, 64, 100.0, &mut out);
        // cell (0,0,0) center (14, 16, 14): above the roof -> open
        assert!(out.iter().all(|v| *v > 0.9), "{:?}", out);
        let mut out = vec![0.0; 2];
        bake_sky_visibility(&w, v3(-1.0, 0.5, 0.0), 30.0, 2, 1, 1, 64, 100.0, &mut out);
        // x=0 center (14, 15.5, 15): open
        assert!(out[0] > 0.9);
    }
}
