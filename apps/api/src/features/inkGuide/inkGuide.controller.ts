import type { Request, Response } from 'express'

import { inkGuideRequestSchema, inkGuideResponseSchema } from './inkGuide.schema.js'
import { createInkGuideResponse } from './inkGuide.service.js'

export function createInkGuideAnswerHandler(request: Request, response: Response) {
  const input = inkGuideRequestSchema.parse(request.body)
  const inkGuideResponse = createInkGuideResponse(input)

  response.status(200).json({
    data: inkGuideResponseSchema.parse(inkGuideResponse),
  })
}
