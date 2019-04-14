import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { orange } from '../styles/colors.js';

const ProgressContainer = styled.div`
  border: 1px solid ${orange};
  border-radius: 1rem;
  height: 1rem;
  font-size: 0.75rem;
  display: flex;
`;
const ProgressBar = styled.div`
  border-radius: 1rem;
  background-color: ${orange};
  overflow: hidden;
  width: ${({ value }) => value + '%'};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 400ms linear;
`;

const Progress = ({ value, max }) => {
  const percentage = Math.round((100 * value) / max);

  return (
    <ProgressContainer>
      <ProgressBar value={percentage}>{percentage}%</ProgressBar>
    </ProgressContainer>
  );
};

Progress.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default Progress;
