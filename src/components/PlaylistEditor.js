import React from 'react';
import styled from 'styled-components';
import PlaylistList from './PlaylistList';
import { Row, Column } from '../styles/grid';
import breakpoints from '../styles/breakpoints';

import PlaylistBrowser from './PlaylistBrowser';

const MainContainer = styled(Row)`
  padding: 2rem 1rem;
`;

const SideContiner = styled(Column)``;
const ContentContainer = styled(Column)`
  @media only screen and (min-width: ${breakpoints.sm}) {
    padding-left: 1rem;
  }
`;

const PlaylistEditor = ({ match }) => {
  return (
    <MainContainer>
      <SideContiner sm="2" md="1" lg="2">
        <PlaylistList id={match.params.id} />
      </SideContiner>
      <ContentContainer sm="3" md="2" lg="5">
        <PlaylistBrowser id={match.params.id} />
      </ContentContainer>
    </MainContainer>
  );
};

export default PlaylistEditor;
