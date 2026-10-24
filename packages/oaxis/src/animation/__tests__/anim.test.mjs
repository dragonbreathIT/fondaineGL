// Node test for the glTF loader + animation system.
// Bundles the TS sources with esbuild (honouring tsconfig path aliases) into the OS temp dir, then runs checks.
// Run: node packages/oaxis/src/animation/__tests__/anim.test.mjs

import { build } from 'esbuild';
import { mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import os from 'node:os';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../../../..');
const outDir = path.join(os.tmpdir(), 'fondaine-anim-test');
mkdirSync(outDir, { recursive: true });
const outfile = path.join(outDir, 'bundle.mjs');

await build({
  stdin: {
    contents: `
      export * from '@fondaine/oaxis/gltf';
      export * from '@fondaine/oaxis/animation';
      export { mat4, quat, vec3 } from '@fondaine/gl/math';
    `,
    resolveDir: root,
    loader: 'ts',
  },
  bundle: true,
  format: 'esm',
  platform: 'neutral',
  target: 'es2022',
  tsconfig: path.join(root, 'tsconfig.json'),
  outfile,
  logLevel: 'warning',
});

const M = await import(pathToFileURL(outfile).href + '?t=' + Date.now());
const { parseGLTF, AnimationClip, Skeleton, AnimationMixer, Pose, solveTwoBoneIK, solveAim, generateTangents, mat4, quat, vec3 } = M;

// ---------------------------------------------------------------- tiny test harness
let passed = 0, failed = 0;
function check(name, cond, detail = '') {
  if (cond) { passed++; console.log(`  ok   ${name}`); }
  else { failed++; console.log(`  FAIL ${name} ${detail}`); }
}
const near = (a, b, eps = 1e-5) => Math.abs(a - b) <= eps;
const nearArr = (a, b, eps = 1e-5) => a.length === b.length && Array.from(a).every((v, i) => near(v, b[i], eps));
const fmt = (a) => '[' + Array.from(a).map((v) => (+v).toFixed(5)).join(', ') + ']';

// ---------------------------------------------------------------- build binary buffer
class BufBuilder {
  constructor() { this.bytes = []; this.views = []; }
  align(n = 4) { while (this.bytes.length % n) this.bytes.push(0); }
  /** Append raw bytes from a typed array, return bufferView index. */
  view(typed, opts = {}) {
    this.align(4);
    const off = this.bytes.length;
    const u8 = new Uint8Array(typed.buffer, typed.byteOffset, typed.byteLength);
    for (const b of u8) this.bytes.push(b);
    const v = { buffer: 0, byteOffset: off, byteLength: u8.byteLength, ...opts };
    this.views.push(v);
    return this.views.length - 1;
  }
  dataUri() {
    this.align(4);
    return 'data:application/octet-stream;base64,' + Buffer.from(Uint8Array.from(this.bytes)).toString('base64');
  }
}

const B = new BufBuilder();
const accessors = [];
const acc = (a) => { accessors.push(a); return accessors.length - 1; };

// --- interleaved POSITION (float3) + TEXCOORD_0 (float2) with padding: stride 24 bytes
const triPos = [[0, 0, 0], [1, 0, 0], [0, 1, 0]];
const triUv = [[0, 0], [1, 0], [0, 1]];
const inter = new DataView(new ArrayBuffer(24 * 3));
triPos.forEach((p, i) => {
  p.forEach((v, k) => inter.setFloat32(i * 24 + k * 4, v, true));
  triUv[i].forEach((v, k) => inter.setFloat32(i * 24 + 12 + k * 4, v, true));
});
const interView = B.view(new Uint8Array(inter.buffer), { byteStride: 24 });
const aPos = acc({ bufferView: interView, byteOffset: 0, componentType: 5126, count: 3, type: 'VEC3' }); // no min/max -> computed
const aUv = acc({ bufferView: interView, byteOffset: 12, componentType: 5126, count: 3, type: 'VEC2' });

// --- KHR_mesh_quantization-style normalized SHORT normals (stride 8 for 4-byte alignment)
const nrm = new Int16Array([0, 0, 32767, 0, 0, 0, 32767, 0, 0, 0, 32767, 0]);
const aNrm = acc({ bufferView: B.view(nrm, { byteStride: 8 }), componentType: 5122, normalized: true, count: 3, type: 'VEC3' });

// --- JOINTS_0 UNSIGNED_BYTE, WEIGHTS_0 UNSIGNED_BYTE normalized (not summing to 1 -> renormalized)
const joints = new Uint8Array([0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0]);
const aJoints = acc({ bufferView: B.view(joints), componentType: 5121, count: 3, type: 'VEC4' });
const weights = new Uint8Array([128, 64, 0, 0, 255, 255, 0, 0, 0, 0, 0, 0]);
const aWeights = acc({ bufferView: B.view(weights), componentType: 5121, normalized: true, count: 3, type: 'VEC4' });

// --- indices UNSIGNED_SHORT
const aIdx = acc({ bufferView: B.view(new Uint16Array([0, 1, 2, 0])), componentType: 5123, count: 3, type: 'SCALAR' });

// --- sparse accessor: base 4 floats [1,2,3,4] with index 1 -> 20, index 3 -> 40
const sparseBase = B.view(new Float32Array([1, 2, 3, 4]));
const sparseIdx = B.view(new Uint8Array([1, 3, 0, 0]));
const sparseVal = B.view(new Float32Array([20, 40]));
const aSparse = acc({
  bufferView: sparseBase, componentType: 5126, count: 4, type: 'SCALAR',
  sparse: { count: 2, indices: { bufferView: sparseIdx, componentType: 5121 }, values: { bufferView: sparseVal } },
});
// sparse without bufferView (zeros + substitution)
const aSparseZero = acc({
  componentType: 5126, count: 4, type: 'SCALAR',
  sparse: { count: 2, indices: { bufferView: sparseIdx, componentType: 5121 }, values: { bufferView: sparseVal } },
});

// --- triangle strip, no normals, no indices (quad: 4 verts -> 2 triangles), normal map material -> tangents
const stripPos = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0]);
const stripUv = new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]);
const aStripPos = acc({ bufferView: B.view(stripPos), componentType: 5126, count: 4, type: 'VEC3', min: [0, 0, 0], max: [1, 1, 0] });
const aStripUv = acc({ bufferView: B.view(stripUv), componentType: 5126, count: 4, type: 'VEC2' });

