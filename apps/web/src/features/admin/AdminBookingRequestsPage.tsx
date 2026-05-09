import { Link } from 'react-router-dom'

import { AppShell } from '../../app/AppShell'
import { AdminAuthGate } from './AdminAuthGate'
import { AdminNotice, getAdminNoticeKind } from './AdminNotice'
import { useAdminBookingRequests } from './useAdminBookingRequests'

export function AdminBookingRequestsPage() {
  const requestsState = useAdminBookingRequests()

  return (
    <AppShell>
      <section className="border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:px-12">
        <p className="eyebrow">Admin Requests</p>
        <h1 className="mt-8 text-5xl font-black uppercase leading-[0.92] sm:text-7xl">
          Booking requests
        </h1>
      </section>

      <AdminAuthGate>
        <section className="py-12">
          {requestsState.status === 'loading' ? <AdminNotice text="Anfragen werden geladen." /> : null}

          {requestsState.status === 'error' ? (
            <AdminNotice kind={getAdminNoticeKind(requestsState.error)} text={requestsState.error} />
          ) : null}

          {requestsState.status === 'success' && requestsState.requests.length === 0 ? (
            <AdminNotice text="Noch keine Anfragen vorhanden." />
          ) : null}

          {requestsState.requests.length > 0 ? (
            <div className="admin-request-list">
              {requestsState.requests.map((request) => (
                <Link
                  className="admin-request-row"
                  key={request.id}
                  to={`/admin/booking-requests/${request.id}`}
                >
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--color-honey)]">
                      {request.status}
                    </p>
                    <h2 className="mt-2 text-2xl font-black uppercase">{request.customerName}</h2>
                    <p className="mt-2 text-base leading-7 text-[var(--color-muted)]">
                      {request.preferredStyle} / {request.bodyPlacement} / {request.approximateSize}
                    </p>
                  </div>
                  <span className="badge badge-dark">Details</span>
                </Link>
              ))}
            </div>
          ) : null}
        </section>
      </AdminAuthGate>
    </AppShell>
  )
}
