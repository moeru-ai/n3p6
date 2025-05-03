import type { VRM } from '@pixiv/three-vrm'
import type { VRMAnimation } from '@pixiv/three-vrm-animation'
import type { AnimationClip } from 'three'

import { createVRMAnimationClip, VRMAnimationLoaderPlugin } from '@pixiv/three-vrm-animation'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export const loadVRMAnimation = async (url: string, vrm: VRM): Promise<AnimationClip> => {
  const loader = new GLTFLoader()
  loader.register(parser => new VRMAnimationLoaderPlugin(parser))

  const gltf = await loader.loadAsync(url)
  const [vrmAnimation] = (gltf.userData as { vrmAnimations: VRMAnimation[] }).vrmAnimations

  return createVRMAnimationClip(vrmAnimation, vrm)
}
