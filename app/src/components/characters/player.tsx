import type { FocusEventHandler } from 'react'
import type { Group } from 'three'

import { Html } from '@react-three/drei'
import {
  useXRControllerButtonEvent,
  useXRControllerLocomotion,
  useXRInputSourceState,
  XROrigin,
} from '@react-three/xr'
import { useRef } from 'react'

import { useXRSessionSystemKeyboardSupported } from '../../hooks/use-xr'

export const Player = () => {
  const originRef = useRef<Group>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isSystemKeyboardSupported = useXRSessionSystemKeyboardSupported()

  useXRControllerLocomotion(originRef)

  const controller = useXRInputSourceState('controller', 'left')
  /** @see {@link https://developers.meta.com/horizon/blog/button-action-mapping-user-inputs-controller-meta-quest-horizon-developers-vr-mr/} */
  useXRControllerButtonEvent(controller!, 'y-button', (state) => {
    if (state === 'pressed' && inputRef.current && isSystemKeyboardSupported)
      inputRef.current.focus()
  })

  const handleSubmit: FocusEventHandler<HTMLInputElement> = (event) => {
    // TODO: handle text value to LLM
    // eslint-disable-next-line no-console
    console.log(event.target.value)

    speechSynthesis.speak(new SpeechSynthesisUtterance(event.target.value))
  }

  return (
    <>
      <XROrigin
        position={[0, 0, 1]}
        ref={originRef}
      >
      </XROrigin>
      <Html style={{ display: 'none' }} visible={false}>
        <input data-test-id="llm-input" onBlur={handleSubmit} ref={inputRef} style={{ display: 'none' }} />
      </Html>
    </>
  )
}
