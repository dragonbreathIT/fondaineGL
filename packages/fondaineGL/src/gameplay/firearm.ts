// Firearms driven by physics: projectile ballistics (Rust G7 solver), recoil from conservation of momentum
// coupled into a shooter hold model, zeroed sights, muzzle flash/smoke, brass ejection as rigid bodies with
// contact sounds, mechanical action sounds, reload state machine, procedural viewmodel motion, and action
// animation: slide/bolt cycling with lock-open on empty, magazines dropped as physics bodies, trigger travel,
// draw / holster.

import { mat4, Mat4, quat, Quat, vec3, Vec3, damp, DEG2RAD, rng, ParticleKind, PointLight, RenderObject, Mesh, Material, Geometry, kelvinToLinear } from '../gl';
import { GunshotPreset, casingModes, receiverModes, IMPACTS } from '@fondaine/vorp';
import { Behaviour } from '../runtime/script';
import { MODULES } from '../runtime/tuning';
import { BodyShape, Body } from '../runtime/physics';
import { FPSController } from './fps-controller';
import { SURFACE, surfaceOf } from './surfaces';

export interface Caliber {
  name: string;
  bulletMassKg: number;
  diameterM: number;
  lengthM: number;
  /** G7 ballistic coefficient (lb/in²). */
  bcG7: number;
  /** Muzzle velocity from the reference barrel (m/s). */
  muzzleVelocity: number;
  referenceBarrelM: number;
  /** Velocity change per metre of barrel length (m/s per m) around the reference. */
  velocityPerBarrelM: number;
  powderMassKg: number;
  /** Effective propellant-gas velocity as a multiple of bullet velocity (≈1.5–1.75 rifle, ≈1.3 pistol). */
  gasVelocityFactor: number;
  casing: { lengthM: number; diameterM: number; massKg: number };
}

export const CALIBERS: Record<string, Caliber> = {
  '5.56x45 M855': { name: '5.56×45mm M855 62gr', bulletMassKg: 0.004018, diameterM: 0.0057, lengthM: 0.0233, bcG7: 0.151, muzzleVelocity: 948, referenceBarrelM: 0.508, velocityPerBarrelM: 380, powderMassKg: 0.00168, gasVelocityFactor: 1.7, casing: { lengthM: 0.0448, diameterM: 0.0095, massKg: 0.0063 } },
  '5.56x45 Mk262': { name: '5.56×45mm Mk262 77gr', bulletMassKg: 0.00499, diameterM: 0.0057, lengthM: 0.0254, bcG7: 0.186, muzzleVelocity: 850, referenceBarrelM: 0.457, velocityPerBarrelM: 340, powderMassKg: 0.00162, gasVelocityFactor: 1.7, casing: { lengthM: 0.0448, diameterM: 0.0095, massKg: 0.0063 } },
  '7.62x51 M118LR': { name: '7.62×51mm M118LR 175gr', bulletMassKg: 0.01134, diameterM: 0.00782, lengthM: 0.0315, bcG7: 0.243, muzzleVelocity: 790, referenceBarrelM: 0.559, velocityPerBarrelM: 230, powderMassKg: 0.00272, gasVelocityFactor: 1.6, casing: { lengthM: 0.0512, diameterM: 0.0119, massKg: 0.0123 } },
  '9x19 124gr': { name: '9×19mm 124gr FMJ', bulletMassKg: 0.00803, diameterM: 0.00901, lengthM: 0.0155, bcG7: 0.072, muzzleVelocity: 360, referenceBarrelM: 0.102, velocityPerBarrelM: 300, powderMassKg: 0.00036, gasVelocityFactor: 1.3, casing: { lengthM: 0.019, diameterM: 0.0099, massKg: 0.0037 } },
};

export type FireMode = 'safe' | 'semi' | 'auto';

export interface FirearmSpec {
  name: string;
  caliber: Caliber;
  barrelLengthM: number;
  massKg: number;
  rpm: number;
  /** Selector positions in order (X cycles). 'safe' blocks the trigger. */
  fireModes: FireMode[];
  magazineCapacity: number;
  sightHeightM: number;
  zeroM: number;
  /** Mechanical accuracy (MOA, 1σ-ish group radius). */
  accuracyMoa: number;
  /** Recoil + hold model. */
  recoil: {
    /** Bore axis height above the shoulder contact point (m): bigger = more muzzle rise. */
    boreAboveShoulderM: number;
    /** Rotational inertia of gun + arms about the shoulder (kg·m²). */
    inertia: number;
    /** Effective shooter mass coupled to the stock (kg). */
    shoulderMassKg: number;
    /** Hold natural frequency (rad/s) and damping ratio. */
    holdOmega: number;
    holdDamping: number;
    /** Horizontal recoil as a fraction of vertical (random sign). */
    horizontalRatio: number;
    /** Fraction of gun rotation the view follows (cheek weld): hip / ADS. */
    viewCouplingHip: number;
    viewCouplingAds: number;
    /** Fraction of each shot's rise that is NOT recovered by the shooter (you must pull down). */
    residualRise: number;
    /** Visual snap of the weapon in the hands (fast spring), 0..2. */
    kick?: number;
    /** Camera punch per shot (view shake that springs back), 0..2. */
    cameraPunch?: number;
    /** How much sustained fire degrades control (climb + horizontal wander per shot). */
    autoClimb?: number;
  };
  /**
   * Reload phase durations (s). magOut: release + drop the magazine; magIn: fetch + seat the new one;
   * boltRelease: send the bolt home from the catch (AR) or settle the support hand after a tactical reload;
   * charge: rack the slide / pull the charging handle when the chamber is empty and nothing holds the action open
   * (default 0.6).
   */
  reload: { magOut: number; magIn: number; boltRelease: number; charge?: number };
  /**
   * Where the weapon goes during a reload, relative to the hip pose (metres / radians): lifted and pulled
   * towards the chest, muzzle up, rolled so the magwell and the ejection port face the eye. Defaults differ for
   * pistols (rolled ~35°, high) and rifles (rolled ~25°, lower).
   */
  reloadPose?: { lift: number; back: number; pitch: number; yaw: number; roll: number; /** extra roll while racking */ chargeRoll: number };
  audio: GunshotPreset;
  flash: { kelvin: number; luminance: number; sizeM: number; lightCandela: number; sidePorts: boolean; smoke: number };
  ejection: { speed: number; up: number; back: number; spinRad: number };
  /** Viewmodel placement relative to the eye (camera space: +x right, +y up, −z forward). */
  hipOffset: [number, number, number];
  /** Distance from the eye to the rear sight when aiming (m). */
  eyeRelief: number;
  adsTime: number;
  suppressed?: boolean;
  /** Reciprocating action (slide / bolt carrier). Omit for weapons without an animated bolt part. */
  action?: {
    /** Rearward travel of the slide/bolt (m). */
    travelM: number;
    /** Time to full rearward travel after the shot (ms) and to return to battery (ms). */
    backMs: number;
    returnMs: number;
    /** Slide/bolt catch holds the action open after the last round. */
    lockOpenOnEmpty: boolean;
    /** Fraction of full travel at which the catch holds it. */
    lockFraction?: number;
  };
  /** Draw (equip) time in seconds. */
  drawTime?: number;
}

