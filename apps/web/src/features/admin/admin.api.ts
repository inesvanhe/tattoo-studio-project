import { getJson } from '../../shared/api/client'

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

export function getAdminBookingRequests() {
  return getJson<AdminBookingRequestsResponse>('/api/admin/booking-requests')
}

export function getAdminBookingRequest(id: string) {
  return getJson<AdminBookingRequestResponse>(`/api/admin/booking-requests/${id}`)
}
