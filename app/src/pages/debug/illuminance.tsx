import { useIlluminance } from '@n3p6/use-illuminance'
import { Text } from '@react-three/drei'

import { Stage } from '../../components/stage'

const Illuminance = () => {
  const illuminance = useIlluminance()

  return (
    <Stage>
      <Text>
        illuminance is
        {' '}
        {illuminance ?? 'failed'}
      </Text>
    </Stage>
  )
}

export default Illuminance
