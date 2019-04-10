import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';

import Signin from './components/Signin';
import Header from './components/Header';

const initialState = {
  auth: false,
};

const store = createStore(reducers, initialState, applyMiddleware(reduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Signin} />
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
