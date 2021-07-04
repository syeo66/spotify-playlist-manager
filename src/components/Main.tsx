import React, { lazy, Suspense, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { connect } from 'react-redux'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'

import { fetchUser, signIn } from '../actions'
import { token } from '../queries'
import Authenticated from './auth/Authenticated'
import Header from './Header'
import Loading from './Loading'

const FindDuplicates = lazy(() => import('./FindDuplicates'))
const PlaylistBrowser = lazy(() => import('./PlaylistBrowser'))
const PlaylistEditor = lazy(() => import('./PlaylistEditor'))

interface MainProps {
  fetchUser: () => void
}
const Main: React.FC<MainProps> = ({ fetchUser: doFetchUser }) => {
  const queryClient = useQueryClient()
  const { data: auth, isLoading } = useQuery(token.key, token.query)

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
    doFetchUser()

    return () => window.removeEventListener('message', onMessage)
  }, [auth, doFetchUser, doLogin, isLoading])

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

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps, { fetchUser })(Main)
