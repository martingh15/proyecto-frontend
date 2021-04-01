import c from "../constants/constants";
import $ from "jquery";
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

        return fetch(c.BASE_URL + '/productos' + c.DEBUG, defaultOptions);
    },

    saveCreate(producto) {
        var formData = new FormData();
        formData.append("producto", JSON.stringify(producto));
        formData.append("imagen", producto.imagen);

        return $.ajax({
            url: c.BASE_URL+'/productos' + c.DEBUG,
            //dataType: 'json',
            data: formData,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhr.setRequestHeader('authorization', "Bearer "+localStorage.token);
            },
            contentType: false,
            type: 'POST',
            // cache: false,
            processData: false,
            enctype: 'multipart/form-data',
        });
    },
};

export default productos;