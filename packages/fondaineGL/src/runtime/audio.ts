// AudioSystem: connects vorp to the world — listener from the camera, geometric early reflections
// (image sources from physics raycasts), occlusion, distant reflectors, and supersonic cracks from
// live projectiles passing the listener.

import { Vorp, Tap, VoiceHandle, GunshotPreset, ZonePreset, whithamNWave, speedOfSound, BUS, SpawnOptions, SoundManifest } from '@fondaine/vorp';
import { Camera, vec3, Vec3 } from '../gl';
import { PhysicsWorld } from './physics';

export interface SurfaceAcoustics {
  /** Pressure reflection coefficient (0..1). Concrete ≈ 0.97, wood ≈ 0.85, packed dirt ≈ 0.7, grass ≈ 0.5. */
  reflection: number;
  /** Absorption lowpass on reflection (Hz). */
  lowpassHz: number;
}

export interface AudioSettings {
  reflections: boolean;
  /** Listener probe rays for nearby reflecting surfaces. */
  probeRays: number;
  probeDistance: number;
  occlusion: boolean;
  occlusionDb: number;
  occlusionLowpassHz: number;
  cracks: boolean;
  /** Let the engine's Wind system drive the ambience wind bed (level, gustiness, gust rate). */
  windAmbience: boolean;
  /** Start recorded ambience beds (`amb.birds`, `amb.wind` slots) when they are loaded. */
  ambienceBeds: boolean;
}

export class AudioSystem {
  vorp: Vorp | null = null;
  readonly settings: AudioSettings = { reflections: true, probeRays: 14, probeDistance: 45, occlusion: true, occlusionDb: -14, occlusionLowpassHz: 1100, cracks: true, windAmbience: true, ambienceBeds: true };
  /** Surface acoustics by physics material id. */
  readonly surfaces = new Map<number, SurfaceAcoustics>();
  readonly listener = { position: vec3.create(), forward: vec3.create(0, 0, -1), up: vec3.create(0, 1, 0) };
  zone: ZonePreset | null = null;
  /** Origin for zone far-reflectors (e.g. the firing line). */
  readonly zoneOrigin = vec3.create();
  private pending: (() => void)[] = [];
  private creating: Promise<Vorp> | null = null;
  private crackDone = new Set<number>();
  private prevProj = new Map<number, Vec3>();
  tempC = 18;

  constructor(private physics: PhysicsWorld | null, private urls: { wasm: string; worklet: string }) {}

  /** Create/resume the AudioContext. Call from a user gesture (click / key). */
  async start(): Promise<Vorp> {
    if (this.vorp) { await this.vorp.resume(); return this.vorp; }
    if (!this.creating) {
      this.creating = Vorp.create({ wasmUrl: this.urls.wasm, workletUrl: this.urls.worklet }).then((v) => {
        this.vorp = v;
        if (this.zone) v.setZone(this.zone);
        v.setAtmosphere(this.tempC, 0.55);
        for (const f of this.pending) f();
        this.pending = [];
        return v;
      });
    }
    const v = await this.creating;
    await v.resume();
    return v;
  }

  /** Run `fn` now if audio is up, otherwise once it starts. */
  whenReady(fn: () => void) { if (this.vorp) fn(); else this.pending.push(fn); }

  /** Slots of the recorded sounds that are registered with vorp (empty until `loadSoundAssets` ran and audio started). */
  readonly sounds = new Set<string>();
  private beds: VoiceHandle[] = [];

  /**
   * Recorded sounds (`sounds` section of `assets/manifest.json`, written by `tools/fetch-sounds.mjs`). The files are
   * fetched right away (no AudioContext needed) and decoded + registered the moment vorp starts (first click), so
   * the loading screen is not held up by audio. Anything missing or failing keeps its synthesized version.
   * `manifest` is the manifest URL or the parsed manifest object (then `baseUrl` is where its files live).
   * Resolves once the files are fetched, with the slots that will be registered.
   */
  async loadSoundAssets(manifest: string | SoundManifest, baseUrl?: string): Promise<string[]> {
    let m: SoundManifest;
    let base = baseUrl;
    if (typeof manifest === 'string') {
      base ??= manifest.slice(0, manifest.lastIndexOf('/') + 1);
      try {
        const r = await fetch(manifest, { cache: 'no-cache' });
        if (!r.ok) return [];
        m = (await r.json()) as SoundManifest;
      } catch { return []; }
    } else m = manifest;
    base ??= '';
    const entries = Object.entries(m.sounds ?? {});
    if (!entries.length) return [];
    const buffers = new Map<string, ArrayBuffer>();
    await Promise.all(entries.map(async ([slot, e]) => {
      try {
        const r = await fetch(base + e.file);
        if (r.ok) buffers.set(slot, await r.arrayBuffer());
        else console.warn(`[audio] recorded sound "${slot}": ${base + e.file} → ${r.status}`);
      } catch (err) { console.warn(`[audio] recorded sound "${slot}" not fetched`, err); }
    }));
    const only: SoundManifest = { sounds: Object.fromEntries(entries.filter(([slot]) => buffers.has(slot))) };
    this.whenReady(() => {
      void this.vorp!.loadSamples(only, base, buffers).then((loaded) => {
        for (const s of loaded) this.sounds.add(s);
        this.startBeds();
      });
    });
    return [...buffers.keys()];
  }

