//! Filtered-noise impact source: bullet strikes into dirt/wood/concrete, footsteps, debris.
//! Envelope-shaped band noise + optional low "thump" + optional granular crackle (gravel, dry grass).

use crate::filters::{Biquad, BiquadKind};
use crate::params::noise as N;
use crate::util::{db_to_lin, spl_to_pa, Rng, TAU};

pub struct NoiseSource {
    sr: f32,
    n: usize,
    len: usize,
    rng: Rng,
    amp: f32,
    attack: f32,
    tau: f32,
    hp: Biquad,
    lp: Biquad,
    thump_amp: f32,
    thump_f: f32,
    thump_tau: f32,
    phase: f32,
    grain_p: f32,
    grain_amp: f32,
    grain_env: f32,
    grain_bp: Biquad,
}

impl NoiseSource {
    pub fn new(sr: f32, p: &[f32]) -> Self {
        let get = |i: usize| -> f32 { p.get(i).copied().unwrap_or(N::DEFAULTS[i]) };
        let amp = spl_to_pa(get(N::LEVEL_SPL));
        let tau = (get(N::DECAY_MS) * 0.001 / 6.9078).max(0.0002);
        let thump_tau = (get(N::THUMP_MS) * 0.001 / 6.9078).max(0.0002);
        let len = ((tau.max(thump_tau) * 9.0 + get(N::ATTACK_MS) * 0.001 + 0.01) * sr) as usize;
        let q = get(N::RESONANCE).max(0.3);
        NoiseSource {
            sr,
            n: 0,
            len,
            rng: Rng::new(get(N::SEED) as u64 ^ 0x77AA_1100),
            amp,
            attack: (get(N::ATTACK_MS) * 0.001).max(1e-5),
            tau,
            hp: Biquad::new(BiquadKind::Highpass, sr, get(N::HP_HZ), q, 0.0),
            lp: Biquad::new(BiquadKind::Lowpass, sr, get(N::LP_HZ), q, 0.0),
            thump_amp: amp * db_to_lin(get(N::THUMP_DB)),
            thump_f: get(N::THUMP_HZ),
            thump_tau,
            phase: 0.0,
            grain_p: get(N::GRAINS_PER_S) / sr,
            grain_amp: amp * db_to_lin(get(N::GRAIN_DB)),
            grain_env: 0.0,
            grain_bp: Biquad::new(BiquadKind::Bandpass, sr, (get(N::LP_HZ) * 0.6).max(800.0), 1.2, 0.0),
        }
    }

    pub fn render(&mut self, out: &mut [f32]) -> bool {
        let dt = 1.0 / self.sr;
        for o in out.iter_mut() {
            if self.n >= self.len { *o = 0.0; continue; }
            let t = self.n as f32 * dt;
            let env = (t / self.attack).min(1.0) * (-(t - self.attack).max(0.0) / self.tau).exp();
            let w = self.rng.gauss();
            let mut y = self.lp.process(self.hp.process(w)) * env * self.amp;
            if self.thump_amp > 0.0 {
                self.phase += TAU * self.thump_f * (1.0 + 0.6 * (-t / 0.01).exp()) * dt;
                y += self.phase.sin() * (t / 0.001).min(1.0) * (-t / self.thump_tau).exp() * self.thump_amp;
            }
            if self.grain_p > 0.0 {
                if self.rng.uniform() < self.grain_p * env.sqrt() { self.grain_env = 1.0; }
                self.grain_env *= 0.93;
                y += self.grain_bp.process(self.rng.bipolar() * self.grain_env) * self.grain_amp;
            }
            *o = y;
            self.n += 1;
        }
        self.n >= self.len
    }
}
