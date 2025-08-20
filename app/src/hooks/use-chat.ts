import { toSystemMessage } from '@n3p6/ccc'
import { useXR } from '@react-three/xr'
import { generateSpeech } from '@xsai/generate-speech'
import { generateText } from '@xsai/generate-text'

import { useSetAudioBuffer } from '~/context/audio-buffer'
import { useAudioContext } from '~/context/audio-context'
import { useMemuClient } from '~/context/memu-client'
import { stringifyDefaultCategories } from '~/utils/stringify-default-categories'

import { useCharacterCard } from './use-character-card'
import { useMessages } from './use-messages'
import { useMemuProvider } from './use-provider-memu'
import { useLLMProvider, useTTSProvider } from './use-providers'
import { useUserProfile } from './use-user-profile'

export const useChat = () => {
  const mode = useXR(({ mode }) => mode)

  const memu = useMemuClient()
  const [memuProvider] = useMemuProvider()

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

    // eslint-disable-next-line @masknet/no-then
    const defaultCategories = await memu?.retrieveDefaultCategories({
      agentId: memuProvider.agentId,
      includeInactive: false,
      userId: memuProvider.userId,
      // wantSummary: true,
    })
      .then(categories => stringifyDefaultCategories(categories))

    if (import.meta.env.DEV)
      // eslint-disable-next-line no-console
      console.log('MemU Default Categories:', defaultCategories)

    const { messages, text: input } = await generateText({
      ...llmProvider,
      messages: [
        ...(character
          ? [toSystemMessage(character, { defaultCategories, mode, userDescription: user.description, userName: user.name })]
          : []),
        ...msg,
        { content, role: 'user' },
      ],
    })

    if (import.meta.env.DEV)
      // eslint-disable-next-line no-console
      console.log('useChat Response:', input)

    if (input != null) {
      await memu?.memorizeConversation(
        [
          { content, role: 'user' },
          { content: input, role: 'assistant' },
        ],
        memuProvider.userId,
        user.name,
        memuProvider.agentId,
        character?.name ?? 'Assistant',
        new Date().toISOString(),
      )

      setMsg(character ? messages.slice(1) : messages)
      const arrayBuffer = await generateSpeech({ ...ttsProvider, input })
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
      setAudioBuffer(audioBuffer)
    }
  }

  return { send }
}
