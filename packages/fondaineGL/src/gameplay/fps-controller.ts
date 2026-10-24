// First-person controller: capsule character (Rust physics), realistic human locomotion, gait-synchronised
// head motion and footsteps, crouch, lean, and two camera rigs: human eyes or a chest-mounted bodycam.

import { quat, vec3, Vec3, Quat, damp, DEG2RAD, clamp } from '../math';
import { FOOTSTEPS } from '@fondaine/vorp';
import { Behaviour } from '../runtime/script';
import type { Character, CharacterResult } from '../runtime/physics';
import { surfaceOf } from './surfaces';

export type CameraRig = 'eyes' | 'bodycam';

export class FPSController extends Behaviour {
  // ---- body (metres, seconds) — tune toward a real person carrying a rifle
  radius = 0.28;
  standHeight = 1.78;
  crouchHeight = 1.15;
  eyeFromTop = 0.11;
  walkSpeed = 1.55;
  sprintSpeed = 5.2;
  crouchSpeed = 0.85;
  adsSpeedFactor = 0.65;
  groundAccel = 9;
  airAccel = 1.2;
  /** Ground friction when no input (1/s). */
  brake = 11;
  jumpSpeed = 3.0;
  gravity = 9.81;
  /** Stride length (m) per step at walking pace; grows with speed. */
  stride = 0.72;
  // ---- head motion (from gait)
  bobVertical = 0.022;
  bobLateral = 0.012;
  bobRoll = 0.6;           // degrees
  landingDip = 0.05;
  // ---- lean
  leanAngle = 13;          // degrees
  leanOffset = 0.32;       // metres
  leanSpeed = 7;
  // ---- look
  pitchLimit = 87;
  rig: CameraRig = 'eyes';
  /** Chest-mount offset relative to the eyes for the bodycam rig. */
  bodycamOffset: Vec3 = vec3.create(0.08, -0.34, 0.12);
  bodycamTilt = -6;        // degrees (down)
  bodycamSway = 1.0;

  // ---- state
  yaw = 0;
  pitch = 0;
  readonly velocity = vec3.create();
  readonly feet = vec3.create();
  grounded = false;
  crouched = false;
  sprinting = false;
  aiming = false;
  moving = 0;               // 0..1 locomotion intensity
  lean = 0;                 // -1..1
  private crouchBlend = 0;
  private height = 1.78;
  private bobPhase = 0;
  private lastStepSign = 1;
  private landT = 0;
  private fallSpeed = 0;
  private character!: Character;
  private groundMaterial = 0;
  private bodySway = vec3.create();
  /** Recoil/viewmodel can push the view: added pitch/yaw (rad) this frame. */
  extraPitch = 0;
  extraYaw = 0;
  /** Transient view punch (recoil kick, impacts): a damped spring on pitch/yaw/roll that never accumulates. */
  readonly viewPunch = { p: 0, y: 0, r: 0, vp: 0, vy: 0, vr: 0 };
  punchOmega = 32;
  punchDamping = 0.55;
  /** Add an angular velocity impulse (rad/s) to the view punch. */
  punch(pitch: number, yaw = 0, roll = 0) { this.viewPunch.vp += pitch; this.viewPunch.vy += yaw; this.viewPunch.vr += roll; }
  /** Eye world position and orientation (after bob/lean), used by the weapon and audio. */
  readonly eyePos = vec3.create();
  readonly eyeRot: Quat = quat.create();
  onFootstep: ((surface: string, pos: Vec3, intensity: number) => void) | null = null;

  onStart() {
    this.character = this.physics.createCharacter(this.radius, this.standHeight, 0.4, 48);
    const p = this.transform.position;
    vec3.copy(this.feet, p);
    this.character.setPosition(p[0], p[1], p[2]);
    this.height = this.standHeight;
    this.tune('walkSpeed', { group: 'Player', min: 0.5, max: 3, unit: 'm/s', help: 'Brisk walk with a rifle ≈ 1.4–1.7 m/s.' });
    this.tune('sprintSpeed', { group: 'Player', min: 2, max: 9, unit: 'm/s' });
    this.tune('crouchSpeed', { group: 'Player', min: 0.3, max: 2, unit: 'm/s' });
    this.tune('groundAccel', { group: 'Player', min: 1, max: 40, unit: 'm/s²' });
    this.tune('jumpSpeed', { group: 'Player', min: 0, max: 6, unit: 'm/s' });
    this.tune('stride', { group: 'Player', min: 0.4, max: 1.2, unit: 'm' });
    this.tune('bobVertical', { group: 'Player', min: 0, max: 0.08, unit: 'm' });
    this.tune('bobLateral', { group: 'Player', min: 0, max: 0.05, unit: 'm' });
    this.tune('bobRoll', { group: 'Player', min: 0, max: 3, unit: '°' });
    this.tune('leanAngle', { group: 'Player', min: 0, max: 30, unit: '°' });
    this.tune('bodycamTilt', { group: 'Player', min: -30, max: 10, unit: '°' });
    this.tune('bodycamSway', { group: 'Player', min: 0, max: 3 });
  }

