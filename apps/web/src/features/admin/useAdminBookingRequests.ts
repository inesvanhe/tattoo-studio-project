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
  const [requestsState, setRequestsState] = useState<AdminBookingRequestsState>({
    status: 'loading',
    requests: [],
  })

  useEffect(() => {
    let isMounted = true

    getAdminBookingRequests()
      .then((response) => {
        if (!isMounted) {
          return
        }

        setRequestsState({
          status: 'success',
          requests: response.data,
        })
      })
      .catch(() => {
        if (!isMounted) {
          return
        }

        setRequestsState({
          status: 'error',
          requests: [],
          error: 'Admin-Anfragen konnten nicht geladen werden. Clerk-Login folgt im naechsten Schritt.',
        })
      })

    return () => {
      isMounted = false
    }
  }, [])

  return requestsState
}

export function useAdminBookingRequest(id: string | undefined) {
  const [requestState, setRequestState] = useState<AdminBookingRequestState>({
    ...(id
      ? { status: 'loading' as const }
      : { status: 'error' as const, error: 'Keine Anfrage-ID gefunden.' }),
  })

  useEffect(() => {
    let isMounted = true

    if (!id) {
      return
    }

    getAdminBookingRequest(id)
      .then((response) => {
        if (!isMounted) {
          return
        }

        setRequestState({
          status: 'success',
          request: response.data,
        })
      })
      .catch(() => {
        if (!isMounted) {
          return
        }

        setRequestState({
          status: 'error',
          error: 'Admin-Anfrage konnte nicht geladen werden. Clerk-Login folgt im naechsten Schritt.',
        })
      })

    return () => {
      isMounted = false
    }
  }, [id])

  return requestState
}
