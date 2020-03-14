import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import breakpoints from '../styles/breakpoints';
import { Row, Column } from '../styles/grid';

import PlaylistList from './PlaylistList';
import LibrarySelector from './LibrarySelector';

const MainContainer = styled(Row)`
  padding: 2rem 1rem;
`;

const SideContiner = styled(Column)``;
const ContentContainer = styled(Column)`
  @media only screen and (min-width: ${breakpoints.sm}) {
    padding-left: 1rem;
  }
`;

const PlaylistEditor = ({ match, component: ToolComponent }) => {
  return (
    <MainContainer>
      <SideContiner sm="2" md="1" lg="2">
        <LibrarySelector id={match.params.id} />
        <PlaylistList id={match.params.id} />
      </SideContiner>
      <ContentContainer sm="3" md="2" lg="5">
        <ToolComponent id={match.params.id} />
      </ContentContainer>
    </MainContainer>
  );
};

PlaylistEditor.propTypes = {
  match: PropTypes.object,
  component: PropTypes.object.isRequired,
};

export default PlaylistEditor;