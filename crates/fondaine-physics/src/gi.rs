//! Baked diffuse global illumination: an irradiance-probe grid path-traced against the static world.
//!
//! Each probe stores L1 spherical harmonics of the *irradiance / π* it receives from every direction
//! except the direct sun (direct sun is rendered with shadow maps):
//!   * sky light, correctly occluded by geometry (rays that escape read the sky's SH radiance),
//!   * sunlight bounced off surfaces (shadow ray towards the sun at every hit),
//!   * multiple bounces: pass k shades hit points with the probe grid of pass k−1.
//!
//! Output layout per probe (12 f32): [R: c0 c1 c2 c3, G: c0..c3, B: c0..c3] with
//!   E(n)/π = c0 + c1·n.y + c2·n.z + c3·n.x
//! which is exactly what the renderer multiplies by albedo.
//!
//! Probes that end up inside solids (many back-face hits) are moved to a nearby free spot; if none is
//! found they are filled from valid neighbours so they don't leak darkness into nearby surfaces.

use crate::bvh::{tri_normal, StaticWorld};
use crate::math::*;

pub struct GiParams<'a> {
    pub min: Vec3,
    pub cell: f32,
    pub nx: u32,
    pub ny: u32,
    pub nz: u32,
    pub rays: u32,
    pub passes: u32,
    /// Unit vector towards the sun.
    pub sun_dir: Vec3,
    /// Sun illuminance at the ground (same units the renderer uses), linear RGB.
    pub sun_rgb: [f32; 3],
    /// Sky irradiance/π L2 SH in the renderer's convention: 9 coefficients × RGB, coefficient-major.
    pub sky_sh: &'a [f32],
    /// Linear RGB diffuse albedo per surface (material) id.
    pub albedo: &'a [f32],
    pub max_dist: f32,
}

const INSIDE_FRACTION: f32 = 0.25;

#[inline]
fn fib_dirs(n: u32) -> Vec<Vec3> {
    let n = n.max(4);
    let ga = core::f32::consts::PI * (3.0 - 5.0f32.sqrt());
    (0..n)
        .map(|i| {
            let y = 1.0 - 2.0 * (i as f32 + 0.5) / n as f32;
            let r = (1.0 - y * y).max(0.0).sqrt();
            let phi = ga * i as f32;
            v3(r * phi.cos(), y, r * phi.sin())
        })
        .collect()
}

/// Sky radiance in direction d from the irradiance/π L2 SH (deconvolved per band: ×1, ×1.5, ×4).
#[inline]
fn sky_radiance(sh: &[f32], d: Vec3) -> [f32; 3] {
    let (x, y, z) = (d.x, d.y, d.z);
    let b = [1.0, 1.5 * y, 1.5 * z, 1.5 * x, 4.0 * x * y, 4.0 * y * z, 4.0 * (3.0 * z * z - 1.0), 4.0 * x * z, 4.0 * (x * x - y * y)];
    let mut o = [0.0f32; 3];
    for (k, bk) in b.iter().enumerate() {
        for c in 0..3 {
            o[c] += sh[k * 3 + c] * bk;
        }
    }
    [o[0].max(0.0), o[1].max(0.0), o[2].max(0.0)]
}

/// Sky irradiance/π for normal n (unoccluded), from the L2 SH as the renderer evaluates it.
#[inline]
fn sky_irradiance(sh: &[f32], n: Vec3) -> [f32; 3] {
    let (x, y, z) = (n.x, n.y, n.z);
    let b = [1.0, y, z, x, x * y, y * z, 3.0 * z * z - 1.0, x * z, x * x - y * y];
    let mut o = [0.0f32; 3];
    for (k, bk) in b.iter().enumerate() {
        for c in 0..3 {
            o[c] += sh[k * 3 + c] * bk;
        }
    }
    [o[0].max(0.0), o[1].max(0.0), o[2].max(0.0)]
}

struct Grid<'a> {
    min: Vec3,
    cell: f32,
    n: [u32; 3],
    data: &'a [f32],
}

