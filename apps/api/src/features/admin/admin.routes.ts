import { Router } from 'express'

import { requireAdminAuth } from './adminAuth.middleware.js'
import { getAdminMe } from './admin.controller.js'

export const adminRouter = Router()

adminRouter.get('/me', requireAdminAuth, getAdminMe)
