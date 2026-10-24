// Reference presets. Values are starting points derived from published measurements / physics; every one
// is tunable live in vorp-lab or the dev panel and can be saved back as JSON.

import { criticalDistance, receiverModes, sendFromCriticalDistance } from './acoustics';

export interface GunshotPreset {
  name: string;
  /** Overrides of GUNSHOT_PARAMS by key. */
  params: Record<string, number>;
  /** Mechanical action: hit schedule on the receiver modal bank (ms after the shot). */
  action: { brightness: number; hits: { timeMs: number; amp: number; contactMs: number; noiseDb?: number }[]; level: number };
}

export const GUNSHOTS: Record<string, GunshotPreset> = {
  // Each gun has its own signature: report pitch/decay (snap vs crack vs boom), gas roar, body and sub
  // punch, plus a mechanical action pattern. Body/sub/crack/roar are relative to the *uncompacted* blast peak;
  // the spike itself is compacted by `driveDb`, so a body at −9 dB sits ~3 dB above the compacted spike.
  // Levels are checked with `node tools/run-ts.mjs packages/vorp/test/render-reference.ts` + analyze-reference.mjs.
  rifle556_16in: {
    name: '5.56×45 — 16" carbine',
    // violent bright crack + big chest punch, long roar
    params: { peakSpl: 160, positiveMs: 0.9, decayB: 1.6, crackDb: -2, crackHz: 4200, crackMs: 8, turbDb: -5, turbMs: 360, turbHp: 150, turbLp: 6500, bodyDb: -9, bodyHz: 70, bodyMs: 320, bodyDrop: 0.4, subDb: -12, subHz: 44, subMs: 420, driveDb: 12, directivityDb: 9, rearLpHz: 5000, tailSendDb: 4 },
    // hammer, bolt unlock + buffer spring 'sproing', bolt slams home
    action: { brightness: 1.35, level: 1.4, hits: [{ timeMs: -3, amp: 0.15, contactMs: 0.05, noiseDb: -14 }, { timeMs: 3, amp: 1.1, contactMs: 0.12, noiseDb: -6 }, { timeMs: 40, amp: 0.5, contactMs: 0.3, noiseDb: -14 }, { timeMs: 72, amp: 1.5, contactMs: 0.09, noiseDb: -3 }] },
  },
  rifle556_10in: {
    name: '5.56×45 — 10.3" SBR',
    // more unburnt powder: louder, more roar and body, slightly lower crack
    params: { peakSpl: 163, positiveMs: 1.1, decayB: 1.5, crackDb: -1, crackHz: 3800, crackMs: 10, turbDb: -3, turbMs: 380, turbHp: 140, turbLp: 5500, bodyDb: -7, bodyHz: 60, bodyMs: 380, bodyDrop: 0.4, subDb: -9, subHz: 42, subMs: 480, driveDb: 14, directivityDb: 7, rearLpHz: 6500, tailSendDb: 5 },
    action: { brightness: 1.3, level: 1.4, hits: [{ timeMs: -3, amp: 0.15, contactMs: 0.05, noiseDb: -14 }, { timeMs: 2.5, amp: 1.2, contactMs: 0.12, noiseDb: -6 }, { timeMs: 36, amp: 0.5, contactMs: 0.3, noiseDb: -14 }, { timeMs: 64, amp: 1.6, contactMs: 0.09, noiseDb: -3 }] },
  },
  rifle308_bolt: {
    name: '.308 Win — 20" bolt action',
    // deep boom: lower crack, the biggest body and sub, long roar
    params: { peakSpl: 163, positiveMs: 1.4, decayB: 1.3, crackDb: -4, crackHz: 2600, crackMs: 12, turbDb: -5, turbMs: 360, turbHp: 110, turbLp: 4800, bodyDb: -6, bodyHz: 50, bodyMs: 450, bodyDrop: 0.35, subDb: -7, subHz: 34, subMs: 560, driveDb: 13, directivityDb: 10, rearLpHz: 4500, tailSendDb: 6 },
    action: { brightness: 0.85, level: 0.6, hits: [{ timeMs: -4, amp: 0.45, contactMs: 0.06, noiseDb: -10 }] },
  },
  pistol9mm: {
    name: '9×19 — 4" pistol',
    // sharp hard BANG: strong short snap, little body, almost no sub; slide clack carries a lot of the character
    params: { peakSpl: 157, positiveMs: 0.6, decayB: 1.7, crackDb: -1, crackHz: 2300, crackMs: 7, turbDb: -6, turbMs: 200, turbHp: 200, turbLp: 6000, bodyDb: -12, bodyHz: 100, bodyMs: 170, bodyDrop: 0.5, subDb: -20, subHz: 55, subMs: 160, driveDb: 11, directivityDb: 6, rearLpHz: 7000, precursorDb: -20, tailSendDb: 4 },
    action: { brightness: 0.95, level: 1.3, hits: [{ timeMs: -2, amp: 0.25, contactMs: 0.05, noiseDb: -12 }, { timeMs: 4, amp: 0.9, contactMs: 0.1, noiseDb: -6 }, { timeMs: 14, amp: 1.1, contactMs: 0.09, noiseDb: -4 }] },
  },
  pistol9mm_auto: {
    name: '9×19 — 4" select-fire pistol',
    params: { peakSpl: 157, positiveMs: 0.6, decayB: 1.7, crackDb: -1, crackHz: 2400, crackMs: 6, turbDb: -5, turbMs: 140, turbHp: 200, turbLp: 6500, bodyDb: -12, bodyHz: 105, bodyMs: 150, bodyDrop: 0.5, subDb: -19, subHz: 58, subMs: 140, driveDb: 11, directivityDb: 6, rearLpHz: 7000, precursorDb: -20, tailSendDb: 3 },
    action: { brightness: 1.0, level: 1.3, hits: [{ timeMs: -2, amp: 0.25, contactMs: 0.05, noiseDb: -12 }, { timeMs: 4, amp: 0.9, contactMs: 0.1, noiseDb: -6 }, { timeMs: 12, amp: 1.0, contactMs: 0.09, noiseDb: -4 }] },
  },
};

