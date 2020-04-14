import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import breakpoints from '../styles/breakpoints'
import { black } from '../styles/colors'
import Signout from './Signout'

const StyledHeader = styled.header`
  margin: 0;
  padding: 1rem;
  background: linear-gradient(to bottom, ${black} 0%, #000 100%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h1`
  margin: 0;
  padding: 0;
  color: #eee;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.9);
  font-size: 1.1rem;
  white-space: nowrap;

  @media only screen and (min-width: ${breakpoints.sm}) {
    font-size: 2rem;
  }
`

interface HeaderProps {
  auth: string | boolean
}
const Header: React.FC<HeaderProps> = ({ auth }) => {
  return (
    <StyledHeader>
      <Title>
        <FontAwesomeIcon icon={faSpotify} color="#20d760" />
        &nbsp; Spotify Playlist Manager
      </Title>
      {auth && <Signout />}
    </StyledHeader>
  )
}

interface MapStateToPropsInput {
  auth: string | boolean
}
const mapStateToProps = ({ auth }: MapStateToPropsInput) => ({
  auth,
})

export default connect(mapStateToProps, {})(Header)
