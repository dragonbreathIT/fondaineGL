//! Filters: RBJ biquads, one-pole sections, DC blocker, Brown–Duda head-shadow section.

use crate::util::{flush_denormal, PI, TAU};

/// Transposed direct form II biquad.
#[derive(Clone, Copy, Debug)]
pub struct Biquad {
    pub b0: f32, pub b1: f32, pub b2: f32, pub a1: f32, pub a2: f32,
    z1: f32, z2: f32,
}

impl Default for Biquad {
    fn default() -> Self { Biquad::identity() }
}

#[derive(Clone, Copy, Debug, PartialEq)]
pub enum BiquadKind { Lowpass, Highpass, Bandpass, Notch, Peaking, LowShelf, HighShelf, Allpass }

impl Biquad {
    pub const fn identity() -> Self { Biquad { b0: 1.0, b1: 0.0, b2: 0.0, a1: 0.0, a2: 0.0, z1: 0.0, z2: 0.0 } }

    pub fn new(kind: BiquadKind, sr: f32, freq: f32, q: f32, gain_db: f32) -> Self {
        let mut b = Biquad::identity();
        b.set(kind, sr, freq, q, gain_db);
        b
    }

    /// Robert Bristow-Johnson cookbook coefficients. Keeps filter state.
    pub fn set(&mut self, kind: BiquadKind, sr: f32, freq: f32, q: f32, gain_db: f32) {
        let f = freq.clamp(5.0, sr * 0.499);
        let w0 = TAU * f / sr;
        let (sw, cw) = w0.sin_cos();
        let q = q.max(0.05);
        let alpha = sw / (2.0 * q);
        let a = 10f32.powf(gain_db / 40.0);
        let (b0, b1, b2, a0, a1, a2) = match kind {
            BiquadKind::Lowpass => ((1.0 - cw) / 2.0, 1.0 - cw, (1.0 - cw) / 2.0, 1.0 + alpha, -2.0 * cw, 1.0 - alpha),
            BiquadKind::Highpass => ((1.0 + cw) / 2.0, -(1.0 + cw), (1.0 + cw) / 2.0, 1.0 + alpha, -2.0 * cw, 1.0 - alpha),
            BiquadKind::Bandpass => (alpha, 0.0, -alpha, 1.0 + alpha, -2.0 * cw, 1.0 - alpha),
            BiquadKind::Notch => (1.0, -2.0 * cw, 1.0, 1.0 + alpha, -2.0 * cw, 1.0 - alpha),
            BiquadKind::Allpass => (1.0 - alpha, -2.0 * cw, 1.0 + alpha, 1.0 + alpha, -2.0 * cw, 1.0 - alpha),
            BiquadKind::Peaking => (1.0 + alpha * a, -2.0 * cw, 1.0 - alpha * a, 1.0 + alpha / a, -2.0 * cw, 1.0 - alpha / a),
            BiquadKind::LowShelf => {
                let s = 2.0 * a.sqrt() * alpha;
                (
                    a * ((a + 1.0) - (a - 1.0) * cw + s),
                    2.0 * a * ((a - 1.0) - (a + 1.0) * cw),
                    a * ((a + 1.0) - (a - 1.0) * cw - s),
                    (a + 1.0) + (a - 1.0) * cw + s,
                    -2.0 * ((a - 1.0) + (a + 1.0) * cw),
                    (a + 1.0) + (a - 1.0) * cw - s,
                )
            }
            BiquadKind::HighShelf => {
                let s = 2.0 * a.sqrt() * alpha;
                (
                    a * ((a + 1.0) + (a - 1.0) * cw + s),
                    -2.0 * a * ((a - 1.0) + (a + 1.0) * cw),
                    a * ((a + 1.0) + (a - 1.0) * cw - s),
                    (a + 1.0) - (a - 1.0) * cw + s,
                    2.0 * ((a - 1.0) - (a + 1.0) * cw),
                    (a + 1.0) - (a - 1.0) * cw - s,
                )
            }
        };
        let inv = 1.0 / a0;
        self.b0 = b0 * inv; self.b1 = b1 * inv; self.b2 = b2 * inv; self.a1 = a1 * inv; self.a2 = a2 * inv;
    }

