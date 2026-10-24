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
  // thump, plus a mechanical action pattern. Levels are tuned with `cargo run --example loudness`.
  rifle556_16in: {
    name: '5.56×45 — 16" carbine',
    params: { peakSpl: 160, positiveMs: 0.9, decayB: 1.6, crackDb: -3, crackHz: 3300, crackMs: 14, turbDb: -5, turbMs: 120, turbLp: 6000, bodyDb: -7, bodyHz: 72, bodyMs: 150, subDb: -10, subHz: 46, subMs: 140, driveDb: 12, directivityDb: 9, rearLpHz: 4500, tailSendDb: 4 },
    // hammer, bolt unlock + buffer spring 'sproing', bolt slams home
    action: { brightness: 1.35, level: 1.4, hits: [{ timeMs: -3, amp: 0.3, contactMs: 0.05, noiseDb: -12 }, { timeMs: 3, amp: 1.1, contactMs: 0.12, noiseDb: -6 }, { timeMs: 40, amp: 0.5, contactMs: 0.3, noiseDb: -14 }, { timeMs: 72, amp: 1.5, contactMs: 0.09, noiseDb: -3 }] },
  },
  rifle556_10in: {
    name: '5.56×45 — 10.3" SBR',
    params: { peakSpl: 163, positiveMs: 1.1, decayB: 1.5, crackDb: -2, crackHz: 2900, crackMs: 20, turbDb: -3, turbMs: 190, turbLp: 5000, bodyDb: -5, bodyHz: 60, bodyMs: 200, subDb: -7, subHz: 42, subMs: 170, driveDb: 14, directivityDb: 7, rearLpHz: 6000, tailSendDb: 5 },
    action: { brightness: 1.3, level: 1.4, hits: [{ timeMs: -3, amp: 0.3, contactMs: 0.05, noiseDb: -12 }, { timeMs: 2.5, amp: 1.2, contactMs: 0.12, noiseDb: -6 }, { timeMs: 36, amp: 0.5, contactMs: 0.3, noiseDb: -14 }, { timeMs: 64, amp: 1.6, contactMs: 0.09, noiseDb: -3 }] },
  },
  rifle308_bolt: {
    name: '.308 Win — 20" bolt action',
    params: { peakSpl: 163, positiveMs: 1.4, decayB: 1.3, crackDb: -6, crackHz: 2200, crackMs: 22, turbDb: -6, turbMs: 160, turbLp: 4200, bodyDb: -4, bodyHz: 50, bodyMs: 260, subDb: -5, subHz: 35, subMs: 220, driveDb: 13, directivityDb: 10, rearLpHz: 4000, tailSendDb: 6 },
    action: { brightness: 0.85, level: 0.6, hits: [{ timeMs: -4, amp: 0.45, contactMs: 0.06, noiseDb: -10 }] },
  },
  pistol9mm: {
    name: '9×19 — 4" pistol',
    // mid-heavy 'pop/snap' with a short body; slide clack carries a lot of the character
    params: { peakSpl: 157, positiveMs: 0.6, decayB: 1.6, crackDb: -2, crackHz: 1800, crackMs: 26, turbDb: -7, turbMs: 90, turbLp: 4500, bodyDb: -6, bodyHz: 95, bodyMs: 110, subDb: -14, subHz: 55, subMs: 90, driveDb: 11, directivityDb: 6, rearLpHz: 6500, precursorDb: -20, tailSendDb: 3 },
    action: { brightness: 0.95, level: 1.3, hits: [{ timeMs: -2, amp: 0.25, contactMs: 0.05, noiseDb: -12 }, { timeMs: 4, amp: 0.9, contactMs: 0.1, noiseDb: -6 }, { timeMs: 14, amp: 1.1, contactMs: 0.09, noiseDb: -4 }] },
  },
  pistol9mm_auto: {
    name: '9×19 — 4" select-fire pistol',
    params: { peakSpl: 157, positiveMs: 0.6, decayB: 1.6, crackDb: -2, crackHz: 1900, crackMs: 22, turbDb: -6, turbMs: 80, turbLp: 4800, bodyDb: -6, bodyHz: 100, bodyMs: 90, subDb: -13, subHz: 58, subMs: 80, driveDb: 11, directivityDb: 6, rearLpHz: 6500, precursorDb: -20, tailSendDb: 3 },
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

export { receiverModes };
