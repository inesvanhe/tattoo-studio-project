import { getJson } from '../../shared/api/client'

export type TattooWork = {
  id: string
  title: string
  slug: string
  artistSlug: string
  styles: string[]
  bodyPlacement: string
  description: string
  imageUrl: string
  isFeatured: boolean
  isPublished: boolean
  sortOrder: number
}

type TattooWorksResponse = {
  data: TattooWork[]
}

export function getTattooWorks() {
  return getJson<TattooWorksResponse>('/api/tattoos')
}
