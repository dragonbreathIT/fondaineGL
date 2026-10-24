//! Static triangle soup + binned-SAH BVH.
//!
//! Triangles are stored in BVH leaf order after `build()`; `orig[i]` maps a
//! stored triangle back to its global index (the order in which triangles were
//! added across all meshes), which is what the public API reports.
//!
//! Static triangles are two-sided for all queries. Winding is still used to
//! classify front/back hits (counter-clockwise = front, three.js convention),
//! which the sky-visibility bake uses for its "inside geometry" detection.

use crate::math::*;

/// Barycentric tolerance for Möller–Trumbore. Slightly enlarging every
/// triangle makes rays that pass exactly through a shared edge/vertex hit at
/// least one of the adjacent triangles (no leaks through cracks).
const BARY_EPS: f32 = 2e-6;
/// Maximum BVH depth; the traversal stack is sized for it.
const MAX_DEPTH: u32 = 60;
const STACK: usize = 64;
const BINS: usize = 16;
/// Preferred maximum leaf size when SAH says a leaf is cheaper.
const MAX_LEAF: usize = 8;
/// Leaves are forced split above this size even if SAH prefers a leaf.
const MAX_LEAF_HARD: usize = 16;
const TRAVERSAL_COST: f32 = 1.0;

#[derive(Clone, Copy, Debug)]
#[repr(C)]
pub struct Node {
    pub bmin: Vec3,
    /// Interior: index of left child (right = left + 1). Leaf: first triangle.
    pub left_first: u32,
    pub bmax: Vec3,
    /// 0 for interior nodes, number of triangles for leaves.
    pub count: u32,
}

#[derive(Clone, Copy, Debug)]
pub struct RayHit {
    pub t: f32,
    /// Index into the stored (BVH-ordered) triangle arrays.
    pub tri: u32,
    /// True if the ray hit the back (clockwise) side.
    pub backface: bool,
}

#[derive(Default)]
pub struct StaticWorld {
    pub tris: Vec<[Vec3; 3]>,
    pub mats: Vec<u8>,
    pub orig: Vec<u32>,
    pub nodes: Vec<Node>,
    pub mesh_count: u32,
    /// Number of triangles submitted so far (including skipped invalid ones);
    /// global triangle index = submitted-before-this-mesh + local index.
    pub submitted: u32,
    /// Per mesh: global index of its first triangle.
    pub mesh_first_tri: Vec<u32>,
    /// True if triangles were added since the last build.
    pub dirty: bool,
}

/// Precomputed ray data for traversal.
#[derive(Clone, Copy)]
pub struct Ray {
    pub o: Vec3,
    pub d: Vec3,
    pub inv: Vec3,
}

impl Ray {
    #[inline]
    pub fn new(o: Vec3, d: Vec3) -> Ray {
        #[inline(always)]
        fn safe_inv(x: f32) -> f32 {
            if x.abs() < 1e-30 {
                if x.is_sign_negative() {
                    -1e30
                } else {
                    1e30
                }
            } else {
                1.0 / x
            }
        }
        Ray { o, d, inv: v3(safe_inv(d.x), safe_inv(d.y), safe_inv(d.z)) }
    }
}

/// Slab test; returns the entry distance or +inf on miss.
#[inline(always)]
fn ray_aabb(r: &Ray, bmin: Vec3, bmax: Vec3, tmax: f32) -> f32 {
    let tx1 = (bmin.x - r.o.x) * r.inv.x;
    let tx2 = (bmax.x - r.o.x) * r.inv.x;
    let mut tmin = tx1.min(tx2);
    let mut tfar = tx1.max(tx2);
    let ty1 = (bmin.y - r.o.y) * r.inv.y;
    let ty2 = (bmax.y - r.o.y) * r.inv.y;
    tmin = tmin.max(ty1.min(ty2));
    tfar = tfar.min(ty1.max(ty2));
    let tz1 = (bmin.z - r.o.z) * r.inv.z;
    let tz2 = (bmax.z - r.o.z) * r.inv.z;
    tmin = tmin.max(tz1.min(tz2));
    tfar = tfar.min(tz1.max(tz2));
    // Tiny relative slack so axis-aligned flat boxes (zero thickness) still hit.
    if tfar * 1.000_001 + 1e-7 >= tmin && tfar >= 0.0 && tmin < tmax {
        tmin.max(0.0)
    } else {
        f32::INFINITY
    }
}

