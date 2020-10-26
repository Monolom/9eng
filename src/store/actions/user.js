import { BASE_REFRESH_REPEAT, LOAD_USER, REFRESH_REPEAT } from '../types'
import { USER } from '../../data'
import {firebase} from '../../firebase/config'


export const loadUser = () => {

  return async dispatch => {
    
    let userUid = await firebase.auth().currentUser.uid
    const eventref = firebase.database().ref('usersData').child(userUid)
    const snapshot = await eventref.once('value')
    const value = snapshot.val()

           dispatch({
            type: LOAD_USER,
            data: value
           })

  }

}

export const refreshRepeat = (title,index,repeat,point,time) => async dispatch => {

    let userUid = await firebase.auth().currentUser.uid
    const usersRefPoint = firebase.database().ref('users')
    const eventref = firebase.database().ref('usersData').child(userUid).child('point')
    const snapshot = await eventref.once('value')
    const value = snapshot.val() + point

    const usersRefData = firebase.database().ref('usersData')
    await usersRefData.child(userUid).child('repeat').child(title).child(index).child('time').set(time)
    await usersRefData.child(userUid).child('repeat').child(title).child(index).child(repeat).set(true)
    await usersRefData.child(userUid).child('point').set(value)
    await usersRefPoint.child(userUid).child('point').set(value)

 dispatch ({

  type: REFRESH_REPEAT,
  title: title,
  index: index,
  repeat: repeat,
  point: point,
  time: time

}) 

}

export const baseRefreshRepeat = (point) => async dispatch => {
  let userUid = await firebase.auth().currentUser.uid
  const usersRefPoint = firebase.database().ref('users')
  const usersRefData = firebase.database().ref('usersData')
  const eventref = firebase.database().ref('usersData').child(userUid).child('point')
  const snapshot = await eventref.once('value')
  const value = snapshot.val() + point
  await usersRefData.child(userUid).child('point').set(value)
  await usersRefPoint.child(userUid).child('point').set(value)

  dispatch({
    type: BASE_REFRESH_REPEAT,
    point: point
  })
  
}