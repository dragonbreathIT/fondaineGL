//! Parameter index maps shared with the TypeScript side (`packages/vorp/src/params.ts`).
//! Keep both files in sync — indices are the wire format.

pub mod gunshot {
    pub const PEAK_SPL: usize = 0;
    pub const POS_MS: usize = 1;
    pub const DECAY_B: usize = 2;
    pub const PRECURSOR_DB: usize = 3;
    pub const PRECURSOR_LEAD_MS: usize = 4;
    pub const TURB_DB: usize = 5;
    pub const TURB_MS: usize = 6;
    pub const TURB_HP: usize = 7;
    pub const TURB_LP: usize = 8;
    pub const BODY_DB: usize = 9;
    pub const BODY_HZ: usize = 10;
    pub const BODY_MS: usize = 11;
    pub const BODY_DROP: usize = 12;
    pub const SUPPRESS: usize = 13;
    pub const SUPP_RED_DB: usize = 14;
    pub const FIRST_POP_DB: usize = 15;
    pub const VARIATION: usize = 16;
    pub const SEED: usize = 17;
    pub const BRIGHT_HZ: usize = 18;
    pub const DIRECTIVITY_DB: usize = 19;
    pub const REAR_LP_HZ: usize = 20;
    pub const TAIL_SEND_DB: usize = 21;
    /// Sharp mid/high "report" burst (the snap/crack of the shot as heard), relative to the blast peak.
    pub const CRACK_DB: usize = 22;
    pub const CRACK_HZ: usize = 23;
    pub const CRACK_MS: usize = 24;
    /// Sub-bass chest thump (pressure you feel), relative to the blast peak.
    pub const SUB_DB: usize = 25;
    pub const SUB_HZ: usize = 26;
    pub const SUB_MS: usize = 27;
    /// Perceptual compaction: the instantaneous blast spike (and only the spike — body, sub, roar and crack are
    /// summed after it) is soft-clipped this many dB below its peak, so the energy-bearing layers carry the
    /// loudness (a real shot is felt over ~100 ms, not 1 ms).
    pub const DRIVE_DB: usize = 28;
    pub const COUNT: usize = 29;
    pub const DEFAULTS: [f32; COUNT] = [
        158.0, 1.0, 1.4, -14.0, 0.35, -6.0, 260.0, 120.0, 5500.0, -11.0, 62.0, 280.0, 0.35, 0.0, 28.0, 0.0, 0.5, 0.0,
        16000.0, 9.0, 4500.0, 0.0, -4.0, 3400.0, 10.0, -13.0, 40.0, 360.0, 12.0,
    ];
}

pub mod noise {
    pub const LEVEL_SPL: usize = 0;
    pub const ATTACK_MS: usize = 1;
    pub const DECAY_MS: usize = 2;
    pub const HP_HZ: usize = 3;
    pub const LP_HZ: usize = 4;
    pub const THUMP_HZ: usize = 5;
    pub const THUMP_DB: usize = 6;
    pub const THUMP_MS: usize = 7;
    pub const GRAINS_PER_S: usize = 8;
    pub const GRAIN_DB: usize = 9;
    pub const SEED: usize = 10;
    pub const RESONANCE: usize = 11;
    /// Optional second transient (two-stage clicks, bounces): re-triggers the envelope `HIT2_MS` after the first
    /// at `HIT2_DB` relative level. `HIT2_DB` <= -100 disables it.
    pub const HIT2_MS: usize = 12;
    pub const HIT2_DB: usize = 13;
    pub const COUNT: usize = 14;
    pub const DEFAULTS: [f32; COUNT] = [120.0, 0.5, 120.0, 200.0, 5000.0, 90.0, -6.0, 60.0, 0.0, -10.0, 0.0, 0.7, 0.0, -200.0];
}

pub mod hearing {
    pub const PROTECTION_MODE: usize = 0;
    pub const PASSIVE_ATTEN_DB: usize = 1;
    pub const PASSIVE_HF_EXTRA_DB: usize = 2;
    pub const ELEC_GAIN_DB: usize = 3;
    pub const ELEC_LIMIT_SPL: usize = 4;
    pub const TTS_THRESHOLD_SPL: usize = 5;
    pub const TTS_RATE: usize = 6;
    pub const TTS_MAX_DB: usize = 7;
    pub const TTS_RECOVERY_S: usize = 8;
    pub const TINNITUS_HZ: usize = 9;
    pub const TINNITUS_DB: usize = 10;
    pub const TINNITUS_TTS_DB: usize = 11;
    pub const REFLEX_THRESHOLD_SPL: usize = 12;
    pub const REFLEX_MAX_DB: usize = 13;
    pub const REFLEX_ATTACK_MS: usize = 14;
    pub const REFLEX_RELEASE_MS: usize = 15;
    pub const MUFFLE_AMOUNT: usize = 16;
    pub const ENABLE: usize = 17;
    /// Fast post-impulse dulling: after every impulse over TTS_THRESHOLD the highs above ~3–4 kHz drop and
    /// recover with this time constant (ms) — distinct from the slow, accumulating TTS.
    pub const DULL_RECOVERY_MS: usize = 18;
    /// Lowpass cutoff (Hz) at full dulling.
    pub const DULL_HZ: usize = 19;
    pub const COUNT: usize = 20;
    pub const DEFAULTS: [f32; COUNT] = [
        0.0, 25.0, 10.0, 6.0, 82.0, 130.0, 0.15, 18.0, 10.0, 5200.0, -46.0, 20.0, 95.0, 6.0, 90.0, 900.0, 1.0, 1.0, 350.0, 4000.0,
    ];
}

