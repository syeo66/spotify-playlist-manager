import { faGlobe, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo } from 'react'
import styled from 'styled-components'

import * as colors from '../styles/colors'
import { Pill, PlaylistHeaderContainer } from '../styles/components'

const Title = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

interface Tracks {
  href?: string
  total?: number
}
interface Playlist {
  name?: string
  owner?: { display_name: string }
  public?: boolean
  tracks: Tracks
}
interface PlaylistHeaderProps {
  playlist: Playlist
}
const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({ playlist }) => {
  return (
    <PlaylistHeaderContainer>
      <Title>
        {playlist.public ? (
          <FontAwesomeIcon title="Public" icon={faGlobe} />
        ) : (
          <FontAwesomeIcon title="Private" icon={faLock} />
        )}
        &nbsp;{playlist.name ? `«${playlist.name}»` : 'Songs'}
        {playlist.owner ? ` by ${playlist.owner.display_name}` : ''}
        &nbsp;
      </Title>
      {playlist.tracks.total && (
        <div>
          <Pill color={colors.textInverted} backgroundColor={colors.tertiary}>
            {playlist.tracks.total || 0} Tracks
          </Pill>
        </div>
      )}
    </PlaylistHeaderContainer>
  )
}

export default memo(PlaylistHeader)
