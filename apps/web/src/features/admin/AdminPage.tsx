import { AppShell } from '../../app/AppShell'
import { ButtonLink } from '../../shared/components/Button'

export function AdminPage() {
  return (
    <AppShell>
      <section className="poster-hero border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:px-12">
        <p className="eyebrow">Admin</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h1 className="text-5xl font-black uppercase leading-[0.92] sm:text-7xl">
            Studio dashboard
          </h1>
          <div className="panel-frame p-6">
            <p className="text-lg leading-8 text-[var(--color-muted)]">
              Interner Einstieg fuer Terminanfragen und spaetere Studio-Arbeit.
              Der Backend-Zugriff ist bereits geschuetzt; Clerk-Login im
              Frontend folgt als naechster Schritt.
            </p>
            <div className="mt-6">
              <ButtonLink href="/admin/booking-requests">Anfragen ansehen</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 py-12 md:grid-cols-3">
        <AdminMetric label="Requests" value="API" />
        <AdminMetric label="Auth" value="Clerk" />
        <AdminMetric label="Status" value="Protected" />
      </section>
    </AppShell>
  )
}

function AdminMetric({ label, value }: { label: string; value: string }) {
  return (
    <article className="admin-metric">
      <p className="eyebrow">{label}</p>
      <strong>{value}</strong>
    </article>
  )
}
