import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ToolHeading } from '../styles/components';
import PlaylistHeader from './PlaylistHeader';

const FindDuplicates = ({ id, playlists }) => {
  const [playlist] = useMemo(() => playlists.filter(playlist => id === playlist.id), [id, playlists]);
  return !playlist ? (
    ''
  ) : (
    <React.Fragment>
      <PlaylistHeader playlist={playlist} />
      <ToolHeading>Find Duplicates</ToolHeading>
    </React.Fragment>
  );
};

FindDuplicates.propTypes = {
  id: PropTypes.string,
  authenticated: PropTypes.string.isRequired,
  playlists: PropTypes.array,
  tracks: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, data: { tracks, playlists } }) => {
  return {
    authenticated: auth,
    playlists: playlists ? playlists : [],
    tracks: tracks ? tracks : {},
  };
};

export default connect(
  mapStateToProps,
  {}
)(FindDuplicates);
