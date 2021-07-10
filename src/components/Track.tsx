import React from 'react'

import { orange, white } from '../styles/colors'
import { Pill, TrackContainer } from '../styles/components'
import { Track as SpotifyTrack } from '../types'

interface TrackProps {
  track: SpotifyTrack
  pill?: string | number
}
const Track: React.FC<TrackProps> = ({ track, pill }) => {
  return (
    <TrackContainer>
      {!!pill && (
        <Pill backgroundColor={orange} color={white}>
          {pill}
        </Pill>
      )}
      {track.name} - {track.album.name} - {track.artists[0].name}
    </TrackContainer>
  )
}

export default Track
