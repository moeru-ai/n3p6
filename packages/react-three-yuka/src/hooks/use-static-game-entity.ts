import type { RefObject } from 'react'
import type { Mesh } from 'three'
import type { GameEntity } from 'yuka'

import { useFrame } from '@react-three/fiber'
import { useSingleton } from 'foxact/use-singleton'
import { useEffect, useMemo, useRef } from 'react'
import { Quaternion as YukaQuaternion, Vector3 as YukaVector3 } from 'yuka'

import { useEntityManager } from '../context/entity-manager'

export const useStaticGameEntity = <T extends typeof GameEntity>(Entity: T): [RefObject<Mesh | null>, InstanceType<T>] => {
  const entityManager = useEntityManager()
  const ref = useRef<Mesh>(null)
  const entity = useMemo(() => new Entity() as InstanceType<T>, [Entity])

  const v = useSingleton(() => new YukaVector3())
  const q = useSingleton(() => new YukaQuaternion())

  useEffect(() => {
    entity.setRenderComponent(ref, (entity) => {
      if (!ref.current)
        return

      const { position, quaternion } = ref.current
      entity.position.copy(v.current.set(position.x, position.y, position.z))
      entity.rotation.copy(q.current.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w))
    })
  }, [entity, ref, v, q])

  useEffect(() => {
    entityManager.add(entity)

    return () => {
      entityManager.remove(entity)
    }
  }, [entity, entityManager])

  useFrame((_, delta) => entity.update(delta))

  return [ref, entity]
}
