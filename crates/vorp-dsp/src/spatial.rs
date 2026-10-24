//! Structural binaural model (Brown & Duda 1998): spherical-head ITD + head-shadow ILD per ear,
//! plus an elevation-dependent pinna notch and a rear high-frequency shadow.
//! Directions are unit vectors from listener to source in the listener frame:
//! `right` component (+ = right ear side), `up`, `front` (+ = in front).

use crate::delay::DelayLine;
use crate::filters::{Biquad, BiquadKind, HeadShadow};
use crate::util::{Ramp, PI};

#[derive(Clone, Copy, Debug)]
pub struct LocalDir { pub right: f32, pub up: f32, pub front: f32 }

impl LocalDir {
    pub fn front() -> Self { LocalDir { right: 0.0, up: 0.0, front: 1.0 } }
}

pub struct Binaural {
    sr: f32,
    pub head_radius: f32,
    pub c: f32,
    itd_l: DelayLine,
    itd_r: DelayLine,
    d_l: Ramp,
    d_r: Ramp,
    hs_l: HeadShadow,
    hs_r: HeadShadow,
    pinna: Biquad,
    rear: Biquad,
    smoothed: LocalDir,
    initialized: bool,
}

impl Binaural {
    pub fn new(sr: f32) -> Self {
        let mut b = Binaural {
            sr,
            head_radius: 0.0875,
            c: 343.0,
            itd_l: DelayLine::new(128),
            itd_r: DelayLine::new(128),
            d_l: Ramp::new(0.0),
            d_r: Ramp::new(0.0),
            hs_l: HeadShadow::default(),
            hs_r: HeadShadow::default(),
            pinna: Biquad::identity(),
            rear: Biquad::identity(),
            smoothed: LocalDir::front(),
            initialized: false,
        };
        b.update(LocalDir::front(), true);
        b
    }

    pub fn reset(&mut self) {
        self.itd_l.clear();
        self.itd_r.clear();
        self.initialized = false;
    }

    /// Per-ear ITD (s) per Brown–Duda for incidence angle θ between ear axis and source.
    fn itd(theta: f32, a: f32, c: f32) -> f32 {
        let base = a / c;
        if theta < PI * 0.5 { base * (1.0 - theta.cos()) } else { base * (1.0 + theta - PI * 0.5) }
    }

    /// Update filters for a new direction. Call once per block (smoothing is internal).
    pub fn update(&mut self, dir: LocalDir, snap: bool) {
        let k = if snap || !self.initialized { 1.0 } else { 0.35 };
        let s = &mut self.smoothed;
        s.right += (dir.right - s.right) * k;
        s.up += (dir.up - s.up) * k;
        s.front += (dir.front - s.front) * k;
        let l = (s.right * s.right + s.up * s.up + s.front * s.front).sqrt().max(1e-6);
        let (r, u, f) = (s.right / l, s.up / l, s.front / l);
        let theta_r = r.clamp(-1.0, 1.0).acos(); // angle to right-ear axis
        let theta_l = (-r).clamp(-1.0, 1.0).acos();
        let a = self.head_radius;
        let c = self.c;
        self.hs_l.set(self.sr, a, c, HeadShadow::alpha_for_angle(theta_l));
        self.hs_r.set(self.sr, a, c, HeadShadow::alpha_for_angle(theta_r));
        let dl = Binaural::itd(theta_l, a, c) * self.sr;
        let dr = Binaural::itd(theta_r, a, c) * self.sr;
        if snap || !self.initialized { self.d_l.snap(dl); self.d_r.snap(dr); } else { self.d_l.set(dl); self.d_r.set(dr); }
        // Elevation pinna notch (moves upward with elevation), stronger in front.
        let el = u.clamp(-1.0, 1.0).asin().clamp(-0.9, 1.2);
        let notch_hz = 7200.0 * 2f32.powf(el * 0.6);
        let depth = -(6.0 + 5.0 * f.max(0.0));
        self.pinna.set(BiquadKind::Peaking, self.sr, notch_hz, 2.2, depth);
        // Rear sources: pinna shadow reduces highs
        let rear = (-f).max(0.0);
        self.rear.set(BiquadKind::HighShelf, self.sr, 3000.0, 0.7, -6.0 * rear);
        self.initialized = true;
    }

    /// Mono input → adds to stereo outputs with `gain` ramp.
    pub fn process(&mut self, input: &[f32], out_l: &mut [f32], out_r: &mut [f32], g0: f32, gstep: f32) {
        let n = input.len();
        let (dl0, dls) = self.d_l.block(n);
        let (dr0, drs) = self.d_r.block(n);
        let mut g = g0;
        for i in 0..n {
            let x = self.rear.process(self.pinna.process(input[i]));
            self.itd_l.push(x);
            self.itd_r.push(x);
            let fi = i as f32;
            let l = self.itd_l.read(dl0 + dls * fi);
            let r = self.itd_r.read(dr0 + drs * fi);
            out_l[i] += self.hs_l.process(l) * g;
            out_r[i] += self.hs_r.process(r) * g;
            g += gstep;
        }
        self.pinna.process_block(&mut []);
        self.rear.process_block(&mut []);
    }
}

/// Cheap panner for early reflections: broadband ILD (head-shadow at ~2 kHz) and integer ITD (samples).
#[derive(Clone, Copy, Debug, Default)]
pub struct TapPan { pub gl: f32, pub gr: f32, pub itd_l: f32, pub itd_r: f32 }

impl TapPan {
    pub fn from_dir(d: LocalDir, sr: f32, a: f32, c: f32) -> Self {
        let l = (d.right * d.right + d.up * d.up + d.front * d.front).sqrt().max(1e-6);
        let r = d.right / l;
        let theta_r = r.clamp(-1.0, 1.0).acos();
        let theta_l = (-r).clamp(-1.0, 1.0).acos();
        // magnitude of head-shadow filter at ~1.5 kHz approximates broadband ILD
        let ild = |theta: f32| {
            let alpha = HeadShadow::alpha_for_angle(theta);
            let w = 2.0 * PI * 1500.0;
            let beta = 2.0 * c / a;
            ((alpha * alpha * w * w + beta * beta) / (w * w + beta * beta)).sqrt()
        };
        let gl = ild(theta_l);
        let gr = ild(theta_r);
        let norm = 1.0 / ((gl * gl + gr * gr) * 0.5).sqrt().max(1e-3);
        TapPan {
            gl: gl * norm,
            gr: gr * norm,
            itd_l: Binaural::itd(theta_l, a, c) * sr,
            itd_r: Binaural::itd(theta_r, a, c) * sr,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn source_on_right_is_louder_and_earlier_on_right() {
        let sr = 48000.0;
        let mut b = Binaural::new(sr);
        b.update(LocalDir { right: 1.0, up: 0.0, front: 0.0 }, true);
        let mut input = vec![0.0f32; 256];
        input[10] = 1.0;
        let mut l = vec![0.0f32; 256];
        let mut r = vec![0.0f32; 256];
        b.process(&input[..128], &mut l[..128], &mut r[..128], 1.0, 0.0);
        b.process(&input[128..], &mut l[128..], &mut r[128..], 1.0, 0.0);
        let el: f32 = l.iter().map(|v| v * v).sum();
        let er: f32 = r.iter().map(|v| v * v).sum();
        assert!(er > el * 2.0, "ILD missing: {er} vs {el}");
        let pk = |v: &Vec<f32>| v.iter().enumerate().fold((0, 0.0f32), |a, (i, x)| if x.abs() > a.1 { (i, x.abs()) } else { a }).0;
        assert!(pk(&r) < pk(&l), "ITD wrong");
    }
}
