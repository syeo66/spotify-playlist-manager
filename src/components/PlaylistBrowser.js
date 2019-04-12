import React from 'react';
import PropTypes from 'prop-types';

const PlaylistBrowser = props => {
  return <div>{props.id}</div>;
};

PlaylistBrowser.propTypes = {
  id: PropTypes.string,
};

export default PlaylistBrowser;
