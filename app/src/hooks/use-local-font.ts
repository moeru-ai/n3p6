import { useLoader } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { TTFLoader } from 'three/examples/jsm/Addons.js'
import type { FontData as ThreeFontData } from '@react-three/drei'

/** @see {@link https://developer.mozilla.org/en-US/docs/Web/API/FontData} */
interface FontData {
  blob: () => Promise<Blob>
  readonly family: string
  readonly fullName: string
  readonly postscriptName: string
  readonly style: string
}

interface QueryLocalFontsOptions {
  postscriptNames?: string[]
}

declare global {
  interface Window {
    queryLocalFonts?: (options: QueryLocalFontsOptions) => Promise<FontData[]>
  }
}

/** WIP, broken */
export const useLocalFont = (options: QueryLocalFontsOptions) => {
  if (!('queryLocalFonts' in window))
    return

  const [blob, setBlob] = useState<Blob>()
  const [fontData, setFontData] = useState<ThreeFontData>()

  useEffect(() => {
    const getDataUrl = async () => {
      const fonts = await window.queryLocalFonts!(options)
      const blob = await fonts[0].blob()

      setBlob(blob)
    }

    void getDataUrl()
  }, [options])

  useEffect(() => {
    let url: string

    if (blob) {
      url = URL.createObjectURL(blob)

      try {
        const fontData = useLoader(TTFLoader, url)
        setFontData(fontData as unknown as ThreeFontData)
      } catch (err) {
        console.error(err)
      }
    }

    () => {
      if (url)
        URL.revokeObjectURL(url)
    }
  }, [blob])

  return fontData
}
