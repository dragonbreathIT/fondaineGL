//! vorp engine: voices → (dry binaural + early reflections + late reverb) → ambience → hearing model
//! → perceptual mapping (Pa → digital via calibration + fast compressor) → overload saturator → limiter
//! → tinnitus → output.

use crate::air::Atmosphere;
use crate::ambience::Ambience;
use crate::convolver::Convolver;
use crate::dynamics::{Compressor, CompressorParams, Limiter, Overload};
use crate::fdn::{Fdn, ReverbParams};
use crate::hearing::Hearing;
use crate::params::{master as M, op, reverb as R, spawn as S};
use crate::sources::{sample::SampleBank, Source};
use crate::util::{db_to_lin, lin_to_db, pa_to_spl, P_REF, V3, BLOCK};
use crate::voice::{Listener, Voice};

pub const MAX_VOICES: usize = 48;
pub const METERS: usize = 16;

pub struct Engine {
    pub sr: f32,
    pub voices: Vec<Voice>,
    pub listener: Listener,
    pub atm: Atmosphere,
    pub bank: SampleBank,
    pub fdn: Fdn,
    pub conv: Convolver,
    pub hearing: Hearing,
    pub ambience: Ambience,
    pub comp: Compressor,
    pub overload: Overload,
    pub limiter: Limiter,
    pub master: [f32; M::COUNT],
    bus_gain: [f32; 4],
    scene_l: [f32; BLOCK],
    scene_r: [f32; BLOCK],
    er_l: [f32; BLOCK],
    er_r: [f32; BLOCK],
    rev_in: [f32; BLOCK],
    rev_l: [f32; BLOCK],
    rev_r: [f32; BLOCK],
    ui_l: [f32; BLOCK],
    ui_r: [f32; BLOCK],
    /// Planar output: [L x 128, R x 128]
    pub out: [f32; BLOCK * 2],
    pub meters: [f32; METERS],
    pub cmd: Vec<f32>,
    frames: u64,
}

impl Engine {
    pub fn new(sr: f32) -> Self {
        let mut voices = Vec::with_capacity(MAX_VOICES);
        for _ in 0..MAX_VOICES { voices.push(Voice::new(sr)); }
        let mut e = Engine {
            sr,
            voices,
            listener: Listener { pos: V3::default(), fwd: V3::new(0.0, 0.0, -1.0), up: V3::new(0.0, 1.0, 0.0), right: V3::new(1.0, 0.0, 0.0) },
            atm: Atmosphere::new(15.0, 0.6, 101.325),
            bank: SampleBank::new(),
            fdn: Fdn::new(sr),
            conv: Convolver::empty(),
            hearing: Hearing::new(sr),
            ambience: Ambience::new(sr),
            comp: Compressor::new(sr, CompressorParams { threshold_db: -6.0, ratio: 2.6, knee_db: 6.0, attack_ms: 0.3, release_ms: 90.0, makeup_db: 0.0, detector_ms: 2.0 }),
            overload: Overload::new(sr, -4.0, 0.5, 4500.0, 45.0),
            limiter: Limiter::new(sr, 1.5, -0.3, 12.0),
            master: M::DEFAULTS,
            bus_gain: [1.0; 4],
            scene_l: [0.0; BLOCK],
            scene_r: [0.0; BLOCK],
            er_l: [0.0; BLOCK],
            er_r: [0.0; BLOCK],
            rev_in: [0.0; BLOCK],
            rev_l: [0.0; BLOCK],
            rev_r: [0.0; BLOCK],
            ui_l: [0.0; BLOCK],
            ui_r: [0.0; BLOCK],
            out: [0.0; BLOCK * 2],
            meters: [0.0; METERS],
            cmd: vec![0.0; 1 << 16],
            frames: 0,
        };
        e.set_master(&M::DEFAULTS);
        e
    }

