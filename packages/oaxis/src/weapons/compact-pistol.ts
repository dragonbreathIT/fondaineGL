// "C15 Compact": an original compact 9×19 polymer-frame, striker-fired pistol (fondaine design).
// Class-typical dimensions: 102 mm barrel, ≈186 mm overall, ≈127 mm tall with the magazine, 25.5 mm slide,
// 15+1 rounds, ≈0.84 kg loaded. Everything is modelled at real scale in weapon space
// (+x right, +y up, −z towards the muzzle, bore on y = 0, breech face at z ≈ 0).
//
// Animated groups:
//   slide (bolt)   – cycles 34 mm per shot, locks open on an empty magazine, slams home on slide release
//   magazine       – drops free on reload (spawned as a physics body), new one is inserted
//   trigger        – travels back when pulled
// The barrel stays in the frame, so with the slide locked back it sticks out of the nose like a real one.

import { Material, Mesh, Renderer, lathe, vec3, box, roundedBox, cylinder } from '@fondaine/gl';
import { GUNSHOTS } from '@fondaine/vorp';
import { FirearmModel, FirearmSpec, CALIBERS, casingGeometry } from '@fondaine/gl';
import { OAXIS, seg } from '../tuning';
import { PartBuilder, side, section, tubeZ, tubeX, discZ, latheZ, P2 } from './build';
import type { WeaponGrips } from '../viewmodel/hands';

export interface WeaponBuild { model: FirearmModel; spec: FirearmSpec; grips?: WeaponGrips }

export interface CompactPistolOptions {
  /** Procedural texture resolution (px). */
  textureSize?: number;
  /** Slide finish colour (linear RGB). Default: black nitride. */
  slideColor?: [number, number, number];
  /** Frame polymer colour (linear RGB). Default: black. Try [0.16, 0.13, 0.09] for FDE, [0.06, 0.07, 0.05] for OD. */
  frameColor?: [number, number, number];
  /** Front sight insert: 'tritium' (green, glows) or 'white'. */
  frontSight?: 'tritium' | 'white';
}

// ---------------------------------------------------------------------------------------------- dimensions
export const C15 = {
  slideRear: 0.088,       // z of the slide's rear face
  slideFront: -0.0975,    // z of the slide nose (muzzle crown flush)
  slideTop: 0.0165,       // y of the slide's top flat
  slideBottom: -0.0115,
  slideWidth: 0.0255,
  frameWidth: 0.0265,
  sightLine: 0.0225,      // y of the front post top / rear notch top
  rearSightZ: 0.082,      // rear face of the rear sight (towards the eye)
  frontSightZ: -0.088,
  slideTravel: 0.034,
  portZ0: -0.003, portZ1: -0.040, // ejection port opening along z (in battery)
} as const;

