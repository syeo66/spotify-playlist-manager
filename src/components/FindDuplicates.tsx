import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'

import { orange, white } from '../styles/colors'
import { Button, ButtonContainer, Pill, PlaylistDisplayContainer, ToolHeading, Track } from '../styles/components'
import { findDuplicates, removeDuplicates } from './find-duplicates'
import PlaylistHeader from './PlaylistHeader'
import Progress from './Progress'

interface Album {
  name: string
}
interface Artist {
  name: string
}
interface Track {
  id: string
  name: string
  uri: string
  album: Album
  artists: Artist[]
}
interface Item {
  added_at: string
  indexes: number[]
  track: Track
}
interface Tracks {
  href: string
}
interface Playlist {
  id: string
  tracks: Tracks
}
interface FindDuplicatesProps {
  id: string
  authenticated: string | boolean
  playlists: Playlist[]
}
const FindDuplicates: React.FC<FindDuplicatesProps> = ({ id, playlists, authenticated }) => {
  const getPlaylist = useCallback(() => playlists.find(p => id === p.id), [id, playlists])

  const [duplicates, setDuplicates] = useState<Item[]>([])
  const [isPurging, setIsPurging] = useState(0)
  const [playlist, setPlaylist] = useState(getPlaylist())
  const [progress, setProgress] = useState<number | null>(null)

  const authFindDuplicates = useMemo(() => findDuplicates(authenticated)(setProgress), [authenticated])
  const fetchAndStoreDuplicates = useCallback(
    (pl: Playlist) => authFindDuplicates(pl).then(data => setDuplicates(data)),
    [authFindDuplicates]
  )
  const refetchDuplicates = useCallback(() => {
    if (!playlist) {
      return
    }
    fetchAndStoreDuplicates(playlist).then(() => setIsPurging(prev => prev + 1))
  }, [fetchAndStoreDuplicates, playlist])

  useEffect(() => {
    const pl = getPlaylist()
    if (pl?.id === playlist?.id) {
      return
    }
    setPlaylist(pl)
  }, [getPlaylist, playlist])

  useEffect(() => {
    if (!duplicates.length) {
      return
    }
    if (isPurging && playlist) {
      removeDuplicates(authenticated, duplicates, playlist).then(refetchDuplicates)
    }
  }, [authenticated, duplicates, isPurging, playlist, refetchDuplicates])

  useEffect(() => {
    if (!playlist?.tracks?.href) {
      return
    }
    fetchAndStoreDuplicates(playlist)
  }, [fetchAndStoreDuplicates, playlist])

  const handleRemoveDuplicatesClick = useCallback(() => setIsPurging(prev => prev + 1), [])

  return !playlist ? (
    <></>
  ) : (
    <React.Fragment>
      <PlaylistHeader playlist={playlist} />
      <ToolHeading>Find Duplicates</ToolHeading>
      {progress && progress < 100 ? (
        <Progress value={progress} max={100} />
      ) : duplicates.length ? (
        <React.Fragment>
          <ButtonContainer>
            <Button onClick={handleRemoveDuplicatesClick}>Remove Duplicates</Button>
          </ButtonContainer>
          <PlaylistDisplayContainer>
            {duplicates.map(item => (
              <Track key={item.track.id + item.added_at}>
                <Pill backgroundColor={orange} color={white}>
                  {item.indexes.length + 1}x
                </Pill>
                &nbsp;
                {item.track.name} - {item.track.album.name} - {item.track.artists[0].name}
              </Track>
            ))}
          </PlaylistDisplayContainer>
        </React.Fragment>
      ) : (
        <>No duplicates found</>
      )}
    </React.Fragment>
  )
}

interface MapStateToPropsInput {
  auth: string | boolean
  data: { tracks: Tracks; playlists: Playlist[] }
}
const mapStateToProps = ({ auth, data: { tracks, playlists } }: MapStateToPropsInput) => {
  return {
    authenticated: auth,
    playlists: playlists ? playlists : [],
    tracks: tracks ? tracks : {},
  }
}

export default connect(mapStateToProps, {})(FindDuplicates)