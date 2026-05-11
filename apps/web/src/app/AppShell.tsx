import type { ReactNode } from 'react'

import { ButtonLink } from '../shared/components/Button'
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
        <footer className="site-footer">
          <div className="site-footer-brand">
            <p className="eyebrow">HONEY | BEEZ ink</p>
            <p>Custom Tattoos. Blackwork. Fine Line. Flash.</p>
          </div>
          <div className="site-footer-links">
            <nav aria-label="Footer Navigation">
              <p>Explore</p>
              <a href="/artists">Artists</a>
              <a href="/portfolio">Portfolio</a>
              <a href="/studio">Studio</a>
              <a href="/booking">Termin buchen</a>
            </nav>
            <nav aria-label="Rechtliches">
              <p>Info</p>
              <a href="/booking">Kontakt</a>
              <a href="/impressum">Impressum</a>
              <a href="/datenschutz">Datenschutz</a>
            </nav>
          </div>
          <div className="site-footer-action">
            <ButtonLink href="/booking" variant="secondary">
              Anfrage starten
            </ButtonLink>
          </div>
        </footer>
      </div>
    </main>
  )
}
