import type { ReactNode } from 'react'

import { SiteHeader } from '../shared/components/SiteHeader'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <SiteHeader />
        {children}
      </div>
    </main>
  )
}
