# fondaine

A realism-first web game engine.

Three modules, each with its own tab (and its own presets) in the F1 tuning panel:

| Module | Import | What it is |
|---|---|---|
| **fondaineGL** `/f` — main module | `@fondaine/gl` · `dist/lib/fondainegl.js` | WebGPU renderer (photometric PBR, physical sky + clouds, path-traced GI probes, PCSS shadows, GTAO, TAA, depth of field, physical camera, lens & sensor) **plus** the engine runtime: ECS, scripting, input, Rust/WASM physics & ballistics, tuning, FPS controller, firearms, impacts |
| **vorp** | `@fondaine/vorp` · `dist/lib/vorp.js` | Physically based audio: acoustic pressure in pascals from the source to the eardrum (Rust → WASM in an AudioWorklet) |
| **oAxis** | `@fondaine/oaxis` · `dist/lib/oaxis.js` | Models & animation: glTF loader, skeletons/clips/mixer/IK, procedural real-scale weapons (AR carbine, C15 compact pistol), first-person gloved hands & arms, grass, treelines, range props |

The example is an FPS shooting range (`examples/range`); `examples/viewer` is an oAxis model viewer.

> Loading is deliberately heavy: textures are synthesised on the GPU and global illumination is path-traced against the level geometry at load (≈ 10–40 s on a desktop CPU). Use `?girays=64` or `?gi=0` while iterating.

---

## Quick start (Windows / macOS / Linux)

The zip already contains prebuilt WASM and JS, so you can run it immediately:

```
cd fondaine
node tools/serve.mjs
```

Open **http://localhost:8080/** in Chrome or Edge (WebGPU). Click the range, put headphones on, and press **F1** for the tuning panel.

**Get the scanned assets (strongly recommended, one time):**

```
npm install                  # once: meshoptimizer for decimation
node tools/fetch-assets.mjs
```

This downloads a CC0 set from Poly Haven (photoscanned ground/concrete/wood textures, scanned fir and pine trees, saplings, shrubs, grass clumps, deadwood, boulders), decimates each model to a game budget and writes `assets/manifest.json`. The range picks everything up automatically on the next load; anything missing falls back to the procedural version. See **Scanned assets** below.

> You need Node 18+ for the server. You don't need npm for running, only for rebuilding.

### Rebuild from source

```
npm install
npm run build        # Rust → WASM (adds the wasm32 target automatically) + TypeScript bundles
npm run serve
```

| Command | What it does |
|---|---|
| `npm run build:wasm` | `cargo build --release --target wasm32-unknown-unknown` for both crates → `wasm/` |
| `npm run build:ts` | esbuild bundles → `dist/` |
| `npm run dev` | watch + serve |
| `npm run typecheck` | `tsc` over every package |
| `npm test` | Rust unit tests (physics + vorp) |

Rust: install from https://rustup.rs. The build script runs `rustup target add wasm32-unknown-unknown` for you.

---

## Controls (range)