export interface ZonePreset {
  name: string;
  reverb: Record<string, number>;
  /** Critical distance (m) of the space: where the diffuse field equals the direct sound. */
  criticalDistance: number;
  ambience: Record<string, number>;
  /** Distant reflectors (tree lines, berms, buildings) for outdoor slap echoes: azimuth (deg), distance (m), reflectivity 0..1. */
  farReflectors?: { azimuth: number; distance: number; reflectivity: number; lowpassHz: number }[];
}

export const ZONES: Record<string, ZonePreset> = {
  outdoorRange: {
    name: 'Outdoor range (open field, berms)',
    reverb: { rt60Low: 1.6, rt60Mid: 1.1, rt60High: 0.35, xoverLow: 300, xoverHigh: 2500, size: 2.6, diffusion: 0.75, predelayMs: 20, modDepthMs: 0.4, modRateHz: 0.4, levelDb: 0, toneHz: 5000 },
    criticalDistance: 32,
    ambience: { windSpl: 46, windGust: 0.55, windGustRate: 0.12, windToneHz: 520, rumbleSpl: 36, enable: 1 },
    farReflectors: [
      { azimuth: 0, distance: 140, reflectivity: 0.35, lowpassHz: 2200 },
      { azimuth: 75, distance: 230, reflectivity: 0.25, lowpassHz: 1800 },
      { azimuth: -80, distance: 190, reflectivity: 0.28, lowpassHz: 1800 },
      { azimuth: 180, distance: 300, reflectivity: 0.2, lowpassHz: 1500 },
    ],
  },
  coveredRange: {
    name: 'Covered firing point (roof, baffles, open field beyond)',
    // dense short slap field under the roof + the open-range tail; the critical distance under the roof is small,
    // so the late field is much stronger than in the open (this is what makes a shot under a roof hurt)
    reverb: { rt60Low: 1.8, rt60Mid: 1.2, rt60High: 0.45, xoverLow: 300, xoverHigh: 3000, size: 1.6, diffusion: 0.85, predelayMs: 10, modDepthMs: 0.35, modRateHz: 0.5, levelDb: 0, toneHz: 6000 },
    criticalDistance: 8,
    ambience: { windSpl: 44, windGust: 0.5, windGustRate: 0.12, windToneHz: 480, rumbleSpl: 36, enable: 1 },
    farReflectors: [
      { azimuth: 0, distance: 140, reflectivity: 0.35, lowpassHz: 2200 },
      { azimuth: 75, distance: 230, reflectivity: 0.25, lowpassHz: 1800 },
      { azimuth: -80, distance: 190, reflectivity: 0.28, lowpassHz: 1800 },
    ],
  },
  indoorRange: {
    name: 'Indoor range (concrete, baffles)',
    reverb: { rt60Low: 1.4, rt60Mid: 1.1, rt60High: 0.6, xoverLow: 250, xoverHigh: 4000, size: 1.2, diffusion: 0.8, predelayMs: 8, modDepthMs: 0.3, modRateHz: 0.6, levelDb: 0, toneHz: 8000 },
    criticalDistance: criticalDistance(25 * 8 * 3.5, 1.1),
    ambience: { windSpl: 0, windGust: 0, windGustRate: 0.1, windToneHz: 500, rumbleSpl: 42, enable: 1 },
  },
  forest: {
    name: 'Forest',
    reverb: { rt60Low: 1.8, rt60Mid: 1.5, rt60High: 0.6, xoverLow: 300, xoverHigh: 3000, size: 4, diffusion: 0.9, predelayMs: 25, modDepthMs: 0.5, modRateHz: 0.3, levelDb: 0, toneHz: 4500 },
    criticalDistance: 18,
    ambience: { windSpl: 50, windGust: 0.7, windGustRate: 0.18, windToneHz: 900, rumbleSpl: 30, enable: 1 },
  },
};

