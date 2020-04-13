interface Tracks {
  href: string;
}
interface Playlist {
  tracks: Tracks;
}
interface Track {
  id: string;
}
interface Item {
  track: Track;
  indexes: number[];
}

export const findDuplicates = (authenticated: string) => (progressCallback: (percent: number) => void) => (
  playlist: Playlist
) => {
  const fetchPlaylist: (
    authenticated: string
  ) => (url: string) => (itemList?: Item[]) => Promise<Item[]> = authenticated => url => async (itemList = []) => {
    const response = await fetch(url, {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${authenticated}`,
      }),
    });
    const jsonResponse = await response.json();
    const items = itemList.concat(jsonResponse.items);
    if (progressCallback && typeof progressCallback === 'function') {
      progressCallback((100 * (jsonResponse.items.length + jsonResponse.offset)) / jsonResponse.total);
    }
    return jsonResponse.next ? authFetchPlaylist(jsonResponse.next)(items) : items;
  };

  const authFetchPlaylist = fetchPlaylist(authenticated);

  return authFetchPlaylist(playlist.tracks.href)().then(items =>
    items
      .filter(item => !!item.track)
      .reduce(
        (() => {
          let knownItems: string[] = [];
          let addedItems: string[] = [];
          return (acc: Item[], item: Item, index: number) => {
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
        [] as Item[]
      )
  );
};
