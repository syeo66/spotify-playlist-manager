import Dexie from 'dexie'

import { Track as TrackType } from './types'

class ManagerDatabase extends Dexie {
  tracks: Dexie.Table<Track, string>

  constructor(databaseName: string) {
    super(databaseName)
    this.version(1).stores({ tracks: `id,albumId,*artistIds,*playlistIds` })
    this.tracks = this.table('tracks')
  }
}

interface Track extends TrackType {
  albumId: string
  artistIds: string[]
  playlistIds: string[]
}

const db = new ManagerDatabase('playlistManagerCache')

export default db
