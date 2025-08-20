import type { ContainerProperties } from '@react-three/uikit'

import { Container, Text } from '@react-three/uikit'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input } from '@react-three/uikit-default'
import { MemuClient } from 'memu-js'
import { useEffect, useState } from 'react'

import { useSetMemuClient } from '~/context/memu-client'
import { useMemuProvider } from '~/hooks/use-provider-memu'

const MemuProvider = () => {
  const [memuProvider, setMemuProvider] = useMemuProvider()

  const setMemuClient = useSetMemuClient()

  const [baseURL, setBaseURL] = useState(memuProvider.baseURL)
  const [apiKey, setApiKey] = useState(memuProvider.apiKey)

  useEffect(() => setMemuClient(
    memuProvider.baseURL
      ? new MemuClient({
        apiKey: memuProvider.apiKey,
        baseUrl: memuProvider.baseURL,
        maxRetries: 3,
        timeout: 30_000,
      })
      : undefined,
  ), [memuProvider, setMemuClient])

  return (
    <Card height="auto">
      <CardHeader>
        <CardTitle>
          <Text>Memory (MemU)</Text>
        </CardTitle>
        <CardDescription>
          <Text>Your AI Memories.</Text>
        </CardDescription>
      </CardHeader>
      <CardContent flexDirection="column" gap={16}>
        <Input onValueChange={setBaseURL} placeholder="baseURL, e.g. https://api.memu.so" value={baseURL} />
        <Input onValueChange={setApiKey} placeholder="apiKey (optional)" type="password" value={apiKey} />
      </CardContent>
      <CardFooter>
        <Button
          data-test-id="llm-provider-submit"
          flexDirection="row"
          onClick={() => setMemuProvider({ apiKey, baseURL })}
          width="100%"
        >
          <Text>Submit</Text>
        </Button>
      </CardFooter>
    </Card>
  )
}

export const SettingsMemory = (props: ContainerProperties) => (
  <Container flexDirection="column" gap={16} overflow="scroll" padding={16} {...props}>
    <MemuProvider />
  </Container>
)
