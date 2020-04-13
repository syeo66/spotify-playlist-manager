import React, { lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { doLogin, fetchUser } from '../actions';
import PropTypes from 'prop-types';

import Header from './Header';
import Authenticated from './auth/Authenticated';

const PlaylistEditor = lazy(() => import('./PlaylistEditor'));
const PlaylistBrowser = lazy(() => import('./PlaylistBrowser'));
const FindDuplicates = lazy(() => import('./FindDuplicates'));

const Main = props => {
  useEffect(() => {
    if (typeof Storage !== 'undefined') {
      const access_token = window.localStorage.getItem('access_token');
      if (access_token) {
        props.doLogin(access_token);
      }
    }
  }, []);

  useEffect(() => {
    const onMessage = message => {
      if (message.data.type && message.data.type === 'access_token') {
        props.doLogin(message.data.token);
      }
    };

    window.addEventListener('message', onMessage);
    props.fetchUser();

    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Route
        path="/:id?"
        exact
        render={props => (
          <Authenticated>
            <Suspense fallback={<div />}>
              <PlaylistEditor {...props} component={PlaylistBrowser} />
            </Suspense>
          </Authenticated>
        )}
      />
      <Route
        path="/:id/duplicates"
        exact
        render={props => (
          <Authenticated>
            <Suspense fallback={<div />}>
              <PlaylistEditor {...props} component={FindDuplicates} />
            </Suspense>
          </Authenticated>
        )}
      />
    </BrowserRouter>
  );
};

Main.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  doLogin: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, { doLogin, fetchUser })(Main);
