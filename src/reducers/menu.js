import {CREATE_MENU} from "../actions/MenuActions"
import {combineReducers} from 'redux';
import merge from "lodash/merge";

function create(state = {
    isCreating: false,
    nuevo: {
        nombre: "",
        precio: 0
    },
    success: "",
    error: null
}, action) {
    switch (action.type) {
        case CREATE_MENU:
            return Object.assign({}, state, {
                isCreating: false,
                success: "",
                nuevo: merge({}, state.nuevo, action.menu),
                error: null,
            });
        default:
            return state
    }
}

const menues = combineReducers({
    create: create
});

export default menues;