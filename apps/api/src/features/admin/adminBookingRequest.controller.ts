import type { Request, Response } from 'express'

import {
  bookingRequestParamsSchema,
  bookingRequestResponseSchema,
  updateBookingRequestAdminNotesSchema,
  updateBookingRequestStatusSchema,
} from '../bookingRequests/bookingRequest.schema.js'
import {
  getBookingRequestForAdmin,
  getBookingRequestsForAdmin,
  updateBookingRequestAdminNotesForAdmin,
  updateBookingRequestStatusForAdmin,
} from '../bookingRequests/bookingRequest.service.js'

export async function listAdminBookingRequests(_request: Request, response: Response) {
  const bookingRequests = await getBookingRequestsForAdmin()

  response.status(200).json({
    data: bookingRequestResponseSchema.array().parse(bookingRequests),
  })
}

export async function getAdminBookingRequest(request: Request, response: Response) {
  const { id } = bookingRequestParamsSchema.parse(request.params)
  const bookingRequest = await getBookingRequestForAdmin(id)

  if (!bookingRequest) {
    response.status(404).json({
      error: {
        message: 'Booking request not found',
      },
    })
    return
  }

  response.status(200).json({
    data: bookingRequestResponseSchema.parse(bookingRequest),
  })
}

export async function updateAdminBookingRequestStatus(request: Request, response: Response) {
  const { id } = bookingRequestParamsSchema.parse(request.params)
  const input = updateBookingRequestStatusSchema.parse(request.body)
  const bookingRequest = await updateBookingRequestStatusForAdmin(id, input)

  if (!bookingRequest) {
    response.status(404).json({
      error: {
        message: 'Booking request not found',
      },
    })
    return
  }

  response.status(200).json({
    data: bookingRequestResponseSchema.parse(bookingRequest),
  })
}

export async function updateAdminBookingRequestAdminNotes(request: Request, response: Response) {
  const { id } = bookingRequestParamsSchema.parse(request.params)
  const input = updateBookingRequestAdminNotesSchema.parse(request.body)
  const bookingRequest = await updateBookingRequestAdminNotesForAdmin(id, input)

  if (!bookingRequest) {
    response.status(404).json({
      error: {
        message: 'Booking request not found',
      },
    })
    return
  }

  response.status(200).json({
    data: bookingRequestResponseSchema.parse(bookingRequest),
  })
}
