// Procedural AR-pattern carbine (generic 16" direct-impingement rifle: forged flat-top upper, M-LOK style free-float
// handguard, mid-length gas, A2-style flash hider, flip-up irons, adjustable stock). Real-world dimensions in metres.
// Weapon space: +x right, +y up, −z towards the muzzle, bore axis at y = 0, bolt face in battery at z = BOLT_FACE.
//
// Animated groups:
//   bolt     – bolt carrier group cycles 89 mm per shot (visible through the ejection port), locks open on empty
//   charge   – charging handle (T-handle + latch) is pulled with the bolt when racking (non-reciprocating otherwise)
//   magazine – 30-round curved polymer magazine drops free on reload
//   trigger  – travels back 3 mm; selector – rotates about x (SAFE forward / SEMI up / AUTO back)

import { Mesh, Renderer, Geometry, Material, lathe, extrude, vec3, box, roundedBox, circle2, roundRect2 } from '@fondaine/gl';
import { GUNSHOTS } from '@fondaine/vorp';
import { FirearmSpec, CALIBERS, casingGeometry } from '@fondaine/gl';
import { PartBuilder, side, section, tubeZ, tubeX, tubeY, latheZ, latheX, discZ, P2, Prof, Profile, loft, prism, sweep, rrect, Station, screwHeadX } from './build';
import { engravingMaterial, engravingQuadX } from './engrave';
import { OAXIS, seg } from '../tuning';
import type { WeaponBuild } from './compact-pistol';
import type { WeaponGrips } from '../viewmodel/hands';

export interface CarbineOptions { textureSize?: number; engravings?: boolean }

// ---------------------------------------------------------------------------------------------- dimensions
const AR = {
  seam: -0.012,          // upper / lower receiver joint (y)
  upperHW: 0.0150,       // half width of the upper receiver body (1.18")
  lowerHW: 0.0148,
  railTop: 0.0307,       // Picatinny top (y) – 1.21" above the bore
  railNeck: 0.0276,      // slot floor (y)
  upperRear: 0.115, upperFront: -0.118,
  boltFace: -0.054,      // bolt face in battery (z)
  portZ0: 0.009, portZ1: -0.049, portY0: -0.006, portY1: 0.013,
  hgZ0: -0.122, hgZ1: -0.463,  // handguard
  barrelLen: 0.406,
  tubeR: 0.0146,         // receiver extension (buffer tube)
  slotPitch: 0.01001, slotW: 0.00523,
} as const;

const TAU = Math.PI * 2;

/** Picatinny head (half profile, right side, bottom → top). `cut` collapses the head to the slot floor. */
function railHead(p: Prof, hx: number, cut: boolean, top = AR.railTop, neck = AR.railNeck) {
  // neck → 45° flank → vertical lip → top flat; slot stations collapse everything onto the neck line
  const flank = 0.0023;
  if (cut) { p.pt(hx, neck).pt(hx, neck).pt(hx, neck); }
  else { p.pt(hx, neck).pt(hx + flank, neck + flank).pt(hx + flank, top); }
}
function railHeadLeft(p: Prof, hx: number, cut: boolean, top = AR.railTop, neck = AR.railNeck) {
  const flank = 0.0023;
  if (cut) { p.pt(-hx, neck).pt(-hx, neck).pt(-hx, neck); }
  else { p.pt(-(hx + flank), top).pt(-(hx + flank), neck + flank).pt(-hx, neck); }
}

/**
 * Upper receiver cross-section: flat sides, Ø30 round-over tangent to the walls, 21 mm rail base, Picatinny head.
 * In the ejection-port stations the section is a "C": the right wall is open between portY0 and portY1 and the
 * profile follows the Ø25 carrier bore around the far side, so the port shows a real interior, not a notch.
 */
function upperProfile(o: { cut?: boolean; port?: boolean } = {}): Profile {
  const hw = AR.upperHW, yb = AR.seam, yc = 0.004, R = hw, rf = 0.0018, n = 2;
  const baseHX = 0.0105, neckHX = 0.00783, baseTop = AR.railNeck - 0.0015;
  const Rb = 0.0125, ycb = 0.0012;                    // carrier bore
  const aSpine = Math.acos(baseHX / R);
  const p = new Prof();
  p.arc(hw - rf, yb + rf, rf, -Math.PI / 2, 0, n);
  const steps = 6, K = 14;
  p.pt(hw, AR.portY0);
  if (o.port) {
    const xb0 = Math.sqrt(Rb * Rb - (AR.portY0 - ycb) ** 2), xb1 = Math.sqrt(Rb * Rb - (AR.portY1 - ycb) ** 2);
    p.pt(xb0, AR.portY0);
    const a0 = Math.atan2(AR.portY0 - ycb, xb0), a1 = Math.atan2(AR.portY1 - ycb, xb1) - TAU;   // clockwise around the far side
    p.arc(0, ycb, Rb, a0, a1, K - 1);
    const xo = Math.sqrt(R * R - (AR.portY1 - yc) ** 2);
    p.pt(xo, AR.portY1);
    const aa = Math.asin((AR.portY1 - yc) / R);
    for (let k = 0; k <= steps; k++) { const a = aa + ((aSpine - aa) * k) / steps; p.pt(Math.cos(a) * R, yc + Math.sin(a) * R, k > 0 && k < steps); }
  } else {
    for (let k = 0; k <= K; k++) p.pt(hw, AR.portY0);
    p.pt(hw, yc, true);
    for (let k = 0; k <= steps; k++) { const a = (aSpine * k) / steps; p.pt(Math.cos(a) * R, yc + Math.sin(a) * R, k > 0 && k < steps); }
  }
  // rail base (21 mm) → neck → head
  p.pt(baseHX, baseTop).pt(neckHX, baseTop);
  railHead(p, neckHX, !!o.cut);
  railHeadLeft(p, neckHX, !!o.cut);
  p.pt(-neckHX, baseTop).pt(-baseHX, baseTop);
  for (let k = 0; k <= steps; k++) { const a = Math.PI - aSpine + ((aSpine) * k) / steps; p.pt(Math.cos(a) * R, yc + Math.sin(a) * R, k > 0 && k < steps); }
  p.pt(-hw, yc, true);
  p.arc(-hw + rf, yb + rf, rf, Math.PI, Math.PI * 1.5, n);
  return p.done();
}

