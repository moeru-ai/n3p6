import { useXRPlanes, XRSpace, XRPlaneModel } from '@react-three/xr'
import { useEffect } from 'react'

import { HikariYuka } from '~/components/vrm/hikari-yuka'

const DebugPlanes = () => {
  // https://pmndrs.github.io/xr/docs/tutorials/object-detection#detected-planes
  const walls = useXRPlanes('wall')

  useEffect(() => {
    console.warn('Walls count:', walls.length)
  }, [walls])

  return (
    <>
      {walls.map((plane, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <XRSpace key={key} space={plane.planeSpace}>
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
