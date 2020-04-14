import React from 'react'
import styled from 'styled-components'

import { orange } from '../styles/colors.js'

const ProgressContainer = styled.div`
  border: 1px solid ${orange};
  border-radius: 1rem;
  height: 1rem;
  font-size: 0.75rem;
  display: flex;
`

interface ProgressBarProps {
  value: number
}
const ProgressBar = styled.div<ProgressBarProps>`
  border-radius: 1rem;
  background-color: ${orange};
  overflow: hidden;
  width: ${({ value }) => `${value}%`};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 400ms linear;
`

interface ProgressProps {
  max: number
  value: number
}
const Progress: React.FC<ProgressProps> = ({ value, max }) => {
  const percentage = Math.round((100 * value) / max)

  return (
    <ProgressContainer>
      <ProgressBar value={percentage}>{percentage}%</ProgressBar>
    </ProgressContainer>
  )
}

export default Progress
