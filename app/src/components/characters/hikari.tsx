import type { AnimationAction } from 'three'

import { createVRMAnimationClip } from '@pixiv/three-vrm-animation'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { useEffect, useRef } from 'react'
import { AnimationMixer } from 'three'

import vrmUrl from '../../../assets/models/Hikari_SummerDress.vrm?url'
import vrmaUrl from '../../../assets/motions/waiting.vrma?url'
import { useVRM, useVRMA } from '../../hooks/use-vrm'

// eslint-disable-next-line @masknet/no-top-level
useGLTF.preload(vrmUrl)

export const Hikari = () => {
  const mixer = useRef<AnimationMixer>(undefined)
  const action = useRef<AnimationAction>(undefined)

  const vrm = useVRM(vrmUrl)
  const vrma = useVRMA(vrmaUrl)

  useEffect(() => {
    const loadAnimation = async () => {
      if (!vrma)
        return

      const mixerTmp: AnimationMixer = new AnimationMixer(vrm.scene)
      mixer.current = mixerTmp

      const clip = createVRMAnimationClip(vrma, vrm)
      action.current = mixer.current.clipAction(clip)
      action.current.play()
    }
    void loadAnimation()
  }, [vrm, vrma])

  useFrame((_, delta) => {
    if (mixer.current)
      mixer.current.update(delta)

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
