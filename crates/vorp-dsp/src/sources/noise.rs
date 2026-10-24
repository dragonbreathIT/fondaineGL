//! Filtered-noise source: bullet strikes into dirt/wood/concrete, footsteps, debris, weapon-handling
//! rasps/clicks, breath. Envelope-shaped band noise + optional low "thump" + optional granular crackle
//! (gravel, dry grass) + optional second transient (two-stage clicks, bounces).

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
    hit2_t: f32,
    hit2_gain: f32,
}

impl NoiseSource {
    pub fn new(sr: f32, p: &[f32]) -> Self {
        let get = |i: usize| -> f32 { p.get(i).copied().unwrap_or(N::DEFAULTS[i]) };
        let amp = spl_to_pa(get(N::LEVEL_SPL));
        let tau = (get(N::DECAY_MS) * 0.001 / 6.9078).max(0.0002);
        let thump_tau = (get(N::THUMP_MS) * 0.001 / 6.9078).max(0.0002);
        let hit2_db = get(N::HIT2_DB);
        let hit2_t = if hit2_db > -100.0 { get(N::HIT2_MS).max(0.0) * 0.001 } else { 0.0 };
        let hit2_gain = if hit2_db > -100.0 { db_to_lin(hit2_db) } else { 0.0 };
        let len = ((tau.max(thump_tau) * 9.0 + get(N::ATTACK_MS) * 0.001 + hit2_t + 0.01) * sr) as usize;
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
            hit2_t,
            hit2_gain,
        }
    }

    #[inline]
    fn env(&self, t: f32) -> f32 {
        if t < 0.0 { return 0.0; }
        (t / self.attack).min(1.0) * (-(t - self.attack).max(0.0) / self.tau).exp()
    }
    #[inline]
    fn thump(&mut self, t: f32, dt: f32) -> f32 {
        if t < 0.0 { return 0.0; }
        self.phase += TAU * self.thump_f * (1.0 + 0.6 * (-t / 0.01).exp()) * dt;
        if self.phase > TAU { self.phase -= TAU; }
        self.phase.sin() * (t / 0.001).min(1.0) * (-t / self.thump_tau).exp()
    }

    pub fn render(&mut self, out: &mut [f32]) -> bool {
        let dt = 1.0 / self.sr;
        for o in out.iter_mut() {
            if self.n >= self.len { *o = 0.0; continue; }
            let t = self.n as f32 * dt;
            let mut env = self.env(t);
            if self.hit2_gain > 0.0 { env += self.env(t - self.hit2_t) * self.hit2_gain; }
            let w = self.rng.gauss();
            let mut y = self.lp.process(self.hp.process(w)) * env * self.amp;
            if self.thump_amp > 0.0 {
                let mut th = self.thump(t, dt);
                if self.hit2_gain > 0.0 && t >= self.hit2_t {
                    if (t - self.hit2_t) < dt { self.phase = 0.0; }
                    th += self.thump(t - self.hit2_t, 0.0) * self.hit2_gain;
                }
                y += th * self.thump_amp;
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

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn second_hit_adds_a_transient() {
        let sr = 48000.0;
        let mut p = N::DEFAULTS.to_vec();
        p[N::DECAY_MS] = 20.0;
        p[N::THUMP_DB] = -90.0;
        let mut a = NoiseSource::new(sr, &p);
        let mut ba = vec![0.0f32; 4800];
        a.render(&mut ba);
        p[N::HIT2_MS] = 50.0;
        p[N::HIT2_DB] = 0.0;
        let mut b = NoiseSource::new(sr, &p);
        let mut bb = vec![0.0f32; 4800];
        b.render(&mut bb);
        let e = |x: &[f32]| x.iter().map(|v| v * v).sum::<f32>();
        let late_a = e(&ba[2400..3600]);
        let late_b = e(&bb[2400..3600]);
        assert!(late_b > late_a * 100.0, "second hit missing: {late_a} vs {late_b}");
    }
}
