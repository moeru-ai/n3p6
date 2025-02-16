import type { VRM, VRMHumanBoneName } from '@pixiv/three-vrm'

import { useFBX } from '@react-three/drei'
import { AnimationClip, KeyframeTrack, Quaternion, QuaternionKeyframeTrack, Vector3, VectorKeyframeTrack } from 'three'

import { mixamoVRMRigMap } from '../utils/mixamo-rig-map'

export const useMixamoAnimation = (path: string, vrm: VRM) => {
  const asset = useFBX(path)

  /** @see {@link https://github.com/pixiv/three-vrm/blob/776c2823dcf3453d689a2d56aa82b289fdf963cf/packages/three-vrm-core/examples/humanoidAnimation/loadMixamoAnimation.js} */
  const clip = AnimationClip.findByName(asset.animations, 'mixamo.com')
  const tracks: KeyframeTrack[] = []
  const restRotationInverse = new Quaternion()
  const parentRestWorldRotation = new Quaternion()
  const _quatA = new Quaternion()
  const _vec3 = new Vector3()

  const motionHipsHeight = asset.getObjectByName('mixamorigHips')!.position.y
  const vrmHipsY = vrm.humanoid?.getNormalizedBoneNode('hips')!.getWorldPosition(_vec3).y
  const vrmRootY = vrm.scene.getWorldPosition(_vec3).y
  const vrmHipsHeight = Math.abs(vrmHipsY - vrmRootY)
  const hipsPositionScale = vrmHipsHeight / motionHipsHeight

  clip.tracks.forEach((track) => {
    const trackSplitted = track.name.split('.')
    const mixamoRigName = trackSplitted[0] as keyof typeof mixamoVRMRigMap
    const vrmBoneName = mixamoVRMRigMap[mixamoRigName] as VRMHumanBoneName
    const vrmNodeName = vrm.humanoid?.getNormalizedBoneNode(vrmBoneName)?.name
    const mixamoRigNode = asset.getObjectByName(mixamoRigName)!

    if (vrmNodeName != null) {
      const propertyName = trackSplitted[1]

      mixamoRigNode.getWorldQuaternion(restRotationInverse).invert()
      mixamoRigNode.parent!.getWorldQuaternion(parentRestWorldRotation)

      if (track instanceof QuaternionKeyframeTrack) {
        for (let i = 0; i < track.values.length; i += 4) {
          const flatQuaternion = track.values.slice(i, i + 4)
          _quatA.fromArray(flatQuaternion)
          _quatA
            .premultiply(parentRestWorldRotation)
            .multiply(restRotationInverse)
          _quatA.toArray(flatQuaternion)
          flatQuaternion.forEach((v, index) => track.values[index + i] = v)
        }
        tracks.push(
          new QuaternionKeyframeTrack(
            `${vrmNodeName}.${propertyName}`,
            track.times,
            track.values.map((v, i) => (vrm.meta?.metaVersion === '0' && i % 2 === 0 ? - v : v)),
          ),
        )
      } else if (track instanceof VectorKeyframeTrack) {
        const value = track.values.map((v, i) => (vrm.meta?.metaVersion === '0' && i % 3 !== 1 ? - v : v) * hipsPositionScale)
        tracks.push(new VectorKeyframeTrack(`${vrmNodeName}.${propertyName}`, track.times, value))
      }
    }
  })

  return new AnimationClip('vrmAnimation', clip.duration, tracks)
}
