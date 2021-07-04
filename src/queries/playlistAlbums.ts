import axios from 'axios'

import { token } from './token'

interface Artist {
  id: string
  name: string
}
interface Album {
  id: string
  name: string
}
interface Track {
  id: string
  track: { id: string; name: string; album: Album; artists: Artist[] }
}
interface Albums {
  id: string
  next: string
  previous: string
  offset: number
  limit: number
  total: number
  items: Track[]
}
type RetrievePlaylistAlbumsType = (url: string) => Promise<Albums>

const retrievePlaylistAlbums: RetrievePlaylistAlbumsType = async (url: string) => {
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

export const playlistAlbums = { key: 'playlistAlbums', query: retrievePlaylistAlbums }
