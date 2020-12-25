import { RETRIEVE_AUTH_TOKEN } from '../actions/types'

interface Action {
  type: string
  payload?: string | boolean
}

const authReducer = (state: string | boolean, action: Action): string | boolean => {
  switch (action.type) {
    case RETRIEVE_AUTH_TOKEN:
      return action.payload || false
    default:
      return state || false
  }
}

export default authReducer
