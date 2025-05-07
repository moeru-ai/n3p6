import { EntityManagerProvider } from '@n3p6/react-three-yuka'

import { Stage } from '~/components/stage'
import { HikariYuka } from '~/components/vrm/hikari-yuka'

const Index = () => (
  <EntityManagerProvider>
    <Stage>
      <HikariYuka />
    </Stage>
  </EntityManagerProvider>
)

export default Index
