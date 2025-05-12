import { useEntityManager, useGameEntity, useObstacles } from '@n3p6/react-three-yuka'
import { useFrame } from '@react-three/fiber'
import { useSingleton } from 'foxact/use-singleton'
import { useEffect } from 'react'
import { Vector3 } from 'three'
import { GameEntity, Vector3 as YukaVector3 } from 'yuka'

import { useGalatea } from '~/hooks/use-galatea'

export const Galatea = () => {
  const { galateaEntity, galateaRef, galateaVRM } = useGalatea()

  const entityManager = useEntityManager()
  const [playerRef, playerEntity] = useGameEntity(GameEntity)

  useEffect(() => galateaEntity.setCurrentTarget(playerEntity), [galateaEntity, playerEntity])

  const vec = useSingleton(() => new Vector3())
  const yukaVec = useSingleton(() => new YukaVector3())

  useFrame(({ camera }, delta) => {
    entityManager.update(delta)

    const { x, z } = camera.getWorldPosition(vec.current)
    playerEntity.position.copy(yukaVec.current.set(x, 0, z))
  })

  const obstacles = useObstacles()

  useEffect(() => {
    galateaEntity.setObstacles(obstacles)

    return () => {
      galateaEntity.setObstacles([])
    }
  }, [galateaEntity, obstacles])

  return (
    <>
      <group ref={galateaRef}>
        <primitive
          object={galateaVRM.scene}
          position={[0, 0, 0]}
          rotation={[0, Math.PI, 0]}
          scale={1.05}
        />
      </group>
      <group ref={playerRef}></group>
    </>
  )
}
