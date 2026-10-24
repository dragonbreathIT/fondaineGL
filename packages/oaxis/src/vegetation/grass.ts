// Geometric grass: individual curved, tapered blades (no alpha cards), batched into world-space chunks that
// fondaineGL frustum-culls. Blades sway in the wind on the GPU (foliage material: uv.y = height along the
// blade) and are lit as thin translucent surfaces. Colour comes from a small procedural strip texture
// (x = per-blade variation lush → dry, y = root → tip), so no two patches look alike.

import { Geometry, Material, Mesh, RenderObject, Renderer, rng } from '@fondaine/gl';

export interface GrassOptions {
  /** World-space XZ rectangle to fill. */
  bounds: { minX: number; maxX: number; minZ: number; maxZ: number };
  /** Terrain height at (x, z). */
  height: (x: number, z: number) => number;
  /** Blades per m² at (x, z) (0 = bare). */
  density: (x: number, z: number) => number;
  /** Blade height range (m) at (x, z): return [min, max]. Default mowed lawn 0.06–0.16 m. */
  bladeHeight?: (x: number, z: number) => [number, number];
  /** Blade width at the root (m). */
  bladeWidth?: [number, number];
  /** Fraction of blades that are dry/straw coloured (0..1), may vary by position. */
  dryness?: (x: number, z: number) => number;
  chunkSize?: number;
  /** Hard cap on blades (safety). */
  maxBlades?: number;
  castShadow?: boolean;
  seed?: number;
}

export interface GrassField { objects: RenderObject[]; blades: number; triangles: number; material: Material }

const SEGMENTS = 3; // 2 quads + tip triangle: 7 vertices, 5 triangles per blade

/** Procedural blade colour strip (sRGB): x = variation (lush → dry), y = root (0) → tip (1). */
function grassStrip(renderer: Renderer, size = 128): Material {
  const w = size, h = size;
  const data = new Uint8Array(w * h * 4);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  for (let y = 0; y < h; y++) {
    const t = y / (h - 1); // texture row 0 = uv.y 0 (root)
    for (let x = 0; x < w; x++) {
      const v = x / (w - 1);
      // lush green → olive → straw, in sRGB
      const lush = [58, 86, 30], olive = [96, 104, 44], straw = [168, 148, 96];
      const a = v < 0.6 ? lush : olive, b = v < 0.6 ? olive : straw;
      const k = v < 0.6 ? v / 0.6 : (v - 0.6) / 0.4;
      let r = lerp(a[0], b[0], k), g = lerp(a[1], b[1], k), bl = lerp(a[2], b[2], k);
      // root: darker and browner (self-shadowed thatch); tip: lighter, slightly sun-bleached
      const root = Math.pow(1 - t, 3);
      r = lerp(r, r * 0.55 + 12, root); g = lerp(g, g * 0.5 + 6, root); bl = lerp(bl, bl * 0.5, root);
      const tip = Math.max(0, (t - 0.75) / 0.25);
      r = lerp(r, r * 1.08 + 10, tip * 0.6); g = lerp(g, g * 1.06 + 8, tip * 0.6);
      // fine vein noise across the variation axis
      const n = (Math.sin(x * 12.9898 + y * 0.7) * 43758.5453) % 1;
      const f = 0.94 + 0.06 * Math.abs(n);
      const o = (y * w + x) * 4;
      data[o] = Math.min(255, r * f); data[o + 1] = Math.min(255, g * f); data[o + 2] = Math.min(255, bl * f); data[o + 3] = 255;
    }
  }
  const tex = renderer.textures.fromRGBA8(data as Uint8Array<ArrayBuffer>, w, h, { srgb: true, label: 'grass-strip' });
  return new Material({ name: 'grass-blades', baseColorMap: tex, roughness: 0.48, metallic: 0, specular: 0.4, foliage: true, wind: true, doubleSided: true });
}