// --- inverse bind matrices. Hierarchy: node0 "Armature" T(1,0,0) (non-joint) -> node1 joint0 -> node2 joint1 T(0,1,0)
// world(joint0) = T(1,0,0), world(joint1) = T(1,1,0)
const ibm = new Float32Array(32);
mat4.fromTranslation(ibm.subarray(0, 16), [-1, 0, 0]);
mat4.fromTranslation(ibm.subarray(16, 32), [-1, -1, 0]);
const aIbm = acc({ bufferView: B.view(ibm), componentType: 5126, count: 2, type: 'MAT4' });

// --- animation: rotation LINEAR on joint1 (identity -> 90deg about Z over 1s)
const s45 = Math.SQRT1_2;
const aRotT = acc({ bufferView: B.view(new Float32Array([0, 1])), componentType: 5126, count: 2, type: 'SCALAR', min: [0], max: [1] });
const aRotV = acc({ bufferView: B.view(new Float32Array([0, 0, 0, 1, 0, 0, s45, s45])), componentType: 5126, count: 2, type: 'VEC4' });
// translation CUBICSPLINE on joint0, keys at t=0 and t=2: [in, value, out] per key
//   key0: in=(0,0,0) value=(0,0,0) out=(3,0,0) ; key1: in=(0,0,0) value=(2,0,0) out=(0,0,0)
const aTrT = acc({ bufferView: B.view(new Float32Array([0, 2])), componentType: 5126, count: 2, type: 'SCALAR', min: [0], max: [2] });
const aTrV = acc({
  bufferView: B.view(new Float32Array([0, 0, 0, 0, 0, 0, 3, 0, 0, /* key1 */ 0, 0, 0, 2, 0, 0, 0, 0, 0])),
  componentType: 5126, count: 6, type: 'VEC3',
});

const imgView = B.view(new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));

