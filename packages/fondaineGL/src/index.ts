// fondaineGL — the main module  "/f"
// Realism-first WebGPU renderer + engine runtime (ECS, scripting, input, Rust/WASM physics, tuning, dev panel)
// + gameplay systems (FPS controller, firearms, impacts, surfaces).
// Companion modules: vorp (audio, '@fondaine/vorp') and oAxis (models & animation, '@fondaine/oaxis').

export * from './gl';
export * from './runtime/ecs';
export * from './runtime/transform';
export * from './runtime/script';
export * from './runtime/input';
export * from './runtime/tuning';
export * from './runtime/devui';
export * from './runtime/physics';
export * from './runtime/audio';
export * from './runtime/engine';
export * from './runtime/gi-baker';
export * from './runtime/tuning-presets';
export * from './gameplay/surfaces';
export * from './gameplay/fps-controller';
export * from './gameplay/firearm';
export * from './gameplay/impacts';
