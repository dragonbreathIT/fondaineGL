// Parameter schemas — MUST mirror crates/vorp-dsp/src/params.rs (indices are the wire format).
// Each entry carries units/ranges so tools (vorp-lab, dev panel) can build tuning UIs automatically.

export interface ParamSpec {
  key: string;
  label: string;
  def: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  /** What the parameter means physically / perceptually. */
  help?: string;
}

const p = (key: string, label: string, def: number, min: number, max: number, unit = '', help = '', step?: number): ParamSpec => ({ key, label, def, min, max, unit, help, step });

export const GUNSHOT_PARAMS: ParamSpec[] = [
  p('peakSpl', 'Peak SPL @1 m', 158, 120, 180, 'dB', 'Muzzle-blast peak sound pressure level 1 m from the muzzle, on axis. Rifles ≈ 155–165, pistols ≈ 150–160.'),
  p('positiveMs', 'Positive phase', 1.0, 0.1, 5, 'ms', 'Friedlander positive-phase duration at 1 m. Longer = bigger charge / longer barrel gas release.', 0.01),
  p('decayB', 'Blast decay (b)', 1.4, 0.3, 5, '', 'Friedlander waveform decay constant. Higher = sharper, smaller negative phase.', 0.01),
  p('precursorDb', 'Precursor', -14, -60, 0, 'dB', 'Level of the precursor shock (air column ahead of the bullet) relative to the main blast.'),
  p('precursorLeadMs', 'Precursor lead', 0.35, 0, 2, 'ms', 'How far the precursor leads the main blast.', 0.01),
  p('turbDb', 'Gas plume roar', -6, -60, 0, 'dB', 'Turbulent propellant-gas noise relative to the blast peak.'),
  p('turbMs', 'Roar decay (T60)', 260, 2, 800, 'ms', 'Time for the gas roar to fall 60 dB (a quieter late tail at 3× this follows).'),
  p('turbHp', 'Roar highpass', 120, 20, 2000, 'Hz'),
  p('turbLp', 'Roar lowpass', 5500, 500, 16000, 'Hz'),
  p('bodyDb', 'Body (perceived boom)', -11, -60, 0, 'dB', 'Low-frequency chest/room "boom" (two partials with a soft-saturated attack). −60 for a purely measured (thin) signature.'),
  p('bodyHz', 'Body frequency', 62, 20, 400, 'Hz'),
  p('bodyMs', 'Body decay (T60)', 280, 5, 1000, 'ms'),
  p('bodyDrop', 'Body pitch drop', 0.35, 0, 2, '', 'Initial pitch overshoot that glides down to the body frequency.', 0.01),
  p('suppress', 'Suppressor', 0, 0, 1, '', 'Suppressor amount (0 none … 1 full can).', 0.01),
  p('suppRedDb', 'Suppressor reduction', 28, 0, 45, 'dB', 'Peak reduction a full suppressor provides (good cans: 25–35 dB).'),
  p('firstPopDb', 'First-round pop', 0, 0, 10, 'dB', 'Extra level on the first suppressed shot (oxygen in the can). Set by the weapon at runtime.'),
  p('variation', 'Shot-to-shot variation', 0.5, 0, 1, '', 'Random variation of level, duration and spectrum per shot.', 0.01),
  p('seed', 'Seed', 0, 0, 100000, '', 'Randomised per shot by the host.', 1),
  p('brightHz', 'Brightness', 16000, 1000, 20000, 'Hz', 'Final band-limit (anti-alias / mic bandwidth).'),
  p('directivityDb', 'Directivity (front−rear)', 9, 0, 20, 'dB', 'How much louder the blast is in front of the muzzle than behind it.'),
  p('rearLpHz', 'Rear darkening', 4500, 200, 20000, 'Hz', 'Lowpass applied towards the rear of the muzzle (shooter’s own ears are rear-ish).'),
  p('tailSendDb', 'Environment send', 0, -40, 12, 'dB', 'Adjusts how much this weapon excites reflections / reverb.'),
  p('crackDb', 'Report (snap)', -4, -90, 6, 'dB', 'Sharp band-limited report burst that gives each gun its character (relative to the blast peak).'),
  p('crackHz', 'Report pitch', 3400, 300, 9000, 'Hz', 'Pistols ≈ 2–2.5 kHz (hard snap), 5.56 ≈ 4–5 kHz (crack), big rifles ≈ 2.5 kHz.'),
  p('crackMs', 'Report decay (T60)', 10, 1, 200, 'ms'),
  p('subDb', 'Sub thump', -13, -90, 6, 'dB', 'Sub-bass pressure pulse you feel in your chest (relative to the blast peak).'),
  p('subHz', 'Sub frequency', 40, 15, 150, 'Hz'),
  p('subMs', 'Sub decay (T60)', 360, 5, 1000, 'ms'),
  p('driveDb', 'Spike compaction', 12, 0, 30, 'dB', 'Soft-clips the instantaneous blast spike (only the spike) this far below its peak so the 50–300 ms body carries the loudness (how a shot feels, not how a microphone peaks).'),
];