    #[inline]
    pub fn process(&mut self, x: f32) -> f32 {
        let y = self.b0 * x + self.z1;
        self.z1 = self.b1 * x - self.a1 * y + self.z2;
        self.z2 = self.b2 * x - self.a2 * y;
        y
    }

    pub fn process_block(&mut self, buf: &mut [f32]) {
        for s in buf.iter_mut() { *s = self.process(*s); }
        self.z1 = flush_denormal(self.z1);
        self.z2 = flush_denormal(self.z2);
    }

    pub fn reset(&mut self) { self.z1 = 0.0; self.z2 = 0.0; }

    /// Magnitude response at `freq` (linear).
    pub fn magnitude(&self, sr: f32, freq: f32) -> f32 {
        let w = TAU * freq / sr;
        let (s1, c1) = w.sin_cos();
        let (s2, c2) = (2.0 * w).sin_cos();
        let nr = self.b0 + self.b1 * c1 + self.b2 * c2;
        let ni = -(self.b1 * s1 + self.b2 * s2);
        let dr = 1.0 + self.a1 * c1 + self.a2 * c2;
        let di = -(self.a1 * s1 + self.a2 * s2);
        ((nr * nr + ni * ni) / (dr * dr + di * di)).sqrt()
    }
}

/// One-pole lowpass (impulse-invariant), 6 dB/oct.
#[derive(Clone, Copy, Debug, Default)]
pub struct OnePoleLP { pub a: f32, pub z: f32 }
impl OnePoleLP {
    pub fn new(sr: f32, fc: f32) -> Self { let mut f = OnePoleLP::default(); f.set(sr, fc); f }
    #[inline]
    pub fn set(&mut self, sr: f32, fc: f32) {
        // exact -3 dB at fc for bilinear-free one-pole: a = exp(-2π fc / sr)
        let fc = fc.clamp(1.0, sr * 0.49);
        self.a = (-TAU * fc / sr).exp();
    }
    /// Disable (pass-through).
    pub fn bypass(&mut self) { self.a = 0.0; }
    #[inline]
    pub fn process(&mut self, x: f32) -> f32 {
        self.z = x + self.a * (self.z - x);
        self.z
    }
    pub fn flush(&mut self) { self.z = flush_denormal(self.z); }
}

/// One-pole highpass = x - LP(x).
#[derive(Clone, Copy, Debug, Default)]
pub struct OnePoleHP { lp: OnePoleLP }
impl OnePoleHP {
    pub fn new(sr: f32, fc: f32) -> Self { OnePoleHP { lp: OnePoleLP::new(sr, fc) } }
    pub fn set(&mut self, sr: f32, fc: f32) { self.lp.set(sr, fc); }
    #[inline]
    pub fn process(&mut self, x: f32) -> f32 { x - self.lp.process(x) }
    pub fn flush(&mut self) { self.lp.flush(); }
}

/// DC blocker (first-order highpass ~ 5 Hz).
#[derive(Clone, Copy, Debug)]
pub struct DcBlock { r: f32, x1: f32, y1: f32 }
impl DcBlock {
    pub fn new(sr: f32, fc: f32) -> Self { DcBlock { r: 1.0 - (TAU * fc / sr), x1: 0.0, y1: 0.0 } }
    #[inline]
    pub fn process(&mut self, x: f32) -> f32 {
        let y = x - self.x1 + self.r * self.y1;
        self.x1 = x;
        self.y1 = flush_denormal(y);
        y
    }
}

