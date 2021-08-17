import { useEffect, useRef, useState } from 'react'

import { PlaylistAlbumsDisplayContainer, PlaylistListDisplayContainer } from '../styles/components'

interface PlaylistDisplayContainerProps {
  mode?: 'list' | 'album'
}
const PlaylistDisplayContainer: React.FC<PlaylistDisplayContainerProps> = ({ children, mode = 'list' }) => {
  const list = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>()
  // eslint-disable-next-line no-console
  console.log({ height })

  useEffect(() => {
    const resize = () => setHeight(Math.max(window.innerHeight - (list.current?.offsetTop || 212) - 32, 150))

    window.addEventListener('resize', resize)
    resize()

    return () => window.removeEventListener('resize', resize)
  }, [])

  return mode === 'list' ? (
    <PlaylistListDisplayContainer ref={list} height={height}>
      {children}
    </PlaylistListDisplayContainer>
  ) : (
    <PlaylistAlbumsDisplayContainer ref={list} height={height}>
      {children}
    </PlaylistAlbumsDisplayContainer>
  )
}

export default PlaylistDisplayContainer
