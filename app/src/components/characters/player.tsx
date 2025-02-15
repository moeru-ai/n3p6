import type { Group } from 'three'

import { useFrame } from '@react-three/fiber'
// import { CapsuleCollider } from '@react-three/rapier'
import { useXRInputSourceState, XROrigin } from '@react-three/xr'
import { useRef } from 'react'

export const Player = () => {
  const controller = useXRInputSourceState('controller', 'right')
  const ref = useRef<Group>(null)

  useFrame((_, delta) => {
    if (ref.current === null || controller === undefined)
      return

    const thumbstickState = controller.gamepad['xr-standard-thumbstick']
    if (thumbstickState === undefined)
      return

    ref.current.position.x += (thumbstickState.xAxis ?? 0) * delta
    ref.current.position.z += (thumbstickState.yAxis ?? 0) * delta
  })

  return (
    <XROrigin position-y={-1.5} position-z={-0.5} ref={ref}>
      {/* <CapsuleCollider args={[1, 1]} /> */}
    </XROrigin>
  )
}
