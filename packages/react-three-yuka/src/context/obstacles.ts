import type { GameEntity } from 'yuka'

import { createContextState } from 'foxact/context-state'
import { useCallback } from 'react'

const [ObstaclesProvider, useObstacles, useSetObstaclesImpl] = createContextState<GameEntity[]>([])

const useSetObstacles = () => {
  const setObstacles = useSetObstaclesImpl()

  const addObstacle = useCallback((obstacle: GameEntity) => setObstacles(prevObstacles => [...prevObstacles, obstacle]), [setObstacles])
  const removeObstacle = useCallback((obstacle: GameEntity) => setObstacles(prevObstacles => prevObstacles.filter(ob => ob !== obstacle)), [setObstacles])

  return { addObstacle, removeObstacle }
}

export { ObstaclesProvider, useObstacles, useSetObstacles }
