import type { Request, Response } from 'express'

import { hasAdminRole, type AdminAuthLocals } from '../admin/adminAuth.middleware.js'
import { bookingRequestResponseSchema } from '../bookingRequests/bookingRequest.schema.js'
import {
  getBookingRequestsForAdmin,
  getBookingRequestsForArtist,
} from '../bookingRequests/bookingRequest.service.js'

export async function listArtistBookingRequests(
  _request: Request,
  response: Response<unknown, AdminAuthLocals>,
) {
  const auth = response.locals.adminAuth

  if (!auth) {
    response.status(401).json({
      error: {
        message: 'Authentication required',
      },
    })
    return
  }

  if (hasAdminRole(auth.roles)) {
    const bookingRequests = await getBookingRequestsForAdmin()

    response.status(200).json({
      data: bookingRequestResponseSchema.array().parse(bookingRequests),
    })
    return
  }

  if (!auth.artistSlug) {
    response.status(403).json({
      error: {
        message: 'Artist slug required',
      },
    })
    return
  }

  const bookingRequests = await getBookingRequestsForArtist(auth.artistSlug)

  response.status(200).json({
    data: bookingRequestResponseSchema.array().parse(bookingRequests),
  })
}
