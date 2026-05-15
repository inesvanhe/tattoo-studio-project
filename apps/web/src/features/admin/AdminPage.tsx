import { AppShell } from '../../app/AppShell'
import sketchesImage from '../../assets/studio/sketches1.jpg'
import { ButtonLink } from '../../shared/components/Button'
import { AdminAuthGate } from './AdminAuthGate'

export function AdminPage() {
  return (
    <AppShell>
      <section className="poster-hero admin-dashboard-hero border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:px-12">
        <img className="admin-dashboard-hero-image" src={sketchesImage} alt="" />
        <p className="eyebrow">Admin</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h1 className="page-hero-title">
            Studio dashboard
          </h1>
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
