// fondaineGL glTF 2.0 — accessor decoding (byteStride / interleaving, sparse, normalized integers,
// KHR_mesh_quantization, padded matrix columns). Pure data.

import { GL, type RawAccessor, type RawGLTF } from './gltf';

/** Everything accessor decoding needs: the JSON and the loaded buffer bytes (index = glTF buffer index). */
export interface AccessorContext {
  json: RawGLTF;
  buffers: Uint8Array[];
}

export const TYPE_COMPONENTS: Record<string, number> = {
  SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16,
};

export function componentSize(componentType: number): number {
  switch (componentType) {
    case GL.BYTE: case GL.UNSIGNED_BYTE: return 1;
    case GL.SHORT: case GL.UNSIGNED_SHORT: return 2;
    case GL.UNSIGNED_INT: case GL.FLOAT: return 4;
    default: throw new Error(`glTF: unknown accessor componentType ${componentType}`);
  }
}

export function accessorComponents(acc: RawAccessor): number {
  const n = TYPE_COMPONENTS[acc.type];
  if (!n) throw new Error(`glTF: unknown accessor type "${acc.type}"`);
  return n;
}

/**
 * Byte layout of one element. Matrix columns must start on 4-byte boundaries (glTF 3.6.2.4),
 * which pads MAT2 of 1-byte components and MAT3 of 1/2-byte components.
 */
interface ElementLayout { rows: number; cols: number; colStride: number; elementSize: number }
function elementLayout(type: string, compSize: number): ElementLayout {
  let rows: number, cols: number;
  switch (type) {
    case 'MAT2': rows = 2; cols = 2; break;
    case 'MAT3': rows = 3; cols = 3; break;
    case 'MAT4': rows = 4; cols = 4; break;
    default: rows = TYPE_COMPONENTS[type] ?? 1; cols = 1;
  }
  const raw = rows * compSize;
  const colStride = cols > 1 ? (raw + 3) & ~3 : raw;
  return { rows, cols, colStride, elementSize: colStride * cols };
}

type Reader = (dv: DataView, byteOffset: number) => number;
function componentReader(componentType: number): Reader {
  switch (componentType) {
    case GL.BYTE: return (dv, o) => dv.getInt8(o);
    case GL.UNSIGNED_BYTE: return (dv, o) => dv.getUint8(o);
    case GL.SHORT: return (dv, o) => dv.getInt16(o, true);
    case GL.UNSIGNED_SHORT: return (dv, o) => dv.getUint16(o, true);
    case GL.UNSIGNED_INT: return (dv, o) => dv.getUint32(o, true);
    case GL.FLOAT: return (dv, o) => dv.getFloat32(o, true);
    default: throw new Error(`glTF: unknown accessor componentType ${componentType}`);
  }
}

/** Normalized-integer -> float conversion per glTF 2.0 (3.11 "Animations" / KHR_mesh_quantization). */
export function normalizeComponent(componentType: number, c: number): number {
  switch (componentType) {
    case GL.BYTE: return Math.max(c / 127, -1);
    case GL.UNSIGNED_BYTE: return c / 255;
    case GL.SHORT: return Math.max(c / 32767, -1);
    case GL.UNSIGNED_SHORT: return c / 65535;
    case GL.UNSIGNED_INT: return c / 4294967295;
    default: return c;
  }
}

/** Resolve a bufferView into its byte range and stride. */
export function getBufferView(ctx: AccessorContext, index: number): { bytes: Uint8Array; byteStride: number } {
  const bv = ctx.json.bufferViews?.[index];
  if (!bv) throw new Error(`glTF: bufferView ${index} does not exist`);
  const buf = ctx.buffers[bv.buffer];
  if (!buf) throw new Error(`glTF: buffer ${bv.buffer} (bufferView ${index}) was not loaded`);
  const off = bv.byteOffset ?? 0;
  if (off + bv.byteLength > buf.byteLength) {
    throw new Error(`glTF: bufferView ${index} [${off}, ${off + bv.byteLength}) overruns buffer ${bv.buffer} (${buf.byteLength} bytes)`);
  }
  return { bytes: buf.subarray(off, off + bv.byteLength), byteStride: bv.byteStride ?? 0 };
}

