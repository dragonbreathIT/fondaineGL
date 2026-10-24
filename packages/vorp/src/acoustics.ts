// Physical acoustics models used to parameterise vorp sources from real-world quantities.

export interface Mode { freq: number; t60: number; amp: number }

/** Speed of sound in air (m/s). */
export const speedOfSound = (tempC: number) => 331.3 * Math.sqrt(1 + tempC / 273.15);

/**
 * Supersonic projectile N-wave at the listener (Whitham 1952, as used by Stoughton 1997 for small arms):
 *   Δp/p0 = 0.53 (M²−1)^(1/8) d / (b^(3/4) l^(1/4))
 *   T     = 1.82 M b^(1/4) d / (c (M²−1)^(3/8) l^(1/4))
 * M Mach number at closest approach, d calibre (m), l projectile length (m), b miss distance (m).
 */
export function whithamNWave(o: { mach: number; diameter: number; length: number; missDistance: number; ambientPa?: number; c?: number }) {
  const M = Math.max(o.mach, 1.0001);
  const b = Math.max(o.missDistance, 0.05);
  const p0 = o.ambientPa ?? 101325;
  const c = o.c ?? 343;
  const k = Math.pow(M * M - 1, 0.125);
  const peakPa = p0 * 0.53 * k * o.diameter / (Math.pow(b, 0.75) * Math.pow(o.length, 0.25));
  const duration = (1.82 * M * Math.pow(b, 0.25) * o.diameter) / (c * Math.pow(M * M - 1, 0.375) * Math.pow(o.length, 0.25));
  return { peakPa, duration };
}

export interface PlateSpec {
  /** Plate width / height / thickness (m). */
  width: number;
  height: number;
  thickness: number;
  /** Young's modulus (Pa), density (kg/m³), Poisson ratio. AR500 steel: 200e9, 7850, 0.29. */
  E?: number;
  rho?: number;
  nu?: number;
  /** Hit position in normalised plate coordinates (0..1). */
  hitU?: number;
  hitV?: number;
  /** Highest mode frequency to include (Hz). */
  maxFreq?: number;
  maxModes?: number;
  /** Damping: T60 of the fundamental (s). Hanging gongs ≈ 2–4 s, bolted plates ≈ 0.3–1 s. */
  t60Fundamental?: number;
  /** How quickly higher modes die (exponent on f0/f). */
  dampingSlope?: number;
  /** Amplitude scale (Pa at 1 m for a unit hit). */
  level?: number;
}

/**
 * Modes of a thin rectangular plate (Kirchhoff, simply-supported approximation):
 *   f_mn = (π/2) √(D/(ρh)) ((m/a)² + (n/b)²),   D = E h³ / (12(1−ν²))
 * Mode amplitudes follow the mode shape at the hit point, so where you hit the plate changes the timbre.
 */
export function plateModes(s: PlateSpec): Mode[] {
  const E = s.E ?? 200e9, rho = s.rho ?? 7850, nu = s.nu ?? 0.29, h = s.thickness;
  const D = (E * h * h * h) / (12 * (1 - nu * nu));
  const k = (Math.PI / 2) * Math.sqrt(D / (rho * h));
  const u = s.hitU ?? 0.43, v = s.hitV ?? 0.38;
  const maxF = s.maxFreq ?? 12000;
  const modes: Mode[] = [];
  for (let m = 1; m <= 12; m++) {
    for (let n = 1; n <= 12; n++) {
      const f = k * ((m / s.width) ** 2 + (n / s.height) ** 2);
      if (f > maxF) continue;
      const shape = Math.sin(m * Math.PI * u) * Math.sin(n * Math.PI * v);
      modes.push({ freq: f, t60: 0, amp: Math.abs(shape) });
    }
  }
  modes.sort((a, b) => a.freq - b.freq);
  const f0 = modes[0]?.freq ?? 300;
  const T0 = s.t60Fundamental ?? 2.2;
  const slope = s.dampingSlope ?? 0.55;
  const level = s.level ?? 30;
  const out = modes.slice(0, s.maxModes ?? 40).map((md) => ({
    freq: md.freq,
    t60: Math.max(0.05, Math.min(6, T0 * Math.pow(f0 / md.freq, slope))),
    // radiation efficiency rises then flattens above coincidence; keep a gentle tilt
    amp: md.amp * level / (1 + md.freq / 3500),
  }));
  return out;
}

/** Empirical modes of a rifle receiver / bolt carrier group (aluminium receiver, steel BCG). */
export function receiverModes(brightness = 1): Mode[] {
  const base = [1180, 2230, 3410, 4870, 6620, 8900, 11200];
  const t60 = [0.06, 0.05, 0.04, 0.032, 0.025, 0.018, 0.012];
  const amp = [0.55, 0.6, 0.5, 0.36, 0.27, 0.18, 0.1];
  return base.map((f, i) => ({ freq: f * brightness, t60: t60[i], amp: amp[i] }));
}

/** Spent brass casing (thin cylindrical shell): bright, short ring when it hits a hard floor. */
export function casingModes(lengthM = 0.045, diameterM = 0.0095): Mode[] {
  // scale a measured 5.56 case spectrum by size
  const s = (0.045 / lengthM) * 0.6 + (0.0095 / diameterM) * 0.4;
  const base = [3950, 6100, 8350, 10800, 13600, 16100];
  const t60 = [0.35, 0.28, 0.22, 0.16, 0.12, 0.08];
  const amp = [0.8, 0.9, 0.7, 0.5, 0.35, 0.2];
  return base.map((f, i) => ({ freq: f * s, t60: t60[i], amp: amp[i] }));
}

