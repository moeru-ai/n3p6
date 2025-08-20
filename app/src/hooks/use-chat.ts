import { toSystemMessage } from '@n3p6/ccc'
import { useXR } from '@react-three/xr'
import { generateSpeech } from '@xsai/generate-speech'
import { generateText } from '@xsai/generate-text'

import { useSetAudioBuffer } from '~/context/audio-buffer'
import { useAudioContext } from '~/context/audio-context'

import { useCharacterCard } from './use-character-card'
import { useMessages } from './use-messages'
import { useLLMProvider, useTTSProvider } from './use-providers'
import { useUserProfile } from './use-user-profile'

export const useChat = () => {
  const mode = useXR(({ mode }) => mode)

  const [user] = useUserProfile()

  const [llmProvider] = useLLMProvider()
  const [ttsProvider] = useTTSProvider()
  const [character] = useCharacterCard()
  const [msg, setMsg] = useMessages()

  const audioContext = useAudioContext()
  const setAudioBuffer = useSetAudioBuffer()

  const send = async (content: string) => {
    if (import.meta.env.DEV)
      // eslint-disable-next-line no-console
      console.log('useChat Request:', content)

    const { messages, text: input } = await generateText({
      ...llmProvider,
      messages: [
        ...(character
          ? [toSystemMessage(character, { mode, userDescription: user.description, userName: user.name })]
          : []),
        ...msg,
        { content, role: 'user' },
      ],
    })

    if (import.meta.env.DEV)
      // eslint-disable-next-line no-console
      console.log('useChat Response:', input)

    if (input != null) {
      setMsg(character ? messages.slice(1) : messages)
      const arrayBuffer = await generateSpeech({ ...ttsProvider, input })
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
      setAudioBuffer(audioBuffer)
    }
  }

  return { send }
}
