import type { VRM } from '@pixiv/three-vrm'
import type { Mesh } from 'three'

import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm'
import { VRMLookAtQuaternionProxy } from '@pixiv/three-vrm-animation'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

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

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload = (path: string, extendLoader?: UseVRMExtendLoader) =>
  useLoader.preload(GLTFLoader, path, extensions(extendLoader))

// eslint-disable-next-line @masknet/no-top-level
useVRM.clear = (path: string) =>
  useLoader.clear(GLTFLoader, path)

export { useVRM, type UseVRMExtendLoader }
