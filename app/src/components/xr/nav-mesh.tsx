import type { OrcustAutomaton } from '@n3p6/orcust-automaton'
import type { NavMesh } from 'yuka'

import { toYukaNavMesh } from '@n3p6/react-three-yuka/recast-navigation'
import { threeToSoloNavMesh } from '@recast-navigation/three'
import { useEffect, useState } from 'react'
import { BufferGeometry, Color, Float32BufferAttribute, Mesh, MeshBasicMaterial } from 'three'

import { useMesh } from '~/context/mesh'

export interface NavMeshProps {
  entity: OrcustAutomaton
}

const createConvexRegionHelper = (navMesh: NavMesh) => {
  const regions = navMesh.regions
  const geometry = new BufferGeometry()
  const material = new MeshBasicMaterial()
  const mesh = new Mesh(geometry, material)
  const positions = []
  const colors = []
  const color = new Color()
  for (const region of regions) {
    // eslint-disable-next-line sonarjs/pseudo-random
    color.setHex(Math.random() * 0xFFFFFF)
    let edge = region.edge
    const edges = []
    do {
      edges.push(edge)
      edge = edge!.next
    } while (edge !== region.edge)
    const triangleCount = (edges.length - 2)
    for (let i = 1, l = triangleCount; i <= l; i++) {
      const v1 = edges[0]!.vertex
      const v2 = edges[i + 0]!.vertex
      const v3 = edges[i + 1]!.vertex
      positions.push(v1.x, v1.y, v1.z)
      positions.push(v2.x, v2.y, v2.z)
      positions.push(v3.x, v3.y, v3.z)
      colors.push(color.r, color.g, color.b)
      colors.push(color.r, color.g, color.b)
      colors.push(color.r, color.g, color.b)
    }
  }

  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))

  return mesh
}

export const XRNavMesh = ({ entity }: NavMeshProps) => {
  const meshes = useMesh()

  const [mesh, setMesh] = useState<Mesh>()

  useEffect(() => {
    if (meshes.length === 0)
      return

    const result = threeToSoloNavMesh(meshes, {
      ch: 0.05,
      cs: 0.05,
      walkableHeight: 0,
      walkableSlopeAngle: 5,
    })

    // @ts-expect-error wrong type
    if (result.error != null)
      // @ts-expect-error wrong type
      console.error(result.error)

    const yukaNavMesh = toYukaNavMesh(result.navMesh!)

    entity.setNavMesh(yukaNavMesh)

    setMesh(createConvexRegionHelper(yukaNavMesh))

    return () => {
      result.navMesh?.destroy()
      entity.setNavMesh()
      setMesh(undefined)
    }
  }, [meshes.length, entity])

  // return createConvexRegionHelper(navMesh)
  return mesh
    ? <primitive object={mesh} />
    : null
}
