import { Link } from 'react-router-dom'
import { useState } from 'react'

import { AppShell } from '../../app/AppShell'
import { formatBudgetRange } from '../../shared/formatters/budget'
import { AdminAuthGate } from './AdminAuthGate'
import { AdminNotice, getAdminNoticeKind } from './AdminNotice'
import {
  adminBookingRequestStatuses,
  type AdminBookingRequest,
  type AdminBookingRequestStatus,
} from './admin.api'
import { useAdminBookingRequests } from './useAdminBookingRequests'

type AdminStatusFilter = 'all' | AdminBookingRequestStatus

export function AdminBookingRequestsPage() {
  const requestsState = useAdminBookingRequests()
  const [activeStatus, setActiveStatus] = useState<AdminStatusFilter>('all')

  const filteredRequests = requestsState.requests.filter((request) => {
    if (activeStatus === 'all') {
      return true
    }

    return request.status === activeStatus
  })

  return (
    <AppShell>
      <section className="border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:px-12">
        <p className="eyebrow">Admin Requests</p>
        <h1 className="page-hero-title mt-8">
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
            <div className="admin-request-filters" aria-label="Anfragen nach Status filtern">
              {(['all', ...adminBookingRequestStatuses] as AdminStatusFilter[]).map((status) => (
                <button
                  className={activeStatus === status ? 'admin-filter-active' : undefined}
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  type="button"
                >
                  {status === 'all' ? 'Alle' : status}
                </button>
              ))}
            </div>
          ) : null}

          {requestsState.status === 'success' && requestsState.requests.length > 0 && filteredRequests.length === 0 ? (
            <AdminNotice text="Für diesen Status gibt es gerade keine Anfragen." />
          ) : null}

          {requestsState.requests.length > 0 ? (
            <div className="admin-request-list">
              {filteredRequests.map((request) => (
                <Link
                  className="admin-request-row"
                  key={request.id}
                  to={`/admin/booking-requests/${request.id}`}
                >
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

function getContactLabel(request: AdminBookingRequest) {
  return request.customerPhone || request.customerEmail
}

function getBudgetLabel(request: AdminBookingRequest) {
  return formatBudgetRange(request.budgetRange) || 'Kein Budget'
}
