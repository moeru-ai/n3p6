import { useXRMeshes } from '@react-three/xr'
import { useEffect } from 'react'

import { HikariYuka } from '~/components/vrm/hikari-yuka'
import { XRMeshModel } from '~/components/xr/xr-mesh-model'

const DebugMeshes = () => {
  // https://pmndrs.github.io/xr/docs/tutorials/object-detection#detected-meshes
  const meshes = useXRMeshes()
    .filter(mesh => mesh.semanticLabel == null || !['global mesh', 'other'].includes(mesh.semanticLabel))

  useEffect(() => {
    console.warn('Meshes count:', meshes.length)
    console.warn(meshes.map(mesh => mesh.semanticLabel))
  }, [meshes])

  return (
    <>
      {meshes.map((mesh, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <XRMeshModel key={key} mesh={mesh} />
      ))}
      <HikariYuka />
    </>
  )
}

export default DebugMeshes
