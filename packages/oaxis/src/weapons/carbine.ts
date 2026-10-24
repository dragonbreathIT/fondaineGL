// Procedural AR-pattern carbine (16" barrel, free-float handguard, flip-up irons, A2-style flash hider).
// Real-world dimensions in metres. Weapon space: +x right, +y up, −z towards the muzzle, bore axis at y = 0.

import { Mesh, Renderer, lathe, extrude, vec3, box, roundedBox, cylinder, roundRect2, circle2 } from '@fondaine/gl';
import { GUNSHOTS } from '@fondaine/vorp';
import { FirearmSpec, CALIBERS, casingGeometry } from '@fondaine/gl';
import { PartBuilder, side, tubeZ, latheZ, P2 } from './build';
import { OAXIS, seg } from '../tuning';
import type { WeaponBuild } from './compact-pistol';
import type { WeaponGrips } from '../viewmodel/hands';

export interface CarbineOptions { textureSize?: number }

export function buildCarbine(renderer: Renderer, o: CarbineOptions = {}): WeaponBuild {
  const synth = renderer.synth;
  const size = o.textureSize ?? OAXIS.textureSize;
  const anod = synth.material('anodized', { size, tileMeters: 0.25, wear: 0.22, seed: 11 }, { name: 'anodized', edgeWear: 0.55 });
  const anodRail = synth.material('anodized', { size, tileMeters: 0.25, wear: 0.4, seed: 12 }, { name: 'anodized-rail', edgeWear: 0.8, edgeWearRadius: 0.002 });
  const park = synth.material('parkerized', { size, tileMeters: 0.2, wear: 0.15, seed: 13 }, { name: 'parkerized', edgeWear: 0.45 });
  const poly = synth.material('polymer', { size, tileMeters: 0.12, extra: 0, seed: 14 }, { name: 'polymer', edgeWear: 0.25 });
  const grip = synth.material('polymer', { size, tileMeters: 0.08, extra: 0.9, seed: 15, bumpMm: 0.25 }, { name: 'polymer-stipple' });
  const rubber = synth.material('rubber', { size: 512, seed: 16 }, { name: 'rubber' });
  const brass = synth.material('brass', { size: 512, tileMeters: 0.03, seed: 17 }, { name: 'brass' });
  const steelBlack = synth.material('parkerized', { size: 512, tileMeters: 0.1, color: [0.03, 0.03, 0.03], wear: 0.05, seed: 18 }, { name: 'steel-black' });

  const P = new PartBuilder(renderer);
  const add = (g: Parameters<PartBuilder['add']>[0], m: Parameters<PartBuilder['add']>[1], f: { magazine?: boolean } = {}) => P.add(g, m, f);

  // ------------------------------------------------------------------ upper receiver (forged, flat-top)
  add(side([[-0.075, -0.004], [0.115, -0.004], [0.118, 0.012], [0.118, 0.026], [0.11, 0.031], [-0.07, 0.031], [-0.075, 0.025]], 0.028, 0.0025), anod);
  add(roundedBox(0.012, 0.022, 0.03, 0.004).translate(0.017, 0.016, 0.055), anod);
  add(cylinder(0.006, 0.0068, 0.03, seg(18)).rotateZ(Math.PI / 2).rotateY(0.35).translate(0.022, 0.017, 0.07), park);
  add(box(0.0012, 0.013, 0.05).translate(0.0142, 0.012, -0.02), steelBlack);
  add(tubeZ(0.0016, -0.05, 0.005, -0.001, 0.0145, 10), park);
  const railLen = 0.56, railStart = 0.07;
  add(box(0.021, 0.006, railLen).translate(0, 0.034, railStart - railLen / 2), anodRail);
  for (let i = 0; i < 55; i++) add(box(0.0215, 0.0045, 0.0052).translate(0, 0.0395, railStart - 0.006 - i * 0.01), anodRail);
  add(roundedBox(0.045, 0.008, 0.012, 0.003).translate(0, 0.024, 0.083), anod);
  add(box(0.012, 0.006, 0.03).translate(0, 0.025, 0.065), anod);

  // ------------------------------------------------------------------ lower receiver
  add(side([[-0.09, -0.004], [0.112, -0.004], [0.112, -0.012], [0.095, -0.024], [0.07, -0.028], [0.07, -0.062], [0.012, -0.062], [0.006, -0.03], [-0.03, -0.03], [-0.07, -0.036], [-0.09, -0.022]], 0.025, 0.002), anod);
  add(side([[0.07, -0.05], [0.074, -0.066], [0.008, -0.066], [0.012, -0.05]], 0.03, 0.002), anod);
  add(side([[0.004, -0.03], [0.006, -0.036], [-0.05, -0.041], [-0.06, -0.034], [-0.06, -0.03]], 0.012, 0.001), anod);
  P.add(side([[-0.012, -0.03], [-0.016, -0.031], [-0.02, -0.04], [-0.018, -0.046], [-0.014, -0.04], [-0.01, -0.031]], 0.006, 0.0006), steelBlack, { trigger: true });
  add(roundedBox(0.004, 0.012, 0.018, 0.0015).translate(-0.0145, -0.012, -0.065), park);
  add(cylinder(0.0045, 0.0045, 0.006, seg(16)).rotateZ(Math.PI / 2).translate(0.0145, -0.018, -0.01), park);
  // fire selector (left side): lever pointing forward = SAFE, up = SEMI, back = AUTO; rotates about x
  P.add(cylinder(0.0042, 0.0042, 0.003, seg(14)).rotateZ(Math.PI / 2).translate(-0.0142, -0.012, 0.03), park, { selector: true });
  P.add(roundedBox(0.0035, 0.0045, 0.017, 0.0015).translate(-0.0153, -0.012, 0.03 - 0.0085), park, { selector: true });
  add(tubeZ(0.0145, 0.09, 0.33, 0.005, 0, seg(32)), anod);
  add(tubeZ(0.0175, 0.088, 0.1, 0.005, 0, 12), park);

  // ------------------------------------------------------------------ pistol grip, stock
  add(side([[-0.06, -0.03], [-0.03, -0.03], [-0.05, -0.065], [-0.072, -0.122], [-0.082, -0.128], [-0.112, -0.122], [-0.098, -0.09], [-0.085, -0.05], [-0.072, -0.036]], 0.031, 0.006), grip);
  add(side([[-0.21, 0.02], [-0.335, 0.026], [-0.345, 0.018], [-0.345, -0.088], [-0.33, -0.095], [-0.27, -0.06], [-0.24, -0.02], [-0.21, -0.008]], 0.044, 0.006), poly);
  add(side([[-0.345, 0.024], [-0.356, 0.024], [-0.356, -0.094], [-0.345, -0.094]], 0.046, 0.004), rubber);
  add(roundedBox(0.008, 0.006, 0.035, 0.002).translate(0, -0.012, 0.25), poly);

  // ------------------------------------------------------------------ handguard (free-float, octagonal)
  const hgZ0 = -0.12, hgZ1 = -0.495;
  const oct: P2[] = Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2 + Math.PI / 8; return [Math.cos(a) * 0.024, Math.sin(a) * 0.024 + 0.006] as P2; });
  add(extrude(oct, Math.abs(hgZ1 - hgZ0), { bevel: 0.0012, bevelSegments: 2, holes: [circle2(0, 0.006, 0.0175, seg(24))] }).translate(0, 0, (hgZ0 + hgZ1) / 2), anod);
  for (const sx of [-1, 1]) for (let i = 0; i < 5; i++) add(box(0.002, 0.007, 0.032).translate(sx * 0.0222, 0.006, -0.17 - i * 0.065), steelBlack);
  add(tubeZ(0.0215, -0.105, -0.122, 0.006, 0, seg(24)), anod);

  // ------------------------------------------------------------------ barrel, muzzle device
  const barrelZ0 = -0.118, barrelZ1 = barrelZ0 - 0.406;
  add(tubeZ(0.0094, barrelZ0, -0.2, 0, 0, seg(24)), park);
  add(tubeZ(0.0083, -0.2, barrelZ1 + 0.012, 0, 0, seg(24)), park);
  add(tubeZ(0.0076, barrelZ1 + 0.012, barrelZ1 - 0.012, 0, 0, seg(20)), park);
  const fhZ0 = barrelZ1 - 0.002;
  add(latheZ([[0.0076, 0], [0.0108, 0.003], [0.011, 0.006], [0.011, 0.05], [0.0104, 0.054], [0.0062, 0.055], [0.0062, 0.0]], 0, 0, seg(32)).translate(0, 0, fhZ0), park);
  for (let k = 0; k < 4; k++) {
    const a = (k / 4) * Math.PI * 1.1 - Math.PI * 0.05 + Math.PI / 2 - Math.PI * 0.55 + Math.PI * 0.5;
    add(box(0.003, 0.004, 0.028).translate(0, 0.0102, 0).rotateZ(a).translate(0, 0, fhZ0 - 0.028), steelBlack);
  }
  const muzzleZ = fhZ0 - 0.055;

  // ------------------------------------------------------------------ flip-up iron sights
  const sightTop = 0.064;
  add(roundedBox(0.026, 0.012, 0.03, 0.002).translate(0, 0.043, 0.04), anod);
  // ghost-ring aperture as perceived (until depth of field blurs a real 1.8 mm aperture)
  add(extrude(roundRect2(-0.0075, -0.009, 0.0075, 0.009, 0.003), 0.003, { holes: [circle2(0, 0, 0.0034, seg(24))], bevel: 0.0005 }).translate(0, sightTop, 0.046), steelBlack);
  add(box(0.006, 0.006, 0.003).translate(0, 0.05, 0.046), steelBlack);
  const fsZ = -0.47;
  add(roundedBox(0.026, 0.012, 0.028, 0.002).translate(0, 0.043, fsZ), anod);
  for (const sx of [-1, 1]) add(box(0.004, 0.026, 0.01).translate(sx * 0.008, 0.06, fsZ), steelBlack);
  add(box(0.0016, 0.022, 0.0016).translate(0, sightTop - 0.011, fsZ), steelBlack);

  // ------------------------------------------------------------------ magazine (curved 30-round, polymer)
  const magProf: P2[] = [];
  const steps = 10;
  for (let i = 0; i <= steps; i++) { const t = i / steps; magProf.push([0.068 + t * t * 0.03, -0.055 - t * 0.17]); }
  for (let i = steps; i >= 0; i--) { const t = i / steps; magProf.push([0.012 + t * t * 0.045, -0.055 - t * 0.17]); }
  add(side(magProf, 0.0225, 0.0025), poly, { magazine: true });
  add(side([[0.11, -0.22], [0.112, -0.236], [0.052, -0.236], [0.054, -0.222]], 0.027, 0.003), poly, { magazine: true });

  const parts = P.finish();
  const casingMesh = new Mesh(renderer.dev, casingGeometry(0.0448, 0.0095, lathe));
  return {
    model: {
      parts,
      muzzle: vec3.create(0, 0, muzzleZ),
      ejectionPort: vec3.create(0.016, 0.012, -0.02),
      rearSight: vec3.create(0, sightTop, 0.046),
      frontSight: vec3.create(0, sightTop, fsZ),
      casingMesh,
      casingMaterial: brass,
      magAxis: vec3.normalize(vec3.create(), vec3.create(0, -0.985, -0.17)),
      magBox: { center: vec3.create(0, -0.145, -0.07), half: vec3.create(0.0125, 0.085, 0.032) },
      triggerTravelM: 0.003,
      selector: { pivot: [-0.0145, -0.012, 0.03], axis: [1, 0, 0], angles: { safe: 0, semi: Math.PI / 2, auto: Math.PI } },
    },
    spec: carbineSpec(sightTop),
    grips: CARBINE_GRIPS,
  };
}

