//! 8-line feedback delay network late reverb (Jot-style) with 3-band frequency-dependent RT60,
//! input diffusion, delay modulation and decorrelated stereo outputs.

use crate::delay::{Allpass, DelayLine};
use crate::filters::OnePoleLP;
use crate::util::{db_to_lin, flush_denormal, TAU};

const N: usize = 8;
/// Base delay lengths in ms for room size 1.0 (mutually prime-ish).
const BASE_MS: [f32; N] = [29.7, 37.1, 41.1, 43.7, 53.3, 59.9, 67.7, 73.1];
const OUT_L: [f32; N] = [1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0];
const OUT_R: [f32; N] = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0];

#[derive(Clone, Copy, Debug)]
pub struct ReverbParams {
    /// RT60 (s) below `xover_low_hz`.
    pub rt60_low: f32,
    /// RT60 (s) mid band.
    pub rt60_mid: f32,
    /// RT60 (s) above `xover_high_hz`.
    pub rt60_high: f32,
    pub xover_low_hz: f32,
    pub xover_high_hz: f32,
    /// Delay-length scale (≈ mean free path scale). 1 = medium room; 3–6 = hall / outdoor slap field.
    pub size: f32,
    /// 0..1 input allpass diffusion.
    pub diffusion: f32,
    /// Predelay (ms) before the late field starts.
    pub predelay_ms: f32,
    /// Delay modulation depth (ms) — breaks up metallic ringing.
    pub mod_depth_ms: f32,
    pub mod_rate_hz: f32,
    /// Output level (dB) of the late field.
    pub level_db: f32,
    /// Extra damping lowpass on the output (Hz).
    pub tone_hz: f32,
}

impl Default for ReverbParams {
    fn default() -> Self {
        ReverbParams {
            rt60_low: 1.2,
            rt60_mid: 1.0,
            rt60_high: 0.5,
            xover_low_hz: 250.0,
            xover_high_hz: 4000.0,
            size: 1.0,
            diffusion: 0.7,
            predelay_ms: 12.0,
            mod_depth_ms: 0.35,
            mod_rate_hz: 0.6,
            level_db: 0.0,
            tone_hz: 9000.0,
        }
    }
}

struct Line {
    delay: DelayLine,
    len: f32,
    lp_low: OnePoleLP,
    lp_high: OnePoleLP,
    g_low: f32,
    g_mid: f32,
    g_high: f32,
    phase: f32,
}

pub struct Fdn {
    sr: f32,
    lines: Vec<Line>,
    diffusers: Vec<Allpass>,
    predelay: DelayLine,
    predelay_samples: f32,
    tone_l: OnePoleLP,
    tone_r: OnePoleLP,
    pub params: ReverbParams,
    level: f32,
    mod_inc: f32,
    mod_depth: f32,
}

impl Fdn {
    pub fn new(sr: f32) -> Self {
        let max_size = 8.0f32;
        let lines = (0..N)
            .map(|i| Line {
                delay: DelayLine::new((BASE_MS[i] * 0.001 * sr * max_size) as usize + 256),
                len: 0.0,
                lp_low: OnePoleLP::default(),
                lp_high: OnePoleLP::default(),
                g_low: 0.0,
                g_mid: 0.0,
                g_high: 0.0,
                phase: i as f32 * 0.79,
            })
            .collect();
        let diff_ms = [4.77f32, 3.59, 12.73, 9.31];
        let diffusers = diff_ms.iter().map(|ms| Allpass::new((ms * 0.001 * sr) as usize, 0.6)).collect();
        let mut f = Fdn {
            sr,
            lines,
            diffusers,
            predelay: DelayLine::new((0.25 * sr) as usize),
            predelay_samples: 0.0,
            tone_l: OnePoleLP::default(),
            tone_r: OnePoleLP::default(),
            params: ReverbParams::default(),
            level: 1.0,
            mod_inc: 0.0,
            mod_depth: 0.0,
        };
        f.set_params(ReverbParams::default());
        f
    }

