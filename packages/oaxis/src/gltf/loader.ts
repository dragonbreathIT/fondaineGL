// fondaineGL glTF 2.0 loader — .glb / .gltf (external + data: URIs) -> GLTFAsset. Pure data, no GPU code.

import {
  GL,
  type GLTFAnimation, type GLTFAnimationSampler, type GLTFAsset, type GLTFCamera, type GLTFImageData, type GLTFLight,
  type GLTFMaterial, type GLTFMesh, type GLTFNode, type GLTFPrimitive, type GLTFSampler, type GLTFSkin,
  type GLTFTextureInfo, type GLTFTextureTransform, type JSONObject, type RawGLTF, type RawPrimitive, type RawTextureInfo,
} from './gltf';
import { MeshoptDecoder } from 'meshoptimizer/decoder';
import { type AccessorContext, accessorComponents, getAccessor, getBufferView, readAccessorFloat, readAccessorUint } from './accessors';
import { computeBounds, convertTopology, flatNormalsUnwelded, generateTangents, unweldAttribute } from './geometry';

export interface GLTFLoadOptions {
  /** Custom fetch (defaults to globalThis.fetch). */
  fetch?: typeof fetch;
  /** Decode images with createImageBitmap when available (default true). */
  decodeImages?: boolean;
}

/** Extensions we understand. Anything in `extensionsRequired` outside this set throws. */
export const SUPPORTED_EXTENSIONS: readonly string[] = [
  'KHR_mesh_quantization',
  'KHR_texture_transform',
  'KHR_materials_emissive_strength',
  'KHR_materials_unlit',
  'KHR_lights_punctual',
  'KHR_materials_ior',
  'KHR_materials_specular',
  'KHR_materials_clearcoat',
  'KHR_materials_transmission',
  'EXT_meshopt_compression',
  'KHR_meshopt_compression',
];

/** Known extensions we explicitly cannot decode. */
const UNSUPPORTED_COMPRESSION = ['KHR_draco_mesh_compression', 'KHR_texture_basisu'];

const GLB_MAGIC = 0x46546c67; // 'glTF'
const CHUNK_JSON = 0x4e4f534a; // 'JSON'
const CHUNK_BIN = 0x004e4942;  // 'BIN\0'

export async function loadGLTF(url: string, opts: GLTFLoadOptions = {}): Promise<GLTFAsset> {
  const f = opts.fetch ?? globalThis.fetch;
  if (!f) throw new Error('glTF: no fetch implementation available');
  const res = await f(url);
  if (!res.ok) throw new Error(`glTF: failed to fetch ${url}: ${res.status} ${res.statusText}`);
  const data = await res.arrayBuffer();
  return parseGLTFInternal(data, baseOf(url), opts);
}

export function parseGLTF(data: ArrayBuffer | object, baseUrl: string, opts: GLTFLoadOptions = {}): Promise<GLTFAsset> {
  return parseGLTFInternal(data, baseUrl, opts);
}

// ---------------------------------------------------------------- container parsing

