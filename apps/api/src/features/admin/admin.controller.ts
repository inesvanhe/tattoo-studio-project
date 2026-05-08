import type { Request, Response } from 'express'

type AdminAuthLocals = {
  adminAuth?: {
    userId: string
  }
}

export function getAdminMe(_request: Request, response: Response<unknown, AdminAuthLocals>) {
  const userId = response.locals.adminAuth?.userId

  if (!userId) {
    response.status(401).json({
      error: {
        message: 'Admin authentication required',
      },
    })
    return
  }

  response.status(200).json({
    data: {
      userId,
    },
  })
}
