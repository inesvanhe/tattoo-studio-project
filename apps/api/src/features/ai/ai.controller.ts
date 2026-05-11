import type { Request, Response } from 'express'

import { aiChatRequestSchema, aiChatResponseSchema } from './ai.schema.js'
import { createMockAiChatResponse } from './ai.service.js'

export function createAiChatHandler(request: Request, response: Response) {
  const input = aiChatRequestSchema.parse(request.body)
  const aiResponse = createMockAiChatResponse(input)

  response.status(200).json({
    data: aiChatResponseSchema.parse(aiResponse),
  })
}
