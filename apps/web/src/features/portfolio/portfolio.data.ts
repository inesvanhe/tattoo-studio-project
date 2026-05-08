export type PortfolioWork = {
  slug: string
  title: string
  artistName: string
  artistSlug: string
  styles: string[]
  bodyPlacement: string
  description: string
}

export const portfolioWorks: PortfolioWork[] = [
  {
    slug: 'chrome-panther',
    title: 'Chrome Panther',
    artistName: 'Rico Vail',
    artistSlug: 'rico-vail',
    styles: ['Neo-Traditional', 'Chrome'],
    bodyPlacement: 'Upper Arm',
    description:
      'Bold Neo-Traditional Panther mit schweren Linien, Chrome-Reflexen und warmer Flash-Energie.',
  },
  {
    slug: 'night-bloom',
    title: 'Night Bloom',
    artistName: 'Mara Hex',
    artistSlug: 'mara-hex',
    styles: ['Blackwork', 'Ornamental'],
    bodyPlacement: 'Ribs',
    description:
      'Florales Blackwork-Piece mit dunklen Flaechen, ruhigem Rhythmus und klarer Silhouette.',
  },
  {
    slug: 'street-halo',
    title: 'Street Halo',
    artistName: 'Jules Noir',
    artistSlug: 'jules-noir',
    styles: ['Blackwork', 'Lettering'],
    bodyPlacement: 'Back Shoulder',
    description:
      'Grafisches Lettering-Motiv mit Halo-Form, Streetwear-Kante und praeziser Linienfuehrung.',
  },
]

export function findPortfolioWork(slug: string | undefined) {
  return portfolioWorks.find((work) => work.slug === slug)
}
