import { z } from 'zod'

export const inkGuideRequestSchema = z.object({
  message: z.string().trim().min(1).max(1200),
})

export const inkGuideResponseSchema = z.object({
  reply: z.string(),
  suggestions: z.array(z.string()),
})

export type InkGuideRequest = z.infer<typeof inkGuideRequestSchema>
export type InkGuideResponse = z.infer<typeof inkGuideResponseSchema>