export interface FirearmModel {
  /** Parts in rifle-local space (+x right, +y up, −z towards the muzzle). */
  parts: { object: RenderObject; local: Mat4; magazine?: boolean; bolt?: boolean; trigger?: boolean; selector?: boolean; charge?: boolean }[];
  muzzle: Vec3;
  ejectionPort: Vec3;
  rearSight: Vec3;
  frontSight: Vec3;
  /** Casing geometry/material for ejected brass. */
  casingMesh: Mesh;
  casingMaterial: Material;
  /** Unit direction the magazine leaves the magwell (weapon space). Enables the magazine reload animation. */
  magAxis?: Vec3;
  /** Magazine collision box (weapon space, at rest): enables dropped magazines as physics bodies. */
  magBox?: { center: Vec3; half: Vec3 };
  /** Trigger travel (m) for parts flagged `trigger`. */
  triggerTravelM?: number;
  /** Fire-selector lever: parts flagged `selector` rotate about `axis` through `pivot` to the angle of the mode. */
  selector?: { pivot: [number, number, number]; axis: [number, number, number]; angles: Partial<Record<FireMode, number>> };
  /**
   * Manual charging (racking) of the action, used to finish a reload from empty and to chamber the first round.
   * `grip` is where the support hand grabs (weapon space): the rear slide serrations on a pistol, the charging-handle
   * latch on an AR. Parts flagged `charge` (a non-reciprocating charging handle) translate +z by the rack travel
   * together with the `bolt` parts; on a pistol there is no `charge` part and the slide (`bolt`) is what moves.
   * `travelM` defaults to spec.action.travelM. `release`: 'slingshot' lets go of the handle (spring return);
   * 'boltRelease' = the support hand slaps the bolt catch instead when the bolt is already locked open.
   */
  charge?: { grip: Vec3; travelM?: number; release?: 'slingshot' | 'boltRelease'; /** direction the hand pulls, weapon space (default +z) */ pullDir?: Vec3 };
}

export type ReloadPhase = 'magOut' | 'magIn' | 'charge' | 'release' | 'settle';

interface Casing { body: Body; obj: RenderObject; born: number; lastSound: number; settled: boolean }
interface DroppedMag { body: Body; objs: RenderObject[]; lastSound: number }

export class Firearm extends Behaviour {
  rounds: number;
  chambered = true;
  mode: FireMode;
  ads = 0;
  readonly rootWorld: Mat4 = mat4.create();
  shotsFired = 0;
  maxCasings = 80;
  /** Sound + flash on/off (tests / silent capture). */
  effectsEnabled = true;
  onShot: ((muzzle: Vec3, dir: Vec3) => void) | null = null;
  /** Scripted trigger (demos, tests, AI): overrides player input when not null. */
  triggerOverride: boolean | null = null;
  /** Scripted aim-down-sights (0..1) when not null. */
  adsOverride: number | null = null;
  /** Holstered weapons are hidden and ignore input (their ejected brass keeps simulating). */
  holstered = false;
  /** Max dropped magazines kept in the world. */
  maxDroppedMags = 8;
  /** Action animation state, readable by scripts. */
  readonly anim = { slide: 0, magOffset: 0, magVisible: true, trigger: 0, lockedOpen: false, equip: 1, /** rearward travel of `charge` parts (m), only while racking */ charge: 0 };
  /** Current reload phase (null when not reloading) and normalised time 0..1 within it, for hand choreography. */
  reloadPhase: ReloadPhase | null = null;
  phaseT = 0;
  /** Magazine drop/insert speeds (oAxis tuning). */
  readonly magAnim = { ejectSpeed: 1.2, insertDistance: 0.14, seatFraction: 0.7 };

  // recoil state
  private rot = { x: 0, y: 0, vx: 0, vy: 0 }; // pitch (x) / yaw (y) offsets, rad
  /** Fast visual kick of the weapon in the hands: translation back (z) + pitch/roll snap. */
  private kick = { z: 0, vz: 0, rx: 0, vrx: 0, rz: 0, vrz: 0 };
  private heat = 0;
  private wander = 0;
  private selectorAngle = 0;
  private switchT = 1;
  private back = { z: 0, v: 0 };
  private cooldown = 0;
  private triggerHeld = false;
  private reloadT = -1;
  private sway = { x: 0, y: 0, vx: 0, vy: 0 };
  private breathPhase = Math.random() * 10;
  private holdBreathT = 0;
  private lastShotTime = -10;
  private flashLight: PointLight;
  private flashLife = 0;
  private casings: Casing[] = [];
  private casingByBody = new Map<number, Casing>();
  private rand = rng(4242);
  private zeroAngle = 0;
  private muzzleVelocity: number;
  private slideT = 1e9;        // seconds since the last cycle started
  private releaseT = -1;       // seconds since slide release (−1 = none)
  private releaseFrom = 0;     // slide position the release started from (m)
  private rackPull = -1;       // slide position imposed by the racking hand (m), −1 = hand off
  private rackRelease = false; // charging handle riding home after a rack
  private reloadNeedsCharge = false;
  private rackT = -1;          // seconds into a stand-alone rack (−1 = none)
  private rackSoundDone = 0;
  private equipT = 1e9;
  private droppedMags: DroppedMag[] = [];
  private magByBody = new Map<number, DroppedMag>();
  private magDropped = false;

  constructor(readonly spec: FirearmSpec, readonly model: FirearmModel, readonly controller: FPSController) {
    super();
    this.rounds = spec.magazineCapacity;
    this.mode = spec.fireModes.find((m) => m !== 'safe') ?? spec.fireModes[0];
    this.selectorAngle = model.selector?.angles[this.mode] ?? 0;
    this.flashLight = new PointLight();
    this.flashLight.enabled = false;
    const c = spec.caliber;
    this.muzzleVelocity = c.muzzleVelocity + (spec.barrelLengthM - c.referenceBarrelM) * c.velocityPerBarrelM;
  }

  /** Free recoil impulse (N·s): bullet momentum + propellant gas momentum. */
  get recoilImpulse(): number {
    const c = this.spec.caliber;
    return c.bulletMassKg * this.muzzleVelocity + c.powderMassKg * this.muzzleVelocity * c.gasVelocityFactor;
  }
  /** Free recoil energy (J) of the weapon alone. */
  get freeRecoilEnergy(): number { const v = this.recoilImpulse / this.spec.massKg; return 0.5 * this.spec.massKg * v * v; }
  get velocity(): number { return this.muzzleVelocity; }

