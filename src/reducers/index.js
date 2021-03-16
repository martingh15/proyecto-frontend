import { combineReducers } from 'redux';
import authentication from "./authentication";
import usuarios from './usuario';

const appReducers = combineReducers({
    authentication,
    usuarios
});

export default appReducers;