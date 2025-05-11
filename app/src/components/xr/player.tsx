import type { RapierRigidBody } from '@react-three/rapier'
import type { Vector3 } from 'three'

import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { useXRControllerLocomotion, XROrigin } from '@react-three/xr'
import { useRef } from 'react'

export const Player = () => {
  const userRigidBodyRef = useRef<RapierRigidBody>(null)

  const userMove = (inputVector: Vector3) => {
    if (!(userRigidBodyRef.current))
      return
    const currentLinvel = userRigidBodyRef.current.linvel()
    const newLinvel = { x: inputVector.x, y: currentLinvel.y, z: inputVector.z }
    userRigidBodyRef.current.setLinvel(newLinvel, true)

    // const currentAngvel = userRigidBodyRef.current.angvel()
    // const newAngvel = { x: currentAngvel.x, y: rotationVelocityY, z: currentAngvel.z }
    // userRigidBodyRef.current.setAngvel(newAngvel, true)
  }

  useXRControllerLocomotion(userMove)

  return (
    <RigidBody
      canSleep={false}
      colliders={false}
      enabledRotations={[false, false, false]}
      position={[0, 2, 0]}
      ref={userRigidBodyRef}
      restitution={2}
      type="dynamic"
    >
      <CapsuleCollider args={[0.3, 0.5]} />
      <XROrigin position={[0, -1, 0]} />
    </RigidBody>
  )
}
