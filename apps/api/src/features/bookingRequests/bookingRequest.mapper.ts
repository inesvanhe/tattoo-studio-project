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
    adminNotes: bookingRequest.adminNotes ?? '',
    status: bookingRequest.status,
    referenceImages: (bookingRequest.referenceImages ?? []).map((image) => ({
      ...(image.height ? { height: image.height } : {}),
      ...(image.width ? { width: image.width } : {}),
      mimeType: image.mimeType,
      originalName: image.originalName,
      publicId: image.publicId,
      size: image.size,
      uploadedAt: image.uploadedAt.toISOString(),
      url: image.url,
    })),
    createdAt: bookingRequest.createdAt.toISOString(),
  }
}
