import { Router } from 'express'

import { createInkGuideAnswerHandler } from './inkGuide.controller.js'

export const inkGuideRouter = Router()

inkGuideRouter.post('/answer', createInkGuideAnswerHandler)
