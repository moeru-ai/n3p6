import { useStaticGameEntity, useSetObstacles } from '@n3p6/react-three-yuka'
import { useXRMeshGeometry, XRSpace } from '@react-three/xr'
import { useEffect } from 'react'
import { GameEntity } from 'yuka'

export interface XRMeshModelProps {
  mesh: XRMesh
}

export const XRMeshModel = ({ mesh }: XRMeshModelProps) => {
  const { addObstacle, removeObstacle } = useSetObstacles()
  const geometry = useXRMeshGeometry(mesh)
  const [meshRef, meshEntity] = useStaticGameEntity(GameEntity)

  useEffect(() => {
    geometry.computeBoundingSphere()

    // eslint-disable-next-line react-compiler/react-compiler
    meshEntity.boundingRadius = geometry.boundingSphere!.radius
  }, [meshEntity, geometry])

  useEffect(() => {
    addObstacle(meshEntity)

    return () => {
      removeObstacle(meshEntity)
    }
  }, [meshEntity])

  return (
    <XRSpace space={mesh.meshSpace}>
      <mesh geometry={geometry} ref={meshRef}>
        <meshPhysicalMaterial color="yellow" opacity={0.5} transparent />
      </mesh>
    </XRSpace>
  )
}
