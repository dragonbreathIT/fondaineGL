// Node test of the offline engine path (same WASM as the worklet).
//   node tools/run-ts.mjs packages/vorp/test/offline.test.ts
// Checks the loudness contract of the shooter's own shot (see docs/vorp-reference/README.md):
//   peak ≥ −0.5 dBFS, first 50 ms RMS ≥ −8 dBFS, every burst onset within 1.5 dB of the first,
//   mechanical handling peaks ≥ 10 dB under full scale, and the hearing model reacting (TTS, tinnitus after a burst).
import { readFileSync } from 'node:fs';
import { VorpOffline, GUNSHOTS, ZONES, METER } from '../src/index';

const bytes = readFileSync('wasm/vorp_dsp.wasm');
const wasm = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
const EYES = [0, 1.65, 0], MUZZLE = [0.05, 1.57, -0.75], PORT = [0.06, 1.6, -0.22];
const db = (x: number) => 20 * Math.log10(Math.max(x, 1e-9));
const peakOf = (l: Float32Array, r: Float32Array, a: number, b: number) => { let p = 0; for (let i = a; i < b; i++) p = Math.max(p, Math.abs(l[i]), Math.abs(r[i])); return p; };
const rmsOf = (l: Float32Array, r: Float32Array, a: number, b: number) => { let s = 0; for (let i = a; i < b; i++) s += 0.5 * (l[i] * l[i] + r[i] * r[i]); return Math.sqrt(s / Math.max(1, b - a)); };
let failures = 0;
const check = (ok: boolean, msg: string) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${msg}`); if (!ok) failures++; };

for (const sr of [44100, 48000]) {
  const ms = (x: number) => Math.round((x * sr) / 1000);
  // --- 10-round burst, unprotected, under the roof
  const off = await VorpOffline.create(wasm, sr);
  off.random = () => 0.42;
  off.setZone(ZONES.coveredRange);
  off.setListener(EYES, [0, 0, -1], [0, 1, 0]);
  const N = 10, INTERVAL = 75;
  for (let i = 0; i < N; i++) off.gunshot(GUNSHOTS.rifle556_16in, MUZZLE, [0, 0, -1], PORT, { seed: i }, { delayMs: 50 + i * INTERVAL });
  const { left, right } = off.render(3.0);
  const m = off.meters();
  const pk = peakOf(left, right, 0, left.length);
  let onset = 0; while (onset < left.length && Math.abs(left[onset]) < pk * 0.25 && Math.abs(right[onset]) < pk * 0.25) onset++;
  const first50 = db(rmsOf(left, right, onset, onset + ms(50)));
  const onsets = Array.from({ length: N }, (_, k) => db(peakOf(left, right, onset + ms(k * INTERVAL) - ms(3), onset + ms((k + 1) * INTERVAL) - ms(3))));
  const spread = Math.max(...onsets.map((o) => Math.abs(o - onsets[0])));
  console.log(`${sr} Hz burst: peak ${db(pk).toFixed(1)} dBFS, first 50 ms ${first50.toFixed(1)} dBFS, onset spread ${spread.toFixed(2)} dB, max eardrum ${m[METER.MAX_EAR_SPL].toFixed(1)} dB SPL, TTS ${m[METER.TTS].toFixed(1)} dB, tinnitus ${m[METER.TINNITUS].toFixed(2)}`);
  check(db(pk) >= -0.5, `shot peak at full scale (${db(pk).toFixed(2)} dBFS)`);
  check(first50 >= -8, `first 50 ms RMS ≥ −8 dBFS (${first50.toFixed(1)})`);
  check(spread <= 1.5, `burst onsets within 1.5 dB (${spread.toFixed(2)})`);
  check(m[METER.TTS] > 6, `burst causes a clear threshold shift (${m[METER.TTS].toFixed(1)} dB)`);
  check(m[METER.TINNITUS] > 0.8, `burst rings (tinnitus ${m[METER.TINNITUS].toFixed(2)})`);

  // --- mechanical handling stays far under the shot
  const off2 = await VorpOffline.create(wasm, sr);
  off2.random = () => 0.42;
  off2.setZone(ZONES.coveredRange);
  off2.setListener(EYES, [0, 0, -1], [0, 1, 0]);
  off2.mech('slideHome', PORT, { delayMs: 20 });
  off2.mech('magDropConcrete', [0.35, 0, -0.5], { delayMs: 400 });
  off2.breath([0, 1.55, -0.08], { delayMs: 800 });
  const r2 = off2.render(1.6);
  const mechPeak = db(peakOf(r2.left, r2.right, 0, r2.left.length));
  const breathRms = db(rmsOf(r2.left, r2.right, ms(900), ms(1300)));
  console.log(`${sr} Hz handling: loudest peak ${mechPeak.toFixed(1)} dBFS, breath ${breathRms.toFixed(1)} dBFS`);
  check(mechPeak <= -10 && mechPeak >= -40, `handling peaks 10–40 dB under full scale (${mechPeak.toFixed(1)})`);
  check(breathRms < -40 && breathRms > -80, `breath is quiet but present (${breathRms.toFixed(1)} dBFS)`);

  // --- passive muffs: far less exposure than open ears
  const off3 = await VorpOffline.create(wasm, sr);
  off3.random = () => 0.42;
  off3.setZone(ZONES.coveredRange);
  off3.setListener(EYES, [0, 0, -1], [0, 1, 0]);
  off3.setHearing({ protection: 1 });
  off3.gunshot(GUNSHOTS.rifle556_16in, MUZZLE, [0, 0, -1], PORT, { seed: 1 }, { delayMs: 50 });
  off3.render(1.0);
  const m3 = off3.meters();
  check(m3[METER.MAX_EAR_SPL] < m[METER.MAX_EAR_SPL] - 15, `passive muffs cut the eardrum peak by > 15 dB (${m3[METER.MAX_EAR_SPL].toFixed(1)} vs ${m[METER.MAX_EAR_SPL].toFixed(1)} dB SPL)`);
}
if (failures) { console.error(`${failures} check(s) failed`); process.exit(1); }
