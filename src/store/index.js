// импорт модулей Redux
import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
// Подключаем стэйт
import {loadUser} from './reducers/user'
import { loadTicher } from './reducers/ticher'
import { statUser } from './reducers/stat'



// Соединяем стэйты в общий
const rootReducer = combineReducers({
    user: loadUser,
    ticher: loadTicher,
    stat: statUser
})

export default  createStore(rootReducer,applyMiddleware(thunk))