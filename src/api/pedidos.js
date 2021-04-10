import c from "../constants/constants";
require('isomorphic-fetch');

var pedidos = {

    saveCreate(pedido) {
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
            body: JSON.stringify(pedido)
        };


        return fetch(c.BASE_URL + '/pedidos/create', defaultOptions);
    },
};

export default pedidos;