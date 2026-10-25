// Bundles the engine packages, examples and tools with esbuild into dist/.
//   node tools/build.mjs            one-off build
//   node tools/build.mjs --watch    rebuild on change
//   node tools/build.mjs --watch --serve   + dev server (COOP/COEP headers for audio worklets)
import { context, build } from 'esbuild';
import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const watch = process.argv.includes('--watch');
const serve = process.argv.includes('--serve');

const alias = {
  '@fondaine/gl': join(root, 'packages/fondaineGL/src'),
  '@fondaine/vorp': join(root, 'packages/vorp/src'),
  '@fondaine/oaxis': join(root, 'packages/oaxis/src'),
};

/** Entry points: examples + tools + the audio worklet (separate global scope). */
const entries = [
  { in: 'examples/range/main.ts', out: 'examples/range/main' },
  { in: 'examples/viewer/main.ts', out: 'examples/viewer/main' },
  { in: 'tools/vorp-lab/lab.ts', out: 'tools/vorp-lab/lab' },
  { in: 'packages/vorp/src/worklet/vorp-worklet.ts', out: 'vorp/vorp-worklet' },
  { in: 'packages/fondaineGL/src/runtime/gi-worker.ts', out: 'fondaine/gi-worker' },

].filter((e) => existsSync(join(root, e.in)));

const common = {
  entryPoints: entries.map((e) => ({ in: join(root, e.in), out: e.out })),
  outdir: dist,
  bundle: true,
  format: 'esm',
  target: 'es2022',
  sourcemap: true,
  minify: !watch,
  alias,
  logLevel: 'info',
  legalComments: 'none',
};

function copyStatic() {
  mkdirSync(dist, { recursive: true });
  // html/css/assets next to example & tool entries
  for (const dir of ['examples', 'tools/vorp-lab']) {
    const src = join(root, dir);
    if (!existsSync(src)) continue;
    const walk = (d) => {
      for (const f of readdirSync(d)) {
        const p = join(d, f);
        if (statSync(p).isDirectory()) { walk(p); continue; }
        if (/\.(html|css|json|png|jpg|svg|glb|gltf|bin|hdr|wav|ogg|ktx2)$/i.test(f)) {
          const rel = p.slice(root.length + 1);
          const out = join(dist, rel);
          mkdirSync(dirname(out), { recursive: true });
          cpSync(p, out);
        }
      }
    };
    walk(src);
  }
  // compiled wasm (from tools/build-wasm.mjs)
  const wasm = join(root, 'wasm');
  if (existsSync(wasm)) cpSync(wasm, join(dist, 'wasm'), { recursive: true });
  // downloaded assets (tools/fetch-assets.mjs, fetch-sounds.mjs) are served from <repo>/assets by tools/serve.mjs;
  // copying gigabytes of scans into dist on every build is no longer needed
  const logo = join(root, 'logo');
  if (existsSync(logo)) cpSync(logo, join(dist, 'logo'), { recursive: true });
  const index = join(root, 'index.html');
  if (existsSync(index)) cpSync(index, join(dist, 'index.html'));
}

// ---------------------------------------------------------------------------- module libraries
// Three standalone ES modules for use in your own projects (import maps / bundlers):
//   lib/fondainegl.js  main module   lib/vorp.js  audio   lib/oaxis.js  models & animation
// Cross-module imports stay external and point at the sibling files, so each module ships once.
const LIBS = [
  { name: 'gl', src: 'packages/fondaineGL/src/index.ts', out: 'lib/fondainegl' },
  { name: 'vorp', src: 'packages/vorp/src/index.ts', out: 'lib/vorp' },
  { name: 'oaxis', src: 'packages/oaxis/src/index.ts', out: 'lib/oaxis' },
];
const LIB_FILE = { gl: './fondainegl.js', vorp: './vorp.js', oaxis: './oaxis.js' };
const libConfig = (lib) => ({
  entryPoints: [{ in: join(root, lib.src), out: lib.out }],
  outdir: dist, bundle: true, format: 'esm', target: 'es2022', sourcemap: true, minify: !watch, logLevel: 'warning', legalComments: 'none',
  plugins: [{
    name: 'fondaine-modules',
    setup(b) {
      b.onResolve({ filter: /^@fondaine\/(gl|vorp|oaxis)(\/.*)?$/ }, (args) => {
        const [, mod, sub] = args.path.match(/^@fondaine\/(gl|vorp|oaxis)(\/.*)?$/);
        if (mod !== lib.name) return { path: LIB_FILE[mod], external: true };
        const base = join(root, LIBS.find((l) => l.name === mod).src, '..');
        const f = sub ? join(base, sub.slice(1)) : join(base, 'index');
        return { path: existsSync(f + '.ts') ? f + '.ts' : join(f, 'index.ts') };
      });
    },
  }],
});

copyStatic();
if (watch) {
  const ctx = await context(common);
  await ctx.watch();
  console.log('[fondaine] watching…');
  if (serve) await import('./serve.mjs');
} else {
  await build(common);
  for (const lib of LIBS) await build(libConfig(lib));
  console.log('[fondaine] build complete →', dist);
}
