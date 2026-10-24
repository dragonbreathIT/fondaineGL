//! Modal synthesis: a bank of damped resonators excited by one or more contact pulses.
//! Used for steel targets, receivers/bolt carriers (mechanical action), brass casings, metal impacts.
//!
//! Each hit's contact force is a raised half-sine of duration `contact_ms` normalised to unit area, so
//! modes above ~1/contact_time are naturally attenuated (soft hits sound dull, hard hits bright).
//! Mode amplitudes are in Pa at 1 m per unit hit amplitude.

use crate::filters::{Biquad, BiquadKind, Resonator};
use crate::util::{db_to_lin, Rng, PI};

pub const MAX_MODES: usize = 48;
pub const MAX_HITS: usize = 8;

#[derive(Clone, Copy, Default)]
struct Hit { start: usize, amp: f32, contact: usize, noise_amp: f32 }

pub struct ModalSource {
    modes: Vec<Resonator>,
    hits: Vec<Hit>,
    n: usize,
    last_hit_end: usize,
    rng: Rng,
    click_hp: Biquad,
    peak_energy: f32,
    quiet_blocks: u32,
    max_len: usize,
}

impl ModalSource {
    /// p = [level_scale, n_modes, n_hits, seed, (freq_hz, t60_s, amp)*n_modes, (time_ms, amp, contact_ms, noise_db)*n_hits]
    pub fn new(sr: f32, p: &[f32]) -> Self {
        let at = |i: usize| p.get(i).copied().unwrap_or(0.0);
        let scale = at(0);
        let nm = (at(1) as usize).min(MAX_MODES);
        let nh = (at(2) as usize).min(MAX_HITS);
        let seed = at(3) as u64;
        let mut modes = Vec::with_capacity(nm);
        let mut longest = 0.0f32;
        for m in 0..nm {
            let f = at(4 + m * 3);
            let t60 = at(5 + m * 3);
            let a = at(6 + m * 3);
            if f <= 0.0 || f >= sr * 0.48 { continue; }
            let mut r = Resonator::default();
            r.set(sr, f, t60.max(0.001), a * scale);
            longest = longest.max(t60);
            modes.push(r);
        }
        let hb = 4 + nm * 3;
        let mut hits = Vec::with_capacity(nh);
        let mut last_end = 0;
        for h in 0..nh {
            let t = at(hb + h * 4) * 0.001;
            let amp = at(hb + h * 4 + 1);
            let contact = ((at(hb + h * 4 + 2) * 0.001 * sr) as usize).max(1);
            let noise_db = at(hb + h * 4 + 3);
            let start = (t.max(0.0) * sr) as usize;
            last_end = last_end.max(start + contact * 4);
            hits.push(Hit { start, amp, contact, noise_amp: if noise_db > -100.0 { db_to_lin(noise_db) * scale } else { 0.0 } });
        }
        ModalSource {
            modes,
            hits,
            n: 0,
            last_hit_end: last_end,
            rng: Rng::new(seed ^ 0x51ED_2701),
            click_hp: Biquad::new(BiquadKind::Highpass, sr, 2500.0, 0.7, 0.0),
            peak_energy: 0.0,
            quiet_blocks: 0,
            max_len: last_end + ((longest.min(12.0) + 0.05) * sr) as usize,
        }
    }

    pub fn render(&mut self, out: &mut [f32]) -> bool {
        let mut block_energy = 0.0f32;
        for o in out.iter_mut() {
            // excitation force for this sample
            let mut x = 0.0f32;
            let mut click = 0.0f32;
            for h in self.hits.iter() {
                if self.n >= h.start && self.n < h.start + h.contact {
                    let k = (self.n - h.start) as f32 + 0.5;
                    let c = h.contact as f32;
                    // half-sine with unit area: (π / 2c) sin(π k / c)
                    x += h.amp * (PI / (2.0 * c)) * (PI * k / c).sin();
                }
                if h.noise_amp > 0.0 && self.n >= h.start && self.n < h.start + h.contact * 4 {
                    let k = (self.n - h.start) as f32 / (h.contact * 4) as f32;
                    click += self.rng.bipolar() * h.noise_amp * h.amp * (1.0 - k) * (1.0 - k);
                }
            }
            let mut y = 0.0;
            for r in self.modes.iter_mut() { y += r.process(x); }
            y += self.click_hp.process(click);
            block_energy += y * y;
            *o = y;
            self.n += 1;
        }
        for r in self.modes.iter_mut() { r.flush(); }
        self.peak_energy = self.peak_energy.max(block_energy);
        if self.n > self.last_hit_end {
            if block_energy < self.peak_energy * 1e-9 { self.quiet_blocks += 1; } else { self.quiet_blocks = 0; }
        }
        self.quiet_blocks > 4 || self.n > self.max_len || (self.modes.is_empty() && self.n > self.last_hit_end)
    }
}