  /** Looping ambience beds from recordings (birds, wind) under the synthesized wind. */
  private startBeds() {
    const v = this.vorp;
    if (!v || !this.settings.ambienceBeds || this.beds.length) return;
    const birds = v.loopSample('amb.birds', 52);
    if (birds) this.beds.push(birds);
    const wind = v.loopSample('amb.wind', 48);
    if (wind) this.beds.push(wind);
  }

  setZone(z: ZonePreset) { this.zone = z; this.vorp?.setZone(z); if (this.lastWind) this.setWind(...this.lastWind); }

  private lastWind: [number, number, number] | null = null;
  /**
   * Drive the ambience wind bed from the engine's Wind system (speed m/s, gustiness 0..1, gust rate Hz).
   * Called by the Engine whenever `engine.wind` settings change; a zone's own ambience is overridden.
   */
  setWind(speed: number, gustiness: number, gustRate: number) {
    this.lastWind = [speed, gustiness, gustRate];
    if (!this.settings.windAmbience) return;
    const spl = speed < 0.05 ? 0 : 28 + 26 * Math.log10(1 + speed);
    const toneHz = 450 + 60 * speed;
    this.whenReady(() => this.vorp?.setAmbience({ windSpl: spl, windGust: gustiness, windGustRate: gustRate, windToneHz: toneHz }));
  }

  surface(material: number): SurfaceAcoustics { return this.surfaces.get(material) ?? { reflection: 0.8, lowpassHz: 6000 }; }

  update(camera: Camera) {
    camera.forward(this.listener.forward);
    camera.up(this.listener.up);
    vec3.copy(this.listener.position, camera.position);
    const v = this.vorp;
    if (!v) return;
    v.setListener(this.listener.position, this.listener.forward, this.listener.up);
    if (this.settings.cracks && this.physics) this.trackCracks(v);
    v.flush();
  }

