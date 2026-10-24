//! Physically-motivated muzzle blast synthesis.
//!
//! Output: acoustic pressure (Pa) at 1 m on the muzzle axis (directivity is applied by the voice).
//!
//! Layers (summed *after* the spike compaction, so none of them is squashed by it):
//!  * Muzzle blast — Friedlander waveform p(t) = Ps (1 - t/T+) e^(-b t/T+) (true blast-wave shape,
//!    incl. its negative phase), with an optional precursor shock (air column ahead of the bullet). The
//!    sub-millisecond spike is soft-clipped `DRIVE_DB` below its peak (perceptual compaction).
//!  * Report ("crack") — a very short, bright band-passed noise burst: the snap that defines the gun.
//!  * Turbulence — the broadband "roar" of the expanding propellant-gas plume: band-limited noise with a
//!    fast attack and a two-stage exponential decay (plume, then the quieter late roar), amplitude-modulated
//!    by slow eddy noise.
//!  * Body — the perceived low-frequency "punch" (chest/room coupling, brake/barrel resonance): two decaying
//!    partials with a downward pitch glide, soft-saturated on the attack so the first cycles have teeth.
//!  * Sub — the slower 30–50 Hz pressure pulse you feel rather than hear.
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
    clip: f32,
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
    phase2: f32,
    // report (crack) + sub thump
    crack_amp: f32,
    crack_tau: f32,
    crack_bp: Biquad,
    crack_hp: Biquad,
    sub_amp: f32,
    sub_f: f32,
    sub_tau: f32,
    sub_phase: f32,
    // output conditioning
    aa: Biquad,
    aa2: Biquad,
    dc: DcBlock,
}