| Input | Action |
|---|---|
| Mouse / WASD / Shift / C / Space | look / move / sprint / crouch / jump |
| LMB / RMB | fire / aim down sights |
| 1 / 2 | carbine / C15 compact pistol (draw animation) |
| R | reload: the gun comes up to the chest, rolled so you see the magwell; the support hand drops the magazine, seats a fresh one and, after an empty reload, **racks the slide** (pistol: overhand on the rear serrations) or **charges the rifle** (charging handle, or the bolt catch when the bolt is locked back) |
| X | fire selector: **Safe → Semi → Auto** (lever animates, detent click; Safe gives a dead trigger click) |
| Q / E | lean |
| Alt while aiming | hold breath (less sway for ~4 s) |
| V | hearing protection: none → passive earmuffs → electronic earmuffs |
| H | camera rig: human eyes ↔ chest-mounted bodycam |
| F1 or ` | tuning panel |
| Gamepad | standard mapping, rumble on each shot |

URL options: `?rig=bodycam`, `?weapon=pistol`, `?sun=12&az=250` (low sun, golden hour), `?tex=512` (faster loading on weak GPUs), `?girays=256` (GI quality), `?gi=0`, `?grass=0.5`, `?trees=300`, `?arms=0`, `?scanned=0` (ignore downloaded assets), `?quick=1` (skip the loading screen).

---

### Hands and grips

The first-person hands are a procedurally sculpted, skinned hand + forearm mesh per side (`packages/oaxis/src/viewmodel/hand-mesh.ts`: SDF → surface nets → linear-blend skinning over 18 joints). `FirstPersonArms` renders them as **bare skin** or a **tactical glove** (`skin: 'glove'`: knit back, leather cuff with closure strap and pull tab, knuckle panel; the range uses gloves). Grip poses are authored per weapon (`COMPACT_PISTOL_GRIPS`, `CARBINE_GRIPS`) and then **fitted to the weapon geometry at load** (`fitWeaponGrips` in `viewmodel/grip-fit.ts`): the hand is moved by the smallest offset that gets the palm and straight proximal phalanges out of the metal, then each phalanx closes (proximal → distal) until it touches with a 0.8 mm gap; the thumb turns away if it stabs the frame; the trigger finger's contact is the frame above the guard and its pressed pose is fitted to the trigger shoe. Works for any `FirearmModel`, including glTF guns. `?fit=0` shows the raw authored poses (range and viewer; the viewer exposes `__fit`, `__clear(model, hand, fitted)` and `__sd(model, point)` for debugging).

### Reloads and racking

A reload is a phase plan (`Firearm.reloadPhase` / `phaseT`): **magOut** (the firing-hand thumb reaches and presses the magazine release, the empty magazine drops as a rigid body and clatters, the support hand drops to the chest pouch, the eyes dip towards the magwell), **magIn** (the fresh magazine rides up in the support hand; with `fumbleChance` it catches the magwell lip, bounces and seats on the second push; two-stage seat click), then either **charge** (overhand rack of the pistol slide / charging handle: hand travels, pulls, lets go, the recoil spring slams the action home), **release** (the AR's bolt catch is slapped when the bolt was locked back) or **settle** (tactical reload), and a quiet exhale. Everything is tunable per weapon under *Viewmodel → Reload: …*. Weapons describe racking through `FirearmModel.charge` (`grip`, `travelM`, `release: 'slingshot' | 'boltRelease'`, `pullDir`) and parts flagged `charge` (non-reciprocating charging handle) / `bolt` / `magazine` / `round` (the top cartridge, hidden when empty). Sprinting blends the carry over ~0.3 s; nothing snaps.

### Range URL parameters

`examples/range/?rig=bodycam` (or `eyes`) · `sun=38&az=145` sun elevation/azimuth · `tex=1024` procedural texture size · `debug=N` render debug view (1 normals, 2 AO, 3 velocity, 4 depth, 5 luminance false-colour, 6 raw HDR, 7 sky visibility, 8 ambient-only, 9 direct-only; also in F1 → AO & AA) · `demo=1&yaw=0&pitch=-1&ads=1&shots=3&fireAt=20` scripted capture.

Headless / scripted capture (`offscreen=1&frames=N` renders N frames off-screen, then blits the result and sets `window.__test.captured`): `dt=0.0167` simulated seconds per frame (deterministic, default 1/60) · `taa=0` no temporal AA (a sharp image after 3–4 frames; TAA needs ~20 to converge) · `empty=1` start with empty chambers (slides locked back) · `reloadAt=F&scrub=S` start a reload at frame F and jump its clock to S seconds · `rackAt=F` rack the action at frame F.

`tools/capture/capture.mjs <url> <out.png> [timeoutMs]` drives the above with Playwright + SwiftShader WebGPU (works in a sandbox without a GPU, ~90 s per shot with `trees=0&grass=0&gi=0&tex=256`); env `VIEW=960x540`, `EVAL=<js>` prints an expression evaluated on the page (e.g. `window.gun.reloadPhase`).

## What "realism" means here and where it comes from

Every knob is in physical or perceptual units, so tuning means matching reality rather than guessing.

### Light (fondaineGL)
- **Photometric units end to end.** The sun is defined by its top-of-atmosphere illuminance (128 000 lux) and is attenuated through a Rayleigh + Mie + ozone atmosphere. Lights are in candela or lumens and use inverse-square falloff. Emissive surfaces are specified in cd/m².
- **Physical camera.** Exposure is auto-metered (histogram, centre-weighted, eye-like adaptation speeds) or set by EV100 / aperture / shutter / ISO. HDR is pre-exposed so even the sun disk fits in fp16.
- **Shading.**
  - GGX with height-correlated Smith visibility and multiple-scattering energy compensation, plus Burley diffuse.
  - Specular anti-aliasing.
  - Sphere-light roughness widening, so the sun has a real angular size.
  - Specular occlusion.
  - Multi-bounce AO.
- **Sky & ambient.**
  - The sky is baked to an HDR cube, then GGX-prefiltered (filtered importance sampling) and projected to L2 spherical harmonics.
  - **Volumetric clouds** (`engine.sky.clouds.settings`, `engine.cloud({ position, size, density, mode: 'volumetric' | 'flat' })`): a planet-curved slab ray-marched with GPU-generated Perlin-Worley / Worley 3D noise, a paintable 2D weather field (coverage, type, flat channel), Beer-Lambert extinction, dual-lobe Henyey-Greenstein, multi-scattering octaves, powder term and sky/ground ambient — rendered into a direction-indexed dome at low resolution (temporally amortised, no reprojection needed) and composited into the environment cube so IBL/SH darken under cloud. **Matching cloud shadows** come from a projected sun-transmittance map. `mode: 'flat'` keeps the old 2D deck; `quality: 'low'` for software WebGPU.
  - **Wind** (`engine.wind.set({ speed, direction, gustiness })`): one model (mean vector + Perlin gusts with veer + turbulence) feeds foliage bend, smoke/dust drift, cloud drift (stronger, veered aloft) and the vorp ambience bed; `wind.onGust` fires at gust onsets.
  - **Baked global illumination:** at load, Rust path-traces an irradiance-probe grid (L1 SH per probe) against the physics BVH: sky light correctly occluded, sunlight bounced off every surface (per-surface albedo), multiple bounces. The weapon, hands and everything under the roof are lit by it. Tune under *fondaineGL → Global illumination*; rebake with `engine.bakeGlobalIllumination()`.
  - A baked sky-visibility volume still drives specular occlusion.
- **Vegetation:** geometric grass (individual curved blades, wind-animated on the GPU, translucent to back-light) and treelines of alpha-tested foliage cards with volumetric canopy normals.
- **Depth of field (eye model):** circle of confusion from the pupil (≈ 3 mm in daylight) and accommodation. While aiming, the eye focuses on the front sight, so the target goes soft exactly as it does in reality; at the hip focus follows the screen centre. The bodycam rig uses a tiny aperture (near-infinite DOF).
- **Edge wear:** curvature-driven wear on weapon finishes (bare steel on slide edges, scuffed polymer).
- **Shadows.**
  - Cascaded shadow maps, texel-snapped so they don't shimmer.
  - **PCSS** penumbrae computed from the sun's angular diameter (0.53°). Contact shadows are sharp and long ones are soft, as in reality.
- **Post (in physical order).**
  - GTAO
  - TAA (YCoCg variance clipping, Catmull-Rom history)
  - per-pixel motion blur by shutter angle
  - energy-conserving bloom (lens scatter)
  - lens distortion and chromatic aberration
  - cos⁴ natural vignetting
  - **sensor noise** (photon shot noise ∝ √signal plus read noise, scaled by ISO)
  - white balance in LMS
  - AgX / ACES / Khronos Neutral tonemapping
  - dithering
- **Procedural PBR materials.** Concrete, wood, anodised aluminium, parkerised steel, stippled polymer, painted AR500, dirt, gravel, grass, brass, paper targets, rubber, webbing, cardboard and mill-scale steel are synthesised on the GPU at physical scale. Swap in scanned textures at any time.

### Sound (vorp)
Sources produce the **pressure they'd produce 1 m away**, and everything after that is physics.

**Sources**
- **Muzzle blast.** The real blast-wave shape (Friedlander waveform, with its negative phase), plus a precursor shock, turbulent gas-plume roar and a perceptual body. Suppressor modelling includes first-round pop.
- **Supersonic crack.** A Whitham N-wave computed from bullet Mach number, calibre, length and miss distance, arriving from the Mach cone.
- **Steel targets.** Thin-plate modal synthesis from the plate's dimensions and material. Mode amplitudes come from the **actual hit position**, and Hertzian contact time sets brightness.
- **Mechanics and impacts.**
  - The bolt carrier group is modelled with receiver modes, timed from the rate of fire.
  - Brass casings ring when they hit concrete and thud on dirt; these are physics contact events.
  - Surface impacts and footsteps are filtered-noise and granular sources per material.

**Propagation (per voice)**
- Time of flight, so Doppler comes for free.
- Spherical spreading.
- **ISO 9613-1 air absorption** (distant shots lose their highs).
- Muzzle directivity: the rear of a gun is quieter and duller.
- Occlusion.
- **Binaural rendering** (Brown–Duda spherical head: ITD + head shadow, pinna elevation cue).

**Environment**
- **Image-source early reflections:** ground, nearby walls and roof found by physics raycasts, plus distant berms and tree lines.
- Late reverb from an 8-line FDN with 3-band RT60, or zero-latency partitioned convolution with your own IRs.

**The ear**
- Hearing protection: passive muffs, or electronic muffs that amplify, band-limit and clamp at 82 dB SPL.
- The acoustic reflex.
- **Temporary threshold shift**: unprotected shots muffle everything, recovering over time. Ear ringing (tinnitus) is **off by default**; enable it under *vorp → Hearing → Tinnitus level* (≈ −40 dBFS).
- Calibrated perceptual loudness mapping of the ~110 dB real-world range into a playable digital range, then a brick-wall limiter.

**Loud.** A browser can't exceed full scale, so vorp does what shipped shooters do:
- every shot gets a **report** layer (the sharp band-passed crack you feel in your teeth) and a **sub** layer (chest thump), on top of the physical blast;
- the blast spike is compacted (tanh drive) so the energy sits in the first 50 ms instead of a single sample the limiter would shave off;
- master chain: RMS compressor → soft-clip saturator (knee −5 dBFS) → brick-wall limiter at −0.5 dBFS;
- everything else ducks, and the hearing model (threshold shift, no ringing by default) reacts.

Result at the shooter, unprotected: rifle ≈ −5 dBFS RMS over the first 50 ms (was −18.5), earmuffs ≈ 3 dB quieter and duller. Measure it yourself with `cargo run --release --example loudness` in `crates/vorp-dsp`. Tune under **vorp → Master** (calibration, clip knee, makeup) and per-gun under each preset's *Report / Sub / Drive*.

**Per-gun signatures** (`packages/vorp/src/presets.ts`): 5.56 rifle (3.3 kHz crack, buffer sproing), short-barrel rifle (louder, longer roar), .308 (deep 50 Hz boom, 35 Hz sub), 9 mm pistol (1.8 kHz pop + slide clack 14 ms after the shot), 9 mm full-auto. Each weapon spec names its preset (`spec.audio`).

### Physics & weapons
- **External ballistics.**
  - G7 drag table, air density from temperature/pressure/humidity, wind, RK4 at 0.5 ms substeps.
  - Bullets drop and drift; ricochets depend on material and grazing angle.
  - The steel plates swing as real hinged pendulums from the momentum you put into them.
- **Recoil.**
  - Free-recoil impulse comes from conservation of momentum (bullet + propellant gas).
  - That impulse drives a shooter hold model: shoulder-coupled mass, bore height over the shoulder (muzzle rise), hold stiffness and damping, and unrecovered rise.
  - Change the cartridge, barrel length or weapon mass and the recoil changes for the right reasons.
- **Recoil feel.** On top of the physics model: a weapon kick spring (ω 46 rad/s, ζ 0.42) scaled by √(free-recoil energy), a camera view-punch spring, and heat-driven climb + random-walk wander under sustained fire (heat decays at 3.5 shots/s). Tune under *Weapon → kick / cameraPunch / autoClimb*.
- **Fire selector.** `FireMode = 'safe' | 'semi' | 'auto'`, per weapon via `spec.fireModes`. **X** cycles; the lever (model part flagged `selector`, rotated about `model.selector.pivot/axis` to `angles[mode]`) is damped, the hand cants with a thumb sweep, and vorp plays a two-stage detent click. Safe blocks the sear (dry click).
- **Sights.** Bore elevation is computed for the zero distance (50 m by default), so iron sights are actually zeroed.
- **Actions.** Pistol slides cycle (≈ 5 ms back, 8 ms home) and **lock open on an empty magazine**, so the barrel sticks out of the nose; slide release on reload. Magazines **drop as physics bodies** and clatter on concrete or thud on dirt. Triggers move. Weapons have draw/holster animations.
- **Hands.** oAxis gloved hands with articulated fingers (per-weapon grip poses), arms solved with two-bone IK from the shoulders; the support hand fetches and seats the magazine during reloads.
- **Locomotion.** Gait-synchronised head motion and footsteps, crouch with clearance check, lean, and the chest-mounted bodycam rig.

---

## Loading screen

Black for 1.5 s, then an **f** fades in slightly above centre; below it the current stage (texture synthesis, physics, GI bake, shader warm-up…) cross-fades each time it changes; a thin light sweeps along the bottom edge. It stays at least 2.6 s and fades out once the first frames are on the GPU. Style lives in `examples/range/index.html` (`#loader`), logic in `setStatus()` in `main.ts`.

