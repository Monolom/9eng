import { BASE_REFRESH_REPEAT, CODE_REFRESH, LOAD_USER, REFRESH_REPEAT } from '../types'
import { USER } from '../../data'
import {firebase} from '../../firebase/config'

// тут описываються функции которые мы используем в приложении , они обновляют данные в бд и передают в reduce, для изменения локального стэйта
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

export const refreshRepeat = (
  // принмаем параметры
  index,types,title,time
  ) => async dispatch => {
    // получаем от firebase уникальный id пользователя
    let userUid = await firebase.auth().currentUser.uid

    // получаем ссылки на нужные лементы объекта бд
    const usersRefData = firebase.database().ref('usersData')
    const eventref = usersRefData.child(userUid).child('repeat').child(index).child(types).child(title).child('repeat')
    const eventref2 = usersRefData.child(userUid).child('repeat').child(index).child(types).child(title).child('time')
    // получаем значение
    const snapshot = await eventref.once('value')
    // редактируем значение
    const valueRepeat = snapshot.val() + 1
    // передаём в бд
    await usersRefData.child(userUid).child('repeat').child(index).child(types).child(title).child('time').set(time)
    await usersRefData.child(userUid).child('repeat').child(index).child(types).child(title).child('repeat').set(valueRepeat)
  
// передаём в Reduser

 dispatch ({
// тип который связвает action и reduser
  type: REFRESH_REPEAT,
// параметры
  title: title,
  index: index,
  repeat: valueRepeat,
  time: time,
  types: types,

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

export const codeRefresh = (title) => async dispatch => {
  let userUid = await firebase.auth().currentUser.uid
  const codeRef = firebase.database().ref('usersData')
  await codeRef.child(userUid).child('accessRepeat').child(title).set(true)

  dispatch({

    type: CODE_REFRESH,
    title: title

  })
  
}