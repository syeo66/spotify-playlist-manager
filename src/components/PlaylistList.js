import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { retrievePlaylists } from '../actions';

import Selector from './Selector';

const PlaylistList = props => {
  useEffect(() => {
    props.retrievePlaylists(props.authenticated);
    const polling = setInterval(() => props.retrievePlaylists(props.authenticated), 4900);
    return () => clearInterval(polling);
  }, []);

  const playlists = props.playlists
    .sort((a, b) => {
      return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
    })
    .map(entry => ({
      id: entry.id,
      title: entry.name,
      pill: entry.tracks.total,
      url: '/' + entry.id,
    }));

  return <Selector id={props.id} list={playlists} />;
};

PlaylistList.propTypes = {
  id: PropTypes.string,
  authenticated: PropTypes.string,
  playlists: PropTypes.array.isRequired,
  userId: PropTypes.string,
  retrievePlaylists: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth, data }) => ({
  authenticated: auth,
  playlists: data.playlists ? data.playlists : [],
  userId: data.user ? data.user.id : null,
});

export default connect(
  mapStateToProps,
  { retrievePlaylists }
)(PlaylistList);
