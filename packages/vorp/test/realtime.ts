// Real-time path test: AudioWorklet + WASM engine. Fires a volley and reports meters.
import { Vorp, GUNSHOTS, ZONES, plateModes } from '../src/index';

declare global { interface Window { __test: Record<string, unknown> } }
const T: Record<string, unknown> = (window.__test = { done: false, log: [] as string[] });
const log = (s: string) => { (T.log as string[]).push(s); console.log(s); };

const v = await Vorp.create({ wasmUrl: '/wasm/vorp_dsp.wasm', workletUrl: '/vorp/vorp-worklet.js' });
v.onError = (m) => log('ERROR ' + m);
await v.resume();
log(`context ${v.ctx.state} @ ${v.ctx.sampleRate} Hz`);
v.setZone(ZONES.outdoorRange);
v.setListener([0, 1.65, 0], [0, 0, -1], [0, 1, 0]);
v.flush();
await new Promise((r) => setTimeout(r, 300));
for (let i = 0; i < 10; i++) {
  v.gunshot(GUNSHOTS.rifle556_16in, [0.05, 1.57, -0.75], [0, 0, -1], [0.06, 1.6, -0.22]);
  v.modal(plateModes({ width: 0.3, height: 0.45, thickness: 0.0095 }), [{ timeMs: 0, amp: 1.2, contactMs: 0.02 }], [0, 1.4, -25], 1, { delayMs: 30 + 25 / 0.94 });
  v.flush();
  await new Promise((r) => setTimeout(r, 80));
}
let maxVoices = 0, maxCpu = 0, maxEar = 0;
for (let i = 0; i < 25; i++) {
  await new Promise((r) => setTimeout(r, 100));
  maxVoices = Math.max(maxVoices, v.meters.voices);
  maxCpu = Math.max(maxCpu, v.meters.cpu);
  maxEar = Math.max(maxEar, v.meters.earSpl);
}
log(`max voices ${maxVoices}, max eardrum SPL ${maxEar.toFixed(1)} dB, TTS ${v.meters.tts.toFixed(1)} dB, audio-thread load ${(maxCpu * 100).toFixed(1)}% (NaN if performance.now is unavailable in the worklet), time ${v.meters.time.toFixed(2)} s`);
T.meters = { ...v.meters, maxVoices, maxEar };
T.done = true;
