import React, { useRef } from 'react'
import styled from 'styled-components'

import { orange, white } from '../styles/colors'
import { Pill } from '../styles/components'
import { Image, Track as SpotifyTrack } from '../types'

interface TrackProps {
  track: SpotifyTrack
  pill?: string | number
}
const Track: React.FC<TrackProps> = ({ track, pill }) => {
  return (
    <TrackContainer>
      <TrackImage images={track.album.images} />
      <TrackContent>
        <TrackTitle>
          {!!pill && (
            <>
              <Pill backgroundColor={orange} color={white}>
                {pill}
              </Pill>
              &nbsp;
            </>
          )}
          {track.name}
        </TrackTitle>
        <TrackInfo>
          <TrackInfoEntry>
            <Label>Artist:</Label> {track.artists[0].name}
          </TrackInfoEntry>
          <TrackInfoEntry>
            <Label>Album:</Label> {track.album.name}
          </TrackInfoEntry>
        </TrackInfo>
      </TrackContent>
    </TrackContainer>
  )
}

interface TrackImageProps {
  images: Image[]
}
const TrackImage: React.FC<TrackImageProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const size = Math.max(40, Math.min(75, window.innerWidth * 0.15))
  // eslint-disable-next-line no-console
  console.log(window.innerWidth * 0.1)
  const [bestImage] = images.filter((i) => i.width > (size || window.innerWidth)).sort((a, b) => a.width - b.width)
  const imagePick = bestImage || images[0]

  return (
    <TrackImageContainer ref={containerRef}>
      {imagePick && <img src={imagePick.url} width={size} height={size} alt="" />}
    </TrackImageContainer>
  )
}

const TrackContent = styled.div``

const TrackImageContainer = styled.div`
  margin-right: 0.5rem;
  aspect-ratio: 1;
  border-radius: 0.5rem;
  overflow: hidden;
`

const TrackContainer = styled.div`
  min-height: 1.7rem;
  padding: 0.5rem 1rem;
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: stretch;
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
