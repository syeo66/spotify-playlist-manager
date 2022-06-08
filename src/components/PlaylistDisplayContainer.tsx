import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react'

import useResize from '../hooks/useResize'
import { PlaylistAlbumsDisplayContainer, PlaylistListDisplayContainer } from '../styles/components'

interface PlaylistDisplayContainerProps {
  mode?: 'list' | 'album'
}
const PlaylistDisplayContainer: React.FC<PropsWithChildren<PlaylistDisplayContainerProps>> = ({
  children,
  mode = 'list',
}) => {
  const list = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>()

  const handleResize = useCallback(
    () => setHeight(Math.max(window.innerHeight - (list.current?.offsetTop || 212) - 32, 150)),
    []
  )

  useResize({ onResize: handleResize })

  useEffect(() => {
    if (list.current?.offsetTop) {
      handleResize()
    }
  }, [handleResize, list.current?.offsetTop])

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
