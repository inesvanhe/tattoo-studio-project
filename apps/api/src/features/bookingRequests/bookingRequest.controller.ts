import type { Request, Response } from 'express'
import { Types } from 'mongoose'

import {
  bookingRequestResponseSchema,
  createBookingRequestSchema,
} from './bookingRequest.schema.js'
import { createBookingRequest } from './bookingRequest.service.js'
import {
  deleteReferenceImages,
  uploadReferenceImages,
} from './referenceImages/referenceImageUpload.js'

export async function createBookingRequestHandler(request: Request, response: Response) {
  const input = createBookingRequestSchema.parse(request.body)
  const files = Array.isArray(request.files) ? request.files : []
  const bookingRequestId = new Types.ObjectId()
  const referenceImages = await uploadReferenceImages(files, bookingRequestId)

  try {
    const bookingRequest = await createBookingRequest(input, {
      id: bookingRequestId,
      referenceImages,
    })

    response.status(201).json({
      data: bookingRequestResponseSchema.parse(bookingRequest),
    })
  } catch (error) {
    await deleteReferenceImages(referenceImages)
    throw error
  }
}
