#!/usr/bin/env node
// fondaine sound fetcher — recorded, licence-clean sounds for vorp, written to assets/sounds/ + manifest.json
// (`sounds` section) + CREDITS.md. The engine keeps synthesizing everything that is not downloaded.
//
//   node tools/fetch-sounds.mjs                         default set: verified CC0 recordings from OpenGameArt (no account),
//                                                       plus the Freesound set when FREESOUND_TOKEN is set
//   node tools/fetch-sounds.mjs search "ar-15 gunshot" [--license cc0|by] [--max 20]     Freesound search (needs token)
//   node tools/fetch-sounds.mjs get <freesoundId> --slot shot.rifle556 [--split shots] [--max-s 2.5]
//   node tools/fetch-sounds.mjs oga <page-slug> --slot <slot> [--file <regex>] [--inner <regex>] [--split shots|events] [--loop]
//   node tools/fetch-sounds.mjs local <file> --slot <slot> --license CC0|CC-BY-4.0 --author "…" --title "…" --url "…"
//   node tools/fetch-sounds.mjs list | credits | remove <slot> | clean
//
// Licences: only CC0 and CC-BY are accepted — the licence is read from the source itself (Freesound's `license`
// field, the licence block of the OpenGameArt page) at download time and recorded per file (slot, title, author,
// licence, URL, source id) so assets/CREDITS.md is exact. When nothing can be verified the tool writes nothing.
//
// Freesound: a free account's API token (freesound.org → your profile → API credentials) downloads the HQ OGG
// previews (128 kbps, plenty for a gunshot through the vorp chain); originals need OAuth and are not used.
//
// Processing: everything becomes 48 kHz mono 16-bit WAV (ffmpeg when installed, a built-in WAV decoder otherwise;
// OGG/MP3 without ffmpeg are kept as-is and decoded by the browser), leading silence trimmed, peak normalised to
// −1 dBFS, multi-take recordings split into one file per shot (`shot.rifle556.01`, `.02`, …). Slots are families:
// vorp picks a random member per event, never the same twice in a row.
//
// Slots the engine uses (see packages/vorp/src/presets.ts):
//   shot.rifle556 / .mid / .auto / .suppressed, shot.pistol9 / .mid / .suppressed, shot.smg9, shot.rifle3006, shot.suppressed
//   mech.magRelease magOut magDropConcrete magDropDirt magSeat slideRack slideStop slideHome chargingHandle boltCatch selector dryFire
//   impact.<material> (steel, concrete, dirt, …)   casing.concrete   step.<surface> (gravel, concrete, dirt, grass, wood)
//   crack.bullet   amb.wind   amb.birds   (anything else is registered and available to `vorp.sampleAt(slot, …)`)