/// Möller–Trumbore, two-sided. Returns (t, det); det < 0 means back face.
#[inline(always)]
pub fn ray_triangle(o: Vec3, d: Vec3, tri: &[Vec3; 3], tmax: f32) -> Option<(f32, f32)> {
    let e1 = tri[1] - tri[0];
    let e2 = tri[2] - tri[0];
    let p = d.cross(e2);
    let det = e1.dot(p);
    if det.abs() < 1e-20 {
        return None;
    }
    let inv = 1.0 / det;
    let s = o - tri[0];
    let u = s.dot(p) * inv;
    if !(-BARY_EPS..=1.0 + BARY_EPS).contains(&u) {
        return None;
    }
    let q = s.cross(e1);
    let v = d.dot(q) * inv;
    if v < -BARY_EPS || u + v > 1.0 + BARY_EPS {
        return None;
    }
    let t = e2.dot(q) * inv;
    if t >= 0.0 && t < tmax {
        Some((t, det))
    } else {
        None
    }
}

#[inline]
pub fn tri_normal(tri: &[Vec3; 3]) -> Vec3 {
    (tri[1] - tri[0]).cross(tri[2] - tri[0]).normalize_or(Vec3::Y)
}

#[inline]
fn tri_aabb(t: &[Vec3; 3]) -> Aabb {
    Aabb { min: t[0].min(t[1]).min(t[2]), max: t[0].max(t[1]).max(t[2]) }
}

/// Triangle bounds padded by a tiny relative epsilon. Without padding, an
/// axis-parallel ray lying exactly on a box's max plane computes
/// `0 * (1/0)` style products in the slab test and misses.
#[inline]
fn tri_aabb_padded(t: &[Vec3; 3]) -> Aabb {
    let b = tri_aabb(t);
    let m = b.min.abs().max(b.max.abs());
    let pad = m * 4e-7 + Vec3::splat(1e-7);
    Aabb { min: b.min - pad, max: b.max + pad }
}

impl StaticWorld {
    pub fn clear(&mut self) {
        self.tris.clear();
        self.mats.clear();
        self.orig.clear();
        self.nodes.clear();
        self.mesh_count = 0;
        self.submitted = 0;
        self.mesh_first_tri.clear();
        self.dirty = false;
    }

    pub fn triangle_count(&self) -> usize {
        self.tris.len()
    }

    /// Add a world-space triangle-list mesh. Invalid / degenerate / non-finite
    /// triangles are skipped but still consume their global index, so the
    /// reported triangle index always equals
    /// `(triangles in all previously added meshes) + (index_in_mesh / 3)`.
    /// Returns the mesh id.
    pub fn add_mesh(&mut self, positions: &[f32], indices: &[u32], material: u8) -> u32 {
        let vcount = positions.len() / 3;
        let tcount = indices.len() / 3;
        let base = self.submitted;
        self.mesh_first_tri.push(base);
        self.submitted = self.submitted.saturating_add(tcount as u32);
        self.tris.reserve(tcount);
        self.mats.reserve(tcount);
        self.orig.reserve(tcount);
        for t in 0..tcount {
            let (i0, i1, i2) = (indices[t * 3] as usize, indices[t * 3 + 1] as usize, indices[t * 3 + 2] as usize);
            if i0 >= vcount || i1 >= vcount || i2 >= vcount {
                continue;
            }
            let p = |i: usize| v3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            let tri = [p(i0), p(i1), p(i2)];
            if !(tri[0].is_finite() && tri[1].is_finite() && tri[2].is_finite()) {
                continue;
            }
            if (tri[1] - tri[0]).cross(tri[2] - tri[0]).length_sq() <= 0.0 {
                continue; // zero-area: can never be hit, and breaks normals
            }
            let gi = base.saturating_add(t as u32);
            self.tris.push(tri);
            self.mats.push(material);
            self.orig.push(gi);
        }
        self.dirty = true;
        let id = self.mesh_count;
        self.mesh_count += 1;
        id
    }

