import { BookingRequestModel } from './bookingRequest.model.js'
import { toBookingRequestResponse } from './bookingRequest.mapper.js'
import type { CreateBookingRequestInput } from './bookingRequest.schema.js'

export async function createBookingRequest(input: CreateBookingRequestInput) {
  const bookingRequest = await BookingRequestModel.create({
    ...input,
    status: 'new',
  })

  return toBookingRequestResponse(bookingRequest)
}
