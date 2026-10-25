// Node test for the scanned-weapon path (no GPU, no downloads): the procedural pistol and carbine are exported as
// multi-node glTF (once with named parts, once as anonymous "Object_N" nodes in a rotated, centimetre frame like a
// typical Sketchfab export), loaded back through the glTF loader, and `weaponFromGLTF` must produce a working
// FirearmModel: oriented and scaled, sockets inside the bounds, parts flagged (by name or by geometry), grips
// derived from the geometry and fitted with no phalanx sinking more than 1 mm into the metal.
//   node tools/run-ts.mjs packages/oaxis/test/weapons-gltf.test.ts [--write <dir>]   (--write saves the .glb files)
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { mockRenderer } from './mock-renderer';
import { buildCompactPistol, buildCarbine, exportGLB, parseGLTF, instantiateGLTF, weaponFromGLTF, fitWeaponGrips, debugHandClearance, deriveWeaponGrips } from '@fondaine/oaxis';
import type { WeaponKind, WeaponBuild, GLTFWeapon } from '@fondaine/oaxis';
import type { HandPose } from '@fondaine/oaxis';
import { mat4, quat, vec3 } from '@fondaine/gl';
import type { FirearmModel } from '@fondaine/gl';

const renderer = mockRenderer();
let fail = 0;
const check = (ok: boolean, msg: string) => { if (!ok) fail++; console.log(`${ok ? 'ok  ' : 'FAIL'} ${msg}`); };
const f3 = (v: ArrayLike<number>) => `[${Array.from(v).map((x) => (x as number).toFixed(3)).join(', ')}]`;
const writeDir = process.argv.includes('--write') ? process.argv[process.argv.indexOf('--write') + 1] : null;
if (writeDir) mkdirSync(writeDir, { recursive: true });

const partName = (p: FirearmModel['parts'][number], i: number) => `${p.bolt ? 'slide' : p.magazine ? 'magazine' : p.trigger ? 'trigger' : p.charge ? 'charging_handle' : p.selector ? 'selector' : 'part'}_${i}`;

function exportVariant(b: WeaponBuild, named: boolean, M: Float32Array | null): ArrayBuffer {
  const nodes = b.model.parts.map((p, i) => {
    if (M) mat4.copy(p.object.transform, M as unknown as typeof p.object.transform); else mat4.identity(p.object.transform);
    return { name: named ? partName(p, i) : `Object_${i}`, object: p.object };
  });
  const glb = exportGLB(nodes, { generator: 'fondaine weapons test' });
  for (const p of b.model.parts) mat4.identity(p.object.transform);
  return glb;
}

function modelBounds(m: FirearmModel) {
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  const t = vec3.create();
  for (const p of m.parts) {
    const s = p.object.mesh.source!;
    for (let i = 0; i < s.positions.length; i += 3) { vec3.transformMat4(t, [s.positions[i], s.positions[i + 1], s.positions[i + 2]], p.local); for (let k = 0; k < 3; k++) { min[k] = Math.min(min[k], t[k]); max[k] = Math.max(max[k], t[k]); } }
  }
  return { min, max };
}

/** Worst phalanx clearance (mm) of a fitted pose against the model; palm reported separately. */
function worstClearance(pose: HandPose, model: FirearmModel, side: 1 | -1) {
  const c = debugHandClearance(pose, model, side)!;
  let digits = Infinity;
  for (const [k, v] of Object.entries(c)) if (/^(f\d\d|t\d)$/.test(k)) digits = Math.min(digits, ...v);
  return { digits, palm: Math.min(...c.palm) };
}

async function roundTrip(glb: ArrayBuffer, kind: WeaponKind): Promise<GLTFWeapon> {
  const asset = await parseGLTF(glb.slice(0), '', { decodeImages: false });
  const inst = instantiateGLTF(renderer, asset, { keepSource: true });
  return weaponFromGLTF(renderer, inst, { kind, autoOrient: true });
}

