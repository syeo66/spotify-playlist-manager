import React from 'react';
import { connect } from 'react-redux';
import { signInWithSpotify } from '../actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { black } from '../styles/colors';
import { Button } from '../styles/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

const SigninBox = styled.section`
  border: 1px solid ${black};
  padding: 5rem 0.5rem;
  border-radius: 1rem;
  width: 20rem;
  display: flex;
  justify-content: center;
  box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
  margin: 25vh auto 0;
`;

const Signin = props => {
  return (
    <SigninBox>
      <Button onClick={props.signInWithSpotify}>
        <FontAwesomeIcon icon={faSpotify} />
        &nbsp;Sign In With Spotify
      </Button>
    </SigninBox>
  );
};

Signin.propTypes = {
  signInWithSpotify: PropTypes.func.isRequired,
  auth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  { signInWithSpotify }
)(Signin);
