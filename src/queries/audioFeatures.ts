import axios from 'axios'

import { AudioFeatures } from '../types'
import { token } from '.'

const retrieveAudioFeatures: (id: string | string[]) => Promise<AudioFeatures[]> = async (id) => {
  const url = Array.isArray(id)
    ? `https://api.spotify.com/v1/audio-features/?ids=${id.join(',')}`
    : `https://api.spotify.com/v1/audio-features/${id}`

  const authenticated = token.query()
  const response = await axios({
    headers: {
      Authorization: `Bearer ${authenticated}`,
    },
    method: 'get',
    url,
  })

  return Array.isArray(id) ? response.data.audio_features : [response.data]
}

export const audioFeatures = { key: 'audioFeatures', query: retrieveAudioFeatures }
