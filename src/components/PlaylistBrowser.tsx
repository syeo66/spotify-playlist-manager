import { faArrowLeft, faArrowRight, faList, faTh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { retrievePlaylistAlbums } from '../actions'
import { playlist as playlistQuery, playlistAlbums, token } from '../queries'
import { Button, ButtonContainer, Track } from '../styles/components'
import { Column, Row } from '../styles/grid'
import Loading from './Loading'
import PlaylistDisplayContainer from './PlaylistDisplayContainer'
import PlaylistHeader from './PlaylistHeader'

const RowItem = styled.div`
  width: 0;
  display: flex;
  align-items: center;
`

interface Album {
  name: string
}
interface Artist {
  name: string
}
interface AlbumTrack {
  album: Album
  artists: Artist[]
  id: string
  name: string
}
interface Item {
  track: AlbumTrack
}
interface Tracks {
  items: Item[]
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}
interface PlaylistBrowserProps {
  id: string
  retrievePlaylistAlbums: (authenticated: string, href: string) => void
  tracks: Tracks
}

type DisplayMode = 'list' | 'album'

const PlaylistBrowser: React.FC<PlaylistBrowserProps> = ({ id, retrievePlaylistAlbums: doRetrievePlaylistAlbums }) => {
  const [page, setPage] = useState<string | null>(null)
  const [displayMode, setDisplayMode] = useState<DisplayMode>('list')

  const { data: authenticated } = useQuery(token.key, token.query)
  const { data: playlist } = useQuery([playlistQuery.key, id], () => playlistQuery.query(id), {
    enabled: !!authenticated,
  })
  const {
    data: tracks,
    isLoading,
    isPreviousData,
  } = useQuery([playlistAlbums.key, page], () => playlistAlbums.query(page || ''), {
    enabled: !!page,
    keepPreviousData: true,
  })

  useEffect(() => {
    setPage(null)
  }, [id])

  useEffect(() => {
    if (!page) {
      setPage(playlist?.tracks.href || null)
    }
  }, [page, playlist?.tracks.href])

  const handlePrev = useCallback(() => setPage(tracks?.previous || null), [tracks?.previous])
  const handleNext = useCallback(() => setPage(tracks?.next || null), [tracks?.next])

  const handleSelectAlbumView = useCallback(() => setDisplayMode('album'), [])
  const handleSelectListView = useCallback(() => setDisplayMode('list'), [])

  const pagination = useMemo(() => {
    return tracks?.next || tracks?.previous ? (
      <ButtonContainer>
        {tracks.previous ? (
          <Button onClick={handlePrev}>
            <FontAwesomeIcon title="Previous" icon={faArrowLeft} />
          </Button>
        ) : (
          <RowItem />
        )}
        <RowItem>
          {Math.ceil((tracks.offset + 1) / tracks.limit)}/{Math.ceil(tracks.total / tracks.limit)}
          {isPreviousData && (
            <>
              &nbsp;
              <Loading />
            </>
          )}
        </RowItem>
        {tracks.next ? (
          <Button onClick={handleNext}>
            <FontAwesomeIcon title="Next" icon={faArrowRight} />
          </Button>
        ) : (
          <RowItem />
        )}
      </ButtonContainer>
    ) : (
      ''
    )
  }, [
    handleNext,
    handlePrev,
    isPreviousData,
    tracks?.limit,
    tracks?.next,
    tracks?.offset,
    tracks?.previous,
    tracks?.total,
  ])

  if (isLoading || !playlist) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <PlaylistHeader playlist={playlist} />
      {id === 'tracks' ? (
        ''
      ) : (
        <Row>
          <Column>
            <ButtonContainer>
              <Link to={`/${id}/duplicates`}>
                <Button>Find Duplicates</Button>
              </Link>
            </ButtonContainer>
          </Column>

          <Column>
            <ButtonContainer justify="right">
              <Button active={displayMode === 'list'} onClick={handleSelectListView}>
                <FontAwesomeIcon icon={faList} />
              </Button>
              <Button active={displayMode === 'album'} onClick={handleSelectAlbumView}>
                <FontAwesomeIcon icon={faTh} />
              </Button>
            </ButtonContainer>
          </Column>
        </Row>
      )}
      {tracks?.items ? (
        <React.Fragment>
          {pagination}
          <PlaylistDisplayContainer>
            {tracks.items
              .filter((item) => !!item.track)
              .map((item, index) => (
                <Track key={`${item.track.id}-${index}`}>
                  {item.track.name} - {item.track.album.name} - {item.track.artists[0].name}
                </Track>
              ))}
          </PlaylistDisplayContainer>
          {pagination}
        </React.Fragment>
      ) : (
        ''
      )}
    </React.Fragment>
  )
}

interface MapStateToPropsInput {
  data: { tracks: Tracks }
}
const mapStateToProps = ({ data: { tracks } }: MapStateToPropsInput) => {
  return {
    tracks: tracks ? tracks : ({} as Tracks),
  }
}

export default connect(mapStateToProps, { retrievePlaylistAlbums })(PlaylistBrowser)
