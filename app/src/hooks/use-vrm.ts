import type { VRM } from '@pixiv/three-vrm'
import type { VRMAnimation } from '@pixiv/three-vrm-animation'
import type { Mesh } from 'three'

import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm'
import { VRMAnimationLoaderPlugin } from '@pixiv/three-vrm-animation'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export const useVRM = (vrmUrl: string) => {
  const gltf = useLoader(GLTFLoader, vrmUrl, loader =>
    loader.register(parser => new VRMLoaderPlugin(parser)))

  const vrm = gltf.userData.vrm as VRM

  vrm.scene.traverse((obj) => {
    obj.frustumCulled = false
    if ((obj as Mesh).isMesh) {
      obj.castShadow = true
    }
  })

  VRMUtils.rotateVRM0(vrm)

  return vrm
}

export const useVRMA = (vrmaUrl: string): undefined | VRMAnimation => {
  const gltf = useLoader(GLTFLoader, vrmaUrl, loader =>
    loader.register(parser => new VRMAnimationLoaderPlugin(parser)))

  return (gltf.userData as { vrmAnimations?: VRMAnimation[] }).vrmAnimations?.[0] ?? undefined
}
