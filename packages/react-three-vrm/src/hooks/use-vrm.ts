import type { VRM } from '@pixiv/three-vrm'

import { VRMLoaderPlugin } from '@pixiv/three-vrm'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { processVRM } from '../utils/process-vrm'

type UseVRMExtendLoader = (loader: GLTFLoader) => void

const extensions = (extendLoader?: UseVRMExtendLoader) =>
  (loader: GLTFLoader) => {
    loader.register(parser => new VRMLoaderPlugin(parser, { autoUpdateHumanBones: true }))

    if (extendLoader)
      extendLoader(loader)
  }

const useVRM = (
  path: string,
  extendLoader?: UseVRMExtendLoader,
): VRM => {
  const gltf = useLoader(GLTFLoader, path, extensions(extendLoader))

  const { vrm } = gltf.userData as { vrm: VRM }

  return processVRM(vrm)
}

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload = (path: string, extendLoader?: UseVRMExtendLoader) =>
  useLoader.preload(GLTFLoader, path, extensions(extendLoader))

// eslint-disable-next-line @masknet/no-top-level
useVRM.clear = (path: string) =>
  useLoader.clear(GLTFLoader, path)

export { useVRM, type UseVRMExtendLoader }
