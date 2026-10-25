// Laser-engraved roll marks: text rendered on a canvas → alpha-masked decal (albedo + engraved-edge normal map)
// laid 0.05 mm proud of a flat. Engraving burns through the finish, so it reads slightly lighter and more matte
// than the surrounding nitride / anodising, with a tiny recess shadow along the glyph edges.
//
// Glyphs come from a built-in condensed stroke font (single-line paths, round caps) rather than a system font:
// that is what a laser / roll die produces, it is identical on every platform, and it stays crisp at 2048 px.

import { Geometry, Material, Renderer } from '@fondaine/gl';

export interface EngraveOptions {
  /** Texture width in px (height follows the aspect of the plate). Default 2048. */
  px?: number;
  /** Text colour, linear RGB (bare steel under nitride ≈ 0.45 grey). */
  color?: [number, number, number];
  roughness?: number;
  metallic?: number;
  /** Line weight (stroke width in em). Default 0.11. */
  weight?: number;
  /** Letter tracking (em). */
  tracking?: number;
  align?: 'left' | 'center' | 'right';
  /** Cap height as a fraction of the line height (default 0.62). */
  capHeight?: number;
}

type Stroke = [number, number][];
/** Condensed engraving font: strokes in a cell [0, w] × [0, 1] (baseline 0, cap height 1), advance w. */
const GLYPHS: Record<string, { w: number; s: Stroke[] }> = {
  A: { w: 0.6, s: [[[0, 0], [0.3, 1], [0.6, 0]], [[0.12, 0.38], [0.48, 0.38]]] },
  B: { w: 0.6, s: [[[0, 0], [0, 1], [0.42, 1], [0.56, 0.88], [0.56, 0.64], [0.42, 0.53], [0, 0.53]], [[0.42, 0.53], [0.6, 0.4], [0.6, 0.12], [0.45, 0], [0, 0]]] },
  C: { w: 0.6, s: [[[0.6, 0.84], [0.45, 1], [0.15, 1], [0, 0.84], [0, 0.16], [0.15, 0], [0.45, 0], [0.6, 0.16]]] },
  D: { w: 0.6, s: [[[0, 0], [0, 1], [0.4, 1], [0.6, 0.8], [0.6, 0.2], [0.4, 0], [0, 0]]] },
  E: { w: 0.55, s: [[[0.55, 1], [0, 1], [0, 0], [0.55, 0]], [[0, 0.53], [0.46, 0.53]]] },
  F: { w: 0.55, s: [[[0.55, 1], [0, 1], [0, 0]], [[0, 0.53], [0.46, 0.53]]] },
  G: { w: 0.6, s: [[[0.6, 0.84], [0.45, 1], [0.15, 1], [0, 0.84], [0, 0.16], [0.15, 0], [0.45, 0], [0.6, 0.16], [0.6, 0.46], [0.34, 0.46]]] },
  H: { w: 0.6, s: [[[0, 0], [0, 1]], [[0.6, 0], [0.6, 1]], [[0, 0.53], [0.6, 0.53]]] },
  I: { w: 0.2, s: [[[0.1, 0], [0.1, 1]]] },
  J: { w: 0.55, s: [[[0.55, 1], [0.55, 0.18], [0.4, 0], [0.15, 0], [0, 0.18]]] },
  K: { w: 0.6, s: [[[0, 0], [0, 1]], [[0.58, 1], [0, 0.42]], [[0.2, 0.57], [0.6, 0]]] },
  L: { w: 0.52, s: [[[0, 1], [0, 0], [0.52, 0]]] },
  M: { w: 0.78, s: [[[0, 0], [0, 1], [0.39, 0.3], [0.78, 1], [0.78, 0]]] },
  N: { w: 0.6, s: [[[0, 0], [0, 1], [0.6, 0], [0.6, 1]]] },
  O: { w: 0.6, s: [[[0.15, 0], [0, 0.16], [0, 0.84], [0.15, 1], [0.45, 1], [0.6, 0.84], [0.6, 0.16], [0.45, 0], [0.15, 0]]] },
  P: { w: 0.58, s: [[[0, 0], [0, 1], [0.44, 1], [0.58, 0.88], [0.58, 0.6], [0.44, 0.48], [0, 0.48]]] },
  Q: { w: 0.6, s: [[[0.15, 0], [0, 0.16], [0, 0.84], [0.15, 1], [0.45, 1], [0.6, 0.84], [0.6, 0.16], [0.45, 0], [0.15, 0]], [[0.38, 0.24], [0.64, -0.04]]] },
  R: { w: 0.6, s: [[[0, 0], [0, 1], [0.44, 1], [0.58, 0.88], [0.58, 0.6], [0.44, 0.48], [0, 0.48]], [[0.3, 0.48], [0.6, 0]]] },
  S: { w: 0.58, s: [[[0.58, 0.84], [0.44, 1], [0.14, 1], [0, 0.84], [0, 0.64], [0.14, 0.53], [0.44, 0.47], [0.58, 0.36], [0.58, 0.16], [0.44, 0], [0.14, 0], [0, 0.16]]] },
  T: { w: 0.56, s: [[[0, 1], [0.56, 1]], [[0.28, 1], [0.28, 0]]] },
  U: { w: 0.6, s: [[[0, 1], [0, 0.16], [0.15, 0], [0.45, 0], [0.6, 0.16], [0.6, 1]]] },
  V: { w: 0.6, s: [[[0, 1], [0.3, 0], [0.6, 1]]] },
  W: { w: 0.82, s: [[[0, 1], [0.2, 0], [0.41, 0.72], [0.62, 0], [0.82, 1]]] },
  X: { w: 0.58, s: [[[0, 0], [0.58, 1]], [[0, 1], [0.58, 0]]] },
  Y: { w: 0.6, s: [[[0, 1], [0.3, 0.5], [0.6, 1]], [[0.3, 0.5], [0.3, 0]]] },
  Z: { w: 0.56, s: [[[0, 1], [0.56, 1], [0, 0], [0.56, 0]]] },
  '0': { w: 0.55, s: [[[0.14, 0], [0, 0.16], [0, 0.84], [0.14, 1], [0.41, 1], [0.55, 0.84], [0.55, 0.16], [0.41, 0], [0.14, 0]]] },
  '1': { w: 0.36, s: [[[0.04, 0.78], [0.26, 1], [0.26, 0]]] },
  '2': { w: 0.55, s: [[[0, 0.84], [0.14, 1], [0.41, 1], [0.55, 0.84], [0.55, 0.64], [0, 0.1], [0, 0], [0.55, 0]]] },
  '3': { w: 0.55, s: [[[0, 0.84], [0.14, 1], [0.41, 1], [0.55, 0.84], [0.55, 0.64], [0.41, 0.53], [0.22, 0.53]], [[0.41, 0.53], [0.55, 0.42], [0.55, 0.16], [0.41, 0], [0.14, 0], [0, 0.16]]] },
  '4': { w: 0.56, s: [[[0.42, 0], [0.42, 1], [0, 0.3], [0.56, 0.3]]] },
  '5': { w: 0.55, s: [[[0.52, 1], [0.06, 1], [0.02, 0.56], [0.16, 0.63], [0.4, 0.63], [0.55, 0.5], [0.55, 0.16], [0.41, 0], [0.14, 0], [0, 0.16]]] },
  '6': { w: 0.55, s: [[[0.5, 1], [0.22, 1], [0.04, 0.8], [0, 0.16], [0.14, 0], [0.41, 0], [0.55, 0.16], [0.55, 0.42], [0.41, 0.56], [0.14, 0.56], [0, 0.42]]] },
  '7': { w: 0.54, s: [[[0, 1], [0.54, 1], [0.2, 0]]] },
  '8': { w: 0.55, s: [[[0.275, 0.53], [0.12, 0.63], [0.12, 0.88], [0.275, 1], [0.43, 0.88], [0.43, 0.63], [0.275, 0.53], [0.1, 0.42], [0.1, 0.12], [0.275, 0], [0.45, 0.12], [0.45, 0.42], [0.275, 0.53]]] },
  '9': { w: 0.55, s: [[[0.55, 0.58], [0.41, 0.44], [0.14, 0.44], [0, 0.58], [0, 0.84], [0.14, 1], [0.41, 1], [0.55, 0.84], [0.55, 0.2], [0.35, 0], [0.05, 0]]] },
  '.': { w: 0.2, s: [[[0.1, 0.03], [0.1, 0.05]]] },
  ',': { w: 0.2, s: [[[0.12, 0.08], [0.06, -0.12]]] },
  '-': { w: 0.4, s: [[[0.06, 0.46], [0.34, 0.46]]] },
  '/': { w: 0.44, s: [[[0, 0], [0.44, 1]]] },
  ':': { w: 0.2, s: [[[0.1, 0.2], [0.1, 0.22]], [[0.1, 0.66], [0.1, 0.68]]] },
  x: { w: 0.46, s: [[[0, 0], [0.46, 0.62]], [[0, 0.62], [0.46, 0]]] },
  m: { w: 0.7, s: [[[0, 0], [0, 0.62]], [[0, 0.5], [0.12, 0.62], [0.26, 0.62], [0.35, 0.5], [0.35, 0]], [[0.35, 0.5], [0.47, 0.62], [0.61, 0.62], [0.7, 0.5], [0.7, 0]]] },
  ' ': { w: 0.4, s: [] },
};
function glyph(ch: string) { return GLYPHS[ch] ?? GLYPHS[ch.toUpperCase()] ?? GLYPHS[' ']; }

