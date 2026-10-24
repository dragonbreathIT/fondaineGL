// Milestone 1 — the FPS shooting range. Everything you see and hear is driven by physical parameters
// that can be tuned live (F1).

import { Engine, FPSController, Firearm, registerSurfaces, surfaceAlbedoTable, CameraRig, quat, DEG2RAD, vec3 } from '@fondaine/gl';
import { ZONES, FOOTSTEPS } from '@fondaine/vorp';
import { buildCarbine, buildCompactPistol, registerOAxisTuning, OAXIS, FirstPersonArms, SkinnedArms, WeaponGrips, HandPose, AssetLibrary } from '@fondaine/oaxis';
import { buildRange } from './range';

declare global { interface Window { __test?: Record<string, unknown>; engine?: Engine } }

const params = new URLSearchParams(location.search);
const canvas = document.getElementById('view') as HTMLCanvasElement;
const overlay = document.getElementById('overlay') as HTMLDivElement;
const osd = document.getElementById('osd') as HTMLDivElement;
const hud = document.getElementById('hud') as HTMLDivElement;
const status = document.getElementById('status') as HTMLDivElement;

function fail(msg: string): never {
  status.textContent = msg;
  status.style.color = '#ff8a7a';
  throw new Error(msg);
}

if (!('gpu' in navigator)) fail('WebGPU is not available in this browser. Use Chrome/Edge 113+, Safari 26+ or Firefox 141+ (Windows).');

const offscreen = params.get('offscreen') === '1';
const texSize = Number(params.get('tex') ?? 2048);
if (params.get('tex')) OAXIS.textureSize = texSize;
// ------------------------------------------------------------------------ loading screen
const loader = document.getElementById('loader') as HTMLDivElement;
const ldText = document.getElementById('ld-text') as HTMLSpanElement;
const quick = params.get('offscreen') === '1' || params.get('demo') === '1' || params.get('quick') === '1';
if (quick) loader.style.display = 'none';
const frame = () => new Promise<void>((r) => requestAnimationFrame(() => setTimeout(r, 0)));
let ldBusy: Promise<void> = Promise.resolve();
/** Cross-fade the loading status line (fade out, swap, fade in), then yield so it paints. */
let ldBase = '';
async function setStatus(msg: string) {
  status.textContent = msg;
  if (quick) return;
  // progress ticks of the same stage update in place; a new stage cross-fades
  const base = msg.replace(/\d+%$/, '');
  if (base === ldBase) { ldText.textContent = msg; return; }
  ldBase = base;
  ldBusy = ldBusy.then(async () => {
    ldText.classList.add('out');
    await new Promise((r) => setTimeout(r, 170));
    ldText.textContent = msg;
    ldText.classList.remove('out');
  });
  await frame();
}
const t0Load = performance.now();
setStatus('Starting the engine');
const engine: Engine = await Engine.create({ canvas, baseUrl: '../../', title: 'fondaine · range', offscreen }).catch((e) => fail(String(e)));
if (params.get('debug')) engine.renderer.settings.debugView = Number(params.get('debug'));
window.engine = engine;
const test: Record<string, unknown> = { frames: 0, errors: [] as string[], done: false };
window.__test = test;
engine.renderer.dev.onError = (m) => { (test.errors as string[]).push(m); console.error(m); };

// ------------------------------------------------------------------------ world
await setStatus('Loading physics and audio cores');
registerSurfaces(engine.physics, engine.audio);
engine.physics.setAtmosphere(18, 1013.25, 0.55, [1.6, 0, 0.6]);
engine.renderer.particles.wind.set([1.6, 0, 0.6]);
await setStatus('Reading the asset manifest');
const assets = params.get('scanned') === '0' ? undefined : await AssetLibrary.load(engine.renderer, '../../assets/');
const range = await buildRange(engine, {
  assets,
  onStatus: setStatus, texSize, grassDensity: Number(params.get('grass') ?? 1), grassShadows: params.get('grassShadows') !== '0', trees: Number(params.get('trees') ?? 900) });
