import { useXRPlanes, XRPlaneModel, XRSpace } from '@react-three/xr'

import { HikariYuka } from '~/components/vrm/hikari-yuka'

const DebugPlanes = () => {
  // https://pmndrs.github.io/xr/docs/tutorials/object-detection#detected-planes
  const wallPlanes = useXRPlanes('wall')

  return (
    <>
      {wallPlanes.map(plane => (
        <XRSpace key={plane.semanticLabel} space={plane.planeSpace}>
          <XRPlaneModel plane={plane}>
            <meshPhysicalMaterial color="yellow" opacity={0.5} transparent />
          </XRPlaneModel>
        </XRSpace>
      ))}
      <HikariYuka />
    </>
  )
}

export default DebugPlanes
