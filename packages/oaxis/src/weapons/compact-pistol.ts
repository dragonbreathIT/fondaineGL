// "C15 Compact": an original compact 9×19 polymer-frame, striker-fired pistol (fondaine design).
// Class-typical dimensions: 102 mm barrel, ≈186 mm overall, ≈127 mm tall with the magazine, 25.5 mm slide,
// 15+1 rounds, ≈0.84 kg loaded. Everything is modelled at real scale in weapon space
// (+x right, +y up, −z towards the muzzle, bore on y = 0, breech face at z ≈ −0.003).
//
// Design language (deliberately not a copy of any production pistol): tall 45° slide chamfers with a wide top
// flat, forward-raked front + rear serrations cut 0.6 mm into the slide, a squared ejection port with the
// extractor let into the right flat, a flat-faced trigger with a centre safety blade, a high undercut trigger
// guard, a wrap-around textured grip module with two shallow finger reliefs, and a flat beavertail.
//
// Animated groups:
//   slide (bolt)   – cycles 34 mm per shot, locks open on an empty magazine, slams home on slide release
//   magazine       – drops free on reload (spawned as a physics body), new one is inserted
//   trigger        – travels back when pulled
//   selector       – the slide-mounted fire-mode lever (SAFE / SEMI / AUTO) rotates about x
// The barrel stays in the frame, so with the slide locked back it sticks out of the nose like a real one.

import { Material, Mesh, Renderer, Geometry, lathe, vec3, box, roundedBox, extrude } from '@fondaine/gl';
import { GUNSHOTS } from '@fondaine/vorp';
import { FirearmModel, FirearmSpec, CALIBERS, casingGeometry } from '@fondaine/gl';
import { OAXIS, seg } from '../tuning';
import { PartBuilder, section, tubeZ, tubeX, tubeY, discZ, latheZ, P2, Prof, Profile, loft, prism, groovedLoft, rrect, Station, screwHeadX, filletPoly, plate, slab, bar, roundedPath, pinX, V3 } from './build';
import { engravingMaterial, engravingQuadX } from './engrave';
import type { WeaponGrips } from '../viewmodel/hands';

export interface WeaponBuild { model: FirearmModel; spec: FirearmSpec; grips?: WeaponGrips; /** build statistics */ stats?: { triangles: number; buildMs: number } }

export interface CompactPistolOptions {
  /** Procedural texture resolution (px). */
  textureSize?: number;
  /** Slide finish colour (linear RGB). Default: black nitride. */
  slideColor?: [number, number, number];
  /** Frame polymer colour (linear RGB). Default: black. Try [0.16, 0.13, 0.09] for FDE, [0.06, 0.07, 0.05] for OD. */
  frameColor?: [number, number, number];
  /** Front sight insert: 'tritium' (green, glows) or 'white'. */
  frontSight?: 'tritium' | 'white';
  /** Roll marks on the slide / frame (default on; needs a 2D canvas). */
  engravings?: boolean;
  /** Bake per-part atlases with ray-cast ambient occlusion (default on). */
  bake?: boolean;
}

// ---------------------------------------------------------------------------------------------- dimensions
export const C15 = {
  slideRear: 0.088,       // z of the slide's rear face
  slideFront: -0.0975,    // z of the slide nose (muzzle crown flush)
  slideTop: 0.0165,       // y of the slide's top flat
  slideBottom: -0.0115,
  frameTop: -0.0125,      // frame top flat (1 mm seam under the slide, filled by the steel rail strip)
  slideWidth: 0.0255,
  frameWidth: 0.0265,
  sightLine: 0.0225,      // y of the front post top / rear notch top
  rearSightZ: 0.082,      // rear face of the rear sight (towards the eye)
  frontSightZ: -0.088,
  slideTravel: 0.034,
  portZ0: -0.003, portZ1: -0.040, // ejection port opening along z (in battery)
} as const;

const TAU = Math.PI * 2;

