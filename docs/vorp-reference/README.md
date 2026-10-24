# vorp reference renders

Offline renders of reference scenarios through the full vorp chain (sources → propagation → early
reflections → late reverb → hearing model → perceptual mapping → overload saturator → limiter), 48 kHz,
16-bit stereo. They are produced with the real TypeScript presets by

```
node tools/run-ts.mjs packages/vorp/test/render-reference.ts        # writes docs/vorp-reference/*.wav
node packages/vorp/test/analyze-reference.mjs docs/vorp-reference    # metrics table (add a 2nd dir for before → after)
node packages/vorp/test/detail-reference.mjs docs/vorp-reference/01_shooter_unprotected.wav   # envelope + bands
```

Shooter scenes: eyes at 1.65 m looking −Z, muzzle 0.75 m ahead (slightly right/below), ejection port by the
cheek, under the roof of a covered firing point (concrete floor, steel roof at 2.8 m, plywood baffles 1.8 m
either side, block wall 2.5 m behind, open front) with the `coveredRange` zone (berm / tree-line slap echoes at
140–230 m). Early reflections are first-order image sources (`shoeboxTaps` in `acoustics.ts`).

| # | file | scenario |
|---|---|---|
| 01 | `01_shooter_unprotected.wav` | one 5.56×45 16" shot, no hearing protection |
| 02 | `02_shooter_passive_muffs.wav` | same, passive earmuffs (−25 dB, LF leaking through the cup) |
| 03 | `03_shooter_electronic_muffs.wav` | same, electronic earmuffs (ambience through, shot limited at 82 dB SPL) |
| 04 | `04_shooter_suppressed.wav` | same, suppressed |
| 05 | `05_bystander_25m.wav` | open range, 25 m beside a shooter firing away |
| 06 | `06_downrange_300m_crack_then_boom.wav` | 300 m downrange, 3 m off the bullet path: N-wave crack, then the muzzle report |
| 07 | `07_steel_plate_100m.wav` | AR500 plate (300×450×9.5 mm) hit, 100 m away |
| 08 | `08_full_auto_10rd.wav` | 10-round full-auto burst at 800 rpm, 5.56 16", unprotected under the roof |
| 09 | `09_pistol_9mm.wav` | one 9×19 4" pistol shot under the roof |
| 10 | `10_reload_sequence.wav` | mag release, mag out, mag hits concrete, mag seats (two-stage), charging handle, carrier stop, carrier slams home, exhale (`MECH` + `BREATH` presets) |

## Loudness contract

Measured by `analyze-reference.mjs` (onset = first sample within 12 dB of the file's peak; RMS windows start at
the onset; LF = below 150 Hz; *t −20 dB* = time from the onset until the 20 ms RMS envelope stays 20 dB under
its peak; floor = RMS of the last 200 ms). Targets for the shooter's own unprotected shot:

* peak ≥ −0.5 dBFS and the first 2–5 ms at full scale — **met** (the 1 ms peaks are at the limiter ceiling from
  the first millisecond of the blast on; the 3 ms hammer-fall click before ignition is 20 dB lower);
* first 50 ms RMS ≥ −8 dBFS — **met** (−3.3 dBFS; the 300 ms RMS is −7.8, i.e. the body of the shot stays dense
  instead of collapsing 16 dB at 30 ms as before);
* low end clearly stronger and longer — **met in absolute terms**: LF RMS over the first second rose 3.3 dB
  (−21.2 → −17.9 dBFS) and the sub/body now decay over 320–420 ms instead of 140–160 ms. The LF *share* fell
  (83 % → 20 %) because the old render was essentially one clipped 46 Hz sine; now the crack and the roar carry
  real energy too;
* decay to −20 dB ≥ 0.6 s under the roof — **met** (0.66 s; before, 0.82 s was a −20 dB slap from the 140 m berm
  arriving after a tail that had already fallen 40 dB in 100 ms — see "What changed");
* each burst onset within 1.5 dB of the first — **met** (0.3 dB spread);
* handling 30–40 dB under the shot — **met**: the reload sequence peaks at −12.9 dBFS (bolt slamming home 22 cm
  from the ear) and its loudest 50 ms RMS is −39.6 dBFS against −3.3 for the shot; the breath sits at −65 dBFS.

## Before → after

"before" is the chain as of the previous commit rendered with the same scenario script (wasm + presets of that
state); "after" is the current tree.