const gltf = {
  asset: { version: '2.0', generator: 'fondaine-test' },
  extensionsUsed: ['KHR_mesh_quantization', 'KHR_texture_transform', 'KHR_materials_emissive_strength', 'KHR_lights_punctual'],
  extensionsRequired: ['KHR_mesh_quantization'],
  buffers: [{ uri: B.dataUri(), byteLength: B.bytes.length }],
  bufferViews: B.views,
  accessors,
  materials: [
    { name: 'skin', pbrMetallicRoughness: { baseColorFactor: [1, 0.5, 0.25, 1], metallicFactor: 0 },
      extensions: { KHR_materials_emissive_strength: { emissiveStrength: 5 } }, emissiveFactor: [1, 1, 1] },
    { name: 'normalmapped', normalTexture: { index: 0, scale: 0.5, extensions: { KHR_texture_transform: { offset: [0.5, 0], scale: [2, 2], rotation: 0.1 } } },
      occlusionTexture: { index: 1 } },
  ],
  // Image embedded via bufferView (fake PNG header bytes): in Node nothing is decoded, raw bytes go to imageData.
  images: [{ bufferView: imgView, mimeType: 'image/png', name: 'nrm' }],
  textures: [{ sampler: 0, source: 0 }, { sampler: 0 }], // texture 1 has no source -> textureInfo undefined
  samplers: [{ magFilter: 9728, minFilter: 9987, wrapS: 33071 }],
  meshes: [{
    name: 'tri',
    primitives: [
      { attributes: { POSITION: aPos, TEXCOORD_0: aUv, NORMAL: aNrm, JOINTS_0: aJoints, WEIGHTS_0: aWeights }, indices: aIdx, material: 0 },
      { attributes: { POSITION: aStripPos, TEXCOORD_0: aStripUv }, mode: 5, material: 1 },
    ],
  }],
  nodes: [
    { name: 'Armature', translation: [1, 0, 0], children: [1] },
    { name: 'joint0', children: [2] },
    { name: 'joint1', translation: [0, 1, 0] },
    { name: 'skinnedMesh', mesh: 0, skin: 0 },
    { name: 'matrixNode', matrix: [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 5, 6, 7, 1].map((v, i) => (i < 4 ? v * 2 : v)),
      extensions: { KHR_lights_punctual: { light: 0 } } },
  ],
  extensions: { KHR_lights_punctual: { lights: [{ type: 'spot', color: [1, 0.9, 0.8], intensity: 100, spot: { outerConeAngle: 0.5 } }] } },
  skins: [{ name: 'rig', joints: [1, 2], inverseBindMatrices: aIbm, skeleton: 1 }],
  animations: [{
    name: 'wave',
    channels: [
      { sampler: 0, target: { node: 2, path: 'rotation' } },
      { sampler: 1, target: { node: 1, path: 'translation' } },
    ],
    samplers: [
      { input: aRotT, output: aRotV, interpolation: 'LINEAR' },
      { input: aTrT, output: aTrV, interpolation: 'CUBICSPLINE' },
    ],
  }],
  scenes: [{ name: 'main', nodes: [0, 3, 4] }],
  scene: 0,
};

// ---------------------------------------------------------------- tests
console.log('glTF loader');
const asset = await parseGLTF(gltf, '');
const prim = asset.meshes[0].primitives[0];
check('no images in Node -> images empty, no crash', asset.images.length === 0);
check('interleaved positions (byteStride 24)', nearArr(prim.positions, [0, 0, 0, 1, 0, 0, 0, 1, 0]), fmt(prim.positions));
check('interleaved uvs', nearArr(prim.uvs, [0, 0, 1, 0, 0, 1]), fmt(prim.uvs));
check('normalized SHORT normals (strided)', nearArr(prim.normals, [0, 0, 1, 0, 0, 1, 0, 0, 1]), fmt(prim.normals));
check('UNSIGNED_BYTE joints -> Uint16Array', prim.joints instanceof Uint16Array && nearArr(prim.joints, [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0]));
check('weights renormalized to sum 1', nearArr(prim.weights.subarray(0, 4), [2 / 3, 1 / 3, 0, 0]) && nearArr(prim.weights.subarray(4, 8), [0.5, 0.5, 0, 0]) && nearArr(prim.weights.subarray(8, 12), [1, 0, 0, 0]), fmt(prim.weights));
check('indices as Uint32Array', prim.indices instanceof Uint32Array && nearArr(prim.indices, [0, 1, 2]));
check('bounds computed when min/max missing', nearArr(prim.bounds.min, [0, 0, 0]) && nearArr(prim.bounds.max, [1, 1, 0]));
check('material index', prim.material === 0);
const ctx = { json: gltf, buffers: [Uint8Array.from(B.bytes)] };
check('sparse accessor substitution', nearArr(M.readAccessorFloat(ctx, aSparse), [1, 20, 3, 40]));
check('sparse accessor without bufferView', nearArr(M.readAccessorFloat(ctx, aSparseZero), [0, 20, 0, 40]));
check('MAT4 accessor (inverseBindMatrices)', nearArr(asset.skins[0].inverseBindMatrices, ibm));

