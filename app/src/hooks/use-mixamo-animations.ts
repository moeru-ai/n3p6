import type { VRM } from '@pixiv/three-vrm'
import type { AnimationClip } from 'three'

import { useMixamoAnimation } from '@n3p6/react-three-vrm'

import startWalkUrl from '~/assets/motions/mixamo/Female Start Walking.fbx?url'
import stopWalkUrl from '~/assets/motions/mixamo/Female Stop Walking.fbx?url'
import walkUrl from '~/assets/motions/mixamo/Female Walk.fbx?url'
import leftTurnUrl from '~/assets/motions/mixamo/Left Turn.fbx?url'
import rightTurnUrl from '~/assets/motions/mixamo/Right Turn.fbx?url'
import idleUrl from '~/assets/motions/mixamo/Standing Idle.fbx?url'

export const useMixamoAnimations = (vrm: VRM): AnimationClip[] => {
  const startWalk = useMixamoAnimation(startWalkUrl, vrm, 'startWalk')
  const stopWalk = useMixamoAnimation(stopWalkUrl, vrm, 'stopWalk')
  const walk = useMixamoAnimation(walkUrl, vrm, 'walk')
  const leftTurn = useMixamoAnimation(leftTurnUrl, vrm, 'leftTurn')
  const rightTurn = useMixamoAnimation(rightTurnUrl, vrm, 'rightTurn')
  const idle = useMixamoAnimation(idleUrl, vrm, 'idle')

  return [startWalk, stopWalk, walk, leftTurn, rightTurn, idle]
}
