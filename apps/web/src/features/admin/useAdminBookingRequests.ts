import { useAuth } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'

import {
  type AdminBookingRequest,
  getAdminBookingRequest,
  getAdminBookingRequests,
} from './admin.api'

type AdminBookingRequestsState =
  | { status: 'loading'; requests: AdminBookingRequest[]; error?: undefined }
  | { status: 'success'; requests: AdminBookingRequest[]; error?: undefined }
  | { status: 'error'; requests: AdminBookingRequest[]; error: string }

type AdminBookingRequestState =
  | { status: 'loading'; request?: undefined; error?: undefined }
  | { status: 'success'; request: AdminBookingRequest; error?: undefined }
  | { status: 'error'; request?: undefined; error: string }

export function useAdminBookingRequests() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [requestsState, setRequestsState] = useState<AdminBookingRequestsState>({
    status: 'loading',
    requests: [],
  })

  useEffect(() => {
    let isMounted = true

    if (!isLoaded || !isSignedIn) {
      return
    }

    getToken()
      .then((token) => {
        if (!token) {
          throw new Error('Missing Clerk token')
        }

        return getAdminBookingRequests(token)
      })
      .then((response) => {
        if (!isMounted) {
          return
        }

        setRequestsState({
          status: 'success',
          requests: response.data,
        })
      })
      .catch((error: Error) => {
        if (!isMounted) {
          return
        }

        setRequestsState({
          status: 'error',
          requests: [],
          error: getAdminErrorMessage(error, 'Admin-Anfragen konnten nicht geladen werden.'),
        })
      })

    return () => {
      isMounted = false
    }
  }, [getToken, isLoaded, isSignedIn])

  if (isLoaded && !isSignedIn) {
    return {
      status: 'error',
      requests: [],
      error: 'Bitte melde dich an, um Admin-Anfragen zu laden.',
    } satisfies AdminBookingRequestsState
  }

  return requestsState
}

export function useAdminBookingRequest(id: string | undefined) {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [requestState, setRequestState] = useState<AdminBookingRequestState>({
    ...(id
      ? { status: 'loading' as const }
      : { status: 'error' as const, error: 'Keine Anfrage-ID gefunden.' }),
  })

  useEffect(() => {
    let isMounted = true

    if (!isLoaded) {
      return
    }

    if (!id || !isLoaded || !isSignedIn) {
      return
    }

    getToken()
      .then((token) => {
        if (!token) {
          throw new Error('Missing Clerk token')
        }

        return getAdminBookingRequest(id, token)
      })
      .then((response) => {
        if (!isMounted) {
          return
        }

        setRequestState({
          status: 'success',
          request: response.data,
        })
      })
      .catch((error: Error) => {
        if (!isMounted) {
          return
        }

        setRequestState({
          status: 'error',
          error: getAdminErrorMessage(error, 'Admin-Anfrage konnte nicht geladen werden.'),
        })
      })

    return () => {
      isMounted = false
    }
  }, [getToken, id, isLoaded, isSignedIn])

  if (isLoaded && !isSignedIn) {
    return {
      status: 'error',
      error: 'Bitte melde dich an, um diese Anfrage zu laden.',
    } satisfies AdminBookingRequestState
  }

  return requestState
}

function getAdminErrorMessage(error: Error, fallback: string) {
  if (error.message === 'Admin role required') {
    return 'Dein Clerk-User hat noch keine Admin-Rolle.'
  }

  if (error.message === 'Admin authentication required') {
    return 'Bitte melde dich an, um Admin-Anfragen zu laden.'
  }

  return fallback
}