export const zoneSendDb = (z: ZonePreset) => sendFromCriticalDistance(z.criticalDistance);

/** Impact sounds by surface material (noise sources), at 1 m. */
export const IMPACTS: Record<string, Record<string, number>> = {
  dirt: { levelSpl: 112, attackMs: 0.3, decayMs: 90, hpHz: 80, lpHz: 2500, thumpHz: 70, thumpDb: 0, thumpMs: 70, grainsPerS: 900, grainDb: -14, resonance: 0.7 },
  gravel: { levelSpl: 116, attackMs: 0.2, decayMs: 110, hpHz: 300, lpHz: 7000, thumpHz: 90, thumpDb: -8, thumpMs: 40, grainsPerS: 2200, grainDb: -6, resonance: 0.8 },
  concrete: { levelSpl: 124, attackMs: 0.05, decayMs: 45, hpHz: 900, lpHz: 11000, thumpHz: 140, thumpDb: -10, thumpMs: 20, grainsPerS: 1500, grainDb: -10, resonance: 1.1 },
  wood: { levelSpl: 118, attackMs: 0.1, decayMs: 70, hpHz: 250, lpHz: 5000, thumpHz: 180, thumpDb: -2, thumpMs: 50, grainsPerS: 300, grainDb: -14, resonance: 1.6 },
  paper: { levelSpl: 98, attackMs: 0.05, decayMs: 25, hpHz: 1500, lpHz: 9000, thumpHz: 200, thumpDb: -30, thumpMs: 10, grainsPerS: 0, grainDb: -30, resonance: 0.7 },
  cardboard: { levelSpl: 104, attackMs: 0.08, decayMs: 40, hpHz: 400, lpHz: 5000, thumpHz: 120, thumpDb: -6, thumpMs: 30, grainsPerS: 0, grainDb: -30, resonance: 1.2 },
};

