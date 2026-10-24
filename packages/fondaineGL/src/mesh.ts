// GPU mesh: interleaved vertex buffer (position, normal, tangent, uv) + optional skin stream.

import { FGLDevice } from './device';
import { Geometry, computeTangents } from './geometry';
import { aabb, AABB } from './math';

/** Bytes per vertex in the main stream: pos(12) normal(12) tangent(16) uv(8). */
export const VERTEX_STRIDE = 48;
/** Skin stream: joints u16x4 (8) + weights f32x4 (16). */
export const SKIN_STRIDE = 24;

export const VERTEX_LAYOUT: GPUVertexBufferLayout = {
  arrayStride: VERTEX_STRIDE,
  attributes: [
    { shaderLocation: 0, offset: 0, format: 'float32x3' },
    { shaderLocation: 1, offset: 12, format: 'float32x3' },
    { shaderLocation: 2, offset: 24, format: 'float32x4' },
    { shaderLocation: 3, offset: 40, format: 'float32x2' },
  ],
};
export const SKIN_LAYOUT: GPUVertexBufferLayout = {
  arrayStride: SKIN_STRIDE,
  attributes: [
    { shaderLocation: 4, offset: 0, format: 'uint16x4' },
    { shaderLocation: 5, offset: 8, format: 'float32x4' },
  ],
};

export interface MeshSource {
  positions: Float32Array;
  normals: Float32Array;
  uvs?: Float32Array | null;
  tangents?: Float32Array | null;
  indices: Uint32Array;
  joints?: Uint16Array | null;
  weights?: Float32Array | null;
}

export class Mesh {
  readonly vertexBuffer: GPUBuffer;
  readonly indexBuffer: GPUBuffer;
  readonly skinBuffer: GPUBuffer | null;
  readonly indexCount: number;
  readonly vertexCount: number;
  readonly bounds: AABB;
  readonly skinned: boolean;
  /** CPU copy kept for physics collision building (optional). */
  readonly source: MeshSource | null;
  label: string;

  constructor(dev: FGLDevice, src: MeshSource | Geometry, opts: { label?: string; keepSource?: boolean } = {}) {
    const g = src as MeshSource;
    const n = g.positions.length / 3;
    const uvs = g.uvs ?? new Float32Array(n * 2);
    const tangents = g.tangents ?? computeTangents(g.positions, g.normals, uvs, g.indices);
    const data = new Float32Array(n * (VERTEX_STRIDE / 4));
    for (let i = 0; i < n; i++) {
      const o = i * 12;
      data[o] = g.positions[i * 3]; data[o + 1] = g.positions[i * 3 + 1]; data[o + 2] = g.positions[i * 3 + 2];
      data[o + 3] = g.normals[i * 3]; data[o + 4] = g.normals[i * 3 + 1]; data[o + 5] = g.normals[i * 3 + 2];
      data[o + 6] = tangents[i * 4]; data[o + 7] = tangents[i * 4 + 1]; data[o + 8] = tangents[i * 4 + 2]; data[o + 9] = tangents[i * 4 + 3];
      data[o + 10] = uvs[i * 2]; data[o + 11] = uvs[i * 2 + 1];
    }
    this.label = opts.label ?? 'mesh';
    this.vertexBuffer = dev.createBuffer(data.byteLength, GPUBufferUsage.VERTEX, `${this.label}.vb`, data);
    this.indexBuffer = dev.createBuffer(g.indices.byteLength, GPUBufferUsage.INDEX, `${this.label}.ib`, g.indices);
    this.indexCount = g.indices.length;
    this.vertexCount = n;
    this.bounds = aabb.fromPositions(g.positions);
    this.skinned = !!(g.joints && g.weights);
    if (this.skinned) {
      const buf = new ArrayBuffer(n * SKIN_STRIDE);
      const u16 = new Uint16Array(buf), f32 = new Float32Array(buf);
      for (let i = 0; i < n; i++) {
        for (let k = 0; k < 4; k++) u16[(i * SKIN_STRIDE) / 2 + k] = g.joints![i * 4 + k];
        for (let k = 0; k < 4; k++) f32[(i * SKIN_STRIDE + 8) / 4 + k] = g.weights![i * 4 + k];
      }
      this.skinBuffer = dev.createBuffer(buf.byteLength, GPUBufferUsage.VERTEX, `${this.label}.skin`, new Uint8Array(buf));
    } else {
      this.skinBuffer = null;
    }
    this.source = opts.keepSource ? g : null;
  }

  destroy() {
    this.vertexBuffer.destroy();
    this.indexBuffer.destroy();
    this.skinBuffer?.destroy();
  }
}

export function emptyBounds(): AABB { return aabb.create(); }
