import { useOrcustAutomaton } from '@n3p6/orcust-automaton'
import { useVRM, useVRMAutoBlink, useVRMAutoLookAtDefaultCamera } from '@n3p6/react-three-vrm'
import { useEntityManager, useGameEntity, useObstacles } from '@n3p6/react-three-yuka'
import { useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'
import { Vector3 } from 'three'
import { GameEntity, Vector3 as YukaVector3 } from 'yuka'

import { useAnimationCollection } from '~/hooks/use-animation-collection'

const vrmUrl = import.meta.env.DEV
  ? '/models/Hikari_SummerDress.vrm'
  : 'https://dist.ayaka.moe/vrm-models/kwaa/Hikari_SummerDress.vrm'

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload(vrmUrl)

export const HikariYuka = () => {
  const vrm = useVRM(vrmUrl)
  const clips = useAnimationCollection(vrm)
  const { actions } = useAnimations(clips, vrm.scene)

  useVRMAutoBlink(vrm, 5000)
  useVRMAutoLookAtDefaultCamera(vrm)

  const entityManager = useEntityManager()
  const [vehicleRef, vehicleEntity] = useOrcustAutomaton()
  const [playerRef, playerEntity] = useGameEntity(GameEntity)

  useEffect(() => vehicleEntity.setActions(actions), [vehicleEntity, actions])
  useEffect(() => vehicleEntity.setCurrentTarget(playerEntity), [vehicleEntity, playerEntity])

  useFrame(({ camera }, delta) => {
    // vehicleEntity.update(delta)
    entityManager.update(delta)

    const position = camera.getWorldPosition(new Vector3())
    playerEntity.position.copy(new YukaVector3(position.x, 0, position.z))
  })

  const obstacles = useObstacles()

  useEffect(() => {
    vehicleEntity.setObstacles(obstacles)

    return () => {
      vehicleEntity.setObstacles([])
    }
  }, [vehicleEntity, obstacles])

  return (
    <>
      <group ref={vehicleRef}>
        <primitive
          object={vrm.scene}
          position={[0, 0, 0]}
          rotation={[0, Math.PI, 0]}
          scale={1.05}
        />
      </group>
      <group ref={playerRef}></group>
    </>
  )
}
