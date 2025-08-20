import type { ContainerProperties } from '@react-three/uikit'

import { Container, Text } from '@react-three/uikit'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Textarea } from '@react-three/uikit-default'
import { useState } from 'react'

import { useUserProfile } from '~/hooks/use-user-profile'

export const SettingsProfile = (props: ContainerProperties) => {
  const [user, setUser] = useUserProfile()
  const [userName, setUserName] = useState(user.name)
  const [userDescription, setUserDescription] = useState(user.description)

  return (
    <Container flexDirection="column" gap={16} overflow="scroll" padding={16} {...props}>
      <Card height="auto">
        <CardHeader>
          <CardTitle>
            <Text>User Profile</Text>
          </CardTitle>
          <CardDescription>
            <Text>Introduce yourself to AI.</Text>
          </CardDescription>
        </CardHeader>
        <CardContent flexDirection="column" gap={16}>
          <Input onValueChange={setUserName} placeholder="Name" value={userName} />
          <Textarea onValueChange={setUserDescription} placeholder="Description" value={userDescription} />
        </CardContent>
        <CardFooter>
          <Button
            data-test-id="llm-provider-submit"
            flexDirection="row"
            onClick={() => setUser({ description: userDescription, name: userName })}
            width="100%"
          >
            <Text>Submit</Text>
          </Button>
        </CardFooter>
      </Card>
    </Container>
  )
}
