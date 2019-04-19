import {
  RETRIEVE_AUTH_TOKEN,
  APPEND_PLAYLISTS,
  FETCH_PLAYLISTS,
  RETRIEVE_TRACKS_OVERVIEW,
  FETCH_TRACKS,
} from './types';

export const fetchUser = () => dispatch => {
  if (!window.opener) {
    return;
  }
  window.location.hash
    .substr(1)
    .split('&')
    .map(entry => {
      const splitEntry = entry.split('=');
      if (splitEntry[0] === 'access_token') {
        window.opener.postMessage(
          {
            type: 'access_token',
            token: splitEntry[1],
          },
          '*'
        );
        window.close();
      }
      return entry;
    });
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
  const appUrl = encodeURIComponent(
    window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '') +
      '/'
  );
  const scopes =
    'user-library-read playlist-read-private playlist-modify-private playlist-modify-public user-modify-playback-state user-read-playback-state';
  const url =
    'https://accounts.spotify.com/authorize?client_id=' +
    process.env.REACT_APP_CLIENT_ID +
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

export const retrievePlaylists = (
  authenticated,
  url = 'https://api.spotify.com/v1/me/playlists?limit=50',
  append = false
) => dispatch => {
  fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: 'Bearer ' + authenticated,
    }),
  })
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          doSignOut(dispatch);
        }
      }
      return response.json();
    })
    .then(response => {
      if (response.next && response.total > response.offset + response.limit) {
        retrievePlaylists(authenticated, response.next, true)(dispatch);
      }
      dispatch({
        type: append ? APPEND_PLAYLISTS : FETCH_PLAYLISTS,
        payload: response,
      });
    });
};

export const retrievePlaylistAlbums = (authenticated, url) => dispatch => {
  fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: 'Bearer ' + authenticated,
    }),
  })
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: FETCH_TRACKS,
        payload: response,
      });
    });
};

export const retrieveTracksOverview = (
  authenticated,
  url = 'https://api.spotify.com/v1/me/tracks?limit=5'
) => dispatch => {
  fetch(url, {
    method: 'get',
    headers: new Headers({
      Authorization: 'Bearer ' + authenticated,
    }),
  })
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          doSignOut(dispatch);
        }
      }
      return response.json();
    })
    .then(response => {
      dispatch({
        type: RETRIEVE_TRACKS_OVERVIEW,
        payload: response,
      });
    });
};
