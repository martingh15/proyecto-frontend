import history from "../history";

//Actions
import { logout } from "./AuthenticationActions";

//Api
import productos from "../api/productos";

//Constants
import * as rutas from '../constants/rutas.js';
import * as errorMessages from '../constants/MessageConstants';

//Normalizer
import {normalizeDato, normalizeDatos} from "../normalizers/normalizeProductos";

//PRODUCTO CREATE
export const CREATE_PRODUCTO		 = 'CREATE_PRODUCTO';
export const RESET_CREATE_PRODUCTO   = "RESET_CREATE_PRODUCTO";
export const REQUEST_CREATE_PRODUCTO = "REQUEST_CREATE_PRODUCTO";
export const RECEIVE_CREATE_PRODUCTO = "RECEIVE_CREATE_PRODUCTO";
export const ERROR_CREATE_PRODUCTO   = "ERROR_CREATE_PRODUCTO";

//PRODUCTOLOGUEADO CREATE
function requestCreateProducto() {
    return {
        type: REQUEST_CREATE_PRODUCTO,
    }
}

function reveiceCreateProducto(message, ruta) {
    return {
        type: RECEIVE_CREATE_PRODUCTO,
        message: message,
        receivedAt: Date.now(),
        nuevo: {},
        ruta: ruta
    }
}

export function errorCreateProducto(error) {
    return {
        type: ERROR_CREATE_PRODUCTO,
        error: error
    }
}

export function resetCreateProducto() {
    return {
        type: RESET_CREATE_PRODUCTO
    }
}

export function createProducto(producto) {
    return {
        type: CREATE_PRODUCTO,
        producto
    }
}

export function saveCreateProducto(volverA) {
    return (dispatch, getState) => {
        dispatch(requestCreateProducto());
        return productos.saveCreate(getState().productos.create.nuevo)
            .then(function (response) {
                if (response.status >= 400) {
                    return Promise.reject(response);
                } else {
                    return response.json();
                }
            })
            .then(function (data) {
                let mensaje = "El producto ha sido creado con éxito"
                if (data.message) {
                    mensaje = data.message;
                }
                dispatch(reveiceCreateProducto(mensaje));
                dispatch(resetCreateProducto());
                if (rutas.validarRuta(volverA)) {
                    history.push(volverA);
                }
            })
            .catch(function (error) {
                switch (error.status) {
                    case 401:
                        dispatch(errorCreateProducto(errorMessages.UNAUTHORIZED_TOKEN));
                        dispatch(logout());
                        return;
                    default:
                        error.json()
                            .then((error) => {
                                if (error.message !== "")
                                    dispatch(errorCreateProducto(error.message));
                                else
                                    dispatch(errorCreateProducto(errorMessages.GENERAL_ERROR));
                            })
                            .catch((error) => {
                                dispatch(errorCreateProducto(errorMessages.GENERAL_ERROR));
                            });
                        return;
                }
            });
    }
}

//PRODUCTO UPDATE
export const UPDATE_PRODUCTO		 = 'UPDATE_PRODUCTO';
export const RESET_UPDATE_PRODUCTO   = "RESET_UPDATE_PRODUCTO";
export const REQUEST_UPDATE_PRODUCTO = "REQUEST_UPDATE_PRODUCTO";
export const RECEIVE_UPDATE_PRODUCTO = "RECEIVE_UPDATE_PRODUCTO";
export const ERROR_UPDATE_PRODUCTO   = "ERROR_UPDATE_PRODUCTO";

function requestUpdateProducto() {
    return {
        type: REQUEST_UPDATE_PRODUCTO,
    }
}

function receiveUpdateProducto() {
    return {
        type: RECEIVE_UPDATE_PRODUCTO,
        receivedAt: Date.now()
    }
}

function errorUpdateProducto(error) {
    return {
        type: ERROR_UPDATE_PRODUCTO,
        error: error,
    }
}

export function resetUpdateProducto() {
    return {
        type: RESET_UPDATE_PRODUCTO
    }
}

