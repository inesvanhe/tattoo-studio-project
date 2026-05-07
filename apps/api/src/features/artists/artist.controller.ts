import type { Request, Response } from 'express'

import { artistResponseSchema } from './artist.schema.js'
import { getActiveArtists } from './artist.service.js'

export async function listArtists(_request: Request, response: Response) {
  const artists = await getActiveArtists()

  response.status(200).json({
    data: artistResponseSchema.array().parse(artists),
  })
}
