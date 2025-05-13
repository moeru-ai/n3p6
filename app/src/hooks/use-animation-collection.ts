import type { VRM } from '@pixiv/three-vrm'

import { useVRMAnimation } from '@n3p6/react-three-vrm'
import { useAnimations as useAnimationsImpl } from '@react-three/drei'

import idleUrl from '~/assets/motions/idle.vrma?url'
import walkUrl from '~/assets/motions/walk.vrma?url'

// import startWalkUrl from '~/assets/motions/mixamo/Female Start Walking.fbx?url'
// import stopWalkUrl from '~/assets/motions/mixamo/Female Stop Walking.fbx?url'
// import leftTurnUrl from '~/assets/motions/mixamo/Left Turn.fbx?url'
// import rightTurnUrl from '~/assets/motions/mixamo/Right Turn.fbx?url'

export const useAnimations = (vrm: VRM) => {
  // const startWalk = useMixamoAnimation(startWalkUrl, vrm, 'startWalk')
  // const stopWalk = useMixamoAnimation(stopWalkUrl, vrm, 'stopWalk')
  const idle = useVRMAnimation(idleUrl, vrm, 'idle')
  const walk = useVRMAnimation(walkUrl, vrm, 'walk')
  // const leftTurn = useMixamoAnimation(leftTurnUrl, vrm, 'leftTurn')
  // const rightTurn = useMixamoAnimation(rightTurnUrl, vrm, 'rightTurn')

  return useAnimationsImpl([idle, walk], vrm.scene)
}