engine.audio.setZone(ZONES.outdoorRange);
engine.audio.tempC = 18;

const sky = engine.renderer.sky.settings;
sky.sunElevation = Number(params.get('sun') ?? 38);
sky.sunAzimuth = Number(params.get('az') ?? 145);

// ------------------------------------------------------------------------ baked global illumination
// Path-traced irradiance probes around the firing line (where the player and the weapon are lit by the
// roof, floor and sunlit ground). `gi=0` skips it; `girays` trades realism for load time.
if (params.get('gi') !== '0') {
  await engine.bakeGlobalIllumination({
    min: [-12, -0.4, -14], max: [12, 5.6, 6], cell: 0.5,
    rays: Number(params.get('girays') ?? 256), passes: 3,
    albedo: surfaceAlbedoTable(),
    onStatus: (m) => { void setStatus(m); },
  });
}

// ------------------------------------------------------------------------ player + weapons (oAxis models)
registerOAxisTuning(engine.tuning);
const player = engine.createEntity('player', range.spawn);
const ctrl = engine.addScript(player, new FPSController());
await setStatus('Machining weapons');
const carbine = buildCarbine(engine.renderer);
const pistol = buildCompactPistol(engine.renderer);
const weapons = [
  engine.addScript(player, new Firearm(carbine.spec, carbine.model, ctrl)),
  engine.addScript(player, new Firearm(pistol.spec, pistol.model, ctrl)),
];
let current = params.get('weapon') === 'pistol' ? 1 : 0;
let gun = weapons[current];
engine.input.bindings.set('weapon1', { keys: ['Digit1'] });
engine.input.bindings.set('weapon2', { keys: ['Digit2'] });
engine.input.bindings.set('nextWeapon', { gamepadButtons: [3] });
function equip(i: number, instant = false) {
  for (const w of weapons) if (w !== weapons[i]) w.holster();
  current = i;
  gun = weapons[i];
  gun.draw(instant);
  (window as unknown as Record<string, unknown>).gun = gun;
}
equip(current, true);
engine.onUpdate.push(() => {
  if (engine.input.actionPressed('weapon1') && current !== 0) equip(0);
  if (engine.input.actionPressed('weapon2') && current !== 1) equip(1);
  if (engine.input.actionPressed('nextWeapon')) equip((current + 1) % weapons.length);
});
// ------------------------------------------------------------------------ first-person arms (oAxis)
await setStatus('Fitting gloves');
let arms: FirstPersonArms | SkinnedArms | null = null;
if (params.get('arms') !== '0') {
  // a real rigged character (assets slot "arms", e.g. from Mixamo) beats the procedural gloves
  const rig = assets?.hasModel('arms') ? await assets.model('arms', false) : null;
  try { if (rig) arms = new SkinnedArms(engine.renderer, rig).addTo(engine.scene); } catch (e) { console.warn('rigged arms unusable, using procedural hands', e); }
  arms ??= new FirstPersonArms(engine.renderer).addTo(engine.scene);
}
// scanned vegetation LODs follow the camera
engine.onUpdate.push(() => { for (const l of range.lods) l.update(engine.camera.position); });
// credits for downloaded assets (CC-BY needs attribution)
if (assets && !assets.empty) {
  const c = document.createElement('div');
  c.style.cssText = 'margin-top:14px;font-size:11px;color:#7d828a;max-height:70px;overflow:auto';
  c.textContent = 'Scanned assets: ' + assets.credits().map((x) => `${x.title ?? x.slot}${x.author ? ' by ' + x.author : ''} (${x.license})`).join(' · ');
  overlay.querySelector('.card')?.appendChild(c);
}
const gripsFor = new Map<Firearm, WeaponGrips | undefined>([[weapons[0], carbine.grips], [weapons[1], pistol.grips]]);
const smooth = (x: number) => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };
const shiftPose = (p: HandPose, ax: ArrayLike<number>, d: number): HandPose => ({ ...p, position: [p.position[0] + ax[0] * d, p.position[1] + ax[1] * d, p.position[2] + ax[2] * d] });
engine.onLate.push(() => {
  if (!arms) return;
  const g = gripsFor.get(gun);
  if (!g || gun.holstered) { arms.setVisible(false); return; }
  arms.setVisible(true);
  // reload choreography: support hand leaves the grip, fetches a magazine, rides it into the magwell, returns
  let leftOverride: HandPose | null = null, leftWeight = 0;
  const t = gun.reloadTime, r = gun.spec.reload, ax = gun.model.magAxis;
  if (t >= 0 && g.leftOnMagazine && ax) {
    if (t < r.magOut) {
      const u = t / r.magOut;
      leftWeight = smooth(u * 2.5);
      leftOverride = shiftPose(g.leftOnMagazine, ax, gun.magAnim.insertDistance * u + 0.22 * Math.sin(Math.PI * u));
    } else if (t < r.magOut + r.magIn) {
      leftWeight = 1;
      leftOverride = shiftPose(g.leftOnMagazine, ax, gun.anim.magOffset);
    } else {
      leftWeight = 1 - smooth((t - r.magOut - r.magIn) / r.boltRelease);
      leftOverride = g.leftOnMagazine;
    }
  }
  arms.update(gun.rootWorld, g, { position: ctrl.eyePos, rotation: ctrl.eyeRot }, { trigger: gun.anim.trigger, leftOverride, leftWeight });
});

