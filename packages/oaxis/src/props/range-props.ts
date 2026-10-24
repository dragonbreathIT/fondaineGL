// Range props (real dimensions): steel ammo can, cardboard ammunition boxes, sandbag rests, earmuffs and
// spent-brass scatter. Small things like these are what make a space read as used and real.

import { Geometry, Material, Mesh, RenderObject, Renderer, mat4, Mat4, quat, roundedBox, box, cylinder, torus, tube, lathe, rng, casingGeometry } from '@fondaine/gl';
import { OAXIS } from '../tuning';

export interface PropSet { objects: RenderObject[] }

interface Placed { g: Geometry; m: Material }

function place(list: Placed[], g: Geometry, m: Material, t: Mat4) { list.push({ g: g.clone().transform(t), m }); }

function merge(renderer: Renderer, list: Placed[], castShadow = true): RenderObject[] {
  const by = new Map<Material, Geometry[]>();
  for (const p of list) { const a = by.get(p.m) ?? []; a.push(p.g.tangents ? p.g : p.g.computeTangents()); by.set(p.m, a); }
  const out: RenderObject[] = [];
  for (const [m, gs] of by) {
    const o = new RenderObject(new Mesh(renderer.dev, Geometry.merge(gs), { label: m.name }), m);
    o.castShadow = castShadow;
    out.push(o);
  }
  return out;
}

export class RangeProps {
  private list: Placed[] = [];
  private mats: Record<string, Material>;
  private rand = rng(2718);

  constructor(private renderer: Renderer) {
    const synth = renderer.synth, size = Math.min(1024, OAXIS.textureSize);
    this.mats = {
      od: synth.material('paintedSteel', { size, tileMeters: 0.3, color: [0.11, 0.12, 0.07], wear: 0.45, seed: 81 }, { name: 'ammo-can-od', edgeWear: 0.8, edgeWearRadius: 0.004 }),
      steel: synth.material('parkerized', { size: 512, tileMeters: 0.1, color: [0.12, 0.12, 0.12], wear: 0.6, seed: 82 }, { name: 'can-latch' }),
      card: synth.material('cardboard', { size: 512, seed: 83 }, { name: 'ammo-box-card', edgeWear: 0.4 }),
      cardPrint: synth.material('paintedSteel', { size: 512, tileMeters: 0.2, color: [0.55, 0.08, 0.05], wear: 0.1, seed: 84 }, { name: 'ammo-box-print', roughness: 0.7, metallic: 0 }),
      bag: synth.material('webbing', { size, tileMeters: 0.04, color: [0.42, 0.36, 0.25], seed: 85 }, { name: 'sandbag' }),
      muffShell: synth.material('polymer', { size: 512, tileMeters: 0.1, color: [0.12, 0.13, 0.08], seed: 86 }, { name: 'muff-shell', edgeWear: 0.3 }),
      foam: synth.material('rubber', { size: 512, seed: 87 }, { name: 'muff-foam' }),
      brass: synth.material('brass', { size: 512, tileMeters: 0.03, seed: 88 }, { name: 'brass-scatter' }),
    };
  }

  private T(x: number, y: number, z: number, ry = 0, rx = 0, rz = 0): Mat4 {
    return mat4.fromRotationTranslation(mat4.create(), quat.fromEuler(quat.create(), rx, ry, rz), [x, y, z]);
  }

  /** M2A1-style .50 cal steel ammo can (305 × 155 × 190 mm). (x, y, z) = centre of the base. */
  ammoCan(x: number, y: number, z: number, ry = 0) {
    const M = this.T(x, y, z, ry);
    const L = 0.305, W = 0.155, H = 0.19;
    place(this.list, roundedBox(L, H * 0.86, W, 0.006).translate(0, H * 0.43, 0), this.mats.od, M);
    place(this.list, roundedBox(L + 0.01, H * 0.16, W + 0.01, 0.005).translate(0, H * 0.92, 0), this.mats.od, M);  // lid
    place(this.list, box(L * 0.92, 0.004, W * 0.75).translate(0, H + 0.002, 0), this.mats.od, M);                 // lid emboss
    place(this.list, roundedBox(0.03, 0.05, 0.012, 0.003).translate(-L / 2 - 0.006, H * 0.82, 0).rotateY(0), this.mats.steel, M); // latch
    place(this.list, torus(0.045, 0.006, 16, 8).scale(1, 0.55, 1).rotateX(Math.PI / 2).translate(0, H + 0.012, 0), this.mats.steel, M); // handle
    return this;
  }

