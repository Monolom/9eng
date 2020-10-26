import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {loadUser} from './reducers/user'
import { loadTicher } from './reducers/ticher'
import { statUser } from './reducers/stat'


// import 'firebase/firestore'
// import 'firebase/database'
// import firebase from '../firebase/config'


const rootReducer = combineReducers({
    user: loadUser,
    ticher: loadTicher,
    stat: statUser
})

export default  createStore(rootReducer,applyMiddleware(thunk))