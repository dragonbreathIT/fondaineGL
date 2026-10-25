//! Listener hearing model, operating on the acoustic signal at the ears (Pa):
//!  * Hearing protection: none / passive earmuffs (broadband + extra HF attenuation, low frequencies leak
//!    through the cup) / electronic muffs (amplify ambience, fast limit at ~82 dB SPL, band-limited "radio"
//!    voicing, the same passive leak underneath).
//!  * Acoustic (stapedius) reflex: delayed low-frequency attenuation above ~90-95 dB SPL.
//!  * Post-impulse dulling: right after every impulse over threshold the highs above ~3 kHz drop and recover
//!    within a few hundred ms (the "cotton wool" moment after each unprotected shot).
//!  * Temporary threshold shift (TTS): impulses over threshold accumulate dB of shift that recover
//!    exponentially over seconds; TTS dulls and quiets everything (muffled hearing after a string of shots).
//!  * Tinnitus: a ringing tone whose level follows TTS (added at the output stage by the engine).

use crate::filters::{Biquad, BiquadKind, OnePoleLP};
use crate::params::hearing as H;
use crate::util::{db_to_lin, pa_to_spl, spl_to_pa, tau_coef, Rng, TAU};

pub struct Hearing {
    sr: f32,
    pub p: [f32; H::COUNT],
    // protection
    pass_shelf: [Biquad; 2],
    pass_lf: [Biquad; 2],
    pass_lp: [Biquad; 2],
    elec_hp: [Biquad; 2],
    elec_lp: [Biquad; 2],
    elec_gain: f32,
    elec_env: f32,
    elec_att: f32,
    elec_rel: f32,
    // reflex
    reflex_split: [OnePoleLP; 2],
    reflex_env_db: f32,
    reflex_att: f32,
    reflex_rel: f32,
    pub reflex_gr_db: f32,
    // TTS
    pub tts_db: f32,
    refractory: u32,
    event_peak: f32,
    tts_shelf: [Biquad; 2],
    tts_lp: [Biquad; 2],
    tts_applied: f32,
    // fast post-impulse dulling
    pub dull: f32,
    dull_lp: [Biquad; 4],
    dull_applied: f32,
    // tinnitus
    tin_phase: f32,
    tin_phase2: f32,
    tin_vib: f32,
    tin_rng: Rng,
    tin_bp: Biquad,
    pub tinnitus_level: f32,
    /// Peak SPL at the eardrum in the last block (post-protection) — metering.
    pub last_peak_spl: f32,
}

impl Hearing {
    pub fn new(sr: f32) -> Self {
        let mut h = Hearing {
            sr,
            p: H::DEFAULTS,
            pass_shelf: [Biquad::identity(); 2],
            pass_lf: [Biquad::identity(); 2],
            pass_lp: [Biquad::identity(); 2],
            elec_hp: [Biquad::identity(); 2],
            elec_lp: [Biquad::identity(); 2],
            elec_gain: 1.0,
            elec_env: 0.0,
            elec_att: 0.0,
            elec_rel: 0.0,
            reflex_split: [OnePoleLP::default(); 2],
            reflex_env_db: 0.0,
            reflex_att: 0.0,
            reflex_rel: 0.0,
            reflex_gr_db: 0.0,
            tts_db: 0.0,
            refractory: 0,
            event_peak: 0.0,
            tts_shelf: [Biquad::identity(); 2],
            tts_lp: [Biquad::identity(); 2],
            tts_applied: -1.0,
            dull: 0.0,
            dull_lp: [Biquad::identity(); 4],
            dull_applied: -1.0,
            tin_phase: 0.0,
            tin_phase2: 0.0,
            tin_vib: 0.0,
            tin_rng: Rng::new(99),
            tin_bp: Biquad::identity(),
            tinnitus_level: 0.0,
            last_peak_spl: 0.0,
        };
        h.set_params(&H::DEFAULTS);
        h
    }

