import { apiBaseUrl } from '../../shared/api/client'

export type AdminBookingRequest = {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  ideaDescription: string
  preferredStyle: string
  bodyPlacement: string
  approximateSize: string
  artistSlug: string
  budgetRange: string
  availabilityNotes: string
  adminNotes: string
  status: 'new' | 'reviewed' | 'contacted' | 'archived'
  referenceImages: AdminBookingRequestReferenceImage[]
  createdAt: string
}

export type AdminBookingRequestReferenceImage = {
  url: string
  publicId: string
  originalName: string
  mimeType: string
  size: number
  width?: number
  height?: number
  uploadedAt: string
}

export const adminBookingRequestStatuses = ['new', 'reviewed', 'contacted', 'archived'] as const

export type AdminBookingRequestStatus = (typeof adminBookingRequestStatuses)[number]

type AdminBookingRequestsResponse = {
  data: AdminBookingRequest[]
}

type AdminBookingRequestResponse = {
  data: AdminBookingRequest
}

type ApiErrorResponse = {
  error?: {
    message?: string
  }
}

async function getAdminJson<TResponse>(path: string, token: string) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const responseBody = (await response.json().catch(() => null)) as ApiErrorResponse | null
    const message = responseBody?.error?.message ?? `Admin API request failed with status ${response.status}`

    throw new Error(message)
  }

  return response.json() as Promise<TResponse>
}

async function patchAdminJson<TResponse, TPayload>(path: string, token: string, payload: TPayload) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  })

  if (!response.ok) {
    const responseBody = (await response.json().catch(() => null)) as ApiErrorResponse | null
    const message = responseBody?.error?.message ?? `Admin API request failed with status ${response.status}`

    throw new Error(message)
  }

  return response.json() as Promise<TResponse>
}

export function getAdminBookingRequests(token: string) {
  return getAdminJson<AdminBookingRequestsResponse>('/api/admin/booking-requests', token)
}

export function getAdminBookingRequest(id: string, token: string) {
  return getAdminJson<AdminBookingRequestResponse>(`/api/admin/booking-requests/${id}`, token)
}

export function updateAdminBookingRequestStatus(
  id: string,
  token: string,
  status: AdminBookingRequestStatus,
) {
  return patchAdminJson<AdminBookingRequestResponse, { status: AdminBookingRequestStatus }>(
    `/api/admin/booking-requests/${id}/status`,
    token,
    { status },
  )
}

export function updateAdminBookingRequestAdminNotes(id: string, token: string, adminNotes: string) {
  return patchAdminJson<AdminBookingRequestResponse, { adminNotes: string }>(
    `/api/admin/booking-requests/${id}/admin-notes`,
    token,
    { adminNotes },
  )
}
