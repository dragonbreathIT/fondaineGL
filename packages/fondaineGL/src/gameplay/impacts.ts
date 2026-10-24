// Bullet impacts: decals, debris, sounds by surface; swinging AR500 steel targets (hinged pendulum dynamics
// with modal ring computed from the actual hit position); paper targets the bullet passes through.

import { mat4, Mat4, quat, vec3, Vec3, rng, ParticleKind, DecalKind, RenderObject, Renderer } from '../gl';
import { plateModes } from '@fondaine/vorp';
import type { Engine } from '../runtime/engine';
import type { Body, ProjectileHit, PhysicsWorld } from '../runtime/physics';
import { BodyShape } from '../runtime/physics';
import { SURFACE, surfaceOf } from './surfaces';

export interface SteelTargetSpec {
  width: number;
  height: number;
  thickness: number;
  /** Distance from the hinge (chain attachment) to the plate's top edge (m). */
  hangLength: number;
  /** Swing damping ratio (chains, air). */
  damping: number;
  /** Ring T60 of the fundamental (s) — hanging plates ring long. */
  ringT60: number;
}

export class SteelTarget {
  angle = 0;      // swing about the hinge axis (rad), + = top-back
  omega = 0;
  twist = 0;      // rotation about the vertical (rad)
  twistOmega = 0;
  readonly mass: number;
  readonly pivot: Vec3;
  readonly body: Body;
  hits = 0;
  private inertia: number;
  private twistInertia: number;
  private L: number;

  constructor(readonly spec: SteelTargetSpec, pivot: ArrayLike<number>, readonly yaw: number, readonly plate: RenderObject, physics: PhysicsWorld) {
    this.pivot = vec3.clone(pivot);
    this.mass = 7850 * spec.width * spec.height * spec.thickness;
    this.L = spec.hangLength + spec.height / 2;
    // plate about the hinge: parallel-axis theorem
    this.inertia = this.mass * (this.L * this.L + (spec.height * spec.height + spec.thickness * spec.thickness) / 12);
    this.twistInertia = (this.mass * spec.width * spec.width) / 12;
    this.body = physics.createBody(BodyShape.Box, [spec.width / 2, spec.height / 2, spec.thickness / 2], 5000, SURFACE.STEEL_TARGET);
    this.sync();
  }

  /** World transform of the plate centre. */
  matrix(out: Mat4 = mat4.create()): Mat4 {
    const q = quat.create();
    quat.rotateY(q, q, this.yaw + this.twist);
    quat.rotateX(q, q, -this.angle);
    const offset = vec3.transformQuat(vec3.create(), [0, -this.L, 0], q);
    return mat4.fromRotationTranslation(out, q, vec3.add(vec3.create(), this.pivot, offset));
  }

  sync() {
    const m = this.matrix();
    this.plate.setTransform(m);
    const q = mat4.getRotation(quat.create(), m);
    this.body.setTransform([m[12], m[13], m[14]], q);
    this.body.setVelocity([0, 0, 0], [0, 0, 0]);
  }

  step(dt: number) {
    const g = 9.81;
    const wn = Math.sqrt((this.mass * g * this.L) / this.inertia);
    const c = 2 * this.spec.damping * wn;
    const n = 4, h = dt / n;
    for (let i = 0; i < n; i++) {
      const acc = -(this.mass * g * this.L * Math.sin(this.angle)) / this.inertia - c * this.omega;
      this.omega += acc * h;
      this.angle += this.omega * h;
      // chains resist twisting with a weak restoring torque
      this.twistOmega += (-6 * this.twist - 2 * 0.15 * Math.sqrt(6) * this.twistOmega) * h;
      this.twist += this.twistOmega * h;
    }
    this.sync();
  }

  /** Apply a bullet impulse (N·s, world vector) at a world point. Returns plate-local hit uv (0..1). */
  hit(impulse: Vec3, point: Vec3): { u: number; v: number } {
    const m = this.matrix();
    const inv = mat4.invert(mat4.create(), m)!;
    const local = vec3.transformMat4(vec3.create(), point, inv);
    const u = local[0] / this.spec.width + 0.5, v = 0.5 - local[1] / this.spec.height;
    // hinge axis (world) = plate's local X; lever arm from pivot
    const axis = vec3.normalize(vec3.create(), vec3.set(vec3.create(), m[0], m[1], m[2]));
    const r = vec3.sub(vec3.create(), point, this.pivot);
    const torque = vec3.cross(vec3.create(), r, impulse);
    this.omega -= vec3.dot(torque, axis) / this.inertia;
    const upAxis = vec3.create(0, 1, 0);
    this.twistOmega += vec3.dot(torque, upAxis) / this.twistInertia * 0.5;
    this.hits++;
    return { u: Math.min(1, Math.max(0, u)), v: Math.min(1, Math.max(0, v)) };
  }
}

