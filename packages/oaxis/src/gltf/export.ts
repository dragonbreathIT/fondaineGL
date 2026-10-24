// Minimal glTF 2.0 binary (.glb) writer: exports meshes built in oAxis (weapons, props, hands) so they can be
// opened in Blender or any other engine. Geometry: positions, normals, tangents, UVs, indices. Materials:
// metallic-roughness factors + base colour; procedural GPU textures are not embedded (re-texture in DCC).

import type { RenderObject, Material } from '@fondaine/gl';

export interface ExportNode { name: string; object: RenderObject }

function pad4(n: number) { return (n + 3) & ~3; }

/** Build a .glb from render objects whose meshes were created with `keepSource: true`. */
export function exportGLB(nodes: ExportNode[], o: { generator?: string } = {}): ArrayBuffer {
  const bin: Uint8Array[] = [];
  let binLen = 0;
  const bufferViews: Record<string, unknown>[] = [];
  const accessors: Record<string, unknown>[] = [];
  const meshes: Record<string, unknown>[] = [];
  const gnodes: Record<string, unknown>[] = [];
  const materials: Record<string, unknown>[] = [];
  const matIndex = new Map<Material, number>();

  const push = (data: ArrayBufferView, target?: number) => {
    const bytes = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    const offset = binLen;
    const padded = pad4(bytes.byteLength);
    const chunk = new Uint8Array(padded);
    chunk.set(bytes);
    bin.push(chunk);
    binLen += padded;
    bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: bytes.byteLength, ...(target ? { target } : {}) });
    return bufferViews.length - 1;
  };
  const accessor = (data: Float32Array | Uint32Array, type: string, comps: number, target: number, minmax = false) => {
    const view = push(data, target);
    const count = data.length / comps;
    const acc: Record<string, unknown> = { bufferView: view, componentType: data instanceof Float32Array ? 5126 : 5125, count, type };
    if (minmax) {
      const mn = Array(comps).fill(Infinity), mx = Array(comps).fill(-Infinity);
      for (let i = 0; i < count; i++) for (let c = 0; c < comps; c++) { const v = data[i * comps + c]; if (v < mn[c]) mn[c] = v; if (v > mx[c]) mx[c] = v; }
      acc.min = mn; acc.max = mx;
    }
    accessors.push(acc);
    return accessors.length - 1;
  };

  for (const n of nodes) {
    const src = n.object.mesh.source;
    if (!src) continue;
    const m = n.object.material;
    let mi = matIndex.get(m);
    if (mi === undefined) {
      materials.push({
        name: m.name,
        pbrMetallicRoughness: { baseColorFactor: Array.from(m.baseColor), metallicFactor: m.metallic, roughnessFactor: m.roughness },
        doubleSided: m.doubleSided,
        ...(m.alphaMode === 'mask' ? { alphaMode: 'MASK', alphaCutoff: m.alphaCutoff } : {}),
      });
      mi = materials.length - 1;
      matIndex.set(m, mi);
    }
    const attributes: Record<string, number> = {
      POSITION: accessor(Float32Array.from(src.positions), 'VEC3', 3, 34962, true),
      NORMAL: accessor(Float32Array.from(src.normals), 'VEC3', 3, 34962),
    };
    if (src.uvs) attributes.TEXCOORD_0 = accessor(Float32Array.from(src.uvs), 'VEC2', 2, 34962);
    if (src.tangents) attributes.TANGENT = accessor(Float32Array.from(src.tangents), 'VEC4', 4, 34962);
    const indices = accessor(Uint32Array.from(src.indices), 'SCALAR', 1, 34963);
    meshes.push({ name: n.name, primitives: [{ attributes, indices, material: mi }] });
    gnodes.push({ name: n.name, mesh: meshes.length - 1, matrix: Array.from(n.object.transform) });
  }

  const json = {
    asset: { version: '2.0', generator: o.generator ?? 'fondaine oAxis' },
    scene: 0,
    scenes: [{ nodes: gnodes.map((_, i) => i) }],
    nodes: gnodes, meshes, materials, accessors, bufferViews,
    buffers: [{ byteLength: binLen }],
  };
  const jsonBytes = new TextEncoder().encode(JSON.stringify(json));
  const jsonPadded = pad4(jsonBytes.byteLength);
  const total = 12 + 8 + jsonPadded + 8 + binLen;
  const out = new ArrayBuffer(total);
  const dv = new DataView(out);
  const u8 = new Uint8Array(out);
  dv.setUint32(0, 0x46546c67, true); dv.setUint32(4, 2, true); dv.setUint32(8, total, true);
  dv.setUint32(12, jsonPadded, true); dv.setUint32(16, 0x4e4f534a, true);
  u8.set(jsonBytes, 20); for (let i = jsonBytes.byteLength; i < jsonPadded; i++) u8[20 + i] = 0x20;
  let off = 20 + jsonPadded;
  dv.setUint32(off, binLen, true); dv.setUint32(off + 4, 0x004e4942, true); off += 8;
  for (const c of bin) { u8.set(c, off); off += c.byteLength; }
  return out;
}
