import { Page, PageMain } from '@/components/layout/page'

import { ListRepos } from './_components/list-repos'

export default async function UserPage({
  params,
}: {
  params: { user: string }
}) {
  const username = params.user

  return (
    <Page>
      <PageMain className="w-full flex justify-center flex-col p-0 mt-6 md:mt-0 md:flex-row md:p-0 md:ml-2 md:px-4">
        <ListRepos username={username} />
      </PageMain>
    </Page>
  )
}
