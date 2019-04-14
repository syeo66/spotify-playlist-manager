import styled from 'styled-components';
import { green, lightGreen, yellow, black, orange } from './colors';
import breakpoints from '../styles/breakpoints';
import Color from 'color';

export const Button = styled.button`
  border: 0 transparent none;
  background-color: ${green};
  color: white;
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
    background-color: ${lightGreen};
  }
`;

export const Pill = styled.span`
  background-color: ${({ active, backgroundColor }) => (backgroundColor ? backgroundColor : active ? green : yellow)};
  color: ${({ active, color }) => (color ? color : active ? yellow : green)};
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0 0.3rem;
  border-radius: 0.5em;
`;

export const GenericContainer = styled.div`
  padding: 0 1rem;
  border-bottom: 1px solid
    ${({ color }) =>
      Color(color || black)
        .alpha(0.2)
        .string()};
  min-height: 2.2rem;
  margin-bottom: 1rem;
  color: ${black};
  border-radius: 0.5em;
  display: flex;
  box-shadow: 0 0.2rem 0.5rem
    ${({ color }) =>
      Color(color || black)
        .alpha(0.2)
        .string()};
`;

export const PlaylistHeaderContainer = styled(GenericContainer)`
  height: 2.2rem;
  line-height: 2.2rem;
  justify-content: space-between;
  align-items: center;
`;

export const ToolHeading = styled.h3`
  margin: 0 0 1rem;
  color: ${orange};
  line-height: 2.2rem;
  height: 2.2rem;
  border-bottom: 1px solid ${orange};
`;

export const PlaylistContainer = styled(GenericContainer)`
  flex-direction: column;
  padding: 0;
`;

export const Track = styled.div`
  min-height: 1.7rem;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  &:last-of-type {
    border-radius: 0 0 0.4rem 0.4rem;
  }
`;

export const ButtonContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
