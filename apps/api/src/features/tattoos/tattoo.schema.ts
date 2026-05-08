import { z } from 'zod'

const optionalQueryStringSchema = z
  .union([z.string().trim().min(1), z.array(z.string().trim().min(1))])
  .optional()
  .transform((value) => (Array.isArray(value) ? value[0] : value))

export const tattooQuerySchema = z.object({
  artist: optionalQueryStringSchema,
  style: optionalQueryStringSchema,
})

export const tattooWorkResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  artistSlug: z.string(),
  styles: z.array(z.string()),
  bodyPlacement: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
  sortOrder: z.number(),
})

export type TattooQuery = z.infer<typeof tattooQuerySchema>
export type TattooWorkResponse = z.infer<typeof tattooWorkResponseSchema>
