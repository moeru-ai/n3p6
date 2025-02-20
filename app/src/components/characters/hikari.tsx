import { useVRM, useVRMAnimation } from '@n3p6/react-three-vrm'
import { useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { useEffect } from 'react'

import vrmaUrl from '../../../assets/motions/waiting.vrma?url'

const vrmUrl = import.meta.env.DEV
  ? '/models/Hikari_SummerDress.vrm'
  : 'https://dist.ayaka.moe/vrm-models/kwaa/Hikari_SummerDress.vrm'

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload(vrmUrl)

export const Hikari = () => {
  const vrm = useVRM(vrmUrl)
  const animation = useVRMAnimation(vrmaUrl, vrm)

  const { actions, mixer } = useAnimations(
    [animation],
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
