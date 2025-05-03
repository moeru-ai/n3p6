import type { VRM } from '@pixiv/three-vrm'

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

import { createMixamoAnimationClip } from './create-mixamo-animation-clip'

export const loadMixamoAnimation = async (url: string, vrm: VRM) =>
  createMixamoAnimationClip(await new FBXLoader().loadAsync(url), vrm)
