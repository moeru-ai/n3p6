import type { ThreeElement } from '@react-three/fiber'
import type { Ref } from 'react'
import type { Group, Quaternion, Vector3 } from 'three'
import type { GameEntity } from 'yuka'

import { useEffect, useMemo, useRef } from 'react'

import { useEntityManager } from '../context/entity-manager'

export interface UseYukaOptions {
  position: [number, number, number]
}

export const useYuka = <T extends typeof GameEntity>(Entity: T, options: UseYukaOptions = {
  position: [0, 0, 0],
}): [Ref<ThreeElement<typeof Group>>, InstanceType<T>] => {
  const entityManager = useEntityManager()
  const ref = useRef<ThreeElement<typeof Group>>(null)
  const entity = useMemo(() => new Entity() as InstanceType<T>, [Entity])

  useEffect(() => {
    entity.position.set(...options.position)
    entity.setRenderComponent(ref, (entity) => {
      (ref.current?.position as Vector3)?.copy(entity.position)
      ;(ref.current?.quaternion as Quaternion)?.copy(entity.rotation)
    })
    entityManager.add(entity)

    return () => {
      entityManager.remove(entity)
    }
  }, [entity, entityManager, options])

  return [ref, entity]
}
