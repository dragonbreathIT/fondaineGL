// GI bake worker: owns a private copy of the static collision world (Rust/WASM BVH) and path-traces
// z-slabs of the irradiance-probe grid on request. Spawned by GIBaker, one per spare CPU core.

import { PhysicsWorld, GIGrid } from './physics';

let pw: PhysicsWorld | null = null;
let pos: Float32Array | null = null;
let valid: Uint8Array | null = null;

type Msg =
  | { type: 'init'; wasm: string; meshes: { positions: Float32Array; indices: Uint32Array; material: number }[] }
  | { type: 'pos'; grid: GIGrid; z0: number; z1: number; job: number }
  | { type: 'probes'; pos: Float32Array; valid: Uint8Array }
  | { type: 'pass'; grid: GIGrid; pass: number; prev: Float32Array | null; z0: number; z1: number; job: number };

const post = (m: unknown, t: Transferable[] = []) => (self as unknown as Worker).postMessage(m, t);

self.onmessage = async (ev: MessageEvent<Msg>) => {
  const m = ev.data;
  try {
    if (m.type === 'init') {
      pw = await PhysicsWorld.load(m.wasm);
      for (const s of m.meshes) pw.addStaticMesh(s.positions, s.indices, s.material);
      pw.build();
      post({ type: 'ready' });
    } else if (m.type === 'pos') {
      const n = m.grid.nx * m.grid.ny * m.grid.nz;
      const p = new Float32Array(n * 3), v = new Uint8Array(n);
      pw!.giPositions(m.grid, m.z0, m.z1, p, v);
      const lo = m.z0 * m.grid.nx * m.grid.ny, hi = Math.min(m.grid.nz, m.z1) * m.grid.nx * m.grid.ny;
      const ps = p.slice(lo * 3, hi * 3), vs = v.slice(lo, hi);
      post({ type: 'pos', job: m.job, z0: m.z0, z1: m.z1, pos: ps, valid: vs }, [ps.buffer, vs.buffer]);
    } else if (m.type === 'probes') {
      pos = m.pos; valid = m.valid;
    } else if (m.type === 'pass') {
      const n = m.grid.nx * m.grid.ny * m.grid.nz;
      const out = new Float32Array(n * 12);
      pw!.giPass(m.grid, m.pass, pos!, valid!, m.prev, m.z0, m.z1, out);
      const lo = m.z0 * m.grid.nx * m.grid.ny, hi = Math.min(m.grid.nz, m.z1) * m.grid.nx * m.grid.ny;
      const slab = out.slice(lo * 12, hi * 12);
      post({ type: 'pass', job: m.job, z0: m.z0, z1: m.z1, data: slab }, [slab.buffer]);
    }
  } catch (e) {
    post({ type: 'error', message: String((e as Error)?.stack ?? e) });
  }
};
