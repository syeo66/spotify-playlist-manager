const getToken = (): string | null => window.localStorage.getItem('access_token')

export const token = {
  key: 'token',
  query: getToken,
}
