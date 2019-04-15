import React, { useMemo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { orange, white } from '../styles/colors';

import { Button, ToolHeading, PlaylistContainer, Track, Pill, ButtonContainer } from '../styles/components';
import PlaylistHeader from './PlaylistHeader';
import Progress from './Progress';

const removeDuplicates = (duplicates, authenticated, playlist) => {
  const duplicatesToApiTracksMapper = item => ({ uri: item.track.uri, positions: item.indexes });
  const toDelete = duplicates.map(duplicatesToApiTracksMapper);
  return remove100PlaylistTracks(authenticated, playlist, toDelete);
};

const remove100PlaylistTracks = (auth, playlist, trackUris = []) => {
  const deleteChunks = trackUris.splice(0, 100);
  const playlistId = playlist.id;
  const url = 'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks';

  return fetch(url, {
    method: 'delete',
    headers: new Headers({
      Authorization: 'Bearer ' + auth,
    }),
    body: JSON.stringify({
      tracks: deleteChunks,
    }),
  }).then(response => response.json());
};

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
      removeDuplicates(duplicates, authenticated, playlist).then(refetchDuplicates);
    }
  }, [isPurging]);

  useEffect(() => {
    findDuplicates(authenticated, id);
  }, [authenticated, id, testPlaylist]);

  const refetchDuplicates = () => findDuplicates(authenticated, id).then(() => setIsPurging(prev => prev + 1));

  // this is quite a bit complex. Might need some refactoring
  const findDuplicates = (authenticated, id) => {
    return new Promise(outerResolve => {
      if (!authenticated || !id || !playlist) {
        outerResolve();
        return;
      }

      const fetchPlaylist = (authenticated, url, itemList = []) => {
        return fetch(url, {
          method: 'get',
          headers: new Headers({
            Authorization: 'Bearer ' + authenticated,
          }),
        })
          .then(response => response.json())
          .then(response => {
            const items = itemList.concat(response.items);
            setProgress((100 * (response.items.length + response.offset)) / response.total);
            if (response.next) {
              // if we have more pages to load, append them to items
              return fetchPlaylist(authenticated, response.next, items);
            }
            return itemList;
          });
      };

      fetchPlaylist(authenticated, playlist.tracks.href).then(items =>
        setDuplicates(() => {
          outerResolve();
          return items.reduce(
            (() => {
              let knownItems = [];
              let addedItems = [];
              return (acc, item, index) => {
                if (knownItems.indexOf(item.track.id) !== -1) {
                  if (addedItems.indexOf(item.track.id) !== -1) {
                    // if this is a duplicate and we have already added it
                    // just add the index to the existing entry
                    return acc.map(entry =>
                      entry.track.id === item.track.id ? { ...entry, indexes: entry.indexes.concat([index]) } : entry
                    );
                  }

                  // add a duplicate, if it is the first one found
                  addedItems.push(item.track.id);
                  return acc.concat({ ...item, indexes: [index] });
                }

                // no duplicate, so store it in the list of known items
                knownItems.push(item.track.id);
                return acc;
              };
            })(),
            []
          );
        })
      );
    });
  };

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
          <PlaylistContainer>
            {duplicates.map(item => (
              <Track key={item.track.id + item.added_at}>
                <Pill backgroundColor={orange} color={white}>
                  {item.indexes.length + 1}x
                </Pill>
                &nbsp;
                {item.track.name} - {item.track.album.name} - {item.track.artists[0].name}
              </Track>
            ))}
          </PlaylistContainer>
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
