import React, { lazy, memo, Suspense, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'

import { processAccessToken, signIn } from '../actions'
import { token } from '../queries'
import Authenticated from './auth/Authenticated'
import Header from './Header'
import Loading from './Loading'

const FindDuplicates = lazy(() => import('./FindDuplicates'))
const PlaylistBrowser = lazy(() => import('./PlaylistBrowser'))
const PlaylistEditor = lazy(() => import('./PlaylistEditor'))

const Main: React.FC = () => {
  const queryClient = useQueryClient()
  const { data: auth } = useQuery(token.key, token.query)

  const doLogin = useMutation(signIn, {
    onSuccess: () => {
      queryClient.invalidateQueries(token.key)
    },
  })

  useEffect(() => {
    const onMessage = (message: MessageEvent) => {
      if (message.data.type && message.data.type === 'access_token') {
        doLogin.mutate(message.data.token)
      }
    }

    window.addEventListener('message', onMessage)
    processAccessToken()

    return () => window.removeEventListener('message', onMessage)
  }, [doLogin])

  return (
    <BrowserRouter>
      <Header />
      <Route
        path="/:id?"
        exact
        render={(props) => (
          <RouteContainer>
            <PlaylistEditor {...props} component={PlaylistBrowser} />
          </RouteContainer>
        )}
      />
      <Route
        path="/:id/duplicates"
        exact
        render={(props) => (
          <RouteContainer>
            <PlaylistEditor {...props} component={FindDuplicates} />
          </RouteContainer>
        )}
      />
      {auth && (
        <Route path="/" exact>
          <Redirect to="/tracks" />
        </Route>
      )}
    </BrowserRouter>
  )
}

const RouteContainer: React.FC = ({ children }) => {
  return (
    <Authenticated>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </Authenticated>
  )
}

export default memo(Main)
