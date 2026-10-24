// vorp host (main thread): owns the AudioContext + worklet, batches commands each frame, offers typed
// helpers for every source kind, and an offline renderer (same WASM, no AudioContext) for tools/tests.

import { AMBIENCE_PARAMS, BUS, GUNSHOT_PARAMS, HEARING_PARAMS, KIND, MASTER_PARAMS, METER, NOISE_PARAMS, OP, paramArray, ParamSpec, REVERB_PARAMS, SPAWN } from './params';
import { BREATH, GunshotPreset, MECH, MechName, MechPreset, ZonePreset, zoneSendDb } from './presets';
import { modalParams, Mode, receiverModes } from './acoustics';

export type Vec3Like = ArrayLike<number>;

export interface Tap {
  /** Total path length source → reflector → listener (m). */
  path: number;
  /** Linear gain (1/path spreading × reflection coefficient × directivity), may be negative (phase-inverting). */
  gain: number;
  /** Absorption lowpass of the reflecting material (Hz). */
  lowpassHz: number;
  /** World-space arrival direction at the listener (listener → reflection point). */
  dir: Vec3Like;
}

export interface SpawnOptions {
  bus?: number;
  /** Source facing direction (for directivity). */
  dir?: Vec3Like;
  directivityDb?: number;
  rearLpHz?: number;
  /** 0 = spherical spreading from the 1 m reference, 1 = level already computed for the listener. */
  distanceMode?: 0 | 1;
  minDistance?: number;
  /** Reverb send relative to the 1 m direct sound (dB). Defaults to the current zone's critical distance. */
  reverbSendDb?: number;
  /** Non-positional (inside-the-head / UI). */
  spatial?: boolean;
  /** Start delay (ms). */
  delayMs?: number;
}

export interface VorpMeters {
  peakL: number; peakR: number; sceneSpl: number; tts: number; compGr: number; limitGr: number; voices: number;
  reflexGr: number; tinnitus: number; earSpl: number; speedOfSound: number; time: number; cpu: number;
}

class CommandBuilder {
  buf = new Float32Array(4096);
  len = 0;
  push(op: number, args: ArrayLike<number>) {
    const need = this.len + 2 + args.length;
    if (need > this.buf.length) {
      const nb = new Float32Array(Math.max(need, this.buf.length * 2));
      nb.set(this.buf.subarray(0, this.len));
      this.buf = nb;
    }
    this.buf[this.len++] = op;
    this.buf[this.len++] = args.length;
    for (let i = 0; i < args.length; i++) this.buf[this.len++] = args[i];
  }
  take(): Float32Array | null {
    if (!this.len) return null;
    const out = this.buf.slice(0, this.len);
    this.len = 0;
    return out;
  }
}

export class VoiceHandle {
  constructor(private v: VorpBase, readonly id: number) {}
  setPosition(p: Vec3Like, dir?: Vec3Like) { this.v.cmd(OP.VOICE_POS, dir ? [this.id, p[0], p[1], p[2], dir[0], dir[1], dir[2]] : [this.id, p[0], p[1], p[2]]); }
  setTaps(taps: Tap[]) { this.v.setTaps(this.id, taps); }
  setOcclusion(gainDb: number, lowpassHz: number) { this.v.cmd(OP.VOICE_OCCLUSION, [this.id, gainDb, lowpassHz]); }
  setSend(db: number) { this.v.cmd(OP.VOICE_SEND, [this.id, db]); }
  stop(fadeMs = 30) { this.v.cmd(OP.VOICE_STOP, [this.id, fadeMs]); }
}

export interface VorpOptions {
  /** URL of vorp_dsp.wasm. */
  wasmUrl: string;
  /** URL of the bundled worklet (vorp-worklet.js). */
  workletUrl: string;
  context?: AudioContext;
  latencyHint?: AudioContextLatencyCategory | number;
}

/**
 * Everything the realtime host and the offline renderer share: the command builder, global parameter groups
 * and the typed source helpers. Subclasses only decide where the command stream goes.
 */
export abstract class VorpBase {
  readonly params = {
    hearing: paramArray(HEARING_PARAMS),
    master: paramArray(MASTER_PARAMS),
    reverb: paramArray(REVERB_PARAMS),
    ambience: paramArray(AMBIENCE_PARAMS),
  };
  /** Default reverb send (dB) derived from the active zone. */
  zoneSendDb = -30;
  zone: ZonePreset | null = null;
  atmosphere = { tempC: 15, humidity: 0.6, pressureKpa: 101.325 };
  protected cmdb = new CommandBuilder();
  protected nextId = 1;
  /** Random seed source (deterministic in tests). */
  random: () => number = Math.random;

