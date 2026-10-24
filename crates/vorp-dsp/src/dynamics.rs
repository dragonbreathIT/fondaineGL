//! Dynamics: soft-knee feed-forward compressor with program-dependent release (stereo-linked), an
//! "overload" saturator (asymmetric soft clip + brief HF loss while driven) and a lookahead brickwall
//! limiter with program-dependent release.
//!
//! Loudness philosophy: a gunshot at the shooter's ears is 40–50 dB over the mapping's full scale. The
//! compressor attacks in a fraction of a millisecond, so every onset is measured on its *own* level — a
//! second shot never arrives into the gain reduction left by the first (no ducking into a buzz). What is
//! left above full scale is density: the saturator fills the first 2–5 ms and the body of the shot at full
//! scale, the limiter only catches what the saturator lets through.

use crate::delay::DelayLine;
use crate::filters::OnePoleLP;
use crate::util::{db_to_lin, lin_to_db, tau_coef};

#[derive(Clone, Copy, Debug)]
pub struct CompressorParams {
    pub threshold_db: f32,
    pub ratio: f32,
    pub knee_db: f32,
    pub attack_ms: f32,
    /// Release after a brief peak. Sustained gain reduction releases `SLOW_RELEASE_MUL` times slower.
    pub release_ms: f32,
    pub makeup_db: f32,
    /// RMS detector time constant (ms). 0 = peak detection.
    pub detector_ms: f32,
}

/// Sustained gain reduction releases this many times slower than a brief peak.
const SLOW_RELEASE_MUL: f32 = 4.0;

/// Tracks how long gain reduction has been applied: 0 = brief peak, 1 = sustained (≳150 ms).
#[derive(Clone, Copy, Default)]
struct Sustain { v: f32, up: f32, down: f32 }
impl Sustain {
    fn new(sr: f32) -> Self { Sustain { v: 0.0, up: 1.0 / (0.12 * sr), down: 1.0 / (0.6 * sr) } }
    #[inline]
    fn step(&mut self, active: bool) -> f32 {
        if active { self.v += (1.0 - self.v) * self.up; } else { self.v -= self.v * self.down; }
        self.v
    }
    fn reset(&mut self) { self.v = 0.0; }
}

pub struct Compressor {
    sr: f32,
    pub p: CompressorParams,
    env_db: f32,
    att: f32,
    rel_fast: f32,
    rel_slow: f32,
    det: f32,
    ms: f32,
    sustain: Sustain,
    /// Current gain reduction (dB, <= 0) for metering.
    pub gr_db: f32,
}

impl Compressor {
    pub fn new(sr: f32, p: CompressorParams) -> Self {
        let mut c = Compressor { sr, p, env_db: 0.0, att: 0.0, rel_fast: 0.0, rel_slow: 0.0, det: 0.0, ms: 0.0, sustain: Sustain::new(sr), gr_db: 0.0 };
        c.set(p);
        c
    }
    pub fn set(&mut self, p: CompressorParams) {
        self.p = p;
        self.att = tau_coef(p.attack_ms * 0.001, self.sr);
        self.rel_fast = tau_coef(p.release_ms * 0.001, self.sr);
        self.rel_slow = tau_coef(p.release_ms * 0.001 * SLOW_RELEASE_MUL, self.sr);
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
        let s = self.sustain.step(self.env_db < -3.0);
        // smooth in gain domain: attack when gain reduction increases, program-dependent release otherwise
        let coef = if target < self.env_db { self.att } else { self.rel_fast + (self.rel_slow - self.rel_fast) * s };
        self.env_db = target + coef * (self.env_db - target);
        self.gr_db = self.env_db.min(0.0);
        db_to_lin(self.env_db + self.p.makeup_db)
    }
    pub fn reset(&mut self) { self.env_db = 0.0; self.ms = 0.0; self.sustain.reset(); }
}

/// Overload saturator: identity below `knee`, tanh-shaped saturation from the knee up to 1.0 (never exceeds 1),
/// with positive half-cycles clipping earlier than negative ones (`asym`) and a lowpass that drops towards
/// `dull_hz` while the stage is being driven, recovering with `dull_ms` — the crunch and the brief HF loss of
/// an overdriven ear / camera limiter. Processes a stereo block (cutoff updated per block).
pub struct Overload {
    sr: f32,
    knee_pos: f32,
    knee_neg: f32,
    dull_hz: f32,
    dull_rel: f32,
    env: f32,
    lp_l: OnePoleLP,
    lp_r: OnePoleLP,
    /// Current dulling cutoff (Hz) for metering.
    pub cutoff_hz: f32,
}

