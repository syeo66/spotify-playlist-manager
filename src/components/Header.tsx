import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'

import { token } from '../queries'
import breakpoints from '../styles/breakpoints'
import * as colors from '../styles/colors'
import Signout from './Signout'
import UserInfo from './UserInfo'

const StyledHeader = styled.header`
  margin: 0;
  padding: 1rem;
  background: linear-gradient(to bottom, ${colors.headerGradientTop} 0%, ${colors.headerGradientBottom} 100%);
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

const Header: React.FC = () => {
  const { data: auth, isLoading } = useQuery(token.key, token.query)

  return (
    <StyledHeader>
      <Title>
        <FontAwesomeIcon icon={faSpotify} color="#20d760" />
        &nbsp; Spotify Playlist Manager
      </Title>
      {!isLoading && !!auth && (
        <Profile>
          <UserInfo />
          <Signout />
        </Profile>
      )}
    </StyledHeader>
  )
}

const Profile = styled.div`
  display: flex;
`

export default memo(Header)
