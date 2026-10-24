// Sun cascaded shadow maps: practical split scheme, bounding-sphere fitting with texel snapping (no shimmer).

import { mat4, Mat4, vec3, Vec3 } from './math';
import { Camera } from './scene';

export interface ShadowSettings {
  enabled: boolean;
  cascades: number;          // 1..4
  resolution: number;        // texels per cascade
  distance: number;          // max shadow distance (m)
  splitLambda: number;       // 0 = uniform, 1 = logarithmic
  /** Depth range behind each cascade for casters outside the view (m). */
  casterExtent: number;
  /** Constant depth bias (light-space depth units) and pipeline slope bias. */
  constantBias: number;
  slopeBias: number;
  /** Normal offset (in shadow texels). */
  normalBias: number;
  /** Max PCF/penumbra radius (texels). */
  maxPenumbraTexels: number;
  blockerSamples: number;    // PCSS blocker search taps (≤16)
  pcfSamples: number;        // PCF taps (≤32)
  blendFraction: number;     // cascade cross-fade band
}

export const defaultShadows: ShadowSettings = {
  enabled: true,
  cascades: 4,
  resolution: 2048,
  distance: 160,
  splitLambda: 0.82,
  casterExtent: 120,
  constantBias: 0.00008,
  slopeBias: 1.6,
  normalBias: 1.4,
  maxPenumbraTexels: 14,
  blockerSamples: 12,
  pcfSamples: 20,
  blendFraction: 0.12,
};

export interface CascadeData {
  viewProj: Mat4[];
  splits: number[];
  texelWorld: number[];
  depthRange: number[];
}

const tmpV = vec3.create();

export function computeCascades(cam: Camera, aspect: number, sunDir: Vec3, s: ShadowSettings): CascadeData {
  const n = Math.max(1, Math.min(4, s.cascades));
  const near = Math.max(cam.near, 0.05);
  const far = s.distance;
  const splits: number[] = [];
  for (let i = 1; i <= n; i++) {
    const p = i / n;
    const log = near * Math.pow(far / near, p);
    const uni = near + (far - near) * p;
    splits.push(s.splitLambda * log + (1 - s.splitLambda) * uni);
  }
  const tanY = Math.tan(cam.fovY / 2), tanX = tanY * aspect;
  const out: CascadeData = { viewProj: [], splits, texelWorld: [], depthRange: [] };
  const fwd = cam.forward(), up = cam.up(), right = cam.right();
  const sun = vec3.normalize(vec3.create(), sunDir);
  const lightUp = Math.abs(sun[1]) > 0.99 ? vec3.create(0, 0, 1) : vec3.create(0, 1, 0);
  let prev = near;
  for (let i = 0; i < n; i++) {
    const d0 = prev, d1 = splits[i];
    prev = d1;
    // bounding sphere of the frustum slice (computed analytically for stability: depends only on d0, d1, fov)
    const k = tanX * tanX + tanY * tanY;
    // centre along the view axis minimising the radius
    let zc = 0.5 * (d0 + d1) * (1 + k);
    zc = Math.min(zc, d1);
    const r0 = Math.hypot(zc - d0, d0 * Math.sqrt(k));
    const r1 = Math.hypot(d1 - zc, d1 * Math.sqrt(k));
    const radius = Math.max(r0, r1) * 1.02;
    const center = vec3.scaleAndAdd(vec3.create(), cam.position, fwd, zc);
    void up; void right;
    const res = s.resolution;
    const texel = (2 * radius) / res;
    // light view anchored at the world origin (rotation only), so light-space coordinates of the slice
    // centre move continuously and can be snapped to whole texels — removes shimmer when the camera moves.
    const view = mat4.lookAt(mat4.create(), sun, [0, 0, 0], lightUp);
    vec3.transformMat4(tmpV, center, view);
    const cx = Math.round(tmpV[0] / texel) * texel;
    const cy = Math.round(tmpV[1] / texel) * texel;
    const nearZ = -tmpV[2] - radius - s.casterExtent;
    const farZ = -tmpV[2] + radius;
    const depth = farZ - nearZ;
    const proj = mat4.orthoZO(mat4.create(), cx - radius, cx + radius, cy - radius, cy + radius, nearZ, farZ);
    const vp = mat4.multiply(mat4.create(), proj, view);
    out.viewProj.push(vp);
    out.texelWorld.push(texel);
    out.depthRange.push(depth);
  }
  return out;
}
