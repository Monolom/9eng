import { LOAD_STAT} from '../types'

const initialState = {
    statUser: []
}
// Тут формируем состояние и изменяем его с помощью функций(action), которые передают сюда тип и объект с новыми данными. 
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