/** Pistol-grip firing hand + underhand support grip on the handguard (weapon space). */
export const CARBINE_GRIPS: WeaponGrips = {
  right: {
    position: [0.0305, -0.049, 0.155], fingerDir: [0, -0.33, -0.94], dorsal: [1, 0, 0],
    fingers: [{ curl: [0.25, 0.55, 0.3], spread: 0.35 }, { curl: [1.3, 1.3, 0.7] }, { curl: [1.3, 1.3, 0.7] }, { curl: [1.3, 1.25, 0.7] }],
    thumb: { dir: [-0.6, -0.6, -0.5], bend: [0.25, 0.15] },
  },
  indexPressed: { curl: [0.35, 0.8, 0.45], spread: 0.35 },
  left: {
    position: [-0.064, -0.047, -0.278], fingerDir: [0.8, 0.15, -0.55], dorsal: [0, -1, 0],
    fingers: [{ curl: [1.1, 1.15, 0.6] }, { curl: [1.1, 1.2, 0.6] }, { curl: [1.1, 1.2, 0.6] }, { curl: [1.1, 1.15, 0.6] }],
    thumb: { dir: [-0.3, 0.7, -0.6], bend: [0.15, 0.1] },
  },
  leftOnMagazine: {
    position: [-0.02, -0.25, -0.02], fingerDir: [0.3, 0.3, -0.9], dorsal: [-0.2, -1, 0],
    fingers: [{ curl: [0.9, 0.9, 0.4] }, { curl: [0.95, 0.9, 0.4] }, { curl: [0.95, 0.9, 0.4] }, { curl: [0.95, 0.9, 0.4] }],
    thumb: { dir: [-0.7, 0.3, -0.6], bend: [0.2, 0.1] },
  },
};

