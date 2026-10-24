// The fondaine engine: owns renderer (fondaineGL), physics (Rust/WASM), audio (vorp), input, ECS world,
// scripts, tuning registry and dev panel, and runs the fixed-step simulation + variable-rate render loop.

import { Renderer, Scene, Camera, RenderObject, Mesh, Material, Geometry, mat4, Mat4 } from '../gl';
import { World, Entity, defineComponent } from './ecs';
import { Transform, TransformC } from './transform';
import { Behaviour, ScriptsC } from './script';
import { Input } from './input';
import { Tuning, MODULES } from './tuning';
import { DevUI } from './devui';
import { PhysicsWorld } from './physics';
import { AudioSystem } from './audio';
import { registerRenderTuning, registerAudioTuning } from './tuning-presets';
import { GIBaker } from './gi-baker';
import type { GIGrid } from './physics';

export interface MeshRenderer { object: RenderObject; offset: Mat4 | null }
export const MeshRendererC = defineComponent<MeshRenderer>('MeshRenderer');

export interface EngineOptions {
  canvas: HTMLCanvasElement;
  /** Base URL of the built assets (dist/). Defaults to the page's origin root. */
  baseUrl?: string;
  physicsWasm?: string;
  vorpWasm?: string;
  vorpWorklet?: string;
  /** Fixed simulation rate (Hz). */
  fixedHz?: number;
  title?: string;
  /** Render offscreen (no canvas swapchain) — headless capture / tests. */
  offscreen?: boolean;
  /** GI bake worker script (dist/fondaine/gi-worker.js). */
  giWorker?: string;
  /** GI bake threads (default: cores − 1). */
  giThreads?: number;
}

export class Engine {
  readonly renderer: Renderer;
  readonly scene = new Scene();
  readonly camera = new Camera();
  readonly world = new World();
  readonly physics: PhysicsWorld;
  readonly audio: AudioSystem;
  readonly input: Input;
  readonly tuning = new Tuning();
  readonly devui: DevUI;
  readonly canvas: HTMLCanvasElement;
  /** Seconds since start (simulation time). */
  time = 0;
  readonly fixedDt: number;
  /** Max simulated time per frame (avoid spiral of death). */
  maxFrameTime = 0.1;
  timeScale = 1;
  paused = false;
  frame = 0;
  fps = 0;
  private acc = 0;
  private last = 0;
  private running = false;
  private fpsAcc = 0;
  private fpsFrames = 0;
  readonly onUpdate: ((dt: number) => void)[] = [];
  readonly onFixed: ((dt: number) => void)[] = [];
  readonly onLate: ((dt: number) => void)[] = [];
  /** Background GI baking (worker pool). Null when workers are unavailable. */
  readonly giBaker: GIBaker | null;
  /** Re-bake GI automatically when the sun or sky changes (in the background, then swap). */
  autoRebakeGI = true;
  private giLast: { grid: GIGrid; passes: number; key: string } | null = null;
  private giChangeT = 0;

  private constructor(opts: EngineOptions, renderer: Renderer, physics: PhysicsWorld) {
    this.canvas = opts.canvas;
    this.renderer = renderer;
    this.physics = physics;
    this.fixedDt = 1 / (opts.fixedHz ?? 120);
    const base = opts.baseUrl ?? '/';
    this.audio = new AudioSystem(physics, { wasm: opts.vorpWasm ?? `${base}wasm/vorp_dsp.wasm`, worklet: opts.vorpWorklet ?? `${base}vorp/vorp-worklet.js` });
    this.input = new Input(opts.canvas);
    const abs = (u: string) => new URL(u, typeof location !== 'undefined' ? location.href : 'http://localhost/').href;
    this.giBaker = GIBaker.supported() && !(opts.giThreads === 0)
      ? new GIBaker(physics, abs(opts.giWorker ?? `${base}fondaine/gi-worker.js`), abs(opts.physicsWasm ?? `${base}wasm/fondaine_physics.wasm`), opts.giThreads)
      : null;
    this.devui = new DevUI(this.tuning, opts.title ?? 'fondaine');
    this.world.onRemoved(MeshRendererC, (_e, mr) => this.scene.remove(mr.object));
    this.world.onRemoved(ScriptsC, (_e, list) => { for (const s of list) s.onDestroy?.(); });
    registerRenderTuning(this.tuning, this.renderer);
    this.devui.statsText = () => {
      const s = this.renderer.stats;
      const m = this.audio.vorp?.meters;
      return `${this.fps.toFixed(0)} fps  ${s.frameMs.toFixed(2)} ms cpu  ${s.drawCalls} draws  ${(s.triangles / 1000).toFixed(0)}k tris\n` +
        (m ? `audio: ${m.voices} voices  eardrum ${m.earSpl.toFixed(0)} dB SPL  TTS ${m.tts.toFixed(1)} dB  dsp ${(m.cpu * 100).toFixed(1)}%` : 'audio: click to start');
    };
  }