  cmd(op: number, args: ArrayLike<number>) { this.cmdb.push(op, args); }

  // ------------------------------------------------------------------------------------- global state
  setListener(pos: Vec3Like, forward: Vec3Like, up: Vec3Like) {
    this.cmd(OP.LISTENER, [pos[0], pos[1], pos[2], forward[0], forward[1], forward[2], up[0], up[1], up[2]]);
  }
  setAtmosphere(tempC: number, humidity: number, pressureKpa = 101.325) {
    this.atmosphere = { tempC, humidity, pressureKpa };
    this.cmd(OP.ATMOSPHERE, [tempC, humidity, pressureKpa]);
  }
  setHearing(values: Record<string, number>) { this.setGroup(HEARING_PARAMS, this.params.hearing, values, OP.HEARING); }
  setMaster(values: Record<string, number>) { this.setGroup(MASTER_PARAMS, this.params.master, values, OP.MASTER); }
  setReverb(values: Record<string, number>) { this.setGroup(REVERB_PARAMS, this.params.reverb, values, OP.REVERB); }
  setAmbience(values: Record<string, number>) { this.setGroup(AMBIENCE_PARAMS, this.params.ambience, values, OP.AMBIENCE); }
  resetHearing() { this.cmd(OP.RESET_HEARING, []); }
  setZone(z: ZonePreset) {
    this.zone = z;
    this.zoneSendDb = zoneSendDb(z);
    this.setReverb(z.reverb);
    this.setAmbience(z.ambience);
  }
  /** Re-send every parameter group (after editing `params.*` arrays directly, e.g. from a tuning UI). */
  applyAll() {
    this.cmd(OP.HEARING, this.params.hearing);
    this.cmd(OP.MASTER, this.params.master);
    this.cmd(OP.REVERB, this.params.reverb);
    this.cmd(OP.AMBIENCE, this.params.ambience);
    this.cmd(OP.ATMOSPHERE, [this.atmosphere.tempC, this.atmosphere.humidity, this.atmosphere.pressureKpa]);
  }
  private setGroup(schema: ParamSpec[], arr: Float32Array, values: Record<string, number>, op: number) {
    schema.forEach((s, i) => { if (values[s.key] !== undefined) arr[i] = values[s.key]; });
    this.cmd(op, arr);
  }
  protected seed() { return (this.random() * 1e5) | 0; }

  // ------------------------------------------------------------------------------------- sources
  spawn(kind: number, pos: Vec3Like, params: ArrayLike<number>, o: SpawnOptions = {}): VoiceHandle {
    const id = this.nextId++;
    if (this.nextId > 16_000_000) this.nextId = 1;
    const h = new Float32Array(SPAWN.HEADER + params.length);
    h[SPAWN.VOICE_ID] = id;
    h[SPAWN.KIND] = kind;
    h[SPAWN.BUS] = o.bus ?? BUS.WEAPONS;
    h[SPAWN.PX] = pos[0]; h[SPAWN.PX + 1] = pos[1]; h[SPAWN.PX + 2] = pos[2];
    const d = o.dir ?? [0, 0, -1];
    h[SPAWN.DX] = d[0]; h[SPAWN.DX + 1] = d[1]; h[SPAWN.DX + 2] = d[2];
    h[SPAWN.DIRECTIVITY_DB] = o.directivityDb ?? 0;
    h[SPAWN.REAR_LP_HZ] = o.rearLpHz ?? 20000;
    h[SPAWN.DISTANCE_MODE] = o.distanceMode ?? 0;
    h[SPAWN.MIN_DIST] = o.minDistance ?? 0.1;
    h[SPAWN.REVERB_SEND_DB] = o.reverbSendDb ?? this.zoneSendDb;
    h[SPAWN.SPATIAL] = o.spatial === false ? 0 : 1;
    h[SPAWN.DELAY_MS] = o.delayMs ?? 0;
    h.set(params, SPAWN.HEADER);
    this.cmd(OP.SPAWN, h);
    return new VoiceHandle(this, id);
  }

