import type { VRM } from '@pixiv/three-vrm'

import { VRMLoaderPlugin } from '@pixiv/three-vrm'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { processVRM } from './process-vrm'

export const loadVRM = async (url: string): Promise<VRM> => {
  const loader = new GLTFLoader()
  loader.register(parser => new VRMLoaderPlugin(parser, { autoUpdateHumanBones: true }))

  const gltf = await loader.loadAsync(url)
  const { vrm } = gltf.userData as { vrm: VRM }

  return processVRM(vrm)
}
