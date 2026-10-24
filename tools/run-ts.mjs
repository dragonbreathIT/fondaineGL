// Bundle a TypeScript entry with esbuild and run it in Node (tests / tooling).
//   node tools/run-ts.mjs path/to/file.ts [args...]
import { build } from 'esbuild';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const entry = process.argv[2];
if (!entry) { console.error('usage: node tools/run-ts.mjs <file.ts>'); process.exit(2); }
const out = join(mkdtempSync(join(tmpdir(), 'fondaine-')), 'run.mjs');
const res = await build({
  entryPoints: [resolve(entry)],
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
  sourcemap: 'inline',
  alias: {
    '@fondaine/gl': join(root, 'packages/fondaineGL/src'),
    '@fondaine/vorp': join(root, 'packages/vorp/src'),
    '@fondaine/oaxis': join(root, 'packages/oaxis/src'),
  },
  logLevel: 'error',
});
writeFileSync(out, res.outputFiles[0].text);
process.argv.splice(1, 2, out);
await import(pathToFileURL(out).href);
