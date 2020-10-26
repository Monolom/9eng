import { LOAD_TICHER } from '../types'

const initialState = {
  allTicher: []
}

export const loadTicher = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TICHER:
      return {
        ...state,
        allTicher: action.data
      }
 
    default:
      return state
  }
}