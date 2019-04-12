import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchUser, doLogin } from '../actions';
import breakpoints from '../styles/breakpoints';

import Signout from './Signout';

import { black } from '../styles/colors';

const StyledHeader = styled.header`
  margin: 0;
  padding: 1rem;
  background: linear-gradient(to bottom, ${black} 0%, #000 100%);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

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
`;

const Header = props => {
  return (
    <StyledHeader>
      <Title>
        <FontAwesomeIcon icon={faSpotify} color="#20d760" />
        &nbsp; Spotify Playlist Manager
      </Title>
      {props.auth ? <Signout /> : ''}
    </StyledHeader>
  );
};

Header.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  doLogin: PropTypes.func.isRequired,
  auth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(
  mapStateToProps,
  { fetchUser, doLogin }
)(Header);
