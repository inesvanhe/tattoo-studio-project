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

type AdminAuthGateProps = {
  children: ReactNode
}

export function AdminAuthGate({ children }: AdminAuthGateProps) {
  if (!isClerkConfigured) {
    return (
      <div className="admin-auth-panel">
        <p className="eyebrow">Clerk fehlt</p>
        <h2>Admin Login nicht konfiguriert</h2>
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
          <p className="eyebrow">Admin Login</p>
          <h2>Bitte anmelden</h2>
          <p>Der Admin-Bereich ist geschützt. Melde dich mit Clerk an, um Anfragen zu sehen.</p>
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
        <AdminSessionBar />
        {children}
      </SignedIn>
    </>
  )
}

function AdminSessionBar() {
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
