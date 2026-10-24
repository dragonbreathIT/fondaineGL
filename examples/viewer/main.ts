// oAxis model viewer: inspect weapon models (and their animated parts) up close under physically based
// lighting. URL: ?model=pistol|carbine&yaw=30&pitch=10&dist=0.4&slide=0..1&mag=0..0.2&tex=2048&fov=30
// Headless capture: &offscreen=1&frames=12

import { Engine, FirearmModel, mat4, quat, vec3, DEG2RAD, box, Material, RenderObject, Mesh } from '@fondaine/gl';
import { buildCompactPistol, buildCarbine, registerOAxisTuning, OAXIS, FirstPersonArms, SkinnedArms, exportGLB, AssetLibrary, spawnGLTF, fitWeaponGrips, weaponSignedDistance, debugHandClearance, COMPACT_PISTOL_GRIPS, CARBINE_GRIPS } from '@fondaine/oaxis';

declare global { interface Window { __test?: Record<string, unknown> } }

const params = new URLSearchParams(location.search);
const num = (k: string, d: number) => (params.has(k) ? Number(params.get(k)) : d);
const canvas = document.getElementById('view') as HTMLCanvasElement;
const status = document.getElementById('status') as HTMLSpanElement;
const offscreen = params.get('offscreen') === '1';
if (params.get('tex')) OAXIS.textureSize = num('tex', 2048);

const engine = await Engine.create({ canvas, baseUrl: '../../', title: 'oAxis viewer', offscreen });
registerOAxisTuning(engine.tuning);
const test: Record<string, unknown> = { frames: 0, errors: [] as string[], done: false };
window.__test = test;
engine.renderer.dev.onError = (m) => { (test.errors as string[]).push(m); console.error(m); };

// studio-ish outdoor light: low sun, concrete table
const sky = engine.renderer.sky.settings;
sky.sunElevation = num('sun', 32);
sky.sunAzimuth = num('az', 130);
const R = engine.renderer.settings;
R.exposure.compensation = num('ev', 0.3);
const table = engine.renderer.synth.material('concrete', { size: 1024, tileMeters: 1, seed: 3, dirt: 0.2 }, { name: 'table' });
const tableObj = new RenderObject(new Mesh(engine.renderer.dev, box(1.6, 0.04, 1.0).computeTangents()), table, mat4.fromTranslation(mat4.create(), [0, -0.02, 0]));
engine.scene.add(tableObj);

// ------------------------------------------------------------------------ models
status.textContent = 'Building models…';
const builds = { pistol: buildCompactPistol(engine.renderer), carbine: buildCarbine(engine.renderer) };
// grips fitted to the geometry like in the game (?fit=0 shows the authored poses)
const fitReports: Record<string, unknown> = {};
if (params.get('fit') !== '0') for (const [k, b] of Object.entries(builds)) if (b.grips) { const r = fitWeaponGrips(b.grips, b.model); b.grips = r.grips; fitReports[k] = r.reports; }
(window as unknown as Record<string, unknown>).__fit = fitReports;
(window as unknown as Record<string, unknown>).__builds = builds;
(window as unknown as Record<string, unknown>).__clear = (k: Key, pose: 'right' | 'left', fitted: boolean) => { const g = fitted ? builds[k].grips! : (k === 'pistol' ? COMPACT_PISTOL_GRIPS : CARBINE_GRIPS); return debugHandClearance(g[pose]!, builds[k].model, pose === 'right' ? 1 : -1); };
(window as unknown as Record<string, unknown>).__sd = (k: Key, p: number[]) => weaponSignedDistance(builds[k].model, p);
type Key = keyof typeof builds;
let current: Key = (params.get('model') as Key) in builds ? (params.get('model') as Key) : 'pistol';
const rest = (m: FirearmModel) => {
  // lay the weapon on its left side? No: present it upright, resting on the magazine/grip bottom.
  let minY = 0;
  for (const p of m.parts) {
    const b = p.object.mesh.bounds;
    if (b) minY = Math.min(minY, b.min[1]);
  }
  return mat4.fromRotationTranslation(mat4.create(), quat.create(), [0, -minY + 0.001, 0]);
};
const anim = { slide: num('slide', 0), mag: num('mag', 0), trigger: num('trigger', 0) };
// gloved hands + arms on the weapon's grip poses (?hands=1; ?eye=1 solves the arms from a virtual eye)
let arms: { update: FirstPersonArms['update']; } | null = params.get('hands') === '1' ? new FirstPersonArms(engine.renderer, { viewmodel: false, skin: params.get('glove') === '1' ? 'glove' : 'bare' }).addTo(engine.scene) : null;
if (params.get('rig') === '1') {
  // real rigged arms from assets/manifest.json slot "arms" (e.g. a Mixamo character)
  const lib = await AssetLibrary.load(engine.renderer, '../../assets/');
  const inst = await lib.model('arms', false);
  if (inst) arms = new SkinnedArms(engine.renderer, inst, { viewmodel: false }).addTo(engine.scene);
  else status.textContent = 'no "arms" slot in assets/manifest.json';
}
function show(k: Key) {
  for (const b of Object.values(builds)) for (const p of b.model.parts) engine.scene.remove(p.object);
  current = k;
  for (const p of builds[k].model.parts) engine.scene.add(p.object);
}
show(current);

