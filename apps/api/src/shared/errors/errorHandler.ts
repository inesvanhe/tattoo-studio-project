import type { ErrorRequestHandler } from 'express'
import multer from 'multer'
import { ZodError } from 'zod'

import { ReferenceImageUploadError } from '../../features/bookingRequests/referenceImages/referenceImageUpload.js'

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof multer.MulterError) {
    const message =
      error.code === 'LIMIT_FILE_SIZE'
        ? 'Ein Bild darf maximal 5 MB groß sein.'
        : 'Du kannst maximal 5 Referenzbilder hochladen.'

    response.status(400).json({
      error: {
        message,
      },
    })
    return
  }

  if (error instanceof ReferenceImageUploadError) {
    response.status(error.statusCode).json({
      error: {
        message: error.message,
      },
    })
    return
  }

  if (error instanceof ZodError) {
    response.status(400).json({
      error: {
        message: 'Validation failed',
        issues: error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      },
    })
    return
  }

  console.error(error)

  response.status(500).json({
    error: {
      message: 'Internal server error',
    },
  })
}
