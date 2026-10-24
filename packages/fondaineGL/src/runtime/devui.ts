// Developer tuning panel (F1 / `): one tab per module (fondaineGL / vorp / oAxis), every registered realism
// parameter live, with per-module save/load/export.
// Dependency-free DOM; styled to stay out of the way of the image.

import { Tuning, TuneParam } from './tuning';

const CSS = `
.fdui{position:fixed;top:0;right:0;bottom:0;width:380px;background:rgba(14,15,17,.94);color:#d8dade;font:12px/1.35 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;z-index:50;display:flex;flex-direction:column;border-left:1px solid #2a2d33;backdrop-filter:blur(6px)}
.fdui header{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid #2a2d33}
.fdui header b{font-size:13px;letter-spacing:.04em}
.fdui header .logo{font-weight:700;color:#f3b23a}
.fdui .stats{padding:6px 12px;color:#8e939c;border-bottom:1px solid #2a2d33;white-space:pre}
.fdui .mods{display:flex;gap:0;border-bottom:1px solid #2a2d33}
.fdui .mods button{flex:1;background:none;color:#8e939c;border:0;border-bottom:2px solid transparent;padding:8px 4px;cursor:pointer;font:inherit;font-weight:700;letter-spacing:.03em}
.fdui .mods button.on{color:#f3b23a;border-bottom-color:#f3b23a}
.fdui .tabs{display:flex;flex-wrap:wrap;gap:4px;padding:8px 12px;border-bottom:1px solid #2a2d33}
.fdui .tabs button{background:#1d2025;color:#b9bcc3;border:1px solid #30343b;border-radius:4px;padding:3px 7px;cursor:pointer;font:inherit}
.fdui .tabs button.on{background:#f3b23a;color:#111;border-color:#f3b23a}
.fdui .body{overflow:auto;flex:1;padding:6px 12px 20px}
.fdui .row{display:grid;grid-template-columns:150px 1fr 64px;align-items:center;gap:8px;padding:3px 0}
.fdui .row label{color:#aeb2ba;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.fdui .row input[type=range]{width:100%;accent-color:#f3b23a}
.fdui .row input[type=number]{width:64px;background:#121417;color:#e6e7ea;border:1px solid #30343b;border-radius:3px;font:inherit;padding:1px 3px}
.fdui .row select{background:#121417;color:#e6e7ea;border:1px solid #30343b;font:inherit}
.fdui .row .unit{color:#6f747d;font-size:10px}
.fdui footer{display:flex;gap:6px;padding:8px 12px;border-top:1px solid #2a2d33;flex-wrap:wrap}
.fdui footer button{background:#1d2025;color:#d8dade;border:1px solid #30343b;border-radius:4px;padding:4px 8px;cursor:pointer;font:inherit}
.fdui .help{grid-column:1/-1;color:#6f747d;font-size:10.5px;margin:-2px 0 4px}
`;

export class DevUI {
  readonly root: HTMLDivElement;
  private body: HTMLDivElement;
  private statsEl: HTMLDivElement;
  private tabs: HTMLDivElement;
  private mods: HTMLDivElement;
  private module = '';
  private group = '';
  private inputs = new Map<string, () => void>();
  visible = false;
  statsText: () => string = () => '';

