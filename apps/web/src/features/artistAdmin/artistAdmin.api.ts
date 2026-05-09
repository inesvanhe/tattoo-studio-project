import { apiBaseUrl } from '../../shared/api/client'
import type { AdminBookingRequest } from '../admin/admin.api'

type ArtistBookingRequestsResponse = {
  data: AdminBookingRequest[]
}

type ApiErrorResponse = {
  error?: {
    message?: string
  }
}

export async function getArtistBookingRequests(token: string) {
  const response = await fetch(`${apiBaseUrl}/api/artist/booking-requests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const responseBody = (await response.json().catch(() => null)) as ApiErrorResponse | null
    const message = responseBody?.error?.message ?? `Artist API request failed with status ${response.status}`

    throw new Error(message)
  }

  return response.json() as Promise<ArtistBookingRequestsResponse>
}
