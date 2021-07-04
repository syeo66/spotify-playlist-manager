import React, { memo } from 'react'
import { useQuery } from 'react-query'

import { playlists as playlistsQuery, token } from '../queries'
import Loading from './Loading'
import Selector from './Selector'

interface PlaylistListProps {
  id: string
}
const PlaylistList: React.FC<PlaylistListProps> = ({ id }) => {
  const { data: authenticated, isLoading: isAuthLoading } = useQuery(token.key, token.query)
  const { data: playlists, isLoading } = useQuery(playlistsQuery.key, () => playlistsQuery.query(), {
    enabled: !!authenticated,
  })

  if (isLoading || isAuthLoading) {
    return <Loading />
  }

  const localPlaylists = playlists
    ?.sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
    .map((entry) => ({
      id: entry.id,
      pill: `${entry.tracks.total}`,
      title: entry.name,
      url: `/${entry.id}`,
    }))

  return <Selector id={id} list={localPlaylists || []} />
}

export default memo(PlaylistList)
