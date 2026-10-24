// Minimal, fast-enough entity–component store. Components are plain objects keyed by a typed token.

export type Entity = number;

export interface ComponentType<T> {
  readonly id: number;
  readonly name: string;
  /** phantom */
  readonly __type?: T;
}

let NEXT_COMPONENT = 1;
export function defineComponent<T>(name: string): ComponentType<T> {
  return { id: NEXT_COMPONENT++, name };
}

export class World {
  private nextEntity = 1;
  private readonly alive = new Set<Entity>();
  private readonly stores = new Map<number, Map<Entity, unknown>>();
  private readonly names = new Map<Entity, string>();
  /** Called when an entity is destroyed (systems clean up GPU/physics resources here). */
  readonly onDespawn: ((e: Entity) => void)[] = [];
  /** Called when a component is removed (incl. on despawn). */
  readonly onRemove = new Map<number, ((e: Entity, value: unknown) => void)[]>();

  spawn(name?: string): Entity {
    const e = this.nextEntity++;
    this.alive.add(e);
    if (name) this.names.set(e, name);
    return e;
  }

  despawn(e: Entity) {
    if (!this.alive.has(e)) return;
    for (const cb of this.onDespawn) cb(e);
    for (const [id, store] of this.stores) {
      if (store.has(e)) {
        const v = store.get(e);
        store.delete(e);
        for (const cb of this.onRemove.get(id) ?? []) cb(e, v);
      }
    }
    this.alive.delete(e);
    this.names.delete(e);
  }

  isAlive(e: Entity) { return this.alive.has(e); }
  nameOf(e: Entity) { return this.names.get(e) ?? `entity#${e}`; }
  get entityCount() { return this.alive.size; }

  add<T>(e: Entity, type: ComponentType<T>, value: T): T {
    let s = this.stores.get(type.id);
    if (!s) { s = new Map(); this.stores.set(type.id, s); }
    s.set(e, value);
    return value;
  }

  get<T>(e: Entity, type: ComponentType<T>): T | undefined {
    return this.stores.get(type.id)?.get(e) as T | undefined;
  }

  require<T>(e: Entity, type: ComponentType<T>): T {
    const v = this.get(e, type);
    if (v === undefined) throw new Error(`${this.nameOf(e)} has no ${type.name}`);
    return v;
  }

  has(e: Entity, type: ComponentType<unknown>): boolean { return this.stores.get(type.id)?.has(e) ?? false; }

  remove<T>(e: Entity, type: ComponentType<T>) {
    const s = this.stores.get(type.id);
    if (!s?.has(e)) return;
    const v = s.get(e);
    s.delete(e);
    for (const cb of this.onRemove.get(type.id) ?? []) cb(e, v);
  }

  onRemoved<T>(type: ComponentType<T>, cb: (e: Entity, value: T) => void) {
    const list = this.onRemove.get(type.id) ?? [];
    list.push(cb as (e: Entity, v: unknown) => void);
    this.onRemove.set(type.id, list);
  }

  /** Iterate entities having all listed components. Yields [entity, ...values]. */
  query<A>(a: ComponentType<A>): Generator<[Entity, A]>;
  query<A, B>(a: ComponentType<A>, b: ComponentType<B>): Generator<[Entity, A, B]>;
  query<A, B, C>(a: ComponentType<A>, b: ComponentType<B>, c: ComponentType<C>): Generator<[Entity, A, B, C]>;
  *query(...types: ComponentType<unknown>[]): Generator<unknown[]> {
    const stores = types.map((t) => this.stores.get(t.id));
    if (stores.some((s) => !s)) return;
    // iterate the smallest store
    let smallest = 0;
    for (let i = 1; i < stores.length; i++) if (stores[i]!.size < stores[smallest]!.size) smallest = i;
    for (const e of [...stores[smallest]!.keys()]) {
      const row: unknown[] = [e];
      let ok = true;
      for (const s of stores) {
        if (!s!.has(e)) { ok = false; break; }
        row.push(s!.get(e));
      }
      if (ok) yield row;
    }
  }

  entities(): IterableIterator<Entity> { return this.alive.values(); }
}