  onStart() {
    this.engine.scene.addLight(this.flashLight);
    for (const p of this.model.parts) { p.object.viewmodel = true; p.object.castShadow = false; this.engine.scene.add(p.object); }
    this.computeZero();
    this.physics.onContact.push((c) => this.onCasingContact(c.body, c.speed, c.otherMaterial, c.point));
    const g = `Weapon: ${this.spec.name}`;
    const r = this.spec.recoil as unknown as Record<string, number>;
    const t = this.engine.tuning.scope(MODULES.gl);
    t.number(g, this.spec, 'massKg', { label: 'Weapon mass', min: 0.5, max: 12, step: 0.01, unit: 'kg' });
    t.number(g, this.spec, 'barrelLengthM', { label: 'Barrel length', min: 0.08, max: 0.8, step: 0.001, unit: 'm', onChange: () => { const c = this.spec.caliber; this.muzzleVelocity = c.muzzleVelocity + (this.spec.barrelLengthM - c.referenceBarrelM) * c.velocityPerBarrelM; this.computeZero(); } });
    t.number(g, this.spec, 'rpm', { label: 'Rate of fire', min: 60, max: 1200, step: 1, unit: 'rpm' });
    t.number(g, this.spec, 'zeroM', { label: 'Zero distance', min: 10, max: 500, step: 1, unit: 'm', onChange: () => this.computeZero() });
    t.number(g, this.spec, 'accuracyMoa', { label: 'Mechanical accuracy', min: 0, max: 8, step: 0.05, unit: 'MOA' });
    t.number(g, r, 'boreAboveShoulderM', { label: 'Bore over shoulder', min: 0, max: 0.12, step: 0.001, unit: 'm' });
    t.number(g, r, 'inertia', { label: 'Gun+arms inertia', min: 0.05, max: 1, step: 0.005, unit: 'kg·m²' });
    t.number(g, r, 'shoulderMassKg', { label: 'Shoulder coupled mass', min: 1, max: 40, step: 0.5, unit: 'kg' });
    t.number(g, r, 'holdOmega', { label: 'Hold stiffness ω', min: 2, max: 40, step: 0.1, unit: 'rad/s' });
    t.number(g, r, 'holdDamping', { label: 'Hold damping ζ', min: 0.1, max: 2, step: 0.01 });
    t.number(g, r, 'horizontalRatio', { label: 'Horizontal recoil', min: 0, max: 1, step: 0.01 });
    t.number(g, r, 'viewCouplingAds', { label: 'View coupling (ADS)', min: 0, max: 1, step: 0.01 });
    t.number(g, r, 'viewCouplingHip', { label: 'View coupling (hip)', min: 0, max: 1, step: 0.01 });
    t.number(g, r, 'residualRise', { label: 'Unrecovered rise', min: 0, max: 1, step: 0.01 });
    if (r.kick === undefined) r.kick = 1;
    if (r.cameraPunch === undefined) r.cameraPunch = 1;
    if (r.autoClimb === undefined) r.autoClimb = 1;
    t.number(g, r, 'kick', { label: 'In-hands kick', min: 0, max: 3, step: 0.01, help: 'Visual snap of the weapon per shot (scaled by free-recoil energy).' });
    t.number(g, r, 'cameraPunch', { label: 'Camera punch', min: 0, max: 3, step: 0.01, help: 'View shake per shot that springs back.' });
    t.number(g, r, 'autoClimb', { label: 'Sustained-fire climb', min: 0, max: 3, step: 0.01, help: 'How fast control degrades in long full-auto strings.' });
    t.number(g, this.spec.flash, 'luminance', { label: 'Flash luminance', min: 0, max: 5e6, step: 1000, unit: 'cd/m²' });
    t.number(g, this.spec.flash, 'lightCandela', { label: 'Flash light', min: 0, max: 2e5, step: 100, unit: 'cd' });
    t.number(g, this.spec.flash, 'kelvin', { label: 'Flash temperature', min: 1200, max: 4000, step: 10, unit: 'K' });
    t.number(g, this.spec.flash, 'smoke', { label: 'Smoke', min: 0, max: 3, step: 0.01 });
    // pose + action animation belong to oAxis (models & animation)
    const ta = this.engine.tuning.scope(MODULES.oaxis);
    const ga = `Viewmodel: ${this.spec.name}`;
    ta.number(ga, this.spec, 'eyeRelief', { label: 'Eye relief (ADS)', min: 0.03, max: 0.8, step: 0.001, unit: 'm', help: 'Rifle cheek weld ≈ 0.07–0.09 m; pistol at arms length ≈ 0.5–0.65 m.' })
      .number(ga, this.spec, 'adsTime', { label: 'ADS time', min: 0.05, max: 1, step: 0.01, unit: 's' })
      .number(ga, this.spec.hipOffset as unknown as Record<string, number>, '0', { label: 'Hip offset x', min: -0.3, max: 0.3, step: 0.001, unit: 'm' })
      .number(ga, this.spec.hipOffset as unknown as Record<string, number>, '1', { label: 'Hip offset y', min: -0.4, max: 0.1, step: 0.001, unit: 'm' })
      .number(ga, this.spec.hipOffset as unknown as Record<string, number>, '2', { label: 'Hip offset z', min: -0.8, max: -0.1, step: 0.001, unit: 'm' });
    if (this.spec.drawTime !== undefined) ta.number(ga, this.spec, 'drawTime', { label: 'Draw time', min: 0.1, max: 2, step: 0.01, unit: 's' });
    if (this.spec.action) {
      const a = this.spec.action;
      ta.number(ga, a, 'travelM', { label: 'Slide/bolt travel', min: 0, max: 0.12, step: 0.0005, unit: 'm' })
        .number(ga, a, 'backMs', { label: 'Recoil stroke', min: 1, max: 40, step: 0.5, unit: 'ms', help: 'Real pistols ≈ 4–7 ms rearward, 7–10 ms return.' })
        .number(ga, a, 'returnMs', { label: 'Return stroke', min: 1, max: 60, step: 0.5, unit: 'ms' })
        .bool(ga, a, 'lockOpenOnEmpty', { label: 'Lock open on empty' });
    }
    const re = this.spec.reload as unknown as Record<string, number>;
    if (re.charge === undefined) re.charge = 0.6;
    this.spec.reloadPose ??= this.spec.action && this.spec.eyeRelief > 0.3
      ? { lift: 0.07, back: 0.09, pitch: 0.42, yaw: 0.28, roll: 0.62, chargeRoll: 0.35 }
      : { lift: 0.035, back: 0.05, pitch: 0.16, yaw: 0.32, roll: 0.42, chargeRoll: 0.2 };
    const rp = this.spec.reloadPose as unknown as Record<string, number>;
    ta.number(ga, rp, 'lift', { label: 'Reload pose: lift', min: -0.1, max: 0.2, step: 0.001, unit: 'm' })
      .number(ga, rp, 'back', { label: 'Reload pose: pull back', min: 0, max: 0.25, step: 0.001, unit: 'm' })
      .number(ga, rp, 'pitch', { label: 'Reload pose: muzzle up', min: -0.5, max: 1, step: 0.01, unit: 'rad' })
      .number(ga, rp, 'yaw', { label: 'Reload pose: yaw', min: -1, max: 1, step: 0.01, unit: 'rad' })
      .number(ga, rp, 'roll', { label: 'Reload pose: roll', min: -1.2, max: 1.2, step: 0.01, unit: 'rad' })
      .number(ga, rp, 'chargeRoll', { label: 'Rack: extra roll', min: -1, max: 1, step: 0.01, unit: 'rad' });
    ta.number(ga, re, 'magOut', { label: 'Reload: mag out', min: 0.05, max: 3, step: 0.01, unit: 's' })
      .number(ga, re, 'magIn', { label: 'Reload: mag in', min: 0.05, max: 3, step: 0.01, unit: 's' })
      .number(ga, re, 'boltRelease', { label: 'Reload: release', min: 0.05, max: 2, step: 0.01, unit: 's' })
      .number(ga, re, 'charge', { label: 'Reload: rack', min: 0.2, max: 2, step: 0.01, unit: 's', help: 'Racking the slide / charging handle after an empty reload.' })
      .number(ga, this.magAnim, 'ejectSpeed', { label: 'Mag eject speed', min: 0, max: 5, step: 0.05, unit: 'm/s' });
  }

  /** Seconds into the current reload (−1 when not reloading). */
  get reloadTime(): number { return this.reloadT; }
  /** True while racking the slide / charging handle (reload charge phase or a stand-alone rack). */
  get racking(): boolean { return this.reloadPhase === 'charge' || this.rackT >= 0; }
  /** 0..1 through the current rack cycle (−1 when not racking): hand reaches 0–0.3, pulls 0.3–0.55, lets go, returns. */
  get rackProgress(): number {
    if (this.reloadPhase === 'charge') return this.phaseT;
    if (this.rackT >= 0) return Math.min(1, this.rackT / (this.spec.reload.charge ?? 0.6));
    return -1;
  }
  /** Current rearward displacement of the part the racking hand holds (m). */
  get rackDisplacement(): number { return this.model.charge ? this.anim.charge : this.anim.slide; }
  /** Weapon-space point the support hand grabs to rack the action (model.charge.grip or a slide default). */
  get chargeGrip(): Vec3 {
    if (this.model.charge) return this.model.charge.grip;
    const r = this.model.rearSight;
    return vec3.create(r[0], r[1] - 0.005, r[2] - 0.014);
  }
  /** Rack travel (m): model.charge.travelM, else the action travel. */
  get chargeTravel(): number { return this.model.charge?.travelM ?? this.spec.action?.travelM ?? 0; }
  /** Direction the support hand pulls (weapon space, unit). */
  get chargePullDir(): Vec3 { return this.model.charge?.pullDir ?? vec3.create(0, 0, 1); }

  /** Scripted reload (same as pressing R). Returns false if it cannot start now. */
  reload(): boolean {
    if (this.holstered || this.reloadT >= 0 || this.anim.equip < 1 || this.rounds >= this.spec.magazineCapacity) return false;
    this.startReload();
    return true;
  }

  /** Scripted rack of the action (chambers a round from the magazine; drops a live one if chambered). */
  rack(): boolean {
    if (this.holstered || this.reloadT >= 0 || this.rackT >= 0 || !this.spec.action) return false;
    this.rackT = 0;
    this.rackSoundDone = 0;
    return true;
  }

  /** Jump the reload clock (tests / headless capture of a chosen moment). */
  scrubReload(t: number) { if (this.reloadT >= 0) this.reloadT = Math.max(0, t); }

