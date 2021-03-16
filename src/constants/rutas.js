//Login routes
export const LOGIN          = '/login';
export const LOGOUT         = '/logout';
export const PERFIL         = '/perfil';
export const INICIO          = '/';
export const REGISTRO       = '/registro';
export const VALIDAR_EMAIL  = '/validar-email/:token';
export const RESET_PASSWORD = '/reset-password/:token';

//System routes
export const MENU    = '/menu';
export const ALMACEN = '/almacen';
export const GESTION = '/gestion';

const RUTAS = [
    LOGIN,
    LOGOUT,
    PERFIL,
    REGISTRO,
    VALIDAR_EMAIL,
    RESET_PASSWORD,
    MENU,
    ALMACEN,
    GESTION
];

export function validarRuta(ruta) {
    return RUTAS.includes(ruta);
}