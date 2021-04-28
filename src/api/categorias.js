import c from "../constants/constants";
require('isomorphic-fetch');

var categorias = {

    getAll() {

        let defaultOptions = {
            url: '',
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8"
            },
            // cache: false,
            dataType: 'json'
        };

        return fetch(c.BASE_URL + '/productos/categorias', defaultOptions);
    },

    saveCreate(categoria) {
        let defaultOptions = {
            url: '',
            method: 'POST',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer " + localStorage.token
            },
            dataType: 'json',
            body: JSON.stringify(categoria)
        };

        return fetch(c.BASE_URL + '/categorias', defaultOptions);
    },
};

export default categorias;