import { mkdirSync, writeFileSync, readFileSync, existsSync, statSync, readdirSync, rmSync, copyFileSync } from 'node:fs';
import { dirname, join, resolve, basename, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = join(root, 'assets');
const SOUNDS = join(ASSETS, 'sounds');
const CACHE = join(ASSETS, '.cache', 'sounds');
const MANIFEST = join(ASSETS, 'manifest.json');
const UA = { 'User-Agent': 'Mozilla/5.0 fondaine-sound-fetcher/1.0 (+https://github.com/)' };
const TOKEN = process.env.FREESOUND_TOKEN;
const SR = 48000;

// ------------------------------------------------------------------------------------------- curated sets
/**
 * OpenGameArt entries (licence verified on the page at fetch time; the page must declare CC0 or CC-BY).
 * `files` match attachment URLs; `archive` entries are extracted and `picks` match paths inside the archive.
 * `split: 'shots'` cuts a multi-take recording into one file per shot; `events` is the same for clicks.
 */
const OGA_SET = [
  {
    page: 'the-free-firearm-sound-library',
    // "Our team holds CC0 NO RIGHTS RESERVED for this library" — real recordings, several takes per file (near = L/R
    // mics in front of the shooter, mid = forward/back mics further out: the natural `shotTail` layer)
    author: 'Ben Jaszczak, Brian Nelson, Kevin Heras, Matthew Nanney (The Free Firearm Sound Library)',
    archive: /Prepared SFX Library\.7z$/i,
    picks: [
      { inner: /AR-15\/D_32P\.wav$/i, slot: 'shot.rifle556', split: 'shots', maxS: 2.5, title: 'AR-15 5.56×45, near' },
      { inner: /AR-15\/D_24P\.wav$/i, slot: 'shot.rifle556.mid', split: 'shots', maxS: 3, title: 'AR-15 5.56×45, mid distance' },
      { inner: /Walther PPQ\/X_39P\.wav$/i, slot: 'shot.pistol9', split: 'shots', maxS: 2.2, title: 'Walther PPQ 9 mm, near' },
      { inner: /Walther PPQ\/X_31P\.wav$/i, slot: 'shot.pistol9.mid', split: 'shots', maxS: 2.5, title: 'Walther PPQ 9 mm, mid distance' },
      { inner: /Carl Gustav M45\/G_31P\.wav$/i, slot: 'shot.smg9', split: 'shots', maxS: 2.2, title: 'Carl Gustav M45 9 mm, near' },
      { inner: /Tikka\/W_29P\.wav$/i, slot: 'shot.rifle3006', split: 'shots', maxS: 2.8, title: 'Tikka T3 .30-06, near' },
      { inner: /Tikka\/W_24P\.wav$/i, slot: 'shot.rifle3006.mid', split: 'shots', maxS: 3, title: 'Tikka T3 .30-06, mid distance' },
      { inner: /AK-47\/C_28P\.wav$/i, slot: 'shot.rifle762', split: 'shots', maxS: 2.5, title: 'AK-47 7.62×39, near' },
      { inner: /1911\/A_42P\.wav$/i, slot: 'shot.pistol45', split: 'shots', maxS: 2.2, title: 'M1911 .45 ACP, near' },
    ],
  },
  { page: 'gun-reload-sound-effects', files: [
    { match: /clipload1\.wav$/i, slot: 'mech.magSeat', maxS: 0.6, title: 'Magazine load 1' },
    { match: /clipload2\.wav$/i, slot: 'mech.magSeat', maxS: 0.6, title: 'Magazine load 2' },
    { match: /singlebullet1\.wav$/i, slot: 'casing.concrete', maxS: 0.5, title: 'Single bullet drop' },
  ] },
  { page: 'metal-impact-sounds', files: [
    { match: /clink1_0\.wav$/i, slot: 'casing.concrete', maxS: 0.5, title: 'Clink 1' },
    { match: /clink2\.wav$/i, slot: 'casing.concrete', maxS: 0.5, title: 'Clink 2' },
    { match: /clink3\.wav$/i, slot: 'casing.concrete', maxS: 0.5, title: 'Clink 3' },
    { match: /bing1\.wav$/i, slot: 'impact.steel', maxS: 1.0, title: 'Bing' },
  ] },
  { page: '75-cc0-breaking-falling-hit-sfx', archive: /sfx_breaking_and_falling\.zip$/i, picks: [
    { inner: /bfh1_metal_hit_0[2-6]\.ogg$/i, slot: 'impact.steel', maxS: 0.8, title: 'Metal hit' },
    { inner: /bfh1_rock_hit_01\.ogg$/i, slot: 'impact.concrete', maxS: 0.8, title: 'Rock hit' },
    { inner: /bfh1_wood_hit_0[1-3]\.ogg$/i, slot: 'impact.wood', maxS: 0.8, title: 'Wood hit' },
  ] },
  { page: 'different-steps-on-wood-stone-leaves-gravel-and-mud', archive: /DifferentSteps.*\.zip$/i, picks: [
    { inner: /gravel\.ogg$/i, slot: 'step.gravel', maxS: 1.0, title: 'Step on gravel' },
    { inner: /stone01\.ogg$/i, slot: 'step.concrete', maxS: 0.6, title: 'Step on stone' },
    { inner: /wood0[1-3]\.ogg$/i, slot: 'step.wood', maxS: 0.6, title: 'Step on wood' },
    { inner: /mud02\.ogg$/i, slot: 'step.dirt', maxS: 0.6, title: 'Step in mud' },
    { inner: /leaves0[12]\.ogg$/i, slot: 'step.grass', maxS: 0.6, title: 'Step on leaves' },
  ] },
  { page: 'ambient-bird-sounds', files: [{ match: /birds-isaiah658.*\.ogg$/i, slot: 'amb.birds', loop: true, maxS: 30, title: 'Ambient birds' }] },
  { page: 'windy-ambient-noise', files: [{ match: /windy_ambiance.*\.ogg$/i, slot: 'amb.wind', loop: true, maxS: 30, title: 'Windy ambience' }] },
];

/** Freesound queries (needs FREESOUND_TOKEN). CC0 first, CC-BY as second choice; picked by rating × downloads. */
const FREESOUND_SET = [
  { slot: 'shot.rifle556', query: 'AR-15 5.56 rifle gunshot single', dur: [0.3, 5], n: 3, reject: /loop|music|synth|8.?bit|retro|laser|burst|auto/i },
  { slot: 'shot.pistol9', query: '9mm pistol gunshot single', dur: [0.3, 4], n: 3, reject: /loop|music|synth|8.?bit|retro|laser|burst|auto/i },
  { slot: 'shot.rifle556.auto', query: 'rifle full auto burst', dur: [0.5, 8], n: 2, reject: /loop|music|synth|8.?bit|retro|laser/i },
  { slot: 'shot.suppressed', query: 'suppressed gunshot silencer', dur: [0.2, 4], n: 2, reject: /loop|music|synth|8.?bit|retro|laser|hollywood|movie/i },
  { slot: 'crack.bullet', query: 'bullet whiz crack flyby', dur: [0.1, 3], n: 3, reject: /loop|music|synth|laser|whoosh/i },
  { slot: 'impact.steel', query: 'bullet steel plate hit ricochet', dur: [0.1, 3], n: 3, reject: /loop|music|synth/i },
  { slot: 'mech.magRelease', query: 'pistol magazine release', dur: [0.05, 2], n: 2, reject: /loop|music|synth|insert|reload/i },
  { slot: 'mech.magSeat', query: 'rifle magazine insert', dur: [0.05, 2], n: 2, reject: /loop|music|synth|release|reload/i },
  { slot: 'mech.slideRack', query: 'pistol slide rack', dur: [0.1, 2], n: 2, reject: /loop|music|synth|reload/i },
  { slot: 'mech.chargingHandle', query: 'AR-15 charging handle', dur: [0.1, 2.5], n: 2, reject: /loop|music|synth|reload/i },
  { slot: 'mech.boltCatch', query: 'rifle bolt release', dur: [0.05, 2], n: 2, reject: /loop|music|synth|reload/i },
  { slot: 'mech.dryFire', query: 'pistol dry fire trigger click', dur: [0.05, 1.5], n: 2, reject: /loop|music|synth|reload/i },
  { slot: 'casing.concrete', query: 'brass casing concrete', dur: [0.1, 3], n: 3, reject: /loop|music|synth/i },
  { slot: 'step.gravel', query: 'single footstep gravel', dur: [0.1, 2], n: 3, reject: /loop|music|synth|running|walk/i },
  { slot: 'step.concrete', query: 'single footstep concrete', dur: [0.1, 2], n: 3, reject: /loop|music|synth|running|walk/i },
  { slot: 'amb.wind', query: 'outdoor wind ambience field', dur: [20, 180], n: 1, loop: true, maxS: 40, reject: /music|synth|storm|howl/i },
  { slot: 'amb.birds', query: 'distant birds ambience countryside', dur: [20, 180], n: 1, loop: true, maxS: 40, reject: /music|synth|city|traffic/i },
];

// ------------------------------------------------------------------------------------------- cli helpers
const args = process.argv.slice(2);
const flag = (name, def) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : def; };
const has = (name) => args.includes(`--${name}`);
const positional = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--') && !['no-oga', 'loop', 'force'].includes(args[i - 1].slice(2))));
const log = (...m) => console.log('[fetch-sounds]', ...m);
const dB = (x) => 20 * Math.log10(Math.max(x, 1e-9));

