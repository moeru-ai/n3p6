import { useIlluminance } from '@n3p6/use-illuminance'
import { Text } from '@react-three/drei'

const Illuminance = () => {
  const illuminance = useIlluminance()

  return (
    <Text>
      illuminance is
      {' '}
      {illuminance ?? 'failed'}
    </Text>
  )
}

export default Illuminance
