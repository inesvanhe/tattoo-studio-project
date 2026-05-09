import { AppShell } from '../../app/AppShell'
import { ButtonLink } from '../../shared/components/Button'

const entryPoints = [
  {
    description: 'Resident Artists, Stilrichtungen und spaeter einzelne Profile.',
    href: '/artists',
    label: 'Artists',
  },
  {
    description: 'Kuratierte Arbeiten als Grundlage fuer Galerie und Detailseiten.',
    href: '/portfolio',
    label: 'Portfolio',
  },
  {
    description: 'Strukturierter Anfrageflow fuer Motiv, Platzierung und Kontakt.',
    href: '/booking',
    label: 'Termin anfragen',
  },
]

export function HomePage() {
  return (
    <AppShell>
      <section className="panel-frame my-12 p-6 sm:p-10">
        <p className="eyebrow">HONEY | BEEZ ink</p>
        <h1 className="mt-6 max-w-4xl text-4xl font-black uppercase leading-none sm:text-6xl">
          Tattoo studio platform
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
          Ein reduzierter Startpunkt fuer die weitere UI-Planung: Artists,
          Portfolio, Terminanfrage und Admin-Bereich sind klickbar vorbereitet.
          Das visuelle Feintuning kann spaeter in Figma entstehen.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/booking">Termin anfragen</ButtonLink>
          <ButtonLink href="/portfolio" variant="secondary">
            Portfolio ansehen
          </ButtonLink>
        </div>
      </section>

      <section className="grid gap-5 pb-12 md:grid-cols-3">
        {entryPoints.map((entryPoint) => (
          <a className="home-entry-card" href={entryPoint.href} key={entryPoint.href}>
            <p className="eyebrow">{entryPoint.label}</p>
            <h2 className="mt-5 text-2xl font-black uppercase leading-none">{entryPoint.label}</h2>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
              {entryPoint.description}
            </p>
          </a>
        ))}
      </section>

      <section className="panel-frame mb-12 p-6">
        <p className="eyebrow">Admin</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-5">
          <p className="max-w-2xl text-base leading-7 text-[var(--color-muted)]">
            Der Admin-Bereich ist als geschuetztes Skeleton vorbereitet. Sobald
            Clerk lokal konfiguriert ist, koennen die Anfragen dort getestet werden.
          </p>
          <ButtonLink href="/admin" variant="secondary">
            Zum Admin
          </ButtonLink>
        </div>
      </section>
    </AppShell>
  )
}
