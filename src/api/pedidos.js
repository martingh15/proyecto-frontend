import c from "../constants/constants";
import $ from "jquery";
require('isomorphic-fetch');

var pedidos = {

    getAll() {

        let defaultOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Token " + localStorage.token
            },
        };

        return fetch(c.BASE_PUBLIC + '/pedido/', defaultOptions);
    },

    saveCreate(pedido) {
        let defaultOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Token " + localStorage.token
            },
            body: JSON.stringify(pedido)
        };

        return fetch(c.BASE_PUBLIC + 'gastronomia/pedido/', defaultOptions);
    },

    borrarPedido(id) {
        let defaultOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Token " + localStorage.token
            }
        };

        return fetch(c.BASE_PUBLIC + 'gastronomia/pedido/' + id, defaultOptions);
    },

    saveFinalizar(idPedido) {
        let defaultOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Token " + localStorage.token
            }
        };

        return fetch(c.BASE_PUBLIC + 'gastronomia/pedido/'+ idPedido + '/finalizar/', defaultOptions);
    },

    getPedido(id) {

        let defaultOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Token " + localStorage.token
            }
        };

        return fetch(c.BASE_PUBLIC + 'gastronomia/pedido/' + id, defaultOptions);
    },

    getPedidoAbierto() {
        let defaultOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Token " + localStorage.token
            },
            dataType: 'json',
        };

        return fetch(c.BASE_PUBLIC + 'gastronomia/pedido/activo/', defaultOptions);
    }

};

export default pedidos;