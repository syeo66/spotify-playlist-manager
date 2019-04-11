import styled from 'styled-components';
import { green, lightGreen } from './colors';

export const Button = styled.button`
  border: 0 transparent none;
  background-color: ${green};
  color: white;
  padding: 0 1rem;
  font-size: 1rem;
  border-radius: 0.4rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 300ms;
  outline: none;
  height: 2.4rem;
  text-transform: capitalize;

  :hover {
    background-color: ${lightGreen};
  }
`;
