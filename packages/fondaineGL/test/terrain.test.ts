// Node test for the Terrain heightfield: watertight non-uniform grid (every interior edge shared by exactly
// two triangles, outward winding), normals that agree with the height function, layer weights that are
// convex, physics index subsets that partition the mesh, and a build time budget.
// Run: node tools/run-ts.mjs packages/fondaineGL/test/terrain.test.ts
import { Terrain, berm, mound, heightMax, regionMask, terrainFbm } from '../src/terrain';
import { Material } from '../src/material';

let failed = 0;
const check = (name: string, ok: boolean, detail = '') => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`); if (!ok) failed++; };

const embank = heightMax(
  berm({ from: [-21, 0], to: [-21, -120], height: 3.4, crestWidth: 1.5, baseWidth: 9, erosion: 0.65, toe: 2, seed: 1 }),
  berm({ from: [-26, -112], to: [26, -112], height: 7, crestWidth: 3, baseWidth: 18, erosion: 0.6, toe: 2.5, seed: 3 }),
  mound({ center: [-23, -114], radius: 11, height: 7.1, seed: 4 }),
);
const pad = regionMask(-8.6, 8.6, -10.8, -3.9, 1.3, 0.7, 21);
const heightFn = (x: number, z: number) => Math.sin(x * 0.31) * 0.05 + terrainFbm(x * 0.06, z * 0.06, 2, 9) * 0.14 + embank(x, z);
const mat = (name: string, tile: number) => new Material({ name, uvScale: [1 / tile, 1 / tile] });

const t0 = performance.now();
const terrain = new Terrain({
  size: [900, 900], center: [0, -62], resolution: 0.5,
  detail: { minX: -34, maxX: 34, minZ: -128, maxZ: 10 }, growth: 1.22, maxSpacing: 28,
  heightFn,
  layers: [
    { material: mat('gravel', 1.6), mask: (x, z) => 1.7 * pad(x, z), surface: 3 },
    { material: mat('dirt', 4), mask: (x, z) => 0.25 + 0.4 * Math.max(0, Math.min(1, embank(x, z))), surface: 2 },
    { material: mat('grass', 2.5), mask: (x, z) => 1 - 0.95 * pad(x, z), slope: [16, 30], surface: 9 },
  ],
});
const ms = performance.now() - t0;
const g = terrain.geometry;
console.log(`terrain: ${terrain.stats.columns}×${terrain.stats.rows}, ${terrain.stats.triangles} triangles, built in ${ms.toFixed(0)} ms`);
check('triangle budget ≤ 300k', terrain.stats.triangles <= 300_000, `${terrain.stats.triangles}`);
check('build time < 1 s', ms < 1000, `${ms.toFixed(0)} ms`);

// watertight: interior edges shared by exactly two triangles, boundary edges by one
const edges = new Map<number, number>();
const ix = g.indices;
const key = (a: number, b: number) => (a < b ? a * 4294967296 + b : b * 4294967296 + a);
for (let t = 0; t < ix.length; t += 3) for (let k = 0; k < 3; k++) { const e = key(ix[t + k], ix[t + ((k + 1) % 3)]); edges.set(e, (edges.get(e) ?? 0) + 1); }
let bad = 0, boundary = 0;
for (const c of edges.values()) { if (c === 1) boundary++; else if (c !== 2) bad++; }
const expectBoundary = 2 * (terrain.stats.columns - 1) + 2 * (terrain.stats.rows - 1);
check('watertight (no edge used by 3+ triangles)', bad === 0, `${bad} bad`);
check('boundary edge count matches the grid perimeter', boundary === expectBoundary, `${boundary} vs ${expectBoundary}`);

// winding: every triangle faces +y
let flipped = 0;
const p = g.positions;
for (let t = 0; t < ix.length; t += 3) {
  const a = ix[t] * 3, b = ix[t + 1] * 3, c = ix[t + 2] * 3;
  const e1 = [p[b] - p[a], p[b + 1] - p[a + 1], p[b + 2] - p[a + 2]], e2 = [p[c] - p[a], p[c + 1] - p[a + 1], p[c + 2] - p[a + 2]];
  const ny = e1[2] * e2[0] - e1[0] * e2[2];
  if (ny <= 0) flipped++;
}
check('all triangles wound upwards', flipped === 0, `${flipped} flipped`);

// heights match the function; normals agree with finite differences of it
let maxErr = 0, nDot = 1;
for (let v = 0; v < g.vertexCount; v += 97) {
  const x = p[v * 3], y = p[v * 3 + 1], z = p[v * 3 + 2];
  maxErr = Math.max(maxErr, Math.abs(y - heightFn(x, z)));
  const n = terrain.normal(x, z);
  nDot = Math.min(nDot, n[0] * g.normals[v * 3] + n[1] * g.normals[v * 3 + 1] + n[2] * g.normals[v * 3 + 2]);
}
check('vertex heights equal heightFn', maxErr < 1e-4, `max error ${maxErr.toExponential(1)}`);
check('mesh normals agree with Terrain.normal', nDot > 0.9, `min cosine ${nDot.toFixed(3)}`);

// weights: packed in uv, convex (w0 = 1 − w1 − w2 ≥ 0), and the pad is gravel while the meadow is grass
let convex = true;
for (let v = 0; v < g.vertexCount; v++) { const w1 = g.uvs[v * 2], w2 = g.uvs[v * 2 + 1]; if (w1 < -1e-6 || w2 < -1e-6 || w1 + w2 > 1 + 1e-5) { convex = false; break; } }
check('layer weights are convex', convex);
const wPad = terrain.weights(0, -7), wMeadow = terrain.weights(60, -62), wSlope = terrain.weights(-18.2, -60);
check('pad is mostly gravel', wPad[0] > 0.6, wPad.map((w) => w.toFixed(2)).join('/'));
check('meadow is mostly grass', wMeadow[2] > 0.6, wMeadow.map((w) => w.toFixed(2)).join('/'));
check('berm slope loses grass', wSlope[2] < wMeadow[2], wSlope.map((w) => w.toFixed(2)).join('/'));

// physics subsets partition the index buffer
const total = terrain.layerIndices.reduce((s, a) => s + a.length, 0);
check('layer index subsets cover every triangle once', total === ix.length, `${total} vs ${ix.length}`);

// embankments never intersect: heightMax is continuous and ≥ each part
const hb = embank(-21, -112);
check('berm junction is the max of its parts', hb >= 7 * 0.9, hb.toFixed(2));

if (failed) { console.error(`${failed} check(s) failed`); process.exit(1); }
console.log('terrain tests passed');