  teleport(x: number, y: number, z: number, yaw = this.yaw) {
    vec3.set(this.feet, x, y, z);
    this.character.setPosition(x, y, z);
    vec3.set(this.velocity, 0, 0, 0);
    this.yaw = yaw;
  }

  onUpdate(dt: number) {
    const inp = this.input;
    if (inp.locked || inp.gamepad) {
      const look = inp.lookDelta(dt);
      this.yaw += look.yaw;
      this.pitch = clamp(this.pitch + look.pitch, -this.pitchLimit * DEG2RAD, this.pitchLimit * DEG2RAD);
      // body sway: the chest-mounted camera lags the head when turning
      this.bodySway[0] = damp(this.bodySway[0], look.yaw / Math.max(dt, 1e-3) * 0.02, 0.08, dt);
    }
    this.yaw += this.extraYaw;
    this.pitch = clamp(this.pitch + this.extraPitch, -this.pitchLimit * DEG2RAD, this.pitchLimit * DEG2RAD);
    this.extraYaw = 0;
    this.extraPitch = 0;
    if (inp.actionPressed('camera')) this.rig = this.rig === 'eyes' ? 'bodycam' : 'eyes';
    const targetLean = (inp.action('leanRight') ? 1 : 0) - (inp.action('leanLeft') ? 1 : 0);
    this.lean = damp(this.lean, targetLean, 1 / this.leanSpeed, dt);
    this.updateCamera(dt);
  }

  onFixedUpdate(dt: number) {
    const inp = this.input;
    const axis = inp.moveAxis();
    // crouch toggle with stand-up clearance check
    if (inp.actionPressed('crouch')) {
      if (this.crouched) { if (this.character.setHeight(this.standHeight)) this.crouched = false; }
      else { this.character.setHeight(this.crouchHeight); this.crouched = true; }
    }
    this.sprinting = inp.action('sprint') && axis.y > 0.3 && !this.crouched && !this.aiming;
    let speed = this.crouched ? this.crouchSpeed : this.sprinting ? this.sprintSpeed : this.walkSpeed;
    if (this.aiming) speed *= this.adsSpeedFactor;
    // wish direction in world space
    const sy = Math.sin(this.yaw), cy = Math.cos(this.yaw);
    const wx = (axis.x * cy - axis.y * sy) * speed;
    const wz = (-axis.x * sy - axis.y * cy) * speed;
    const accel = this.grounded ? this.groundAccel : this.airAccel;
    const v = this.velocity;
    const dvx = wx - v[0], dvz = wz - v[2];
    const dl = Math.hypot(dvx, dvz);
    const maxDv = (axis.x || axis.y ? accel : this.grounded ? this.brake * Math.max(0.5, Math.hypot(v[0], v[2])) : 0) * dt;
    if (dl > 1e-6) { const k = Math.min(1, maxDv / dl); v[0] += dvx * k; v[2] += dvz * k; }
    if (this.grounded && inp.actionPressed('jump') && !this.crouched) { v[1] = this.jumpSpeed; this.grounded = false; }
    v[1] -= this.gravity * dt;
    const r: CharacterResult = this.character.move(v[0] * dt, v[1] * dt, v[2] * dt);
    const wasGrounded = this.grounded;
    // derive actual velocity from displacement (slides, walls)
    const nx = (r.position[0] - this.feet[0]) / dt, nz = (r.position[2] - this.feet[2]) / dt;
    v[0] = nx; v[2] = nz;
    if (r.grounded && v[1] < 0) { this.fallSpeed = -v[1]; v[1] = 0; }
    if (r.ceiling && v[1] > 0) v[1] = 0;
    this.grounded = r.grounded;
    if (!wasGrounded && this.grounded) {
      this.landT = Math.min(1, this.fallSpeed / 6);
      this.onFootstep?.(surfaceOf(r.groundMaterial).footstepSound, r.position, 1 + this.landT * 2);
    }
    vec3.copy(this.feet, r.position);
    this.groundMaterial = r.groundMaterial;
    this.transform.setPosition(r.position[0], r.position[1], r.position[2]);
    // gait: step events every half stride
    const hs = Math.hypot(v[0], v[2]);
    this.moving = damp(this.moving, Math.min(1, hs / this.walkSpeed), 0.15, dt);
    if (this.grounded && hs > 0.2) {
      const strideLen = this.stride * (1 + 0.35 * Math.max(0, hs - this.walkSpeed) / this.walkSpeed);
      this.bobPhase += (hs / strideLen) * Math.PI * dt; // π per step
      const s = Math.sign(Math.sin(this.bobPhase));
      if (s !== this.lastStepSign) {
        this.lastStepSign = s;
        const intensity = this.crouched ? 0.5 : this.sprinting ? 1.6 : 1;
        this.onFootstep?.(surfaceOf(this.groundMaterial).footstepSound, this.feet, intensity);
      }
    }
  }

