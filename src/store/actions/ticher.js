import { LOAD_TICHER } from '../types'
import {firebase} from '../../firebase/config'

// export const loadTicher = () => {
//   return {
//     type: LOAD_TICHER,
//     data: TICHER
//   }
// }

export const loadTicher = () => {
  return async dispatch => {
  
  
      const eventref = firebase.database().ref('mediaData')
      const snapshot = await eventref.once('value')
      const value = JSON.parse(JSON.stringify(snapshot.val()))
      // console.log('мой редюс', value)
             dispatch({
              type: LOAD_TICHER,
              data: value
             })
  
    }
}