export class PaperTarget {
  /** Plane: centre, normal (facing the shooter), right axis; size. */
  constructor(readonly object: RenderObject, readonly width: number, readonly height: number) {}
  hits = 0;
}

export class ImpactSystem {
  readonly steel = new Map<number, SteelTarget>(); // by physics body id
  readonly paper: PaperTarget[] = [];
  private rand = rng(9001);
  private lastProj = new Map<number, Vec3>();
  /** Fraction of bullet momentum transferred to a steel plate (>1 because the bullet splashes back). */
  steelMomentumTransfer = 1.3;
  onHit: ((h: ProjectileHit, surface: string) => void) | null = null;

  constructor(private engine: Engine, private bulletMass = 0.004) {
    engine.physics.onProjectileHit.push((h) => this.onProjectileHit(h));
    engine.onFixed.push((dt) => {
      for (const t of this.steel.values()) t.step(dt);
      this.checkPaper();
    });
  }

  addSteel(t: SteelTarget) { this.steel.set(t.body.id, t); }
  addPaper(t: PaperTarget) { this.paper.push(t); }

  private get renderer(): Renderer { return this.engine.renderer; }

  private onProjectileHit(h: ProjectileHit) {
    const target = h.body >= 0 ? this.steel.get(h.body) : undefined;
    const speed = vec3.length(h.velocity);
    const energy = 0.5 * this.bulletMass * speed * speed;
    if (target) { this.hitSteel(target, h, speed); return; }
    const surf = surfaceOf(h.material);
    this.onHit?.(h, surf.name);
    const R = this.renderer;
    if (surf.decal !== null && !h.ricochet) R.decals.add(surf.decal, h.point, h.normal, surf.decalSize * (0.8 + 0.4 * this.rand.next()));
    if (h.ricochet) R.decals.add(DecalKind.LeadSplash, h.point, h.normal, 0.02);
    // debris
    const n = h.normal;
    const refl = vec3.normalize(vec3.create(), vec3.scaleAndAdd(vec3.create(), h.velocity, n, -2 * vec3.dot(h.velocity, n)));
    if (surf.debris === 'dust' || surf.debris === 'splinters') {
      const count = surf.debris === 'dust' ? 5 : 3;
      for (let i = 0; i < count; i++) {
        const v = vec3.scale(vec3.create(), vec3.normalize(vec3.create(), vec3.set(vec3.create(), n[0] + this.rand.range(-0.6, 0.6), n[1] + this.rand.range(0, 0.8), n[2] + this.rand.range(-0.6, 0.6))), 0.8 + this.rand.next() * 2.5);
        R.particles.spawn({ kind: ParticleKind.Dust, position: h.point, velocity: v, life: 0.8 + this.rand.next() * 1.4, size0: 0.04, size1: 0.35 + this.rand.next() * 0.3, color: surf.debrisColor, alpha0: 0.55, alpha1: 0, drag: 3.5, gravity: 0.6 });
      }
      // ejecta chunks: fast small dark grains with gravity
      for (let i = 0; i < 6; i++) {
        const v = vec3.scale(vec3.create(), vec3.normalize(vec3.create(), vec3.set(vec3.create(), n[0] + this.rand.range(-0.5, 0.5), n[1] + this.rand.range(0.2, 1), n[2] + this.rand.range(-0.5, 0.5))), 2 + this.rand.next() * 4);
        R.particles.spawn({ kind: ParticleKind.Dust, position: h.point, velocity: v, life: 0.5 + this.rand.next() * 0.4, size0: 0.012, size1: 0.01, color: [surf.debrisColor[0] * 0.5, surf.debrisColor[1] * 0.5, surf.debrisColor[2] * 0.5], alpha0: 0.9, alpha1: 0.6, gravity: 9.81, drag: 0.4 });
      }
    } else if (surf.debris === 'sparks') {
      this.sparks(h.point, refl, n, 10);
    }
    const levelDb = 10 * Math.log10(Math.max(energy, 1) / 1500);
    this.engine.audio.impact(surf.impactSound, h.point, levelDb);
  }

