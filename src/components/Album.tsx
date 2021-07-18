import React from 'react'
import styled from 'styled-components'

import { ImageBox } from '../styles/components'
import { AudioFeatures, Track as SpotifyTrack } from '../types'

interface AlbumProps {
  track: SpotifyTrack
  pill?: string | number
  audioFeatures?: AudioFeatures
}
const Album: React.FC<AlbumProps> = ({ track }) => {
  const size = Math.max(40, Math.min(75, window.innerWidth * 0.15))
  const [bestImage] = track.album.images
    .filter((i) => i.width > (size || window.innerWidth))
    .sort((a, b) => a.width - b.width)
  const imagePick = bestImage || track.album.images[0]

  return (
    <AlbumContainer>
      <ImageBox>
        {imagePick && <AlbumImage src={imagePick.url} width={imagePick.width} height={imagePick.height} />}
        <AlbumInfo>Stuff</AlbumInfo>
      </ImageBox>
    </AlbumContainer>
  )
}

const AlbumContainer = styled.div`
  position: relative;
`
const AlbumImage = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  position: absolute;
`

const AlbumInfo = styled.div`
  position: absolute;
  padding: 0.2rem;
  color: white;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: calc(100% - 0.4rem);
`

export default Album