    pub fn set_params(&mut self, p: ReverbParams) {
        let sr = self.sr;
        let size = p.size.clamp(0.1, 8.0);
        for (i, l) in self.lines.iter_mut().enumerate() {
            l.len = (BASE_MS[i] * 0.001 * sr * size).min(l.delay.max_delay() - 64.0).max(16.0);
            // gain per pass so that energy decays 60 dB in RT60 seconds: g = 10^(-3 * len / (sr * rt60))
            let g = |rt: f32| 10f32.powf(-3.0 * l.len / (sr * rt.max(0.02)));
            l.g_low = g(p.rt60_low);
            l.g_mid = g(p.rt60_mid);
            l.g_high = g(p.rt60_high);
            l.lp_low.set(sr, p.xover_low_hz);
            l.lp_high.set(sr, p.xover_high_hz);
        }
        let dg = 0.5 + 0.25 * p.diffusion.clamp(0.0, 1.0);
        let diff_ms = [4.77f32, 3.59, 12.73, 9.31];
        for (i, d) in self.diffusers.iter_mut().enumerate() {
            d.g = if p.diffusion <= 0.0 { 0.0 } else { dg };
            d.set_delay(((diff_ms[i] * size.sqrt()).min(40.0) * 0.001 * sr) as usize);
        }
        self.predelay_samples = (p.predelay_ms * 0.001 * sr).clamp(0.0, self.predelay.max_delay());
        self.tone_l.set(sr, p.tone_hz);
        self.tone_r.set(sr, p.tone_hz);
        self.level = db_to_lin(p.level_db);
        self.mod_inc = TAU * p.mod_rate_hz / sr;
        self.mod_depth = p.mod_depth_ms * 0.001 * sr;
        self.params = p;
    }

    /// Mono input block -> adds to stereo outputs.
    pub fn process(&mut self, input: &[f32], out_l: &mut [f32], out_r: &mut [f32]) {
        let norm = 1.0 / (N as f32).sqrt();
        let mut ys = [0.0f32; N];
        for i in 0..input.len() {
            self.predelay.push(input[i]);
            let mut x = self.predelay.read(self.predelay_samples);
            for d in self.diffusers.iter_mut() { x = d.process(x); }
            // read delay outputs (with slow modulation on even lines)
            let mut sum = 0.0;
            for (k, l) in self.lines.iter_mut().enumerate() {
                let m = if k & 1 == 0 {
                    l.phase += self.mod_inc;
                    if l.phase > TAU { l.phase -= TAU; }
                    self.mod_depth * l.phase.sin()
                } else { 0.0 };
                let y = l.delay.read(l.len + m - 1.0);
                // 3-band absorption: low = LP_low(y), high = y - LP_high(y), mid = rest
                let low = l.lp_low.process(y);
                let lp_hi = l.lp_high.process(y);
                let high = y - lp_hi;
                let mid = y - low - high;
                let yf = low * l.g_low + mid * l.g_mid + high * l.g_high;
                ys[k] = yf;
                sum += yf;
            }
            // Householder feedback: v_i = y_i - (2/N) Σ y + input
            let h = sum * (2.0 / N as f32);
            let mut ol = 0.0;
            let mut or = 0.0;
            for k in 0..N {
                let fb = ys[k] - h;
                self.lines[k].delay.push(flush_denormal(fb + x * norm));
                ol += OUT_L[k] * ys[k];
                or += OUT_R[k] * ys[k];
            }
            out_l[i] += self.tone_l.process(ol * norm) * self.level;
            out_r[i] += self.tone_r.process(or * norm) * self.level;
        }
        for l in self.lines.iter_mut() { l.lp_low.flush(); l.lp_high.flush(); }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn decays_close_to_rt60() {
        let sr = 48000.0;
        let mut f = Fdn::new(sr);
        let mut p = ReverbParams::default();
        p.rt60_low = 1.0; p.rt60_mid = 1.0; p.rt60_high = 1.0; p.predelay_ms = 0.0; p.diffusion = 0.7; p.mod_depth_ms = 0.0;
        f.set_params(p);
        let block = 128;
        let mut input = vec![0.0f32; block];
        input[0] = 1.0;
        let mut energies = Vec::new();
        for b in 0..(2 * 48000 / block) {
            let mut l = vec![0.0f32; block];
            let mut r = vec![0.0f32; block];
            f.process(&input, &mut l, &mut r);
            if b == 0 { input[0] = 0.0; }
            energies.push(l.iter().map(|v| v * v).sum::<f32>() + r.iter().map(|v| v * v).sum::<f32>());
        }
        // energy in window around 0.2s vs around 0.7s should differ by ~30 dB (0.5 s of a 1 s RT60)
        let win = |t: f32| -> f32 { let c = (t * 48000.0 / 128.0) as usize; energies[c - 10..c + 10].iter().sum() };
        let drop = 10.0 * (win(0.2) / win(0.7)).log10();
        assert!((drop - 30.0).abs() < 4.0, "drop {drop} dB");
    }
}
