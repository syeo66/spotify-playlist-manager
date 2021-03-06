import { faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { memo } from 'react'

const Loading: React.FC = () => <FontAwesomeIcon icon={faSync} spin />

export default memo(Loading)
