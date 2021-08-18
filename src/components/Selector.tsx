import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

import useResize from '../hooks/useResize'
import { EntryTitle, ListEntry, ListEntryLink, Pill, PlaylistSelectorContainer } from '../styles/components'

interface Entry {
  id: string
  pill?: string
  title: string
  url: string
}
interface SelectorProps {
  id: string
  list: Entry[]
}

const Selector: React.FC<SelectorProps> = ({ id, list }) => {
  const selectorRef = useRef<HTMLUListElement>(null)
  const [height, setHeight] = useState<number>()

  const handleResize = useCallback(
    () => setHeight(Math.max(window.innerHeight - (selectorRef.current?.offsetTop || 212) - 32, 150)),
    []
  )

  useResize({ onResize: handleResize })

  useEffect(() => {
    if (selectorRef.current?.offsetTop) {
      handleResize()
    }
  }, [handleResize, selectorRef.current?.offsetTop])

  const playlists = list.map((entry) => {
    const isActive = entry.id === id
    return (
      <ListEntry key={entry.id} active={isActive}>
        <ListEntryLink to={entry.url}>
          <EntryTitle>{entry.title}</EntryTitle>
          {entry.pill && <Pill active={isActive}>{entry.pill}</Pill>}
        </ListEntryLink>
      </ListEntry>
    )
  })

  return (
    <PlaylistSelectorContainer ref={selectorRef} height={height}>
      {playlists}
    </PlaylistSelectorContainer>
  )
}

export default memo(Selector)
