import React from 'react'
import { useQuery } from 'react-query'

import { token } from '../../queries'
import Loading from '../Loading'
import Signin from '../Signin'

const Authenticated: React.FC = ({ children }) => {
  const { data: auth, isLoading } = useQuery(token.key, token.query)

  if (isLoading) {
    return (
      <>
        <Loading />
        Loading
      </>
    )
  }

  return !auth ? <Signin /> : <>{children}</>
}

export default Authenticated
