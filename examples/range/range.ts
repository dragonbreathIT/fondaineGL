// The outdoor shooting range: covered firing line, benches, gravel apron, earth berms, paper targets at
// 10/15 m, hanging AR500 steel at 25/50/100 m. Every surface is real-scale and registered with physics.
//
// The ground is one engine `Terrain`: a heightfield whose embankments (side berms, backstop, spoil mounds)
// are part of the height function, with gravel / dirt / grass layers blended per pixel from authored masks
// and slope rules. The structure is built from the construction kit in oAxis props (chamfered timber, HSS
// posts on anchored base plates, I-beam rafters, C purlins, corrugated sheets, carriage bolts).

import { Engine, SURFACE, SteelTarget, PaperTarget, ImpactSystem } from '@fondaine/gl';
import { Geometry, Material, Mesh, RenderObject, box, cylinder, tube, roundedBox, mat4, Mat4, quat, vec3, rng, MaterialSynth } from '@fondaine/gl';
import { Terrain, berm, mound, heightMax, regionMask, terrainFbm, HeightFn } from '@fondaine/gl';
import { buildGrass, buildTrees, TreeInstance, RangeProps, AssetLibrary, InstancedLODSet } from '@fondaine/oaxis';
import { lumber, hssPost, iBeam, cPurlin, angleIron, corrugatedSheet, basePlate, carriageBoltY, tornCardboard, curledPaper, staple } from '@fondaine/oaxis';

export interface RangeBuild { impacts: ImpactSystem; spawn: [number, number, number]; steel: SteelTarget[]; paper: PaperTarget[]; lods: InstancedLODSet[]; terrain: Terrain }

const smooth01 = (t: number) => { const u = t < 0 ? 0 : t > 1 ? 1 : t; return u * u * (3 - 2 * u); };

// ---------------------------------------------------------------------------------------------- layout
// Everything that has to agree between terrain, masks, targets and physics lives here.
const LAYOUT = {
  slab: { w: 16, d: 7, z: -0.5, top: 0.16 },                 // concrete slab: x ±8, z −4 … 3
  pad: { minX: -8.6, maxX: 8.6, minZ: -10.8, maxZ: -3.9 },   // gravel apron in front of the slab
  bermX: 21, bermZ: [0, -120], bermHeight: 3.4, bermCrest: 1.5, bermBase: 9,
  backstopZ: -112, backstopHeight: 7, backstopCrest: 3, backstopBase: 18,
  paper: [[-2, -10], [2, -15]] as [number, number][],
  steel: [[-3, -25], [3, -25], [0, -50], [-4, -100], [5, -100]] as [number, number][],
  markers: [-10, -15, -25, -50, -75, -100],
  markerX: -15.5,
};

/** Embankments only (height above the graded floor): side berms, backstop, rounded corners, spoil mounds. */
const EMBANKMENTS: HeightFn = heightMax(
  berm({ from: [-LAYOUT.bermX, LAYOUT.bermZ[0]], to: [-LAYOUT.bermX, LAYOUT.bermZ[1]], height: LAYOUT.bermHeight, crestWidth: LAYOUT.bermCrest, baseWidth: LAYOUT.bermBase, erosion: 0.65, toe: 2, seed: 1 }),
  berm({ from: [LAYOUT.bermX, LAYOUT.bermZ[0]], to: [LAYOUT.bermX, LAYOUT.bermZ[1]], height: LAYOUT.bermHeight, crestWidth: LAYOUT.bermCrest, baseWidth: LAYOUT.bermBase, erosion: 0.65, toe: 2, seed: 2 }),
  berm({ from: [-26, LAYOUT.backstopZ], to: [26, LAYOUT.backstopZ], height: LAYOUT.backstopHeight, crestWidth: LAYOUT.backstopCrest, baseWidth: LAYOUT.backstopBase, erosion: 0.6, toe: 2.5, seed: 3 }),
  // corners where the side berms meet the backstop are bulldozed into rounded shoulders
  mound({ center: [-23, -114], radius: 11, height: 7.1, erosion: 0.4, seed: 4 }),
  mound({ center: [23, -114], radius: 11, height: 7.1, erosion: 0.4, seed: 5 }),
  // spoil heaps / baffle mounds outside the lanes
  mound({ center: [-31, -42], radius: 7, height: 2.2, seed: 6 }),
  mound({ center: [32, -78], radius: 8, height: 2.6, seed: 7 }),
  mound({ center: [-34, -92], radius: 6, height: 1.8, seed: 8 }),
);