function baseOf(url: string): string {
  const q = url.search(/[?#]/);
  const path = q >= 0 ? url.slice(0, q) : url;
  const i = path.lastIndexOf('/');
  return i >= 0 ? path.slice(0, i + 1) : '';
}

function resolveUri(uri: string, base: string): string {
  if (/^(data:|blob:|[a-z][a-z0-9+.-]*:\/\/)/i.test(uri) || uri.startsWith('/')) return uri;
  if (!base) return uri;
  try { return new URL(uri, base).href; } catch { return base + uri; }
}

function decodeDataUri(uri: string): { bytes: Uint8Array; mimeType: string } {
  const comma = uri.indexOf(',');
  if (comma < 0) throw new Error('glTF: malformed data: URI');
  const header = uri.slice(5, comma);
  const payload = uri.slice(comma + 1);
  const isB64 = /;base64$/i.test(header);
  const mimeType = header.replace(/;base64$/i, '').split(';')[0] || 'application/octet-stream';
  if (isB64) {
    const bin = atob(payload);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return { bytes, mimeType };
  }
  return { bytes: new TextEncoder().encode(decodeURIComponent(payload)), mimeType };
}

function isArrayBufferLike(d: unknown): d is ArrayBuffer {
  return d instanceof ArrayBuffer || (typeof SharedArrayBuffer !== 'undefined' && d instanceof SharedArrayBuffer);
}

function splitContainer(data: ArrayBuffer | object): { json: RawGLTF; glbBin?: Uint8Array } {
  if (ArrayBuffer.isView(data)) {
    const v = data as ArrayBufferView;
    data = (v.buffer as ArrayBuffer).slice(v.byteOffset, v.byteOffset + v.byteLength);
  }
  if (!isArrayBufferLike(data)) return { json: data as RawGLTF };
  const bytes = new Uint8Array(data);
  const dv = new DataView(data);
  if (bytes.byteLength >= 12 && dv.getUint32(0, true) === GLB_MAGIC) {
    const version = dv.getUint32(4, true);
    if (version !== 2) throw new Error(`glTF: unsupported GLB version ${version}`);
    const length = Math.min(dv.getUint32(8, true), bytes.byteLength);
    let off = 12;
    let json: RawGLTF | undefined;
    let glbBin: Uint8Array | undefined;
    while (off + 8 <= length) {
      const chunkLen = dv.getUint32(off, true);
      const chunkType = dv.getUint32(off + 4, true);
      off += 8;
      if (off + chunkLen > length) throw new Error('glTF: GLB chunk overruns file');
      const chunk = bytes.subarray(off, off + chunkLen);
      if (chunkType === CHUNK_JSON && !json) json = JSON.parse(new TextDecoder().decode(chunk)) as RawGLTF;
      else if (chunkType === CHUNK_BIN && !glbBin) glbBin = chunk;
      off += chunkLen + ((4 - (chunkLen % 4)) % 4);
    }
    if (!json) throw new Error('glTF: GLB has no JSON chunk');
    return { json, glbBin };
  }
  // Text .gltf in an ArrayBuffer (skip UTF-8 BOM).
  let text = new TextDecoder().decode(bytes);
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  return { json: JSON.parse(text) as RawGLTF };
}

// ---------------------------------------------------------------- main

async function parseGLTFInternal(data: ArrayBuffer | object, baseUrl: string, opts: GLTFLoadOptions): Promise<GLTFAsset> {
  const { json, glbBin } = splitContainer(data);
  if (!json || typeof json !== 'object' || !json.asset) throw new Error('glTF: missing "asset" property — not a glTF 2.0 file');
  const major = parseInt(String(json.asset.minVersion ?? json.asset.version ?? '2'), 10);
  if (major !== 2) throw new Error(`glTF: unsupported version ${json.asset.version} (only 2.x)`);

  const extensionsUsed = json.extensionsUsed ?? [];
  const extensionsRequired = json.extensionsRequired ?? [];
  for (const ext of extensionsRequired) {
    if (UNSUPPORTED_COMPRESSION.includes(ext)) {
      throw new Error(`glTF: required extension "${ext}" is not supported by fondaineGL's loader (decompress the asset, e.g. with gltf-transform, first)`);
    }
    if (!SUPPORTED_EXTENSIONS.includes(ext)) throw new Error(`glTF: required extension "${ext}" is not supported`);
  }

  const fetchFn = opts.fetch ?? (typeof globalThis.fetch === 'function' ? globalThis.fetch.bind(globalThis) : undefined);
  const fetchBytes = async (uri: string): Promise<{ bytes: Uint8Array; mimeType: string }> => {
    if (uri.startsWith('data:')) return decodeDataUri(uri);
    if (!fetchFn) throw new Error(`glTF: cannot load external resource "${uri}" — no fetch available`);
    const url = resolveUri(uri, baseUrl);
    const r = await fetchFn(url);
    if (!r.ok) throw new Error(`glTF: failed to fetch ${url}: ${r.status} ${r.statusText}`);
    return { bytes: new Uint8Array(await r.arrayBuffer()), mimeType: r.headers.get('content-type') ?? '' };
  };

  // Buffers
  const buffers = await Promise.all((json.buffers ?? []).map(async (b, i) => {
    const mx = (b.extensions?.EXT_meshopt_compression ?? b.extensions?.KHR_meshopt_compression) as { fallback?: boolean } | undefined;
    if (b.uri === undefined && mx?.fallback) return new Uint8Array(b.byteLength); // placeholder: filled by meshopt decode
    if (b.uri === undefined) {
      if (i !== 0 || !glbBin) throw new Error(`glTF: buffer ${i} has no uri and no GLB BIN chunk`);
      return glbBin;
    }
    const { bytes } = await fetchBytes(b.uri);
    if (bytes.byteLength < b.byteLength) throw new Error(`glTF: buffer ${i} is ${bytes.byteLength} bytes, expected ${b.byteLength}`);
    return bytes;
  }));
  // EXT_meshopt_compression: decode compressed buffer views into fresh buffers before any accessor reads them
  const meshoptViews = (json.bufferViews ?? []).filter((v) => v.extensions?.EXT_meshopt_compression || v.extensions?.KHR_meshopt_compression);
  if (meshoptViews.length) {
    await MeshoptDecoder.ready;
    for (const v of meshoptViews) {
      const e = (v.extensions!.EXT_meshopt_compression ?? v.extensions!.KHR_meshopt_compression) as { buffer: number; byteOffset?: number; byteLength: number; byteStride: number; count: number; mode: string; filter?: string };
      const src = buffers[e.buffer].subarray(e.byteOffset ?? 0, (e.byteOffset ?? 0) + e.byteLength);
      const out = new Uint8Array(e.count * e.byteStride);
      MeshoptDecoder.decodeGltfBuffer(out, e.count, e.byteStride, src, e.mode, e.filter);
      buffers.push(out);
      v.buffer = buffers.length - 1;
      v.byteOffset = 0;
      v.byteLength = out.byteLength;
      if (e.mode === 'ATTRIBUTES') v.byteStride = e.byteStride;
      delete v.extensions!.EXT_meshopt_compression;
      delete v.extensions!.KHR_meshopt_compression;
    }
  }
  const ctx: AccessorContext = { json, buffers };

  // Images (raw bytes always; decoded when possible)
  const imageData: GLTFImageData[] = await Promise.all((json.images ?? []).map(async (img, i) => {
    if (img.bufferView !== undefined) {
      const { bytes } = getBufferView(ctx, img.bufferView);
      return { name: img.name ?? `image${i}`, mimeType: img.mimeType ?? sniffMime(bytes), data: bytes };
    }
    if (img.uri === undefined) throw new Error(`glTF: image ${i} has neither uri nor bufferView`);
    const { bytes, mimeType } = await fetchBytes(img.uri);
    return { name: img.name ?? img.uri.slice(0, 64), mimeType: img.mimeType ?? (mimeType.startsWith('image/') ? mimeType : sniffMime(bytes)), data: bytes };
  }));
  const images: ImageBitmap[] = [];
  if ((opts.decodeImages ?? true) && typeof globalThis.createImageBitmap === 'function' && typeof Blob !== 'undefined') {
    const decoded = await Promise.all(imageData.map((d) =>
      createImageBitmap(new Blob([d.data as BlobPart], { type: d.mimeType }), { colorSpaceConversion: 'none', premultiplyAlpha: 'none' })));
    images.push(...decoded);
  }

  const lights = parseLights(json);
  const materials = (json.materials ?? []).map((_, i) => parseMaterial(json, i));
  const meshes = (json.meshes ?? []).map((_, i) => parseMesh(ctx, i, materials));
  const nodes = parseNodes(json, lights);
  const skins = (json.skins ?? []).map((s, i): GLTFSkin => {
    const n = s.joints.length;
    let ibm: Float32Array;
    if (s.inverseBindMatrices !== undefined) {
      ibm = readAccessorFloat(ctx, s.inverseBindMatrices);
      if (ibm.length < n * 16) throw new Error(`glTF: skin ${i} inverseBindMatrices has ${ibm.length / 16} matrices for ${n} joints`);
      if (ibm.length > n * 16) ibm = ibm.slice(0, n * 16);
    } else {
      ibm = new Float32Array(n * 16);
      for (let j = 0; j < n; j++) { ibm[j * 16] = ibm[j * 16 + 5] = ibm[j * 16 + 10] = ibm[j * 16 + 15] = 1; }
    }
    return { name: s.name ?? `skin${i}`, joints: s.joints.slice(), inverseBindMatrices: ibm, skeleton: s.skeleton };
  });
  const animations = (json.animations ?? []).map((_, i) => parseAnimation(ctx, i));
  const cameras = (json.cameras ?? []).map((c, i): GLTFCamera => ({
    name: c.name ?? `camera${i}`,
    type: c.type === 'orthographic' ? 'orthographic' : 'perspective',
    perspective: c.perspective ? { ...c.perspective } : undefined,
    orthographic: c.orthographic ? { ...c.orthographic } : undefined,
  }));

  let scenes = (json.scenes ?? []).map((s, i) => ({ name: s.name ?? `scene${i}`, nodes: (s.nodes ?? []).slice() }));
  if (scenes.length === 0 && nodes.length > 0) {
    scenes = [{ name: 'scene0', nodes: nodes.map((n, i) => (n.parent < 0 ? i : -1)).filter((i) => i >= 0) }];
  }

  return {
    meshes, materials, images, nodes, scenes, scene: json.scene ?? 0, skins, animations,
    extensionsUsed: extensionsUsed.slice(), imageData, cameras, lights, extensionsRequired: extensionsRequired.slice(),
  };
}

function sniffMime(b: Uint8Array): string {
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'image/png';
  if (b[0] === 0xff && b[1] === 0xd8) return 'image/jpeg';
  if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45) return 'image/webp';
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return 'image/gif';
  if (b[4] === 0x66 && b[5] === 0x74 && b[6] === 0x79 && b[7] === 0x70) return 'image/avif';
  return 'application/octet-stream';
}

// ---------------------------------------------------------------- materials

const num = (v: unknown, d: number): number => (typeof v === 'number' && Number.isFinite(v) ? v : d);
const ext = (o: { extensions?: JSONObject } | undefined, name: string): JSONObject | undefined =>
  o?.extensions?.[name] as JSONObject | undefined;

function parseSampler(json: RawGLTF, index: number | undefined): GLTFSampler {
  const s = index !== undefined ? json.samplers?.[index] : undefined;
  const wrap = (w: number | undefined): GPUAddressMode =>
    w === GL.CLAMP_TO_EDGE ? 'clamp-to-edge' : w === GL.MIRRORED_REPEAT ? 'mirror-repeat' : 'repeat';
  const min = s?.minFilter;
  const mag = s?.magFilter;
  const mipmap = min === undefined || min >= GL.NEAREST_MIPMAP_NEAREST; // undefined => implementation choice: mip
  const minFilter: 'linear' | 'nearest' =
    min === GL.NEAREST || min === GL.NEAREST_MIPMAP_NEAREST || min === GL.NEAREST_MIPMAP_LINEAR ? 'nearest' : 'linear';
  const mipmapFilter: 'linear' | 'nearest' = min === GL.NEAREST_MIPMAP_NEAREST || min === GL.LINEAR_MIPMAP_NEAREST ? 'nearest' : 'linear';
  return {
    magFilter: mag === GL.NEAREST ? 'nearest' : 'linear',
    minFilter, mipmap, mipmapFilter,
    wrapS: wrap(s?.wrapS), wrapT: wrap(s?.wrapT),
  };
}

function parseTextureInfo(json: RawGLTF, info: RawTextureInfo | undefined): GLTFTextureInfo | undefined {
  if (!info) return undefined;
  const tex = json.textures?.[info.index];
  if (!tex) return undefined;
  if (ext(tex, 'KHR_texture_basisu') && tex.source === undefined) {
    throw new Error('glTF: extension "KHR_texture_basisu" is not supported (texture has no fallback source)');
  }
  // Prefer source; fall back to EXT_texture_webp / MSFT_texture_dds-style sources if present.
  let source = tex.source;
  if (source === undefined) {
    for (const k of ['EXT_texture_webp', 'EXT_texture_avif']) {
      const e = ext(tex, k);
      if (e && typeof e.source === 'number') { source = e.source; break; }
    }
  }
  if (source === undefined) return undefined;
  let texCoord = info.texCoord ?? 0;
  let transform: GLTFTextureTransform | undefined;
  const tt = ext(info, 'KHR_texture_transform');
  if (tt) {
    const off = tt.offset as number[] | undefined;
    const sc = tt.scale as number[] | undefined;
    transform = {
      offset: [num(off?.[0], 0), num(off?.[1], 0)],
      rotation: num(tt.rotation, 0),
      scale: [num(sc?.[0], 1), num(sc?.[1], 1)],
    };
    if (typeof tt.texCoord === 'number') texCoord = tt.texCoord;
  }
  return { image: source, sampler: parseSampler(json, tex.sampler), texCoord, transform };
}

function parseMaterial(json: RawGLTF, index: number): GLTFMaterial {
  const m = json.materials![index];
  const pbr = m.pbrMetallicRoughness ?? {};
  const bc = pbr.baseColorFactor ?? [1, 1, 1, 1];
  const ef = m.emissiveFactor ?? [0, 0, 0];
  const mode = m.alphaMode === 'MASK' || m.alphaMode === 'BLEND' ? m.alphaMode : 'OPAQUE';
  const mat: GLTFMaterial = {
    name: m.name ?? `material${index}`,
    baseColorFactor: [num(bc[0], 1), num(bc[1], 1), num(bc[2], 1), num(bc[3], 1)],
    baseColorTexture: parseTextureInfo(json, pbr.baseColorTexture),
    metallicFactor: num(pbr.metallicFactor, 1),
    roughnessFactor: num(pbr.roughnessFactor, 1),
    metallicRoughnessTexture: parseTextureInfo(json, pbr.metallicRoughnessTexture),
    normalTexture: parseTextureInfo(json, m.normalTexture),
    normalScale: num(m.normalTexture?.scale, 1),
    occlusionTexture: parseTextureInfo(json, m.occlusionTexture),
    occlusionStrength: num(m.occlusionTexture?.strength, 1),
    emissiveTexture: parseTextureInfo(json, m.emissiveTexture),
    emissiveFactor: [num(ef[0], 0), num(ef[1], 0), num(ef[2], 0)],
    emissiveStrength: 1,
    alphaMode: mode,
    alphaCutoff: num(m.alphaCutoff, 0.5),
    doubleSided: !!m.doubleSided,
    unlit: !!ext(m, 'KHR_materials_unlit'),
  };
  const es = ext(m, 'KHR_materials_emissive_strength');
  if (es) mat.emissiveStrength = num(es.emissiveStrength, 1);
  const ior = ext(m, 'KHR_materials_ior');
  if (ior) mat.ior = num(ior.ior, 1.5);
  const sp = ext(m, 'KHR_materials_specular');
  if (sp) {
    mat.specularFactor = num(sp.specularFactor, 1);
    const c = sp.specularColorFactor as number[] | undefined;
    mat.specularColorFactor = [num(c?.[0], 1), num(c?.[1], 1), num(c?.[2], 1)];
    mat.specularTexture = parseTextureInfo(json, sp.specularTexture as RawTextureInfo | undefined);
    mat.specularColorTexture = parseTextureInfo(json, sp.specularColorTexture as RawTextureInfo | undefined);
  }
  const cc = ext(m, 'KHR_materials_clearcoat');
  if (cc) {
    mat.clearcoat = { factor: num(cc.clearcoatFactor, 0), roughness: num(cc.clearcoatRoughnessFactor, 0) };
    mat.clearcoatTexture = parseTextureInfo(json, cc.clearcoatTexture as RawTextureInfo | undefined);
    mat.clearcoatRoughnessTexture = parseTextureInfo(json, cc.clearcoatRoughnessTexture as RawTextureInfo | undefined);
    mat.clearcoatNormalTexture = parseTextureInfo(json, cc.clearcoatNormalTexture as RawTextureInfo | undefined);
  }
  const tr = ext(m, 'KHR_materials_transmission');
  if (tr) {
    mat.transmission = num(tr.transmissionFactor, 0);
    mat.transmissionTexture = parseTextureInfo(json, tr.transmissionTexture as RawTextureInfo | undefined);
  }
  return mat;
}

// ---------------------------------------------------------------- meshes

/** Renormalize 4-wide weights so each vertex sums to 1 (zero-sum vertices get [1,0,0,0]). */
function renormalizeWeights(w: Float32Array): void {
  for (let i = 0; i + 3 < w.length; i += 4) {
    const s = w[i] + w[i + 1] + w[i + 2] + w[i + 3];
    if (s > 1e-8) { const k = 1 / s; w[i] *= k; w[i + 1] *= k; w[i + 2] *= k; w[i + 3] *= k; }
    else { w[i] = 1; w[i + 1] = 0; w[i + 2] = 0; w[i + 3] = 0; }
  }
}

function toRGBA(c: Float32Array, comps: number, count: number): Float32Array {
  if (comps === 4) return c;
  const out = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    out[i * 4] = c[i * 3]; out[i * 4 + 1] = c[i * 3 + 1]; out[i * 4 + 2] = c[i * 3 + 2]; out[i * 4 + 3] = 1;
  }
  return out;
}

