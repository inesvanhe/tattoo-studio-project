import { useParams } from 'react-router-dom'

import { AppShell } from '../../app/AppShell'
import { ButtonLink } from '../../shared/components/Button'
import { AdminAuthGate } from './AdminAuthGate'
import { useAdminBookingRequest } from './useAdminBookingRequests'

export function AdminBookingRequestDetailPage() {
  const { id } = useParams()
  const requestState = useAdminBookingRequest(id)

  return (
    <AppShell>
      <section className="border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:px-12">
        <p className="eyebrow">Admin Request Detail</p>
        <h1 className="mt-8 text-5xl font-black uppercase leading-[0.92] sm:text-7xl">
          Request detail
        </h1>
      </section>

      <AdminAuthGate>
        <section className="py-12">
          {requestState.status === 'loading' ? <AdminNotice text="Anfrage wird geladen." /> : null}

          {requestState.status === 'error' ? <AdminNotice text={requestState.error} /> : null}

          {requestState.status === 'success' ? (
            <article className="admin-detail">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">{requestState.request.status}</p>
                  <h2 className="mt-4 text-4xl font-black uppercase leading-none">
                    {requestState.request.customerName}
                  </h2>
                </div>
                <ButtonLink href="/admin/booking-requests" variant="secondary">
                  Zur Liste
                </ButtonLink>
              </div>

              <div className="admin-detail-grid">
                <AdminField label="E-Mail" value={requestState.request.customerEmail} />
                <AdminField label="Telefon" value={requestState.request.customerPhone || 'Nicht angegeben'} />
                <AdminField label="Stil" value={requestState.request.preferredStyle} />
                <AdminField label="Koerperstelle" value={requestState.request.bodyPlacement} />
                <AdminField label="Groesse" value={requestState.request.approximateSize} />
                <AdminField label="Artist" value={requestState.request.artistSlug || 'Nicht angegeben'} />
                <AdminField label="Budget" value={requestState.request.budgetRange || 'Nicht angegeben'} />
                <AdminField label="Erstellt" value={new Date(requestState.request.createdAt).toLocaleString()} />
              </div>

              <AdminField label="Motividee" value={requestState.request.ideaDescription} wide />
              <AdminField
                label="Terminwunsch / Referenzen"
                value={requestState.request.availabilityNotes || 'Nicht angegeben'}
                wide
              />
            </article>
          ) : null}
        </section>
      </AdminAuthGate>
    </AppShell>
  )
}

function AdminField({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? 'admin-field admin-field-wide' : 'admin-field'}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function AdminNotice({ text }: { text: string }) {
  return (
    <div className="panel-frame p-6 text-[var(--color-muted)]">
      <p>{text}</p>
    </div>
  )
}
