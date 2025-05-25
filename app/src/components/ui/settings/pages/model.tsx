import type { ContainerProperties } from '@react-three/uikit'

import { Container, Text } from '@react-three/uikit'
import { Button } from '@react-three/uikit-default'
import { FileUpIcon, RotateCcwIcon } from '@react-three/uikit-lucide'
import { useCallback, useEffect, useMemo } from 'react'

import { useModelStore } from '~/hooks/use-model-store'

export const SettingsModel = (props: ContainerProperties) => {
  const { resetModel, setModel } = useModelStore(({ resetModel, setModel }) => ({
    resetModel,
    setModel,
  }))

  const handleFileUpload = useCallback(async (event: Event) => {
    const { files } = event?.target as HTMLInputElement
    if (files == null)
      return

    const file: File | undefined = files[0]
    if (file == null)
      return

    const reader = new FileReader()
    const url: string = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(reader.error)
      reader.readAsDataURL(file)
    })

    setModel(url)
  }, [setModel])

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
      <Button data-test-id="upload-model" gap={8} onClick={() => input.click()}>
        <FileUpIcon height={16} width={16} />
        <Text>Upload Model</Text>
      </Button>
      <Button data-test-id="reset-model" gap={8} onClick={resetModel} variant="destructive">
        <RotateCcwIcon height={16} width={16} />
        <Text>Reset Model</Text>
      </Button>
    </Container>
  )
}
