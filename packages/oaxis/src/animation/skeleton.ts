// fondaine animation — Skeleton built from a glTF skin + node hierarchy.
// Joint matrices = world(joint) * inverseBind, packed 16 floats per joint for a GPU storage buffer.

import { mat4, quat, type Mat4, type Quat } from '@fondaine/gl/math';
import type { GLTFAsset, GLTFNode, GLTFSkin } from '../gltf';
import { Pose } from './pose';

const _local = mat4.create();
const _tmpM = mat4.create();

function nodeLocalMatrix(out: Mat4, n: GLTFNode): Mat4 {
  return mat4.fromRotationTranslationScale(out, n.rotation, n.translation, n.scale);
}

export class Skeleton {
  readonly jointCount: number;
  /** glTF node index of each joint. */
  readonly jointNodes: Int32Array;
  readonly names: string[];
  /** Parent joint index within this skeleton, -1 for roots. */
  readonly parents: Int32Array;
  /**
   * Rest transform of non-joint nodes between a joint and its parent joint (or the scene root for root joints),
   * baked as one matrix: world(joint) = world(parentJoint) * preTransform * local(joint). null = identity.
   */
  readonly preTransforms: (Float32Array | null)[];
  /** 16 floats per joint. */
  readonly inverseBindMatrices: Float32Array;
  /** Local TRS rest pose (node transforms at load time). */
  readonly restPose: Pose;
  /** Joint evaluation order: parents always before children. */
  readonly order: Int32Array;
  /** Pose evaluated by default (the mixer writes here). */
  readonly pose: Pose;
  /** World matrices of the last `computeWorldMatrices` / `computeJointMatrices` call (16 per joint). */
  readonly worldMatrices: Float32Array;

  private readonly nodeToJointMap = new Map<number, number>();

  constructor(skin: GLTFSkin, nodes: GLTFNode[]) {
    const n = skin.joints.length;
    this.jointCount = n;
    this.jointNodes = Int32Array.from(skin.joints);
    this.names = skin.joints.map((ni) => nodes[ni]?.name ?? `joint${ni}`);
    skin.joints.forEach((ni, j) => this.nodeToJointMap.set(ni, j));
    this.inverseBindMatrices = new Float32Array(skin.inverseBindMatrices.subarray(0, n * 16));
    this.parents = new Int32Array(n).fill(-1);
    this.preTransforms = new Array<Float32Array | null>(n).fill(null);
    this.restPose = new Pose(n);

    for (let j = 0; j < n; j++) {
      const node = nodes[skin.joints[j]];
      if (!node) throw new Error(`Skeleton: joint ${j} references missing node ${skin.joints[j]}`);
      this.restPose.setTranslation(j, node.translation);
      this.restPose.setRotation(j, node.rotation);
      this.restPose.setScale(j, node.scale);
      // Walk up through non-joint ancestors, baking their rest transforms.
      let pre: Float32Array | null = null;
      let p = node.parent;
      let guard = 0;
      while (p >= 0 && !this.nodeToJointMap.has(p)) {
        const pn = nodes[p];
        nodeLocalMatrix(_local, pn);
        pre = pre ? mat4.multiply(pre, _local, pre) : mat4.clone(_local);
        p = pn.parent;
        if (++guard > 1024) throw new Error('Skeleton: node hierarchy cycle');
      }
      this.parents[j] = p >= 0 ? this.nodeToJointMap.get(p)! : -1;
      this.preTransforms[j] = pre && !isIdentity(pre) ? pre : null;
    }

    // Topological order by depth.
    const depth = new Int32Array(n);
    for (let j = 0; j < n; j++) {
      let d = 0, p = this.parents[j];
      while (p >= 0) { d++; p = this.parents[p]; if (d > n) throw new Error('Skeleton: joint cycle'); }
      depth[j] = d;
    }
    this.order = Int32Array.from([...Array(n).keys()].sort((a, b) => depth[a] - depth[b] || a - b));
    this.pose = this.restPose.clone();
    this.worldMatrices = new Float32Array(n * 16);
  }

  static fromGLTF(asset: GLTFAsset, skinIndex = 0): Skeleton {
    const skin = asset.skins[skinIndex];
    if (!skin) throw new Error(`Skeleton.fromGLTF: skin ${skinIndex} does not exist`);
    return new Skeleton(skin, asset.nodes);
  }

  /** Joint index for a glTF node index, -1 if not part of this skeleton. */
  nodeToJoint(node: number): number { return this.nodeToJointMap.get(node) ?? -1; }

  /** Joint index by name, -1 if missing. */
  jointIndex(name: string): number { return this.names.indexOf(name); }

