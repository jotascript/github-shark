'use client'

import { api } from '@/lib/api'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

type UseFetchOptions = {
  fetchOptions?: RequestInit
  localApi?: boolean
  manualFetch?: boolean
  watchQueryParams?: string[]
}

function getQueryParams(searchParams: URLSearchParams, keyParams: string[]) {
  const newSearchParams = new URLSearchParams()

  keyParams.forEach((key) => {
    if (searchParams.has(key))
      newSearchParams.set(key, searchParams.get(key) || '')
  })

  if (newSearchParams.size) return `?${newSearchParams.toString()}`

  return ''
}

export function useFetch<T>(endpoint: string, options?: UseFetchOptions) {
  const searchParams = useSearchParams()
  const { fetchOptions, localApi, manualFetch, watchQueryParams } =
    options || {}
  const [data, setData] = useState<T | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!manualFetch && !watchQueryParams) doFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (watchQueryParams) doFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  async function doFetch() {
    setIsFetching(true)
    setData(null)
    setError(null)

    try {
      if (watchQueryParams) {
        endpoint = `${endpoint}${getQueryParams(searchParams, watchQueryParams)}`
      }

      const data = await api(endpoint, fetchOptions, localApi)
      setData(data as T)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error?.message)
      setError(error?.message)
    } finally {
      setIsFetching(false)
    }
  }

  return { data, isFetching, doFetch, error }
}