    pub fn ensure_built(&mut self) {
        if self.dirty {
            self.build();
        }
    }

    /// Build a binned-SAH BVH over all stored triangles and reorder them into
    /// leaf order.
    pub fn build(&mut self) {
        self.dirty = false;
        self.nodes.clear();
        let n = self.tris.len();
        if n == 0 {
            return;
        }
        let bounds: Vec<Aabb> = self.tris.iter().map(tri_aabb_padded).collect();
        let cent: Vec<Vec3> = bounds.iter().map(|b| (b.min + b.max) * 0.5).collect();
        let mut idx: Vec<u32> = (0..n as u32).collect();
        self.nodes.reserve(n / 2 + 1);
        self.nodes.push(Node { bmin: Vec3::ZERO, left_first: 0, bmax: Vec3::ZERO, count: n as u32 });
        let mut stack: Vec<(u32, u32)> = vec![(0, 0)];

        let mut right_area = [0f32; BINS];
        let mut right_cnt = [0u32; BINS];

        while let Some((ni, depth)) = stack.pop() {
            let ni = ni as usize;
            let first = self.nodes[ni].left_first as usize;
            let count = self.nodes[ni].count as usize;
            let mut nb = Aabb::EMPTY;
            let mut cb = Aabb::EMPTY;
            for &i in &idx[first..first + count] {
                nb.grow(&bounds[i as usize]);
                cb.grow_point(cent[i as usize]);
            }
            self.nodes[ni].bmin = nb.min;
            self.nodes[ni].bmax = nb.max;
            if count <= 2 || depth >= MAX_DEPTH {
                continue;
            }

            // --- binned SAH ---
            let mut best_cost = f32::INFINITY;
            let mut best_axis = usize::MAX;
            let mut best_split = 0usize;
            for axis in 0..3 {
                let cmin = cb.min.get(axis);
                let ext = cb.max.get(axis) - cmin;
                if ext.partial_cmp(&(cmin.abs() * 1e-7)) != Some(core::cmp::Ordering::Greater) {
                    continue;
                }
                let scale = BINS as f32 / ext;
                let mut bin_bounds = [Aabb::EMPTY; BINS];
                let mut bin_count = [0u32; BINS];
                for &i in &idx[first..first + count] {
                    let k = (((cent[i as usize].get(axis) - cmin) * scale) as usize).min(BINS - 1);
                    bin_count[k] += 1;
                    bin_bounds[k].grow(&bounds[i as usize]);
                }
                // right sweep
                let mut acc = Aabb::EMPTY;
                let mut cnt = 0u32;
                for k in (1..BINS).rev() {
                    acc.grow(&bin_bounds[k]);
                    cnt += bin_count[k];
                    right_area[k] = acc.half_area();
                    right_cnt[k] = cnt;
                }
                // left sweep
                let mut acc = Aabb::EMPTY;
                let mut cnt = 0u32;
                for k in 1..BINS {
                    acc.grow(&bin_bounds[k - 1]);
                    cnt += bin_count[k - 1];
                    if cnt == 0 || right_cnt[k] == 0 {
                        continue;
                    }
                    let cost = acc.half_area() * cnt as f32 + right_area[k] * right_cnt[k] as f32;
                    if cost < best_cost {
                        best_cost = cost;
                        best_axis = axis;
                        best_split = k;
                    }
                }
            }

            let parent_area = nb.half_area().max(1e-30);
            let leaf_cost = count as f32;
            let split_cost = TRAVERSAL_COST + best_cost / parent_area;

            let mut mid;
            if best_axis == usize::MAX {
                // All centroids coincide: median split if too big, else leaf.
                if count <= MAX_LEAF_HARD {
                    continue;
                }
                mid = first + count / 2;
            } else {
                if leaf_cost <= split_cost && count <= MAX_LEAF {
                    continue;
                }
                let cmin = cb.min.get(best_axis);
                let scale = BINS as f32 / (cb.max.get(best_axis) - cmin);
                // in-place partition
                let mut i = first;
                let mut j = first + count;
                while i < j {
                    let c = cent[idx[i] as usize].get(best_axis);
                    let k = (((c - cmin) * scale) as usize).min(BINS - 1);
                    if k < best_split {
                        i += 1;
                    } else {
                        j -= 1;
                        idx.swap(i, j);
                    }
                }
                mid = i;
                if mid == first || mid == first + count {
                    mid = first + count / 2;
                }
            }

            let left = self.nodes.len() as u32;
            self.nodes.push(Node { bmin: Vec3::ZERO, left_first: first as u32, bmax: Vec3::ZERO, count: (mid - first) as u32 });
            self.nodes.push(Node { bmin: Vec3::ZERO, left_first: mid as u32, bmax: Vec3::ZERO, count: (first + count - mid) as u32 });
            self.nodes[ni].left_first = left;
            self.nodes[ni].count = 0;
            stack.push((left, depth + 1));
            stack.push((left + 1, depth + 1));
        }

        // Reorder triangle data into leaf order.
        let tris: Vec<[Vec3; 3]> = idx.iter().map(|&i| self.tris[i as usize]).collect();
        let mats: Vec<u8> = idx.iter().map(|&i| self.mats[i as usize]).collect();
        let orig: Vec<u32> = idx.iter().map(|&i| self.orig[i as usize]).collect();
        self.tris = tris;
        self.mats = mats;
        self.orig = orig;
        self.nodes.shrink_to_fit();
    }

