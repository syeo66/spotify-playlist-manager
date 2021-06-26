import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { connect } from 'react-redux'

import { retrievePlaylists } from '../actions'
import { token } from '../queries'
import Selector from './Selector'

interface Tracks {
  total: number
}
interface Playlist {
  name: string
  id: string
  tracks: Tracks
}
interface PlaylistListProps {
  id: string
  playlists: Playlist[]
  userId: string | null
  retrievePlaylists: (url?: string) => void
}
const PlaylistList: React.FC<PlaylistListProps> = ({ id, playlists, retrievePlaylists: doRetrievePlaylists }) => {
  const { data: authenticated, isLoading } = useQuery(token.key, token.query)

  useEffect(() => {
    if (isLoading || !authenticated) {
      return
    }
    doRetrievePlaylists()
    const polling = setInterval(() => doRetrievePlaylists(), 10000)
    return () => clearInterval(polling)
  }, [authenticated, doRetrievePlaylists, isLoading])

  const localPlaylists = playlists
    .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
    .map((entry) => ({
      id: entry.id,
      pill: `${entry.tracks.total}`,
      title: entry.name,
      url: `/${entry.id}`,
    }))

  return <Selector id={id} list={localPlaylists} />
}

interface MapStateToPropsInput {
  data: { playlists: Playlist[]; user: { id: string } }
}
const mapStateToProps = ({ data }: MapStateToPropsInput) => ({
  playlists: data.playlists ? data.playlists : [],
  userId: data.user ? data.user.id : null,
})

export default connect(mapStateToProps, { retrievePlaylists })(PlaylistList)
