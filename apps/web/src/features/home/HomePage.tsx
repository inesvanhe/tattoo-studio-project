import { AppShell } from '../../app/AppShell'
import heroScene from '../../assets/home/hero-studio.png'
import lookOne from '../../assets/home/look-studio.png'
import lookTwo from '../../assets/home/look-workspace.jpg'
import lookThree from '../../assets/home/look-machine.jpg'
import lookFour from '../../assets/home/look-tattoo.png'
import { ButtonLink } from '../../shared/components/Button'

const entryPoints = [
  {
    description: 'Resident Artists, Stile und freie Schwerpunkte.',
    eyebrow: 'Meet the crew',
    href: '/artists',
    label: 'Artists',
  },
  {
    description: 'Blackwork, Fine Line, Flash und Custom Pieces.',
    eyebrow: 'Selected work',
    href: '/portfolio',
    label: 'Portfolio',
  },
  {
    description: 'Motiv, Platzierung und Wunschzeitraum einreichen.',
    eyebrow: 'Start your piece',
    href: '/booking',
    label: 'Termin anfragen',
  },
]

const accessLinks = [
  {
    href: '/admin',
    label: 'Admin',
  },
  {
    href: '/artist/booking-requests',
    label: 'Artist',
  },
]

const lookbookTiles = [
  {
    image: lookOne,
    label: 'Studio',
    title: 'Night light',
  },
  {
    image: lookTwo,
    label: 'Consult',
    title: 'Reference table',
  },
  {
    image: lookThree,
    label: 'Flash',
    title: 'Wall pieces',
  },
  {
    image: lookFour,
    label: 'Tattoo',
    title: 'Back piece',
  },
]

export function HomePage() {
  return (
    <AppShell>
      <section className="home-hero" aria-labelledby="home-heading">
        <img className="home-hero-image" src={heroScene} alt="" />
        <div className="home-hero-copy">
          <p className="home-hero-kicker">Custom Work · Tattoo Studio · Open Atelier</p>
          <h1 id="home-heading" className="home-hero-title">
            <span>Made to stay</span>
            <span>With you</span>
          </h1>
          <p className="home-hero-text">
            Custom Tattoos. Blackwork. Fine Line. Flash.
          </p>
          <div className="home-hero-actions">
            <ButtonLink href="/booking">Termin anfragen</ButtonLink>
            <ButtonLink href="/artists" variant="secondary">
              Artists ansehen
            </ButtonLink>
          </div>
        </div>

        <div className="home-hero-meta" aria-label="Studio Info">
          <span>HONEY | BEEZ ink · Est. 2024</span>
          <span>Tattoo Studio</span>
        </div>
      </section>

      <section className="home-lookbook" aria-label="Lookbook Vorschau">
        <div className="home-lookbook-header">
          <p>Lookbook</p>
          <a href="/portfolio">View all</a>
        </div>
        {lookbookTiles.map((tile, index) => (
          <a className="home-lookbook-tile" href="/portfolio" key={tile.label}>
            <img src={tile.image} alt="" />
            <div>
              <p>
                Look 0{index + 1} · {tile.label}
              </p>
              <h2>{tile.title}</h2>
            </div>
          </a>
        ))}
      </section>

      <section className="grid gap-5 py-12 md:grid-cols-3">
        {entryPoints.map((entryPoint) => (
          <a className="home-entry-card" href={entryPoint.href} key={entryPoint.href}>
            <p className="eyebrow">{entryPoint.eyebrow}</p>
            <h2 className="mt-5 text-2xl font-black uppercase leading-none">{entryPoint.label}</h2>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
              {entryPoint.description}
            </p>
          </a>
        ))}
      </section>

      <section className="home-access-panel mb-12">
        <p className="eyebrow">Studio Access</p>
        <div className="home-access-actions">
          {accessLinks.map((accessLink) => (
            <a className="home-access-button" href={accessLink.href} key={accessLink.href}>
              {accessLink.label}
            </a>
          ))}
        </div>
      </section>
    </AppShell>
  )
}
