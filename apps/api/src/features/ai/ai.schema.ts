import { z } from 'zod'

export const aiChatRequestSchema = z.object({
  message: z.string().trim().min(1).max(1200),
})

export const aiChatResponseSchema = z.object({
  reply: z.string(),
  suggestions: z.array(z.string()),
})

export type AiChatRequest = z.infer<typeof aiChatRequestSchema>
export type AiChatResponse = z.infer<typeof aiChatResponseSchema>