/** Slide cross-section (CCW, fixed point count so every station morphs into every other). */
function slideProfile(o: { hw?: number; yb?: number; yt?: number; chamfer?: number; grooveL?: number; grooveR?: number; port?: boolean; xin?: number; portFloor?: number }): Profile {
  const D = C15;
  const hw = o.hw ?? D.slideWidth / 2, yb = o.yb ?? D.slideBottom, yt = o.yt ?? D.slideTop, c = o.chamfer ?? 0.0042;
  const rf = 0.0009, rc = 0.0005, n = 4;
  const yLo = -0.0055, yHiFull = 0.0105;
  const gR = o.grooveR ?? 0, gL = o.grooveL ?? 0;
  const port = !!o.port, xin = o.xin ?? -hw + 0.0075, pf = o.portFloor ?? -0.0005;
  const yHiR = port ? pf : yHiFull;
  const p = new Prof();
  // bottom-right fillet
  p.arc(hw - rf, yb + rf, rf, -Math.PI / 2, 0, n);
  // right wall with the serration recess band
  p.pt(hw, yLo).pt(hw - gR, yLo).pt(hw - gR, yHiR).pt(hw, yHiR);
  // wall → chamfer fillet (45°): tangent length t = rc·tan(22.5°)
  const t = rc * Math.tan(Math.PI / 8);
  const s2 = Math.SQRT1_2;
  const cornerArc = (cx: number, cy: number, inDir: [number, number], outDir: [number, number]) => {
    // fillet between incoming direction and outgoing direction at corner (cx, cy)
    const p0: P2 = [cx - inDir[0] * t, cy - inDir[1] * t], p1: P2 = [cx + outDir[0] * t, cy + outDir[1] * t];
    // centre: offset from p0 along the inward normal of inDir (left normal for CCW)
    const nl: [number, number] = [-inDir[1], inDir[0]];
    const ctr: P2 = [p0[0] + nl[0] * rc, p0[1] + nl[1] * rc];
    const a0 = Math.atan2(p0[1] - ctr[1], p0[0] - ctr[0]), a1 = Math.atan2(p1[1] - ctr[1], p1[0] - ctr[0]);
    let da = a1 - a0; while (da > Math.PI) da -= TAU; while (da < -Math.PI) da += TAU;
    p.arc(ctr[0], ctr[1], rc, a0, a0 + da, n);
  };
  if (port) { for (let k = 0; k <= n; k++) p.pt(hw, pf); for (let k = 0; k <= n; k++) p.pt(xin, pf); }
  else { cornerArc(hw, yt - c, [0, 1], [-s2, s2]); cornerArc(hw - c, yt, [-s2, s2], [-1, 0]); }
  p.pt(xin, yt, !port);
  cornerArc(-hw + c, yt, [-1, 0], [-s2, -s2]);
  cornerArc(-hw, yt - c, [-s2, -s2], [0, -1]);
  p.pt(-hw, yHiFull).pt(-hw + gL, yHiFull).pt(-hw + gL, yLo).pt(-hw, yLo);
  p.arc(-hw + rf, yb + rf, rf, Math.PI, Math.PI * 1.5, n);
  return p.done();
}

/** Grip cross-section at depth d below the frame top: (x, z) rounded box with a soft front strap, palm swell + reliefs. */
function gripProfile(d: number, flare = 0): Profile {
  const t = (d - 0.028) / (0.1165 - 0.028);
  // front strap (towards the trigger guard) and back strap z, both raked
  let zF = 0.0185 + 0.0229 * t, zB = 0.0725 + 0.0161 * t;
  // two shallow finger reliefs on the front strap (middle + ring finger), 0.7 mm deep
  zF += 0.0007 * (Math.exp(-((d - 0.067) ** 2) / (2 * 0.006 ** 2)) + Math.exp(-((d - 0.089) ** 2) / (2 * 0.006 ** 2)));
  // palm swell on the back strap, concave web under the beavertail
  zB += 0.0016 * Math.exp(-((d - 0.078) ** 2) / (2 * 0.014 ** 2)) - 0.0006 * Math.exp(-((d - 0.034) ** 2) / (2 * 0.008 ** 2));
  let hw = 0.0128 + 0.0021 * Math.sin(Math.PI * Math.min(1, Math.max(0, (d - 0.03) / 0.09))) ** 0.7;
  hw += flare; zF -= flare * 0.6; zB += flare * 0.8;
  const rf = Math.min(0.0098, hw - 0.0012), rb = Math.min(0.0068, hw - 0.0012);
  const p = new Prof();
  p.arc(hw - rf, zF + rf, rf, -Math.PI / 2, 0, 12);
  p.arc(hw - rb, zB - rb, rb, 0, Math.PI / 2, 9);
  p.arc(-hw + rb, zB - rb, rb, Math.PI / 2, Math.PI, 9);
  p.arc(-hw + rf, zF + rf, rf, Math.PI, Math.PI * 1.5, 12);
  return p.done();
}

