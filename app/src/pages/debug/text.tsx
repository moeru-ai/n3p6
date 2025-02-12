import { Text3D } from '@react-three/drei'

import fontUrl from '../../../public/assets/fonts/Source Han Sans CN_Regular.json?url'
import { CanvasLayout } from '../../components/canvas-layout'

const DebugText = () => {
  return (
    <CanvasLayout>
      <Text3D
        font={fontUrl}
        // rotation={[0, 1, 0]}
      >
        &#x6D4B;&#x8BD5;
      </Text3D>
    </CanvasLayout>
  )
}

export default DebugText
