import React, { useRef } from 'react'
import styled from 'styled-components'

import { orange, white } from '../styles/colors'
import { Pill } from '../styles/components'
import { AudioFeatures, Image, Track as SpotifyTrack } from '../types'

interface TrackProps {
  track: SpotifyTrack
  pill?: string | number
  audioFeatures?: AudioFeatures
}
const Track: React.FC<TrackProps> = ({ track, pill, audioFeatures }) => {
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
          {!!audioFeatures && (
            <TrackStyle
              energy={audioFeatures.energy}
              valence={audioFeatures.valence}
              acousticness={audioFeatures.acousticness}
              danceability={audioFeatures.danceability}
            />
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
          <TrackInfoEntry>
            <Label>BPM:</Label> {audioFeatures?.tempo}
          </TrackInfoEntry>
        </TrackInfo>
      </TrackContent>
    </TrackContainer>
  )
}

interface TrackStyleProps {
  energy?: number
  acousticness?: number
  valence?: number
  danceability?: number
}
const TrackStyle = styled.div<TrackStyleProps>`
  width: 1em;
  height: 1em;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
  margin-right: 0.5rem;
  background-color: ${({ energy, acousticness, valence, danceability }) =>
    `rgba(${(energy || 0) * 255}, ${(acousticness || 0) * 255},${(danceability || 0) * 255},  1)`};
`

interface TrackImageProps {
  images: Image[]
}
const TrackImage: React.FC<TrackImageProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const size = Math.max(40, Math.min(75, window.innerWidth * 0.15))
  const [bestImage] = images.filter((i) => i.width > (size || window.innerWidth)).sort((a, b) => a.width - b.width)
  const imagePick = bestImage || images[0]

  return (
    <TrackImageContainer ref={containerRef}>
      <TrackImageBox>{imagePick && <img src={imagePick.url} width={size} height={size} alt="" />}</TrackImageBox>
    </TrackImageContainer>
  )
}

const TrackContent = styled.div``

const TrackImageContainer = styled.div`
  margin-right: 0.5rem;
  flex-shrink: 0;
`

const TrackImageBox = styled.div`
  aspect-ratio: 1;
  border-radius: 0.2rem;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2), 0 0 10px rgba(27, 153, 139, 0.5), 0 0 1px rgba(0, 0, 0, 0.6);
`

const TrackContainer = styled.div`
  min-height: 1.7rem;
  padding: 0.5rem 1rem;
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: stretch;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  img {
    transition: transform 1s;
  }
  &:hover {
    img {
      transform: rotateZ(10deg) scale(1.3);
    }
  }
  &:last-of-type {
    border-radius: 0 0 0.4rem 0.4rem;
  }
`
const TrackTitle = styled.div`
  font-size: 110%;
  font-weight: bold;
  display: flex;
  align-items: center;
`
const TrackInfo = styled.div`
  display: flex;
  margin-top: 0.5rem;
`
const TrackInfoEntry = styled.div`
  &:not(:first-child) {
    margin-left: 1rem;
  }
  font-size: clamp(0.65rem, calc(100vw / 30), 1rem);
`

const Label = styled.span`
  color: rgba(0, 0, 0, 0.4);
  font-weight: bold;
`

export default Track
