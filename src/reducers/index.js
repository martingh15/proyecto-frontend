import { combineReducers } from 'redux';
import authentication from "./authentication";
import usuarios from './usuarios';
import productos from './productos';
import categorias from './categorias';
import pedidos from './pedidos';

const appReducers = combineReducers({
    authentication,
    usuarios,
	productos,
    categorias,
    pedidos
});

export default appReducers;