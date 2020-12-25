import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { retrievePlaylistAlbums } from '../actions'
import { Button, ButtonContainer, PlaylistDisplayContainer, Track } from '../styles/components'
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
interface Track {
  album: Album
  artists: Artist[]
  id: string
  name: string
}
interface Item {
  track: Track
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
  authenticated: string
  id: string
  retrievePlaylistAlbums: (authenticated: string, href: string) => void
  tracks: Tracks
  playlists: Playlist[]
}

const PlaylistBrowser: React.FC<PlaylistBrowserProps> = ({
  authenticated,
  id,
  playlists,
  retrievePlaylistAlbums: doRetrievePlaylistAlbums,
  tracks,
}) => {
  const playlist = useMemo(() => retrievePlaylist(playlists)(id), [playlists, id])

  const playlistUrl = playlist ? playlist.tracks.href : null
  useEffect(() => {
    if (!playlist) {
      return
    }
    doRetrievePlaylistAlbums(authenticated, playlist.tracks.href)
  }, [playlistUrl, authenticated, playlist, doRetrievePlaylistAlbums])

  const handlePrev = () => doRetrievePlaylistAlbums(authenticated, tracks.previous)
  const handleNext = () => doRetrievePlaylistAlbums(authenticated, tracks.next)

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
        <ButtonContainer>
          <Link to={`/${id}/duplicates`}>
            <Button>Find Duplicates</Button>
          </Link>
        </ButtonContainer>
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
  auth: string
  data: { tracks: Tracks; playlists: Playlist[] }
}
const mapStateToProps = ({ auth, data: { tracks, playlists } }: MapStateToPropsInput) => {
  return {
    authenticated: auth,
    playlists: playlists ? playlists : [],
    tracks: tracks ? tracks : ({} as Tracks),
  }
}

export default connect(mapStateToProps, { retrievePlaylistAlbums })(PlaylistBrowser)