    /// Closest hit along `d` (must be unit length) within [0, tmax).
    pub fn raycast(&self, o: Vec3, d: Vec3, tmax: f32) -> Option<RayHit> {
        if self.nodes.is_empty() || !(tmax > 0.0) {
            return None;
        }
        let ray = Ray::new(o, d);
        let mut best_t = tmax;
        let mut best_tri = u32::MAX;
        let mut best_det = 0.0f32;
        let mut stack = [0u32; STACK];
        let mut sp = 0usize;
        let root = &self.nodes[0];
        if ray_aabb(&ray, root.bmin, root.bmax, best_t) == f32::INFINITY {
            return None;
        }
        let mut ni = 0usize;
        loop {
            let node = &self.nodes[ni];
            if node.count > 0 {
                let first = node.left_first as usize;
                for ti in first..first + node.count as usize {
                    if let Some((t, det)) = ray_triangle(o, d, &self.tris[ti], best_t) {
                        best_t = t;
                        best_tri = ti as u32;
                        best_det = det;
                    }
                }
            } else {
                let l = node.left_first as usize;
                let (nl, nr) = (&self.nodes[l], &self.nodes[l + 1]);
                let tl = ray_aabb(&ray, nl.bmin, nl.bmax, best_t);
                let tr = ray_aabb(&ray, nr.bmin, nr.bmax, best_t);
                let (near, far, tn, tf) = if tl <= tr { (l, l + 1, tl, tr) } else { (l + 1, l, tr, tl) };
                if tn != f32::INFINITY {
                    if tf != f32::INFINITY && sp < STACK {
                        stack[sp] = far as u32;
                        sp += 1;
                    }
                    ni = near;
                    continue;
                }
            }
            // pop, skipping nodes now farther than the best hit
            loop {
                if sp == 0 {
                    return if best_tri != u32::MAX {
                        Some(RayHit { t: best_t, tri: best_tri, backface: best_det < 0.0 })
                    } else {
                        None
                    };
                }
                sp -= 1;
                let cand = stack[sp] as usize;
                let n = &self.nodes[cand];
                if ray_aabb(&ray, n.bmin, n.bmax, best_t) != f32::INFINITY {
                    ni = cand;
                    break;
                }
            }
        }
    }

