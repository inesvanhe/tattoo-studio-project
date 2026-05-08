import { useParams } from 'react-router-dom'

import { PlaceholderPage } from '../../shared/components/PlaceholderPage'

export function PortfolioDetailPage() {
  const { slug = 'tattoo-work' } = useParams()

  return (
    <PlaceholderPage
      eyebrow="Portfolio Detail"
      title={slug.replaceAll('-', ' ')}
      description="Diese Detailseite wird spaeter Bild, Artist, Style, Koerperstelle, Tags und Beschreibung einer einzelnen Arbeit zeigen."
      primaryHref="/portfolio"
      primaryLabel="Zur Galerie"
    />
  )
}