export function buildCompactPistol(renderer: Renderer, o: CompactPistolOptions = {}): WeaponBuild {
  const synth = renderer.synth;
  const size = o.textureSize ?? OAXIS.textureSize;
  const D = C15;

  // ------------------------------------------------------------------ materials (physically based, procedural)
  const nitride = synth.material('parkerized', { size, tileMeters: 0.12, color: o.slideColor ?? [0.032, 0.034, 0.037], wear: 0.14, seed: 41, bumpMm: 0.015 }, { name: 'c15-slide-nitride', edgeWear: 0.7, edgeWearRadius: 0.0035 });
  const barrelSteel = synth.material('parkerized', { size: 512, tileMeters: 0.08, color: [0.05, 0.048, 0.045], wear: 0.45, seed: 42 }, { name: 'c15-barrel', edgeWear: 0.8 });
  const frame = synth.material('polymer', { size, tileMeters: 0.1, color: o.frameColor ?? [0.028, 0.028, 0.03], seed: 43 }, { name: 'c15-frame', edgeWear: 0.35 });
  const stipple = synth.material('polymer', { size, tileMeters: 0.05, color: o.frameColor ?? [0.028, 0.028, 0.03], extra: 0.95, bumpMm: 0.3, seed: 44 }, { name: 'c15-stipple' });
  const steelBlack = synth.material('parkerized', { size: 512, tileMeters: 0.06, color: [0.018, 0.018, 0.019], wear: 0.06, seed: 45 }, { name: 'c15-steel-black' });
  const pins = synth.material('parkerized', { size: 256, tileMeters: 0.02, color: [0.11, 0.11, 0.115], wear: 0.6, seed: 46 }, { name: 'c15-pins' });
  const magBody = synth.material('parkerized', { size: 512, tileMeters: 0.1, color: [0.025, 0.025, 0.027], wear: 0.3, seed: 47 }, { name: 'c15-mag-body', edgeWear: 0.6 });
  const brass = synth.material('brass', { size: 512, tileMeters: 0.03, seed: 48 }, { name: 'c15-brass' });
  const white = new Material({ name: 'c15-sight-white', baseColor: [0.82, 0.82, 0.78, 1], roughness: 0.55, metallic: 0 });
  const tritium = o.frontSight === 'white'
    ? white
    : new Material({ name: 'c15-tritium', baseColor: [0.75, 0.9, 0.72, 1], roughness: 0.3, metallic: 0, emissive: [0.35, 1, 0.4], emissiveLuminance: 40 });

  const P = new PartBuilder(renderer);
  const SLIDE = { bolt: true };
  const MAG = { magazine: true };

  // ------------------------------------------------------------------ slide (moves)
  // Side silhouette (forward a = −z, up y) with the ejection port notched through; a left wall piece closes the
  // port's left side so the opening sits right of centre and shows the barrel hood, like a real slide.
  const a0 = -D.slideRear, a1 = -D.slideFront;           // rear / front in forward coordinates
  const pa0 = -D.portZ0, pa1 = -D.portZ1, portFloor = 0.004;
  const slideProf: P2[] = [
    [a0, D.slideBottom], [a1 - 0.0075, D.slideBottom], [a1, -0.0085], [a1, 0.0115], [a1 - 0.0045, D.slideTop],
    [pa1, D.slideTop], [pa1, portFloor], [pa0, portFloor], [pa0, D.slideTop],
    [a0 + 0.003, D.slideTop], [a0, D.slideTop - 0.004],
  ];
  P.add(side(slideProf, D.slideWidth, 0.0028), nitride, SLIDE);
  const wallW = 0.0088;
  P.add(side([[pa0, portFloor], [pa1, portFloor], [pa1, D.slideTop], [pa0, D.slideTop]], wallW, 0.0012).translate(-D.slideWidth / 2 + wallW / 2, 0, 0), nitride, SLIDE);
  // breech face / port floor in shadow
  P.add(box(D.slideWidth - wallW - 0.001, 0.0006, Math.abs(D.portZ1 - D.portZ0) - 0.001).translate(wallW / 2, portFloor + 0.0004, (D.portZ0 + D.portZ1) / 2), steelBlack, SLIDE);
  // extractor (right side, behind the port)
  P.add(roundedBox(0.0009, 0.0034, 0.017, 0.0003).translate(D.slideWidth / 2 + 0.0002, 0.0098, 0.007), steelBlack, SLIDE);
  // cocking serrations, forward-raked, rear and front, both sides
  const xs = D.slideWidth / 2 + 0.00015;
  for (const sx of [-1, 1]) {
    for (let i = 0; i < 8; i++) P.add(box(0.0005, 0.0185, 0.0011).rotateX(0.24).translate(sx * xs, 0.0022, 0.053 + i * 0.0034), steelBlack, SLIDE);
    for (let i = 0; i < 5; i++) P.add(box(0.0005, 0.015, 0.0011).rotateX(0.24).translate(sx * xs, 0.0032, -0.058 - i * 0.0034), steelBlack, SLIDE);
  }
  // select-fire switch on the left rear of the slide (moves with the slide): up = SAFE, mid = SEMI, down = AUTO
  P.add(tubeX(0.0026, 0.0016, -D.slideWidth / 2 - 0.0007, 0.004, 0.074), steelBlack, { bolt: true, selector: true });
  P.add(roundedBox(0.0016, 0.011, 0.0045, 0.0007).translate(-D.slideWidth / 2 - 0.0009, 0.004 + 0.0055, 0.074), steelBlack, { bolt: true, selector: true });
  // rear cover plate
  P.add(roundedBox(0.0175, 0.019, 0.0012, 0.002).translate(0, 0.0025, D.slideRear + 0.0004), steelBlack, SLIDE);
  // rear sight: dovetailed block with a square notch and two white dots facing the eye
  const rsTop = D.sightLine, rsBase = D.slideTop - 0.0004, nw = 0.0018, nd = 0.0029;
  const rsProf: P2[] = [[-0.0105, rsBase], [0.0105, rsBase], [0.0105, rsTop - 0.0012], [0.0092, rsTop], [nw, rsTop], [nw, rsTop - nd], [-nw, rsTop - nd], [-nw, rsTop], [-0.0092, rsTop], [-0.0105, rsTop - 0.0012]];
  P.add(section(rsProf, 0.0095, D.rearSightZ - 0.00475, 0.0005), steelBlack, SLIDE);
  for (const sx of [-1, 1]) P.add(discZ(0.0011, 0.0004, sx * 0.0058, rsTop - 0.0022, D.rearSightZ + 0.0001), white, SLIDE);
  // front sight: post with a tritium insert in a white ring
  P.add(section([[-0.00175, D.slideTop - 0.0004], [0.00175, D.slideTop - 0.0004], [0.00175, D.sightLine], [-0.00175, D.sightLine]], 0.0045, D.frontSightZ, 0.0003), steelBlack, SLIDE);
  const fdY = D.sightLine - 0.0021;
  P.add(discZ(0.0013, 0.0003, 0, fdY, D.frontSightZ + 0.00235), white, SLIDE);
  P.add(discZ(0.00075, 0.0004, 0, fdY, D.frontSightZ + 0.00245), tritium, SLIDE);
  // slide nose: recoil-spring guide bore below the muzzle opening
  P.add(discZ(0.0024, 0.0004, 0, -0.0072, D.slideFront - 0.0002), steelBlack, SLIDE);

  // ------------------------------------------------------------------ barrel (stays in the frame)
  // hood fills the port in battery; tube to the crown
  P.add(roundedBox(0.0106, 0.0118, Math.abs(D.portZ1 - D.portZ0) + 0.002, 0.0012).translate(0.0006, D.slideTop - 0.0007 - 0.0059, (D.portZ0 + D.portZ1) / 2), barrelSteel);
  P.add(tubeZ(0.0071, D.portZ1, D.slideFront + 0.0004, 0, 0, seg(28)), barrelSteel);
  // crown: ring + dark rifled bore
  P.add(latheZ([[0.0046, 0], [0.0071, 0], [0.0071, 0.0006], [0.0052, 0.0009], [0.0046, 0.0009]], D.slideFront + 0.0004, 0, seg(28)), barrelSteel);
  P.add(discZ(0.0046, 0.0004, 0, 0, D.slideFront - 0.0003), steelBlack);

  // ------------------------------------------------------------------ frame (polymer)
  const frameProf: P2[] = [
    [-0.0905, -0.0118], [0.094, -0.0118], [0.094, -0.0262], [0.051, -0.0268], [0.0485, -0.031], [0.0465, -0.0535], [0.041, -0.0585],
    [-0.006, -0.0585], [-0.0135, -0.0505], [-0.0185, -0.0455], [-0.0425, -0.1135], [-0.0455, -0.1165], [-0.0855, -0.1165],
    [-0.0885, -0.1135], [-0.0705, -0.0545], [-0.0725, -0.0305], [-0.0845, -0.0225], [-0.0915, -0.0165],
  ];
  const guardHole: P2[] = [[0.0405, -0.0315], [0.0405, -0.0495], [0.037, -0.0525], [-0.0035, -0.0525], [-0.0095, -0.0472], [-0.0125, -0.0315]];
  P.add(side(frameProf, D.frameWidth, 0.0024, [guardHole]), frame);
  // stippled grip shell (slightly proud of the frame on all sides of the grip)
  P.add(side([[-0.0186, -0.0475], [-0.0414, -0.112], [-0.0886, -0.112], [-0.0717, -0.056], [-0.0717, -0.0475]], 0.0293, 0.0042), stipple);
  // flared magwell lip
  P.add(side([[-0.0423, -0.1105], [-0.0408, -0.1172], [-0.0908, -0.1172], [-0.0893, -0.1105]], 0.0305, 0.0018), frame);
  // accessory rail: cross slots underneath + side grooves
  for (const z of [-0.064, -0.078]) P.add(box(0.022, 0.0008, 0.0042).translate(0, -0.0264, z), steelBlack);
  for (const sx of [-1, 1]) P.add(box(0.0006, 0.0028, 0.04).translate(sx * (D.frameWidth / 2 + 0.0001), -0.0228, -0.073), steelBlack);
  // frame pins (trigger + locking block) and takedown lever
  P.add(tubeX(0.0015, D.frameWidth + 0.0007, 0, -0.0215, -0.010), pins);
  P.add(tubeX(0.0015, D.frameWidth + 0.0007, 0, -0.0175, -0.034), pins);
  P.add(roundedBox(D.frameWidth + 0.0009, 0.0028, 0.0055, 0.0006).translate(0, -0.0158, -0.044), pins);
  // slide stop lever (left side) with its thumb pad
  P.add(side([[0.004, -0.0122], [0.027, -0.0122], [0.029, -0.0142], [0.013, -0.0158], [0.004, -0.0152]], 0.0012, 0.0003).translate(-D.frameWidth / 2 - 0.0006, 0, 0), steelBlack);
  // magazine release (left side, behind the trigger guard)
  P.add(roundedBox(0.0032, 0.0068, 0.0082, 0.0011).translate(-D.frameWidth / 2 - 0.0008, -0.0395, 0.0118), stipple);

  // ------------------------------------------------------------------ trigger (flat-faced, hinged shoe)
  const trigProf: P2[] = [[0.0098, -0.0300], [0.0148, -0.0300], [0.0142, -0.0360], [0.0118, -0.0425], [0.0083, -0.0478], [0.0058, -0.0498], [0.0046, -0.0488], [0.0071, -0.0440], [0.0094, -0.0378], [0.0098, -0.0300]];
  P.add(side(trigProf.slice(0, -1), 0.0062, 0.0009), steelBlack, { trigger: true });

  // ------------------------------------------------------------------ magazine (15-round, steel body + polymer base)
  const magProf: P2[] = [[-0.0125, -0.020], [-0.0466, -0.1165], [-0.0864, -0.1165], [-0.0570, -0.020]];
  P.add(side(magProf, 0.0222, 0.0016), magBody, MAG);
  P.add(side([[-0.0455, -0.1165], [-0.0442, -0.1226], [-0.0478, -0.1256], [-0.0880, -0.1256], [-0.0906, -0.1216], [-0.0868, -0.1165]], 0.0262, 0.002), frame, MAG);
  // top round (visible while the magazine is out)
  P.add(latheZ([[0, 0], [0.00495, 0], [0.00495, 0.0185], [0.0047, 0.0195], [0.0040, 0.0235], [0.0026, 0.0272], [0.0010, 0.0290], [0, 0.0293]], -0.046, -0.0172, 24), brass, MAG);
  // follower lip + witness holes along the back of the body
  for (let i = 0; i < 4; i++) {
    const t = 0.25 + i * 0.17;
    const y = -0.020 - t * 0.0965, a = -0.0570 - t * 0.0294 + 0.004;
    P.add(tubeX(0.0012, 0.0226, 0, y, -a, 12), steelBlack, MAG);
  }

  const parts = P.finish();
  const casingMesh = new Mesh(renderer.dev, casingGeometry(0.019, 0.0099, lathe, { straight: true }));
  void cylinder; void vec3;

  const model: FirearmModel = {
    parts,
    muzzle: vec3.create(0, 0, D.slideFront - 0.001),
    ejectionPort: vec3.create(0.0105, 0.0125, (D.portZ0 + D.portZ1) / 2),
    rearSight: vec3.create(0, D.sightLine, D.rearSightZ),
    frontSight: vec3.create(0, D.sightLine, D.frontSightZ),
    casingMesh,
    casingMaterial: brass,
    // grip rake ≈ 18°: the magazine leaves the magwell down and back
    magAxis: vec3.normalize(vec3.create(), vec3.create(0, -0.951, 0.309)),
    magBox: { center: vec3.create(0, -0.07, 0.051), half: vec3.create(0.0131, 0.053, 0.019) },
    triggerTravelM: 0.0045,
    selector: { pivot: [-D.slideWidth / 2 - 0.0008, 0.004, 0.074], axis: [1, 0, 0], angles: { safe: 0, semi: -0.9, auto: -1.8 } },
  };
  return { model, spec: compactPistolSpec(D.sightLine), grips: COMPACT_PISTOL_GRIPS };
}

