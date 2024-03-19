const URL_BASE = 'https://api.github.com'

type StatusErro = {
  [key: number]: { name: string; message: string }
}

const statusErrors: StatusErro = {
  403: {
    name: 'FORBIDDEN',
    message: 'Limite máximo de requisições atingidas!',
  },
  404: {
    name: 'NOT_FOUND',
    message: 'Não encontrado!',
  },
}

export async function api(
  endpoint: string,
  options?: RequestInit,
  localApi?: boolean,
) {
  const response = await fetch(
    `${localApi ? '/api' : URL_BASE}${endpoint}`,
    options,
  )

  if (response.ok && response.status === 200) {
    const data = (await response.json()) as Response
    return data
  }

  const error = new Error()

  if (statusErrors[response.status as keyof null]) {
    const statusError = statusErrors[response.status as keyof null]
    error.name = statusError.name
    error.message = statusError.message
    throw error
  }

  error.message = 'Ocorreu um erro inexperado, tente novamente!'
  throw error
}
