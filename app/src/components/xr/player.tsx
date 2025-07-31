import type { Group } from 'three'

import { useFrame } from '@react-three/fiber'
import { FirstPersonCharacterCameraBehavior, LocomotionKeyboardInput, PointerCaptureInput, SimpleCharacter, useXRControllerInput } from '@react-three/viverse'
import { useRef } from 'react'

import { SnapRotateXROrigin } from './snap-rotate-xr-origin'

export const Player = () => {
  const ref = useRef<Group>(null)
  const input = useXRControllerInput()

  // https://pmndrs.github.io/viverse/tutorials/simple-game#step-5:-adding-respawn-logic
  useFrame(() => {
    if (ref.current == null)
      return

    if (ref.current.position.y < -10)
      ref.current.position.set(0, 0, 0)
  })

  return (
    <SimpleCharacter
      // cameraBehavior={false}
      cameraBehavior={FirstPersonCharacterCameraBehavior}
      input={[input, LocomotionKeyboardInput, PointerCaptureInput]}
      model={false}
      ref={ref}
    >
      <SnapRotateXROrigin />
    </SimpleCharacter>
  )
}