const strip = asset.meshes[0].primitives[1];
check('triangle strip -> 2 triangles, flat normals un-welded', strip.indices.length === 6 && strip.vertexCount === 6 && strip.generatedNormals);
check('flat normals = +Z (both strip triangles CCW)', nearArr(strip.normals, Array(6).fill([0, 0, 1]).flat()), fmt(strip.normals));
check('tangents generated for normal-mapped material', strip.generatedTangents && strip.tangents.length === 24);
// u increases along +X, v increases along -Y  => T = +X; glTF convention => bitangent = cross(N,T)*w = +Y*w should point to decreasing v (= +Y) => w = +1
check('generated tangent = +X, w = +1 (glTF convention)', nearArr(strip.tangents.subarray(0, 4), [1, 0, 0, 1]), fmt(strip.tangents.subarray(0, 4)));
const degenerate = generateTangents([0, 0, 0, 1, 0, 0, 0, 1, 0], [0, 0, 1, 0, 0, 1, 0, 0, 1], [0, 0, 0, 0, 0, 0], [0, 1, 2]);
check('degenerate UVs -> finite unit tangent perpendicular to N', degenerate.every(Number.isFinite) && near(Math.hypot(degenerate[0], degenerate[1], degenerate[2]), 1) && near(degenerate[2], 0));

const mat0 = asset.materials[0], mat1 = asset.materials[1];
check('material factors + emissive strength', nearArr(mat0.baseColorFactor, [1, 0.5, 0.25, 1]) && mat0.metallicFactor === 0 && mat0.roughnessFactor === 1 && mat0.emissiveStrength === 5);
check('normal scale read; texture without source -> undefined', mat1.normalScale === 0.5 && mat1.occlusionTexture === undefined);
const nt = mat1.normalTexture;
check('KHR_texture_transform + sampler decoded', nt && nt.image === 0 && nearArr(nt.transform.offset, [0.5, 0]) && nearArr(nt.transform.scale, [2, 2]) && near(nt.transform.rotation, 0.1)
  && nt.sampler.magFilter === 'nearest' && nt.sampler.minFilter === 'linear' && nt.sampler.mipmap && nt.sampler.wrapS === 'clamp-to-edge' && nt.sampler.wrapT === 'repeat');
check('raw image bytes kept in imageData', asset.imageData.length === 1 && asset.imageData[0].mimeType === 'image/png' && asset.imageData[0].data.length === 8);
const n4 = asset.nodes[4];
check('matrix decomposed into TRS', nearArr(n4.translation, [5, 6, 7]) && nearArr(n4.scale, [2, 1, 1]) && nearArr(n4.rotation, [0, 0, Math.SQRT1_2, Math.SQRT1_2]), `${fmt(n4.translation)} ${fmt(n4.rotation)} ${fmt(n4.scale)}`);
check('KHR_lights_punctual spot light on node', n4.light?.type === 'spot' && n4.light.intensity === 100 && near(n4.light.outerConeAngle, 0.5) && n4.light.innerConeAngle === 0);
check('node parents', asset.nodes[1].parent === 0 && asset.nodes[2].parent === 1 && asset.nodes[0].parent === -1);
check('animation decoded (duration 2, 2 channels)', asset.animations[0].duration === 2 && asset.animations[0].channels.length === 2 && asset.animations[0].samplers[1].components === 3);
let threw = '';
try { await parseGLTF({ ...gltf, extensionsRequired: ['KHR_draco_mesh_compression'] }, ''); } catch (e) { threw = String(e.message); }
check('unsupported required extension throws naming it', threw.includes('KHR_draco_mesh_compression'), threw);

