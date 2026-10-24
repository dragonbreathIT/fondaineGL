# fondaine-physics

Physics core of the fondaine engine: static triangle BVH, ray queries, sky-visibility bake,
capsule character controller, impulse-based rigid bodies, and G7 external ballistics.
Pure Rust, std only, no wasm-bindgen. It is called through a plain C ABI.

```
rustup target add wasm32-unknown-unknown
cargo build --release -p fondaine-physics --target wasm32-unknown-unknown
# -> target/wasm32-unknown-unknown/release/fondaine_physics.wasm  (~187 KB, imports nothing)
cargo test -p fondaine-physics                         # native unit tests
node fondaine-physics/tests-js/smoke.mjs               # wasm smoke test (from crates/)
```

## Conventions

- Units: meters, kilograms, seconds. Y-up, right-handed. Quaternions are `x, y, z, w`.
- There is one global world. wasm is single-threaded, so call it from one thread only.
- All arguments are `f32` or `u32` (wasm `f32` / `i32`). Pointers are byte offsets into `memory`.
- **Invalid result** = `0xFFFFFFFF`. In JS this comes back as `-1` from an `i32` export, so use `>>> 0` to compare against `4294967295`.
- Invalid ids, NaN input and null pointers are ignored. No export traps on bad input.
- **Memory can grow on any call that allocates.** That includes adding meshes, creating bodies, stepping, and spawning. Re-create typed-array views after each call and re-read every `*_ptr()` every frame.
- Integers stored in float buffers (ids, materials, triangle indices) are exact up to 2^24.

## Memory / results

| Export | Notes |
|---|---|
| `fp_alloc(bytes) -> ptr` | 8-byte aligned. Returns 0 for `bytes == 0` or on failure. |
| `fp_free(ptr, bytes)` | `bytes` must match the size passed to `fp_alloc`. |
| `fp_result_ptr() -> *f32` | Static 64-float scratch buffer written by single-result queries. The pointer is stable, but recreate the view after memory growth. |

## Materials

`fp_set_material(id, friction, restitution, ricochet_max_angle_deg, ricochet_energy_keep)`

- `id` must be 0..255. Ids above 255 are ignored.
- Default for every id: friction 0.6, restitution 0.2, no ricochet.
- Friction combines as `sqrt(a*b)`. Restitution combines as `max(a, b)`.
- `ricochet_max_angle_deg` is the largest grazing angle, measured from the surface plane, at which a projectile still ricochets. 0 means never.
- `ricochet_energy_keep` is the fraction of kinetic energy kept on a ricochet. Speed is scaled by `sqrt(keep)`.
- Materials survive `fp_world_reset`.

## Static world

| Export | Notes |
|---|---|
| `fp_world_reset()` | Clears static geometry, bodies, characters and projectiles. Keeps materials, gravity and atmosphere. |
| `fp_add_static_mesh(positions*, vertex_count, indices*, index_count, material_id) -> mesh_id` | World-space xyz positions, triangle list. Triangles that are out of range, NaN, or zero-area are skipped but still use up their index. Mesh ids count up from 0. |
| `fp_build()` | Builds a binned-SAH BVH (16 bins) over all static triangles. 560k triangles take about 0.55 s native and about 0.9 s in wasm. Queries rebuild automatically if meshes were added since the last build, but call `fp_build()` explicitly after loading. |

All static triangles are **two-sided**. Counter-clockwise winding is the front face; this only matters for the bake's inside-geometry check.
**Triangle index** (as reported in ray results) = number of triangles in all earlier meshes (`index_count/3` each) + local triangle index.

## Ray queries

`fp_raycast(ox,oy,oz, dx,dy,dz, max_dist, include_bodies) -> 0|1`

- `dir` does not need to be normalized. It is normalized internally; a zero direction returns 0.
- On a hit, `result[0..10]` = `[t, px,py,pz, nx,ny,nz, material, triangle_index, body_id]`.
  - The normal always faces against the ray. Backface hits are flipped.
  - `triangle_index = -1` when the ray hits a body.
  - `body_id = -1` when the ray hits static geometry.
- `include_bodies != 0` also tests live rigid bodies, using their exact shapes.

`fp_raycast_batch(rays*, count, max_dist, out_t*)`

- `rays` = `[ox,oy,oz,dx,dy,dz] * count`.
- Writes `t`, or `-1.0` for a miss, into `out_t[count]`.
- Static geometry only. Does not allocate.

## Sky-visibility bake

`fp_bake_sky_visibility(min_x,min_y,min_z, cell, nx,ny,nz, rays_per_cell, max_dist, out*)`

- `out` holds `nx*ny*nz` floats. The cell index is `x + nx*(y + ny*z)`; the cell center is `min + (i+0.5)*cell`.
- The value is the fraction of rays that reach `max_dist` without a hit, from 0 to 1.
- Rays are cosine-weighted over the +Y hemisphere using a Hammersley set. The set is rotated about Y per cell by a golden-ratio offset, which is deterministic.
- Inside-geometry check:
  - A center is treated as inside a solid if a 6-axis probe or at least 40% of the hemisphere rays hit back faces within 1.5 cells.
  - When that happens, the bake retries from points offset by half a cell (±Y, ±X, ±Z).
  - If every offset point is also inside, the cell gets 0.
