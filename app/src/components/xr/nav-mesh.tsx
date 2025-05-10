import type { OrcustAutomaton } from '@n3p6/orcust-automaton'
import type { NavMesh } from 'yuka'

import { toYukaNavMesh } from '@n3p6/react-three-yuka/recast-navigation'
import { XRMeshModel, XRPlaneModel } from '@pmndrs/xr'
import { useXRMeshes, useXRPlanes, XRSpace } from '@react-three/xr'
import { threeToSoloNavMesh } from '@recast-navigation/three'
import { startTransition, useEffect, useMemo, useState } from 'react'
import { BufferGeometry, Color, Float32BufferAttribute, Mesh, MeshBasicMaterial } from 'three'

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
    color.setHex(Math.random() * 0xFFFFF)
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
  // https://pmndrs.github.io/xr/docs/tutorials/object-detection#detected-meshes
  const meshes = useXRMeshes()
  const planes = useXRPlanes()
  const filteredMeshes = useMemo(() => meshes.filter(mesh => mesh.semanticLabel == null || !['global mesh', 'other'].includes(mesh.semanticLabel)), [meshes])
  const meshesModels = useMemo(() => filteredMeshes.map(mesh => new XRMeshModel(mesh)), [filteredMeshes])
  const planesModels = useMemo(() => planes.map(plane => new XRPlaneModel(plane)), [planes])

  const [navMesh, setNavMesh] = useState<NavMesh>()

  const navMeshObject = useMemo(() => navMesh && createConvexRegionHelper(navMesh), [navMesh])

  useEffect(() => {
    console.warn('NavMesh Update', meshesModels, planesModels)

    if (meshesModels.length === 0 || planesModels.length === 0)
      return

    // eslint-disable-next-line @masknet/no-timer
    const timeout = setTimeout(() => {
      const { navMesh: detourNavMesh } = threeToSoloNavMesh([...meshesModels, ...planesModels], {
        ch: 0.05,
        cs: 0.05,
        walkableHeight: 0,
        walkableSlopeAngle: 5,
      })

      startTransition(() => {
        const navMesh = toYukaNavMesh(detourNavMesh!)
        entity.setNavMesh(navMesh)
        setNavMesh(navMesh)
        entity.position.set(0, 0, 0)
      })
    }, 10)

    return () => {
      // eslint-disable-next-line @masknet/no-timer
      clearTimeout(timeout)

      startTransition(() => {
        // result.navMesh?.destroy()
        entity.setNavMesh()
        setNavMesh(undefined)
      })
    }
  }, [meshesModels, planesModels, entity])

  return (
    <>
      {meshesModels.map((mesh, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <XRSpace key={i} space={meshes[i].meshSpace}>
          <primitive object={mesh} />
        </XRSpace>
      ))}
      {planesModels.map((plane, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <XRSpace key={i} space={planes[i].planeSpace}>
          <primitive object={plane} />
        </XRSpace>
      ))}
      {navMeshObject && <primitive object={navMeshObject} />}
    </>
  )
}
