import { useVRM } from '@n3p6/react-three-vrm'
import { useEntityManager, useYuka } from '@n3p6/react-three-yuka'
import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'
import { Vector3 } from 'three'
import { ArriveBehavior, GameEntity, Vehicle, Vector3 as YukaVector3 } from 'yuka'

const vrmUrl = import.meta.env.DEV
  ? '/models/Hikari_SummerDress.vrm'
  : 'https://dist.ayaka.moe/vrm-models/kwaa/Hikari_SummerDress.vrm'

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload(vrmUrl)

export const HikariYuka = () => {
  const vrm = useVRM(vrmUrl)
  const entityManager = useEntityManager()

  const [vehicleRef, vehicleEntity] = useYuka(Vehicle, {
    position: [0, 0, 0],
  })
  const [playerRef, playerEntity] = useYuka(GameEntity)

  useEffect(() => {
    const arriveBehavior = new ArriveBehavior(playerEntity.position, 1.5, 0.1)
    vehicleEntity.steering.add(arriveBehavior)

    return () => {
      vehicleEntity.steering.remove(arriveBehavior)
    }
  }, [vehicleEntity, playerEntity])

  useFrame((state, delta) => {
    // vehicle.update(delta)
    entityManager.update(delta)
    vrm.update(delta)

    const position = state.camera.getWorldPosition(new Vector3())
    playerEntity.position.copy(new YukaVector3(position.x, 0, position.z))
  })

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
