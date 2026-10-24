//! Ambient bed: wind (gusting, band-moving filtered noise, decorrelated L/R) and distant low rumble.
//! Output in Pa at the ears (diffuse field), so it passes through the hearing model like everything else.

use crate::filters::{Biquad, BiquadKind, OnePoleLP};
use crate::params::ambience as A;
use crate::util::{spl_to_pa, Pink, Rng};

pub struct Ambience {
    sr: f32,
    pub p: [f32; A::COUNT],
    rng: Rng,
    pink: [Pink; 2],
    bp: [Biquad; 2],
    lp: [Biquad; 2],
    gust_lp: OnePoleLP,
    gust_state: f32,
    rumble_lp: [OnePoleLP; 2],
    rumble_lp2: [OnePoleLP; 2],
    counter: u32,
    gust_cur: f32,
}

impl Ambience {
    pub fn new(sr: f32) -> Self {
        let mut a = Ambience {
            sr,
            p: A::DEFAULTS,
            rng: Rng::new(0xB10_51DE),
            pink: [Pink::default(), Pink::default()],
            bp: [Biquad::identity(); 2],
            lp: [Biquad::identity(); 2],
            gust_lp: OnePoleLP::new(sr / 32.0, 0.15),
            gust_state: 0.0,
            rumble_lp: [OnePoleLP::new(sr, 90.0); 2],
            rumble_lp2: [OnePoleLP::new(sr, 120.0); 2],
            counter: 0,
            gust_cur: 0.5,
        };
        a.set_params(&A::DEFAULTS);
        a
    }

    pub fn set_params(&mut self, p: &[f32]) {
        for i in 0..A::COUNT.min(p.len()) { self.p[i] = p[i]; }
        self.gust_lp.set(self.sr / 32.0, self.p[A::WIND_GUST_RATE].max(0.01));
        for c in 0..2 { self.lp[c].set(BiquadKind::Lowpass, self.sr, 4000.0, 0.7071, 0.0); }
    }

    pub fn process(&mut self, l: &mut [f32], r: &mut [f32]) {
        if self.p[A::ENABLE] < 0.5 { return; }
        let wind = spl_to_pa(self.p[A::WIND_SPL]) * 0.35; // peak → ~RMS of the noise bed
        let rumble = spl_to_pa(self.p[A::RUMBLE_SPL]) * 0.35;
        let gust_amt = self.p[A::WIND_GUST].clamp(0.0, 1.0);
        let tone = self.p[A::WIND_TONE_HZ];
        for i in 0..l.len() {
            // control-rate gust update every 32 samples
            if self.counter == 0 {
                let target = self.gust_lp.process(self.rng.bipolar() * 3.0);
                self.gust_state = target;
                let g = (0.5 + self.gust_state).clamp(0.05, 1.6);
                self.gust_cur = 1.0 - gust_amt + gust_amt * g;
                let fc = tone * (0.6 + 0.8 * self.gust_cur);
                for c in 0..2 { self.bp[c].set(BiquadKind::Bandpass, self.sr, fc * (1.0 + 0.07 * c as f32), 0.8, 0.0); }
            }
            self.counter = (self.counter + 1) % 32;
            let wl = self.pink[0].next(self.rng.gauss());
            let wr = self.pink[1].next(self.rng.gauss());
            let g = self.gust_cur * wind;
            let rl = self.rumble_lp2[0].process(self.rumble_lp[0].process(self.rng.gauss())) * rumble * 6.0;
            let rr = self.rumble_lp2[1].process(self.rumble_lp[1].process(self.rng.gauss())) * rumble * 6.0;
            l[i] += self.lp[0].process(self.bp[0].process(wl) * 2.5 + wl * 0.25) * g + rl;
            r[i] += self.lp[1].process(self.bp[1].process(wr) * 2.5 + wr * 0.25) * g + rr;
        }
    }
}
