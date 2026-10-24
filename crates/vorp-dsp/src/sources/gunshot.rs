//! Physically-motivated muzzle blast synthesis.
//!
//! Output: acoustic pressure (Pa) at 1 m on the muzzle axis (directivity is applied by the voice).
//!
//! Layers:
//!  * Muzzle blast — Friedlander waveform p(t) = Ps (1 - t/T+) e^(-b t/T+) (true blast-wave shape,
//!    incl. its negative phase), with an optional precursor shock (air column ahead of the bullet).
//!  * Turbulence — the broadband "roar" of the expanding propellant-gas plume: band-limited noise
//!    with a fast attack and exponential decay, amplitude-modulated by slow eddy noise.
//!  * Body — the perceived low-frequency "boom" (chest/room coupling, brake/barrel resonance):
//!    a decaying sine with a downward pitch glide. Set BODY_DB to -60 for a purely measured signature.
//!  * Suppression — a suppressor slows gas release: lower peak, longer positive phase, darker plume.

use crate::filters::{Biquad, BiquadKind, DcBlock, OnePoleLP};
use crate::params::gunshot as G;
use crate::util::{db_to_lin, spl_to_pa, Rng, TAU};

pub struct GunshotSource {
    sr: f32,
    n: usize,
    len: usize,
    // blast
    ps: f32,
    t_plus: f32,
    b: f32,
    pre_amp: f32,
    pre_t: f32,
    lead: f32,
    // turbulence
    rng: Rng,
    turb_amp: f32,
    turb_tau: f32,
    turb_hp: Biquad,
    turb_lp: Biquad,
    eddy: OnePoleLP,
    // body
    body_amp: f32,
    body_f0: f32,
    body_f1: f32,
    body_tau: f32,
    phase: f32,
    // report (crack) + sub thump
    crack_amp: f32,
    crack_tau: f32,
    crack_bp: Biquad,
    crack_bp2: Biquad,
    sub_amp: f32,
    sub_f: f32,
    sub_tau: f32,
    sub_phase: f32,
    clip: f32,
    // output conditioning
    aa: Biquad,
    aa2: Biquad,
    dc: DcBlock,
}

