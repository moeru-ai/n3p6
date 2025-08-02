import { Grid, Stars } from '@react-three/drei'
// import { RigidBody } from '@react-three/rapier'
import { colors } from '@react-three/uikit-default'
import { FixedBvhPhysicsBody, PrototypeBox } from '@react-three/viverse'
import { IfInSessionMode } from '@react-three/xr'
import { useMemo } from 'react'

import { useIsDarkValue } from '~/hooks/use-is-dark'

// import { TransparentPrototypeBox } from './3d/transparent-prototype-box'

export const Environment = () => {
  const isDark = useIsDarkValue()
  const intensity = isDark ? 1 : 1.5

  // FIXME: useSignal
  // eslint-disable-next-line sonarjs/no-all-duplicated-branches
  const bg = useMemo(() => isDark ? colors.background.value : colors.background.value, [isDark])
  // eslint-disable-next-line sonarjs/no-all-duplicated-branches
  const fg = useMemo(() => isDark ? colors.foreground.value : colors.foreground.value, [isDark])

  return (
    <>
      <ambientLight intensity={intensity} />
      <FixedBvhPhysicsBody>
        <PrototypeBox
          position={[0, 0, 0]}
          scale={[50, 0.1, 50]}
        />
        {/* <TransparentPrototypeBox
          position={[0, 5 / 2, -50 / 2]}
          scale={[50, 5, 0.1]}
        />
        <TransparentPrototypeBox
          position={[0, 5 / 2, 50 / 2]}
          scale={[50, 5, 0.1]}
        />
        <TransparentPrototypeBox
          position={[-50 / 2, 5 / 2, 0]}
          scale={[0.1, 5, 50]}
        />
        <TransparentPrototypeBox
          position={[50 / 2, 5 / 2, 0]}
          scale={[0.1, 5, 50]}
        /> */}
      </FixedBvhPhysicsBody>

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
