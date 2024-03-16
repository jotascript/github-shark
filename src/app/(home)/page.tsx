import { Page, PageMain } from '@/components/layout/page'
import { MainSearchScreen } from '@/components/main-search-screen'

export default function Home() {
  return (
    <Page>
      <PageMain>
        <MainSearchScreen />
      </PageMain>
    </Page>
  )
}
