import { Container, Root, Text } from '@react-three/uikit'
import { Separator } from '@react-three/uikit-default'

import { Stage } from '~/components/stage'

const Index = () => (
  <Stage>
    <Root>
      <Container gap={8} paddingBottom={64}>
        <Text textAlign="center">404</Text>
        <Separator orientation="vertical" />
        <Text fontSize={12} textAlign="center">This page could not be found.</Text>
      </Container>
    </Root>
  </Stage>
)

export default Index