export function updateProducto(producto) {
    return {
        type: UPDATE_PRODUCTO,
        producto
    }
}

export function saveUpdateProducto() {
    return (dispatch, getState) => {
        dispatch(requestUpdateProducto());
        return productos.saveUpdate(getState().productos.update.activo)
            .then(function (response) {
                if (response.status >= 400) {
                    return Promise.reject(response);
                } else {
                    dispatch(receiveUpdateProducto());
                    return response.json();
                }
            })
            .then((respuesta) => {
                let producto = respuesta.producto;
                dispatch(resetUpdateProducto());
                dispatch(updateProducto(producto));
            })
            .catch(function (error) {
                switch (error.status) {
                    case 401:
                        dispatch(errorUpdateProducto(errorMessages.UNAUTHORIZED_TOKEN));
                        dispatch(logout());
                        return Promise.reject(error);
                    default:
                        error.json()
                            .then(error => {
                                if (error.message !== "")
                                    dispatch(errorUpdateProducto(error.message));
                                else
                                    dispatch(errorUpdateProducto(errorMessages.GENERAL_ERROR));
                            })
                            .catch(error => {
                                dispatch(errorUpdateProducto(errorMessages.GENERAL_ERROR));
                            });
                        return;
                }
            });
    }
}

//PRODUCTO LOGUEADO
export const INVALIDATE_PRODUCTOS = 'INVALIDATE_PRODUCTOS';
export const REQUEST_PRODUCTOS    = "REQUEST_PRODUCTOS";
export const RECEIVE_PRODUCTOS    = "RECEIVE_PRODUCTOS";
export const ERROR_PRODUCTOS      = "ERROR_PRODUCTOS";
export const RESET_PRODUCTOS      = "RESET_PRODUCTOS";

export function invalidateProductos() {
    return {
        type: INVALIDATE_PRODUCTOS,
    }
}

export function resetProductos() {
    return {
        type: RESET_PRODUCTOS
    }
}

function requestProductos() {
    return {
        type: REQUEST_PRODUCTOS,
    }
}

function receiveProductos(json) {
    return {
        type: RECEIVE_PRODUCTOS,
        productos: normalizeDatos(json),
        receivedAt: Date.now()
    }
}

function errorProductos(error) {
    return {
        type: ERROR_PRODUCTOS,
        error: error,
    }
}

export function fetchProductos() {
    return dispatch => {
        dispatch(requestProductos());
        return productos.getAll()
            .then(function (response) {
                if (response.status >= 400) {
                    return Promise.reject(response);
                } else {
                    var data = response.json();
                    return data;
                }
            })
            .then(function (data) {
                dispatch(receiveProductos(data));
            })
            .catch(function (error) {
                //dispatch(logout());
                switch (error.status) {
                    case 401:
                        dispatch(errorProductos(errorMessages.UNAUTHORIZED_TOKEN));
                        return;
                    default:
                        dispatch(errorProductos(errorMessages.GENERAL_ERROR));
                        return;
                }
            });
    }
}

function shouldFetchProductos(state) {
    const productosById   = state.productos.byId;
    const productosAllIds = state.productos.allIds;
    if (productosById.isFetching) {
        return false;
    } else if (productosAllIds.length === 0) {
        return true;
    } else {
        return productosById.didInvalidate;
    }
}

export function fetchProductosIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchProductos(getState())) {
            return dispatch(fetchProductos())
        }
    }
}

//PRODUCTO
export const INVALIDATE_PRODUCTO_ID = 'INVALIDATE_PRODUCTO_ID';
export const REQUEST_PRODUCTO_ID    = "REQUEST_PRODUCTO_ID";
export const RECEIVE_PRODUCTO_ID    = "RECEIVE_PRODUCTO_ID";
export const ERROR_PRODUCTO_ID      = "ERROR_PRODUCTO_ID";
export const RESET_PRODUCTO_ID      = "RESET_PRODUCTO_ID";

