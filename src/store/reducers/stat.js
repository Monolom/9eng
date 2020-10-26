import { LOAD_STAT} from '../types'

const initialState = {
    statUser: []
}

export const statUser = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STAT:
      return {
        ...state,
        statUser: action.data
      }
 
    default:
      return state
  }
}