import matter from 'gray-matter'
import markdownIt from 'markdown-it'

const RAW_URL_README_MK = 'https://raw.githubusercontent.com'

export async function getRepoReadmeMD(path: string) {
  try {
    const response = await fetch(`${RAW_URL_README_MK}/${path}/main/README.md`)

    if (response.ok) {
      const markdownRawContent = await response.text()
      const { content } = matter(markdownRawContent)

      return { success: true, status: 200, content }
    }

    return { success: false, status: response.status }
  } catch (error) {
    console.log('GET MARKDOWN ERROR -> ', error)
    return { success: false, status: 500 }
  }
}

export async function markdownToHtml(markdown: string) {
  const md = markdownIt({ html: true })
  return md.render(markdown)
}
