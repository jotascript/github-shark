import { notFound } from 'next/navigation'

import { api } from '@/lib/api'

import { Repo } from '@/types/repo'

import { Page, PageMain } from '@/components/layout/page'

import { RepoDetail } from './_components/repo-detail'

export default async function UserPage({
  params,
}: {
  params: { user: string; repo: string }
}) {
  const username = params.user
  const repoName = params.repo
  let repo: Repo

  try {
    const data = await api(`/repos/${username}/${repoName}`)
    repo = data as unknown as Repo
  } catch (error) {
    return notFound()
  }

  return (
    <Page>
      <PageMain className="w-full flex justify-center flex-col p-0 mt-6 md:mt-0 md:flex-row md:p-0 md:ml-2 md:px-4">
        <RepoDetail username={username} repo={repo} />
      </PageMain>
    </Page>
  )
}
