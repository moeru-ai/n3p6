import type { CardProperties } from '@react-three/uikit-default'

import { Text } from '@react-three/uikit'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input } from '@react-three/uikit-default'
import { useState } from 'react'

import { useLLMProvider } from '~/hooks/use-providers'

const LLMProvider = (props: CardProperties) => {
  const [llmProvider, setLLMProvider] = useLLMProvider()

  const [baseURL, setBaseURL] = useState(llmProvider.baseURL)
  const [apiKey, setApiKey] = useState(llmProvider.apiKey)
  const [model, setModel] = useState(llmProvider.model)

  return (
    <Card {...props}>
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
        <Input onValueChange={setApiKey} placeholder="apiKey (optional), e.g. sk-******" value={apiKey} />
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

export const SettingsProviders = (props: CardProperties) => (
  <LLMProvider {...props} />
)
