import React from 'react';
import PropTypes from 'prop-types';

import { orange } from '../styles/colors';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Pill, PlaylistHeaderContainer } from '../styles/components';

const PlaylistHeader = ({ playlist }) => {
  return (
    <PlaylistHeaderContainer playlist={playlist}>
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
    </PlaylistHeaderContainer>
  );
};

PlaylistHeader.propTypes = {
  playlist: PropTypes.object.isRequired,
};

export default PlaylistHeader;
