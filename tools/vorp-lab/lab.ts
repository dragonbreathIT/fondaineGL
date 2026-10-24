// vorp-lab: tune sources against physics and your ears. Renders with the exact same WASM DSP as the game
// (offline, main thread), shows the dry source waveform in pascals, the heard result, and a spectrogram.

import {
  VorpOffline, GUNSHOT_PARAMS, NOISE_PARAMS, HEARING_PARAMS, KIND, OP, SPAWN, paramArray, defaultsOf, ParamSpec,
  GUNSHOTS, ZONES, IMPACTS, plateModes, casingModes, receiverModes, modalParams, whithamNWave, zoneSendDb, encodeWav,
  REVERB_PARAMS, AMBIENCE_PARAMS, MASTER_PARAMS, speedOfSound,
} from '@fondaine/vorp';

type Mode = 'gunshot' | 'plate' | 'casing' | 'impact' | 'crack';

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const sr = 48000;
const wasmUrl = '../../wasm/vorp_dsp.wasm';

const state = {
  mode: 'gunshot' as Mode,
  preset: 'rifle556_16in',
  gun: defaultsOf(GUNSHOT_PARAMS),
  impact: { ...IMPACTS.concrete } as Record<string, number>,
  impactPreset: 'concrete',
  plate: { width: 0.3, height: 0.45, thickness: 0.0095, hitU: 0.43, hitV: 0.38, t60Fundamental: 2.4, speed: 850 },
  crack: { mach: 2.4, missDistance: 2, diameter: 0.0057, length: 0.023 },
  scene: { distance: 0.75, angle: 165, height: 1.5, listenerHeight: 1.65, zone: 'outdoorRange', protection: 0, action: 1, ground: 1, seconds: 3, rof: 0, shots: 1 },
};
Object.assign(state.gun, GUNSHOTS.rifle556_16in.params);

let lastDry: Float32Array | null = null;
let lastOut: { left: Float32Array; right: Float32Array } | null = null;
let actx: AudioContext | null = null;
let module: WebAssembly.Module;

async function init() {
  module = await WebAssembly.compile(await (await fetch(wasmUrl)).arrayBuffer());
  buildUI();
  await render();
}

// ------------------------------------------------------------------------------------------- UI
function slider(container: HTMLElement, spec: ParamSpec, obj: Record<string, number>, onChange: () => void) {
  const row = document.createElement('div');
  row.className = 'row';
  const step = spec.step ?? (spec.max - spec.min) / 400;
  row.innerHTML = `<label title="${(spec.help ?? '').replace(/"/g, '&quot;')}">${spec.label}${spec.unit ? ` <i>${spec.unit}</i>` : ''}</label>`;
  const r = document.createElement('input');
  r.type = 'range'; r.min = String(spec.min); r.max = String(spec.max); r.step = String(step); r.value = String(obj[spec.key] ?? spec.def);
  const n = document.createElement('input');
  n.type = 'number'; n.step = String(step); n.value = String(obj[spec.key] ?? spec.def);
  r.oninput = () => { obj[spec.key] = Number(r.value); n.value = r.value; onChange(); };
  n.onchange = () => { obj[spec.key] = Number(n.value); r.value = n.value; onChange(); };
  row.append(r, n);
  if (spec.help) { const h = document.createElement('div'); h.className = 'help'; h.textContent = spec.help; row.appendChild(h); }
  container.appendChild(row);
}

let renderTimer = 0;
const schedule = () => { clearTimeout(renderTimer); renderTimer = window.setTimeout(() => render(), 120); };

