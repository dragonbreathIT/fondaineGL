// Parallel, non-blocking GI baking: the probe grid is split into z-slabs and path-traced by a pool of
// workers (one per spare core), pass by pass (each bounce reads the previous pass's full grid). The main
// thread stays free — the loading screen animates, and live re-bakes (sun moved) happen in the background.

import type { PhysicsWorld, GIGrid } from './physics';

export interface GIBakeResult { data: Float32Array; filled: number; ms: number; threads: number }

interface Pending { resolve: (v: unknown) => void; reject: (e: unknown) => void }

export class GIBaker {
  private workers: Worker[] = [];
  private ready: Promise<void> | null = null;
  private job = 0;
  private pending = new Map<number, Pending>();
  readonly threads: number;
  private meshCount = -1;
  busy = false;

  constructor(private physics: PhysicsWorld, private workerUrl: string, private wasmUrl: string, threads?: number) {
    const hc = (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) || 4;
    this.threads = Math.max(1, Math.min(threads ?? hc - 1, 12));
  }

  static supported(): boolean { return typeof Worker !== 'undefined'; }

  /** Spawn workers and ship them the static world (re-shipped automatically if new meshes were added). */
  private init(): Promise<void> {
    const meshes = this.physics.staticMeshes;
    if (this.ready && this.meshCount === meshes.length) return this.ready;
    this.dispose();
    this.meshCount = meshes.length;
    this.ready = Promise.all(Array.from({ length: this.threads }, () => new Promise<void>((resolve, reject) => {
      const w = new Worker(this.workerUrl, { type: 'module', name: 'fondaine-gi' });
      w.onmessage = (ev) => {
        const m = ev.data;
        if (m.type === 'ready') { resolve(); return; }
        if (m.type === 'error') { reject(new Error(m.message)); for (const p of this.pending.values()) p.reject(new Error(m.message)); this.pending.clear(); return; }
        const p = this.pending.get(m.job);
        if (p) { this.pending.delete(m.job); p.resolve(m); }
      };
      w.onerror = (e) => { reject(e); this.failAll(new Error('GI worker crashed: ' + (e.message ?? e))); };
      w.postMessage({ type: 'init', wasm: this.wasmUrl, meshes });
      this.workers.push(w);
      // a worker that never answers (blocked module/wasm fetch, CSP, OOM) must not hang the loading screen
      setTimeout(() => reject(new Error('GI worker did not start within 30 s')), 30000);
    }))).then(() => undefined).catch((e) => { this.dispose(); this.ready = null; throw e; });
    return this.ready;
  }

  private call(w: Worker, msg: Record<string, unknown>, transfer: Transferable[] = []): Promise<any> {
    const job = ++this.job;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        if (!this.pending.delete(job)) return;
        reject(new Error(`GI worker job timed out after ${GIBaker.jobTimeoutMs / 1000} s`));
      }, GIBaker.jobTimeoutMs);
      this.pending.set(job, { resolve: (v) => { clearTimeout(timer); resolve(v); }, reject: (e) => { clearTimeout(timer); reject(e); } });
      w.postMessage({ ...msg, job }, transfer);
    });
  }

  /** Max time one slab job may take before the bake falls back to the main thread. */
  static jobTimeoutMs = 180000;

  private failAll(e: Error) { for (const p of this.pending.values()) p.reject(e); this.pending.clear(); }

  /** Run `jobs` z-slabs across the pool with a work queue (load balancing). */
  private async runSlabs(nz: number, mk: (z0: number, z1: number) => Record<string, unknown>, onSlab: (m: any) => void, onProgress?: (f: number) => void) {
    const slab = Math.max(1, Math.ceil(nz / (this.threads * 4)));
    const queue: [number, number][] = [];
    for (let z = 0; z < nz; z += slab) queue.push([z, Math.min(nz, z + slab)]);
    const total = queue.length;
    let done = 0;
    await Promise.all(this.workers.map(async (w) => {
      while (queue.length) {
        const [z0, z1] = queue.shift()!;
        onSlab(await this.call(w, mk(z0, z1)));
        onProgress?.(++done / total);
      }
    }));
  }

  async bake(grid: GIGrid, passes: number, onProgress?: (f: number, stage: string) => void): Promise<GIBakeResult> {
    const t0 = performance.now();
    this.busy = true;
    try {
      await this.init();
      const { nx, ny, nz } = grid;
      const n = nx * ny * nz, layer = nx * ny;
      const pos = new Float32Array(n * 3), valid = new Uint8Array(n);
      await this.runSlabs(nz, (z0, z1) => ({ type: 'pos', grid, z0, z1 }), (m) => { pos.set(m.pos, m.z0 * layer * 3); valid.set(m.valid, m.z0 * layer); },
        (f) => onProgress?.(f * 0.05, 'placing probes'));
      for (const w of this.workers) w.postMessage({ type: 'probes', pos, valid });
      let prev: Float32Array | null = null;
      for (let pass = 0; pass < passes; pass++) {
        const cur = new Float32Array(n * 12);
        const p = prev;
        await this.runSlabs(nz, (z0, z1) => ({ type: 'pass', grid, pass, prev: p, z0, z1 }), (m) => cur.set(m.data, m.z0 * layer * 12),
          (f) => onProgress?.(0.05 + 0.95 * ((pass + f) / passes), `bounce ${pass + 1} of ${passes}`));
        fillInvalid(cur, valid, nx, ny, nz);
        prev = cur;
      }
      let filled = 0;
      for (let i = 0; i < n; i++) if (!valid[i]) filled++;
      return { data: prev!, filled, ms: performance.now() - t0, threads: this.threads };
    } finally {
      this.busy = false;
    }
  }

  dispose() {
    for (const w of this.workers) w.terminate();
    this.workers = [];
    this.ready = null;
    this.pending.clear();
  }
}

/** Invalid (buried) probes take the average of valid 26-neighbours, repeated so pockets fill. */
export function fillInvalid(data: Float32Array, valid: Uint8Array, nx: number, ny: number, nz: number) {
  const ok = Uint8Array.from(valid);
  for (let it = 0; it < 4; it++) {
    let changed = false;
    const prevOk = Uint8Array.from(ok);
    const snap = data.slice();
    for (let z = 0; z < nz; z++) for (let y = 0; y < ny; y++) for (let x = 0; x < nx; x++) {
      const i = (z * ny + y) * nx + x;
      if (prevOk[i]) continue;
      const sum = new Float32Array(12);
      let cnt = 0;
      for (let dz = -1; dz <= 1; dz++) for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const X = x + dx, Y = y + dy, Z = z + dz;
        if (X < 0 || Y < 0 || Z < 0 || X >= nx || Y >= ny || Z >= nz) continue;
        const j = (Z * ny + Y) * nx + X;
        if (!prevOk[j]) continue;
        for (let k = 0; k < 12; k++) sum[k] += snap[j * 12 + k];
        cnt++;
      }
      if (cnt) { for (let k = 0; k < 12; k++) data[i * 12 + k] = sum[k] / cnt; ok[i] = 1; changed = true; }
    }
    if (!changed) break;
  }
}