    /// Any-hit query: true if anything is hit within [tmin, tmax). Stops at
    /// the first hit found (no ordering), which is much cheaper than
    /// `raycast` for visibility queries.
    pub fn occluded(&self, o: Vec3, d: Vec3, tmin: f32, tmax: f32) -> bool {
        if self.nodes.is_empty() || !(tmax > tmin) {
            return false;
        }
        let ray = Ray::new(o, d);
        let mut stack = [0u32; STACK];
        let mut sp = 1usize;
        stack[0] = 0;
        while sp > 0 {
            sp -= 1;
            let node = &self.nodes[stack[sp] as usize];
            if ray_aabb(&ray, node.bmin, node.bmax, tmax) == f32::INFINITY {
                continue;
            }
            if node.count > 0 {
                let first = node.left_first as usize;
                for ti in first..first + node.count as usize {
                    if let Some((t, _)) = ray_triangle(o, d, &self.tris[ti], tmax) {
                        if t >= tmin {
                            return true;
                        }
                    }
                }
            } else if sp + 2 <= STACK {
                stack[sp] = node.left_first;
                stack[sp + 1] = node.left_first + 1;
                sp += 2;
            }
        }
        false
    }

    /// Single-traversal visibility classification used by the sky bake.
    /// Returns `(occluded_within_tmax, closest_hit_is_backface_within_near)`.
    ///
    /// Ordered (near-first) traversal. Hits beyond `near` only need to be
    /// detected (any-hit), so after the first such hit the search range
    /// shrinks to `near`, where the closest hit is resolved exactly.
    pub fn classify(&self, o: Vec3, d: Vec3, near: f32, tmax: f32) -> (bool, bool) {
        if self.nodes.is_empty() || !(tmax > 0.0) {
            return (false, false);
        }
        let ray = Ray::new(o, d);
        let near = near.min(tmax);
        let mut lim = tmax;
        let mut hit = false;
        let mut best_near = f32::INFINITY;
        let mut back = false;
        let mut stack = [0u32; STACK];
        let mut sp = 0usize;
        let mut ni = 0usize;
        if ray_aabb(&ray, self.nodes[0].bmin, self.nodes[0].bmax, lim) == f32::INFINITY {
            return (false, false);
        }
        loop {
            let node = &self.nodes[ni];
            if node.count > 0 {
                let first = node.left_first as usize;
                for ti in first..first + node.count as usize {
                    if let Some((t, det)) = ray_triangle(o, d, &self.tris[ti], lim) {
                        hit = true;
                        if t < near {
                            best_near = t;
                            back = det < 0.0;
                            lim = t;
                        } else {
                            lim = near;
                        }
                    }
                }
            } else {
                let l = node.left_first as usize;
                let (nl, nr) = (&self.nodes[l], &self.nodes[l + 1]);
                let tl = ray_aabb(&ray, nl.bmin, nl.bmax, lim);
                let tr = ray_aabb(&ray, nr.bmin, nr.bmax, lim);
                let (a, b, ta, tb) = if tl <= tr { (l, l + 1, tl, tr) } else { (l + 1, l, tr, tl) };
                if ta != f32::INFINITY {
                    if tb != f32::INFINITY && sp < STACK {
                        stack[sp] = b as u32;
                        sp += 1;
                    }
                    ni = a;
                    continue;
                }
            }
            loop {
                if sp == 0 {
                    return (hit, best_near < near && back);
                }
                sp -= 1;
                let cand = stack[sp] as usize;
                let n = &self.nodes[cand];
                if ray_aabb(&ray, n.bmin, n.bmax, lim) != f32::INFINITY {
                    ni = cand;
                    break;
                }
            }
        }
    }

