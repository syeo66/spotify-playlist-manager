import { useEffect } from 'react'

interface UseResizeProps {
  onResize: () => void
}
const useResize = ({ onResize }: UseResizeProps): void => {
  useEffect(() => {
    window.addEventListener('resize', onResize)
    onResize()

    return () => window.removeEventListener('resize', onResize)
  }, [onResize])
}

export default useResize
