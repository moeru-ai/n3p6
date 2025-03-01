import { Grid, Stars } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { colors } from '@react-three/uikit-default'
import { IfInSessionMode } from '@react-three/xr'
import { useEffect, useState } from 'react'

import { useIsDarkValue } from '~/hooks/use-is-dark'

export const Environment = () => {
  const isDark = useIsDarkValue()
  const intensity = isDark ? 1 : 1.5

  const [bg, setBg] = useState(colors.background.value)
  const [fg, setFg] = useState(colors.foreground.value)

  // fix: listen signal update
  useEffect(() => {
    setBg(colors.background.value)
    setFg(colors.foreground.value)
  }, [isDark])

  return (
    <>
      <ambientLight intensity={intensity} />
      <RigidBody includeInvisible type="fixed">
        <mesh
          position={[0, 0, 0]}
          scale={[50, 0.1, 50]}
          visible={false}
        >
          <boxGeometry />
        </mesh>
      </RigidBody>
      <IfInSessionMode deny="immersive-ar">
        <Grid
          cellColor={fg}
          cellSize={1}
          cellThickness={1}
          fadeDistance={50}
          fadeStrength={10}
          infiniteGrid
          position={[0, 0, 0]}
          sectionSize={0}
        />
        <color args={[bg]} attach="background" />
        {isDark && <Stars count={99} depth={99} fade />}
      </IfInSessionMode>
    </>
  )
}