  private updateCamera(dt: number) {
    const cam = this.engine.camera;
    this.crouchBlend = damp(this.crouchBlend, this.crouched ? 1 : 0, 0.09, dt);
    this.height = this.standHeight + (this.crouchHeight - this.standHeight) * this.crouchBlend;
    this.landT = damp(this.landT, 0, 0.12, dt);
    const ph = this.bobPhase;
    const amp = this.moving * (this.sprinting ? 1.8 : 1) * (this.aiming ? 0.35 : 1);
    const bobY = -Math.abs(Math.sin(ph)) * this.bobVertical * amp - this.landT * this.landingDip;
    const bobX = Math.cos(ph) * this.bobLateral * amp;
    const roll = Math.cos(ph) * this.bobRoll * DEG2RAD * amp - this.lean * this.leanAngle * DEG2RAD;
    // orientation: yaw * pitch * roll
    {
      const P = this.viewPunch, k = this.punchOmega * this.punchOmega, c = 2 * this.punchDamping * this.punchOmega;
      const n = Math.max(1, Math.ceil(dt / 0.002)), h = dt / n;
      for (let i = 0; i < n; i++) {
        P.vp += (-k * P.p - c * P.vp) * h; P.p += P.vp * h;
        P.vy += (-k * P.y - c * P.vy) * h; P.y += P.vy * h;
        P.vr += (-k * P.r - c * P.vr) * h; P.r += P.vr * h;
      }
    }
    quat.fromEuler(this.eyeRot, this.pitch + this.viewPunch.p, this.yaw + this.viewPunch.y, roll + this.viewPunch.r);
    const right = vec3.transformQuat(vec3.create(), [1, 0, 0], this.eyeRot);
    const up = vec3.create(0, 1, 0);
    const eyeH = this.height - this.eyeFromTop;
    vec3.set(this.eyePos, this.feet[0], this.feet[1] + eyeH + bobY, this.feet[2]);
    // lean pivots around the hips: lateral offset + slight drop
    const leanOff = this.lean * this.leanOffset;
    const flatRight = vec3.normalize(vec3.create(), vec3.set(vec3.create(), Math.cos(this.yaw), 0, -Math.sin(this.yaw)));
    vec3.scaleAndAdd(this.eyePos, this.eyePos, flatRight, leanOff + bobX);
    this.eyePos[1] -= Math.abs(this.lean) * 0.05;
    void right; void up;
    if (this.rig === 'bodycam') {
      // chest mount: follows the torso (yaw + damped pitch), not the head
      const torsoPitch = this.pitch * 0.25 + this.bodycamTilt * DEG2RAD;
      const q = quat.fromEuler(quat.create(), torsoPitch, this.yaw - this.bodySway[0] * this.bodycamSway, roll * 1.5);
      const off = vec3.transformQuat(vec3.create(), this.bodycamOffset, quat.fromEuler(quat.create(), 0, this.yaw, 0));
      vec3.add(cam.position, this.eyePos, off);
      quat.copy(cam.rotation, q);
    } else {
      vec3.copy(cam.position, this.eyePos);
      quat.copy(cam.rotation, this.eyeRot);
    }
  }

  get speed(): number { return Math.hypot(this.velocity[0], this.velocity[2]); }
}

export { FOOTSTEPS };
