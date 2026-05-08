import type { Request, Response } from 'express'

import {
  bookingRequestResponseSchema,
  createBookingRequestSchema,
} from './bookingRequest.schema.js'
import { createBookingRequest } from './bookingRequest.service.js'

export async function createBookingRequestHandler(request: Request, response: Response) {
  const input = createBookingRequestSchema.parse(request.body)
  const bookingRequest = await createBookingRequest(input)

  response.status(201).json({
    data: bookingRequestResponseSchema.parse(bookingRequest),
  })
}
