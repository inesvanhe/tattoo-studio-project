import type { Request, Response } from 'express'

import type { AdminAuthLocals } from './adminAuth.middleware.js'

export function getAdminMe(_request: Request, response: Response<unknown, AdminAuthLocals>) {
  const adminAuth = response.locals.adminAuth

  if (!adminAuth) {
    response.status(401).json({
      error: {
        message: 'Admin authentication required',
      },
    })
    return
  }

  response.status(200).json({
    data: {
      roles: adminAuth.roles,
      userId: adminAuth.userId,
    },
  })
}
