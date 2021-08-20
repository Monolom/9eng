import { BASE_REFRESH_REPEAT, CODE_REFRESH, LOAD_USER, REFRESH_REPEAT } from '../types'

const initialState = {
  allUser: {}
}
// Тут формируем состояние и изменяем его с помощью функций(action), которые передают сюда тип и объект с новыми данными. 
export const loadUser = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        allUser: action.data
      }

    case REFRESH_REPEAT:

 
      
    
      
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