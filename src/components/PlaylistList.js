import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrievePlaylists } from '../actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { black, green, lightGreen, yellow } from '../styles/colors';

const PlaylistContainer = styled.ul`
  border: 1px solid ${black};
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
  margin: 0 0 1rem;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const ListEntry = styled.li`
  min-height: 2.2rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: background-color 300ms, color 300ms;
  background-color: ${({ active }) => (active ? yellow : green)};
  color: ${({ active }) => (active ? green : 'white')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};

  &:first-of-type {
    border-radius: 0.5rem 0.5rem 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 0.5rem 0.5rem;
  }

  :hover {
    background-color: ${({ active }) => (active ? yellow : lightGreen)};
  }
`;

const ListEntryLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-grow: 1;
`;

const EntryTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EntryCount = styled.span`
  background-color: ${({ active }) => (active ? green : yellow)};
  color: ${({ active }) => (active ? yellow : green)};
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0 0.3rem;
  border-radius: 0.5em;
`;

const PlaylistList = props => {
  useEffect(() => {
    props.retrievePlaylists(props.authenticated);
    const polling = setInterval(() => props.retrievePlaylists(props.authenticated), 4900);
    return () => clearInterval(polling);
  }, []);

  const playlists = props.playlists
    .sort((a, b) => {
      return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
    })
    .map(entry => {
      const isActive = entry.id === props.id;
      return (
        <ListEntry key={entry.id} active={isActive}>
          <ListEntryLink to={'/' + entry.id}>
            <EntryTitle>{entry.name}</EntryTitle>
            <EntryCount active={isActive}>{entry.tracks.total}</EntryCount>
          </ListEntryLink>
        </ListEntry>
      );
    });

  return <PlaylistContainer>{playlists}</PlaylistContainer>;
};

PlaylistList.propTypes = {
  id: PropTypes.string,
  authenticated: PropTypes.string,
  playlists: PropTypes.array.isRequired,
  userId: PropTypes.string,
  retrievePlaylists: PropTypes.func.isRequired,
};

function mapStateToProps({ auth, data }) {
  return {
    authenticated: auth,
    playlists: data.playlists ? data.playlists : [],
    userId: data.user ? data.user.id : null,
  };
}

export default connect(
  mapStateToProps,
  {
    retrievePlaylists,
  }
)(PlaylistList);
