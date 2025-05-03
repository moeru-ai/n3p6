import type { VRM } from '@pixiv/three-vrm'
import type { Mesh } from 'three'

import { VRMUtils } from '@pixiv/three-vrm'
import { VRMLookAtQuaternionProxy } from '@pixiv/three-vrm-animation'

export const processVRM = (vrm: VRM): VRM => {
  VRMUtils.removeUnnecessaryVertices(vrm.scene)
  VRMUtils.combineSkeletons(vrm.scene)
  VRMUtils.combineMorphs(vrm)

  if (vrm.lookAt) {
    const lookAtQuatProxy = new VRMLookAtQuaternionProxy(vrm.lookAt)
    lookAtQuatProxy.name = 'lookAtQuaternionProxy'
    vrm.scene.add(lookAtQuatProxy)
  }

  vrm.scene.traverse((obj) => {
    obj.frustumCulled = false
    if ((obj as Mesh).isMesh) {
      obj.castShadow = true
    }
  })

  VRMUtils.rotateVRM0(vrm)

  return vrm
}
