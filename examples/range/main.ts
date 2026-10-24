// Milestone 1 — the FPS shooting range. Everything you see and hear is driven by physical parameters
// that can be tuned live (F1).

import { Engine, FPSController, Firearm, registerSurfaces, surfaceAlbedoTable, CameraRig, quat, DEG2RAD, vec3 } from '@fondaine/gl';
import { ZONES, FOOTSTEPS } from '@fondaine/vorp';
import { buildCarbine, buildCompactPistol, registerOAxisTuning, OAXIS, FirstPersonArms, SkinnedArms, WeaponGrips, HandPose, ThumbPose, AssetLibrary, blendPose, fitWeaponGrips, fitSupportPose } from '@fondaine/oaxis';
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
/**
 * Loading status. The overlay gets the full message (with progress %); the line under the f shows the stage name
 * only and cross-fades exactly when the stage changes (progress ticks never touch it), then yields so it paints.
 */
let ldBase = '';
async function setStatus(msg: string) {
  status.textContent = msg;
  if (quick) return;
  const base = msg.replace(/\s*[·:]?\s*\d+%$/, '').trim();
  if (base === ldBase) return;
  ldBase = base;
  ldBusy = ldBusy.then(async () => {
    ldText.classList.add('out');
    await new Promise((r) => setTimeout(r, 150));
    ldText.textContent = base;
    ldText.classList.remove('out');
  });
  await frame();
}
const t0Load = performance.now();
setStatus('Starting the engine');
const engine: Engine = await Engine.create({ canvas, baseUrl: '../../', title: 'fondaine · range', offscreen }).catch((e) => fail(String(e)));
if (params.get('debug')) engine.renderer.settings.debugView = Number(params.get('debug'));
if (params.get('taa') === '0') engine.renderer.settings.taa.enabled = false; // headless single-frame captures
window.engine = engine;
const test: Record<string, unknown> = { frames: 0, errors: [] as string[], done: false };
window.__test = test;
engine.renderer.dev.onError = (m) => { (test.errors as string[]).push(m); console.error(m); };

// ------------------------------------------------------------------------ world
await setStatus('Loading physics and audio cores');
registerSurfaces(engine.physics, engine.audio);
await setStatus('Setting the weather: 18 °C, 1013 hPa, light wind');
engine.physics.setAtmosphere(18, 1013.25, 0.55, [1.6, 0, 0.6]);
engine.renderer.particles.wind.set([1.6, 0, 0.6]);
await setStatus('Reading the asset manifest');
const assets = params.get('scanned') === '0' ? undefined : await AssetLibrary.load(engine.renderer, '../../assets/');
const range = await buildRange(engine, {
  assets,
  onStatus: setStatus, texSize, grassDensity: Number(params.get('grass') ?? 1), grassShadows: params.get('grassShadows') !== '0', trees: Number(params.get('trees') ?? 900) });
