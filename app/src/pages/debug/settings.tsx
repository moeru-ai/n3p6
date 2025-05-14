import { GlassMaterial, MetalMaterial, Root } from '@react-three/uikit'
import { colors } from '@react-three/uikit-default'

import { Settings } from '~/components/ui/settings'

const DebugSettings = () => {
  return (
    <group position={[0, 1, 0]}>
      <Root
        alignItems="center"
        backgroundColor={colors.muted}
        borderRadius={12}
        height={768}
        justifyContent="center"
        panelMaterialClass={GlassMaterial}
        pixelSize={0.0015}
        width={1024}
      >
        <Settings panelMaterialClass={MetalMaterial} />
      </Root>
    </group>
  )
}

export default DebugSettings
