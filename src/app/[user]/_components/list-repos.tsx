'use client'
import Link from 'next/link'

import {
  ArrowBottomRightIcon,
  ArrowTopRightIcon,
  StarIcon,
} from '@radix-ui/react-icons'

import { Repo } from '@/types/repo'

import { useFetch } from '@/hooks/use-fetch'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { ExternalGithubLink } from '@/components/external-github-link'

import { ListReposSkeleton } from './list-repos-skeleton'
import { Button } from '@/components/ui/button'
import { useQueryParams } from '@/hooks/use-query-params'

export function ListRepos({ username }: { username: string }) {
  const [queryParams, setQueryParams] = useQueryParams()
  const {
    data: repos,
    isFetching,
    error,
  } = useFetch<Repo[]>(`/${username}/repos`, {
    localApi: true,
    watchQueryParams: ['orderByStar'],
  })

  const handleRepoOrder = () => {
    const orderByStar = queryParams.get('orderByStar')
    if (orderByStar === 'desc') setQueryParams('orderByStar', 'asc')
    else setQueryParams('orderByStar', 'desc')
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="font-bold text-xl">
          Repositórios {!!repos && !isFetching && `(${repos.length})`}
        </CardTitle>
        <Button variant="outline" className="gap-2" onClick={handleRepoOrder}>
          <StarIcon />
          {queryParams.get('orderByStar') === 'desc' ? (
            <ArrowBottomRightIcon />
          ) : (
            <ArrowTopRightIcon />
          )}
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {isFetching ? (
          <ListReposSkeleton />
        ) : (
          <ul>
            {repos?.map((repo) => (
              <li
                key={repo.full_name}
                className="flex flex-col gap-2 border-t py-4 mb-2"
              >
                <div className="font-bold flex gap-4 justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <Link
                      href={`/${username}/${repo.name}`}
                      className="hover:text-muted-foreground"
                    >
                      {repo.name}
                    </Link>
                    <ExternalGithubLink repoUrl={repo.html_url} />
                  </div>
                  <Badge className="text-xs rounded-2xl">
                    <StarIcon className="mr-2" /> {repo.stargazers_count}
                  </Badge>
                </div>
              </li>
            ))}
            {!!error && <li>{error}</li>}
          </ul>
        )}
        <div id="sentinel"></div>
      </CardContent>
    </Card>
  )
}
