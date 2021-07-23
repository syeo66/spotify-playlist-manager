import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo, MouseEvent } from 'react'
import styled from 'styled-components'

import { signInWithSpotify } from '../actions'
import * as colors from '../styles/colors'
import { Button } from '../styles/components'

const SigninBox = styled.section`
  border: 1px solid ${colors.border};
  padding: clamp(0.5rem, 19vh, 5rem) 0.5rem;
  border-radius: 1rem;
  width: 20rem;
  max-width: calc(100% - 1rem);
  display: flex;
  justify-content: center;
  box-shadow: 0 0.2rem 0.2rem ${colors.shadow}, 0 0.6rem 0.6rem ${colors.shadowPrimary};
  margin: 1rem auto;
`

const SigninScreen = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface SigninProps {
  signInWithSpotify?: (e: MouseEvent) => void
}

const Signin: React.FC<SigninProps> = () => {
  return (
    <SigninScreen>
      <SigninBox>
        <Button onClick={signInWithSpotify}>
          <FontAwesomeIcon icon={faSpotify} />
          &nbsp;Sign In With Spotify
        </Button>
      </SigninBox>
      <SigninInfo>
        This website is communicating with the Spotify API only. It never sends or stores any data to its own server.
      </SigninInfo>
    </SigninScreen>
  )
}

const SigninInfo = styled.div`
  position: absolute;
  bottom: 0;
  padding: 1rem;
  text-align: center;
  font-size: 95%;
  color: rgba(0, 0, 0, 0.5);
  left: 0;
  right: 0;
`

export default memo(Signin)
