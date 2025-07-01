import type { VRM } from '@pixiv/three-vrm'

import { useVRMAnimation } from '@n3p6/react-three-vrm'
import { useAnimations as useAnimationsImpl } from '@react-three/drei'

import idleUrl from '~/assets/motions/idle.vrma?url'
import walkUrl from '~/assets/motions/walk.vrma?url'
import kissUrl from '~/assets/motions/kiss.vrma?url'

export const useAnimations = (vrm: VRM) => {
  const idle = useVRMAnimation(idleUrl, vrm, 'idle')
  const walk = useVRMAnimation(walkUrl, vrm, 'walk')
  const kiss = useVRMAnimation(kissUrl, vrm, 'kiss')

  return useAnimationsImpl([idle, walk, kiss], vrm.scene)
}
