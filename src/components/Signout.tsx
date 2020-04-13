import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo, MouseEvent, useCallback } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { signOut } from '../actions'
import { Button } from '../styles/components'

interface SignoutProps extends RouteComponentProps {
  signOut: (event: MouseEvent) => void
}
const Signout: React.FC<SignoutProps> = ({ signOut: doSignOut, history }) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      doSignOut(event)
      history.push('/')
    },
    [history, doSignOut]
  )

  return (
    <Button onClick={handleClick}>
      <FontAwesomeIcon icon={faSignOutAlt} />
      &nbsp;Signout
    </Button>
  )
}

const mapStateToProps = () => {
  return {}
}

export default withRouter(connect(mapStateToProps, { signOut })(memo(Signout)))
