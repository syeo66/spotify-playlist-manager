import { RETRIEVE_AUTH_TOKEN } from './types';

export const fetchUser = () => dispatch => {
  for (const entry of window.location.hash.substr(1).split('&')) {
    const splitEntry = entry.split('=');
    if (splitEntry[0] === 'access_token') {
      if (window.opener) {
        window.opener.postMessage(
          {
            type: 'access_token',
            token: splitEntry[1],
          },
          '*'
        );
        window.close();
      }
    }
  }
};

export const doLogin = token => dispatch => {
  if (typeof Storage !== 'undefined') {
    window.localStorage.setItem('access_token', token);
  }
  dispatch({
    type: RETRIEVE_AUTH_TOKEN,
    payload: token,
  });
};

export const signInWithSpotify = e => dispatch => {
  e.preventDefault();
  const appUrl = encodeURIComponent(window.location.href.split('#')[0]);
  const scopes =
    'user-library-read playlist-read-private playlist-modify-private user-modify-playback-state user-read-playback-state';
  const url =
    'https://accounts.spotify.com/authorize?client_id=' +
    process.env.CLIENT_ID +
    '&redirect_uri=' +
    appUrl +
    '&response_type=token' +
    '&scope=' +
    encodeURIComponent(scopes);
  window.open(url, 'spotify', 'width=400, height=500');
};

export const signOut = e => dispatch => {
  e.preventDefault();
  doSignOut(dispatch);
};

const doSignOut = dispatch => {
  if (typeof Storage !== 'undefined') {
    window.localStorage.removeItem('access_token');
  }
  dispatch({
    type: RETRIEVE_AUTH_TOKEN,
    payload: null,
  });
};