// GLB round trip
{
  const jsonNoUri = { ...gltf, buffers: [{ byteLength: B.bytes.length }] };
  const jsonBytes = new TextEncoder().encode(JSON.stringify(jsonNoUri));
  const jsonPad = (4 - (jsonBytes.length % 4)) % 4;
  const bin = Uint8Array.from(B.bytes);
  const total = 12 + 8 + jsonBytes.length + jsonPad + 8 + bin.length;
  const glb = new Uint8Array(total);
  const dv = new DataView(glb.buffer);
  dv.setUint32(0, 0x46546c67, true); dv.setUint32(4, 2, true); dv.setUint32(8, total, true);
  dv.setUint32(12, jsonBytes.length + jsonPad, true); dv.setUint32(16, 0x4e4f534a, true);
  glb.set(jsonBytes, 20); glb.fill(0x20, 20 + jsonBytes.length, 20 + jsonBytes.length + jsonPad);
  const o = 20 + jsonBytes.length + jsonPad;
  dv.setUint32(o, bin.length, true); dv.setUint32(o + 4, 0x004e4942, true);
  glb.set(bin, o + 8);
  const a2 = await parseGLTF(glb.buffer, '');
  check('GLB container parses identically', nearArr(a2.meshes[0].primitives[0].positions, prim.positions) && a2.animations.length === 1);
}

console.log('AnimationClip');
const clip = AnimationClip.fromGLTF(asset, 0);
check('clip duration', clip.duration === 2);
const out4 = new Float32Array(4), out3 = new Float32Array(3);
const rotTrack = clip.tracks.findIndex((t) => t.path === 'rotation');
const trTrack = clip.tracks.findIndex((t) => t.path === 'translation');
clip.sampleTrack(rotTrack, 0.5, out4);
const s225 = Math.sin(Math.PI / 8), c225 = Math.cos(Math.PI / 8);
check('LINEAR slerp midpoint = 45deg about Z', nearArr(out4, [0, 0, s225, c225]), fmt(out4));
clip.sampleTrack(rotTrack, 0.25, out4);
check('LINEAR slerp quarter = 22.5deg about Z', nearArr(out4, [0, 0, Math.sin(Math.PI / 16), Math.cos(Math.PI / 16)]), fmt(out4));
clip.sampleTrack(rotTrack, 5, out4);
check('rotation clamps past end', nearArr(out4, [0, 0, s45, s45]));
clip.sampleTrack(trTrack, 0, out3);
check('CUBICSPLINE start == key0 value', nearArr(out3, [0, 0, 0]), fmt(out3));
clip.sampleTrack(trTrack, 2, out3);
check('CUBICSPLINE end == key1 value', nearArr(out3, [2, 0, 0]), fmt(out3));
clip.sampleTrack(trTrack, 1.999999, out3);
check('CUBICSPLINE approaches key1 continuously', nearArr(out3, [2, 0, 0], 1e-4), fmt(out3));
clip.sampleTrack(trTrack, 1, out3);
// u=.5: h00=.5 h10=.125 h01=.5 h11=-.125 ; td=2 ; = .125*2*3 + .5*2 = 1.75
check('CUBICSPLINE midpoint Hermite (tangents scaled by key delta)', nearArr(out3, [1.75, 0, 0]), fmt(out3));
// STEP
{
  const stepClip = new AnimationClip('step', [{ node: 0, path: 'translation', interpolation: 'STEP', times: new Float32Array([0, 1, 2]), values: new Float32Array([0, 0, 0, 1, 1, 1, 2, 2, 2]), components: 3 }]);
  stepClip.sampleTrack(0, 0.99, out3); const a = out3[0];
  stepClip.sampleTrack(0, 1.0, out3); const b = out3[0];
  stepClip.sampleTrack(0, 1.5, out3); const c = out3[0];
  check('STEP holds previous key', a === 0 && b === 1 && c === 1);
}
// Binary search with many keys, random access
{
  const n = 1000;
  const times = new Float32Array(n), values = new Float32Array(n);
  for (let i = 0; i < n; i++) { times[i] = i * 0.01; values[i] = i; }
  const big = new AnimationClip('big', [{ node: 0, path: 'scale', interpolation: 'LINEAR', times, values, components: 1 }]);
  const o = [0];
  let ok = true;
  for (const t of [5.005, 0.015, 9.985, 3.333, 3.334, 0, 9.99]) { big.sampleTrack(0, t, o); if (!near(o[0], t * 100, 1e-2)) ok = false; }
  check('binary search + cursor, random access', ok);
}