  /**
   * Fires a gunshot: muzzle blast at `muzzle` pointing `dir` + mechanical action at `actionPos`.
   * Returns both voices so the caller can attach early-reflection taps.
   */
  gunshot(preset: GunshotPreset, muzzle: Vec3Like, dir: Vec3Like, actionPos: Vec3Like | null, extra: Record<string, number> = {}, o: SpawnOptions = {}) {
    const vals: Record<string, number> = { ...preset.params, seed: this.seed(), ...extra };
    const params = paramArray(GUNSHOT_PARAMS, vals);
    const minHit = Math.min(0, ...preset.action.hits.map((h) => h.timeMs));
    const lead = -minHit; // mechanical events before ignition (hammer fall) shift the blast later
    const tailSend = vals.tailSendDb ?? 0;
    const blast = this.spawn(KIND.GUNSHOT, muzzle, params, {
      ...o, dir, directivityDb: vals.directivityDb, rearLpHz: vals.rearLpHz, delayMs: (o.delayMs ?? 0) + lead,
      reverbSendDb: (o.reverbSendDb ?? this.zoneSendDb) + tailSend,
    });
    let action: VoiceHandle | null = null;
    if (actionPos && preset.action.hits.length) {
      const modes = receiverModes(preset.action.brightness);
      const hits = preset.action.hits.map((h) => ({ ...h, timeMs: h.timeMs + lead }));
      action = this.modal(modes, hits, actionPos, preset.action.level, { ...o, delayMs: o.delayMs ?? 0 });
    }
    return { blast, action };
  }

  modal(modes: Mode[], hits: { timeMs: number; amp: number; contactMs: number; noiseDb?: number }[], pos: Vec3Like, level = 1, o: SpawnOptions = {}) {
    return this.spawn(KIND.MODAL, pos, modalParams(modes, hits, level, this.seed()), { bus: BUS.IMPACTS, ...o });
  }

  /** Filtered-noise event (impacts, footsteps, mechanical rasps/clicks, breath). `values` = NOISE_PARAMS overrides at 1 m. */
  noise(values: Record<string, number>, pos: Vec3Like, o: SpawnOptions = {}) {
    return this.spawn(KIND.NOISE, pos, paramArray(NOISE_PARAMS, { seed: this.seed(), ...values }), { bus: BUS.IMPACTS, ...o });
  }

  /**
   * Weapon-handling sound by name (see `MECH`): e.g. `mech('magRelease', pos)`. A mechanical event is a
   * noise layer (rasp / click texture) plus a receiver-ring modal hit, so it reads as metal on metal.
   */
  mech(name: MechName, pos: Vec3Like, o: SpawnOptions = {}) {
    const m: MechPreset = MECH[name];
    const noise = this.noise(m.noise, pos, o);
    const ring = m.ring ? this.modal(receiverModes(m.ring.brightness), m.ring.hits, pos, m.ring.level, o) : null;
    return { noise, ring };
  }

  /** Short quiet exhale ("breath") at `pos` — e.g. the shooter's mouth ≈ 0.15–0.3 m from the ears. */
  breath(pos: Vec3Like, o: SpawnOptions = {}) { return this.noise(BREATH, pos, o); }

  /** Supersonic crack, already computed for the listener (distanceMode = 1). */
  crack(peakPa: number, durationS: number, emissionPoint: Vec3Like, o: SpawnOptions = {}) {
    return this.spawn(KIND.NWAVE, emissionPoint, [peakPa, durationS, 20], { distanceMode: 1, ...o });
  }

  /** Plays a registered PCM sample. `gainPa` = pressure at 1 m for a full-scale sample. */
  sample(sampleId: number, pos: Vec3Like, gainPa: number, o: SpawnOptions & { rate?: number; loop?: boolean; offsetS?: number } = {}) {
    return this.spawn(KIND.SAMPLE, pos, [sampleId, o.rate ?? 1, gainPa, o.loop ? 1 : 0, o.offsetS ?? 0], o);
  }

  setTaps(voiceId: number, taps: Tap[]) {
    const n = Math.min(taps.length, 10);
    const a = new Float32Array(2 + n * 6);
    a[0] = voiceId; a[1] = n;
    for (let i = 0; i < n; i++) {
      const t = taps[i], o = 2 + i * 6;
      a[o] = t.path; a[o + 1] = t.gain; a[o + 2] = t.lowpassHz; a[o + 3] = t.dir[0]; a[o + 4] = t.dir[1]; a[o + 5] = t.dir[2];
    }
    this.cmd(OP.VOICE_TAPS, a);
  }
}