    /// Collects every stored triangle whose AABB overlaps `b` into `out`.
    pub fn query_aabb(&self, b: &Aabb, out: &mut Vec<u32>) {
        out.clear();
        if self.nodes.is_empty() {
            return;
        }
        let mut stack = [0u32; STACK];
        let mut sp = 1usize;
        stack[0] = 0;
        while sp > 0 {
            sp -= 1;
            let node = &self.nodes[stack[sp] as usize];
            let nb = Aabb { min: node.bmin, max: node.bmax };
            if !nb.overlaps(b) {
                continue;
            }
            if node.count > 0 {
                let first = node.left_first as usize;
                for ti in first..first + node.count as usize {
                    if tri_aabb(&self.tris[ti]).overlaps(b) {
                        out.push(ti as u32);
                    }
                }
            } else if sp + 2 <= STACK {
                stack[sp] = node.left_first;
                stack[sp + 1] = node.left_first + 1;
                sp += 2;
            }
        }
    }

    /// Depth of the tree (for diagnostics / tests).
    pub fn depth(&self) -> u32 {
        fn rec(nodes: &[Node], i: usize) -> u32 {
            let n = &nodes[i];
            if n.count > 0 {
                1
            } else {
                1 + rec(nodes, n.left_first as usize).max(rec(nodes, n.left_first as usize + 1))
            }
        }
        if self.nodes.is_empty() {
            0
        } else {
            rec(&self.nodes, 0)
        }
    }
}

// ---------------------------------------------------------------------------
// Helpers used by tests in several modules.
// ---------------------------------------------------------------------------

/// Axis-aligned box mesh (outward CCW faces). Returns (positions, indices).
pub fn box_mesh(min: Vec3, max: Vec3) -> (Vec<f32>, Vec<u32>) {
    let c = [
        v3(min.x, min.y, min.z),
        v3(max.x, min.y, min.z),
        v3(max.x, max.y, min.z),
        v3(min.x, max.y, min.z),
        v3(min.x, min.y, max.z),
        v3(max.x, min.y, max.z),
        v3(max.x, max.y, max.z),
        v3(min.x, max.y, max.z),
    ];
    let mut pos = Vec::with_capacity(24);
    for p in c.iter() {
        pos.extend_from_slice(&[p.x, p.y, p.z]);
    }
    // CCW when viewed from outside.
    let idx = vec![
        0, 3, 2, 0, 2, 1, // -Z
        4, 5, 6, 4, 6, 7, // +Z
        0, 4, 7, 0, 7, 3, // -X
        1, 2, 6, 1, 6, 5, // +X
        0, 1, 5, 0, 5, 4, // -Y
        3, 7, 6, 3, 6, 2, // +Y
    ];
    (pos, idx)
}

/// Subdivided horizontal grid at height y (normals +Y), `n` x `n` quads.
pub fn grid_mesh(min_x: f32, min_z: f32, size: f32, y: f32, n: u32) -> (Vec<f32>, Vec<u32>) {
    let mut pos = Vec::new();
    let mut idx = Vec::new();
    let step = size / n as f32;
    for j in 0..=n {
        for i in 0..=n {
            pos.extend_from_slice(&[min_x + i as f32 * step, y, min_z + j as f32 * step]);
        }
    }
    let w = n + 1;
    for j in 0..n {
        for i in 0..n {
            let a = j * w + i;
            let b = a + 1;
            let c = a + w;
            let d = c + 1;
            // CCW seen from +Y: a, c, b and b, c, d
            idx.extend_from_slice(&[a, c, b, b, c, d]);
        }
    }
    (pos, idx)
}

