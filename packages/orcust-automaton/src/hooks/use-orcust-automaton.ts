import type { RefObject } from 'react'
import type { Group, Quaternion, Vector3 } from 'three'

import { useEntityManager } from '@n3p6/react-three-yuka'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { CapsuleGeometry } from 'three'

import { OrcustAutomaton } from '../entities/orcust-automaton'

export const useOrcustAutomaton = (): [RefObject<Group | null>, OrcustAutomaton] => {
  const entityManager = useEntityManager()
  const ref = useRef<Group>(null)
  const entity = useMemo(() => new OrcustAutomaton(), [])

  useEffect(() => {
    const geometry = new CapsuleGeometry(0.15, 1.5)
    geometry.computeBoundingSphere()
    entity.boundingRadius = geometry.boundingSphere!.radius

    entity.position.set(0, 0, 0)

    entity.setRenderComponent(ref, (entity) => {
      (ref.current?.position as Vector3)?.copy(entity.position)
      ;(ref.current?.quaternion as Quaternion)?.copy(entity.rotation)
    })
    entityManager.add(entity)

    return () => {
      entityManager.remove(entity)
    }
  }, [entity, entityManager])

  useFrame((_, delta) => entity.update(delta))

  return [ref, entity]
}
