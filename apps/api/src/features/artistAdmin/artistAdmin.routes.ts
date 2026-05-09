import { Router } from 'express'

import { requireArtistOrAdminAuth } from '../admin/adminAuth.middleware.js'
import { listArtistBookingRequests } from './artistAdminBookingRequest.controller.js'

export const artistAdminRouter = Router()

artistAdminRouter.get('/booking-requests', requireArtistOrAdminAuth, listArtistBookingRequests)
