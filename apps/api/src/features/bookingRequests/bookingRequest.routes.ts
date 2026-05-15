import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import multer from 'multer'

import { createBookingRequestHandler } from './bookingRequest.controller.js'
import {
  maxReferenceImageSize,
  maxReferenceImages,
} from './referenceImages/referenceImageUpload.js'

export const bookingRequestRouter = Router()

const bookingRequestRateLimit = rateLimit({
  legacyHeaders: false,
  limit: 10,
  message: {
    error: {
      message: 'Zu viele Anfragen. Bitte versuche es später erneut.',
    },
  },
  standardHeaders: true,
  windowMs: 15 * 60 * 1000,
})

const upload = multer({
  limits: {
    fileSize: maxReferenceImageSize,
    files: maxReferenceImages,
  },
  storage: multer.memoryStorage(),
})

bookingRequestRouter.post(
  '/',
  bookingRequestRateLimit,
  upload.array('referenceImages', maxReferenceImages),
  createBookingRequestHandler,
)