// ------------------------------------------------------------------------------------------- licences
/** Normalises a licence name / URL to 'CC0' | 'CC-BY-x.y'; anything else (NC, SA, unknown) → null. */
function normaliseLicense(s) {
  const t = String(s ?? '').trim();
  if (/publicdomain\/zero|creative commons 0|^cc0$|^cc-?0\b/i.test(t)) return 'CC0';
  const m = t.match(/licenses\/by\/(\d\.\d)/i) ?? t.match(/^cc[- ]?by[- ]?(\d\.\d)?$/i) ?? (/^attribution$/i.test(t) ? ['', ''] : null);
  if (m && !/nc|nd|sa|noncommercial|sharealike|noderiv/i.test(t)) return m[1] ? `CC-BY-${m[1]}` : 'CC-BY';
  return null;
}

// ------------------------------------------------------------------------------------------- http
async function getText(url, headers = {}) {
  const r = await fetch(url, { headers: { ...UA, ...headers } });
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}${(r.status === 401 || r.status === 403) && /freesound/.test(url) ? ' (Freesound rejected the token — check FREESOUND_TOKEN)' : ''}`);
  return r.text();
}
async function getJSON(url, headers = {}) { return JSON.parse(await getText(url, headers)); }
/** Download into the cache (assets/.cache/sounds/<name>), skipping files already there. */
async function download(url, name, headers = {}) {
  const dest = join(CACHE, name);
  if (existsSync(dest) && statSync(dest).size > 0) return dest;
  mkdirSync(CACHE, { recursive: true });
  const r = await fetch(url, { headers: { ...UA, ...headers } });
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  writeFileSync(dest, buf);
  log(`  ↓ ${name} (${(buf.length / 1048576).toFixed(1)} MB)`);
  return dest;
}

// ------------------------------------------------------------------------------------------- archives
function unzipJS(buf, outDir) {
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error('not a zip');
  const n = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const out = [];
  for (let i = 0; i < n; i++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) break;
    const method = buf.readUInt16LE(p + 10), csize = buf.readUInt32LE(p + 20), nlen = buf.readUInt16LE(p + 28), elen = buf.readUInt16LE(p + 30), clen = buf.readUInt16LE(p + 32);
    const lho = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nlen);
    p += 46 + nlen + elen + clen;
    if (name.endsWith('/') || name.includes('..')) continue;
    const lnlen = buf.readUInt16LE(lho + 26), lelen = buf.readUInt16LE(lho + 28);
    const start = lho + 30 + lnlen + lelen;
    const raw = buf.subarray(start, start + csize);
    const data = method === 8 ? inflateRawSync(raw) : raw;
    const dest = join(outDir, name);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, data);
    out.push(dest);
  }
  return out;
}
function listFiles(dir) {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...listFiles(p)); else out.push(p);
  }
  return out;
}
/** Extracts a .zip / .7z next to the cache (once) and returns every extracted file path. */
function extractArchive(file) {
  const outDir = join(CACHE, 'x', basename(file));
  if (existsSync(outDir) && listFiles(outDir).length) return listFiles(outDir);
  mkdirSync(outDir, { recursive: true });
  log(`  extracting ${basename(file)}…`);
  if (/\.zip$/i.test(file)) { unzipJS(readFileSync(file), outDir); return listFiles(outDir); }
  if (/\.7z$/i.test(file)) {
    for (const bin of ['7z', '7za', '7zr']) {
      const r = spawnSync(bin, ['x', '-y', `-o${outDir}`, file], { stdio: 'ignore' });
      if (r.status === 0) return listFiles(outDir);
    }
    const py = spawnSync('python3', ['-I', '-c', 'import sys, py7zr\nwith py7zr.SevenZipFile(sys.argv[1], "r") as z: z.extractall(path=sys.argv[2])', file, outDir], { stdio: 'ignore' });
    if (py.status === 0) return listFiles(outDir);
    throw new Error('no 7z extractor: install 7-Zip / p7zip (`7z` on PATH) or `pip install py7zr`');
  }
  throw new Error(`unknown archive type ${extname(file)}`);
}

// ------------------------------------------------------------------------------------------- audio
const ffmpeg = (() => { const r = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }); return r.status === 0; })();

/** Decodes any audio file to mono float at 48 kHz (ffmpeg; WAV also without it). Returns null when impossible. */
function decodeMono(file, maxS) {
  if (ffmpeg) {
    const a = ['-v', 'error', '-nostdin', '-i', file, ...(maxS ? ['-t', String(maxS + 2)] : []), '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'];
    const r = spawnSync('ffmpeg', a, { maxBuffer: 1 << 30 });
    if (r.status === 0 && r.stdout.length >= 8) return new Float32Array(r.stdout.buffer, r.stdout.byteOffset, r.stdout.length >> 2).slice();
    throw new Error(`ffmpeg failed on ${basename(file)}: ${r.stderr?.toString().trim().slice(0, 200)}`);
  }
  if (!/\.wav$/i.test(file)) return null;
  const { sampleRate, channels } = decodeWav(readFileSync(file));
  const n = channels[0].length;
  const mono = new Float32Array(n);
  for (const ch of channels) for (let i = 0; i < n; i++) mono[i] += ch[i] / channels.length;
  if (sampleRate === SR) return mono;
  const m = Math.round((n * SR) / sampleRate), step = sampleRate / SR, out = new Float32Array(m);
  for (let i = 0; i < m; i++) { const x = i * step, j = Math.min(n - 1, x | 0), f = x - j; out[i] = mono[j] + (mono[Math.min(n - 1, j + 1)] - mono[j]) * f; }
  return out;
}
function decodeWav(b) {
  const v = new DataView(b.buffer, b.byteOffset, b.byteLength);
  const tag = (o) => b.toString('ascii', o, o + 4);
  if (tag(0) !== 'RIFF' || tag(8) !== 'WAVE') throw new Error('not a WAV file');
  let o = 12, fmt = null, data = null;
  while (o + 8 <= b.length) {
    const id = tag(o), len = v.getUint32(o + 4, true);
    if (id === 'fmt ') { let format = v.getUint16(o + 8, true); if (format === 0xfffe && len >= 26) format = v.getUint16(o + 32, true); fmt = { format, channels: v.getUint16(o + 10, true), sampleRate: v.getUint32(o + 12, true), bits: v.getUint16(o + 22, true) }; }
    else if (id === 'data') { data = [o + 8, Math.min(len, b.length - o - 8)]; break; }
    o += 8 + len + (len & 1);
  }
  if (!fmt || !data) throw new Error('WAV without fmt/data');
  const bps = fmt.bits / 8, frames = Math.floor(data[1] / (bps * fmt.channels));
  const channels = Array.from({ length: fmt.channels }, () => new Float32Array(frames));
  for (let i = 0; i < frames; i++) for (let c = 0; c < fmt.channels; c++) {
    const p = data[0] + (i * fmt.channels + c) * bps;
    let x;
    if (fmt.format === 3) x = fmt.bits === 64 ? v.getFloat64(p, true) : v.getFloat32(p, true);
    else if (fmt.bits === 8) x = (v.getUint8(p) - 128) / 128;
    else if (fmt.bits === 16) x = v.getInt16(p, true) / 32768;
    else if (fmt.bits === 24) x = ((v.getUint8(p) | (v.getUint8(p + 1) << 8) | (v.getInt8(p + 2) << 16)) << 8) / 2147483648;
    else x = v.getInt32(p, true) / 2147483648;
    channels[c][i] = x;
  }
  return { sampleRate: fmt.sampleRate, channels };
}
function writeWav16(path, data) {
  const n = data.length, buf = Buffer.alloc(44 + n * 2);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write('WAVE', 8); buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22); buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, data[i])) * 32767), 44 + i * 2);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, buf);
}

const FRAME = SR / 200; // 5 ms envelope frames
function envelope(x) {
  const n = Math.ceil(x.length / FRAME), e = new Float32Array(n);
  for (let k = 0; k < n; k++) { let s = 0; const a = k * FRAME, b = Math.min(x.length, a + FRAME); for (let i = a; i < b; i++) s += x[i] * x[i]; e[k] = Math.sqrt(s / Math.max(1, b - a)); }
  return e;
}
/** Onsets (sample index) of separate events: envelope rises within 30 dB of the file peak after ≥150 ms of quiet. */
function findOnsets(x) {
  const e = envelope(x);
  let peak = 0; for (const v of e) peak = Math.max(peak, v);
  const on = peak * Math.pow(10, -30 / 20), off = peak * Math.pow(10, -52 / 20);
  const out = []; let quiet = 30, armed = true;
  for (let k = 0; k < e.length; k++) {
    if (e[k] < off) quiet++; else quiet = 0;
    if (quiet >= 30) armed = true;
    if (armed && e[k] > on) { out.push(k * FRAME); armed = false; }
  }
  return out;
}
/** Trims leading (−40 dB re peak, 3 ms pre-roll) and trailing (−66 dB re peak) silence, caps the length with a fade, normalises to −1 dBFS. */
function condition(x, maxS, { fadeMs = 30 } = {}) {
  let peak = 0; for (let i = 0; i < x.length; i++) peak = Math.max(peak, Math.abs(x[i]));
  if (peak < 1e-5) return null;
  const lead = peak * Math.pow(10, -40 / 20), tail = peak * Math.pow(10, -66 / 20);
  let a = 0; while (a < x.length && Math.abs(x[a]) < lead) a++;
  a = Math.max(0, a - Math.round(0.003 * SR));
  let b = x.length; while (b > a && Math.abs(x[b - 1]) < tail) b--;
  b = Math.min(x.length, b + Math.round(0.02 * SR));
  if (maxS) b = Math.min(b, a + Math.round(maxS * SR));
  const out = x.slice(a, b);
  const f = Math.min(out.length >> 1, Math.round((fadeMs / 1000) * SR));
  for (let i = 0; i < f; i++) out[out.length - 1 - i] *= i / f;
  const g = Math.pow(10, -1 / 20) / peak;
  for (let i = 0; i < out.length; i++) out[i] *= g;
  return out;
}
/** Seamless loop of `seconds`: the second after the cut is cross-faded into the start; normalised to −1 dBFS. */
function loopify(x, seconds) {
  const n = Math.min(x.length, Math.round(seconds * SR)), xf = Math.min(Math.round(SR * 1.0), x.length - n, n >> 1);
  const out = x.slice(0, n);
  for (let i = 0; i < xf; i++) { const t = i / xf; out[i] = out[i] * t + x[n + i] * (1 - t); }
  let peak = 0; for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(out[i]));
  const g = Math.pow(10, -1 / 20) / Math.max(peak, 1e-6);
  for (let i = 0; i < n; i++) out[i] *= g;
  return out;
}

// ------------------------------------------------------------------------------------------- manifest
function loadManifest() {
  const m = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {};
  return { version: 1, textures: {}, models: {}, ...m, sounds: m.sounds ?? {} };
}
function saveManifest(m) { mkdirSync(ASSETS, { recursive: true }); writeFileSync(MANIFEST, JSON.stringify(m, null, 2)); writeCredits(m); }
function writeCredits(m) {
  // same table as tools/fetch-assets.mjs — keep both in sync
  const esc = (x) => String(x ?? '').replace(/\|/g, '\\|');
  const lines = ['# Asset credits', '', 'Downloaded by `tools/fetch-assets.mjs` (textures, models) and `tools/fetch-sounds.mjs` (sounds). Only CC0 and CC-BY content is accepted; CC-BY assets require this attribution when you ship. Nothing in this folder is committed.', ''];
  for (const [title, rows] of [['Textures', m.textures ?? {}], ['Models', m.models ?? {}], ['Sounds', m.sounds ?? {}]]) {
    const entries = Object.entries(rows);
    if (!entries.length) continue;
    lines.push(`## ${title}`, '', '| Slot | Asset | Author | Licence | Link |', '|---|---|---|---|---|');
    for (const [slot, e] of entries) lines.push(`| ${esc(slot)} | ${esc(e.title)} | ${esc(e.author)} | ${esc(e.license)} | ${esc(e.url)} |`);
    lines.push('');
  }
  writeFileSync(join(ASSETS, 'CREDITS.md'), lines.join('\n'));
}
/** Next free numbered member of a slot family (`shot.rifle556` → `shot.rifle556.03`). */
function nextSlot(m, family) {
  let max = 0;
  for (const s of Object.keys(m.sounds)) {
    if (s === family) max = Math.max(max, 1);
    else if (s.startsWith(family + '.') && /^\d+$/.test(s.slice(family.length + 1))) max = Math.max(max, Number(s.slice(family.length + 1)));
  }
  return `${family}.${String(max + 1).padStart(2, '0')}`;
}
const hasOrigin = (m, origin) => Object.values(m.sounds).some((e) => e.origin === origin);

