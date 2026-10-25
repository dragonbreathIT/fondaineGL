// Zero-dependency static server for dist/ (and the downloaded assets/ folder at /assets/) with the headers the engine needs:
//  * Cross-Origin-Opener-Policy / Embedder-Policy (cross-origin isolation → SharedArrayBuffer for audio)
//  * correct MIME for .wasm (streaming compilation) and ES modules.
//   node tools/serve.mjs [port]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, resolve, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = join(repo, 'dist');
// tools/fetch-assets.mjs and fetch-sounds.mjs write into <repo>/assets; serve it directly (no copy into dist needed)
const assetsRoot = join(repo, 'assets');
const port = Number(process.argv[2] ?? process.env.PORT ?? 8080);
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.wasm': 'application/wasm', '.map': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json',
  '.bin': 'application/octet-stream', '.hdr': 'application/octet-stream', '.wav': 'audio/wav', '.ogg': 'audio/ogg', '.ktx2': 'image/ktx2',
};

createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', 'http://x');
    const path = decodeURIComponent(url.pathname);
    const base = path === '/assets' || path.startsWith('/assets/') ? assetsRoot : root;
    let p = normalize(base === assetsRoot ? join(assetsRoot, path.slice('/assets'.length)) : join(root, path));
    if (!p.startsWith(base)) { res.writeHead(403).end(); return; }
    let s = await stat(p).catch(() => null);
    if (s?.isDirectory()) { p = join(p, 'index.html'); s = await stat(p).catch(() => null); }
    if (!s) { res.writeHead(404, { 'Content-Type': 'text/plain' }).end('not found'); return; }
    res.writeHead(200, {
      'Content-Type': MIME[extname(p).toLowerCase()] ?? 'application/octet-stream',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Resource-Policy': 'same-origin',
      'Cache-Control': 'no-cache',
    });
    res.end(await readFile(p));
  } catch (e) {
    res.writeHead(500).end(String(e));
  }
}).listen(port, () => console.log(`[fondaine] serving ${root} at http://localhost:${port}/` + (existsSync(join(assetsRoot, 'manifest.json')) ? ` (assets from ${assetsRoot})` : ' (no assets/manifest.json: procedural fallbacks; run tools/fetch-assets.mjs)')));
