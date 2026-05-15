import { AppShell } from '../../app/AppShell'
import { ButtonLink } from '../../shared/components/Button'

const contactItems = [
  {
    label: 'E-Mail',
    value: 'studio@honeybeez.ink',
  },
  {
    label: 'Telefon',
    value: '+49 30 2222 2024',
  },
  {
    label: 'Studio',
    value: 'HONEY | BEEZ ink, Atelierstraße 24, 10115 Berlin',
  },
]

export function ContactPage() {
  return (
    <AppShell>
      <section className="poster-hero border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:px-12">
        <p className="eyebrow">Kontakt</p>
        <h1 className="mt-8 max-w-4xl text-5xl font-black uppercase leading-[0.92] sm:text-7xl">
          Studio Kontakt.
        </h1>
      </section>

      <section className="grid gap-5 py-12 md:grid-cols-[1fr_1fr]">
        <div className="panel-frame p-6 sm:p-8">
          <p className="eyebrow">Direkt</p>
          <div className="mt-6 grid gap-5">
            {contactItems.map((item) => (
              <div className="contact-info-item" key={item.label}>
                <p>{item.label}</p>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-frame p-6 sm:p-8">
          <p className="eyebrow">Terminanfrage</p>
          <p className="mt-6 text-base leading-7 text-[var(--color-muted)]">
            Für Tattoo-Anfragen nutze bitte das Anfrageformular. Dort kannst du
            Motiv, Platzierung, Größe, Referenzen und Terminwünsche gesammelt
            einreichen.
          </p>
          <div className="mt-8">
            <ButtonLink href="/booking" variant="secondary">
              Anfrage starten
            </ButtonLink>
          </div>
        </div>
      </section>
    </AppShell>
  )
}
