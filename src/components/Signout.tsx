import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo, useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useHistory, withRouter } from 'react-router-dom'

import { signOut } from '../actions'
import { token } from '../queries'
import { Button } from '../styles/components'

const Signout: React.FC = () => {
  const history = useHistory()
  const queryClient = useQueryClient()

  const logoff = useMutation(signOut, {
    onSuccess: () => {
      queryClient.invalidateQueries(token.key)
      history.push('/')
    },
  })

  const handleClick = useCallback(() => {
    logoff.mutate()
  }, [logoff])

  return (
    <Button onClick={handleClick}>
      <FontAwesomeIcon icon={faSignOutAlt} />
      &nbsp;Signout
    </Button>
  )
}

export default withRouter(memo(Signout))
