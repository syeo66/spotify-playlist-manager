import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Signout = props => {
  useEffect(() => {
    if (props.auth) {
      props.history.push('/app');
    }
  }, [props.auth]);

  return (
    <button onClick={props.signOut}>
      <FontAwesomeIcon icon={faSignOutAlt} />
      &nbsp;Signout
    </button>
  );
};

Signout.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  signOut: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default withRouter(
  connect(
    mapStateToProps,
    { signOut }
  )(memo(Signout))
);
