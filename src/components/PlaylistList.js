import React, { useEffect } from 'react';
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
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: background-color 300ms, color 300ms;
  color: white;
  background-color: ${green};
  cursor: pointer;

  &:first-of-type {
    border-radius: 0.5rem 0.5rem 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 0.5rem 0.5rem;
  }

  :hover {
    background-color: ${lightGreen};
  }
`;

const EntryTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EntryCount = styled.span`
  background-color: ${yellow};
  color: ${green};
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
      return (
        <ListEntry key={entry.id}>
          <EntryTitle>{entry.name}</EntryTitle>
          <EntryCount>{entry.tracks.total}</EntryCount>
        </ListEntry>
      );
    });

  return <PlaylistContainer>{playlists}</PlaylistContainer>;
};

PlaylistList.propTypes = {
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