impl Grid<'_> {
    /// Trilinear irradiance/π at p for normal n; None outside the grid.
    fn irradiance(&self, p: Vec3, nrm: Vec3) -> Option<[f32; 3]> {
        let g = (p - self.min) / self.cell - v3(0.5, 0.5, 0.5);
        let (nx, ny, nz) = (self.n[0] as i32, self.n[1] as i32, self.n[2] as i32);
        if g.x < -0.5 || g.y < -0.5 || g.z < -0.5 || g.x > nx as f32 - 0.5 || g.y > ny as f32 - 0.5 || g.z > nz as f32 - 0.5 {
            return None;
        }
        let x0 = g.x.floor() as i32;
        let y0 = g.y.floor() as i32;
        let z0 = g.z.floor() as i32;
        let (fx, fy, fz) = (g.x - x0 as f32, g.y - y0 as f32, g.z - z0 as f32);
        let basis = [1.0, nrm.y, nrm.z, nrm.x];
        let mut o = [0.0f32; 3];
        for dz in 0..2 {
            for dy in 0..2 {
                for dx in 0..2 {
                    let w = (if dx == 1 { fx } else { 1.0 - fx }) * (if dy == 1 { fy } else { 1.0 - fy }) * (if dz == 1 { fz } else { 1.0 - fz });
                    if w <= 0.0 {
                        continue;
                    }
                    let ix = (x0 + dx).clamp(0, nx - 1) as usize;
                    let iy = (y0 + dy).clamp(0, ny - 1) as usize;
                    let iz = (z0 + dz).clamp(0, nz - 1) as usize;
                    let base = ((iz * ny as usize + iy) * nx as usize + ix) * 12;
                    for c in 0..3 {
                        let q = &self.data[base + c * 4..base + c * 4 + 4];
                        o[c] += w * (q[0] * basis[0] + q[1] * basis[1] + q[2] * basis[2] + q[3] * basis[3]);
                    }
                }
            }
        }
        Some([o[0].max(0.0), o[1].max(0.0), o[2].max(0.0)])
    }
}

/// Bakes the probe grid into `out` (nx·ny·nz·12 f32). Returns the number of probes that had to be filled.
pub fn bake_gi(w: &StaticWorld, p: &GiParams, out: &mut [f32]) -> u32 {
    let (nx, ny, nz) = (p.nx as usize, p.ny as usize, p.nz as usize);
    let total = nx * ny * nz;
    if out.len() < total * 12 || p.sky_sh.len() < 27 {
        return 0;
    }
    if w.nodes.is_empty() {
        // no geometry: every probe sees the open sky
        for i in 0..total {
            let s = p.sky_sh;
            for c in 0..3 {
                out[i * 12 + c * 4] = s[c];
                out[i * 12 + c * 4 + 1] = s[3 + c];
                out[i * 12 + c * 4 + 2] = s[6 + c];
                out[i * 12 + c * 4 + 3] = s[9 + c];
            }
        }
        return 0;
    }
    let mut pos = vec![0.0f32; total * 3];
    let mut valid = vec![0u8; total];
    probe_positions(w, p, 0, p.nz, &mut pos, &mut valid);
    let mut prev: Vec<f32> = vec![0.0; total * 12];
    let mut cur: Vec<f32> = vec![0.0; total * 12];
    for pass in 0..p.passes.max(1) {
        pass_slab(w, p, &pos, &valid, if pass == 0 { None } else { Some(&prev) }, pass, 0, p.nz, &mut cur);
        let vb: Vec<bool> = valid.iter().map(|v| *v != 0).collect();
        fill_invalid(&mut cur, &vb, nx, ny, nz);
        core::mem::swap(&mut prev, &mut cur);
    }
    out[..total * 12].copy_from_slice(&prev);
    valid.iter().filter(|v| **v == 0).count() as u32
}

/// Probe positions for z-layers [z0, z1): cell centres, moved out of solids where needed.
/// `pos` = total·3 floats, `valid` = total bytes (1 = usable); only the slab is written.
pub fn probe_positions(w: &StaticWorld, p: &GiParams, z0: u32, z1: u32, pos: &mut [f32], valid: &mut [u8]) {
    let (nx, ny) = (p.nx as usize, p.ny as usize);
    let dirs = fib_dirs(p.rays.min(96));
    let near = p.cell * 0.75;
    let offs = [Vec3::Y, -Vec3::Y, Vec3::X, -Vec3::X, Vec3::Z, -Vec3::Z, v3(0.7, 0.7, 0.0), v3(-0.7, 0.7, 0.0), v3(0.0, 0.7, 0.7), v3(0.0, 0.7, -0.7)];
    let inside = |q: Vec3| -> bool {
        let mut back = 0u32;
        let mut cnt = 0u32;
        for (k, d) in dirs.iter().enumerate() {
            if k % 2 != 0 { continue; }
            cnt += 1;
            if let Some(h) = w.raycast(q, *d, near) {
                if h.backface { back += 1; }
            }
        }
        back as f32 > INSIDE_FRACTION * cnt as f32
    };
    for iz in z0 as usize..(z1.min(p.nz)) as usize {
        for iy in 0..ny {
            for ix in 0..nx {
                let i = (iz * ny + iy) * nx + ix;
                let c = p.min + v3((ix as f32 + 0.5) * p.cell, (iy as f32 + 0.5) * p.cell, (iz as f32 + 0.5) * p.cell);
                let mut q = c;
                let mut ok = true;
                if w.nodes.is_empty() {
                    ok = true;
                } else if inside(c) {
                    ok = false;
                    for o in offs.iter() {
                        let t = c + *o * (p.cell * 0.45);
                        if !inside(t) { q = t; ok = true; break; }
                    }
                }
                pos[i * 3] = q.x; pos[i * 3 + 1] = q.y; pos[i * 3 + 2] = q.z;
                valid[i] = ok as u8;
            }
        }
    }
}