export function buildCompactPistol(renderer: Renderer, o: CompactPistolOptions = {}): WeaponBuild {
  const t0 = performance.now();
  const synth = renderer.synth;
  const size = o.textureSize ?? OAXIS.textureSize;
  const small = Math.min(size, 1024), tiny = Math.min(size, 512);
  const D = C15;

  // ------------------------------------------------------------------ materials (physically based, procedural)
  // slide: brushed nitride, machining lines lengthwise (loft v), holster wear on the high points
  const nitride = synth.material('brushed', { size, tileMeters: 0.1, color: o.slideColor ?? [0.03, 0.031, 0.035], wear: 0.05, roughness: 0.36, seed: 41, bumpMm: 0.006, extra: 0 }, { name: 'c15-slide-nitride', edgeWear: 0.7, edgeWearRadius: 0.0022, specular: 0.5 });
  const barrelSteel = synth.material('machined', { size: small, tileMeters: 0.05, color: [0.46, 0.46, 0.47], wear: 0.25, roughness: 0.3, seed: 42, extra: 1 }, { name: 'c15-barrel', edgeWear: 0.3 });
  const frameColor = o.frameColor ?? [0.03, 0.03, 0.032];
  // frame: glass-filled nylon with a fine mould texture and a slight sheen; the grip panels carry a 1.2 mm stipple
  // (worley cells at 180 / tile → tile 0.216 m) and the grime of a hand that has held it a lot
  const frame = synth.material('polymer', { size, tileMeters: 0.12, color: frameColor, extra: 0.3, roughness: 0.5, bumpMm: 0.1, dirt: 0.05, seed: 43 }, { name: 'c15-frame', edgeWear: 0.12, edgeWearRadius: 0.0012, specular: 0.45 });
  const stipple = synth.material('polymer', { size, tileMeters: 0.216, color: frameColor, extra: 0.97, roughness: 0.6, bumpMm: 0.45, dirt: 0.4, seed: 44 }, { name: 'c15-stipple', edgeWear: 0.12, edgeWearRadius: 0.0012, specular: 0.45 });
  const steelBlack = synth.material('parkerized', { size: small, tileMeters: 0.06, color: [0.02, 0.02, 0.021], wear: 0.12, seed: 45 }, { name: 'c15-steel-black', edgeWear: 0.5, edgeWearRadius: 0.002 });
  const park = synth.material('parkerized', { size: small, tileMeters: 0.05, color: [0.045, 0.046, 0.045], wear: 0.3, seed: 46 }, { name: 'c15-parkerized', edgeWear: 0.6, edgeWearRadius: 0.002 });
  const pins = synth.material('machined', { size: tiny, tileMeters: 0.02, color: [0.16, 0.16, 0.165], wear: 0.4, roughness: 0.4, seed: 47, extra: 0.4 }, { name: 'c15-pins' });
  const magBody = synth.material('brushed', { size: small, tileMeters: 0.1, color: [0.034, 0.034, 0.036], wear: 0.1, roughness: 0.42, seed: 48, bumpMm: 0.006, extra: 0 }, { name: 'c15-mag-body', edgeWear: 0.75, edgeWearRadius: 0.0025 });
  const brass = synth.material('brass', { size: tiny, tileMeters: 0.03, seed: 49 }, { name: 'c15-brass' });
  const white = new Material({ name: 'c15-sight-white', baseColor: [0.85, 0.85, 0.8, 1], roughness: 0.5, metallic: 0 });
  const follower = new Material({ name: 'c15-follower', baseColor: [0.75, 0.22, 0.03, 1], roughness: 0.6, metallic: 0 });
  const dark = new Material({ name: 'c15-cavity', baseColor: [0.02, 0.02, 0.02, 1], roughness: 0.9, metallic: 0.3 });
  const tritium = o.frontSight === 'white'
    ? white
    : new Material({ name: 'c15-tritium', baseColor: [0.75, 0.9, 0.72, 1], roughness: 0.3, metallic: 0, emissive: [0.35, 1, 0.4], emissiveLuminance: 40 });

  const P = new PartBuilder(renderer);
  const SLIDE = { bolt: true };
  const MAG = { magazine: true };
  const hw = D.slideWidth / 2;

  // ------------------------------------------------------------------ slide (moves): one lofted body
  {
    const full = slideProfile({});
    const gLR = slideProfile({ grooveL: 0.0009, grooveR: 0.0009 });
    const port = slideProfile({ port: true });
    const rake = -0.16, rakeY = 0.0025;      // serration tops lean towards the muzzle
    const st: Station[] = [];
    // rear face with a bevelled top edge
    st.push({ z: D.slideRear, prof: slideProfile({ yt: D.slideTop - 0.0035, chamfer: 0.0042 }) });
    st.push({ z: D.slideRear - 0.0035, prof: full });
    // rear serrations: 8 grooves, 1.5 mm wide, 3.4 mm pitch (both sides)
    const groove = (z: number, prof: Profile) => st.push({ z, prof: full, shear: rake, shearY0: rakeY }, { z, prof, shear: rake, shearY0: rakeY }, { z: z - 0.0015, prof, shear: rake, shearY0: rakeY }, { z: z - 0.0015, prof: full, shear: rake, shearY0: rakeY });
    for (let i = 0; i < 8; i++) groove(0.0775 - i * 0.0034, gLR);
    // ejection port: right wall and top open from portZ0 to portZ1, relief notch at the rear
    st.push({ z: D.portZ0 + 0.004, prof: full }, { z: D.portZ0 + 0.004, prof: slideProfile({ port: true, portFloor: 0.0075 }) });
    st.push({ z: D.portZ0, prof: slideProfile({ port: true, portFloor: 0.0075 }) }, { z: D.portZ0, prof: port });
    st.push({ z: D.portZ1, prof: port }, { z: D.portZ1, prof: full });
    // front serrations: 5 grooves, both sides
    for (let i = 0; i < 5; i++) groove(-0.0565 - i * 0.0034, gLR);
    // nose: the top and bottom bevels and the plan chamfers blend in over 7 mm with a rounded (tangent) start,
    // then the last 1.2 mm is a crisp 45° break to the muzzle face
    const noseAt = (t: number) => slideProfile({ yb: D.slideBottom + 0.003 * t, yt: D.slideTop - 0.0047 * t, hw: hw - 0.0022 * t, chamfer: 0.0042 });
    st.push({ z: -0.0905, prof: full });
    for (let k = 1; k <= 5; k++) { const t = 1 - Math.cos((k / 5) * (Math.PI / 2)); st.push({ z: -0.0905 - 0.0058 * (k / 5), prof: noseAt(t * 0.85), smooth: true }); }
    st.push({ z: D.slideFront, prof: noseAt(1.0) });
    P.add(loft(st, { capUV: 'stack' }), nitride, SLIDE);
    // muzzle opening + recoil-spring guide bore in the nose
    P.add(discZ(0.0082, 0.0004, 0, 0, D.slideFront - 0.00015, seg(28)), dark, SLIDE);
    P.add(discZ(0.0046, 0.0006, 0, -0.0068, D.slideFront - 0.00015, seg(20)), dark, SLIDE);
    P.add(discZ(0.0031, 0.0012, 0, -0.0068, D.slideFront - 0.0002, seg(16)), park, SLIDE); // guide rod end
    // breech face details on the port's rear wall (visible when locked back): firing pin hole + extractor claw
    P.add(discZ(0.0011, 0.0005, 0.0006, 0.0, D.portZ0 + 0.0001, 10), dark, SLIDE);
    // extractor: let into the right flat behind the port, slight proud tail (loaded-chamber indicator)
    P.add(roundedBox(0.0012, 0.0046, 0.0205, 0.0004, 4).translate(hw - 0.0004, 0.0048, D.portZ0 + 0.0105), park, SLIDE);
    P.add(roundedBox(0.0009, 0.0028, 0.004, 0.0003, 4).translate(hw + 0.0003, 0.0048, D.portZ0 + 0.0185), park, SLIDE);
    // select-fire lever on the left rear (moves with the slide): up = SAFE, mid = SEMI, down = AUTO
    P.add(tubeX(0.0029, 0.0014, -hw - 0.0001, 0.004, 0.074, seg(32)), park, { bolt: true, selector: true });
    P.add(roundedBox(0.0018, 0.0115, 0.0046, 0.0008, 5).translate(-hw - 0.0012, 0.004 + 0.0058, 0.074), park, { bolt: true, selector: true });
    for (let i = 0; i < 4; i++) P.add(box(0.0004, 0.0004, 0.004).translate(-hw - 0.0021, 0.0065 + i * 0.0022, 0.074), steelBlack, { bolt: true, selector: true });
    // rear cover plate with the striker channel + the striker tail
    P.add(slab(rrect(0.0178, 0.0218, 0.0018, 5, 0, 0.0018), 0.0012, 0.0004, 3).translate(0, 0, D.slideRear + 0.0006), park, SLIDE);
    P.add(discZ(0.0028, 0.0004, 0.0, 0.0006, D.slideRear + 0.00125, 14), dark, SLIDE);
    P.add(discZ(0.0017, 0.0007, 0.0, 0.0006, D.slideRear + 0.0013, 12), pins, SLIDE);
    // rear sight: dovetailed steel block, serrated rear face, square notch, two white dots
    const rsTop = D.sightLine, rsBase = D.slideTop - 0.0003, nw = 0.0019, nd = 0.0031;
    const rsProf: P2[] = [[-0.0105, rsBase], [0.0105, rsBase], [0.0105, rsTop - 0.0014], [0.0094, rsTop], [nw, rsTop], [nw, rsTop - nd], [-nw, rsTop - nd], [-nw, rsTop], [-0.0094, rsTop], [-0.0105, rsTop - 0.0014]];
    P.add(slab(filletPoly(rsProf, [0.0006, 0.0006, 0.0003, 0.0003, 0.0002, 0.0002, 0.0002, 0.0002, 0.0003, 0.0003], 3), 0.0092, 0.0005, 3).translate(0, 0, D.rearSightZ - 0.0046), park, SLIDE);
    for (let i = 0; i < 5; i++) P.add(box(0.0186, 0.0005, 0.0004).translate(0, rsBase + 0.0009 + i * 0.001, D.rearSightZ + 0.0001), steelBlack, SLIDE);
    for (const sx of [-1, 1]) P.add(discZ(0.0012, 0.0004, sx * 0.0058, rsTop - 0.0021, D.rearSightZ + 0.0002), white, SLIDE);
    // front sight: ramped post with a tritium insert in a white ring
    P.add(plate(filletPoly([[-D.frontSightZ - 0.0028, D.slideTop - 0.0003], [-D.frontSightZ + 0.0022, D.slideTop - 0.0003], [-D.frontSightZ + 0.0022, D.sightLine], [-D.frontSightZ - 0.001, D.sightLine]], [0, 0, 0.0004, 0.0004], 3), 0.0036, 0.0003, 3), park, SLIDE);
    const fdY = D.sightLine - 0.0022;
    P.add(discZ(0.0013, 0.0003, 0, fdY, D.frontSightZ + 0.00235), white, SLIDE);
    P.add(discZ(0.00075, 0.0005, 0, fdY, D.frontSightZ + 0.00245), tritium, SLIDE);
  }

  // ------------------------------------------------------------------ barrel (stays in the frame): stainless
  {
    // chamber block with the hood filling the port; slightly right of centre like the real thing
    const chamber = rrect(0.0168, 0.0246, 0.0042, 4, 0.0006, 0.0035);
    P.add(prism(chamber, D.portZ0 - 0.0002, D.portZ1 - 0.003), barrelSteel);
    // chamber mouth on the hood's rear face + feed ramp
    P.add(discZ(0.0052, 0.0004, 0.0006, 0.0, D.portZ0 + 0.00005, seg(20)), dark);
    // taper to the tube, tube to the crown
    P.add(latheZ([[0.0071, 0], [0.0071, 0.006], [0.0082, 0.009], [0.0082, 0.0], [0.0071, 0]], D.portZ1 - 0.003, 0, seg(64)), barrelSteel);
    P.add(tubeZ(0.0071, D.portZ1 - 0.003, D.slideFront + 0.0006, 0, 0, seg(64)), barrelSteel);
    // crown: 11° target crown + dark rifled bore
    P.add(latheZ([[0.0046, 0], [0.0062, 0], [0.0071, 0.0009], [0.0071, 0.0012], [0.0046, 0.0012]], D.slideFront + 0.0004, 0, seg(64)), barrelSteel);
    P.add(discZ(0.0046, 0.0004, 0, 0, D.slideFront - 0.0004), dark);
  }

  // ------------------------------------------------------------------ frame (polymer)
  const W = D.frameWidth;
  {
    // receiver body (dust cover, trigger housing, beavertail): one filleted, smooth-shaded moulding;
    // the grip module is lofted separately below
    const ft = D.frameTop;
    const frameProf: P2[] = [
      [-0.094, ft], [0.0905, ft], [0.094, ft - 0.0036], [0.094, -0.0262],
      [0.051, -0.0268], [0.0485, -0.0288], [-0.0125, -0.0288], [-0.0185, -0.0335], [-0.0185, -0.047],
      [-0.0775, -0.054], [-0.0738, -0.0305], [-0.0845, -0.0228], [-0.0915, -0.0168], [-0.094, ft - 0.0006],
    ];
    const frameR = [0.0006, 0.0006, 0.0012, 0.0028, 0.0012, 0.0015, 0.0012, 0.002, 0.003, 0.004, 0.003, 0.002, 0.0025, 0.0006];
    P.add(plate(filletPoly(frameProf, frameR, 5), W, 0.0018, 5), frame);
    // steel frame rails / slide seam: inset dark strip under the slide, with the rail lands proud at front and rear
    P.add(plate(filletPoly([[-0.0915, ft - 0.0003], [0.0905, ft - 0.0003], [0.0905, D.slideBottom + 0.0001], [-0.0915, D.slideBottom + 0.0001]], 0.0002, 2), W - 0.0022, 0.0002, 2), steelBlack);
    for (const sx of [-1, 1]) {
      P.add(roundedBox(0.0012, 0.0012, 0.028, 0.0003, 4).translate(sx * (W / 2 - 0.0011 + 0.0003), -0.0121, -0.055), park);  // front rails
      P.add(roundedBox(0.0012, 0.0012, 0.02, 0.0003, 4).translate(sx * (W / 2 - 0.0011 + 0.0003), -0.0121, 0.065), park);    // rear rails
    }
    // trigger guard: an 11 mm wide rounded bow swept around the loop, thicker at the front where a support
    // finger rests, undercut high at the rear into the grip
    {
      const path = roundedPath([[0, -0.020, -0.047], [0, -0.0545, -0.047], [0, -0.0572, -0.004], [0, -0.0505, 0.0135], [0, -0.0335, 0.0245]] as V3[], [0, 0.0065, 0.012, 0.0055, 0], 10);
      const sc = (t: number): [number, number] => { const k = t < 0.3 ? 1 : t < 0.5 ? 1 - (t - 0.3) / 0.2 : 0; return [1 + 0.18 * k, 1]; };
      P.add(bar(path, 0.0056, 0.0112, 0.0022, 5, sc), frame);
    }
    // grip module: lofted along the (raked) grip axis, plain polymer at the top, textured below the guard
    const depths: number[] = [];
    for (let d = 0.028; d <= 0.1125 + 1e-9; d += 0.0021) depths.push(d);
    const upper = depths.filter((d) => d <= 0.0455 + 1e-9), lower = depths.filter((d) => d >= 0.0455 - 1e-9);
    const mk = (ds: number[], extra: Station[] = []): Geometry => loft([...ds.map((d, i) => ({ z: d, prof: gripProfile(d), smooth: i > 0 })), ...extra], { capStart: false, capEnd: false, capUV: 'stack' }).rotateX(Math.PI / 2);
    P.add(mk(upper), frame);
    P.add(mk(lower, [{ z: 0.1145, prof: gripProfile(0.1145, 0.0008), smooth: true }, { z: 0.1165, prof: gripProfile(0.1165, 0.0016), smooth: false }, { z: 0.1172, prof: gripProfile(0.1165, 0.0014) }]), stipple);
    // magwell cavity (inside faces) + bottom lip ring
    const cav = prism(rrect(0.0236, 0.0356, 0.004, 4), 0, 0.105, { capEnd: false }).flipWinding();
    P.add(cav.rotateX(Math.PI / 2 - Math.atan2(0.309, 0.951)).translate(0, -0.0135, 0.0365), dark);
    // textured side panels (0.5 mm proud, rounded) on the grip module
    for (const sx of [-1, 1]) {
      const panel = slab(rrect(0.0205, 0.052, 0.004, 6), 0.0012, 0.0005, 3);
      P.add(panel.rotateY(sx * Math.PI / 2).transform(gripPanelTransform(sx)), stipple);
    }
    // accessory rail under the dust cover: 21 mm head with two cross slots
    {
      const railFull = new Prof().pt(0.0105, -0.0262).pt(0.0105, -0.0278).pt(0.0083, -0.0300).pt(-0.0083, -0.0300).pt(-0.0105, -0.0278).pt(-0.0105, -0.0262).done();
      const railCut = new Prof().pt(0.0105, -0.0262).pt(0.0105, -0.0266).pt(0.0083, -0.0266).pt(-0.0083, -0.0266).pt(-0.0105, -0.0266).pt(-0.0105, -0.0262).done();
      P.add(groovedLoft(railFull, railCut, -0.050, -0.092, [[-0.061, -0.0662], [-0.075, -0.0802]]), frame);
    }
    // frame pins: trigger pin, locking block pin, trigger housing pin
    P.add(pinX(0.0016, W + 0.0006, 0, -0.0215, -0.010), pins);
    P.add(pinX(0.0016, W + 0.0006, 0, -0.0180, -0.034), pins);
    P.add(pinX(0.0015, W + 0.0006, 0, -0.0215, 0.072), pins);
    // takedown lever: serrated tabs on both sides
    for (const sx of [-1, 1]) {
      P.add(roundedBox(0.0011, 0.0028, 0.0096, 0.0005, 4).translate(sx * (W / 2 + 0.0004), -0.0165, -0.044), park);
      for (let i = 0; i < 4; i++) P.add(box(0.0005, 0.0032, 0.0005).translate(sx * (W / 2 + 0.0009), -0.0165, -0.0405 - i * 0.0022), steelBlack);
    }
    // slide stop lever (left): flat spring-steel lever with a chequered thumb pad, pinned at the locking block
    const ssProf: P2[] = [[0.004, -0.0138], [0.0262, -0.0138], [0.0300, -0.0150], [0.0320, -0.0172], [0.0282, -0.0188], [0.0210, -0.0176], [0.012, -0.0165], [0.004, -0.0162]];
    P.add(plate(filletPoly(ssProf, 0.0006, 3), 0.0016, 0.0004, 3).translate(-W / 2 - 0.0009, 0, 0), park);
    P.add(plate(filletPoly([[0.0180, ft], [0.0260, ft], [0.0276, ft - 0.0016], [0.0176, ft - 0.0028]], 0.0005, 3), 0.0024, 0.0005, 3).translate(-W / 2 - 0.0016, 0, 0), park);
    P.add(screwHeadX(0.0017, -W / 2 - 0.0018, -0.0180, -0.034, -1, 'dome'), pins);
    // magazine release: chequered button in a fence (left side) + the catch's other end (right side, flush)
    P.add(roundedBox(0.0024, 0.0098, 0.0106, 0.0014, 5).translate(-W / 2 - 0.0012 + 0.0006, -0.0395, 0.0135), frame);
    P.add(roundedBox(0.0034, 0.0066, 0.0074, 0.0012, 5).translate(-W / 2 - 0.0022, -0.0395, 0.0135), stipple);
    P.add(roundedBox(0.0012, 0.0066, 0.0074, 0.0008, 5).translate(W / 2 + 0.0004, -0.0395, 0.0135), park);
    // roll marks: slide flats + frame serial plate (laser engraving)
    if (o.engravings !== false) {
      const left = engravingMaterial(renderer, ['C15 COMPACT  9x19'], 0.054, 0.0046, { px: 2048, tracking: 0.14 });
      if (left) P.add(engravingQuadX(-hw - 0.00006, 0.0032, 0.0135, 0.054, 0.0046, -1), left, SLIDE);
      const right = engravingMaterial(renderer, ['FONDAINE ARMS   MOD. C15'], 0.066, 0.0034, { px: 2048, tracking: 0.12 });
      if (right) P.add(engravingQuadX(hw + 0.00006, -0.0062, 0.012, 0.066, 0.0034, 1), right, SLIDE);
      const serialPlate = roundedBox(0.0008, 0.0062, 0.030, 0.0003, 4).translate(W / 2 + 0.00015, -0.0205, -0.070);
      P.add(serialPlate, pins);
      const serial = engravingMaterial(renderer, ['FA 2209 0417'], 0.028, 0.0036, { px: 1024, color: [0.12, 0.12, 0.125], metallic: 0.9, roughness: 0.5, tracking: 0.1 });
      if (serial) P.add(engravingQuadX(W / 2 + 0.00062, -0.0205, -0.070, 0.028, 0.0036, 1), serial);
      const leftFrame = engravingMaterial(renderer, ['C15'], 0.009, 0.0045, { px: 512, color: [0.07, 0.07, 0.072], metallic: 0, roughness: 0.7, tracking: 0.05, align: 'center' });
      if (leftFrame) P.add(engravingQuadX(-W / 2 - 0.00006, -0.0225, -0.075, 0.009, 0.0045, -1), leftFrame);
    }
  }

  // ------------------------------------------------------------------ trigger (flat-faced shoe with a centre safety blade)
  {
    const trigProf: P2[] = [[0.0098, -0.0300], [0.0150, -0.0300], [0.0146, -0.0350], [0.0126, -0.0420], [0.0094, -0.0478], [0.0060, -0.0500], [0.0046, -0.0490], [0.0072, -0.0440], [0.0094, -0.0378]];
    P.add(plate(filletPoly(trigProf, [0.0008, 0.0008, 0.0012, 0.0012, 0.0012, 0.0012, 0.0008, 0.0008, 0.0008], 4), 0.0066, 0.0012, 4), park, { trigger: true });
    P.add(plate(filletPoly([[0.0152, -0.0340], [0.0166, -0.0345], [0.0146, -0.0470], [0.0120, -0.0478], [0.0126, -0.0420]], 0.0004, 3), 0.0022, 0.0005, 3), steelBlack, { trigger: true });
  }

  // ------------------------------------------------------------------ magazine (15-round, steel body + polymer base)
  {
    const tilt = Math.PI / 2 - Math.atan2(0.309, 0.951); // rotateX angle that maps +z (loft axis) onto the mag axis
    const place = (g: Geometry) => g.rotateX(tilt).translate(0, -0.0195, 0.0385);
    // body: rounded box, slightly tapered at the top, feed-lip notch at the top rear
    const body = rrect(0.0222, 0.0338, 0.0038, 8);
    const bodyTop = rrect(0.0214, 0.0330, 0.0036, 8);
    P.add(place(loft([{ z: -0.001, prof: bodyTop }, { z: 0.006, prof: body, smooth: true }, { z: 0.1005, prof: body }], { capStart: false, capUV: 'stack' })), magBody, MAG);
    // follower + top round (visible once the magazine is out)
    P.add(place(prism(rrect(0.0196, 0.0300, 0.003, 3), -0.0035, 0.004)), follower, MAG);
    const round = lathe([[0, 0], [0.00495, 0], [0.00495, 0.0185], [0.0047, 0.0195], [0.0040, 0.0235], [0.0026, 0.0272], [0.0010, 0.0290], [0, 0.0293]], seg(40));
    P.add(round.rotateX(-Math.PI / 2).translate(0.0025, -0.0155, 0.0535), brass, { ...MAG, round: true });
    // baseplate with a lip, retained by a floor plate insert
    const base = rrect(0.0262, 0.0392, 0.0032, 6);
    P.add(place(loft([{ z: 0.0995, prof: rrect(0.0232, 0.0348, 0.003, 6) }, { z: 0.1015, prof: base }, { z: 0.1075, prof: base }, { z: 0.1095, prof: rrect(0.0242, 0.0372, 0.0032, 6) }], { capUV: 'stack' })), frame, MAG);
    P.add(place(discZ(0.0028, 0.0006, 0, 0.004, 0.1097, 12)), pins, MAG);
    // witness holes down the back of the body
    for (let i = 0; i < 6; i++) P.add(place(tubeY(0.0011, 0.0006, 0, 0.0169, 0.018 + i * 0.0145, 10)), dark, MAG);
  }

  // bake quality follows the texture setting (fast previews at ≤ 1024 px, full AO at 2048+)
  const q = Math.min(1, Math.max(0.25, size / 2048));
  const parts = P.finish({ bake: o.bake !== false && { rays: Math.round(32 * q), aoScale: 0.25 * q } });
  for (const b of P.bakes) console.info(`[oaxis] bake ${b.material}: ${b.texSize[0]}x${b.texSize[1]} @ ${b.texelMm.toFixed(2)} mm/texel in ${b.ms.toFixed(0)} ms`);
  const casingMesh = new Mesh(renderer.dev, casingGeometry(0.019, 0.0099, lathe, { straight: true }));

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
    // racking: support hand grabs the rear serrations over the top of the slide and lets go (slingshot)
    charge: { grip: vec3.create(0, D.slideTop + 0.004, 0.064), travelM: D.slideTravel, release: 'slingshot', pullDir: vec3.create(0, 0, 1) },
  };
  const stats = { triangles: P.triangles, buildMs: performance.now() - t0 };
  console.info(`[oaxis] C15 Compact: ${stats.triangles.toLocaleString()} tris in ${stats.buildMs.toFixed(0)} ms`);
  return { model, spec: compactPistolSpec(D.sightLine), grips: COMPACT_PISTOL_GRIPS, stats };
}

