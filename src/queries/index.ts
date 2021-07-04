import axios from 'axios'

const getToken = (): string | null => window.localStorage.getItem('access_token')

export const token = {
  key: 'token',
  query: getToken,
}

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

interface RetrievePlaylistFunctionOutput {
  id: string
  name: string
  tracks: { total: number }
}
type RetrievePlaylistsFunction = (url?: string) => Promise<RetrievePlaylistFunctionOutput[]>

const retrievePlaylists: RetrievePlaylistsFunction = async (
  url = 'https://api.spotify.com/v1/me/playlists?limit=50'
) => {
  const authenticated = token.query()
  const response = await axios({
    headers: {
      Authorization: `Bearer ${authenticated}`,
    },
    method: 'get',
    url,
  })

  const currentItems = response?.data?.items || []

  if (response.data.next && response.data.total > response.data.offset + response.data.limit) {
    return [...currentItems, ...(await retrievePlaylists(response.data.next))]
  }

  return currentItems
}

export const playlists = {
  key: 'playlists',
  query: retrievePlaylists,
}
