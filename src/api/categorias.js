import c from "../constants/constants";
require('isomorphic-fetch');

var categorias = {

    getAll() {
        let defaultOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
        };

        return fetch(c.BASE_URL + '/productos/categorias', defaultOptions);
    },

    saveCreate(categoria) {
        let defaultOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Token " + localStorage.token
            },
            dataType: 'json',
            body: JSON.stringify(categoria)
        };

        return fetch(c.BASE_URL + '/categorias', defaultOptions);
    },
};

export default categorias;