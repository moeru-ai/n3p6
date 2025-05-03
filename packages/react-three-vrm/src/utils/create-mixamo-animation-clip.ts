import type { VRM } from '@pixiv/three-vrm'
import type { Group, KeyframeTrack, Object3DEventMap } from 'three'

import { AnimationClip, Quaternion, QuaternionKeyframeTrack, Vector3, VectorKeyframeTrack } from 'three'

import { mixamoVRMRigMap } from './mixamo-rig-map'

/**
 * Example: {@link https://pixiv.github.io/three-vrm/packages/three-vrm/examples/humanoidAnimation/index.html}
 *
 * Source: {@link https://github.com/pixiv/three-vrm/blob/776c2823dcf3453d689a2d56aa82b289fdf963cf/packages/three-vrm/examples/humanoidAnimation/loadMixamoAnimation.js}
 */
export const createMixamoAnimationClip = (fbx: Group<Object3DEventMap>, vrm: VRM) => {
  const clip = AnimationClip.findByName(fbx.animations, 'mixamo.com')!
  const tracks: KeyframeTrack[] = []

  const restRotationInverse = new Quaternion()
  const parentRestWorldRotation = new Quaternion()
  const _quatA = new Quaternion()
  const _vec3 = new Vector3()

  const motionHipsHeight = fbx.getObjectByName('mixamorigHips')!.position.y
  const vrmHipsY = vrm.humanoid.getNormalizedBoneNode('hips')!.getWorldPosition(_vec3).y
  const vrmRootY = vrm.scene.getWorldPosition(_vec3).y
  const vrmHipsHeight = Math.abs(vrmHipsY - vrmRootY)
  const hipsPositionScale = vrmHipsHeight / motionHipsHeight

  clip.tracks.forEach((track) => {
    const trackSplitted = track.name.split('.')
    const mixamoRigName = trackSplitted[0]
    const vrmBoneName = mixamoVRMRigMap[mixamoRigName]
    const vrmNodeName = vrm.humanoid?.getNormalizedBoneNode(vrmBoneName)?.name
    const mixamoRigNode = fbx.getObjectByName(mixamoRigName)

    if (vrmNodeName != null) {
      const propertyName = trackSplitted[1]

      if (mixamoRigNode) {
        mixamoRigNode.getWorldQuaternion(restRotationInverse).invert()
        if (mixamoRigNode.parent)
          mixamoRigNode.parent.getWorldQuaternion(parentRestWorldRotation)
      }

      if (track instanceof QuaternionKeyframeTrack) {
        for (let i = 0; i < track.values.length; i += 4) {
          const flatQuaternion = track.values.slice(i, i + 4)

          _quatA.fromArray(flatQuaternion)
          _quatA.premultiply(parentRestWorldRotation).multiply(restRotationInverse)
          _quatA.toArray(flatQuaternion)

          flatQuaternion.forEach((v, index) => {
            track.values[index + i] = v
          })
        }

        tracks.push(
          new QuaternionKeyframeTrack(
            `${vrmNodeName}.${propertyName}`,
            Array.from(track.times),
            Array.from(track.values.map((v, i) => (vrm.meta?.metaVersion === '0' && i % 2 === 0 ? -v : v))),
          ),
        )
      }
      else if (track instanceof VectorKeyframeTrack) {
        const value = track.values.map(
          (v, i) => (vrm.meta?.metaVersion === '0' && i % 3 !== 1 ? -v : v) * hipsPositionScale,
        )
        tracks.push(
          new VectorKeyframeTrack(`${vrmNodeName}.${propertyName}`, Array.from(track.times), Array.from(value)),
        )
      }
    }
  })

  return new AnimationClip('vrmAnimation', clip.duration, tracks)
}
