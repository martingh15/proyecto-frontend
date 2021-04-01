import c from "../constants/constants";
require('isomorphic-fetch');

var productos = {

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

        return fetch(c.BASE_URL + '/productos', defaultOptions);
    },

    saveCreate(producto) {
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
            body: JSON.stringify(producto)
        };


        return fetch(c.BASE_URL + '/productos', defaultOptions);
    },
};

export default productos;