impl GunshotSource {
    pub fn new(sr: f32, p: &[f32]) -> Self {
        let get = |i: usize| -> f32 { p.get(i).copied().unwrap_or(G::DEFAULTS[i]) };
        let seed = get(G::SEED) as u64 ^ 0xA5A5_1234;
        let mut rng = Rng::new(seed.wrapping_add((get(G::PEAK_SPL) * 1000.0) as u64));
        let var = get(G::VARIATION).clamp(0.0, 1.0);
        let s = get(G::SUPPRESS).clamp(0.0, 1.0);
        let red = get(G::SUPP_RED_DB);

        let mut peak_db = get(G::PEAK_SPL) + get(G::FIRST_POP_DB) * s + rng.gauss() * 0.8 * var;
        peak_db -= red * s;
        let ps = spl_to_pa(peak_db);

        let t_plus = (get(G::POS_MS) * 0.001 * (1.0 + 2.0 * s) * (1.0 + 0.07 * var * rng.gauss())).max(0.00005);
        let b = get(G::DECAY_B).max(0.1) * (1.0 + 0.05 * var * rng.gauss());

        let turb_amp = ps * db_to_lin(get(G::TURB_DB) - red * 0.35 * s + rng.gauss() * 1.5 * var);
        let turb_tau = (get(G::TURB_MS) * 0.001 / 6.9078 * (1.0 + 0.6 * s) * (1.0 + 0.15 * var * rng.gauss())).max(0.0005);
        let turb_lp_hz = get(G::TURB_LP) * (1.0 - 0.55 * s);

        let body_amp = ps * db_to_lin(get(G::BODY_DB) - red * 0.4 * s + rng.gauss() * 1.0 * var);
        let body_f1 = get(G::BODY_HZ) * (1.0 + 0.04 * var * rng.gauss());
        let body_f0 = body_f1 * (1.0 + get(G::BODY_DROP).max(0.0));
        let body_tau = (get(G::BODY_MS) * 0.001 / 6.9078).max(0.0005);

        let pre_amp = ps * db_to_lin(get(G::PRECURSOR_DB));
        let lead = get(G::PRECURSOR_LEAD_MS) * 0.001;
        let pre_t = t_plus * 0.3;

        let crack_amp = ps * db_to_lin(get(G::CRACK_DB) - red * 0.7 * s + rng.gauss() * 1.0 * var);
        let crack_hz = (get(G::CRACK_HZ) * (1.0 + 0.08 * var * rng.gauss()) * (1.0 - 0.45 * s)).clamp(200.0, sr * 0.4);
        let crack_tau = (get(G::CRACK_MS) * 0.001 / 6.9078).max(0.0002);
        let sub_amp = ps * db_to_lin(get(G::SUB_DB) - red * 0.3 * s + rng.gauss() * 0.8 * var);
        let sub_f = get(G::SUB_HZ) * (1.0 + 0.05 * var * rng.gauss());
        let sub_tau = (get(G::SUB_MS) * 0.001 / 6.9078).max(0.0005);
        let clip = ps * db_to_lin(-get(G::DRIVE_DB).max(0.0));

        // total length: until all layers are below -90 dB relative
        let blast_len = lead + t_plus * (1.0 + 12.0 / b);
        let turb_len = turb_tau * 10.4;
        let body_len = body_tau * 10.4 + 0.002;
        let sub_len = sub_tau * 10.4 + 0.002;
        let crack_len = crack_tau * 10.4;
        let len = ((blast_len.max(turb_len).max(body_len).max(sub_len).max(crack_len) + 0.02) * sr) as usize;

        let bright = get(G::BRIGHT_HZ).min(sr * 0.45);
        GunshotSource {
            sr,
            n: 0,
            len,
            ps,
            t_plus,
            b,
            pre_amp,
            pre_t,
            lead,
            rng,
            turb_amp,
            turb_tau,
            turb_hp: Biquad::new(BiquadKind::Highpass, sr, get(G::TURB_HP), 0.7071, 0.0),
            turb_lp: Biquad::new(BiquadKind::Lowpass, sr, turb_lp_hz, 0.7071, 0.0),
            eddy: OnePoleLP::new(sr, 180.0),
            body_amp,
            body_f0,
            body_f1,
            body_tau,
            phase: 0.0,
            crack_amp,
            crack_tau,
            crack_bp: Biquad::new(BiquadKind::Bandpass, sr, crack_hz, 0.9, 0.0),
            crack_bp2: Biquad::new(BiquadKind::Highpass, sr, crack_hz * 0.45, 0.7071, 0.0),
            sub_amp,
            sub_f,
            sub_tau,
            sub_phase: 0.0,
            clip,
            aa: Biquad::new(BiquadKind::Lowpass, sr, bright, 0.5412, 0.0),
            aa2: Biquad::new(BiquadKind::Lowpass, sr, bright, 1.3066, 0.0),
            dc: DcBlock::new(sr, 12.0),
        }
    }

    #[inline]
    fn friedlander(t: f32, ps: f32, tp: f32, b: f32) -> f32 {
        if t < 0.0 { return 0.0; }
        let x = t / tp;
        ps * (1.0 - x) * (-b * x).exp()
    }

    /// Box-filtered (sample-integrated) Friedlander — removes aliasing from the shock discontinuity.
    #[inline]
    fn friedlander_avg(t0: f32, dt: f32, ps: f32, tp: f32, b: f32) -> f32 {
        // Antiderivative of (1 - x) e^{-b x} dx (x = t/tp): F(x) = e^{-bx} (x - 1 + 1/b) / b ... times tp
        let t_lo = t0.max(0.0);
        let t_hi = t0 + dt;
        if t_hi <= 0.0 { return 0.0; }
        let f = |t: f32| -> f32 {
            let x = t / tp;
            (-b * x).exp() * (x - 1.0 + 1.0 / b) / b * tp
        };
        ps * (f(t_hi) - f(t_lo)) / dt
    }

