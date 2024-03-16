import { Page, PageMain } from '@/components/layout/page'

export default function NotFound() {
  return (
    <Page>
      <PageMain className="flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl">Nenhum repositório foi encontrado!</h2>
        </div>
      </PageMain>
    </Page>
  )
}
