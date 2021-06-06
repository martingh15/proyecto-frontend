import c from "../constants/constants";
require('isomorphic-fetch');

var usuarios = {

    saveCreate(usuario, admin) {
        usuario.username = usuario.email.substring(0, usuario.email.lastIndexOf("@"));
        let defaultOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(usuario)
        };

        let url = "/registro/";
        if (admin) {
            url = "/registro-admin";
            defaultOptions.headers = {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Token " + localStorage.token
            }
        }

        return fetch(c.BASE_URL + url, defaultOptions);
    },

    getLogueado() {
        let defaultOptions = {
            method: 'GET',
            headers: {
                "Authorization": "Token " + localStorage.token
            }
        };
        return fetch(c.BASE_URL + '/usuarios/' + localStorage.idUsuario + "/", defaultOptions);
    },

    saveUpdate(usuario, noEsLogueado) {

        let defaultOptions = {
            method: noEsLogueado ? 'POST' : 'PUT',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Token " + localStorage.token
            },
            body: JSON.stringify(usuario)
        };

        return fetch(c.BASE_URL + '/usuarios/' + usuario.id + "/", defaultOptions);
    },

    getUsuarios() {

        let defaultOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Token " + localStorage.token
            }
        };

        return fetch(c.BASE_URL + '/usuarios/', defaultOptions);
    },

    getUsuario(id) {

        let defaultOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Token " + localStorage.token
            }
        };

        return fetch(c.BASE_URL + '/usuario/' + id, defaultOptions);
    },

    borrarUsuario(id) {

        let defaultOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Token " + localStorage.token
            }
        };

        return fetch(c.BASE_URL + '/usuario/' + id, defaultOptions);
    },
};

export default usuarios;