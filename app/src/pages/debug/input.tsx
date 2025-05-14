import { Container, Root, Text } from '@react-three/uikit'
import { Button, Input } from '@react-three/uikit-default'
import { useState } from 'react'

const DebugInput = () => {
  const [value, setValue] = useState<string>('')

  const handleSubmit = () => {
    speechSynthesis.speak(new SpeechSynthesisUtterance(value))
    setValue('')
  }

  return (
    <group position={[0, 1, 0]}>
      <Root>
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
            onClick={handleSubmit}
            variant="secondary"
          >
            <Text>Submit</Text>
          </Button>
        </Container>
      </Root>
    </group>
  )
}

export default DebugInput
