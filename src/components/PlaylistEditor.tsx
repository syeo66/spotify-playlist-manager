import React, { memo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import breakpoints from '../styles/breakpoints'
import { Column, Row } from '../styles/grid'
import LibrarySelector from './LibrarySelector'
import PlaylistList from './PlaylistList'

const MainContainer = styled(Row)`
  padding: 2rem 1rem 0;
`

const SideContainer = styled(Column)``
const ContentContainer = styled(Column)`
  @media only screen and (min-width: ${breakpoints.sm}) {
    padding-left: 1rem;
  }
`

interface PlaylistEditorProps {
  // TODO find a way to properly type this. There seems to be a conflict with style-components
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<{ id: string }> | any
}
const PlaylistEditor: React.FC<PlaylistEditorProps> = ({ component: ToolComponent }) => {
  const params = useParams()

  const id = params.id || ''

  return (
    <MainContainer>
      <SideContainer sm="2" md="1" lg="2">
        <LibrarySelector id={id} />
        <PlaylistList id={id} />
      </SideContainer>
      <ContentContainer sm="3" md="2" lg="5">
        <ToolComponent id={id} />
      </ContentContainer>
    </MainContainer>
  )
}

export default memo(PlaylistEditor)
