//! Iterative radix-2 complex FFT (split re/im arrays), with precomputed twiddles and bit-reversal table.

pub struct Fft {
    pub n: usize,
    cos: Vec<f32>,
    sin: Vec<f32>,
    rev: Vec<u32>,
}

impl Fft {
    pub fn new(n: usize) -> Self {
        assert!(n.is_power_of_two() && n >= 2);
        let bits = n.trailing_zeros();
        let mut rev = vec![0u32; n];
        for i in 0..n {
            rev[i] = (i as u32).reverse_bits() >> (32 - bits);
        }
        let half = n / 2;
        let mut cos = vec![0.0; half];
        let mut sin = vec![0.0; half];
        for k in 0..half {
            let a = -2.0 * core::f64::consts::PI * k as f64 / n as f64;
            cos[k] = a.cos() as f32;
            sin[k] = a.sin() as f32;
        }
        Fft { n, cos, sin, rev }
    }

    /// In-place forward FFT (sign -1). Unnormalised.
    pub fn forward(&self, re: &mut [f32], im: &mut [f32]) { self.transform(re, im, false); }
    /// In-place inverse FFT, normalised by 1/n.
    pub fn inverse(&self, re: &mut [f32], im: &mut [f32]) {
        self.transform(re, im, true);
        let s = 1.0 / self.n as f32;
        for i in 0..self.n { re[i] *= s; im[i] *= s; }
    }

    fn transform(&self, re: &mut [f32], im: &mut [f32], inverse: bool) {
        let n = self.n;
        for i in 0..n {
            let j = self.rev[i] as usize;
            if j > i { re.swap(i, j); im.swap(i, j); }
        }
        let mut size = 2;
        while size <= n {
            let half = size / 2;
            let step = n / size;
            let mut start = 0;
            while start < n {
                let mut k = 0;
                for j in start..start + half {
                    let wr = self.cos[k];
                    let wi = if inverse { -self.sin[k] } else { self.sin[k] };
                    let l = j + half;
                    let tr = re[l] * wr - im[l] * wi;
                    let ti = re[l] * wi + im[l] * wr;
                    re[l] = re[j] - tr;
                    im[l] = im[j] - ti;
                    re[j] += tr;
                    im[j] += ti;
                    k += step;
                }
                start += size;
            }
            size <<= 1;
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn roundtrip_and_dc() {
        let f = Fft::new(16);
        let mut re: Vec<f32> = (0..16).map(|i| (i as f32 * 0.3).sin()).collect();
        let orig = re.clone();
        let mut im = vec![0.0; 16];
        f.forward(&mut re, &mut im);
        f.inverse(&mut re, &mut im);
        for i in 0..16 { assert!((re[i] - orig[i]).abs() < 1e-5); }
        let mut re = vec![1.0; 16];
        let mut im = vec![0.0; 16];
        f.forward(&mut re, &mut im);
        assert!((re[0] - 16.0).abs() < 1e-5);
        assert!(re[1].abs() < 1e-5);
    }
}
