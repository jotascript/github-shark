'use client'

import { useEffect, useState } from 'react'
// import { notFound } from 'next/navigation'

import { api } from '@/lib/api'

import { Repo } from '@/types/repo'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CodeIcon, ExternalLinkIcon, StarIcon } from '@radix-ui/react-icons'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ListReposSkeleton } from './list-repos-skeleton'

let sentiCount = 0
let maxSentiPage = 1

export function ListRepos({ username }: { username: string }) {
  const [repos, setRepos] = useState<Repo[]>([])
  // const [starAsc, setStarAsc] = useState<boolean>(true) // true = ASC , false = DESC

  async function getRepos(page: number) {
    try {
      const data = await api(
        `/users/${username}/repos?per_page=10&page=${page}`,
      )
      const newRepos = data as unknown as Repo[]

      if (newRepos.length > 0) {
        sentiCount = page + 1
        maxSentiPage = sentiCount
        setRepos((prevRepos) => [...prevRepos, ...newRepos])
      } else {
        maxSentiPage = page
      }
    } catch (error) {}
  }

  useEffect(() => {
    sentiCount = 0
    maxSentiPage = 1

    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (sentiCount <= maxSentiPage) {
          getRepos(sentiCount + 1)
        }
      }
    })

    intersectionObserver.observe(document.querySelector('#sentinel') as Element)

    return () => intersectionObserver.disconnect()
  }, [])

  // let repos: Repo[]
  // try {
  //   const data = await api(`/users/${username}/repos?per_page=10`)
  //   repos = data as unknown as Repo[]

  //   if (repos.length <= 0) return notFound()
  // } catch (error) {
  //   return notFound()
  // }

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
                className="flex flex-col gap-2 border-t py-2"
              >
                <div className="font-bold flex gap-1 justify-between items-center">
                  <Link
                    href={`/${username}/${repo.name}`}
                    className="hover:text-muted-foreground"
                  >
                    {repo.name}
                  </Link>
                  <Link href={repo.html_url} target="_blank">
                    <ExternalLinkIcon />
                  </Link>
                </div>
                <div className="text-sm">{repo.description}</div>
                <div className="flex items-center gap-4">
                  <Badge className="text-xs rounded-2xl">
                    <StarIcon className="mr-2" /> {repo.stargazers_count}
                  </Badge>
                  {!!repo.language && (
                    <Badge className="text-xs rounded-2xl bg-muted text-primary hover:text-secondary">
                      <CodeIcon className="mr-2" /> {repo.language}
                    </Badge>
                  )}
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
