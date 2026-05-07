import cors from 'cors'
import express from 'express'

import { healthRouter } from '../features/health/health.routes.js'
import { notFoundHandler } from '../shared/errors/notFoundHandler.js'
import { errorHandler } from '../shared/errors/errorHandler.js'

export function createApp() {
  const app = express()

  app.use(cors())
  app.use(express.json())

  app.use('/api/health', healthRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
