import type { ComponentProps } from 'react'

import { Clone } from '@react-three/drei'

import type { UseVRMExtendLoader } from '../hooks/use-vrm'

import { useVRM } from '../hooks/use-vrm'

export interface VrmProps extends Omit<ComponentProps<typeof Clone>, 'object'> {
  extendLoader?: UseVRMExtendLoader
  src: string
}

export const Vrm = ({ extendLoader, ref, src, ...props }: VrmProps) => {
  const { scene } = useVRM(src, extendLoader)

  return <Clone ref={ref} {...props} object={scene} />
}