console.log('Skeleton');
const skel = Skeleton.fromGLTF(asset, 0);
check('joint parents within skin', skel.parents[0] === -1 && skel.parents[1] === 0);
check('non-joint parent baked into preTransform', skel.preTransforms[0] !== null && near(skel.preTransforms[0][12], 1) && skel.preTransforms[1] === null);
const jm = new Float32Array(skel.jointCount * 16);
skel.computeJointMatrices(mat4.create(), jm, skel.restPose);
const I = mat4.create();
check('rest pose * inverseBind = identity (both joints)', nearArr(jm.subarray(0, 16), I) && nearArr(jm.subarray(16, 32), I), fmt(jm));
{
  const rw = mat4.fromTranslation(mat4.create(), [0, 0, 10]);
  skel.computeJointMatrices(rw, jm, skel.restPose);
  check('rootWorld propagates into joint matrices', nearArr(jm.subarray(0, 16), rw) && nearArr(jm.subarray(16, 32), rw));
}

console.log('AnimationMixer');
{
  const mixer = new AnimationMixer(skel);
  mixer.play(clip, { loop: false });
  mixer.update(0.5);
  const q = mixer.pose.getRotation(1, quat.create());
  check('mixer samples clip into pose (joint1 @0.5s)', nearArr(q, [0, 0, s225, c225]), fmt(q));
  // world of joint1 at t=.5: translation T(1,0,0)*T(x0) ; joint matrix of joint0 = T(x0) with cubic x0(0.5)
  clip.sampleTrack(trTrack, 0.5, out3);
  check('joint matrix reflects animated translation', near(mixer.jointMatrices[12], out3[0]), `${mixer.jointMatrices[12]} vs ${out3[0]}`);

  // Crossfade
  const clipB = new AnimationClip('B', [{ node: 2, path: 'rotation', interpolation: 'LINEAR', times: new Float32Array([0, 1]), values: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1]), components: 4 }]);
  const mixer2 = new AnimationMixer(skel);
  const aA = mixer2.play(clip, { loop: true });
  mixer2.update(0.1);
  const aB = mixer2.play(clipB, { fadeIn: 0.5 });
  let sumsOk = true, monotonic = true, last = -1;
  const weightsSeen = [];
  for (let i = 0; i < 12; i++) {
    mixer2.update(0.05);
    const wa = mixer2.layers[0].actions.includes(aA) ? aA.effectiveWeight : 0;
    const wb = aB.effectiveWeight;
    weightsSeen.push(wb.toFixed(3));
    if (!near(wa + wb, 1, 1e-9)) sumsOk = false;
    if (wb < last - 1e-12) monotonic = false;
    last = wb;
  }
  check('crossfade weights sum to 1 throughout', sumsOk, weightsSeen.join(' '));
  check('crossfade weight is monotonic and smooth (smoothstep)', monotonic && near(last, 1));
  check('faded-out action removed', !mixer2.layers[0].actions.includes(aA) && mixer2.layers[0].actions.length === 1);

  // Events with looping
  const evClip = new AnimationClip('ev', [{ node: 2, path: 'rotation', interpolation: 'LINEAR', times: new Float32Array([0, 1]), values: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1]), components: 4 }]);
  evClip.addEvent(0.5, 'step').addEvent(0.9, 'late');
  const mixer3 = new AnimationMixer(skel);
  const fired = [];
  mixer3.onEvent((e) => fired.push(e.name));
  mixer3.play(evClip, { loop: true });
  mixer3.update(0.4); // 0 -> .4
  mixer3.update(0.4); // .4 -> .8 : step
  mixer3.update(0.4); // .8 -> 1.2 (wrap) : late
  mixer3.update(0.4); // .2 -> .6 : step
  check('events fire when crossed, across loop wrap', fired.join(',') === 'step,late,step', fired.join(','));

  // Additive: delta relative to first frame, applied on top of rest pose
  const mixer4 = new AnimationMixer(skel, [{}, { mode: 'additive' }]);
  mixer4.play(clip, { layer: 1, loop: false });
  mixer4.update(1.0);
  const qa = mixer4.pose.getRotation(1, quat.create());
  check('additive layer applies rotation delta (90deg Z on joint1)', nearArr(qa, [0, 0, s45, s45]), fmt(qa));
  const ta = mixer4.pose.getTranslation(0, vec3.create());
  clip.sampleTrack(trTrack, 1.0, out3);
  check('additive translation delta = sampled - firstFrame', nearArr(ta, out3), `${fmt(ta)} vs ${fmt(out3)}`);

  // Mask: base layer 0 rest, layer 1 with mask only joint1
  const mixer5 = new AnimationMixer(skel, [{}, { mask: skel.makeMask(1) }]);
  mixer5.play(clip, { layer: 1, loop: false });
  mixer5.update(1.0);
  const t5 = mixer5.pose.getTranslation(0, vec3.create());
  const q5 = mixer5.pose.getRotation(1, quat.create());
  check('bone mask: joint0 untouched, joint1 animated', nearArr(t5, [0, 0, 0]) && nearArr(q5, [0, 0, s45, s45]));

  // Root motion: joint0 translates along X; extracted and removed from pose
  const mixer6 = new AnimationMixer(skel);
  mixer6.setRootMotion('joint0');
  mixer6.play(clip, { loop: false });
  let total = 0;
  for (let i = 0; i < 20; i++) { mixer6.update(0.1); total += mixer6.rootMotion.deltaTranslation[0]; }
  const t6 = mixer6.pose.getTranslation(0, vec3.create());
  check('root motion accumulates to clip displacement (2 in X)', near(total, 2, 1e-4), String(total));
  check('root motion removed from pose', nearArr(t6, [0, 0, 0]));
}

