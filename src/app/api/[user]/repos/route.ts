import { api } from '@/lib/api'
import { Repo } from '@/types/repo'
import { type NextRequest } from 'next/server'

type Params = {
  params: { user: string }
}

const PER_PAGE = 100 // max: 100

async function getUserRepos(username: string, page: number): Promise<Repo[]> {
  const data = await api(
    `/users/${username}/repos?per_page=${PER_PAGE}&page=${page}`,
  )

  return data as unknown as Repo[]
}

async function getAllRepos(username: string, page: number): Promise<Repo[]> {
  let repos: Repo[] = []
  const data = await getUserRepos(username, page)

  repos = data

  if (data.length === PER_PAGE)
    return repos.concat(await getAllRepos(username, page + 1))

  return repos
}

const sortRepos = (orderBystar: string) => (repoA: Repo, repoB: Repo) => {
  const [a, b] = orderBystar === 'desc' ? [repoB, repoA] : [repoA, repoB]

  if (a.stargazers_count > b.stargazers_count) return 1

  if (a.stargazers_count < b.stargazers_count) return -1

  return 0
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const orderBystar = request.nextUrl.searchParams.get('orderByStar') || 'asc'
    const username = params.user
    const repos: Repo[] = await getAllRepos(username, 1)

    return Response.json(repos.sort(sortRepos(orderBystar)))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Response.json(
      { success: false, message: error?.message },
      { status: 403 },
    )
  }
}
