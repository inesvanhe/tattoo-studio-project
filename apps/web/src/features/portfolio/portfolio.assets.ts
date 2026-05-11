const portfolioImageModules = import.meta.glob('../../assets/portfolio/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const portfolioImagesByFileName = Object.fromEntries(
  Object.entries(portfolioImageModules).map(([path, imageUrl]) => [
    path.split('/').at(-1) ?? path,
    imageUrl,
  ]),
)

export function getPortfolioImage(imageUrl: string) {
  const fileName = imageUrl.split('/').at(-1) ?? imageUrl

  return portfolioImagesByFileName[fileName] ?? portfolioImagesByFileName['tattoo.png'] ?? imageUrl
}