export const NOISE_PARAMS: ParamSpec[] = [
  p('levelSpl', 'Peak SPL @1 m', 120, 60, 170, 'dB'),
  p('attackMs', 'Attack', 0.5, 0.01, 50, 'ms', '', 0.01),
  p('decayMs', 'Decay (T60)', 120, 1, 3000, 'ms'),
  p('hpHz', 'Highpass', 200, 20, 8000, 'Hz'),
  p('lpHz', 'Lowpass', 5000, 200, 20000, 'Hz'),
  p('thumpHz', 'Thump frequency', 90, 20, 400, 'Hz'),
  p('thumpDb', 'Thump level', -6, -60, 12, 'dB'),
  p('thumpMs', 'Thump decay', 60, 2, 1000, 'ms'),
  p('grainsPerS', 'Grain density', 0, 0, 3000, '/s', 'Granular crackle (gravel, dry grass, debris).'),
  p('grainDb', 'Grain level', -10, -60, 6, 'dB'),
  p('seed', 'Seed', 0, 0, 100000, '', '', 1),
  p('resonance', 'Filter Q', 0.7, 0.3, 8, '', '', 0.01),
  p('hit2Ms', 'Second hit delay', 0, 0, 500, 'ms', 'Two-stage clicks / bounces: the envelope re-triggers this long after the first hit.'),
  p('hit2Db', 'Second hit level', -200, -200, 12, 'dB', 'Relative to the first hit; −200 = none.'),
];

export const HEARING_PARAMS: ParamSpec[] = [
  p('protection', 'Hearing protection', 0, 0, 2, '', '0 none, 1 passive earmuffs, 2 electronic earmuffs', 1),
  p('passiveAttenDb', 'Passive attenuation', 25, 0, 40, 'dB', 'Real-world muff/plug attenuation (≈ NRR − 7).'),
  p('passiveHfExtraDb', 'Extra HF attenuation', 10, 0, 30, 'dB'),
  p('elecGainDb', 'Electronic gain', 6, 0, 24, 'dB', 'Ambient amplification of electronic muffs.'),
  p('elecLimitSpl', 'Electronic limit', 82, 70, 95, 'dB SPL', 'Output limit of electronic muffs (most cut at ~82 dB).'),
  p('ttsThresholdSpl', 'Damage threshold (peak)', 130, 110, 150, 'dB SPL', 'Impulses above this cause a temporary threshold shift.'),
  p('ttsRate', 'TTS rate', 0.15, 0, 2, 'dB/dB', 'dB of threshold shift per dB above threshold per impulse.', 0.01),
  p('ttsMaxDb', 'Max TTS', 18, 0, 60, 'dB'),
  p('ttsRecoveryS', 'Recovery time constant', 10, 0.5, 600, 's', 'Real-world recovery takes hours; games use 10–60 s.'),
  p('tinnitusHz', 'Tinnitus frequency', 5200, 1000, 12000, 'Hz'),
  p('tinnitusDb', 'Tinnitus level', -46, -80, -6, 'dBFS', 'Ear ringing after loud exposure, at full TTS. −80 = off. −46 is a faint ring after a long unprotected string; −30 is loud and obvious.'),
  p('tinnitusTtsDb', 'Tinnitus full at TTS', 20, 1, 40, 'dB'),
  p('reflexThresholdSpl', 'Acoustic reflex threshold', 95, 70, 120, 'dB SPL'),
  p('reflexMaxDb', 'Reflex max attenuation', 6, 0, 30, 'dB'),
  p('reflexAttackMs', 'Reflex latency', 90, 5, 300, 'ms'),
  p('reflexReleaseMs', 'Reflex release', 900, 50, 5000, 'ms'),
  p('muffle', 'Muffling amount', 1.0, 0, 2, '', 'How strongly TTS dulls and quiets hearing.', 0.01),
  p('enable', 'Hearing model', 1, 0, 1, '', '', 1),
  p('dullRecoveryMs', 'Post-shot dulling recovery', 350, 20, 3000, 'ms', 'After every impulse over the damage threshold the highs drop for a moment and recover with this time constant.'),
  p('dullHz', 'Dulling cutoff', 4000, 800, 12000, 'Hz', 'Lowpass cutoff at full post-shot dulling.'),
];

