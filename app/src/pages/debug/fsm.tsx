import { WalkState } from '@n3p6/orcust-automaton'
import { useEntityManager, useGameEntity } from '@n3p6/react-three-yuka'
import { useFrame } from '@react-three/fiber'
import { useSingleton } from 'foxact/use-singleton'
import { useEffect } from 'react'
import { Vector3 } from 'three'
import { GameEntity, Vector3 as YukaVector3 } from 'yuka'

import { useAnimations } from '~/hooks/use-animation-collection'
import { useGalateaFSM } from '~/hooks/use-galatea-fsm'

const DebugFSM = () => {
  const { galateaEntity, galateaRef, galateaVRM } = useGalateaFSM()
  const { actions } = useAnimations(galateaVRM)

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

  useEffect(() => {
    // console.warn('State changed:', galateaEntity.stateMachine.currentState, galateaEntity.stateMachine.previousState)
    const isWalk = galateaEntity.stateMachine.currentState instanceof WalkState

    if (galateaEntity.stateMachine.previousState == null) {
      actions[isWalk ? 'walk' : 'idle']!
        .reset()
        .fadeIn(1)
        .play()
    }
    else {
      actions[isWalk ? 'walk' : 'idle']!
        .reset()
        .crossFadeFrom(actions[isWalk ? 'idle' : 'walk']!, 1)
        .play()
    }
  }, [actions, galateaEntity.stateMachine.currentState, galateaEntity.stateMachine.previousState])

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

export default DebugFSM
