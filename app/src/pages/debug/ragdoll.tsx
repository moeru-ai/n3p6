import { RigidBody } from '@react-three/rapier'

import { CanvasLayout } from '../../components/canvas-layout'
import { Hikari } from '../../components/characters/hikari'

const DebugRagDoll = () => {
  return (
    <CanvasLayout>
      <RigidBody
        // colliders="trimesh"
        colliders="cuboid"
      >
        <Hikari />
      </RigidBody>
    </CanvasLayout>
  )
}

export default DebugRagDoll
