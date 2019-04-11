import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import { Button } from '../styles/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Signout = props => {
  useEffect(() => {
    if (props.auth) {
      props.history.push('/app');
    }
  }, [props.auth]);

  const handleClick = event => {
    props.signOut(event);
    props.history.push('/');
  };

  return (
    <Button onClick={handleClick}>
      <FontAwesomeIcon icon={faSignOutAlt} />
      &nbsp;Signout
    </Button>
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
