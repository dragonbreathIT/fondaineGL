// TypeScript bindings for crates/fondaine-physics (Rust → WASM): static BVH world, raycasts, capsule
// character controller, rigid bodies, G7 external ballistics, sky-visibility bake.

import { Geometry } from '../geometry';
import { Mat4, vec3, Vec3 } from '../math';

interface Exports {
  memory: WebAssembly.Memory;
  fp_alloc(bytes: number): number;
  fp_gi_positions(minX: number, minY: number, minZ: number, cell: number, nx: number, ny: number, nz: number, rays: number, z0: number, z1: number, pos: number, valid: number): void;
  fp_gi_pass(minX: number, minY: number, minZ: number, cell: number, nx: number, ny: number, nz: number, rays: number, pass: number, sx: number, sy: number, sz: number, sr: number, sg: number, sb: number, skySh: number, albedo: number, albedoCount: number, maxDist: number, pos: number, valid: number, prev: number, z0: number, z1: number, out: number): void;
  fp_bake_gi(minX: number, minY: number, minZ: number, cell: number, nx: number, ny: number, nz: number, rays: number, passes: number, sx: number, sy: number, sz: number, sr: number, sg: number, sb: number, skySh: number, albedo: number, albedoCount: number, maxDist: number, out: number): number;
  fp_free(ptr: number, bytes: number): void;
  fp_result_ptr(): number;
  fp_set_material(id: number, friction: number, restitution: number, ricochetDeg: number, ricochetKeep: number): void;
  fp_world_reset(): void;
  fp_add_static_mesh(pos: number, nv: number, idx: number, ni: number, material: number): number;
  fp_build(): void;
  fp_raycast(ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, max: number, bodies: number): number;
  fp_raycast_batch(rays: number, count: number, max: number, out: number): void;
  fp_bake_sky_visibility(mx: number, my: number, mz: number, cell: number, nx: number, ny: number, nz: number, rays: number, maxDist: number, out: number): void;
  fp_character_create(radius: number, height: number, step: number, maxSlope: number): number;
  fp_character_set_position(id: number, x: number, y: number, z: number): void;
  fp_character_move(id: number, dx: number, dy: number, dz: number): number;
  fp_character_set_height(id: number, h: number): number;
  fp_character_remove(id: number): void;
  fp_body_create(shape: number, a: number, b: number, c: number, mass: number, material: number): number;
  fp_body_set_transform(id: number, px: number, py: number, pz: number, qx: number, qy: number, qz: number, qw: number): void;
  fp_body_set_velocity(id: number, vx: number, vy: number, vz: number, wx: number, wy: number, wz: number): void;
  fp_body_apply_impulse(id: number, ix: number, iy: number, iz: number, px: number, py: number, pz: number): void;
  fp_body_remove(id: number): void;
  fp_bodies_ptr(): number;
  fp_body_stride(): number;
  fp_set_gravity(x: number, y: number, z: number): void;
  fp_contact_count(): number;
  fp_contacts_ptr(): number;
  fp_set_atmosphere(tc: number, hpa: number, rh: number, wx: number, wy: number, wz: number): void;
  fp_projectile_spawn(px: number, py: number, pz: number, vx: number, vy: number, vz: number, bc: number, mass: number, diam: number, maxTime: number, user: number): number;
  fp_projectile_hit_count(): number;
  fp_projectile_hits_ptr(): number;
  fp_projectile_count(): number;
  fp_projectiles_ptr(): number;
  fp_step(dt: number): void;
}

export interface RayHit { t: number; point: Vec3; normal: Vec3; material: number; triangle: number; body: number }
export interface CharacterResult { position: Vec3; grounded: boolean; ceiling: boolean; wall: boolean; groundNormal: Vec3; groundMaterial: number }
export interface ProjectileHit {
  userId: number; point: Vec3; normal: Vec3; velocity: Vec3; material: number; distance: number; timeOfFlight: number; body: number; ricochet: boolean; projectileId: number;
}
export interface ContactEvent { body: number; point: Vec3; normal: Vec3; impulse: number; speed: number; otherMaterial: number }
export interface ProjectileState { id: number; userId: number; position: Vec3; velocity: Vec3 }

