import axios from 'axios'

interface Playlist {
  id: string
}
interface Track {
  uri: string
}
interface Item {
  indexes: number[]
  track: Track
}

type RemoveDuplicatesType = (
  authenticated: string | boolean,
  duplicates: Item[],
  playlist: Playlist
) => Promise<unknown>

export const removeDuplicates: RemoveDuplicatesType = (
  authenticated: string | boolean,
  duplicates: Item[],
  playlist: Playlist
) => {
  const duplicatesToApiTracksMapper = (item: Item) => ({ positions: item.indexes, uri: item.track.uri })
  const toDelete = duplicates.map(duplicatesToApiTracksMapper)
  return remove100PlaylistTracks(authenticated, playlist, toDelete)
}

const remove100PlaylistTracks = async (auth: string | boolean, playlist: Playlist, trackUris: Track[] = []) => {
  const deleteChunks = trackUris.splice(0, 100)
  const playlistId = playlist.id
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`

  const response = await axios({
    data: {
      tracks: deleteChunks,
    },
    headers: {
      Authorization: `Bearer ${auth}`,
    },
    method: 'delete',
    url,
  })
  return response.data
}
