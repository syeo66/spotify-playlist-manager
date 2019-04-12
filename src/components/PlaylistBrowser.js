import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Color from 'color';

import { black, orange } from '../styles/colors';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Pill } from '../styles/components';

const PlaylistHeader = styled.div`
  padding: 0 1rem;
  border-bottom: 1px solid ${({ color }) => color || orange};
  height: 2.2rem;
  line-height: 2.2rem;
  color: ${black};
  border-radius: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 0.5rem
    ${({ color }) =>
      Color(color || orange)
        .alpha(0.2)
        .string()};
`;

const PlaylistBrowser = props => {
  const [playlist] = props.playlists.filter(playlist => props.id === playlist.id);

  return !playlist ? (
    ''
  ) : (
    <PlaylistHeader>
      <div>
        {playlist.public ? (
          <FontAwesomeIcon title="Public" icon={faGlobe} />
        ) : (
          <FontAwesomeIcon title="Private" icon={faLock} />
        )}
        &nbsp;«{playlist.name}» by {playlist.owner.display_name}&nbsp;
      </div>
      <div>
        <Pill color="#fff" backgroundColor={orange}>
          {playlist.tracks.total} Tracks
        </Pill>
      </div>
    </PlaylistHeader>
  );
};

PlaylistBrowser.propTypes = {
  id: PropTypes.string,
  playlists: PropTypes.array,
};

const mapStateToProps = ({ auth, data }) => {
  return {
    authenticated: auth,
    playlists: data.playlists ? data.playlists : [],
  };
};

export default connect(
  mapStateToProps,
  {}
)(PlaylistBrowser);
