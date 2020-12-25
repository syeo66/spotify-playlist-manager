import { APPEND_PLAYLISTS, FETCH_PLAYLISTS, FETCH_TRACKS, RETRIEVE_TRACKS_OVERVIEW } from '../actions/types'

interface Item {
  id?: string
}
interface Playlist {
  id?: string
}
interface Action {
  payload: { items: Item[]; total: number }
  type: string
}
interface State {
  playlists?: Playlist[]
  library?: { trackCount: number }
}

type DataReducerType = (state: State, action: Action) => State

const dataReducer: DataReducerType = (state: State = {}, action: Action) => {
  switch (action.type) {
    case APPEND_PLAYLISTS: {
      const playlists = state.playlists?.concat(action.payload.items)
      return {
        ...state,
        playlists: playlists,
        playlistsSize: action.payload.total,
      }
    }

    case FETCH_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload.items,
        playlistsSize: action.payload.total,
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
          trackCount: action.payload.total,
        },
      }

    default:
      return state
  }
}

export default dataReducer