export const enum BodyShape { Sphere = 0, Box = 1, Capsule = 2 }

export class Character {
  constructor(private p: PhysicsWorld, readonly id: number, public radius: number, public height: number) {}
  setPosition(x: number, y: number, z: number) { this.p.ex.fp_character_set_position(this.id, x, y, z); }
  /** Collide-and-slide by a displacement (m). Position is the capsule's feet. */
  move(dx: number, dy: number, dz: number): CharacterResult {
    const flags = this.p.ex.fp_character_move(this.id, dx, dy, dz);
    const r = this.p.result(8);
    return {
      position: vec3.create(r[0], r[1], r[2]),
      grounded: (flags & 1) !== 0, ceiling: (flags & 2) !== 0, wall: (flags & 4) !== 0,
      groundNormal: vec3.create(r[3], r[4], r[5]), groundMaterial: r[6],
    };
  }
  setHeight(h: number): boolean { const ok = this.p.ex.fp_character_set_height(this.id, h) === 1; if (ok) this.height = h; return ok; }
  remove() { this.p.ex.fp_character_remove(this.id); }
}

export class Body {
  constructor(private p: PhysicsWorld, readonly id: number) {}
  setTransform(pos: ArrayLike<number>, rot: ArrayLike<number> = [0, 0, 0, 1]) { this.p.ex.fp_body_set_transform(this.id, pos[0], pos[1], pos[2], rot[0], rot[1], rot[2], rot[3]); }
  setVelocity(v: ArrayLike<number>, w: ArrayLike<number> = [0, 0, 0]) { this.p.ex.fp_body_set_velocity(this.id, v[0], v[1], v[2], w[0], w[1], w[2]); }
  applyImpulse(i: ArrayLike<number>, at: ArrayLike<number>) { this.p.ex.fp_body_apply_impulse(this.id, i[0], i[1], i[2], at[0], at[1], at[2]); }
  remove() { this.p.ex.fp_body_remove(this.id); }
  /** Latest state: [alive, px,py,pz, qx,qy,qz,qw, vx,vy,vz, wx,wy,wz, sleeping]. */
  state(): Float32Array { return this.p.bodyState(this.id); }
  get alive() { return this.state()[0] > 0.5; }
}

/** GI probe grid description shared by the main thread and the bake workers. */
export interface GIGrid {
  min: [number, number, number]; cell: number; nx: number; ny: number; nz: number; rays: number;
  sunDir: [number, number, number]; sunRGB: [number, number, number]; skySH: number[]; albedo: number[]; maxDist?: number;
}

export class PhysicsWorld {
  readonly ex: Exports;
  private stride = 15;
  readonly onProjectileHit: ((h: ProjectileHit) => void)[] = [];
  readonly onContact: ((c: ContactEvent) => void)[] = [];

  private constructor(ex: Exports) {
    this.ex = ex;
    this.stride = ex.fp_body_stride?.() ?? 15;
  }

  static async load(url: string): Promise<PhysicsWorld> {
    const bytes = await (await fetch(url)).arrayBuffer();
    return PhysicsWorld.fromBytes(bytes);
  }
  static async fromBytes(bytes: ArrayBuffer | Uint8Array): Promise<PhysicsWorld> {
    // std on wasm32-unknown-unknown imports nothing; stub any env import defensively.
    const mod = await WebAssembly.compile(bytes as BufferSource);
    const imports: Record<string, Record<string, unknown>> = {};
    for (const imp of WebAssembly.Module.imports(mod)) {
      imports[imp.module] ??= {};
      imports[imp.module][imp.name] = imp.kind === 'function' ? () => 0 : undefined;
    }
    const inst = await WebAssembly.instantiate(mod, imports as WebAssembly.Imports);
    return new PhysicsWorld(inst.exports as unknown as Exports);
  }

  private f32(ptr: number, len: number) { return new Float32Array(this.ex.memory.buffer, ptr, len); }
  /** Result scratch buffer of the last single query. */
  result(len: number): Float32Array { return this.f32(this.ex.fp_result_ptr(), len); }

