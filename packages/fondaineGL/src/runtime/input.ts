// Keyboard / mouse (pointer-lock, raw) / gamepad input with action bindings.

export interface Binding { keys?: string[]; mouse?: number[]; gamepadButtons?: number[] }

export class Input {
  private down = new Set<string>();
  private pressed = new Set<string>();
  private released = new Set<string>();
  private mouseDown = new Set<number>();
  private mousePressed = new Set<number>();
  private mouseReleased = new Set<number>();
  private padPrev: boolean[] = [];
  mouseDX = 0;
  mouseDY = 0;
  wheel = 0;
  /** Degrees of rotation per pixel of mouse movement. */
  sensitivity = 0.075;
  invertY = false;
  readonly bindings = new Map<string, Binding>();
  locked = false;
  gamepad: Gamepad | null = null;
  /** Gamepad look speed (deg/s at full deflection). */
  padLookSpeed = 160;
  deadzone = 0.12;
  private target: HTMLElement;

  constructor(target: HTMLElement) {
    this.target = target;
    addEventListener('keydown', (e) => {
      if (e.repeat) return;
      this.down.add(e.code);
      this.pressed.add(e.code);
      if (this.locked && ['Tab', 'Space', 'KeyF', 'Backquote'].includes(e.code)) e.preventDefault();
    });
    addEventListener('keyup', (e) => { this.down.delete(e.code); this.released.add(e.code); });
    addEventListener('blur', () => { this.down.clear(); this.mouseDown.clear(); });
    target.addEventListener('mousedown', (e) => { this.mouseDown.add(e.button); this.mousePressed.add(e.button); });
    addEventListener('mouseup', (e) => { this.mouseDown.delete(e.button); this.mouseReleased.add(e.button); });
    addEventListener('mousemove', (e) => { if (this.locked) { this.mouseDX += e.movementX; this.mouseDY += e.movementY; } });
    addEventListener('wheel', (e) => { this.wheel += Math.sign(e.deltaY); }, { passive: true });
    target.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('pointerlockchange', () => { this.locked = document.pointerLockElement === this.target; });
    this.defaultBindings();
  }

  /** Request pointer lock (raw, unaccelerated mouse where supported). Must be called from a user gesture. */
  async lock() {
    try {
      await (this.target.requestPointerLock as (o?: unknown) => Promise<void>).call(this.target, { unadjustedMovement: true });
    } catch {
      try { await this.target.requestPointerLock(); } catch { /* ignored */ }
    }
  }
  unlock() { document.exitPointerLock(); }

  defaultBindings() {
    const b = (name: string, binding: Binding) => this.bindings.set(name, binding);
    b('forward', { keys: ['KeyW'] });
    b('back', { keys: ['KeyS'] });
    b('left', { keys: ['KeyA'] });
    b('right', { keys: ['KeyD'] });
    b('sprint', { keys: ['ShiftLeft'], gamepadButtons: [10] });
    b('crouch', { keys: ['KeyC', 'ControlLeft'], gamepadButtons: [1] });
    b('jump', { keys: ['Space'], gamepadButtons: [0] });
    b('fire', { mouse: [0], gamepadButtons: [7] });
    b('aim', { mouse: [2], gamepadButtons: [6] });
    b('reload', { keys: ['KeyR'], gamepadButtons: [2] });
    b('fireMode', { keys: ['KeyX'], gamepadButtons: [12] });
    b('leanLeft', { keys: ['KeyQ'], gamepadButtons: [4] });
    b('leanRight', { keys: ['KeyE'], gamepadButtons: [5] });
    b('earpro', { keys: ['KeyV'] });
    b('camera', { keys: ['KeyH'] });
    b('tuning', { keys: ['F1', 'Backquote'] });
    b('holdBreath', { keys: ['AltLeft'], gamepadButtons: [11] });
  }

  private padButton(i: number): boolean { return !!this.gamepad?.buttons[i]?.pressed; }

  action(name: string): boolean {
    const b = this.bindings.get(name);
    if (!b) return false;
    return (b.keys?.some((k) => this.down.has(k)) ?? false) || (b.mouse?.some((m) => this.mouseDown.has(m)) ?? false) || (b.gamepadButtons?.some((g) => this.padButton(g)) ?? false);
  }
  actionPressed(name: string): boolean {
    const b = this.bindings.get(name);
    if (!b) return false;
    return (b.keys?.some((k) => this.pressed.has(k)) ?? false) || (b.mouse?.some((m) => this.mousePressed.has(m)) ?? false) || (b.gamepadButtons?.some((g) => this.padButton(g) && !this.padPrev[g]) ?? false);
  }
  actionReleased(name: string): boolean {
    const b = this.bindings.get(name);
    if (!b) return false;
    return (b.keys?.some((k) => this.released.has(k)) ?? false) || (b.mouse?.some((m) => this.mouseReleased.has(m)) ?? false);
  }
  key(code: string) { return this.down.has(code); }
  keyPressed(code: string) { return this.pressed.has(code); }

  /** Movement axis (-1..1) combining keyboard and left stick. */
  moveAxis(): { x: number; y: number } {
    let x = (this.action('right') ? 1 : 0) - (this.action('left') ? 1 : 0);
    let y = (this.action('forward') ? 1 : 0) - (this.action('back') ? 1 : 0);
    if (this.gamepad) {
      const ax = this.gamepad.axes[0] ?? 0, ay = this.gamepad.axes[1] ?? 0;
      if (Math.hypot(ax, ay) > this.deadzone) { x += ax; y -= ay; }
    }
    const l = Math.hypot(x, y);
    if (l > 1) { x /= l; y /= l; }
    return { x, y };
  }

  /** Look delta in radians for this frame (mouse + right stick). */
  lookDelta(dt: number): { yaw: number; pitch: number } {
    const k = (this.sensitivity * Math.PI) / 180;
    let yaw = -this.mouseDX * k;
    let pitch = -this.mouseDY * k * (this.invertY ? -1 : 1);
    if (this.gamepad) {
      const rx = this.gamepad.axes[2] ?? 0, ry = this.gamepad.axes[3] ?? 0;
      const s = (this.padLookSpeed * Math.PI) / 180 * dt;
      if (Math.abs(rx) > this.deadzone) yaw -= Math.sign(rx) * (Math.abs(rx) - this.deadzone) / (1 - this.deadzone) * s;
      if (Math.abs(ry) > this.deadzone) pitch -= Math.sign(ry) * (Math.abs(ry) - this.deadzone) / (1 - this.deadzone) * s;
    }
    return { yaw, pitch };
  }

  /** Gamepad rumble (dual-rumble), e.g. on each shot. */
  rumble(strong: number, weak: number, ms: number) {
    const a = (this.gamepad as unknown as { vibrationActuator?: { playEffect?: (t: string, p: unknown) => void } })?.vibrationActuator;
    a?.playEffect?.('dual-rumble', { duration: ms, strongMagnitude: Math.min(1, strong), weakMagnitude: Math.min(1, weak) });
  }

  /** Call at the start of each frame. */
  poll() {
    const pads = navigator.getGamepads?.() ?? [];
    this.gamepad = pads.find((p) => p && p.connected) ?? null;
  }
  /** Call at the end of each frame. */
  endFrame() {
    this.pressed.clear(); this.released.clear(); this.mousePressed.clear(); this.mouseReleased.clear();
    this.mouseDX = 0; this.mouseDY = 0; this.wheel = 0;
    if (this.gamepad) this.padPrev = this.gamepad.buttons.map((b) => b.pressed);
  }
}
