import React from 'react';
import styled from 'styled-components';
import PlaylistList from './PlaylistList';

const MainContainer = styled.section`
  display: flex;
  flex-direction: row;
  padding: 2rem 1rem;
`;

const SideContiner = styled.aside`
  width: 0;
  flex-grow: 1;
  margin-right: 1rem;
`;
const ContentContainer = styled.main`
  width: 0;
  flex-grow: 3;
`;

const Main = () => {
  return (
    <MainContainer>
      <SideContiner>
        <PlaylistList />
      </SideContiner>
      <ContentContainer>Content</ContentContainer>
    </MainContainer>
  );
};

export default Main;
