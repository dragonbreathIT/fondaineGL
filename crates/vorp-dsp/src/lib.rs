//! vorp — physically-based real-time audio for the fondaine engine.
//!
//! Signals are acoustic pressure in pascals until the "ear" stage. Sources render the pressure they
//! produce at 1 m; voices propagate it to the listener (time of flight, spreading, air absorption,
//! directivity, occlusion, reflections); the hearing model and calibrated perceptual mapping turn it
//! into the digital signal you hear.
//!
//! The C ABI below is called from the AudioWorklet (`packages/vorp/src/worklet`). All functions operate
//! on a single global engine (WebAssembly audio worklets are single-threaded).

pub mod air;
pub mod ambience;
pub mod convolver;
pub mod delay;
pub mod dynamics;
pub mod engine;
pub mod fdn;
pub mod fft;
pub mod filters;
pub mod hearing;
pub mod params;
pub mod sources;
pub mod spatial;
pub mod util;
pub mod voice;

use engine::Engine;

static mut ENGINE: Option<Box<Engine>> = None;

#[allow(static_mut_refs)]
fn eng() -> Option<&'static mut Engine> {
    unsafe { ENGINE.as_deref_mut() }
}

/// Create (or recreate) the engine at the given sample rate. Returns 1 on success.
#[no_mangle]
pub extern "C" fn vorp_create(sample_rate: f32) -> u32 {
    let sr = if sample_rate > 8000.0 { sample_rate } else { 48000.0 };
    unsafe { ENGINE = Some(Box::new(Engine::new(sr))); }
    1
}

/// Allocate `bytes` in WASM memory (8-byte aligned). Used to upload samples / IRs.
#[no_mangle]
pub extern "C" fn vorp_alloc(bytes: u32) -> *mut u8 {
    let layout = std::alloc::Layout::from_size_align(bytes.max(8) as usize, 8).unwrap();
    unsafe { std::alloc::alloc_zeroed(layout) }
}

#[no_mangle]
pub extern "C" fn vorp_free(ptr: *mut u8, bytes: u32) {
    if ptr.is_null() { return; }
    let layout = std::alloc::Layout::from_size_align(bytes.max(8) as usize, 8).unwrap();
    unsafe { std::alloc::dealloc(ptr, layout) }
}

/// Pointer to the command buffer (f32). Capacity: `vorp_cmd_capacity()` floats.
#[no_mangle]
pub extern "C" fn vorp_cmd_ptr() -> *mut f32 {
    eng().map(|e| e.cmd.as_mut_ptr()).unwrap_or(core::ptr::null_mut())
}

#[no_mangle]
pub extern "C" fn vorp_cmd_capacity() -> u32 { eng().map(|e| e.cmd.len() as u32).unwrap_or(0) }

/// Execute `len` floats of commands previously written into the command buffer.
#[no_mangle]
pub extern "C" fn vorp_exec(len: u32) {
    if let Some(e) = eng() { e.exec(len as usize); }
}

/// Render one 128-frame block. Returns a pointer to planar output [L*128, R*128].
#[no_mangle]
pub extern "C" fn vorp_process() -> *const f32 {
    match eng() {
        Some(e) => { e.process(); e.out.as_ptr() }
        None => core::ptr::null(),
    }
}

#[no_mangle]
pub extern "C" fn vorp_out_ptr() -> *const f32 { eng().map(|e| e.out.as_ptr()).unwrap_or(core::ptr::null()) }

/// Meters (16 f32): [peakL dBFS, peakR dBFS, scene peak SPL, TTS dB, comp GR dB, limiter GR dB,
/// active voices, reflex GR dB, tinnitus 0..1, eardrum peak SPL, speed of sound, time s, max eardrum SPL, ...]
#[no_mangle]
pub extern "C" fn vorp_meters_ptr() -> *const f32 { eng().map(|e| e.meters.as_ptr()).unwrap_or(core::ptr::null()) }

/// Register (copy) a mono sample of `len` f32 at `ptr` under `id`. Must already be at the engine rate.
#[no_mangle]
pub extern "C" fn vorp_sample_set(id: u32, ptr: *const f32, len: u32) {
    let Some(e) = eng() else { return };
    if ptr.is_null() { return; }
    let data = unsafe { core::slice::from_raw_parts(ptr, len as usize) }.to_vec();
    e.bank.set(id as usize, data);
}

/// Load a convolution impulse response (mono if `ptr_r` is null). Engine-rate samples.
#[no_mangle]
pub extern "C" fn vorp_ir_set(ptr_l: *const f32, ptr_r: *const f32, len: u32) {
    let Some(e) = eng() else { return };
    if ptr_l.is_null() || len == 0 { e.conv.clear(); return; }
    let l = unsafe { core::slice::from_raw_parts(ptr_l, len as usize) };
    let r = if ptr_r.is_null() { None } else { Some(unsafe { core::slice::from_raw_parts(ptr_r, len as usize) }) };
    e.conv.set_ir(l, r);
}

/// Offline helper for tools (vorp-lab): render a source *dry* (Pa at 1 m on axis) into `out`.
/// Returns the number of frames written (stops early when the source finishes).
#[no_mangle]
pub extern "C" fn vorp_render_source(kind: u32, params: *const f32, n_params: u32, out: *mut f32, frames: u32, sample_rate: f32) -> u32 {
    if params.is_null() || out.is_null() { return 0; }
    let p = unsafe { core::slice::from_raw_parts(params, n_params as usize) };
    let o = unsafe { core::slice::from_raw_parts_mut(out, frames as usize) };
    let bank = sources::sample::SampleBank::new();
    let Some(mut src) = sources::Source::create(kind, sample_rate, p) else { return 0 };
    let mut written = 0usize;
    let mut block = [0.0f32; util::BLOCK];
    while written < o.len() {
        let done = src.render(&bank, &mut block);
        let n = util::BLOCK.min(o.len() - written);
        o[written..written + n].copy_from_slice(&block[..n]);
        written += n;
        if done { break; }
    }
    written as u32
}
