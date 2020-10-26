import { BASE_REFRESH_REPEAT, LOAD_USER, REFRESH_REPEAT } from '../types'

const initialState = {
  allUser: {}
}

export const loadUser = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        allUser: action.data
      }

    case REFRESH_REPEAT:
      const repetRefresh = state.allUser.repeat[action.title].map( (repeats,index)=> {
        if(index == action.index){
          repeats[action.repeat] = true
          repeats.time = action.time
        }
        return repeats
      }
      )

    
      
      return {
        ...state,allUser: {...state.allUser,point:action.point,repeat:{...state.allUser.repeat,[action.title]: repetRefresh }}
      }
    case BASE_REFRESH_REPEAT:
      return {
        ...state,allUser: {...state.allUser,point:state.allUser.point + action.point}
      }

 
    default:
      return state
  }
}