---

## Scanned assets

Everything procedural can be replaced by a real scan, slot by slot. `tools/fetch-assets.mjs` downloads, converts, **decimates** (meshoptimizer, attribute-aware) and registers assets in `assets/manifest.json`; `AssetLibrary` (oAxis) serves them to the game.

| Command | What it does |
|---|---|
| `node tools/fetch-assets.mjs` | default CC0 set from Poly Haven (2K textures) |
| `node tools/fetch-assets.mjs polyhaven <id> --slot <slot> [--type model\|texture] [--res 4k] [--tris 60000]` | any Poly Haven texture/model into a slot |
| `node tools/fetch-assets.mjs sketchfab search "AR-15 rifle" --license by` | search downloadable Sketchfab models (✓ = CC0 / CC-BY) |
| `node tools/fetch-assets.mjs sketchfab get <uid> --slot <slot>` | download + decimate. Needs `SKETCHFAB_TOKEN` (your API token from sketchfab.com → Settings → Password & API). Other licences are refused unless `--allow-license` |
| `node tools/fetch-assets.mjs weapons` | the curated weapon set → `weapons.carbine`, `weapons.pistol` (see **Scanned weapons** below) |
| `node tools/fetch-assets.mjs convert arms.fbx --slot arms` | FBX → glTF via `npx fbx2gltf` (Mixamo characters) |
| `node tools/fetch-assets.mjs local <file.gltf/.glb> --slot <slot>` | register a model you already have |
| `node tools/fetch-assets.mjs credits` | rewrite `assets/CREDITS.md` (CC-BY must be credited; the range overlay lists them too) |

