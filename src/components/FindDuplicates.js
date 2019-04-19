import React, { useMemo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeDuplicates, findDuplicates } from './find-duplicates';

import { orange, white } from '../styles/colors';

import { Button, ToolHeading, PlaylistDisplayContainer, Track, Pill, ButtonContainer } from '../styles/components';
import PlaylistHeader from './PlaylistHeader';
import Progress from './Progress';

const FindDuplicates = ({ id, playlists, authenticated }) => {
  const [duplicates, setDuplicates] = useState([]);
  const [progress, setProgress] = useState(null);
  const [isPurging, setIsPurging] = useState(0);

  const [playlist] = useMemo(() => playlists.filter(playlist => id === playlist.id), [id, playlists]);
  const testPlaylist = !playlist ? null : playlist.tracks.href;

  useEffect(() => {
    if (!duplicates.length) {
      return;
    }
    if (isPurging) {
      removeDuplicates(authenticated, duplicates, playlist).then(refetchDuplicates);
    }
  }, [isPurging]);

  const authFindDuplicates = findDuplicates(authenticated)(setProgress);
  const fetchAndStoreDuplicates = playlist => authFindDuplicates(playlist).then(data => setDuplicates(data));

  useEffect(() => {
    if (!playlist) {
      return;
    }
    fetchAndStoreDuplicates(playlist);
  }, [authenticated, testPlaylist]);

  const refetchDuplicates = () => fetchAndStoreDuplicates(playlist).then(() => setIsPurging(prev => prev + 1));

  const handleRemoveDuplicatesClick = () => setIsPurging(prev => prev + 1);

  return !playlist ? (
    ''
  ) : (
    <React.Fragment>
      <PlaylistHeader playlist={playlist} />
      <ToolHeading>Find Duplicates</ToolHeading>
      {progress && progress < 100 ? (
        <Progress value={progress} max={100} />
      ) : duplicates.length ? (
        <React.Fragment>
          <ButtonContainer>
            <Button onClick={handleRemoveDuplicatesClick}>Remove Duplicates</Button>
          </ButtonContainer>
          <PlaylistDisplayContainer>
            {duplicates.map(item => (
              <Track key={item.track.id + item.added_at}>
                <Pill backgroundColor={orange} color={white}>
                  {item.indexes.length + 1}x
                </Pill>
                &nbsp;
                {item.track.name} - {item.track.album.name} - {item.track.artists[0].name}
              </Track>
            ))}
          </PlaylistDisplayContainer>
        </React.Fragment>
      ) : (
        'No duplicates found'
      )}
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