export function carbineSpec(sightHeightM = 0.064): FirearmSpec {
  return {
    name: 'AR carbine 16in',
    caliber: CALIBERS['5.56x45 M855'],
    barrelLengthM: 0.406,
    massKg: 3.3,
    rpm: 760,
    fireModes: ['safe', 'semi', 'auto'],
    magazineCapacity: 30,
    sightHeightM,
    zeroM: 50,
    accuracyMoa: 1.5,
    recoil: { boreAboveShoulderM: 0.035, inertia: 0.24, shoulderMassKg: 12, holdOmega: 13, holdDamping: 0.72, horizontalRatio: 0.35, viewCouplingHip: 0.45, viewCouplingAds: 0.88, residualRise: 0.16 },
    reload: { magOut: 0.55, magIn: 0.95, boltRelease: 0.35 },
    audio: GUNSHOTS.rifle556_16in,
    flash: { kelvin: 1900, luminance: 6e5, sizeM: 0.15, lightCandela: 25000, sidePorts: true, smoke: 1 },
    ejection: { speed: 4.2, up: 1.4, back: 1.2, spinRad: 28 },
    hipOffset: [0.135, -0.165, -0.36],
    eyeRelief: 0.075,
    adsTime: 0.26,
    drawTime: 0.6,
  };
}
