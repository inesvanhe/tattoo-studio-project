import { useParams } from 'react-router-dom'

import { AppShell } from '../../app/AppShell'
import { ButtonLink } from '../../shared/components/Button'
import { getPortfolioImage } from './portfolio.assets'
import { useTattooWorks } from './useTattooWorks'

const artistNameBySlug: Record<string, string> = {
  'ivy-ash': 'Ivy Ash',
  'kade-monroe': 'Kade Monroe',
  'luna-vex': 'Luna Vex',
  'maya-black': 'Maya Black',
  'nova-wren': 'Nova Wren',
  'rico-chrome': 'Rico Chrome',
}

export function PortfolioDetailPage() {
  const { slug } = useParams()
  const tattooWorksState = useTattooWorks()
  const work = tattooWorksState.works.find((item) => item.slug === slug)

  if (tattooWorksState.status === 'loading') {
    return (
      <AppShell>
        <section className="panel-frame my-12 p-6 text-[var(--color-muted)]">
          <p>Portfolio wird geladen.</p>
        </section>
      </AppShell>
    )
  }

  if (tattooWorksState.status === 'error' || !work) {
    return (
      <AppShell>
        <section className="panel-frame my-12 p-6 sm:p-10">
          <p className="eyebrow">Portfolio Detail</p>
          <h1 className="page-hero-title mt-6">
            Arbeit nicht gefunden
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
            Dieses Portfolio-Piece ist gerade nicht verfügbar.
          </p>
          <div className="mt-8">
            <ButtonLink href="/portfolio">Zur Galerie</ButtonLink>
          </div>
        </section>
      </AppShell>
    )
  }

  const artistName = artistNameBySlug[work.artistSlug] ?? work.artistSlug

  return (
    <AppShell>
      <section className="portfolio-detail-stage grid gap-8 border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <div className="portfolio-detail-media">
          <img alt="" src={getPortfolioImage(work.imageUrl)} />
        </div>
        <div className="grid content-center">
          <p className="eyebrow">Portfolio Detail</p>
          <h1 className="page-hero-title mt-6">
            {work.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-[var(--color-muted)]">{work.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {work.styles.map((style) => (
              <span className="badge" key={style}>
                {style}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href={`/booking?artist=${work.artistSlug}`}>Ähnliches anfragen</ButtonLink>
            <ButtonLink href="/portfolio" variant="secondary">
              Zur Galerie
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="grid gap-5 py-12 md:grid-cols-2">
        <div className="panel-frame p-6">
          <p className="eyebrow">Artist</p>
          <h2 className="mt-5 text-3xl font-black uppercase">{artistName}</h2>
          <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
            Dieses Piece ist dem Artist-Profil über den Slug zugeordnet.
          </p>
        </div>
        <div className="panel-frame p-6">
          <p className="eyebrow">Placement</p>
          <h2 className="mt-5 text-3xl font-black uppercase">{work.bodyPlacement}</h2>
          <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
            Diese Angaben dienen als Orientierung, nicht als Preis- oder
            Terminversprechen.
          </p>
        </div>
      </section>
    </AppShell>
  )
}
