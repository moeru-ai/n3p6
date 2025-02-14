import { Routes } from '@generouted/react-router/lazy'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './main.css'

// eslint-disable-next-line @masknet/no-top-level
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routes />
  </StrictMode>,
)
