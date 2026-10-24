// Envelope + band breakdown of one WAV: node packages/vorp/test/detail-reference.mjs file.wav [seconds=1.2]
import { readFileSync } from 'node:fs';
const b = readFileSync(process.argv[2]);
const secs = Number(process.argv[3] ?? 1.2);
const sr = b.readUInt32LE(24);
let o = 12, d = null;
while (o + 8 <= b.length) { const id = b.toString('ascii', o, o + 4), len = b.readUInt32LE(o + 4); if (id === 'data') { d = [o + 8, len]; break; } o += 8 + len; }
const n = Math.floor(d[1] / 4);
const x = new Float32Array(n);
for (let i = 0; i < n; i++) x[i] = 0.5 * (b.readInt16LE(d[0] + i * 4) + b.readInt16LE(d[0] + i * 4 + 2)) / 32768;
const db = (v) => (20 * Math.log10(Math.max(v, 1e-9))).toFixed(1);
let peak = 0; for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(x[i]));
let on = 0; while (on < n && Math.abs(x[on]) < peak * 0.03) on++;
console.log(`onset ${(on / sr).toFixed(3)} s, peak ${db(peak)} dBFS`);
// 1 ms peaks for the first 12 ms, then 10 ms RMS
let line = 'first 12 ms (1 ms peaks): ';
for (let k = 0; k < 12; k++) { let p = 0; for (let i = on + k * sr / 1000; i < on + (k + 1) * sr / 1000; i++) p = Math.max(p, Math.abs(x[i | 0] ?? 0)); line += db(p) + ' '; }
console.log(line);
line = 'RMS per 10 ms: ';
const hop = sr / 100;
for (let k = 0; k < secs * 100; k++) {
  let s = 0; const a = on + k * hop; for (let i = a; i < a + hop && i < n; i++) s += x[i | 0] * x[i | 0];
  line += db(Math.sqrt(s / hop)) + (k % 10 === 9 ? ' |' : ' ');
}
console.log(line);
// band energies over the first 300 ms (biquad-free: DFT bins)
const N = 16384; const re = new Float64Array(N), im = new Float64Array(N);
for (let i = 0; i < Math.min(N, n - on); i++) re[i] = x[on + i] * (0.5 - 0.5 * Math.cos(2 * Math.PI * i / N));
(function fft(re, im) { const n = re.length; for (let i = 1, j = 0; i < n; i++) { let bit = n >> 1; for (; j & bit; bit >>= 1) j ^= bit; j ^= bit; if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; } } for (let len = 2; len <= n; len <<= 1) { const ang = -2 * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang); for (let i = 0; i < n; i += len) { let cr = 1, ci = 0; for (let k = 0; k < len / 2; k++) { const a = i + k, bb = a + len / 2; const tr = re[bb] * cr - im[bb] * ci, ti = re[bb] * ci + im[bb] * cr; re[bb] = re[a] - tr; im[bb] = im[a] - ti; re[a] += tr; im[a] += ti; const ncr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = ncr; } } } })(re, im);
const edges = [20, 60, 150, 400, 1000, 2500, 5000, 10000, 20000];
const e = new Array(edges.length - 1).fill(0); let tot = 0;
for (let k = 1; k < N / 2; k++) { const f = k * sr / N, p = re[k] ** 2 + im[k] ** 2; tot += p; for (let j = 0; j < e.length; j++) if (f >= edges[j] && f < edges[j + 1]) e[j] += p; }
console.log('bands (first 340 ms, dB re total): ' + e.map((v, j) => `${edges[j]}-${edges[j + 1]}: ${(10 * Math.log10(v / tot + 1e-12)).toFixed(1)}`).join('  '));
