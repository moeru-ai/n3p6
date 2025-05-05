import { createContextState } from 'foxact/context-state'
import { EntityManager } from 'yuka'

const [EntityManagerProvider, useEntityManager, useSetEntityManager] = createContextState(new EntityManager())

export { EntityManagerProvider, useEntityManager, useSetEntityManager }
