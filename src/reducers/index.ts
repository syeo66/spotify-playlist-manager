import { combineReducers } from 'redux'

import data from './dataReducer'

interface StateData {
  library?: {
    albumCount: number
    artistCount: number
    trackCount: number
  }
  playlists?: string[]
  playlistsSize: number
  tracks: { [key: string]: string }
}

export interface State {
  data: StateData
}

const reducers = combineReducers<State>({
  data,
})

export default reducers
