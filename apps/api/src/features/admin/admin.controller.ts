import type { Request, Response } from 'express'

type AdminAuthLocals = {
  adminAuth?: {
    role: 'admin'
    userId: string
  }
}

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
      role: adminAuth.role,
      userId: adminAuth.userId,
    },
  })
}
