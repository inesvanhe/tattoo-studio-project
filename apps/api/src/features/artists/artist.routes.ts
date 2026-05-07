import { Router } from 'express'

import { listArtists } from './artist.controller.js'

export const artistRouter = Router()

artistRouter.get('/', listArtists)
