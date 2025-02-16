import type { VRMAnimation } from '@pixiv/three-vrm-animation'

import { VRMAnimationLoaderPlugin } from '@pixiv/three-vrm-animation'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import type { UseVRMExtendLoader } from './use-vrm'

const extensions = (extendLoader?: UseVRMExtendLoader) =>
  (loader: GLTFLoader) => {
    loader.register(parser => new VRMAnimationLoaderPlugin(parser))

    if (extendLoader)
      extendLoader(loader)
  }

const useVRMA = (path: string, extendLoader?: UseVRMExtendLoader): VRMAnimation => {
  const gltf = useLoader(GLTFLoader, path, extensions(extendLoader))

  return (gltf.userData as { vrmAnimations: VRMAnimation[] }).vrmAnimations[0]
}

// eslint-disable-next-line @masknet/no-top-level
useVRMA.preload = (path: string, extendLoader?: UseVRMExtendLoader) =>
  useLoader.preload(GLTFLoader, path, extensions(extendLoader))

// eslint-disable-next-line @masknet/no-top-level
useVRMA.clear = (path: string) =>
  useLoader.clear(GLTFLoader, path)

export { useVRMA }
