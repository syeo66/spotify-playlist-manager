import React, { lazy, Suspense } from 'react';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducers from './reducers';

import './App.css';

const Main = lazy(() => import('./components/Main'));

const initialState = {
  auth: false,
  data: {
    playlists: [],
    playlistsSize: 0,
    tracks: {},
    library: {
      trackCount: 0,
      albumCount: 0,
      artistCount: 0,
    },
  },
};

const store = createStore(reducers, initialState, applyMiddleware(reduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Suspense fallback={<div />}>
          <Main />
        </Suspense>
      </div>
    </Provider>
  );
};

export default App;