function parsePrimitive(ctx: AccessorContext, p: RawPrimitive, meshIndex: number, materials: GLTFMaterial[]): GLTFPrimitive {
  for (const e of Object.keys(p.extensions ?? {})) {
    if (UNSUPPORTED_COMPRESSION.includes(e)) throw new Error(`glTF: mesh ${meshIndex} uses unsupported extension "${e}"`);
  }
  const a = p.attributes;
  if (a.POSITION === undefined) throw new Error(`glTF: mesh ${meshIndex} primitive has no POSITION attribute`);
  const posAcc = getAccessor(ctx, a.POSITION);
  const vertexCount = posAcc.count;
  let positions = readAccessorFloat(ctx, a.POSITION);
  let normals = a.NORMAL !== undefined ? readAccessorFloat(ctx, a.NORMAL) : undefined;
  let tangents = a.TANGENT !== undefined ? readAccessorFloat(ctx, a.TANGENT) : undefined;
  let uvs = a.TEXCOORD_0 !== undefined ? readAccessorFloat(ctx, a.TEXCOORD_0) : undefined;
  let uvs2 = a.TEXCOORD_1 !== undefined ? readAccessorFloat(ctx, a.TEXCOORD_1) : undefined;
  let colors: Float32Array | undefined;
  if (a.COLOR_0 !== undefined) {
    const ca = getAccessor(ctx, a.COLOR_0);
    colors = toRGBA(readAccessorFloat(ctx, a.COLOR_0), accessorComponents(ca), ca.count);
  }
  let joints: Uint16Array | undefined;
  if (a.JOINTS_0 !== undefined) {
    const u = readAccessorUint(ctx, a.JOINTS_0);
    joints = new Uint16Array(u.length);
    for (let i = 0; i < u.length; i++) joints[i] = u[i];
  }
  let weights = a.WEIGHTS_0 !== undefined ? readAccessorFloat(ctx, a.WEIGHTS_0) : undefined;
  if (weights) renormalizeWeights(weights);

  let morphTargets: GLTFPrimitive['morphTargets'];
  if (p.targets && p.targets.length) {
    morphTargets = p.targets.map((t) => ({
      positions: t.POSITION !== undefined ? readAccessorFloat(ctx, t.POSITION) : undefined,
      normals: t.NORMAL !== undefined ? readAccessorFloat(ctx, t.NORMAL) : undefined,
      tangents: t.TANGENT !== undefined ? readAccessorFloat(ctx, t.TANGENT) : undefined,
    }));
  }

  let rawIndices: Uint32Array;
  if (p.indices !== undefined) rawIndices = readAccessorUint(ctx, p.indices);
  else { rawIndices = new Uint32Array(vertexCount); for (let i = 0; i < vertexCount; i++) rawIndices[i] = i; }
  for (let i = 0; i < rawIndices.length; i++) {
    if (rawIndices[i] >= vertexCount) throw new Error(`glTF: mesh ${meshIndex} index ${rawIndices[i]} out of range (${vertexCount} vertices)`);
  }
  const conv = convertTopology(p.mode ?? GL.TRIANGLES, rawIndices);
  let indices = conv.indices;
  let count = vertexCount;

  let generatedNormals = false;
  if (!normals && conv.topology === 'triangle-list') {
    // Flat normals (spec 3.7.2.1): un-weld so every triangle owns its 3 vertices.
    positions = unweldAttribute(positions, 3, indices);
    if (tangents) tangents = unweldAttribute(tangents, 4, indices);
    if (uvs) uvs = unweldAttribute(uvs, 2, indices);
    if (uvs2) uvs2 = unweldAttribute(uvs2, 2, indices);
    if (colors) colors = unweldAttribute(colors, 4, indices);
    if (joints) joints = unweldAttribute(joints, 4, indices);
    if (weights) weights = unweldAttribute(weights, 4, indices);
    if (morphTargets) {
      const idx = indices;
      morphTargets = morphTargets.map((t) => ({
        positions: t.positions ? unweldAttribute(t.positions, 3, idx) : undefined,
        normals: t.normals ? unweldAttribute(t.normals, 3, idx) : undefined,
        tangents: t.tangents ? unweldAttribute(t.tangents, 3, idx) : undefined,
      }));
    }
    count = indices.length;
    indices = new Uint32Array(count);
    for (let i = 0; i < count; i++) indices[i] = i;
    normals = flatNormalsUnwelded(positions);
    generatedNormals = true;
  }

  const material = p.material ?? -1;
  let generatedTangents = false;
  if (!tangents && normals && uvs && conv.topology === 'triangle-list' && material >= 0) {
    const mat = materials[material];
    if (mat?.normalTexture) {
      const tc = mat.normalTexture.texCoord === 1 && uvs2 ? uvs2 : uvs;
      tangents = generateTangents(positions, normals, tc, indices);
      generatedTangents = true;
    }
  }

  let bounds: GLTFPrimitive['bounds'];
  if (posAcc.min && posAcc.max && posAcc.min.length >= 3 && posAcc.max.length >= 3 && !posAcc.sparse && !posAcc.normalized) {
    bounds = { min: [posAcc.min[0], posAcc.min[1], posAcc.min[2]], max: [posAcc.max[0], posAcc.max[1], posAcc.max[2]] };
  } else {
    bounds = computeBounds(positions); // missing, sparse (min/max may be stale), or quantized (min/max in integer space)
  }

  return {
    positions, normals, tangents, uvs, uvs2, colors, joints, weights, indices, material, bounds, morphTargets,
    topology: conv.topology, vertexCount: count, generatedNormals, generatedTangents,
  };
}

