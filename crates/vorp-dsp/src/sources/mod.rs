pub mod gunshot;
pub mod modal;
pub mod noise;
pub mod nwave;
pub mod sample;

use crate::params::kind;
use sample::SampleBank;

pub enum Source {
    Gunshot(gunshot::GunshotSource),
    NWave(nwave::NWaveSource),
    Modal(modal::ModalSource),
    Noise(noise::NoiseSource),
    Sample(sample::SampleSource),
}

impl Source {
    pub fn create(kind_id: u32, sr: f32, params: &[f32]) -> Option<Source> {
        Some(match kind_id {
            kind::GUNSHOT => Source::Gunshot(gunshot::GunshotSource::new(sr, params)),
            kind::NWAVE => Source::NWave(nwave::NWaveSource::new(sr, params)),
            kind::MODAL => Source::Modal(modal::ModalSource::new(sr, params)),
            kind::NOISE => Source::Noise(noise::NoiseSource::new(sr, params)),
            kind::SAMPLE => Source::Sample(sample::SampleSource::new(sr, params)),
            _ => return None,
        })
    }

    /// Render one block of pressure (Pa @ 1 m). Returns true when the source has finished.
    pub fn render(&mut self, bank: &SampleBank, out: &mut [f32]) -> bool {
        match self {
            Source::Gunshot(s) => s.render(out),
            Source::NWave(s) => s.render(out),
            Source::Modal(s) => s.render(out),
            Source::Noise(s) => s.render(out),
            Source::Sample(s) => s.render(bank, out),
        }
    }
}