  // ------------------------------------------------------------------------------------------- acoustics
  /**
   * Early-reflection taps for a source: ground image, nearby surfaces found by listener probe rays (image
   * sources mirrored across the hit plane), and the zone's distant reflectors (berms, tree lines).
   * `directivityDb` attenuates paths leaving the source away from `dir` (muzzle blast directivity).
   */
  computeTaps(src: ArrayLike<number>, dir: ArrayLike<number> | null, directivityDb = 0): Tap[] {
    const P = this.physics;
    const L = this.listener.position;
    const taps: (Tap & { energy: number })[] = [];
    const S = vec3.clone(src);
    const dirN = dir ? vec3.normalize(vec3.create(), vec3.clone(dir)) : null;
    const dirGain = (depart: Vec3) => {
      if (!dirN || directivityDb <= 0) return 1;
      const c = vec3.dot(dirN, depart);
      return Math.pow(10, (-directivityDb * (1 - c) * 0.5) / 20);
    };
    const addImage = (img: Vec3, planePoint: Vec3, planeN: Vec3, mat: number) => {
      const ray = vec3.sub(vec3.create(), L, img);
      const path = vec3.length(ray);
      if (path < 0.2) return;
      // reflection point = where img→listener crosses the plane
      const denom = vec3.dot(ray, planeN);
      if (Math.abs(denom) < 1e-5) return;
      const t = vec3.dot(vec3.sub(vec3.create(), planePoint, img), planeN) / denom;
      if (t <= 0 || t >= 1) return;
      const R = vec3.scaleAndAdd(vec3.create(), img, ray, t);
      const depart = vec3.normalize(vec3.create(), vec3.sub(vec3.create(), R, S));
      const arrive = vec3.normalize(vec3.create(), vec3.sub(vec3.create(), R, L));
      const sa = this.surface(mat);
      const gain = (sa.reflection * dirGain(depart)) / path;
      taps.push({ path, gain, lowpassHz: sa.lowpassHz, dir: arrive, energy: gain * gain });
    };
    if (P && this.settings.reflections) {
      // ground (and any floor) below the source
      const down = P.raycast(S, [0, -1, 0], 50, false);
      if (down) addImage(vec3.scaleAndAdd(vec3.create(), S, down.normal, -2 * vec3.dot(vec3.sub(vec3.create(), S, down.point), down.normal)), down.point, down.normal, down.material);
      // ceilings / walls around the listener
      const n = this.settings.probeRays;
      for (let i = 0; i < n; i++) {
        const golden = 2.399963 * i;
        const y = i === n - 1 ? 1 : (i / (n - 1)) * 0.9 - 0.25; // mostly horizontal + one up
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const d = vec3.create(Math.cos(golden) * r, y, Math.sin(golden) * r);
        const hit = P.raycast(L, d, this.settings.probeDistance, false);
        if (!hit || hit.t < 0.3) continue;
        const nrm = hit.normal;
        const dist = vec3.dot(vec3.sub(vec3.create(), S, hit.point), nrm);
        if (dist <= 0) continue;
        const img = vec3.scaleAndAdd(vec3.create(), S, nrm, -2 * dist);
        addImage(img, hit.point, nrm, hit.material);
      }
    }
    // distant reflectors from the zone (outdoor slap echoes)
    for (const f of this.zone?.farReflectors ?? []) {
      const az = (f.azimuth * Math.PI) / 180;
      const R = vec3.create(this.zoneOrigin[0] + Math.sin(az) * f.distance, S[1], this.zoneOrigin[2] - Math.cos(az) * f.distance);
      const path = vec3.distance(S, R) + vec3.distance(R, L);
      const depart = vec3.normalize(vec3.create(), vec3.sub(vec3.create(), R, S));
      const arrive = vec3.normalize(vec3.create(), vec3.sub(vec3.create(), R, L));
      // a reflector of finite size: spreading over the full path, plus extra scatter loss
      const gain = (f.reflectivity * dirGain(depart)) / path;
      taps.push({ path, gain, lowpassHz: f.lowpassHz, dir: arrive, energy: gain * gain });
    }
    taps.sort((a, b) => b.energy - a.energy);
    return taps.slice(0, 10);
  }

  /** Occlusion of the direct path source→listener by static geometry. */
  occlusionOf(src: ArrayLike<number>): { db: number; lowpass: number } | null {
    if (!this.physics || !this.settings.occlusion) return null;
    const d = vec3.sub(vec3.create(), this.listener.position, vec3.clone(src));
    const len = vec3.length(d);
    if (len < 0.3) return null;
    vec3.scale(d, d, 1 / len);
    const start = vec3.scaleAndAdd(vec3.create(), vec3.clone(src), d, 0.05);
    const hit = this.physics.raycast(start, d, len - 0.15, false);
    if (!hit) return null;
    return { db: this.settings.occlusionDb, lowpass: this.settings.occlusionLowpassHz };
  }

  /** Spawns a positioned sound with reflections + occlusion applied. */
  private finish(h: VoiceHandle, pos: ArrayLike<number>, dir: ArrayLike<number> | null, directivityDb: number) {
    h.setTaps(this.computeTaps(pos, dir, directivityDb));
    const occ = this.occlusionOf(pos);
    if (occ) h.setOcclusion(occ.db, occ.lowpass);
  }

  gunshot(preset: GunshotPreset, muzzle: ArrayLike<number>, dir: ArrayLike<number>, actionPos: ArrayLike<number> | null, extra: Record<string, number> = {}) {
    const v = this.vorp;
    if (!v) return null;
    const r = v.gunshot(preset, muzzle, dir, actionPos, extra);
    // rapid fire ducks the distant slaps along with the reverb send (see `Vorp.shotWet`)
    const farGain = Math.pow(10, -r.duckDb / 20);
    const taps = this.computeTaps(muzzle, dir, preset.params.directivityDb ?? 9).map((t) => (t.path > 30 ? { ...t, gain: t.gain * farGain } : t));
    const occ = this.occlusionOf(muzzle);
    // the recorded tail layer (samples[1]) is already the far field, so it gets no image-source taps
    const report = r.samples.length ? r.samples[0] : r.blast;
    for (const h of new Set([r.blast, ...r.samples])) {
      if (h === report || h === r.blast) h.setTaps(taps);
      if (occ) h.setOcclusion(occ.db, occ.lowpass);
    }
    if (r.action && actionPos) r.action.setTaps(this.computeTaps(actionPos, null, 0).slice(0, 4));
    return r;
  }

