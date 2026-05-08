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
  status: 'new' | 'reviewed' | 'contacted' | 'archived'
  createdAt: string
}

type AdminBookingRequestsResponse = {
  data: AdminBookingRequest[]
}

type AdminBookingRequestResponse = {
  data: AdminBookingRequest
}

async function getAdminJson<TResponse>(path: string, token: string) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Admin API request failed with status ${response.status}`)
  }

  return response.json() as Promise<TResponse>
}

export function getAdminBookingRequests(token: string) {
  return getAdminJson<AdminBookingRequestsResponse>('/api/admin/booking-requests', token)
}

export function getAdminBookingRequest(id: string, token: string) {
  return getAdminJson<AdminBookingRequestResponse>(`/api/admin/booking-requests/${id}`, token)
}
