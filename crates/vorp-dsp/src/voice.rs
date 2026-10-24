//! A voice = one sound source instance + its propagation to the listener:
//! propagation delay line (distance → time of flight, automatic Doppler), spherical spreading,
//! source directivity (level + rear darkening), ISO 9613-1 air absorption, occlusion,
//! binaural rendering of the direct path, and up to MAX_TAPS early-reflection paths.

use crate::air::Atmosphere;
use crate::delay::DelayLine;
use crate::filters::OnePoleLP;
use crate::sources::{sample::SampleBank, Source};
use crate::spatial::{Binaural, LocalDir, TapPan};
use crate::util::{db_to_lin, Ramp, V3, BLOCK};

pub const MAX_TAPS: usize = 10;
/// Propagation delay capacity: 2^16 samples ≈ 1.36 s at 48 kHz ≈ 465 m of path.
pub const LINE_LEN: usize = 1 << 16;

#[derive(Clone, Copy)]
pub struct Listener {
    pub pos: V3,
    pub fwd: V3,
    pub up: V3,
    pub right: V3,
}

impl Listener {
    pub fn local(&self, d: V3) -> LocalDir {
        LocalDir { right: d.dot(self.right), up: d.dot(self.up), front: d.dot(self.fwd) }
    }
}

#[derive(Clone, Copy)]
pub struct Tap {
    pub path: f32,
    pub gain: f32,
    pub lp_hz: f32,
    pub dir: V3, // world-space arrival direction (listener → reflection point)
    lp: OnePoleLP,
    lp_r: OnePoleLP,
    delay: Ramp,
    pan: TapPan,
    fresh: bool,
}

impl Default for Tap {
    fn default() -> Self {
        Tap { path: 0.0, gain: 0.0, lp_hz: 20000.0, dir: V3::new(0.0, 0.0, -1.0), lp: OnePoleLP::default(), lp_r: OnePoleLP::default(), delay: Ramp::new(0.0), pan: TapPan::default(), fresh: true }
    }
}

pub struct Voice {
    pub active: bool,
    pub id: u32,
    pub bus: usize,
    pub spatial: bool,
    pub source: Option<Source>,
    pub source_done: bool,
    done_samples: usize,
    start_wait: usize,
    pub age: usize,
    pub pos: V3,
    pub dir: V3,
    pub directivity_db: f32,
    pub rear_lp_hz: f32,
    pub distance_mode: u32,
    pub min_dist: f32,
    pub reverb_send: f32,
    line: DelayLine,
    delay: Ramp,
    gain: Ramp,
    air1: OnePoleLP,
    air2: OnePoleLP,
    air_bypass: bool,
    rear_lp: OnePoleLP,
    rear_bypass: bool,
    pub occl_gain: f32,
    pub occl_lp_hz: f32,
    occl_lp: OnePoleLP,
    binaural: Binaural,
    pub taps: [Tap; MAX_TAPS],
    pub ntaps: usize,
    fade: Option<(f32, f32)>,
    first_block: bool,
    src: [f32; BLOCK],
    dry: [f32; BLOCK],
}

impl Voice {
    pub fn new(sr: f32) -> Self {
        Voice {
            active: false,
            id: 0,
            bus: 0,
            spatial: true,
            source: None,
            source_done: false,
            done_samples: 0,
            start_wait: 0,
            age: 0,
            pos: V3::default(),
            dir: V3::new(0.0, 0.0, -1.0),
            directivity_db: 0.0,
            rear_lp_hz: 20000.0,
            distance_mode: 0,
            min_dist: 0.1,
            reverb_send: 0.0,
            line: DelayLine::new(LINE_LEN),
            delay: Ramp::new(0.0),
            gain: Ramp::new(0.0),
            air1: OnePoleLP::default(),
            air2: OnePoleLP::default(),
            air_bypass: true,
            rear_lp: OnePoleLP::default(),
            rear_bypass: true,
            occl_gain: 1.0,
            occl_lp_hz: 20000.0,
            occl_lp: OnePoleLP::default(),
            binaural: Binaural::new(sr),
            taps: [Tap::default(); MAX_TAPS],
            ntaps: 0,
            fade: None,
            first_block: true,
            src: [0.0; BLOCK],
            dry: [0.0; BLOCK],
        }
    }

