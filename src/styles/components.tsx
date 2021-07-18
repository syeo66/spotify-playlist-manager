import { Link } from 'react-router-dom'
import styled from 'styled-components'

import breakpoints from '../styles/breakpoints'
import * as colors from './colors'

interface ButtonProps {
  active?: boolean
}
export const Button = styled.button<ButtonProps>`
  border: 0 transparent none;
  background-color: ${({ active }) => (active ? colors.secondary : colors.primary)};
  color: ${({ active }) => (active ? colors.primary : colors.textInverted)};
  border: 1px solid ${colors.primary};
  padding: 0 0.5rem;
  font-size: 0.8rem;
  border-radius: 0.4rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 300ms;
  outline: none;
  height: 2rem;
  text-transform: capitalize;
  white-space: nowrap;

  @media only screen and (min-width: ${breakpoints.sm}) {
    font-size: 1rem;
    padding: 0 1rem;
    height: 2.4rem;
  }

  :hover {
    color: white;
    background-color: ${colors.primaryLight};
  }
`

interface PillProps {
  active?: boolean
  backgroundColor?: string
  color?: string
}
export const Pill = styled.span<PillProps>`
  background-color: ${({ active, backgroundColor }) =>
    backgroundColor ? backgroundColor : active ? colors.primary : colors.secondary};
  color: ${({ active, color }) => (color ? color : active ? colors.secondary : colors.primary)};
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0 0.3rem;
  border-radius: 0.5em;
  white-space: nowrap;
`

interface GenericContainerProps {
  color?: string
}
export const GenericContainer = styled.div<GenericContainerProps>`
  padding: 0 1rem;
  border: 1px solid ${({ color }) => color || colors.border};
  min-height: 2.2rem;
  margin-bottom: 1rem;
  color: ${colors.text};
  border-radius: 0.5em;
  display: flex;
  box-shadow: 0 0.2rem 0.2rem ${({ color }) => color || colors.shadow}, 0 0.6rem 0.6rem ${colors.shadowPrimary};
`

export const PlaylistHeaderContainer = styled(GenericContainer)`
  height: 2.2rem;
  line-height: 2.2rem;
  justify-content: space-between;
  align-items: center;
`

export const ToolHeading = styled.h3`
  margin: 0 0 1rem;
  color: ${colors.tertiary};
  line-height: 2.2rem;
  height: 2.2rem;
  border-bottom: 1px solid ${colors.tertiary};
`

export const PlaylistListDisplayContainer = styled(GenericContainer)`
  position: relative;
  flex-direction: column;
  padding: 0;
  overflow: auto;
  @media only screen and (min-width: ${breakpoints.sm}) {
    max-height: calc(100vh - 290px);
  }
`

export const PlaylistAlbumsDisplayContainer = styled(GenericContainer)`
  display: grid;
  overflow: auto;
  padding: 2rem;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;

  @media only screen and (min-width: ${breakpoints.sm}) {
    max-height: calc(100vh - 290px - 4rem);
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media only screen and (min-width: ${breakpoints.md}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media only screen and (min-width: ${breakpoints.lg}) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
`

interface ButtonContainerProps {
  justify?: 'left' | 'right' | 'space-between'
}
export const ButtonContainer = styled.div<ButtonContainerProps>`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: ${({ justify = 'space-between' }) => {
    const mapping = new Map([
      ['left', 'flex-start'],
      ['right', 'flex-end'],
    ])

    return mapping.get(justify) || justify
  }};

  > *:not(:first-child) {
    margin-left: 0.4rem;
  }
`

interface ListEntryProps {
  active?: boolean
}
export const ListEntry = styled.li<ListEntryProps>`
  min-height: 2.2rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: background-color 300ms, color 300ms;
  background-color: ${({ active }) => (active ? colors.secondary : colors.primary)};
  color: ${({ active }) => (active ? colors.primary : colors.textInverted)};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};

  &:first-of-type {
    border-radius: 0.4rem 0.4rem 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 0.4rem 0.4rem;

    &:first-of-type {
      border-radius: 0.4rem;
    }
  }

  :hover {
    background-color: ${({ active }) => (active ? colors.secondary : colors.primaryLight)};
  }
`

export const ListEntryLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-grow: 1;
`

export const EntryTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const PlaylistSelectorContainer = styled.ul`
  border: 1px solid ${colors.primary};
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.2rem ${colors.shadow}, 0 0.6rem 0.6rem ${colors.shadowPrimary};
  margin: 0 0 1rem;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding: 0;
`

export const ImageBox = styled.div`
  aspect-ratio: 1;
  border-radius: 0.2rem;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: 0 0 20px ${colors.shadow}, 0 0 10px ${colors.shadowPrimary}, 0 0 1px ${colors.shadow};
`