  private sparks(point: Vec3, dir: Vec3, n: Vec3, count: number) {
    for (let i = 0; i < count; i++) {
      const v = vec3.normalize(vec3.create(), vec3.set(vec3.create(), dir[0] + n[0] * 0.5 + this.rand.range(-0.7, 0.7), dir[1] + n[1] * 0.5 + this.rand.range(-0.4, 0.7), dir[2] + n[2] * 0.5 + this.rand.range(-0.7, 0.7)));
      vec3.scale(v, v, 4 + this.rand.next() * 10);
      this.renderer.particles.spawn({ kind: ParticleKind.Spark, position: point, velocity: v, life: 0.08 + this.rand.next() * 0.25, size0: 0.0035, size1: 0.002, color: [1, 0.62, 0.28], alpha0: 1, alpha1: 0.3, luminance: 6e4, gravity: 9.81, drag: 1.2, stretch: 0.012 });
    }
    this.renderer.particles.spawn({ kind: ParticleKind.Flash, position: point, life: 0.02, size0: 0.05, size1: 0.07, color: [1, 0.8, 0.55], alpha0: 1, alpha1: 1, luminance: 1.5e5 });
  }

  private hitSteel(t: SteelTarget, h: ProjectileHit, speed: number) {
    const dir = vec3.normalize(vec3.create(), h.velocity);
    const J = vec3.scale(vec3.create(), dir, this.bulletMass * speed * this.steelMomentumTransfer);
    const { u, v } = t.hit(J, h.point);
    // AR500 doesn't deform: lead splash mark, sparks/fragments spray along the plate face
    this.renderer.decals.add(DecalKind.LeadSplash, h.point, h.normal, 0.06 + this.rand.next() * 0.04, t.plate);
    const refl = vec3.normalize(vec3.create(), vec3.scaleAndAdd(vec3.create(), dir, h.normal, -2 * vec3.dot(dir, h.normal)));
    this.sparks(h.point, refl, h.normal, 14);
    this.renderer.particles.spawn({ kind: ParticleKind.Dust, position: h.point, velocity: [h.normal[0], h.normal[1] + 0.3, h.normal[2]], life: 0.6, size0: 0.05, size1: 0.3, color: [0.55, 0.55, 0.55], alpha0: 0.35, alpha1: 0, drag: 4 });
    // ring: plate modes for this hit position; contact time ~20 µs → bright "ping"
    const s = t.spec;
    const modes = plateModes({ width: s.width, height: s.height, thickness: s.thickness, hitU: u, hitV: v, t60Fundamental: s.ringT60, level: 30 });
    const amp = Math.min(2, (speed / 800) ** 2 * 1.2);
    this.engine.audio.modal(modes, [{ timeMs: 0, amp, contactMs: 0.02, noiseDb: -14 }], h.point, 1, { bus: 1 });
    this.onHit?.(h, 'steel target');
  }

  /** Bullets pass through paper: detect plane crossings of live projectiles. */
  private checkPaper() {
    if (!this.paper.length) { this.lastProj.clear(); return; }
    const live = this.engine.physics.projectiles();
    const seen = new Set<number>();
    for (const p of live) {
      seen.add(p.id);
      const prev = this.lastProj.get(p.id);
      this.lastProj.set(p.id, vec3.clone(p.position));
      if (!prev) continue;
      for (const t of this.paper) {
        const m = t.object.transform;
        const c = vec3.create(m[12], m[13], m[14]);
        const nrm = vec3.normalize(vec3.create(), vec3.set(vec3.create(), m[8], m[9], m[10]));
        const d0 = vec3.dot(vec3.sub(vec3.create(), prev, c), nrm), d1 = vec3.dot(vec3.sub(vec3.create(), p.position, c), nrm);
        if (d0 * d1 > 0) continue;
        const tt = d0 / (d0 - d1);
        const hp = vec3.lerp(vec3.create(), prev, p.position, tt);
        const inv = mat4.invert(mat4.create(), m)!;
        const lp = vec3.transformMat4(vec3.create(), hp, inv);
        if (Math.abs(lp[0]) > t.width / 2 || Math.abs(lp[1]) > t.height / 2) continue;
        t.hits++;
        this.renderer.decals.add(DecalKind.PaperHole, vec3.scaleAndAdd(vec3.create(), hp, nrm, 0.001), nrm, 0.014, t.object);
        this.renderer.decals.add(DecalKind.PaperHole, vec3.scaleAndAdd(vec3.create(), hp, nrm, -0.004), vec3.negate(vec3.create(), nrm), 0.02, t.object);
        this.engine.audio.impact('paper', hp, 0);
      }
    }
    for (const id of [...this.lastProj.keys()]) if (!seen.has(id)) this.lastProj.delete(id);
  }
}
