import Link from 'next/link'

import { Repo } from '@/types/repo'

import { CodeIcon, ResetIcon, StarIcon } from '@radix-ui/react-icons'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { RepoReadme } from './repo-readme'
import { ExternalGithubLink } from '@/components/external-github-link'

type Props = {
  username: string
  repo: Repo
}

export async function RepoDetail({ username, repo }: Props) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-4 font-bold text-xl">
        <div className="font-bold flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Link
              href={`/${username}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary"
            >
              <ResetIcon /> {username} /
            </Link>
            <div>{repo.name}</div>
          </span>
          <ExternalGithubLink repoUrl={repo.html_url} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="text-sm">{repo.description}</div>
        <div className="flex items-center gap-4">
          <Badge className="text-xs rounded-2xl">
            <StarIcon className="mr-2" /> {repo.stargazers_count}
          </Badge>
          {!!repo.language && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="text-xs rounded-2xl bg-muted text-primary hover:text-secondary cursor-pointer">
                    <CodeIcon className="mr-2" /> {repo.language}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Linguagem marjoritária</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="mt-6">
          <div className="font-bold text-xs text-muted-foreground">
            README.md
          </div>
          <RepoReadme fullname={repo.full_name} />
        </div>
      </CardContent>
    </Card>
  )
}
