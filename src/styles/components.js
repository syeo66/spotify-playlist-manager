import styled from 'styled-components';
import { green, lightGreen, yellow } from './colors';
import breakpoints from '../styles/breakpoints';

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
