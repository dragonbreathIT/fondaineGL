// Node smoke test for the fondaine-physics wasm build.
// Usage (from crates/): node fondaine-physics/tests-js/smoke.mjs [path/to/fondaine_physics.wasm]
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const wasmPath = process.argv[2] ?? resolve(here, '../../target/wasm32-unknown-unknown/release/fondaine_physics.wasm');
const bytes = readFileSync(wasmPath);
const module = await WebAssembly.compile(bytes);

const imports = WebAssembly.Module.imports(module);
const exportsList = WebAssembly.Module.exports(module).map((e) => e.name);
console.log(`wasm: ${wasmPath} (${bytes.length} bytes)`);
console.log(`imports: ${imports.length ? imports.map((i) => `${i.module}.${i.name}`).join(', ') : '(none)'}`);

// Provide stubs for anything std might import (expected: nothing on wasm32-unknown-unknown).
const importObject = {};
for (const imp of imports) {
  importObject[imp.module] ??= {};
  importObject[imp.module][imp.name] = imp.kind === 'function' ? () => 0 : undefined;
}
const { exports: fp } = await WebAssembly.instantiate(module, importObject);

const REQUIRED = [
  'memory', 'fp_alloc', 'fp_free', 'fp_result_ptr', 'fp_set_material', 'fp_world_reset', 'fp_add_static_mesh',
  'fp_build', 'fp_raycast', 'fp_raycast_batch', 'fp_bake_sky_visibility', 'fp_character_create',
  'fp_character_set_position', 'fp_character_move', 'fp_character_set_height', 'fp_character_remove',
  'fp_body_create', 'fp_body_set_transform', 'fp_body_set_velocity', 'fp_body_apply_impulse', 'fp_body_remove',
  'fp_bodies_ptr', 'fp_body_stride', 'fp_body_count', 'fp_set_gravity', 'fp_contact_count', 'fp_contacts_ptr',
  'fp_set_atmosphere', 'fp_get_atmosphere', 'fp_projectile_spawn', 'fp_projectile_hit_count',
  'fp_projectile_hits_ptr', 'fp_projectile_count', 'fp_projectiles_ptr', 'fp_step',
];
const missing = REQUIRED.filter((n) => !exportsList.includes(n));
if (missing.length) {
  console.error('MISSING EXPORTS:', missing);
  process.exit(1);
}
console.log(`exports: all ${REQUIRED.length} required present (${exportsList.length} total)`);

let failures = 0;
const check = (cond, msg) => {
  console.log(`${cond ? 'ok  ' : 'FAIL'} ${msg}`);
  if (!cond) failures++;
};
// Memory can grow on any call that allocates: always build views fresh.
const f32 = (ptr, n) => new Float32Array(fp.memory.buffer, ptr, n);
const u32 = (ptr, n) => new Uint32Array(fp.memory.buffer, ptr, n);
const result = (n) => Array.from(f32(fp.fp_result_ptr(), n));

// --- static floor (40 x 40 m quad at y = 0) + a wall at z = 50 ---
fp.fp_world_reset();
fp.fp_set_material(1, 0.6, 0.2, 15, 0.5); // concrete-ish, ricochets below 15 deg
function addMesh(pos, idx, mat) {
  const pBytes = pos.length * 4, iBytes = idx.length * 4;
  const pp = fp.fp_alloc(pBytes), ip = fp.fp_alloc(iBytes);
  f32(pp, pos.length).set(pos);
  u32(ip, idx.length).set(idx);
  const id = fp.fp_add_static_mesh(pp, pos.length / 3, ip, idx.length, mat);
  fp.fp_free(pp, pBytes);
  fp.fp_free(ip, iBytes);
  return id;
}
const floorId = addMesh([-20, 0, -20, 20, 0, -20, 20, 0, 60, -20, 0, 60], [0, 3, 2, 0, 2, 1], 1);
const wallId = addMesh([-20, -1, 50, 20, -1, 50, 20, 10, 50, -20, 10, 50], [0, 1, 2, 0, 2, 3], 2);
fp.fp_build();
check(floorId === 0 && wallId === 1, `mesh ids ${floorId}, ${wallId}`);

// --- raycast ---
const hit = fp.fp_raycast(1, 5, 1, 0, -2, 0, 100, 0);
const r = result(10);
console.log('     raycast result:', r.map((v) => +v.toFixed(4)));
check(hit === 1 && Math.abs(r[0] - 5) < 1e-4 && r[5] > 0.999 && r[7] === 1 && r[9] === -1, 'raycast down hits floor at t=5, normal +Y, material 1');
check(fp.fp_raycast(1, 5, 1, 0, 1, 0, 100, 0) === 0, 'raycast up misses');

// --- batch raycast ---
const n = 3, rp = fp.fp_alloc(n * 24), op = fp.fp_alloc(n * 4);
f32(rp, n * 6).set([0, 2, 0, 0, -1, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1]);
fp.fp_raycast_batch(rp, n, 100, op);
const bt = Array.from(f32(op, n));
check(Math.abs(bt[0] - 2) < 1e-4 && bt[1] === -1 && Math.abs(bt[2] - 50) < 1e-3, `batch t = ${bt.map((v) => v.toFixed(3))}`);
fp.fp_free(rp, n * 24); fp.fp_free(op, n * 4);

// --- sky bake (2x1x1 cells) ---
const bp = fp.fp_alloc(8);
fp.fp_bake_sky_visibility(-1, 0.5, -1, 1, 2, 1, 1, 32, 50, bp);
const sky = Array.from(f32(bp, 2));
check(sky.every((v) => v > 0.95), `sky visibility in the open = ${sky.map((v) => v.toFixed(3))}`);
fp.fp_free(bp, 8);

