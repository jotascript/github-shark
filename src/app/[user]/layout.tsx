import { UserData } from '@/types/user'
import { notFound } from 'next/navigation'

import { api } from '@/lib/api'

import { Page, PageMain } from '@/components/layout/page'
import { FormBite } from '@/components/form-bite'

import { UserCard } from './_components/user-card'

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: { user: string }
}>) {
  const username = params.user
  let userData: UserData

  try {
    const data = await api(`/users/${username}`)
    userData = data as unknown as UserData
  } catch (error) {
    return notFound()
  }

  return (
    <Page className="h-min">
      <PageMain className="w-full flex justify-center flex-col md:flex-row">
        <div className="flex flex-col gap-6">
          <UserCard userData={userData} />
          <FormBite defaultUsername={username} />
        </div>
        <div className="w-full max-w-5xl">{children}</div>
      </PageMain>
    </Page>
  )
}
