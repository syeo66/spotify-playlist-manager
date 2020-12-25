import React, { lazy, Suspense, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import { doLogin, fetchUser } from '../actions'
import Authenticated from './auth/Authenticated'
import Header from './Header'

const FindDuplicates = lazy(() => import('./FindDuplicates'))
const PlaylistBrowser = lazy(() => import('./PlaylistBrowser'))
const PlaylistEditor = lazy(() => import('./PlaylistEditor'))

interface MainProps {
  auth: string | boolean
  doLogin: (token: string) => void
  fetchUser: () => void
}
const Main: React.FC<MainProps> = ({ doLogin: login, fetchUser: doFetchUser }) => {
  useEffect(() => {
    if (typeof Storage !== 'undefined') {
      const accessToken = window.localStorage.getItem('access_token')
      if (accessToken) {
        login(accessToken)
      }
    }
  }, [login])

  useEffect(() => {
    const onMessage = (message: MessageEvent) => {
      if (message.data.type && message.data.type === 'access_token') {
        login(message.data.token)
      }
    }

    window.addEventListener('message', onMessage)
    doFetchUser()

    return () => window.removeEventListener('message', onMessage)
  }, [doFetchUser, login])

  return (
    <BrowserRouter>
      <Header />
      <Route
        path="/:id?"
        exact
        render={(props) => (
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
        render={(props) => (
          <Authenticated>
            <Suspense fallback={<div />}>
              <PlaylistEditor {...props} component={FindDuplicates} />
            </Suspense>
          </Authenticated>
        )}
      />
    </BrowserRouter>
  )
}

interface MapStateToPropsInput {
  auth: string | boolean
}
const mapStateToProps = ({ auth }: MapStateToPropsInput) => {
  return { auth }
}

export default connect(mapStateToProps, { doLogin, fetchUser })(Main)