function buildUI() {
  const modeSel = $<HTMLSelectElement>('mode');
  modeSel.value = state.mode;
  modeSel.onchange = () => { state.mode = modeSel.value as Mode; buildParams(); schedule(); };
  const presetSel = $<HTMLSelectElement>('preset');
  presetSel.innerHTML = Object.entries(GUNSHOTS).map(([k, v]) => `<option value="${k}">${v.name}</option>`).join('');
  presetSel.value = state.preset;
  presetSel.onchange = () => { state.preset = presetSel.value; state.gun = { ...defaultsOf(GUNSHOT_PARAMS), ...GUNSHOTS[state.preset].params }; buildParams(); schedule(); };
  const zoneSel = $<HTMLSelectElement>('zone');
  zoneSel.innerHTML = Object.entries(ZONES).map(([k, v]) => `<option value="${k}">${v.name}</option>`).join('') + '<option value="anechoic">Anechoic (no environment)</option>';
  zoneSel.value = state.scene.zone;
  zoneSel.onchange = () => { state.scene.zone = zoneSel.value; schedule(); };
  const sceneBox = $('scene');
  const sceneSpecs: ParamSpec[] = [
    { key: 'distance', label: 'Listener distance', def: 0.75, min: 0.3, max: 400, step: 0.05, unit: 'm', help: 'Shooter’s ears ≈ 0.6–0.8 m from a rifle muzzle.' },
    { key: 'angle', label: 'Angle off muzzle axis', def: 165, min: 0, max: 180, step: 1, unit: '°', help: '0 = in front of the muzzle, 180 = directly behind (shooter ≈ 150–170).' },
    { key: 'height', label: 'Source height', def: 1.5, min: 0.1, max: 10, step: 0.05, unit: 'm' },
    { key: 'listenerHeight', label: 'Listener height', def: 1.65, min: 0.1, max: 10, step: 0.05, unit: 'm' },
    { key: 'protection', label: 'Hearing protection', def: 0, min: 0, max: 2, step: 1, help: '0 none · 1 passive muffs · 2 electronic muffs' },
    { key: 'action', label: 'Mechanical action', def: 1, min: 0, max: 1, step: 1 },
    { key: 'ground', label: 'Ground reflection', def: 1, min: 0, max: 1, step: 1 },
    { key: 'shots', label: 'Shots', def: 1, min: 1, max: 30, step: 1 },
    { key: 'rof', label: 'Rate of fire', def: 0, min: 0, max: 1200, step: 10, unit: 'rpm', help: '0 = 0.6 s between shots' },
    { key: 'seconds', label: 'Render length', def: 3, min: 0.5, max: 10, step: 0.1, unit: 's' },
  ];
  for (const s of sceneSpecs) slider(sceneBox, s, state.scene as unknown as Record<string, number>, schedule);
  $('play').onclick = () => play();
  $('wav').onclick = () => {
    if (!lastOut) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(encodeWav(lastOut.left, lastOut.right, sr));
    a.download = `vorp-${state.mode}.wav`;
    a.click();
  };
  $('save').onclick = () => {
    const data = state.mode === 'gunshot' ? { name: 'custom', params: state.gun } : state.mode === 'impact' ? state.impact : state.mode === 'plate' ? state.plate : state.crack;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `vorp-${state.mode}-preset.json`;
    a.click();
  };
  $('load').onclick = () => {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = '.json';
    inp.onchange = async () => {
      const f = inp.files?.[0];
      if (!f) return;
      const j = JSON.parse(await f.text());
      if (state.mode === 'gunshot') Object.assign(state.gun, j.params ?? j);
      else if (state.mode === 'impact') Object.assign(state.impact, j);
      else if (state.mode === 'plate') Object.assign(state.plate, j);
      else Object.assign(state.crack, j);
      buildParams(); schedule();
    };
    inp.click();
  };
  buildParams();
}

