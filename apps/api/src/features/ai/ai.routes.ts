import { Router } from 'express'

import { createAiChatHandler } from './ai.controller.js'

export const aiRouter = Router()

aiRouter.post('/chat', createAiChatHandler)
