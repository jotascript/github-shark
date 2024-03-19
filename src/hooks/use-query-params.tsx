'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useQueryParams(): [
  URLSearchParams,
  (key: string, value: string) => void,
] {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryParams = new URLSearchParams(Array.from(searchParams.entries()))

  const setQueryParams = (key: string, value: string) => {
    queryParams.set(key, value)

    const search = queryParams.toString()
    const query = search ? `?${search}` : ''

    router.push(`${pathname}${query}`)
  }

  return [queryParams, setQueryParams]
}
