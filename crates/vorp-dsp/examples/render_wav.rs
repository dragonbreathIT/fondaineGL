//! Offline renders of reference scenarios to 16-bit WAV for listening / analysis:
//!   cargo run --release -p vorp-dsp --example render_wav -- <out_dir>
//! Scenarios: shooter's ears (unprotected, passive muffs, electronic muffs), bystander 25 m, 300 m downrange
//! (crack + delayed boom), suppressed, steel-plate hit at 100 m.

use std::io::Write;
use vorp_dsp::engine::Engine;
use vorp_dsp::params::{gunshot as G, hearing as H, kind, op, reverb as R, spawn as S};
use vorp_dsp::util::BLOCK;

fn cmd(e: &mut Engine, opcode: u32, args: &[f32]) {
    let mut v = vec![opcode as f32, args.len() as f32];
    v.extend_from_slice(args);
    e.cmd[..v.len()].copy_from_slice(&v);
    e.exec(v.len());
}

fn spawn(e: &mut Engine, id: u32, k: u32, bus: u32, pos: [f32; 3], dir: [f32; 3], directivity: f32, rear_lp: f32,
         dist_mode: f32, send_db: f32, delay_ms: f32, params: &[f32]) {
    let mut h = vec![0.0f32; S::HEADER];
    h[S::VOICE_ID] = id as f32;
    h[S::KIND] = k as f32;
    h[S::BUS] = bus as f32;
    h[S::PX..S::PX + 3].copy_from_slice(&pos);
    h[S::DX..S::DX + 3].copy_from_slice(&dir);
    h[S::DIRECTIVITY_DB] = directivity;
    h[S::REAR_LP_HZ] = rear_lp;
    h[S::DISTANCE_MODE] = dist_mode;
    h[S::MIN_DIST] = 0.1;
    h[S::REVERB_SEND_DB] = send_db;
    h[S::SPATIAL] = 1.0;
    h[S::DELAY_MS] = delay_ms;
    h.extend_from_slice(params);
    cmd(e, op::SPAWN, &h);
}

/// Reverb send relative to the 1 m direct sound = -20·log10(critical distance). Open range ≈ 30 m.
const RANGE_SEND_DB: f32 = -29.5;

fn outdoor_range(e: &mut Engine) {
    let mut r = [0.0f32; R::COUNT];
    r[R::RT60_LOW] = 1.6; r[R::RT60_MID] = 1.1; r[R::RT60_HIGH] = 0.35;
    r[R::XOVER_LOW] = 300.0; r[R::XOVER_HIGH] = 2500.0; r[R::SIZE] = 5.0; r[R::DIFFUSION] = 0.5;
    r[R::PREDELAY_MS] = 60.0; r[R::MOD_DEPTH_MS] = 0.4; r[R::MOD_RATE_HZ] = 0.4; r[R::LEVEL_DB] = 0.0; r[R::TONE_HZ] = 5000.0;
    cmd(e, op::REVERB, &r);
}

fn rifle() -> Vec<f32> {
    let mut p = G::DEFAULTS.to_vec();
    p[G::SEED] = 7.0;
    p
}

fn write_wav(path: &str, l: &[f32], r: &[f32], sr: u32) {
    let mut f = std::fs::File::create(path).unwrap();
    let n = l.len() as u32;
    let data_bytes = n * 4;
    f.write_all(b"RIFF").unwrap();
    f.write_all(&(36 + data_bytes).to_le_bytes()).unwrap();
    f.write_all(b"WAVEfmt ").unwrap();
    f.write_all(&16u32.to_le_bytes()).unwrap();
    f.write_all(&1u16.to_le_bytes()).unwrap();
    f.write_all(&2u16.to_le_bytes()).unwrap();
    f.write_all(&sr.to_le_bytes()).unwrap();
    f.write_all(&(sr * 4).to_le_bytes()).unwrap();
    f.write_all(&4u16.to_le_bytes()).unwrap();
    f.write_all(&16u16.to_le_bytes()).unwrap();
    f.write_all(b"data").unwrap();
    f.write_all(&data_bytes.to_le_bytes()).unwrap();
    for i in 0..l.len() {
        for v in [l[i], r[i]] {
            let s = (v.clamp(-1.0, 1.0) * 32767.0) as i16;
            f.write_all(&s.to_le_bytes()).unwrap();
        }
    }
}

