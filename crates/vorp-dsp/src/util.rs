//! Shared constants and small numeric helpers.

pub const TAU: f32 = core::f32::consts::TAU;
pub const PI: f32 = core::f32::consts::PI;
/// Reference RMS pressure for 0 dB SPL (Pa).
pub const P_REF: f32 = 20e-6;
/// Audio-thread block size (WebAudio render quantum).
pub const BLOCK: usize = 128;

#[inline]
pub fn db_to_lin(db: f32) -> f32 {
    (db * 0.115_129_25).exp() // 10^(db/20) = e^(db * ln10/20)
}
#[inline]
pub fn lin_to_db(x: f32) -> f32 {
    if x <= 1e-30 { -600.0 } else { 8.685_889_6 * x.ln() }
}
/// dB SPL -> peak pressure (Pa). (Peak SPL convention: 20log10(p_peak / 20µPa).)
#[inline]
pub fn spl_to_pa(spl: f32) -> f32 { P_REF * db_to_lin(spl) }
#[inline]
pub fn pa_to_spl(pa: f32) -> f32 { lin_to_db(pa.abs() / P_REF) }

#[inline]
pub fn clamp(x: f32, lo: f32, hi: f32) -> f32 { if x < lo { lo } else if x > hi { hi } else { x } }
#[inline]
pub fn lerp(a: f32, b: f32, t: f32) -> f32 { a + (b - a) * t }

/// One-pole smoothing coefficient for a time constant (seconds) at sample rate.
#[inline]
pub fn tau_coef(tau_s: f32, sr: f32) -> f32 {
    if tau_s <= 0.0 { 0.0 } else { (-1.0 / (tau_s * sr)).exp() }
}

/// Speed of sound in air (m/s) for temperature in °C.
#[inline]
pub fn speed_of_sound(temp_c: f32) -> f32 { 331.3 * (1.0 + temp_c / 273.15).sqrt() }

/// Fast xorshift128+ PRNG producing uniform floats. Deterministic per seed.
#[derive(Clone)]
pub struct Rng { s0: u64, s1: u64 }
impl Rng {
    pub fn new(seed: u64) -> Self {
        let mut z = seed.wrapping_add(0x9E37_79B9_7F4A_7C15);
        let mut next = || {
            z = z.wrapping_add(0x9E37_79B9_7F4A_7C15);
            let mut x = z;
            x = (x ^ (x >> 30)).wrapping_mul(0xBF58_476D_1CE4_E5B9);
            x = (x ^ (x >> 27)).wrapping_mul(0x94D0_49BB_1331_11EB);
            x ^ (x >> 31)
        };
        let s0 = next();
        let s1 = next() | 1;
        Rng { s0, s1 }
    }
    #[inline]
    pub fn next_u64(&mut self) -> u64 {
        let mut s1 = self.s0;
        let s0 = self.s1;
        self.s0 = s0;
        s1 ^= s1 << 23;
        self.s1 = s1 ^ s0 ^ (s1 >> 17) ^ (s0 >> 26);
        self.s1.wrapping_add(s0)
    }
    /// Uniform in [0, 1).
    #[inline]
    pub fn uniform(&mut self) -> f32 { ((self.next_u64() >> 40) as f32) * (1.0 / 16_777_216.0) }
    /// Uniform in [-1, 1).
    #[inline]
    pub fn bipolar(&mut self) -> f32 { self.uniform() * 2.0 - 1.0 }
    /// Approximately Gaussian (sum of 4 uniforms, unit variance).
    #[inline]
    pub fn gauss(&mut self) -> f32 {
        (self.uniform() + self.uniform() + self.uniform() + self.uniform() - 2.0) * 1.732_050_8
    }
    #[inline]
    pub fn range(&mut self, lo: f32, hi: f32) -> f32 { lo + (hi - lo) * self.uniform() }
}

/// Pink noise (Paul Kellet's refined filter), unit-ish RMS input white.
#[derive(Clone, Default)]
pub struct Pink { b: [f32; 7] }
impl Pink {
    #[inline]
    pub fn next(&mut self, white: f32) -> f32 {
        let b = &mut self.b;
        b[0] = 0.99886 * b[0] + white * 0.0555179;
        b[1] = 0.99332 * b[1] + white * 0.0750759;
        b[2] = 0.96900 * b[2] + white * 0.1538520;
        b[3] = 0.86650 * b[3] + white * 0.3104856;
        b[4] = 0.55000 * b[4] + white * 0.5329522;
        b[5] = -0.7616 * b[5] - white * 0.0168980;
        let out = b[0] + b[1] + b[2] + b[3] + b[4] + b[5] + b[6] + white * 0.5362;
        b[6] = white * 0.115926;
        out * 0.11
    }
}

/// Linear parameter ramp across one block (avoids zipper noise).
#[derive(Clone, Copy, Default)]
pub struct Ramp { pub cur: f32, pub target: f32 }
impl Ramp {
    pub fn new(v: f32) -> Self { Ramp { cur: v, target: v } }
    #[inline]
    pub fn set(&mut self, v: f32) { self.target = v; }
    #[inline]
    pub fn snap(&mut self, v: f32) { self.cur = v; self.target = v; }
    /// Returns (start, step) for an n-sample ramp and advances.
    #[inline]
    pub fn block(&mut self, n: usize) -> (f32, f32) {
        let start = self.cur;
        let step = (self.target - self.cur) / n as f32;
        self.cur = self.target;
        (start, step)
    }
}

#[inline]
pub fn flush_denormal(x: f32) -> f32 { if x.abs() < 1e-25 { 0.0 } else { x } }

/// Simple 3-vector used by the spatial code.
#[derive(Clone, Copy, Default, Debug, PartialEq)]
pub struct V3 { pub x: f32, pub y: f32, pub z: f32 }
impl V3 {
    pub const fn new(x: f32, y: f32, z: f32) -> Self { V3 { x, y, z } }
    #[inline] pub fn sub(self, o: V3) -> V3 { V3::new(self.x - o.x, self.y - o.y, self.z - o.z) }
    #[inline] pub fn add(self, o: V3) -> V3 { V3::new(self.x + o.x, self.y + o.y, self.z + o.z) }
    #[inline] pub fn scale(self, s: f32) -> V3 { V3::new(self.x * s, self.y * s, self.z * s) }
    #[inline] pub fn dot(self, o: V3) -> f32 { self.x * o.x + self.y * o.y + self.z * o.z }
    #[inline] pub fn cross(self, o: V3) -> V3 {
        V3::new(self.y * o.z - self.z * o.y, self.z * o.x - self.x * o.z, self.x * o.y - self.y * o.x)
    }
    #[inline] pub fn len(self) -> f32 { self.dot(self).sqrt() }
    #[inline] pub fn norm(self) -> V3 { let l = self.len(); if l > 1e-9 { self.scale(1.0 / l) } else { V3::new(0.0, 0.0, -1.0) } }
}
