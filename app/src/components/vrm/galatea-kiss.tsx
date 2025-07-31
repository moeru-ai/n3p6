import type { VRM } from '@pixiv/three-vrm'
import type { AnimationAction, AnimationMixer } from 'three'

import { useFrame } from '@react-three/fiber'
import { useXRInputSourceState } from '@react-three/xr'
import { useCallback } from 'react'
import { LoopOnce } from 'three'

export const GalateaKiss = ({ actions, mixer, vrm }: {
  actions: Record<string, AnimationAction | null>
  mixer: AnimationMixer
  vrm: VRM
}) => {
  const controllerRight = useXRInputSourceState('controller', 'right')

  const handleFinished = useCallback(() => {
    vrm.expressionManager?.setValue('blink', 0)

    actions
      .idle!
      .reset()
      .crossFadeFrom(actions.kiss!, 0.5)
      .play()

    mixer.removeEventListener('finished', handleFinished)
  }, [mixer, actions.idle, actions.kiss, vrm.expressionManager])

  useFrame(() => {
    if (controllerRight?.gamepad?.['a-button']?.state !== 'pressed')
      return

    vrm.expressionManager?.setValue('blink', 1)

    actions
      .kiss!
      .reset()
      .setLoop(LoopOnce, 1)
      .crossFadeFrom(actions.idle!, 0.5)
      .play()
    // .crossFadeTo(actions.idle!, 0.5)

    mixer.addEventListener('finished', handleFinished)
  })

  return null
}
