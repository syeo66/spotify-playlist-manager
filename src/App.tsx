import './App.css'

import React, { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reduxThunk from 'redux-thunk'

import reducers from './reducers'

const Main = lazy(() => import('./components/Main'))

const initialState = {
  auth: false,
  data: {
    library: {
      albumCount: 0,
      artistCount: 0,
      trackCount: 0,
    },
    playlists: [],
    playlistsSize: 0,
    tracks: {},
  },
}

const store = createStore(reducers, initialState, applyMiddleware(reduxThunk))

const App: React.FC = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Provider store={store as any}>
      <div className="App">
        <Suspense fallback={<div />}>
          <Main />
        </Suspense>
      </div>
    </Provider>
  )
}

export default App
