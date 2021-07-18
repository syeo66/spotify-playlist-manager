import React, { useCallback, useRef, useState } from 'react'
import { useOutsideClick } from 'rooks'
import styled from 'styled-components'

import * as colors from '../styles/colors'
import { GenericContainer, Pill } from '../styles/components'
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
              <Pill backgroundColor={colors.tertiary} color={colors.textInverted}>
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
              instrumentalness={audioFeatures.instrumentalness}
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
          {audioFeatures?.tempo && (
            <TrackInfoEntry>
              <Label>BPM:</Label> {Math.round(audioFeatures.tempo)}
            </TrackInfoEntry>
          )}
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
  instrumentalness?: number
}
const TrackStyle: React.FC<TrackStyleProps> = (props) => {
  const [showDetails, setShowDetails] = useState(false)

  const buttonRef = useRef<HTMLDivElement>(document.createElement('div'))

  const toggleShowDetails = useCallback(() => setShowDetails((v) => !v), [])

  useOutsideClick(buttonRef, toggleShowDetails, showDetails)

  const top = buttonRef.current?.offsetTop || 0
  const left = buttonRef.current?.offsetLeft || 0

  return (
    <>
      <TrackStyleButton {...props} ref={buttonRef} onClick={toggleShowDetails} />
      {showDetails && <TrackStyleContent top={top} left={left} {...props} />}
    </>
  )
}

interface TrackStyleContentProps extends TrackStyleProps {
  top: number
  left: number
}
const TrackStyleContent: React.FC<TrackStyleContentProps> = ({
  top,
  left,
  energy,
  acousticness,
  valence,
  danceability,
  instrumentalness,
}) => {
  return (
    <TrackStyleBox top={top} left={left}>
      <TrackStyleContentEntry>
        <TrackStyleContentEntryLabel>Energy</TrackStyleContentEntryLabel>
        <Bar color="#ff0000" length={energy || 0} max={150} />
      </TrackStyleContentEntry>
      <TrackStyleContentEntry>
        <TrackStyleContentEntryLabel>Acoustic</TrackStyleContentEntryLabel>
        <Bar color="#00aa00" length={acousticness || 0} max={150} />
      </TrackStyleContentEntry>
      <TrackStyleContentEntry>
        <TrackStyleContentEntryLabel>Dance</TrackStyleContentEntryLabel>
        <Bar color="#0000ff" length={danceability || 0} max={150} />
      </TrackStyleContentEntry>
      <TrackStyleContentEntry>
        <TrackStyleContentEntryLabel>Happiness</TrackStyleContentEntryLabel>
        <Bar color="#996699" length={valence || 0} max={150} />
      </TrackStyleContentEntry>
      <TrackStyleContentEntry>
        <TrackStyleContentEntryLabel>Instrumental</TrackStyleContentEntryLabel>
        <Bar color="#335599" length={instrumentalness || 0} max={150} />
      </TrackStyleContentEntry>
    </TrackStyleBox>
  )
}

const TrackStyleContentEntry = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`
const TrackStyleContentEntryLabel = styled.div`
  width: 6.2em;
`

interface BarProps {
  color: string
  max: number
  length: number
}
const Bar = styled.div<BarProps>`
  &:after {
    content: ' ';
    display: block;
    height: 0.2rem;
    background: ${({ color }) => color};
    width: ${({ length, max }) => `${length * max}px`};
    border-radius: 0.2rem;
  }
  width: ${({ max }) => `${max}px`};
`

interface TrackStyleBoxProps {
  top: number
  left: number
}
const TrackStyleBox = styled(GenericContainer)<TrackStyleBoxProps>`
  min-height: 1rem;
  font-size: clamp(0.65rem, calc(100vw / 30), 1rem);
  font-weight: normal;
  padding: 0.5rem;
  position: absolute;
  flex-direction: column;
  background: white;
  top: ${({ top }) => top + 5}px;
  left: ${({ left }) => left + 5}px;
  z-index: 100;
`

const TrackStyleButton = styled.div<TrackStyleProps>`
  position: relative;
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
  flex-shrink: 0;
  margin-right: 0.5rem;
  height: 1em;
  width: 1em;
  z-index: 0;
  background-color: ${({ energy, acousticness, danceability }) =>
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
