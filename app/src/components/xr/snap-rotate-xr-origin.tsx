import type { Group } from 'three'

import { useFrame } from '@react-three/fiber'
import { useXRInputSourceState, XROrigin } from '@react-three/xr'
import { useRef } from 'react'

// https://pmndrs.github.io/viverse/tutorials/augmented-and-virtual-reality#step-4:-place-the-xrorigin-into-the-simple-character-and-optionally-add-snap-rotation
export const SnapRotateXROrigin = () => {
  const ref = useRef<Group>(null)
  const rightController = useXRInputSourceState('controller', 'right')
  const prev = useRef(0)

  useFrame(() => {
    if (ref.current == null)
      return

    const current = Math.round(rightController?.gamepad?.['xr-standard-thumbstick']?.xAxis ?? 0)
    if (current < 0 && prev.current >= 0) {
      // Rotate left
      ref.current.rotation.y += Math.PI / 2
    }
    if (current > 0 && prev.current <= 0) {
      // Rotate right
      ref.current.rotation.y -= Math.PI / 2
    }
    prev.current = current
  })

  return <XROrigin ref={ref} />
}