fn run(e: &mut Engine, seconds: f32) -> (Vec<f32>, Vec<f32>) {
    let blocks = (seconds * e.sr / BLOCK as f32) as usize;
    let mut l = Vec::with_capacity(blocks * BLOCK);
    let mut r = Vec::with_capacity(blocks * BLOCK);
    for _ in 0..blocks {
        e.process();
        l.extend_from_slice(&e.out[..BLOCK]);
        r.extend_from_slice(&e.out[BLOCK..]);
    }
    (l, r)
}

/// Shooter perspective: muzzle 0.75 m ahead of the eyes, slightly right/below; ejection port near the cheek.
fn shooter_volley(e: &mut Engine, shots: usize, interval_ms: f32, suppressed: bool) {
    let mut p = rifle();
    if suppressed { p[G::SUPPRESS] = 1.0; }
    for k in 0..shots {
        p[G::SEED] = k as f32 + 1.0;
        spawn(e, 10 + k as u32, kind::GUNSHOT, 0, [0.05, -0.08, -0.75], [0.0, 0.0, -1.0], p[G::DIRECTIVITY_DB], p[G::REAR_LP_HZ], 0.0, RANGE_SEND_DB, k as f32 * interval_ms, &p);
        // ground reflection image of the muzzle (muzzle 1.5 m above ground, ears 1.6 m): path ≈ sqrt(0.75² + 3.1²)
        // (taps are added via VOICE_TAPS in the engine host; omitted here)
        // bolt carrier: unlock at +3 ms, return to battery at +72 ms
        let mut modal = vec![1.0, 6.0, 2.0, k as f32];
        for (f, t60, a) in [(1180.0, 0.05, 0.9), (2230.0, 0.04, 1.0), (3410.0, 0.035, 0.8), (4870.0, 0.03, 0.6), (6620.0, 0.02, 0.45), (8900.0, 0.015, 0.3)] {
            modal.extend_from_slice(&[f, t60, a * 0.6]);
        }
        modal.extend_from_slice(&[3.0, 1.0, 0.12, -6.0, 72.0, 1.4, 0.09, -3.0]);
        spawn(e, 100 + k as u32, kind::MODAL, 0, [0.06, -0.05, -0.22], [1.0, 0.0, 0.0], 0.0, 20000.0, 0.0, RANGE_SEND_DB, k as f32 * interval_ms, &modal);
    }
}

