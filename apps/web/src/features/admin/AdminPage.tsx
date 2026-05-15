import { AppShell } from '../../app/AppShell'
import { ButtonLink } from '../../shared/components/Button'
import { AdminAuthGate } from './AdminAuthGate'

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
              Steuere Anfragen, Artists und Studioabläufe an einem zentralen Ort.
            </p>
          </div>
        </div>
      </section>

      <AdminAuthGate>
        <section className="admin-dashboard-entry panel-frame">
          <ButtonLink href="/admin/booking-requests" variant="secondary">
            Anfragen ansehen
          </ButtonLink>
        </section>
      </AdminAuthGate>
    </AppShell>
  )
}
