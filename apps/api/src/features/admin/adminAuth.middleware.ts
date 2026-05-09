import { clerkClient, getAuth } from '@clerk/express'
import type { RequestHandler } from 'express'

import { env } from '../../shared/config/env.js'

type ClerkPublicMetadata = {
  role?: unknown
  roles?: unknown
}

function hasAdminRole(publicMetadata: ClerkPublicMetadata) {
  if (publicMetadata.role === 'admin') {
    return true
  }

  if (Array.isArray(publicMetadata.roles)) {
    return publicMetadata.roles.includes('admin')
  }

  return false
}

export const requireAdminAuth: RequestHandler = async (request, response, next) => {
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

  try {
    const user = await clerkClient.users.getUser(userId)
    const publicMetadata = user.publicMetadata as ClerkPublicMetadata

    if (!hasAdminRole(publicMetadata)) {
      response.status(403).json({
        error: {
          message: 'Admin role required',
        },
      })
      return
    }

    response.locals.adminAuth = {
      role: 'admin',
      userId,
    }
  } catch (error) {
    next(error)
    return
  }

  next()
}
