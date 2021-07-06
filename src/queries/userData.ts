import axios from 'axios'

import { token } from './token'

interface RetrieveUserOutput {
  images?: Array<{
    url?: string
  }>
}
const retrieveUserData = async (): Promise<RetrieveUserOutput> => {
  const authenticated = token.query()

  const response = await axios({
    headers: {
      Authorization: `Bearer ${authenticated}`,
    },
    method: 'get',
    url: 'https://api.spotify.com/v1/me',
  })

  return response.data
}

export const userData = {
  key: 'userData',
  query: retrieveUserData,
}
