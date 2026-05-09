import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from '@clerk/clerk-react'
import type { ReactNode } from 'react'

import { isClerkConfigured } from '../../app/clerk'

type ArtistAuthGateProps = {
  children: ReactNode
}

export function ArtistAuthGate({ children }: ArtistAuthGateProps) {
  if (!isClerkConfigured) {
    return (
      <div className="admin-auth-panel">
        <p className="eyebrow">Clerk fehlt</p>
        <h2>Artist Login nicht konfiguriert</h2>
        <p>
          Setze `VITE_CLERK_PUBLISHABLE_KEY` in deiner lokalen `.env`, damit der
          Frontend-Login aktiv wird.
        </p>
      </div>
    )
  }

  return (
    <>
      <SignedOut>
        <div className="admin-auth-panel">
          <p className="eyebrow">Artist Login</p>
          <h2>Bitte anmelden</h2>
          <p>Melde dich mit Clerk an, um zugewiesene Anfragen zu sehen.</p>
          <div className="mt-6">
            <SignInButton mode="modal">
              <button className="admin-auth-button" type="button">
                Mit Clerk anmelden
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <ArtistSessionBar />
        {children}
      </SignedIn>
    </>
  )
}

function ArtistSessionBar() {
  const { userId } = useAuth()

  return (
    <div className="admin-session-bar">
      <div>
        <p className="eyebrow">Signed in</p>
        <p>{userId}</p>
      </div>
      <div className="admin-session-actions">
        <UserButton />
        <SignOutButton>
          <button className="admin-auth-button admin-auth-button-secondary" type="button">
            Abmelden
          </button>
        </SignOutButton>
      </div>
    </div>
  )
}
