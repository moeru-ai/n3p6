import type { VRM } from '@pixiv/three-vrm'
import type { VRMAnimation } from '@pixiv/three-vrm-animation'
import type { AnimationClip } from 'three'

import { createVRMAnimationClip, VRMAnimationLoaderPlugin } from '@pixiv/three-vrm-animation'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import type { UseVRMExtendLoader } from './use-vrm'

const extensions = (extendLoader?: UseVRMExtendLoader) =>
  (loader: GLTFLoader) => {
    loader.register(parser => new VRMAnimationLoaderPlugin(parser))

    if (extendLoader)
      extendLoader(loader)
  }

const useVRMAnimation = (path: string, vrm: VRM, name?: string, extendLoader?: UseVRMExtendLoader): AnimationClip => {
  const gltf = useLoader(GLTFLoader, path, extensions(extendLoader))

  const [vrmAnimation] = (gltf.userData as { vrmAnimations: VRMAnimation[] }).vrmAnimations

  const clip = createVRMAnimationClip(vrmAnimation, vrm)

  if (name != null)
    clip.name = name

  return clip
}

// eslint-disable-next-line @masknet/no-top-level
useVRMAnimation.preload = (path: string, extendLoader?: UseVRMExtendLoader) =>
  useLoader.preload(GLTFLoader, path, extensions(extendLoader))

// eslint-disable-next-line @masknet/no-top-level
useVRMAnimation.clear = (path: string) =>
  useLoader.clear(GLTFLoader, path)

export { useVRMAnimation }
