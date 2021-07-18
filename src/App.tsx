import './App.css'

import axios from 'axios'
import retry from 'axios-retry-after'
import React, { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import CssVariables from './styles/CssVariables'

axios.interceptors.response.use(undefined, retry(axios))

const Main = lazy(() => import('./components/Main'))

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CssVariables>
        <Suspense fallback={<div />}>
          <Main />
        </Suspense>
      </CssVariables>
    </QueryClientProvider>
  )
}

export default App
