// Builds the Rust crates (physics + vorp DSP) to WebAssembly and copies them into wasm/.
//   node tools/build-wasm.mjs
// Requires Rust (https://rustup.rs). The wasm32 target is added automatically if missing.
// Set FONDAINE_BUILD_STD=1 to build the standard library from source (only needed on toolchains without the
// prebuilt wasm32 std, e.g. offline mirrors).
import { execSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const crates = join(root, 'crates');
const out = join(root, 'wasm');
const target = 'wasm32-unknown-unknown';
const run = (cmd, opts = {}) => execSync(cmd, { stdio: 'inherit', cwd: crates, ...opts });

const buildStd = process.env.FONDAINE_BUILD_STD === '1';
if (!buildStd) {
  try {
    const installed = execSync('rustup target list --installed', { encoding: 'utf8' });
    if (!installed.includes(target)) {
      console.log(`[fondaine] adding Rust target ${target}…`);
      run(`rustup target add ${target}`);
    }
  } catch {
    console.warn('[fondaine] rustup not found — assuming the wasm32 target is available');
  }
}

const cmd = buildStd
  ? `cargo build --release --target ${target} -Zbuild-std=std,panic_abort`
  : `cargo build --release --target ${target}`;
console.log(`[fondaine] ${cmd}`);
run(cmd, { env: { ...process.env, ...(buildStd ? { RUSTC_BOOTSTRAP: '1' } : {}) } });

mkdirSync(out, { recursive: true });
for (const name of ['fondaine_physics', 'vorp_dsp']) {
  const src = join(crates, 'target', target, 'release', `${name}.wasm`);
  if (!existsSync(src)) { console.error(`[fondaine] missing ${src}`); process.exitCode = 1; continue; }
  const dst = join(out, `${name}.wasm`);
  copyFileSync(src, dst);
  // optional size optimisation with binaryen if installed
  try { execSync(`wasm-opt -O3 --enable-bulk-memory --enable-nontrapping-float-to-int ${dst} -o ${dst}`, { stdio: 'ignore' }); } catch { /* optional */ }
  console.log(`[fondaine] ${name}.wasm  ${(statSync(dst).size / 1024).toFixed(0)} KB`);
}
