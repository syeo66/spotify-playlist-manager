import './App.css'

import axios from 'axios'
import retry from 'axios-retry-after'
import React, { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import reduxThunk from 'redux-thunk'

import reducers from './reducers'

axios.interceptors.response.use(undefined, retry(axios))

const Main = lazy(() => import('./components/Main'))

const initialState = {
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
const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Provider store={store as any}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Suspense fallback={<div />}>
            <Main />
          </Suspense>
        </div>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
