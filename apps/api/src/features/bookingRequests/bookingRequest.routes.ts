import { Router } from 'express'

import { createBookingRequestHandler } from './bookingRequest.controller.js'

export const bookingRequestRouter = Router()

bookingRequestRouter.post('/', createBookingRequestHandler)
