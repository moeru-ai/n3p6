import { useVRM } from '@n3p6/react-three-vrm'
import { useEntityManager, useYuka } from '@n3p6/react-three-yuka'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { useEffect } from 'react'
import { ArriveBehavior, GameEntity, Vehicle } from 'yuka'

const vrmUrl = import.meta.env.DEV
  ? '/models/Hikari_SummerDress.vrm'
  : 'https://dist.ayaka.moe/vrm-models/kwaa/Hikari_SummerDress.vrm'

// eslint-disable-next-line @masknet/no-top-level
useVRM.preload(vrmUrl)

export const HikariYuka = () => {
  const vrm = useVRM(vrmUrl)
  const entityManager = useEntityManager()

  const [vehicleRef, vehicleEntity] = useYuka(Vehicle, { position: [0, 0, 0] })
  const [playerRef, playerEntity] = useYuka(GameEntity, { position: [5, 0, 5] })

  useEffect(() => {
    const arriveBehavior = new ArriveBehavior(playerEntity.position, 1.5, 0.1)
    vehicleEntity.steering.add(arriveBehavior)

    return () => {
      vehicleEntity.steering.remove(arriveBehavior)
    }
  }, [playerEntity, vehicleEntity])

  useFrame((_, delta) => {
    // vehicle.update(delta)
    entityManager.update(delta)
    vrm.update(delta)
  })

  return (
    <>
      <group ref={vehicleRef}>
        <RigidBody colliders={false}>
          <CapsuleCollider args={[0.5, 0.25]} position={[0, 0.8, 0]} />
          <primitive
            object={vrm.scene}
            // position={[0, 0, 0]}
            // ref={vehicleRef}
            rotation={[0, Math.PI, 0]}
            scale={1.05}
          />
        </RigidBody>
      </group>
      <mesh ref={playerRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="yellow" />
        <pointLight distance={4} intensity={2} position={[0, 0, 0]} />
      </mesh>
    </>
  )
}