/// Late-roar level relative to the plume roar, and its decay relative to `turb_tau`.
const LATE_ROAR: f32 = 0.4;
const LATE_ROAR_TAU: f32 = 3.0;
/// Body attack saturation drive (higher = more harmonics on the first cycles).
const BODY_DRIVE: f32 = 1.7;

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
        let clip = ps * db_to_lin(-get(G::DRIVE_DB).max(0.0));

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

        // total length: until all layers are below ~-80 dB relative
        let blast_len = lead + t_plus * (1.0 + 12.0 / b);
        let turb_len = turb_tau * LATE_ROAR_TAU * 8.0;
        let body_len = body_tau * 10.4 + 0.002;
        let sub_len = sub_tau * 10.4 + 0.004;
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
            clip,
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
            phase2: 0.0,
            crack_amp,
            crack_tau,
            crack_bp: Biquad::new(BiquadKind::Bandpass, sr, crack_hz, 1.1, 0.0),
            crack_hp: Biquad::new(BiquadKind::Highpass, sr, crack_hz * 0.6, 0.7071, 0.0),
            sub_amp,
            sub_f,
            sub_tau,
            sub_phase: 0.0,
            aa: Biquad::new(BiquadKind::Lowpass, sr, bright, 0.5412, 0.0),
            aa2: Biquad::new(BiquadKind::Lowpass, sr, bright, 1.3066, 0.0),
            dc: DcBlock::new(sr, 10.0),
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
        let body_norm = 1.0 / BODY_DRIVE.tanh();
        for o in out.iter_mut() {
            if self.n >= self.len { *o = 0.0; continue; }
            let t = self.n as f32 * dt;
            // blast (+ precursor), then perceptual compaction of the instantaneous spike alone
            let mut blast = GunshotSource::friedlander_avg(t - self.lead, dt, self.ps, self.t_plus, self.b);
            if self.pre_amp > 0.0 { blast += GunshotSource::friedlander_avg(t, dt, self.pre_amp, self.pre_t, self.b * 1.5); }
            if self.clip > 0.0 { blast = self.clip * (blast / self.clip).tanh(); }
            let mut p = blast;
            let tt = t - self.lead;
            if tt >= 0.0 {
                // report: very short bright band-passed burst with a hard onset
                if self.crack_amp > 0.0 {
                    let env = (tt / 0.0001).min(1.0) * (-tt / self.crack_tau).exp();
                    let w = self.rng.gauss();
                    p += self.crack_hp.process(self.crack_bp.process(w)) * env * self.crack_amp * 1.2;
                }
                // turbulence: plume roar + quieter, slower late roar
                if self.turb_amp > 0.0 {
                    let att = (tt / 0.0004).min(1.0);
                    let env = att * ((-tt / self.turb_tau).exp() + LATE_ROAR * (-tt / (self.turb_tau * LATE_ROAR_TAU)).exp());
                    let eddy = 1.0 + 1.6 * self.eddy.process(self.rng.bipolar());
                    let w = self.rng.gauss();
                    p += self.turb_lp.process(self.turb_hp.process(w)) * env * eddy * self.turb_amp;
                }
                // body: two partials with a pitch glide, soft-saturated so the attack has harmonics
                if self.body_amp > 0.0 {
                    let f = self.body_f1 + (self.body_f0 - self.body_f1) * (-tt / 0.02).exp();
                    self.phase += TAU * f * dt;
                    if self.phase > TAU { self.phase -= TAU; }
                    self.phase2 += TAU * f * 1.52 * dt;
                    if self.phase2 > TAU { self.phase2 -= TAU; }
                    let att = (tt / 0.0012).min(1.0);
                    let env = att * (-tt / self.body_tau).exp();
                    let x = (self.phase.sin() + 0.38 * self.phase2.sin() * (-tt / (self.body_tau * 0.5)).exp()) * env;
                    p += (BODY_DRIVE * x).tanh() * body_norm * self.body_amp;
                }
                // sub thump: low sine burst, slower attack (the pressure wave you feel in your chest)
                if self.sub_amp > 0.0 {
                    self.sub_phase += TAU * self.sub_f * (1.0 + 0.5 * (-tt / 0.012).exp()) * dt;
                    if self.sub_phase > TAU { self.sub_phase -= TAU; }
                    let att = (tt / 0.004).min(1.0);
                    p += self.sub_phase.sin() * att * (-tt / self.sub_tau).exp() * self.sub_amp;
                }
            }
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

    fn blast_only() -> Vec<f32> {
        let mut p = G::DEFAULTS.to_vec();
        p[G::VARIATION] = 0.0;
        p[G::TURB_DB] = -90.0;
        p[G::BODY_DB] = -90.0;
        p[G::PRECURSOR_DB] = -90.0;
        p[G::CRACK_DB] = -90.0;
        p[G::SUB_DB] = -90.0;
        p[G::DRIVE_DB] = 0.0;
        p[G::BRIGHT_HZ] = 20000.0;
        p
    }
    fn render(p: &[f32], sr: f32, secs: f32) -> Vec<f32> {
        let mut g = GunshotSource::new(sr, p);
        let mut buf = vec![0.0f32; (secs * sr) as usize];
        g.render(&mut buf);
        buf
    }
    fn energy(b: &[f32]) -> f32 { b.iter().map(|v| v * v).sum() }

    #[test]
    fn peak_level_close_to_spec() {
        let buf = render(&blast_only(), 48000.0, 0.1);
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
        let ba = render(&G::DEFAULTS, sr, 1.0);
        let mut p = G::DEFAULTS.to_vec();
        p[G::SUPPRESS] = 1.0;
        let bb = render(&p, sr, 1.0);
        assert!(10.0 * (energy(&ba) / energy(&bb)).log10() > 15.0);
    }
    #[test]
    fn spike_compaction_only_touches_the_blast() {
        // body + sub alone must render identically whatever the drive: they are summed after the clipper
        let sr = 48000.0;
        let mut p = blast_only();
        p[G::PEAK_SPL] = 100.0; // make the blast itself negligible against the body
        p[G::BODY_DB] = 50.0;
        p[G::SUB_DB] = 45.0;
        let a = render(&p, sr, 0.5);
        p[G::DRIVE_DB] = 24.0;
        let b = render(&p, sr, 0.5);
        let ratio = 10.0 * (energy(&a) / energy(&b)).log10();
        assert!(ratio.abs() < 0.5, "body energy changed by {ratio} dB with drive");
        // and the compaction does bite on the blast
        let mut q = blast_only();
        let open = render(&q, sr, 0.05).iter().fold(0.0f32, |m, v| m.max(v.abs()));
        q[G::DRIVE_DB] = 12.0;
        let compact = render(&q, sr, 0.05).iter().fold(0.0f32, |m, v| m.max(v.abs()));
        let drop = 20.0 * (open / compact).log10();
        assert!(drop > 6.0 && drop < 13.0, "compaction {drop} dB");
    }
    #[test]
    fn roar_has_a_long_tail_and_low_end_outlives_the_spike() {
        let sr = 48000.0;
        let mut p = G::DEFAULTS.to_vec();
        p[G::VARIATION] = 0.0;
        let b = render(&p, sr, 1.5);
        let w = |t0: f32, t1: f32| energy(&b[(t0 * sr) as usize..(t1 * sr) as usize]) / (t1 - t0);
        // the late roar keeps the 300-600 ms window within 45 dB of the first 50 ms (power density)
        let late = 10.0 * (w(0.3, 0.6) / w(0.0, 0.05)).log10();
        assert!(late > -45.0 && late < -10.0, "late tail {late} dB");
        // body + sub: the 50-250 ms window still carries real energy (not a 1 ms tick)
        let mid = 10.0 * (w(0.05, 0.25) / w(0.0, 0.05)).log10();
        assert!(mid > -30.0, "mid {mid} dB");
    }
}
