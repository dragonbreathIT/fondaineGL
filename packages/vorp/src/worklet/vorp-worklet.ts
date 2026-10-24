// vorp AudioWorklet processor: hosts the vorp-dsp WebAssembly engine on the real-time audio thread.
// Bundled separately (AudioWorkletGlobalScope has no DOM / module imports of app code).

/* eslint-disable @typescript-eslint/no-explicit-any */
declare const sampleRate: number;
declare function registerProcessor(name: string, ctor: any): void;
declare class AudioWorkletProcessor {
  readonly port: MessagePort;
  constructor(options?: any);
}

interface VorpExports {
  memory: WebAssembly.Memory;
  vorp_create(sr: number): number;
  vorp_alloc(bytes: number): number;
  vorp_free(ptr: number, bytes: number): void;
  vorp_cmd_ptr(): number;
  vorp_cmd_capacity(): number;
  vorp_exec(len: number): void;
  vorp_process(): number;
  vorp_meters_ptr(): number;
  vorp_sample_set(id: number, ptr: number, len: number): void;
  vorp_ir_set(l: number, r: number, len: number): void;
}

class VorpProcessor extends AudioWorkletProcessor {
  private ex: VorpExports | null = null;
  private blocks = 0;
  private meterEvery = 12;
  private pending: Float32Array[] = [];
  private cpuAcc = 0;
  private errors = 0;

  constructor(options: { processorOptions: { module: WebAssembly.Module } }) {
    super(options);
    try {
      const inst = new WebAssembly.Instance(options.processorOptions.module, {});
      this.ex = inst.exports as unknown as VorpExports;
      this.ex.vorp_create(sampleRate);
      this.port.postMessage({ type: 'ready', sampleRate });
    } catch (e) {
      this.port.postMessage({ type: 'error', message: String(e) });
    }
    this.port.onmessage = (ev: MessageEvent) => this.onMessage(ev.data);
  }

  private f32(ptr: number, len: number) { return new Float32Array(this.ex!.memory.buffer, ptr, len); }

  private onMessage(msg: any) {
    const ex = this.ex;
    if (!ex) return;
    switch (msg.type) {
      case 'cmd': this.pending.push(msg.data as Float32Array); break;
      case 'sample': {
        const data = msg.data as Float32Array;
        const ptr = ex.vorp_alloc(data.length * 4);
        this.f32(ptr, data.length).set(data);
        ex.vorp_sample_set(msg.id, ptr, data.length);
        ex.vorp_free(ptr, data.length * 4);
        break;
      }
      case 'ir': {
        const l = msg.left as Float32Array | null, r = msg.right as Float32Array | null;
        if (!l) { ex.vorp_ir_set(0, 0, 0); break; }
        const pl = ex.vorp_alloc(l.length * 4);
        this.f32(pl, l.length).set(l);
        let pr = 0;
        if (r) { pr = ex.vorp_alloc(r.length * 4); this.f32(pr, r.length).set(r); }
        ex.vorp_ir_set(pl, pr, l.length);
        ex.vorp_free(pl, l.length * 4);
        if (pr) ex.vorp_free(pr, r!.length * 4);
        break;
      }
      case 'meters': this.meterEvery = Math.max(1, msg.every | 0); break;
    }
  }

  private flushCommands() {
    const ex = this.ex!;
    if (!this.pending.length) return;
    const cap = ex.vorp_cmd_capacity();
    for (const data of this.pending) {
      // commands are self-delimiting; send in capacity-sized chunks on record boundaries
      let off = 0;
      while (off < data.length) {
        let end = off;
        while (end < data.length) {
          const n = data[end + 1] | 0;
          if (end + 2 + n - off > cap) break;
          end += 2 + n;
        }
        if (end === off) break; // a single record larger than the buffer: drop it
        this.f32(ex.vorp_cmd_ptr(), end - off).set(data.subarray(off, end));
        ex.vorp_exec(end - off);
        off = end;
      }
    }
    this.pending.length = 0;
  }

  process(_inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const ex = this.ex;
    const out = outputs[0];
    if (!ex || !out || out.length === 0) return true;
    const t0 = (globalThis as any).performance?.now?.() ?? 0;
    try {
      this.flushCommands();
      const ptr = ex.vorp_process();
      const buf = this.f32(ptr, 256);
      const n = out[0].length;
      out[0].set(buf.subarray(0, n));
      if (out.length > 1) out[1].set(buf.subarray(128, 128 + n));
    } catch (e) {
      if (this.errors++ < 3) this.port.postMessage({ type: 'error', message: String(e) });
      return true;
    }
    const t1 = (globalThis as any).performance?.now?.() ?? 0;
    this.cpuAcc += t1 - t0;
    if (++this.blocks % this.meterEvery === 0) {
      const m = this.f32(ex.vorp_meters_ptr(), 16).slice();
      const blockMs = (128 / sampleRate) * 1000 * this.meterEvery;
      this.port.postMessage({ type: 'meters', meters: m, cpu: this.cpuAcc / blockMs });
      this.cpuAcc = 0;
    }
    return true;
  }
}

registerProcessor('vorp', VorpProcessor);
