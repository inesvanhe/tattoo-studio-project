import { AppShell } from '../../app/AppShell'
import { ButtonLink } from '../../shared/components/Button'

const shopBadges = ['Custom Tattoos', 'Blackwork', 'Neo-Traditional', 'Oldschool', 'Lowrider Mood']
const posterTags = ['Bold lines', 'Chrome dreams', 'Street soul', 'Flash energy']
const dashboardStats = [
  ['01', 'Idea first'],
  ['02', 'Artist match'],
  ['03', 'Studio review'],
]

export function HomePage() {
  return (
    <AppShell>
      <section className="shop-window relative overflow-hidden border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:px-12">
        <div className="absolute inset-x-8 top-6 h-px bg-[var(--color-honey)]/40" />
        <div className="absolute inset-y-8 left-6 w-px bg-[var(--color-honey)]/30" />
        <div className="absolute inset-y-8 right-6 w-px bg-[var(--color-honey)]/30" />

        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow">Established 2024 / Built for the bold</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {shopBadges.map((badge) => (
              <span className="badge" key={badge}>
                {badge}
              </span>
            ))}
          </div>

          <h1 className="mx-auto mt-10 max-w-4xl text-5xl font-black uppercase leading-[0.92] sm:text-7xl lg:text-8xl">
            Ink with street soul.
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
            Ein digitales Studio-Schaufenster fuer Tattoos mit dunklen Linien,
            schweren Geschichten und einem Vibe zwischen Skatepark, Chrome und
            Oldschool Flash.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink href="#poster" variant="secondary">
              Vibe ansehen
            </ButtonLink>
            <ButtonLink href="#booking">Termin anfragen</ButtonLink>
          </div>
        </div>
      </section>

      <section className="poster-hero grid gap-8 border-b border-[var(--color-line)] py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="panel-frame p-6">
          <p className="eyebrow">Poster Hero</p>
          <h2 id="poster" className="mt-8 text-4xl font-black uppercase leading-none sm:text-6xl">
            Blackwork.
            <br />
            Neo-Trad.
            <br />
            No weak lines.
          </h2>
        </div>

        <div className="grid content-between gap-8 border border-[var(--color-honey)]/50 bg-[linear-gradient(135deg,rgba(255,193,5,0.12),rgba(255,255,255,0.02)_42%,rgba(0,0,0,0.4))] p-6">
          <p className="max-w-2xl text-2xl font-semibold leading-snug text-[var(--color-paper)]">
            Kein generisches Studio. Ein Ort fuer Motive, die Haltung tragen:
            von harten Kontrasten bis zu warmen Oldschool-Farben.
          </p>
          <div className="flex flex-wrap gap-3">
            {posterTags.map((tag) => (
              <span className="badge badge-dark" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="lowrider-dashboard py-16">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="dashboard-panel">
            <p className="eyebrow">Lowrider Dashboard</p>
            <h2 className="mt-8 max-w-3xl text-4xl font-black uppercase leading-tight sm:text-6xl">
              Roll in with an idea.
              <br />
              Leave with a plan.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
              Galerie, Artists und Anfrageflow fuehren spaeter durch den ganzen
              Prozess. Erstmal zaehlt: Das Studio muss sich anfuehlen wie ein
              Ort, an dem man bleiben will.
            </p>
          </div>

          <div className="grid gap-4">
            {dashboardStats.map(([number, label]) => (
              <div className="speed-gauge" key={number}>
                <span className="text-3xl font-black text-[var(--color-honey)]">{number}</span>
                <span className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-paper)]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-12 grid gap-4 border-t border-[var(--color-line)] pt-5 text-sm text-[var(--color-muted)] sm:grid-cols-3">
          <p id="artists">Artists</p>
          <p id="portfolio">Tattoo-Galerie</p>
          <p id="booking">Terminbuchung</p>
        </footer>
      </section>
    </AppShell>
  )
}