    pub fn set_master(&mut self, p: &[f32]) {
        for i in 0..M::COUNT.min(p.len()) { self.master[i] = p[i]; }
        let m = &self.master;
        self.comp.set(CompressorParams {
            threshold_db: m[M::COMP_THRESHOLD_DB],
            ratio: m[M::COMP_RATIO],
            knee_db: m[M::COMP_KNEE_DB],
            attack_ms: m[M::COMP_ATTACK_MS],
            release_ms: m[M::COMP_RELEASE_MS],
            makeup_db: m[M::MAKEUP_DB],
            detector_ms: m[M::COMP_DETECTOR_MS],
        });
        self.overload.set(m[M::CLIP_KNEE_DB], m[M::SAT_ASYM], m[M::SAT_DULL_HZ], m[M::SAT_DULL_MS]);
        self.limiter.set(m[M::LIMIT_CEILING_DB], m[M::LIMIT_RELEASE_MS]);
        self.bus_gain = [
            db_to_lin(m[M::BUS_WEAPONS_DB]),
            db_to_lin(m[M::BUS_IMPACTS_DB]),
            db_to_lin(m[M::BUS_ENV_DB]),
            db_to_lin(m[M::BUS_UI_DB]),
        ];
    }

    fn find_voice(&mut self, id: u32) -> Option<&mut Voice> {
        self.voices.iter_mut().find(|v| v.active && v.id == id)
    }

    fn alloc_voice(&mut self) -> usize {
        if let Some(i) = self.voices.iter().position(|v| !v.active) { return i; }
        // steal: prefer finished sources (only tails left), then oldest
        let mut best = 0;
        let mut best_score = f32::MIN;
        for (i, v) in self.voices.iter().enumerate() {
            let score = v.age as f32 + if v.source_done { 1e9 } else { 0.0 };
            if score > best_score { best_score = score; best = i; }
        }
        best
    }

    /// Execute `len` floats of commands from `self.cmd`.
    pub fn exec(&mut self, len: usize) {
        let len = len.min(self.cmd.len());
        let mut i = 0;
        // move the command buffer out to avoid borrow conflicts while dispatching
        let cmd = core::mem::take(&mut self.cmd);
        while i + 1 < len {
            let opcode = cmd[i] as u32;
            let n = cmd[i + 1] as usize;
            let a0 = i + 2;
            if a0 + n > len { break; }
            let args = &cmd[a0..a0 + n];
            self.dispatch(opcode, args);
            i = a0 + n;
        }
        self.cmd = cmd;
    }