export class Vorp extends VorpBase {
  readonly ctx: AudioContext;
  readonly node: AudioWorkletNode;
  readonly module: WebAssembly.Module;
  readonly meters: VorpMeters = { peakL: -120, peakR: -120, sceneSpl: 0, tts: 0, compGr: 0, limitGr: 0, voices: 0, reflexGr: 0, tinnitus: 0, earSpl: 0, speedOfSound: 343, time: 0, cpu: 0 };
  onError: (m: string) => void = (m) => console.error('[vorp]', m);

  private constructor(ctx: AudioContext, node: AudioWorkletNode, module: WebAssembly.Module) {
    super();
    this.ctx = ctx;
    this.node = node;
    this.module = module;
    node.port.onmessage = (ev) => {
      const m = ev.data;
      if (m.type === 'meters') {
        const a = m.meters as Float32Array;
        Object.assign(this.meters, {
          peakL: a[METER.PEAK_L], peakR: a[METER.PEAK_R], sceneSpl: a[METER.SCENE_SPL], tts: a[METER.TTS], compGr: a[METER.COMP_GR],
          limitGr: a[METER.LIMIT_GR], voices: a[METER.VOICES], reflexGr: a[METER.REFLEX_GR], tinnitus: a[METER.TINNITUS],
          earSpl: a[METER.EAR_SPL], speedOfSound: a[METER.SPEED_OF_SOUND], time: a[METER.TIME], cpu: m.cpu,
        });
      } else if (m.type === 'error') this.onError(m.message);
    };
  }

  static async create(opts: VorpOptions): Promise<Vorp> {
    const ctx = opts.context ?? new AudioContext({ latencyHint: opts.latencyHint ?? 'interactive' });
    const [module] = await Promise.all([
      WebAssembly.compileStreaming(fetch(opts.wasmUrl)).catch(async () => WebAssembly.compile(await (await fetch(opts.wasmUrl)).arrayBuffer())),
      ctx.audioWorklet.addModule(opts.workletUrl),
    ]);
    const node = new AudioWorkletNode(ctx, 'vorp', { numberOfInputs: 0, numberOfOutputs: 1, outputChannelCount: [2], processorOptions: { module } });
    node.connect(ctx.destination);
    const v = new Vorp(ctx, node, module);
    v.applyAll();
    return v;
  }

  /** Browsers start audio suspended until a user gesture. Call from a click/keydown handler. */
  async resume() { if (this.ctx.state !== 'running') await this.ctx.resume(); }

  /** Send all queued commands to the audio thread. Call once per frame (after updating the listener). */
  flush() {
    const data = this.cmdb.take();
    if (data) this.node.port.postMessage({ type: 'cmd', data }, [data.buffer]);
  }

  // ------------------------------------------------------------------------------------- assets
  /** Registers a mono sample (decoded + resampled to the context rate) under `id`. */
  async loadSample(id: number, url: string) {
    const buf = await this.ctx.decodeAudioData(await (await fetch(url)).arrayBuffer());
    const mono = new Float32Array(buf.length);
    for (let c = 0; c < buf.numberOfChannels; c++) { const d = buf.getChannelData(c); for (let i = 0; i < d.length; i++) mono[i] += d[i] / buf.numberOfChannels; }
    this.node.port.postMessage({ type: 'sample', id, data: mono }, [mono.buffer]);
  }

  /** Loads a convolution impulse response (mono or stereo WAV) and sets the convolution mix. */
  async loadImpulseResponse(url: string, mix = 1) {
    const buf = await this.ctx.decodeAudioData(await (await fetch(url)).arrayBuffer());
    const left = buf.getChannelData(0).slice();
    const right = buf.numberOfChannels > 1 ? buf.getChannelData(1).slice() : null;
    this.node.port.postMessage({ type: 'ir', left, right }, right ? [left.buffer, right.buffer] : [left.buffer]);
    this.setMaster({ convMix: mix });
  }
}

