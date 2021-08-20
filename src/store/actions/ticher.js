import { LOAD_TICHER } from '../types'
import {firebase} from '../../firebase/config'


// тут описываються функции которые мы используем в приложении , они обновляют данные в бд и передают в reduce, для изменения локального стэйта
export const loadTicher = () => {
  return async dispatch => {
  
  
      const eventref = firebase.database().ref('mediaData')
      const snapshot = await eventref.once('value')
      const value = JSON.parse(JSON.stringify(snapshot.val()))

             dispatch({
              type: LOAD_TICHER,
              data: value
             })
  
    }
}