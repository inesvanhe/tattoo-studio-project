import { useEffect, useState } from 'react'

import { AppShell } from '../../app/AppShell'
import { ButtonLink } from '../../shared/components/Button'
import { type Artist, getArtists } from './artists.api'

type ArtistsState =
  | { status: 'loading'; artists: Artist[]; error?: undefined }
  | { status: 'success'; artists: Artist[]; error?: undefined }
  | { status: 'error'; artists: Artist[]; error: string }

export function ArtistsPage() {
  const [artistsState, setArtistsState] = useState<ArtistsState>({
    status: 'loading',
    artists: [],
  })

  useEffect(() => {
    let isMounted = true

    getArtists()
      .then((response) => {
        if (!isMounted) {
          return
        }

        setArtistsState({
          status: 'success',
          artists: response.data,
        })
      })
      .catch(() => {
        if (!isMounted) {
          return
        }

        setArtistsState({
          status: 'error',
          artists: [],
          error: 'Artists konnten gerade nicht geladen werden.',
        })
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <AppShell>
      <section className="artist-stage border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:px-12">
        <p className="eyebrow">Resident Artists</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <h1 className="text-5xl font-black uppercase leading-[0.92] sm:text-7xl">
              Meet the hands behind the lines.
            </h1>
          </div>
          <div className="panel-frame p-6">
            <p className="text-lg leading-8 text-[var(--color-muted)]">
              Blackwork, Neo-Traditional und Custom Pieces aus einem Studio,
              das lieber Haltung zeigt als Hochglanz verspricht.
            </p>
            <div className="mt-6">
              <ButtonLink href="/#booking">Termin anfragen</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        {artistsState.status === 'loading' ? <ArtistsNotice text="Artists werden geladen." /> : null}

        {artistsState.status === 'error' ? <ArtistsNotice text={artistsState.error} /> : null}

        {artistsState.status === 'success' && artistsState.artists.length === 0 ? (
          <ArtistsNotice text="Noch keine Artists sichtbar." />
        ) : null}

        {artistsState.artists.length > 0 ? (
          <div className="grid gap-5">
            {artistsState.artists.map((artist) => (
              <ArtistCard artist={artist} key={artist.id} />
            ))}
          </div>
        ) : null}
      </section>
    </AppShell>
  )
}

function ArtistCard({ artist }: { artist: Artist }) {
  const initials = artist.name
    .split(' ')
    .map((part) => part[0])
    .join('')
  const firstName = artist.name.split(' ')[0]

  return (
    <article
      aria-label={`${artist.name}, ${artist.title}`}
      className="artist-card group grid gap-6 border border-[var(--color-line)] p-5 outline-none transition duration-300 ease-out hover:border-[var(--color-honey)]/60 focus-visible:border-[var(--color-honey)]/70 sm:grid-cols-[10rem_1fr] sm:p-6"
      tabIndex={0}
    >
      <div className="artist-portrait flex aspect-square items-center justify-center border border-[var(--color-honey)]/45 bg-[rgba(255,193,5,0.08)]">
        {artist.profileImageUrl ? (
          <img alt="" className="h-full w-full object-cover" src={artist.profileImageUrl} />
        ) : (
          <span className="text-4xl font-black uppercase text-[var(--color-honey)]">{initials}</span>
        )}
      </div>

      <div className="artist-card-summary">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--color-honey)]">
              {artist.title}
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase text-[var(--color-paper)]">
              {artist.name}
            </h2>
          </div>
          <span className="badge badge-dark">{artist.slug}</span>
        </div>

        <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--color-muted)]">{artist.bio}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {artist.styles.map((style) => (
            <span className="badge" key={style}>
              {style}
            </span>
          ))}
        </div>
      </div>

      <div className="artist-card-details">
        <p className="eyebrow">Artist File / {artist.sortOrder.toString().padStart(2, '0')}</p>
        <h3 className="mt-4 text-3xl font-black uppercase leading-none text-[var(--color-paper)] sm:text-4xl">
          {artist.name}
        </h3>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">{artist.bio}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {artist.styles.map((style) => (
            <span className="badge badge-dark" key={style}>
              {style}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <ButtonLink href="/#booking" variant="secondary">
            Termin mit {firstName} anfragen
          </ButtonLink>
        </div>
      </div>
    </article>
  )
}

function ArtistsNotice({ text }: { text: string }) {
  return (
    <div className="panel-frame p-6 text-[var(--color-muted)]">
      <p>{text}</p>
    </div>
  )
}