const OPEN_HZ: f32 = 18000.0;

impl Overload {
    pub fn new(sr: f32, knee_db: f32, asym: f32, dull_hz: f32, dull_ms: f32) -> Self {
        let mut o = Overload { sr, knee_pos: 0.5, knee_neg: 0.5, dull_hz: 3500.0, dull_rel: 0.0, env: 0.0, lp_l: OnePoleLP::default(), lp_r: OnePoleLP::default(), cutoff_hz: OPEN_HZ };
        o.set(knee_db, asym, dull_hz, dull_ms);
        o
    }
    pub fn set(&mut self, knee_db: f32, asym: f32, dull_hz: f32, dull_ms: f32) {
        let knee = db_to_lin(knee_db.min(-0.1));
        let a = asym.clamp(0.0, 1.0);
        self.knee_pos = (knee * (1.0 - 0.55 * a)).max(0.05);
        self.knee_neg = (knee * (1.0 + 0.2 * a)).min(0.97);
        self.dull_hz = dull_hz.clamp(300.0, OPEN_HZ);
        // per-block recovery (the cutoff is updated once per block)
        self.dull_rel = tau_coef(dull_ms * 0.001, self.sr / crate::util::BLOCK as f32);
    }
    #[inline]
    fn sat(x: f32, knee: f32) -> f32 {
        let room = 1.0 - knee;
        knee + room * ((x - knee) / room).tanh()
    }
    #[inline]
    fn shape(&self, x: f32) -> f32 {
        if x >= 0.0 { if x <= self.knee_pos { x } else { Self::sat(x, self.knee_pos) } }
        else if -x <= self.knee_neg { x } else { -Self::sat(-x, self.knee_neg) }
    }
    pub fn process(&mut self, l: &mut [f32], r: &mut [f32]) {
        // cutoff for this block from the overload envelope so far
        let open = self.env < 1e-3;
        let cutoff = OPEN_HZ * (self.dull_hz / OPEN_HZ).powf(self.env.min(1.0));
        self.cutoff_hz = cutoff;
        if !open { self.lp_l.set(self.sr, cutoff); self.lp_r.set(self.sr, cutoff); }
        let mut drive = 0.0f32;
        for i in 0..l.len() {
            let pk = l[i].abs().max(r[i].abs());
            if pk > self.knee_pos { drive = drive.max((pk - self.knee_pos) / (1.0 - self.knee_pos)); }
            let yl = self.shape(l[i]);
            let yr = self.shape(r[i]);
            if open { l[i] = yl; r[i] = yr; } else { l[i] = self.lp_l.process(yl); r[i] = self.lp_r.process(yr); }
        }
        if open { self.lp_l.z = l[l.len() - 1]; self.lp_r.z = r[r.len() - 1]; }
        // instant attack on overload, exponential recovery
        let target = drive.min(1.0);
        self.env = if target > self.env { target } else { target + self.dull_rel * (self.env - target) };
        if self.env < 1e-4 { self.env = 0.0; }
        self.lp_l.flush();
        self.lp_r.flush();
    }
}

/// Lookahead brickwall limiter: peak-hold over the lookahead window, program-dependent smoothed release.
pub struct Limiter {
    sr: f32,
    dl: DelayLine,
    dr: DelayLine,
    look: usize,
    ceiling: f32,
    gain: f32,
    rel_fast: f32,
    rel_slow: f32,
    sustain: Sustain,
    hold: Vec<f32>,
    hold_pos: usize,
    pub gr_db: f32,
}