console.log('IK');
{
  // 3-joint arm: shoulder at (0,1,0) under a non-joint parent rotated 30deg about Y; upper arm 1 along +X, forearm 1 along +X.
  const ry = quat.setAxisAngle(quat.create(), [0, 1, 0], Math.PI / 6);
  const elbowBend = quat.setAxisAngle(quat.create(), [0, 0, 1], 0.3);
  const nodes = [
    { name: 'body', children: [1], parent: -1, translation: [0, 1, 0], rotation: Array.from(ry), scale: [1, 1, 1] },
    { name: 'shoulder', children: [2], parent: 0, translation: [0, 0.2, 0], rotation: [0, 0, 0, 1], scale: [1, 1, 1] },
    { name: 'elbow', children: [3], parent: 1, translation: [1, 0, 0], rotation: Array.from(elbowBend), scale: [1, 1, 1] },
    { name: 'hand', children: [], parent: 2, translation: [1, 0, 0], rotation: [0, 0, 0, 1], scale: [1, 1, 1] },
  ];
  const ib = new Float32Array(48);
  for (let j = 0; j < 3; j++) mat4.identity(ib.subarray(j * 16, j * 16 + 16));
  const armSkel = new Skeleton({ name: 'arm', joints: [1, 2, 3], inverseBindMatrices: ib }, nodes);
  const rootWorld = mat4.fromRotationTranslationScale(mat4.create(), quat.setAxisAngle(quat.create(), [1, 0, 0], 0.2), [3, 0, -2], [1, 1, 1]);
  const handWorld = (pose) => mat4.getTranslation(vec3.create(), armSkel.jointWorldMatrix(pose, 2, rootWorld, mat4.create()));
  const elbowWorld = (pose) => mat4.getTranslation(vec3.create(), armSkel.jointWorldMatrix(pose, 1, rootWorld, mat4.create()));
  const shoulderWorld = mat4.getTranslation(vec3.create(), armSkel.jointWorldMatrix(armSkel.restPose, 0, rootWorld, mat4.create()));

  const targets = [[0.5, 0.6, 0.4], [-0.8, 0.9, 0.3], [0.2, -1.2, 0.9], [1.1, 0.4, -0.9]];
  let allOk = true, worst = 0;
  for (const off of targets) {
    for (const usePole of [false, true]) {
      const pose = armSkel.restPose.clone();
      const target = vec3.add(vec3.create(), shoulderWorld, vec3.create(...off));
      const pole = vec3.add(vec3.create(), shoulderWorld, vec3.create(0, 0, -2));
      const err = solveTwoBoneIK(armSkel, pose, { root: 0, mid: 1, end: 2, target, rootWorld, pole: usePole ? pole : undefined });
      const h = handWorld(pose);
      const d = vec3.distance(h, target);
      worst = Math.max(worst, d);
      if (!(d < 1e-3 && near(err, d, 1e-6))) allOk = false;
      // bone lengths preserved
      const e = elbowWorld(pose);
      if (!near(vec3.distance(shoulderWorld, e), 1, 1e-4) || !near(vec3.distance(e, h), 1, 1e-4)) allOk = false;
      if (usePole) {
        // elbow should be on the pole side of the shoulder->target line
        const st = vec3.sub(vec3.create(), target, shoulderWorld); vec3.normalize(st, st);
        const se = vec3.sub(vec3.create(), e, shoulderWorld);
        const sp = vec3.sub(vec3.create(), pole, shoulderWorld);
        const perpE = vec3.scaleAndAdd(vec3.create(), se, st, -vec3.dot(se, st));
        const perpP = vec3.scaleAndAdd(vec3.create(), sp, st, -vec3.dot(sp, st));
        if (vec3.dot(perpE, perpP) <= 0) allOk = false;
      }
    }
  }
  check('two-bone IK reaches reachable targets within 1e-3 (with & without pole, bone lengths kept)', allOk, `worst=${worst}`);

  // Straight chain start (singular): rest with zero elbow bend
  const nodesStraight = nodes.map((n) => ({ ...n, rotation: n.name === 'elbow' ? [0, 0, 0, 1] : n.rotation }));
  const straight = new Skeleton({ name: 'arm', joints: [1, 2, 3], inverseBindMatrices: ib }, nodesStraight);
  const ps = straight.restPose.clone();
  const sW = mat4.getTranslation(vec3.create(), straight.jointWorldMatrix(ps, 0, undefined, mat4.create()));
  const tgt = vec3.add(vec3.create(), sW, vec3.create(0.3, 0.9, 0.2));
  const errS = solveTwoBoneIK(straight, ps, { root: 0, mid: 1, end: 2, target: tgt });
  check('two-bone IK from fully straight chain', errS < 1e-3, String(errS));

  // Unreachable target: arm points at it, fully extended
  const pu = armSkel.restPose.clone();
  const far = vec3.add(vec3.create(), shoulderWorld, vec3.create(5, 0, 0));
  solveTwoBoneIK(armSkel, pu, { root: 0, mid: 1, end: 2, target: far, rootWorld });
  const hu = handWorld(pu);
  const dirH = vec3.normalize(vec3.create(), vec3.sub(vec3.create(), hu, shoulderWorld));
  check('unreachable target: chain extends toward it', near(dirH[0], 1, 1e-3) && near(vec3.distance(hu, shoulderWorld), 2, 1e-3));

  // Aim
  const pa = armSkel.restPose.clone();
  const aimTarget = vec3.create(0, 5, 0);
  const rem = solveAim(armSkel, pa, { joint: 0, target: aimTarget, localAxis: [1, 0, 0], rootWorld });
  const mS = armSkel.jointWorldMatrix(pa, 0, rootWorld, mat4.create());
  const ax = vec3.normalize(vec3.create(), vec3.transformDirMat4(vec3.create(), [1, 0, 0], mS));
  const want = vec3.normalize(vec3.create(), vec3.sub(vec3.create(), aimTarget, mat4.getTranslation(vec3.create(), mS)));
  check('aim constraint points local axis at target', rem < 1e-6 && vec3.dot(ax, want) > 1 - 1e-5);
  const pl = armSkel.restPose.clone();
  const m0 = armSkel.jointWorldMatrix(pl, 0, rootWorld, mat4.create());
  const ax0 = vec3.normalize(vec3.create(), vec3.transformDirMat4(vec3.create(), [1, 0, 0], m0));
  solveAim(armSkel, pl, { joint: 0, target: aimTarget, localAxis: [1, 0, 0], rootWorld, maxAngle: 0.2 });
  const m1 = armSkel.jointWorldMatrix(pl, 0, rootWorld, mat4.create());
  const ax1 = vec3.normalize(vec3.create(), vec3.transformDirMat4(vec3.create(), [1, 0, 0], m1));
  check('aim angle limit respected', near(Math.acos(Math.min(1, vec3.dot(ax0, ax1))), 0.2, 1e-4));
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