function buildParams() {
  const box = $('params');
  box.innerHTML = '';
  $('presetRow').style.display = state.mode === 'gunshot' ? '' : 'none';
  if (state.mode === 'gunshot') {
    for (const s of GUNSHOT_PARAMS) if (s.key !== 'seed') slider(box, s, state.gun, schedule);
  } else if (state.mode === 'impact') {
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `<label>Surface</label><select id="impactPreset">${Object.keys(IMPACTS).map((k) => `<option>${k}</option>`).join('')}</select>`;
    box.appendChild(row);
    const sel = row.querySelector('select') as HTMLSelectElement;
    sel.value = state.impactPreset;
    sel.onchange = () => { state.impactPreset = sel.value; state.impact = { ...IMPACTS[sel.value] }; buildParams(); schedule(); };
    for (const s of NOISE_PARAMS) if (s.key !== 'seed') slider(box, s, state.impact, schedule);
  } else if (state.mode === 'plate') {
    const specs: ParamSpec[] = [
      { key: 'width', label: 'Plate width', def: 0.3, min: 0.05, max: 1.2, step: 0.005, unit: 'm' },
      { key: 'height', label: 'Plate height', def: 0.45, min: 0.05, max: 1.2, step: 0.005, unit: 'm' },
      { key: 'thickness', label: 'Thickness', def: 0.0095, min: 0.003, max: 0.03, step: 0.0005, unit: 'm', help: 'AR500: 6.4 mm (1/4"), 9.5 mm (3/8"), 12.7 mm (1/2").' },
      { key: 'hitU', label: 'Hit position U', def: 0.43, min: 0.02, max: 0.98, step: 0.01 },
      { key: 'hitV', label: 'Hit position V', def: 0.38, min: 0.02, max: 0.98, step: 0.01 },
      { key: 't60Fundamental', label: 'Ring time (fundamental)', def: 2.4, min: 0.1, max: 6, step: 0.05, unit: 's' },
      { key: 'speed', label: 'Impact velocity', def: 850, min: 100, max: 1100, step: 5, unit: 'm/s' },
    ];
    for (const s of specs) slider(box, s, state.plate as unknown as Record<string, number>, schedule);
  } else if (state.mode === 'crack') {
    const specs: ParamSpec[] = [
      { key: 'mach', label: 'Bullet Mach at pass', def: 2.4, min: 1.02, max: 3.2, step: 0.01 },
      { key: 'missDistance', label: 'Miss distance', def: 2, min: 0.1, max: 60, step: 0.1, unit: 'm' },
      { key: 'diameter', label: 'Calibre', def: 0.0057, min: 0.004, max: 0.0155, step: 0.0001, unit: 'm' },
      { key: 'length', label: 'Bullet length', def: 0.023, min: 0.01, max: 0.07, step: 0.0005, unit: 'm' },
    ];
    for (const s of specs) slider(box, s, state.crack as unknown as Record<string, number>, schedule);
  } else {
    box.innerHTML = '<p class="muted">Brass casing dropping on concrete — modal model from case dimensions.</p>';
  }
}

// ------------------------------------------------------------------------------------------- rendering
function spawnHeader(kind: number, id: number, pos: number[], dir: number[], o: { directivity?: number; rearLp?: number; dmode?: number; send?: number; delay?: number; bus?: number }) {
  const h = new Float32Array(SPAWN.HEADER);
  h[SPAWN.VOICE_ID] = id; h[SPAWN.KIND] = kind; h[SPAWN.BUS] = o.bus ?? 0;
  h.set(pos, SPAWN.PX); h.set(dir, SPAWN.DX);
  h[SPAWN.DIRECTIVITY_DB] = o.directivity ?? 0; h[SPAWN.REAR_LP_HZ] = o.rearLp ?? 20000;
  h[SPAWN.DISTANCE_MODE] = o.dmode ?? 0; h[SPAWN.MIN_DIST] = 0.1; h[SPAWN.REVERB_SEND_DB] = o.send ?? -30; h[SPAWN.SPATIAL] = 1; h[SPAWN.DELAY_MS] = o.delay ?? 0;
  return h;
}

