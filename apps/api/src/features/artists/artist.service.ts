import { ArtistModel } from './artist.model.js'
import { toArtistResponse } from './artist.mapper.js'

export async function getActiveArtists() {
  const artists = await ArtistModel.find({ isActive: true }).sort({ sortOrder: 1, name: 1 })

  return artists.map(toArtistResponse)
}
