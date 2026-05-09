import { useParams } from 'react-router-dom'

import { AppShell } from '../../app/AppShell'
import { ButtonLink } from '../../shared/components/Button'
import { useArtists } from './useArtists'

export function ArtistDetailPage() {
  const { slug = 'artist' } = useParams()
  const artistsState = useArtists()
  const artist = artistsState.artists.find((item) => item.slug === slug)

  if (artistsState.status === 'loading') {
    return (
      <AppShell>
        <section className="panel-frame my-12 p-6 text-[var(--color-muted)]">
          Artist wird geladen.
        </section>
      </AppShell>
    )
  }

  if (!artist) {
    return (
      <AppShell>
        <section className="panel-frame my-12 p-6 sm:p-10">
          <p className="eyebrow">Artist Detail</p>
          <h1 className="mt-6 text-4xl font-black uppercase leading-none sm:text-6xl">
            Artist nicht gefunden
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
            Dieses Profil ist gerade nicht verfügbar. Zurück zur Übersicht
            und weiter durch die Resident Artists.
          </p>
          <div className="mt-8">
            <ButtonLink href="/artists">Zur Artist-Übersicht</ButtonLink>
          </div>
        </section>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <section className="artist-stage border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:px-12">
        <p className="eyebrow">Artist Profile</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <h1 className="text-5xl font-black uppercase leading-[0.92] sm:text-7xl">
              {artist.name}
            </h1>
            <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-[var(--color-honey)]">
              {artist.title}
            </p>
          </div>
          <div className="panel-frame p-6">
            <p className="text-lg leading-8 text-[var(--color-muted)]">{artist.bio}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {artist.styles.map((style) => (
                <span className="badge" key={style}>
                  {style}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 py-12 lg:grid-cols-[1fr_0.8fr]">
        <div className="panel-frame p-6">
          <p className="eyebrow">Signature</p>
          <h2 className="mt-5 text-3xl font-black uppercase leading-none sm:text-5xl">
            Motive mit Haltung.
          </h2>
          <p className="mt-5 text-base leading-7 text-[var(--color-muted)]">
            Später verknüpfen wir hier passende Portfolio-Arbeiten. Für den
            ersten klickbaren Stand führt dich der CTA direkt in die Anfrage
            mit Artist-Wunsch.
          </p>
        </div>
        <div className="dashboard-panel">
          <p className="eyebrow">Next Step</p>
          <h2 className="mt-5 text-3xl font-black uppercase leading-none">Request</h2>
          <p className="mt-5 text-base leading-7 text-[var(--color-muted)]">
            Stelle eine unverbindliche Anfrage. Das Studio prüft sie später
            manuell und bestätigt keinen Termin automatisch.
          </p>
          <div className="mt-6">
            <ButtonLink href={`/booking?artist=${artist.slug}`}>Termin mit Artist anfragen</ButtonLink>
          </div>
        </div>
      </section>
    </AppShell>
  )
}