fn main() {
    let out = std::env::args().nth(1).unwrap_or_else(|| ".".into());
    std::fs::create_dir_all(&out).unwrap();
    let sr = 48000u32;

    // 1. shooter, unprotected, 3 shots
    let mut e = Engine::new(sr as f32);
    outdoor_range(&mut e);
    shooter_volley(&mut e, 3, 350.0, false);
    let (l, r) = run(&mut e, 4.0);
    write_wav(&format!("{out}/01_shooter_unprotected.wav"), &l, &r, sr);
    println!("01 TTS after volley: {:.1} dB", e.hearing.tts_db);

    // 2. shooter with passive muffs
    let mut e = Engine::new(sr as f32);
    outdoor_range(&mut e);
    let mut h = H::DEFAULTS.to_vec(); h[H::PROTECTION_MODE] = 1.0;
    cmd(&mut e, op::HEARING, &h);
    shooter_volley(&mut e, 3, 350.0, false);
    let (l, r) = run(&mut e, 4.0);
    write_wav(&format!("{out}/02_shooter_passive_muffs.wav"), &l, &r, sr);

    // 3. electronic muffs
    let mut e = Engine::new(sr as f32);
    outdoor_range(&mut e);
    let mut h = H::DEFAULTS.to_vec(); h[H::PROTECTION_MODE] = 2.0;
    cmd(&mut e, op::HEARING, &h);
    shooter_volley(&mut e, 3, 350.0, false);
    let (l, r) = run(&mut e, 4.0);
    write_wav(&format!("{out}/03_shooter_electronic_muffs.wav"), &l, &r, sr);

    // 4. suppressed, unprotected
    let mut e = Engine::new(sr as f32);
    outdoor_range(&mut e);
    shooter_volley(&mut e, 3, 350.0, true);
    let (l, r) = run(&mut e, 4.0);
    write_wav(&format!("{out}/04_shooter_suppressed.wav"), &l, &r, sr);

    // 5. bystander 25 m to the right of a shooter firing away (rear-ish quarter)
    let mut e = Engine::new(sr as f32);
    outdoor_range(&mut e);
    let p = rifle();
    spawn(&mut e, 1, kind::GUNSHOT, 0, [25.0, 0.0, 0.0], [0.0, 0.0, -1.0], p[G::DIRECTIVITY_DB], p[G::REAR_LP_HZ], 0.0, RANGE_SEND_DB, 200.0, &p);
    let (l, r) = run(&mut e, 3.0);
    write_wav(&format!("{out}/05_bystander_25m.wav"), &l, &r, sr);

    // 6. 300 m downrange, 3 m off the bullet path: crack first, muzzle report ~0.5 s later
    let mut e = Engine::new(sr as f32);
    outdoor_range(&mut e);
    // Whitham: 5.56 @ ~M2.0 at 300 m, d 5.7 mm, l 23 mm, miss 3 m
    let (m, d, ln, b) = (2.0f32, 0.0057f32, 0.023f32, 3.0f32);
    let p0 = 101325.0f32;
    let dp = p0 * 0.53 * (m * m - 1.0).powf(0.125) * d / (b.powf(0.75) * ln.powf(0.25));
    let c = 340.3f32;
    let dur = 1.82 * m * b.powf(0.25) * d / (c * (m * m - 1.0).powf(0.375) * ln.powf(0.25));
    spawn(&mut e, 2, kind::NWAVE, 0, [3.0, 0.0, -2.0], [0.0, 0.0, 1.0], 0.0, 20000.0, 1.0, RANGE_SEND_DB - 20.0 * b.log10(), 100.0, &[dp, dur, 20.0]);
    spawn(&mut e, 3, kind::GUNSHOT, 0, [0.0, 0.0, -300.0], [0.0, 0.0, 1.0], p[G::DIRECTIVITY_DB], p[G::REAR_LP_HZ], 0.0, RANGE_SEND_DB, 0.0, &p);
    let (l, r) = run(&mut e, 3.0);
    write_wav(&format!("{out}/06_downrange_300m_crack_then_boom.wav"), &l, &r, sr);
    println!("06 N-wave: {:.0} Pa ({:.1} dB SPL), {:.0} us", dp, 20.0 * (dp / 20e-6).log10(), dur * 1e6);

    // 7. AR500 steel plate (300x450x9.5 mm) hit, 100 m away
    let mut e = Engine::new(sr as f32);
    outdoor_range(&mut e);
    let (a, bb, hgt) = (0.30f32, 0.45f32, 0.0095f32);
    let (ey, rho, nu) = (200e9f32, 7850.0f32, 0.29f32);
    let dd = ey * hgt.powi(3) / (12.0 * (1.0 - nu * nu));
    let k = (std::f32::consts::PI / 2.0) * (dd / (rho * hgt)).sqrt();
    let (hx, hy) = (0.43f32, 0.38f32);
    let mut modes = Vec::new();
    for mm in 1..=6 {
        for nn in 1..=6 {
            let f = k * ((mm as f32 / a).powi(2) + (nn as f32 / bb).powi(2));
            if f > 12000.0 { continue; }
            let shape = ((mm as f32) * std::f32::consts::PI * hx).sin() * ((nn as f32) * std::f32::consts::PI * hy).sin();
            let t60 = (2.2 * (400.0 / f).powf(0.55)).clamp(0.08, 3.5);
            modes.push((f, t60, shape.abs() * 30.0 / (1.0 + f / 3000.0)));
        }
    }
    let mut mp = vec![1.0, modes.len() as f32, 1.0, 3.0];
    for (f, t, amp) in &modes { mp.extend_from_slice(&[*f, *t, *amp]); }
    mp.extend_from_slice(&[0.0, 1.0, 0.02, -10.0]);
    spawn(&mut e, 4, kind::MODAL, 1, [0.0, 0.0, -100.0], [0.0, 0.0, 1.0], 0.0, 20000.0, 0.0, RANGE_SEND_DB, 100.0, &mp);
    let (l, r) = run(&mut e, 3.5);
    write_wav(&format!("{out}/07_steel_plate_100m.wav"), &l, &r, sr);
    println!("07 plate modes: {} (f11 = {:.0} Hz)", modes.len(), modes[0].0);
    println!("wrote WAVs to {out}");
}
