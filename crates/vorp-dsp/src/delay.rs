//! Fractional delay lines (power-of-two ring buffers, 4-point Hermite interpolation).

pub struct DelayLine {
    buf: Vec<f32>,
    mask: usize,
    write: usize,
}

impl DelayLine {
    /// Allocates the next power of two >= `min_len` samples.
    pub fn new(min_len: usize) -> Self {
        let len = min_len.max(8).next_power_of_two();
        DelayLine { buf: vec![0.0; len], mask: len - 1, write: 0 }
    }
    #[inline]
    pub fn capacity(&self) -> usize { self.buf.len() }
    /// Max usable delay in samples (keeps 4 samples of interpolation headroom).
    #[inline]
    pub fn max_delay(&self) -> f32 { (self.buf.len() - 4) as f32 }

    #[inline]
    pub fn push(&mut self, x: f32) {
        self.buf[self.write] = x;
        self.write = (self.write + 1) & self.mask;
    }

    /// Read `delay` samples behind the most recently pushed sample (delay >= 0).
    /// delay = 0 returns the last pushed sample.
    #[inline]
    pub fn read(&self, delay: f32) -> f32 {
        let d = delay.clamp(0.0, self.max_delay());
        let di = d as usize;
        let frac = d - di as f32;
        // index of sample at integer delay di (0 => last written)
        let base = self.write.wrapping_sub(1).wrapping_sub(di);
        let xm1 = self.buf[base.wrapping_add(1) & self.mask]; // one sample newer
        let x0 = self.buf[base & self.mask];
        let x1 = self.buf[base.wrapping_sub(1) & self.mask];
        let x2 = self.buf[base.wrapping_sub(2) & self.mask];
        // Hermite between x0 (frac=0) and x1 (frac=1)
        let c0 = x0;
        let c1 = 0.5 * (x1 - xm1);
        let c2 = xm1 - 2.5 * x0 + 2.0 * x1 - 0.5 * x2;
        let c3 = 0.5 * (x2 - xm1) + 1.5 * (x0 - x1);
        ((c3 * frac + c2) * frac + c1) * frac + c0
    }

    /// Integer-delay read (no interpolation).
    #[inline]
    pub fn read_int(&self, delay: usize) -> f32 {
        self.buf[self.write.wrapping_sub(1).wrapping_sub(delay) & self.mask]
    }

    pub fn clear(&mut self) {
        for s in self.buf.iter_mut() { *s = 0.0; }
    }
}

/// Fixed integer delay with feedback allpass (Schroeder), used for diffusion.
pub struct Allpass {
    line: DelayLine,
    delay: usize,
    pub g: f32,
}
impl Allpass {
    pub fn new(delay: usize, g: f32) -> Self { Allpass { line: DelayLine::new(delay + 2), delay, g } }
    pub fn set_delay(&mut self, d: usize) { self.delay = d.min(self.line.capacity() - 2).max(1); }
    #[inline]
    pub fn process(&mut self, x: f32) -> f32 {
        let delayed = self.line.read_int(self.delay - 1);
        let v = x + self.g * delayed;
        self.line.push(crate::util::flush_denormal(v));
        delayed - self.g * v
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn integer_and_fractional_reads() {
        let mut d = DelayLine::new(64);
        for i in 0..32 { d.push(i as f32); }
        assert_eq!(d.read(0.0), 31.0);
        assert_eq!(d.read(5.0), 26.0);
        assert!((d.read(5.5) - 25.5).abs() < 1e-4);
        assert_eq!(d.read_int(3), 28.0);
    }
}
