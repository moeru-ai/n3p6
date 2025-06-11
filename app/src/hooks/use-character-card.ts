import type { CharRawData } from '@n3p6/ccc'

import { CharacterCard } from '@n3p6/ccc'
import { useLocalStorage } from 'foxact/use-local-storage'

// TODO: default card
export const useCharacterCard = () => useLocalStorage<CharacterCard | undefined>('n3p6/character', undefined, {
  deserializer: str => str.length > 0 ? CharacterCard.from_json(JSON.parse(str) as CharRawData) : undefined,
  serializer: card => card != null ? JSON.stringify(card?.toSpecV3()) : '',
})
