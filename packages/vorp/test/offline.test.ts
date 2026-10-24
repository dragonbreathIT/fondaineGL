// Node test of the offline engine path (same WASM as the worklet).
//   node tools/run-ts.mjs packages/vorp/test/offline.test.ts
import { readFileSync } from 'node:fs';
import { VorpOffline, GUNSHOTS, GUNSHOT_PARAMS, KIND, OP, paramArray, METER } from '../src/index';

const bytes = readFileSync('wasm/vorp_dsp.wasm');
for (const sr of [44100, 48000]) {
  const off = await VorpOffline.create(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer, sr);
  off.cmd(OP.LISTENER, [0, 1.65, 0, 0, 0, -1, 0, 1, 0]);
  const p = GUNSHOTS.rifle556_16in;
  for (let i = 0; i < 10; i++) {
    off.spawn(KIND.GUNSHOT, [0.05, 1.57, -0.75], paramArray(GUNSHOT_PARAMS, { ...p.params, seed: i }), { dir: [0, 0, -1], directivityDb: 9, rearLpHz: 4500, delayMs: i * 80 });
  }
  let maxEar = 0;
  for (let b = 0; b < 30; b++) { off.render(0.1); maxEar = Math.max(maxEar, off.meters()[METER.MAX_EAR_SPL]); }
  const m = off.meters();
  console.log(`${sr} Hz: max eardrum ${maxEar.toFixed(1)} dB SPL, TTS ${m[METER.TTS].toFixed(1)} dB, tinnitus ${m[METER.TINNITUS].toFixed(2)}`);
}
