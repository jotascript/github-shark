'use client'

import { useEffect, useState } from 'react'

import { getRepoReadmeMD, markdownToHtml } from '@/lib/markdown'

import './markdown-formatted.css'

type Props = {
  fullname: string
}

export function RepoReadme({ fullname }: Props) {
  const [readme, setReadme] = useState('Carregando...')

  useEffect(() => {
    getReadme()
  }, [])

  async function getReadme() {
    const { success, content } = await getRepoReadmeMD(fullname)

    if (success && content) {
      const readmeHtml = await markdownToHtml(content)
      setReadme(readmeHtml)
    } else {
      setReadme('')
    }
  }

  if (readme === '')
    return (
      <div className="text-destructive">
        Este repositório não possui README.md
      </div>
    )

  return (
    <div
      id="readme-md"
      className="border-t mt-2 py-4"
      dangerouslySetInnerHTML={{ __html: readme }}
    />
  )
}