async function render() {
  const off = await VorpOffline.create(module, sr);
  const sc = state.scene;
  const zone = ZONES[sc.zone];
  const send = zone ? zoneSendDb(zone) : -200;
  if (zone) {
    off.cmd(OP.REVERB, paramArray(REVERB_PARAMS, zone.reverb));
    off.cmd(OP.AMBIENCE, paramArray(AMBIENCE_PARAMS, { ...zone.ambience, enable: 0 }));
  } else {
    off.cmd(OP.REVERB, paramArray(REVERB_PARAMS, { levelDb: -80 }));
    off.cmd(OP.AMBIENCE, paramArray(AMBIENCE_PARAMS, { enable: 0 }));
  }
  off.cmd(OP.MASTER, paramArray(MASTER_PARAMS, zone ? {} : { reverbLevelDb: -80 }));
  off.cmd(OP.HEARING, paramArray(HEARING_PARAMS, { protection: sc.protection }));
  // listener at origin looking -Z; source placed at distance/angle (angle measured off the muzzle axis):
  // the muzzle points along +Z rotated so the listener sits at `angle` from its axis.
  // listener at the origin looking −Z; source `distance` in front, its axis rotated `angle` away from the listener
  const a = (sc.angle * Math.PI) / 180;
  const src = [0, sc.height - sc.listenerHeight, -sc.distance];
  const dir = [Math.sin(a), 0, Math.cos(a)];
  off.cmd(OP.LISTENER, [0, 0, 0, 0, 0, -1, 0, 1, 0]);
  const listenerY = sc.listenerHeight, srcY = sc.height;
  const groundTap = (path: number, gain: number) => ({ path, gain, lp: 3000, dir: [0, -0.5, -0.86] });
  let id = 1;
  const taps: { path: number; gain: number; lp: number; dir: number[] }[] = [];
  if (sc.ground) {
    const horiz = sc.distance;
    const path = Math.hypot(horiz, listenerY + srcY);
    taps.push(groundTap(path, 0.7 / path));
  }
  for (const f of zone?.farReflectors ?? []) {
    const path = f.distance * 2;
    taps.push({ path, gain: f.reflectivity / path, lp: f.lowpassHz, dir: [Math.sin((f.azimuth * Math.PI) / 180), 0, -Math.cos((f.azimuth * Math.PI) / 180)] });
  }
  const pushTaps = (vid: number) => {
    const arr = new Float32Array(2 + taps.length * 6);
    arr[0] = vid; arr[1] = taps.length;
    taps.forEach((t, i) => arr.set([t.path, t.gain, t.lp, t.dir[0], t.dir[1], t.dir[2]], 2 + i * 6));
    off.cmd(OP.VOICE_TAPS, arr);
  };
  const interval = sc.rof > 0 ? 60000 / sc.rof : 600;
  let dryKind: number = KIND.GUNSHOT;
  let dryParams: Float32Array = paramArray(GUNSHOT_PARAMS, state.gun);
  if (state.mode === 'gunshot') {
    for (let s = 0; s < sc.shots; s++) {
      const p = paramArray(GUNSHOT_PARAMS, { ...state.gun, seed: 1000 + s });
      const h = spawnHeader(KIND.GUNSHOT, id, src, dir, { directivity: state.gun.directivityDb, rearLp: state.gun.rearLpHz, send: send + (state.gun.tailSendDb ?? 0), delay: s * interval + 3 });
      off.cmd(OP.SPAWN, concat(h, p));
      pushTaps(id++);
      if (sc.action) {
        const preset = GUNSHOTS[state.preset] ?? GUNSHOTS.rifle556_16in;
        const mp = modalParams(receiverModes(preset.action.brightness), preset.action.hits.map((x) => ({ ...x, timeMs: x.timeMs + 3 })), preset.action.level, s);
        // action sits ~0.25 m from the shooter's ear (only meaningful at the shooter position)
        const actPos = sc.distance < 2 ? [0.06, -0.05, -0.22] : src;
        off.cmd(OP.SPAWN, concat(spawnHeader(KIND.MODAL, id++, actPos, [1, 0, 0], { send, delay: s * interval, bus: 0 }), mp));
      }
    }
  } else if (state.mode === 'impact') {
    dryKind = KIND.NOISE;
    dryParams = paramArray(NOISE_PARAMS, state.impact);
    off.cmd(OP.SPAWN, concat(spawnHeader(KIND.NOISE, id, src, dir, { send, bus: 1, delay: 5 }), dryParams));
    pushTaps(id++);
  } else if (state.mode === 'plate') {
    const pl = state.plate;
    const modes = plateModes({ width: pl.width, height: pl.height, thickness: pl.thickness, hitU: pl.hitU, hitV: pl.hitV, t60Fundamental: pl.t60Fundamental, level: 30 });
    const amp = Math.min(2, (pl.speed / 800) ** 2 * 1.2);
    dryKind = KIND.MODAL;
    dryParams = modalParams(modes, [{ timeMs: 0, amp, contactMs: 0.02, noiseDb: -14 }], 1, 1);
    off.cmd(OP.SPAWN, concat(spawnHeader(KIND.MODAL, id, src, dir, { send, bus: 1, delay: 5 }), dryParams));
    pushTaps(id++);
  } else if (state.mode === 'casing') {
    dryKind = KIND.MODAL;
    dryParams = modalParams(casingModes(), [{ timeMs: 0, amp: 1, contactMs: 0.03, noiseDb: -12 }, { timeMs: 140, amp: 0.5, contactMs: 0.04, noiseDb: -14 }, { timeMs: 230, amp: 0.25, contactMs: 0.05 }], 0.12, 1);
    off.cmd(OP.SPAWN, concat(spawnHeader(KIND.MODAL, id, [0.4, -1.6, -0.8], dir, { send, bus: 1, delay: 5 }), dryParams));
    pushTaps(id++);
  } else {
    const c = speedOfSound(15);
    const nw = whithamNWave({ ...state.crack, c });
    dryKind = KIND.NWAVE;
    dryParams = new Float32Array([nw.peakPa, nw.duration, 20]);
    off.cmd(OP.SPAWN, concat(spawnHeader(KIND.NWAVE, id, [state.crack.missDistance, 0, -1], [0, 0, 1], { dmode: 1, send: send - 20 * Math.log10(state.crack.missDistance), delay: 5 }), dryParams));
    pushTaps(id++);
    $('info').textContent = `N-wave: ${nw.peakPa.toFixed(0)} Pa (${(20 * Math.log10(nw.peakPa / 2e-5)).toFixed(1)} dB SPL peak), duration ${(nw.duration * 1e6).toFixed(0)} µs`;
  }
  const t0 = performance.now();
  lastOut = off.render(sc.seconds);
  const ms = performance.now() - t0;
  lastDry = off.renderSource(dryKind, dryParams, Math.min(sc.seconds, 1.5));
  const m = off.meters();
  if (state.mode !== 'crack') {
    let pk = 0; for (const v of lastDry) pk = Math.max(pk, Math.abs(v));
    $('info').textContent = `dry peak ${pk.toFixed(1)} Pa = ${(20 * Math.log10(Math.max(pk, 1e-9) / 2e-5)).toFixed(1)} dB SPL @1 m · max eardrum SPL ${m[12].toFixed(1)} dB · TTS ${m[3].toFixed(1)} dB · rendered ${sc.seconds}s in ${ms.toFixed(0)} ms`;
  }
  draw();
}

