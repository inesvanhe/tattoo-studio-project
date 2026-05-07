import { z } from 'zod'

export const artistResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  title: z.string(),
  bio: z.string(),
  styles: z.array(z.string()),
  profileImageUrl: z.string(),
  isActive: z.boolean(),
  sortOrder: z.number(),
})

export type ArtistResponse = z.infer<typeof artistResponseSchema>
