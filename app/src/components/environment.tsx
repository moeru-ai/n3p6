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

  // FIXME: listen signal update
  useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setBg(colors.background.value)
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
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
        <mesh position={[0, 5 / 2, -50 / 2]} visible={false}>
          <boxGeometry args={[50, 5, 0.1]} />
        </mesh>
        <mesh position={[0, 5 / 2, 50 / 2]} visible={false}>
          <boxGeometry args={[50, 5, 0.1]} />
        </mesh>
        <mesh position={[-50 / 2, 5 / 2, 0]} visible={false}>
          <boxGeometry args={[0.1, 5, 50]} />
        </mesh>
        <mesh position={[50 / 2, 5 / 2, 0]} visible={false}>
          <boxGeometry args={[0.1, 5, 50]} />
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
