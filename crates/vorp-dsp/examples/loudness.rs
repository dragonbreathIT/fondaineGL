//! Loudness check for weapon presets at the shooter's ears (outdoor range, no hearing protection).
//!   cargo run --release -p vorp-dsp --example loudness
//! Prints peak dBFS and the loudest 50 ms / 300 ms RMS windows — the numbers that decide whether a shot
//! *feels* loud. Targets for an unprotected shooter: peak ≈ −0.5 dBFS, 50 ms ≥ −8 dBFS, 300 ms ≥ −14 dBFS.

use vorp_dsp::engine::Engine;
use vorp_dsp::params::{gunshot as G, kind, op, spawn as S};
use vorp_dsp::util::BLOCK;

fn cmd(e: &mut Engine, opcode: u32, args: &[f32]) {
    let mut v = vec![opcode as f32, args.len() as f32];
    v.extend_from_slice(args);
    e.cmd[..v.len()].copy_from_slice(&v);
    e.exec(v.len());
}

pub fn presets() -> Vec<(&'static str, Vec<(usize, f32)>)> {
    vec![
        ("rifle556_16in", vec![(G::PEAK_SPL, 160.0), (G::POS_MS, 0.9), (G::DECAY_B, 1.6), (G::CRACK_DB, -3.0), (G::CRACK_HZ, 3300.0), (G::CRACK_MS, 14.0), (G::TURB_DB, -5.0), (G::TURB_MS, 120.0), (G::TURB_LP, 6000.0), (G::BODY_DB, -7.0), (G::BODY_HZ, 72.0), (G::BODY_MS, 150.0), (G::SUB_DB, -10.0), (G::SUB_HZ, 46.0), (G::SUB_MS, 140.0), (G::DRIVE_DB, 12.0)]),
        ("rifle556_10in", vec![(G::PEAK_SPL, 163.0), (G::POS_MS, 1.1), (G::DECAY_B, 1.5), (G::CRACK_DB, -2.0), (G::CRACK_HZ, 2900.0), (G::CRACK_MS, 20.0), (G::TURB_DB, -3.0), (G::TURB_MS, 190.0), (G::TURB_LP, 5000.0), (G::BODY_DB, -5.0), (G::BODY_HZ, 60.0), (G::BODY_MS, 200.0), (G::SUB_DB, -7.0), (G::SUB_HZ, 42.0), (G::SUB_MS, 170.0), (G::DRIVE_DB, 14.0)]),
        ("rifle308_bolt", vec![(G::PEAK_SPL, 163.0), (G::POS_MS, 1.4), (G::DECAY_B, 1.3), (G::CRACK_DB, -6.0), (G::CRACK_HZ, 2200.0), (G::CRACK_MS, 22.0), (G::TURB_DB, -6.0), (G::TURB_MS, 160.0), (G::TURB_LP, 4200.0), (G::BODY_DB, -4.0), (G::BODY_HZ, 50.0), (G::BODY_MS, 260.0), (G::SUB_DB, -5.0), (G::SUB_HZ, 35.0), (G::SUB_MS, 220.0), (G::DRIVE_DB, 13.0)]),
        ("pistol9mm", vec![(G::PEAK_SPL, 157.0), (G::POS_MS, 0.6), (G::DECAY_B, 1.6), (G::CRACK_DB, -2.0), (G::CRACK_HZ, 1800.0), (G::CRACK_MS, 26.0), (G::TURB_DB, -7.0), (G::TURB_MS, 90.0), (G::TURB_LP, 4500.0), (G::BODY_DB, -6.0), (G::BODY_HZ, 95.0), (G::BODY_MS, 110.0), (G::SUB_DB, -14.0), (G::SUB_HZ, 55.0), (G::SUB_MS, 90.0), (G::DRIVE_DB, 11.0), (G::DIRECTIVITY_DB, 6.0), (G::REAR_LP_HZ, 6500.0)]),
    ]
}

fn measure(l: &[f32], sr: f32) -> (f32, f32, f32) {
    let peak = l.iter().fold(0.0f32, |a, v| a.max(v.abs()));
    let win = |w: f32| -> f32 {
        let n = (w * sr) as usize;
        let mut best = 0.0f32;
        let mut st = 0;
        while st + n < l.len() {
            let e: f32 = l[st..st + n].iter().map(|x| x * x).sum::<f32>() / n as f32;
            best = best.max(e.sqrt());
            st += (sr * 0.005) as usize;
        }
        best
    };
    let db = |x: f32| 20.0 * x.max(1e-9).log10();
    (db(peak), db(win(0.05)), db(win(0.3)))
}

fn main() {
    let sr = 48000.0;
    for (name, over) in presets() {
        for (label, prot) in [("unprotected", 0.0), ("passive muffs", 1.0)] {
            let mut e = Engine::new(sr);
            let mut h = vorp_dsp::params::hearing::DEFAULTS.to_vec();
            h[vorp_dsp::params::hearing::PROTECTION_MODE] = prot;
            cmd(&mut e, op::HEARING, &h);
            let mut p = G::DEFAULTS.to_vec();
            for (i, v) in &over { p[*i] = *v; }
            p[G::SEED] = 3.0;
            let mut hd = vec![0.0f32; S::HEADER];
            hd[S::VOICE_ID] = 1.0; hd[S::KIND] = kind::GUNSHOT as f32; hd[S::BUS] = 0.0;
            hd[S::PX] = 0.05; hd[S::PX + 1] = -0.08; hd[S::PX + 2] = -0.75;
            hd[S::DX + 2] = -1.0;
            hd[S::DIRECTIVITY_DB] = p[G::DIRECTIVITY_DB]; hd[S::REAR_LP_HZ] = p[G::REAR_LP_HZ];
            hd[S::MIN_DIST] = 0.1; hd[S::REVERB_SEND_DB] = -29.5; hd[S::SPATIAL] = 1.0;
            hd.extend_from_slice(&p);
            cmd(&mut e, op::SPAWN, &hd);
            let mut l = Vec::new();
            for _ in 0..((0.8 * sr) as usize / BLOCK) { e.process(); l.extend_from_slice(&e.out[..BLOCK]); }
            let (pk, r50, r300) = measure(&l, sr);
            println!("{name:14} {label:14} peak {pk:6.1} dBFS   50ms {r50:6.1}   300ms {r300:6.1}");
        }
    }
}
