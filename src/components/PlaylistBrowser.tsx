import { faArrowLeft, faArrowRight, faList, faTh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { retrievePlaylistAlbums } from '../actions'
import { token } from '../queries'
import { Button, ButtonContainer, Track } from '../styles/components'
import { Column, Row } from '../styles/grid'
import PlaylistDisplayContainer from './PlaylistDisplayContainer'
import PlaylistHeader from './PlaylistHeader'

const RowItem = styled.div`
  width: 0;
  display: flex;
  align-items: center;
`

const retrievePlaylist: (playlists: Array<Playlist>) => (id: string) => Playlist = (playlists) => (id: string) => {
  const defaultPlaylist = {
    tracks: {
      href: 'https://api.spotify.com/v1/me/tracks?limit=50',
    },
  }
  if (id === 'tracks') {
    return defaultPlaylist
  }
  return playlists.find((playlist) => id === playlist.id) || defaultPlaylist
}

interface Playlist {
  id?: string
  name?: string
  owner?: { display_name: string }
  public?: boolean
  tracks: { href: string; total?: number }
}
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
  playlists: Playlist[]
}

type DisplayMode = 'list' | 'album'

const PlaylistBrowser: React.FC<PlaylistBrowserProps> = ({
  id,
  playlists,
  retrievePlaylistAlbums: doRetrievePlaylistAlbums,
  tracks,
}) => {
  const { data: authenticated, isLoading } = useQuery(token.key, token.query)
  const [displayMode, setDisplayMode] = useState<DisplayMode>('list')

  const playlist = useMemo(() => retrievePlaylist(playlists)(id), [playlists, id])

  const playlistUrl = playlist ? playlist.tracks.href : null
  useEffect(() => {
    if (isLoading || !authenticated || !playlist) {
      return
    }
    doRetrievePlaylistAlbums(authenticated, playlist.tracks.href)
  }, [playlistUrl, authenticated, playlist, doRetrievePlaylistAlbums, isLoading])

  const handlePrev = useCallback(() => {
    if (isLoading || !authenticated) {
      return
    }
    doRetrievePlaylistAlbums(authenticated, tracks.previous)
  }, [authenticated, doRetrievePlaylistAlbums, isLoading, tracks.previous])

  const handleNext = useCallback(() => {
    if (isLoading || !authenticated) {
      return
    }
    doRetrievePlaylistAlbums(authenticated, tracks.next)
  }, [authenticated, doRetrievePlaylistAlbums, isLoading, tracks.next])

  const handleSelectAlbumView = useCallback(() => setDisplayMode('album'), [])
  const handleSelectListView = useCallback(() => setDisplayMode('list'), [])

  const pagination =
    tracks.next || tracks.previous ? (
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

  return !playlist ? (
    <></>
  ) : (
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
      {tracks.items ? (
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
  data: { tracks: Tracks; playlists: Playlist[] }
}
const mapStateToProps = ({ data: { tracks, playlists } }: MapStateToPropsInput) => {
  return {
    playlists: playlists ? playlists : [],
    tracks: tracks ? tracks : ({} as Tracks),
  }
}

export default connect(mapStateToProps, { retrievePlaylistAlbums })(PlaylistBrowser)
