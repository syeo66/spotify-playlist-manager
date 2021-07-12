import { PlaylistAlbumsDisplayContainer, PlaylistListDisplayContainer } from '../styles/components'

interface PlaylistDisplayContainerProps {
  mode?: 'list' | 'album'
}
const PlaylistDisplayContainer: React.FC<PlaylistDisplayContainerProps> = ({ children, mode = 'list' }) => {
  return mode === 'list' ? (
    <PlaylistListDisplayContainer>{children}</PlaylistListDisplayContainer>
  ) : (
    <PlaylistAlbumsDisplayContainer>{children}</PlaylistAlbumsDisplayContainer>
  )
}

export default PlaylistDisplayContainer
