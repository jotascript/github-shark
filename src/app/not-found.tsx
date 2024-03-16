'use client'

import { Page, PageMain } from '@/components/layout/page'
import { MainSearchScreen } from '@/components/main-search-screen'
import { useParams } from 'next/navigation'

export default function NotFound() {
  const params = useParams()
  const username = params?.user

  return (
    <Page>
      <PageMain className="flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl md:text-2xl">
            Errou a mordida em
            <span className="font-bold">{` ${username}`}</span>
          </h2>
          <p className="text-xs">O usuário informado não foi encontrado!</p>
        </div>
        <MainSearchScreen defaultUsername={String(username)} />
      </PageMain>
    </Page>
  )
}
