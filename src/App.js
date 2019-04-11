import React, { lazy, Suspense } from 'react';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import Signin from './components/Signin';
import Header from './components/Header';
import requireAuth from './components/auth/requireAuth';

const Main = lazy(() => import('./components/Main'));

const initialState = {
  auth: false,
  data: {
    playlists: [],
    playlistsSize: 0,
  },
};

const store = createStore(reducers, initialState, applyMiddleware(reduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Signin} />
          <Suspense fallback={<div />}>
            <Route path="/app" component={requireAuth(Main)} />
          </Suspense>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
