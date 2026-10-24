// Procedural treelines: broadleaf and conifer trees built from tapered trunks + alpha-tested foliage cards
// with spherical ("canopy") normals, so a crown shades like a volume of leaves rather than flat quads. Leaf
// and needle clump textures are painted procedurally at load. Meant for mid/far distance (20–500 m), where
// silhouette, crown colour variation and translucent back-lighting carry the realism.

import { Geometry, Material, Mesh, RenderObject, Renderer, rng, cylinder } from '@fondaine/gl';

export interface TreeInstance { x: number; z: number; kind: 'broadleaf' | 'conifer'; scale?: number }
export interface TreesOptions {
  trees: TreeInstance[];
  height: (x: number, z: number) => number;
  /** Trees per merged chunk (draw call). */
  chunk?: number;
  castShadow?: boolean;
  seed?: number;
  textureSize?: number;
}
export interface TreeField { objects: RenderObject[]; trees: number; cards: number }

type Ctx = OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;

function canvas(size: number): { c: OffscreenCanvas | HTMLCanvasElement; ctx: Ctx } {
  if (typeof OffscreenCanvas !== 'undefined') { const c = new OffscreenCanvas(size, size); return { c, ctx: c.getContext('2d')! }; }
  const c = document.createElement('canvas'); c.width = c.height = size; return { c, ctx: c.getContext('2d')! };
}

