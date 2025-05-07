import type { RefObject } from 'react'
import type { Group, Object3DEventMap, Quaternion, Vector3 } from 'three'
import type { GameEntity } from 'yuka'

import { useEffect, useMemo, useRef } from 'react'

import { useEntityManager } from '../context/entity-manager'

export interface UseGameEntityOptions {
  position: [number, number, number]
}

export const useGameEntity = <T extends typeof GameEntity>(Entity: T, options: UseGameEntityOptions = {
  position: [0, 0, 0],
}): [RefObject<Group<Object3DEventMap> | null>, InstanceType<T>] => {
  const entityManager = useEntityManager()
  const ref = useRef<Group>(null)
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
