import axios from 'axios'

import { token } from '.'

interface RetrieveTracksOverviewOutput {
  href: string
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}
type RetrieveTracksOverviewType = () => Promise<RetrieveTracksOverviewOutput>

const retrieveTracksOverview: RetrieveTracksOverviewType = async () => {
  const url = 'https://api.spotify.com/v1/me/tracks?limit=1'
  const authenticated = token.query()
  const response = await axios({
    headers: {
      Authorization: `Bearer ${authenticated}`,
    },
    method: 'get',
    url,
  })
  return response.data
}

export const libraryOverview = {
  key: 'libraryOverview',
  query: retrieveTracksOverview,
}
