// Renderer smoke scene: exercises every pass (shadows, GTAO, sky, IBL, TAA, bloom, particles, decals).
// Open test/smoke.html via the dev server; `window.__smoke` reports frame count / errors for automation.
import {
  Renderer, Scene, Camera, RenderObject, Mesh, Material, PointLight, box, plane, sphere, cylinder, roundedBox,
  quat, mat4, DEG2RAD, ParticleKind, DecalKind,
} from '../src/index';

declare global { interface Window { __smoke: { frames: number; errors: string[]; ready: boolean; stats?: unknown } } }
window.__smoke = { frames: 0, errors: [], ready: false };

const canvas = document.getElementById('c') as HTMLCanvasElement;
const params = new URLSearchParams(location.search);
const texSize = Number(params.get('tex') ?? 512);
const offscreen = params.get('offscreen') === '1';
const r = await Renderer.create(canvas, { offscreen });
r.dev.onError = (m) => { window.__smoke.errors.push(m); console.error(m); };
const debug = Number(params.get('debug') ?? 0);
r.settings.debugView = debug;
if (params.get('scale')) r.settings.renderScale = Number(params.get('scale'));

const scene = new Scene();
const cam = new Camera();
cam.position.set([0, 1.65, 4.5]);
quat.fromEuler(cam.rotation, -6 * DEG2RAD, 0, 0);

const add = (g: ReturnType<typeof box>, m: Material, x: number, y: number, z: number, ry = 0) => {
  const o = new RenderObject(new Mesh(r.dev, g), m);
  const q = quat.create();
  quat.rotateY(q, q, ry);
  mat4.fromRotationTranslation(o.transform, q, [x, y, z]);
  return scene.add(o);
};

const plain = params.get('plain') === '1';
const synth = (k: Parameters<typeof r.synth.material>[0], rp: Parameters<typeof r.synth.material>[1] = {}, mp: Parameters<typeof r.synth.material>[2] = {}) =>
  plain ? new Material({ baseColor: [0.5, 0.45, 0.4, 1], roughness: 0.7, ...mp }) : r.synth.material(k, rp, mp);
const ground = synth('ground', { size: texSize }, { worldUV: true });
const concrete = synth('concrete', { size: texSize });
const wood = synth('wood', { size: texSize });
const anod = synth('anodized', { size: texSize });
const brass = synth('brass', { size: texSize });
const steel = synth('paintedSteel', { size: texSize, color: [0.85, 0.85, 0.82] });
const bare = synth('bareSteel', { size: texSize });

add(plane(200, 200, 40, 40), ground, 0, 0, -50);
add(box(6, 0.15, 4, 2), concrete, 0, 0.075, 0);
// covered firing line: posts + roof
for (const x of [-2.8, 2.8]) for (const z of [-1.8, 1.8]) add(box(0.12, 2.8, 0.12), bare, x, 1.5, z);
add(box(6.4, 0.08, 4.4), bare, 0, 2.95, 0);
// bench
add(box(1.6, 0.06, 0.7), wood, 0, 0.9, -1.0);
for (const x of [-0.7, 0.7]) add(box(0.08, 0.75, 0.6), wood, x, 0.525, -1.0);
// objects on bench
add(roundedBox(0.3, 0.06, 0.08, 0.008), anod, -0.2, 0.96, -1.0, 0.3);
add(cylinder(0.0048, 0.0048, 0.045, 24), brass, 0.25, 0.957, -0.9);
add(sphere(0.12, 48, 32), brass, 0.45, 1.05, -1.1);
// steel target down range
const plate = add(box(0.3, 0.45, 0.0095), steel, 0.5, 1.2, -25);
add(box(0.05, 1.4, 0.05), bare, 0.2, 0.7, -25.1);
add(box(0.05, 1.4, 0.05), bare, 0.8, 0.7, -25.1);
add(box(14, 4, 6), ground, 0, 2, -40); // berm-ish

const lamp = scene.addLight(PointLight.fromLumens(1600, 3000));
lamp.position.set([1.5, 2.7, 0.5]);
lamp.range = 8;

r.decals.add(DecalKind.MetalHit, [0.55, 1.25, -25 + 0.0048], [0, 0, 1], 0.04, plate);
r.decals.add(DecalKind.WoodHole, [0.1, 0.931, -0.95], [0, 1, 0], 0.03);

r.sky.settings.sunElevation = Number(params.get('sun') ?? 35);
let t = 0;
const frames = Number(params.get('frames') ?? 24);
window.__smoke.ready = true;
const loop = () => {
  const dt = 1 / 60;
  t += dt;
  if (window.__smoke.frames === 4) {
    for (let i = 0; i < 6; i++) {
      r.particles.spawn({ kind: ParticleKind.Smoke, position: [0.3, 1.3, -1.8], velocity: [0.2, 0.6, -0.5], life: 3, size0: 0.08, size1: 0.6, color: [0.75, 0.75, 0.75], alpha0: 0.5, alpha1: 0, drag: 2 });
    }
    r.particles.spawn({ kind: ParticleKind.Flash, position: [0.3, 1.3, -1.9], life: 0.05, size0: 0.12, size1: 0.14, color: [1, 0.62, 0.3], alpha0: 1, alpha1: 1, luminance: 2e5 });
  }
  r.render(scene, cam, dt);
  window.__smoke.frames++;
  window.__smoke.stats = { ...r.stats };
  if (window.__smoke.frames < frames) requestAnimationFrame(loop);
  else if (offscreen) {
    // headless: blit the readback into a 2D canvas overlay for screenshots
    r.readback().then(({ width, height, data }) => {
      const c2 = document.createElement('canvas');
      c2.width = width; c2.height = height;
      c2.style.cssText = 'position:fixed;inset:0;width:100%;height:100%';
      c2.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(data.buffer as ArrayBuffer), width, height), 0, 0);
      document.body.appendChild(c2);
      (window.__smoke as { done?: boolean }).done = true;
    });
  }
};
requestAnimationFrame(loop);
