// Range props (real dimensions): steel ammo can, cardboard ammunition boxes, sandbag rests, earmuffs and
// spent-brass scatter. Small things like these are what make a space read as used and real.

import { Geometry, Material, Mesh, RenderObject, Renderer, mat4, Mat4, quat, roundedBox, box, cylinder, torus, tube, lathe, rng, casingGeometry, extrude, plane } from '@fondaine/gl';
import { OAXIS } from '../tuning';
import { Prof, Profile, prism, loft } from '../weapons/build';

// ---------------------------------------------------------------------------------------- construction kit
// Real building parts (metres) with chamfered / filleted edges and construction logic, built with the same
// loft / profile helpers as the weapons. Everything here is reused by the range (and any other outdoor scene).

type P2 = [number, number];

/** Sawn timber with eased (3 mm) edges, lying along +x. `w` across, `h` tall. 2×4 = lumber(0.089, 0.038, len). */
export function lumber(w: number, h: number, len: number, ease = 0.003): Geometry {
  return roundedBox(len, h, w, Math.min(ease, h * 0.3), 2);
}

/** Hollow structural section post (square tube with 2t corner radius), standing along +y from y = 0. */
export function hssPost(size: number, height: number, cornerR = 0.012): Geometry {
  return roundedBox(size, height, size, cornerR, 3).translate(0, height / 2, 0);
}

/** I-beam (h tall, w flange width, tf flange, tw web) along +z, centred, from z0 to z1. */
export function iBeam(h: number, w: number, tf: number, tw: number, z0: number, z1: number): Geometry {
  const hw = w / 2, hh = h / 2, ht = tw / 2;
  const pts: P2[] = [[-hw, -hh], [hw, -hh], [hw, -hh + tf], [ht, -hh + tf], [ht, hh - tf], [hw, hh - tf], [hw, hh], [-hw, hh], [-hw, hh - tf], [-ht, hh - tf], [-ht, -hh + tf], [-hw, -hh + tf]];
  const prof: Profile = { pts, smooth: pts.map(() => false) };
  return prism(prof, z0, z1);
}

/** Lipped C purlin (h tall, w flange, lip, t thick) along +z, web at x = −w/2 (opening towards +x). */
export function cPurlin(h: number, w: number, lip: number, t: number, z0: number, z1: number): Geometry {
  const hh = h / 2, x0 = -w / 2;
  const outer: P2[] = [[x0, -hh], [x0 + w, -hh], [x0 + w, -hh + lip], [x0 + w - t, -hh + lip], [x0 + w - t, -hh + t], [x0 + t, -hh + t], [x0 + t, hh - t], [x0 + w - t, hh - t], [x0 + w - t, hh - lip], [x0 + w, hh - lip], [x0 + w, hh], [x0, hh]];
  const prof: Profile = { pts: outer, smooth: outer.map(() => false) };
  return prism(prof, z0, z1);
}

/** Equal angle iron (leg a, thickness t) along +z, corner at the origin, legs along +x and +y. */
export function angleIron(a: number, t: number, z0: number, z1: number): Geometry {
  const pts: P2[] = [[0, 0], [a, 0], [a, t], [t, t], [t, a], [0, a]];
  return prism({ pts, smooth: pts.map(() => false) }, z0, z1);
}

/**
 * Corrugated steel roofing sheet: sinusoidal profile across x (pitch / amplitude in metres), swept along +z
 * from z0 to z1, thickness t. Sheets overlap by one corrugation in real roofs — place them `pitch` closer.
 */
export function corrugatedSheet(width: number, z0: number, z1: number, pitch = 0.076, amp = 0.009, t = 0.0025, perPeriod = 8): Geometry {
  const periods = Math.max(1, Math.round(width / pitch));
  const n = periods * perPeriod;
  const w = periods * pitch;
  const top: P2[] = [], bottom: P2[] = [];
  for (let i = 0; i <= n; i++) {
    const x = -w / 2 + (i / n) * w;
    const y = amp * Math.sin((x / pitch) * Math.PI * 2);
    top.push([x, y]); bottom.push([x, y - t]);
  }
  const p = new Prof();
  for (const q of bottom) p.pt(q[0], q[1], true);
  p.smooth[0] = false; p.smooth[p.pts.length - 1] = false;
  const k0 = p.pts.length;
  for (let i = top.length - 1; i >= 0; i--) p.pt(top[i][0], top[i][1], true);
  p.smooth[k0] = false; p.smooth[p.pts.length - 1] = false;
  return prism(p.done(), z0, z1);
}