/** Footsteps (per step, at 1 m) by surface. */
export const FOOTSTEPS: Record<string, Record<string, number>> = {
  concrete: { levelSpl: 74, attackMs: 4, decayMs: 70, hpHz: 120, lpHz: 6000, thumpHz: 95, thumpDb: -3, thumpMs: 50, grainsPerS: 120, grainDb: -18, resonance: 0.8 },
  gravel: { levelSpl: 78, attackMs: 12, decayMs: 260, hpHz: 400, lpHz: 9000, thumpHz: 80, thumpDb: -10, thumpMs: 60, grainsPerS: 2600, grainDb: -2, resonance: 0.9 },
  dirt: { levelSpl: 70, attackMs: 10, decayMs: 160, hpHz: 90, lpHz: 3500, thumpHz: 70, thumpDb: -1, thumpMs: 60, grainsPerS: 500, grainDb: -10, resonance: 0.7 },
  grass: { levelSpl: 66, attackMs: 18, decayMs: 220, hpHz: 600, lpHz: 7000, thumpHz: 70, thumpDb: -8, thumpMs: 60, grainsPerS: 1800, grainDb: -4, resonance: 0.7 },
  wood: { levelSpl: 76, attackMs: 3, decayMs: 90, hpHz: 100, lpHz: 4500, thumpHz: 120, thumpDb: 0, thumpMs: 70, grainsPerS: 60, grainDb: -16, resonance: 1.4 },
};


// ------------------------------------------------------------------------------------------ handling

export interface MechPreset {
  /** Noise layer (NOISE_PARAMS overrides at 1 m): the click / rasp / slap texture. */
  noise: Record<string, number>;
  /** Optional receiver-ring layer (modal hits on `receiverModes(brightness)`). */
  ring?: { brightness: number; level: number; hits: { timeMs: number; amp: number; contactMs: number; noiseDb?: number }[] };
}

/**
 * Weapon-handling sounds, at 1 m (the action sits ≈ 0.25–0.4 m from the shooter's ears, so they land
 * 8–12 dB louder than listed; `levelSpl` is the noise RMS, peaks sit ~10 dB above it). Use
 * `vorp.mech('magRelease', pos)` for noise + ring, or `vorp.noise(MECH.magRelease.noise, pos)` for the
 * texture alone. Levels put them 30–45 dB under a shot.
 */
