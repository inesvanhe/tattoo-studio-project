import type { HydratedDocument } from 'mongoose'

import type { ArtistDocument } from './artist.model.js'
import type { ArtistResponse } from './artist.schema.js'

export function toArtistResponse(artist: HydratedDocument<ArtistDocument>): ArtistResponse {
  return {
    id: artist.id,
    name: artist.name,
    slug: artist.slug,
    title: artist.title,
    bio: artist.bio,
    styles: artist.styles,
    profileImageUrl: artist.profileImageUrl,
    isActive: artist.isActive,
    sortOrder: artist.sortOrder,
  }
}