**Slots the range uses:** `range.concrete`, `range.gravel`, `range.dirt`, `range.berm`, `range.meadow`, `range.wood`, `range.lumber` (textures); `tree.fir`, `tree.pine` (instanced, height-normalised, 4 LOD levels built at load), `tree.*sapling`, `shrub.*`, `grass.clump`, `deadwood.stump`, `deadwood.trunk`, `rock.boulder` (scattered understory); `arms` (rigged first-person arms).

**Real arms:** download a character from mixamo.com (free Adobe account, FBX, T-pose, no animation), then `convert` it to slot `arms`. `SkinnedArms` drives its Mixamo skeleton with the same grip poses as the procedural hands (two-bone IK, clavicle protraction, finger flexion) and collapses everything except shoulders/arms/hands. Mixamo's licence lets you use characters in your game but not redistribute the raw files, so they are not included.

**Real guns:** see **Scanned weapons** below — any glTF becomes a `FirearmModel` with parts, sockets and grips.

**Scale:** instanced LOD (`InstancedLODSet`) draws thousands of scanned trees in a handful of draw calls; shadows use the coarser levels.

Viewer: `examples/viewer/?asset=<slot>` frames any slot on the table; `?rig=1&hands=1&eye=1&pov=1` shows the rigged arms.

### Scanned weapons