/** Pack modal synthesis parameters for SPAWN (kind MODAL). */
export function modalParams(modes: Mode[], hits: { timeMs: number; amp: number; contactMs: number; noiseDb?: number }[], level = 1, seed = 0): Float32Array {
  const m = modes.slice(0, 48), h = hits.slice(0, 8);
  const out = new Float32Array(4 + m.length * 3 + h.length * 4);
  out[0] = level; out[1] = m.length; out[2] = h.length; out[3] = seed;
  m.forEach((md, i) => { out[4 + i * 3] = md.freq; out[5 + i * 3] = md.t60; out[6 + i * 3] = md.amp; });
  const hb = 4 + m.length * 3;
  h.forEach((ht, i) => { out[hb + i * 4] = ht.timeMs; out[hb + i * 4 + 1] = ht.amp; out[hb + i * 4 + 2] = ht.contactMs; out[hb + i * 4 + 3] = ht.noiseDb ?? -200; });
  return out;
}

/** Critical distance → reverb send (dB) relative to the 1 m direct sound. */
export const sendFromCriticalDistance = (rc: number) => -20 * Math.log10(Math.max(rc, 0.1));

/**
 * Sabine estimate of a room's critical distance: r_c ≈ 0.057 √(V / RT60)  (directivity factor 1).
 * V in m³, RT60 in s.
 */
export const criticalDistance = (volume: number, rt60: number) => 0.057 * Math.sqrt(volume / Math.max(rt60, 0.05));

// ------------------------------------------------------------------------------------------ reflections

export interface ReflectorMaterial {
  /** Pressure reflection coefficient (0..1). Concrete ≈ 0.97, wood ≈ 0.85, packed dirt ≈ 0.7, grass ≈ 0.5. */
  reflection: number;
  /** Absorption lowpass of the surface (Hz). */
  lowpassHz: number;
}

export interface ReflectionTap { path: number; gain: number; lowpassHz: number; dir: number[] }

export interface ShoeboxSpec {
  /** Axis-aligned bounds of the space (m). */
  min: ArrayLike<number>;
  max: ArrayLike<number>;
  /** Materials per face; a missing face (e.g. the open front of a covered firing point) is `null`. */
  faces: { floor: ReflectorMaterial | null; ceiling: ReflectorMaterial | null; left: ReflectorMaterial | null; right: ReflectorMaterial | null; back: ReflectorMaterial | null; front: ReflectorMaterial | null };
  /** Source facing direction + front/rear directivity (dB) applied to the departing ray of each image. */
  dir?: ArrayLike<number>;
  directivityDb?: number;
}

/**
 * First-order image sources of `src` in a shoebox around the listener (floor, ceiling, walls). Used by the lab
 * and the offline reference renders for a covered firing point; the runtime computes the same from physics
 * raycasts. Returns taps sorted loudest first (max 10), in the format `VoiceHandle.setTaps` expects.
 */
export function shoeboxTaps(src: ArrayLike<number>, listener: ArrayLike<number>, box: ShoeboxSpec): ReflectionTap[] {
  const S = [src[0], src[1], src[2]], L = [listener[0], listener[1], listener[2]];
  const dirN = box.dir ? norm3([box.dir[0], box.dir[1], box.dir[2]]) : null;
  const ddb = box.directivityDb ?? 0;
  const planes: { axis: number; value: number; mat: ReflectorMaterial | null }[] = [
    { axis: 1, value: box.min[1], mat: box.faces.floor },
    { axis: 1, value: box.max[1], mat: box.faces.ceiling },
    { axis: 0, value: box.min[0], mat: box.faces.left },
    { axis: 0, value: box.max[0], mat: box.faces.right },
    { axis: 2, value: box.max[2], mat: box.faces.back },
    { axis: 2, value: box.min[2], mat: box.faces.front },
  ];
  const taps: (ReflectionTap & { e: number })[] = [];
  for (const p of planes) {
    if (!p.mat) continue;
    const img = S.slice();
    img[p.axis] = 2 * p.value - S[p.axis];
    const ray = [L[0] - img[0], L[1] - img[1], L[2] - img[2]];
    const path = Math.hypot(ray[0], ray[1], ray[2]);
    if (path < 0.2) continue;
    // reflection point: where image→listener crosses the plane
    const t = (p.value - img[p.axis]) / (ray[p.axis] || 1e-9);
    if (t <= 0 || t >= 1) continue;
    const R = [img[0] + ray[0] * t, img[1] + ray[1] * t, img[2] + ray[2] * t];
    const depart = norm3([R[0] - S[0], R[1] - S[1], R[2] - S[2]]);
    const arrive = norm3([R[0] - L[0], R[1] - L[1], R[2] - L[2]]);
    let g = p.mat.reflection / path;
    if (dirN && ddb > 0) g *= Math.pow(10, (-ddb * (1 - (dirN[0] * depart[0] + dirN[1] * depart[1] + dirN[2] * depart[2])) * 0.5) / 20);
    taps.push({ path, gain: g, lowpassHz: p.mat.lowpassHz, dir: arrive, e: g * g });
  }
  taps.sort((a, b) => b.e - a.e);
  return taps.slice(0, 10).map(({ path, gain, lowpassHz, dir }) => ({ path, gain, lowpassHz, dir }));
}

function norm3(v: number[]): number[] {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}
