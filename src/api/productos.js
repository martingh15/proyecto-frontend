import c from "../constants/constants";
import $ from "jquery";
require('isomorphic-fetch');

var productos = {

    getAll() {
        let defaultOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        };

        return fetch(c.BASE_PUBLIC + 'producto/', defaultOptions);
    },

    saveCreate(producto) {
        let formData = new FormData();
        formData.append("producto", JSON.stringify(producto));
        formData.append("imagen", producto.imagen);

        return $.ajax({
            url: c.BASE_URL+'/productos',
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

    borrarProducto(id) {
        let defaultOptions = {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + localStorage.token
            }
        };

        return fetch(c.BASE_URL + '/productos/' + id, defaultOptions);
    },

    saveUpdate(producto) {
        let formData = new FormData();
        formData.append("producto", JSON.stringify(producto));
        formData.append("imagen", producto.imagen);

        return $.ajax({
            url: c.BASE_URL+'/productos/' + producto.id,
            data: formData,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
                xhr.setRequestHeader('authorization', "Bearer "+localStorage.token);
            },
            contentType: false,
            type: 'POST',
            processData: false,
            enctype: 'multipart/form-data',
        });
    }
};

export default productos;