import React from 'react'
import { connect } from 'react-redux'

import Signin from '../Signin'

interface AuthenticatedProps {
  auth: string | boolean
}
const Authenticated: React.FC<AuthenticatedProps> = ({ auth, children }) => {
  return !auth ? <Signin /> : <>{children}</>
}

interface MapStateToPropsInput {
  auth: string | boolean
}
const mapStateToProps = ({ auth }: MapStateToPropsInput) => {
  return { auth }
}

export default connect(mapStateToProps, {})(Authenticated)
