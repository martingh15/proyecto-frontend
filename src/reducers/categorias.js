import {combineReducers} from 'redux';
import merge from "lodash/merge";

//Actions
import {
    CREATE_CATEGORIA,
    RESET_CREATE_CATEGORIA,
    REQUEST_CREATE_CATEGORIA,
    RECEIVE_CREATE_CATEGORIA,
    ERROR_CREATE_CATEGORIA,
    UPDATE_CATEGORIA,
    RESET_UPDATE_CATEGORIA,
    REQUEST_UPDATE_CATEGORIA,
    RECEIVE_UPDATE_CATEGORIA,
    ERROR_UPDATE_CATEGORIA,
    INVALIDATE_CATEGORIAS,
    REQUEST_CATEGORIAS,
    ERROR_CATEGORIAS,
    RECEIVE_CATEGORIAS,
    RESET_CATEGORIAS,
    INVALIDATE_CATEGORIA_ID,
    REQUEST_CATEGORIA_ID,
    RECEIVE_CATEGORIA_ID,
    ERROR_CATEGORIA_ID,
    RESET_CATEGORIA_ID, RESET_DELETE_CATEGORIA, REQUEST_DELETE_CATEGORIA, RECEIVE_DELETE_CATEGORIA, ERROR_DELETE_CATEGORIA

} from '../actions/CategoriaActions';
import {LOGOUT_SUCCESS} from "../actions/AuthenticationActions";
import pickBy from "lodash/pickBy";

function categoriasById(state = {
    isFetching: false,
    isFetchingCategoria: false,
    didInvalidate: true,
    didInvalidateCategoria: true,
    categorias: [],
    categoria: {},
    error: null,
    success: "",
}, action) {
    switch (action.type) {
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                categorias: [],
            });
        //CATEGORIAS
        case INVALIDATE_CATEGORIAS:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case REQUEST_CATEGORIAS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_CATEGORIAS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                categorias: action.categorias.entities.categorias,
                lastUpdated: action.receivedAt,
                error: null
            });
        case ERROR_CATEGORIAS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                error: action.error
            });
        case RESET_CATEGORIAS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                error: null,
                lastUpdated: null,
                categorias: [],
            });
        //CATEGORIA
        case INVALIDATE_CATEGORIA_ID:
            return Object.assign({}, state, {
                didInvalidateCategoria: true
            });
        case REQUEST_CATEGORIA_ID:
            return Object.assign({}, state, {
                isFetchingCategoria: true,
                didInvalidateCategoria: false
            });
        case RECEIVE_CATEGORIA_ID:
            return Object.assign({}, state, {
                isFetchingCategoria: false,
                didInvalidateCategoria: false,
                categoria: action.categoria.entities.categoria,
                lastUpdated: action.receivedAt,
                error: null
            });
        case ERROR_CATEGORIA_ID:
            return Object.assign({}, state, {
                isFetchingCategoria: false,
                didInvalidateCategoria: true,
                error: action.error
            });
        case RESET_CATEGORIA_ID:
            return Object.assign({}, state, {
                isFetchingCategoria: false,
                didInvalidateCategoria: true,
                error: null,
                lastUpdated: null,
                categorias: [],
            });
        case RECEIVE_DELETE_CATEGORIA:
            return Object.assign({}, state, {
                categorias: pickBy(state.categorias, function (value, key) {
                    return parseInt(key) !== parseInt(action.idCategoria);
                })
            });
        default:
            return state
    }
}


function create(state = {
    isCreating: false,
    nuevo: {},
    success: "",
    error: null,
    ruta: '',
}, action) {
    switch (action.type) {
        //REGISTRO
        case CREATE_CATEGORIA:
            return Object.assign({}, state, {
                isCreating: false,
                success: "",
                nuevo: merge({}, state.nuevo, action.categoria),
                error: null,
            });
        case RESET_CREATE_CATEGORIA:
            return Object.assign({}, state, {
                isCreating: false,
                success: "",
                error: null,
                nuevo:{},
            });
        case REQUEST_CREATE_CATEGORIA:
            return Object.assign({}, state, {
                isCreating: true,
                success: "",
                error: null,
            });
        case RECEIVE_CREATE_CATEGORIA:
            return Object.assign({}, state, {
                isCreating: false,
                success: action.message,
                error: null,
                ruta: action.ruta,
            });
        case ERROR_CREATE_CATEGORIA:
            return Object.assign({}, state, {
                isCreating: false,
                success: "",
                error: action.error
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isCreating: false,
                success: "",
                error: "",
                nuevo: {}
            });
        default:
            return state
    }
}

let activoDefecto = {
    nombre: '',
    codigo: '',
};

function update(state = {
    isUpdating: false,
    activo: activoDefecto,
    success: "",
    error: null
}, action) {
    switch (action.type) {
        //UPDATE CATEGORIA
        case UPDATE_CATEGORIA:
            return Object.assign({}, state, {
                isUpdating: false,
                activo: merge({}, state.activo, action.categoria),
                success: "",
                error: null,
            });
        case RESET_UPDATE_CATEGORIA:
            return Object.assign({}, state, {
                isUpdating: false,
                activo: activoDefecto,
                success: "",
                error: null,
            });
        case REQUEST_UPDATE_CATEGORIA:
            return Object.assign({}, state, {
                isUpdating: true,
                success: "",
                error: null,
            });
        case RECEIVE_UPDATE_CATEGORIA:
            return Object.assign({}, state, {
                isUpdating: false,
                success: action.success,
                error: null,
            });
        case ERROR_UPDATE_CATEGORIA:
            return Object.assign({}, state, {
                isUpdating: false,
                success: "",
                error: action.error
            });
        default:
            return state
    }
}

function borrar(state = {
    isDeleting: false,
    success: "",
    error: null
}, action) {
    switch (action.type) {
        //DELETE
        case RESET_DELETE_CATEGORIA:
            return Object.assign({}, state, {
                isDeleting: false,
                success: "",
                error: null,
            });
        case REQUEST_DELETE_CATEGORIA:
            return Object.assign({}, state, {
                isDeleting: true,
                success: "",
                error: null,
            });
        case RECEIVE_DELETE_CATEGORIA:
            return Object.assign({}, state, {
                isDeleting: false,
                success: action.success,
                error: null,
            });
        case ERROR_DELETE_CATEGORIA:
            return Object.assign({}, state, {
                isDeleting: false,
                success: "",
                error: action.error
            });
        default:
            return state
    }
}

function categoriasAllIds(state = [], action) {
    switch (action.type) {
        case RECEIVE_CATEGORIAS:
            return action.categorias.result ? action.categorias.result : [];
        case RESET_CATEGORIAS:
             return [];
        default:
            return state
    }
}


const categorias = combineReducers({
    allIds: categoriasAllIds,
    byId:   categoriasById,
    create: create,
    update: update,
    delete: borrar
});

export default categorias;