/** Two-handed thumbs-forward grip on the C15 (weapon space). Tune live in the viewer. */
export const COMPACT_PISTOL_GRIPS: WeaponGrips = {
  right: {
    position: [0.0285, -0.0326, 0.1253], fingerDir: [0, -0.309, -0.951], dorsal: [1, 0, 0],
    fingers: [{ curl: [0.5, 0.7, 0.3], spread: 0.42 }, { curl: [1.25, 1.35, 0.7] }, { curl: [1.3, 1.35, 0.7] }, { curl: [1.35, 1.3, 0.7] }],
    thumb: { dir: [-0.55, -0.55, -0.62], bend: [0.15, 0.1] },
  },
  indexPressed: { curl: [0.55, 0.95, 0.45], spread: 0.42 },
  left: {
    position: [-0.034, -0.0325, 0.0823], fingerDir: [0, -0.5, -0.866], dorsal: [-1, 0, 0],
    fingers: [{ curl: [1.15, 1.2, 0.6] }, { curl: [1.2, 1.2, 0.6] }, { curl: [1.2, 1.2, 0.6] }, { curl: [1.2, 1.15, 0.6] }],
    thumb: { dir: [-0.5, -0.1, -0.86], bend: [0.05, 0.05] },
  },
  leftOnMagazine: {
    position: [0.0, -0.15, 0.13], fingerDir: [0, 0.25, -0.97], dorsal: [0, -1, 0],
    fingers: [{ curl: [0.9, 0.9, 0.4] }, { curl: [0.95, 0.9, 0.4] }, { curl: [0.95, 0.9, 0.4] }, { curl: [0.95, 0.9, 0.4] }],
    thumb: { dir: [-0.7, 0.2, -0.6], bend: [0.2, 0.1] },
  },
};

