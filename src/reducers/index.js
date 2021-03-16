import { combineReducers } from 'redux'
import authentication from "./authentication"
import usuarios from './usuario'
import menu from './menu'

const appReducers = combineReducers({
    authentication,
    usuarios,
    menu
});

export default appReducers;