// =========================================================================================== offline
interface Exports {
  memory: WebAssembly.Memory;
  vorp_create(sr: number): number;
  vorp_alloc(bytes: number): number;
  vorp_free(ptr: number, bytes: number): void;
  vorp_cmd_ptr(): number;
  vorp_exec(len: number): void;
  vorp_process(): number;
  vorp_meters_ptr(): number;
  vorp_render_source(kind: number, params: number, n: number, out: number, frames: number, sr: number): number;
}

/**
 * Offline engine: runs the same DSP synchronously on the main thread (or in Node) — used by vorp-lab for
 * waveform/spectrum views and by tests. Same helper API as the realtime engine (`gunshot`, `noise`, `mech`,
 * `modal`, `crack`, `setZone`, …); commands are executed at the next `render` call.
 */
export class VorpOffline extends VorpBase {
  private ex: Exports;
  readonly sampleRate: number;

  private constructor(ex: Exports, sr: number) { super(); this.ex = ex; this.sampleRate = sr; ex.vorp_create(sr); }

  static async create(wasm: WebAssembly.Module | ArrayBuffer | string, sampleRate = 48000): Promise<VorpOffline> {
    let mod: WebAssembly.Module;
    if (typeof wasm === 'string') mod = await WebAssembly.compile(await (await fetch(wasm)).arrayBuffer());
    else if (wasm instanceof WebAssembly.Module) mod = wasm;
    else mod = await WebAssembly.compile(wasm);
    const inst = await WebAssembly.instantiate(mod, {});
    return new VorpOffline(inst.exports as unknown as Exports, sampleRate);
  }

  /** Execute queued commands now (also done automatically by `render`). */
  flush() {
    const data = this.cmdb.take();
    if (!data) return;
    new Float32Array(this.ex.memory.buffer, this.ex.vorp_cmd_ptr(), data.length).set(data);
    this.ex.vorp_exec(data.length);
  }

  /** Render `seconds` of the scene to planar stereo. */
  render(seconds: number): { left: Float32Array; right: Float32Array } {
    this.flush();
    const blocks = Math.ceil((seconds * this.sampleRate) / 128);
    const left = new Float32Array(blocks * 128), right = new Float32Array(blocks * 128);
    for (let b = 0; b < blocks; b++) {
      const ptr = this.ex.vorp_process();
      const o = new Float32Array(this.ex.memory.buffer, ptr, 256);
      left.set(o.subarray(0, 128), b * 128);
      right.set(o.subarray(128, 256), b * 128);
    }
    return { left, right };
  }

  meters(): Float32Array { return new Float32Array(this.ex.memory.buffer, this.ex.vorp_meters_ptr(), 16).slice(); }

  /** Dry source render (pressure in Pa at 1 m, no propagation) — waveform inspection. */
  renderSource(kind: number, params: ArrayLike<number>, seconds: number): Float32Array {
    const frames = Math.ceil(seconds * this.sampleRate);
    const pp = this.ex.vorp_alloc(params.length * 4);
    const op = this.ex.vorp_alloc(frames * 4);
    new Float32Array(this.ex.memory.buffer, pp, params.length).set(params);
    const n = this.ex.vorp_render_source(kind, pp, params.length, op, frames, this.sampleRate);
    const out = new Float32Array(frames);
    out.set(new Float32Array(this.ex.memory.buffer, op, n));
    this.ex.vorp_free(pp, params.length * 4);
    this.ex.vorp_free(op, frames * 4);
    return out;
  }
}

/** Encode planar float stereo as a 16-bit PCM WAV blob. */
export function encodeWav(left: Float32Array, right: Float32Array, sampleRate: number): Blob {
  const n = left.length;
  const buf = new ArrayBuffer(44 + n * 4);
  const v = new DataView(buf);
  const str = (o: number, s: string) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
  str(0, 'RIFF'); v.setUint32(4, 36 + n * 4, true); str(8, 'WAVE'); str(12, 'fmt ');
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 2, true); v.setUint32(24, sampleRate, true);
  v.setUint32(28, sampleRate * 4, true); v.setUint16(32, 4, true); v.setUint16(34, 16, true); str(36, 'data'); v.setUint32(40, n * 4, true);
  for (let i = 0; i < n; i++) {
    v.setInt16(44 + i * 4, Math.max(-1, Math.min(1, left[i])) * 32767, true);
    v.setInt16(46 + i * 4, Math.max(-1, Math.min(1, right[i])) * 32767, true);
  }
  return new Blob([buf], { type: 'audio/wav' });
}
