import React from 'react';
import PropTypes from 'prop-types';

import { ListEntry, ListEntryLink, EntryTitle, Pill, PlaylistSelectorContainer } from '../styles/components';

const Selector = props => {
  const playlists = props.list.map(entry => {
    const isActive = entry.id === props.id;
    return (
      <ListEntry key={entry.id} active={isActive}>
        <ListEntryLink to={entry.url}>
          <EntryTitle>{entry.title}</EntryTitle>
          {entry.pill && <Pill active={isActive}>{entry.pill}</Pill>}
        </ListEntryLink>
      </ListEntry>
    );
  });

  return <PlaylistSelectorContainer>{playlists}</PlaylistSelectorContainer>;
};

Selector.propTypes = {
  id: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default Selector;