interface Canvas2D { width: number; height: number; getContext(k: '2d'): CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null }

function makeCanvas(w: number, h: number): Canvas2D | null {
  try {
    if (typeof document !== 'undefined') { const c = document.createElement('canvas'); c.width = w; c.height = h; return c as unknown as Canvas2D; }
    if (typeof OffscreenCanvas !== 'undefined') return new OffscreenCanvas(w, h) as unknown as Canvas2D;
  } catch { /* no 2D canvas (node) */ }
  return null;
}

/** Advance of a string in em (glyph widths + tracking). */
export function engravingWidthEm(text: string, tracking = 0.08): number {
  let w = 0;
  for (const ch of text) w += glyph(ch).w + tracking;
  return w - tracking;
}

/**
 * Build a decal material for `lines` of text on a plate `wM` × `hM` metres. Returns null when no 2D canvas is
 * available (headless node tests). Lines are laid out top to bottom with equal spacing; a line that would overflow
 * the plate is shrunk to fit.
 */
export function engravingMaterial(renderer: Renderer, lines: string[], wM: number, hM: number, o: EngraveOptions = {}): Material | null {
  const px = o.px ?? 2048;
  const W = px, H = Math.max(16, Math.round((px * hM) / wM));
  const c = makeCanvas(W, H);
  if (!c) return null;
  const ctx = c.getContext('2d');
  if (!ctx) return null;
  ctx.clearRect(0, 0, W, H);
  const n = lines.length;
  const lineH = H / n;
  const tracking = o.tracking ?? 0.08;
  const margin = 0.03 * W;
  ctx.strokeStyle = '#ffffff';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (let i = 0; i < n; i++) {
    const text = lines[i];
    let em = lineH * (o.capHeight ?? 0.62);
    const adv = engravingWidthEm(text, tracking);
    if (adv * em > W - 2 * margin) em = (W - 2 * margin) / adv;      // shrink to fit the plate
    const total = adv * em;
    const x0 = o.align === 'center' ? (W - total) / 2 : o.align === 'right' ? W - margin - total : margin;
    const base = lineH * (i + 0.5) + em / 2;                            // baseline (canvas y grows down)
    ctx.lineWidth = Math.max(1, em * (o.weight ?? 0.11));
    let x = x0;
    for (const ch of text) {
      const g = glyph(ch);
      for (const st of g.s) {
        ctx.beginPath();
        st.forEach(([gx, gy], k) => { const X = x + gx * em, Y = base - gy * em; if (k === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y); });
        ctx.stroke();
      }
      x += (g.w + tracking) * em;
    }
  }
  const img = ctx.getImageData(0, 0, W, H);
  const a = img.data;
  // alpha mask = coverage; colour = engraved steel
  const col = o.color ?? [0.42, 0.42, 0.43];
  const srgb = (v: number) => Math.round(255 * (v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055));
  const albedo = new Uint8Array(W * H * 4);
  const cov = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const k = a[i * 4 + 3] / 255;
    cov[i] = k;
    albedo[i * 4] = srgb(col[0]); albedo[i * 4 + 1] = srgb(col[1]); albedo[i * 4 + 2] = srgb(col[2]);
    albedo[i * 4 + 3] = Math.round(k * 255);
  }
  // normal map from the coverage gradient: glyph edges slope down into the engraving
  const nrm = new Uint8Array(W * H * 4);
  const depth = 1.1; // px-space slope scale (gentle: a laser engraving is a few hundredths of a mm deep)
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const l = cov[y * W + Math.max(0, x - 1)], r = cov[y * W + Math.min(W - 1, x + 1)];
      const u = cov[Math.max(0, y - 1) * W + x], d = cov[Math.min(H - 1, y + 1) * W + x];
      let nx = (r - l) * depth, ny = -(d - u) * depth, nz = 1;
      const len = Math.hypot(nx, ny, nz); nx /= len; ny /= len; nz /= len;
      nrm[i * 4] = Math.round((nx * 0.5 + 0.5) * 255); nrm[i * 4 + 1] = Math.round((ny * 0.5 + 0.5) * 255); nrm[i * 4 + 2] = Math.round((nz * 0.5 + 0.5) * 255); nrm[i * 4 + 3] = 255;
    }
  }
  const tex = renderer.textures;
  const baseColorMap = tex.fromRGBA8(albedo as Uint8Array<ArrayBuffer>, W, H, { srgb: true, label: 'engrave.albedo' });
  const normalMap = tex.fromRGBA8(nrm as Uint8Array<ArrayBuffer>, W, H, { normalMap: true, label: 'engrave.normal' });
  return new Material({
    name: 'engraving', baseColorMap, normalMap, baseColor: [1, 1, 1, 1],
    roughness: o.roughness ?? 0.6, metallic: o.metallic ?? 1, alphaMode: 'mask', alphaCutoff: 0.35, normalScale: 0.8,
    uvScale: [1, 1], sampler: tex.sampler({ address: 'clamp-to-edge' }),
  });
}

/**
 * Decal quad in the plane x = x0 facing ±x (dir), centred at (y, z) with size wM (along z) × hM (along y).
 * UV u runs along the reading direction: towards −z (the muzzle) on the left side, towards +z on the right side,
 * so text on both sides reads muzzle-forward as on a real slide.
 */
export function engravingQuadX(x0: number, y: number, z: number, wM: number, hM: number, dir: 1 | -1): Geometry {
  // left side (dir = −1): the viewer at −x looks towards +x, the muzzle (−z) is on their left → text reads towards +z
  const zl = dir < 0 ? z - wM / 2 : z + wM / 2, zr = dir < 0 ? z + wM / 2 : z - wM / 2;
  const pos = [x0, y - hM / 2, zl, x0, y - hM / 2, zr, x0, y + hM / 2, zr, x0, y + hM / 2, zl];
  const nrm = [dir, 0, 0, dir, 0, 0, dir, 0, 0, dir, 0, 0];
  const uv = [0, 1, 1, 1, 1, 0, 0, 0];
  const g = new Geometry(pos, nrm, uv, [0, 1, 2, 0, 2, 3]);
  return g.computeTangents();
}
