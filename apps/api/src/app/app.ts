import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'
import express from 'express'

import { adminRouter } from '../features/admin/admin.routes.js'
import { artistAdminRouter } from '../features/artistAdmin/artistAdmin.routes.js'
import { artistRouter } from '../features/artists/artist.routes.js'
import { bookingRequestRouter } from '../features/bookingRequests/bookingRequest.routes.js'
import { healthRouter } from '../features/health/health.routes.js'
import { tattooRouter } from '../features/tattoos/tattoo.routes.js'
import { env } from '../shared/config/env.js'
import { notFoundHandler } from '../shared/errors/notFoundHandler.js'
import { errorHandler } from '../shared/errors/errorHandler.js'

export function createApp() {
  const app = express()

  app.use(cors())
  app.use(express.json())

  if (env.CLERK_SECRET_KEY) {
    app.use(clerkMiddleware())
  }

  app.use('/api/health', healthRouter)
  app.use('/api/artists', artistRouter)
  app.use('/api/booking-requests', bookingRequestRouter)
  app.use('/api/tattoos', tattooRouter)
  app.use('/api/admin', adminRouter)
  app.use('/api/artist', artistAdminRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