impl Limiter {
    pub fn new(sr: f32, lookahead_ms: f32, ceiling_db: f32, release_ms: f32) -> Self {
        let look = ((lookahead_ms * 0.001 * sr) as usize).max(1);
        let mut l = Limiter {
            sr,
            dl: DelayLine::new(look + 4),
            dr: DelayLine::new(look + 4),
            look,
            ceiling: db_to_lin(ceiling_db),
            gain: 1.0,
            rel_fast: 0.0,
            rel_slow: 0.0,
            sustain: Sustain::new(sr),
            hold: vec![0.0; look + 1],
            hold_pos: 0,
            gr_db: 0.0,
        };
        l.set(ceiling_db, release_ms);
        l
    }
    pub fn set(&mut self, ceiling_db: f32, release_ms: f32) {
        self.ceiling = db_to_lin(ceiling_db);
        self.rel_fast = tau_coef(release_ms * 0.001, self.sr);
        self.rel_slow = tau_coef(release_ms * 0.001 * 6.0, self.sr);
    }
    #[inline]
    pub fn process(&mut self, l: &mut f32, r: &mut f32) {
        let peak = l.abs().max(r.abs());
        self.hold[self.hold_pos] = peak;
        self.hold_pos = (self.hold_pos + 1) % self.hold.len();
        let mut m = 0.0f32;
        for v in self.hold.iter() { if *v > m { m = *v; } }
        let need = if m > self.ceiling { self.ceiling / m } else { 1.0 };
        let s = self.sustain.step(self.gain < 0.891); // > 1 dB of limiting
        // instant attack (lookahead guarantees no overshoot), program-dependent smooth release
        if need < self.gain { self.gain = need; } else {
            let rel = self.rel_fast + (self.rel_slow - self.rel_fast) * s;
            self.gain = need + rel * (self.gain - need);
        }
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
    #[test]
    fn compressor_release_is_program_dependent() {
        let sr = 48000.0;
        let p = CompressorParams { threshold_db: -10.0, ratio: 4.0, knee_db: 0.0, attack_ms: 0.3, release_ms: 50.0, makeup_db: 0.0, detector_ms: 0.0 };
        let run = |hold_s: f32| -> f32 {
            let mut c = Compressor::new(sr, p);
            for _ in 0..(hold_s * sr) as usize { c.gain(db_to_lin(20.0)); }
            // measure gain reduction 150 ms (3 fast release time constants) after the signal drops to silence
            let mut g = 0.0;
            for _ in 0..(0.15 * sr) as usize { g = c.gain(1e-6); }
            lin_to_db(g)
        };
        let brief = run(0.002);
        let sustained = run(0.5);
        assert!(brief > -4.0, "brief peak should release fast: {brief} dB left");
        assert!(sustained < brief - 6.0, "sustained reduction should release slower: {sustained} vs {brief}");
    }
    #[test]
    fn compressor_onsets_are_measured_on_their_own_level() {
        // two identical bursts 75 ms apart (full auto): once the sub-millisecond attack has settled, the second
        // burst's onset (1–5 ms) comes out within 1.5 dB of the first — no earlier gain reduction lingers on it.
        // (The first ~0.3 ms of either onset pass nearly unreduced; the overload saturator turns that into the
        // full-scale hit of the first milliseconds.)
        let sr = 48000.0;
        let p = CompressorParams { threshold_db: -6.0, ratio: 2.6, knee_db: 6.0, attack_ms: 0.3, release_ms: 90.0, makeup_db: 0.0, detector_ms: 2.0 };
        let mut c = Compressor::new(sr, p);
        let burst = |t: f32| -> f32 { if t < 0.0 { 0.0 } else { db_to_lin(40.0) * (-t / 0.03).exp() } };
        let mut e = [0.0f32; 2];
        let n = (0.2 * sr) as usize;
        for i in 0..n {
            let t = i as f32 / sr;
            let x = burst(t) + burst(t - 0.075);
            let y = x * c.gain(x);
            for (k, t0) in [0.0f32, 0.075].iter().enumerate() {
                if t >= t0 + 0.001 && t < t0 + 0.005 { e[k] += y * y; }
            }
        }
        let d = 10.0 * (e[1] / e[0]).log10();
        assert!(d.abs() < 1.5, "second onset differs by {d} dB");
    }
    #[test]
    fn overload_is_bounded_asymmetric_and_dulls_briefly() {
        let sr = 48000.0;
        let mut o = Overload::new(sr, -4.0, 0.6, 3000.0, 40.0);
        let mut l = [0.0f32; 128];
        let mut r = [0.0f32; 128];
        for i in 0..128 { l[i] = 3.0 * (i as f32 * 0.3).sin(); r[i] = -l[i]; }
        o.process(&mut l, &mut r);
        let (mut pos, mut neg) = (0.0f32, 0.0f32);
        for v in l.iter() { pos = pos.max(*v); neg = neg.min(*v); }
        assert!(pos <= 1.0 && neg >= -1.0);
        assert!(pos < -neg, "positive half-cycles should clip earlier: {pos} vs {neg}");
        assert!(o.cutoff_hz > 17000.0); // first block starts open
        let mut q = [0.0f32; 128];
        let mut q2 = [0.0f32; 128];
        o.process(&mut q, &mut q2);
        assert!(o.cutoff_hz < 4000.0, "should be dulled after the overload: {}", o.cutoff_hz);
        for _ in 0..200 { o.process(&mut q, &mut q2); }
        assert!(o.cutoff_hz > 15000.0, "should recover: {}", o.cutoff_hz);
    }
}
