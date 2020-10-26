import { LOAD_STAT} from '../types'
import {firebase} from '../../firebase/config'



export const statUser = () => {
    return async dispatch => {
    
    
        const eventref = firebase.database().ref('users')
        const snapshot = await eventref.once('value')
        const value = snapshot.val()
        // console.log('мой редюс', value)
               dispatch({
                type: LOAD_STAT,
                data: value
               })
    
      }
}