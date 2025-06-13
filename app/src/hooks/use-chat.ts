import { toSystemMessage } from '@n3p6/ccc'
import { useXR } from '@react-three/xr'
import { generateSpeech } from '@xsai/generate-speech'
import { generateText } from '@xsai/generate-text'

import { useSetAudioBuffer } from '~/context/audio-buffer'
import { useAudioContext } from '~/context/audio-context'

import { useCharacterCard } from './use-character-card'
import { useMessages } from './use-messages'
import { useLLMProvider, useTTSProvider } from './use-providers'

export const useChat = () => {
  const mode = useXR(({ mode }) => mode)

  const [llmProvider] = useLLMProvider()
  const [ttsProvider] = useTTSProvider()
  const [character] = useCharacterCard()
  const [msg, setMsg] = useMessages()

  const audioContext = useAudioContext()
  const setAudioBuffer = useSetAudioBuffer()

  const send = async (content: string) => {
    const { messages, text: input } = await generateText({
      ...llmProvider,
      messages: [
        ...(character
          ? [toSystemMessage(character, { mode, userName: 'User' })]
          : []),
        ...msg,
        { content, role: 'user' },
      ],
    })
    if (import.meta.env.DEV)
      console.warn('Response:', input)

    if (input != null) {
      setMsg(messages.slice(1))
      const arrayBuffer = await generateSpeech({ ...ttsProvider, input })
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
      setAudioBuffer(audioBuffer)
    }
  }

  return { send }
}
