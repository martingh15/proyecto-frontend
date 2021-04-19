import { normalize, schema } from 'normalizr';

export function normalizeDato(myData){
    const productos = new schema.Entity('productos', {}, {idAttribute: "id"});
	const categoria = new schema.Entity('categoria', {productos: [productos]}, {idAttribute: "id"});

    const mySchema = categoria;

    return normalize(myData, mySchema);
}

export function normalizeDatos(myData){
    const producto = new schema.Entity('productos', {}, {idAttribute: "id"});
    const categorias = new schema.Entity('categorias', {productos: [producto]}, {idAttribute: "id"});

    const mySchemas = [categorias];

    return normalize(myData, mySchemas);
}