  static async create(opts: EngineOptions): Promise<Engine> {
    const base = opts.baseUrl ?? '/';
    const [renderer, physics] = await Promise.all([
      Renderer.create(opts.canvas, { offscreen: opts.offscreen }),
      PhysicsWorld.load(opts.physicsWasm ?? `${base}wasm/fondaine_physics.wasm`),
    ]);
    return new Engine(opts, renderer, physics);
  }

  /** Call once audio parameters (zone etc.) are set; registers vorp tunables when audio starts. */
  async startAudio() {
    const v = await this.audio.start();
    if (!this.tuning.params.some((p) => p.module === MODULES.vorp)) registerAudioTuning(this.tuning, v);
    return v;
  }

  /**
   * Bake diffuse global illumination for a box of the static world (call after physics.build()).
   * Path-traces `rays` per probe for `passes` bounces on a worker pool (falls back to the main thread).
   * This is the realism-vs-load-time knob; with `autoRebakeGI` the bake re-runs when the sun moves.
   */
  async bakeGlobalIllumination(o: { min: ArrayLike<number>; max: ArrayLike<number>; cell?: number; rays?: number; passes?: number; albedo: ArrayLike<number>; onStatus?: (msg: string) => void }) {
    const cell = o.cell ?? 0.5;
    const nx = Math.max(1, Math.ceil((o.max[0] - o.min[0]) / cell));
    const ny = Math.max(1, Math.ceil((o.max[1] - o.min[1]) / cell));
    const nz = Math.max(1, Math.ceil((o.max[2] - o.min[2]) / cell));
    const rays = o.rays ?? 256, passes = o.passes ?? 3;
    const probes = nx * ny * nz;
    const grid = await this.giGrid({ min: [o.min[0], o.min[1], o.min[2]], cell, nx, ny, nz, rays, albedo: Array.from(o.albedo) });
    o.onStatus?.(`Path tracing global illumination · ${probes.toLocaleString()} probes`);
    const res = await this.runGIBake(grid, passes, (f, stage) => o.onStatus?.(`Path tracing global illumination · ${stage} · ${Math.round(f * 100)}%`));
    console.info(`[fondaineGL] GI bake: ${nx}×${ny}×${nz} probes, ${rays} rays, ${passes} passes, ${res.filled} filled, ${(res.ms / 1000).toFixed(1)} s on ${res.threads} thread(s)`);
    return { probes, ms: res.ms, filled: res.filled };
  }

  private async giGrid(g: Omit<GIGrid, 'sunDir' | 'sunRGB' | 'skySH'>): Promise<GIGrid> {
    const skySH = Array.from(await this.renderer.readSkySH());
    return { ...g, sunDir: [...this.renderer.sky.sunDir] as [number, number, number], sunRGB: [...this.renderer.sky.sunIlluminanceRGB()] as [number, number, number], skySH };
  }

  private skyKey(): string {
    const s = this.renderer.sky.settings;
    return [s.sunElevation, s.sunAzimuth, s.sunIlluminance, s.turbidity, s.rayleigh, s.ozone, s.groundAlbedo].map((v) => Number(v).toFixed(2)).join('|');
  }

  private async runGIBake(grid: GIGrid, passes: number, onProgress?: (f: number, stage: string) => void) {
    let res: { data: Float32Array; filled: number; ms: number; threads: number };
    if (this.giBaker) {
      try { res = await this.giBaker.bake(grid, passes, onProgress); }
      catch (e) { console.warn('[fondaineGL] worker GI bake failed, using the main thread', e); res = this.bakeGISync(grid, passes); }
    } else res = this.bakeGISync(grid, passes);
    this.renderer.setProbeVolume(res.data, grid.nx, grid.ny, grid.nz, grid.min, grid.cell);
    this.giLast = { grid, passes, key: this.skyKey() };
    return res;
  }

  private bakeGISync(grid: GIGrid, passes: number) {
    const t0 = performance.now();
    const { data, filled } = this.physics.bakeGI({ ...grid, passes });
    return { data, filled, ms: performance.now() - t0, threads: 1 };
  }

