import { apiBaseUrl } from '../../shared/api/client'

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
  referenceImages: BookingRequestReferenceImage[]
  status: 'new' | 'reviewed' | 'contacted' | 'archived'
  createdAt: string
}

export type BookingRequestReferenceImage = {
  url: string
  publicId: string
  originalName: string
  mimeType: string
  size: number
  width?: number
  height?: number
  uploadedAt: string
}

type CreateBookingRequestResponse = {
  data: BookingRequestResponse
}

type ApiErrorResponse = {
  error?: {
    message?: string
  }
}

export async function createBookingRequest(
  payload: CreateBookingRequestPayload,
  referenceImages: File[] = [],
) {
  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]) => {
    formData.set(key, value)
  })

  referenceImages.forEach((file) => {
    formData.append('referenceImages', file)
  })

  const response = await fetch(`${apiBaseUrl}/api/booking-requests`, {
    body: formData,
    method: 'POST',
  })

  if (!response.ok) {
    const responseBody = (await response.json().catch(() => null)) as ApiErrorResponse | null

    throw new Error(
      responseBody?.error?.message ?? 'Die Anfrage konnte gerade nicht gespeichert werden.',
    )
  }

  return response.json() as Promise<CreateBookingRequestResponse>
}
