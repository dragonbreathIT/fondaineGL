// vorp host (main thread): owns the AudioContext + worklet, batches commands each frame, offers typed
// helpers for every source kind, and an offline renderer (same WASM, no AudioContext) for tools/tests.

import { AMBIENCE_PARAMS, BUS, GUNSHOT_PARAMS, HEARING_PARAMS, KIND, MASTER_PARAMS, METER, NOISE_PARAMS, OP, paramArray, ParamSpec, REVERB_PARAMS, SPAWN } from './params';
import { BREATH, GunshotPreset, IMPACTS, MECH, MechName, MechPreset, ZonePreset, zoneSendDb } from './presets';
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

/** One recorded sound in `assets/manifest.json` → `sounds` (written by `tools/fetch-sounds.mjs`). */
export interface SoundEntry {
  /** Relative to the manifest (e.g. `sounds/shot.rifle556.01.wav`). */
  file: string;
  license: string;
  author?: string;
  title?: string;
  url?: string;
  source?: string;
  /** Source-specific id (Freesound sound id, OpenGameArt slug). */
  id?: number | string;
  /** Level trim applied at playback (dB). */
  gainDb?: number;
  /** Leading time skipped at playback (ms). */
  trimMs?: number;
  durationS?: number;
  /** Seamless loop (ambience beds). */
  loop?: boolean;
}
export interface SoundManifest { sounds?: Record<string, SoundEntry> }

/** A registered sample buffer (mono, engine rate). */
export interface SampleInfo {
  id: number;
  slot: string;
  /** Linear peak of the buffer (a −1 dBFS normalised file → 0.89). */
  peak: number;
  frames: number;
  gainDb: number;
  loop: boolean;
}

