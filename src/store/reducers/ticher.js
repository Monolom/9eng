import { LOAD_TICHER } from '../types'

const initialState = {
  allTicher: []
}
// Тут формируем состояние и изменяем его с помощью функций(action), которые передают сюда тип и объект с новыми данными. 
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