  /** Cardboard 50-round 9 mm box (112 × 70 × 38 mm) or 20-round rifle box (122 × 65 × 42 mm). */
  ammoBox(x: number, y: number, z: number, ry = 0, rifle = false, open = false) {
    const M = this.T(x, y, z, ry);
    const [L, W, H] = rifle ? [0.122, 0.065, 0.042] : [0.112, 0.07, 0.038];
    place(this.list, box(L, H, W).translate(0, H / 2, 0), this.mats.card, M);
    place(this.list, box(L * 0.6, 0.0008, W * 0.5).translate(0, H + 0.0004, 0), this.mats.cardPrint, M);
    if (open) {
      // flap folded back + rows of cartridge bases showing
      place(this.list, box(L, 0.0015, W).translate(0, H + W / 2, -W / 2).rotateX(-1.2), this.mats.card, M);
      const cd = rifle ? 0.0095 : 0.0099;
      for (let i = 0; i < 10; i++) for (let j = 0; j < 5; j++) {
        place(this.list, cylinder(cd / 2, cd / 2, 0.004, 12).translate(-L / 2 + 0.008 + i * (L - 0.016) / 9, H - 0.001, -W / 2 + 0.01 + j * (W - 0.02) / 4), this.mats.brass, M);
      }
    }
    return this;
  }

  /** Front + rear sandbag rest (filled cordura bags). */
  sandbags(x: number, y: number, z: number, ry = 0) {
    const M = this.T(x, y, z, ry);
    const bag = (lx: number, lz: number, w: number, h: number, d: number) => {
      const g = roundedBox(w, h, d, Math.min(h, d) * 0.45, 4);
      // slump: squash the top, bulge the sides a little
      const p = g.positions;
      for (let i = 0; i < p.length; i += 3) { const t = p[i + 1] / (h / 2); p[i] *= 1 + 0.06 * (1 - t * t); p[i + 2] *= 1 + 0.08 * (1 - t * t); }
      g.translate(lx, h / 2, lz);
      return g;
    };
    place(this.list, bag(0, -0.18, 0.22, 0.11, 0.15), this.mats.bag, M);
    place(this.list, bag(0, 0.2, 0.16, 0.09, 0.13), this.mats.bag, M);
    return this;
  }

  /** Passive earmuffs lying on a bench. */
  earmuffs(x: number, y: number, z: number, ry = 0) {
    const M = this.T(x, y, z, ry, 0, 0);
    for (const s of [-1, 1]) {
      place(this.list, lathe([[0, 0], [0.036, 0], [0.04, 0.012], [0.038, 0.04], [0.03, 0.052], [0, 0.054]], 20).scale(1, 1, 1.25).rotateZ(s * Math.PI / 2).translate(s * 0.075, 0.04, 0), this.mats.muffShell, M);
      place(this.list, torus(0.028, 0.009, 16, 8).scale(1, 1, 1.25).rotateZ(Math.PI / 2).translate(s * 0.068, 0.04, 0), this.mats.foam, M);
    }
    // headband: an arc over the cups, lying folded back on the bench
    const arc: [number, number, number][] = [];
    for (let k = 0; k <= 16; k++) { const a = Math.PI * (k / 16); arc.push([-Math.cos(a) * 0.075, 0.04 + Math.sin(a) * 0.02, -Math.sin(a) * 0.09]); }
    place(this.list, tube(arc, 0.007, 8), this.mats.muffShell, M);
    return this;
  }

  /** Spent brass scattered on the ground around (cx, cz): density falls off with distance. */
  brassScatter(cx: number, cz: number, radius: number, count: number, height: (x: number, z: number) => number, caliber: { lengthM: number; diameterM: number; straight?: boolean }) {
    const g0 = casingGeometry(caliber.lengthM, caliber.diameterM, lathe, { straight: caliber.straight });
    for (let i = 0; i < count; i++) {
      const a = this.rand.next() * Math.PI * 2, r = radius * Math.sqrt(this.rand.next()) * (0.3 + 0.7 * this.rand.next());
      const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
      // lying on its side, random roll
      const M = this.T(x, height(x, z) + caliber.diameterM * 0.48, z, this.rand.next() * Math.PI * 2, 0, Math.PI / 2 + (this.rand.next() - 0.5) * 0.15);
      place(this.list, g0, this.mats.brass, M);
    }
    return this;
  }

  build(): PropSet { return { objects: merge(this.renderer, this.list) }; }
}
