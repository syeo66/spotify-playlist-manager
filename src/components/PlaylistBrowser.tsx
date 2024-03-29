import { faArrowLeft, faArrowRight, faList, faTh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { audioFeatures, playlist as playlistQuery, playlistAlbums, token } from '../queries'
import { Button, ButtonContainer } from '../styles/components'
import { Column, Row } from '../styles/grid'
import { Album as SpotifyAlbum, AudioFeatures } from '../types'
import Album from './Album'
import Loading from './Loading'
import PlaylistDisplayContainer from './PlaylistDisplayContainer'
import PlaylistHeader from './PlaylistHeader'
import Track from './Track'

const RowItem = styled.div`
  width: 0;
  display: flex;
  align-items: center;
`

interface PlaylistBrowserProps {
  id: string
}

type DisplayMode = 'list' | 'album'

const PlaylistBrowser: React.FC<PlaylistBrowserProps> = ({ id }) => {
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
  const ids = tracks ? tracks.items.map((i) => i.track?.id) : []
  const { data: aFeatures } = useQuery([audioFeatures.key, ids], () => audioFeatures.query(ids), { enabled: !!tracks })
  const features: Record<string, AudioFeatures> =
    aFeatures?.reduce((acc, a) => (a?.id ? { ...acc, [a.id]: a } : acc), {}) || {}

  useEffect(() => {
    if (id === 'tracks' && displayMode !== 'list') {
      setDisplayMode('list')
    }
  }, [displayMode, id])

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

  const albums =
    displayMode === 'list'
      ? []
      : (tracks?.items || []).reduce<[SpotifyAlbum[], Record<string, boolean>]>(
          ([albs, memory], i) => {
            const { album } = i.track

            if (!memory[album.id]) {
              return [[...albs, album], { ...memory, [album.id]: true }]
            }

            return [albs, memory]
          },
          [[], {}]
        )[0]

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
          <PlaylistDisplayContainer mode={displayMode}>
            {displayMode === 'list'
              ? tracks.items
                  .filter((item) => !!item.track)
                  .map((item, index) => (
                    <Track
                      key={`${item.track.id}-${index}`}
                      track={item.track}
                      audioFeatures={features[item.track.id]}
                    />
                  ))
              : albums.map((item, index) => <Album key={`${item.id}-${index}`} album={item} />)}
          </PlaylistDisplayContainer>
        </React.Fragment>
      ) : (
        ''
      )}
    </React.Fragment>
  )
}

export default memo(PlaylistBrowser)