export const MASTER_PARAMS: ParamSpec[] = [
  p('calibrationSpl', 'Calibration (SPL @ 0 dBFS)', 112, 70, 140, 'dB SPL', 'Acoustic level that maps to digital full scale before dynamics. Lower = everything louder. 112 keeps footsteps/casings 35–40 dB under a shot.'),
  p('compThresholdDb', 'Loudness threshold', -6, -60, 0, 'dBFS'),
  p('compRatio', 'Loudness ratio', 2.6, 1, 20, ':1', 'Perceptual compression of the 110+ dB real-world range into a playable range. Only shots and very close impacts cross the threshold.', 0.1),
  p('compKneeDb', 'Knee', 6, 0, 24, 'dB'),
  p('compAttackMs', 'Attack', 0.3, 0.05, 100, 'ms', 'Fast: every onset is measured on its own level, so full-auto shots never duck each other.', 0.05),
  p('compReleaseMs', 'Release', 90, 10, 3000, 'ms', 'Release after a brief peak; sustained loudness releases ≈ 4× slower (program-dependent), so the world stays ducked after a shot and recovers smoothly.'),
  p('limitCeilingDb', 'Limiter ceiling', -0.3, -12, 0, 'dBFS', '', 0.1),
  p('limitReleaseMs', 'Limiter release', 12, 1, 500, 'ms', 'Release after an isolated peak (sustained limiting releases slower).'),
  p('masterDb', 'Master volume', 0, -60, 12, 'dB'),
  p('busWeaponsDb', 'Weapons bus', 0, -60, 12, 'dB'),
  p('busImpactsDb', 'Impacts bus', 0, -60, 12, 'dB'),
  p('busEnvDb', 'Environment bus', 0, -60, 12, 'dB'),
  p('busUiDb', 'UI bus', 0, -60, 12, 'dB'),
  p('erLevelDb', 'Early reflections', 0, -40, 12, 'dB'),
  p('reverbLevelDb', 'Late reverb', 0, -40, 12, 'dB'),
  p('convMix', 'Convolution mix', 0, 0, 1, '', '0 = algorithmic FDN, 1 = convolution IR', 0.01),
  p('headRadiusM', 'Head radius', 0.0875, 0.06, 0.12, 'm', '', 0.0005),
  p('spatialEnable', 'Binaural', 1, 0, 1, '', '', 1),
  p('compDetectorMs', 'Loudness integration', 2, 0, 100, 'ms', 'RMS window of the loudness detector (0 = peak).'),
  p('clipKneeDb', 'Saturation knee', -4, -24, -0.1, 'dBFS', 'Above this, the output saturates smoothly towards full scale: density instead of a 1 ms tick under a limiter.', 0.1),
  p('makeupDb', 'Make-up gain', 0, -12, 24, 'dB', 'Overall loudness after the perceptual compressor. Raise for an even louder mix.'),
  p('satAsym', 'Saturation asymmetry', 0.5, 0, 1, '', 'Positive half-cycles clip earlier than negative ones (even harmonics: the crunch of an overdriven ear / camera limiter).', 0.01),
  p('satDullHz', 'Overload dulling cutoff', 4500, 800, 16000, 'Hz', 'While the saturator is driven a lowpass drops towards this cutoff — the brief HF loss right after an overload.'),
  p('satDullMs', 'Overload dulling recovery', 45, 2, 500, 'ms'),
];