  /** Phase boundaries of the current reload (s), in order. */
  private reloadPlan(): { phase: ReloadPhase; start: number; end: number }[] {
    const r = this.spec.reload;
    const plan: { phase: ReloadPhase; start: number; end: number }[] = [];
    let t = 0;
    const push = (phase: ReloadPhase, d: number) => { plan.push({ phase, start: t, end: t + d }); t += d; };
    push('magOut', r.magOut);
    push('magIn', r.magIn);
    if (this.reloadNeedsCharge) {
      const boltCatch = this.anim.lockedOpen && (this.model.charge?.release ?? 'slingshot') === 'boltRelease';
      if (boltCatch || !this.spec.action) push('release', r.boltRelease); else push('charge', r.charge ?? 0.6);
    } else push('settle', r.boltRelease);
    return plan;
  }
  private reloadTotal(): number { const p = this.reloadPlan(); return p[p.length - 1].end; }

  /** Put the weapon away: hidden, inputs ignored. Brass and dropped magazines keep simulating. */
  holster() {
    this.holstered = true;
    this.renderer.settings.dof.overrideWeight = 0;
    this.reloadT = -1;
    this.reloadPhase = null;
    this.rackT = -1;
    this.rackPull = -1;
    this.ads = 0;
    this.flashLight.enabled = false;
    for (const p of this.model.parts) p.object.visible = false;
  }

  /** Bring the weapon up (plays the draw animation and sound unless `instant`). */
  draw(instant = false) {
    this.holstered = false;
    this.equipT = instant ? 1e9 : 0;
    this.anim.equip = instant ? 1 : 0;
    for (const p of this.model.parts) p.object.visible = true;
    if (instant) return;
    const port = this.local(this.model.ejectionPort);
    this.audio.whenReady(() => this.audio.vorp?.noise({ levelSpl: 58, attackMs: 30, decayMs: 220, hpHz: 300, lpHz: 3500, thumpDb: -30 }, port));
  }

  /** Bore elevation over the sight line so the bullet crosses it at the zero distance (iterated flat-fire approx). */
  private computeZero() {
    const s = this.spec, v0 = this.muzzleVelocity, g = 9.81;
    // average velocity over the zero distance: crude G7-less estimate (good to a few % within 300 m)
    const decel = 0.0009 * v0 / Math.max(s.caliber.bcG7, 0.05) * 0.12;
    const vAvg = Math.max(v0 - decel * s.zeroM * 0.5, v0 * 0.6);
    const t = s.zeroM / vAvg;
    const drop = 0.5 * g * t * t;
    this.zeroAngle = Math.atan((s.sightHeightM + drop) / s.zeroM);
  }

  private local(p: ArrayLike<number>, out = vec3.create()): Vec3 { return vec3.transformMat4(out, p, this.rootWorld); }

  onUpdate(dt: number) {
    this.updateDroppedMags();
    if (this.holstered) { this.updateCasings(); return; }
    const s = this.spec, inp = this.input, ctrl = this.controller;
    this.equipT += dt;
    const drawTime = s.drawTime ?? 0.5;
    this.anim.equip = Math.min(1, this.equipT / drawTime);
    const canAct = this.reloadT < 0 && this.rackT < 0 && this.anim.equip >= 1;
    // muzzle-flash light lives for the frame it was fired in
    if (this.flashLife > 0) { this.flashLife -= dt; if (this.flashLife <= 0) this.flashLight.enabled = false; }
    // ---- ADS
    const wantAds = this.adsOverride !== null ? this.adsOverride > 0.5 : inp.action('aim') && !ctrl.sprinting;
    this.ads = damp(this.ads, wantAds ? 1 : 0, s.adsTime / 4, dt);
    ctrl.aiming = this.ads > 0.5;
    // the eye accommodates on the front sight while aiming (depth of field blurs the target realistically)
    const dof = this.renderer.settings.dof;
    dof.overrideDistance = s.eyeRelief + vec3.distance(this.model.frontSight, this.model.rearSight);
    dof.overrideWeight = this.ads * this.ads * (3 - 2 * this.ads);
    if (inp.actionPressed('fireMode') && s.fireModes.length > 1 && canAct) this.cycleMode();
    // selector lever + thumb-sweep cant
    this.switchT = Math.min(1, this.switchT + dt / 0.28);
    const selTarget = this.model.selector?.angles[this.mode] ?? 0;
    this.selectorAngle = damp(this.selectorAngle, selTarget, 0.035, dt);
    // ---- reload
    if (inp.actionPressed('reload') && canAct && this.rounds < s.magazineCapacity) this.startReload();
    if (this.reloadT >= 0) this.updateReload(dt);
    if (this.rackT >= 0) this.updateRack(dt);
    // ---- trigger
    this.cooldown -= dt;
    const fire = this.triggerOverride !== null ? this.triggerOverride : inp.action('fire') && (inp.locked || !!inp.gamepad);
    const fresh = fire && !this.triggerHeld;
    this.triggerHeld = fire;
    this.anim.trigger = damp(this.anim.trigger, fire && canAct ? 1 : 0, 0.012, dt);
    if (canAct && fire && (this.mode === 'auto' || fresh)) {
      while (this.cooldown <= 0 && (this.mode === 'auto' || fresh)) {
        if (this.mode === 'safe') { if (fresh) this.safeClick(); break; }
        if (this.chambered) this.fire();
        else if (fresh && !this.anim.lockedOpen) this.dryFire();
        this.cooldown += 60 / s.rpm;
        if (this.mode !== 'auto' || !this.chambered) break;
      }
    }
    if (this.cooldown < 0) this.cooldown = 0;
    // ---- recoil dynamics (substepped spring-damper)
    const r = s.recoil;
    const k = r.holdOmega * r.holdOmega, c = 2 * r.holdDamping * r.holdOmega;
    const n = Math.max(1, Math.ceil(dt / 0.002));
    const h = dt / n;
    const coupling = r.viewCouplingHip + (r.viewCouplingAds - r.viewCouplingHip) * this.ads;
    let pitchBefore = this.rot.x, yawBefore = this.rot.y;
    for (let i = 0; i < n; i++) {
      this.rot.vx += (-k * this.rot.x - c * this.rot.vx) * h; this.rot.x += this.rot.vx * h;
      this.rot.vy += (-k * this.rot.y - c * this.rot.vy) * h; this.rot.y += this.rot.vy * h;
      const kz = 900, cz = 2 * 0.8 * 30;
      this.back.v += (-kz * this.back.z - cz * this.back.v) * h; this.back.z += this.back.v * h;
      // fast in-hands kick: stiff, slightly under-damped (the gun snaps and settles)
      const K = this.kick, wk = 46, kk = wk * wk, ck = 2 * 0.42 * wk;
      K.vz += (-kk * K.z - ck * K.vz) * h; K.z += K.vz * h;
      K.vrx += (-kk * K.rx - ck * K.vrx) * h; K.rx += K.vrx * h;
      K.vrz += (-kk * K.rz - ck * K.vrz) * h; K.rz += K.vrz * h;
    }
    this.heat = Math.max(0, this.heat - dt * 3.5);
    this.wander *= Math.exp(-dt * 2);
    // the view rides along with part of the gun's rotation (cheek weld)
    ctrl.extraPitch += (this.rot.x - pitchBefore) * coupling;
    ctrl.extraYaw += (this.rot.y - yawBefore) * coupling;
    pitchBefore = this.rot.x; yawBefore = this.rot.y;
    // ---- sway: mouse inertia + breathing
    const look = inp.locked ? inp.lookDelta(dt) : { yaw: 0, pitch: 0 };
    const sk = 140, sc = 2 * 0.75 * Math.sqrt(sk);
    // look inertia impulse, then a substepped (stable at any frame rate) spring back to centre
    this.sway.vx -= look.pitch * 4.5 * (1 - 0.6 * this.ads);
    this.sway.vy -= look.yaw * 4.5 * (1 - 0.6 * this.ads);
    for (let i = 0; i < n; i++) {
      this.sway.vx += (-sk * this.sway.x - sc * this.sway.vx) * h; this.sway.x += this.sway.vx * h;
      this.sway.vy += (-sk * this.sway.y - sc * this.sway.vy) * h; this.sway.y += this.sway.vy * h;
    }
    if (inp.action('holdBreath') && this.ads > 0.5) this.holdBreathT = Math.min(this.holdBreathT + dt, 6); else this.holdBreathT = Math.max(0, this.holdBreathT - dt * 0.5);
    const breathAmt = (0.0016 + 0.004 * ctrl.moving + (ctrl.sprinting ? 0.01 : 0)) * (this.holdBreathT > 0 && this.holdBreathT < 4 ? 0.15 : 1) * (1 - 0.4 * this.ads);
    this.breathPhase += dt * (0.25 + 0.35 * ctrl.moving) * Math.PI * 2;
    const breathX = Math.sin(this.breathPhase) * breathAmt;
    const breathY = Math.sin(this.breathPhase * 0.5 + 1.3) * breathAmt * 0.6;
    this.updateAction(dt);
    this.updatePose(breathX, breathY);
    this.updateCasings();
  }