  /** Called each frame: background re-bake when the sun/sky changed (debounced). */
  private watchGI(dt: number) {
    if (!this.autoRebakeGI || !this.giLast || !this.giBaker || this.giBaker.busy) return;
    if (this.skyKey() === this.giLast.key) { this.giChangeT = 0; return; }
    this.giChangeT += dt;
    if (this.giChangeT < 0.6) return; // wait until the slider stops moving
    this.giChangeT = 0;
    const last = this.giLast;
    this.giLast = { ...last, key: this.skyKey() };
    void this.giGrid({ min: last.grid.min, cell: last.grid.cell, nx: last.grid.nx, ny: last.grid.ny, nz: last.grid.nz, rays: Math.min(last.grid.rays, 128), albedo: last.grid.albedo })
      .then((g) => this.runGIBake(g, last.passes))
      .then((r) => console.info(`[fondaineGL] GI re-baked for the new sun in ${(r.ms / 1000).toFixed(1)} s`))
      .catch((e) => console.warn('[fondaineGL] GI re-bake failed', e));
  }

  // ------------------------------------------------------------------------------------------- entities
  createEntity(name?: string, position?: ArrayLike<number>, rotation?: ArrayLike<number>): Entity {
    const e = this.world.spawn(name);
    this.world.add(e, TransformC, new Transform(position, rotation));
    return e;
  }

  transform(e: Entity): Transform { return this.world.require(e, TransformC); }

  /** Attach a renderable. `offset` = optional local matrix relative to the entity transform. */
  addMesh(e: Entity, mesh: Mesh | Geometry, material: Material, o: { castShadow?: boolean; viewmodel?: boolean; offset?: Mat4 } = {}): RenderObject {
    const m = mesh instanceof Mesh ? mesh : new Mesh(this.renderer.dev, mesh);
    const obj = new RenderObject(m, material);
    obj.castShadow = o.castShadow ?? true;
    obj.viewmodel = o.viewmodel ?? false;
    obj.userData = e;
    this.scene.add(obj);
    this.world.add(e, MeshRendererC, { object: obj, offset: o.offset ?? null });
    this.syncObject(e);
    obj.resetHistory();
    return obj;
  }

  addScript<T extends Behaviour>(e: Entity, script: T): T {
    script.engine = this;
    script.entity = e;
    const list = this.world.get(e, ScriptsC) ?? this.world.add(e, ScriptsC, []);
    list.push(script);
    return script;
  }

  destroy(e: Entity) { this.world.despawn(e); }

  private tmp = mat4.create();
  private syncObject(e: Entity) {
    const mr = this.world.get(e, MeshRendererC);
    const t = this.world.get(e, TransformC);
    if (!mr || !t) return;
    if (mr.offset) mr.object.setTransform(mat4.multiply(this.tmp, t.getWorld(), mr.offset));
    else mr.object.setTransform(t.getWorld());
  }

  // ------------------------------------------------------------------------------------------- loop
  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    const tick = (now: number) => {
      if (!this.running) return;
      // rAF timestamps can precede the performance.now() taken at start(): never step backwards
      const dt = Math.max(0, Math.min((now - this.last) / 1000, this.maxFrameTime));
      this.last = now;
      this.step(dt);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  stop() { this.running = false; }

  /** Advance one rendered frame by `dt` seconds (exposed for deterministic tests / capture). */
  step(rawDt: number) {
    rawDt = Math.max(0, rawDt);
    const dt = this.paused ? 0 : rawDt * this.timeScale;
    this.input.poll();
    if (this.input.actionPressed('tuning')) { this.devui.toggle(); if (this.devui.visible) this.input.unlock(); }

    const scripts = [...this.world.query(ScriptsC)];
    for (const [, list] of scripts) for (const s of list) if (s.enabled && !s._started) { s._started = true; s.onStart?.(); }

    this.acc += dt;
    let steps = 0;
    while (this.acc >= this.fixedDt && steps < 12) {
      for (const [, list] of scripts) for (const s of list) if (s.enabled) s.onFixedUpdate?.(this.fixedDt);
      for (const f of this.onFixed) f(this.fixedDt);
      this.physics.step(this.fixedDt);
      this.acc -= this.fixedDt;
      this.time += this.fixedDt;
      steps++;
    }
    if (steps >= 12) this.acc = 0;

    for (const [, list] of scripts) for (const s of list) if (s.enabled) s.onUpdate?.(dt);
    for (const f of this.onUpdate) f(dt);
    for (const [, list] of scripts) for (const s of list) if (s.enabled) s.onLateUpdate?.(dt);
    for (const f of this.onLate) f(dt);

    for (const [e] of this.world.query(MeshRendererC)) this.syncObject(e);
    this.watchGI(rawDt);
    this.audio.update(this.camera);
    this.renderer.render(this.scene, this.camera, Math.max(rawDt, 1e-4));
    this.devui.update();
    this.input.endFrame();

    this.frame++;
    this.fpsAcc += rawDt;
    this.fpsFrames++;
    if (this.fpsAcc > 0.5) { this.fps = this.fpsFrames / this.fpsAcc; this.fpsAcc = 0; this.fpsFrames = 0; }
  }
}
