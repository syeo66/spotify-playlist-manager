export interface Image {
  height: number
  width: number
  url: string
}

export interface Artist {
  id: string
  name: string
  type: 'artist'
}

export interface Album {
  id: string
  name: string
  release_data: string
  images: Image[]
  type: 'album'
}

export interface Track {
  id: string
  name: string
  artists: Artist[]
  album: Album
  uri: string
  type: 'track'
}

export interface Playlist {
  id: string
  name: string
  owner: { display_name: string }
  public: boolean
  tracks: { href: string; total: number }
  type: 'playlist'
}

export interface TrackItem {
  added_at: string
  is_local: boolean
  track: Track
}

type Item = TrackItem

export interface Paging {
  id: string
  next: string
  previous: string
  offset: number
  limit: number
  total: number
  items: Item[]
}
