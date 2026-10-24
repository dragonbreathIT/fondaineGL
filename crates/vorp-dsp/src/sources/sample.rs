//! PCM sample playback (recorded layers: mechanical foley, casings, ambience). Samples are registered
//! with the engine (already resampled to the engine rate by the host) and referenced by id.

pub struct SampleBank {
    pub samples: Vec<Option<Vec<f32>>>,
}

impl SampleBank {
    pub fn new() -> Self { SampleBank { samples: Vec::new() } }
    pub fn set(&mut self, id: usize, data: Vec<f32>) {
        if id >= 4096 { return; }
        if self.samples.len() <= id { self.samples.resize_with(id + 1, || None); }
        self.samples[id] = Some(data);
    }
    pub fn get(&self, id: usize) -> Option<&[f32]> { self.samples.get(id).and_then(|s| s.as_deref()) }
}

pub struct SampleSource {
    pub id: usize,
    pos: f64,
    rate: f64,
    gain: f32,
    looping: bool,
}

impl SampleSource {
    /// p = [sample_id, rate, gain_pa (Pa at 1 m for full-scale sample), loop(0/1), offset_s]
    pub fn new(sr: f32, p: &[f32]) -> Self {
        let at = |i: usize, d: f32| p.get(i).copied().unwrap_or(d);
        SampleSource {
            id: at(0, 0.0) as usize,
            pos: (at(4, 0.0) * sr) as f64,
            rate: at(1, 1.0).clamp(0.05, 8.0) as f64,
            gain: at(2, 1.0),
            looping: at(3, 0.0) > 0.5,
        }
    }

    pub fn render(&mut self, bank: &SampleBank, out: &mut [f32]) -> bool {
        let Some(data) = bank.get(self.id) else {
            for o in out.iter_mut() { *o = 0.0; }
            return true;
        };
        let len = data.len();
        if len < 2 { for o in out.iter_mut() { *o = 0.0; } return true; }
        for o in out.iter_mut() {
            if self.pos >= (len - 1) as f64 {
                if self.looping { self.pos -= (len - 1) as f64; } else { *o = 0.0; continue; }
            }
            let i = self.pos as usize;
            let f = (self.pos - i as f64) as f32;
            *o = (data[i] + (data[i + 1] - data[i]) * f) * self.gain;
            self.pos += self.rate;
        }
        !self.looping && self.pos >= (len - 1) as f64
    }
}
