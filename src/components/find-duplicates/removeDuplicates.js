export const removeDuplicates = (authenticated, duplicates, playlist) => {
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
