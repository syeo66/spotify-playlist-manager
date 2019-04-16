import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { retrievePlaylistAlbums } from '../actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Button, PlaylistContainer, Track, ButtonContainer } from '../styles/components';
import PlaylistHeader from './PlaylistHeader';

const RowItem = styled.div`
  width: 0;
  display: flex;
  align-items: center;
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
      <PlaylistHeader playlist={playlist} />
      <ButtonContainer>
        <Link to={'/' + id + '/duplicates'}>
          <Button>Find Duplicates</Button>
        </Link>
      </ButtonContainer>
      {tracks.items ? (
        <React.Fragment>
          {pagination}
          <PlaylistContainer>
            {tracks.items.map((item, index) => (
              <Track key={item.track.id + '-' + index}>
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
