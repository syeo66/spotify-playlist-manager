export const findDuplicates = authenticated => progressCallback => playlist => {
  const fetchPlaylist = authenticated => url => (itemList = []) => {
    return fetch(url, {
      method: 'get',
      headers: new Headers({
        Authorization: 'Bearer ' + authenticated,
      }),
    })
      .then(response => response.json())
      .then(response => {
        const items = itemList.concat(response.items);
        if (progressCallback && typeof progressCallback === 'function') {
          progressCallback((100 * (response.items.length + response.offset)) / response.total);
        }
        return response.next ? authFetchPlaylist(response.next)(items) : items;
      });
  };

  const authFetchPlaylist = fetchPlaylist(authenticated);

  return authFetchPlaylist(playlist.tracks.href)().then(items =>
    items
      .filter(item => !!item.track)
      .reduce(
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
      )
  );
};