- Timing with 32 rays per cell over 100k cells on a dense 560k-triangle city/terrain scene: about 2.4 s native and about 7.7 s in Node wasm, single-threaded, on a 2.1 GHz Xeon. An open field is far faster.

## Character controller (kinematic capsule; position = FEET)

| Export | Notes |
|---|---|
| `fp_character_create(radius, height, step_height, max_slope_deg) -> id` | `height` is clamped to at least `2*radius`. |
| `fp_character_set_position(id, x,y,z)` | Teleport. Clears `grounded`. |
| `fp_character_move(id, dx,dy,dz) -> flags` | Collide-and-slide against static geometry. |
| `fp_character_set_height(id, height) -> 0|1` | Shrinking always succeeds. Growing returns 0 and keeps the old height if the taller capsule would overlap geometry (crouch to stand check). The feet stay in place. |
| `fp_character_remove(id)` | Ids are reused. |

**Flags** (returned by `fp_character_move`): bit0 = grounded, bit1 = hit ceiling, bit2 = hit wall or too-steep slope.

**Result buffer after `fp_character_move`**: `result[0..8]` = `[px,py,pz, ground_nx,ground_ny,ground_nz, ground_material, flags]`. The ground normal is `(0,0,0)` when not grounded.

How `fp_character_move` behaves:

- **Sub-stepping:** each sub-step moves at most `0.45*radius`, so the capsule never tunnels, even with a 10 m displacement against a 1 cm wall.
- **Collision:** depenetration uses the capsule segment against nearby triangles, found with BVH AABB queries.
- **Contact handling:**
  - Walkable contacts lift the capsule straight up, so it does not creep down slopes.
  - Walls and slopes steeper than `max_slope` push it horizontally only, so it can't climb them and slides off under gravity.
  - Ceilings push it along the contact normal.
- **Step-up:** happens automatically when blocked while grounded, for ledges up to `step_height`.
- **Snap-down:** if the character was grounded and `dy <= 0`, it snaps down by up to `step_height`, so it stays grounded on stairs and downhill slopes.
- **Gravity is not applied.** The caller passes the gravity displacement in `dy` and zeroes its own vertical velocity when bit0 (grounded) or bit1 (ceiling) is set.
- Characters do not collide with rigid bodies.

## Rigid bodies

| Export | Notes |
|---|---|
| `fp_body_create(shape, a, b, c, mass, material_id) -> id` | Shapes: `0` sphere (`a` = radius), `1` box (half extents `a,b,c`), `2` capsule along local Y (`a` = radius, `b` = half segment length). Returns invalid for a non-positive size or mass. The body starts at the origin with identity rotation. Ids of removed bodies are reused. |
| `fp_body_set_transform(id, px,py,pz, qx,qy,qz,qw)` | The quaternion is normalized. Wakes the body. |
| `fp_body_set_velocity(id, vx,vy,vz, wx,wy,wz)` | Angular velocity is in rad/s, world frame. Wakes the body. |
| `fp_body_apply_impulse(id, ix,iy,iz, px,py,pz)` | Impulse in N·s at a world point. Wakes the body. |
| `fp_body_remove(id)` | Removes the body. |
| `fp_set_gravity(x,y,z)` | Default `(0,-9.81,0)`. Changing it wakes all bodies. |
| `fp_bodies_ptr() -> *f32` | Dense body buffer, indexed by body id. |
| `fp_body_stride() -> u32` | Floats per body. **Currently 16.** |
| `fp_body_count() -> u32` | Number of slots in the buffer (highest live id + 1). *(Extra export, not in the original spec.)* |

**Body buffer layout** (one record per id, `stride` = 16):
`[alive, px,py,pz, qx,qy,qz,qw, vx,vy,vz, wx,wy,wz, sleeping, shape]`

- Index 15 (`shape`) is extra.
- Dead slots are all zeros.
- The pointer changes when bodies are added, so re-read it every frame.

Solver details:

- **Sub-steps:** `dt` (clamped to 0.1 s) is split so each sub-step is at most 1/240 s and no awake body moves more than about 1 cm per sub-step (at most 64 sub-steps).
- **Contacts:** regenerated every sub-step with a speculative margin of at least 1.5× the distance travelled that sub-step. This acts as continuous collision detection: a 0.0048 m brass casing ejected at 6 m/s never passes through a 0.1 m slab at any frame `dt` from 1/144 to 1/20 s.
- **Solve:** 6 sequential-impulse iterations with Baumgarte bias and slop, then integration, then 2 relaxation iterations with no bias, then a restitution pass. Restitution needs an approach speed above 0.25 m/s.
- **Friction and rest:** Coulomb friction. Rolling and torsional resistance plus contact angular damping bring bodies to rest.
- **Inertia:** exact tensors for sphere, box and capsule. Angular momentum is conserved through the rotation update.
- **Sleep:** a body sleeps after 0.5 s below 5 cm/s, counting linear speed plus angular speed × radius. It wakes on any setter, an impulse, a projectile hit, a hit from a moving body, or a gravity change.
- **Pairs handled:** sphere, box and capsule against static triangles, and every body-vs-body shape pair. Box-box uses SAT with face clipping and up to 4 contact points.

