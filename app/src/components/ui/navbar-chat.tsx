import { Container } from '@react-three/uikit'
import { Button, Input } from '@react-three/uikit-default'
import { SendIcon } from '@react-three/uikit-lucide'
import { generateSpeech } from '@xsai/generate-speech'
import { generateText } from '@xsai/generate-text'
import { useState, useTransition } from 'react'

import { useSetAudioBuffer } from '~/context/audio-buffer'
import { useAudioContext } from '~/context/audio-context'
import { useMessages } from '~/hooks/use-messages'
import { useLLMProvider, useTTSProvider } from '~/hooks/use-providers'

export const NavbarChat = () => {
  const setAudioBuffer = useSetAudioBuffer()
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState('')
  const [llmProvider] = useLLMProvider()
  const [ttsProvider] = useTTSProvider()
  const audioContext = useAudioContext()

  const [msg, setMsg] = useMessages()

  const handleSubmit = async () =>
    startTransition(async () => {
      const { messages, text: input } = await generateText({
        ...llmProvider,
        messages: [
          ...msg,
          { content: value, role: 'user' },
        ],
      })

      if (input != null) {
        setMsg(messages)
        const arrayBuffer = await generateSpeech({ ...ttsProvider, input })
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        setAudioBuffer(audioBuffer)
      }

      setValue('')
    })

  return (
    <Container gap={8} justifyContent="center">
      <Input
        disabled={isPending}
        marginX="auto"
        maxWidth={284}
        onValueChange={value => setValue(value)}
        placeholder="Write a message..."
        value={value}
      />
      <Button
        data-test-id="send-message"
        disabled={isPending}
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
