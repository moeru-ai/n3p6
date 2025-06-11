import type { CharRawData } from '@lenml/char-card-reader'

import { CharacterCard } from '@lenml/char-card-reader'

export const loadFromFile = async (file: File) => {
  const extname = file.name.split('.').pop()

  // TODO: .charx support
  switch (extname) {
    case 'json':
      return CharacterCard.from_json(JSON.parse(await file.text()) as CharRawData)
    case 'png':
    case 'webp':
      return CharacterCard.from_file(await file.arrayBuffer())
    case undefined:
    default:
      // eslint-disable-next-line @masknet/no-default-error
      throw new Error(`Unsupported format: ${extname}`)
  }
}
