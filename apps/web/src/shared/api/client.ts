const defaultApiBaseUrl = 'http://localhost:4000'

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? defaultApiBaseUrl

export async function getJson<TResponse>(path: string): Promise<TResponse> {
  const response = await fetch(`${apiBaseUrl}${path}`)

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return response.json() as Promise<TResponse>
}

export async function postJson<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  return response.json() as Promise<TResponse>
}
