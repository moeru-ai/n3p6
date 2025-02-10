import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'

// eslint-disable-next-line @masknet/no-top-level
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
