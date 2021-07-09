import axios from 'axios'

interface Tracks {
  href: string
}
interface Playlist {
  tracks: Tracks
}
interface Album {
  name: string
}
interface Artist {
  name: string
}
interface Track {
  album: Album
  artists: Artist[]
  id: string
  name: string
  uri: string
}
interface Item {
  added_at: string
  indexes: number[]
  track: Track
}

type FindDuplicatesType = (
  authenticated: string | boolean
) => (progressCallback: (percent: number) => boolean) => (playlist: Playlist) => Promise<Item[]>

export const findDuplicates: FindDuplicatesType =
  (authenticated: string | boolean) =>
  (progressCallback: (percent: number) => boolean) =>
  async (playlist: Playlist) => {
    const fetchPlaylist: (auth: string | boolean) => (url: string) => (itemList?: Item[]) => Promise<Item[]> =
      (auth) =>
      (url) =>
      async (itemList = []) => {
        const response = await axios({
          headers: {
            Authorization: `Bearer ${auth}`,
          },
          method: 'get',
          url,
        })
        const jsonResponse = response.data
        const items = itemList.concat(jsonResponse.items)
        let doContinue = true
        if (progressCallback && typeof progressCallback === 'function') {
          doContinue = progressCallback((100 * (jsonResponse.items.length + jsonResponse.offset)) / jsonResponse.total)
        }
        return doContinue && jsonResponse.next ? authFetchPlaylist(jsonResponse.next)(items) : items
      }

    const authFetchPlaylist = fetchPlaylist(authenticated)

    const items_1 = await authFetchPlaylist(playlist.tracks.href)()
    return items_1
      .filter((item) => !!item.track)
      .reduce(
        (() => {
          const knownItems: string[] = []
          const addedItems: string[] = []

          return (acc: Item[], item_1: Item, index: number) => {
            if (knownItems.indexOf(item_1.track.id) !== -1) {
              if (addedItems.indexOf(item_1.track.id) !== -1) {
                // if this is a duplicate and we have already added it
                // just add the index to the existing entry
                return acc.map((entry) =>
                  entry.track.id === item_1.track.id ? { ...entry, indexes: entry.indexes.concat([index]) } : entry
                )
              }

              // add a duplicate, if it is the first one found
              addedItems.push(item_1.track.id)
              return acc.concat({ ...item_1, indexes: [index] })
            }

            // no duplicate, so store it in the list of known items
            knownItems.push(item_1.track.id)
            return acc
          }
        })(),
        [] as Item[]
      )
  }