  private withF32<T>(data: ArrayLike<number>, fn: (ptr: number) => T): T {
    const bytes = data.length * 4;
    const ptr = this.ex.fp_alloc(bytes);
    this.f32(ptr, data.length).set(data);
    try { return fn(ptr); } finally { this.ex.fp_free(ptr, bytes); }
  }

  setMaterial(id: number, o: { friction?: number; restitution?: number; ricochetAngleDeg?: number; ricochetEnergyKeep?: number }) {
    this.ex.fp_set_material(id, o.friction ?? 0.6, o.restitution ?? 0.2, o.ricochetAngleDeg ?? 0, o.ricochetEnergyKeep ?? 0.3);
  }

  reset() { this.ex.fp_world_reset(); }

  /** Copies of every static mesh added (world space) — shipped to GI bake workers. */
  readonly staticMeshes: { positions: Float32Array; indices: Uint32Array; material: number }[] = [];

  /** Adds world-space triangles. Returns mesh id. */
  addStaticMesh(positions: ArrayLike<number>, indices: ArrayLike<number>, material: number): number {
    this.staticMeshes.push({ positions: Float32Array.from(positions), indices: Uint32Array.from(indices), material });
    const nv = positions.length / 3, ni = indices.length;
    const pb = nv * 12, ib = ni * 4;
    const pp = this.ex.fp_alloc(pb), ip = this.ex.fp_alloc(ib);
    this.f32(pp, positions.length).set(positions);
    new Uint32Array(this.ex.memory.buffer, ip, ni).set(indices);
    const id = this.ex.fp_add_static_mesh(pp, nv, ip, ni, material);
    this.ex.fp_free(pp, pb);
    this.ex.fp_free(ip, ib);
    return id;
  }

  /** Adds a Geometry transformed by `m` (e.g. a RenderObject's transform). */
  addGeometry(g: Geometry, m: Mat4, material: number): number {
    const p = g.positions, out = new Float32Array(p.length), v = vec3.create();
    for (let i = 0; i < p.length; i += 3) { vec3.transformMat4(v, p.subarray(i, i + 3), m); out.set(v, i); }
    return this.addStaticMesh(out, g.indices, material);
  }

  build() { this.ex.fp_build(); }

  raycast(origin: ArrayLike<number>, dir: ArrayLike<number>, maxDist: number, includeBodies = true): RayHit | null {
    const hit = this.ex.fp_raycast(origin[0], origin[1], origin[2], dir[0], dir[1], dir[2], maxDist, includeBodies ? 1 : 0);
    if (!hit) return null;
    const r = this.result(10);
    return { t: r[0], point: vec3.create(r[1], r[2], r[3]), normal: vec3.create(r[4], r[5], r[6]), material: r[7], triangle: r[8], body: r[9] };
  }

  /** rays = [ox,oy,oz,dx,dy,dz]*n → t per ray (−1 = miss). Static geometry only. */
  raycastBatch(rays: Float32Array, maxDist: number): Float32Array {
    const n = rays.length / 6;
    const out = this.ex.fp_alloc(n * 4);
    const res = this.withF32(rays, (rp) => { this.ex.fp_raycast_batch(rp, n, maxDist, out); return this.f32(out, n).slice(); });
    this.ex.fp_free(out, n * 4);
    return res;
  }

  /** Bakes upper-hemisphere sky visibility for a grid of cells (x fastest). */
  bakeSkyVisibility(min: ArrayLike<number>, cell: number, nx: number, ny: number, nz: number, raysPerCell = 48, maxDist = 60): Float32Array {
    const n = nx * ny * nz;
    const out = this.ex.fp_alloc(n * 4);
    this.ex.fp_bake_sky_visibility(min[0], min[1], min[2], cell, nx, ny, nz, raysPerCell, maxDist, out);
    const res = this.f32(out, n).slice();
    this.ex.fp_free(out, n * 4);
    return res;
  }

