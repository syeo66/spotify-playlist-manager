import { MouseEvent } from 'react'

export const processAccessToken: () => void = () => {
  if (!window.opener) {
    return
  }
  window.location.hash
    .substr(1)
    .split('&')
    .map((entry) => {
      const splitEntry = entry.split('=')
      if (splitEntry[0] === 'access_token') {
        window.opener?.postMessage(
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

export const signIn = async (t: string): Promise<void> => window.localStorage.setItem('access_token', t)

type SignInWithSpotifyType = (e: MouseEvent) => void
export const signInWithSpotify: SignInWithSpotifyType = (e: MouseEvent) => {
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

export const signOut = async (): Promise<void> => window.localStorage.removeItem('access_token')