function checkModel(tag: string, w: GLTFWeapon, ref: WeaponBuild, expectFlags: (keyof FirearmModel['parts'][number])[]) {
  const m = w.model, rm = ref.model;
  console.log(`--- ${tag}: ${m.parts.length} parts; warnings:\n    ${w.warnings.join('\n    ')}`);
  const b = modelBounds(m), rb = modelBounds(rm);
  const L = b.max[2] - b.min[2], rL = rb.max[2] - rb.min[2];
  check(Math.abs(L - rL) / rL < 0.03, `${tag} overall length ${L.toFixed(3)} m (procedural ${rL.toFixed(3)})`);
  check(Math.abs(b.min[1] - rb.min[1]) < 0.01 && Math.abs(b.max[1] - rb.max[1]) < 0.01, `${tag} vertical extent ${b.min[1].toFixed(3)}..${b.max[1].toFixed(3)} (procedural ${rb.min[1].toFixed(3)}..${rb.max[1].toFixed(3)})`);
  const inside = (p: ArrayLike<number>) => [0, 1, 2].every((k) => p[k] > b.min[k] - 0.02 && p[k] < b.max[k] + 0.02);
  for (const k of ['muzzle', 'ejectionPort', 'rearSight', 'frontSight'] as const) check(inside(m[k]), `${tag} ${k} ${f3(m[k])} inside bounds`);
  check(Math.abs(m.muzzle[2] - b.min[2]) < 0.006, `${tag} muzzle at the front (${m.muzzle[2].toFixed(3)} vs min z ${b.min[2].toFixed(3)})`);
  check(vec3.distance(m.muzzle, rm.muzzle) < 0.016, `${tag} muzzle within 16 mm of the procedural one (${(vec3.distance(m.muzzle, rm.muzzle) * 1000).toFixed(1)} mm)`);
  check(Math.abs(m.rearSight[1] - rm.rearSight[1]) < 0.015 && m.rearSight[2] > m.frontSight[2] + 0.5 * L, `${tag} sights: rear ${f3(m.rearSight)} front ${f3(m.frontSight)} (procedural rear y ${rm.rearSight[1].toFixed(3)})`);
  check(m.ejectionPort[0] > 0 && m.ejectionPort[2] < (rm.ejectionPort[2] + 0.03) && m.ejectionPort[2] > rm.ejectionPort[2] - 0.03, `${tag} ejection port on the right near the chamber ${f3(m.ejectionPort)} (procedural ${f3(rm.ejectionPort)})`);
  for (const k of expectFlags) check(m.parts.some((p) => p[k]), `${tag} part flagged "${k}"`);
  check(!!m.magAxis && m.magAxis[1] < -0.7, `${tag} magAxis ${m.magAxis ? f3(m.magAxis) : 'none'} (procedural ${rm.magAxis ? f3(rm.magAxis) : 'none'})`);
  // grips: derived, then fitted
  check(!!w.grips, `${tag} grips derived`);
  if (w.grips && ref.grips) {
    for (const k of ['right', 'left', 'leftOnMagazine'] as const) {
      const d = vec3.distance(w.grips[k]!.position, ref.grips[k]!.position);
      check(d < 0.035, `${tag} ${k} wrist ${f3(w.grips[k]!.position)} within 35 mm of the authored pose ${f3(ref.grips[k]!.position)} (${(d * 1000).toFixed(0)} mm)`);
    }
    const fit = fitWeaponGrips(w.grips, m);
    for (const [k, side] of [['right', 1], ['left', -1], ['leftOnMagazine', -1]] as const) {
      const r = fit.reports[k];
      const c = worstClearance(fit.grips[k]!, m, side);
      check(c.digits >= -1.0, `${tag} ${k} fitted: worst phalanx clearance ${c.digits.toFixed(1)} mm, palm ${c.palm.toFixed(1)} mm, ${r.changed} digits moved${r.palmPush ? `, hand pushed ${(r.palmPush * 1000).toFixed(1)} mm` : ''}`);
    }
  }
}

const builds: [string, WeaponBuild, WeaponKind][] = [['pistol', buildCompactPistol(renderer), 'pistol'], ['carbine', buildCarbine(renderer), 'carbine']];
// a Sketchfab-ish frame: muzzle towards +x, up +z, centimetres
const raw = mat4.fromRotationTranslationScale(mat4.create(), quat.fromEuler(quat.create(), -Math.PI / 2, Math.PI / 2, 0), [12, 3, -5], [100, 100, 100]);
for (const [name, b, kind] of builds) {
  // sanity: the derivation also works on the procedural model itself
  const d = deriveWeaponGrips(b.model, kind);
  check(!!d, `${name} deriveWeaponGrips on the procedural model (grip rake ${d ? ((d.analysis.grip!.rake * 180) / Math.PI).toFixed(1) : '?'}°)`);
  if (d && b.grips) for (const k of ['right', 'left', 'leftOnMagazine'] as const) console.log(`     derived ${k.padEnd(15)} ${f3(d.grips[k]!.position)}  authored ${f3(b.grips[k]!.position)}  Δ ${(vec3.distance(d.grips[k]!.position, b.grips[k]!.position) * 1000).toFixed(0)} mm`);
  if (d) console.log(`     analysis grip ${JSON.stringify(d.analysis.grip, (_k, v) => (typeof v === 'number' ? +v.toFixed(3) : v))} mag ${JSON.stringify(d.analysis.mag, (_k, v) => (typeof v === 'number' ? +v.toFixed(3) : v))} trigger ${f3(d.analysis.trigger)} handguard ${JSON.stringify(d.analysis.handguard, (_k, v) => (typeof v === 'number' ? +v.toFixed(3) : v))}`);
  const named = exportVariant(b, true, null);
  const anon = exportVariant(b, false, raw as Float32Array);
  if (writeDir) { writeFileSync(join(writeDir, `${name}.glb`), Buffer.from(named)); writeFileSync(join(writeDir, `${name}-raw.glb`), Buffer.from(anon)); }
  const wn = await roundTrip(named, kind);
  checkModel(`${name}/named`, wn, b, kind === 'pistol' ? ['bolt', 'magazine', 'trigger'] : ['charge', 'magazine', 'trigger', 'bolt']);
  const wa = await roundTrip(anon, kind);
  checkModel(`${name}/anonymous+rotated+cm`, wa, b, kind === 'pistol' ? ['bolt', 'magazine', 'trigger'] : ['charge', 'magazine', 'trigger']);
  // the raw variant must come out in the same place as the named one (orientation + scale + centring recovered)
  check(vec3.distance(wa.model.muzzle, wn.model.muzzle) < 0.008 && vec3.distance(wa.model.rearSight, wn.model.rearSight) < 0.012, `${name} auto-orient reproduces the named frame (muzzle Δ ${(vec3.distance(wa.model.muzzle, wn.model.muzzle) * 1000).toFixed(1)} mm, rear sight Δ ${(vec3.distance(wa.model.rearSight, wn.model.rearSight) * 1000).toFixed(1)} mm)`);
  // kind inference from proportions
  const asset = await parseGLTF(anon.slice(0), '', { decodeImages: false });
  const wk = weaponFromGLTF(renderer, instantiateGLTF(renderer, asset, { keepSource: true }), { autoOrient: true });
  check(wk.kind === kind, `${name} kind inferred from proportions: ${wk.kind}`);
}
if (writeDir) console.log(`wrote glb files to ${writeDir}`);
if (fail) throw new Error(`${fail} scanned-weapon checks failed`);
console.log('all scanned-weapon checks passed');
