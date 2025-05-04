import { Root } from '@react-three/uikit'
import { Defaults, Input } from '@react-three/uikit-default'

import { Stage } from '~/components/stage'

const DebugInput = () => {
  return (
    <Stage>
      <group position={[0, 1, 0]}>
        <Root>
          <Defaults>
            <Input placeholder="Write a message..." width={200} />
          </Defaults>
        </Root>
      </group>
    </Stage>
  )
}

export default DebugInput
