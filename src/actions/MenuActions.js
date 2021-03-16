import menus from "./../api/menus"
import history from "../history"
import * as rutas from "../constants/rutas"
import * as errorMessages from '../constants/MessageConstants'
import {logout} from "../actions/AuthenticationActions"

export const CREATE_MENU = 'CREATE_MENU';
export const RESET_CREATE_MENU = "RESET_CREATE_MENU";
export const REQUEST_CREATE_MENU = "REQUEST_CREATE_MENU";
export const RECEIVE_CREATE_MENU = "RECEIVE_CREATE_MENU";
export const ERROR_CREATE_MENU = "ERROR_CREATE_MENU";

function requestCreateMenu() {
    return {
        type: REQUEST_CREATE_MENU,
    }
}

function reveiceCreateMenu(message) {
    return {
        type: RECEIVE_CREATE_MENU,
        message: message,
        receivedAt: Date.now(),
        nuevo: {}
    }
}

export function errorCreateMenu(error) {
    return {
        type: ERROR_CREATE_MENU,
        error: error,
    }
}

export function resetCreateMenu() {
    return {
        type: RESET_CREATE_MENU
    }
}

export function createMenu(menu) {
    return {
        type: CREATE_MENU,
        menu: menu
    }
}

export function saveCreateMenu() {
    return (dispatch, getState) => {
        dispatch(requestCreateMenu());
        return menus.saveCreate(getState().menu.create.nuevo)
            .then(function (response) {
                if (response.status >= 400) {
                    return Promise.reject(response);
                } else {
                    history.push(rutas.ALTA_MENU);
                    dispatch(reveiceCreateMenu("El menu se creo con exito"));
                    return response.json();
                }
            })
            .catch(function (error) {
                switch (error.status) {
                    case 401:
                        dispatch(errorCreateMenu(errorMessages.UNAUTHORIZED_TOKEN));
                        dispatch(logout());
                        return;
                    default:
                        error.json()
                            .then((error) => {
                                console.log(error);
                                if (error.message !== "")
                                    dispatch(errorCreateMenu(error.message));
                                else
                                    dispatch(errorCreateMenu(errorMessages.GENERAL_ERROR));
                            })
                            .catch((error) => {
                                dispatch(errorCreateMenu(errorMessages.GENERAL_ERROR));
                            });
                        return;
                }
            });
    }
}