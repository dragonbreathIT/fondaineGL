// Surface materials: one id shared by physics (friction, ricochet), acoustics (reflection, impact &
// footstep sounds) and visuals (decal, impact particles).

import { DecalKind } from '../gl';
import type { PhysicsWorld } from '../runtime/physics';
import type { AudioSystem } from '../runtime/audio';

export interface SurfaceDef {
  id: number;
  name: string;
  friction: number;
  restitution: number;
  /** Max grazing angle (deg) for ricochets; 0 = bullets never ricochet. */
  ricochetAngleDeg: number;
  ricochetEnergyKeep: number;
  /** Acoustic pressure reflection coefficient + absorption lowpass. */
  reflection: number;
  reflectionLowpassHz: number;
  /** Key into vorp IMPACTS / FOOTSTEPS presets. */
  impactSound: string;
  footstepSound: string;
  decal: DecalKind | null;
  decalSize: number;
  /** Impact debris particles. */
  debris: 'dust' | 'sparks' | 'splinters' | 'none';
  debrisColor: [number, number, number];
  /** Casings landing on this surface: true = hard (ring), false = soft (dull). */
  hard: boolean;
  /** Average linear diffuse albedo (RGB) — used by the GI bake for light bounced off this surface. */
  albedo: [number, number, number];
}

export const SURFACE = {
  DEFAULT: 0, CONCRETE: 1, DIRT: 2, GRAVEL: 3, WOOD: 4, STEEL: 5, STEEL_TARGET: 6, PAPER: 7, CARDBOARD: 8, GRASS: 9, BRASS: 10, POLYMER: 11,
} as const;

const S = (id: number, name: string, o: Partial<SurfaceDef>): SurfaceDef => ({
  id, name, friction: 0.6, restitution: 0.2, ricochetAngleDeg: 0, ricochetEnergyKeep: 0.3, reflection: 0.8, reflectionLowpassHz: 6000,
  impactSound: 'dirt', footstepSound: 'dirt', decal: null, decalSize: 0.03, debris: 'dust', debrisColor: [0.4, 0.35, 0.28], hard: false, albedo: [0.25, 0.25, 0.25], ...o,
});

export const SURFACES: SurfaceDef[] = [
  S(SURFACE.DEFAULT, 'default', {}),
  S(SURFACE.CONCRETE, 'concrete', { friction: 0.75, restitution: 0.35, ricochetAngleDeg: 12, ricochetEnergyKeep: 0.25, reflection: 0.97, reflectionLowpassHz: 9000, impactSound: 'concrete', footstepSound: 'concrete', decal: DecalKind.ConcreteChip, decalSize: 0.05, debris: 'dust', debrisColor: [0.62, 0.61, 0.58], hard: true, albedo: [0.36, 0.35, 0.33] }),
  S(SURFACE.DIRT, 'dirt', { friction: 0.8, restitution: 0.1, reflection: 0.65, reflectionLowpassHz: 2500, impactSound: 'dirt', footstepSound: 'dirt', decal: DecalKind.DirtMark, decalSize: 0.12, debris: 'dust', debrisColor: [0.35, 0.28, 0.2], albedo: [0.2, 0.15, 0.1] }),
  S(SURFACE.GRAVEL, 'gravel', { friction: 0.85, restitution: 0.15, ricochetAngleDeg: 8, reflection: 0.75, reflectionLowpassHz: 4000, impactSound: 'gravel', footstepSound: 'gravel', decal: null, debris: 'dust', debrisColor: [0.5, 0.48, 0.45], hard: true, albedo: [0.3, 0.29, 0.27] }),
  S(SURFACE.WOOD, 'wood', { friction: 0.55, restitution: 0.3, reflection: 0.85, reflectionLowpassHz: 5000, impactSound: 'wood', footstepSound: 'wood', decal: DecalKind.WoodHole, decalSize: 0.035, debris: 'splinters', debrisColor: [0.6, 0.48, 0.32], hard: true, albedo: [0.42, 0.3, 0.17] }),
  S(SURFACE.STEEL, 'steel', { friction: 0.45, restitution: 0.4, ricochetAngleDeg: 25, ricochetEnergyKeep: 0.4, reflection: 0.98, reflectionLowpassHz: 12000, impactSound: 'concrete', footstepSound: 'concrete', decal: DecalKind.MetalHit, decalSize: 0.04, debris: 'sparks', debrisColor: [1, 0.7, 0.35], hard: true, albedo: [0.3, 0.3, 0.3] }),
  S(SURFACE.STEEL_TARGET, 'steel target', { friction: 0.45, restitution: 0.4, ricochetAngleDeg: 0, reflection: 0.98, reflectionLowpassHz: 12000, impactSound: 'concrete', decal: DecalKind.LeadSplash, decalSize: 0.07, debris: 'sparks', debrisColor: [1, 0.7, 0.35], hard: true, albedo: [0.55, 0.45, 0.38] }),
  S(SURFACE.PAPER, 'paper', { reflection: 0.3, reflectionLowpassHz: 2000, impactSound: 'paper', decal: DecalKind.PaperHole, decalSize: 0.012, debris: 'none', albedo: [0.7, 0.68, 0.62] }),
  S(SURFACE.CARDBOARD, 'cardboard', { reflection: 0.4, reflectionLowpassHz: 2500, impactSound: 'cardboard', decal: DecalKind.PaperHole, decalSize: 0.014, debris: 'none', albedo: [0.45, 0.33, 0.2] }),
  S(SURFACE.GRASS, 'grass', { friction: 0.7, reflection: 0.5, reflectionLowpassHz: 1800, impactSound: 'dirt', footstepSound: 'grass', decal: DecalKind.DirtMark, decalSize: 0.1, debris: 'dust', debrisColor: [0.3, 0.3, 0.18], albedo: [0.07, 0.11, 0.035] }),
  S(SURFACE.BRASS, 'brass', { friction: 0.35, restitution: 0.45, hard: true, impactSound: 'concrete', debris: 'none', albedo: [0.5, 0.38, 0.2] }),
  S(SURFACE.POLYMER, 'polymer', { friction: 0.6, restitution: 0.3, hard: true, impactSound: 'wood', debris: 'none', albedo: [0.04, 0.04, 0.04] }),
];

/** Linear RGB albedo per surface id (flat array for PhysicsWorld.bakeGI). */
export function surfaceAlbedoTable(): Float32Array {
  const n = Math.max(...SURFACES.map((x) => x.id)) + 1;
  const t = new Float32Array(Math.max(n, 16) * 3).fill(0.25);
  for (const x of SURFACES) t.set(x.albedo, x.id * 3);
  return t;
}

export function surfaceOf(id: number): SurfaceDef { return SURFACES[Math.round(id)] ?? SURFACES[0]; }

/** Push surface definitions into physics and audio. */
export function registerSurfaces(physics: PhysicsWorld, audio: AudioSystem) {
  for (const s of SURFACES) {
    physics.setMaterial(s.id, { friction: s.friction, restitution: s.restitution, ricochetAngleDeg: s.ricochetAngleDeg, ricochetEnergyKeep: s.ricochetEnergyKeep });
    audio.surfaces.set(s.id, { reflection: s.reflection, lowpassHz: s.reflectionLowpassHz });
  }
}
