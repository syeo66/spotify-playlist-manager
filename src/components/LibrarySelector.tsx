import React, { memo } from 'react'
import { useQuery } from 'react-query'

import { libraryOverview } from '../queries'
import Loading from './Loading'
import Selector from './Selector'

interface LibrarySelectorProps {
  id: string
}
const LibrarySelector: React.FC<LibrarySelectorProps> = ({ id }) => {
  const { data, isLoading } = useQuery(libraryOverview.key, libraryOverview.query, {
    refetchInterval: 10000 + Math.random() * 1000,
  })

  const librarySelectors = [{ id: 'tracks', name: 'Songs', trackCount: data?.total }]

  const playlists = librarySelectors.map((entry) => ({
    id: entry.id,
    pill: `${entry.trackCount}`,
    title: entry.name,
    url: `/${entry.id}`,
  }))

  if (isLoading) {
    return <Loading />
  }

  return <Selector id={id} list={playlists} />
}

export default memo(LibrarySelector)
