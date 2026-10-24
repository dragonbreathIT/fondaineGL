//! Zero-latency two-segment uniformly-partitioned overlap-save convolver (mono in, stereo out).
//!
//! Head segment: 128-sample partitions covering IR[0, 1024) — computed every render quantum.
//! Tail segment: 1024-sample partitions covering IR[1024, end) — computed once per 8 quanta.
//! Because the tail starts at an IR offset equal to its partition size, its result is due exactly
//! when it is computed, so the convolver adds no latency.

use crate::fft::Fft;
use crate::util::BLOCK;

struct Segment {
    n: usize,
    fft: Fft,
    parts: usize,
    // H[ch][p] spectra (2n complex)
    h_re: Vec<Vec<Vec<f32>>>,
    h_im: Vec<Vec<Vec<f32>>>,
    // frequency-domain delay line of input spectra
    fdl_re: Vec<Vec<f32>>,
    fdl_im: Vec<Vec<f32>>,
    fdl_pos: usize,
    inbuf: Vec<f32>,
    x_re: Vec<f32>,
    x_im: Vec<f32>,
    acc_re: Vec<f32>,
    acc_im: Vec<f32>,
}

impl Segment {
    fn new(n: usize, ir: &[&[f32]]) -> Self {
        let m = 2 * n;
        let fft = Fft::new(m);
        let len = ir.iter().map(|c| c.len()).max().unwrap_or(0);
        let parts = ((len + n - 1) / n).max(1);
        let mut h_re = Vec::with_capacity(ir.len());
        let mut h_im = Vec::with_capacity(ir.len());
        for ch in ir {
            let mut pr = Vec::with_capacity(parts);
            let mut pi = Vec::with_capacity(parts);
            for p in 0..parts {
                let mut re = vec![0.0; m];
                let mut im = vec![0.0; m];
                for i in 0..n {
                    let idx = p * n + i;
                    if idx < ch.len() { re[i] = ch[idx]; }
                }
                fft.forward(&mut re, &mut im);
                pr.push(re);
                pi.push(im);
            }
            h_re.push(pr);
            h_im.push(pi);
        }
        Segment {
            n,
            fft,
            parts,
            h_re,
            h_im,
            fdl_re: vec![vec![0.0; m]; parts],
            fdl_im: vec![vec![0.0; m]; parts],
            fdl_pos: 0,
            inbuf: vec![0.0; m],
            x_re: vec![0.0; m],
            x_im: vec![0.0; m],
            acc_re: vec![0.0; m],
            acc_im: vec![0.0; m],
        }
    }

    /// Consumes `n` input samples, writes `n` output samples per channel.
    fn process(&mut self, input: &[f32], out: &mut [&mut [f32]]) {
        let n = self.n;
        let m = 2 * n;
        self.inbuf.copy_within(n..m, 0);
        self.inbuf[n..m].copy_from_slice(&input[..n]);
        self.x_re.copy_from_slice(&self.inbuf);
        for v in self.x_im.iter_mut() { *v = 0.0; }
        self.fft.forward(&mut self.x_re, &mut self.x_im);
        self.fdl_pos = (self.fdl_pos + self.parts - 1) % self.parts;
        self.fdl_re[self.fdl_pos].copy_from_slice(&self.x_re);
        self.fdl_im[self.fdl_pos].copy_from_slice(&self.x_im);

        for ch in 0..out.len().min(self.h_re.len()) {
            for v in self.acc_re.iter_mut() { *v = 0.0; }
            for v in self.acc_im.iter_mut() { *v = 0.0; }
            for p in 0..self.parts {
                let slot = (self.fdl_pos + p) % self.parts;
                let xr = &self.fdl_re[slot];
                let xi = &self.fdl_im[slot];
                let hr = &self.h_re[ch][p];
                let hi = &self.h_im[ch][p];
                for k in 0..m {
                    self.acc_re[k] += xr[k] * hr[k] - xi[k] * hi[k];
                    self.acc_im[k] += xr[k] * hi[k] + xi[k] * hr[k];
                }
            }
            self.fft.inverse(&mut self.acc_re, &mut self.acc_im);
            out[ch][..n].copy_from_slice(&self.acc_re[n..m]);
        }
    }
}

pub struct Convolver {
    head: Option<Segment>,
    tail: Option<Segment>,
    stereo_ir: bool,
    tail_in: Vec<f32>,
    tail_in_pos: usize,
    tail_out_l: Vec<f32>,
    tail_out_r: Vec<f32>,
    tail_read: usize,
    head_l: Vec<f32>,
    head_r: Vec<f32>,
}

