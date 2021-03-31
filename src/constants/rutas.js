//Login routes
export const LOGIN          = '/login';
export const LOGOUT         = '/logout';
export const INICIO         = '/';
export const VALIDAR_EMAIL  = '/validar-email/:token';
export const RESET_PASSWORD = '/reset-password/:token';

//Registro
export const MENU            = '/menu';
export const ALMACEN         = '/almacen';
export const GESTION         = '/gestion';
export const COMPRAS         = '/compras';

export const ACCION_ALTA   = 'alta';
export const ACCION_LISTAR = 'listar';
export const ACCION_EDITAR = 'editar';

export const TIPO_COMUN = 'comun';
export const TIPO_ADMIN = 'admin';

//Gestión de usuarios
export const USUARIOS              = '/usuarios';
export const USUARIOS_ALTA         = '/usuarios/alta/:tipo';
export const USUARIOS_ALTA_ADMIN   = '/usuarios/alta/admin';
export const USUARIOS_ALTA_COMUN   = '/usuarios/alta/comun';
export const USUARIOS_LISTAR       = '/usuarios/listar';
export const USUARIOS_EDITAR       = '/usuarios/editar/:tipo?/:id?';
export const USUARIOS_EDITAR_ADMIN = '/usuarios/editar/admin';
export const USUARIOS_EDITAR_COMUN = '/usuarios/editar/comun';

//Gestión de productos
export const PRODUCTOS_LISTAR = '/productos/listar';

/**
 * Devuelve la url de usuarios
 *
 * @param id
 * @param accion ver constantes ACCION_*
 * @param tipo ver constantes TIPO_*
 * @param volverA query para volver a la ruta anterior
 * @returns {string}
 */
export function getUrlUsuario(id, accion, tipo, volverA) {
    let ruta = `${USUARIOS}/${accion}/${tipo}/${id}`;
    if (volverA) {
        ruta += `?volverA=${volverA}`
    }
    return ruta;
}

/**
 * Permite obtener la query de la url
 *
 * @param query
 * @returns {string}
 */
export function getQuery(query) {
    const search = new URLSearchParams(window.location.search);
    return search.get(query);
}

const RUTAS = [
    LOGIN,
    LOGOUT,
    VALIDAR_EMAIL,
    RESET_PASSWORD,
    MENU,
    ALMACEN,
    GESTION,
    COMPRAS,
    USUARIOS_LISTAR,
    USUARIOS_ALTA_ADMIN,
    USUARIOS_ALTA_COMUN,
    PRODUCTOS_LISTAR
];

/**
 * Valida que la ruta exista
 *
 * @param ruta
 * @returns {boolean}
 */
export function validarRuta(ruta) {
    return RUTAS.includes(ruta);
}