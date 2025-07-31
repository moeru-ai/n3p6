import { useOrcustAutomatonState } from '@n3p6/orcust-automaton'
import { useEntityManager, useGameEntity } from '@n3p6/react-three-yuka'
import { useFrame } from '@react-three/fiber'
import { useSingleton } from 'foxact/use-singleton'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { GameEntity, Vector3 as YukaVector3 } from 'yuka'

import { GalateaKiss } from '~/components/vrm/galatea-kiss'
import { GalateaTTS } from '~/components/vrm/galatea-tts'
import { GalateaVAD } from '~/components/vrm/galatea-vad'
import { useAnimations } from '~/hooks/use-animations'
import { useGalatea } from '~/hooks/use-galatea'

export const Galatea = () => {
  const { galateaEntity, galateaRef, galateaVRM } = useGalatea()
  const { actions, mixer } = useAnimations(galateaVRM)

  const initialized = useRef<true>(null)

  const entityManager = useEntityManager()
  const [playerRef, playerEntity] = useGameEntity(GameEntity)

  useEffect(() => galateaEntity.setCurrentTarget(playerEntity), [galateaEntity, playerEntity])

  const vec = useSingleton(() => new Vector3())
  const yukaVec = useSingleton(() => new YukaVector3())

  useFrame(({ camera }, delta) => {
    entityManager.update(delta)

    const { x, z } = camera.getWorldPosition(vec.current)
    playerEntity.position.copy(yukaVec.current.set(x, 0, z))

    // eslint-disable-next-line react-hooks/react-compiler
    actions.walk!.timeScale = Math.min(0.75, galateaEntity.getSpeed() / galateaEntity.maxSpeed)
  })

  const isWalk = useOrcustAutomatonState(galateaEntity)

  useEffect(() => {
    if (initialized.current == null) {
      actions[isWalk ? 'walk' : 'idle']!
        .reset()
        .fadeIn(0.5)
        .play()

      initialized.current = true
    }
    else {
      actions[isWalk ? 'walk' : 'idle']!
        .reset()
        .crossFadeFrom(actions[isWalk ? 'idle' : 'walk']!, 0.5)
        .play()
    }
  }, [actions, initialized, isWalk])

  // const obstacles = useObstacles()

  // useEffect(() => {
  //   galateaEntity.setObstacles(obstacles)

  //   return () => {
  //     galateaEntity.setObstacles([])
  //   }
  // }, [galateaEntity, obstacles])

  return (
    <>
      <group ref={galateaRef}>
        <primitive
          object={galateaVRM.scene}
          position={[0, 0, 0]}
          rotation={[0, Math.PI, 0]}
          scale={1.05}
        />
        <GalateaTTS vrm={galateaVRM} />
        <GalateaVAD />
        <GalateaKiss actions={actions} mixer={mixer} vrm={galateaVRM} />
      </group>
      <group ref={playerRef}></group>
    </>
  )
}
