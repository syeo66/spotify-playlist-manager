import React, { useMemo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ToolHeading, PlaylistContainer, Track } from '../styles/components';
import PlaylistHeader from './PlaylistHeader';
import Progress from './Progress';

const FindDuplicates = ({ id, playlists, authenticated }) => {
  const [duplicates, setDuplicates] = useState([]);
  const [progress, setProgress] = useState(null);

  const [playlist] = useMemo(() => playlists.filter(playlist => id === playlist.id), [id, playlists]);

  const findDuplicates = (authenticated, id) => {
    if (!authenticated || !id || !playlist) {
      return [];
    }

    const fetchPlaylist = (url, itemList = []) => {
      return new Promise(resolve => {
        fetch(url, {
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
              fetchPlaylist(response.next, items).then(localResponse => {
                resolve(localResponse);
              });
              return;
            }
            resolve(items);
          });
      });
    };
    fetchPlaylist(playlist.tracks.href).then(items =>
      setDuplicates(() => {
        const reducer = (() => {
          let knownItems = [];
          let addedItems = [];
          return (acc, item) => {
            if (knownItems.indexOf(item.track.id) !== -1) {
              if (addedItems.indexOf(item.track.id) !== -1) {
                return acc;
              }
              addedItems.push(item.track.id);
              return acc.concat(item);
            }

            knownItems.push(item.track.id);
            return acc;
          };
        })();

        return items.reduce(reducer, []);
      })
    );
  };

  const testPlaylist = !playlist ? null : playlist.tracks.href;
  useEffect(() => {
    findDuplicates(authenticated, id);
  }, [authenticated, id, testPlaylist]);

  return !playlist ? (
    ''
  ) : (
    <React.Fragment>
      <PlaylistHeader playlist={playlist} />
      <ToolHeading>Find Duplicates</ToolHeading>
      {progress && progress < 100 ? (
        <Progress value={progress} max={100} />
      ) : duplicates.length ? (
        <PlaylistContainer>
          {duplicates.map(item => (
            <Track key={item.track.id + item.added_at}>
              {item.track.name} - {item.track.album.name} - {item.track.artists[0].name}
            </Track>
          ))}
        </PlaylistContainer>
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