export const REVERB_PARAMS: ParamSpec[] = [
  p('rt60Low', 'RT60 low', 1.2, 0.05, 12, 's', '', 0.01),
  p('rt60Mid', 'RT60 mid', 1.0, 0.05, 12, 's', '', 0.01),
  p('rt60High', 'RT60 high', 0.5, 0.05, 12, 's', '', 0.01),
  p('xoverLow', 'Low crossover', 250, 50, 1000, 'Hz'),
  p('xoverHigh', 'High crossover', 4000, 1000, 12000, 'Hz'),
  p('size', 'Size', 1, 0.1, 8, '', 'Delay scale ≈ room dimensions.', 0.01),
  p('diffusion', 'Diffusion', 0.7, 0, 1, '', '', 0.01),
  p('predelayMs', 'Predelay', 12, 0, 240, 'ms'),
  p('modDepthMs', 'Modulation depth', 0.35, 0, 3, 'ms', '', 0.01),
  p('modRateHz', 'Modulation rate', 0.6, 0.05, 5, 'Hz', '', 0.01),
  p('levelDb', 'Level', 0, -40, 12, 'dB'),
  p('toneHz', 'Tone', 9000, 1000, 20000, 'Hz'),
];

export const AMBIENCE_PARAMS: ParamSpec[] = [
  p('windSpl', 'Wind level', 48, 0, 90, 'dB SPL'),
  p('windGust', 'Gustiness', 0.5, 0, 1, '', '', 0.01),
  p('windGustRate', 'Gust rate', 0.15, 0.01, 2, 'Hz', '', 0.01),
  p('windToneHz', 'Wind tone', 600, 100, 3000, 'Hz'),
  p('rumbleSpl', 'Distant rumble', 38, 0, 80, 'dB SPL'),
  p('enable', 'Ambience', 1, 0, 1, '', '', 1),
];

export const OP = {
  LISTENER: 1, SPAWN: 2, VOICE_POS: 3, VOICE_TAPS: 4, VOICE_OCCLUSION: 5, VOICE_STOP: 6, ATMOSPHERE: 7,
  REVERB: 8, HEARING: 9, MASTER: 10, AMBIENCE: 11, VOICE_SEND: 12, RESET_HEARING: 13,
} as const;

export const KIND = { GUNSHOT: 1, NWAVE: 2, MODAL: 3, NOISE: 4, SAMPLE: 5 } as const;
export type SourceKind = (typeof KIND)[keyof typeof KIND];

export const SPAWN = {
  VOICE_ID: 0, KIND: 1, BUS: 2, PX: 3, DX: 6, DIRECTIVITY_DB: 9, REAR_LP_HZ: 10, DISTANCE_MODE: 11,
  MIN_DIST: 12, REVERB_SEND_DB: 13, SPATIAL: 14, DELAY_MS: 15, HEADER: 16,
} as const;

export const BUS = { WEAPONS: 0, IMPACTS: 1, ENV: 2, UI: 3 } as const;

export const METER = {
  PEAK_L: 0, PEAK_R: 1, SCENE_SPL: 2, TTS: 3, COMP_GR: 4, LIMIT_GR: 5, VOICES: 6, REFLEX_GR: 7, TINNITUS: 8, EAR_SPL: 9, SPEED_OF_SOUND: 10, TIME: 11, MAX_EAR_SPL: 12, SAT_CUTOFF_HZ: 13,
} as const;

/** Builds a parameter array from defaults + named overrides. */
export function paramArray(schema: ParamSpec[], values: Record<string, number> = {}): Float32Array {
  const out = new Float32Array(schema.length);
  schema.forEach((s, i) => { out[i] = values[s.key] ?? s.def; });
  return out;
}

export function defaultsOf(schema: ParamSpec[]): Record<string, number> {
  const o: Record<string, number> = {};
  for (const s of schema) o[s.key] = s.def;
  return o;
}