await setStatus('Measuring the acoustics of the firing line');
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
await setStatus('Placing the shooter');
const player = engine.createEntity('player', range.spawn);
const ctrl = engine.addScript(player, new FPSController());
await setStatus('Machining the carbine');
const carbine = buildCarbine(engine.renderer);
await setStatus('Machining the C15 Compact');
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
await setStatus('Sculpting hands');
let arms: FirstPersonArms | SkinnedArms | null = null;
if (params.get('arms') !== '0') {
  // a real rigged character (assets slot "arms", e.g. from Mixamo) beats the procedural gloves
  const rig = assets?.hasModel('arms') ? await assets.model('arms', false) : null;
  try { if (rig) arms = new SkinnedArms(engine.renderer, rig).addTo(engine.scene); } catch (e) { console.warn('rigged arms unusable, using procedural hands', e); }
  arms ??= new FirstPersonArms(engine.renderer, { skin: 'glove' }).addTo(engine.scene);
}
await setStatus('Loading ammunition');
// scanned vegetation LODs follow the camera
engine.onUpdate.push(() => { for (const l of range.lods) l.update(engine.camera.position); });
// credits for downloaded assets (CC-BY needs attribution)
if (assets && !assets.empty) {
  const c = document.createElement('div');
  c.style.cssText = 'margin-top:14px;font-size:11px;color:#7d828a;max-height:70px;overflow:auto';
  c.textContent = 'Scanned assets: ' + assets.credits().map((x) => `${x.title ?? x.slot}${x.author ? ' by ' + x.author : ''} (${x.license})`).join(' · ');
  overlay.querySelector('.card')?.appendChild(c);
}
/** Weapon grips plus the optional support-hand poses for racking (over the slide) and slapping the bolt catch. */
type Grips = WeaponGrips & { leftOnCharge?: HandPose; leftOnBoltRelease?: HandPose };
// grip poses are authored per weapon, then fitted to the actual geometry (fingers wrap until they touch; fit=0 disables)
const fitGrips = (g: WeaponGrips | undefined, w: Firearm): Grips | undefined => {
  if (!g || params.get('fit') === '0') return g;
  const t0 = performance.now();
  const r = fitWeaponGrips(g, w.model);
  console.info(`[oaxis] grip fit ${w.spec.name}: ${Object.entries(r.reports).map(([k, v]) => `${k} ${v.changed} digits${v.palmPush ? ` palm +${(v.palmPush * 1000).toFixed(1)}mm` : ''}`).join(', ')} in ${(performance.now() - t0).toFixed(0)} ms`);
  return r.grips;
};
await setStatus('Fitting the grips to the weapons');
const gripsFor = new Map<Firearm, Grips | undefined>([[weapons[0], fitGrips(carbine.grips, weapons[0])], [weapons[1], fitGrips(pistol.grips, weapons[1])]]);
const fittedSupport = new Map<string, HandPose>();
const fitOnce = (key: string, w: Firearm, make: () => HandPose): HandPose => {
  let p = fittedSupport.get(key);
  if (!p) { p = params.get('fit') === '0' ? make() : fitSupportPose(make(), w.model); fittedSupport.set(key, p); }
  return p;
};
const smooth = (x: number) => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };
const shiftPose = (p: HandPose, ax: ArrayLike<number>, d: number): HandPose => ({ ...p, position: [p.position[0] + ax[0] * d, p.position[1] + ax[1] * d, p.position[2] + ax[2] * d] });
/** Default racking pose when the weapon's grips don't author one: overhand on the slide (pistol) or two fingers hooked in the charging-handle latch (rifle). */
function defaultChargePose(w: Firearm): HandPose {
  const gp = w.chargeGrip;
  if (w.model.charge) {
    return {
      position: [gp[0] - 0.062, gp[1] + 0.03, gp[2] - 0.012], fingerDir: [0.82, -0.5, 0.28], dorsal: [0.2, 0.9, -0.3],
      fingers: [{ curl: [0.9, 1.25, 0.9] }, { curl: [0.95, 1.3, 0.9] }, { curl: [1.25, 1.4, 1.0] }, { curl: [1.3, 1.4, 1.0] }],
      thumb: { dir: [0.2, -0.3, -0.93], bend: [0.25, 0.3] },
    };
  }
  return {
    position: [gp[0] - 0.066, gp[1] + 0.026, gp[2] + 0.004], fingerDir: [0.93, -0.36, 0.05], dorsal: [0.3, 0.85, 0.15],
    fingers: [{ curl: [1.05, 1.25, 0.7] }, { curl: [1.1, 1.3, 0.7] }, { curl: [1.1, 1.3, 0.7] }, { curl: [1.1, 1.25, 0.7] }],
    thumb: { dir: [0.25, -0.55, -0.8], bend: [0.3, 0.35] },
  };
}
function defaultBoltReleasePose(w: Firearm): HandPose {
  const e = w.model.ejectionPort;
  return {
    position: [-e[0] - 0.045, e[1] - 0.02, e[2] + 0.055], fingerDir: [0.75, 0.25, -0.61], dorsal: [-0.6, 0.75, 0.0],
    fingers: [{ curl: [0.35, 0.5, 0.3] }, { curl: [0.5, 0.6, 0.3] }, { curl: [0.9, 1.0, 0.5] }, { curl: [1.1, 1.1, 0.6] }],
    thumb: { dir: [0.1, 0.5, -0.86], bend: [0.3, 0.3] },
  };
}
engine.onLate.push(() => {
  if (!arms) return;
  const g = gripsFor.get(gun);
  if (!g || gun.holstered) { arms.setVisible(false); return; }
  arms.setVisible(true);
  // reload choreography: the support hand leaves the grip, fetches a magazine, rides it into the magwell, then
  // either racks the slide / charging handle (empty reload), slaps the bolt catch, or settles back on the grip
  let leftOverride: HandPose | null = null, leftWeight = 0;
  const ph = gun.reloadPhase, u = gun.phaseT, ax = gun.model.magAxis;
  const magPose = g.leftOnMagazine;
  const chargePose = g.leftOnCharge ?? fitOnce(`charge:${gun.spec.name}`, gun, () => defaultChargePose(gun));
  const pull = gun.chargePullDir;
  const rackPose = (ru: number): { pose: HandPose; w: number } => {
    // 0–0.3 travel to the action, 0.3–0.55 hold + pull (hand follows the slide), 0.55–1 let go and return
    const onSlide = shiftPose(chargePose, pull, gun.rackDisplacement);
    if (ru < 0.3) return { pose: onSlide, w: smooth(ru / 0.3) };
    if (ru < 0.62) return { pose: onSlide, w: 1 };
    return { pose: chargePose, w: 1 - smooth((ru - 0.62) / 0.38) };
  };
  // firing-hand thumb presses the magazine release at the start of the reload (pistol: left side of the frame)
  let rightThumb: { thumb: ThumbPose; weight: number } | null = null;
  if (ph === 'magOut') {
    const press = Math.sin(Math.PI * Math.min(1, u / 0.45));
    rightThumb = { thumb: { dir: [g.right.thumb.dir[0] - 0.25, g.right.thumb.dir[1] - 0.45, g.right.thumb.dir[2] + 0.1], bend: [0.75, 0.55] }, weight: smooth(press) };
  }
  if (ph && magPose && ax) {
    if (ph === 'magOut') {
      // the support hand lets go and drops to the chest pouch (vest) while the empty magazine falls
      leftWeight = smooth(u * 2.0);
      leftOverride = shiftPose(magPose, ax, gun.magAnim.vestDistance * smooth((u - 0.2) / 0.8) + 0.06 * Math.sin(Math.PI * u));
    } else if (ph === 'magIn') {
      // the fresh magazine rides in the hand from the vest to the magwell (incl. the fumble bounce)
      leftWeight = 1;
      leftOverride = shiftPose(magPose, ax, gun.anim.magOffset);
    } else if (ph === 'settle') {
      leftWeight = 1 - smooth(u);
      leftOverride = magPose;
    } else if (ph === 'charge') {
      const r = rackPose(u);
      // the hand comes straight from the magazine to the slide
      leftOverride = u < 0.3 ? blendPose(magPose, r.pose, r.w) : r.pose;
      leftWeight = u < 0.3 ? 1 : r.w;
    } else if (ph === 'release') {
      const bp = g.leftOnBoltRelease ?? fitOnce(`bolt:${gun.spec.name}`, gun, () => defaultBoltReleasePose(gun));
      if (u < 0.5) { leftOverride = blendPose(magPose, bp, smooth(u / 0.45)); leftWeight = 1; }
      else { leftOverride = bp; leftWeight = 1 - smooth((u - 0.55) / 0.45); }
    }
  } else if (gun.rackProgress >= 0) {
    const r = rackPose(gun.rackProgress);
    leftOverride = r.pose; leftWeight = r.w;
  }
  arms.update(gun.rootWorld, g, { position: ctrl.eyePos, rotation: ctrl.eyeRot }, { trigger: gun.anim.trigger, leftOverride, leftWeight, rightThumb });
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
    cam.viewmodelFovY = 62 * DEG2RAD;  // wide enough to keep the grip, magwell and support hand in frame
    cam.iso = 100;
    Object.assign(R.lens, { distortion: 0, distortion2: 0, fillZoom: 1, chromaticAberration: 0.12, naturalVignette: 0.45, vignette: 0.08, vignetteRoundness: 0.6, sharpen: 0.25 });
    Object.assign(R.sensor, { enabled: true, readNoise: 0.0015, shotNoise: 0.0012, gain: 1 });
    Object.assign(R.exposure, { speedUp: 2.2, speedDown: 1.4, compensation: 0.6, centerWeight: 0.7, lowPercent: 0.45 });
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
await setStatus('Zeroing the sights');
await frame();
await setStatus('Compiling shaders');
await frame();
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
  // deterministic time for headless capture: every frame advances `dt` seconds however long it takes to render
  if (offscreen) engine.maxFrameTime = Number(params.get('dt') ?? 1 / 60);
  // reloadAt=<frame>&scrub=<s>: start a reload (from an empty chamber with empty=1) and jump its clock; rackAt=<frame>
  const reloadAt = params.has('reloadAt') ? Number(params.get('reloadAt')) : -1;
  const rackAt = params.has('rackAt') ? Number(params.get('rackAt')) : -1;
  const scrub = Number(params.get('scrub') ?? 0);
  if (params.get('empty') === '1') for (const w of weapons) { w.rounds = 0; w.chambered = false; if (w.spec.action?.lockOpenOnEmpty) w.anim.lockedOpen = true; }
  if (params.has('fumble')) for (const w of weapons) w.magAnim.fumbleChance = Number(params.get('fumble')); // 1 forces the botched insertion, 0 never
  engine.onUpdate.push(() => {
    const f = engine.frame;
    if (f === reloadAt) { gun.reload(); gun.scrubReload(scrub); }
    if (f === rackAt) gun.rack();
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
