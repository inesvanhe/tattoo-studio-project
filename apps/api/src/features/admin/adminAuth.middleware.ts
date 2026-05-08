import { getAuth } from '@clerk/express'
import type { RequestHandler } from 'express'

import { env } from '../../shared/config/env.js'

export const requireAdminAuth: RequestHandler = (request, response, next) => {
  if (!env.CLERK_SECRET_KEY) {
    response.status(401).json({
      error: {
        message: 'Admin authentication required',
      },
    })
    return
  }

  const { userId } = getAuth(request)

  if (!userId) {
    response.status(401).json({
      error: {
        message: 'Admin authentication required',
      },
    })
    return
  }

  response.locals.adminAuth = {
    userId,
  }

  next()
}