  /** Surface impact from the vorp IMPACTS presets, or the recorded `impact.<material>` slot when loaded. */
  impact(material: string, pos: ArrayLike<number>, scaleDb = 0) {
    const v = this.vorp;
    if (!v) return null;
    const h = v.impact(material, pos, scaleDb);
    this.finish(h, pos, null, 0);
    return h;
  }

  modal(modes: Parameters<Vorp['modal']>[0], hits: Parameters<Vorp['modal']>[1], pos: ArrayLike<number>, level = 1, o: SpawnOptions = {}) {
    const v = this.vorp;
    if (!v) return null;
    const h = v.modal(modes, hits, pos, level, o);
    this.finish(h, pos, null, 0);
    return h;
  }

  /** Mechanical weapon sound from the vorp MECH presets (magazine release, seat, slide rack, bolt catch, …), with reflections + occlusion. */
  mech(name: Parameters<Vorp['mech']>[0], pos: ArrayLike<number>, o: SpawnOptions = {}) {
    const v = this.vorp;
    if (!v) return null;
    const r = v.mech(name, pos, o);
    this.finish(r.noise, pos, null, 0);
    if (r.ring) this.finish(r.ring, pos, null, 0);
    return r;
  }

  /** A quiet human exhale at `pos` (the shooter's mouth). */
  breath(pos: ArrayLike<number>, o: SpawnOptions = {}) {
    const v = this.vorp;
    if (!v) return null;
    return v.breath(pos, o);
  }

  /** One footstep (`FOOTSTEPS[surface]` values at 1 m); with `surface` given, a loaded `step.<surface>` recording replaces the synthesis. */
  footstep(values: Record<string, number>, pos: ArrayLike<number>, surface?: string) {
    const v = this.vorp;
    if (!v) return null;
    const o = { bus: BUS.ENV, reverbSendDb: v.zoneSendDb };
    return (surface ? v.sampleAt(`step.${surface}`, pos, values.levelSpl ?? 70, o) : null) ?? v.noise(values, pos, o);
  }

  // ------------------------------------------------------------------------------------------- cracks
  /** Projectile params by userId for crack synthesis (calibre, length). */
  readonly projectileInfo = new Map<number, { diameter: number; length: number }>();

  private trackCracks(v: Vorp) {
    const P = this.physics!;
    const L = this.listener.position;
    const c = speedOfSound(this.tempC);
    const live = P.projectiles();
    const seen = new Set<number>();
    for (const pr of live) {
      seen.add(pr.id);
      const prev = this.prevProj.get(pr.id);
      this.prevProj.set(pr.id, vec3.clone(pr.position));
      if (!prev || this.crackDone.has(pr.id)) continue;
      const speed = vec3.length(pr.velocity);
      if (speed <= c * 1.01) continue;
      // closest approach on the segment prev→now
      const seg = vec3.sub(vec3.create(), pr.position, prev);
      const sl2 = vec3.lengthSq(seg);
      if (sl2 < 1e-8) continue;
      const t = vec3.dot(vec3.sub(vec3.create(), L, prev), seg) / sl2;
      if (t < 0 || t > 1) continue; // not passing the listener during this step
      const closest = vec3.scaleAndAdd(vec3.create(), prev, seg, t);
      const miss = vec3.distance(closest, L);
      if (miss > 60 || miss < 0.02) continue;
      // listener must be downrange of the shooter's ears (shooter does not hear his own crack separately)
      const traveled = vec3.distance(closest, prev);
      void traveled;
      const info = this.projectileInfo.get(pr.userId) ?? { diameter: 0.0057, length: 0.023 };
      const nw = whithamNWave({ mach: speed / c, diameter: info.diameter, length: info.length, missDistance: miss, c });
      // the N-wave emanates from the Mach cone: arrival direction tilted back along the trajectory
      const dirN = vec3.normalize(vec3.create(), seg);
      const sinMu = c / speed;
      const back = vec3.scaleAndAdd(vec3.create(), closest, dirN, -miss * Math.sqrt(1 - sinMu * sinMu) / Math.max(sinMu, 1e-3));
      const h = v.crack(nw.peakPa, nw.duration, back, { bus: BUS.WEAPONS });
      h.setTaps(this.computeTaps(back, null, 0));
      this.crackDone.add(pr.id);
    }
    for (const id of [...this.prevProj.keys()]) if (!seen.has(id)) { this.prevProj.delete(id); this.crackDone.delete(id); }
  }
}
