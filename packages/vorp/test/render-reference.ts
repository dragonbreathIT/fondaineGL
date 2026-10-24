// Renders the vorp reference scenarios offline (same WASM as the worklet) to 16-bit WAV.
//   node tools/run-ts.mjs packages/vorp/test/render-reference.ts [out_dir = docs/vorp-reference] [--wasm path]
// Scenarios (the numbering is stable so before/after renders can be compared with analyze-reference.mjs):
//   01 shooter, unprotected, one 5.56×45 16" shot under the roof of a covered firing point
//   02 same with passive earmuffs            03 same with electronic earmuffs          04 same, suppressed
//   05 bystander 25 m beside the shooter     06 300 m downrange: crack then boom        07 AR500 plate hit at 100 m
//   08 10-round full-auto burst (800 rpm)    09 one 9×19 pistol shot under the roof     10 reload sequence + breath
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  VorpOffline, GUNSHOTS, ZONES, MECH, METER, BUS, GunshotPreset, ZonePreset, ReflectionTap, shoeboxTaps, plateModes,
  whithamNWave, speedOfSound, encodeWav, MechName,
} from '../src/index';

const args = process.argv.slice(2);
const wasmIdx = args.indexOf('--wasm');
const wasmPath = wasmIdx >= 0 ? args[wasmIdx + 1] : 'wasm/vorp_dsp.wasm';
const outDir = args.find((a, i) => !a.startsWith('--') && (wasmIdx < 0 || i !== wasmIdx + 1)) ?? 'docs/vorp-reference';
mkdirSync(outDir, { recursive: true });
const bytes = readFileSync(wasmPath);
const module = await WebAssembly.compile(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer);
const SR = 48000;

// ---------------------------------------------------------------------------------------------- geometry
/** Shooter: eyes at 1.65 m, muzzle 0.75 m ahead and slightly right/below, ejection port by the cheek. */
const EYES = [0, 1.65, 0];
const FWD = [0, 0, -1];
const MUZZLE = [0.05, 1.57, -0.75];
const PORT = [0.06, 1.6, -0.22];
const MOUTH = [0, 1.55, -0.08];
/** Covered firing point: concrete floor, steel-sheet roof at 2.8 m, plywood baffles 1.8 m either side, block wall 2.5 m behind, open front. */
const FIRING_POINT = {
  min: [-1.8, 0, -2.0], max: [1.8, 2.8, 2.5],
  faces: {
    floor: { reflection: 0.97, lowpassHz: 9000 }, ceiling: { reflection: 0.88, lowpassHz: 3800 },
    left: { reflection: 0.8, lowpassHz: 4200 }, right: { reflection: 0.8, lowpassHz: 4200 },
    back: { reflection: 0.9, lowpassHz: 6000 }, front: null,
  },
};
const OPEN_GROUND = { min: [-1e3, 0, -1e3], max: [1e3, 1e3, 1e3], faces: { floor: { reflection: 0.7, lowpassHz: 3000 }, ceiling: null, left: null, right: null, back: null, front: null } };

function farTaps(zone: ZonePreset, src: number[], listener: number[], dir: number[] | null, directivityDb: number): ReflectionTap[] {
  const out: ReflectionTap[] = [];
  for (const f of zone.farReflectors ?? []) {
    const az = (f.azimuth * Math.PI) / 180;
    const R = [Math.sin(az) * f.distance, src[1], -Math.cos(az) * f.distance];
    const d1 = Math.hypot(R[0] - src[0], R[1] - src[1], R[2] - src[2]);
    const d2 = Math.hypot(R[0] - listener[0], R[1] - listener[1], R[2] - listener[2]);
    const path = d1 + d2;
    const depart = [(R[0] - src[0]) / d1, (R[1] - src[1]) / d1, (R[2] - src[2]) / d1];
    let g = f.reflectivity / path;
    if (dir && directivityDb > 0) g *= Math.pow(10, (-directivityDb * (1 - (dir[0] * depart[0] + dir[1] * depart[1] + dir[2] * depart[2])) * 0.5) / 20);
    out.push({ path, gain: g, lowpassHz: f.lowpassHz, dir: [(R[0] - listener[0]) / d2, (R[1] - listener[1]) / d2, (R[2] - listener[2]) / d2] });
  }
  return out;
}

function tapsFor(zone: ZonePreset, box: typeof FIRING_POINT | typeof OPEN_GROUND, src: number[], listener: number[], dir: number[] | null, directivityDb: number) {
  const near = shoeboxTaps(src, listener, { ...box, dir: dir ?? undefined, directivityDb });
  return [...near, ...farTaps(zone, src, listener, dir, directivityDb)].sort((a, b) => b.gain * b.gain - a.gain * a.gain).slice(0, 10);
}

// ---------------------------------------------------------------------------------------------- scene
interface Scene { name: string; seconds: number; build(off: VorpOffline): void }

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

function shooter(off: VorpOffline, preset: GunshotPreset, times: number[], extra: Record<string, number> = {}, box = FIRING_POINT) {
  const zone = off.zone ?? ZONES.coveredRange;
  for (const t of times) {
    const r = off.gunshot(preset, MUZZLE, FWD, PORT, extra, { delayMs: t });
    r.blast.setTaps(tapsFor(zone, box, MUZZLE, EYES, FWD, preset.params.directivityDb ?? 9));
    r.action?.setTaps(tapsFor(zone, box, PORT, EYES, null, 0).slice(0, 4));
  }
}

