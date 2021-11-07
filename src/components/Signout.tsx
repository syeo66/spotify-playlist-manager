import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo, useCallback } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { signOut } from '../actions'
import { token } from '../queries'
import breakpoints from '../styles/breakpoints'
import { Button } from '../styles/components'

const Signout: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const logoff = useMutation(signOut, {
    onSuccess: () => {
      queryClient.invalidateQueries(token.key)
      navigate('/')
    },
  })

  const handleClick = useCallback(() => {
    logoff.mutate()
  }, [logoff])

  return (
    <Button onClick={handleClick}>
      <FontAwesomeIcon icon={faSignOutAlt} />
      <ButtonText>&nbsp;Signout</ButtonText>
    </Button>
  )
}

const ButtonText = styled.span`
  display: none;

  @media only screen and (min-width: ${breakpoints.sm}) {
    display: inline;
  }
`

export default memo(Signout)
