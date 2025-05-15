import { RoundedBox } from '@react-three/drei'
import { Root } from '@react-three/uikit'
import { colors } from '@react-three/uikit-default'

import { Settings } from '~/components/ui/settings'

const DebugTablet = () => {
  const depth = 0.005 // 5 mm
  const height = 0.1536 + depth * 2
  const width = 0.2048 + depth * 2

  return (
    <group position={[0, 1, -0.5]}>
      <RoundedBox
        args={[width, height, depth]}
        radius={depth}
        smoothness={4}
      >
        <meshStandardMaterial color="gray" />
      </RoundedBox>
      <group position={[0, 0, depth / 2 + 0.0001]}>
        <Root
          alignItems="center"
          backgroundColor={colors.muted}
          borderRadius={12}
          height={768}
          justifyContent="center"
          pixelSize={0.0002}
          positionTop={0.01}
          width={1024}
        >
          <Settings />
        </Root>
      </group>
    </group>
  )
}

export default DebugTablet
