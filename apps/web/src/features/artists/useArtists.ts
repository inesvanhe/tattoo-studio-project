import { useEffect, useState } from 'react'

import { type Artist, getArtists } from './artists.api'

type ArtistsState =
  | { status: 'loading'; artists: Artist[]; error?: undefined }
  | { status: 'success'; artists: Artist[]; error?: undefined }
  | { status: 'error'; artists: Artist[]; error: string }

export function useArtists() {
  const [artistsState, setArtistsState] = useState<ArtistsState>({
    status: 'loading',
    artists: [],
  })

  useEffect(() => {
    let isMounted = true

    getArtists()
      .then((response) => {
        if (!isMounted) {
          return
        }

        setArtistsState({
          status: 'success',
          artists: response.data,
        })
      })
      .catch(() => {
        if (!isMounted) {
          return
        }

        setArtistsState({
          status: 'error',
          artists: [],
          error: 'Artists konnten gerade nicht geladen werden.',
        })
      })

    return () => {
      isMounted = false
    }
  }, [])

  return artistsState
}