    pub fn set_params(&mut self, p: &[f32]) {
        for i in 0..H::COUNT.min(p.len()) { self.p[i] = p[i]; }
        let sr = self.sr;
        let hf = self.p[H::PASSIVE_HF_EXTRA_DB];
        // low frequencies leak through / around the cup: ~8 dB less attenuation below ≈ 200 Hz
        let lf_leak = (self.p[H::PASSIVE_ATTEN_DB] * 0.32).min(8.0);
        for c in 0..2 {
            self.pass_shelf[c].set(BiquadKind::HighShelf, sr, 1800.0, 0.7, -hf);
            self.pass_lf[c].set(BiquadKind::LowShelf, sr, 220.0, 0.7, lf_leak);
            self.pass_lp[c].set(BiquadKind::Lowpass, sr, 6500.0, 0.7071, 0.0);
            self.elec_hp[c].set(BiquadKind::Highpass, sr, 180.0, 0.7071, 0.0);
            self.elec_lp[c].set(BiquadKind::Lowpass, sr, 7000.0, 0.7071, 0.0);
            self.reflex_split[c].set(sr, 900.0);
        }
        self.elec_gain = db_to_lin(self.p[H::ELEC_GAIN_DB]);
        self.elec_att = tau_coef(0.0002, sr);
        self.elec_rel = tau_coef(0.08, sr);
        self.reflex_att = tau_coef(self.p[H::REFLEX_ATTACK_MS] * 0.001, sr);
        self.reflex_rel = tau_coef(self.p[H::REFLEX_RELEASE_MS] * 0.001, sr);
        self.tin_bp.set(BiquadKind::Bandpass, sr, self.p[H::TINNITUS_HZ], 6.0, 0.0);
        self.tts_applied = -1.0;
        self.dull_applied = -1.0;
    }

    pub fn reset(&mut self) {
        self.tts_db = 0.0;
        self.dull = 0.0;
        self.reflex_env_db = 0.0;
        self.tinnitus_level = 0.0;
    }

    fn update_dull_filter(&mut self) {
        let d = self.dull;
        if (d - self.dull_applied).abs() < 0.01 && !(d == 0.0 && self.dull_applied != 0.0) { return; }
        self.dull_applied = d;
        let open = 18000.0f32;
        let fc = open * (self.p[H::DULL_HZ].clamp(500.0, open) / open).powf(d);
        // 4th order (two sections per ear) so the cut above the cutoff is steep enough to notice
        for c in 0..4 { self.dull_lp[c].set(BiquadKind::Lowpass, self.sr, fc, if c < 2 { 0.54 } else { 1.31 }, 0.0); }
    }

    fn update_tts_filters(&mut self) {
        let amt = self.p[H::MUFFLE_AMOUNT].max(0.0);
        let t = self.tts_db * amt;
        if (t - self.tts_applied).abs() < 0.25 { return; }
        self.tts_applied = t;
        let sr = self.sr;
        // Threshold shift is largest around 3-6 kHz (the "noise notch"); dull the highs, lower overall.
        let lp_hz = (18000.0 * 2f32.powf(-t / 9.0)).max(1200.0);
        for c in 0..2 {
            self.tts_shelf[c].set(BiquadKind::HighShelf, sr, 2500.0, 0.7, -t * 0.7);
            self.tts_lp[c].set(BiquadKind::Lowpass, sr, lp_hz, 0.7071, 0.0);
        }
    }