    fn dispatch(&mut self, opcode: u32, a: &[f32]) {
        let at = |i: usize| a.get(i).copied().unwrap_or(0.0);
        match opcode {
            op::LISTENER => {
                let pos = V3::new(at(0), at(1), at(2));
                let fwd = V3::new(at(3), at(4), at(5)).norm();
                let mut up = V3::new(at(6), at(7), at(8)).norm();
                let right = fwd.cross(up).norm();
                up = right.cross(fwd).norm();
                self.listener = Listener { pos, fwd, up, right };
            }
            op::SPAWN => {
                if a.len() < S::HEADER { return; }
                let kind = at(S::KIND) as u32;
                let params = &a[S::HEADER..];
                let Some(src) = Source::create(kind, self.sr, params) else { return };
                let idx = self.alloc_voice();
                let start = (at(S::DELAY_MS).max(0.0) * 0.001 * self.sr) as usize;
                self.voices[idx].start(
                    at(S::VOICE_ID) as u32,
                    at(S::BUS) as usize,
                    src,
                    V3::new(at(S::PX), at(S::PX + 1), at(S::PX + 2)),
                    V3::new(at(S::DX), at(S::DX + 1), at(S::DX + 2)),
                    at(S::DIRECTIVITY_DB),
                    at(S::REAR_LP_HZ).max(200.0),
                    at(S::DISTANCE_MODE) as u32,
                    at(S::MIN_DIST),
                    at(S::REVERB_SEND_DB),
                    at(S::SPATIAL) > 0.5,
                    start,
                );
            }
            op::VOICE_POS => {
                let id = at(0) as u32;
                if let Some(v) = self.find_voice(id) {
                    v.pos = V3::new(at(1), at(2), at(3));
                    if a.len() >= 7 { v.dir = V3::new(at(4), at(5), at(6)).norm(); }
                }
            }
            op::VOICE_TAPS => {
                let id = at(0) as u32;
                if let Some(v) = self.find_voice(id) { v.set_taps(&a[1..]); }
            }
            op::VOICE_OCCLUSION => {
                let id = at(0) as u32;
                if let Some(v) = self.find_voice(id) {
                    v.occl_gain = db_to_lin(at(1).min(0.0));
                    v.occl_lp_hz = at(2).max(100.0);
                }
            }
            op::VOICE_STOP => {
                let id = at(0) as u32;
                let fade = (at(1).max(0.0) * 0.001 * self.sr) as usize;
                if let Some(v) = self.find_voice(id) { v.stop(fade); }
            }
            op::VOICE_SEND => {
                let id = at(0) as u32;
                if let Some(v) = self.find_voice(id) { v.reverb_send = if at(1) <= -90.0 { 0.0 } else { db_to_lin(at(1)) }; }
            }
            op::ATMOSPHERE => {
                self.atm.temp_c = at(0);
                self.atm.rel_humidity = at(1).clamp(0.0, 1.0);
                self.atm.pressure_kpa = if at(2) > 1.0 { at(2) } else { 101.325 };
                self.atm.update();
            }
            op::REVERB => {
                if a.len() < R::COUNT { return; }
                self.fdn.set_params(ReverbParams {
                    rt60_low: at(R::RT60_LOW),
                    rt60_mid: at(R::RT60_MID),
                    rt60_high: at(R::RT60_HIGH),
                    xover_low_hz: at(R::XOVER_LOW),
                    xover_high_hz: at(R::XOVER_HIGH),
                    size: at(R::SIZE),
                    diffusion: at(R::DIFFUSION),
                    predelay_ms: at(R::PREDELAY_MS),
                    mod_depth_ms: at(R::MOD_DEPTH_MS),
                    mod_rate_hz: at(R::MOD_RATE_HZ),
                    level_db: at(R::LEVEL_DB),
                    tone_hz: at(R::TONE_HZ),
                });
            }
            op::HEARING => self.hearing.set_params(a),
            op::MASTER => self.set_master(a),
            op::AMBIENCE => self.ambience.set_params(a),
            op::RESET_HEARING => self.hearing.reset(),
            _ => {}
        }
    }

