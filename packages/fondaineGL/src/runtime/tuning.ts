// Tuning registry: every realism parameter registers here with units and ranges, namespaced by module
// (fondaineGL, vorp, oAxis). The dev panel renders one tab per module; each module's preset saves/loads
// as its own JSON (and persists in localStorage) so a "look" or a "sound" is reproducible on its own.

export interface TuneParam {
  module: string;
  group: string;
  key: string;
  label: string;
  kind: 'number' | 'bool' | 'enum';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: string[];
  help?: string;
  get: () => number | boolean | string;
  set: (v: number | boolean | string) => void;
}

export const MODULES = { gl: 'fondaineGL', vorp: 'vorp', oaxis: 'oAxis' } as const;

interface Hub { params: TuneParam[]; listeners: (() => void)[] }

export class Tuning {
  private hub: Hub;
  private storageKey: string;
  /** Module this view registers into. */
  readonly module: string;

  constructor(storageKey = 'fondaine.tuning', module: string = MODULES.gl, hub?: Hub) {
    this.storageKey = storageKey;
    this.module = module;
    this.hub = hub ?? { params: [], listeners: [] };
  }

  /** All parameters of every module. */
  get params(): TuneParam[] { return this.hub.params; }
  /** A view of the same registry that registers into another module (`tuning.scope('vorp')`). */
  scope(module: string): Tuning { return new Tuning(this.storageKey, module, this.hub); }
  get modules(): string[] { return [...new Set(this.hub.params.map((p) => p.module))]; }
  private k(group: string, key: string) { return `${this.module}:${group}.${key}`; }

  /** Register a numeric field of an object. */
  number<T extends object>(group: string, obj: T, key: keyof T & string, o: { label?: string; min: number; max: number; step?: number; unit?: string; help?: string; onChange?: (v: number) => void }) {
    this.hub.params.push({
      module: this.module, group, key: this.k(group, key), label: o.label ?? key, kind: 'number', min: o.min, max: o.max, step: o.step ?? (o.max - o.min) / 200, unit: o.unit, help: o.help,
      get: () => obj[key] as unknown as number,
      set: (v) => { (obj as Record<string, unknown>)[key] = Number(v); o.onChange?.(Number(v)); this.emit(); },
    });
    return this;
  }
  bool<T extends object>(group: string, obj: T, key: keyof T & string, o: { label?: string; help?: string; onChange?: (v: boolean) => void } = {}) {
    this.hub.params.push({
      module: this.module, group, key: this.k(group, key), label: o.label ?? key, kind: 'bool', help: o.help,
      get: () => obj[key] as unknown as boolean,
      set: (v) => { (obj as Record<string, unknown>)[key] = !!v; o.onChange?.(!!v); this.emit(); },
    });
    return this;
  }
  choice<T extends object>(group: string, obj: T, key: keyof T & string, options: string[], o: { label?: string; help?: string; onChange?: (v: string) => void } = {}) {
    this.hub.params.push({
      module: this.module, group, key: this.k(group, key), label: o.label ?? key, kind: 'enum', options, help: o.help,
      get: () => obj[key] as unknown as string,
      set: (v) => { (obj as Record<string, unknown>)[key] = String(v); o.onChange?.(String(v)); this.emit(); },
    });
    return this;
  }
  /** Register an index into a Float32Array (e.g. vorp parameter blocks). */
  arrayValue(group: string, arr: Float32Array, index: number, o: { key: string; label: string; min: number; max: number; step?: number; unit?: string; help?: string; onChange?: () => void }) {
    this.hub.params.push({
      module: this.module, group, key: this.k(group, o.key), label: o.label, kind: 'number', min: o.min, max: o.max, step: o.step ?? (o.max - o.min) / 200, unit: o.unit, help: o.help,
      get: () => arr[index],
      set: (v) => { arr[index] = Number(v); o.onChange?.(); this.emit(); },
    });
    return this;
  }

  /** Groups of one module (default: this view's module). */
  groups(module: string = this.module): string[] { return [...new Set(this.hub.params.filter((p) => p.module === module).map((p) => p.group))]; }
  /** Remove every parameter of a group (e.g. when a weapon is destroyed). */
  unregister(group: string, module: string = this.module) {
    for (let i = this.hub.params.length - 1; i >= 0; i--) if (this.hub.params[i].module === module && this.hub.params[i].group === group) this.hub.params.splice(i, 1);
  }
  onChange(cb: () => void) { this.hub.listeners.push(cb); }
  private emit() { for (const l of this.hub.listeners) l(); }

  /** Values of one module (or every module with `'*'`). */
  snapshot(module: string = this.module): Record<string, number | boolean | string> {
    const o: Record<string, number | boolean | string> = {};
    for (const p of this.hub.params) if (module === '*' || p.module === module) o[p.key] = p.get();
    return o;
  }
  apply(values: Record<string, number | boolean | string>) {
    for (const p of this.hub.params) if (p.key in values) p.set(values[p.key]);
  }
  save(name = 'default', module: string = this.module) {
    try { localStorage.setItem(`${this.storageKey}.${module}.${name}`, JSON.stringify(this.snapshot(module))); } catch { /* storage may be unavailable */ }
  }
  load(name = 'default', module: string = this.module): boolean {
    try {
      const s = localStorage.getItem(`${this.storageKey}.${module}.${name}`);
      if (!s) return false;
      this.apply(JSON.parse(s));
      return true;
    } catch { return false; }
  }
  exportJSON(module: string = this.module): string { return JSON.stringify(this.snapshot(module), null, 2); }
}
