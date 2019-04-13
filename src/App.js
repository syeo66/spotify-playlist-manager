import React, { lazy, Suspense, useEffect, useState } from 'react';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { Provider } from 'react-redux';

import './App.css';

import db from './database.js';

const Main = lazy(() => import('./components/Main'));

const initialState = {
  auth: false,
  data: {
    playlists: [],
    playlistsSize: 0,
    tracks: {},
  },
};

const store = createStore(reducers, initialState, applyMiddleware(reduxThunk));

const App = () => {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    db.open().then(() => setIsDbReady(true));
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        {isDbReady ? (
          <Suspense fallback={<div />}>
            <Main />
          </Suspense>
        ) : (
          'Waiting for the Database...'
        )}
      </div>
    </Provider>
  );
};

export default App;
