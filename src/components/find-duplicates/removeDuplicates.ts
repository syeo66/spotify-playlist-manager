interface Playlist {
  id: string;
}
interface Track {
  uri: string;
}
interface Item {
  indexes: number[];
  track: Track;
}

export const removeDuplicates = (authenticated: string, duplicates: Item[], playlist: Playlist) => {
  const duplicatesToApiTracksMapper = (item: Item) => ({ uri: item.track.uri, positions: item.indexes });
  const toDelete = duplicates.map(duplicatesToApiTracksMapper);
  return remove100PlaylistTracks(authenticated, playlist, toDelete);
};

const remove100PlaylistTracks = async (auth: string, playlist: Playlist, trackUris: Track[] = []) => {
  const deleteChunks = trackUris.splice(0, 100);
  const playlistId = playlist.id;
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  const response = await fetch(url, {
    method: 'delete',
    headers: new Headers({
      Authorization: 'Bearer ' + auth,
    }),
    body: JSON.stringify({
      tracks: deleteChunks,
    }),
  });
  return await response.json();
};
