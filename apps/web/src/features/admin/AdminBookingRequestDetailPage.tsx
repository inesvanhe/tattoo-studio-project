import { useParams } from 'react-router-dom'
import { type ChangeEvent, useState } from 'react'

import { AppShell } from '../../app/AppShell'
import { ButtonLink } from '../../shared/components/Button'
import { formatBudgetRange } from '../../shared/formatters/budget'
import { AdminAuthGate } from './AdminAuthGate'
import { AdminNotice, getAdminNoticeKind } from './AdminNotice'
import {
  adminBookingRequestStatuses,
  type AdminBookingRequest,
  type AdminBookingRequestStatus,
} from './admin.api'
import {
  useAdminBookingRequest,
  useUpdateAdminBookingRequestAdminNotes,
  useUpdateAdminBookingRequestStatus,
} from './useAdminBookingRequests'

export function AdminBookingRequestDetailPage() {
  const { id } = useParams()
  const requestState = useAdminBookingRequest(id)
  const updateAdminNotes = useUpdateAdminBookingRequestAdminNotes()
  const updateStatus = useUpdateAdminBookingRequestStatus()
  const [updatedRequest, setUpdatedRequest] = useState<AdminBookingRequest | null>(null)
  const [adminNotesDraft, setAdminNotesDraft] = useState<string | null>(null)
  const [adminNotesUpdateState, setAdminNotesUpdateState] = useState<
    'idle' | 'saving' | 'success' | 'error'
  >('idle')
  const [statusUpdateState, setStatusUpdateState] = useState<
    'idle' | 'saving' | 'success' | 'error'
  >('idle')

  const request = requestState.status === 'success' ? updatedRequest ?? requestState.request : null
  const adminNotesValue = adminNotesDraft ?? request?.adminNotes ?? ''

  async function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    if (!request) {
      return
    }

    const nextStatus = event.target.value as AdminBookingRequestStatus

    if (nextStatus === request.status) {
      return
    }

    setStatusUpdateState('saving')

    try {
      const response = await updateStatus(request.id, nextStatus)

      setUpdatedRequest(response.data)
      setStatusUpdateState('success')
    } catch {
      setStatusUpdateState('error')
    }
  }

  async function handleAdminNotesSubmit() {
    if (!request) {
      return
    }

    setAdminNotesUpdateState('saving')

    try {
      const response = await updateAdminNotes(request.id, adminNotesValue)

      setUpdatedRequest(response.data)
      setAdminNotesDraft(null)
      setAdminNotesUpdateState('success')
    } catch {
      setAdminNotesUpdateState('error')
    }
  }

  return (
    <AppShell>
      <section className="border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:px-12">
        <p className="eyebrow">Admin Request Detail</p>
        <h1 className="page-hero-title mt-8">
          Request detail
        </h1>
      </section>

      <AdminAuthGate>
        <section className="py-12">
          {requestState.status === 'loading' ? <AdminNotice text="Anfrage wird geladen." /> : null}

          {requestState.status === 'error' ? (
            <AdminNotice kind={getAdminNoticeKind(requestState.error)} text={requestState.error} />
          ) : null}

          {request ? (
            <article className="admin-detail">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">{request.status}</p>
                  <h2 className="mt-4 text-4xl font-black uppercase leading-none">
                    {request.customerName}
                  </h2>
                </div>
                <ButtonLink href="/admin/booking-requests" variant="secondary">
                  Zur Liste
                </ButtonLink>
              </div>

              <div className="admin-status-control">
                <label>
                  <span>Status</span>
                  <select
                    disabled={statusUpdateState === 'saving'}
                    onChange={handleStatusChange}
                    value={request.status}
                  >
                    {adminBookingRequestStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                {statusUpdateState === 'saving' ? <p>Speichere Status...</p> : null}
                {statusUpdateState === 'success' ? <p>Status aktualisiert.</p> : null}
                {statusUpdateState === 'error' ? (
                  <p className="admin-status-error">Status konnte nicht gespeichert werden.</p>
                ) : null}
              </div>

              <div className="admin-detail-grid">
                <AdminField label="E-Mail" value={request.customerEmail} />
                <AdminField label="Telefon" value={request.customerPhone || 'Nicht angegeben'} />
                <AdminField label="Stil" value={request.preferredStyle} />
                <AdminField label="Körperstelle" value={request.bodyPlacement} />
                <AdminField label="Größe" value={request.approximateSize} />
                <AdminField label="Artist" value={request.artistSlug || 'Nicht angegeben'} />
                <AdminField
                  label="Budget"
                  value={formatBudgetRange(request.budgetRange) || 'Nicht angegeben'}
                />
                <AdminField label="Erstellt" value={new Date(request.createdAt).toLocaleString()} />
              </div>

              <AdminField label="Motividee" value={request.ideaDescription} wide />
              <AdminField
                label="Terminwunsch / Referenzen"
                value={request.availabilityNotes || 'Nicht angegeben'}
                wide
              />

              <div className="admin-notes-control">
                <label>
                  <span>Interne Notiz</span>
                  <textarea
                    onChange={(event) => {
                      setAdminNotesDraft(event.target.value)
                      setAdminNotesUpdateState('idle')
                    }}
                    placeholder="Notizen für Studio, Admins oder Artists"
                    rows={5}
                    value={adminNotesValue}
                  />
                </label>
                <button
                  disabled={adminNotesUpdateState === 'saving'}
                  onClick={handleAdminNotesSubmit}
                  type="button"
                >
                  {adminNotesUpdateState === 'saving' ? 'Speichert...' : 'Notiz speichern'}
                </button>
                {adminNotesUpdateState === 'success' ? <p>Notiz gespeichert.</p> : null}
                {adminNotesUpdateState === 'error' ? (
                  <p className="admin-status-error">Notiz konnte nicht gespeichert werden.</p>
                ) : null}
              </div>
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
