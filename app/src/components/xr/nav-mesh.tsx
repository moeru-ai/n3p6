import type { OrcustAutomaton } from '@n3p6/orcust-automaton'

import { toYukaNavMesh } from '@n3p6/react-three-yuka/recast-navigation'
import { XRMeshModel, XRPlaneModel } from '@pmndrs/xr'
import { useXRMeshes, useXRPlanes, XRSpace } from '@react-three/xr'
import { threeToSoloNavMesh } from '@recast-navigation/three'
import { useEffect, useMemo, useRef } from 'react'
import { MeshPhysicalMaterial } from 'three'
import { NavMesh } from 'yuka'
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
  // https://pmndrs.github.io/xr/docs/tutorials/object-detection#detected-meshes
  const meshes = useXRMeshes()
    .filter(mesh => mesh.semanticLabel == null || !['global mesh', 'other'].includes(mesh.semanticLabel))

  const planes = useXRPlanes('floor')

  const material = useMemo(() => new MeshPhysicalMaterial({
    color: 'yellow',
    opacity: 0.5,
    transparent: true,
  }), [])

  const meshesModels = useMemo(() => meshes.map(mesh => {
    const model =  new XRMeshModel(mesh)
    model.material = material
    model.material.needsUpdate = true
    return model
  }), [meshes])
  const planesModels = useMemo(() => planes.map(plane => {
    const model = new XRPlaneModel(plane)
    model.material = material
    model.material.needsUpdate = true
    return model
  }), [planes])

  const navMeshRef = useRef<NavMesh>(null)

  const navMeshObject = useMemo(() => navMeshRef.current && createConvexRegionHelper(navMeshRef.current), [navMeshRef.current])

  useEffect(() => {
    console.warn('NavMesh Update')

    if (meshes.length === 0 || planes.length === 0)
      return

    const result = threeToSoloNavMesh([...meshesModels, ...planesModels], {
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
    navMeshRef.current = yukaNavMesh

    return () => {
      result.navMesh?.destroy()
      entity.setNavMesh()
      navMeshRef.current = null
    }
  }, [meshes, planes, entity])

  return (
    <>
      {meshesModels.map((mesh, i) => (
        <XRSpace key={i} space={meshes[i].meshSpace}>
          <primitive object={mesh} />
        </XRSpace>
      ))}
      {planesModels.map((plane, i) => (
        <XRSpace key={i} space={planes[i].planeSpace}>
          <primitive object={plane} />
        </XRSpace>
      ))}
      {navMeshObject && <primitive object={navMeshObject} />}
    </>
  )
}