| file | | peak dBFS | RMS 50 ms | RMS 300 ms | RMS 1 s | crest dB | centroid Hz | LF share | LF RMS 1 s | t −20 dB s | floor dBFS |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 01_shooter_unprotected.wav | before | -0.5 | -5.7 | -13.5 | -18.5 | 18.0 | 389 | 83% | -21.2 | 0.82 | -75.7 |
|  | after | -0.3 | -3.3 | -7.8 | -12.6 | 12.3 | 1559 | 20% | -17.9 | 0.66 | -54.7 |
| 02_shooter_passive_muffs.wav | before | -0.5 | -8.8 | -16.6 | -21.8 | 21.3 | 138 | 92% | -23.3 | 0.04 | -117.6 |
|  | after | -0.3 | -6.2 | -12.6 | -17.6 | 17.3 | 397 | 72% | -18.7 | 0.31 | -115.1 |
| 03_shooter_electronic_muffs.wav | before | -0.5 | -10.4 | -18.1 | -23.1 | 22.6 | 595 | 68% | -25.7 | 0.81 | -69.7 |
|  | after | -0.3 | -7.3 | -13.9 | -19.0 | 18.7 | 451 | 70% | -20.0 | 0.20 | -84.4 |
| 04_shooter_suppressed.wav | before | -0.5 | -11.4 | -18.8 | -24.0 | 23.5 | 1831 | 11% | -26.8 | 0.09 | -74.9 |
|  | after | -0.3 | -12.2 | -17.8 | -23.0 | 22.7 | 1554 | 10% | -27.5 | 0.28 | -90.4 |
| 05_bystander_25m.wav | before | -0.5 | -8.6 | -16.1 | -20.8 | 20.3 | 368 | 84% | -23.1 | 0.77 | -75.0 |
|  | after | -0.3 | -7.5 | -12.8 | -17.6 | 17.3 | 1506 | 42% | -21.2 | 0.77 | -87.8 |
| 06_downrange_300m_crack_then_boom.wav | before | -0.5 | -20.0 | -27.8 | -23.0 | 22.5 | 3171 | 1% | -25.7 | 0.65 | -72.5 |
|  | after | -0.3 | -22.7 | -30.4 | -19.8 | 19.5 | 5185 | 0% | -23.9 | 0.65 | -66.2 |
| 07_steel_plate_100m.wav | before | -0.6 | -15.5 | -19.8 | -23.4 | 22.8 | 589 | 0% | -39.2 | 1.11 | -74.1 |
|  | after | -10.8 | -21.6 | -24.5 | -28.4 | 17.6 | 590 | 0% | -45.9 | 0.94 | -87.6 |
| 08_full_auto_10rd.wav | before | -0.5 | -5.7 | -9.8 | -11.9 | 11.4 | 1006 | 54% | -14.8 | 0.71 | -79.9 |
|  | after | -0.0 | -3.3 | -4.3 | -5.9 | 5.9 | 1138 | 24% | -12.0 | 1.17 | -34.5 |
|  ↳ onset peaks re. shot 1 (dB) | before | 0.0, -0.2, -0.1, 0.0, 0.0, -0.1, -0.0, 0.0, -0.2, 0.0 |
|  ↳ onset peaks re. shot 1 (dB) | after | 0.0, 0.1, 0.1, 0.2, 0.2, 0.2, 0.2, 0.3, 0.2, 0.3 |
| 09_pistol_9mm.wav | before | -0.5 | -5.4 | -13.2 | -18.3 | 17.8 | 233 | 90% | -20.8 | 0.82 | -75.6 |
|  | after | -0.3 | -3.5 | -10.1 | -15.2 | 14.9 | 1679 | 23% | -19.3 | 0.35 | -63.0 |
| 10_reload_sequence.wav | before | -0.5 | -29.6 | -36.9 | -34.4 | 33.9 | 2419 | 0% | -41.3 | 0.01 | -76.0 |
|  | after | -12.9 | -39.6 | -42.5 | -43.3 | 30.4 | 1545 | 5% | -58.9 | 0.01 | -91.2 |

Reading the table: 02/03 are now 5–6 dB quieter than the open-ear shot over 300 ms and almost all low end
(centroid 400–450 Hz vs 1560 Hz), with no threshold shift and no ring; before, the protected shots were only
3 dB under and the open-ear shot itself was LF mush. 07 (plate at 100 m) no longer hits full scale: at −10.8
dBFS it sits where a 101 dB SPL event belongs under the new calibration. 08's floor (−34.5 dBFS) is the tinnitus
ring at full level after the burst; 01's (−54.7) is a faint ring after a single shot. 06's 50 ms figure is the
N-wave crack (a few hundred µs long), its 1 s figure includes the muzzle report 0.9 s later.

## What changed (summary)

* **Source** (`crates/vorp-dsp/src/sources/gunshot.rs`): the spike compaction now clips only the Friedlander
  blast; crack, roar, body and sub are summed after it (before, body/sub/roar at −5…−10 dB were all driven
  through the same tanh 12 dB under the spike → a flat-topped 46–72 Hz buzz). Body = two partials with a soft-
  saturated attack; roar = plume + late roar (0.4 × level, 3 × decay); crack brighter and shorter.
* **Mapping** (`dynamics.rs`, `engine.rs`): calibration 100 → 112 dB SPL at 0 dBFS, compressor threshold −6
  dBFS, ratio 2.6, attack 0.3 ms (each onset is measured on its own level), program-dependent release (90 ms
  after a brief peak, 4× slower when sustained); the symmetric soft clip became an overload saturator
  (asymmetric knee + a lowpass that drops to 4.5 kHz while driven and recovers in 45 ms); limiter ceiling −0.3
  dBFS with program-dependent release. Footsteps (74 dB SPL at 1 m) now land at −38 dBFS.
* **Hearing** (`hearing.rs`): fast post-impulse dulling (4th-order lowpass to 4 kHz, recovering with 350 ms)
  on top of the slow TTS; TTS recovery 10 s, muffling ×1.0, tinnitus on by default (−30 dBFS at full TTS, 5.2
  kHz, full after ~3 unprotected rifle shots); passive muffs leak 8 dB more below 220 Hz; the electronic mode
  keeps the same passive leak under the limited mic path.
* **Presets** (`packages/vorp/src/presets.ts`): guns re-voiced (9 mm = sharp hard snap with little body,
  5.56 = violent 4.2 kHz crack + 70 Hz punch + 360 ms roar, SBR and .308 consistent), `coveredRange` zone,
  `MECH` handling presets and `BREATH`.
