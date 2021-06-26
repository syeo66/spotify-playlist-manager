import React, { memo } from 'react'

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

const Selector: React.FC<SelectorProps> = (props) => {
  const playlists = props.list.map((entry) => {
    const isActive = entry.id === props.id
    return (
      <ListEntry key={entry.id} active={isActive}>
        <ListEntryLink to={entry.url}>
          <EntryTitle>{entry.title}</EntryTitle>
          {entry.pill && <Pill active={isActive}>{entry.pill}</Pill>}
        </ListEntryLink>
      </ListEntry>
    )
  })

  return <PlaylistSelectorContainer>{playlists}</PlaylistSelectorContainer>
}

export default memo(Selector)
