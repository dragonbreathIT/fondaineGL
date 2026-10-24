// Batch render of the states that matter for judging realism: both weapons at hip and ADS, every reload phase,
// the rack / charging handle, a shot being fired, and viewer close-ups of the hands on the guns.
// Every shot is its own page load in the engine's deterministic offscreen mode (offscreen=1&frames=N&dt=1/60),
// so the result does not depend on wall-clock timing or on the machine's speed.
//
//   npm run capture              → builds, then captures/<timestamp>/*.png + contact.png + report.json
//   SUBSET=1 npm run capture     → 4 shots only (smoke test)
//   LIGHT=1 npm run capture      → tiny scene (no trees/grass/GI, 256 px textures, no TAA) for GPU-less sandboxes
//   GPU=0                        → force SwiftShader (software WebGPU) in Playwright's bundled Chromium
//
// Prints one JSON line per shot. Send back contact.png (or the folder) and the console output.
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
let pw;
// the preinstalled sandbox copy (matched to its browsers) wins over the project's devDependency
for (const cand of [process.env.PLAYWRIGHT_PATH, '/opt/node-tools/node_modules/playwright', 'playwright']) {
  if (!cand) continue;
  try { pw = require(cand); break; } catch { /* next */ }
}
if (!pw) { console.error('playwright not found: run  npm install'); process.exit(2); }

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const light = process.env.LIGHT === '1';
const subset = process.env.SUBSET === '1';
const port = Number(process.env.PORT ?? 8097);
const stamp = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 16);
const outDir = resolve(root, 'captures', stamp);
mkdirSync(outDir, { recursive: true });
if (!existsSync(resolve(root, 'dist', 'examples', 'range', 'main.js'))) { console.error('dist/ is missing: run  node tools/build.mjs  first'); process.exit(2); }
const server = spawn(process.execPath, [resolve(root, 'tools', 'serve.mjs'), String(port)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 600));
const base = `http://localhost:${port}`;