    /// Process the stereo ear signal in place (Pa). `dt` = block duration.
    pub fn process(&mut self, l: &mut [f32], r: &mut [f32]) {
        let n = l.len();
        let dt = n as f32 / self.sr;
        let enabled = self.p[H::ENABLE] > 0.5;
        let mode = self.p[H::PROTECTION_MODE] as i32;

        // ---------------- protection
        match mode {
            1 => {
                let g = db_to_lin(-self.p[H::PASSIVE_ATTEN_DB]);
                for i in 0..n {
                    l[i] = self.pass_lp[0].process(self.pass_lf[0].process(self.pass_shelf[0].process(l[i]))) * g;
                    r[i] = self.pass_lp[1].process(self.pass_lf[1].process(self.pass_shelf[1].process(r[i]))) * g;
                }
            }
            2 => {
                // passive cups still attenuate; the electronics re-amplify the band-limited mic signal
                // then a fast limiter clamps at ELEC_LIMIT_SPL.
                let passive = db_to_lin(-self.p[H::PASSIVE_ATTEN_DB]);
                let limit = spl_to_pa(self.p[H::ELEC_LIMIT_SPL]);
                for i in 0..n {
                    let ml = self.elec_lp[0].process(self.elec_hp[0].process(l[i])) * self.elec_gain;
                    let mr = self.elec_lp[1].process(self.elec_hp[1].process(r[i])) * self.elec_gain;
                    let pk = ml.abs().max(mr.abs());
                    let c = if pk > self.elec_env { self.elec_att } else { self.elec_rel };
                    self.elec_env = pk + c * (self.elec_env - pk);
                    let g = if self.elec_env > limit { limit / self.elec_env } else { 1.0 };
                    // leakage through the cup (passive, LF-heavy) + electronic path
                    l[i] = ml * g + self.pass_lp[0].process(self.pass_lf[0].process(self.pass_shelf[0].process(l[i]))) * passive * 0.6;
                    r[i] = mr * g + self.pass_lp[1].process(self.pass_lf[1].process(self.pass_shelf[1].process(r[i]))) * passive * 0.6;
                }
            }
            _ => {}
        }

        // ---------------- measure eardrum peak SPL
        let mut pk = 0.0f32;
        for i in 0..n { pk = pk.max(l[i].abs()).max(r[i].abs()); }
        let peak_spl = pa_to_spl(pk);
        self.last_peak_spl = peak_spl;

        if !enabled { return; }

        // ---------------- TTS accumulation (per impulse event) + recovery
        let thr = self.p[H::TTS_THRESHOLD_SPL];
        // One impulse event = all blocks within 120 ms of its onset (the shot and its slap-back); it is charged for
        // its *maximum* peak.
        if self.refractory > 0 { self.refractory -= 1; }
        if peak_spl > thr {
            let rate = self.p[H::TTS_RATE];
            if self.refractory == 0 {
                self.tts_db += rate * (peak_spl - thr);
                self.event_peak = peak_spl;
                self.refractory = (0.12 * self.sr / n as f32) as u32 + 1;
            } else if peak_spl > self.event_peak {
                self.tts_db += rate * (peak_spl - self.event_peak);
                self.event_peak = peak_spl;
            }
            self.tts_db = self.tts_db.min(self.p[H::TTS_MAX_DB]);
            // fast dulling: full at ~20 dB over threshold (a 150 dB shot), instant onset
            self.dull = self.dull.max(((peak_spl - thr) / 20.0).min(1.0));
        }
        let rec = self.p[H::TTS_RECOVERY_S].max(0.1);
        self.tts_db *= (-dt / rec).exp();
        if self.tts_db < 0.01 { self.tts_db = 0.0; }
        let drec = (self.p[H::DULL_RECOVERY_MS] * 0.001).max(0.01);
        self.dull *= (-dt / drec).exp();
        if self.dull < 0.005 { self.dull = 0.0; }

        // ---------------- acoustic reflex (block-rate detector on peak SPL)
        let rthr = self.p[H::REFLEX_THRESHOLD_SPL];
        let target = -((peak_spl - rthr).max(0.0) * 0.6).min(self.p[H::REFLEX_MAX_DB]);
        let blocks_att = self.reflex_att.powf(n as f32);
        let blocks_rel = self.reflex_rel.powf(n as f32);
        let c = if target < self.reflex_env_db { blocks_att } else { blocks_rel };
        self.reflex_env_db = target + c * (self.reflex_env_db - target);
        self.reflex_gr_db = self.reflex_env_db;
        let rg = db_to_lin(self.reflex_env_db);

        // ---------------- apply reflex (low band), TTS colouring and the fast post-impulse dulling
        self.update_tts_filters();
        self.update_dull_filter();
        let dulling = self.dull > 0.0;
        let tts_gain = db_to_lin(-self.tts_db * self.p[H::MUFFLE_AMOUNT].max(0.0) * 0.45);
        for i in 0..n {
            let lo_l = self.reflex_split[0].process(l[i]);
            let lo_r = self.reflex_split[1].process(r[i]);
            let xl = (l[i] - lo_l) + lo_l * rg;
            let xr = (r[i] - lo_r) + lo_r * rg;
            let mut yl = self.tts_lp[0].process(self.tts_shelf[0].process(xl)) * tts_gain;
            let mut yr = self.tts_lp[1].process(self.tts_shelf[1].process(xr)) * tts_gain;
            if dulling {
                yl = self.dull_lp[0].process(yl);
                yl = self.dull_lp[2].process(yl);
                yr = self.dull_lp[1].process(yr);
                yr = self.dull_lp[3].process(yr);
            }
            l[i] = yl;
            r[i] = yr;
        }
        if !dulling { for c in 0..4 { self.dull_lp[c].reset(); } }
        for c in 0..2 { self.reflex_split[c].flush(); }

        let full = self.p[H::TINNITUS_TTS_DB].max(0.1);
        self.tinnitus_level = (self.tts_db / full).min(1.0);
    }

