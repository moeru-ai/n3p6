import { useMicVAD } from '@ricky0123/vad-react'

export const GalateaVAD = () => {
  useMicVAD({
    model: 'v5',
    onSpeechEnd: () => console.warn('User started talking'),
  })

  return null
}
