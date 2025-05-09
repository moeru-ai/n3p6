import type { NavMesh } from '@recast-navigation/core'

import { getNavMeshPositionsAndIndices } from '@recast-navigation/core'
import { Polygon, NavMesh as YukaNavMesh, Vector3 as YukaVector3 } from 'yuka'

export const toYukaNavMesh = (navMesh: NavMesh): YukaNavMesh => {
  const [position, index] = getNavMeshPositionsAndIndices(navMesh)

  const vertices: YukaVector3[] = []
  const polygons: Polygon[] = []

  // vertices
  for (let i = 0, l = position.length; i < l; i += 3) {
    const v = new YukaVector3()

    v.x = position[i + 0]
    v.y = position[i + 1]
    v.z = position[i + 2]

    vertices.push(v)
  }

  // polygons
  // indexed geometry
  for (let i = 0, l = index.length; i < l; i += 3) {
    const a = index[i + 0]
    const b = index[i + 1]
    const c = index[i + 2]

    const contour = [vertices[a], vertices[b], vertices[c]]

    const polygon = new Polygon().fromContour(contour)

    polygons.push(polygon)
  }

  return new YukaNavMesh().fromPolygons(polygons)
}
