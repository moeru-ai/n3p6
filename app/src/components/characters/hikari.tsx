import { useVRM, useVRMA } from '@n3p6/react-three-vrm'
import { createVRMAnimationClip } from '@pixiv/three-vrm-animation'
import { useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { useEffect } from 'react'

import vrmUrl from '../../../assets/models/Hikari_SummerDress.vrm?url'
import vrmaUrl from '../../../assets/motions/waiting.vrma?url'

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload(vrmUrl)

export const Hikari = () => {
  const vrm = useVRM(vrmUrl)
  const vrma = useVRMA(vrmaUrl)

  const { actions, mixer } = useAnimations(
    [createVRMAnimationClip(vrma, vrm)],
    vrm.scene,
  )

  useEffect(() => {
    actions.Clip!.reset().fadeIn(0.5).play()

    return () => {
      actions.Clip!.fadeOut(0.5).stop()
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