/** Hex bolt head (across-flats af, height h) with a washer, pointing +y from y = 0. */
export function hexBoltY(af: number, h: number, washerR = 0, washerT = 0.002): Geometry {
  const r = af / Math.sqrt(3); // circumradius
  const hex: P2[] = Array.from({ length: 6 }, (_, i) => [Math.cos((i / 6) * Math.PI * 2 + Math.PI / 6) * r, Math.sin((i / 6) * Math.PI * 2 + Math.PI / 6) * r]);
  const parts = [extrude(hex, h, { bevel: h * 0.18, bevelSegments: 1 }).rotateX(-Math.PI / 2).translate(0, washerT + h / 2, 0)];
  if (washerR > 0) parts.push(cylinder(washerR, washerR, washerT, 20).translate(0, washerT / 2, 0));
  return Geometry.merge(parts);
}

/** Anchored base plate: plate (side s, thickness t) with four hex nuts on studs at inset `ins`, sitting on y = 0. */
export function basePlate(s: number, t: number, ins: number, studR = 0.008): Geometry {
  const parts = [roundedBox(s, t, s, 0.003, 2).translate(0, t / 2, 0)];
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    const x = sx * (s / 2 - ins), z = sz * (s / 2 - ins);
    parts.push(hexBoltY(studR * 2 * 0.95, studR * 1.6, studR * 2.2, 0.0025).translate(x, t, z));
    parts.push(cylinder(studR, studR, studR * 1.2, 12).translate(x, t + 0.0025 + studR * 1.6 + studR * 0.6, z)); // stud end proud of the nut
  }
  return Geometry.merge(parts);
}

/** Carriage bolt: domed head (radius r) facing +y from y = 0. */
export function carriageBoltY(r: number): Geometry {
  const h = r * 0.55;
  return lathe([[0, 0], [r, 0], [r, h * 0.25], [r * 0.8, h * 0.75], [r * 0.4, h], [0, h]], 14, 50);
}

/** Round concrete footing (pier) with a chamfered top, standing along +y from y = 0. */
export function footing(r: number, h: number): Geometry {
  return lathe([[0, 0], [r, 0], [r, h - 0.02], [r - 0.02, h], [0, h]], 20);
}

/**
 * Cardboard target backer with torn, irregular edges (slightly bulged corners). Facing +z, centred, `t` thick.
 */
export function tornCardboard(w: number, h: number, t: number, seed = 1): Geometry {
  const rand = rng(seed);
  const pts: P2[] = [];
  const edge = (x0: number, y0: number, x1: number, y1: number, n: number) => {
    for (let i = 0; i < n; i++) {
      const f = i / n;
      const x = x0 + (x1 - x0) * f, y = y0 + (y1 - y0) * f;
      // tears: small random notches along the edge, bigger near the corners (handled, dropped, stapled)
      const nx = -(y1 - y0), ny = x1 - x0;
      const l = Math.hypot(nx, ny) || 1;
      const corner = Math.pow(Math.abs(f - 0.5) * 2, 3);
      const d = (i === 0 ? 0 : -(rand.next() * 0.006 + corner * rand.next() * 0.02));
      pts.push([x + (nx / l) * d, y + (ny / l) * d]);
    }
  };
  edge(-w / 2, -h / 2, w / 2, -h / 2, 10); edge(w / 2, -h / 2, w / 2, h / 2, 12); edge(w / 2, h / 2, -w / 2, h / 2, 10); edge(-w / 2, h / 2, -w / 2, -h / 2, 12);
  return extrude(pts, t, {});
}