    /// Adds tinnitus to the final (digital, dBFS) output.
    pub fn add_tinnitus(&mut self, l: &mut [f32], r: &mut [f32]) {
        if self.tinnitus_level < 1e-4 || self.p[H::ENABLE] < 0.5 || self.p[H::TINNITUS_DB] <= -79.5 { return; }
        let amp = db_to_lin(self.p[H::TINNITUS_DB]) * self.tinnitus_level * self.tinnitus_level;
        let f = self.p[H::TINNITUS_HZ];
        let sr = self.sr;
        for i in 0..l.len() {
            self.tin_vib += TAU * 0.27 / sr;
            if self.tin_vib > TAU { self.tin_vib -= TAU; }
            let fm = f * (1.0 + 0.004 * self.tin_vib.sin());
            self.tin_phase += TAU * fm / sr;
            if self.tin_phase > TAU { self.tin_phase -= TAU; }
            self.tin_phase2 += TAU * fm * 1.503 / sr;
            if self.tin_phase2 > TAU { self.tin_phase2 -= TAU; }
            let hiss = self.tin_bp.process(self.tin_rng.bipolar()) * 0.6;
            let s = (self.tin_phase.sin() * 0.85 + self.tin_phase2.sin() * 0.12 + hiss) * amp;
            l[i] += s;
            r[i] += s * 0.94;
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::util::BLOCK;

    fn impulse_blocks(h: &mut Hearing, pa: f32, blocks: usize) {
        for b in 0..blocks {
            let mut l = [0.0f32; BLOCK];
            let mut r = [0.0f32; BLOCK];
            if b == 0 { l[10] = pa; r[10] = pa; }
            h.process(&mut l, &mut r);
        }
    }
    /// Energy of a 7 kHz tone through the model relative to the same tone with a fresh model.
    fn hf_gain_db(h: &mut Hearing) -> f32 {
        let mut e = 0.0f32;
        let mut e0 = 0.0f32;
        let mut fresh = Hearing::new(48000.0);
        for b in 0..4 {
            let mut l = [0.0f32; BLOCK];
            let mut r = [0.0f32; BLOCK];
            for i in 0..BLOCK { l[i] = 0.01 * (TAU * 7000.0 * ((b * BLOCK + i) as f32) / 48000.0).sin(); r[i] = l[i]; }
            let (mut l2, mut r2) = (l, r);
            h.process(&mut l, &mut r);
            fresh.process(&mut l2, &mut r2);
            if b > 0 { e += l.iter().map(|v| v * v).sum::<f32>(); e0 += l2.iter().map(|v| v * v).sum::<f32>(); }
        }
        10.0 * (e / e0).log10()
    }

    #[test]
    fn impulse_dulls_highs_then_recovers() {
        let mut h = Hearing::new(48000.0);
        impulse_blocks(&mut h, spl_to_pa(152.0), 2);
        let right_after = hf_gain_db(&mut h);
        assert!(right_after < -8.0, "7 kHz should be dulled right after the shot: {right_after} dB");
        // ~2 s later the fast dulling is gone; only the slow TTS (a few dB) remains
        for _ in 0..(2.0 * 48000.0 / BLOCK as f32) as usize { impulse_blocks(&mut h, 0.0, 1); }
        let later = hf_gain_db(&mut h);
        assert!(later > right_after + 5.0, "should recover: {right_after} -> {later}");
    }
    #[test]
    fn string_of_shots_rings() {
        let mut h = Hearing::new(48000.0);
        for _ in 0..8 { impulse_blocks(&mut h, spl_to_pa(150.0), 28); } // ~75 ms apart
        // an 8-round unprotected burst brings the ring up to roughly half strength (full ring needs a long string)
        assert!(h.tinnitus_level > 0.4 && h.tinnitus_level < 0.9, "tinnitus {} after a burst", h.tinnitus_level);
        let mut l = [0.0f32; BLOCK];
        let mut r = [0.0f32; BLOCK];
        h.add_tinnitus(&mut l, &mut r);
        let pk = l.iter().fold(0.0f32, |m, v| m.max(v.abs()));
        assert!(pk > db_to_lin(-60.0), "ring too quiet: {pk}"); // faint by design (−46 dBFS at full TTS)
    }
    #[test]
    fn passive_muffs_let_low_end_through_more_than_highs() {
        let sr = 48000.0;
        let run = |f: f32| -> f32 {
            let mut h = Hearing::new(sr);
            let mut p = H::DEFAULTS;
            p[H::PROTECTION_MODE] = 1.0;
            p[H::ENABLE] = 0.0;
            h.set_params(&p);
            let mut e = 0.0;
            for b in 0..8 {
                let mut l = [0.0f32; BLOCK];
                let mut r = [0.0f32; BLOCK];
                for i in 0..BLOCK { l[i] = (TAU * f * ((b * BLOCK + i) as f32) / sr).sin(); r[i] = l[i]; }
                h.process(&mut l, &mut r);
                if b >= 4 { e += l.iter().map(|v| v * v).sum::<f32>(); }
            }
            10.0 * (e / (4.0 * BLOCK as f32 * 0.5)).log10()
        };
        let lo = run(80.0);
        let hi = run(3000.0);
        assert!(lo > -20.0 && lo < -10.0, "80 Hz attenuation {lo} dB");
        assert!(hi < lo - 12.0, "3 kHz should be attenuated much more: {hi} vs {lo}");
    }
}