  /**
   * Path-trace an irradiance-probe grid (baked diffuse GI) against the static world. Expensive by design:
   * ≈ probes × rays × passes × 2 ray casts. Returns nx·ny·nz·12 floats (L1 SH of irradiance/π per RGB channel).
   */
  bakeGI(o: {
    min: ArrayLike<number>; cell: number; nx: number; ny: number; nz: number; rays?: number; passes?: number;
    sunDir: ArrayLike<number>; sunRGB: ArrayLike<number>; skySH: ArrayLike<number>; albedo: ArrayLike<number>; maxDist?: number;
  }): { data: Float32Array; filled: number } {
    const n = o.nx * o.ny * o.nz;
    const outB = n * 12 * 4, shB = 27 * 4, alB = Math.max(4, o.albedo.length * 4);
    const out = this.ex.fp_alloc(outB), sh = this.ex.fp_alloc(shB), al = this.ex.fp_alloc(alB);
    this.f32(sh, 27).set(Array.from(o.skySH).slice(0, 27));
    this.f32(al, o.albedo.length).set(o.albedo);
    const filled = this.ex.fp_bake_gi(o.min[0], o.min[1], o.min[2], o.cell, o.nx, o.ny, o.nz, o.rays ?? 192, o.passes ?? 3,
      o.sunDir[0], o.sunDir[1], o.sunDir[2], o.sunRGB[0], o.sunRGB[1], o.sunRGB[2], sh, al, Math.floor(o.albedo.length / 3), o.maxDist ?? 400, out);
    const data = this.f32(out, n * 12).slice();
    this.ex.fp_free(out, outB); this.ex.fp_free(sh, shB); this.ex.fp_free(al, alB);
    return { data, filled };
  }

  /** GI probe positions for z-layers [z0, z1) of the grid (worker-side API). */
  giPositions(g: GIGrid, z0: number, z1: number, pos: Float32Array, valid: Uint8Array) {
    const n = g.nx * g.ny * g.nz;
    const pp = this.ex.fp_alloc(n * 12), vp = this.ex.fp_alloc(Math.max(4, n));
    this.ex.fp_gi_positions(g.min[0], g.min[1], g.min[2], g.cell, g.nx, g.ny, g.nz, g.rays, z0, z1, pp, vp);
    const lo = z0 * g.nx * g.ny, hi = Math.min(g.nz, z1) * g.nx * g.ny;
    pos.set(this.f32(pp + lo * 12, (hi - lo) * 3), lo * 3);
    valid.set(new Uint8Array(this.ex.memory.buffer, vp + lo, hi - lo), lo);
    this.ex.fp_free(pp, n * 12); this.ex.fp_free(vp, Math.max(4, n));
  }

  /** One GI bounce pass for z-layers [z0, z1); writes those layers of `out` (worker-side API). */
  giPass(g: GIGrid, pass: number, pos: Float32Array, valid: Uint8Array, prev: Float32Array | null, z0: number, z1: number, out: Float32Array) {
    const n = g.nx * g.ny * g.nz;
    const B = { pos: n * 12, valid: Math.max(4, n), prev: n * 48, out: n * 48, sh: 27 * 4, al: Math.max(4, g.albedo.length * 4) };
    const pp = this.ex.fp_alloc(B.pos), vp = this.ex.fp_alloc(B.valid), op = this.ex.fp_alloc(B.out), sh = this.ex.fp_alloc(B.sh), al = this.ex.fp_alloc(B.al);
    const pr = prev ? this.ex.fp_alloc(B.prev) : 0;
    this.f32(pp, n * 3).set(pos);
    new Uint8Array(this.ex.memory.buffer, vp, n).set(valid);
    if (prev) this.f32(pr, n * 12).set(prev);
    this.f32(sh, 27).set(Array.from(g.skySH).slice(0, 27));
    this.f32(al, g.albedo.length).set(g.albedo);
    this.ex.fp_gi_pass(g.min[0], g.min[1], g.min[2], g.cell, g.nx, g.ny, g.nz, g.rays, pass, g.sunDir[0], g.sunDir[1], g.sunDir[2], g.sunRGB[0], g.sunRGB[1], g.sunRGB[2],
      sh, al, Math.floor(g.albedo.length / 3), g.maxDist ?? 400, pp, vp, pr, z0, z1, op);
    const lo = z0 * g.nx * g.ny, hi = Math.min(g.nz, z1) * g.nx * g.ny;
    out.set(this.f32(op + lo * 48, (hi - lo) * 12), lo * 12);
    this.ex.fp_free(pp, B.pos); this.ex.fp_free(vp, B.valid); this.ex.fp_free(op, B.out); this.ex.fp_free(sh, B.sh); this.ex.fp_free(al, B.al);
    if (prev) this.ex.fp_free(pr, B.prev);
  }

