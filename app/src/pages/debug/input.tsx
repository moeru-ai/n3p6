import { Container, Root, Text } from '@react-three/uikit'
import { Button, Defaults, Input } from '@react-three/uikit-default'
import { useState } from 'react'

import { Stage } from '~/components/stage'

const DebugInput = () => {
  const [value, setValue] = useState<string>()

  return (
    <Stage>
      <group position={[0, 1, 0]}>
        <Root>
          <Defaults>
            <Container flexDirection="column" gap={4}>
              <Text>{value}</Text>
              <Input
                data-test-id="debug-input"
                onValueChange={value => setValue(value)}
                placeholder="Write a message..."
                value={value}
                width={200}
              />
              <Button
                data-test-id="debug-button"
                onClick={() => setValue(undefined)}
                variant="secondary"
              >
                <Text>Submit</Text>
              </Button>
            </Container>
          </Defaults>
        </Root>
      </group>
    </Stage>
  )
}

export default DebugInput