(window as unknown as Record<string, unknown>).gun = gun;
(window as unknown as Record<string, unknown>).weapons = weapons;
(window as unknown as Record<string, unknown>).ctrl = ctrl;

ctrl.onFootstep = (surface, pos, intensity) => {
  const base = FOOTSTEPS[surface] ?? FOOTSTEPS.dirt;
  engine.audio.footstep({ ...base, levelSpl: (base.levelSpl ?? 70) + 20 * Math.log10(intensity) }, pos);
};

// ------------------------------------------------------------------------ camera rigs (eyes / bodycam)
const R = engine.renderer.settings;
const cam = engine.camera;
function applyRig(rig: CameraRig) {
  ctrl.rig = rig;
  if (rig === 'bodycam') {
    cam.fovY = 82 * DEG2RAD;            // ≈ 130° diagonal wide-angle module
    cam.viewmodelFovY = cam.fovY;       // the gun is seen by the same lens (from the chest)
    cam.iso = 1600;
    Object.assign(R.lens, { distortion: -0.21, distortion2: 0.03, fillZoom: 0.86, chromaticAberration: 0.9, naturalVignette: 0.9, vignette: 0.35, vignetteRoundness: 0.9, sharpen: 0.7 });
    Object.assign(R.sensor, { enabled: true, readNoise: 0.003, shotNoise: 0.0025, gain: 1 });
    Object.assign(R.exposure, { speedUp: 6, speedDown: 4, compensation: 1.0, centerWeight: 0.1, lowPercent: 0.3 });
    Object.assign(R.motionBlur, { shutterAngle: 120 });
    Object.assign(R.dof, { enabled: true, apertureMm: 0.9 }); // tiny sensor, short focal length: near-infinite DOF
    Object.assign(R.grade, { tonemapper: 'aces', contrast: 1.12, saturation: 0.86, temperature: 0.06, tint: -0.03 });
  } else {
    cam.fovY = 68 * DEG2RAD;
    cam.viewmodelFovY = 55 * DEG2RAD;
    cam.iso = 100;
    Object.assign(R.lens, { distortion: 0, distortion2: 0, fillZoom: 1, chromaticAberration: 0.12, naturalVignette: 0.45, vignette: 0.08, vignetteRoundness: 0.6, sharpen: 0.25 });
    Object.assign(R.sensor, { enabled: true, readNoise: 0.0015, shotNoise: 0.0012, gain: 1 });
    Object.assign(R.exposure, { speedUp: 2.2, speedDown: 1.4, compensation: 0.35, centerWeight: 0.6, lowPercent: 0.45 });
    Object.assign(R.motionBlur, { shutterAngle: 180 });
    Object.assign(R.dof, { enabled: true, apertureMm: 3.2 }); // daylight pupil
    Object.assign(R.grade, { tonemapper: 'agx', contrast: 1.04, saturation: 1.02, temperature: 0, tint: 0 });
  }
  osd.style.display = rig === 'bodycam' ? 'block' : 'none';
}
let lastRig: CameraRig = (params.get('rig') as CameraRig) ?? 'eyes';
applyRig(lastRig);

