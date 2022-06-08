import React, { memo, PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from 'react-query'

import { playlists as playlistsQuery, token } from '../queries'
import { Button, ButtonContainer, ToolHeading } from '../styles/components'
import { Track } from '../types'
import { findDuplicates, removeDuplicates } from './find-duplicates'
import Loading from './Loading'
import PlaylistDisplayContainer from './PlaylistDisplayContainer'
import PlaylistHeader from './PlaylistHeader'
import Progress from './Progress'
import TrackEntry from './Track'

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
}
const FindDuplicates: React.FC<PropsWithChildren<FindDuplicatesProps>> = ({ id }) => {
  const isMounted = useRef(true)

  const { data: authenticated } = useQuery(token.key, token.query)
  const { data: playlists, isLoading } = useQuery(playlistsQuery.key, () => playlistsQuery.query(), {
    enabled: !!authenticated,
  })

  const getPlaylist = useCallback(() => playlists?.find((p) => id === p.id), [id, playlists])

  const [duplicates, setDuplicates] = useState<Item[]>([])
  const [isPurging, setIsPurging] = useState(0)
  const [progress, setProgress] = useState<number | null>(null)
  const [playlist, setPlaylist] = useState(getPlaylist())

  const authFindDuplicates = useMemo(
    () =>
      findDuplicates(authenticated || false)((value) => {
        if (!isMounted.current) {
          // eslint-disable-next-line no-console
          return false
        }
        setProgress(value)
        return true
      }),
    [authenticated]
  )
  const fetchAndStoreDuplicates = useCallback(
    async (pl: Playlist) => {
      const dupes = await authFindDuplicates(pl)
      if (!isMounted.current) {
        return
      }
      setDuplicates(dupes)
    },
    [authFindDuplicates]
  )
  const refetchDuplicates = useCallback(() => {
    if (!playlist) {
      return
    }
    fetchAndStoreDuplicates(playlist).then(() => setIsPurging((prev) => prev + 1))
  }, [fetchAndStoreDuplicates, playlist])

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    // update playlist
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
      removeDuplicates(authenticated || false, duplicates, playlist).then(refetchDuplicates)
    }
  }, [authenticated, duplicates, isPurging, playlist, refetchDuplicates])

  useEffect(() => {
    if (!playlist?.tracks?.href) {
      return
    }
    fetchAndStoreDuplicates(playlist)
  }, [fetchAndStoreDuplicates, playlist])

  const handleRemoveDuplicatesClick = useCallback(() => setIsPurging((prev) => prev + 1), [])

  if (isLoading || !playlist) {
    return <Loading />
  }

  return (
    <>
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
            {duplicates.map((item) => (
              <TrackEntry key={item.track.id + item.added_at} track={item.track} pill={`${item.indexes.length + 1}x`} />
            ))}
          </PlaylistDisplayContainer>
        </React.Fragment>
      ) : (
        <>No duplicates found</>
      )}
    </>
  )
}

export default memo(FindDuplicates)
