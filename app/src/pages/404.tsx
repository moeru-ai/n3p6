import { Container, Root, Text } from '@react-three/uikit'
import { Defaults, Separator } from '@react-three/uikit-default'

import { Stage } from '~/components/stage'

const Index = () => (
  <Stage>
    <Defaults>
      <Root>
        <Container gap={8} paddingBottom={128}>
          <Text textAlign="center">404</Text>
          <Separator orientation="vertical" />
          <Text fontSize={12} textAlign="center">This page could not be found.</Text>
        </Container>
      </Root>
    </Defaults>
  </Stage>
)

export default Index
