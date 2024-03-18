'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { ExternalLinkIcon, StarIcon } from '@radix-ui/react-icons'

import { api } from '@/lib/api'

import { Repo } from '@/types/repo'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { ListReposSkeleton } from './list-repos-skeleton'

let sentiCount = 0
let maxSentiPage = false

export function ListRepos({ username }: { username: string }) {
  const [repos, setRepos] = useState<Repo[]>([])
  // const [starAsc, setStarAsc] = useState<boolean>(true) // true = ASC , false = DESC

  async function getRepos(page: number) {
    try {
      const data = await api(
        `/users/${username}/repos?per_page=25&page=${page}`,
      )
      const newRepos = data as unknown as Repo[]

      if (newRepos.length > 0) {
        sentiCount = page
        setRepos((prevRepos) => [...prevRepos, ...newRepos])
      } else {
        maxSentiPage = true
      }
    } catch (error) {}
  }

  useEffect(() => {
    sentiCount = 0
    maxSentiPage = false

    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (!maxSentiPage) {
          getRepos(sentiCount + 1)
        }
      }
    })

    intersectionObserver.observe(document.querySelector('#sentinel') as Element)

    return () => intersectionObserver.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-4 font-bold text-xl">
        Repositórios
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {repos.length > 0 ? (
          <ul>
            {repos.map((repo) => (
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
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={repo.html_url} target="_blank">
                            <ExternalLinkIcon />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Ir até a página no Github</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Badge className="text-xs rounded-2xl">
                    <StarIcon className="mr-2" /> {repo.stargazers_count}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <ListReposSkeleton />
        )}
        <div id="sentinel"></div>
      </CardContent>
    </Card>
  )
}