/**
 * Converts one source file into manifest entries: whole file (one slot), split into takes (one slot per event),
 * or a seamless loop. `credit` = { license, author, title, url, source, id }. Returns the slots written.
 */
function register(m, srcFile, family, credit, { split, maxS, loop, origin } = {}) {
  const written = [];
  const add = (data, keepExt) => {
    const slot = nextSlot(m, family);
    let file;
    if (data) { file = `sounds/${slot}.wav`; writeWav16(join(ASSETS, file), data); }
    else { file = `sounds/${slot}${extname(srcFile).toLowerCase()}`; mkdirSync(SOUNDS, { recursive: true }); copyFileSync(srcFile, join(ASSETS, file)); }
    const peak = data ? data.reduce((p, v) => Math.max(p, Math.abs(v)), 0) : null;
    m.sounds[slot] = {
      file, license: credit.license, author: credit.author, title: credit.title, url: credit.url, source: credit.source, id: credit.id,
      gainDb: 0, trimMs: 0, ...(loop ? { loop: true } : {}),
      ...(data ? { durationS: Math.round((data.length / SR) * 1000) / 1000, sampleRate: SR, peakDbfs: Math.round(dB(peak) * 10) / 10 } : { note: keepExt }),
      origin,
    };
    written.push(slot);
  };
  const mono = decodeMono(srcFile, loop ? (maxS ?? 30) + 2 : undefined);
  if (!mono) { add(null, 'kept as-is (no ffmpeg): decoded by the browser, not normalised'); return written; }
  if (loop) { add(loopify(mono, maxS ?? 30)); return written; }
  if (split) {
    const onsets = findOnsets(mono);
    const segs = onsets.map((o, i) => {
      const a = Math.max(0, o - Math.round(0.008 * SR));
      const b = i + 1 < onsets.length ? Math.max(a + SR / 10, onsets[i + 1] - Math.round(0.03 * SR)) : mono.length;
      return condition(mono.subarray(a, Math.min(b, a + Math.round((maxS ?? 3) * SR) + SR)), maxS ?? 3);
    }).filter((s) => s && s.length > SR * 0.03);
    if (!segs.length) throw new Error('no events found to split');
    for (const s of segs) add(s);
    return written;
  }
  const c = condition(mono, maxS);
  if (!c) throw new Error('silent file');
  add(c);
  return written;
}

