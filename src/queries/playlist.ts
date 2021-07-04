import axios from 'axios'

import { token } from '.'

interface Playlist {
  id?: string
  name?: string
  owner?: { display_name: string }
  public?: boolean
  tracks: { href: string; total?: number }
}

const retrievePlaylist: (id: string) => Promise<Playlist> = async (id: string) => {
  const url =
    id === 'tracks' ? 'https://api.spotify.com/v1/me/tracks?limit=50' : `https://api.spotify.com/v1/playlists/${id}`

  const authenticated = token.query()
  const response = await axios({
    headers: {
      Authorization: `Bearer ${authenticated}`,
    },
    method: 'get',
    url,
  })

  if (id === 'tracks') {
    return {
      ...response.data,
      tracks: response.data,
    }
  }

  return response.data
}

export const playlist = { key: 'playlist', query: retrievePlaylist }