/** Handguard cross-section: rounded octagon, top rail on the receiver's line, M-LOK pockets at 3 / 6 / 9 o'clock. */
function handguardProfile(o: { cut?: boolean; mlok?: boolean } = {}): Profile {
  const hw = 0.0195, yb = -0.0205, yt = 0.0205, ch = 0.0075;
  const slot = 0.0035, deep = 0.0085;       // M-LOK: 7 mm wide, pocket to 8.5 mm inside the wall
  const spineHX = 0.00783;
  const p = new Prof();
  const m = !!o.mlok;
  // bottom flat with the 6 o'clock slot
  p.pt(-slot, yb).pt(-slot, m ? yb + deep : yb).pt(slot, m ? yb + deep : yb).pt(slot, yb);
  p.pt(hw - ch, yb);
  p.pt(hw, yb + ch);
  p.pt(hw, -slot).pt(m ? hw - deep : hw, -slot).pt(m ? hw - deep : hw, slot).pt(hw, slot);
  p.pt(hw, yt - ch);
  p.pt(hw - ch, yt);
  // top: 21 mm rail base, neck, head
  p.pt(0.0105, yt).pt(0.0105, AR.railNeck - 0.0015).pt(spineHX, AR.railNeck - 0.0015);
  railHead(p, spineHX, !!o.cut);
  railHeadLeft(p, spineHX, !!o.cut);
  p.pt(-spineHX, AR.railNeck - 0.0015).pt(-0.0105, AR.railNeck - 0.0015).pt(-0.0105, yt);
  p.pt(-(hw - ch), yt);
  p.pt(-hw, yt - ch);
  p.pt(-hw, slot).pt(m ? -(hw - deep) : -hw, slot).pt(m ? -(hw - deep) : -hw, -slot).pt(-hw, -slot);
  p.pt(-hw, yb + ch);
  p.pt(-(hw - ch), yb);
  return p.done();
}

/** Bolt carrier cross-section: Ø24.8 mm with the forward-assist notch band on the right side. */
function carrierProfile(notch: boolean): Profile {
  const R = 0.0124, p = new Prof();
  const n = 36;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU;
    // right side between −8° and +8°: notch band
    const inBand = Math.abs(((a + Math.PI) % TAU) - Math.PI) < 0.14;
    const r = notch && inBand ? R - 0.0012 : R;
    p.pt(Math.cos(a) * r, Math.sin(a) * r, !inBand);
  }
  return p.done();
}

/** Stations with two independent families of cuts (A, B) along z; the profile is a function of the flags. */
function cutStations(z0: number, z1: number, cutsA: [number, number][], cutsB: [number, number][], prof: (a: boolean, b: boolean) => Profile): Station[] {
  const dir = z1 >= z0 ? 1 : -1;
  const bounds = new Set<number>([z0, z1]);
  const norm = (c: [number, number]) => [Math.min(c[0], c[1]), Math.max(c[0], c[1])] as [number, number];
  const A = cutsA.map(norm), B = cutsB.map(norm);
  for (const c of [...A, ...B]) for (const z of c) if ((z - z0) * dir > 1e-9 && (z1 - z) * dir > 1e-9) bounds.add(z);
  const zs = [...bounds].sort((a, b) => (a - b) * dir);
  const inside = (z: number, cs: [number, number][]) => cs.some(([a, b]) => z > a + 1e-9 && z < b - 1e-9);
  const st: Station[] = [];
  const cache = new Map<string, Profile>();
  const get = (a: boolean, b: boolean) => { const k = `${a}${b}`; let v = cache.get(k); if (!v) { v = prof(a, b); cache.set(k, v); } return v; };
  for (let i = 0; i < zs.length - 1; i++) {
    const mid = (zs[i] + zs[i + 1]) / 2;
    const pr = get(inside(mid, A), inside(mid, B));
    st.push({ z: zs[i], prof: pr }, { z: zs[i + 1], prof: pr });
  }
  return st;
}

/** Picatinny slot intervals on the global 10.01 mm grid between z0 and z1 (slots centred on multiples of the pitch). */
function railSlots(z0: number, z1: number): [number, number][] {
  const lo = Math.min(z0, z1), hi = Math.max(z0, z1);
  const out: [number, number][] = [];
  for (let k = Math.ceil((lo + 0.003) / AR.slotPitch); k * AR.slotPitch < hi - 0.003; k++) {
    const c = k * AR.slotPitch;
    if (c - AR.slotW / 2 > lo + 0.0015 && c + AR.slotW / 2 < hi - 0.0015) out.push([c - AR.slotW / 2, c + AR.slotW / 2]);
  }
  return out;
}

