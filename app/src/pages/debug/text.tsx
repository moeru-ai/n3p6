import type { FontData } from '@react-three/drei'

import { Text3D } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js'

import ttfUrl from '~/assets/fonts/SourceHanSansCN-Regular.ttf?url'

const DebugText = () => {
  const font = useLoader(TTFLoader, ttfUrl)

  return (
    <Text3D
    // eslint-disable-next-line @masknet/type-no-force-cast-via-top-type
      font={font as unknown as FontData}
    // rotation={[0, 1, 0]}
    >
      &#x6D4B;&#x8BD5;
    </Text3D>
  )
}

export default DebugText