// ------------------------------------------------------------------------ HUD / OSD
let hudT = 0;
const showHud = () => { hudT = 2.5; };
engine.onUpdate.push((dt) => {
  if (ctrl.rig !== lastRig) { lastRig = ctrl.rig; applyRig(lastRig); }
  if (engine.input.actionPressed('reload') || engine.input.actionPressed('fireMode') || engine.input.actionPressed('weapon1') || engine.input.actionPressed('weapon2') || !gun.chambered) showHud();
  if (engine.input.actionPressed('earpro') && engine.audio.vorp) {
    const v = engine.audio.vorp;
    const next = (v.params.hearing[0] + 1) % 3;
    v.setHearing({ protection: next });
    hud.textContent = ['NO HEARING PROTECTION', 'PASSIVE EARMUFFS', 'ELECTRONIC EARMUFFS'][next];
    hudT = 2;
  } else if (hudT > 0) {
    hud.textContent = `${gun.spec.name.toUpperCase()}   ${gun.mode.toUpperCase()}  ${gun.rounds}${gun.chambered ? '+1' : ''}`;
  }
  hudT -= dt;
  hud.style.opacity = hudT > 0 ? String(Math.min(1, hudT)) : '0';
  if (ctrl.rig === 'bodycam') {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    osd.textContent = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}  ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}\nCAM 07  ● REC`;
  }
  test.frames = engine.frame;
});

// ------------------------------------------------------------------------ start
const start = async () => {
  overlay.style.display = 'none';
  await engine.input.lock();
  try { await engine.startAudio(); } catch (e) { console.warn('audio failed to start', e); }
};
overlay.addEventListener('click', start);
document.addEventListener('pointerlockchange', () => {
  if (!document.pointerLockElement && !engine.devui.visible && !offscreen) overlay.style.display = 'flex';
});
// warm up: compile every pipeline and fill the TAA history before revealing the world
await setStatus('Compiling shaders');
engine.step(1 / 60);
await engine.renderer.dev.device.queue.onSubmittedWorkDone();
await setStatus('Ready');
status.textContent = 'Click to start';
if (!quick) {
  const minShow = 2600 - (performance.now() - t0Load); // the f always gets its moment
  if (minShow > 0) await new Promise((r) => setTimeout(r, minShow));
  await ldBusy;
  loader.classList.add('done');
  setTimeout(() => { loader.style.display = 'none'; }, 1000);
}

// ------------------------------------------------------------------------ scripted demo / headless capture
if (params.get('demo') === '1' || offscreen) {
  overlay.style.display = 'none';
  const yaw = Number(params.get('yaw') ?? 0) * DEG2RAD;
  const pitch = Number(params.get('pitch') ?? -1) * DEG2RAD;
  ctrl.yaw = yaw; ctrl.pitch = pitch;
  for (const w of weapons) w.adsOverride = params.get('ads') === '1' ? 1 : 0;
  const shots = Number(params.get('shots') ?? 0);
  const fireAt = Number(params.get('fireAt') ?? 20);
  const frames = Number(params.get('frames') ?? 60);
  engine.onUpdate.push(() => {
    const f = engine.frame;
    gun.triggerOverride = shots > 0 && f >= fireAt && gun.shotsFired < shots;
    if (f >= frames && !test.done) {
      test.done = true;
      engine.stop();
      if (offscreen) engine.renderer.readback().then(({ width, height, data }) => {
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
void quat; void vec3;
