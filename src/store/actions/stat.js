import { LOAD_STAT} from '../types'
import {firebase} from '../../firebase/config'


// тут описываються функции которые мы используем в приложении , они обновляют данные в бд и передают в reduce, для изменения локального стэйта
export const statUser = () => {
    return async dispatch => {
    
    
        const eventref = firebase.database().ref('users')
        const snapshot = await eventref.once('value')
        const value = snapshot.val()

               dispatch({
                type: LOAD_STAT,
                data: value
               })
    
      }
}