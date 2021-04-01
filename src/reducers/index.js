import { combineReducers } from 'redux';
import authentication from "./authentication";
import usuarios from './usuarios';
import productos from './productos';

const appReducers = combineReducers({
    authentication,
    usuarios,
	productos
});

export default appReducers;