import type { Request, Response } from 'express'

import { tattooQuerySchema, tattooWorkResponseSchema } from './tattoo.schema.js'
import { getPublishedTattooWorks } from './tattoo.service.js'

export async function listTattooWorks(request: Request, response: Response) {
  const query = tattooQuerySchema.parse(request.query)
  const tattooWorks = await getPublishedTattooWorks(query)

  response.status(200).json({
    data: tattooWorkResponseSchema.array().parse(tattooWorks),
  })
}
