import { RETRIEVE_AUTH_TOKEN } from '../actions/types'

interface Action {
  type: string
  payload: string | boolean
}
export default (state: string | boolean = false, action: Action) => {
  switch (action.type) {
    case RETRIEVE_AUTH_TOKEN:
      return action.payload || false
    default:
      return state
  }
}
