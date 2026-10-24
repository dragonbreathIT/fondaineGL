// Shared helpers for procedural weapon models.
// Weapon space: +x right, +y up, −z towards the muzzle, bore axis on y = 0, real-world metres.

import { Geometry, Mesh, Material, RenderObject, mat4, Mat4, cylinder, lathe, extrude, Renderer } from '@fondaine/gl';
import type { FirearmModel } from '@fondaine/gl';

export type P2 = [number, number];

/** Side-profile extrusion: polygon in (forward, up) metres → weapon space, `width` across x. */
export function side(profile: P2[], width: number, bevel = 0.0015, holes: P2[][] = []): Geometry {
  const g = extrude(profile, width, { bevel, bevelSegments: 2, holes });
  return g.rotateY(Math.PI / 2); // (a, y, z) → (z, y, −a): forward a becomes −z
}

/** Cross-section extrusion: polygon in (x, y) extruded along z, centred on z = zc. */
export function section(profile: P2[], depth: number, zc: number, bevel = 0.0008, holes: P2[][] = []): Geometry {
  return extrude(profile, depth, { bevel, bevelSegments: 2, holes }).translate(0, 0, zc);
}

/** Cylinder along −z (barrels, tubes, pins along z). */
export function tubeZ(r: number, z0: number, z1: number, y = 0, x = 0, radial = 28): Geometry {
  const len = Math.abs(z1 - z0);
  return cylinder(r, r, len, radial).rotateX(Math.PI / 2).translate(x, y, (z0 + z1) / 2);
}

/** Cylinder along x (pins, buttons, dots facing sideways). */
export function tubeX(r: number, length: number, x: number, y: number, z: number, radial = 16): Geometry {
  return cylinder(r, r, length, radial).rotateZ(Math.PI / 2).translate(x, y, z);
}

/** Disc facing +z (towards the shooter): sight dots, crowns. */
export function discZ(r: number, thickness: number, x: number, y: number, z: number, radial = 20): Geometry {
  return cylinder(r, r, thickness, radial).rotateX(Math.PI / 2).translate(x, y, z);
}

/** Lathe profile along −z: points (radius, distance forward from z0). */
export function latheZ(prof: P2[], z0: number, y = 0, radial = 32): Geometry {
  return lathe(prof, radial).rotateX(-Math.PI / 2).translate(0, y, z0);
}

export interface PartFlags { magazine?: boolean; bolt?: boolean; trigger?: boolean; selector?: boolean }

/**
 * Collects geometry per (material, animation flags) and merges each bucket into one draw call.
 * Animated groups (slide/bolt, magazine, trigger) stay separate so the Firearm can move them.
 */
export class PartBuilder {
  private buckets = new Map<string, { m: Material; geoms: Geometry[]; flags: PartFlags }>();
  constructor(private renderer: Renderer) {}

  add(g: Geometry, m: Material, flags: PartFlags = {}) {
    const key = `${m.id}|${flags.magazine ? 1 : 0}${flags.bolt ? 1 : 0}${flags.trigger ? 1 : 0}${flags.selector ? 1 : 0}`;
    const b = this.buckets.get(key) ?? { m, geoms: [], flags };
    b.geoms.push(g.tangents ? g : g.computeTangents());
    this.buckets.set(key, b);
    return this;
  }

  finish(): FirearmModel['parts'] {
    const parts: FirearmModel['parts'] = [];
    for (const b of this.buckets.values()) {
      const obj = new RenderObject(new Mesh(this.renderer.dev, Geometry.merge(b.geoms), { label: b.m.name, keepSource: true }), b.m);
      parts.push({ object: obj, local: mat4.create() as Mat4, ...b.flags });
    }
    return parts;
  }
}
