// oAxis weapons: procedural real-scale firearm models + matching physical specs for fondaineGL's Firearm.
//
//   const { model, spec } = buildCompactPistol(engine.renderer);
//   const gun = engine.addScript(player, new Firearm(spec, model, controller));
//
// Each builder returns parts flagged for animation (slide/bolt, magazine, trigger); the Firearm animates them.

export * from './build';
export * from './compact-pistol';
export * from './carbine';
export * from './from-gltf';
export * from './scanned';