function parseMesh(ctx: AccessorContext, index: number, materials: GLTFMaterial[]): GLTFMesh {
  const m = ctx.json.meshes![index];
  return {
    name: m.name ?? `mesh${index}`,
    primitives: m.primitives.map((p) => parsePrimitive(ctx, p, index, materials)),
    weights: m.weights?.slice(),
  };
}

// ---------------------------------------------------------------- nodes / lights

function parseLights(json: RawGLTF): GLTFLight[] {
  const root = ext(json, 'KHR_lights_punctual');
  const list = (root?.lights as JSONObject[] | undefined) ?? [];
  return list.map((l): GLTFLight => {
    const type = l.type === 'directional' || l.type === 'spot' ? l.type : 'point';
    const c = l.color as number[] | undefined;
    const light: GLTFLight = { type, color: [num(c?.[0], 1), num(c?.[1], 1), num(c?.[2], 1)], intensity: num(l.intensity, 1) };
    if (typeof l.name === 'string') light.name = l.name;
    if (typeof l.range === 'number' && l.range > 0) light.range = l.range;
    if (type === 'spot') {
      const s = (l.spot as JSONObject | undefined) ?? {};
      light.innerConeAngle = num(s.innerConeAngle, 0);
      light.outerConeAngle = num(s.outerConeAngle, Math.PI / 4);
    }
    return light;
  });
}

