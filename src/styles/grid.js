import styled from 'styled-components';
import breakpoints from './breakpoints';

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: ${breakpoints.sm}) {
    flex-direction: row;
    justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  }
`;

export const Column = styled.div`
  flex-grow: ${({ xs }) => xs || 1};
  width: 100%;
  flex-basis: 0;

  @media only screen and (min-width: ${breakpoints.sm}) {
    flex-grow: ${({ sm, xs }) => sm || xs || 1};
    width: 0;
    flex-basis: 0;
  }

  @media only screen and (min-width: ${breakpoints.md}) {
    flex-grow: ${({ md, sm, xs }) => md || sm || xs || 1};
    width: 0;
    flex-basis: 0;
  }

  @media only screen and (min-width: ${breakpoints.lg}) {
    flex-grow: ${({ lg, md, sm, xs }) => lg || md || sm || xs || 1};
    width: 0;
    flex-basis: 0;
  }
`;
