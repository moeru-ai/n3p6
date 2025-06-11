import type { ContainerProperties } from '@react-three/uikit'

import { loadFromFile } from '@n3p6/ccc'
import { Container, Text } from '@react-three/uikit'
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@react-three/uikit-default'
import { FileUpIcon, RotateCcwIcon } from '@react-three/uikit-lucide'
import { useCallback, useEffect, useMemo } from 'react'

import { useCharacterCard } from '~/hooks/use-character-card'

export const SettingsCharacter = (props: ContainerProperties) => {
  const [character, setCharacter] = useCharacterCard()

  const handleFileUpload = useCallback(async (event: Event) => {
    const { files } = event?.target as HTMLInputElement
    if (files == null)
      return

    const file: File | undefined = files[0]
    if (file == null)
      return

    try {
      const card = await loadFromFile(file)
      setCharacter(card)
    }
    catch (error) {
      console.error(error)
    }
  }, [setCharacter])

  const input = useMemo(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json,.png,.webp'
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
      <Card height="auto">
        <CardHeader>
          <CardTitle>
            <Text>Change Character</Text>
          </CardTitle>
          <CardDescription>
            {/* <Text>Generates audio from the input text.</Text> */}
          </CardDescription>
        </CardHeader>
        <CardContent flexDirection="column" gap={16}>
          <Button data-test-id="upload-character" gap={8} onClick={() => input.click()}>
            <FileUpIcon height={16} width={16} />
            <Text>Upload Character</Text>
          </Button>
          <Button data-test-id="reset-character" gap={8} onClick={() => setCharacter(undefined)} variant="destructive">
            <RotateCcwIcon height={16} width={16} />
            <Text>Reset Model</Text>
          </Button>
        </CardContent>
        <CardFooter alignItems="flex-start" display="flex" flexDirection="column" gap={8}>
          <Text>
            character name:
            {' '}
            {character?.name}
          </Text>
          <Text>
            character description:
            {' '}
            {character?.description}
          </Text>
        </CardFooter>
      </Card>
    </Container>
  )
}
