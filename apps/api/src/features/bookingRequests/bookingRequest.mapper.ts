import type { HydratedDocument } from 'mongoose'

import type { BookingRequestDocument } from './bookingRequest.model.js'
import type { BookingRequestResponse } from './bookingRequest.schema.js'

export function toBookingRequestResponse(
  bookingRequest: HydratedDocument<BookingRequestDocument>,
): BookingRequestResponse {
  return {
    id: bookingRequest.id,
    customerName: bookingRequest.customerName,
    customerEmail: bookingRequest.customerEmail,
    customerPhone: bookingRequest.customerPhone,
    ideaDescription: bookingRequest.ideaDescription,
    preferredStyle: bookingRequest.preferredStyle,
    bodyPlacement: bookingRequest.bodyPlacement,
    approximateSize: bookingRequest.approximateSize,
    artistSlug: bookingRequest.artistSlug,
    budgetRange: bookingRequest.budgetRange,
    availabilityNotes: bookingRequest.availabilityNotes,
    status: bookingRequest.status,
    createdAt: bookingRequest.createdAt.toISOString(),
  }
}
