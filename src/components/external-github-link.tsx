import Link from 'next/link'

import { ExternalLinkIcon } from '@radix-ui/react-icons'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export function ExternalGithubLink({ repoUrl }: { repoUrl: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={repoUrl} target="_blank">
            <ExternalLinkIcon />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ir até a página no Github</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
