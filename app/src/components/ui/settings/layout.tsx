import type { PropsWithChildren, ReactNode } from 'react'

import { Container, Fullscreen, Text } from '@react-three/uikit'
import { Button, Card, colors, Separator } from '@react-three/uikit-default'
import { ChevronLeftIcon, GithubIcon, PanelLeftIcon } from '@react-three/uikit-lucide'
import { useState } from 'react'

import { ToggleColorSchemeButton } from '~/components/ui/toggle-color-scheme-button'
import { useNavigate } from '~/router'

export interface SettingsLayoutProps {
  // content: ReactNode
  sidebar: ReactNode
  title?: string
}

export const SettingsLayout = ({ children, sidebar, title }: PropsWithChildren<SettingsLayoutProps>) => {
  const [sidebarDisplay, setSidebarDisplay] = useState<'flex' | 'none'>('flex')
  const navigate = useNavigate()

  const panelMaxWidth = sidebarDisplay === 'flex' ? 768 : 1024

  return (
      <Fullscreen
        alignItems="center"
        backgroundColor={colors.muted}
        justifyContent="center"
      >
        <Container flexDirection="row" flexGrow={1} gap={12} height="100%" maxHeight={768} maxWidth={1024} padding={12} width="100%">
          <Container display={sidebarDisplay} flexDirection="column" flexGrow={1} gap={4} maxWidth={256} paddingY={8}>
            <Button
              data-test-id="return-to-home"
              gap={8}
              hover={{ backgroundColor: colors.card }}
              justifyContent="flex-start"
              // eslint-disable-next-line sonarjs/void-use
              onClick={() => void navigate('/')}
              variant="ghost"
            >
              <ChevronLeftIcon height={16} width={16} />
              <Text fontWeight={600}>N3P6 by Moeru AI</Text>
            </Button>
            <Button disabled justifyContent="flex-start" marginBottom={-8} variant="ghost">
              <Text fontSize={12} fontWeight={600}>Settings</Text>
            </Button>
            {/* <Button
              gap={8}
              hover={{ backgroundColor: colors.card }}
              justifyContent="flex-start"
              variant="secondary"
            >
              <CableIcon height={16} width={16} />
              <Text>Providers</Text>
            </Button> */}
            {sidebar}
            <Button flexGrow={1} variant="ghost"></Button>
            <Button disabled justifyContent="flex-start" marginBottom={-8} variant="ghost">
              <Text fontSize={12} fontWeight={600}>Community</Text>
            </Button>
            <Button
              data-test-id="github"
              gap={8}
              hover={{ backgroundColor: colors.card }}
              justifyContent="flex-start"
              onClick={() => window.open('https://github.com/moeru-ai/n3p6', '_blank', 'noopener')}
              variant="secondary"
            >
              <GithubIcon height={16} width={16} />
              <Text>GitHub</Text>
            </Button>
          </Container>
          <Card flexGrow={1} marginLeft="auto" maxWidth={panelMaxWidth} width="100%">
            <Container gap={8} maxHeight={60} padding={8}>
              <Button
                data-test-id="toggle-sidebar"
                onClick={() => setSidebarDisplay(display => display === 'none' ? 'flex' : 'none')}
                size="icon"
                variant="ghost"
              >
                <PanelLeftIcon height={16} width={16} />
              </Button>
              <Text fontWeight={600}>{title}</Text>
              <Container marginLeft="auto">
                <ToggleColorSchemeButton variant="ghost" />
              </Container>
            </Container>
            <Separator />
            <Container flexDirection="column" gap={8} maxHeight={708} overflow="scroll" padding={16} width="100%">
              {children}
            </Container>
          </Card>
        </Container>
      </Fullscreen>
  )
}