    /// Renders into `out` (overwrites). Returns true when finished.
    pub fn render(&mut self, out: &mut [f32]) -> bool {
        let dt = 1.0 / self.sr;
        for o in out.iter_mut() {
            if self.n >= self.len { *o = 0.0; continue; }
            let t = self.n as f32 * dt;
            // blast (+ precursor)
            let mut p = GunshotSource::friedlander_avg(t - self.lead, dt, self.ps, self.t_plus, self.b);
            if self.pre_amp > 0.0 { p += GunshotSource::friedlander_avg(t, dt, self.pre_amp, self.pre_t, self.b * 1.5); }
            // turbulence
            if self.turb_amp > 0.0 {
                let tt = t - self.lead;
                if tt >= 0.0 {
                    let att = (tt / 0.0004).min(1.0);
                    let env = att * (-tt / self.turb_tau).exp();
                    let eddy = 1.0 + 1.8 * self.eddy.process(self.rng.bipolar());
                    let w = self.rng.gauss();
                    p += self.turb_lp.process(self.turb_hp.process(w)) * env * eddy * self.turb_amp;
                }
            }
            // body
            if self.body_amp > 0.0 {
                let tt = t - self.lead;
                if tt >= 0.0 {
                    let f = self.body_f1 + (self.body_f0 - self.body_f1) * (-tt / 0.018).exp();
                    self.phase += TAU * f * dt;
                    if self.phase > TAU { self.phase -= TAU; }
                    let att = (tt / 0.0015).min(1.0);
                    p += self.phase.sin() * att * (-tt / self.body_tau).exp() * self.body_amp;
                }
            }
            // report: band-passed noise burst with a hard onset (the "snap" that defines each gun's character)
            if self.crack_amp > 0.0 {
                let tt = t - self.lead;
                if tt >= 0.0 {
                    let env = (tt / 0.00012).min(1.0) * (-tt / self.crack_tau).exp();
                    let w = self.rng.gauss();
                    p += self.crack_bp2.process(self.crack_bp.process(w)) * env * self.crack_amp * 2.2;
                }
            }
            // sub thump: low sine burst, slower attack (the pressure wave you feel in your chest)
            if self.sub_amp > 0.0 {
                let tt = t - self.lead;
                if tt >= 0.0 {
                    self.sub_phase += TAU * self.sub_f * (1.0 + 0.6 * (-tt / 0.01).exp()) * dt;
                    if self.sub_phase > TAU { self.sub_phase -= TAU; }
                    let att = (tt / 0.004).min(1.0);
                    p += self.sub_phase.sin() * att * (-tt / self.sub_tau).exp() * self.sub_amp;
                }
            }
            // perceptual compaction of the instantaneous spike
            if self.clip > 0.0 { p = self.clip * (p / self.clip).tanh(); }
            let y = self.aa2.process(self.aa.process(p));
            *o = self.dc.process(y);
            self.n += 1;
        }
        self.n >= self.len
    }

    /// Unused helper retained for clarity / tests: raw Friedlander sample.
    pub fn raw_blast(&self, t: f32) -> f32 { GunshotSource::friedlander(t, self.ps, self.t_plus, self.b) }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::util::pa_to_spl;
    #[test]
    fn peak_level_close_to_spec() {
        let sr = 48000.0;
        let mut p = G::DEFAULTS.to_vec();
        p[G::VARIATION] = 0.0;
        p[G::TURB_DB] = -60.0;
        p[G::BODY_DB] = -60.0;
        p[G::PRECURSOR_DB] = -60.0;
        p[G::CRACK_DB] = -90.0;
        p[G::SUB_DB] = -90.0;
        p[G::DRIVE_DB] = 0.0;
        p[G::BRIGHT_HZ] = 20000.0;
        let mut g = GunshotSource::new(sr, &p);
        let mut buf = vec![0.0f32; 4096];
        g.render(&mut buf);
        let peak = buf.iter().fold(0.0f32, |a, v| a.max(v.abs()));
        let spl = pa_to_spl(peak);
        // band-limiting the shock softens the instantaneous peak a few dB
        assert!(spl > 151.0 && spl < 159.0, "peak {spl} dB SPL");
        // negative phase exists
        assert!(buf.iter().any(|v| *v < -0.05 * peak));
    }
    #[test]
    fn suppressor_reduces_level() {
        let sr = 48000.0;
        let mut a = GunshotSource::new(sr, &G::DEFAULTS);
        let mut p = G::DEFAULTS.to_vec();
        p[G::SUPPRESS] = 1.0;
        let mut b = GunshotSource::new(sr, &p);
        let mut ba = vec![0.0f32; 8192];
        let mut bb = vec![0.0f32; 8192];
        a.render(&mut ba);
        b.render(&mut bb);
        let ea: f32 = ba.iter().map(|v| v * v).sum();
        let eb: f32 = bb.iter().map(|v| v * v).sum();
        assert!(10.0 * (ea / eb).log10() > 15.0);
    }
}
