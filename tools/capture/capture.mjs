// Headless WebGPU capture (SwiftShader). node tools/capture/capture.mjs <url> <out.png> [timeoutMs]
// env: VIEW=960x540 (viewport), EVAL=<js expression> (printed after capture), PLAYWRIGHT_PATH.
// Add &taa=0 to the URL for a sharp single-frame result after few frames (TAA otherwise needs ~20 frames to converge).
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_PATH ?? '/opt/node-tools/node_modules/playwright');
const [url, out, timeoutArg] = process.argv.slice(2);
const timeout = Number(timeoutArg ?? 240000);
const browser = await chromium.launch({ args: ['--enable-unsafe-webgpu', '--use-webgpu-adapter=swiftshader', '--enable-features=Vulkan', '--ignore-gpu-blocklist', '--no-sandbox'] });
const [vw, vh] = (process.env.VIEW ?? '1280x720').split('x').map(Number);
const page = await browser.newPage({ viewport: { width: vw, height: vh } });
const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}`));
const t0 = Date.now();
await page.goto(url, { waitUntil: 'load' });
try {
  await page.waitForFunction(() => { const t = window.__test; return t && ((t.done && (t.captured || !location.search.includes('offscreen=1'))) || (t.errors && t.errors.length)); }, null, { timeout, polling: 500 });
} catch { logs.push('[capture] timeout waiting for __test.done'); }
const state = await page.evaluate(() => JSON.stringify(window.__test ?? null));
if (process.env.EVAL) { try { console.log('eval:', JSON.stringify(await page.evaluate(process.env.EVAL))); } catch (e) { console.log('eval failed:', String(e)); } }
await page.screenshot({ path: out });
console.log(`captured ${out} in ${((Date.now() - t0) / 1000).toFixed(1)}s state=${state}`);
for (const l of logs.slice(-25)) console.log(l);
await browser.close();
