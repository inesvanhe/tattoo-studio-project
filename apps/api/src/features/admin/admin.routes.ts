import { Router } from 'express'

import {
  getAdminBookingRequest,
  listAdminBookingRequests,
  updateAdminBookingRequestStatus,
} from './adminBookingRequest.controller.js'
import { requireAdminAuth } from './adminAuth.middleware.js'
import { getAdminMe } from './admin.controller.js'

export const adminRouter = Router()

adminRouter.get('/me', requireAdminAuth, getAdminMe)
adminRouter.get('/booking-requests', requireAdminAuth, listAdminBookingRequests)
adminRouter.get('/booking-requests/:id', requireAdminAuth, getAdminBookingRequest)
adminRouter.patch(
  '/booking-requests/:id/status',
  requireAdminAuth,
  updateAdminBookingRequestStatus,
)
