import { getJson } from '../../shared/api/client'

export type Artist = {
  id: string
  name: string
  slug: string
  title: string
  bio: string
  styles: string[]
  profileImageUrl: string
  isActive: boolean
  sortOrder: number
}

type ArtistsResponse = {
  data: Artist[]
}

export function getArtists() {
  return getJson<ArtistsResponse>('/api/artists')
}
