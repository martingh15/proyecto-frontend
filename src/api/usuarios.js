import c from "../constants/constants";
require('isomorphic-fetch');

var usuarios = {

    saveCreate(usuario, admin) {
        let defaultOptions = {
            url: '',
            method: 'POST',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8"
            },
            dataType: 'json',
            body: JSON.stringify(usuario)
        };

        let url = "/registro";
        if (admin) {
            url = "/registro-admin";
            defaultOptions.headers = {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer " + localStorage.token
            }
        }


        return fetch(c.BASE_URL + url, defaultOptions);
    },

    getLogueado() {
        let defaultOptions = {
            url: '',
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer " + localStorage.token
            },
            // cache: false,
            dataType: 'json',
        };
        return fetch(c.BASE_URL + '/usuarios/create', defaultOptions);
    },

    saveUpdate(usuario, noEsLogueado) {

        let method = noEsLogueado ? 'POST' : 'PUT';

        let defaultOptions = {
            url: '',
            method: method,
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer " + localStorage.token
            },
            // cache: false,
            dataType: 'json',
            body: JSON.stringify(usuario)
        };

        return fetch(c.BASE_URL + '/usuarios/' + usuario.id + c.DEBUG, defaultOptions);
    },

    getUsuarios() {

        let defaultOptions = {
            url: '',
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer " + localStorage.token
            },
            // cache: false,
            dataType: 'json',
        };

        return fetch(c.BASE_URL + '/usuarios', defaultOptions);
    },

    getUsuario(id) {

        let defaultOptions = {
            url: '',
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer " + localStorage.token
            },
            // cache: false,
            dataType: 'json',
        };

        return fetch(c.BASE_URL + '/usuario/' + id, defaultOptions);
    },

    borrarUsuario(id) {

        let defaultOptions = {
            url: '',
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer " + localStorage.token
            },
            // cache: false,
            dataType: 'json',
        };

        return fetch(c.BASE_URL + '/usuario/' + id, defaultOptions);
    },
};

export default usuarios;