/** Decompose a column-major TRS matrix (no shear) into T, R (unit quat xyzw) and S (sign on X if det<0). */
export function decomposeMatrix(m: ArrayLike<number>): {
  translation: [number, number, number]; rotation: [number, number, number, number]; scale: [number, number, number];
} {
  let sx = Math.hypot(m[0], m[1], m[2]);
  const sy = Math.hypot(m[4], m[5], m[6]);
  const sz = Math.hypot(m[8], m[9], m[10]);
  const det = m[0] * (m[5] * m[10] - m[6] * m[9]) - m[4] * (m[1] * m[10] - m[2] * m[9]) + m[8] * (m[1] * m[6] - m[2] * m[5]);
  if (det < 0) sx = -sx;
  const ix = sx ? 1 / sx : 0, iy = sy ? 1 / sy : 0, iz = sz ? 1 / sz : 0;
  const m00 = m[0] * ix, m01 = m[1] * ix, m02 = m[2] * ix;
  const m10 = m[4] * iy, m11 = m[5] * iy, m12 = m[6] * iy;
  const m20 = m[8] * iz, m21 = m[9] * iz, m22 = m[10] * iz;
  let x: number, y: number, z: number, w: number;
  const tr = m00 + m11 + m22;
  if (tr > 0) {
    const s = Math.sqrt(tr + 1) * 2;
    w = 0.25 * s; x = (m12 - m21) / s; y = (m20 - m02) / s; z = (m01 - m10) / s;
  } else if (m00 > m11 && m00 > m22) {
    const s = Math.sqrt(1 + m00 - m11 - m22) * 2;
    w = (m12 - m21) / s; x = 0.25 * s; y = (m01 + m10) / s; z = (m20 + m02) / s;
  } else if (m11 > m22) {
    const s = Math.sqrt(1 + m11 - m00 - m22) * 2;
    w = (m20 - m02) / s; x = (m01 + m10) / s; y = 0.25 * s; z = (m12 + m21) / s;
  } else {
    const s = Math.sqrt(1 + m22 - m00 - m11) * 2;
    w = (m01 - m10) / s; x = (m20 + m02) / s; y = (m12 + m21) / s; z = 0.25 * s;
  }
  const l = Math.hypot(x, y, z, w) || 1;
  return { translation: [m[12], m[13], m[14]], rotation: [x / l, y / l, z / l, w / l], scale: [sx, sy, sz] };
}