// ------------------------------------------------------------------------------------------- OpenGameArt
const strip = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#039;|&quot;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
/** Reads an OpenGameArt content page: title, author, declared licences, attachment URLs. */
async function ogaPage(slug) {
  const url = `https://opengameart.org/content/${slug}`;
  const html = await getText(url);
  const lic = html.match(/field-name-field-art-licenses[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/)?.[0] ?? '';
  const licenses = [...lic.matchAll(/license-name'>([^<]*)</g)].map((x) => x[1].trim());
  const licUrls = [...lic.matchAll(/href='(http[^']*creativecommons[^']*)'/g)].map((x) => x[1]);
  const author = strip(html.match(/field-name-author-submitter[\s\S]*?<span class='username'>([\s\S]*?)<\/span>/)?.[1] ?? '').replace(/\s*\(Submitted by.*$/, '') || 'unknown';
  const title = strip(html.match(/<title>([^<|]*)/)?.[1] ?? slug);
  const files = [...new Set([...html.matchAll(/href="(https:\/\/opengameart\.org\/sites\/default\/files\/[^"]+)"/g)].map((x) => x[1]).filter((u) => !/\/css\/|license_images|\.(png|jpg|gif|webp)$/i.test(u)))];
  return { url, title, author, licenses, licUrls, files };
}
/** Verifies the page licence (CC0 / CC-BY only, no other licence listed) → normalised licence or throws. */
function verifyOga(page) {
  const norm = page.licenses.map((l, i) => normaliseLicense(l) ?? normaliseLicense(page.licUrls[i]));
  if (!norm.length) throw new Error(`${page.url}: no licence declared on the page`);
  const ok = norm.filter(Boolean);
  if (!ok.length) throw new Error(`${page.url}: licence "${page.licenses.join(', ')}" is not CC0/CC-BY — refused`);
  // OGA lists alternatives ("CC0 or CC-BY 3.0"): any acceptable one is fine; prefer CC0
  return ok.includes('CC0') ? 'CC0' : ok[0];
}
async function ogaEntry(m, entry, filterSlot) {
  const page = await ogaPage(entry.page);
  const license = verifyOga(page);
  const author = entry.author ?? page.author;
  const items = entry.archive
    ? (() => {
        const url = page.files.find((u) => entry.archive.test(decodeURIComponent(u)));
        if (!url) throw new Error(`${page.url}: archive not found among ${page.files.length} attachments`);
        return { url, picks: entry.picks };
      })()
    : { url: null, picks: entry.files };
  let archiveFiles = null;
  const written = [];
  for (const pick of items.picks) {
    if (filterSlot && !pick.slot.startsWith(filterSlot)) continue;
    let sources;
    if (items.url) {
      archiveFiles ??= extractArchive(await download(items.url, decodeURIComponent(basename(items.url))));
      sources = archiveFiles.filter((f) => pick.inner.test(f.replace(/\\/g, '/')));
    } else {
      sources = [];
      for (const u of page.files) if (pick.match.test(decodeURIComponent(u))) sources.push(await download(u, decodeURIComponent(basename(u))));
    }
    if (!sources.length) { log(`  ✗ ${pick.slot}: no file matches ${pick.inner ?? pick.match}`); continue; }
    for (const src of sources) {
      const origin = `opengameart:${entry.page}:${basename(src)}`;
      if (hasOrigin(m, origin)) { log(`  = ${pick.slot} ← ${basename(src)} already registered`); continue; }
      try {
        const slots = register(m, src, pick.slot, { license, author, title: `${page.title} — ${pick.title ?? basename(src)}`, url: page.url, source: 'opengameart', id: entry.page }, { split: pick.split, maxS: pick.maxS, loop: pick.loop, origin });
        log(`  ✓ ${slots.join(', ')} ← ${basename(src)} (${author}, ${license})`);
        written.push(...slots);
      } catch (e) { log(`  ✗ ${pick.slot} ← ${basename(src)}: ${e.message}`); }
    }
  }
  return written;
}

// ------------------------------------------------------------------------------------------- Freesound
const FS = 'https://freesound.org/apiv2';
const fsHeaders = () => ({ Authorization: `Token ${TOKEN}` });
const FIELDS = 'id,name,username,license,previews,duration,avg_rating,num_downloads,url';
async function fsSearch(query, { license = 'cc0', dur, max = 20 } = {}) {
  if (!TOKEN) throw new Error('FREESOUND_TOKEN is not set (freesound.org → your profile → API credentials)');
  const lic = license === 'by' ? 'license:"Attribution"' : 'license:"Creative Commons 0"';
  const filter = `${lic}${dur ? ` duration:[${dur[0]} TO ${dur[1]}]` : ''}`;
  const u = `${FS}/search/text/?query=${encodeURIComponent(query)}&filter=${encodeURIComponent(filter)}&sort=rating_desc&fields=${FIELDS}&page_size=${max}`;
  const j = await getJSON(u, fsHeaders());
  return (j.results ?? []).map((r) => ({ ...r, license: normaliseLicense(r.license) }));
}
const fsScore = (r) => (r.avg_rating || 2.5) * 2 + Math.log10((r.num_downloads || 0) + 1);
async function fsSound(id) {
  const r = await getJSON(`${FS}/sounds/${id}/?fields=${FIELDS}`, fsHeaders());
  return { ...r, license: normaliseLicense(r.license), rawLicense: r.license };
}
async function fsRegister(m, r, slot, { split, maxS, loop } = {}) {
  if (!r.license) throw new Error(`Freesound #${r.id} "${r.name}": licence ${r.rawLicense ?? '?'} is not CC0/CC-BY — refused`);
  const origin = `freesound:${r.id}`;
  if (hasOrigin(m, origin)) { log(`  = ${slot} ← #${r.id} already registered`); return []; }
  const prev = r.previews?.['preview-hq-ogg'] ?? r.previews?.['preview-hq-mp3'];
  if (!prev) throw new Error(`Freesound #${r.id}: no preview URL`);
  const src = await download(prev, `freesound-${r.id}${extname(new URL(prev).pathname) || '.ogg'}`, fsHeaders());
  const slots = register(m, src, slot, { license: r.license, author: r.username, title: r.name, url: r.url ?? `https://freesound.org/s/${r.id}/`, source: 'freesound', id: r.id }, { split, maxS, loop, origin });
  log(`  ✓ ${slots.join(', ')} ← Freesound #${r.id} "${r.name}" by ${r.username} (${r.license})`);
  return slots;
}
async function freesoundDefault(m, filterSlot) {
  const written = [];
  for (const q of FREESOUND_SET) {
    if (filterSlot && !q.slot.startsWith(filterSlot)) continue;
    try {
      let res = await fsSearch(q.query, { license: 'cc0', dur: q.dur, max: 30 });
      res = res.filter((r) => r.license && !(q.reject && q.reject.test(r.name)));
      if (res.length < q.n) {
        const by = await fsSearch(q.query, { license: 'by', dur: q.dur, max: 30 });
        res.push(...by.filter((r) => r.license && !(q.reject && q.reject.test(r.name))));
      }
      res.sort((a, b) => fsScore(b) - fsScore(a));
      const picks = res.slice(0, q.n);
      if (!picks.length) { log(`  ✗ ${q.slot}: nothing CC0/CC-BY for "${q.query}"`); continue; }
      for (const r of picks) {
        try { written.push(...await fsRegister(m, r, q.slot, { maxS: q.maxS ?? Math.min(q.dur[1], 4), loop: q.loop })); } catch (e) { log(`  ✗ ${q.slot}: ${e.message}`); }
      }
    } catch (e) { log(`  ✗ ${q.slot}: ${e.message}`); }
  }
  return written;
}

// ------------------------------------------------------------------------------------------- commands
async function defaultSet() {
  const m = loadManifest();
  const only = flag('only');
  const written = [];
  if (!ffmpeg) log('ffmpeg not found: WAV sources are converted by the built-in decoder, OGG/MP3 are kept as-is for the browser to decode (no normalisation)');
  if (TOKEN) {
    log('Freesound set (FREESOUND_TOKEN set): CC0 first, CC-BY second…');
    written.push(...await freesoundDefault(m, only));
  } else log('FREESOUND_TOKEN not set — skipping the Freesound set (mechanical foley, suppressed shots, bullet cracks come from there)');
  if (!has('no-oga')) {
    log('OpenGameArt set (licence read from each page; only CC0 / CC-BY is accepted)…');
    for (const entry of OGA_SET) {
      if (only && !(entry.picks ?? entry.files).some((p) => p.slot.startsWith(only))) continue;
      try { written.push(...await ogaEntry(m, entry, only)); } catch (e) { log(`  ✗ ${entry.page}: ${e.message}`); }
    }
  }
  if (!written.length) {
    const n = Object.keys(m.sounds).length;
    if (n) log(`nothing new (${n} recorded sounds already registered — see assets/CREDITS.md)`);
    else { log('nothing could be downloaded with a verified CC0 / CC-BY licence — nothing written (the engine keeps synthesizing)'); process.exitCode = 1; }
    return;
  }
  saveManifest(m);
  log(`${written.length} new file(s), ${Object.keys(m.sounds).length} recorded sounds registered → assets/manifest.json, assets/CREDITS.md`);
  log('reload the range: shots / handling / impacts with a loaded slot use the recordings, everything else stays synthesized');
}

async function main() {
  const [cmd, a1] = positional;
  if (!cmd || cmd === 'default') await defaultSet();
  else if (cmd === 'search') {
    const res = await fsSearch(a1 ?? '', { license: flag('license', 'cc0'), max: Number(flag('max', 20)) });
    res.sort((a, b) => fsScore(b) - fsScore(a));
    for (const r of res) console.log(`${String(r.id).padStart(7)}  ${r.license?.padEnd(9) ?? '(refused)'} ${r.duration.toFixed(1).padStart(6)} s  ★${(r.avg_rating || 0).toFixed(1)} ↓${r.num_downloads}  ${r.name}  — ${r.username}  ${r.url}`);
    if (!res.length) console.log('no results');
  } else if (cmd === 'get') {
    const m = loadManifest();
    const r = await fsSound(a1);
    const slots = await fsRegister(m, r, flag('slot') ?? `custom.${a1}`, { split: flag('split'), maxS: Number(flag('max-s', 4)), loop: has('loop') });
    if (slots.length) saveManifest(m);
  } else if (cmd === 'oga') {
    const m = loadManifest();
    const slot = flag('slot') ?? `custom.${a1}`;
    const entry = flag('inner')
      ? { page: a1, archive: new RegExp(flag('file', '\\.(zip|7z)$'), 'i'), picks: [{ inner: new RegExp(flag('inner'), 'i'), slot, split: flag('split'), maxS: Number(flag('max-s', 4)), loop: has('loop') }] }
      : { page: a1, files: [{ match: new RegExp(flag('file', '\\.(wav|ogg|mp3|flac)$'), 'i'), slot, split: flag('split'), maxS: Number(flag('max-s', 4)), loop: has('loop') }] };
    const slots = await ogaEntry(m, entry);
    if (slots.length) saveManifest(m); else { log('nothing registered'); process.exitCode = 1; }
  } else if (cmd === 'local') {
    const m = loadManifest();
    const license = normaliseLicense(flag('license', ''));
    if (!license && !flag('allow-license')) throw new Error(`--license must be CC0 or CC-BY-x.y (got "${flag('license', '')}"); --allow-license <text> records another licence you hold`);
    const slots = register(m, resolve(a1), flag('slot') ?? `custom.${basename(a1, extname(a1))}`,
      { license: license ?? flag('allow-license'), author: flag('author', ''), title: flag('title', basename(a1)), url: flag('url', ''), source: 'local', id: basename(a1) },
      { split: flag('split'), maxS: Number(flag('max-s', 4)), loop: has('loop'), origin: `local:${resolve(a1)}` });
    saveManifest(m);
    log(`  ✓ ${slots.join(', ')} ← ${a1}`);
  } else if (cmd === 'list') {
    const m = loadManifest();
    for (const [slot, e] of Object.entries(m.sounds)) console.log(`${slot.padEnd(28)} ${String(e.durationS ?? '?').padStart(6)} s  ${e.license.padEnd(9)} ${e.title} — ${e.author}`);
    if (!Object.keys(m.sounds).length) console.log('no recorded sounds registered (run `node tools/fetch-sounds.mjs`)');
  } else if (cmd === 'credits') { writeCredits(loadManifest()); log('wrote assets/CREDITS.md'); }
  else if (cmd === 'remove') {
    const m = loadManifest();
    const slots = Object.keys(m.sounds).filter((s) => s === a1 || s.startsWith(a1 + '.'));
    if (!slots.length) throw new Error(`no slot "${a1}" (see: node tools/fetch-sounds.mjs list)`);
    for (const s of slots) { const f = join(ASSETS, m.sounds[s].file); if (existsSync(f)) rmSync(f); delete m.sounds[s]; }
    saveManifest(m);
    log(`removed ${slots.join(', ')}`);
  }
  else if (cmd === 'clean') {
    const m = loadManifest();
    m.sounds = {};
    if (existsSync(SOUNDS)) rmSync(SOUNDS, { recursive: true, force: true });
    saveManifest(m);
    log('removed assets/sounds and the manifest `sounds` section (download cache kept in assets/.cache)');
  } else { console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 28).join('\n')); process.exitCode = 1; }
}

main().catch((e) => { console.error('[fetch-sounds] error:', e.message); process.exitCode = 1; });
