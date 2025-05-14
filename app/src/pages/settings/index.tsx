import { Fullscreen } from '@react-three/uikit'
import { colors } from '@react-three/uikit-default'

import { Settings } from '~/components/ui/settings'

const SettingsIndex = () => (
  <Fullscreen
    alignItems="center"
    backgroundColor={colors.muted}
    justifyContent="center"
  >
    <Settings />
  </Fullscreen>
)

export default SettingsIndex