/** Broadleaf clump: hundreds of small leaves in a soft disc, darker inside (self-shadowing), twigs. */
function paintLeaves(size: number, seed: number, palette: [number, number, number][]) {
  const { c, ctx } = canvas(size);
  const r = rng(seed);
  ctx.clearRect(0, 0, size, size);
  ctx.strokeStyle = 'rgb(58,44,30)';
  ctx.lineWidth = size / 220;
  for (let i = 0; i < 14; i++) {
    const a = r.next() * Math.PI * 2, l = size * (0.25 + 0.2 * r.next());
    ctx.beginPath(); ctx.moveTo(size / 2, size / 2); ctx.lineTo(size / 2 + Math.cos(a) * l, size / 2 + Math.sin(a) * l); ctx.stroke();
  }
  const n = Math.round(size * size / 140);
  for (let i = 0; i < n; i++) {
    // gaussian-ish radial distribution → dense core, ragged edge
    const a = r.next() * Math.PI * 2;
    const rad = Math.min(0.48, Math.abs(r.gauss()) * 0.2) * size;
    const x = size / 2 + Math.cos(a) * rad, y = size / 2 + Math.sin(a) * rad;
    const p = palette[Math.floor(r.next() * palette.length)];
    const shade = 0.55 + 0.45 * (1 - rad / (size * 0.5)) * 0.6 + 0.25 * r.next() - (y / size) * 0.25;
    ctx.fillStyle = `rgb(${Math.min(255, p[0] * shade)},${Math.min(255, p[1] * shade)},${Math.min(255, p[2] * shade)})`;
    ctx.beginPath();
    ctx.ellipse(x, y, size * (0.008 + 0.008 * r.next()), size * (0.004 + 0.004 * r.next()), r.next() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  return c;
}

/** Conifer clump: fans of needles along drooping twigs. */
function paintNeedles(size: number, seed: number) {
  const { c, ctx } = canvas(size);
  const r = rng(seed);
  ctx.clearRect(0, 0, size, size);
  for (let b = 0; b < 26; b++) {
    const x0 = size * (0.2 + 0.6 * r.next()), y0 = size * (0.1 + 0.25 * r.next());
    const len = size * (0.35 + 0.3 * r.next());
    const ang = Math.PI / 2 + (r.next() - 0.5) * 0.9;
    for (let k = 0; k < 60; k++) {
      const t = k / 60;
      const x = x0 + Math.cos(ang) * len * t, y = y0 + Math.sin(ang) * len * t + t * t * size * 0.05;
      const g = 60 + 50 * r.next();
      ctx.strokeStyle = `rgb(${18 + 18 * r.next()},${g},${28 + 20 * r.next()})`;
      ctx.lineWidth = size / 400;
      for (const s of [-1, 1]) {
        const a2 = ang + s * (0.9 + 0.3 * r.next());
        const l2 = size * (0.03 + 0.02 * r.next()) * (1 - 0.5 * t);
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(a2) * l2, y + Math.sin(a2) * l2); ctx.stroke();
      }
    }
  }
  return c;
}

function foliageMaterial(renderer: Renderer, img: OffscreenCanvas | HTMLCanvasElement, name: string): Material {
  const tex = renderer.textures.fromImage(img as unknown as HTMLCanvasElement, { srgb: true, label: name });
  return new Material({ name, baseColorMap: tex, alphaMode: 'mask', alphaCutoff: 0.33, doubleSided: true, foliage: true, roughness: 0.62, metallic: 0, specular: 0.35 });
}

export function buildTrees(renderer: Renderer, o: TreesOptions): TreeField {
  const ts = o.textureSize ?? 512;
  const leaves = foliageMaterial(renderer, paintLeaves(ts, 11, [[52, 74, 28], [70, 92, 34], [40, 60, 24], [86, 102, 40], [62, 80, 30]]), 'leaf-clumps');
  const needles = foliageMaterial(renderer, paintNeedles(ts, 12), 'needle-clumps');
  const bark = renderer.synth.material('ground', { size: 512, tileMeters: 1.2, color: [0.12, 0.09, 0.07], color2: [0.08, 0.07, 0.05], bumpMm: 6, seed: 77 }, { name: 'bark' });
  const r = rng(o.seed ?? 5150);
  const per = o.chunk ?? 60;
  const objects: RenderObject[] = [];
  let cards = 0;

  for (let start = 0; start < o.trees.length; start += per) {
    const batch = o.trees.slice(start, start + per);
    const L: { P: number[]; N: number[]; U: number[]; I: number[] } = { P: [], N: [], U: [], I: [] };
    const C: typeof L = { P: [], N: [], U: [], I: [] };
    const trunks: Geometry[] = [];
    for (const t of batch) {
      const y0 = o.height(t.x, t.z) - 0.2;
      const s = (t.scale ?? 1) * (0.8 + 0.45 * r.next());
      const conifer = t.kind === 'conifer';
      const H = (conifer ? 17 : 13) * s;
      const crownBase = (conifer ? 0.12 : 0.32) * H;
      const R = (conifer ? 3.0 : 4.6) * s * (0.85 + 0.3 * r.next());
      const lean = [(r.next() - 0.5) * 0.06, (r.next() - 0.5) * 0.06];
      trunks.push(cylinder(0.12 * s, 0.32 * s, H * 0.85, 8).translate(t.x, y0 + H * 0.425, t.z));
      const target = conifer ? C : L;
      const nCards = conifer ? 46 : 58;
      const cx = t.x, cz = t.z;
      const cy = y0 + crownBase + (H - crownBase) * (conifer ? 0.4 : 0.5);
      for (let k = 0; k < nCards; k++) {
        // position inside the crown volume (ellipsoid / cone), biased to the surface
        let px: number, py: number, pz: number;
        const u = r.next(), a = r.next() * Math.PI * 2;
        if (conifer) {
          const h = Math.pow(r.next(), 0.8);                        // 0 = crown base, 1 = tip
          const rad = R * (1 - h) * (0.55 + 0.45 * Math.sqrt(u));
          px = cx + Math.cos(a) * rad; pz = cz + Math.sin(a) * rad; py = y0 + crownBase + h * (H - crownBase);
        } else {
          const cosT = 2 * r.next() - 1, sinT = Math.sqrt(1 - cosT * cosT);
          const rad = 0.55 + 0.45 * Math.cbrt(u);
          px = cx + Math.cos(a) * sinT * R * rad; pz = cz + Math.sin(a) * sinT * R * rad; py = cy + cosT * (H - crownBase) * 0.5 * rad;
        }
        px += lean[0] * (py - y0); pz += lean[1] * (py - y0);
        const size = (conifer ? 2.6 : 3.2) * s * (0.7 + 0.6 * r.next());
        // card orientation: random, slightly facing outward; normals = from crown centre (volumetric shading)
        const yaw = r.next() * Math.PI * 2, tilt = (r.next() - 0.5) * 1.2;
        const ux = Math.cos(yaw), uz = Math.sin(yaw);
        const vx = -Math.sin(tilt) * uz, vy = Math.cos(tilt), vz = Math.sin(tilt) * ux;
        let nx = px - cx, ny = (py - cy) * 0.6 + (conifer ? 0.4 : 0.25) * (H - crownBase) * 0.2, nz = pz - cz;
        const nl = Math.hypot(nx, ny, nz) || 1; nx /= nl; ny /= nl; nz /= nl;
        const base = target.P.length / 3;
        const hs = size / 2;
        const corners: [number, number][] = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
        for (const [cu, cv] of corners) {
          target.P.push(px + ux * hs * cu + vx * hs * cv, py + vy * hs * cv - (conifer ? hs * 0.25 : 0), pz + uz * hs * cu + vz * hs * cv);
          target.N.push(nx, ny, nz);
          target.U.push((cu + 1) / 2, 1 - (cv + 1) / 2);
        }
        target.I.push(base, base + 1, base + 2, base, base + 2, base + 3);
        cards++;
      }
    }
    const add = (g: Geometry, m: Material) => {
      const obj = new RenderObject(new Mesh(renderer.dev, g.computeTangents(), { label: m.name }), m);
      obj.castShadow = o.castShadow ?? true;
      objects.push(obj);
    };
    if (L.P.length) add(new Geometry(L.P, L.N, L.U, L.I), leaves);
    if (C.P.length) add(new Geometry(C.P, C.N, C.U, C.I), needles);
    if (trunks.length) add(Geometry.merge(trunks), bark);
  }
  return { objects, trees: o.trees.length, cards };
}
