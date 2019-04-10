import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

import Signout from './Signout';

const StyledHeader = styled.header`
  margin: 0;
  padding: 1rem;
  background: linear-gradient(to bottom, #666 0%, #000 100%);
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  color: #eee;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.9);
`;

const Header = () => {
  return (
    <StyledHeader>
      <Title>
        <FontAwesomeIcon icon={faSpotify} color="#20d760" />
        &nbsp; Spotify Playlist Manager
      </Title>
      <Signout />
    </StyledHeader>
  );
};

export default Header;