export function buildCarbine(renderer: Renderer, o: CarbineOptions = {}): WeaponBuild {
  const t0 = performance.now();
  const synth = renderer.synth;
  const size = o.textureSize ?? OAXIS.textureSize;
  const small = Math.min(size, 1024), tiny = Math.min(size, 512);
  const anod = synth.material('anodized', { size, tileMeters: 0.22, color: [0.03, 0.031, 0.033], wear: 0.06, roughness: 0.52, seed: 11, bumpMm: 0.02 }, { name: 'anodized', edgeWear: 0.6, edgeWearRadius: 0.0025 });
  const anodRail = synth.material('anodized', { size, tileMeters: 0.22, color: [0.03, 0.031, 0.033], wear: 0.12, roughness: 0.5, seed: 12, bumpMm: 0.02 }, { name: 'anodized-rail', edgeWear: 0.85, edgeWearRadius: 0.002 });
  const anodHG = synth.material('anodized', { size, tileMeters: 0.25, color: [0.028, 0.029, 0.032], wear: 0.07, roughness: 0.54, seed: 19, bumpMm: 0.025 }, { name: 'anodized-handguard', edgeWear: 0.65, edgeWearRadius: 0.0022 });
  const park = synth.material('parkerized', { size, tileMeters: 0.16, color: [0.05, 0.052, 0.05], wear: 0.2, seed: 13 }, { name: 'parkerized', edgeWear: 0.5, edgeWearRadius: 0.002 });
  const carrierMat = synth.material('nitride', { size: small, tileMeters: 0.1, color: [0.04, 0.041, 0.043], wear: 0.35, roughness: 0.42, seed: 20 }, { name: 'bcg-nitride', edgeWear: 0.8, edgeWearRadius: 0.0025 });
  const poly = synth.material('polymer', { size, tileMeters: 0.14, color: [0.03, 0.03, 0.032], extra: 0.3, roughness: 0.6, bumpMm: 0.12, seed: 14 }, { name: 'polymer', edgeWear: 0.25 });
  const grip = synth.material('polymer', { size, tileMeters: 0.16, color: [0.03, 0.03, 0.032], extra: 0.95, roughness: 0.64, bumpMm: 0.4, seed: 15 }, { name: 'polymer-stipple', edgeWear: 0.2 });
  const magPoly = synth.material('polymer', { size, tileMeters: 0.14, color: [0.034, 0.034, 0.036], extra: 0.5, roughness: 0.58, bumpMm: 0.2, seed: 21 }, { name: 'polymer-mag', edgeWear: 0.3 });
  const rubber = synth.material('rubber', { size: tiny, seed: 16, extra: 1 }, { name: 'rubber' });
  const brass = synth.material('brass', { size: tiny, tileMeters: 0.03, seed: 17 }, { name: 'brass' });
  const steelBlack = synth.material('parkerized', { size: small, tileMeters: 0.08, color: [0.022, 0.022, 0.023], wear: 0.08, seed: 18 }, { name: 'steel-black', edgeWear: 0.5, edgeWearRadius: 0.0018 });
  const stainless = synth.material('machined', { size: small, tileMeters: 0.05, color: [0.4, 0.4, 0.41], wear: 0.35, roughness: 0.42, seed: 22, extra: 1 }, { name: 'stainless' });
  const pins = synth.material('machined', { size: tiny, tileMeters: 0.02, color: [0.28, 0.28, 0.29], wear: 0.4, seed: 23, extra: 0.4 }, { name: 'pins' });
  const dark = new Material({ name: 'cavity', baseColor: [0.02, 0.02, 0.02, 1], roughness: 0.9, metallic: 0.3 });
  const white = new Material({ name: 'sight-white', baseColor: [0.85, 0.85, 0.8, 1], roughness: 0.5, metallic: 0 });

  const P = new PartBuilder(renderer);
  const BOLT = { bolt: true }, CHARGE = { charge: true }, MAG = { magazine: true };
  const uhw = AR.upperHW, lhw = AR.lowerHW;

  // ------------------------------------------------------------------ upper receiver (forged, flat-top)
  {
    const slots = railSlots(AR.upperRear - 0.004, AR.upperFront + 0.004);
    const st = cutStations(AR.upperRear, AR.upperFront, slots, [[AR.portZ0, AR.portZ1]], (cut, port) => upperProfile({ cut, port }));
    // rear face: the receiver's rear is closed around the charging-handle channel by the lower's tower
    P.add(loft(st), anod);
    // front receiver ring + barrel nut (inside the handguard, visible through its rear)
    P.add(tubeZ(0.0160, AR.upperFront, AR.upperFront - 0.006, 0, 0, seg(28)), anod);
    P.add(latheZ([[0.0125, 0], [0.0168, 0], [0.0168, 0.004], [0.0158, 0.0045], [0.0158, 0.0215], [0.0125, 0.0215]], AR.upperFront - 0.006, 0, seg(24)), park);
    // charging-handle channel at the rear top (dark slot under the rail)
    P.add(roundedBox(0.0148, 0.0078, 0.03, 0.0006).translate(0, 0.0235, AR.upperRear - 0.01), dark);
    // brass deflector: wedge behind the port
    P.add(extrude([[uhw - 0.004, 0.0105], [uhw + 0.0068, 0.0235], [uhw + 0.0068, 0.0305], [uhw - 0.004, 0.0305]], 0.017, { bevel: 0.0015, bevelSegments: 2 }).rotateX(Math.PI / 2).translate(0, 0.0045, 0), anod);
    // forward assist: housing along z with a ribbed plunger (right rear)
    const faX = uhw + 0.0042, faY = 0.009;
    P.add(tubeZ(0.0068, 0.030, 0.062, faY, faX, seg(18)), anod);
    P.add(latheZ([[0, 0], [0.0052, 0], [0.0062, 0.0015], [0.0062, 0.009], [0.0058, 0.0105], [0.0049, 0.011], [0, 0.011]], 0.073, faY, seg(20)).translate(faX, 0, 0), park);
    for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; P.add(box(0.0007, 0.0028, 0.006).translate(0, 0.0063, 0).rotateZ(a).translate(faX, faY, 0.068), steelBlack); }
    // ejection port dust cover: hinged at the lower edge, swung open (hanging down along the lower)
    const cover = roundedBox(0.0012, 0.0186, 0.0585, 0.0005);
    P.add(cover.translate(0, -0.0093, 0).rotateZ(0.35).translate(uhw + 0.0012, AR.portY0 - 0.0005, (AR.portZ0 + AR.portZ1) / 2), park);
    P.add(tubeZ(0.0014, AR.portZ0 + 0.004, AR.portZ1 - 0.004, AR.portY0 - 0.0008, uhw + 0.0012, 10), pins);
    // takedown / pivot pin heads on the lower (both sides) + receiver roll marks
    for (const sx of [-1, 1] as const) {
      P.add(screwHeadX(0.0038, sx * (lhw + 0.0003), AR.seam - 0.0085, 0.0735, sx, 'dome', 16), pins);
      P.add(screwHeadX(0.0038, sx * (lhw + 0.0003), AR.seam - 0.0085, -0.0655, sx, 'dome', 16), pins);
    }
  }

  // ------------------------------------------------------------------ bolt carrier group (moves) + charging handle (moves when racking)
  {
    const notches: [number, number][] = [];
    for (let i = 0; i < 9; i++) notches.push([-0.034 + i * 0.0045, -0.034 + i * 0.0045 + 0.0018]);
    const carrierZ0 = AR.boltFace + 0.012, carrierZ1 = AR.upperRear + 0.03;
    P.add(loft(cutStations(carrierZ0, carrierZ1, notches, [], (n) => carrierProfile(n))), carrierMat, BOLT);
    // barrel extension (fixed): fills the port ahead of the carrier in battery
    P.add(tubeZ(0.0124, AR.boltFace - 0.012, carrierZ0 - 0.0006, 0, 0, seg(28)), park);
    // bolt: lugs hidden in the extension; the bolt body + extractor + cam pin head are what you see in the port
    P.add(tubeZ(0.0094, AR.boltFace, carrierZ0 + 0.0005, 0, 0, seg(24)), carrierMat, BOLT);
    P.add(discZ(0.0094, 0.0004, 0, 0, AR.boltFace - 0.0002, seg(24)), steelBlack, BOLT);
    P.add(roundedBox(0.0062, 0.0036, 0.0082, 0.001).translate(0.0072, 0.0108, carrierZ0 + 0.013), carrierMat, BOLT); // cam pin
    P.add(roundedBox(0.0068, 0.0046, 0.018, 0.0012).translate(0, 0.0128, carrierZ0 + 0.052), carrierMat, BOLT);  // gas key
    P.add(screwHeadX(0.0021, 0, 0, 0, 1, 'hex', 12).rotateZ(Math.PI / 2).translate(0, 0.0151, carrierZ0 + 0.046), steelBlack, BOLT);
    // charging handle: shaft in the receiver channel, T at the rear, latch on the left
    const chY = 0.0235;
    P.add(roundedBox(0.0128, 0.0058, 0.105, 0.0012).translate(0, chY, AR.upperRear - 0.045), anod, CHARGE);
    P.add(roundedBox(0.051, 0.0075, 0.019, 0.0022).translate(0.002, chY, AR.upperRear + 0.011), anod, CHARGE);
    for (let i = 0; i < 6; i++) P.add(box(0.0038, 0.0012, 0.009).translate(-0.0205 + i * 0.0082, chY + 0.0042, AR.upperRear + 0.012), steelBlack, CHARGE);
    P.add(roundedBox(0.0096, 0.0064, 0.021, 0.0014).translate(-0.0302, chY, AR.upperRear + 0.0105), park, CHARGE); // latch paddle
    P.add(tubeY(0.0013, 0.009, -0.0245, chY, AR.upperRear + 0.016, 10), pins, CHARGE);                        // latch pin
  }

  // ------------------------------------------------------------------ lower receiver
  {
    const sY = AR.seam;
    // body: trigger housing, grip boss, rear tower around the receiver extension
    const body: P2[] = [
      [-0.1145, sY + 0.0005], [0.0705, sY + 0.0005], [0.0705, -0.038], [0.012, -0.040], [-0.030, -0.040], [-0.040, -0.044],
      [-0.060, -0.0585], [-0.072, -0.052], [-0.080, -0.030], [-0.1145, -0.026],
    ];
    P.add(side(body, lhw * 2, 0.002), anod);
    // receiver-extension tower (threaded boss the buffer tube screws into)
    P.add(tubeZ(0.0185, 0.0985, AR.upperRear + 0.0005, 0, 0, seg(28)), anod);
    // magazine well: separate wider block with a flared mouth
    const mw: P2[] = [[0.0705, sY], [0.0705, -0.070], [0.0725, -0.0745], [0.0105, -0.0745], [0.0125, -0.070], [0.0125, sY]];
    P.add(side(mw, lhw * 2 + 0.0004, 0.0025), anod);
    // magwell cavity (inside faces, so an ejected magazine does not leave a hole)
    P.add(prism(rrect(0.0238, 0.0565, 0.003, 3), 0, 0.064).rotateX(Math.PI / 2 + 0.17).flipWinding().translate(0, sY, -0.0415 + 0.011), dark);
    // trigger guard: fixed loop, pinned at the magwell, with a rear detent
    P.add(side([[0.012, -0.040], [0.012, -0.0545], [0.0085, -0.0575], [-0.0265, -0.0575], [-0.030, -0.0545], [-0.030, -0.040], [-0.0255, -0.040], [-0.0255, -0.0525], [0.0075, -0.0525], [0.0075, -0.040]], 0.0088, 0.0016), anod);
    P.add(tubeX(0.0013, 0.0115, 0, -0.043, -0.0095, 10), pins);
    P.add(tubeX(0.0013, 0.0115, 0, -0.043, 0.0275, 10), pins);
    // trigger
    P.add(side([[-0.012, -0.040], [-0.0155, -0.040], [-0.0195, -0.047], [-0.0185, -0.0535], [-0.0135, -0.0525], [-0.0105, -0.046]], 0.0062, 0.0008), park, { trigger: true });
    // selector (left): SAFE points forward; rotates about x through the pivot
    const selPivot: [number, number, number] = [-(lhw + 0.0016), sY - 0.0092, 0.030];
    P.add(tubeX(0.0045, 0.0028, selPivot[0], selPivot[1], selPivot[2], seg(16)), park, { selector: true });
    P.add(roundedBox(0.0036, 0.0046, 0.0195, 0.0014).translate(selPivot[0] - 0.0012, selPivot[1], selPivot[2] - 0.0085), park, { selector: true });
    for (let i = 0; i < 5; i++) P.add(box(0.0006, 0.0052, 0.0006).translate(selPivot[0] - 0.0031, selPivot[1], selPivot[2] - 0.0135 - i * 0.0015), steelBlack, { selector: true });
    // selector detent markings on the left side
    if (o.engravings !== false) {
      const m = engravingMaterial(renderer, ['SAFE   SEMI   AUTO'], 0.028, 0.0028, { px: 512, color: [0.8, 0.8, 0.78], metallic: 0, roughness: 0.6, tracking: 0.05, align: 'center' });
      if (m) P.add(engravingQuadX(-(lhw + 0.00008), sY - 0.0028, 0.021, 0.028, 0.0028, -1), m);
      const rm = engravingMaterial(renderer, ['FONDAINE ARMS', 'MOD. FA-15   CAL. 5.56 NATO'], 0.046, 0.009, { px: 1024, color: [0.75, 0.75, 0.74], metallic: 0, roughness: 0.6, tracking: 0.08, align: 'left' });
      if (rm) P.add(engravingQuadX(-(0.0146 + 0.00008), -0.030, -0.0415, 0.046, 0.009, -1), rm);
      const sn = engravingMaterial(renderer, ['FA15-0042117'], 0.028, 0.0034, { px: 512, color: [0.78, 0.78, 0.77], metallic: 0, roughness: 0.6, tracking: 0.08, align: 'left' });
      if (sn) P.add(engravingQuadX(0.0146 + 0.00008, -0.030, -0.0415, 0.028, 0.0034, 1), sn);
    }
    // magazine release (right): button in a fence
    P.add(side([[0.004, sY - 0.004], [0.004, sY - 0.0185], [0.009, sY - 0.0225], [0.0205, sY - 0.0225], [0.0205, sY - 0.004]], 0.0036, 0.0012).translate(lhw + 0.0015, 0, 0), anod);
    P.add(latheX([[0, 0], [0.0046, 0], [0.0046, 0.0024], [0.0038, 0.0032], [0, 0.0032]], lhw + 0.0005, sY - 0.0145, -0.0125, seg(16)), park);
    // bolt catch (left): paddle + the lower's boss and its pin
    P.add(side([[0.012, sY - 0.004], [0.012, sY - 0.0165], [-0.002, sY - 0.0165], [-0.002, sY - 0.004]], 0.0032, 0.001).translate(-(lhw + 0.0012), 0, 0), anod);
    P.add(roundedBox(0.0022, 0.0105, 0.0078, 0.0008).translate(-(lhw + 0.0028), sY - 0.0075, 0.0005), park);
    P.add(roundedBox(0.0022, 0.0062, 0.0062, 0.0008).translate(-(lhw + 0.0028), sY - 0.0118, -0.0085), park);
    P.add(tubeX(0.0011, 0.0036, -(lhw + 0.0014), sY - 0.0098, -0.0038, 8), pins);
    // pistol grip: lofted along the grip axis (≈ 30° rake), textured, with a palm swell
    {
      const st: Station[] = [];
      for (let i = 0; i <= 14; i++) {
        const t = i / 14;
        const w = 0.0292 + 0.004 * Math.sin(Math.PI * t) ** 0.8 + 0.001 * t;
        const l = 0.0335 + 0.012 * t + 0.002 * Math.sin(Math.PI * t);
        const pr = rrect(w, l, Math.min(0.009, w / 2 - 0.001), 4, 0, 0);
        st.push({ z: t * 0.088, prof: pr, smooth: i > 0 });
      }
      let g = loft(st, { capStart: false });
      // front finger nub at the top of the front strap
      g = Geometry.merge([g, roundedBox(0.026, 0.009, 0.012, 0.003).translate(0, -0.0198, 0.007)]);
      // place: loft z (down the grip) → weapon: start inside the grip boss, tilt back 30°
      const ang = 0.52, gy = -0.036, gz = 0.060, gl = 0.088;
      P.add(g.rotateX(Math.PI / 2 - ang).translate(0, gy, gz), grip);
      // grip screw (bottom)
      P.add(screwHeadX(0.0035, 0, 0, 0, 1, 'hex', 14).rotateZ(-Math.PI / 2).translate(0, gy - gl * Math.cos(ang) + 0.0006, gz + gl * Math.sin(ang)), pins);
    }
    // receiver extension: castle nut, end plate, buffer tube with 6 position holes underneath
    P.add(latheZ([[0.0147, 0], [0.0196, 0], [0.0196, 0.0085], [0.0188, 0.0092], [0.0147, 0.0092]], 0.1275, 0, seg(28)), anod);
    for (let i = 0; i < 6; i++) { const a = (i / 6) * TAU; P.add(box(0.0035, 0.0032, 0.0036).translate(0, 0.0185, 0).rotateZ(a).translate(0, 0, 0.1275 - 0.0018), dark); }
    P.add(discZ(0.0205, 0.0022, 0, 0, AR.upperRear + 0.0016, seg(28)), park);
    P.add(tubeZ(AR.tubeR, AR.upperRear, 0.335, 0, 0, seg(32)), anod);
    P.add(latheZ([[0, 0], [0.0135, 0], [AR.tubeR, 0.0005], [AR.tubeR, 0.002], [0, 0.002]], 0.335, 0, seg(32)).translate(0, 0, 0.002), anod);
    for (let i = 0; i < 6; i++) P.add(tubeY(0.0032, 0.004, 0, -AR.tubeR + 0.0004, 0.165 + i * 0.019, 12), dark);
    P.add(box(0.006, 0.0025, 0.19).translate(0, -AR.tubeR + 0.0012, 0.235), anod); // position-hole track
  }

  // ------------------------------------------------------------------ stock (adjustable carbine stock)
  {
    const prof: P2[] = [[-0.205, 0.0185], [-0.330, 0.0215], [-0.342, 0.016], [-0.345, 0.0], [-0.345, -0.088], [-0.332, -0.095], [-0.300, -0.088], [-0.262, -0.052], [-0.236, -0.018], [-0.205, -0.0185]];
    const slingSlot: P2[] = [[-0.318, -0.045], [-0.318, -0.067], [-0.324, -0.070], [-0.330, -0.067], [-0.330, -0.045], [-0.324, -0.042]];
    P.add(side(prof, 0.040, 0.004, [slingSlot]), poly);
    // tube sleeve
    P.add(tubeZ(AR.tubeR + 0.0025, 0.203, 0.236, 0, 0, seg(28)), poly);
    // release lever under the tube (hinged at the rear of the sleeve)
    P.add(roundedBox(0.012, 0.0035, 0.032, 0.0012).translate(0, -AR.tubeR - 0.006, 0.224), poly);
    P.add(roundedBox(0.009, 0.006, 0.0085, 0.0015).translate(0, -AR.tubeR - 0.0035, 0.2075), poly);
    P.add(tubeX(0.0015, 0.0145, 0, -AR.tubeR - 0.0075, 0.238, 8), pins);
    // rubber butt pad with a ribbed face
    P.add(side([[-0.345, 0.0], [-0.356, 0.0], [-0.357, -0.090], [-0.345, -0.092]], 0.042, 0.0035), rubber);
    for (let i = 0; i < 9; i++) P.add(box(0.034, 0.0022, 0.0008).translate(0, -0.0835 + i * 0.0095, 0.3568), rubber);
    // QD sling socket on the left + the rear sling loop pin
    P.add(latheX([[0, 0], [0.0062, 0], [0.0062, 0.0008], [0.0035, 0.0008], [0.0035, 0.0], [0, 0]], -0.0201, -0.0045, 0.2255, seg(16)), park);
    P.add(tubeX(0.0012, 0.0404, 0, -0.056, 0.324, 8), pins);
  }

  // ------------------------------------------------------------------ handguard (M-LOK free-float) + barrel nut
  {
    const slots = railSlots(AR.hgZ0 - 0.002, AR.hgZ1 + 0.002);
    const mlok: [number, number][] = [];
    for (let i = 0; i < 8; i++) { const c = AR.hgZ0 - 0.030 - i * 0.040; mlok.push([c - 0.016, c + 0.016]); }
    const st = cutStations(AR.hgZ0, AR.hgZ1, slots, mlok, (cut, m) => handguardProfile({ cut, mlok: m }));
    P.add(loft(st, { capStart: true, capEnd: true }), anodHG);
    // inner liner + anti-rotation tabs (the rear ring that clamps the barrel nut)
    P.add(tubeZ(0.0163, AR.hgZ0, AR.hgZ1, 0, 0, seg(28)).flipWinding(), dark);
    // clamp screws at the rear (both sides, bottom)
    for (const sx of [-1, 1] as const) {
      P.add(screwHeadX(0.0028, sx * 0.0196, -0.0155, AR.hgZ0 - 0.012, sx, 'hex', 12), steelBlack);
      P.add(screwHeadX(0.0028, sx * 0.0196, -0.0155, AR.hgZ0 - 0.022, sx, 'hex', 12), steelBlack);
    }
    // front cap chamfer ring
    P.add(discZ(0.0165, 0.001, 0, 0, AR.hgZ1 - 0.0004, seg(28)), dark);
  }

  // ------------------------------------------------------------------ barrel, gas system, muzzle device
  const muzzleZ = AR.boltFace - AR.barrelLen - 0.054;
  {
    const bz0 = AR.upperFront - 0.006;
    // extension / barrel nut area (hidden) → Ø19 under the handguard → gas block journal → Ø17.8 to the thread shoulder
    P.add(tubeZ(0.0095, bz0, -0.350, 0, 0, seg(28)), park);
    P.add(latheZ([[0.0095, 0], [0.0095, 0.012], [0.0089, 0.013], [0.0089, 0.054], [0.0062, 0.0545], [0.0062, 0.062]], -0.350 - 0.045, 0, seg(28)), park);
    P.add(tubeZ(0.0089, -0.395, AR.boltFace - AR.barrelLen + 0.001, 0, 0, seg(28)), park);
    // crush washer + A2-style flash hider (5 slots, closed bottom), crowned muzzle
    const fhZ0 = AR.boltFace - AR.barrelLen + 0.0005;
    P.add(latheZ([[0.0062, 0], [0.011, 0], [0.011, 0.0022], [0.0062, 0.0022]], fhZ0 + 0.0022, 0, seg(24)), stainless);
    const fhBody = latheZ([[0.0075, 0], [0.011, 0.0025], [0.0112, 0.012], [0.0112, 0.048], [0.0104, 0.0525], [0.0066, 0.0545], [0.0062, 0.0545], [0.0062, 0.0]], fhZ0, 0, seg(36));
    P.add(fhBody, park);
    for (let k = 0; k < 5; k++) {
      const a = (k - 2) * (TAU / 7.2);  // five slots around the top 200°, solid bottom
      P.add(roundedBox(0.0032, 0.006, 0.030, 0.0008).translate(0, 0.0098, 0).rotateZ(a).translate(0, 0, fhZ0 - 0.034), dark);
    }
    P.add(discZ(0.0062, 0.0006, 0, 0, fhZ0 - 0.044, seg(20)), park);   // barrel crown seen down the hider
    P.add(discZ(0.0029, 0.0008, 0, 0, fhZ0 - 0.0443, seg(16)), dark);
    // low-profile gas block (mid-length) with set screws, gas tube running back into the receiver
    const gbZ = -0.372;
    P.add(section(roundRect2(-0.0115, -0.0118, 0.0115, 0.0135, 0.0025, 4), 0.030, gbZ, 0.0012), park);
    for (let i = 0; i < 2; i++) P.add(screwHeadX(0.0022, 0, 0, 0, 1, 'hex', 10).rotateZ(-Math.PI / 2).translate(0, -0.0118, gbZ - 0.007 + i * 0.014), steelBlack);
    P.add(tubeZ(0.0024, gbZ - 0.012, AR.upperFront + 0.012, 0.0138, 0, 12), stainless);
    P.add(tubeX(0.0011, 0.0245, 0, 0.0138, gbZ + 0.003, 8), pins); // gas tube roll pin
  }

  // ------------------------------------------------------------------ flip-up iron sights (deployed)
  const sightTop = 0.064;
  const fsZ = -0.447;
  {
    // rear: base clamped on the receiver rail, hinged housing with two apertures, windage drum on the right
    const rz = 0.046;
    P.add(section(roundRect2(-0.0125, AR.railTop - 0.0036, 0.0125, AR.railTop + 0.0085, 0.0018, 3), 0.034, rz + 0.001, 0.0008), anod);
    P.add(tubeX(0.0022, 0.0252, 0, AR.railTop + 0.0105, rz + 0.012, 12), park);
    const housing: P2[] = [[-0.0118, AR.railTop + 0.0085], [0.0118, AR.railTop + 0.0085], [0.0118, sightTop + 0.0075], [0.0085, sightTop + 0.0098], [-0.0085, sightTop + 0.0098], [-0.0118, sightTop + 0.0075]];
    P.add(section(housing, 0.0042, rz, 0.0006, [circle2(0, sightTop, 0.0036, seg(20))]), park);
    // small-aperture leaf folded flat on the base in front of the housing (second aperture of the dual leaf)
    P.add(section(roundRect2(-0.0068, -0.0068, 0.0068, 0.0068, 0.0025, 3), 0.0012, 0, 0.0003, [circle2(0, 0, 0.0011, 12)]).rotateX(-Math.PI / 2).translate(0, AR.railTop + 0.0091, rz - 0.0095), park);
    // windage drum on the right, knurled
    P.add(latheX([[0, 0], [0.0062, 0], [0.0062, 0.012], [0.0048, 0.0125], [0, 0.0125]], 0.0118, sightTop - 0.001, rz, seg(16)), park);
    for (let i = 0; i < 10; i++) { const a = (i / 10) * TAU; P.add(box(0.012, 0.0008, 0.0025).translate(0, 0.0062, 0).rotateX(a).translate(0.0118 + 0.006, sightTop - 0.001, rz), steelBlack); }
    // front: base, hinge, post between protective ears, elevation drum under the post
    P.add(section(roundRect2(-0.0125, AR.railTop - 0.0036, 0.0125, AR.railTop + 0.0085, 0.0018, 3), 0.032, fsZ, 0.0008), anod);
    P.add(tubeX(0.0022, 0.0252, 0, AR.railTop + 0.0105, fsZ - 0.011, 12), park);
    const eb = AR.railTop + 0.0085;
    const ears: P2[] = [[-0.0112, eb], [0.0112, eb], [0.0112, sightTop - 0.004], [0.0062, sightTop + 0.0075], [0.0040, sightTop + 0.0075], [0.0062, eb + 0.004], [-0.0062, eb + 0.004], [-0.0040, sightTop + 0.0075], [-0.0062, sightTop + 0.0075], [-0.0112, sightTop - 0.004]];
    P.add(section(ears, 0.0046, fsZ, 0.0006), park);
    // elevation drum (knurled) between the ears, square post on top with a white tip
    P.add(tubeY(0.0046, 0.0052, 0, eb + 0.004 + 0.0026, fsZ, seg(18)), park);
    for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; P.add(box(0.0007, 0.0054, 0.0007).translate(0.0046, 0, 0).rotateY(a).translate(0, eb + 0.004 + 0.0026, fsZ), steelBlack); }
    P.add(box(0.0018, sightTop - (eb + 0.0092), 0.0018).translate(0, (sightTop + eb + 0.0092) / 2, fsZ), steelBlack);
    P.add(box(0.0018, 0.0012, 0.0019).translate(0, sightTop + 0.0006, fsZ), white);
  }

  // ------------------------------------------------------------------ magazine (curved 30-round polymer)
  {
    // centre path from the magwell down: straight for 60 mm, then a 25° arc forward
    const path: [number, number, number][] = [];
    const top: [number, number, number] = [0, AR.seam + 0.004, -0.0415 + 0.0105 * 0.17];
    const n = 16, total = 0.205;
    for (let i = 0; i <= n; i++) {
      const s = (i / n) * total;
      const bend = Math.max(0, s - 0.055);
      const ang = 0.17 + bend * 2.1; // rad, forward tilt grows along the curve
      // integrate: simple accumulation
      if (i === 0) path.push(top);
      else {
        const prev = path[i - 1], ds = total / n;
        path.push([0, prev[1] - Math.cos(ang) * ds, prev[2] - Math.sin(ang) * ds]);
      }
    }
    // profile with two longitudinal ribs per side
    const prof = (() => {
      const p = new Prof(); const w = 0.0114, l = 0.0282, r = 0.0038;
      p.arc(w - r, -l + r, r, -Math.PI / 2, 0, 3);
      p.pt(w, -0.012).pt(w + 0.0007, -0.0105, true).pt(w, -0.009).pt(w, 0.006).pt(w + 0.0007, 0.0075, true).pt(w, 0.009);
      p.arc(w - r, l - r, r, 0, Math.PI / 2, 3).arc(-w + r, l - r, r, Math.PI / 2, Math.PI, 3);
      p.pt(-w, 0.009).pt(-w - 0.0007, 0.0075, true).pt(-w, 0.006).pt(-w, -0.009).pt(-w - 0.0007, -0.0105, true).pt(-w, -0.012);
      p.arc(-w + r, -l + r, r, Math.PI, Math.PI * 1.5, 3);
      return p.done();
    })();
    const body = sweep(prof, path, [0, 0, 1], (t) => (t > 0.955 ? [1.1, 1.08] : t > 0.935 ? [1.0 + (t - 0.935) * 5, 1.0 + (t - 0.935) * 4] : [1, 1]), { capStart: false, capEnd: true });
    P.add(body, magPoly, MAG);
    // follower + top cartridge visible at the feed lips
    P.add(prism(rrect(0.0208, 0.050, 0.003, 3), -0.003, 0.004).rotateX(Math.PI / 2 + 0.17).translate(0, top[1] - 0.001, top[2]), new Material({ name: 'follower', baseColor: [0.75, 0.22, 0.03, 1], roughness: 0.6 }), MAG);
    const round = casingGeometry(0.0448, 0.0095, lathe);
    P.add(round.rotateX(-Math.PI / 2).translate(0.0045, top[1] + 0.003, top[2] + 0.027), brass, MAG);
    // baseplate floor plate button
    const last = path[path.length - 1];
    P.add(tubeY(0.0032, 0.0012, 0, last[1] - 0.0004, last[2], 12), magPoly, MAG);
  }

  const parts = P.finish();
  const casingMesh = new Mesh(renderer.dev, casingGeometry(0.0448, 0.0095, lathe));
  const stats = { triangles: P.triangles, buildMs: performance.now() - t0 };
  console.info(`[oaxis] AR carbine: ${stats.triangles.toLocaleString()} tris in ${stats.buildMs.toFixed(0)} ms`);
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
      selector: { pivot: [-(AR.lowerHW + 0.0016), AR.seam - 0.0092, 0.03], axis: [1, 0, 0], angles: { safe: 0, semi: Math.PI / 2, auto: Math.PI } },
      // racking: the support hand hooks the charging-handle latch (left side of the T) and pulls it straight back
      charge: { grip: vec3.create(-0.030, 0.0235, AR.upperRear + 0.0105), travelM: 0.085, release: 'slingshot', pullDir: vec3.create(0, 0, 1) },
    },
    spec: carbineSpec(sightTop),
    grips: CARBINE_GRIPS,
    stats,
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
    // bolt carrier group: 89 mm stroke, locks open on the last round (bolt catch)
    action: { travelM: 0.089, backMs: 9, returnMs: 14, lockOpenOnEmpty: true, lockFraction: 0.9 },
  };
}
