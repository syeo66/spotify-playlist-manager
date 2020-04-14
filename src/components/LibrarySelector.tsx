import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { retrieveTracksOverview } from '../actions'
import Selector from './Selector'

interface LibrarySelectorProps {
  authenticated: string | boolean
  id: string
  retrieveTracksOverview: (auth: string | boolean) => void
  trackCount: number
}
const LibrarySelector: React.FC<LibrarySelectorProps> = ({
  authenticated,
  id,
  retrieveTracksOverview: doRetrieveTracksOverview,
  trackCount,
}) => {
  useEffect(() => {
    doRetrieveTracksOverview(authenticated)
    const polling = setInterval(() => doRetrieveTracksOverview(authenticated), 4800)
    return () => clearInterval(polling)
  }, [authenticated, doRetrieveTracksOverview])

  const librarySelectors = [{ id: 'tracks', name: 'Songs', trackCount: trackCount }]

  const playlists = librarySelectors.map(entry => ({
    id: entry.id,
    pill: `${entry.trackCount}`,
    title: entry.name,
    url: `/${entry.id}`,
  }))

  return <Selector id={id} list={playlists} />
}

interface MapStateToPropsInput {
  auth: string | boolean
  data: { library: { trackCount: number }; user?: { id: string } }
}
const mapStateToProps = ({ auth, data: { library, user } }: MapStateToPropsInput) => ({
  authenticated: auth,
  trackCount: library.trackCount,
  userId: user ? user.id : null,
})

export default connect(mapStateToProps, { retrieveTracksOverview })(LibrarySelector)