function concat(a: Float32Array, b: Float32Array) { const o = new Float32Array(a.length + b.length); o.set(a); o.set(b, a.length); return o; }

// ------------------------------------------------------------------------------------------- drawing
function drawWave(canvas: HTMLCanvasElement, data: Float32Array, color: string, label: string, unit: string, seconds?: number) {
  const dpr = devicePixelRatio || 1;
  const w = (canvas.width = canvas.clientWidth * dpr), h = (canvas.height = canvas.clientHeight * dpr);
  const g = canvas.getContext('2d')!;
  g.fillStyle = '#0d0e10'; g.fillRect(0, 0, w, h);
  g.strokeStyle = '#24272c'; g.lineWidth = 1;
  g.beginPath(); g.moveTo(0, h / 2); g.lineTo(w, h / 2); g.stroke();
  let pk = 1e-9; for (const v of data) pk = Math.max(pk, Math.abs(v));
  const n = data.length;
  g.strokeStyle = color; g.lineWidth = 1 * dpr;
  g.beginPath();
  for (let x = 0; x < w; x++) {
    const i0 = Math.floor((x / w) * n), i1 = Math.max(i0 + 1, Math.floor(((x + 1) / w) * n));
    let mn = 1e9, mx = -1e9;
    for (let i = i0; i < i1 && i < n; i++) { mn = Math.min(mn, data[i]); mx = Math.max(mx, data[i]); }
    g.moveTo(x + 0.5, h / 2 - (mx / pk) * h * 0.45);
    g.lineTo(x + 0.5, h / 2 - (mn / pk) * h * 0.45 + 0.5);
  }
  g.stroke();
  g.fillStyle = '#8e939c'; g.font = `${11 * dpr}px ui-monospace,monospace`;
  g.fillText(`${label} · peak ${pk.toPrecision(4)} ${unit}${seconds ? ` · ${seconds.toFixed(2)} s` : ''}`, 8 * dpr, 16 * dpr);
}