    /// Render one 128-frame block into `self.out` (planar L/R).
    pub fn process(&mut self) {
        self.scene_l = [0.0; BLOCK];
        self.scene_r = [0.0; BLOCK];
        self.er_l = [0.0; BLOCK];
        self.er_r = [0.0; BLOCK];
        self.rev_in = [0.0; BLOCK];
        self.rev_l = [0.0; BLOCK];
        self.rev_r = [0.0; BLOCK];
        self.ui_l = [0.0; BLOCK];
        self.ui_r = [0.0; BLOCK];

        let head_radius = self.master[M::HEAD_RADIUS_M].clamp(0.05, 0.15);
        let spatial_enable = self.master[M::SPATIAL_ENABLE] > 0.5;
        let mut active = 0;
        for v in self.voices.iter_mut() {
            if !v.active { continue; }
            active += 1;
            let bg = self.bus_gain[v.bus];
            if v.bus == 3 {
                v.process(self.sr, &self.listener, &self.atm, &self.bank, bg, head_radius, spatial_enable,
                          &mut self.ui_l, &mut self.ui_r, &mut self.er_l, &mut self.er_r, &mut self.rev_in);
            } else {
                v.process(self.sr, &self.listener, &self.atm, &self.bank, bg, head_radius, spatial_enable,
                          &mut self.scene_l, &mut self.scene_r, &mut self.er_l, &mut self.er_r, &mut self.rev_in);
            }
        }

        // late reverb (FDN and/or convolution)
        let rev_gain = db_to_lin(self.master[M::REVERB_LEVEL_DB]);
        let mix = self.master[M::CONV_MIX].clamp(0.0, 1.0);
        let use_conv = self.conv.is_loaded() && mix > 0.0;
        if !use_conv || mix < 1.0 {
            self.fdn.process(&self.rev_in, &mut self.rev_l, &mut self.rev_r);
            let g = rev_gain * if use_conv { 1.0 - mix } else { 1.0 };
            for i in 0..BLOCK { self.scene_l[i] += self.rev_l[i] * g; self.scene_r[i] += self.rev_r[i] * g; }
        }
        if use_conv {
            self.conv.process(&self.rev_in, &mut self.scene_l, &mut self.scene_r, rev_gain * mix);
        }
        let er_gain = db_to_lin(self.master[M::ER_LEVEL_DB]);
        for i in 0..BLOCK { self.scene_l[i] += self.er_l[i] * er_gain; self.scene_r[i] += self.er_r[i] * er_gain; }

        // ambience (environment bus)
        {
            let mut al = [0.0f32; BLOCK];
            let mut ar = [0.0f32; BLOCK];
            self.ambience.process(&mut al, &mut ar);
            let g = self.bus_gain[2];
            for i in 0..BLOCK { self.scene_l[i] += al[i] * g; self.scene_r[i] += ar[i] * g; }
        }

        let mut scene_peak = 0.0f32;
        for i in 0..BLOCK { scene_peak = scene_peak.max(self.scene_l[i].abs()).max(self.scene_r[i].abs()); }

        // hearing (protection, reflex, TTS)
        self.hearing.process(&mut self.scene_l, &mut self.scene_r);

        // perceptual mapping: Pa -> digital. The compressor attacks in a fraction of a millisecond so each
        // onset is measured on its own level; what is still above full scale becomes density in the overload
        // saturator (how a gunshot fills the speakers instead of being a 1 ms tick under a limiter).
        let cal = 1.0 / (P_REF * db_to_lin(self.master[M::CALIBRATION_SPL]));
        let master = db_to_lin(self.master[M::MASTER_DB]);
        let (mut pl, mut pr) = (0.0f32, 0.0f32);
        for i in 0..BLOCK {
            let l = self.scene_l[i] * cal;
            let r = self.scene_r[i] * cal;
            let g = self.comp.gain(l.abs().max(r.abs())) * master;
            self.scene_l[i] = l * g;
            self.scene_r[i] = r * g;
        }
        self.overload.process(&mut self.scene_l, &mut self.scene_r);
        for i in 0..BLOCK {
            let (mut l, mut r) = (self.scene_l[i], self.scene_r[i]);
            self.limiter.process(&mut l, &mut r);
            self.out[i] = l;
            self.out[BLOCK + i] = r;
        }
        {
            let (ol, or) = self.out.split_at_mut(BLOCK);
            self.hearing.add_tinnitus(ol, or);
            for i in 0..BLOCK {
                ol[i] = (ol[i] + self.ui_l[i]).clamp(-1.0, 1.0);
                or[i] = (or[i] + self.ui_r[i]).clamp(-1.0, 1.0);
                pl = pl.max(ol[i].abs());
                pr = pr.max(or[i].abs());
            }
        }

        // meters: hold peaks with decay
        let decay = 0.92;
        let m = &mut self.meters;
        m[0] = lin_to_db(pl).max(m[0] - 1.0).max(-120.0);
        m[1] = lin_to_db(pr).max(m[1] - 1.0).max(-120.0);
        m[2] = pa_to_spl(scene_peak).max(m[2] * decay);
        m[3] = self.hearing.tts_db;
        m[4] = self.comp.gr_db;
        m[5] = self.limiter.gr_db;
        m[6] = active as f32;
        m[7] = self.hearing.reflex_gr_db;
        m[8] = if self.hearing.p[crate::params::hearing::TINNITUS_DB] <= -79.5 { 0.0 } else { self.hearing.tinnitus_level };
        m[9] = self.hearing.last_peak_spl;
        m[12] = m[12].max(self.hearing.last_peak_spl); // max eardrum SPL since start
        m[10] = self.atm.c;
        m[13] = self.overload.cutoff_hz;
        self.frames += BLOCK as u64;
        m[11] = self.frames as f32 / self.sr;
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::params::{gunshot as G, kind};

    fn spawn_gunshot(e: &mut Engine, id: f32, pos: [f32; 3]) {
        let mut v = vec![op::SPAWN as f32, 0.0];
        let mut hdr = vec![0.0f32; S::HEADER];
        hdr[S::VOICE_ID] = id;
        hdr[S::KIND] = kind::GUNSHOT as f32;
        hdr[S::PX] = pos[0]; hdr[S::PX + 1] = pos[1]; hdr[S::PX + 2] = pos[2];
        hdr[S::DX + 2] = -1.0;
        hdr[S::DIRECTIVITY_DB] = 9.0;
        hdr[S::REAR_LP_HZ] = 4500.0;
        hdr[S::MIN_DIST] = 0.1;
        hdr[S::REVERB_SEND_DB] = -20.0;
        hdr[S::SPATIAL] = 1.0;
        v.extend_from_slice(&hdr);
        v.extend_from_slice(&G::DEFAULTS);
        v[1] = (v.len() - 2) as f32;
        e.cmd[..v.len()].copy_from_slice(&v);
        e.exec(v.len());
    }

    #[test]
    fn gunshot_arrives_after_time_of_flight_and_is_limited() {
        let mut e = Engine::new(48000.0);
        // silence ambience for a clean measurement
        let amb = [0.0, 0.0, 0.1, 600.0, 0.0, 0.0];
        e.cmd[..8].copy_from_slice(&[op::AMBIENCE as f32, 6.0, amb[0], amb[1], amb[2], amb[3], amb[4], amb[5]]);
        e.exec(8);
        spawn_gunshot(&mut e, 1.0, [0.0, 0.0, -34.3]); // ~0.1 s away
        let mut first = None;
        let mut max = 0.0f32;
        for b in 0..200 {
            e.process();
            for i in 0..BLOCK {
                let v = e.out[i].abs().max(e.out[BLOCK + i].abs());
                max = max.max(v);
                if first.is_none() && v > 0.01 { first = Some(b * BLOCK + i); }
            }
        }
        let t = first.expect("no sound") as f32 / 48000.0;
        assert!((t - 34.3 / e.atm.c).abs() < 0.003, "arrival {t}");
        assert!(max <= db_to_lin(M::DEFAULTS[M::LIMIT_CEILING_DB]) * 1.001, "limiter breached {max}");
    }

    #[test]
    fn close_shot_causes_tts_and_earpro_prevents_it() {
        let mut e = Engine::new(48000.0);
        spawn_gunshot(&mut e, 1.0, [0.3, 0.0, -0.5]);
        for _ in 0..100 { e.process(); }
        let tts_open = e.hearing.tts_db;
        let mut e2 = Engine::new(48000.0);
        let mut h = crate::params::hearing::DEFAULTS.to_vec();
        h[crate::params::hearing::PROTECTION_MODE] = 1.0;
        let mut cmd = vec![op::HEARING as f32, h.len() as f32];
        cmd.extend_from_slice(&h);
        e2.cmd[..cmd.len()].copy_from_slice(&cmd);
        e2.exec(cmd.len());
        spawn_gunshot(&mut e2, 1.0, [0.3, 0.0, -0.5]);
        for _ in 0..100 { e2.process(); }
        assert!(tts_open > 3.0, "tts {tts_open}");
        assert!(e2.hearing.tts_db < tts_open * 0.5, "protected tts {}", e2.hearing.tts_db);
    }
}
