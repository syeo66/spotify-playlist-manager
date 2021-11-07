import React, { lazy, memo, Suspense, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

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
      <RouteContainer>
        <Routes>
          <Route path="/:id" element={<PlaylistEditor component={PlaylistBrowser} />} />
          <Route path="/:id/duplicates" element={<PlaylistEditor component={FindDuplicates} />} />
          {auth && <Route path="/" element={<Navigate to="/tracks" />} />}
        </Routes>
      </RouteContainer>
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
