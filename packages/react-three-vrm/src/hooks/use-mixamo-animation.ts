import type { VRM } from '@pixiv/three-vrm'

import { useFBX } from '@react-three/drei'

import { createMixamoAnimationClip } from '../utils/create-mixamo-animation-clip'

const useMixamoAnimation = (path: string, vrm: VRM) => {
  const fbx = useFBX(path)

  return createMixamoAnimationClip(fbx, vrm)
}

// eslint-disable-next-line @masknet/no-top-level
useMixamoAnimation.preload = useFBX.preload

// eslint-disable-next-line @masknet/no-top-level
useMixamoAnimation.clear = useFBX.clear

export { useMixamoAnimation }
