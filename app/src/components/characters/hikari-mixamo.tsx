import { useMixamoAnimation, useVRM, useVRMAutoBlink } from '@n3p6/react-three-vrm'
// import { useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { useEffect } from 'react'
import { AnimationMixer } from 'three'

import vrmUrl from '../../../assets/models/Hikari_SummerDress.vrm?url'
import fbxUrl from '../../../assets/motions/mixamo/Standing Idle.fbx?url'

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload(vrmUrl)
// eslint-disable-next-line @masknet/no-top-level
useMixamoAnimation.preload(fbxUrl)

export const HikariMixamo = () => {
  const vrm = useVRM(vrmUrl)
  const animation = useMixamoAnimation(fbxUrl, vrm)

  useVRMAutoBlink(vrm, 5000)

  const mixer = new AnimationMixer(vrm.scene)

  useEffect(() => {
    const action = mixer.clipAction(animation)

    action.reset().fadeIn(0.5).play()

    return () => { action.fadeOut(0.5).stop() }
  }, [animation])

  // const { actions, mixer } = useAnimations(
  //   [animation],
  //   vrm.scene,
  // )

  // useEffect(() => {
  //   actions.vrmAnimation!.reset().fadeIn(0.5).play()

  //   return () => {
  //     actions.vrmAnimation!.fadeOut(0.5).stop()
  //   }
  // }, [actions])

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
