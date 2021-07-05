import axios from 'axios'

import { token } from '.'

interface RetrievePlaylistFunctionOutput {
  id: string
  name: string
  tracks: { total: number; href: string }
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
