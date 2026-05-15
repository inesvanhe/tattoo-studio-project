import { AppShell } from '../../app/AppShell'
import { ButtonLink } from './Button'

type PlaceholderPageProps = {
  eyebrow: string
  title: string
  description: string
  primaryHref?: string
  primaryLabel?: string
}

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  primaryHref = '/',
  primaryLabel = 'Zur Startseite',
}: PlaceholderPageProps) {
  return (
    <AppShell>
      <section className="panel-frame my-12 p-6 sm:p-10">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-hero-title mt-6">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
          {description}
        </p>
        <div className="mt-8">
          <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
        </div>
      </section>
    </AppShell>
  )
}
