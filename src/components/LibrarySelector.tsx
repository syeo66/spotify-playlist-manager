import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { connect } from 'react-redux'

import { retrieveTracksOverview } from '../actions'
import { token } from '../queries'
import Selector from './Selector'

interface LibrarySelectorProps {
  id: string
  retrieveTracksOverview: (auth: string | boolean) => void
  trackCount: number
}
const LibrarySelector: React.FC<LibrarySelectorProps> = ({
  id,
  retrieveTracksOverview: doRetrieveTracksOverview,
  trackCount,
}) => {
  const { data: authenticated, isLoading } = useQuery(token.key, token.query)

  useEffect(() => {
    if (isLoading || !authenticated) {
      return
    }
    doRetrieveTracksOverview(authenticated)
    const polling = setInterval(() => doRetrieveTracksOverview(authenticated), 4800)
    return () => clearInterval(polling)
  }, [authenticated, doRetrieveTracksOverview, isLoading])

  const librarySelectors = [{ id: 'tracks', name: 'Songs', trackCount: trackCount }]

  const playlists = librarySelectors.map((entry) => ({
    id: entry.id,
    pill: `${entry.trackCount}`,
    title: entry.name,
    url: `/${entry.id}`,
  }))

  return <Selector id={id} list={playlists} />
}

interface MapStateToPropsInput {
  data: { library: { trackCount: number }; user?: { id: string } }
}
const mapStateToProps = ({ data: { library, user } }: MapStateToPropsInput) => ({
  trackCount: library.trackCount,
  userId: user ? user.id : null,
})

export default connect(mapStateToProps, { retrieveTracksOverview })(LibrarySelector)
