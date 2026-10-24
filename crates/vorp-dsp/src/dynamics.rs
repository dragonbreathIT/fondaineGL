//! Dynamics: soft-knee feed-forward compressor (stereo-linked) and a lookahead brickwall limiter.

use crate::delay::DelayLine;
use crate::util::{db_to_lin, lin_to_db, tau_coef};

#[derive(Clone, Copy, Debug)]
pub struct CompressorParams {
    pub threshold_db: f32,
    pub ratio: f32,
    pub knee_db: f32,
    pub attack_ms: f32,
    pub release_ms: f32,
    pub makeup_db: f32,
    /// RMS detector time constant (ms). 0 = peak detection.
    pub detector_ms: f32,
}

pub struct Compressor {
    sr: f32,
    pub p: CompressorParams,
    env_db: f32,
    att: f32,
    rel: f32,
    det: f32,
    ms: f32,
    /// Current gain reduction (dB, <= 0) for metering.
    pub gr_db: f32,
}

impl Compressor {
    pub fn new(sr: f32, p: CompressorParams) -> Self {
        let mut c = Compressor { sr, p, env_db: 0.0, att: 0.0, rel: 0.0, det: 0.0, ms: 0.0, gr_db: 0.0 };
        c.set(p);
        c
    }
    pub fn set(&mut self, p: CompressorParams) {
        self.p = p;
        self.att = tau_coef(p.attack_ms * 0.001, self.sr);
        self.rel = tau_coef(p.release_ms * 0.001, self.sr);
        self.det = tau_coef(p.detector_ms * 0.001, self.sr);
    }
    /// Static gain computer: input level (dB) -> gain (dB).
    #[inline]
    pub fn curve(&self, x: f32) -> f32 {
        let t = self.p.threshold_db;
        let r = self.p.ratio.max(1.0);
        let w = self.p.knee_db.max(0.0);
        let y = if 2.0 * (x - t) < -w {
            x
        } else if 2.0 * (x - t).abs() <= w && w > 0.0 {
            let d = x - t + w * 0.5;
            x + (1.0 / r - 1.0) * d * d / (2.0 * w)
        } else {
            t + (x - t) / r
        };
        y - x
    }
    /// Sidechain detection on `level_lin` (peak magnitude) → returns linear gain to apply.
    #[inline]
    pub fn gain(&mut self, level_lin: f32) -> f32 {
        let x = if self.p.detector_ms > 0.0 {
            let sq = level_lin * level_lin;
            self.ms = sq + self.det * (self.ms - sq);
            // RMS of a sine is peak/√2; +3 dB keeps thresholds in peak-equivalent terms
            lin_to_db(self.ms.sqrt()) + 3.0103
        } else {
            lin_to_db(level_lin)
        };
        let target = self.curve(x);
        // smooth in gain domain: attack when gain reduction increases
        let coef = if target < self.env_db { self.att } else { self.rel };
        self.env_db = target + coef * (self.env_db - target);
        self.gr_db = self.env_db.min(0.0);
        db_to_lin(self.env_db + self.p.makeup_db)
    }
    pub fn reset(&mut self) { self.env_db = 0.0; }
}

/// Lookahead brickwall limiter: peak-hold over the lookahead window, smoothed release.
pub struct Limiter {
    sr: f32,
    dl: DelayLine,
    dr: DelayLine,
    look: usize,
    ceiling: f32,
    gain: f32,
    rel: f32,
    hold: Vec<f32>,
    hold_pos: usize,
    pub gr_db: f32,
}

impl Limiter {
    pub fn new(sr: f32, lookahead_ms: f32, ceiling_db: f32, release_ms: f32) -> Self {
        let look = ((lookahead_ms * 0.001 * sr) as usize).max(1);
        Limiter {
            sr,
            dl: DelayLine::new(look + 4),
            dr: DelayLine::new(look + 4),
            look,
            ceiling: db_to_lin(ceiling_db),
            gain: 1.0,
            rel: tau_coef(release_ms * 0.001, sr),
            hold: vec![0.0; look + 1],
            hold_pos: 0,
            gr_db: 0.0,
        }
    }
    pub fn set(&mut self, ceiling_db: f32, release_ms: f32) {
        self.ceiling = db_to_lin(ceiling_db);
        self.rel = tau_coef(release_ms * 0.001, self.sr);
    }
    #[inline]
    pub fn process(&mut self, l: &mut f32, r: &mut f32) {
        let peak = l.abs().max(r.abs());
        self.hold[self.hold_pos] = peak;
        self.hold_pos = (self.hold_pos + 1) % self.hold.len();
        let mut m = 0.0f32;
        for v in self.hold.iter() { if *v > m { m = *v; } }
        let need = if m > self.ceiling { self.ceiling / m } else { 1.0 };
        // instant attack (lookahead guarantees no overshoot), smooth release
        if need < self.gain { self.gain = need; } else { self.gain = need + self.rel * (self.gain - need); }
        self.dl.push(*l);
        self.dr.push(*r);
        *l = self.dl.read_int(self.look) * self.gain;
        *r = self.dr.read_int(self.look) * self.gain;
        self.gr_db = lin_to_db(self.gain);
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn limiter_never_exceeds_ceiling() {
        let mut lim = Limiter::new(48000.0, 1.5, -1.0, 80.0);
        let c = db_to_lin(-1.0);
        for i in 0..20000 {
            let x = if i % 3000 == 0 { 40.0 } else { (i as f32 * 0.05).sin() * 2.0 };
            let (mut l, mut r) = (x, -x);
            lim.process(&mut l, &mut r);
            assert!(l.abs() <= c * 1.0001 && r.abs() <= c * 1.0001);
        }
    }
    #[test]
    fn compressor_curve() {
        let c = Compressor::new(48000.0, CompressorParams { threshold_db: -10.0, ratio: 4.0, knee_db: 0.0, attack_ms: 1.0, release_ms: 100.0, makeup_db: 0.0, detector_ms: 0.0 });
        assert!((c.curve(-20.0)).abs() < 1e-4);
        assert!((c.curve(10.0) - (-15.0)).abs() < 1e-3); // 20 dB over -> 5 dB over
    }
}
