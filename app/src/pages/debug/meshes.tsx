import { InitRecastNavigation } from '@n3p6/react-three-yuka/recast-navigation'
import { useXRMeshes, useXRPlanes } from '@react-three/xr'
import { useEffect } from 'react'

import { Galatea } from '~/components/vrm/galatea'
import { XRMeshModel } from '~/components/xr/xr-mesh-model'
import { XRPlaneModel } from '~/components/xr/xr-plane-model'

const DebugMeshes = () => {
  // https://pmndrs.github.io/xr/docs/tutorials/object-detection#detected-meshes
  const meshes = useXRMeshes()
    .filter(mesh => mesh.semanticLabel == null || !['global mesh', 'other'].includes(mesh.semanticLabel))

  const floor = useXRPlanes('floor')

  useEffect(() => {
    console.warn('Meshes count:', meshes.length)
    console.warn(meshes.map(mesh => mesh.semanticLabel))
  }, [meshes])

  return (
    <InitRecastNavigation>
      {meshes.map((mesh, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <XRMeshModel key={key} mesh={mesh} />
      ))}
      {floor.map((plane, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <XRPlaneModel key={key} plane={plane} />
      ))}
      <Galatea />
    </InitRecastNavigation>
  )
}

export default DebugMeshes
