import { combineReducers } from 'redux';
import authentication from "./authentication";
import usuarios from './usuarios';
import productos from './productos';
import categorias from './categorias';

const appReducers = combineReducers({
    authentication,
    usuarios,
	productos,
    categorias
});

export default appReducers;