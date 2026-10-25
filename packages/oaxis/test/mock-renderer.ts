// Node-side stand-in for fondaineGL's Renderer: enough for the procedural weapon builders, the glTF
// instantiation and `weaponFromGLTF` to run without a GPU (buffers and textures are inert stubs;
// CPU geometry is kept on the meshes, which is all the tests look at).
import { Material, Renderer } from '@fondaine/gl';

const g = globalThis as unknown as Record<string, unknown>;
if (!g.GPUBufferUsage) g.GPUBufferUsage = { MAP_READ: 1, MAP_WRITE: 2, COPY_SRC: 4, COPY_DST: 8, INDEX: 16, VERTEX: 32, UNIFORM: 64, STORAGE: 128, INDIRECT: 256, QUERY_RESOLVE: 512 };
if (!g.GPUTextureUsage) g.GPUTextureUsage = { COPY_SRC: 1, COPY_DST: 2, TEXTURE_BINDING: 4, STORAGE_BINDING: 8, RENDER_ATTACHMENT: 16 };

export function mockRenderer(): Renderer {
  const stub = () => ({ destroy() {}, label: 'stub' });
  const dev = { createBuffer: stub, createTexture: stub, device: { queue: { writeBuffer() {} } }, floatFilterable: false, features: new Set<string>() };
  const textures = { fromRGBA8: stub, fromImage: stub, fromURL: async () => stub(), sampler: stub };
  const synth = { material: (_kind: string, _p: unknown, o: { name?: string } = {}) => new Material({ name: o.name ?? _kind }) };
  return { dev, textures, synth } as unknown as Renderer;
}
