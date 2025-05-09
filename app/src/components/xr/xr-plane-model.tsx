import { useStaticGameEntity } from '@n3p6/react-three-yuka'
import { useXRPlaneGeometry, XRSpace } from '@react-three/xr'
import { useEffect, useMemo } from 'react'
import { MeshPhysicalMaterial } from 'three'
import { GameEntity } from 'yuka'

import { useEditMesh } from '../../context/mesh'

export interface XRPlaneModelProps {
  plane: XRPlane
}

export const XRPlaneModel = ({ plane }: XRPlaneModelProps) => {
  // const { addObstacle, removeObstacle } = useSetObstacles()
  const { addMesh, removeMesh } = useEditMesh()
  const geometry = useXRPlaneGeometry(plane)
  const [meshRef, meshEntity] = useStaticGameEntity(GameEntity)

  const material = useMemo(() => new MeshPhysicalMaterial({
    color: 'yellow',
    opacity: 0.5,
    transparent: true,
  }), [])

  useEffect(() => {
    geometry.computeBoundingSphere()

    // eslint-disable-next-line react-compiler/react-compiler
    meshEntity.boundingRadius = geometry.boundingSphere!.radius

    if (meshRef.current)
      addMesh(meshRef.current)

    return () => {
      if (meshRef.current)
        removeMesh(meshRef.current)
    }
  }, [geometry, meshRef, meshEntity, addMesh, removeMesh])

  return (
    <XRSpace space={plane.planeSpace}>
      <mesh geometry={geometry} material={material} ref={meshRef} />
    </XRSpace>
  )
}