/** Physical + handling parameters for the C15 Compact (all tunable at runtime from F1 → Weapon). */
export function compactPistolSpec(sightHeightM: number = C15.sightLine): FirearmSpec {
  return {
    name: 'C15 Compact 9mm',
    caliber: CALIBERS['9x19 124gr'],
    barrelLengthM: 0.102,
    massKg: 0.84,                 // loaded (15 × 124 gr + magazine)
    rpm: 1100,                    // cyclic rate in auto; semi is limited by your trigger finger
    fireModes: ['safe', 'semi', 'auto'],
    magazineCapacity: 15,
    sightHeightM,
    zeroM: 23,                    // 25 yd point-of-aim / point-of-impact
    accuracyMoa: 3,
    recoil: {
      // a pistol pivots at the wrists: high bore over the grip, low inertia, eyes don't ride the gun
      boreAboveShoulderM: 0.045,
      inertia: 0.075,
      shoulderMassKg: 3.5,
      holdOmega: 15,
      holdDamping: 0.55,
      horizontalRatio: 0.3,
      viewCouplingHip: 0.04,
      viewCouplingAds: 0.1,
      residualRise: 0.06,
    },
    reload: { magOut: 0.45, magIn: 0.85, boltRelease: 0.35 },
    audio: GUNSHOTS.pistol9mm,
    flash: { kelvin: 1850, luminance: 4.5e5, sizeM: 0.07, lightCandela: 12000, sidePorts: false, smoke: 0.5 },
    ejection: { speed: 3.2, up: 2.4, back: 1.0, spinRad: 35 },
    hipOffset: [0.05, -0.15, -0.40],
    eyeRelief: 0.56,              // arms extended, two-handed
    adsTime: 0.22,
    action: { travelM: C15.slideTravel, backMs: 5, returnMs: 8, lockOpenOnEmpty: true, lockFraction: 0.93 },
    drawTime: 0.45,
  };
}
