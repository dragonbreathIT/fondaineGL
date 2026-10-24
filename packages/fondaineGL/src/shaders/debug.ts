// Debug visualisations written into an rgba16float texture shown by the composite pass.
// 1 normals, 2 AO, 3 velocity, 4 linear depth, 5 absolute luminance false colour, 6 exposure-normalised HDR.
// 7 sky visibility, 8 ambient diffuse only, 9 direct light only (written by the mesh shader, shown raw here).

export const DEBUG_WGSL = /* wgsl */ `
struct P { mode: f32, near: f32, w: f32, h: f32 };
struct Exposure { current: f32, ev100: f32, targetEv100: f32, previous: f32 };
@group(0) @binding(0) var<uniform> U: P;
@group(0) @binding(1) var normalTex: texture_2d<f32>;
@group(0) @binding(2) var aoTex: texture_2d<f32>;
@group(0) @binding(3) var velTex: texture_2d<f32>;
@group(0) @binding(4) var depthTex: texture_depth_2d;
@group(0) @binding(5) var hdrTex: texture_2d<f32>;
@group(0) @binding(6) var<storage, read> exposure: Exposure;
@group(0) @binding(7) var outTex: texture_storage_2d<rgba16float, write>;

fn heat(t: f32) -> vec3f {
  // perceptual-ish ramp: black → blue → cyan → green → yellow → red → white
  let c = clamp(t, 0.0, 1.0) * 6.0;
  let i = floor(c);
  let f = c - i;
  var stops = array<vec3f, 7>(vec3f(0.0), vec3f(0.0, 0.1, 0.8), vec3f(0.0, 0.8, 0.9), vec3f(0.1, 0.8, 0.1), vec3f(0.95, 0.9, 0.1), vec3f(0.95, 0.1, 0.05), vec3f(1.0));
  let a = stops[u32(min(i, 6.0))];
  let b = stops[u32(min(i + 1.0, 6.0))];
  return mix(a, b, f);
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let px = vec2i(id.xy);
  if (f32(px.x) >= U.w || f32(px.y) >= U.h) { return; }
  let mode = u32(U.mode + 0.5);
  var c = vec3f(0.0);
  switch (mode) {
    case 1u: { c = textureLoad(normalTex, px, 0).xyz * 0.5 + 0.5; }
    case 2u: { c = vec3f(textureLoad(aoTex, px, 0).r); }
    case 3u: { let v = textureLoad(velTex, px, 0).xy * vec2f(U.w, U.h) * 0.05; c = vec3f(0.5 + v.x, 0.5 + v.y, 0.5); }
    case 4u: { let d = textureLoad(depthTex, px, 0); let z = select(1e5, U.near / max(d, 1e-9), d > 0.0); c = vec3f(fract(log2(z) * 0.5)); }
    case 5u: {
      // absolute luminance (cd/m²) on a log scale: 1e-2 .. 1e6
      let L = dot(textureLoad(hdrTex, px, 0).rgb / max(exposure.current, 1e-20), vec3f(0.2126, 0.7152, 0.0722));
      c = heat((log2(max(L, 1e-3)) + 6.64) / 26.6);
    }
    default: { c = textureLoad(hdrTex, px, 0).rgb; }
  }
  textureStore(outTex, px, vec4f(c, 1.0));
}
`;
