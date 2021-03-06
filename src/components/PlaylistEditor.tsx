import React, { memo } from 'react'
import { useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

import breakpoints from '../styles/breakpoints'
import { Column, Row } from '../styles/grid'
import LibrarySelector from './LibrarySelector'
import PlaylistList from './PlaylistList'

const MainContainer = styled(Row)`
  padding: 2rem 1rem;
`

const SideContainer = styled(Column)``
const ContentContainer = styled(Column)`
  @media only screen and (min-width: ${breakpoints.sm}) {
    padding-left: 1rem;
  }
`

interface PlaylistEditorProps {
  component: React.ComponentType<{ id: string }>
}
const PlaylistEditor: React.FC<PlaylistEditorProps> = ({ component: ToolComponent }) => {
  const match = useRouteMatch<{ id: string }>()

  return (
    <MainContainer>
      <SideContainer sm="2" md="1" lg="2">
        <LibrarySelector id={match.params.id} />
        <PlaylistList id={match.params.id} />
      </SideContainer>
      <ContentContainer sm="3" md="2" lg="5">
        <ToolComponent id={match.params.id} />
      </ContentContainer>
    </MainContainer>
  )
}

export default memo(PlaylistEditor)