  /** Slide/bolt position (m rearward), magazine offset along its axis, trigger travel. */
  private updateAction(dt: number) {
    const a = this.spec.action, A = this.anim;
    this.slideT += dt;
    if (a) {
      const tb = a.backMs / 1000, tr = a.returnMs / 1000, dwell = 0.0008;
      const lockX = a.travelM * (a.lockFraction ?? 0.92);
      const ease = (x: number) => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };
      if (this.releaseT >= 0) {
        // slide release: spring drives it home from the catch / from the hand
        this.releaseT += dt;
        const u = this.releaseT / tr;
        A.slide = this.releaseFrom * (1 - ease(u) ** 0.7);
        if (u >= 1) { this.releaseT = -1; A.slide = 0; }
      } else if (this.rackPull >= 0) {
        // the support hand holds the slide / charging handle
        A.slide = Math.max(this.rackPull, A.lockedOpen ? lockX : 0);
      } else if (this.slideT < tb) {
        A.slide = a.travelM * Math.sin((this.slideT / tb) * Math.PI / 2);
      } else if (this.slideT < tb + dwell) {
        A.slide = a.travelM;
      } else if (A.lockedOpen) {
        A.slide = Math.max(lockX, a.travelM - (a.travelM - lockX) * ease((this.slideT - tb - dwell) / 0.003));
      } else {
        A.slide = a.travelM * (1 - ease((this.slideT - tb - dwell) / tr));
      }
    }
    // a non-reciprocating charging handle only moves while a hand is on it (and rides home with the bolt after)
    A.charge = this.rackPull >= 0 || this.rackRelease ? A.slide : 0;
    if (this.rackRelease && A.slide <= 0) this.rackRelease = false;
    // magazine: dropped (physics) during mag-out, inserted along the magwell axis during mag-in
    A.magOffset = 0; A.magVisible = true;
    if (this.reloadT >= 0 && this.model.magAxis) {
      const r = this.spec.reload, t = this.reloadT;
      if (t < r.magOut) {
        A.magVisible = !this.magDropped;
        A.magOffset = this.magAnim.ejectSpeed * t + 4.9 * t * t;
        if (A.magOffset > 0.3) A.magVisible = false;
      } else if (t < r.magOut + r.magIn) {
        const u = (t - r.magOut) / r.magIn;
        const k = Math.min(1, u / this.magAnim.seatFraction);
        A.magOffset = this.magAnim.insertDistance * (1 - k * k * (3 - 2 * k));
      }
    }
  }

  /** Root pose = eye frame × (hip↔ADS blend) × sway/recoil. Sets every part's transform. */
  private updatePose(breathX: number, breathY: number) {
    const s = this.spec, cam = this.engine.camera, ctrl = this.controller;
    const eyeRot = ctrl.eyeRot, eye = ctrl.eyePos;
    const sw = Math.sin(Math.PI * this.switchT) * (1 - this.switchT * 0.3);
    const swayQ = quat.fromEuler(quat.create(), this.sway.x + breathX + this.rot.x + this.kick.rx - 0.02 * sw, this.sway.y + breathY + this.rot.y, this.sway.y * 0.6 + this.kick.rz + 0.12 * sw);
    const sprintTilt = ctrl.sprinting ? quat.fromEuler(quat.create(), -0.35, 0.55, 0.25) : quat.create();
    const reloadQ = this.reloadPose();
    const rotGun = quat.multiply(quat.create(), eyeRot, swayQ);
    quat.multiply(rotGun, rotGun, quat.slerp(quat.create(), quat.create(), sprintTilt, ctrl.sprinting ? 1 : 0));
    quat.multiply(rotGun, rotGun, reloadQ.q);
    const e = 1 - this.anim.equip;
    if (e > 0) quat.multiply(rotGun, rotGun, quat.fromEuler(quat.create(), -1.1 * e * e, 0.25 * e, 0.5 * e * e));
    // positions
    const hip = vec3.transformQuat(vec3.create(), s.hipOffset, eyeRot);
    vec3.add(hip, hip, eye);
    // ADS: put the rear sight on the eye line at eye relief, sights along the view axis
    const fwd = vec3.transformQuat(vec3.create(), [0, 0, -1], eyeRot);
    const rearW = vec3.transformQuat(vec3.create(), this.model.rearSight, rotGun);
    const adsPos = vec3.scaleAndAdd(vec3.create(), eye, fwd, s.eyeRelief);
    vec3.sub(adsPos, adsPos, rearW);
    const a = this.ads * this.ads * (3 - 2 * this.ads);
    const pos = vec3.lerp(vec3.create(), hip, adsPos, a);
    // recoil push-back along the bore + reload lowering
    const back = vec3.transformQuat(vec3.create(), [0, reloadQ.lift - this.equipDrop() - 0.01 * sw, this.back.z + this.kick.z + reloadQ.back], rotGun);
    vec3.add(pos, pos, back);
    // movement bob (weapon lags the head a little)
    const bob = Math.sin(this.engine.time * 7) * 0.003 * ctrl.moving * (1 - a);
    pos[1] += bob;
    mat4.fromRotationTranslation(this.rootWorld, rotGun, pos);
    const A = this.anim, ax = this.model.magAxis;
    const tt = (this.model.triggerTravelM ?? 0) * A.trigger;
    for (const p of this.model.parts) {
      const M = p.object.transform as Mat4;
      if (p.bolt && A.slide !== 0) mat4.translate(M, this.rootWorld, [0, 0, A.slide]);
      else if (p.charge && A.charge !== 0) mat4.translate(M, this.rootWorld, [0, 0, A.charge]);
      else if (p.magazine && ax && A.magOffset !== 0) mat4.translate(M, this.rootWorld, [ax[0] * A.magOffset, ax[1] * A.magOffset, ax[2] * A.magOffset]);
      else if (p.trigger && tt !== 0) mat4.translate(M, this.rootWorld, [0, 0, tt]);
      else if ((!p.bolt || A.slide === 0) && (!p.charge || A.charge === 0)) mat4.copy(M, this.rootWorld);
      if (p.selector && this.model.selector) {
        const sel = this.model.selector;
        const q = quat.setAxisAngle(quat.create(), sel.axis, this.selectorAngle);
        const R = mat4.fromRotationTranslation(mat4.create(), q, [0, 0, 0]);
        mat4.translate(M, M, sel.pivot);
        mat4.multiply(M, M, R);
        mat4.translate(M, M, [-sel.pivot[0], -sel.pivot[1], -sel.pivot[2]]);
      }
      mat4.multiply(M, M, p.local);
      if (p.magazine) p.object.visible = A.magVisible;
    }
    void cam;
  }

  private equipDrop(): number { const e = 1 - this.anim.equip; return 0.28 * e * e * (3 - 2 * e); }

  /** Reload / rack pose offset: the gun comes up to the chest, rolled so the magwell and the action face the eye. */
  private reloadPose(): { q: Quat; lift: number; back: number } {
    const P = this.spec.reloadPose!;
    const sm = (x: number) => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };
    let env = 0, rack = 0;
    if (this.reloadT >= 0) {
      const total = this.reloadTotal();
      env = sm(this.reloadT / 0.28) * sm((total - this.reloadT) / 0.32);
      if (this.reloadPhase === 'charge' || this.reloadPhase === 'release') rack = Math.sin(Math.PI * Math.min(1, this.phaseT)) * env;
    } else if (this.rackT >= 0) {
      const d = this.spec.reload.charge ?? 0.6;
      env = sm(this.rackT / 0.2) * sm((d - this.rackT) / 0.25) * 0.6;
      rack = Math.sin(Math.PI * Math.min(1, this.rackT / d));
    }
    if (env === 0) return { q: quat.create(), lift: 0, back: 0 };
    const q = quat.fromEuler(quat.create(), P.pitch * env, P.yaw * env, P.roll * env + P.chargeRoll * rack);
    return { q, lift: P.lift * env, back: P.back * env };
  }

  /** Stand-alone rack (no reload): hand to the action, pull, let go. */
  private updateRack(dt: number) {
    const d = this.spec.reload.charge ?? 0.6;
    this.rackT += dt;
    this.rackCycle(this.rackT / d, this.rackT - dt < 0);
    if (this.rackT >= d) { this.rackT = -1; this.rackPull = -1; }
  }

  /**
   * One rack cycle over u = 0..1: 0–0.3 the hand travels to the slide/handle, 0.3–0.55 it pulls the action fully
   * back (with the slide rasp), 0.55 lets go (spring slams it home, chambering a round), then the hand returns.
   */
  private rackCycle(u: number, first: boolean) {
    const travel = this.chargeTravel;
    const ease = (x: number) => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };
    const port = this.local(this.model.ejectionPort);
    if (first) this.rackSoundDone = 0;
    if (u < 0.3) { this.rackPull = -1; return; }
    if (u < 0.55) {
      const k = ease((u - 0.3) / 0.25);
      this.rackPull = travel * (0.08 + 0.92 * k);
      if (this.rackSoundDone < 1) {
        this.rackSoundDone = 1;
        // slide rasp along the rails + the hand slapping onto the serrations
        this.audio.whenReady(() => this.audio.vorp?.noise({ levelSpl: 68, attackMs: 4, decayMs: 110, hpHz: 700, lpHz: 7500, thumpDb: -34 }, port));
        this.audio.modal(receiverModes(1.25), [{ timeMs: 0, amp: 0.35, contactMs: 0.05, noiseDb: -10 }], port, 0.6);
      }
      if (k > 0.97 && this.rackSoundDone < 2) {
        this.rackSoundDone = 2;
        // slide / carrier hits its rear stop; a chambered round is extracted and flung out
        this.audio.modal(receiverModes(1.1), [{ timeMs: 0, amp: 0.9, contactMs: 0.07, noiseDb: -6 }], port, 0.9);
        if (this.chambered) { this.ejectCasing(); this.chambered = false; }
      }
      return;
    }
    if (this.rackSoundDone < 3) {
      this.rackSoundDone = 3;
      this.rackPull = -1;
      this.releaseFrom = Math.max(this.anim.slide, travel);
      this.releaseT = 0;
      this.anim.lockedOpen = false;
      this.rackRelease = true;
      this.audio.modal(receiverModes(1), [{ timeMs: 0, amp: 1.5, contactMs: 0.09, noiseDb: -3 }], port, 1.1); // slams home
      this.audio.whenReady(() => this.audio.vorp?.noise({ levelSpl: 62, attackMs: 2, decayMs: 70, hpHz: 900, lpHz: 9000, thumpDb: -30 }, port, { delayMs: 8 }));
      if (this.rounds > 0 && !this.chambered) { this.rounds--; this.chambered = true; }
    }
  }

  private startReload() {
    this.reloadT = 0;
    this.reloadNeedsCharge = !this.chambered;
    this.reloadPhase = 'magOut';
    this.phaseT = 0;
    this.rackSoundDone = 0;
    this.magDropped = false;
    if (this.model.magBox) this.dropMagazine();
    const port = this.local(this.model.ejectionPort);
    this.audio.modal(receiverModes(1.4), [{ timeMs: 0, amp: 0.25, contactMs: 0.06, noiseDb: -8 }], port, 0.7); // mag release
    this.audio.whenReady(() => this.audio.vorp?.noise({ levelSpl: 72, attackMs: 8, decayMs: 160, hpHz: 600, lpHz: 6000, thumpDb: -40 }, port, { delayMs: 60 }));
  }

  private updateReload(dt: number) {
    const s = this.spec.reload;
    const prev = this.reloadT;
    this.reloadT += dt;
    const port = this.local(this.model.ejectionPort);
    const cross = (t: number) => prev < t && this.reloadT >= t;
    const plan = this.reloadPlan();
    const cur = plan.find((p) => this.reloadT < p.end) ?? plan[plan.length - 1];
    const prevPhase = this.reloadPhase;
    this.reloadPhase = cur.phase;
    this.phaseT = Math.min(1, Math.max(0, (this.reloadT - cur.start) / Math.max(1e-6, cur.end - cur.start)));
    if (cross(s.magOut + s.magIn * 0.7)) {
      // magazine seats: two-stage click
      this.audio.modal(receiverModes(1.15), [{ timeMs: 0, amp: 0.6, contactMs: 0.08, noiseDb: -6 }, { timeMs: 35, amp: 0.5, contactMs: 0.06, noiseDb: -8 }], port, 0.9);
      // a fresh magazine goes in: the follower now feeds the action
      this.rounds = this.spec.magazineCapacity;
    }
    if (cur.phase === 'release') {
      // bolt catch slapped at mid-phase: the carrier flies home and strips the first round
      if (this.phaseT >= 0.5 && this.anim.lockedOpen) {
        this.anim.lockedOpen = false;
        this.releaseFrom = this.anim.slide;
        this.releaseT = 0;
        this.audio.modal(receiverModes(1.35), [{ timeMs: 0, amp: 0.4, contactMs: 0.04, noiseDb: -8 }], port, 0.6); // catch
        this.audio.modal(receiverModes(1), [{ timeMs: 0, amp: 1.5, contactMs: 0.09, noiseDb: -3 }], port, 1.1, { delayMs: 25 }); // slams home
        if (this.rounds > 0) { this.rounds--; this.chambered = true; }
      }
    } else if (cur.phase === 'charge') {
      this.rackCycle(this.phaseT, prevPhase !== 'charge');
    }
    if (this.reloadT >= cur.end && cur === plan[plan.length - 1]) {
      // safety net: whatever the choreography did, the weapon ends chambered with a full magazine behind it
      if (!this.chambered && this.rounds > 0) { this.rounds--; this.chambered = true; }
      this.anim.lockedOpen = false;
      this.reloadT = -1;
      this.reloadPhase = null;
      this.rackPull = -1;
    }
  }

  /** Advance the fire selector (safe → semi → auto …) with a two-stage detent click and a thumb sweep. */
  cycleMode() {
    const m = this.spec.fireModes;
    this.mode = m[(m.indexOf(this.mode) + 1) % m.length];
    this.switchT = 0;
    const at = this.model.selector ? vec3.transformMat4(vec3.create(), this.model.selector.pivot, this.rootWorld) : this.local(this.model.ejectionPort);
    const bright = this.mode === 'safe' ? 1.55 : this.mode === 'semi' ? 1.75 : 1.95;
    this.audio.modal(receiverModes(bright), [{ timeMs: 0, amp: 0.55, contactMs: 0.035, noiseDb: -8 }, { timeMs: 16, amp: 0.85, contactMs: 0.03, noiseDb: -6 }], at, 0.9);
    this.input.rumble(0.15, 0.05, 25);
  }

  /** Trigger pressed on safe: a dull stop. */
  private safeClick() {
    this.audio.modal(receiverModes(0.8), [{ timeMs: 0, amp: 0.15, contactMs: 0.08, noiseDb: -14 }], this.local(this.model.ejectionPort), 0.35);
  }

  private dryFire() {
    this.audio.modal(receiverModes(1.5), [{ timeMs: 0, amp: 0.2, contactMs: 0.04, noiseDb: -10 }], this.local(this.model.ejectionPort), 0.5);
  }

  private fire() {
    const s = this.spec, c = s.caliber;
    const muzzle = this.local(this.model.muzzle);
    const rear = this.local(this.model.rearSight), front = this.local(this.model.frontSight);
    const sightDir = vec3.normalize(vec3.create(), vec3.sub(vec3.create(), front, rear));
    // bore = sight line raised by the zero angle around the gun's right axis, plus mechanical dispersion
    const right = vec3.normalize(vec3.create(), vec3.set(vec3.create(), this.rootWorld[0], this.rootWorld[1], this.rootWorld[2]));
    const up = vec3.cross(vec3.create(), right, sightDir);
    const moa = (s.accuracyMoa / 60) * DEG2RAD;
    const ex = this.rand.gauss() * moa * 0.5, ey = this.rand.gauss() * moa * 0.5;
    const dir = vec3.normalize(vec3.create(), vec3.set(vec3.create(),
      sightDir[0] + up[0] * (this.zeroAngle + ey) + right[0] * ex,
      sightDir[1] + up[1] * (this.zeroAngle + ey) + right[1] * ex,
      sightDir[2] + up[2] * (this.zeroAngle + ey) + right[2] * ex));
    const v = this.muzzleVelocity * (1 + this.rand.gauss() * 0.004); // ±0.4% shot-to-shot velocity spread
    const vel = vec3.scale(vec3.create(), dir, v);
    vec3.add(vel, vel, this.controller.velocity);
    // start slightly back inside the barrel so close walls are still hit
    const start = vec3.scaleAndAdd(vec3.create(), muzzle, dir, -0.05);
    this.physics.spawnProjectile(start, vel, { bcG7: c.bcG7, massKg: c.bulletMassKg, diameterM: c.diameterM, maxTime: 6, userId: 1 });
    this.audio.projectileInfo.set(1, { diameter: c.diameterM, length: c.lengthM });

    // sound: suppressed first-round pop if the can had time to refill with air
    const extra: Record<string, number> = {};
    if (s.suppressed) { extra.suppress = 1; extra.firstPopDb = this.engine.time - this.lastShotTime > 4 ? 4 : 0; }
    if (this.effectsEnabled) this.audio.gunshot(s.audio, muzzle, dir, this.local(this.model.ejectionPort), extra);

    // recoil: momentum → linear push into the shoulder + muzzle rise about the shoulder
    const p = this.recoilImpulse;
    const r = s.recoil;
    const lin = p / (s.massKg + r.shoulderMassKg);
    this.back.v += lin;
    const omega = (p * r.boreAboveShoulderM) / r.inertia;
    // sustained fire: control degrades (heat), horizontal recoil wanders like a real recoil pattern
    const climb = r.autoClimb ?? 1;
    this.heat = Math.min(12, this.heat + 1);
    this.wander = Math.max(-1.5, Math.min(1.5, this.wander + this.rand.gauss() * 0.45));
    const heatK = 1 + this.heat * 0.07 * climb;
    this.rot.vx += omega * (0.85 + 0.3 * this.rand.next()) * heatK;
    this.rot.vy += omega * r.horizontalRatio * (this.wander * 0.55 + this.rand.gauss() * 0.5) * heatK;
    // part of the rise stays (the shooter has to pull back down) — more of it in long strings
    this.controller.extraPitch += (omega / r.holdOmega) * r.residualRise * (1 + this.heat * 0.05 * climb);
    // fast visual kick in the hands, scaled by free-recoil energy relative to a 5.56 carbine (≈ 5 J)
    const kick = (r.kick ?? 1) * Math.min(2.5, Math.sqrt(this.freeRecoilEnergy / 5));
    this.kick.vz += 0.9 * kick;
    this.kick.vrx += (2.2 + this.rand.next() * 0.8) * kick * (r.boreAboveShoulderM / 0.035);
    this.kick.vrz += this.rand.gauss() * 1.1 * kick;
    // camera punch: the head takes the shock too, then springs back
    const punch = (r.cameraPunch ?? 1) * kick;
    this.controller.punch(0.9 * punch, this.rand.gauss() * 0.25 * punch, this.rand.gauss() * 0.55 * punch);
    this.input.rumble(Math.min(1, 0.6 + 0.3 * kick), Math.min(1, 0.4 + 0.3 * kick), 70);

    if (this.effectsEnabled) this.muzzleEffects(muzzle, dir);
    this.ejectCasing();
    this.lastShotTime = this.engine.time;
    this.shotsFired++;
    if (this.rounds > 0) { this.rounds--; this.chambered = true; } else { this.chambered = false; }
    this.slideT = 0;
    this.releaseT = -1;
    if (!this.chambered && this.spec.action?.lockOpenOnEmpty) this.anim.lockedOpen = true;
    this.onShot?.(muzzle, dir);
  }

  private muzzleEffects(muzzle: Vec3, dir: Vec3) {
    const f = this.spec.flash, P = this.renderer.particles;
    const col = kelvinToLinear(f.kelvin);
    const k = 0.8 + 0.4 * this.rand.next();
    if (!this.spec.suppressed) {
      // primary flash along the bore + secondary flash slightly ahead (combustion of gases mixing with air)
      P.spawn({ kind: ParticleKind.Flash, position: vec3.scaleAndAdd(vec3.create(), muzzle, dir, f.sizeM * 0.35), life: 0.022, size0: f.sizeM * k, size1: f.sizeM * k * 1.15, color: col, alpha0: 1, alpha1: 1, luminance: f.luminance, rotation: this.rand.next() * 6.28 });
      P.spawn({ kind: ParticleKind.Flash, position: vec3.scaleAndAdd(vec3.create(), muzzle, dir, f.sizeM * 1.1), life: 0.018, size0: f.sizeM * 0.6 * k, size1: f.sizeM * 0.7, color: col, alpha0: 0.8, alpha1: 0.6, luminance: f.luminance * 0.4 });
      if (f.sidePorts) for (const s of [-1, 1]) {
        const side = vec3.set(vec3.create(), this.rootWorld[0] * s, this.rootWorld[1] * s, this.rootWorld[2] * s);
        P.spawn({ kind: ParticleKind.Flash, position: vec3.scaleAndAdd(vec3.create(), muzzle, side, 0.03), life: 0.015, size0: f.sizeM * 0.35, size1: f.sizeM * 0.45, color: col, alpha0: 0.7, alpha1: 0.4, luminance: f.luminance * 0.5 });
      }
      this.flashLight.enabled = f.lightCandela > 0;
      this.flashLight.position.set(vec3.scaleAndAdd(vec3.create(), muzzle, dir, 0.15));
      this.flashLight.color = col;
      this.flashLight.intensity = f.lightCandela * k;
      this.flashLight.range = 18;
      this.flashLight.radius = 0.05;
      this.flashLife = 0.017;
    }
    // smoke: propellant residue puffs drifting forward and up, then with the wind
    const nSmoke = Math.round(3 * f.smoke);
    for (let i = 0; i < nSmoke; i++) {
      const v = vec3.scale(vec3.create(), dir, 2 + this.rand.next() * 4);
      v[1] += 0.3 + this.rand.next() * 0.3;
      P.spawn({ kind: ParticleKind.Smoke, position: vec3.scaleAndAdd(vec3.create(), muzzle, dir, 0.05 + i * 0.08), velocity: v, life: 1.6 + this.rand.next() * 1.4, size0: 0.04, size1: 0.45 + this.rand.next() * 0.3, color: [0.78, 0.77, 0.75], alpha0: 0.22, alpha1: 0, drag: 2.8, buoyancy: 0.25, spin: this.rand.range(-0.6, 0.6), fadeIn: 0.02 });
    }
    // gas puff out of the ejection port
    const port = this.local(this.model.ejectionPort);
    P.spawn({ kind: ParticleKind.Smoke, position: port, velocity: [this.rootWorld[0] * 0.8, 0.3, this.rootWorld[2] * 0.8], life: 0.9, size0: 0.02, size1: 0.14, color: [0.8, 0.8, 0.78], alpha0: 0.15, alpha1: 0, drag: 3, buoyancy: 0.2 });
  }

  private ejectCasing() {
    const c = this.spec.caliber.casing, e = this.spec.ejection;
    const port = this.local(this.model.ejectionPort);
    const body = this.physics.createBody(BodyShape.Capsule, [c.diameterM / 2, Math.max(0.001, c.lengthM / 2 - c.diameterM / 2), 0], c.massKg, SURFACE.BRASS);
    // casing axis along the bore (rifle z) → capsule is Y-aligned: rotate 90° about the gun's right axis
    const gunRot = mat4.getRotation(quat.create(), this.rootWorld);
    const q = quat.rotateX(quat.create(), gunRot, Math.PI / 2);
    body.setTransform(port, q);
    const R = (x: number, y: number, z: number) => vec3.transformQuat(vec3.create(), [x, y, z], gunRot);
    const v = R(e.speed * (0.9 + 0.2 * this.rand.next()), e.up * (0.8 + 0.4 * this.rand.next()), e.back * (0.8 + 0.4 * this.rand.next()));
    vec3.add(v, v, this.controller.velocity);
    const w = R(this.rand.gauss() * e.spinRad * 0.3, e.spinRad * (0.7 + 0.6 * this.rand.next()), this.rand.gauss() * e.spinRad * 0.3);
    body.setVelocity(v, w);
    const obj = new RenderObject(this.model.casingMesh, this.model.casingMaterial);
    obj.castShadow = true;
    this.engine.scene.add(obj);
    const cs: Casing = { body, obj, born: this.engine.time, lastSound: -1, settled: false };
    this.casings.push(cs);
    this.casingByBody.set(body.id, cs);
    while (this.casings.length > this.maxCasings) this.removeCasing(this.casings[0]);
  }

  /** Spawn the current magazine as a rigid body leaving the magwell (it clatters on the ground). */
  private dropMagazine() {
    const mb = this.model.magBox!, ax = this.model.magAxis ?? vec3.create(0, -1, 0);
    const parts = this.model.parts.filter((p) => p.magazine);
    if (!parts.length) return;
    const mass = 0.08 + 0.0118 * this.rounds * (this.spec.caliber.bulletMassKg / 0.008 * 0.5 + 0.5);
    const body = this.physics.createBody(BodyShape.Box, [mb.half[0], mb.half[1], mb.half[2]], mass, SURFACE.POLYMER);
    const gunRot = mat4.getRotation(quat.create(), this.rootWorld);
    body.setTransform(this.local(mb.center), gunRot);
    const v = vec3.transformQuat(vec3.create(), [ax[0] * this.magAnim.ejectSpeed, ax[1] * this.magAnim.ejectSpeed, ax[2] * this.magAnim.ejectSpeed], gunRot);
    vec3.add(v, v, this.controller.velocity);
    body.setVelocity(v, [this.rand.gauss() * 1.5, this.rand.gauss() * 0.5, this.rand.gauss() * 2]);
    const objs = parts.map((p) => {
      const o = new RenderObject(p.object.mesh, p.object.material);
      o.castShadow = true;
      this.engine.scene.add(o);
      return o;
    });
    const dm: DroppedMag = { body, objs, lastSound: -1 };
    this.droppedMags.push(dm);
    this.magByBody.set(body.id, dm);
    this.magDropped = true;
    while (this.droppedMags.length > this.maxDroppedMags) {
      const old = this.droppedMags.shift()!;
      old.body.remove();
      for (const o of old.objs) this.engine.scene.remove(o);
      this.magByBody.delete(old.body.id);
    }
    this.updateDroppedMags();
  }

  private tm = mat4.create();
  private updateDroppedMags() {
    if (!this.droppedMags.length) return;
    const c = this.model.magBox!.center;
    for (const dm of this.droppedMags) {
      const st = dm.body.state();
      if (st[0] < 0.5) continue;
      this.tq[0] = st[4]; this.tq[1] = st[5]; this.tq[2] = st[6]; this.tq[3] = st[7];
      mat4.fromRotationTranslation(this.tm, this.tq, [st[1], st[2], st[3]]);
      mat4.translate(this.tm, this.tm, [-c[0], -c[1], -c[2]]);
      for (const o of dm.objs) mat4.copy(o.transform as Mat4, this.tm);
    }
  }

  private removeCasing(cs: Casing) {
    cs.body.remove();
    this.engine.scene.remove(cs.obj);
    this.casingByBody.delete(cs.body.id);
    this.casings.splice(this.casings.indexOf(cs), 1);
  }

  private tq = quat.create();
  private updateCasings() {
    for (const cs of this.casings) {
      const st = cs.body.state();
      if (st[0] < 0.5) continue;
      this.tq[0] = st[4]; this.tq[1] = st[5]; this.tq[2] = st[6]; this.tq[3] = st[7];
      mat4.fromRotationTranslation(cs.obj.transform as Mat4, this.tq, [st[1], st[2], st[3]]);
      cs.settled = st[14] > 0.5;
    }
  }

  private onCasingContact(bodyId: number, speed: number, otherMaterial: number, point: Vec3) {
    const dm = this.magByBody.get(bodyId);
    if (dm) {
      if (speed < 0.3 || this.engine.time - dm.lastSound < 0.06) return;
      dm.lastSound = this.engine.time;
      const lvl = Math.min(1.5, speed / 2.5);
      if (surfaceOf(otherMaterial).hard) this.audio.modal(receiverModes(0.75), [{ timeMs: 0, amp: lvl, contactMs: 0.25, noiseDb: -4 }], point, 0.12 + 0.2 * lvl);
      else this.audio.whenReady(() => this.audio.vorp?.noise({ ...IMPACTS.dirt, levelSpl: 58 + 12 * lvl, decayMs: 70, thumpDb: -3, grainsPerS: 120 }, point));
      return;
    }
    const cs = this.casingByBody.get(bodyId);
    if (!cs || speed < 0.35) return;
    const now = this.engine.time;
    if (now - cs.lastSound < 0.05) return;
    cs.lastSound = now;
    const surf = surfaceOf(otherMaterial);
    const lvl = Math.min(1.5, speed / 3);
    if (surf.hard) {
      const c = this.spec.caliber.casing;
      this.audio.modal(casingModes(c.lengthM, c.diameterM), [{ timeMs: 0, amp: lvl, contactMs: 0.03 + 0.05 * (1 - lvl), noiseDb: -12 }], point, 0.05 + 0.08 * lvl);
    } else {
      this.audio.whenReady(() => this.audio.vorp?.noise({ ...IMPACTS.dirt, levelSpl: 52 + 14 * lvl, decayMs: 40, thumpDb: -6, grainsPerS: 200 }, point));
    }
  }
}