const P_REF = 20e-6;
const splToPa = (spl: number) => P_REF * Math.pow(10, spl / 20);
/** Slot families: `shot.rifle556` matches itself and numbered variants `shot.rifle556.01`, not `shot.rifle556.mid`. */
const inFamily = (slot: string, family: string) => slot === family || (slot.startsWith(family + '.') && /^\d+$/.test(slot.slice(family.length + 1)));

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
  /** Registered recorded sounds by slot (see `registerSample`, `Vorp.loadSamples`). */
  readonly samples = new Map<string, SampleInfo>();
  private lastPick = new Map<string, number>();
  private nextSampleId = 1;

  cmd(op: number, args: ArrayLike<number>) { this.cmdb.push(op, args); }

  /** Engine sample rate (samples are stored at this rate). */
  protected abstract get engineRate(): number;
  /** Copies a mono buffer (already at the engine rate) into the DSP sample bank under `id`. */
  protected abstract uploadSample(id: number, data: Float32Array): void;

  // ------------------------------------------------------------------------------------- samples
  /**
   * Registers a mono recording under a manifest slot (resampled here if `sampleRate` differs from the engine).
   * Slots form families: `shot.rifle556.01`, `.02`, … are picked at random by `sampleAt('shot.rifle556', …)`.
   */
  registerSample(slot: string, data: Float32Array, sampleRate: number, o: { gainDb?: number; loop?: boolean; trimMs?: number } = {}): SampleInfo {
    let d = data;
    if (o.trimMs && o.trimMs > 0) d = d.subarray(Math.min(d.length, Math.round((o.trimMs / 1000) * sampleRate)));
    if (Math.abs(sampleRate - this.engineRate) > 0.5) d = resampleLinear(d, sampleRate, this.engineRate);
    let peak = 0;
    for (let i = 0; i < d.length; i++) { const a = Math.abs(d[i]); if (a > peak) peak = a; }
    const prev = this.samples.get(slot);
    const id = prev?.id ?? this.nextSampleId++;
    const info: SampleInfo = { id, slot, peak: Math.max(peak, 1e-6), frames: d.length, gainDb: o.gainDb ?? 0, loop: !!o.loop };
    this.uploadSample(id, d);
    this.samples.set(slot, info);
    return info;
  }

  /** Loaded samples of one or more slot families, in registration order. */
  samplesFor(slots: string | string[]): SampleInfo[] {
    const fams = Array.isArray(slots) ? slots : [slots];
    const out: SampleInfo[] = [];
    for (const [slot, info] of this.samples) if (fams.some((f) => inFamily(slot, f))) out.push(info);
    return out;
  }
  hasSample(slots: string | string[]) { return this.samplesFor(slots).length > 0; }

  /** Random pick that never repeats the previous choice for `key` (when there is a choice). */
  protected pickSample(key: string, pool: SampleInfo[]): SampleInfo {
    const last = this.lastPick.get(key);
    let i = Math.min(pool.length - 1, (this.random() * pool.length) | 0);
    if (pool.length > 1 && pool[i].id === last) i = (i + 1 + Math.min(pool.length - 2, (this.random() * (pool.length - 1)) | 0)) % pool.length;
    this.lastPick.set(key, pool[i].id);
    return pool[i];
  }

  /**
   * Plays a registered recording so that its peak reads `peakSpl` dB SPL at 1 m (then propagated like every other
   * source: spreading, directivity, air, reflections, hearing model). `semitones` detunes it.
   */
  playSample(info: SampleInfo, pos: Vec3Like, peakSpl: number, o: SpawnOptions & { semitones?: number; loop?: boolean } = {}): VoiceHandle {
    const gainPa = splToPa(peakSpl + info.gainDb) / info.peak;
    const rate = Math.pow(2, (o.semitones ?? 0) / 12);
    return this.sample(info.id, pos, gainPa, { ...o, rate, loop: o.loop ?? info.loop });
  }

  /**
   * Picks a recording from the slot family (or families) and plays it with the standard variation (±1 semitone,
   * ±1 dB, never the same file twice in a row). Returns null when nothing is loaded for the slot — callers fall
   * back to synthesis.
   */
  sampleAt(slots: string | string[], pos: Vec3Like, peakSpl: number, o: SpawnOptions & { variation?: number; loop?: boolean } = {}): VoiceHandle | null {
    const pool = this.samplesFor(slots);
    if (!pool.length) return null;
    const v = o.variation ?? 1;
    const info = this.pickSample(Array.isArray(slots) ? slots.join('|') : slots, pool);
    return this.playSample(info, pos, peakSpl + (this.random() * 2 - 1) * v, { ...o, semitones: (this.random() * 2 - 1) * v });
  }

  /** Non-positional looping bed (wind, birds) at `peakSpl` (its peak level; beds sit ~10 dB under that in RMS). */
  loopSample(slots: string | string[], peakSpl: number, o: SpawnOptions = {}): VoiceHandle | null {
    return this.sampleAt(slots, [0, 0, 0], peakSpl, { bus: BUS.ENV, spatial: false, reverbSendDb: -90, variation: 0, loop: true, ...o });
  }

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
    const minHit = Math.min(0, ...preset.action.hits.map((h) => h.timeMs));
    const lead = -minHit; // mechanical events before ignition (hammer fall) shift the blast later
    const tailSend = vals.tailSendDb ?? 0;
    const so: SpawnOptions = {
      ...o, dir, directivityDb: vals.directivityDb, rearLpHz: vals.rearLpHz, delayMs: (o.delayMs ?? 0) + lead,
      reverbSendDb: (o.reverbSendDb ?? this.zoneSendDb) + tailSend,
    };
    // recorded report: pool by state (suppressed / full-auto / plain), falling back to pure synthesis when nothing is loaded
    const S = preset.samples;
    const supp = Math.max(0, Math.min(1, vals.suppress ?? 0));
    let pool: SampleInfo[] = [];
    if (S) {
      if (supp > 0.5 && S.suppressed) pool = this.samplesFor(S.suppressed);
      if (!pool.length && (extra.auto ?? 0) > 0.5 && S.auto) pool = this.samplesFor(S.auto);
      if (!pool.length) pool = this.samplesFor(S.shot);
    }
    const samples: VoiceHandle[] = [];
    let take: SampleInfo | null = null;
    let blast: VoiceHandle | null = null;
    if (pool.length) {
      const info = take = this.pickSample(preset.name, pool);
      const peakDb = vals.peakSpl - (vals.suppRedDb ?? 28) * supp + (vals.firstPopDb ?? 0) * supp + (preset.sampleTrimDb ?? 0) + (this.random() * 2 - 1);
      samples.push(this.playSample(info, muzzle, peakDb, { ...so, semitones: this.random() * 2 - 1 }));
      const tail = S?.shotTail ? this.samplesFor(S.shotTail) : [];
      if (tail.length) samples.push(this.playSample(this.pickSample(preset.name + '/tail', tail), muzzle, peakDb + (preset.sampleTailDb ?? -8), { ...so, semitones: (this.random() * 2 - 1) * 0.5 }));
      const bedDb = preset.synthBedDb ?? -9;
      if (bedDb > -90) {
        // synth bed: body + sub + compacted spike, no report / precursor, quieter roar
        const bed = { ...vals, peakSpl: vals.peakSpl + bedDb, crackDb: -90, precursorDb: -90, turbDb: (vals.turbDb ?? -6) - 12 };
        blast = this.spawn(KIND.GUNSHOT, muzzle, paramArray(GUNSHOT_PARAMS, bed), so);
      } else blast = samples[0];
    } else blast = this.spawn(KIND.GUNSHOT, muzzle, paramArray(GUNSHOT_PARAMS, vals), so);
    let action: VoiceHandle | null = null;
    if (actionPos && preset.action.hits.length) {
      const modes = receiverModes(preset.action.brightness);
      const hits = preset.action.hits.map((h) => ({ ...h, timeMs: h.timeMs + lead }));
      action = this.modal(modes, hits, actionPos, preset.action.level, { ...o, delayMs: o.delayMs ?? 0 });
    }
    /** `blast`: synth voice (full, or the bed under a recording); `samples`: recorded layers (empty = synthesis only); `take`: the recording picked. */
    return { blast, action, samples, take };
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
    // a loaded recording replaces the noise texture (peak ≈ noise RMS + 10 dB); the receiver ring stays
    const rec = m.sample ? this.sampleAt(m.sample, pos, (m.noise.levelSpl ?? 70) + 10 + (m.sampleDb ?? 0), { bus: BUS.IMPACTS, ...o }) : null;
    const noise = rec ?? this.noise(m.noise, pos, o);
    const ring = m.ring ? this.modal(receiverModes(m.ring.brightness), m.ring.hits, pos, m.ring.level, o) : null;
    return { noise, ring, recorded: rec !== null };
  }

  /**
   * Surface impact (`IMPACTS[material]`, see presets) at `pos`; `scaleDb` adjusts the level. A loaded recording in
   * slot family `impact.<material>` replaces the noise synthesis.
   */
  impact(material: string, pos: Vec3Like, scaleDb = 0, o: SpawnOptions = {}) {
    const p = { ...(IMPACTS[material] ?? IMPACTS.dirt) };
    p.levelSpl = (p.levelSpl ?? 110) + scaleDb;
    return this.sampleAt(`impact.${material}`, pos, p.levelSpl, { bus: BUS.IMPACTS, ...o }) ?? this.noise(p, pos, { bus: BUS.IMPACTS, ...o });
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

  protected get engineRate() { return this.ctx.sampleRate; }
  protected uploadSample(id: number, data: Float32Array) {
    const copy = data.slice();
    this.node.port.postMessage({ type: 'sample', id, data: copy }, [copy.buffer]);
  }

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

  /**
   * Loads every recording of a manifest's `sounds` section (fetched + decoded in parallel, mixed to mono at the
   * context rate) and registers it under its slot. `prefetched` lets the host download the files before the
   * AudioContext exists (vorp starts on the first user gesture) so only decoding happens here. Failures are
   * logged and skipped: a missing slot simply keeps the synthesized version. Resolves to the loaded slots.
   */
  async loadSamples(manifest: SoundManifest, baseUrl = '', prefetched?: Map<string, ArrayBuffer>): Promise<string[]> {
    const entries = Object.entries(manifest.sounds ?? {});
    const loaded: string[] = [];
    await Promise.all(entries.map(async ([slot, e]) => {
      try {
        let buf = prefetched?.get(slot);
        if (!buf) {
          const r = await fetch(baseUrl + e.file);
          if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
          buf = await r.arrayBuffer();
        }
        const audio = await this.ctx.decodeAudioData(buf.slice(0)); // decodeAudioData detaches its input
        const mono = new Float32Array(audio.length);
        for (let c = 0; c < audio.numberOfChannels; c++) { const d = audio.getChannelData(c); for (let i = 0; i < d.length; i++) mono[i] += d[i] / audio.numberOfChannels; }
        this.registerSample(slot, mono, audio.sampleRate, { gainDb: e.gainDb, loop: e.loop, trimMs: e.trimMs });
        loaded.push(slot);
      } catch (err) {
        console.warn(`[vorp] recorded sound "${slot}" (${e.file}) not loaded:`, err);
      }
    }));
    loaded.sort();
    console.info(`[vorp] recorded sounds: ${loaded.length}/${entries.length} loaded${loaded.length ? ' — ' + loaded.join(', ') : ''}`);
    return loaded;
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
  vorp_sample_set(id: number, ptr: number, len: number): void;
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

  protected get engineRate() { return this.sampleRate; }
  protected uploadSample(id: number, data: Float32Array) {
    const ptr = this.ex.vorp_alloc(data.length * 4);
    new Float32Array(this.ex.memory.buffer, ptr, data.length).set(data); // fresh view: alloc may have grown memory
    this.ex.vorp_sample_set(id, ptr, data.length);
    this.ex.vorp_free(ptr, data.length * 4);
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

/** Linear resampling (good enough for foley; shots are converted offline by tools/fetch-sounds.mjs). */
export function resampleLinear(data: Float32Array, from: number, to: number): Float32Array {
  const n = Math.max(1, Math.round((data.length * to) / from));
  const out = new Float32Array(n);
  const step = from / to;
  for (let i = 0; i < n; i++) {
    const x = i * step, j = Math.min(data.length - 1, x | 0), f = x - j;
    const a = data[j], b = data[Math.min(data.length - 1, j + 1)];
    out[i] = a + (b - a) * f;
  }
  return out;
}

/** Decode a PCM / float WAV (8/16/24/32-bit) into planar channels — for Node tools and tests (browsers use decodeAudioData). */
export function decodeWav(buf: ArrayBuffer): { sampleRate: number; channels: Float32Array[] } {
  const v = new DataView(buf);
  const tag = (o: number) => String.fromCharCode(v.getUint8(o), v.getUint8(o + 1), v.getUint8(o + 2), v.getUint8(o + 3));
  if (tag(0) !== 'RIFF' || tag(8) !== 'WAVE') throw new Error('not a WAV file');
  let o = 12, fmt: { format: number; channels: number; sampleRate: number; bits: number } | null = null, data: [number, number] | null = null;
  while (o + 8 <= v.byteLength) {
    const id = tag(o), len = v.getUint32(o + 4, true);
    if (id === 'fmt ') {
      let format = v.getUint16(o + 8, true);
      if (format === 0xfffe && len >= 26) format = v.getUint16(o + 32, true); // WAVE_FORMAT_EXTENSIBLE: sub-format
      fmt = { format, channels: v.getUint16(o + 10, true), sampleRate: v.getUint32(o + 12, true), bits: v.getUint16(o + 22, true) };
    } else if (id === 'data') { data = [o + 8, Math.min(len, v.byteLength - o - 8)]; break; }
    o += 8 + len + (len & 1);
  }
  if (!fmt || !data) throw new Error('WAV without fmt/data chunk');
  const { channels: nc, bits } = fmt;
  const bps = bits / 8, frames = Math.floor(data[1] / (bps * nc));
  const channels = Array.from({ length: nc }, () => new Float32Array(frames));
  for (let i = 0; i < frames; i++) {
    for (let c = 0; c < nc; c++) {
      const p = data[0] + (i * nc + c) * bps;
      let x: number;
      if (fmt.format === 3) x = bits === 64 ? v.getFloat64(p, true) : v.getFloat32(p, true);
      else if (bits === 8) x = (v.getUint8(p) - 128) / 128;
      else if (bits === 16) x = v.getInt16(p, true) / 32768;
      else if (bits === 24) x = ((v.getUint8(p) | (v.getUint8(p + 1) << 8) | (v.getInt8(p + 2) << 16)) << 8) / 2147483648;
      else x = v.getInt32(p, true) / 2147483648;
      channels[c][i] = x;
    }
  }
  return { sampleRate: fmt.sampleRate, channels };
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
