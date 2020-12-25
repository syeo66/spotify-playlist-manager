import { MouseEvent } from 'react'

import { APPEND_PLAYLISTS, FETCH_PLAYLISTS, FETCH_TRACKS, RETRIEVE_AUTH_TOKEN, RETRIEVE_TRACKS_OVERVIEW } from './types'

interface DispatchInput {
  type: string
  payload: string | null
}
type DispatchFunction = (params: DispatchInput) => void

export const fetchUser = () => (dispatch: DispatchFunction) => {
  if (!window.opener) {
    return
  }
  window.location.hash
    .substr(1)
    .split('&')
    .map((entry) => {
      const splitEntry = entry.split('=')
      if (splitEntry[0] === 'access_token') {
        window.opener.postMessage(
          {
            token: splitEntry[1],
            type: 'access_token',
          },
          '*'
        )
        window.close()
      }
      return entry
    })
}

export const doLogin = (token: string) => (dispatch: DispatchFunction) => {
  if (typeof Storage !== 'undefined') {
    window.localStorage.setItem('access_token', token)
  }
  dispatch({
    payload: token,
    type: RETRIEVE_AUTH_TOKEN,
  })
}

export const signInWithSpotify = (e: MouseEvent) => (dispatch: DispatchFunction) => {
  e.preventDefault()
  const appUrl = encodeURIComponent(
    `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/`
  )
  const scopes =
    'user-library-read playlist-read-private playlist-modify-private playlist-modify-public user-modify-playback-state user-read-playback-state'
  const url =
    `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${appUrl}&response_type=token` +
    `&scope=${encodeURIComponent(scopes)}`
  window.open(url, 'spotify', 'width=400, height=500')
}

export const signOut = (e: MouseEvent) => (dispatch: DispatchFunction) => {
  e.preventDefault()
  doSignOut(dispatch)
}

const doSignOut = (dispatch: DispatchFunction) => {
  if (typeof Storage !== 'undefined') {
    window.localStorage.removeItem('access_token')
  }
  dispatch({
    payload: null,
    type: RETRIEVE_AUTH_TOKEN,
  })
}

export const retrievePlaylists = (
  authenticated: string | boolean,
  url = 'https://api.spotify.com/v1/me/playlists?limit=50',
  append = false
) => (dispatch: DispatchFunction) => {
  fetch(url, {
    headers: new Headers({
      Authorization: `Bearer ${authenticated}`,
    }),
    method: 'get',
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 401) {
          doSignOut(dispatch)
        }
      }
      return response.json()
    })
    .then((response) => {
      if (response.next && response.total > response.offset + response.limit) {
        retrievePlaylists(authenticated, response.next, true)(dispatch)
      }
      dispatch({
        payload: response,
        type: append ? APPEND_PLAYLISTS : FETCH_PLAYLISTS,
      })
    })
}

export const retrievePlaylistAlbums = (authenticated: string, url: string) => (dispatch: DispatchFunction) => {
  fetch(url, {
    headers: new Headers({
      Authorization: `Bearer ${authenticated}`,
    }),
    method: 'get',
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch({
        payload: response,
        type: FETCH_TRACKS,
      })
    })
}

export const retrieveTracksOverview = (
  authenticated: string | boolean,
  url = 'https://api.spotify.com/v1/me/tracks?limit=5'
) => (dispatch: DispatchFunction) => {
  fetch(url, {
    headers: new Headers({
      Authorization: `Bearer ${authenticated}`,
    }),
    method: 'get',
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 401) {
          doSignOut(dispatch)
        }
      }
      return response.json()
    })
    .then((response) => {
      dispatch({
        payload: response,
        type: RETRIEVE_TRACKS_OVERVIEW,
      })
    })
}
