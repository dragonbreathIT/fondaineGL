// oAxis — models & animation module for fondaine.
//   gltf/       glTF 2.0 / GLB loader (pure data) + tangent generation
//   animation/  skeletons, clips, layered mixer, two-bone / aim IK
//   weapons/    procedural, real-scale firearm models with ready-to-use physical specs
//   vegetation/ geometric grass fields (wind-animated, translucent blades), procedural treelines
//   props/      range props (ammo can, ammo boxes, sandbags, earmuffs, brass scatter)
//   viewmodel/  first-person skinned hands + arms (finger FK from weapon grips fitted to the weapon geometry, two-bone arm IK)
// Depends on fondaineGL (meshes, materials, renderer) and vorp (weapon audio presets).

export * from './gltf';
export * as animation from './animation';
export * from './weapons';
export * from './vegetation/grass';
export * from './vegetation/trees';
export * from './viewmodel/hands';
export * from './viewmodel/grip-fit';
export * from './viewmodel/skinned-arms';
export * from './props/range-props';
export * from './lod/instanced-lod';
export * from './assets/library';
export * from './tuning';
