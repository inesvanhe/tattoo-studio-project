import { useEffect, useState } from 'react'

import { getTattooWorks, type TattooWork } from './tattoos.api'

type TattooWorksState =
  | { status: 'loading'; works: TattooWork[]; error?: undefined }
  | { status: 'success'; works: TattooWork[]; error?: undefined }
  | { status: 'error'; works: TattooWork[]; error: string }

export function useTattooWorks() {
  const [tattooWorksState, setTattooWorksState] = useState<TattooWorksState>({
    status: 'loading',
    works: [],
  })

  useEffect(() => {
    let isMounted = true

    getTattooWorks()
      .then((response) => {
        if (!isMounted) {
          return
        }

        setTattooWorksState({
          status: 'success',
          works: response.data,
        })
      })
      .catch(() => {
        if (!isMounted) {
          return
        }

        setTattooWorksState({
          status: 'error',
          works: [],
          error: 'Portfolio konnte gerade nicht geladen werden.',
        })
      })

    return () => {
      isMounted = false
    }
  }, [])

  return tattooWorksState
}
