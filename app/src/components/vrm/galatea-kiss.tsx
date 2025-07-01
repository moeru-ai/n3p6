import { VRM } from "@pixiv/three-vrm"
import { useFrame } from "@react-three/fiber"
import { useXRInputSourceState } from "@react-three/xr"
import { useCallback } from "react"
import { AnimationAction, AnimationMixer, LoopOnce } from "three"

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
  }, [mixer])

  useFrame(() => {
     if (controllerRight?.gamepad?.['a-button']?.state === 'pressed') {
      vrm.expressionManager?.setValue('blink', 1)

      actions
        .kiss!
          .reset()
          .setLoop(LoopOnce, 1)
          .crossFadeFrom(actions.idle!, 0.5)
          .play()
          // .crossFadeTo(actions.idle!, 0.5)

      mixer.addEventListener('finished', handleFinished)
    }
  })

  return null
}
