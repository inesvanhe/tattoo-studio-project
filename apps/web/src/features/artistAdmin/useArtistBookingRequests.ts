import { useAuth } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'

import type { AdminBookingRequest } from '../admin/admin.api'
import { getArtistBookingRequests } from './artistAdmin.api'

type ArtistBookingRequestsState =
  | { status: 'loading'; requests: AdminBookingRequest[]; error?: undefined }
  | { status: 'success'; requests: AdminBookingRequest[]; error?: undefined }
  | { status: 'error'; requests: AdminBookingRequest[]; error: string }

export function useArtistBookingRequests() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [requestsState, setRequestsState] = useState<ArtistBookingRequestsState>({
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

        return getArtistBookingRequests(token)
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
          error: getArtistErrorMessage(error),
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
      error: 'Bitte melde dich an, um Artist-Anfragen zu laden.',
    } satisfies ArtistBookingRequestsState
  }

  return requestsState
}

function getArtistErrorMessage(error: Error) {
  if (error.message === 'Artist slug required') {
    return 'Dein Clerk-User ist noch keinem Artist-Profil zugeordnet.'
  }

  if (error.message === 'Artist role required' || error.message === 'Admin or artist role required') {
    return 'Dein Clerk-User hat noch keine Artist-Rolle.'
  }

  if (error.message === 'Authentication required') {
    return 'Bitte melde dich an, um Artist-Anfragen zu laden.'
  }

  return 'Artist-Anfragen konnten nicht geladen werden.'
}
