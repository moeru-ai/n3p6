import type { ContainerProperties } from '@react-three/uikit'

import { Container, Text } from '@react-three/uikit'
import { Button } from '@react-three/uikit-default'
import { FileUpIcon } from '@react-three/uikit-lucide'
import { useCallback, useEffect, useMemo } from 'react'

export const SettingsModel = (props: ContainerProperties) => {
  const handleFileUpload = useCallback(async (event: Event) => {
    const { files } = event?.target as HTMLInputElement
    if (files == null)
      return

    const file: File | undefined = files[0]
    if (file == null)
      return

    const reader = new FileReader()
    const buffer: ArrayBuffer = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result as ArrayBuffer)
      reader.onerror = () => reject(reader.error)
      reader.readAsArrayBuffer(file)
    })

    console.warn(buffer)
  }, [])

  const input = useMemo(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.vrm'
    input.style.display = 'none'
    // eslint-disable-next-line ts/no-misused-promises
    input.addEventListener('change', handleFileUpload)
    return input
  }, [handleFileUpload])

  useEffect(() => {
    document.body.appendChild(input)

    return () => {
      document.body.removeChild(input)
    }
  }, [input])

  return (
    <Container flexDirection="column" gap={16} overflow="scroll" padding={16} {...props}>
      <Button data-test-id="upload-model" onClick={() => input.click()}>
        <FileUpIcon height={16} width={16} />
        <Text>Upload Model</Text>
      </Button>
    </Container>
  )
}