function drawSpectrogram(canvas: HTMLCanvasElement, data: Float32Array) {
  const dpr = devicePixelRatio || 1;
  const w = (canvas.width = canvas.clientWidth * dpr), h = (canvas.height = canvas.clientHeight * dpr);
  const g = canvas.getContext('2d')!;
  const N = 1024, hop = Math.max(128, Math.floor(data.length / w));
  const cols = Math.floor((data.length - N) / hop);
  const img = g.createImageData(Math.max(1, cols), N / 2);
  const re = new Float32Array(N), im = new Float32Array(N);
  const win = new Float32Array(N).map((_, i) => 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (N - 1)));
  for (let c = 0; c < cols; c++) {
    for (let i = 0; i < N; i++) { re[i] = data[c * hop + i] * win[i]; im[i] = 0; }
    fft(re, im);
    for (let k = 0; k < N / 2; k++) {
      const db = 10 * Math.log10((re[k] * re[k] + im[k] * im[k]) / ((N / 4) * (N / 4)) + 1e-14);
      const t = Math.max(0, Math.min(1, (db + 110) / 100));
      const y = N / 2 - 1 - k, o = (y * cols + c) * 4;
      img.data[o] = 255 * Math.min(1, t * 1.6); img.data[o + 1] = 255 * Math.max(0, t * 1.6 - 0.6); img.data[o + 2] = 255 * Math.max(0, 0.6 - t) * t * 3; img.data[o + 3] = 255;
    }
  }
  const tmp = document.createElement('canvas');
  tmp.width = Math.max(1, cols); tmp.height = N / 2;
  tmp.getContext('2d')!.putImageData(img, 0, 0);
  g.imageSmoothingEnabled = true;
  // show 0..16 kHz
  const frac = 16000 / (sr / 2);
  g.drawImage(tmp, 0, (N / 2) * (1 - frac), cols, (N / 2) * frac, 0, 0, w, h);
  g.fillStyle = '#8e939c'; g.font = `${11 * dpr}px ui-monospace,monospace`;
  g.fillText('spectrogram (heard, left ear) 0–16 kHz', 8 * dpr, 16 * dpr);
}

function fft(re: Float32Array, im: Float32Array) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = (-2 * Math.PI) / len;
    for (let i = 0; i < n; i += len) {
      for (let k = 0; k < len / 2; k++) {
        const wr = Math.cos(ang * k), wi = Math.sin(ang * k);
        const ur = re[i + k], ui = im[i + k];
        const vr = re[i + k + len / 2] * wr - im[i + k + len / 2] * wi;
        const vi = re[i + k + len / 2] * wi + im[i + k + len / 2] * wr;
        re[i + k] = ur + vr; im[i + k] = ui + vi;
        re[i + k + len / 2] = ur - vr; im[i + k + len / 2] = ui - vi;
      }
    }
  }
}

function draw() {
  if (lastDry) {
    // zoom to the first 120 ms of the dry source for detail
    const zoom = lastDry.subarray(0, Math.min(lastDry.length, Math.floor(0.12 * sr)));
    drawWave($<HTMLCanvasElement>('dry'), zoom, '#f3b23a', 'dry source @1 m (first 120 ms)', 'Pa');
  }
  if (lastOut) {
    drawWave($<HTMLCanvasElement>('out'), lastOut.left, '#7cc4ff', 'heard (after propagation, ear, dynamics)', 'FS', lastOut.left.length / sr);
    drawSpectrogram($<HTMLCanvasElement>('spec'), lastOut.left);
  }
}

async function play() {
  if (!lastOut) return;
  actx ??= new AudioContext({ sampleRate: sr });
  await actx.resume();
  const b = actx.createBuffer(2, lastOut.left.length, sr);
  b.copyToChannel(lastOut.left as Float32Array<ArrayBuffer>, 0);
  b.copyToChannel(lastOut.right as Float32Array<ArrayBuffer>, 1);
  const s = actx.createBufferSource();
  s.buffer = b;
  s.connect(actx.destination);
  s.start();
}

addEventListener('resize', () => draw());
addEventListener('keydown', (e) => { if (e.code === 'Space' && (e.target as HTMLElement).tagName !== 'INPUT') { e.preventDefault(); play(); } });
init().catch((e) => { $('info').textContent = `Failed: ${e}`; console.error(e); });
