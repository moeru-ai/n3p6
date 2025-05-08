import { useXRMeshes, XRMeshModel, XRSpace } from '@react-three/xr'

import { HikariYuka } from '~/components/vrm/hikari-yuka'

const DebugMeshes = () => {
  // https://pmndrs.github.io/xr/docs/tutorials/object-detection#detected-meshes
  const screenMeshes = useXRMeshes('screen')

  return (
    <>
      {screenMeshes.map(mesh => (
        <XRSpace key={mesh.semanticLabel} space={mesh.meshSpace}>
          <XRMeshModel mesh={mesh}>
            <meshPhysicalMaterial color="yellow" opacity={0.5} transparent />
          </XRMeshModel>
        </XRSpace>
      ))}
      <HikariYuka />
    </>
  )
}

export default DebugMeshes