function parseNodes(json: RawGLTF, lights: GLTFLight[]): GLTFNode[] {
  const raw = json.nodes ?? [];
  const nodes = raw.map((n, i): GLTFNode => {
    let translation: [number, number, number] = [0, 0, 0];
    let rotation: [number, number, number, number] = [0, 0, 0, 1];
    let scale: [number, number, number] = [1, 1, 1];
    if (n.matrix && n.matrix.length === 16) {
      ({ translation, rotation, scale } = decomposeMatrix(n.matrix));
    } else {
      if (n.translation) translation = [num(n.translation[0], 0), num(n.translation[1], 0), num(n.translation[2], 0)];
      if (n.rotation) {
        const r = n.rotation, l = Math.hypot(r[0], r[1], r[2], r[3]) || 1;
        rotation = [r[0] / l, r[1] / l, r[2] / l, r[3] / l];
      }
      if (n.scale) scale = [num(n.scale[0], 1), num(n.scale[1], 1), num(n.scale[2], 1)];
    }
    const node: GLTFNode = {
      name: n.name ?? `node${i}`, children: (n.children ?? []).slice(), parent: -1,
      mesh: n.mesh, skin: n.skin, camera: n.camera, translation, rotation, scale,
    };
    if (n.weights) node.weights = n.weights.slice();
    const lp = ext(n, 'KHR_lights_punctual');
    if (lp && typeof lp.light === 'number' && lights[lp.light]) node.light = { ...lights[lp.light] };
    return node;
  });
  nodes.forEach((n, i) => {
    for (const c of n.children) {
      if (!nodes[c]) throw new Error(`glTF: node ${i} references missing child ${c}`);
      if (nodes[c].parent >= 0) throw new Error(`glTF: node ${c} has multiple parents`);
      nodes[c].parent = i;
    }
  });
  return nodes;
}

