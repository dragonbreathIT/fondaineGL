// The outdoor shooting range: covered firing line, benches, gravel apron, earth berms, paper targets at
// 10/15 m, hanging AR500 steel at 25/50/100 m. Every surface is real-scale and registered with physics.

import { Engine, SURFACE, SteelTarget, PaperTarget, ImpactSystem } from '@fondaine/gl';
import { Geometry, Material, Mesh, RenderObject, box, plane, cylinder, tube, mat4, quat, vec3, rng, MaterialSynth } from '@fondaine/gl';
import { buildGrass, buildTrees, TreeInstance, RangeProps, AssetLibrary, InstancedLODSet } from '@fondaine/oaxis';

export interface RangeBuild { impacts: ImpactSystem; spawn: [number, number, number]; steel: SteelTarget[]; paper: PaperTarget[]; lods: InstancedLODSet[] }

/** Range floor height (world coordinates) — matches the displaced floor mesh. */
export function floorHeight(x: number, z: number): number {
  const lz = z + 62;
  return Math.sin(x * 0.31 + 1.7) * Math.cos(lz * 0.23) * 0.05 + Math.sin(x * 1.3 + lz * 0.9) * 0.015;
}

/** Meadow (terrain around the range) height in world coordinates — matches the meadow mesh. */
export function meadowHeight(x: number, z: number): number {
  const lz = z + 62;
  const d = Math.max(Math.abs(x) - 30, Math.abs(lz) - 70, 0);
  const hills = Math.sin(x * 0.012 + 0.5) * Math.cos(lz * 0.009) * 6 + Math.sin(x * 0.031 - lz * 0.022) * 2.2;
  return -0.12 + Math.min(1, d / 60) * hills;
}

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
  const groundMat = await scanned('range.dirt', () => synth.material('ground', { size: texSize, tileMeters: 6, extra: 0.15, seed: 2 }, { worldUV: true, name: 'range-ground' }), { worldUV: true });
  const bermMat = await scanned('range.berm', () => synth.material('ground', { size: texSize, tileMeters: 5, extra: -0.25, seed: 3, color: [0.3, 0.22, 0.15] }, { worldUV: true, name: 'berm' }), { worldUV: true });
  const grassMat = await scanned('range.meadow', () => synth.material('grass', { size: texSize, tileMeters: 2.5, seed: 4 }, { worldUV: true, name: 'grass' }), { worldUV: true });
  const concrete = await scanned('range.concrete', () => synth.material('concrete', { size: texSize, tileMeters: 2, seed: 5, dirt: 0.6 }, { name: 'slab' }));
  const gravel = await scanned('range.gravel', () => synth.material('gravel', { size: texSize, tileMeters: 1.6, seed: 6 }, { worldUV: true, name: 'gravel' }), { worldUV: true });
  const wood = await scanned('range.wood', () => synth.material('wood', { size: texSize, tileMeters: 1.2, seed: 7, wear: 0.6 }, { name: 'bench-wood' }), { edgeWear: 0.3 });
  const lumber = await scanned('range.lumber', () => synth.material('wood', { size: 512, tileMeters: 0.8, seed: 8, color: [0.6, 0.45, 0.28], color2: [0.42, 0.3, 0.17], wear: 0.3 }, { name: 'lumber' }));
  const steelFrame = synth.material('bareSteel', { size: 512, tileMeters: 0.6, seed: 9, wear: 0.4 }, { name: 'frame-steel' });
  const roofMetal = synth.material('paintedSteel', { size: 512, tileMeters: 1, seed: 10, color: [0.42, 0.44, 0.45], wear: 0.25 }, { name: 'roof' });
  const plateWhite = synth.material('paintedSteel', { size: 512, tileMeters: 0.5, seed: 11, color: [0.82, 0.82, 0.8], wear: 0.45 }, { name: 'ar500-white' });
  const plateOrange = synth.material('paintedSteel', { size: 512, tileMeters: 0.5, seed: 12, color: [0.85, 0.3, 0.06], wear: 0.35 }, { name: 'ar500-orange' });
  const cardboard = synth.material('cardboard', { size: 512, seed: 13 }, { name: 'cardboard' });
  const paperFace = synth.material('paperTarget', { size: 1024, tileMeters: 0.45, seed: 14 }, { name: 'paper-target', uvScale: [1 / 0.45, 1 / 0.45] });
  const chainMat = synth.material('bareSteel', { size: 256, tileMeters: 0.1, seed: 15, wear: 0.6 }, { name: 'chain' });

  const statics: RenderObject[] = [];
  const lods: InstancedLODSet[] = [];
  const addStatic = (g: Geometry, m: Material, surface: number, transform = mat4.create(), shadow = true, collide = true) => {
    const obj = new RenderObject(new Mesh(dev, g.tangents ? g : g.computeTangents()), m, transform);
    obj.castShadow = shadow;
    engine.scene.add(obj);
    statics.push(obj);
    if (collide) P.addGeometry(g, transform, surface);
    return obj;
  };
  const T = (x: number, y: number, z: number, ry = 0) => mat4.fromRotationTranslation(mat4.create(), quat.rotateY(quat.create(), quat.create(), ry), [x, y, z]);

  await status('Sculpting terrain and berms');
  // ---------------------------------------------------------------- terrain
  // Range floor: gently uneven packed dirt, grass outside the lanes.
  const floor = plane(60, 140, 60, 140).displace(([x, y, z]) => {
    const n = Math.sin(x * 0.31 + 1.7) * Math.cos(z * 0.23) * 0.05 + Math.sin(x * 1.3 + z * 0.9) * 0.015;
    return [x, y + n, z];
  });
  addStatic(floor, groundMat, SURFACE.DIRT, T(0, 0, -62));
  // surrounding meadow (big, low-res), slightly below the floor edge
  const meadow = plane(900, 900, 90, 90).displace(([x, y, z]) => {
    const d = Math.max(Math.abs(x) - 30, Math.abs(z) - 70, 0); // local space: plane is centred on the floor (translated by -62 below)
    const hills = Math.sin(x * 0.012 + 0.5) * Math.cos(z * 0.009) * 6 + Math.sin(x * 0.031 - z * 0.022) * 2.2;
    return [x, y - 0.12 + Math.min(1, d / 60) * hills, z];
  });
  addStatic(meadow, grassMat, SURFACE.GRASS, T(0, 0, -62), false);

  // berms: smooth trapezoidal embankments
  const berm = (len: number, height: number, top: number, base: number, segL: number) => {
    const g = plane(base, len, 24, segL);
    return g.displace(([x, y, z]) => {
      const ax = Math.abs(x);
      const t = Math.max(0, Math.min(1, (base / 2 - ax) / ((base - top) / 2)));
      const s = t * t * (3 - 2 * t);
      const wob = Math.sin(z * 0.7) * 0.08 + Math.sin(z * 2.3 + x) * 0.04;
      return [x, y + height * s + wob * s, z];
    });
  };
  addStatic(berm(120, 3.4, 1.5, 9, 60), bermMat, SURFACE.DIRT, T(-21, 0, -60));
  addStatic(berm(120, 3.4, 1.5, 9, 60), bermMat, SURFACE.DIRT, T(21, 0, -60));
  addStatic(berm(48, 7, 3, 18, 24), bermMat, SURFACE.DIRT, T(0, 0, -112, Math.PI / 2));

  await status('Building the covered firing line');
  // ---------------------------------------------------------------- covered firing line
  const slabW = 16, slabD = 7;
  addStatic(box(slabW, 0.16, slabD, 4), concrete, SURFACE.CONCRETE, T(0, 0.08, -0.5 + slabD / 2 - 3.5 + 0.0));
  // gravel apron in front of the slab
  addStatic(box(slabW, 0.06, 6, 2), gravel, SURFACE.GRAVEL, T(0, 0.03, -7));
  // posts and roof (single-slope, rising towards the range)
  const roofBack = 2.75, roofFront = 3.15;
  for (const x of [-7.6, -2.55, 2.55, 7.6]) {
    addStatic(box(0.15, roofBack, 0.15), steelFrame, SURFACE.STEEL, T(x, 0.16 + roofBack / 2, 2.6));
    addStatic(box(0.15, roofFront, 0.15), steelFrame, SURFACE.STEEL, T(x, 0.16 + roofFront / 2, -3.2));
  }
  const pitch = Math.atan2(roofFront - roofBack, 5.8);
  const roofM = mat4.fromRotationTranslation(mat4.create(), quat.rotateX(quat.create(), quat.create(), pitch), [0, 0.16 + (roofBack + roofFront) / 2 + 0.06, -0.3]);
  addStatic(box(slabW + 0.6, 0.05, 7.2, 4), roofMetal, SURFACE.STEEL, roofM);
  // roof purlins
  for (let i = 0; i < 5; i++) {
    const z = 2.6 - i * 1.45;
    const y = 0.16 + roofBack + (roofFront - roofBack) * ((2.6 - z) / 5.8) - 0.06;
    addStatic(box(slabW + 0.4, 0.1, 0.06), steelFrame, SURFACE.STEEL, T(0, y, z));
  }
  // shooting benches
  for (const x of [-6, -2, 2, 6]) {
    addStatic(box(1.5, 0.05, 0.75), wood, SURFACE.WOOD, T(x, 0.9, -1.3));
    for (const lx of [-0.65, 0.65]) for (const lz of [-0.28, 0.28]) addStatic(box(0.08, 0.74, 0.08), wood, SURFACE.WOOD, T(x + lx, 0.16 + 0.37, -1.3 + lz));
    addStatic(box(1.3, 0.04, 0.6), wood, SURFACE.WOOD, T(x, 0.35, -1.3));
  }

  await status('Hanging AR500 steel and paper targets');
  // ---------------------------------------------------------------- targets
  const impacts = new ImpactSystem(engine, 0.004018);
  const paper: PaperTarget[] = [];
  const paperTarget = (x: number, z: number) => {
    // two 2x4 legs + cardboard backer + paper face (bullets pass through; legs are solid)
    for (const lx of [-0.3, 0.3]) addStatic(box(0.038, 1.6, 0.089), lumber, SURFACE.WOOD, T(x + lx, 0.8, z));
    addStatic(box(0.66, 0.038, 0.089), lumber, SURFACE.WOOD, T(x, 1.1, z));
    const backer = addStatic(box(0.6, 0.75, 0.006), cardboard, SURFACE.CARDBOARD, T(x, 1.55, z - 0.05), true, false);
    void backer;
    const faceM = T(x, 1.55, z - 0.05 + 0.0035);
    const face = addStatic(plane(0.45, 0.45, 1, 1).rotateX(Math.PI / 2), paperFace, SURFACE.PAPER, faceM, false, false);
    const pt = new PaperTarget(face, 0.6, 0.75);
    impacts.addPaper(pt);
    paper.push(pt);
  };
  paperTarget(-2, -10);
  paperTarget(2, -15);

  const steel: SteelTarget[] = [];
  const steelStand = (x: number, z: number, w: number, h: number, mat: Material, hang = 0.18) => {
    const top = 1.15 + h + hang + 0.05;
    const half = w / 2 + 0.25;
    for (const s of [-1, 1]) {
      addStatic(box(0.05, top, 0.05), steelFrame, SURFACE.STEEL, T(x + s * half, top / 2, z - 0.1));
      // splayed legs
      addStatic(box(0.04, 0.04, 0.6), steelFrame, SURFACE.STEEL, T(x + s * half, 0.02, z - 0.1));
    }
    addStatic(box(half * 2 + 0.05, 0.05, 0.05), steelFrame, SURFACE.STEEL, T(x, top, z - 0.1));
    const pivot: [number, number, number] = [x, top - 0.025, z - 0.1];
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
  steelStand(-3, -25, 0.3, 0.45, plateWhite);
  steelStand(3, -25, 0.25, 0.25, plateOrange, 0.22);
  steelStand(0, -50, 0.3, 0.5, plateWhite);
  steelStand(-4, -100, 0.45, 0.6, plateWhite);
  steelStand(5, -100, 0.3, 0.45, plateOrange);

  // distance marker posts
  for (const z of [-10, -15, -25, -50, -75, -100]) addStatic(box(0.08, 0.8, 0.08), lumber, SURFACE.WOOD, T(-15.5, 0.4, z));

  // scattered rocks for scale/clutter
  for (let i = 0; i < 30; i++) {
    const x = rnd.range(-14, 14), z = rnd.range(-95, -9);
    const r = rnd.range(0.05, 0.18);
    const g = cylinder(r * 0.7, r, r * 0.8, 7).displace(([px, py, pz]) => [px * (1 + 0.2 * Math.sin(py * 40)), py, pz]);
    addStatic(g, gravel, SURFACE.GRAVEL, T(x, r * 0.3, z, rnd.next() * 6));
  }

  await status('Growing grass, blade by blade');
  // ---------------------------------------------------------------- grass (geometric, wind-animated)
  // Mowed range floor: patchy lawn with worn dirt lanes, denser and taller towards the berms, thinning with
  // distance downrange (beyond ~60 m the ground texture carries it). Nothing grows on the gravel apron.
  const gScale = opts.grassDensity ?? 1;
  if (gScale > 0) {
    const grass = buildGrass(R, {
      bounds: { minX: -16.5, maxX: 16.5, minZ: -62, maxZ: -10.3 },
      height: floorHeight,
      density: (x, z) => {
        const patch = fbm(x * 0.17 + 3.1, z * 0.17 - 7.7);
        const lane = Math.abs(Math.sin(x * Math.PI / 4)) < 0.22 && z > -30 ? 0.35 : 1; // foot-worn strips
        const edge = Math.min(1, Math.max(0, (Math.abs(x) - 9) / 6));                  // lusher by the berms
        const far = Math.min(1, Math.max(0.15, 1 - (-z - 12) / 55));
        const apron = Math.min(1, Math.max(0, (-z - 10.3) / 1.5));
        const base = 260 * Math.min(1, Math.max(0, (patch - 0.32) / 0.25)) + 25 + 140 * edge;
        return base * lane * far * apron * gScale;
      },
      bladeHeight: (x, z) => {
        const edge = Math.min(1, Math.max(0, (Math.abs(x) - 12) / 4));
        const weeds = vnoise(x * 0.9, z * 0.9) > 0.82 ? 0.22 : 0;
        return [0.05, 0.13 + 0.25 * edge + weeds];
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
    const benchTop = 0.925, shelf = 0.37;
    const slab = () => 0.16;
    const props = new RangeProps(R)
      .sandbags(2, benchTop, -1.42).ammoBox(2.48, benchTop, -1.12, 0.3, true, true).earmuffs(1.55, benchTop, -1.02, 2.6)
      .ammoCan(-2.35, benchTop, -1.25, 0.2).ammoBox(-1.75, benchTop, -1.05, -0.4, false, true).ammoBox(-1.6, benchTop, -1.35, 1.2, false, false)
      .ammoCan(6.1, shelf, -1.3, -0.1).sandbags(-6, benchTop, -1.4, 0.05).ammoBox(5.6, benchTop, -1.1, 0.1, true, false)
      .brassScatter(2.1, -0.55, 1.6, 140, slab, { lengthM: 0.0448, diameterM: 0.0095 })
      .brassScatter(-2.2, -0.6, 1.5, 90, slab, { lengthM: 0.019, diameterM: 0.0099, straight: true })
      .brassScatter(6, -0.5, 1.4, 60, slab, { lengthM: 0.0448, diameterM: 0.0095 })
      .build();
    for (const o of props.objects) { engine.scene.add(o); statics.push(o); }
  }

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
          const m = mat4.fromRotationTranslationScale(mat4.create(), quat.fromEuler(quat.create(), 0, trng.next() * Math.PI * 2, 0), [t.x, meadowHeight(t.x, t.z) - inst.bounds.min[1] * sc - 0.15, t.z], [sc, sc * (0.92 + 0.16 * trng.next()), sc]);
          mats.set(m, k * 16);
        });
        const set = await InstancedLODSet.create(R, inst, mats, { castShadow: true });
        set.addTo(engine.scene);
        lods.push(set);
        console.info(`[range] ${slot}: ${ids.length} instances, LOD triangles ${set.triangles.map((x) => Math.round(x)).join(' / ')}`);
      }
    } else {
      const trees = buildTrees(R, { trees: list, height: meadowHeight, castShadow: true });
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
          mats.set(mat4.fromRotationTranslationScale(mat4.create(), quat.fromEuler(quat.create(), 0, trng.next() * 6.283, 0), [x, meadowHeight(x, z) - inst.bounds.min[1] * sc - 0.03, z], [sc, sc, sc]), n++ * 16);
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

  return { impacts, spawn: [0, 0.16, 0.9], steel, paper, lods };
}