const padMask = regionMask(LAYOUT.pad.minX, LAYOUT.pad.maxX, LAYOUT.pad.minZ, LAYOUT.pad.maxZ, 0.9, 0.8, 21);
/** Foot-worn paths from the firing line to the near targets and down the centre of the range. */
function pathMask(x: number, z: number): number {
  let m = 0;
  const seg = (x0: number, z0: number, x1: number, z1: number, w: number, k: number) => {
    const dx = x1 - x0, dz = z1 - z0, l2 = dx * dx + dz * dz;
    const t = Math.max(0, Math.min(1, ((x - x0) * dx + (z - z0) * dz) / l2));
    const wob = 0.5 * terrainFbm(x * 0.3 + 1, z * 0.3, 2, 31);
    const d = Math.hypot(x - (x0 + dx * t) - wob, z - (z0 + dz * t));
    m = Math.max(m, k * (1 - smooth01((d - w * 0.4) / w)));
  };
  seg(-2, -10.5, -2, -10, 0.9, 0.9); seg(2, -10.5, 2, -15, 0.9, 0.9); seg(0, -10.5, 0, -52, 1.1, 0.7); seg(0, -52, -4, -100, 1.0, 0.5);
  return m;
}
/** Bare dirt: trampled ground around target stands, berm toes, foot lanes, the backstop face. */
function dirtMask(x: number, z: number): number {
  const lz = z + 62;
  const inRange = 1 - smooth01((Math.max(Math.abs(x) - 16, Math.abs(lz) - 60, 0)) / 8);
  let m = 0.22 * inRange + 0.06;
  for (const [tx, tz] of [...LAYOUT.paper, ...LAYOUT.steel]) m += 0.9 * (1 - smooth01((Math.hypot(x - tx, z - tz) - 0.6) / 1.4));
  // lanes between the firing points (patchy)
  if (z > -34 && Math.abs(x) < 9) m += 0.5 * (1 - smooth01((Math.abs(Math.sin(x * Math.PI / 4)) - 0.12) / 0.2)) * smooth01((terrainFbm(x * 0.4, z * 0.4, 2, 33) + 0.4) / 0.6);
  const e = EMBANKMENTS(x, z);
  m += 0.45 * (1 - smooth01((e - 0.15) / 0.7)) * smooth01(e / 0.05);  // toes: slumped bare soil
  if (z < -95) m += 0.9 * smooth01((e - 0.4) / 1.2);                   // backstop face: shot-up bare earth
  m += 0.6 * padMask(x, z);                                            // fines mixed into the apron edge
  return m;
}

/** Range terrain height (world coordinates) — the single height function behind mesh, physics and placement. */
export function floorHeight(x: number, z: number): number {
  const lz = z + 62;
  const d = Math.max(Math.abs(x) - 30, Math.abs(lz) - 70, 0);           // distance outside the graded range
  const out = smooth01(d / 60);
  const hills = Math.sin(x * 0.012 + 0.5) * Math.cos(lz * 0.009) * 6 + Math.sin(x * 0.031 - lz * 0.022) * 2.2;
  const micro = Math.sin(x * 0.31 + 1.7) * Math.cos(lz * 0.23) * 0.05 + Math.sin(x * 1.3 + lz * 0.9) * 0.015;
  const k = smooth01(Math.max(-z - 6, Math.abs(x) - 9) / 12);           // gentle undulation away from the firing line
  const undul = terrainFbm(x * 0.06 + 4, z * 0.06, 2, 9) * 0.14 * k;
  const graded = -0.12 * smooth01(d / 8);                                // the meadow sits a little below the graded range
  return micro + undul + graded + out * hills + 0.04 * padMask(x, z) + EMBANKMENTS(x, z);
}
/** @deprecated same surface as `floorHeight` (kept for callers that placed things on the old meadow mesh). */
export const meadowHeight = floorHeight;

