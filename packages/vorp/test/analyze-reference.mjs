// Numeric analysis of the reference WAVs (no dependencies):
//   node packages/vorp/test/analyze-reference.mjs <dir>                 table for one set of renders
//   node packages/vorp/test/analyze-reference.mjs <before_dir> <after_dir>   before → after table
// Metrics per file: peak dBFS, RMS over the first 50 ms and 1 s after onset, crest factor, spectral centroid,
// low-frequency (< 150 Hz) energy share, time from onset to −20 dB (20 ms RMS envelope), floor (last 200 ms).
// 08 (burst) also lists each shot's onset peak relative to the first.
import { readFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';

function readWav(path) {
  const b = readFileSync(path);
  const ch = b.readUInt16LE(22), sr = b.readUInt32LE(24), bits = b.readUInt16LE(34);
  let o = 12, data = null;
  while (o + 8 <= b.length) {
    const id = b.toString('ascii', o, o + 4), len = b.readUInt32LE(o + 4);
    if (id === 'data') { data = [o + 8, len]; break; }
    o += 8 + len;
  }
  const n = Math.floor(data[1] / (ch * bits / 8));
  const L = new Float32Array(n), R = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const p = data[0] + i * ch * 2;
    L[i] = b.readInt16LE(p) / 32768;
    R[i] = ch > 1 ? b.readInt16LE(p + 2) / 32768 : L[i];
  }
  return { sr, L, R };
}
const db = (x) => 20 * Math.log10(Math.max(x, 1e-9));
const pow = (L, R, a, b) => { let s = 0; for (let i = a; i < b; i++) s += 0.5 * (L[i] * L[i] + R[i] * R[i]); return s / Math.max(1, b - a); };
const rms = (L, R, a, b) => Math.sqrt(pow(L, R, a, b));

function fft(re, im) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = (-2 * Math.PI) / len, wr = Math.cos(ang), wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0;
      for (let k = 0; k < len / 2; k++) {
        const a = i + k, b = a + len / 2;
        const tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr;
        re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti;
        const ncr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = ncr;
      }
    }
  }
}

function analyze(path, opts = {}) {
  const { sr, L, R } = readWav(path);
  const n = L.length;
  let peak = 0;
  for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  const thr = peak * Math.pow(10, -30 / 20);
  let onset = 0;
  while (onset < n && Math.abs(L[onset]) < thr && Math.abs(R[onset]) < thr) onset++;
  const ms = (x) => Math.round((x * sr) / 1000);
  const r50 = rms(L, R, onset, Math.min(n, onset + ms(50)));
  const r1s = rms(L, R, onset, Math.min(n, onset + sr));
  // spectrum over 0.5 s from onset
  const N = 32768;
  const re = new Float64Array(N), im = new Float64Array(N);
  const span = Math.min(N, n - onset, Math.round(sr * 0.5));
  for (let i = 0; i < span; i++) { const w = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / span); re[i] = 0.5 * (L[onset + i] + R[onset + i]) * w; }
  fft(re, im);
  let num = 0, den = 0, lf = 0;
  for (let k = 1; k < N / 2; k++) {
    const f = (k * sr) / N, p = re[k] * re[k] + im[k] * im[k];
    num += f * p; den += p;
    if (f < 150) lf += p;
  }
  const centroid = num / Math.max(den, 1e-30), lfRatio = lf / Math.max(den, 1e-30);
  // envelope: 20 ms RMS every 5 ms from onset
  const hop = ms(5), win = ms(20);
  const env = [];
  for (let s = onset; s + win <= n; s += hop) env.push(db(rms(L, R, s, s + win)));
  let pi = 0;
  for (let i = 1; i < env.length; i++) if (env[i] > env[pi]) pi = i;
  const target = env[pi] - 20;
  let last = pi;
  const limit = Math.min(env.length, pi + Math.round((2.5 * sr) / hop));
  for (let i = pi; i < limit; i++) if (env[i] > target) last = i;
  const t20 = ((last - pi) * hop) / sr;
  const floor = db(rms(L, R, Math.max(0, n - ms(200)), n));
  const out = { file: basename(path), peak: db(peak), r50: db(r50), r1s: db(r1s), crest: db(peak) - db(r1s), centroid, lfRatio, t20, floor };
  if (opts.burst) {
    const { count, intervalMs } = opts.burst;
    const peaks = [];
    for (let k = 0; k < count; k++) {
      const a = onset + ms(k * intervalMs) - ms(3), b = onset + ms((k + 1) * intervalMs) - ms(3);
      let p = 0; for (let i = Math.max(0, a); i < Math.min(n, b); i++) p = Math.max(p, Math.abs(L[i]), Math.abs(R[i]));
      peaks.push(db(p));
    }
    out.burst = peaks.map((p) => p - peaks[0]);
  }
  return out;
}

const fmt = (r) => [r.peak.toFixed(1), r.r50.toFixed(1), r.r1s.toFixed(1), r.crest.toFixed(1), Math.round(r.centroid), (100 * r.lfRatio).toFixed(0) + '%', r.t20.toFixed(2), r.floor.toFixed(1)];
const HEAD = ['peak dBFS', 'RMS 50 ms', 'RMS 1 s', 'crest dB', 'centroid Hz', 'LF<150 Hz', 't −20 dB s', 'floor dBFS'];
const dirs = process.argv.slice(2);
if (!dirs.length) { console.error('usage: analyze-reference.mjs <dir> [after_dir]'); process.exit(2); }
const files = readdirSync(dirs[dirs.length - 1]).filter((f) => f.endsWith('.wav')).sort();
const optsFor = (f) => (f.startsWith('08') ? { burst: { count: 10, intervalMs: 75 } } : {});
if (dirs.length === 1) {
  console.log(`| file | ${HEAD.join(' | ')} |`);
  console.log(`|---|${HEAD.map(() => '---:').join('|')}|`);
  for (const f of files) {
    const r = analyze(join(dirs[0], f), optsFor(f));
    console.log(`| ${f} | ${fmt(r).join(' | ')} |`);
    if (r.burst) console.log(`|  ↳ onset peaks re. shot 1 (dB) | ${r.burst.map((x) => x.toFixed(1)).join(', ')} |`);
  }
} else {
  console.log(`| file | | ${HEAD.join(' | ')} |`);
  console.log(`|---|---|${HEAD.map(() => '---:').join('|')}|`);
  for (const f of files) {
    let before = null;
    try { before = analyze(join(dirs[0], f), optsFor(f)); } catch { /* new scenario */ }
    const after = analyze(join(dirs[1], f), optsFor(f));
    if (before) console.log(`| ${f} | before | ${fmt(before).join(' | ')} |`);
    console.log(`| ${before ? '' : f} | after | ${fmt(after).join(' | ')} |`);
    if (after.burst) {
      if (before?.burst) console.log(`|  ↳ onset peaks re. shot 1 (dB) | before | ${before.burst.map((x) => x.toFixed(1)).join(', ')} |`);
      console.log(`|  ↳ onset peaks re. shot 1 (dB) | after | ${after.burst.map((x) => x.toFixed(1)).join(', ')} |`);
    }
  }
}
