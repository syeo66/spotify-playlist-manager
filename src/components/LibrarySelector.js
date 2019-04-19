import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { retrieveTracksOverview } from '../actions';

import Selector from './Selector';

const LibrarySelector = props => {
  useEffect(() => {
    props.retrieveTracksOverview(props.authenticated);
    const polling = setInterval(() => props.retrieveTracksOverview(props.authenticated), 4800);
    return () => clearInterval(polling);
  }, []);

  const librarySelectors = [
    { id: 'tracks', name: 'Songs', trackCount: props.trackCount },
    // { id: 'albums', name: 'Albums', tracks: { total: 10 } },
    // { id: 'artists', name: 'Artists', tracks: { total: 10 } },
  ];

  const playlists = librarySelectors.map(entry => ({
    id: entry.id,
    title: entry.name,
    pill: entry.trackCount,
    url: '/' + entry.id,
  }));

  return <Selector id={props.id} list={playlists} />;
};

LibrarySelector.propTypes = {
  id: PropTypes.string.isRequired,
  authenticated: PropTypes.string,
  retrieveTracksOverview: PropTypes.func.isRequired,
  trackCount: PropTypes.number.isRequired,
};

const mapStateToProps = ({ auth, data: { library, user } }) => ({
  authenticated: auth,
  trackCount: library.trackCount,
  userId: user ? user.id : null,
});

export default connect(
  mapStateToProps,
  { retrieveTracksOverview }
)(LibrarySelector);