// --- character ---
const ch = fp.fp_character_create(0.3, 1.8, 0.35, 50);
fp.fp_character_set_position(ch, 0, 1, 0);
let flags = 0, vy = 0;
for (let i = 0; i < 60; i++) {
  vy -= 9.81 / 60;
  flags = fp.fp_character_move(ch, 0, vy / 60, 0);
  if (flags & 1) vy = 0;
}
const cr = result(8);
check((flags & 1) === 1 && Math.abs(cr[1]) < 0.01, `character grounded at y=${cr[1].toFixed(4)} flags=${flags}`);

// --- rigid body ---
const body = fp.fp_body_create(0, 0.1, 0, 0, 1, 1);
fp.fp_body_set_transform(body, 0, 1, 0, 0, 0, 0, 1);
let contacts = 0;
for (let i = 0; i < 120; i++) { fp.fp_step(1 / 60); contacts += fp.fp_contact_count(); }
const stride = fp.fp_body_stride();
const bb = f32(fp.fp_bodies_ptr(), stride * fp.fp_body_count());
check(bb[body * stride] === 1 && Math.abs(bb[body * stride + 2] - 0.1) < 0.01, `sphere rests at y=${bb[body * stride + 2].toFixed(4)} (stride ${stride}, contacts seen ${contacts})`);

// --- projectile at the wall ---
fp.fp_set_atmosphere(15, 1013.25, 0.5, 0, 0, 0);
fp.fp_get_atmosphere();
const atm = result(2);
console.log(`     air density ${atm[0].toFixed(4)} kg/m^3, speed of sound ${atm[1].toFixed(2)} m/s`);
const pid = fp.fp_projectile_spawn(0, 1.5, 0, 0, 0, 840, 0.186, 0.00499, 0.0057, 3, 77);
let hits = null;
for (let i = 0; i < 30 && !hits; i++) {
  fp.fp_step(1 / 60);
  const live = fp.fp_projectile_count();
  if (live) {
    const l = f32(fp.fp_projectiles_ptr(), 8 * live);
    if (i === 0) console.log(`     live projectile after 1 frame: id ${l[0]} user ${l[1]} pos (${l[2].toFixed(2)}, ${l[3].toFixed(3)}, ${l[4].toFixed(2)}) v ${Math.hypot(l[5], l[6], l[7]).toFixed(1)} m/s`);
  }
  const hc = fp.fp_projectile_hit_count();
  if (hc) hits = Array.from(f32(fp.fp_projectile_hits_ptr(), 16 * hc));
}
console.log('     hit record:', hits && hits.map((v) => +v.toFixed(4)));
check(hits && hits[0] === 77 && Math.abs(hits[3] - 50) < 1e-3 && hits[6] < -0.999 && hits[10] === 2 && hits[15] === pid,
  'projectile hit wall at z=50 with normal -Z, material 2');
check(fp.fp_projectile_count() === 0, 'projectile removed after hit');

// --- bad inputs never trap ---
fp.fp_body_set_transform(9999, 0, 0, 0, 0, 0, 0, 1);
fp.fp_character_move(9999, 1, 0, 0);
fp.fp_body_remove(9999);
fp.fp_step(NaN);
fp.fp_set_material(1000, 1, 1, 1, 1);
check(true, 'invalid ids / NaN inputs did not trap');

// --- larger world timing ---
{
  const N = 300; // 300x300 quads = 180k tris
  const pos = new Float32Array((N + 1) * (N + 1) * 3);
  const idx = new Uint32Array(N * N * 6);
  let k = 0;
  for (let j = 0; j <= N; j++) for (let i = 0; i <= N; i++) { pos[k++] = i - N / 2; pos[k++] = Math.sin(i * 0.1) * Math.cos(j * 0.1); pos[k++] = j - N / 2; }
  k = 0;
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { const a = j * (N + 1) + i, b = a + 1, c = a + N + 1, d = c + 1; idx.set([a, c, b, b, c, d], k); k += 6; }
  fp.fp_world_reset();
  const t0 = performance.now();
  addMesh(pos, idx, 0);
  // + 4000 "buildings" (12 tris each) with deterministic placement
  const bpos = [], bidx = [];
  let seed = 1;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let b = 0; b < 4000; b++) {
    const x = rnd() * 280 - 140, z = rnd() * 280 - 140, s = 1 + rnd() * 6, h = 2 + rnd() * 15, base = bpos.length / 3;
    for (const [cx, cy, cz] of [[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]]) bpos.push(x + cx * s, -2 + cy * (h + 2), z + cz * s);
    for (const t of [0,3,2,0,2,1, 4,5,6,4,6,7, 0,4,7,0,7,3, 1,2,6,1,6,5, 0,1,5,0,5,4, 3,7,6,3,6,2]) bidx.push(base + t);
  }
  addMesh(bpos, bidx, 0);
  fp.fp_build();
  const t1 = performance.now();
  const cells = 100 * 10 * 100, out = fp.fp_alloc(cells * 4);
  fp.fp_bake_sky_visibility(-100, -1, -100, 2, 100, 10, 100, 32, 64, out);
  const t2 = performance.now();
  const vis = f32(out, cells);
  let mean = 0; for (const v of vis) mean += v; mean /= cells;
  console.log(`     228k-tri terrain + 4000 boxes: add+build ${(t1 - t0).toFixed(0)} ms, bake ${cells} cells x 32 rays ${(t2 - t1).toFixed(0)} ms, mean vis ${mean.toFixed(3)}`);
  fp.fp_free(out, cells * 4);
}

console.log(failures ? `\n${failures} FAILURE(S)` : '\nALL SMOKE CHECKS PASSED');
process.exit(failures ? 1 : 0);
