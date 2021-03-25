//Login routes
export const LOGIN          = '/login';
export const LOGOUT         = '/logout';
export const PERFIL         = '/perfil';
export const INICIO         = '/';
export const MI_PERFIL      = '/perfil';
export const VALIDAR_EMAIL  = '/validar-email/:token';
export const RESET_PASSWORD = '/reset-password/:token';

//Registro
export const REGISTRO            = '/registro/:tipo?';
export const REGISTRO_TIPO_ADMIN = 'admin';
export const REGISTRO_ADMIN      = `/registro/${REGISTRO_TIPO_ADMIN}`;

export const MENU     = '/menu';
export const ALMACEN  = '/almacen';
export const GESTION  = '/gestion';
export const COMPRAS  = '/compras';

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
    REGISTRO_ADMIN,
    COMPRAS
];

export function validarRuta(ruta) {
    return RUTAS.includes(ruta);
}