/** Convenience: build a casing mesh (straight-walled case with neck/shoulder via lathe). */
export function casingGeometry(lengthM: number, diameterM: number, lathe: (p: [number, number][], radial?: number) => Geometry, o: { straight?: boolean } = {}): Geometry {
  const r = diameterM / 2, L = lengthM;
  if (o.straight) {
    // straight-walled pistol case (slight taper, rim + extractor groove, open mouth)
    const mouth = r * 0.955;
    return lathe([[0, -L / 2], [r * 0.99, -L / 2], [r * 0.99, -L / 2 + 0.0011], [r * 0.82, -L / 2 + 0.0015], [r * 0.82, -L / 2 + 0.0026], [r * 0.985, -L / 2 + 0.0032], [mouth, L / 2], [mouth * 0.9, L / 2], [mouth * 0.9, L / 2 - 0.002]], 18);
  }
  const neckR = r * 0.68;
  const prof: [number, number][] = [[0, -L / 2], [r * 0.98, -L / 2], [r * 0.98, -L / 2 + 0.0012], [r * 0.86, -L / 2 + 0.0016], [r * 0.86, -L / 2 + 0.0028], [r, -L / 2 + 0.0034], [r * 0.97, L / 2 - L * 0.22], [neckR, L / 2 - L * 0.13], [neckR, L / 2], [neckR * 0.85, L / 2]];
  return lathe(prof, 16);
}