pub mod master {
    pub const CALIBRATION_SPL: usize = 0;
    pub const COMP_THRESHOLD_DB: usize = 1;
    pub const COMP_RATIO: usize = 2;
    pub const COMP_KNEE_DB: usize = 3;
    pub const COMP_ATTACK_MS: usize = 4;
    pub const COMP_RELEASE_MS: usize = 5;
    pub const LIMIT_CEILING_DB: usize = 6;
    pub const LIMIT_RELEASE_MS: usize = 7;
    pub const MASTER_DB: usize = 8;
    pub const BUS_WEAPONS_DB: usize = 9;
    pub const BUS_IMPACTS_DB: usize = 10;
    pub const BUS_ENV_DB: usize = 11;
    pub const BUS_UI_DB: usize = 12;
    pub const ER_LEVEL_DB: usize = 13;
    pub const REVERB_LEVEL_DB: usize = 14;
    pub const CONV_MIX: usize = 15;
    pub const HEAD_RADIUS_M: usize = 16;
    pub const SPATIAL_ENABLE: usize = 17;
    pub const COMP_DETECTOR_MS: usize = 18;
    /// Soft-clip knee (dBFS): everything above is saturated smoothly towards full scale (density = loudness).
    pub const CLIP_KNEE_DB: usize = 19;
    /// Make-up gain after the loudness compressor (dB).
    pub const MAKEUP_DB: usize = 20;
    /// Overload saturator asymmetry (0 symmetric … 1 positive half-cycles clip much earlier): even harmonics,
    /// the "crunch" of an overdriven ear / camera limiter.
    pub const SAT_ASYM: usize = 21;
    /// Overload dulling: while the saturator is driven, a lowpass drops towards this cutoff (Hz) …
    pub const SAT_DULL_HZ: usize = 22;
    /// … and recovers with this time constant (ms) — the brief HF loss right after an overload.
    pub const SAT_DULL_MS: usize = 23;
    pub const COUNT: usize = 24;
    pub const DEFAULTS: [f32; COUNT] = [
        112.0, -6.0, 2.6, 6.0, 0.3, 90.0, -0.3, 12.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0875, 1.0, 2.0, -4.0, 0.0, 0.5, 4500.0, 45.0,
    ];
}

pub mod reverb {
    pub const RT60_LOW: usize = 0;
    pub const RT60_MID: usize = 1;
    pub const RT60_HIGH: usize = 2;
    pub const XOVER_LOW: usize = 3;
    pub const XOVER_HIGH: usize = 4;
    pub const SIZE: usize = 5;
    pub const DIFFUSION: usize = 6;
    pub const PREDELAY_MS: usize = 7;
    pub const MOD_DEPTH_MS: usize = 8;
    pub const MOD_RATE_HZ: usize = 9;
    pub const LEVEL_DB: usize = 10;
    pub const TONE_HZ: usize = 11;
    pub const COUNT: usize = 12;
}

pub mod ambience {
    pub const WIND_SPL: usize = 0;
    pub const WIND_GUST: usize = 1;
    pub const WIND_GUST_RATE: usize = 2;
    pub const WIND_TONE_HZ: usize = 3;
    pub const RUMBLE_SPL: usize = 4;
    pub const ENABLE: usize = 5;
    pub const COUNT: usize = 6;
    pub const DEFAULTS: [f32; COUNT] = [48.0, 0.5, 0.15, 600.0, 38.0, 1.0];
}

/// Command opcodes (wire format: [opcode, n_args, args...]).
pub mod op {
    pub const LISTENER: u32 = 1;
    pub const SPAWN: u32 = 2;
    pub const VOICE_POS: u32 = 3;
    pub const VOICE_TAPS: u32 = 4;
    pub const VOICE_OCCLUSION: u32 = 5;
    pub const VOICE_STOP: u32 = 6;
    pub const ATMOSPHERE: u32 = 7;
    pub const REVERB: u32 = 8;
    pub const HEARING: u32 = 9;
    pub const MASTER: u32 = 10;
    pub const AMBIENCE: u32 = 11;
    pub const VOICE_SEND: u32 = 12;
    pub const RESET_HEARING: u32 = 13;
}

/// Source kinds for SPAWN.
pub mod kind {
    pub const GUNSHOT: u32 = 1;
    pub const NWAVE: u32 = 2;
    pub const MODAL: u32 = 3;
    pub const NOISE: u32 = 4;
    pub const SAMPLE: u32 = 5;
}

/// SPAWN header layout (after opcode & n_args).
pub mod spawn {
    pub const VOICE_ID: usize = 0;
    pub const KIND: usize = 1;
    pub const BUS: usize = 2;
    pub const PX: usize = 3;
    pub const DX: usize = 6;
    pub const DIRECTIVITY_DB: usize = 9;
    pub const REAR_LP_HZ: usize = 10;
    pub const DISTANCE_MODE: usize = 11; // 0 = spherical 1/r (ref 1 m), 1 = none (pre-computed level)
    pub const MIN_DIST: usize = 12;
    pub const REVERB_SEND_DB: usize = 13;
    pub const SPATIAL: usize = 14; // 0 = 2D (non-positional), 1 = 3D
    pub const DELAY_MS: usize = 15; // extra start delay
    pub const HEADER: usize = 16;
}