#[cfg(test)]
mod tests {
    use super::*;

    fn world_with_box() -> StaticWorld {
        let mut w = StaticWorld::default();
        let (p, i) = box_mesh(v3(-1.0, 0.0, -1.0), v3(1.0, 2.0, 1.0));
        w.add_mesh(&p, &i, 3);
        w.build();
        w
    }

    #[test]
    fn box_front_and_back_hits() {
        let w = world_with_box();
        let h = w.raycast(v3(0.0, 1.0, -5.0), Vec3::Z, 100.0).unwrap();
        assert!((h.t - 4.0).abs() < 1e-5);
        assert!(!h.backface);
        // any-hit / classify agree with raycast
        assert!(w.occluded(v3(0.0, 1.0, -5.0), Vec3::Z, 0.0, 100.0));
        assert!(!w.occluded(v3(0.0, 1.0, -5.0), Vec3::Z, 0.0, 3.9));
        assert_eq!(w.classify(v3(0.0, 1.0, -5.0), Vec3::Z, 1.0, 100.0), (true, false));
        assert_eq!(w.classify(v3(0.0, 1.0, 0.0), Vec3::Z, 1.5, 100.0), (true, true));
        assert_eq!(w.classify(v3(0.0, 1.0, 0.0), Vec3::Z, 0.5, 100.0), (true, false));
        assert_eq!(w.classify(v3(0.0, 5.0, 0.0), Vec3::Y, 0.5, 100.0), (false, false));
        // from inside: back face of +Z wall
        let h = w.raycast(v3(0.0, 1.0, 0.0), Vec3::Z, 100.0).unwrap();
        assert!((h.t - 1.0).abs() < 1e-5);
        assert!(h.backface);
        assert!(w.raycast(v3(0.0, 5.0, -5.0), Vec3::Z, 100.0).is_none());
        assert!(w.raycast(v3(0.0, 1.0, -5.0), Vec3::Z, 3.9).is_none());
    }

    #[test]
    fn no_leak_through_shared_edges() {
        // Fine grid; shoot rays exactly at vertices / along shared edges.
        let mut w = StaticWorld::default();
        let (p, i) = grid_mesh(-8.0, -8.0, 16.0, 0.0, 64);
        w.add_mesh(&p, &i, 0);
        w.build();
        let step = 16.0 / 64.0;
        let mut misses = 0;
        for j in 0..=64 {
            for k in 0..=64 {
                let x = -8.0 + k as f32 * step;
                let z = -8.0 + j as f32 * step;
                if w.raycast(v3(x, 3.0, z), -Vec3::Y, 10.0).is_none() {
                    misses += 1;
                }
                // diagonal edge midpoint
                if j < 64 && k < 64 && w.raycast(v3(x + step * 0.5, 3.0, z + step * 0.5), -Vec3::Y, 10.0).is_none() {
                    misses += 1;
                }
            }
        }
        assert_eq!(misses, 0);
    }

    #[test]
    fn large_build_and_query() {
        let mut w = StaticWorld::default();
        let (p, i) = grid_mesh(-50.0, -50.0, 100.0, 0.0, 300); // 180k tris
        w.add_mesh(&p, &i, 0);
        w.build();
        assert_eq!(w.triangle_count(), 180_000);
        assert!(w.depth() <= MAX_DEPTH + 1);
        let h = w.raycast(v3(3.3, 10.0, -7.1), -Vec3::Y, 100.0).unwrap();
        assert!((h.t - 10.0).abs() < 1e-4);
        let mut out = Vec::new();
        w.query_aabb(&Aabb { min: v3(0.0, -0.1, 0.0), max: v3(1.0, 0.1, 1.0) }, &mut out);
        // 1m x 1m at 1/3 m spacing => ~ (3+2)^2 * 2 tris touching
        assert!(out.len() >= 18 && out.len() <= 60, "{}", out.len());
    }
}