/// One bounce pass for z-layers [z0, z1). `prev` = the previous pass's full grid (None on pass 0).
pub fn pass_slab(w: &StaticWorld, p: &GiParams, pos: &[f32], valid: &[u8], prev: Option<&[f32]>, pass: u32, z0: u32, z1: u32, out: &mut [f32]) {
    let (nx, ny) = (p.nx as usize, p.ny as usize);
    let dirs = fib_dirs(p.rays);
    let nrays = dirs.len() as f32;
    let sun = p.sun_dir.normalize_or(Vec3::Y);
    let sun_up = sun.y > 0.0;
    let albedo = |m: u8| -> [f32; 3] {
        let i = m as usize * 3;
        if i + 2 < p.albedo.len() { [p.albedo[i], p.albedo[i + 1], p.albedo[i + 2]] } else { [0.3, 0.3, 0.3] }
    };
    let grid = prev.map(|d| Grid { min: p.min, cell: p.cell, n: [p.nx, p.ny, p.nz], data: d });
    for iz in z0 as usize..(z1.min(p.nz)) as usize {
        for iy in 0..ny {
            for ix in 0..nx {
                let i = (iz * ny + iy) * nx + ix;
                let base = i * 12;
                if valid[i] == 0 { for k in 0..12 { out[base + k] = 0.0; } continue; }
                let o = v3(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
                let frac = (i as f32 * 0.618_034 + pass as f32 * 0.31).fract();
                let (s, c) = (core::f32::consts::TAU * frac).sin_cos();
                let mut acc = [[0.0f32; 4]; 3];
                for d0 in dirs.iter() {
                    let d = v3(d0.x * c - d0.z * s, d0.y, d0.x * s + d0.z * c);
                    let l: [f32; 3] = match if w.nodes.is_empty() { None } else { w.raycast(o, d, p.max_dist) } {
                        None => sky_radiance(p.sky_sh, d),
                        Some(h) => {
                            if h.backface {
                                [0.0; 3]
                            } else {
                                let tri = &w.tris[h.tri as usize];
                                let mut n = tri_normal(tri);
                                if n.dot(d) > 0.0 { n = -n; }
                                let hp = o + d * h.t + n * 0.002;
                                let a = albedo(w.mats[h.tri as usize]);
                                let ndl = n.dot(sun);
                                let mut e = [0.0f32; 3];
                                if sun_up && ndl > 0.0 && !w.occluded(hp, sun, 0.0, 2000.0) {
                                    for k in 0..3 { e[k] = p.sun_rgb[k] * ndl * core::f32::consts::FRAC_1_PI; }
                                }
                                let ind = grid.as_ref().and_then(|g| g.irradiance(hp, n)).unwrap_or_else(|| sky_irradiance(p.sky_sh, n));
                                [a[0] * (e[0] + ind[0]), a[1] * (e[1] + ind[1]), a[2] * (e[2] + ind[2])]
                            }
                        }
                    };
                    for ch in 0..3 {
                        acc[ch][0] += l[ch];
                        acc[ch][1] += l[ch] * d.y;
                        acc[ch][2] += l[ch] * d.z;
                        acc[ch][3] += l[ch] * d.x;
                    }
                }
                for ch in 0..3 {
                    out[base + ch * 4] = acc[ch][0] / nrays;
                    out[base + ch * 4 + 1] = 2.0 * acc[ch][1] / nrays;
                    out[base + ch * 4 + 2] = 2.0 * acc[ch][2] / nrays;
                    out[base + ch * 4 + 3] = 2.0 * acc[ch][3] / nrays;
                }
            }
        }
    }
}

/// Invalid probes take the average of valid 26-neighbours (repeated so deep pockets fill too).
pub fn fill_invalid(data: &mut [f32], valid: &[bool], nx: usize, ny: usize, nz: usize) {
    let mut ok = valid.to_vec();
    for _ in 0..4 {
        let mut changed = false;
        let snapshot = data.to_vec();
        let ok_prev = ok.clone();
        for iz in 0..nz {
            for iy in 0..ny {
                for ix in 0..nx {
                    let i = (iz * ny + iy) * nx + ix;
                    if ok_prev[i] { continue; }
                    let mut sum = [0.0f32; 12];
                    let mut cnt = 0.0f32;
                    for dz in -1i32..=1 {
                        for dy in -1i32..=1 {
                            for dx in -1i32..=1 {
                                let (x, y, z) = (ix as i32 + dx, iy as i32 + dy, iz as i32 + dz);
                                if x < 0 || y < 0 || z < 0 || x >= nx as i32 || y >= ny as i32 || z >= nz as i32 { continue; }
                                let j = (z as usize * ny + y as usize) * nx + x as usize;
                                if !ok_prev[j] { continue; }
                                for k in 0..12 { sum[k] += snapshot[j * 12 + k]; }
                                cnt += 1.0;
                            }
                        }
                    }
                    if cnt > 0.0 {
                        for k in 0..12 { data[i * 12 + k] = sum[k] / cnt; }
                        ok[i] = true;
                        changed = true;
                    }
                }
            }
        }
        if !changed { break; }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::bvh::{box_mesh, grid_mesh};

    fn sky() -> [f32; 27] {
        // uniform sky of radiance 1 (irradiance/π = 1 for every normal)
        let mut s = [0.0f32; 27];
        s[0] = 1.0; s[1] = 1.0; s[2] = 1.0;
        s
    }

    #[test]
    fn open_sky_probe_reads_sky() {
        let w = StaticWorld::default();
        let sh = sky();
        let alb = [0.5f32; 3];
        let p = GiParams { min: v3(0.0, 0.0, 0.0), cell: 1.0, nx: 1, ny: 1, nz: 1, rays: 64, passes: 1, sun_dir: Vec3::Y, sun_rgb: [0.0; 3], sky_sh: &sh, albedo: &alb, max_dist: 100.0 };
        let mut out = [0.0f32; 12];
        bake_gi(&w, &p, &mut out);
        assert!((out[0] - 1.0).abs() < 1e-4);
    }

    #[test]
    fn roof_darkens_and_ground_bounce_lights_from_below() {
        let mut w = StaticWorld::default();
        let (pp, ii) = grid_mesh(-200.0, -200.0, 400.0, 0.0, 20);
        w.add_mesh(&pp, &ii, 0);
        let (pp, ii) = box_mesh(v3(-6.0, 3.0, -6.0), v3(6.0, 3.2, 6.0));
        w.add_mesh(&pp, &ii, 1);
        w.build();
        // sky bright above, dim below the horizon (like the renderer's env with ground albedo)
        let mut sh = [0.0f32; 27];
        for c in 0..3 { sh[c] = 0.6; sh[3 + c] = 0.4; }
        let alb = [0.3f32, 0.3, 0.3, 0.5, 0.5, 0.5];
        let mut out = [0.0f32; 24];
        // probe under the roof and one in the open, 1.5 m up
        let mk = |x: f32| GiParams { min: v3(x - 0.5, 1.0, -0.5), cell: 1.0, nx: 1, ny: 1, nz: 1, rays: 512, passes: 2, sun_dir: v3(0.0, 0.8, 0.6), sun_rgb: [5.0; 3], sky_sh: &sh, albedo: &alb, max_dist: 300.0 };
        bake_gi(&w, &mk(0.0), &mut out[..12]);
        bake_gi(&w, &mk(60.0), &mut out[12..]);
        let up_roof = out[0] + out[1];
        let up_open = out[12] + out[13];
        assert!(up_roof < 0.8 * up_open, "roof {up_roof} open {up_open}");
        // without sun the roof blocks most of the sky for an upward normal
        let mut dark = [0.0f32; 12];
        let nosun = GiParams { sun_rgb: [0.0; 3], ..mk(0.0) };
        bake_gi(&w, &nosun, &mut dark);
        assert!(dark[0] + dark[1] < 0.3, "sky-only under roof {}", dark[0] + dark[1]);
        // open probe: light from below (sunlit ground) is substantial: E(−y)/π = c0 − c1 > 0
        let down_open = out[12] - out[13];
        assert!(down_open > 0.3, "ground bounce {down_open}");
        // under the roof, light from the side (sunlit ground outside) beats the dark roof above
        assert!(out[0] - out[1] > 0.0);
    }
}