export function invalidateProductoById() {
    return {
        type: INVALIDATE_PRODUCTO_ID,
    }
}

export function resetProductoById() {
    return {
        type: RESET_PRODUCTO_ID
    }
}

function requestProductoById() {
    return {
        type: REQUEST_PRODUCTO_ID,
    }
}

function receiveProductoById(json) {
    return {
        type: RECEIVE_PRODUCTO_ID,
        producto: normalizeDato(json),
        receivedAt: Date.now()
    }
}

function errorProductoById(error) {
    return {
        type: ERROR_PRODUCTO_ID,
        error: error,
    }
}

export function fetchProductoById(id) {
    return dispatch => {
        dispatch(requestProductoById());
        return productos.getProducto(id)
            .then(function (response) {
                if (response.status >= 400) {
                    return Promise.reject(response);
                } else {
                    var data = response.json();
                    return data;
                }
            })
            .then(function (data) {
                dispatch(receiveProductoById(data));
                dispatch(updateProducto(data));
            })
            .catch(function (error) {
                //dispatch(logout());
                switch (error.status) {
                    case 401:
                        dispatch(errorProductos(errorMessages.UNAUTHORIZED_TOKEN));
                        return;
                    default:
                        dispatch(errorProductos(errorMessages.GENERAL_ERROR));
                        return;
                }
            });
    }
}

function shouldFetchProductoById(id, state) {
    const productosById   = state.productos.byId;
    const productosAllIds = state.productos.allIds;
    if (productosById.isFetchingProducto) {
        return false;
    } else if (productosAllIds.length === 0) {
        return true;
    } else {
        return productosById.didInvalidateProducto;
    }
}

export function fetchProductoByIdIfNeeded(id) {
    return (dispatch, getState) => {
        if (shouldFetchProductos(id, getState())) {
            return dispatch(fetchProductos())
        }
    }
}

//PRODUCTO DELETE
export const RESET_DELETE_PRODUCTO   = "RESET_DELETE_PRODUCTO";
export const REQUEST_DELETE_PRODUCTO = "REQUEST_DELETE_PRODUCTO";
export const RECEIVE_DELETE_PRODUCTO = "RECEIVE_DELETE_PRODUCTO";
export const ERROR_DELETE_PRODUCTO   = "ERROR_DELETE_PRODUCTO";

function requestDeleteProducto() {
    return {
        type: REQUEST_DELETE_PRODUCTO,
    }
}

function receiveDeleteProducto(id, mensaje) {
    return {
        type: RECEIVE_DELETE_PRODUCTO,
        receivedAt: Date.now(),
        idProducto: id,
        success: mensaje
    }
}

function errorDeleteProducto(error) {
    return {
        type: ERROR_DELETE_PRODUCTO,
        error: error,
    }
}

export function resetDeleteProducto() {
    return {
        type: RESET_DELETE_PRODUCTO,
    }
}

export function saveDeleteProducto(id) {
    return (dispatch, getState) => {
        dispatch(requestDeleteProducto());
        return productos.borrarProducto(id)
            .then(function (response) {
                if (response.status >= 400) {
                    return Promise.reject(response);
                } else {
                    return response.json();
                }
            })
            .then((respuesta) => {
                let mensaje = respuesta.message;
                dispatch(receiveDeleteProducto(id, mensaje));
                dispatch(resetDeleteProducto());
            })
            .catch(function (error) {
                switch (error.status) {
                    case 401:
                        dispatch(errorDeleteProducto(errorMessages.UNAUTHORIZED_TOKEN));
                        dispatch(logout());
                        return Promise.reject(error);
                    default:
                        error.json()
                            .then(error => {
                                if (error.message !== "")
                                    dispatch(errorDeleteProducto(error.message));
                                else
                                    dispatch(errorDeleteProducto(errorMessages.GENERAL_ERROR));
                            })
                            .catch(error => {
                                dispatch(errorDeleteProducto(errorMessages.GENERAL_ERROR));
                            });
                        return;
                }
            });
    }
}