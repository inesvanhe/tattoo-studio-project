import type { HydratedDocument } from 'mongoose'

import type { TattooWorkDocument } from './tattoo.model.js'
import type { TattooWorkResponse } from './tattoo.schema.js'

export function toTattooWorkResponse(
  tattooWork: HydratedDocument<TattooWorkDocument>,
): TattooWorkResponse {
  return {
    id: tattooWork.id,
    title: tattooWork.title,
    slug: tattooWork.slug,
    artistSlug: tattooWork.artistSlug,
    styles: tattooWork.styles,
    bodyPlacement: tattooWork.bodyPlacement,
    description: tattooWork.description,
    imageUrl: tattooWork.imageUrl,
    isFeatured: tattooWork.isFeatured,
    isPublished: tattooWork.isPublished,
    sortOrder: tattooWork.sortOrder,
  }
}
