//! Atmospheric absorption of sound, ISO 9613-1:1993.
//! Computes α(f) in dB/m for temperature, humidity, pressure, and fits a per-distance lowpass.

use crate::util::speed_of_sound;

pub const TABLE_N: usize = 48;

#[derive(Clone, Debug)]
pub struct Atmosphere {
    pub temp_c: f32,
    pub rel_humidity: f32, // 0..1
    pub pressure_kpa: f32,
    pub c: f32,
    /// log-spaced frequencies 50 Hz .. 22 kHz
    pub freqs: [f32; TABLE_N],
    /// α(f) in dB per metre
    pub alpha: [f32; TABLE_N],
}

impl Atmosphere {
    pub fn new(temp_c: f32, rel_humidity: f32, pressure_kpa: f32) -> Self {
        let mut a = Atmosphere {
            temp_c,
            rel_humidity,
            pressure_kpa,
            c: speed_of_sound(temp_c),
            freqs: [0.0; TABLE_N],
            alpha: [0.0; TABLE_N],
        };
        a.update();
        a
    }

    pub fn update(&mut self) {
        self.c = speed_of_sound(self.temp_c);
        let f0 = 50.0f64;
        let f1 = 22000.0f64;
        for i in 0..TABLE_N {
            let f = f0 * (f1 / f0).powf(i as f64 / (TABLE_N - 1) as f64);
            self.freqs[i] = f as f32;
            self.alpha[i] = absorption_db_per_m(f, self.temp_c as f64, (self.rel_humidity as f64 * 100.0).clamp(0.0, 100.0), self.pressure_kpa as f64) as f32;
        }
    }

    /// Attenuation (dB) at table index i over distance d.
    #[inline]
    pub fn atten_db(&self, i: usize, d: f32) -> f32 { self.alpha[i] * d }

    /// Frequency at which absorption over `d` metres reaches `target_db` (log-interpolated). None if > table range.
    pub fn freq_for_atten(&self, d: f32, target_db: f32) -> Option<f32> {
        if d <= 0.0 { return None; }
        let need = target_db / d; // α needed
        if self.alpha[TABLE_N - 1] < need { return None; }
        if self.alpha[0] >= need { return Some(self.freqs[0]); }
        // α is monotonic increasing in f
        let mut lo = 0;
        let mut hi = TABLE_N - 1;
        while hi - lo > 1 {
            let mid = (lo + hi) / 2;
            if self.alpha[mid] < need { lo = mid; } else { hi = mid; }
        }
        let (a0, a1) = (self.alpha[lo].max(1e-12).ln(), self.alpha[hi].max(1e-12).ln());
        let t = ((need.ln() - a0) / (a1 - a0)).clamp(0.0, 1.0);
        let lf = self.freqs[lo].ln() + t * (self.freqs[hi].ln() - self.freqs[lo].ln());
        Some(lf.exp())
    }
}

/// ISO 9613-1 pure-tone atmospheric absorption coefficient in dB/m.
/// f: Hz, t_c: °C, hr: relative humidity (%), pa_kpa: ambient pressure (kPa).
pub fn absorption_db_per_m(f: f64, t_c: f64, hr: f64, pa_kpa: f64) -> f64 {
    let pr = 101.325;
    let t0 = 293.15;
    let t01 = 273.16;
    let t = t_c + 273.15;
    let pa = pa_kpa / pr; // relative pressure
    let c = -6.8346 * (t01 / t).powf(1.261) + 4.6151;
    let psat = 10f64.powf(c); // psat/pr
    let h = hr * psat / pa; // molar concentration of water vapour (%)
    let fr_o = pa * (24.0 + 4.04e4 * h * (0.02 + h) / (0.391 + h));
    let fr_n = pa * (t / t0).powf(-0.5) * (9.0 + 280.0 * h * (-4.170 * ((t / t0).powf(-1.0 / 3.0) - 1.0)).exp());
    let f2 = f * f;
    8.686 * f2
        * (1.84e-11 * (1.0 / pa) * (t / t0).sqrt()
            + (t / t0).powf(-2.5)
                * (0.01275 * (-2239.1 / t).exp() / (fr_o + f2 / fr_o)
                    + 0.1068 * (-3352.0 / t).exp() / (fr_n + f2 / fr_n)))
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn iso_reference_values() {
        // ISO 9613-2 Table 2 (20°C, 70% RH): 1 kHz 5.0 dB/km, 4 kHz 22.9 dB/km, 8 kHz 76.6 dB/km
        let a1k = absorption_db_per_m(1000.0, 20.0, 70.0, 101.325) * 1000.0;
        let a4k = absorption_db_per_m(4000.0, 20.0, 70.0, 101.325) * 1000.0;
        let a8k = absorption_db_per_m(8000.0, 20.0, 70.0, 101.325) * 1000.0;
        assert!((a1k - 5.0).abs() < 0.2, "1k {a1k}");
        assert!((a4k - 22.9).abs() < 0.5, "4k {a4k}");
        assert!((a8k - 76.6).abs() < 1.5, "8k {a8k}");
    }
}
