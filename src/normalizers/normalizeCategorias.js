import { normalize, schema } from 'normalizr';

export function normalizeDato(myData){
	const categoria = new schema.Entity('categoria', {}, {idAttribute: "id"});

    const mySchema = categoria;

    return normalize(myData, mySchema);
}

export function normalizeDatos(myData){

    const categorias = new schema.Entity('categorias', {}, {idAttribute: "id"});

    const mySchemas = [categorias];

    return normalize(myData, mySchemas);
}


