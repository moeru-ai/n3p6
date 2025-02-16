import { useMixamoAnimation, useVRM } from '@n3p6/react-three-vrm'
import { useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { useEffect } from 'react'

import vrmUrl from '../../../assets/models/AvatarSample_A.vrm?url'
import fbxUrl from '../../../assets/motions/mixamo/Hip Hop Dancing.fbx?url'

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload(vrmUrl)

export const AvatarSampleA = () => {
  const vrm = useVRM(vrmUrl)
  const animation = useMixamoAnimation(fbxUrl, vrm)

  const { actions, mixer } = useAnimations(
    [animation],
    vrm.scene,
  )

  useEffect(() => {
    actions.vrmAnimation!.reset().fadeIn(0.5).play()

    return () => {
      actions.vrmAnimation!.fadeOut(0.5).stop()
    }
  }, [actions])

  useFrame((_, delta) => {
    mixer.update(delta)
    vrm.update(delta)
  })

  return (
    <RigidBody colliders={false}>
      <CapsuleCollider args={[0.5, 0.25]} position={[0, 0.8, 0]} />
      <primitive
        object={vrm.scene}
        position={[0, 0, 0]}
        rotation={[0, Math.PI, 0]}
        scale={1.05}
      />
    </RigidBody>
  )
}
