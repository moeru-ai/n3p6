import type { Group } from 'three'

import { useXRControllerLocomotion, XROrigin } from '@react-three/xr'
import { useRef } from 'react'

export const Player = () => {
  const originRef = useRef<Group>(null)

  useXRControllerLocomotion(originRef)

  return (
    <XROrigin ref={originRef} />
  )
}
