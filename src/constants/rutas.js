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

export const USUARIOS              = '/usuarios';
export const USUARIOS_ALTA         = '/usuarios/alta/:tipo';
export const USUARIOS_ALTA_ADMIN   = '/usuarios/alta/admin';
export const USUARIOS_ALTA_COMUN   = '/usuarios/alta/comun';
export const USUARIOS_LISTAR       = '/usuarios/listar';
export const USUARIOS_EDITAR       = '/usuarios/editar/:tipo?/:id?';
export const USUARIOS_EDITAR_ADMIN = '/usuarios/editar/admin';
export const USUARIOS_EDITAR_COMUN = '/usuarios/editar/comun';

export function getUrlUsuario(id, accion, tipo, volverA) {
    let ruta = `${USUARIOS}/${accion}/${tipo}/${id}`;
    if (volverA) {
        ruta += `?volverA=${volverA}`
    }
    return ruta;
}

export function getQuery(query) {
    const search = new URLSearchParams(window.location.search);
    return search.get(query);
}

const RUTAS_GESTION = [
    GESTION,
    USUARIOS_LISTAR,
];

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
    USUARIOS_ALTA_COMUN
];

const RUTAS_PARCIALES = [
    USUARIOS_EDITAR_ADMIN,
    USUARIOS_EDITAR_COMUN
];

export function validarRuta(ruta) {
    return RUTAS.includes(ruta);
}