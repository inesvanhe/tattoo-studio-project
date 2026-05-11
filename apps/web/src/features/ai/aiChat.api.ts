import { postJson } from '../../shared/api/client'

type AiChatRequest = {
  message: string
}

export type AiChatResponse = {
  reply: string
  suggestions: string[]
}

type AiChatApiResponse = {
  data: AiChatResponse
}

export function sendAiChatMessage(message: string) {
  return postJson<AiChatApiResponse, AiChatRequest>('/api/ai/chat', { message })
}