export function buildGrass(renderer: Renderer, o: GrassOptions): GrassField {
  const material = grassStrip(renderer);
  const rand = rng(o.seed ?? 9001);
  const cs = o.chunkSize ?? 8;
  const bw = o.bladeWidth ?? [0.0035, 0.0075];
  const maxBlades = o.maxBlades ?? 400_000;
  const objects: RenderObject[] = [];
  let blades = 0;
  const sub = 0.25; // stratification cell (m)

  for (let cz = o.bounds.minZ; cz < o.bounds.maxZ; cz += cs) {
    for (let cx = o.bounds.minX; cx < o.bounds.maxX; cx += cs) {
      // count first so the arrays are allocated once per chunk
      const pts: number[] = [];
      for (let z = cz; z < Math.min(cz + cs, o.bounds.maxZ); z += sub) {
        for (let x = cx; x < Math.min(cx + cs, o.bounds.maxX); x += sub) {
          const d = o.density(x + sub / 2, z + sub / 2) * sub * sub;
          if (d <= 0) continue;
          let n = Math.floor(d);
          if (rand.next() < d - n) n++;
          for (let i = 0; i < n && blades + pts.length / 2 < maxBlades; i++) pts.push(x + rand.next() * sub, z + rand.next() * sub);
        }
      }
      const nb = pts.length / 2;
      if (!nb) continue;
      const vpb = SEGMENTS * 2 + 1, ipb = ((SEGMENTS - 1) * 2 + 1) * 3;
      const P = new Float32Array(nb * vpb * 3), N = new Float32Array(nb * vpb * 3), U = new Float32Array(nb * vpb * 2), T = new Float32Array(nb * vpb * 4);
      const I = new Uint32Array(nb * ipb);
      for (let b = 0; b < nb; b++) {
        const x = pts[b * 2], z = pts[b * 2 + 1];
        const y0 = o.height(x, z) - 0.01;
        const [hmin, hmax] = o.bladeHeight?.(x, z) ?? [0.06, 0.16];
        const H = hmin + (hmax - hmin) * Math.pow(rand.next(), 1.6);
        const W = bw[0] + (bw[1] - bw[0]) * rand.next();
        const yaw = rand.next() * Math.PI * 2;
        const leanYaw = yaw + (rand.next() - 0.5) * 1.2;
        const lean = 0.15 + 0.6 * rand.next() * rand.next();
        const fx = Math.cos(yaw), fz = Math.sin(yaw);           // blade face normal (horizontal)
        const sx = -fz, sz = fx;                                 // across the blade
        const lx = Math.cos(leanYaw), lz = Math.sin(leanYaw);
        const dry = o.dryness?.(x, z) ?? 0.15;
        const variation = rand.next() < dry ? 0.65 + 0.33 * rand.next() : 0.03 + 0.55 * rand.next();
        const vb = b * vpb;
        let vi = vb;
        for (let s = 0; s <= SEGMENTS; s++) {
          const t = s / SEGMENTS;
          const bend = lean * t * t * H;
          const cxp = x + lx * bend, czp = z + lz * bend, cyp = y0 + H * t * (1 - 0.25 * lean * t);
          // blade normal tilts back as it bends; blend towards up for soft lawn shading
          const nyB = 0.55 + 0.25 * t;
          const width = s === SEGMENTS ? 0 : W * (1 - Math.pow(t, 1.4) * 0.85);
          const cols = s === SEGMENTS ? [0] : [-1, 1];
          for (const side of cols) {
            P[vi * 3] = cxp + sx * width * 0.5 * side;
            P[vi * 3 + 1] = cyp;
            P[vi * 3 + 2] = czp + sz * width * 0.5 * side;
            // rounded cross-section: normals splay across the width
            let nx = fx + sx * 0.45 * side, ny = nyB, nz = fz + sz * 0.45 * side;
            const l = Math.hypot(nx, ny, nz); nx /= l; ny /= l; nz /= l;
            N[vi * 3] = nx; N[vi * 3 + 1] = ny; N[vi * 3 + 2] = nz;
            U[vi * 2] = variation; U[vi * 2 + 1] = t;
            T[vi * 4] = sx; T[vi * 4 + 1] = 0; T[vi * 4 + 2] = sz; T[vi * 4 + 3] = 1;
            vi++;
          }
        }
        let ii = b * ipb;
        for (let s = 0; s < SEGMENTS - 1; s++) {
          const a = vb + s * 2;
          I[ii++] = a; I[ii++] = a + 1; I[ii++] = a + 2;
          I[ii++] = a + 1; I[ii++] = a + 3; I[ii++] = a + 2;
        }
        const a = vb + (SEGMENTS - 1) * 2;
        I[ii++] = a; I[ii++] = a + 1; I[ii++] = a + 2;
      }
      const g = new Geometry(P, N, U, I);
      g.tangents = T;
      const obj = new RenderObject(new Mesh(renderer.dev, g, { label: 'grass-chunk' }), material);
      obj.castShadow = o.castShadow ?? true;
      objects.push(obj);
      blades += nb;
    }
  }
  return { objects, blades, triangles: blades * ((SEGMENTS - 1) * 2 + 1), material };
}
