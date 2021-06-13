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
        let formData = this.getFormDataProducto(producto);

        return $.ajax({
            url: c.BASE_PUBLIC + 'producto/abm//',
            data: formData,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Token " + localStorage.token);
            },
            type: 'POST',
            contentType: false,
            processData: false,
            enctype: 'multipart/form-data',
        });
    },

    borrarProducto(id) {
        let defaultOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Token " + localStorage.token
            }
        };

        return fetch(c.BASE_PUBLIC + 'producto/abm//' + id + '/', defaultOptions);
    },

    saveUpdate(producto) {
        let formData = this.getFormDataProducto(producto);

        return $.ajax({
            url: c.BASE_PUBLIC +'producto/abm//' + producto.id + '/',
            data: formData,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('authorization', "Bearer "+localStorage.token);
            },
            contentType: false,
            type: 'POST',
            processData: false,
            enctype: 'multipart/form-data',
        });
    },

    getProducto(id) {
        let defaultOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        };

        return fetch(c.BASE_PUBLIC + 'producto/' + id, defaultOptions);
    },

    getFormDataProducto(producto) {
        let formData = new FormData();
        formData.append("nombre", producto.nombre);
        formData.append("imagen", producto.imagen);
        formData.append("categoria", parseInt(producto.categoria));
        formData.append("habilitado", 1);
        formData.append("descripcion", producto.descripcion);
        formData.append("imagen_nombre", producto.imagen_nombre);
        formData.append("precio_vigente", parseFloat(producto.precio_vigente));
        return formData;
    }
};

export default productos;