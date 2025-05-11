import type { RapierRigidBody } from '@react-three/rapier'
import type { Vector3 } from 'three'

import { CapsuleCollider, euler, quat, RigidBody } from '@react-three/rapier'
import { useXRControllerLocomotion, XROrigin } from '@react-three/xr'
import { useRef } from 'react'

export const Player = () => {
  const userRigidBodyRef = useRef<RapierRigidBody>(null)

  useXRControllerLocomotion((velocity: Vector3, rotationVelocityY: number) => {
    if (!userRigidBodyRef.current)
      return

    userRigidBodyRef.current.setRotation(
      quat(userRigidBodyRef.current.rotation())
        .multiply(quat().setFromEuler(euler().set(0, rotationVelocityY, 0, 'YXZ'))),
      true,
    )

    userRigidBodyRef.current.setLinvel({ x: velocity.x, y: 0, z: velocity.z }, true)
  })

  return (
    <RigidBody
      canSleep={false}
      colliders={false}
      enabledRotations={[false, false, false]}
      includeInvisible
      mass={1}
      position={[0, 2, 0]}
      ref={userRigidBodyRef}
      type="dynamic"
    >
      <CapsuleCollider args={[0.75, 0.5]} />
      <XROrigin position={[0, -1.25, 0]} />
    </RigidBody>
  )
}
