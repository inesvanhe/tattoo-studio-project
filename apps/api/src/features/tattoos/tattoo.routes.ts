import { Router } from 'express'

import { listTattooWorks } from './tattoo.controller.js'

export const tattooRouter = Router()

tattooRouter.get('/', listTattooWorks)
