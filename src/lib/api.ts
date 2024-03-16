const URL_BASE = 'https://api.github.com'

export async function api(endpoint: string, options?: RequestInit) {
  const response = await fetch(`${URL_BASE}${endpoint}`, options)

  if (response.ok && response.status === 200) {
    const data = (await response.json()) as Response
    return data
  }

  const error = new Error()

  if (response.status === 404) {
    error.name = 'NOT_FOUND'
    error.message = 'usuario não encontrado'
    throw error
  }

  error.message = 'Ocorreu um erro inexperado, tente novamente!'
  throw error
}
