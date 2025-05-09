import type { Mesh } from 'three'

import { createContextState } from 'foxact/context-state'
import { useCallback } from 'react'

const [MeshProvider, useMesh, useSetMesh] = createContextState<Mesh[]>([])

const useEditMesh = () => {
  const setMesh = useSetMesh()

  const addMesh = useCallback((mesh: Mesh) => setMesh(prevMeshes => [...prevMeshes, mesh]), [setMesh])
  const removeMesh = useCallback((mesh: Mesh) => setMesh(prevMeshes => prevMeshes.filter(m => m !== mesh)), [setMesh])

  return { addMesh, removeMesh }
}

export { MeshProvider, useEditMesh, useMesh, useSetMesh }
