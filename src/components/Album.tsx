import React from 'react'
import styled from 'styled-components'

import { ImageBox } from '../styles/components'
import { Album as SpotifyAlbum, AudioFeatures } from '../types'

interface AlbumProps {
  album: SpotifyAlbum
  pill?: string | number
  audioFeatures?: AudioFeatures
}
const Album: React.FC<AlbumProps> = ({ album }) => {
  const size = Math.max(40, Math.min(75, window.innerWidth * 0.15))
  const [bestImage] = album.images
    .filter((i) => i.width > (size || window.innerWidth))
    .sort((a, b) => a.width - b.width)
  const imagePick = bestImage || album.images[0]

  return (
    <AlbumContainer>
      <ImageBox>
        {imagePick && <AlbumImage src={imagePick.url} width={imagePick.width} height={imagePick.height} />}
        <AlbumInfo>
          <strong>{album.name}</strong>
          <br />
          by {album.artists.map((a) => a.name).join(', ')}
        </AlbumInfo>
      </ImageBox>
    </AlbumContainer>
  )
}

const AlbumContainer = styled.div`
  position: relative;
  overflow: hidden;
`
const AlbumImage = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  position: absolute;
  border-radius: 0.2rem;
`

const AlbumInfo = styled.div`
  position: absolute;
  padding: 0.2rem;
  color: white;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  font-size: 85%;
  width: calc(100% - 0.4rem);
  border-radius: 0 0 0.2rem 0.2rem;
  animation: slide 1s;
  opacity: 1;

  @keyframes slide {
    from {
      opacity: 0;
    }
  }
`

export default Album