export const MECH = {
  /** Magazine release button: a short, bright latch click. */
  magRelease: {
    noise: { levelSpl: 62, attackMs: 0.15, decayMs: 22, hpHz: 1800, lpHz: 9500, thumpHz: 420, thumpDb: -10, thumpMs: 7, resonance: 1.3 },
    ring: { brightness: 1.4, level: 0.2, hits: [{ timeMs: 0, amp: 0.25, contactMs: 0.06, noiseDb: -8 }] },
  },
  /** Empty magazine slides out of the well (polymer on aluminium). */
  magOut: {
    noise: { levelSpl: 58, attackMs: 8, decayMs: 140, hpHz: 500, lpHz: 6000, thumpDb: -40, grainsPerS: 350, grainDb: -14, resonance: 0.8 },
  },
  /** Magazine landing on concrete: hard slap + bounce. */
  magDropConcrete: {
    noise: { levelSpl: 86, attackMs: 0.08, decayMs: 60, hpHz: 220, lpHz: 7500, thumpHz: 150, thumpDb: 3, thumpMs: 38, grainsPerS: 500, grainDb: -10, resonance: 1.1, hit2Ms: 48, hit2Db: -9 },
    ring: { brightness: 0.55, level: 0.3, hits: [{ timeMs: 0, amp: 0.6, contactMs: 0.25, noiseDb: -6 }] },
  },
  /** Magazine landing on dirt / grass: dull thud, no bounce. */
  magDropDirt: {
    noise: { levelSpl: 76, attackMs: 0.6, decayMs: 85, hpHz: 70, lpHz: 2400, thumpHz: 72, thumpDb: 5, thumpMs: 65, grainsPerS: 700, grainDb: -16, resonance: 0.75 },
  },
  /** Magazine seating: two-stage click (catch engages, then the mag seats fully ~35 ms later). */
  magSeat: {
    noise: { levelSpl: 68, attackMs: 0.1, decayMs: 34, hpHz: 650, lpHz: 8500, thumpHz: 230, thumpDb: -3, thumpMs: 22, resonance: 1.0, hit2Ms: 35, hit2Db: -2 },
    ring: { brightness: 1.15, level: 0.22, hits: [{ timeMs: 0, amp: 0.6, contactMs: 0.08, noiseDb: -6 }, { timeMs: 35, amp: 0.5, contactMs: 0.06, noiseDb: -8 }] },
  },
  /** Slide / carrier dragged back along the rails: a rasp with a spring hiss. */
  slideRack: {
    noise: { levelSpl: 62, attackMs: 5, decayMs: 125, hpHz: 750, lpHz: 7800, thumpDb: -40, grainsPerS: 1100, grainDb: -7, resonance: 0.9 },
    ring: { brightness: 1.25, level: 0.15, hits: [{ timeMs: 0, amp: 0.35, contactMs: 0.05, noiseDb: -10 }] },
  },
  /** Slide / carrier hits its rear stop. */
  slideStop: {
    noise: { levelSpl: 66, attackMs: 0.08, decayMs: 40, hpHz: 480, lpHz: 9500, thumpHz: 270, thumpDb: -2, thumpMs: 18, resonance: 1.0 },
    ring: { brightness: 1.1, level: 0.19, hits: [{ timeMs: 0, amp: 0.9, contactMs: 0.07, noiseDb: -6 }] },
  },
  /** Spring slams the slide / carrier home and chambers a round. */
  slideHome: {
    noise: { levelSpl: 72, attackMs: 0.05, decayMs: 58, hpHz: 280, lpHz: 10500, thumpHz: 175, thumpDb: 2, thumpMs: 30, resonance: 1.0, hit2Ms: 7, hit2Db: -9 },
    ring: { brightness: 1.0, level: 0.17, hits: [{ timeMs: 0, amp: 1.5, contactMs: 0.09, noiseDb: -3 }] },
  },
  /** AR charging handle: latch click, pull rasp, carrier reaches the rear. */
  chargingHandle: {
    noise: { levelSpl: 64, attackMs: 1.5, decayMs: 95, hpHz: 600, lpHz: 7200, thumpDb: -40, grainsPerS: 600, grainDb: -10, resonance: 0.9, hit2Ms: 65, hit2Db: -3 },
    ring: { brightness: 1.3, level: 0.14, hits: [{ timeMs: 0, amp: 0.3, contactMs: 0.05, noiseDb: -10 }, { timeMs: 65, amp: 0.7, contactMs: 0.07, noiseDb: -6 }] },
  },
  /** Bolt catch / slide stop slapped: a small, hard, bright click. */
  boltCatch: {
    noise: { levelSpl: 66, attackMs: 0.08, decayMs: 28, hpHz: 950, lpHz: 9500, thumpHz: 320, thumpDb: -8, thumpMs: 12, resonance: 1.2 },
    ring: { brightness: 1.35, level: 0.15, hits: [{ timeMs: 0, amp: 0.4, contactMs: 0.04, noiseDb: -8 }] },
  },
  /** Fire-selector detent. */
  selector: {
    noise: { levelSpl: 60, attackMs: 0.1, decayMs: 20, hpHz: 1500, lpHz: 9000, thumpDb: -40, resonance: 1.2, hit2Ms: 16, hit2Db: 2 },
    ring: { brightness: 1.75, level: 0.05, hits: [{ timeMs: 0, amp: 0.55, contactMs: 0.035, noiseDb: -8 }, { timeMs: 16, amp: 0.85, contactMs: 0.03, noiseDb: -6 }] },
  },
  /** Hammer falls on an empty chamber. */
  dryFire: {
    noise: { levelSpl: 62, attackMs: 0.05, decayMs: 18, hpHz: 1200, lpHz: 9000, thumpHz: 350, thumpDb: -12, thumpMs: 8, resonance: 1.1 },
    ring: { brightness: 1.5, level: 0.15, hits: [{ timeMs: 0, amp: 0.2, contactMs: 0.04, noiseDb: -10 }] },
  },
} satisfies Record<string, MechPreset>;

export type MechName = keyof typeof MECH;

/**
 * A short, quiet human exhale: 0.5–0.65 s of soft filtered noise with a breathy formant.
 * `levelSpl` is the 1 m value (≈ 45 dB) so that at 0.3 m — the shooter's own mouth — it reads ≈ 55 dB SPL.
 */
export const BREATH: Record<string, number> = {
  levelSpl: 45, attackMs: 150, decayMs: 420, hpHz: 340, lpHz: 1900, thumpDb: -60, grainsPerS: 0, grainDb: -60, resonance: 1.7,
};

export { receiverModes };
