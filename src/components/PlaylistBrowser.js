import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Color from 'color';

import { retrievePlaylistAlbums } from '../actions';

import { black, orange } from '../styles/colors';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faGlobe, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Pill, Button } from '../styles/components';

const Track = styled.div`
  min-height: 1.7rem;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  &:last-of-type {
    border-radius: 0 0 0.4rem 0.4rem;
  }
`;

const RowItem = styled.div`
  width: 0;
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const GenericContainer = styled.div`
  padding: 0 1rem;
  border-bottom: 1px solid
    ${({ color }) =>
      Color(color || black)
        .alpha(0.2)
        .string()};
  min-height: 2.2rem;
  margin-bottom: 1rem;
  color: ${black};
  border-radius: 0.5em;
  display: flex;
  box-shadow: 0 0.2rem 0.5rem
    ${({ color }) =>
      Color(color || black)
        .alpha(0.2)
        .string()};
`;

const PlaylistHeader = styled(GenericContainer)`
  height: 2.2rem;
  line-height: 2.2rem;
  justify-content: space-between;
  align-items: center;
`;

const PlaylistContainer = styled(GenericContainer)`
  flex-direction: column;
  padding: 0;
`;

const PlaylistBrowser = ({ authenticated, id, retrievePlaylistAlbums, playlists, tracks }) => {
  const [playlist] = useMemo(() => playlists.filter(playlist => id === playlist.id), [id, playlists]);

  const playlistUrl = playlist ? playlist.tracks.href : null;
  useEffect(() => {
    if (!playlist) {
      return;
    }
    retrievePlaylistAlbums(authenticated, playlist.tracks.href);
  }, [playlistUrl]);

  const handlePrev = () => retrievePlaylistAlbums(authenticated, tracks.previous);
  const handleNext = () => retrievePlaylistAlbums(authenticated, tracks.next);

  const pagination =
    tracks.next || tracks.previous ? (
      <ButtonContainer>
        {tracks.previous ? (
          <Button onClick={handlePrev}>
            <FontAwesomeIcon title="Previous" icon={faArrowLeft} />
          </Button>
        ) : (
          <RowItem />
        )}
        <RowItem>
          {Math.ceil((tracks.offset + 1) / tracks.limit)}/{Math.ceil(tracks.total / tracks.limit)}
        </RowItem>
        {tracks.next ? (
          <Button onClick={handleNext}>
            <FontAwesomeIcon title="Next" icon={faArrowRight} />
          </Button>
        ) : (
          <RowItem />
        )}
      </ButtonContainer>
    ) : (
      ''
    );

  return !playlist ? (
    ''
  ) : (
    <React.Fragment>
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
      {tracks.items ? (
        <React.Fragment>
          {pagination}
          <PlaylistContainer>
            {tracks.items.map(item => (
              <Track key={item.track.id + item.added_at}>
                {item.track.name} - {item.track.album.name} - {item.track.artists[0].name}
              </Track>
            ))}
          </PlaylistContainer>
          {pagination}
        </React.Fragment>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

PlaylistBrowser.propTypes = {
  id: PropTypes.string,
  authenticated: PropTypes.string.isRequired,
  playlists: PropTypes.array,
  retrievePlaylistAlbums: PropTypes.func.isRequired,
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
  { retrievePlaylistAlbums }
)(PlaylistBrowser);