/// Brown & Duda (1998) spherical-head shadow filter:
/// H(s) = (α s + β) / (s + β), β = 2c/a, α in [~0.1, 2] depending on incidence angle.
/// Discretised with the bilinear transform.
#[derive(Clone, Copy, Debug, Default)]
pub struct HeadShadow { b0: f32, b1: f32, a1: f32, x1: f32, y1: f32 }
impl HeadShadow {
    pub fn set(&mut self, sr: f32, head_radius: f32, c: f32, alpha: f32) {
        let beta = 2.0 * c / head_radius;
        let t = 2.0 * sr;
        let d = t + beta;
        self.b0 = (alpha * t + beta) / d;
        self.b1 = (beta - alpha * t) / d;
        self.a1 = (beta - t) / d;
    }
    #[inline]
    pub fn process(&mut self, x: f32) -> f32 {
        let y = self.b0 * x + self.b1 * self.x1 - self.a1 * self.y1;
        self.x1 = x;
        self.y1 = flush_denormal(y);
        y
    }
    /// α(θ) per Brown–Duda with α_min = 0.1, θ_min = 150°. θ = angle between ear axis and source (rad).
    pub fn alpha_for_angle(theta: f32) -> f32 {
        let alpha_min = 0.1f32;
        let theta_min = 150.0f32.to_radians();
        (1.0 + alpha_min * 0.5) + (1.0 - alpha_min * 0.5) * (theta / theta_min * PI).cos()
    }
}

/// Damped resonator (complex one-pole, "modal" oscillator). Excited by input, rings at `freq` with T60.
#[derive(Clone, Copy, Debug, Default)]
pub struct Resonator { cr: f32, ci: f32, yr: f32, yi: f32, pub gain: f32 }
impl Resonator {
    pub fn set(&mut self, sr: f32, freq: f32, t60: f32, gain: f32) {
        let r = if t60 > 0.0 { (-6.907_755 / (t60 * sr)).exp() } else { 0.0 }; // ln(1000)
        let w = TAU * freq.min(sr * 0.49) / sr;
        self.cr = r * w.cos();
        self.ci = r * w.sin();
        self.gain = gain;
    }
    #[inline]
    pub fn process(&mut self, x: f32) -> f32 {
        let yr = self.cr * self.yr - self.ci * self.yi + x;
        let yi = self.ci * self.yr + self.cr * self.yi;
        self.yr = yr;
        self.yi = yi;
        yi * self.gain
    }
    pub fn energy(&self) -> f32 { self.yr * self.yr + self.yi * self.yi }
    pub fn flush(&mut self) { self.yr = flush_denormal(self.yr); self.yi = flush_denormal(self.yi); }
    pub fn reset(&mut self) { self.yr = 0.0; self.yi = 0.0; }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn biquad_lowpass_response() {
        let b = Biquad::new(BiquadKind::Lowpass, 48000.0, 1000.0, 0.7071, 0.0);
        assert!((b.magnitude(48000.0, 100.0) - 1.0).abs() < 0.02);
        assert!((b.magnitude(48000.0, 1000.0) - 0.7071).abs() < 0.02);
        assert!(b.magnitude(48000.0, 10000.0) < 0.02);
    }
    #[test]
    fn head_shadow_extremes() {
        // facing ear: alpha ~ 2 => high-frequency boost ~ +6dB; shadowed: alpha ~0.1 => -20dB HF
        assert!(HeadShadow::alpha_for_angle(0.0) > 1.9);
        assert!(HeadShadow::alpha_for_angle(150f32.to_radians()) < 0.11);
    }
    #[test]
    fn resonator_decays_at_t60() {
        let sr = 48000.0;
        let mut r = Resonator::default();
        r.set(sr, 440.0, 1.0, 1.0);
        r.process(1.0);
        let e0 = r.energy();
        for _ in 0..48000 { r.process(0.0); }
        let e1 = r.energy();
        let db = 10.0 * (e1 / e0).log10();
        assert!((db + 60.0).abs() < 0.5, "decay {db} dB");
    }
}