  createCharacter(radius: number, height: number, stepHeight = 0.35, maxSlopeDeg = 50): Character {
    return new Character(this, this.ex.fp_character_create(radius, height, stepHeight, maxSlopeDeg), radius, height);
  }

  createBody(shape: BodyShape, dims: [number, number, number], mass: number, material: number): Body {
    return new Body(this, this.ex.fp_body_create(shape, dims[0], dims[1], dims[2], mass, material));
  }

  bodyState(id: number): Float32Array {
    const ptr = this.ex.fp_bodies_ptr();
    return this.f32(ptr + id * this.stride * 4, this.stride);
  }

  setGravity(x: number, y: number, z: number) { this.ex.fp_set_gravity(x, y, z); }
  setAtmosphere(tempC: number, pressureHpa: number, humidity: number, wind: ArrayLike<number>) {
    this.ex.fp_set_atmosphere(tempC, pressureHpa, humidity, wind[0], wind[1], wind[2]);
  }

  spawnProjectile(pos: ArrayLike<number>, vel: ArrayLike<number>, o: { bcG7: number; massKg: number; diameterM: number; maxTime?: number; userId?: number }): number {
    return this.ex.fp_projectile_spawn(pos[0], pos[1], pos[2], vel[0], vel[1], vel[2], o.bcG7, o.massKg, o.diameterM, o.maxTime ?? 6, o.userId ?? 0);
  }

  /** Live projectiles (positions/velocities) — tracers, crack audio. */
  projectiles(): ProjectileState[] {
    const n = this.ex.fp_projectile_count();
    if (!n) return [];
    const a = this.f32(this.ex.fp_projectiles_ptr(), n * 8);
    const out: ProjectileState[] = [];
    for (let i = 0; i < n; i++) {
      const o = i * 8;
      out.push({ id: a[o], userId: a[o + 1], position: vec3.create(a[o + 2], a[o + 3], a[o + 4]), velocity: vec3.create(a[o + 5], a[o + 6], a[o + 7]) });
    }
    return out;
  }

  /** Advance bodies & projectiles, then dispatch hit/contact events. */
  step(dt: number) {
    this.ex.fp_step(dt);
    const nh = this.ex.fp_projectile_hit_count();
    if (nh && this.onProjectileHit.length) {
      const a = this.f32(this.ex.fp_projectile_hits_ptr(), nh * 16).slice();
      for (let i = 0; i < nh; i++) {
        const o = i * 16;
        const h: ProjectileHit = {
          userId: a[o], point: vec3.create(a[o + 1], a[o + 2], a[o + 3]), normal: vec3.create(a[o + 4], a[o + 5], a[o + 6]),
          velocity: vec3.create(a[o + 7], a[o + 8], a[o + 9]), material: a[o + 10], distance: a[o + 11], timeOfFlight: a[o + 12],
          body: a[o + 13], ricochet: a[o + 14] > 0.5, projectileId: a[o + 15],
        };
        for (const cb of this.onProjectileHit) cb(h);
      }
    }
    const nc = this.ex.fp_contact_count();
    if (nc && this.onContact.length) {
      const a = this.f32(this.ex.fp_contacts_ptr(), nc * 10).slice();
      for (let i = 0; i < nc; i++) {
        const o = i * 10;
        const c: ContactEvent = { body: a[o], point: vec3.create(a[o + 1], a[o + 2], a[o + 3]), normal: vec3.create(a[o + 4], a[o + 5], a[o + 6]), impulse: a[o + 7], speed: a[o + 8], otherMaterial: a[o + 9] };
        for (const cb of this.onContact) cb(c);
      }
    }
  }
}
