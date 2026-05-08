import { TattooWorkModel } from './tattoo.model.js'
import { toTattooWorkResponse } from './tattoo.mapper.js'
import type { TattooQuery } from './tattoo.schema.js'

export async function getPublishedTattooWorks(query: TattooQuery) {
  const filters: Record<string, unknown> = {
    isPublished: true,
  }

  if (query.artist) {
    filters.artistSlug = query.artist
  }

  if (query.style) {
    filters.styles = query.style
  }

  const tattooWorks = await TattooWorkModel.find(filters).sort({
    isFeatured: -1,
    sortOrder: 1,
    title: 1,
  })

  return tattooWorks.map(toTattooWorkResponse)
}
