import c from "../constants/constants";
require('isomorphic-fetch');

var menues = {
    saveCreate(menu) {
        let defaultOptions = {
            url: '',
            method: 'POST',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json;charset=UTF-8"
            },
            dataType: 'json',
            body: JSON.stringify(menu)
        };

        return fetch(c.BASE_URL + '/menu', defaultOptions);
    },
}

export default menues