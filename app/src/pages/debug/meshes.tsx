import { InitRecastNavigation } from '@n3p6/react-three-yuka/recast-navigation'

import { Galatea } from '~/components/vrm/galatea'

const DebugMeshes = () => {
  return (
    <InitRecastNavigation>
      <Galatea />
    </InitRecastNavigation>
  )
}

export default DebugMeshes
