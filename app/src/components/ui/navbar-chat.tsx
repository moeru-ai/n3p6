import { Container } from '@react-three/uikit'
import { Button, Input } from '@react-three/uikit-default'
import { SendIcon } from '@react-three/uikit-lucide'
import { generateText } from '@xsai/generate-text'
import { useState } from 'react'

import { useMessages } from '~/hooks/use-messages'
import { useLLMProvider } from '~/hooks/use-providers'

export const NavbarChat = () => {
  const [value, setValue] = useState('')
  const [llmProvider] = useLLMProvider()

  const [disabled, setDisabled] = useState(false)

  const [msg, setMsg] = useMessages()

  const handleSubmit = async () => {
    setDisabled(true)

    const { messages, text } = await generateText({
      ...llmProvider,
      messages: [
        ...msg,
        { content: value, role: 'user' },
      ],
    })

    console.warn('Response:', text)
    speechSynthesis.speak(new SpeechSynthesisUtterance(text))

    setMsg(messages)
    setValue('')
    setDisabled(false)
  }

  return (
    <Container gap={8} justifyContent="center">
      <Input
        disabled={disabled}
        marginX="auto"
        maxWidth={284}
        onValueChange={value => setValue(value)}
        placeholder="Write a message..."
        value={value}
      />
      <Button
        data-test-id="send-message"
        disabled={disabled}
        // eslint-disable-next-line ts/no-misused-promises
        onClick={handleSubmit}
        size="icon"
        variant="secondary"
      >
        <SendIcon height={16} width={16} />
      </Button>
    </Container>
  )
}