/** Places a side panel (built facing ±x in the yz plane) onto the raked grip module. */
function gripPanelTransform(sx: number): Float32Array {
  // panel centre: depth 0.079 below the frame top, mid grip; rake follows the grip axis (18°)
  const d = 0.079, t = (d - 0.028) / (0.1165 - 0.028);
  const zF = 0.0185 + 0.0229 * t, zB = 0.0725 + 0.0161 * t;
  const hw = 0.0128 + 0.0021 * Math.sin(Math.PI * Math.min(1, Math.max(0, (d - 0.03) / 0.09))) ** 0.7;
  const rake = Math.atan2(0.0229 + 0.0161, 2 * (0.1165 - 0.028));
  const c = Math.cos(rake), s = Math.sin(rake);
  // column-major: rotate about x by `rake` (so the panel's y axis follows the grip), translate to the side
  return new Float32Array([1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, sx * (hw - 0.0001), -d, (zF + zB) / 2, 1]);
}

/** Two-handed thumbs-forward grip on the C15 (weapon space). Tune live in the viewer. */
export const COMPACT_PISTOL_GRIPS: WeaponGrips = {
  right: {
    position: [0.0285, -0.0326, 0.1253], fingerDir: [0, -0.309, -0.951], dorsal: [1, 0, 0],
    fingers: [{ curl: [0.5, 0.7, 0.3], spread: 0.1 }, { curl: [1.25, 1.35, 0.7] }, { curl: [1.3, 1.35, 0.7] }, { curl: [1.35, 1.3, 0.7] }],
    thumb: { dir: [-0.55, -0.55, -0.62], bend: [0.15, 0.1] },
  },
  indexPressed: { curl: [0.55, 0.95, 0.45], spread: 0.08 },
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
    hipOffset: [0.05, -0.118, -0.38],    // high ready: the slide sits just under the eye line, grip and hands in view
    eyeRelief: 0.56,              // arms extended, two-handed
    adsTime: 0.22,
    action: { travelM: C15.slideTravel, backMs: 5, returnMs: 8, lockOpenOnEmpty: true, lockFraction: 0.93 },
    drawTime: 0.45,
  };
}
