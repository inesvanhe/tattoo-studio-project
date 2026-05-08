import { postJson } from '../../shared/api/client'

export type CreateBookingRequestPayload = {
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
}

export type BookingRequestResponse = CreateBookingRequestPayload & {
  id: string
  status: 'new' | 'reviewed' | 'contacted' | 'archived'
  createdAt: string
}

type CreateBookingRequestResponse = {
  data: BookingRequestResponse
}

export function createBookingRequest(payload: CreateBookingRequestPayload) {
  return postJson<CreateBookingRequestResponse, CreateBookingRequestPayload>(
    '/api/booking-requests',
    payload,
  )
}
