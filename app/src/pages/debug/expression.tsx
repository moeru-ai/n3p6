import { useEffect, useRef, useState } from 'react'

import { useAnimations } from '~/hooks/use-animations'
import { useGalatea } from '~/hooks/use-galatea'

const expressions = [
  'angry',
  'happy',
  'neutral',
  'relaxed',
  'sad',
] as const

const DebugExpression = () => {
  const { galateaRef: ref, galateaVRM: vrm } = useGalatea()
  const { actions } = useAnimations(vrm)

  const [expression, setExpression] = useState<typeof expressions[number]>('neutral')
  const prevExpression = useRef(expression)

  useEffect(() => {
    actions.idle?.reset().fadeIn(0.5).play()
  }, [actions])

  useEffect(() => {
    // eslint-disable-next-line @masknet/no-timer
    const interval = setInterval(() => {
      const index = expressions.indexOf(expression)
      if (index === expressions.length - 1)
        setExpression(expressions[0])
      else
        setExpression(expressions[index + 1])
    }, 5000)

    // eslint-disable-next-line @masknet/no-timer
    return () => clearInterval(interval)
  }, [expression])

  useEffect(() => {
    if (prevExpression.current !== expression) {
      vrm.expressionManager?.setValue(prevExpression.current, 0)
      prevExpression.current = expression
    }

    vrm.expressionManager?.setValue(expression, 1)

    // eslint-disable-next-line no-console
    console.log('Playing:', expression)
  }, [vrm, expression, prevExpression])

  return (
    <group ref={ref}>
      <primitive
        object={vrm.scene}
        position={[0, 0, 0]}
        rotation={[0, Math.PI, 0]}
        scale={1.05}
      />
    </group>
  )
}

export default DebugExpression
