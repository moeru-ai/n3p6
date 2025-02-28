import type { FontData } from '@react-three/drei'

import { Text3D } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js'

import ttfUrl from '../../../assets/fonts/SourceHanSansCN-Regular.ttf?url'
import { Stage } from '../../components/stage'
// import { useLocalFont } from '../../hooks/use-local-font'

const DebugText = () => {
  const font = useLoader(TTFLoader, ttfUrl)
  // const font = useLocalFont({ postscriptNames: ['NotoSansCJKSC_400wght'] })

  return (
    <Stage>
      <RigidBody>
        <Text3D
        // eslint-disable-next-line @masknet/type-no-force-cast-via-top-type
          font={font as unknown as FontData}
        // rotation={[0, 1, 0]}
        >
          &#x6D4B;&#x8BD5;
        </Text3D>
      </RigidBody>
    </Stage>
  )
}

export default DebugText
