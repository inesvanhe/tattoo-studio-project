import { AppShell } from '../../app/AppShell'
import { formatBudgetRange } from '../../shared/formatters/budget'
import type { AdminBookingRequest } from '../admin/admin.api'
import { AdminNotice, getAdminNoticeKind } from '../admin/AdminNotice'
import { ArtistAuthGate } from './ArtistAuthGate'
import { useArtistBookingRequests } from './useArtistBookingRequests'

export function ArtistBookingRequestsPage() {
  const requestsState = useArtistBookingRequests()

  return (
    <AppShell>
      <section className="border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:px-12">
        <p className="eyebrow">Artist Requests</p>
        <h1 className="mt-8 text-5xl font-black uppercase leading-[0.92] sm:text-7xl">
          Deine Anfragen
        </h1>
      </section>

      <ArtistAuthGate>
        <section className="py-12">
          {requestsState.status === 'loading' ? <AdminNotice text="Anfragen werden geladen." /> : null}

          {requestsState.status === 'error' ? (
            <AdminNotice kind={getAdminNoticeKind(requestsState.error)} text={requestsState.error} />
          ) : null}

          {requestsState.status === 'success' && requestsState.requests.length === 0 ? (
            <AdminNotice text="Dir sind gerade keine Anfragen zugewiesen." />
          ) : null}

          {requestsState.requests.length > 0 ? (
            <div className="admin-request-list">
              {requestsState.requests.map((request) => (
                <article className="admin-request-row" key={request.id}>
                  <div>
                    <p className="admin-request-status">
                      {request.status}
                    </p>
                    <h2 className="mt-2 text-2xl font-black uppercase">{request.customerName}</h2>
                    <p className="mt-2 text-base leading-7 text-[var(--color-muted)]">
                      {request.preferredStyle} / {request.bodyPlacement} / {request.approximateSize}
                    </p>
                    <div className="admin-request-meta">
                      <span>{getContactLabel(request)}</span>
                      <span>{getBudgetLabel(request)}</span>
                      <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className="badge badge-dark">Zugewiesen</span>
                </article>
              ))}
            </div>
          ) : null}
        </section>
      </ArtistAuthGate>
    </AppShell>
  )
}

function getContactLabel(request: AdminBookingRequest) {
  return request.customerPhone || request.customerEmail
}

function getBudgetLabel(request: AdminBookingRequest) {
  return formatBudgetRange(request.budgetRange) || 'Kein Budget'
}