Photoreal guns come from authored or scanned models, not from procedural geometry — the procedural C15 and carbine are the zero-download fallback. The pipeline is an engine feature: a glTF goes in, a `FirearmModel` with animated parts, sockets, a charging contract and fitted hands comes out, and the range picks it up by slot.

| Command | What it does |
|---|---|
| `node tools/fetch-assets.mjs weapons` | **without `SKETCHFAB_TOKEN`**: queries the public Sketchfab search ("AR-15 rifle", "M4 carbine" / "9mm pistol polymer", "compact pistol", "handgun", "generic pistol"), keeps CC0 / CC-BY downloadable models, sorts by likes, filters out characters, attachments, stylised and low-poly results, and for the pistol every brand or trademarked model name (Glock, SIG, H&K, Beretta, CZ, Walther, S&W, Colt / 1911, FN, Ruger, Springfield, Taurus, Kimber, Canik, Steyr, Daniel Defense, BCM, LWRC, Noveske, Makarov, … — the list is in the script); prints the ranked candidates with uid, licence, triangles and likes, marks the pick (→) and exits 0. **With the token**: downloads the picks, keeps the node structure (slide / magazine / trigger stay separate meshes), keeps textures up to 2k (larger ones are downscaled when ImageMagick is on the PATH), decimates only above 300k triangles (`--tris`), registers `weapons.carbine` / `weapons.pistol` with their mapping hints and credits them in `assets/CREDITS.md` |
| `… weapons --pistol <uid> --carbine <uid>` | pick other candidates (anything CC0 / CC-BY; the pistol must stay unbranded) |
| `… weapons --only pistol` / `--list` | one slot / list without downloading even with a token |
| `… sketchfab get <uid> --slot weapons.pistol` | a single model into a weapon slot (same per-node import) |
| `… local my-gun.glb --slot weapons.pistol` | your own model |