const HEAD_N: usize = BLOCK;
const TAIL_N: usize = 1024;

impl Convolver {
    pub fn empty() -> Self {
        Convolver {
            head: None,
            tail: None,
            stereo_ir: false,
            tail_in: vec![0.0; TAIL_N],
            tail_in_pos: 0,
            tail_out_l: vec![0.0; TAIL_N],
            tail_out_r: vec![0.0; TAIL_N],
            tail_read: 0,
            head_l: vec![0.0; HEAD_N],
            head_r: vec![0.0; HEAD_N],
        }
    }

    pub fn is_loaded(&self) -> bool { self.head.is_some() }

    /// Load an impulse response (1 or 2 channels, already at the engine sample rate).
    pub fn set_ir(&mut self, left: &[f32], right: Option<&[f32]>) {
        let r = right.unwrap_or(left);
        self.stereo_ir = right.is_some();
        let hl = &left[..left.len().min(TAIL_N)];
        let hr = &r[..r.len().min(TAIL_N)];
        self.head = Some(Segment::new(HEAD_N, &[hl, hr]));
        if left.len() > TAIL_N || r.len() > TAIL_N {
            let tl = if left.len() > TAIL_N { &left[TAIL_N..] } else { &[][..] };
            let tr = if r.len() > TAIL_N { &r[TAIL_N..] } else { &[][..] };
            self.tail = Some(Segment::new(TAIL_N, &[tl, tr]));
        } else {
            self.tail = None;
        }
        self.tail_in_pos = 0;
        self.tail_read = 0;
        for v in self.tail_out_l.iter_mut() { *v = 0.0; }
        for v in self.tail_out_r.iter_mut() { *v = 0.0; }
    }

    pub fn clear(&mut self) { self.head = None; self.tail = None; }

    /// Process one render quantum (128 samples) — adds into out_l/out_r scaled by `gain`.
    pub fn process(&mut self, input: &[f32], out_l: &mut [f32], out_r: &mut [f32], gain: f32) {
        let Some(head) = self.head.as_mut() else { return };
        {
            let mut outs: [&mut [f32]; 2] = [&mut self.head_l, &mut self.head_r];
            head.process(input, &mut outs);
        }
        let rp = self.tail_read;
        for i in 0..HEAD_N {
            out_l[i] += gain * (self.head_l[i] + self.tail_out_l[rp + i]);
            out_r[i] += gain * (self.head_r[i] + self.tail_out_r[rp + i]);
        }
        self.tail_read += HEAD_N;
        self.tail_in[self.tail_in_pos..self.tail_in_pos + HEAD_N].copy_from_slice(&input[..HEAD_N]);
        self.tail_in_pos += HEAD_N;
        if self.tail_in_pos >= TAIL_N {
            self.tail_in_pos = 0;
            self.tail_read = 0;
            if let Some(tail) = self.tail.as_mut() {
                let mut outs: [&mut [f32]; 2] = [&mut self.tail_out_l, &mut self.tail_out_r];
                tail.process(&self.tail_in, &mut outs);
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    /// Convolver output must equal direct convolution, sample-exact timing, including the tail segment.
    #[test]
    fn matches_direct_convolution() {
        let ir_len = 3000;
        let ir: Vec<f32> = (0..ir_len).map(|i| ((i as f32 * 0.37).sin()) * (-(i as f32) / 900.0).exp()).collect();
        let n_blocks = 40;
        let total = n_blocks * BLOCK;
        let input: Vec<f32> = (0..total).map(|i| if i % 997 == 3 { 1.0 } else { ((i * 7919) % 13) as f32 * 0.01 - 0.06 }).collect();
        let mut conv = Convolver::empty();
        conv.set_ir(&ir, None);
        let mut out = vec![0.0f32; total];
        let mut out_r = vec![0.0f32; total];
        for b in 0..n_blocks {
            let s = b * BLOCK;
            conv.process(&input[s..s + BLOCK], &mut out[s..s + BLOCK], &mut out_r[s..s + BLOCK], 1.0);
        }
        let mut maxerr = 0.0f32;
        for t in 0..total {
            let mut acc = 0.0f32;
            for k in 0..ir_len.min(t + 1) { acc += input[t - k] * ir[k]; }
            maxerr = maxerr.max((acc - out[t]).abs());
        }
        assert!(maxerr < 1e-3, "max error {maxerr}");
    }
}
