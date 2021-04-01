import { normalize, schema } from 'normalizr';

export function normalizeDato(myData){
	const categoria = new schema.Entity('categoria', {}, {idAttribute: "id"});
    const producto  = new schema.Entity('producto', {categoria: categoria}, {idAttribute: "id"});

    const mySchema = producto;

    return normalize(myData, mySchema);
}

export function normalizeDatos(myData){

    const categoria = new schema.Entity('categoria', {}, {idAttribute: "id"});
    const productos  = new schema.Entity('productos', {categoria: categoria}, {idAttribute: "id"});

    const mySchemas = [productos] ;

    return normalize(myData, mySchemas);
}


