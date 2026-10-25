// Scanned / authored weapons from the asset library (slots `weapons.pistol`, `weapons.carbine` written by
// `node tools/fetch-assets.mjs weapons`) or from any glTF URL → a ready-to-use build: FirearmModel + matching
// physical spec + grips. The procedural builders stay the fallback, so the engine runs with zero downloads:
//
//   const pistol = (await loadScannedWeapon(renderer, assets, 'weapons.pistol')) ?? buildCompactPistol(renderer);
//
// Mapping precedence: `map` argument > assets/weapons/<slot>.mapping.json > manifest hints.weapon > auto-detection.

import type { Renderer, FirearmModel, FirearmSpec } from '@fondaine/gl';
import type { AssetLibrary } from '../assets/library';
import { loadGLTF } from '../gltf/loader';
import { instantiateGLTF } from '../gltf/instantiate';
import { weaponFromGLTF, type WeaponMapping, type WeaponKind, type WeaponAnalysis } from './from-gltf';
import { compactPistolSpec } from './compact-pistol';
import { carbineSpec } from './carbine';
import type { WeaponGrips } from '../viewmodel/hands';

export interface ScannedWeapon {
  model: FirearmModel;
  spec: FirearmSpec;
  grips?: WeaponGrips;
  warnings: string[];
  kind: WeaponKind;
  /** Manifest slot, or the URL for `weaponFromURL`. */
  slot: string;
  title: string;
  analysis: WeaponAnalysis;
}

/** 'pistol' / 'carbine' from a slot or file name (`weapons.pistol`, `my-ar15.glb`), undefined when unclear. */
export function weaponKindFromName(name: string): WeaponKind | undefined {
  if (/pistol|handgun|sidearm|9mm/i.test(name)) return 'pistol';
  if (/carbine|rifle|\bar-?15\b|\bm4\b|\bak\b/i.test(name)) return 'carbine';
  return undefined;
}

/** The procedural spec that matches a scanned weapon of this kind (sight height from the detected rear sight). */
export function specForKind(kind: WeaponKind, sightHeightM: number): FirearmSpec {
  return kind === 'pistol' ? compactPistolSpec(sightHeightM) : carbineSpec(sightHeightM);
}

/** Scanned weapon for a manifest slot, or null when the slot is not downloaded (use the procedural build then). */
export async function loadScannedWeapon(renderer: Renderer, assets: AssetLibrary | undefined | null, slot: string, map: WeaponMapping = {}): Promise<ScannedWeapon | null> {
  if (!assets?.hasModel(slot)) return null;
  const inst = await assets.model(slot, true);
  if (!inst) return null;
  const mapping: WeaponMapping = { kind: weaponKindFromName(slot), autoOrient: true, ...(await assets.weaponMapping(slot)), ...map };
  const w = weaponFromGLTF(renderer, inst, mapping);
  const e = assets.modelEntry(slot);
  const spec = specForKind(w.kind, w.model.rearSight[1]);
  if (e?.title) spec.name = e.title;
  return { model: w.model, spec, grips: w.grips, warnings: w.warnings, kind: w.kind, slot, title: e?.title ?? slot, analysis: w.analysis };
}

/** Any glTF / GLB by URL (viewer `?weapon=path.glb`, your own pipeline). */
export async function weaponFromURL(renderer: Renderer, url: string, map: WeaponMapping = {}): Promise<ScannedWeapon> {
  const asset = await loadGLTF(url);
  const inst = instantiateGLTF(renderer, asset, { keepSource: true });
  const w = weaponFromGLTF(renderer, inst, { kind: weaponKindFromName(url), autoOrient: true, ...map });
  const title = url.split('/').pop() ?? url;
  const spec = specForKind(w.kind, w.model.rearSight[1]);
  spec.name = title;
  return { model: w.model, spec, grips: w.grips, warnings: w.warnings, kind: w.kind, slot: url, title, analysis: w.analysis };
}
