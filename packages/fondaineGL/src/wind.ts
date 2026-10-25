// Wind: one engine-wide model feeding foliage bend, particle drift, cloud drift and (through a hook) audio.
// A mean vector + a gust model (1D Perlin fBm over time: slow surges with sharp peaks, a little direction
// veer) + fine turbulence. Deterministic in time, so a given second of wind is reproducible.

import { vec3, Vec3 } from './math';

export interface WindSettings {
  /** Mean wind speed near the ground (m/s). Calm < 1, light breeze 2–3, fresh 8–10, gale 17+. */
  speed: number;
  /** Compass heading the wind blows TOWARDS (deg): 0 = north (−Z), 90 = east (+X). Same convention as the sun azimuth. */
  direction: number;
  /** Gust strength 0..1: peaks reach ≈ speed × (1 + 1.7 × gustiness). */
  gustiness: number;
  /** Rate of the gust pattern (Hz). Real surface gusts ≈ 0.05–0.3 Hz. */
  gustFrequency: number;
  /** Small-scale flutter 0..1 (foliage shiver, particle jitter). */
  turbulence: number;
  /** Foliage response: tip displacement of a 1 m blade per m/s (m). */
  foliageBend: number;
  /** Wind speed aloft (cloud level) relative to the surface wind. ≈ 2–4 at 1–3 km. */
  aloftFactor: number;
  /** Clockwise veer of the wind aloft (deg). Ekman spiral ≈ 20–40. */
  aloftVeer: number;
}

export const defaultWind: WindSettings = {
  speed: 1.7,
  direction: 111,
  gustiness: 0.35,
  gustFrequency: 0.12,
  turbulence: 0.25,
  foliageBend: 0.045,
  aloftFactor: 2.5,
  aloftVeer: 25,
};

/** Smooth 1D gradient noise, range ≈ [-1, 1]. */
function gnoise1(x: number, seed: number): number {
  const i = Math.floor(x), f = x - i;
  const h = (n: number) => { const s = Math.sin((n + seed * 131.7) * 12.9898) * 43758.5453; return (s - Math.floor(s)) * 2 - 1; };
  const u = f * f * f * (f * (f * 6 - 15) + 10);
  const a = h(i) * f, b = h(i + 1) * (f - 1);
  return (a + (b - a) * u) * 2;
}
function fbm1(x: number, seed: number): number {
  return (gnoise1(x, seed) * 0.5 + gnoise1(x * 2.13 + 7.7, seed + 1) * 0.3 + gnoise1(x * 4.7 + 3.1, seed + 2) * 0.2) / 0.78;
}

export class Wind {
  readonly settings: WindSettings = { ...defaultWind };
  /** Instantaneous wind vector (m/s) including gusts and turbulence. */
  readonly vector: Vec3 = vec3.create();
  /** Instantaneous unit direction (horizontal). */
  readonly direction: Vec3 = vec3.create(0, 0, -1);
  /** Gust factor this frame (1 = mean wind). */
  gustFactor = 1;
  /** Fired at the onset of each gust with its strength (0..1 relative to the strongest possible gust). */
  readonly onGust: ((strength: number, vector: Vec3) => void)[] = [];
  /**
   * Audio hook: the engine forwards the wind to the ambience bed (`AudioSystem.setWind`) when the
   * settings change. Set to null to drive the wind sound yourself.
   */
  onSettingsChanged: ((s: WindSettings) => void) | null = null;
  /** Model time (s). */
  time = 0;
  private lastKey = '';
  private inGust = false;

  constructor(s: Partial<WindSettings> = {}) { Object.assign(this.settings, s); this.update(0); }

  /** Instantaneous speed (m/s). */
  get speed(): number { return vec3.length(this.vector); }

  /** Set any subset of the parameters. `direction` may also be a vector (its heading is used; speed too when no speed is given). */
  set(o: Partial<Omit<WindSettings, 'direction'>> & { direction?: number | ArrayLike<number> }): this {
    const { direction, ...rest } = o;
    Object.assign(this.settings, rest);
    if (typeof direction === 'number') this.settings.direction = direction;
    else if (direction) {
      const x = direction[0], z = direction.length >= 3 ? direction[2] : direction[1];
      this.settings.direction = (Math.atan2(x, -z) * 180) / Math.PI;
      if (o.speed === undefined) this.settings.speed = Math.hypot(x, z);
    }
    this.update(0);
    return this;
  }

  /** Gust factor (multiplier of the mean speed) at model time t. */
  gust(t: number): number {
    const s = this.settings;
    const g = fbm1(t * s.gustFrequency, 3);
    const peak = Math.pow(Math.max(0, g - 0.15) / 0.85, 1.6);
    return Math.max(0.15, 1 + s.gustiness * (0.45 * g + 1.25 * peak));
  }

  /** Heading (deg) at time t including gust veer. */
  heading(t: number): number {
    const s = this.settings;
    return s.direction + s.gustiness * 22 * fbm1(t * s.gustFrequency * 0.6 + 50, 11);
  }

  /** Mean wind vector at an altitude above ground (m/s, [x, y, z]) — stronger and veered aloft. */
  aloft(altitude: number, out: Vec3 = vec3.create()): Vec3 {
    const s = this.settings;
    const k = Math.min(1, Math.max(0, altitude) / 1500) ** 0.4;
    const speed = s.speed * (1 + (s.aloftFactor - 1) * k);
    const h = ((s.direction + s.aloftVeer * k) * Math.PI) / 180;
    return vec3.set(out, Math.sin(h) * speed, 0, -Math.cos(h) * speed);
  }

  /** Advance the model by dt seconds (the renderer calls this once per frame). */
  update(dt: number) {
    this.time += dt;
    const s = this.settings;
    const t = this.time;
    const gf = this.gust(t);
    const h = (this.heading(t) * Math.PI) / 180;
    const spd = s.speed * gf;
    const turb = s.turbulence * s.speed * 0.18;
    const tx = gnoise1(t * 3.1, 21) * turb, tz = gnoise1(t * 2.7 + 9, 22) * turb;
    vec3.set(this.direction, Math.sin(h), 0, -Math.cos(h));
    vec3.set(this.vector, this.direction[0] * spd + tx, 0, this.direction[2] * spd + tz);
    this.gustFactor = gf;
    // gust onset events
    const strength = Math.min(1, Math.max(0, (gf - 1) / Math.max(1e-3, 1.7 * s.gustiness)));
    if (!this.inGust && strength > 0.3) { this.inGust = true; for (const f of this.onGust) f(strength, this.vector); }
    else if (this.inGust && strength < 0.12) this.inGust = false;
    const key = `${s.speed}|${s.gustiness}|${s.gustFrequency}|${s.turbulence}`;
    if (key !== this.lastKey) { this.lastKey = key; this.onSettingsChanged?.(s); }
  }
}
