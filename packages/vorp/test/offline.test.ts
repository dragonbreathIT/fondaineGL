// Node test of the offline engine path (same WASM as the worklet).
//   node tools/run-ts.mjs packages/vorp/test/offline.test.ts
// Checks the loudness contract of the shooter's own shot (see docs/vorp-reference/README.md):
//   peak ≥ −0.5 dBFS, first 50 ms RMS ≥ −8 dBFS, every burst onset within 1.5 dB of the first,
//   mechanical handling peaks ≥ 10 dB under full scale, and the hearing model reacting (TTS, tinnitus after a burst).
// Then the recorded-sample layer: a synthetic "recording" registered under a slot plays through the same chain at the
// preset level (full-scale peak, hearing model driven), the level contract of `sampleAt` holds (peak SPL → dBFS via the
// calibration), slot families pick numbered takes only, and a preset whose slots are not loaded renders exactly the
// pure synthesis.
import { readFileSync } from 'node:fs';
import { VorpOffline, GUNSHOTS, ZONES, METER, GunshotPreset } from '../src/index';

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
  check(m[METER.TINNITUS] > 0.4, `burst rings (tinnitus ${m[METER.TINNITUS].toFixed(2)}; full ring needs a long string by design)`);

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
// --- recorded-sample layer (48 kHz)
{
  const sr = 48000;
  /** A 0.4 s decaying noise burst (deterministic LCG) normalised to −1 dBFS: stands in for a downloaded shot. */
  const burst = (seed: number, seconds = 0.4) => {
    const n = Math.round(seconds * sr), d = new Float32Array(n);
    let x = seed >>> 0;
    for (let i = 0; i < n; i++) { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; d[i] = ((x / 4294967296) * 2 - 1) * Math.exp(-i / (0.06 * sr)); }
    let p = 0; for (const v of d) p = Math.max(p, Math.abs(v));
    const g = Math.pow(10, -1 / 20) / p;
    for (let i = 0; i < n; i++) d[i] *= g;
    return d;
  };
  const setup = async () => {
    const v = await VorpOffline.create(wasm, sr);
    v.random = () => 0.42;
    v.setZone(ZONES.coveredRange);
    v.setListener(EYES, [0, 0, -1], [0, 1, 0]);
    return v;
  };
  // registration + families
  const off = await setup();
  off.registerSample('shot.test.01', burst(1), sr);
  off.registerSample('shot.test.02', burst(2, (0.4 * 44100) / sr), 44100); // a 44.1 kHz take: resampled to the engine rate
  off.registerSample('shot.test.mid.01', burst(3, 0.8), sr);
  const fam = off.samplesFor('shot.test');
  check(fam.length === 2 && fam.every((s) => Math.abs(db(s.peak) + 1) < 0.2), `slot family = numbered takes only (${fam.map((s) => s.slot).join(', ')}), peaks −1 dBFS`);
  check(Math.abs(fam[1].frames - 0.4 * sr) < 3, `44.1 kHz take resampled to the engine rate (${fam[1].frames} frames)`);
  // a recorded shot through the full chain
  const preset: GunshotPreset = { ...GUNSHOTS.rifle556_16in, name: 'test', samples: { shot: ['shot.test'], shotTail: ['shot.test.mid'] } };
  const r = off.gunshot(preset, MUZZLE, [0, 0, -1], PORT, { seed: 1 }, { delayMs: 50 });
  check(r.samples.length === 2 && r.blast.id !== r.samples[0].id, `recorded report + tail layers spawned, synth bed kept (${r.samples.length} layers)`);
  const out = off.render(1.2);
  const pk = db(peakOf(out.left, out.right, 0, out.left.length));
  const mm = off.meters();
  console.log(`recorded shot: peak ${pk.toFixed(1)} dBFS, max eardrum ${mm[METER.MAX_EAR_SPL].toFixed(1)} dB SPL, TTS ${mm[METER.TTS].toFixed(1)} dB`);
  check(pk >= -0.5, `recorded shot peaks at full scale (${pk.toFixed(2)} dBFS)`);
  check(mm[METER.MAX_EAR_SPL] > 140 && mm[METER.TTS] > 1, `recorded shot drives the hearing model (${mm[METER.MAX_EAR_SPL].toFixed(0)} dB SPL at the eardrum)`);
  // never the same take twice in a row
  const picks = new Set<number>();
  let repeats = 0, last = r.take!.id;
  for (let i = 0; i < 6; i++) { off.random = () => (i % 3) / 3; const g = off.gunshot(preset, MUZZLE, [0, 0, -1], null, { seed: i }); picks.add(g.take!.id); if (g.take!.id === last) repeats++; last = g.take!.id; }
  check(picks.size === 2 && repeats === 0, `random pick uses both takes and never repeats one (${picks.size} distinct, ${repeats} repeats)`);
  // bed off → the recording is the blast voice
  const off2 = await setup();
  off2.registerSample('shot.test.01', burst(1), sr);
  const r2 = off2.gunshot({ ...preset, synthBedDb: -200 }, MUZZLE, [0, 0, -1], null);
  check(r2.samples.length === 1 && r2.blast.id === r2.samples[0].id, 'synthBedDb ≤ −90 drops the synth bed');
  // missing slot → pure synthesis, bit-identical to a preset without samples
  const a = await setup(), b = await setup();
  const ra = a.gunshot({ ...GUNSHOTS.rifle556_16in, samples: { shot: ['shot.missing'], shotTail: ['shot.missing.mid'] } }, MUZZLE, [0, 0, -1], PORT, { seed: 7 }, { delayMs: 50 });
  b.gunshot({ ...GUNSHOTS.rifle556_16in, samples: undefined }, MUZZLE, [0, 0, -1], PORT, { seed: 7 }, { delayMs: 50 });
  const oa = a.render(1.0), ob = b.render(1.0);
  let same = ra.samples.length === 0;
  for (let i = 0; same && i < oa.left.length; i++) same = oa.left[i] === ob.left[i] && oa.right[i] === ob.right[i];
  check(same, 'preset with unloaded slots renders exactly the synthesized shot');
  // level contract: a full-scale tone at 90 dB SPL, non-positional → 90 − 112 (calibration) = −22 dBFS
  const c = await VorpOffline.create(wasm, sr);
  c.random = () => 0.5;
  c.setAmbience({ enable: 0 });
  const tone = new Float32Array(Math.round(0.25 * sr));
  for (let i = 0; i < tone.length; i++) { const f = Math.min(1, i / (0.01 * sr), (tone.length - i) / (0.01 * sr)); tone[i] = Math.sin((2 * Math.PI * 1000 * i) / sr) * f; }
  c.registerSample('tone', tone, sr);
  check(c.sampleAt('tone', [0, 0, 0], 90, { spatial: false, reverbSendDb: -90, variation: 0 }) !== null && c.sampleAt('nothing.here', [0, 0, 0], 90) === null, 'sampleAt plays loaded slots and returns null for unknown ones');
  const oc = c.render(0.5);
  const tonePk = db(peakOf(oc.left, oc.right, 0, oc.left.length));
  check(Math.abs(tonePk + 22) < 0.7, `90 dB SPL sample peak reads −22 dBFS after calibration (${tonePk.toFixed(2)})`);
  // mechanical handling: recording replaces the noise texture when loaded, synthesis otherwise
  const d = await setup();
  d.registerSample('mech.magSeat.01', burst(4, 0.15), sr);
  const rm = d.mech('magSeat', PORT, { delayMs: 20 });
  const rs = d.mech('slideHome', PORT, { delayMs: 300 });
  check(rm.recorded && !rs.recorded, 'mech() uses the recording for loaded slots only');
  const od = d.render(0.8);
  const mechPk = db(peakOf(od.left, od.right, 0, od.left.length));
  check(mechPk <= -10 && mechPk >= -40, `recorded handling stays 10–40 dB under full scale (${mechPk.toFixed(1)} dBFS)`);
  // full auto, fired live (one render chunk per round): a recording with a long echo must not stack into a wall.
  // The previous round's echo is choked; the last round keeps its whole tail.
  const echoTake = (() => { const n = Math.round(2.5 * sr), e = new Float32Array(n); let x = 99; for (let i = 0; i < n; i++) { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; e[i] = ((x / 4294967296) * 2 - 1) * (Math.exp(-i / (0.02 * sr)) + 0.1 * Math.exp(-i / (0.7 * sr))); } let p = 0; for (const v of e) p = Math.max(p, Math.abs(v)); for (let i = 0; i < n; i++) e[i] *= 0.9 / p; return e; })();
  const live = async (chokeMs: number, rounds = 12) => {
    const v = await setup();
    v.setZone(ZONES.outdoorRange);
    v.setAmbience({ enable: 0 });
    v.setHearing({ enable: 0 });
    v.registerSample('shot.echo.01', echoTake, sr);
    v.shotWet.burstChokeMs = chokeMs;
    const p: GunshotPreset = { ...GUNSHOTS.rifle556_16in, name: 'echo', synthBedDb: -200, samples: { shot: ['shot.echo'] } };
    const chunks: Float32Array[] = [];
    for (let i = 0; i < 12; i++) { if (i >= 12 - rounds) v.gunshot(p, MUZZLE, [0, 0, -1], null, { seed: i }); chunks.push(v.render(0.08).left); }
    chunks.push(v.render(2).left);
    const all = new Float32Array(chunks.reduce((n, c) => n + c.length, 0)); let o = 0; for (const c of chunks) { all.set(c, o); o += c.length; }
    const lastShot = 11 * Math.ceil((0.08 * sr) / 128) * 128;
    const ms = (x: number) => Math.round((x * sr) / 1000);
    return { late: db(rmsOf(all, all, lastShot + ms(400), lastShot + ms(1400))), lastPk: db(peakOf(all, all, lastShot, lastShot + ms(30))) };
  };
  const wall = await live(0), choked = await live(160), single = await live(160, 1);
  console.log(`echo 0.4–1.4 s after a 12-round burst: unchoked ${wall.late.toFixed(1)} dBFS, choked ${choked.late.toFixed(1)} dBFS, one round alone ${single.late.toFixed(1)} dBFS`);
  check(Math.abs(choked.late - single.late) < 1.5 && wall.late > choked.late + 1, 'burst echo choke: a burst ends with one round\'s echo, not a stack of them');
  check(Math.abs(wall.lastPk - choked.lastPk) < 1, 'the last round itself is untouched by the choke');
}

if (failures) { console.error(`${failures} check(s) failed`); process.exit(1); }
