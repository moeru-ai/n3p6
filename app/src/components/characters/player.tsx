import type { Group } from 'three'

// import { CapsuleCollider } from '@react-three/rapier'
import { useXRControllerLocomotion, XROrigin } from '@react-three/xr'
import { useRef } from 'react'

export const Player = () => {
  const ref = useRef<Group>(null)

  useXRControllerLocomotion(ref)

  return (
    <XROrigin
      position={[0, 0, 1]}
      ref={ref}
    >
      {/* <CapsuleCollider args={[1, 1]} /> */}
    </XROrigin>
  )
}
