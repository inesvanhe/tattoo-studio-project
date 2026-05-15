import { Link } from 'react-router-dom'

import { AppShell } from '../../app/AppShell'
import fallbackOneImage from '../../assets/artists/fallback-one.png'
import fallbackTwoImage from '../../assets/artists/fallback-two.png'
import ivyAshImage from '../../assets/artists/ivy-ash.png'
import kadeMonroeImage from '../../assets/artists/kade-monroe.png'
import lunaVexImage from '../../assets/artists/luna-vex.png'
import mayaBlackImage from '../../assets/artists/maya-black.png'
import novaWrenImage from '../../assets/artists/nova-wren.png'
import ricoChromeImage from '../../assets/artists/rico-chrome.png'
import tattooMachineImage from '../../assets/studio/tattoo-machine.jpg'
import type { Artist } from './artists.api'
import { useArtists } from './useArtists'

type ArtistCardContent = {
  detail: string
  image: string
  note: string
}

const artistContentBySlug: Record<string, ArtistCardContent> = {
  'ivy-ash': {
    detail: 'Ornamentale Florals, feine Linien und ruhige Kompositionen.',
    image: ivyAshImage,
    note: 'Botanical / Ornamental',
  },
  'kade-monroe': {
    detail: 'Bold Details, dunkle Flächen und starke Kontraste.',
    image: kadeMonroeImage,
    note: 'Darkwork / Lettering',
  },
  'luna-vex': {
    detail: 'Leichte Linien, botanische Motive und weiche Platzierungen.',
    image: lunaVexImage,
    note: 'Fine Line / Florals',
  },
  'maya-black': {
    detail: 'Blackwork mit klarer Haltung, grafischen Formen und Tiefe.',
    image: mayaBlackImage,
    note: 'Blackwork / Custom',
  },
  'nova-wren': {
    detail: 'Flash, Neo-Traditional und Motive mit lauter Silhouette.',
    image: novaWrenImage,
    note: 'Flash / Neo-Trad',
  },
  'rico-chrome': {
    detail: 'Chrome Mood, satte Linien und präzise dunkle Details.',
    image: ricoChromeImage,
    note: 'Black & Grey / Chrome',
  },
}

const fallbackArtistImages = [fallbackOneImage, fallbackTwoImage, mayaBlackImage, ricoChromeImage]

export function ArtistsPage() {
  const artistsState = useArtists()

  return (
    <AppShell>
      <section className="artist-stage px-5 py-12 sm:px-8 lg:px-12">
        <img className="artist-stage-image" src={tattooMachineImage} alt="" />
        <p className="eyebrow">Resident Artists</p>
        <h1 className="page-hero-title page-hero-title-narrow mt-8">
          <span>Meet the hands</span>
          <span>behind the lines</span>
        </h1>
      </section>

      <section className="py-12">
        <div className="section-heading">
          <p>The Crew</p>
        </div>

        {artistsState.status === 'loading' ? <ArtistsNotice text="Artists werden geladen." /> : null}

        {artistsState.status === 'error' ? <ArtistsNotice text={artistsState.error} /> : null}

        {artistsState.status === 'success' && artistsState.artists.length === 0 ? (
          <ArtistsNotice text="Noch keine Artists sichtbar." />
        ) : null}

        {artistsState.artists.length > 0 ? (
          <div className="artists-grid">
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
  const firstName = artist.name.split(' ')[0]
  const content = getArtistCardContent(artist)

  return (
    <Link
      to={`/artists/${artist.slug}`}
      aria-label={`${artist.name}, ${artist.title}`}
      className="artist-card"
    >
      <div className="artist-card-image">
        <img alt="" src={content.image} />
      </div>

      <div className="artist-card-summary">
        <p className="artist-card-kicker">{content.note}</p>
        <h2>{artist.name}</h2>
        <p>{artist.title}</p>
      </div>

      <div className="artist-card-details">
        <p className="artist-card-file">Artist File / {artist.sortOrder.toString().padStart(2, '0')}</p>
        <h3>{artist.name}</h3>
        <p>{content.detail}</p>
        <p>{artist.bio}</p>
        <div className="artist-card-tags">
          {artist.styles.map((style) => (
            <span className="badge badge-dark" key={style}>
              {style}
            </span>
          ))}
        </div>
        <span className="artist-card-link">Profil ansehen / Termin mit {firstName}</span>
      </div>
    </Link>
  )
}

function getArtistCardContent(artist: Artist) {
  return (
    artistContentBySlug[artist.slug] ?? {
      detail: 'Custom Work, klare Beratung und Motive mit eigener Richtung.',
      image: fallbackArtistImages[artist.sortOrder % fallbackArtistImages.length],
      note: artist.styles.slice(0, 2).join(' / ') || 'Custom Tattoo',
    }
  )
}

function ArtistsNotice({ text }: { text: string }) {
  return (
    <div className="panel-frame p-6 text-[var(--color-muted)]">
      <p>{text}</p>
    </div>
  )
}
