import type { ContainerProperties } from '@react-three/uikit'

import { Container, Text } from '@react-three/uikit'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input } from '@react-three/uikit-default'
import { useState } from 'react'

import { useLLMProvider, useTTSProvider } from '~/hooks/use-providers'

const LLMProvider = () => {
  const [llmProvider, setLLMProvider] = useLLMProvider()

  const [baseURL, setBaseURL] = useState(llmProvider.baseURL)
  const [apiKey, setApiKey] = useState(llmProvider.apiKey)
  const [model, setModel] = useState(llmProvider.model)

  return (
    <Card height="auto">
      <CardHeader>
        <CardTitle>
          <Text>LLM</Text>
        </CardTitle>
        <CardDescription>
          <Text>Creates a model response for the given chat conversation.</Text>
        </CardDescription>
      </CardHeader>
      <CardContent flexDirection="column" gap={16}>
        <Input onValueChange={setBaseURL} placeholder="baseURL, e.g. https://api.openai.com/v1/" value={baseURL} />
        <Input onValueChange={setApiKey} placeholder="apiKey (optional), e.g. sk-******" type="password" value={apiKey} />
        <Input onValueChange={setModel} placeholder="model, e.g. gpt-4o" value={model} />
      </CardContent>
      <CardFooter>
        <Button
          data-test-id="llm-provider-submit"
          flexDirection="row"
          onClick={() => setLLMProvider({ apiKey, baseURL, model })}
          width="100%"
        >
          <Text>Submit</Text>
        </Button>
      </CardFooter>
    </Card>
  )
}

const TTSProvider = () => {
  const [ttsProvider, setTTSProvider] = useTTSProvider()

  const [baseURL, setBaseURL] = useState(ttsProvider.baseURL)
  const [apiKey, setApiKey] = useState(ttsProvider.apiKey)
  const [model, setModel] = useState(ttsProvider.model)
  const [voice, setVoice] = useState(ttsProvider.voice)

  return (
    <Card height="auto">
      <CardHeader>
        <CardTitle>
          <Text>TTS</Text>
        </CardTitle>
        <CardDescription>
          <Text>Generates audio from the input text.</Text>
        </CardDescription>
      </CardHeader>
      <CardContent flexDirection="column" gap={16}>
        <Input onValueChange={setBaseURL} placeholder="baseURL, e.g. https://api.openai.com/v1/" value={baseURL} />
        <Input onValueChange={setApiKey} placeholder="apiKey (optional), e.g. sk-******" type="password" value={apiKey} />
        <Input onValueChange={setModel} placeholder="model, e.g. gpt-4o-mini-tts" value={model} />
        <Input onValueChange={setVoice} placeholder="voice, e.g. coral" value={voice} />
      </CardContent>
      <CardFooter>
        <Button
          data-test-id="llm-provider-submit"
          flexDirection="row"
          onClick={() => setTTSProvider({ apiKey, baseURL, model, voice })}
          width="100%"
        >
          <Text>Submit</Text>
        </Button>
      </CardFooter>
    </Card>
  )
}

export const SettingsProviders = (props: ContainerProperties) => (
  <Container flexDirection="column" gap={16} overflow="scroll" padding={16} {...props}>
    <LLMProvider />
    <TTSProvider />
  </Container>
)
