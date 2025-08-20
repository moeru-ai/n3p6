import type { ContainerProperties } from '@react-three/uikit'

import { Container, Text } from '@react-three/uikit'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input } from '@react-three/uikit-default'
import { MemuClient } from 'memu-js'
import { useEffect, useState } from 'react'

import { useSetMemuClient } from '~/context/memu-client'
import { useMemuProvider } from '~/hooks/use-provider-memu'

export const SettingsMemory = (props: ContainerProperties) => {
  const [memuProvider, setMemuProvider] = useMemuProvider()

  const setMemuClient = useSetMemuClient()

  const [baseURL, setBaseURL] = useState(memuProvider.baseURL)
  const [apiKey, setApiKey] = useState(memuProvider.apiKey)

  const [userId, setUserId] = useState(memuProvider.userId)
  const [agentId, setAgentId] = useState(memuProvider.agentId)

  useEffect(() => setMemuClient(
    (memuProvider.baseURL && memuProvider.userId && memuProvider.agentId)
      ? new MemuClient({
        apiKey: memuProvider.apiKey,
        baseUrl: memuProvider.baseURL,
        maxRetries: 3,
        timeout: 30_000,
      })
      : undefined,
  ), [memuProvider, setMemuClient])

  return (
    <Container flexDirection="column" gap={16} overflow="scroll" padding={16} {...props}>
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
          <Input onValueChange={setUserId} placeholder="userId, e.g. user01" value={userId} />
          <Input onValueChange={setAgentId} placeholder="agentId, e.g. agent47" value={agentId} />
        </CardContent>
        <CardFooter>
          <Button
            data-test-id="memory-provider-submit"
            flexDirection="row"
            onClick={() => setMemuProvider({ agentId, apiKey, baseURL, userId })}
            width="100%"
          >
            <Text>Submit</Text>
          </Button>
        </CardFooter>
      </Card>
    </Container>
  )
}
