//Login routes
export const LOGIN          = '/login';
export const LOGOUT         = '/logout';
export const PERFIL         = '/perfil';
export const INICIO         = '/';
export const REGISTRO       = '/registro';
export const MI_PERFIL      = '/perfil';
export const VALIDAR_EMAIL  = '/validar-email/:token';
export const RESET_PASSWORD = '/reset-password/:token';

//System routes
export const MENU     = '/menu';
export const ALMACEN  = '/almacen';
export const GESTION  = '/gestion';
export const COMPRAS  = '/compras';
export const USUARIOS = '/admin/usuario';

const RUTAS = [
    LOGIN,
    LOGOUT,
    PERFIL,
    REGISTRO,
    VALIDAR_EMAIL,
    RESET_PASSWORD,
    MENU,
    ALMACEN,
    GESTION,
    USUARIOS,
    COMPRAS
];

export function validarRuta(ruta) {
    return RUTAS.includes(ruta);
}