// scanned asset from assets/manifest.json (?asset=<slot>), placed on the table and framed
const assetSlot = params.get('asset');
if (assetSlot) {
  status.textContent = `Loading ${assetSlot}…`;
  const lib = await AssetLibrary.load(engine.renderer, '../../assets/');
  const inst = await lib.model(assetSlot, false);
  if (inst) {
    for (const b of Object.values(builds)) for (const p of b.model.parts) engine.scene.remove(p.object);
    const b = inst.bounds, size = Math.max(b.max[0] - b.min[0], b.max[1] - b.min[1], b.max[2] - b.min[2]);
    const k = num('assetScale', 0.3 / size);
    const root = mat4.fromRotationTranslationScale(mat4.create(), quat.fromEuler(quat.create(), 0, num('assetYaw', 0) * DEG2RAD, 0), [-(b.min[0] + b.max[0]) / 2 * k, -b.min[1] * k + 0.001, -(b.min[2] + b.max[2]) / 2 * k], [k, k, k]);
    spawnGLTF(engine.scene, inst, root);
    builds.pistol.model.parts.length = 0; builds.carbine.model.parts.length = 0;
  } else status.textContent = `asset ${assetSlot} not found in assets/manifest.json`;
}

// ------------------------------------------------------------------------ orbit camera
let yaw = num('yaw', 35) * DEG2RAD, pitch = num('pitch', 12) * DEG2RAD, dist = num('dist', current === 'pistol' ? 0.38 : 1.1);
engine.camera.fovY = num('fov', 30) * DEG2RAD;
engine.camera.near = 0.01;
let drag = false;
canvas.addEventListener('pointerdown', (e) => { drag = true; canvas.setPointerCapture(e.pointerId); });
canvas.addEventListener('pointerup', () => { drag = false; });
canvas.addEventListener('pointermove', (e) => { if (!drag) return; yaw -= e.movementX * 0.005; pitch = Math.max(-1.4, Math.min(1.4, pitch + e.movementY * 0.005)); });
canvas.addEventListener('wheel', (e) => { dist = Math.max(0.08, Math.min(5, dist * Math.exp(e.deltaY * 0.001))); e.preventDefault(); }, { passive: false });
window.addEventListener('keydown', (e) => {
  if (e.code === 'Digit1') { show('carbine'); dist = 1.1; }
  if (e.code === 'Digit2') { show('pistol'); dist = 0.38; }
  if (e.code === 'KeyG') {
    // export the current weapon as .glb (geometry + material factors) for Blender / other engines
    const b = builds[current];
    const glb = exportGLB(b.model.parts.map((p, i) => ({ name: `${current}-${p.bolt ? 'slide' : p.magazine ? 'magazine' : p.trigger ? 'trigger' : 'part'}-${i}`, object: p.object })));
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([glb], { type: 'model/gltf-binary' }));
    a.download = `${current}.glb`;
    a.click();
  }
  if (e.code === 'Space') anim.slide = anim.slide > 0 ? 0 : (builds.pistol.spec.action?.travelM ?? 0.03);
});

engine.onUpdate.push(() => {
  const m = builds[current].model;
  const root = rest(m);
  // centre of the weapon (bounds) as orbit target
  const target = vec3.create(0, 0.06, current === 'pistol' ? 0 : -0.1);
  const cp = Math.cos(pitch);
  engine.camera.position.set([target[0] + Math.sin(yaw) * cp * dist, target[1] + Math.sin(pitch) * dist, target[2] + Math.cos(yaw) * cp * dist]);
  quat.fromEuler(engine.camera.rotation, -pitch, yaw, 0);
  const ax = m.magAxis;
  for (const p of m.parts) {
    const M = p.object.transform as Float32Array;
    if (p.bolt) mat4.translate(M, root, [0, 0, anim.slide]);
    else if (p.magazine && ax) mat4.translate(M, root, [ax[0] * anim.mag, ax[1] * anim.mag, ax[2] * anim.mag]);
    else if (p.trigger) mat4.translate(M, root, [0, 0, (m.triggerTravelM ?? 0) * anim.trigger]);
    else mat4.copy(M, root);
  }
  if (arms) {
    const b = builds[current];
    let eye = null;
    if (params.get('eye') === '1') {
      // virtual shooter's eye behind the rear sight at the spec's eye relief
      const ep = vec3.transformMat4(vec3.create(), [m.rearSight[0], m.rearSight[1], m.rearSight[2] + b.spec.eyeRelief], root);
      eye = { position: ep, rotation: quat.create() };
      if (params.get('pov') === '1') { engine.camera.position.set(ep); quat.identity(engine.camera.rotation); }
    }
    if (b.grips) arms.update(root, b.grips, eye, { trigger: anim.trigger });
  }
  test.frames = engine.frame;
});

status.textContent = '';
if (offscreen) {
  const frames = num('frames', 12);
  engine.onUpdate.push(() => {
    if (engine.frame >= frames && !test.done) {
      test.done = true;
      engine.stop();
      engine.renderer.readback().then(({ width, height, data }) => {
        const c2 = document.createElement('canvas');
        c2.width = width; c2.height = height;
        c2.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:5';
        c2.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(data.buffer as ArrayBuffer), width, height), 0, 0);
        document.body.appendChild(c2);
        test.captured = true;
      });
    }
  });
}
engine.start();
void Material;
