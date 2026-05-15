import { Router } from 'express'
import multer from 'multer'

import { createBookingRequestHandler } from './bookingRequest.controller.js'
import {
  maxReferenceImageSize,
  maxReferenceImages,
} from './referenceImages/referenceImageUpload.js'

export const bookingRequestRouter = Router()

const upload = multer({
  limits: {
    fileSize: maxReferenceImageSize,
    files: maxReferenceImages,
  },
  storage: multer.memoryStorage(),
})

bookingRequestRouter.post('/', upload.array('referenceImages', maxReferenceImages), createBookingRequestHandler)
