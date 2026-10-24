// oAxis module settings + tuning registration (F1 → oAxis tab).
// Per-weapon pose/action parameters are registered by each Firearm under "Viewmodel: <name>".

import { Tuning, MODULES } from '@fondaine/gl';

/** Global model-quality settings used by oAxis builders (read at build time). */
export const OAXIS = {
  /** Procedural texture resolution for hero assets (weapons, arms), px. 2048–4096 for close-up realism. */
  textureSize: 2048,
  /** Geometry detail multiplier for radial segments / bevels (1 = default, 2 = cinematic). */
  detail: 1.5,
};

const STORE = 'fondaine.oaxis.settings';
try {
  const s = typeof localStorage !== 'undefined' ? localStorage.getItem(STORE) : null;
  if (s) Object.assign(OAXIS, JSON.parse(s));
} catch { /* storage unavailable */ }

/** Register oAxis global settings with the tuning panel. Model settings apply the next time a scene loads. */
export function registerOAxisTuning(tuning: Tuning) {
  const t = tuning.scope(MODULES.oaxis);
  const persist = () => { try { localStorage.setItem(STORE, JSON.stringify(OAXIS)); } catch { /* ignore */ } };
  t.number('Models', OAXIS, 'textureSize', { label: 'Texture resolution', min: 256, max: 4096, step: 256, unit: 'px', help: 'Procedural PBR texture size for weapons/props. Applies on reload (load time grows with it).', onChange: persist })
    .number('Models', OAXIS, 'detail', { label: 'Geometry detail', min: 0.5, max: 3, step: 0.25, help: 'Radial segments and bevel smoothness multiplier. Applies on reload.', onChange: persist });
}

/** Radial segment count scaled by the detail setting. */
export function seg(n: number): number { return Math.max(6, Math.round(n * OAXIS.detail)); }
