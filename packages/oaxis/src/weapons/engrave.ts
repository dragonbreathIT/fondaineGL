// Laser-engraved roll marks: text rendered on a canvas → alpha-masked decal (albedo + engraved-edge normal map)
// laid 0.05 mm proud of a flat. Engraving burns through the finish, so it reads slightly lighter and more matte
// than the surrounding nitride / anodising, with a tiny recess shadow along the glyph edges.

import { Geometry, Material, Renderer } from '@fondaine/gl';

export interface EngraveOptions {
  /** Texture width in px (height follows the aspect of the plate). */
  px?: number;
  /** Text colour, linear RGB (bare steel under nitride ≈ 0.45 grey). */
  color?: [number, number, number];
  roughness?: number;
  metallic?: number;
  /** Line weight 0..1 (stroke width relative to the font size). */
  weight?: number;
  /** Letter tracking (em). */
  tracking?: number;
  font?: string;
  align?: 'left' | 'center' | 'right';
}

interface Canvas2D { width: number; height: number; getContext(k: '2d'): CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null }

function makeCanvas(w: number, h: number): Canvas2D | null {
  try {
    if (typeof document !== 'undefined') { const c = document.createElement('canvas'); c.width = w; c.height = h; return c as unknown as Canvas2D; }
    if (typeof OffscreenCanvas !== 'undefined') return new OffscreenCanvas(w, h) as unknown as Canvas2D;
  } catch { /* no 2D canvas (node) */ }
  return null;
}

/**
 * Build a decal material for `lines` of text on a plate `wM` × `hM` metres. Returns null when no 2D canvas is
 * available (headless node tests). Lines are laid out top to bottom with equal spacing.
 */
export function engravingMaterial(renderer: Renderer, lines: string[], wM: number, hM: number, o: EngraveOptions = {}): Material | null {
  const px = o.px ?? 1024;
  const W = px, H = Math.max(16, Math.round((px * hM) / wM));
  const c = makeCanvas(W, H);
  if (!c) return null;
  const ctx = c.getContext('2d');
  if (!ctx) return null;
  ctx.clearRect(0, 0, W, H);
  const n = lines.length;
  const lineH = H / n;
  const fontPx = Math.floor(lineH * 0.62);
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#ffffff';
  ctx.textBaseline = 'middle';
  ctx.textAlign = o.align ?? 'left';
  ctx.font = `${o.font ?? 'bold'} ${fontPx}px "Arial Narrow", "DejaVu Sans Condensed", "Liberation Sans Narrow", Arial, sans-serif`;
  const tracking = (o.tracking ?? 0.08) * fontPx;
  const x0 = o.align === 'center' ? W / 2 : o.align === 'right' ? W - fontPx * 0.3 : fontPx * 0.3;
  for (let i = 0; i < n; i++) {
    const y = lineH * (i + 0.5);
    const text = lines[i];
    // manual tracking so the glyphs look machine-set
    const widths = [...text].map((ch) => ctx.measureText(ch).width);
    const total = widths.reduce((a, b) => a + b, 0) + tracking * (text.length - 1);
    let x = o.align === 'center' ? x0 - total / 2 : o.align === 'right' ? x0 - total : x0;
    ctx.textAlign = 'left';
    for (let k = 0; k < text.length; k++) {
      ctx.fillText(text[k], x, y);
      if ((o.weight ?? 0.08) > 0) { ctx.lineWidth = Math.max(1, fontPx * (o.weight ?? 0.08) * 0.5); ctx.strokeText(text[k], x, y); }
      x += widths[k] + tracking;
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
  const depth = 2.2; // px-space slope scale
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