/** Smooth value noise in [0, 1] (for vegetation patches). */
function vnoise(x: number, z: number): number {
  const h = (i: number, j: number) => { const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return s - Math.floor(s); };
  const xi = Math.floor(x), zi = Math.floor(z), fx = x - xi, fz = z - zi;
  const u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
  const a = h(xi, zi), b = h(xi + 1, zi), c = h(xi, zi + 1), d = h(xi + 1, zi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
const fbm = (x: number, z: number) => 0.55 * vnoise(x, z) + 0.3 * vnoise(x * 2.1 + 5.2, z * 2.1 - 1.3) + 0.15 * vnoise(x * 4.3 - 2.7, z * 4.3 + 8.1);

export interface RangeOptions { assets?: AssetLibrary; texSize?: number; grassDensity?: number; grassShadows?: boolean; trees?: number; onStatus?: (msg: string) => Promise<void> | void }

export async function buildRange(engine: Engine, texSizeOrOpts: number | RangeOptions = 1024): Promise<RangeBuild> {
  const opts: RangeOptions = typeof texSizeOrOpts === 'number' ? { texSize: texSizeOrOpts } : texSizeOrOpts;
  const texSize = opts.texSize ?? 1024;
  const status = async (m: string) => { await opts.onStatus?.(m); };
  const R = engine.renderer, P = engine.physics, synth: MaterialSynth = R.synth;
  const dev = R.dev;
  const rnd = rng(31337);

  await status('Synthesising physically based materials');
  // (each material below is a GPU compute dispatch; the loader line cycles through the stages)
  // ---------------------------------------------------------------- materials
  // scanned PBR texture sets (assets/manifest.json) replace the procedural ones slot by slot
  const lib = opts.assets;
  const scanned = async (slot: string, fallback: () => Material, o: { worldUV?: boolean; name?: string; edgeWear?: number } = {}) => (lib ? await lib.texture(slot, o) : null) ?? fallback();
  const dirtMat = await scanned('range.dirt', () => synth.material('ground', { size: texSize, tileMeters: 4, extra: -0.25, seed: 2, color: [0.3, 0.23, 0.15], color2: [0.26, 0.23, 0.1] }, { worldUV: true, name: 'range-dirt' }), { worldUV: true });
  const grassMat = await scanned('range.meadow', () => synth.material('grass', { size: texSize, tileMeters: 2.5, seed: 4, color: [0.13, 0.17, 0.05], color2: [0.36, 0.3, 0.14], extra: 0.2 }, { worldUV: true, name: 'grass' }), { worldUV: true });
  const gravel = await scanned('range.gravel', () => synth.material('gravel', { size: texSize, tileMeters: 1.6, seed: 6, extra: 0.6, color: [0.3, 0.28, 0.26], color2: [0.18, 0.17, 0.16], bumpMm: 14 }, { worldUV: true, name: 'gravel' }), { worldUV: true });
  const concrete = await scanned('range.concrete', () => synth.material('concrete', { size: texSize, tileMeters: 2, seed: 5, dirt: 0.6 }, { name: 'slab' }));
  const wood = await scanned('range.wood', () => synth.material('wood', { size: texSize, tileMeters: 1.2, seed: 7, wear: 0.6 }, { name: 'bench-wood', edgeWear: 0.35, edgeWearRadius: 0.006 }), { edgeWear: 0.3 });
  const lumberMat = await scanned('range.lumber', () => synth.material('wood', { size: 512, tileMeters: 0.8, seed: 8, color: [0.6, 0.45, 0.28], color2: [0.42, 0.3, 0.17], wear: 0.3 }, { name: 'lumber', edgeWear: 0.25, edgeWearRadius: 0.005 }));
  const steelFrame = synth.material('bareSteel', { size: 512, tileMeters: 0.6, seed: 9, wear: 0.4 }, { name: 'frame-steel' });
  const postPaint = synth.material('paintedSteel', { size: texSize, tileMeters: 3.3, seed: 16, color: [0.3, 0.33, 0.3], wear: 0.3, extra: 0.8 }, { name: 'post-paint', edgeWear: 0.4, edgeWearRadius: 0.012 });
  const roofMetal = synth.material('paintedSteel', { size: texSize, tileMeters: 1, seed: 10, color: [0.42, 0.44, 0.45], wear: 0.25, extra: 0.35 }, { name: 'roof' });
  const plateWhite = synth.material('paintedSteel', { size: 512, tileMeters: 0.5, seed: 11, color: [0.82, 0.82, 0.8], wear: 0.45 }, { name: 'ar500-white' });
  const plateOrange = synth.material('paintedSteel', { size: 512, tileMeters: 0.5, seed: 12, color: [0.85, 0.3, 0.06], wear: 0.35 }, { name: 'ar500-orange' });
  const cardboard = synth.material('cardboard', { size: 512, seed: 13, dirt: 0.45 }, { name: 'cardboard', edgeWear: 0.3 });
  const paperFace = synth.material('paperTarget', { size: 1024, tileMeters: 0.45, seed: 14 }, { name: 'paper-target', uvScale: [1 / 0.45, 1 / 0.45] });
  const chainMat = synth.material('bareSteel', { size: 256, tileMeters: 0.1, seed: 15, wear: 0.6 }, { name: 'chain' });
  const galv = synth.material('paintedSteel', { size: 512, tileMeters: 0.4, seed: 17, color: [0.5, 0.52, 0.53], wear: 0.2, extra: 0.25 }, { name: 'galvanised', roughness: 0.75, metallic: 0.6 });

  const statics: RenderObject[] = [];
  const lods: InstancedLODSet[] = [];
  // Static geometry is merged per material into a handful of draw calls; physics still gets every piece.
  const buckets = new Map<string, { m: Material; shadow: boolean; parts: Geometry[] }>();
  const addStatic = (g: Geometry, m: Material, surface: number, transform = mat4.create(), shadow = true, collide = true, merge = true) => {
    if (collide) P.addGeometry(g, transform, surface);
    if (!merge) {
      const obj = new RenderObject(new Mesh(dev, g.tangents ? g : g.computeTangents()), m, transform);
      obj.castShadow = shadow;
      engine.scene.add(obj);
      statics.push(obj);
      return obj;
    }
    const key = `${m.id}|${shadow ? 1 : 0}`;
    let b = buckets.get(key);
    if (!b) { b = { m, shadow, parts: [] }; buckets.set(key, b); }
    const w = g.clone().transform(transform);
    b.parts.push(w.tangents ? w : w.computeTangents());
    return null;
  };
  const flushStatics = () => {
    for (const b of buckets.values()) {
      const obj = new RenderObject(new Mesh(dev, Geometry.merge(b.parts), { label: b.m.name }), b.m);
      obj.castShadow = b.shadow;
      engine.scene.add(obj);
      statics.push(obj);
    }
    buckets.clear();
  };
  const T = (x: number, y: number, z: number, ry = 0, rx = 0, rz = 0): Mat4 => mat4.fromRotationTranslation(mat4.create(), quat.fromEuler(quat.create(), rx, ry, rz), [x, y, z]);
  let propTris = 0;
  const countTris = (g: Geometry) => { propTris += g.triangleCount; return g; };

  await status('Sculpting terrain and berms');
  // ---------------------------------------------------------------- terrain (one heightfield: floor, meadow, berms)
  const terrain = new Terrain({
    size: [900, 900], center: [0, -62], resolution: 0.5,
    detail: { minX: -34, maxX: 34, minZ: -128, maxZ: 10 }, growth: 1.22, maxSpacing: 28,
    heightFn: floorHeight,
    layers: [
      { material: gravel, mask: (x, z) => 1.7 * padMask(x, z) + 0.8 * pathMask(x, z), surface: SURFACE.GRAVEL },
      { material: dirtMat, mask: dirtMask, surface: SURFACE.DIRT },
      { material: grassMat, mask: (x, z) => 1 - 0.95 * padMask(x, z) - 0.6 * pathMask(x, z), slope: [16, 30], surface: SURFACE.GRASS },
    ],
    weightNoise: [2.5, 0.35], blendSharpness: 0.9, blendNoise: [1.7, 0.25],
    textureSize: Math.min(2048, texSize), seed: 11, name: 'range-terrain',
  }, R);
  {
    const obj = new RenderObject(new Mesh(dev, terrain.geometry, { label: 'terrain' }), terrain.material!);
    obj.castShadow = true;
    engine.scene.add(obj);
    statics.push(obj);
    terrain.addToPhysics(P);
    const s = terrain.stats;
    console.info(`[range] terrain: ${s.columns}×${s.rows} grid, ${s.triangles.toLocaleString()} triangles, layer textures ${s.textureSize}², ${s.buildMs.toFixed(0)} ms`);
  }
  const ground = (x: number, z: number) => terrain.height(x, z);

  await status('Building the covered firing line');
  // ---------------------------------------------------------------- covered firing line
  const S = LAYOUT.slab;
  addStatic(countTris(roundedBox(S.w, S.top, S.d, 0.012, 2)), concrete, SURFACE.CONCRETE, T(0, S.top / 2, S.z));
  // control joints sawn into the slab (shallow dark grooves between the firing points)
  const jointMat = synth.material('rubber', { size: 256, seed: 18, color: [0.02, 0.02, 0.02], extra: 0 }, { name: 'control-joint' });
  for (const x of [-4, 0, 4]) addStatic(countTris(box(0.008, 0.004, S.d - 0.2)), jointMat, SURFACE.CONCRETE, T(x, S.top + 0.001, S.z), false, false);
  // posts: HSS 150×150 on grout piers with anchored base plates, cap plates under the rafters
  const roofBack = 2.75, roofFront = 3.15, zBack = 2.6, zFront = -3.2;
  const pitch = Math.atan2(roofFront - roofBack, zBack - zFront);
  const yTop = (z: number) => S.top + roofBack + (roofFront - roofBack) * ((zBack - z) / (zBack - zFront)); // top of post / underside of rafter
  const postX = [-7.6, -2.55, 2.55, 7.6];
  for (const x of postX) {
    for (const z of [zBack, zFront]) {
      const h = yTop(z) - S.top;
      const pierH = 0.08, plateT = 0.016;
      const lean = (rnd.next() - 0.5) * 0.006; // ±0.17°: nothing on a site is perfectly plumb
      addStatic(countTris(roundedBox(0.36, pierH, 0.36, 0.008, 2)), concrete, SURFACE.CONCRETE, T(x, S.top + pierH / 2, z));
      addStatic(countTris(basePlate(0.3, plateT, 0.045)), galv, SURFACE.STEEL, T(x, S.top + pierH, z, 0, 0, 0), true, false);
      const postH = h - pierH - plateT - 0.012;
      addStatic(countTris(hssPost(0.15, postH)), postPaint, SURFACE.STEEL, T(x, S.top + pierH + plateT, z, 0, lean, lean * 0.6));
      addStatic(countTris(roundedBox(0.22, 0.012, 0.22, 0.003, 2)), galv, SURFACE.STEEL, T(x, yTop(z) - 0.006, z), true, false);
      // knee braces (angle iron) tying the post to the rafter
      for (const dir of [-1, 1]) {
        if ((z === zBack && dir > 0) || (z === zFront && dir < 0)) continue; // only towards the span
        const brace = angleIron(0.05, 0.005, 0, 0.85).translate(-0.025, -0.025, 0);
        addStatic(countTris(brace), galv, SURFACE.STEEL, T(x, yTop(z) - 0.62, z + dir * 0.08, 0, dir > 0 ? -Math.PI / 4 : -3 * Math.PI / 4, 0), true, false);
      }
    }
    // rafter: I-beam from the back post to beyond the front post, following the roof pitch
    const z0 = zBack + 0.35, z1 = zFront - 0.35, zm = (z0 + z1) / 2;
    const len = Math.hypot(z0 - z1, yTop(z1) - yTop(z0));
    addStatic(countTris(iBeam(0.16, 0.082, 0.0074, 0.005, -len / 2, len / 2)), steelFrame, SURFACE.STEEL, T(x, yTop(zm) + 0.08, zm, 0, pitch, 0));
  }
  // X-bracing between the rear posts of the outer bays (16 mm rods)
  for (const [xa, xb] of [[-7.6, -2.55], [2.55, 7.6]] as const) {
    for (const flip of [false, true]) {
      const a: [number, number, number] = [flip ? xb : xa, S.top + 0.5, zBack + 0.1], b: [number, number, number] = [flip ? xa : xb, yTop(zBack) - 0.3, zBack + 0.1];
      addStatic(countTris(tube([a, b], 0.008, 8)), galv, SURFACE.STEEL, mat4.create(), true, false);
    }
  }
  // purlins (lipped C 150×65) across the rafters, then corrugated sheets laid downslope with a one-rib overlap
  const purlinZ = [2.6, 1.15, -0.3, -1.75, -3.2];
  for (const z of purlinZ) {
    const g = cPurlin(0.15, 0.065, 0.02, 0.002, -(S.w + 0.6) / 2, (S.w + 0.6) / 2).rotateY(Math.PI / 2); // along x, web vertical, flanges horizontal
    addStatic(countTris(g), galv, SURFACE.STEEL, T(0, yTop(z) + 0.16 + 0.075, z, 0, pitch, 0));
  }
  {
    const sheetW = 1.0, pitchX = 0.076, zs0 = zBack + 0.45, zs1 = zFront - 0.75, zsm = (zs0 + zs1) / 2;
    const len = Math.hypot(zs0 - zs1, yTop(zs1) - yTop(zs0));
    for (let x = -(S.w + 0.6) / 2 - 0.04; x < (S.w + 0.6) / 2; x += sheetW - pitchX) {
      const g = corrugatedSheet(sheetW, -len / 2, len / 2);
      const dy = (rnd.next() - 0.5) * 0.006, yaw = (rnd.next() - 0.5) * 0.004;
      addStatic(countTris(g), roofMetal, SURFACE.STEEL, T(x + sheetW / 2, yTop(zsm) + 0.16 + 0.15 + 0.0115 + dy, zsm, yaw, pitch, 0));
    }
  }
  // shooting benches: 2×6 plank tops on 4×4 legs with 2×4 aprons, carriage-bolted; a 2×6 shelf below
  const benchTop = 0.9, shelfY = 0.37;
  const bench = (x: number, z: number, yaw: number) => {
    const M = T(x, S.top, z, yaw);
    const add = (g: Geometry, m: Material, local: Mat4, collide = true) => addStatic(countTris(g), m, SURFACE.WOOD, mat4.multiply(mat4.create(), M, local), true, collide);
    const L = 1.5, D = 0.75, plank = 0.14, gap = 0.008, legH = benchTop - S.top - 0.038;
    for (let i = 0; i < 5; i++) {
      const lz = (i - 2) * (plank + gap);
      add(lumber(plank, 0.038, L), wood, T(0, legH + 0.019, lz, 0, 0, (rnd.next() - 0.5) * 0.004));
    }
    for (const lz of [-D / 2 + 0.06, D / 2 - 0.06]) add(lumber(0.038, 0.089, L - 0.16), wood, T(0, legH - 0.0445, lz));               // long aprons
    for (const lx of [-L / 2 + 0.11, L / 2 - 0.11]) add(lumber(0.038, 0.089, D - 0.2).rotateY(Math.PI / 2), wood, T(lx, legH - 0.0445, 0));  // end aprons
    for (const lx of [-L / 2 + 0.11, L / 2 - 0.11]) for (const lz of [-D / 2 + 0.11, D / 2 - 0.11]) {
      add(lumber(0.089, 0.089, legH - 0.001).rotateZ(Math.PI / 2), wood, T(lx, (legH - 0.001) / 2, lz));
      // carriage bolts through the aprons into the legs (heads on the outside faces)
      const side = Math.sign(lz);
      for (const o of [-0.025, 0.025]) add(carriageBoltY(0.008).rotateX(side > 0 ? Math.PI / 2 : -Math.PI / 2), galv, T(lx + o, legH - 0.0445, side * (D / 2 - 0.06 + 0.019)), false);
    }
    for (const lz of [-0.08, 0.08]) add(lumber(plank, 0.038, L - 0.3), wood, T(0, shelfY - S.top, lz));                                 // shelf planks
    for (const lx of [-L / 2 + 0.11, L / 2 - 0.11]) add(lumber(0.038, 0.089, 0.42).rotateY(Math.PI / 2), wood, T(lx, shelfY - S.top - 0.0445 - 0.019, 0)); // shelf rails
  };
  for (const x of [-6, -2, 2, 6]) bench(x, -1.3, (rnd.next() - 0.5) * 0.02);

  await status('Hanging AR500 steel and paper targets');
  // ---------------------------------------------------------------- targets
  const impacts = new ImpactSystem(engine, 0.004018);
  const paper: PaperTarget[] = [];
  const paperTarget = (x: number, z: number, i: number) => {
    // 2×4 frame on an H-base, cardboard backer stapled on, paper target stapled to the backer
    const y = ground(x, z) - 0.02;
    const yaw = (rnd.next() - 0.5) * 0.06, tilt = (rnd.next() - 0.5) * 0.02;
    const M = T(x, y, z, yaw, tilt, 0);
    const add = (g: Geometry, m: Material, surface: number, local: Mat4, collide = true, shadow = true, merge = true) => addStatic(countTris(g), m, surface, mat4.multiply(mat4.create(), M, local), shadow, collide, merge);
    for (const lx of [-0.3, 0.3]) {
      add(lumber(0.089, 0.038, 1.62).rotateZ(Math.PI / 2), lumberMat, SURFACE.WOOD, T(lx, 0.81, 0));
      add(lumber(0.089, 0.038, 0.6).rotateY(Math.PI / 2), lumberMat, SURFACE.WOOD, T(lx, 0.019, 0.02));         // feet
    }
    add(lumber(0.038, 0.089, 0.68), lumberMat, SURFACE.WOOD, T(0, 1.1, -0.075));                                  // cross piece behind the backer
    const backer = tornCardboard(0.6, 0.75, 0.006, 100 + i);
    add(backer, cardboard, SURFACE.CARDBOARD, T(0, 1.55, -0.05 + 0.003, 0, 0, (rnd.next() - 0.5) * 0.03), false);
    for (const lx of [-0.3, 0.3]) for (const ly of [1.22, 1.5, 1.85]) add(staple(), galv, SURFACE.STEEL, T(lx + (rnd.next() - 0.5) * 0.02, ly, -0.044, 0, 0, Math.PI / 2 + (rnd.next() - 0.5) * 0.4), false, false);
    const faceM = mat4.multiply(mat4.create(), M, T(0, 1.55, -0.05 + 0.0065, 0, 0, (rnd.next() - 0.5) * 0.02));
    const face = addStatic(countTris(curledPaper(0.45, 0.45, 0.012)), paperFace, SURFACE.PAPER, faceM, false, false, false)!;
    for (const [sx, sy] of [[-0.2, 0.2], [0.2, 0.2], [-0.2, -0.2], [0.2, -0.2]]) add(staple(0.01, 0.005), galv, SURFACE.STEEL, T(sx, 1.55 + sy, -0.041, 0, 0, (rnd.next() - 0.5) * 0.5), false, false);
    const pt = new PaperTarget(face, 0.6, 0.75);
    impacts.addPaper(pt);
    paper.push(pt);
  };
  LAYOUT.paper.forEach(([x, z], i) => paperTarget(x, z, i));

  const steel: SteelTarget[] = [];
  const steelStand = (x: number, z: number, w: number, h: number, mat: Material, hang = 0.18) => {
    const y0 = ground(x, z - 0.1);
    const top = 1.15 + h + hang + 0.05;
    const half = w / 2 + 0.25;
    for (const s of [-1, 1]) {
      // 50 mm square-tube uprights with A-frame feet (angled struts to pads), rust-bloomed mill steel
      addStatic(countTris(roundedBox(0.05, top, 0.05, 0.006, 2)), steelFrame, SURFACE.STEEL, T(x + s * half, y0 + top / 2, z - 0.1));
      for (const d of [-1, 1]) {
        const strut = roundedBox(0.04, 0.04, 0.5, 0.005, 2).rotateX(0.6 * d);
        addStatic(countTris(strut), steelFrame, SURFACE.STEEL, T(x + s * half, y0 + 0.16, z - 0.1 + d * 0.2));
        addStatic(countTris(roundedBox(0.12, 0.012, 0.12, 0.003, 2)), steelFrame, SURFACE.STEEL, T(x + s * half, y0 + 0.006, z - 0.1 + d * 0.42));
      }
    }
    addStatic(countTris(roundedBox(half * 2 + 0.05, 0.05, 0.05, 0.006, 2)), steelFrame, SURFACE.STEEL, T(x, y0 + top, z - 0.1));
    const pivot: [number, number, number] = [x, y0 + top - 0.025, z - 0.1];
    const plateObj = new RenderObject(new Mesh(dev, box(w, h, 0.0095).computeTangents()), mat);
    engine.scene.add(plateObj);
    const target = new SteelTarget({ width: w, height: h, thickness: 0.0095, hangLength: hang, damping: 0.035, ringT60: 2.4 }, pivot, 0, plateObj, P);
    impacts.addSteel(target);
    steel.push(target);
    // chains (drawn following the plate each frame)
    const chains = [-1, 1].map((s) => {
      const g = tube(Array.from({ length: 6 }, (_, i) => [0, -(i / 5) * hang, 0] as [number, number, number]), 0.004, 6);
      const o = new RenderObject(new Mesh(dev, g.computeTangents()), chainMat);
      engine.scene.add(o);
      return { o, s };
    });
    engine.onUpdate.push(() => {
      const m = target.matrix();
      for (const { o, s } of chains) {
        const attach = vec3.transformMat4(vec3.create(), [s * w * 0.35, h / 2, 0], m);
        const top = vec3.create(pivot[0] + s * w * 0.35, pivot[1], pivot[2]);
        const dir = vec3.sub(vec3.create(), attach, top);
        const len = vec3.length(dir);
        const q = quat.rotationTo(quat.create(), vec3.create(0, -1, 0), vec3.normalize(vec3.create(), dir));
        o.setTransform(mat4.fromRotationTranslationScale(mat4.create(), q, top, [1, len / hang, 1]));
      }
    });
    return target;
  };
  steelStand(LAYOUT.steel[0][0], LAYOUT.steel[0][1], 0.3, 0.45, plateWhite);
  steelStand(LAYOUT.steel[1][0], LAYOUT.steel[1][1], 0.25, 0.25, plateOrange, 0.22);
  steelStand(LAYOUT.steel[2][0], LAYOUT.steel[2][1], 0.3, 0.5, plateWhite);
  steelStand(LAYOUT.steel[3][0], LAYOUT.steel[3][1], 0.45, 0.6, plateWhite);
  steelStand(LAYOUT.steel[4][0], LAYOUT.steel[4][1], 0.3, 0.45, plateOrange);

  // distance marker posts (4×4 with a white plate) along the left berm toe
  for (const z of LAYOUT.markers) {
    const x = LAYOUT.markerX, y = ground(x, z) - 0.05;
    const lean = (rnd.next() - 0.5) * 0.05;
    addStatic(countTris(lumber(0.089, 0.089, 0.9).rotateZ(Math.PI / 2)), lumberMat, SURFACE.WOOD, T(x, y + 0.45, z, 0, lean, lean));
    addStatic(countTris(roundedBox(0.14, 0.1, 0.006, 0.002, 1)), plateWhite, SURFACE.STEEL, T(x, y + 0.78, z + 0.048, 0, lean, lean), true, false);
  }

  // scattered rocks for scale/clutter
  for (let i = 0; i < 30; i++) {
    const x = rnd.range(-14, 14), z = rnd.range(-95, -9);
    const r = rnd.range(0.05, 0.18);
    const g = cylinder(r * 0.7, r, r * 0.8, 7).displace(([px, py, pz]) => [px * (1 + 0.2 * Math.sin(py * 40)), py, pz]);
    addStatic(countTris(g), gravel, SURFACE.GRAVEL, T(x, ground(x, z) + r * 0.3, z, rnd.next() * 6));
  }

  await status('Growing grass, blade by blade');
  // ---------------------------------------------------------------- grass (geometric, wind-animated)
  // Density follows the terrain's layer weights: full on grass, sparse tufts in bare dirt, almost none on the
  // gravel apron, thicker and taller along the berm toes, thinning with distance (the texture carries it far out).
  const gScale = opts.grassDensity ?? 1;
  if (gScale > 0) {
    const wtmp = [0, 0, 0];
    const grass = buildGrass(R, {
      bounds: { minX: -19.5, maxX: 19.5, minZ: -76, maxZ: -3.6 },
      height: ground,
      density: (x, z) => {
        const w = terrain.weights(x, z, wtmp);
        const cover = w[2] + 0.1 * Math.max(0, w[1] - 2 * w[0]);   // tufts in bare dirt, none on gravel
        const patch = fbm(x * 0.17 + 3.1, z * 0.17 - 7.7);
        const edge = Math.min(1, Math.max(0, (Math.abs(x) - 9) / 6));                  // lusher by the berms
        const far = Math.min(1, Math.max(0, 1 - (-z - 25) / 50)) * (0.12 + 0.88 * Math.min(1, Math.max(0, 1 - (-z - 25) / 35)));
        const base = 260 * Math.min(1, Math.max(0, (patch - 0.32) / 0.25)) + 25 + 140 * edge;
        return base * cover * far * gScale;
      },
      bladeHeight: (x, z) => {
        const w = terrain.weights(x, z, wtmp);
        const edge = Math.min(1, Math.max(0, (Math.abs(x) - 12) / 4));
        const weeds = vnoise(x * 0.9, z * 0.9) > 0.82 ? 0.22 : 0;
        const tuft = w[1] > 0.35 ? 0.12 : 0;                                              // untrimmed tufts in the bare patches
        return [0.05 + tuft * 0.5, 0.13 + 0.25 * edge + weeds + tuft];
      },
      dryness: (x, z) => 0.12 + 0.35 * vnoise(x * 0.11 - 4, z * 0.11 + 2),
      castShadow: opts.grassShadows ?? true,
      seed: 4471,
    });
    for (const g of grass.objects) { engine.scene.add(g); statics.push(g); }
    console.info(`[range] grass: ${grass.blades.toLocaleString()} blades, ${(grass.triangles / 1e6).toFixed(2)} M triangles in ${grass.objects.length} chunks`);
  }

  await status('Placing ammo, sandbags and brass');
  // ---------------------------------------------------------------- props: a range that has been used today
  {
    const slab = () => S.top;
    const props = new RangeProps(R)
      .sandbags(2, benchTop, -1.42).ammoBox(2.48, benchTop, -1.12, 0.3, true, true).earmuffs(1.55, benchTop, -1.02, 2.6)
      .ammoCan(-2.35, benchTop, -1.25, 0.2).ammoBox(-1.75, benchTop, -1.05, -0.4, false, true).ammoBox(-1.6, benchTop, -1.35, 1.2, false, false)
      .ammoCan(6.1, shelfY, -1.3, -0.1).sandbags(-6, benchTop, -1.4, 0.05).ammoBox(5.6, benchTop, -1.1, 0.1, true, false)
      .sandbagWall(-6.9, S.top, 2.0, 0, 3, 5)
      .drum(7.3, S.top, 1.9, 0.4)
      .brassScatter(2.1, -0.55, 1.6, 140, slab, { lengthM: 0.0448, diameterM: 0.0095 })
      .brassScatter(-2.2, -0.6, 1.5, 90, slab, { lengthM: 0.019, diameterM: 0.0099, straight: true })
      .brassScatter(6, -0.5, 1.4, 60, slab, { lengthM: 0.0448, diameterM: 0.0095 })
      .build();
    for (const o of props.objects) { engine.scene.add(o); statics.push(o); propTris += o.mesh.indexCount / 3; }
  }
  flushStatics();
  console.info(`[range] structure + props: ${Math.round(propTris).toLocaleString()} triangles in ${statics.length} static objects`);

  await status('Planting the treeline');
  // ---------------------------------------------------------------- treelines (mixed broadleaf / conifer woods)
  const treeCount = opts.trees ?? 900;
  if (treeCount > 0) {
    const trng = rng(8086);
    const list: TreeInstance[] = [];
    let guard = 0;
    while (list.length < treeCount && guard++ < treeCount * 40) {
      const a = trng.next() * Math.PI * 2, rad = 55 + Math.pow(trng.next(), 0.7) * 300;
      const x = Math.cos(a) * rad, z = -62 + Math.sin(a) * rad;
      if (Math.abs(x) < 48 && z > -158 && z < 28) continue;               // keep the range and its margins open
      const woods = fbm(x * 0.012 + 11, z * 0.012 - 4);                    // forest patches vs. open fields
      if (trng.next() > Math.max(0, (woods - 0.38) / 0.22)) continue;
      list.push({ x, z, kind: fbm(x * 0.02 - 3, z * 0.02 + 9) > 0.55 ? 'conifer' : 'broadleaf', scale: 0.85 + 0.35 * trng.next() });
    }
    const treeSlots = lib ? lib.modelSlots('tree.').filter((k) => !k.includes('sapling')) : [];
    if (treeSlots.length) {
      // scanned trees: instanced, with load-time LODs; height-normalised so every species reads at its real size
      await status('Planting scanned trees (building LODs)');
      const byslot = new Map<string, number[]>();
      list.forEach((t, i) => { const k = treeSlots[Math.floor((fbm(t.x * 0.05, t.z * 0.05) * 7.3 + i * 0.37) % 1 * treeSlots.length)]; byslot.set(k, [...(byslot.get(k) ?? []), i]); });
      for (const [slot, ids] of byslot) {
        const inst = await lib!.model(slot);
        if (!inst) continue;
        const h = Math.max(0.1, inst.bounds.max[1] - inst.bounds.min[1]);
        const mats = new Float32Array(ids.length * 16);
        ids.forEach((id, k) => {
          const t = list[id];
          const target = (slot.includes('pine') ? 21 : 17) * (t.scale ?? 1);
          const sc = target / h;
          const m = mat4.fromRotationTranslationScale(mat4.create(), quat.fromEuler(quat.create(), 0, trng.next() * Math.PI * 2, 0), [t.x, ground(t.x, t.z) - inst.bounds.min[1] * sc - 0.15, t.z], [sc, sc * (0.92 + 0.16 * trng.next()), sc]);
          mats.set(m, k * 16);
        });
        const set = await InstancedLODSet.create(R, inst, mats, { castShadow: true });
        set.addTo(engine.scene);
        lods.push(set);
        console.info(`[range] ${slot}: ${ids.length} instances, LOD triangles ${set.triangles.map((x) => Math.round(x)).join(' / ')}`);
      }
    } else {
      const trees = buildTrees(R, { trees: list, height: ground, castShadow: true });
      for (const t of trees.objects) { engine.scene.add(t); statics.push(t); }
      console.info(`[range] trees: ${trees.trees} (${trees.cards.toLocaleString()} foliage cards)`);
    }
    // understory from scans: saplings, shrubs, grass clumps, deadwood and boulders along the woodland edge
    if (lib) {
      const scatter = async (slot: string, count: number, size: [number, number], near: number, far: number) => {
        const inst = await lib.model(slot);
        if (!inst) return;
        const h = Math.max(0.05, inst.bounds.max[1] - inst.bounds.min[1]);
        const mats = new Float32Array(count * 16);
        let n = 0;
        for (let g = 0; n < count && g < count * 30; g++) {
          const a = trng.next() * Math.PI * 2, rad = near + trng.next() * (far - near);
          const x = Math.cos(a) * rad, z = -62 + Math.sin(a) * rad;
          if (Math.abs(x) < 26 && z > -125 && z < 14) continue;
          const sc = (size[0] + (size[1] - size[0]) * trng.next()) / h;
          mats.set(mat4.fromRotationTranslationScale(mat4.create(), quat.fromEuler(quat.create(), 0, trng.next() * 6.283, 0), [x, ground(x, z) - inst.bounds.min[1] * sc - 0.03, z], [sc, sc, sc]), n++ * 16);
        }
        const set = await InstancedLODSet.create(R, inst, mats.subarray(0, n * 16), { levels: [{ ratio: 1, distance: 25 }, { ratio: 0.3, distance: 70 }, { ratio: 0.08, distance: 400 }], maxDistance: 450, shadowMaxLevel: 1 });
        set.addTo(engine.scene);
        lods.push(set);
      };
      for (const s of lib.modelSlots('tree.').filter((k) => k.includes('sapling'))) await scatter(s, 60, [2, 4.5], 50, 160);
      for (const s of lib.modelSlots('shrub.')) await scatter(s, 70, [0.8, 2.2], 40, 140);
      if (lib.hasModel('grass.clump')) await scatter('grass.clump', 220, [0.4, 0.9], 30, 90);
      if (lib.hasModel('deadwood.stump')) await scatter('deadwood.stump', 14, [0.4, 0.8], 45, 150);
      if (lib.hasModel('deadwood.trunk')) await scatter('deadwood.trunk', 8, [0.6, 1.2], 45, 150);
      if (lib.hasModel('rock.boulder')) await scatter('rock.boulder', 24, [0.6, 1.8], 35, 160);
    }
  }

  await status('Building the collision BVH');
  P.build();

  await status('Ray tracing sky visibility');
  // ---------------------------------------------------------------- baked sky visibility around the firing line
  const cell = 0.5, min: [number, number, number] = [-10, -0.5, -6];
  const nx = 40, ny = 10, nz = 22;
  const vis = P.bakeSkyVisibility(min, cell, nx, ny, nz, 64, 40);
  // sample at cell centres → shift min by half a cell for the renderer's trilinear lookup
  R.setSkyVisibility(vis, nx, ny, nz, [min[0] - cell / 2 + cell / 2, min[1], min[2]], cell);

  return { impacts, spawn: [0, S.top, 0.9], steel, paper, lods, terrain };
}
