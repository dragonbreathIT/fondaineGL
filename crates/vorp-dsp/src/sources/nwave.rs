//! Supersonic projectile "crack": the N-wave (Whitham). Peak overpressure and duration are computed by
//! the host from projectile Mach, calibre, length and miss distance; this renders the waveform band-limited
//! (exact per-sample box integration of the piecewise-linear N shape) with a finite shock rise time.

use crate::filters::DcBlock;

pub struct NWaveSource {
    sr: f32,
    n: usize,
    peak: f32,
    dur: f32,
    rise: f32,
    len: usize,
    dc: DcBlock,
}

impl NWaveSource {
    /// p = [peak_pa, duration_s, rise_us]
    pub fn new(sr: f32, p: &[f32]) -> Self {
        let peak = p.first().copied().unwrap_or(100.0);
        let dur = p.get(1).copied().unwrap_or(0.0002).max(1e-5);
        let rise = p.get(2).copied().unwrap_or(15.0).max(0.5) * 1e-6;
        let len = ((dur + rise * 4.0 + 0.004) * sr) as usize + 2;
        NWaveSource { sr, n: 0, peak, dur, rise, len, dc: DcBlock::new(sr, 8.0) }
    }

    /// Continuous N-wave with linear shock ramps of width `rise`.
    #[inline]
    fn shape(&self, t: f32) -> f32 {
        let r = self.rise;
        let d = self.dur;
        if t <= 0.0 { 0.0 }
        else if t < r { self.peak * (t / r) }
        else if t < d { self.peak * (1.0 - 2.0 * (t - r) / (d - r).max(1e-9)) }
        else if t < d + r { -self.peak * (1.0 - (t - d) / r) }
        else { 0.0 }
    }

    pub fn render(&mut self, out: &mut [f32]) -> bool {
        let dt = 1.0 / self.sr;
        const SUB: usize = 16;
        for o in out.iter_mut() {
            if self.n >= self.len { *o = 0.0; continue; }
            let t0 = self.n as f32 * dt;
            let mut acc = 0.0;
            for k in 0..SUB {
                acc += self.shape(t0 + (k as f32 + 0.5) * dt / SUB as f32);
            }
            *o = self.dc.process(acc / SUB as f32);
            self.n += 1;
        }
        self.n >= self.len
    }
}
