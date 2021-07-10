import React from 'react'
import styled from 'styled-components'

import { orange, white } from '../styles/colors'
import { Pill } from '../styles/components'
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
      <TrackTitle>{track.name}</TrackTitle>
      <TrackInfo>
        <TrackInfoEntry>
          <Label>Artist:</Label> {track.artists[0].name}
        </TrackInfoEntry>
        <TrackInfoEntry>
          <Label>Album:</Label> {track.album.name}
        </TrackInfoEntry>
      </TrackInfo>
    </TrackContainer>
  )
}

const TrackContainer = styled.div`
  min-height: 1.7rem;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  &:last-of-type {
    border-radius: 0 0 0.4rem 0.4rem;
  }
`
const TrackTitle = styled.div`
  font-size: 110%;
  font-weight: bold;
`
const TrackInfo = styled.div`
  display: flex;
  margin-top: 0.5rem;
`
const TrackInfoEntry = styled.div`
  &:not(:first-child) {
    margin-left: 1rem;
  }
`

const Label = styled.span`
  color: rgba(0, 0, 0, 0.4);
  font-weight: bold;
`

export default Track