/** Paper target sheet, facing +z, slightly curled (corners and top edge lift towards +z) and creased. */
export function curledPaper(w: number, h: number, curl = 0.012, seg = 10): Geometry {
  const g = plane(w, h, seg, seg).rotateX(Math.PI / 2); // plane(x, z) → (x, y) facing +z; UVs stay in metres
  return g.displace(([x, y, z]) => {
    const u = x / (w / 2), v = y / (h / 2);
    const c = Math.pow(Math.max(0, Math.abs(u) - 0.55) / 0.45, 2) * (0.4 + 0.6 * Math.max(0, v)) + Math.pow(Math.max(0, v - 0.6) / 0.4, 2) * 0.6;
    return [x, y, z + c * curl + Math.sin(x * 40) * 0.0004];
  });
}

/** Staple: a small wire U, legs into −z, crown along x. */
export function staple(width = 0.012, legs = 0.006, wire = 0.0006): Geometry {
  return tube([[-width / 2, 0, -legs], [-width / 2, 0, 0], [width / 2, 0, 0], [width / 2, 0, -legs]], wire, 5);
}

/** 55-gallon steel drum (585 × 880 mm) with two rolling hoops and a lid with bungs, standing on y = 0. */
export function steelDrum(): Geometry {
  const r = 0.2925, h = 0.88, hoop = 0.012;
  const prof: P2[] = [[0, 0], [r - 0.012, 0], [r - 0.012, 0.012], [r, 0.03]];
  for (const y of [0.3, 0.58]) prof.push([r, y - 0.03], [r + hoop, y - 0.012], [r + hoop, y + 0.012], [r, y + 0.03]);
  prof.push([r, h - 0.03], [r - 0.012, h - 0.012], [r - 0.012, h], [0, h]);
  const body = lathe(prof, 36, 30);
  const bung = cylinder(0.03, 0.03, 0.006, 14).translate(0.17, h + 0.003, 0);
  const bung2 = cylinder(0.02, 0.02, 0.006, 12).translate(-0.17, h + 0.003, 0);
  return Geometry.merge([body, bung, bung2]);
}

/** A filled sandbag (cordura, slumped), centred on its base. Random bulge from `seed`. */
export function sandbag(w: number, h: number, d: number, seed = 1): Geometry {
  const rand = rng(seed);
  const g = roundedBox(w, h, d, Math.min(h, d) * 0.45, 3);
  const p = g.positions;
  const kx = 0.05 + 0.04 * rand.next(), kz = 0.06 + 0.05 * rand.next(), sag = 0.1 + 0.1 * rand.next();
  for (let i = 0; i < p.length; i += 3) {
    const t = p[i + 1] / (h / 2);
    p[i] *= 1 + kx * (1 - t * t); p[i + 2] *= 1 + kz * (1 - t * t);
    p[i + 1] -= sag * h * Math.max(0, t) * (1 - Math.min(1, (p[i] * p[i]) / (w * w * 0.2)));
  }
  g.computeNormals();
  return g.translate(0, h / 2, 0);
}


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
      drum: synth.material('paintedSteel', { size, tileMeters: 0.9, color: [0.08, 0.16, 0.32], wear: 0.55, seed: 89, extra: 0.8 }, { name: 'drum-paint', edgeWear: 0.5, edgeWearRadius: 0.01 }),
    };
  }

  /** 55-gallon steel drum (brass bucket / trash) standing on the ground. */
  drum(x: number, y: number, z: number, ry = 0) {
    place(this.list, steelDrum(), this.mats.drum, this.T(x, y, z, ry));
    return this;
  }

  /** Stacked sandbag wall: `rows` courses of `perRow` bags, running along local +x, bags staggered per course. */
  sandbagWall(x: number, y: number, z: number, ry: number, rows: number, perRow: number, bagW = 0.42, bagH = 0.11, bagD = 0.26) {
    const M = this.T(x, y, z, ry);
    let n = 0;
    for (let r = 0; r < rows; r++) {
      const count = perRow - (r % 2);
      for (let i = 0; i < count; i++) {
        const lx = (i - (count - 1) / 2) * (bagW * 0.98) + (this.rand.next() - 0.5) * 0.02;
        const lz = (this.rand.next() - 0.5) * 0.03;
        const yaw = (this.rand.next() - 0.5) * 0.12;
        const g = sandbag(bagW, bagH, bagD, 500 + n++).rotateY(yaw).translate(lx, r * bagH * 0.86, lz);
        place(this.list, g, this.mats.bag, M);
      }
    }
    return this;
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
