import { useParams } from 'react-router-dom'

import { PlaceholderPage } from '../../shared/components/PlaceholderPage'

export function ArtistDetailPage() {
  const { slug = 'artist' } = useParams()

  return (
    <PlaceholderPage
      eyebrow="Artist Detail"
      title={slug.replaceAll('-', ' ')}
      description="Dieses Artist-Profil wird spaeter Bio, Spezialisierungen, passende Portfolio-Arbeiten und einen CTA zur Terminanfrage zeigen."
      primaryHref="/artists"
      primaryLabel="Zur Artist-Uebersicht"
    />
  )
}
