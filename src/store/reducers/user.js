import { BASE_REFRESH_REPEAT, CODE_REFRESH, LOAD_USER, REFRESH_REPEAT } from '../types'

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

      // const repetRefresh = state.allUser.repeat[action.index].map( (repeats,index)=> {
      //   if(index == action.index){
      //     repeats[action.repeat][action.types] = true
      //     repeats.time = action.time
      //   }
      //   return repeats
      // }
      // )
      
      // const codeCheak = action.code !== 0 ? action.code : state.allUser.access[action.title]

      // const newPoint = state.allUser.point + action.point
      
    
      
      return {
        ...state,allUser: {...state.allUser, repeat:{...state.allUser.repeat,[action.index]: {...state.allUser.repeat[action.index],[action.types]: {...state.allUser.repeat[action.index][action.types],[action.title]: {
          time: action.time ,
          repeat: action.repeat
        }}} }}
      }
    case BASE_REFRESH_REPEAT:
      return {
        ...state,allUser: {...state.allUser,point:state.allUser.point + action.point}
      }

    case CODE_REFRESH:
        return {
          ...state,allUser: {...state.allUser,accessRepeat: {...state.allUser.accessRepeat,[action.title]: true }}
        }

 
    default:
      return state
  }
}