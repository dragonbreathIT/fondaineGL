// Scripting API (TypeScript). Attach Behaviours to entities; the engine calls the lifecycle hooks.
//
//   class Spinner extends Behaviour {
//     speed = 1;                          // public fields show up as tunables if you call this.tune(...)
//     onUpdate(dt: number) { this.transform.setEuler(0, this.time * this.speed, 0); }
//   }
//   engine.addScript(entity, new Spinner());

import type { Engine } from './engine';
import { defineComponent, type ComponentType, type Entity } from './ecs';
import { Transform, TransformC } from './transform';

export abstract class Behaviour {
  engine!: Engine;
  entity!: Entity;
  enabled = true;
  /** @internal */ _started = false;

  get transform(): Transform { return this.engine.world.require(this.entity, TransformC); }
  get time(): number { return this.engine.time; }
  get input() { return this.engine.input; }
  get physics() { return this.engine.physics; }
  get audio() { return this.engine.audio; }
  get renderer() { return this.engine.renderer; }

  getComponent<T>(type: ComponentType<T>): T | undefined { return this.engine.world.get(this.entity, type); }
  addComponent<T>(type: ComponentType<T>, value: T): T { return this.engine.world.add(this.entity, type, value); }

  /** Register a numeric property of this script in the tuning panel. */
  tune<K extends keyof this & string>(key: K, o: { group?: string; min: number; max: number; step?: number; unit?: string; help?: string; label?: string }) {
    this.engine.tuning.number(o.group ?? this.constructor.name, this as unknown as Record<string, number>, key, o);
  }

  /** Called once before the first update. */
  onStart?(): void;
  /** Fixed-rate (engine.fixedDt) — physics-related logic. */
  onFixedUpdate?(dt: number): void;
  /** Every rendered frame. */
  onUpdate?(dt: number): void;
  /** After all updates, before rendering (camera follow etc.). */
  onLateUpdate?(dt: number): void;
  onDestroy?(): void;
}

export const ScriptsC = defineComponent<Behaviour[]>('Scripts');
