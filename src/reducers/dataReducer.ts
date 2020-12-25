import { APPEND_PLAYLISTS, FETCH_PLAYLISTS, FETCH_TRACKS, RETRIEVE_TRACKS_OVERVIEW } from '../actions/types'

interface Item {
  id?: string
}
interface Playlist {
  id?: string
}
interface Action {
  payload?: { items: Item[]; total: number }
  type: string
}
interface State {
  playlists?: Playlist[]
  library?: { trackCount: number }
  playlistsSize?: number
  tracks?: { items: Item[]; total: number }
}

const dataReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case APPEND_PLAYLISTS: {
      const playlists = state.playlists?.concat(action.payload?.items || [])
      return {
        ...state,
        playlists: playlists,
        playlistsSize: action.payload?.total || 0,
      }
    }

    case FETCH_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload?.items || [],
        playlistsSize: action.payload?.total || 0,
      }

    case FETCH_TRACKS:
      return {
        ...state,
        tracks: action.payload,
      }

    case RETRIEVE_TRACKS_OVERVIEW:
      return {
        ...state,
        library: {
          ...state.library,
          trackCount: action.payload?.total || 0,
        },
      }

    default:
      return reduceDefault(state, action)
  }
}

const reduceDefault = (state: State, action: Action): State => state || {}

export default dataReducer
