import { useXRPlanes, XRPlaneModel, XRSpace } from '@react-three/xr'
import { useEffect } from 'react'

import { Galatea } from '~/components/vrm/galatea'

const DebugPlanes = () => {
  // https://pmndrs.github.io/xr/docs/tutorials/object-detection#detected-planes
  const walls = useXRPlanes()

  useEffect(() => {
    console.warn('Walls count:', walls.length)
    console.warn(walls.map(wall => wall.semanticLabel))
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
      <Galatea />
    </>
  )
}

export default DebugPlanes
