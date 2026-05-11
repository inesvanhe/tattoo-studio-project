import { Link } from 'react-router-dom'

import { AppShell } from '../../app/AppShell'
import { ButtonLink } from '../../shared/components/Button'
import { getPortfolioImage } from './portfolio.assets'
import type { TattooWork } from './tattoos.api'
import { useTattooWorks } from './useTattooWorks'

const artistNameBySlug: Record<string, string> = {
  'ivy-ash': 'Ivy Ash',
  'kade-monroe': 'Kade Monroe',
  'luna-vex': 'Luna Vex',
  'maya-black': 'Maya Black',
  'nova-wren': 'Nova Wren',
  'rico-chrome': 'Rico Chrome',
}

export function PortfolioPage() {
  const tattooWorksState = useTattooWorks()

  return (
    <AppShell>
      <section className="portfolio-stage border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:px-12">
        <p className="eyebrow">Portfolio</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h1 className="text-5xl font-black uppercase leading-[0.92] sm:text-7xl">
            Tattoo gallery.
          </h1>
          <div className="panel-frame portfolio-intro-panel p-6">
            <p className="text-lg leading-8 text-[var(--color-muted)]">
              Kuratierte Arbeiten, Flash Pieces und Custom Motive aus dem Studio.
              Hover über ein Piece für Details.
            </p>
            <div className="mt-6">
              <ButtonLink href="/booking">Termin anfragen</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        {tattooWorksState.status === 'loading' ? <PortfolioNotice text="Portfolio wird geladen." /> : null}

        {tattooWorksState.status === 'error' ? <PortfolioNotice text={tattooWorksState.error} /> : null}

        {tattooWorksState.status === 'success' && tattooWorksState.works.length === 0 ? (
          <PortfolioNotice text="Noch keine Portfolio-Arbeiten sichtbar." />
        ) : null}

        {tattooWorksState.works.length > 0 ? (
          <div className="portfolio-grid">
            {tattooWorksState.works.map((work) => (
              <PortfolioCard key={work.id} work={work} />
            ))}
          </div>
        ) : null}
      </section>
    </AppShell>
  )
}

function PortfolioCard({ work }: { work: TattooWork }) {
  const artistName = artistNameBySlug[work.artistSlug] ?? work.artistSlug

  return (
    <Link className="portfolio-card" to={`/portfolio/${work.slug}`}>
      <img alt="" src={getPortfolioImage(work.imageUrl)} />

      <div className="portfolio-card-summary">
        <p>{work.styles.slice(0, 2).join(' / ')}</p>
        <h2>{work.title}</h2>
      </div>

      <div className="portfolio-card-details">
        <p className="portfolio-card-file">
          {artistName} / {work.bodyPlacement}
        </p>
        <h3>{work.title}</h3>
        <p>{work.description}</p>
        <div className="artist-card-tags">
          {work.styles.map((style) => (
            <span className="badge badge-dark" key={style}>
              {style}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

function PortfolioNotice({ text }: { text: string }) {
  return (
    <div className="panel-frame p-6 text-[var(--color-muted)]">
      <p>{text}</p>
    </div>
  )
}