### Contact events (impact sounds)

- `fp_contact_count()` gives the number of events; `fp_contacts_ptr()` gives a pointer to `count * 10` floats.
- Each event: `[body_id, px,py,pz, nx,ny,nz, normal_impulse, relative_normal_speed, other_material]`.
- `n` points from the other surface toward `body_id`.
- Events are emitted only when the approach speed is at least 0.2 m/s and the normal impulse is at least 1e-4 N·s, so resting contact produces nothing.
- At most one event per (body, other surface or body) per `fp_step`, keeping the strongest. Body-body hits emit one event for each awake body.
- The buffer is cleared at the start of each `fp_step`.

## Ballistics

`fp_set_atmosphere(temperature_c, pressure_hpa, relative_humidity_0_1, wind_x, wind_y, wind_z)`

- **Air density:** ρ = `p_d/(R_d·T) + p_v/(R_v·T)`, where vapour pressure `p_v = RH · e_s(T)` uses Buck's formula. At 15 °C, 1013.25 hPa and RH 0, ρ = 1.2250.
- **Speed of sound:** c = `331.3·sqrt(1+T/273.15)`.
- **Wind:** a world-space velocity in m/s.
- The default atmosphere is 15 °C, 1013.25 hPa, dry, no wind.

`fp_get_atmosphere() -> 1` writes `result[0..2] = [rho, speed_of_sound]`. *(Extra export.)*

`fp_projectile_spawn(px,py,pz, vx,vy,vz, bc_g7_lb_in2, mass_kg, diameter_m, max_time_s, user_id) -> projectile_id`

- **Drag:** `a = -ρ·|v_rel|·v_rel·Cd_G7(M)·π/(8·BC·703.0696)`, where `v_rel = v - wind` and `M = |v_rel|/c`. The G7 table is the one given in the spec, linearly interpolated and clamped beyond Mach 5. Gravity is added on top.
- **Integration:** RK4 in f64 with sub-steps of at most 0.5 ms.
- **Collision:** each sub-step's chord is swept against the static BVH and nearby live bodies.
- **On a hit:**
  - If the grazing angle is below the material's `ricochet_max_angle_deg`, the velocity is reflected, scaled by `sqrt(keep)`, and given up to 2° of random scatter (with at least 0.5° of exit angle). The hit is emitted with ricochet = 1 and the projectile continues. There is a limit of 8 ricochets per projectile.
  - Otherwise the hit is emitted and the projectile stops.
  - A body that is hit receives an impulse of `mass·(v_in − v_out)` at the hit point.
- **Removal:** a projectile is also removed when `time ≥ max_time`, `speed < 30 m/s`, or `y < −1000`.
- `diameter_m` is stored but not used: this is a point-mass model and the BC already includes it.
- Projectile ids increase and wrap at 2^24.

**Hits** (`fp_projectile_hit_count()`, `fp_projectile_hits_ptr()`), 16 floats each:
`[user_id, px,py,pz, nx,ny,nz, vx,vy,vz, material, distance_traveled, time_of_flight, body_id(-1 static), ricochet(0/1), projectile_id]`

- `v` is the impact velocity.
- `n` faces the incoming projectile.
- The buffer is cleared each `fp_step`.

**Live projectiles** (`fp_projectile_count()`, `fp_projectiles_ptr()`), 8 floats each:
`[projectile_id, user_id, px,py,pz, vx,vy,vz]`

- Updated after each `fp_step`, and after spawning.

Reference check from the unit tests, all within the spec's tolerances: 5.56 mm 77 gr (BC G7 0.186) at 840 m/s, standard atmosphere, fired level.

- Time of flight to 500 m: 0.791 s.
- Velocity at 500 m: 476 m/s.
- Drop at 100 m: 0.0745 m.
- Drift at 500 m in a 10 m/s crosswind: 1.96 m, which agrees with Didion's lag rule.

## Stepping

`fp_step(dt)` steps the rigid bodies first, then the projectiles. Projectile impulses are applied after the body step, and the exported body buffer is refreshed at the end. Characters move only through `fp_character_move`.

## Known limitations

- Characters and rigid bodies do not interact: characters don't push bodies and bodies don't block characters.
- There is no contact warm-starting between sub-steps. Stacks are stable but sink about 1 mm per contact layer; the top of a 6-box tower rests about 7 mm low.
- The ballistic ray has zero radius. There is no penetration or over-penetration model, and no spin drift, Coriolis effect or aerodynamic jump.
- The body broadphase is sort-and-sweep. Projectile-vs-body candidates come from a linear AABB scan of all bodies per projectile per step, which is fine for hundreds of bodies.
- The bake and BVH build are single-threaded. wasm SIMD is not used.
