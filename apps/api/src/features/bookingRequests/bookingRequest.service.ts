import { BookingRequestModel } from './bookingRequest.model.js'
import { toBookingRequestResponse } from './bookingRequest.mapper.js'
import type {
  CreateBookingRequestInput,
  UpdateBookingRequestAdminNotesInput,
  UpdateBookingRequestStatusInput,
} from './bookingRequest.schema.js'

export async function createBookingRequest(input: CreateBookingRequestInput) {
  const bookingRequest = await BookingRequestModel.create({
    ...input,
    status: 'new',
  })

  return toBookingRequestResponse(bookingRequest)
}

export async function getBookingRequestsForAdmin() {
  const bookingRequests = await BookingRequestModel.find().sort({ createdAt: -1 })

  return bookingRequests.map(toBookingRequestResponse)
}

export async function getBookingRequestsForArtist(artistSlug: string) {
  const bookingRequests = await BookingRequestModel.find({ artistSlug }).sort({ createdAt: -1 })

  return bookingRequests.map(toBookingRequestResponse)
}

export async function getBookingRequestForAdmin(id: string) {
  const bookingRequest = await BookingRequestModel.findById(id)

  return bookingRequest ? toBookingRequestResponse(bookingRequest) : null
}

export async function updateBookingRequestStatusForAdmin(
  id: string,
  input: UpdateBookingRequestStatusInput,
) {
  const bookingRequest = await BookingRequestModel.findByIdAndUpdate(
    id,
    { status: input.status },
    { new: true, runValidators: true },
  )

  return bookingRequest ? toBookingRequestResponse(bookingRequest) : null
}

export async function updateBookingRequestAdminNotesForAdmin(
  id: string,
  input: UpdateBookingRequestAdminNotesInput,
) {
  const bookingRequest = await BookingRequestModel.findByIdAndUpdate(
    id,
    { adminNotes: input.adminNotes },
    { new: true, runValidators: true },
  )

  return bookingRequest ? toBookingRequestResponse(bookingRequest) : null
}
