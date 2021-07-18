import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo, MouseEvent } from 'react'
import styled from 'styled-components'

import { signInWithSpotify } from '../actions'
import * as colors from '../styles/colors'
import { Button } from '../styles/components'

const SigninBox = styled.section`
  border: 1px solid ${colors.border};
  padding: 5rem 0.5rem;
  border-radius: 1rem;
  width: 20rem;
  display: flex;
  justify-content: center;
  box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
  margin: 25vh auto 0;
`

interface SigninProps {
  signInWithSpotify?: (e: MouseEvent) => void
}

const Signin: React.FC<SigninProps> = () => {
  return (
    <SigninBox>
      <Button onClick={signInWithSpotify}>
        <FontAwesomeIcon icon={faSpotify} />
        &nbsp;Sign In With Spotify
      </Button>
    </SigninBox>
  )
}

export default memo(Signin)