// ---- browser. Real GPU: Playwright's Chromium in headless mode with WebGPU on (needs `npx playwright install chromium`
// once); if that browser is missing, the installed Chrome / Edge (channel) is used. GPU=0 forces SwiftShader.
const software = process.env.GPU === '0' || (process.platform === 'linux' && process.env.GPU !== '1');
const args = ['--enable-unsafe-webgpu', '--ignore-gpu-blocklist', '--no-sandbox', '--enable-features=Vulkan'];
if (software) args.push('--use-webgpu-adapter=swiftshader');
let browser;
const tries = [
  () => pw.chromium.launch({ headless: true, args, ...(existsSync('/opt/pw-browsers/chromium') ? { executablePath: '/opt/pw-browsers/chromium' } : {}) }),
  // installed Chrome / Edge: a visible window on Windows/macOS so the real GPU is used (headless may fall back to software)
  () => pw.chromium.launch({ channel: 'chrome', headless: process.platform === 'linux', args }),
  () => pw.chromium.launch({ channel: 'msedge', headless: process.platform === 'linux', args }),
];
let lastErr;
for (const t of tries) { try { browser = await t(); break; } catch (e) { lastErr = e; } }
if (!browser) { console.error('no browser could be launched:', String(lastErr).split('\n')[0], '\nrun:  npx playwright install chromium'); server.kill(); process.exit(2); }
const [vw, vh] = (process.env.VIEW ?? (light ? '960x540' : '1280x720')).split('x').map(Number);
const page = await browser.newPage({ viewport: { width: vw, height: vh } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error' && !/404/.test(m.text())) errors.push(m.text()); });
const timeout = Number(process.env.TIMEOUT ?? (software ? 900000 : 180000));

// ---- shot list. Reload moments are seconds into the reload: pistol plan 0.45 + 0.85 + 0.6 (rack), carbine 0.55 + 0.95 + 0.35 (bolt catch).
const frames = light ? 4 : 24;
const common = `offscreen=1&frames=${frames}${light ? '&trees=0&grass=0&gi=0&tex=256&taa=0' : ''}`;
const range = (q) => `${base}/examples/range/?${common}&${q}`;
const viewer = (q) => `${base}/examples/viewer/?offscreen=1&frames=${light ? 6 : 24}${light ? '&tex=256' : ''}&${q}`;
const reloadPlan = { pistol: [0.45, 0.85, 0.6], carbine: [0.55, 0.95, 0.35] }; // (fumble=0 keeps the plan deterministic)
const shots = [];
for (const w of ['pistol', 'carbine']) {
  const [mo, mi, ch] = reloadPlan[w];
  shots.push([`${w}_hip`, range(`weapon=${w}`)]);
  shots.push([`${w}_ads`, range(`weapon=${w}&ads=1`)]);
  shots.push([`${w}_fire`, range(`weapon=${w}&shots=1&fireAt=${frames - 1}`)]);
  shots.push([`${w}_reload_magOut`, range(`weapon=${w}&empty=1&reloadAt=1&scrub=${(mo * 0.55).toFixed(3)}`)]);
  shots.push([`${w}_reload_magIn`, range(`weapon=${w}&empty=1&reloadAt=1&scrub=${(mo + mi * 0.75).toFixed(3)}`)]);
  shots.push([`${w}_reload_charge_mid`, range(`weapon=${w}&empty=1&reloadAt=1&scrub=${(mo + mi + ch * 0.5).toFixed(3)}`)]);
  shots.push([`${w}_reload_charge_release`, range(`weapon=${w}&empty=1&reloadAt=1&scrub=${(mo + mi + ch * 0.64).toFixed(3)}`)]);
  shots.push([`${w}_reload_tactical_settle`, range(`weapon=${w}&reloadAt=1&scrub=${(mo + mi + 0.15).toFixed(3)}`)]);
  shots.push([`${w}_rack`, range(`weapon=${w}&rackAt=1&dt=0.08`)]); // dt 80 ms × 3 frames ≈ 0.24 s into a stand-alone rack
}
shots.push(
  ['viewer_pistol_hands_right', viewer('model=pistol&hands=1&eye=1&yaw=95&pitch=10&dist=0.34')],
  ['viewer_pistol_hands_left', viewer('model=pistol&hands=1&eye=1&yaw=-80&pitch=15&dist=0.34')],
  ['viewer_pistol_hands_pov', viewer('model=pistol&hands=1&eye=1&pov=1')],
  ['viewer_pistol_top', viewer('model=pistol&yaw=20&pitch=78&dist=0.32')],
  ['viewer_pistol_slide_locked', viewer('model=pistol&yaw=-110&pitch=12&dist=0.3&slide=0.0316')],
  ['viewer_carbine_hands', viewer('model=carbine&hands=1&eye=1&yaw=-60&pitch=12&dist=0.55')],
  ['viewer_carbine_receiver', viewer('model=carbine&yaw=-95&pitch=10&dist=0.42')],
  ['viewer_carbine_full', viewer('model=carbine&yaw=-90&pitch=8&dist=1.1')],
);
const list = subset ? shots.filter(([n]) => /^pistol_hip$|pistol_reload_charge_mid|carbine_ads|viewer_pistol_hands_right/.test(n)) : shots;

const report = [];
for (const [name, url] of list) {
  const t0 = Date.now();
  const file = resolve(outDir, `${name}.png`);
  let ok = true;
  try {
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForFunction(() => { const t = window.__test; return t && ((t.done && t.captured) || (t.errors && t.errors.length)); }, null, { timeout, polling: 250 });
  } catch (e) { ok = false; errors.push(`timeout: ${String(e).split('\n')[0]}`); }
  await page.screenshot({ path: file });
  const test = await page.evaluate(() => (window.__test ? { frames: window.__test.frames, errors: window.__test.errors, captured: !!window.__test.captured } : null)).catch(() => null);
  const rec = { name, file, seconds: Math.round((Date.now() - t0) / 1000), test, errors: errors.splice(0), ok: ok && !!test?.captured && !(test?.errors?.length) };
  report.push(rec);
  console.log(JSON.stringify({ shot: name, ok: rec.ok, s: rec.seconds, errors: rec.errors.length || test?.errors?.length ? [...rec.errors, ...(test?.errors ?? [])] : undefined }));
}

// ---- contact sheet
const html = `<!doctype html><meta charset="utf-8"><title>fondaine captures ${stamp}</title>
<style>body{margin:0;background:#111;color:#ddd;font:12px ui-monospace,monospace}.g{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:6px}figure{margin:0}img{width:100%;display:block}figcaption{padding:3px 2px}.bad{color:#f66}</style>
<div class="g">${report.map((s) => `<figure><img src="${s.name}.png"><figcaption class="${s.ok ? '' : 'bad'}">${s.name}${s.ok ? '' : ' ⚠'}</figcaption></figure>`).join('')}</div>`;
writeFileSync(resolve(outDir, 'index.html'), html);
writeFileSync(resolve(outDir, 'report.json'), JSON.stringify(report, null, 2));
await page.setViewportSize({ width: 1920, height: 1200 });
await page.goto(`file://${resolve(outDir, 'index.html').replace(/\\/g, '/')}`);
await page.screenshot({ path: resolve(outDir, 'contact.png'), fullPage: true });
console.log(`\n${report.length} shots (${report.filter((r) => r.ok).length} ok) → ${outDir}\ncontact sheet: ${resolve(outDir, 'contact.png')}`);
await browser.close();
server.kill();