**Licence rules:** only CC0 and CC-BY are accepted (read from Sketchfab's licence field at download time); CC-BY requires the attribution in `assets/CREDITS.md`, which the range overlay also shows. No branded or trademarked pistol designs in the curated set — a generic AR-pattern rifle is fine, the pistol must be a generic or fictional polymer pistol. Nothing under `assets/` is committed.

**What the engine does with the model** (`weaponFromGLTF(renderer, inst, mapping)` in oAxis, used by `loadScannedWeapon(renderer, assets, slot)`):

* **Orientation and scale** — `autoOrient: true` finds the frame from the geometry: the thin axis is the width, in the plane across it the rotation with the smallest bounding rectangle gives the bore axis, the grip hanging down fixes "up"; "forward" comes from the ends (the butt end of a stock or raked grip carries far more surface than the barrel / slide nose at the muzzle end), else from where the grip and magazine hang, and the console names the cue that decided; the scale comes from the `kind` (pistol ≈ 0.19 m, carbine ≈ 0.85 m, or `lengthM` / `scale`). The bore is put on x = y = 0 and the trigger at the reference z of the procedural model of the same kind, so the specs' hip offset and eye relief fit unchanged.
* **Parts** — by name first (regexes for `slide|bolt|carrier`, `magazine`, `trigger`, `selector|safety`, `charging handle`), then by geometry for anything unnamed: the long mesh riding above the bore is the slide (pistol), the tall mesh hanging under the bore the magazine, the small mesh inside the trigger guard the trigger, the flat mesh on the rear of the receiver the charging handle (rifle). The `warnings` list every guess.
* **Sockets** — empties named `muzzle` / `ejection_port` / `rear_sight` / `front_sight` win; otherwise muzzle = foremost point on the bore line, sights = topmost points of the front / rear quarter, ejection port = right side above the chamber. `magAxis` comes from the magazine's long axis, `magBox` from its bounds, the rifle's `charge` grip from the charging handle (pistols rack the slide).
* **Grips** — `deriveWeaponGrips`: the pistol grip is the column hanging below the bore behind the trigger; its rake comes from the back strap, the firing hand's knuckles sit just behind the front strap, the support hand goes on the handguard (rifle) or wraps over the firing hand (pistol), another pose goes under the magazine. Finger curls are then solved against the actual triangles by `fitWeaponGrips`.

**Overrides:** `assets/weapons/<slot>.mapping.json` (written as a template by `weapons`, merged over the manifest's `hints.weapon`) is a `WeaponMapping`: `"reverse": true` when the gun loads backwards (turns it end for end after auto-orientation), `forward` / `up` / `scale` / `lengthM` instead of auto-orientation, regexes per part (`"slide": "Slide|Upper"`), `sockets` in weapon space (`"muzzle": [0, 0, -0.11]`), `magAxis`, `magBox`, `triggerTravelM`, `chargeContract`, `casing`, and `grips` (authored `WeaponGrips`, skips the derivation). The viewer shows the result: `examples/viewer/?weapon=weapons.pistol&hands=1&glove=1&eye=1` (a file under `assets/` works too: `?weapon=weapons/test/pistol.glb`), and `node tools/run-ts.mjs packages/oaxis/test/weapons-gltf.test.ts --write assets/weapons/test` exports the procedural guns as glTF test files for exactly that.

### Recorded sounds

The gunshots, handling foley, impacts, footsteps and ambience are synthesized (vorp) so the engine runs with zero files — but recordings sound more real. `tools/fetch-sounds.mjs` downloads licence-clean recordings, converts them (48 kHz mono WAV, leading silence trimmed, peak at −1 dBFS, multi-take files split into one file per shot) and registers them in the `sounds` section of `assets/manifest.json`; vorp plays a loaded slot **through the same chain as the synthesis** (directivity, spreading, air absorption, image-source reflections, hearing model, loudness mapping) with ±1 semitone / ±1 dB variation and never the same take twice in a row, keeping a reduced synth bed underneath (`synthBedDb`, −9 dB: body + sub punch, compacted spike) so the chest punch and the hearing model keep working. A slot that is not loaded falls back to pure synthesis.

| Command | What it does |
|---|---|
| `node tools/fetch-sounds.mjs` | default set. Without a token: **CC0 recordings from OpenGameArt** (The Free Firearm Sound Library: AR-15, 9 mm PPQ, 9 mm M45, .30-06, AK-47, 1911 — real shots, near + mid-distance takes; magazine loads, metal/wood hits, footsteps, birds, wind). With `FREESOUND_TOKEN`: also the Freesound set (slide rack, charging handle, bolt release, mag release, dry fire, suppressed shots, bullet cracks, steel plates, casings, footsteps, ambience) |
| `FREESOUND_TOKEN=… node tools/fetch-sounds.mjs search "ar-15 gunshot" [--license cc0\|by]` | search Freesound (CC0 or CC-BY only) |
| `node tools/fetch-sounds.mjs get <freesoundId> --slot shot.rifle556 [--split shots]` | one Freesound sound into a slot (HQ OGG preview; originals would need OAuth) |
| `node tools/fetch-sounds.mjs oga <page-slug> --slot <slot> [--file <regex>] [--inner <regex>] [--split shots]` | an OpenGameArt page (licence read from the page) |
| `node tools/fetch-sounds.mjs local shot.wav --slot shot.rifle556 --license CC0 --author … --url …` | a recording you own |
| `node tools/fetch-sounds.mjs list \| credits \| clean` | registered sounds / rewrite `assets/CREDITS.md` / remove them |

**Licences:** only CC0 and CC-BY are accepted, read from the source itself (Freesound's `license` field, the licence block of the OpenGameArt page) at download time and recorded per file (title, author, licence, URL, source id) in the manifest and in `assets/CREDITS.md`. If nothing can be verified the tool writes nothing. CC-BY recordings must be credited when you ship (the range overlay lists them with the scanned assets). Nothing under `assets/` is committed.

**Token:** `FREESOUND_TOKEN` is a free Freesound account's API key (freesound.org → your profile → *API credentials*). It downloads the 128 kbps OGG previews, which is plenty for a shot through the vorp chain.

**Slots** are families: `shot.rifle556` means `shot.rifle556.01`, `.02`, … and one is picked per shot. Presets name their slots (`GUNSHOTS[*].samples`: `shot` / `shotTail` / `auto` / `suppressed`; `MECH[*].sample`), impacts use `impact.<material>`, footsteps `step.<surface>`, ambience beds `amb.birds` / `amb.wind`. Per-file `gainDb` / `trimMs` in the manifest are applied at load. Load them in a game with `engine.audio.loadSoundAssets('../../assets/manifest.json')` (files are fetched immediately, decoded when audio starts on the first click). `ffmpeg` on the PATH converts any format; without it WAV sources still convert and OGG/MP3 are kept for the browser to decode. The Free Firearm Sound Library is a 194 MB `.7z`: have `7z` on the PATH or `pip install py7zr`.

---

## Getting "Bodycam-game" quality

The engine side is in place. The remaining gap is almost entirely **content**, which is true of Unreal too:

1. **Scanned assets.** The range uses procedural geometry and textures so it ships with zero external files. Replace them with photogrammetry or hand-modelled assets:
   - Load glTF with `gltf.loadGLTF(url)`. It supports PBR materials, KHR_texture_transform, emissive strength, lights, skins and animations.
   - Create `Mesh`/`Material`/`RenderObject` from the result.
   - Use 4K PBR textures (albedo, normal, ORM) with real-world scale.
2. **A real weapon model.** oAxis builds dimensionally accurate weapons from primitives (`buildCarbine`, `buildCompactPistol`). For production, load a modelled weapon and keep the same `FirearmModel` contract: parts flagged `bolt` / `magazine` / `trigger`, plus muzzle, ejection port, sight points, `magAxis`, `magBox`, and `WeaponGrips` for the hands.
3. **Arms and hands.** `FirstPersonArms` gives procedural gloved hands; for production swap in a scanned skinned arms mesh driven by the same grip poses (oAxis animation: glTF skins, crossfades, additive layers, bone masks, two-bone IK).
4. **Bodycam look.** Press **H**. The rig drives:
   - FOV 82° vertical with barrel distortion
   - CA, strong natural vignetting
   - ISO-1600 sensor noise
   - fast auto-exposure, 120° shutter
   - over-sharpening
   - chest-mount lag

   It's all tunable under *Lens & sensor*, *Exposure*, *Tone & colour* and *Player*.
5. **Recorded foley (optional).** vorp mixes synthesis with recordings. Use `vorp.loadSample(id, url)` and `vorp.sample(id, pos, gainPa)` for real bolt and magazine sounds, and `vorp.loadImpulseResponse(url)` for measured spaces.

**Tuning workflow:**
- **F1** opens the panel: one tab per module (**fondaineGL**, **vorp**, **oAxis**). *Save* / *Load* / *Export* / *Import* act on the selected module, so a visual look, a sound, and weapon handling are separate presets.
- In **AO & AA → Debug view**, **5** shows absolute luminance in cd/m² (false colour). Use it to check that your scene's light levels match reality: sunlit ground ≈ 2 000–6 000 cd/m², shade ≈ 200–800.
- **vorp-lab** (`/tools/vorp-lab/`) renders any source with the game's DSP and shows the dry waveform in pascals, the heard result, and a spectrogram. You can export WAVs and save presets.

---

## Writing games: scripting

```ts
import { Engine, Behaviour, Firearm, FPSController, box } from '@fondaine/gl';
import { buildCompactPistol, FirstPersonArms } from '@fondaine/oaxis';

class Spinner extends Behaviour {
  speed = 1.5; // rad/s
  onStart() { this.tune('speed', { min: 0, max: 10, unit: 'rad/s' }); } // shows up in F1
  onUpdate(dt: number) { this.transform.setEuler(0, this.time * this.speed, 0); }
}

const engine = await Engine.create({ canvas });
const crate = engine.createEntity('crate', [0, 1, -3]);
engine.addMesh(crate, box(1, 1, 1), engine.renderer.synth.material('wood'));
engine.addScript(crate, new Spinner());

// a player with the C15 pistol and gloved hands
const player = engine.createEntity('player', [0, 0, 0]);
const ctrl = engine.addScript(player, new FPSController());
const pistol = buildCompactPistol(engine.renderer);
const gun = engine.addScript(player, new Firearm(pistol.spec, pistol.model, ctrl));
const arms = new FirstPersonArms(engine.renderer).addTo(engine.scene);
engine.onLate.push(() => arms.update(gun.rootWorld, pistol.grips!, { position: ctrl.eyePos, rotation: ctrl.eyeRot }, { trigger: gun.anim.trigger }));
engine.start();
```

**Behaviour hooks:**
- `onStart`
- `onFixedUpdate(dt)`, at 120 Hz alongside physics
- `onUpdate(dt)`
- `onLateUpdate(dt)`
- `onDestroy`

**Accessors:** `this.transform`, `this.input`, `this.physics`, `this.audio`, `this.renderer`, `this.engine`.

**Entity API:** `engine.createEntity`, `addMesh`, `addScript`, `destroy`, plus `engine.world` (ECS: `defineComponent`, `world.add/get/query`).

**Physics:**
- `physics.raycast`, `createCharacter`, `createBody`, `spawnProjectile`
- `onProjectileHit`, `onContact`
- `setAtmosphere`, `bakeSkyVisibility`

**Audio:**
- `engine.audio.gunshot / impact / modal / footstep`
- the raw `Vorp` API: `spawn`, `noise`, `modal`, `crack`, `sample`, `setTaps`, `setHearing`, `setMaster`, `setZone`

A custom scripting language is planned for after M1, so it can be designed around how the engine is actually used. The TypeScript API above is what it will compile to.

---

## Layout

```
crates/
  fondaine-physics/   Rust: BVH, raycasts, character, rigid bodies, G7 ballistics, sky-visibility + GI probe bake
  vorp-dsp/           Rust: sources, propagation, binaural, reflections, FDN/convolution, hearing, dynamics
packages/
  fondaineGL/         MAIN MODULE — src/*.ts renderer (TS + WGSL), src/runtime/ engine runtime, src/gameplay/
  vorp/               audio host, AudioWorklet, parameter schemas, presets, acoustics models
  oaxis/              models & animation: gltf/, animation/, weapons/, viewmodel/ (hands), vegetation/, props/
examples/range/       the shooting range
examples/viewer/      oAxis model viewer (?model=pistol&hands=1&eye=1&pov=1, ?asset=<slot>, ?rig=1)
assets/               downloaded scans + manifest.json (created by tools/fetch-assets.mjs)
tools/                build scripts, dev server, vorp-lab, fetch-assets
wasm/  dist/          prebuilt outputs
docs/vorp-reference/  offline renders of reference scenarios (WAV)
```

## Honest limitations (M1)

- **Viewmodel lighting is a compromise.** Under the roof the first-person gun and gloves receive only ambient light; a physical render makes them near-black against the sunlit range. *Sky → Viewmodel ambient fill* (default 1.7×, ambient term only) stands in for the eye's local adaptation until a proper local tone mapper exists.
- **No hardware ray tracing on the web.**
  - GI is a path-traced probe bake that runs at load on a **web-worker pool** (cores − 1) and **re-bakes automatically** ~0.6 s after the sun or sky changes. It's not per-frame: dynamic objects receive GI but don't contribute. Outside the probe volume the analytic sky fill is used.
  - The sky-visibility bake still runs on the main thread, so loading-screen text pauses briefly during it (the sweep line keeps going).
  - No screen-space reflections yet. The rifle's rear aperture is still drawn as a ghost ring (DOF can't reproduce looking *through* a 1.8 mm aperture).
- **Assets ship procedural.** Without `fetch-assets` everything is built from code. The scanned pipeline is in place, but there is no CC0 photoscanned *gun* or *arms* of Bodycam quality to bundle: get a gun from Sketchfab (check its licence) or model one, and arms from Mixamo. The bundled C15 / carbine are original designs, not copies of real products.
- **Textures and assets.** meshopt-compressed glTF is decoded; KTX2/Basis and Draco aren't yet (the loader says so). PNG/JPEG textures work.
- **Physics and audio occlusion.**
  - Characters don't push physics bodies (casings, plates) yet.
  - Occlusion is a single ray: thin walls and large walls attenuate the same.
- **Projectiles.** There's no bullet penetration through solid materials (paper targets are handled as pass-through). Spin drift and Coriolis aren't modelled.
- **Audio scheduling.** The audio worklet receives commands via `postMessage` each frame, giving ≈ 1 frame + 1 quantum of latency. A SharedArrayBuffer ring is the next step (the dev server already sends the COOP/COEP headers).

## Licence

Yours. All code in this repository was written for this project. One third-party runtime dependency: `meshoptimizer` (MIT), bundled for mesh decoding/decimation. Downloaded assets keep their own licences (see `assets/CREDITS.md`).
