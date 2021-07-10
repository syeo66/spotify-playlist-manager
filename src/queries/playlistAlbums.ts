import axios from 'axios'

import { Paging } from '../types'
import { token } from './token'

type RetrievePlaylistAlbumsType = (url: string) => Promise<Paging>

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
