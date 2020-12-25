import { combineReducers } from 'redux'

import auth from './authReducer'
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
  auth: boolean
  data: StateData
}

const reducers = combineReducers<State>({
  auth,
  data,
})

export default reducers
