import { clerkClient, getAuth } from '@clerk/express'
import type { RequestHandler } from 'express'

import { env } from '../../shared/config/env.js'
import { artistSlugSchema } from '../bookingRequests/bookingRequest.schema.js'

type ClerkPublicMetadata = {
  artistSlug?: unknown
  role?: unknown
  roles?: unknown
}

export type AppRole = 'admin' | 'artist'

export type AdminAuthLocals = {
  adminAuth?: {
    artistSlug: string
    roles: AppRole[]
    userId: string
  }
}

function getRoles(publicMetadata: ClerkPublicMetadata) {
  const roles = new Set<AppRole>()

  if (publicMetadata.role === 'admin' || publicMetadata.role === 'artist') {
    roles.add(publicMetadata.role)
  }

  if (Array.isArray(publicMetadata.roles)) {
    for (const role of publicMetadata.roles) {
      if (role === 'admin' || role === 'artist') {
        roles.add(role)
      }
    }
  }

  return [...roles]
}

function hasRequiredRole(userRoles: AppRole[], allowedRoles: AppRole[]) {
  return allowedRoles.some((role) => userRoles.includes(role))
}

function getAuthenticationErrorMessage(allowedRoles: AppRole[]) {
  if (allowedRoles.includes('admin') && allowedRoles.includes('artist')) {
    return 'Admin or artist role required'
  }

  if (allowedRoles.includes('artist')) {
    return 'Artist role required'
  }

  return 'Admin role required'
}

function requireRole(allowedRoles: AppRole[]): RequestHandler {
  return async (request, response, next) => {
    if (!env.CLERK_SECRET_KEY) {
      response.status(401).json({
        error: {
          message: 'Authentication required',
        },
      })
      return
    }

    const { userId } = getAuth(request)

    if (!userId) {
      response.status(401).json({
        error: {
          message: 'Authentication required',
        },
      })
      return
    }

    try {
      const user = await clerkClient.users.getUser(userId)
      const publicMetadata = user.publicMetadata as ClerkPublicMetadata
      const roles = getRoles(publicMetadata)

      if (!hasRequiredRole(roles, allowedRoles)) {
        response.status(403).json({
          error: {
            message: getAuthenticationErrorMessage(allowedRoles),
          },
        })
        return
      }

      response.locals.adminAuth = {
        artistSlug:
          typeof publicMetadata.artistSlug === 'string'
            ? artistSlugSchema.catch('').parse(publicMetadata.artistSlug.toLowerCase())
            : '',
        roles,
        userId,
      }
    } catch (error) {
      next(error)
      return
    }

    next()
  }
}

export function hasAdminRole(roles: AppRole[]) {
  return roles.includes('admin')
}

export const requireAdminAuth = requireRole(['admin'])
export const requireArtistOrAdminAuth = requireRole(['artist', 'admin'])