    #[allow(clippy::too_many_arguments)]
    pub fn start(&mut self, id: u32, bus: usize, source: Source, pos: V3, dir: V3, directivity_db: f32, rear_lp_hz: f32,
                 distance_mode: u32, min_dist: f32, reverb_send_db: f32, spatial: bool, start_delay_samples: usize) {
        self.active = true;
        self.id = id;
        self.bus = bus.min(3);
        self.source = Some(source);
        self.source_done = false;
        self.done_samples = 0;
        self.start_wait = start_delay_samples;
        self.age = 0;
        self.pos = pos;
        self.dir = dir.norm();
        self.directivity_db = directivity_db.max(0.0);
        self.rear_lp_hz = rear_lp_hz;
        self.distance_mode = distance_mode;
        self.min_dist = min_dist.max(0.01);
        self.reverb_send = if reverb_send_db <= -90.0 { 0.0 } else { db_to_lin(reverb_send_db) };
        self.spatial = spatial;
        self.line.clear();
        self.binaural.reset();
        self.ntaps = 0;
        self.occl_gain = 1.0;
        self.occl_lp_hz = 20000.0;
        self.occl_lp = OnePoleLP::default();
        self.air1 = OnePoleLP::default();
        self.air2 = OnePoleLP::default();
        self.rear_lp = OnePoleLP::default();
        self.fade = None;
        self.first_block = true;
    }

    pub fn stop(&mut self, fade_samples: usize) {
        let n = fade_samples.max(1) as f32;
        self.fade = Some((1.0, -1.0 / n));
    }

    pub fn set_taps(&mut self, data: &[f32]) {
        // data: n, then [path, gain, lp_hz, dx, dy, dz] * n
        let n = (data.first().copied().unwrap_or(0.0) as usize).min(MAX_TAPS);
        for k in 0..n {
            let b = 1 + k * 6;
            if b + 5 >= data.len() { break; }
            let t = &mut self.taps[k];
            let was_active = k < self.ntaps;
            t.path = data[b].max(0.0);
            t.gain = data[b + 1];
            t.lp_hz = data[b + 2];
            t.dir = V3::new(data[b + 3], data[b + 4], data[b + 5]).norm();
            if !was_active { t.fresh = true; t.lp = OnePoleLP::default(); t.lp_r = OnePoleLP::default(); }
        }
        self.ntaps = n;
    }

    fn max_delay_samples(&self) -> f32 {
        let mut m = self.delay.target;
        for t in &self.taps[..self.ntaps] { m = m.max(t.delay.target + 64.0); }
        m
    }