/** Read `count` elements from a tightly-or-strided view into `out` (component order, no padding). */
function readElements(
  bytes: Uint8Array, byteOffset: number, byteStride: number, count: number,
  type: string, componentType: number, normalize: boolean,
  out: Float32Array | Uint32Array, outOffset: number,
): void {
  const cs = componentSize(componentType);
  const lay = elementLayout(type, cs);
  const stride = byteStride || lay.elementSize;
  const nComp = lay.rows * lay.cols;
  const last = byteOffset + (count > 0 ? (count - 1) * stride + lay.elementSize : 0);
  if (last > bytes.byteLength) {
    throw new Error(`glTF: accessor data overruns its bufferView (${last} > ${bytes.byteLength} bytes)`);
  }
  // Fast path: tightly packed float data, 4-aligned.
  if (componentType === GL.FLOAT && out instanceof Float32Array && stride === lay.elementSize && lay.cols === 1 &&
      ((bytes.byteOffset + byteOffset) & 3) === 0) {
    out.set(new Float32Array(bytes.buffer, bytes.byteOffset + byteOffset, count * nComp), outOffset);
    return;
  }
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const rd = componentReader(componentType);
  let o = outOffset;
  for (let i = 0; i < count; i++) {
    const base = byteOffset + i * stride;
    for (let c = 0; c < lay.cols; c++) {
      const colBase = base + c * lay.colStride;
      for (let r = 0; r < lay.rows; r++) {
        const v = rd(dv, colBase + r * cs);
        out[o++] = normalize ? normalizeComponent(componentType, v) : v;
      }
    }
  }
}

function decodeInto(ctx: AccessorContext, index: number, out: Float32Array | Uint32Array, normalize: boolean): void {
  const acc = ctx.json.accessors?.[index];
  if (!acc) throw new Error(`glTF: accessor ${index} does not exist`);
  const nComp = accessorComponents(acc);
  if (acc.bufferView !== undefined) {
    const { bytes, byteStride } = getBufferView(ctx, acc.bufferView);
    readElements(bytes, acc.byteOffset ?? 0, byteStride, acc.count, acc.type, acc.componentType, normalize, out, 0);
  } else {
    out.fill(0); // spec: no bufferView => zeros (then sparse substitution)
  }
  const sp = acc.sparse;
  if (sp && sp.count > 0) {
    const idx = new Uint32Array(sp.count);
    const iv = getBufferView(ctx, sp.indices.bufferView);
    readElements(iv.bytes, sp.indices.byteOffset ?? 0, 0, sp.count, 'SCALAR', sp.indices.componentType, false, idx, 0);
    const vals = out instanceof Float32Array ? new Float32Array(sp.count * nComp) : new Uint32Array(sp.count * nComp);
    const vv = getBufferView(ctx, sp.values.bufferView);
    readElements(vv.bytes, sp.values.byteOffset ?? 0, 0, sp.count, acc.type, acc.componentType, normalize, vals, 0);
    for (let i = 0; i < sp.count; i++) {
      const dst = idx[i];
      if (dst >= acc.count) throw new Error(`glTF: sparse index ${dst} out of range in accessor ${index}`);
      for (let c = 0; c < nComp; c++) out[dst * nComp + c] = vals[i * nComp + c];
    }
  }
}

/**
 * Decode an accessor to floats. Normalized integer accessors are mapped to [0,1] / [-1,1];
 * non-normalized integers (allowed by KHR_mesh_quantization) are converted as plain values.
 */
export function readAccessorFloat(ctx: AccessorContext, index: number): Float32Array {
  const acc = ctx.json.accessors?.[index];
  if (!acc) throw new Error(`glTF: accessor ${index} does not exist`);
  const out = new Float32Array(acc.count * accessorComponents(acc));
  decodeInto(ctx, index, out, !!acc.normalized && acc.componentType !== GL.FLOAT);
  return out;
}

/** Decode an integer accessor (indices, joints) to Uint32. */
export function readAccessorUint(ctx: AccessorContext, index: number): Uint32Array {
  const acc = ctx.json.accessors?.[index];
  if (!acc) throw new Error(`glTF: accessor ${index} does not exist`);
  if (acc.componentType === GL.FLOAT) throw new Error(`glTF: accessor ${index} is FLOAT, expected an integer type`);
  const out = new Uint32Array(acc.count * accessorComponents(acc));
  decodeInto(ctx, index, out, false);
  return out;
}

export function getAccessor(ctx: AccessorContext, index: number): RawAccessor {
  const acc = ctx.json.accessors?.[index];
  if (!acc) throw new Error(`glTF: accessor ${index} does not exist`);
  return acc;
}
