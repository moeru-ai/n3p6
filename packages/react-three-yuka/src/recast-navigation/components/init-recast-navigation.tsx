import type { PropsWithChildren, ReactNode } from 'react'

import { init } from '@recast-navigation/core'
import { useEffect, useState } from 'react'

// eslint-disable-next-line sonarjs/function-return-type
export const InitRecastNavigation = ({ children }: PropsWithChildren): null | ReactNode => {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const run = async () => {
      await init()
      setInitialized(true)
    }

    void run()
  }, [])

  return initialized ? children : null
}