    /// Process one block. Adds into the scene (bus-scaled), ER and reverb-input buffers.
    #[allow(clippy::too_many_arguments)]
    pub fn process(&mut self, sr: f32, lis: &Listener, atm: &Atmosphere, bank: &SampleBank, bus_gain: f32,
                   head_radius: f32, spatial_enable: bool,
                   scene_l: &mut [f32], scene_r: &mut [f32], er_l: &mut [f32], er_r: &mut [f32], rev_in: &mut [f32]) {
        let n = BLOCK;
        // ---- source
        if self.start_wait >= n {
            self.start_wait -= n;
            self.src = [0.0; BLOCK];
        } else if let (Some(src), false) = (self.source.as_mut(), self.source_done) {
            let w = self.start_wait;
            for s in self.src[..w].iter_mut() { *s = 0.0; }
            self.source_done = src.render(bank, &mut self.src[w..]);
            self.start_wait = 0;
        } else {
            self.src = [0.0; BLOCK];
        }
        if let Some((g, step)) = self.fade.as_mut() {
            for s in self.src.iter_mut() { *s *= g.max(0.0); *g += *step; }
            if *g <= 0.0 { self.source_done = true; }
        }
        if self.source_done { self.done_samples += n; }
        self.age += n;

        let c = atm.c;
        // ---- 2D (non-positional) voices: straight to both ears
        if !self.spatial {
            let g = bus_gain;
            for i in 0..n {
                scene_l[i] += self.src[i] * g;
                scene_r[i] += self.src[i] * g;
                rev_in[i] += self.src[i] * self.reverb_send * g;
            }
            if self.source_done { self.active = false; }
            return;
        }

        // ---- geometry
        let rel = self.pos.sub(lis.pos);
        let r = rel.len().max(1e-4);
        let to_src = rel.scale(1.0 / r);
        let delay_target = (r / c * sr).min(self.line.max_delay() - 8.0);
        let mut g = match self.distance_mode { 1 => 1.0, _ => 1.0 / r.max(self.min_dist) };
        // directivity: angle between source axis and source→listener
        let cos_t = self.dir.dot(to_src.scale(-1.0)).clamp(-1.0, 1.0);
        let rearness = (1.0 - cos_t) * 0.5;
        g *= db_to_lin(-self.directivity_db * rearness);
        g *= self.occl_gain * bus_gain;
        if self.first_block { self.delay.snap(delay_target); self.gain.snap(g); } else { self.delay.set(delay_target); self.gain.set(g); }

        // filters (block-rate)
        match atm.freq_for_atten(r, 6.0) {
            Some(fc) if fc < 19000.0 => { self.air1.set(sr, fc); self.air2.set(sr, fc); self.air_bypass = false; }
            _ => { self.air_bypass = true; }
        }
        let rear_fc = 20000.0 + (self.rear_lp_hz - 20000.0) * rearness;
        if rear_fc < 18000.0 { self.rear_lp.set(sr, rear_fc); self.rear_bypass = false; } else { self.rear_bypass = true; }
        let occl_on = self.occl_lp_hz < 18000.0;
        if occl_on { self.occl_lp.set(sr, self.occl_lp_hz); }

        self.binaural.head_radius = head_radius;
        self.binaural.c = c;
        let ldir = if spatial_enable { lis.local(to_src) } else { LocalDir::front() };
        self.binaural.update(ldir, self.first_block);

        // taps
        for t in self.taps[..self.ntaps].iter_mut() {
            let d = (t.path / c * sr).min(self.line.max_delay() - 64.0);
            if t.fresh { t.delay.snap(d); } else { t.delay.set(d); }
            let air_fc = atm.freq_for_atten(t.path, 6.0).unwrap_or(22000.0);
            let fc = air_fc.min(t.lp_hz).max(40.0);
            t.lp.set(sr, fc);
            t.lp_r.set(sr, fc);
            t.pan = TapPan::from_dir(lis.local(t.dir), sr, head_radius, c);
            t.fresh = false;
        }

        // ---- per-sample propagation
        let (d0, ds) = self.delay.block(n);
        let (g0, gs) = self.gain.block(n);
        let mut tap_ramps = [(0.0f32, 0.0f32); MAX_TAPS];
        for (k, t) in self.taps[..self.ntaps].iter_mut().enumerate() { tap_ramps[k] = t.delay.block(n); }
        let send = self.reverb_send * bus_gain;
        for i in 0..n {
            self.line.push(self.src[i]);
            let fi = i as f32;
            let d = self.line.read(d0 + ds * fi);
            rev_in[i] += d * send;
            let mut x = d;
            if !self.air_bypass { x = self.air2.process(self.air1.process(x)); }
            if !self.rear_bypass { x = self.rear_lp.process(x); }
            if occl_on { x = self.occl_lp.process(x); }
            self.dry[i] = x * (g0 + gs * fi);
            for k in 0..self.ntaps {
                let t = &mut self.taps[k];
                let (td0, tds) = tap_ramps[k];
                let td = td0 + tds * fi;
                let a = self.line.read(td + t.pan.itd_l);
                let b = self.line.read(td + t.pan.itd_r);
                let tg = t.gain * bus_gain;
                er_l[i] += t.lp.process(a) * tg * t.pan.gl;
                er_r[i] += t.lp_r.process(b) * tg * t.pan.gr;
            }
        }
        self.air1.flush(); self.air2.flush(); self.rear_lp.flush(); self.occl_lp.flush();
        for t in self.taps[..self.ntaps].iter_mut() { t.lp.flush(); t.lp_r.flush(); }
        self.binaural.process(&self.dry, scene_l, scene_r, 1.0, 0.0);
        self.first_block = false;

        if self.source_done && self.done_samples as f32 > self.max_delay_samples() + 2.0 * n as f32 {
            self.active = false;
        }
    }
}