// ---------------------------------------------------------------- animations

function parseAnimation(ctx: AccessorContext, index: number): GLTFAnimation {
  const a = ctx.json.animations![index];
  let duration = 0;
  const samplers = a.samplers.map((s, si): GLTFAnimationSampler => {
    const input = readAccessorFloat(ctx, s.input);
    const output = readAccessorFloat(ctx, s.output);
    const interpolation = s.interpolation === 'STEP' || s.interpolation === 'CUBICSPLINE' ? s.interpolation : 'LINEAR';
    const keys = input.length;
    const perKey = interpolation === 'CUBICSPLINE' ? 3 : 1;
    const components = keys > 0 ? Math.round(output.length / (keys * perKey)) : accessorComponents(getAccessor(ctx, s.output));
    if (keys > 0 && components * keys * perKey !== output.length) {
      throw new Error(`glTF: animation ${index} sampler ${si}: output length ${output.length} does not match ${keys} keys`);
    }
    if (keys > 0) duration = Math.max(duration, input[keys - 1]);
    return { input, output, interpolation, components };
  });
  const channels: GLTFAnimation['channels'] = [];
  for (const c of a.channels) {
    const p = c.target.path;
    if (c.target.node === undefined) continue; // e.g. KHR_animation_pointer — unsupported, skip
    if (p !== 'translation' && p !== 'rotation' && p !== 'scale' && p !== 'weights') continue;
    channels.push({ node: c.target.node, path: p, sampler: c.sampler });
  }
  return { name: a.name ?? `animation${index}`, channels, samplers, duration };
}
