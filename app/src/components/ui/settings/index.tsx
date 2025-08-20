/* eslint-disable @masknet/jsx-no-logical */

import { Text } from '@react-three/uikit'
import { Button, colors } from '@react-three/uikit-default'
import { BellRingIcon, CableIcon, FileBoxIcon, MemoryStickIcon, UserPenIcon } from '@react-three/uikit-lucide'
import { useMemo, useState } from 'react'

import { SettingsLayout } from './layout'
import { SettingsCharacter } from './pages/character'
import { SettingsMemory } from './pages/memory'
import { SettingsModel } from './pages/model'
import { SettingsNotifications } from './pages/notifications'
import { SettingsProviders } from './pages/providers'

export const Settings = () => {
  const [currentPage, setCurrentPage] = useState('providers')
  const title = useMemo(() => currentPage.charAt(0).toUpperCase() + currentPage.slice(1), [currentPage])

  return (
    <SettingsLayout
      sidebar={(
        <>
          <Button
            backgroundColor={currentPage === 'providers' ? colors.card : undefined}
            data-test-id="sidebar-providers"
            gap={8}
            hover={{ backgroundColor: colors.card }}
            justifyContent="flex-start"
            onClick={() => setCurrentPage('providers')}
            variant="secondary"
          >
            <CableIcon height={16} width={16} />
            <Text>Providers</Text>
          </Button>
          <Button
            backgroundColor={currentPage === 'model' ? colors.card : undefined}
            data-test-id="sidebar-model"
            gap={8}
            hover={{ backgroundColor: colors.card }}
            justifyContent="flex-start"
            onClick={() => setCurrentPage('model')}
            variant="secondary"
          >
            <FileBoxIcon height={16} width={16} />
            <Text>Model</Text>
          </Button>
          <Button
            backgroundColor={currentPage === 'character' ? colors.card : undefined}
            data-test-id="sidebar-character"
            gap={8}
            hover={{ backgroundColor: colors.card }}
            justifyContent="flex-start"
            onClick={() => setCurrentPage('character')}
            variant="secondary"
          >
            <UserPenIcon height={16} width={16} />
            <Text>Character</Text>
          </Button>
          <Button
            backgroundColor={currentPage === 'memory' ? colors.card : undefined}
            data-test-id="sidebar-memory"
            gap={8}
            hover={{ backgroundColor: colors.card }}
            justifyContent="flex-start"
            onClick={() => setCurrentPage('memory')}
            variant="secondary"
          >
            <MemoryStickIcon height={16} width={16} />
            <Text>Memory</Text>
          </Button>
          <Button
            backgroundColor={currentPage === 'notifications' ? colors.card : undefined}
            data-test-id="sidebar-notifications"
            gap={8}
            hover={{ backgroundColor: colors.card }}
            justifyContent="flex-start"
            onClick={() => setCurrentPage('notifications')}
            variant="secondary"
          >
            <BellRingIcon height={16} width={16} />
            <Text>Notifications</Text>
          </Button>
        </>
      )}
      title={title}
    >
      <SettingsProviders display={currentPage === 'providers' ? 'flex' : 'none'} />
      <SettingsModel display={currentPage === 'model' ? 'flex' : 'none'} />
      <SettingsCharacter display={currentPage === 'character' ? 'flex' : 'none'} />
      <SettingsMemory display={currentPage === 'memory' ? 'flex' : 'none'} />
      <SettingsNotifications display={currentPage === 'notifications' ? 'flex' : 'none'} />
    </SettingsLayout>
  )
}
