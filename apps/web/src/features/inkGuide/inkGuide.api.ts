import { postJson } from '../../shared/api/client'

type InkGuideRequest = {
  message: string
}

export type InkGuideResponse = {
  reply: string
  suggestions: string[]
}

type InkGuideApiResponse = {
  data: InkGuideResponse
}

export function getInkGuideAnswer(message: string) {
  return postJson<InkGuideApiResponse, InkGuideRequest>('/api/ink-guide/answer', { message })
}
