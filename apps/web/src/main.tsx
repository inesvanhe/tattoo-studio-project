import { ClerkProvider } from '@clerk/clerk-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { clerkPublishableKey, isClerkConfigured } from './app/clerk'
import './index.css'

const app = isClerkConfigured ? (
  <ClerkProvider publishableKey={clerkPublishableKey!}>
    <App />
  </ClerkProvider>
) : (
  <App />
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {app}
  </StrictMode>,
)
