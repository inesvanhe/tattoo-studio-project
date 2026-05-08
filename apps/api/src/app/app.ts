import cors from 'cors'
import express from 'express'

import { artistRouter } from '../features/artists/artist.routes.js'
import { healthRouter } from '../features/health/health.routes.js'
import { tattooRouter } from '../features/tattoos/tattoo.routes.js'
import { notFoundHandler } from '../shared/errors/notFoundHandler.js'
import { errorHandler } from '../shared/errors/errorHandler.js'

export function createApp() {
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.use('/api/health', healthRouter)
  app.use('/api/artists', artistRouter)
  app.use('/api/tattoos', tattooRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
