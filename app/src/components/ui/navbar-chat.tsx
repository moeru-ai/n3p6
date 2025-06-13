import { Container } from '@react-three/uikit'
import { Button, Input } from '@react-three/uikit-default'
import { SendIcon } from '@react-three/uikit-lucide'
import { useCallback, useState, useTransition } from 'react'

import { useChat } from '~/hooks/use-chat'

export const NavbarChat = () => {
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState('')
  const { send } = useChat()

  const handleSubmit = useCallback(() => startTransition(async () => {
    await send(value)
    setValue('')
  }), [send, value])

  return (
    <Container gap={8} justifyContent="center">
      <Input
        disabled={isPending}
        marginX="auto"
        maxWidth={284}
        onValueChange={value => setValue(value)}
        placeholder="Write a message..."
        value={value}
      />
      <Button
        data-test-id="send-message"
        disabled={isPending}
        onClick={handleSubmit}
        size="icon"
        variant="secondary"
      >
        <SendIcon height={16} width={16} />
      </Button>
    </Container>
  )
}