  constructor(private tuning: Tuning, title = 'fondaine') {
    if (!document.getElementById('fdui-css')) {
      const s = document.createElement('style');
      s.id = 'fdui-css';
      s.textContent = CSS;
      document.head.appendChild(s);
    }
    this.root = document.createElement('div');
    this.root.className = 'fdui';
    this.root.style.display = 'none';
    this.root.innerHTML = `<header><span class="logo">/f</span><b>${title}</b><span style="margin-left:auto;color:#6f747d">F1 to close</span></header>`;
    this.statsEl = document.createElement('div');
    this.statsEl.className = 'stats';
    this.mods = document.createElement('div');
    this.mods.className = 'mods';
    this.tabs = document.createElement('div');
    this.tabs.className = 'tabs';
    this.body = document.createElement('div');
    this.body.className = 'body';
    const footer = document.createElement('footer');
    const btn = (label: string, fn: () => void) => { const b = document.createElement('button'); b.textContent = label; b.onclick = fn; footer.appendChild(b); };
    btn('Save', () => tuning.save('default', this.module));
    btn('Load', () => { tuning.load('default', this.module); this.refresh(); });
    btn('Export JSON', () => {
      const blob = new Blob([tuning.exportJSON(this.module)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${this.module}-tuning.json`;
      a.click();
    });
    btn('Import JSON', () => {
      const inp = document.createElement('input');
      inp.type = 'file';
      inp.accept = '.json';
      inp.onchange = async () => { const f = inp.files?.[0]; if (f) { tuning.apply(JSON.parse(await f.text())); this.refresh(); } };
      inp.click();
    });
    this.root.append(this.statsEl, this.mods, this.tabs, this.body, footer);
    document.body.appendChild(this.root);
    // swallow input so typing in the panel doesn't move the player
    for (const ev of ['keydown', 'mousedown', 'wheel']) this.root.addEventListener(ev, (e) => e.stopPropagation());
  }

  toggle(v = !this.visible) {
    this.visible = v;
    this.root.style.display = v ? 'flex' : 'none';
    if (v) this.rebuild();
  }

  private rebuild() {
    const modules = this.tuning.modules;
    if (!this.module || !modules.includes(this.module)) this.module = modules[0] ?? '';
    this.mods.innerHTML = '';
    for (const m of modules) {
      const b = document.createElement('button');
      b.textContent = m;
      if (m === this.module) b.className = 'on';
      b.onclick = () => { this.module = m; this.group = ''; this.rebuild(); };
      this.mods.appendChild(b);
    }
    const groups = this.tuning.groups(this.module);
    if (!this.group || !groups.includes(this.group)) this.group = groups[0] ?? '';
    this.tabs.innerHTML = '';
    for (const g of groups) {
      const b = document.createElement('button');
      b.textContent = g;
      if (g === this.group) b.className = 'on';
      b.onclick = () => { this.group = g; this.rebuild(); };
      this.tabs.appendChild(b);
    }
    this.body.innerHTML = '';
    this.inputs.clear();
    for (const p of this.tuning.params.filter((x) => x.module === this.module && x.group === this.group)) this.body.appendChild(this.row(p));
  }

  private row(p: TuneParam): HTMLElement {
    const wrap = document.createElement('div');
    wrap.className = 'row';
    const label = document.createElement('label');
    label.textContent = p.unit ? `${p.label} (${p.unit})` : p.label;
    label.title = p.help ?? p.key;
    wrap.appendChild(label);
    if (p.kind === 'number') {
      const range = document.createElement('input');
      range.type = 'range';
      range.min = String(p.min); range.max = String(p.max); range.step = String(p.step ?? 0.01);
      const num = document.createElement('input');
      num.type = 'number';
      num.step = String(p.step ?? 0.01);
      const sync = () => { const v = Number(p.get()); range.value = String(v); num.value = String(+v.toPrecision(5)); };
      range.oninput = () => { p.set(Number(range.value)); num.value = String(+Number(range.value).toPrecision(5)); };
      num.onchange = () => { p.set(Number(num.value)); range.value = num.value; };
      sync();
      this.inputs.set(p.key, sync);
      wrap.append(range, num);
    } else if (p.kind === 'bool') {
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = !!p.get();
      cb.onchange = () => p.set(cb.checked);
      this.inputs.set(p.key, () => { cb.checked = !!p.get(); });
      wrap.append(cb, document.createElement('span'));
    } else {
      const sel = document.createElement('select');
      for (const o of p.options ?? []) { const op = document.createElement('option'); op.value = o; op.textContent = o; sel.appendChild(op); }
      sel.value = String(p.get());
      sel.onchange = () => p.set(sel.value);
      this.inputs.set(p.key, () => { sel.value = String(p.get()); });
      wrap.append(sel, document.createElement('span'));
    }
    if (p.help) { const h = document.createElement('div'); h.className = 'help'; h.textContent = p.help; wrap.appendChild(h); }
    return wrap;
  }

  refresh() { for (const f of this.inputs.values()) f(); }

  update() { if (this.visible) this.statsEl.textContent = this.statsText(); }
}
