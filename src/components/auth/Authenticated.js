import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Signin from '../Signin';

const Authenticated = props => {
  return !props.auth ? <Signin /> : props.children;
};

Authenticated.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  children: PropTypes.node,
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  {}
)(Authenticated);
