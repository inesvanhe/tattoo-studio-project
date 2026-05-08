import { Link } from 'react-router-dom'

import { AppShell } from '../../app/AppShell'
import { ButtonLink } from '../../shared/components/Button'
import { portfolioWorks } from './portfolio.data'

export function PortfolioPage() {
  return (
    <AppShell>
      <section className="poster-hero border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:px-12">
        <p className="eyebrow">Portfolio</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h1 className="text-5xl font-black uppercase leading-[0.92] sm:text-7xl">
            Tattoo gallery
          </h1>
          <div className="panel-frame p-6">
            <p className="text-lg leading-8 text-[var(--color-muted)]">
              Ein erster klickbarer Galerie-Stand mit kuratierten Mock-Arbeiten.
              Filter und echte Daten folgen in den naechsten Iterationen.
            </p>
            <div className="mt-6">
              <ButtonLink href="/booking">Termin anfragen</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 py-12 md:grid-cols-2 xl:grid-cols-3">
        {portfolioWorks.map((work) => (
          <Link className="portfolio-card" key={work.slug} to={`/portfolio/${work.slug}`}>
            <div className="portfolio-card-media">
              <span>{work.title.slice(0, 2)}</span>
            </div>
            <div className="p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--color-honey)]">
                {work.styles.join(' / ')}
              </p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none">{work.title}</h2>
              <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
                {work.bodyPlacement} / {work.artistName}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </AppShell>
  )
}