function mech(off: VorpOffline, name: MechName, pos: number[], t: number) {
  const r = off.mech(name, pos, { delayMs: t });
  const taps = tapsFor(off.zone ?? ZONES.coveredRange, FIRING_POINT, pos, EYES, null, 0).slice(0, 6);
  r.noise.setTaps(taps);
  r.ring?.setTaps(taps);
}

const base = (off: VorpOffline, protection = 0, zone = ZONES.coveredRange) => {
  off.setZone(zone);
  off.setListener(EYES, FWD, [0, 1, 0]);
  off.setAtmosphere(18, 0.55);
  off.setHearing({ protection });
};

const SCENES: Scene[] = [
  { name: '01_shooter_unprotected', seconds: 3.0, build: (o) => { base(o); shooter(o, GUNSHOTS.rifle556_16in, [50]); } },
  { name: '02_shooter_passive_muffs', seconds: 3.0, build: (o) => { base(o, 1); shooter(o, GUNSHOTS.rifle556_16in, [50]); } },
  { name: '03_shooter_electronic_muffs', seconds: 3.0, build: (o) => { base(o, 2); shooter(o, GUNSHOTS.rifle556_16in, [50]); } },
  { name: '04_shooter_suppressed', seconds: 3.0, build: (o) => { base(o); shooter(o, GUNSHOTS.rifle556_16in, [50], { suppress: 1 }); } },
  {
    name: '05_bystander_25m', seconds: 3.0, build: (o) => {
      base(o, 0, ZONES.outdoorRange);
      const p = GUNSHOTS.rifle556_16in;
      const muzzle = [25.05, 1.57, -0.75];
      const r = o.gunshot(p, muzzle, FWD, null, {}, { delayMs: 50 });
      r.blast.setTaps(tapsFor(ZONES.outdoorRange, OPEN_GROUND, muzzle, EYES, FWD, p.params.directivityDb ?? 9));
    },
  },
  {
    name: '06_downrange_300m_crack_then_boom', seconds: 3.0, build: (o) => {
      base(o, 0, ZONES.outdoorRange);
      const c = speedOfSound(18);
      // 5.56 at ~M2.0 passing 3 m to the right at 300 m; the muzzle report arrives ~0.9 s later
      const nw = whithamNWave({ mach: 2.0, diameter: 0.0057, length: 0.023, missDistance: 3, c });
      o.crack(nw.peakPa, nw.duration, [3, 1.65, -2], { delayMs: 100, reverbSendDb: o.zoneSendDb - 20 * Math.log10(3) });
      const p = GUNSHOTS.rifle556_16in;
      const muzzle = [0, 1.57, -300];
      const r = o.gunshot(p, muzzle, [0, 0, 1], null, {}, { delayMs: 0 });
      r.blast.setTaps(tapsFor(ZONES.outdoorRange, OPEN_GROUND, muzzle, EYES, [0, 0, 1], p.params.directivityDb ?? 9));
    },
  },
  {
    name: '07_steel_plate_100m', seconds: 3.5, build: (o) => {
      base(o, 0, ZONES.outdoorRange);
      const modes = plateModes({ width: 0.3, height: 0.45, thickness: 0.0095, level: 30 });
      const h = o.modal(modes, [{ timeMs: 0, amp: 1.2, contactMs: 0.02, noiseDb: -14 }], [0, 1.4, -100], 1, { delayMs: 100 });
      h.setTaps(tapsFor(ZONES.outdoorRange, OPEN_GROUND, [0, 1.4, -100], EYES, null, 0));
    },
  },
  { name: '08_full_auto_10rd', seconds: 4.0, build: (o) => { base(o); shooter(o, GUNSHOTS.rifle556_16in, Array.from({ length: 10 }, (_, i) => 50 + i * 75)); } },
  { name: '09_pistol_9mm', seconds: 3.0, build: (o) => { base(o); shooter(o, GUNSHOTS.pistol9mm, [50]); } },
  {
    name: '10_reload_sequence', seconds: 4.5, build: (o) => {
      base(o);
      const well = [0.04, 1.42, -0.32];
      mech(o, 'magRelease', well, 50);
      mech(o, 'magOut', well, 160);
      mech(o, 'magDropConcrete', [0.35, 0.0, -0.5], 760);
      mech(o, 'magSeat', well, 1600);
      mech(o, 'chargingHandle', [0.0, 1.52, -0.1], 2300);
      mech(o, 'slideStop', PORT, 2560);
      mech(o, 'slideHome', PORT, 2700);
      o.breath(MOUTH, { delayMs: 3150, bus: BUS.IMPACTS });
    },
  },
];

const only = args.find((a) => a.startsWith('--only='))?.slice(7).split(',');
for (const sc of SCENES) {
  if (only && !only.some((k) => sc.name.startsWith(k))) continue;
  const off = await VorpOffline.create(module, SR);
  off.random = seeded(1234);
  sc.build(off);
  const { left, right } = off.render(sc.seconds);
  const m = off.meters();
  const wav = encodeWav(left, right, SR);
  writeFileSync(join(outDir, `${sc.name}.wav`), Buffer.from(await wav.arrayBuffer()));
  let pk = 0; for (let i = 0; i < left.length; i++) pk = Math.max(pk, Math.abs(left[i]), Math.abs(right[i]));
  console.log(`${sc.name.padEnd(36)} peak ${(20 * Math.log10(Math.max(pk, 1e-9))).toFixed(1).padStart(6)} dBFS  max ear ${m[METER.MAX_EAR_SPL].toFixed(1)} dB SPL  TTS ${m[METER.TTS].toFixed(1)} dB  tinnitus ${m[METER.TINNITUS].toFixed(2)}`);
}
console.log(`wrote WAVs to ${outDir}`);