  /** Local matrix of joint j in `pose`, including its baked pre-transform. */
  jointLocalMatrix(pose: Pose, j: number, out: Mat4): Mat4 {
    const t = pose.translations, r = pose.rotations, s = pose.scales;
    _trs.t[0] = t[j * 3]; _trs.t[1] = t[j * 3 + 1]; _trs.t[2] = t[j * 3 + 2];
    _trs.r[0] = r[j * 4]; _trs.r[1] = r[j * 4 + 1]; _trs.r[2] = r[j * 4 + 2]; _trs.r[3] = r[j * 4 + 3];
    _trs.s[0] = s[j * 3]; _trs.s[1] = s[j * 3 + 1]; _trs.s[2] = s[j * 3 + 2];
    mat4.fromRotationTranslationScale(out, _trs.r, _trs.t, _trs.s);
    const pre = this.preTransforms[j];
    if (pre) mat4.multiply(out, pre, out);
    return out;
  }

  /** World matrices of every joint (16 per joint) for `pose`, with `rootWorld` = model/instance transform. */
  computeWorldMatrices(pose: Pose = this.pose, rootWorld?: Mat4, out: Float32Array = this.worldMatrices): Float32Array {
    for (let k = 0; k < this.order.length; k++) {
      const j = this.order[k];
      this.jointLocalMatrix(pose, j, _local);
      const p = this.parents[j];
      const dst = out.subarray(j * 16, j * 16 + 16);
      if (p >= 0) mat4.multiply(dst, out.subarray(p * 16, p * 16 + 16), _local);
      else if (rootWorld) mat4.multiply(dst, rootWorld, _local);
      else mat4.copy(dst, _local);
    }
    return out;
  }

  /**
   * Skinning matrices = world(joint) * inverseBind (column-major, 16 floats per joint), ready for a GPU
   * storage buffer. Per glTF, the skinned mesh node's own transform must NOT be applied in the shader.
   * Also refreshes `worldMatrices`.
   */
  computeJointMatrices(rootWorld: Mat4, out: Float32Array, pose: Pose = this.pose): Float32Array {
    if (out.length < this.jointCount * 16) throw new Error(`Skeleton.computeJointMatrices: out needs ${this.jointCount * 16} floats`);
    const world = this.computeWorldMatrices(pose, rootWorld, this.worldMatrices);
    for (let j = 0; j < this.jointCount; j++) {
      mat4.multiply(_tmpM, world.subarray(j * 16, j * 16 + 16), this.inverseBindMatrices.subarray(j * 16, j * 16 + 16));
      out.set(_tmpM, j * 16);
    }
    return out;
  }

  /** World matrix of a single joint (walks the chain; cheap for IK on a few joints). */
  jointWorldMatrix(pose: Pose, j: number, rootWorld: Mat4 | undefined, out: Mat4): Mat4 {
    // Collect chain root..j
    let len = 0, p = j;
    while (p >= 0) { _chain[len++] = p; p = this.parents[p]; }
    if (rootWorld) mat4.copy(out, rootWorld); else mat4.identity(out);
    for (let k = len - 1; k >= 0; k--) {
      this.jointLocalMatrix(pose, _chain[k], _local);
      mat4.multiply(out, out, _local);
    }
    return out;
  }

  /** World rotation (scale removed) of joint j. */
  jointWorldRotation(pose: Pose, j: number, rootWorld: Mat4 | undefined, out: Quat): Quat {
    this.jointWorldMatrix(pose, j, rootWorld, _tmpM);
    mat4.getRotation(out, _tmpM);
    return quat.normalize(out, out);
  }

  /** Per-joint mask (1 for `rootJoint` and all its descendants, else 0). Handy for upper-body layers. */
  makeMask(rootJoint: number | string, includeRoot = true): Float32Array {
    const r = typeof rootJoint === 'string' ? this.jointIndex(rootJoint) : rootJoint;
    const m = new Float32Array(this.jointCount);
    if (r < 0) return m;
    for (let j = 0; j < this.jointCount; j++) {
      let p = j;
      while (p >= 0 && p !== r) p = this.parents[p];
      if (p === r && (includeRoot || j !== r)) m[j] = 1;
    }
    return m;
  }
}

const _trs = { t: new Float32Array(3), r: new Float32Array(4), s: new Float32Array(3) };
const _chain = new Int32Array(1024);

function isIdentity(m: Float32Array): boolean {
  for (let i = 0; i < 16; i++) {
    const e = i % 5 === 0 ? 1 : 0;
    if (Math.abs(m[i] - e) > 1e-7) return false;
  }
  return true;
}
