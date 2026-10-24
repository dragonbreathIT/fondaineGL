// Node test: every closed builder must have outward winding (positive signed volume) and normals that
// agree with face winding.  Run: node tools/run-ts.mjs packages/fondaineGL/test/geometry.test.ts
import { box, capsule, cylinder, extrude, lathe, roundedBox, sphere, torus, circle2, roundRect2, Geometry, triangulate } from '../src/geometry';

function signedVolume(g: Geometry): number {
  const p = g.positions, ix = g.indices;
  let v = 0;
  for (let t = 0; t < ix.length; t += 3) {
    const a = ix[t] * 3, b = ix[t + 1] * 3, c = ix[t + 2] * 3;
    v += p[a] * (p[b + 1] * p[c + 2] - p[b + 2] * p[c + 1]) - p[a + 1] * (p[b] * p[c + 2] - p[b + 2] * p[c]) + p[a + 2] * (p[b] * p[c + 1] - p[b + 1] * p[c]);
  }
  return v / 6;
}

function normalAgreement(g: Geometry): number {
  const p = g.positions, n = g.normals, ix = g.indices;
  let agree = 0, total = 0;
  for (let t = 0; t < ix.length; t += 3) {
    const a = ix[t] * 3, b = ix[t + 1] * 3, c = ix[t + 2] * 3;
    const e1 = [p[b] - p[a], p[b + 1] - p[a + 1], p[b + 2] - p[a + 2]];
    const e2 = [p[c] - p[a], p[c + 1] - p[a + 1], p[c + 2] - p[a + 2]];
    const fn = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
    if (Math.hypot(fn[0], fn[1], fn[2]) < 1e-12) continue;
    const vn = [n[a] + n[b] + n[c], n[a + 1] + n[b + 1] + n[c + 1], n[a + 2] + n[b + 2] + n[c + 2]];
    total++;
    if (fn[0] * vn[0] + fn[1] * vn[1] + fn[2] * vn[2] > 0) agree++;
  }
  return agree / Math.max(1, total);
}

const cases: [string, Geometry, number][] = [
  ['box', box(1, 2, 3, 2), 6],
  ['roundedBox', roundedBox(0.1, 0.05, 0.3, 0.01, 3), 0.1 * 0.05 * 0.3],
  ['cylinder', cylinder(0.5, 0.5, 2, 48), Math.PI * 0.25 * 2],
  ['cone', cylinder(0.0, 0.5, 1, 48), Math.PI * 0.25 / 3],
  ['lathe', lathe([[0, 0], [0.3, 0], [0.3, 1], [0.2, 1.2], [0, 1.2]], 48), 0],
  ['sphere', sphere(1, 48, 32), (4 / 3) * Math.PI],
  ['capsule', capsule(0.1, 0.6, 24, 8), 0],
  ['torus', torus(1, 0.2, 24, 48), 2 * Math.PI * Math.PI * 1 * 0.04],
  ['extrude', extrude([[0, 0], [1, 0], [1, 1], [0, 1]], 0.5), 0.5],
  ['extrudeBevel', extrude(roundRect2(-0.5, -0.5, 0.5, 0.5, 0.1), 0.2, { bevel: 0.02, bevelSegments: 3 }), 0],
  ['extrudeHole', extrude(roundRect2(-1, -1, 1, 1, 0.2), 0.2, { holes: [circle2(0, 0, 0.4, 32)] }), 0],
];

let fail = 0;
for (const [name, g, expect] of cases) {
  const v = signedVolume(g);
  const agree = normalAgreement(g);
  const okVol = v > 0 && (expect === 0 || Math.abs(v - expect) / expect < 0.05);
  const okN = agree > 0.97;
  if (!okVol || !okN) fail++;
  console.log(`${okVol && okN ? 'ok  ' : 'FAIL'} ${name.padEnd(14)} volume ${v.toFixed(5)}${expect ? ` (expect ${expect.toFixed(5)})` : ''}  normal/winding agreement ${(agree * 100).toFixed(1)}%`);
}
const tri = triangulate([[0, 0], [2, 0], [2, 2], [1, 1], [0, 2]]);
console.log(tri.length === 9 ? 'ok   triangulate concave' : 'FAIL triangulate concave');
if (fail) { throw new Error(`${fail} geometry checks failed`); }
