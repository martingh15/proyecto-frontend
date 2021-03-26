//Login routes
export const ROL_ROOT     = 'root';
export const ROL_ADMIN    = 'admin';
export const ROL_MOZO     = 'mozo';
export const ROL_COMENSAL = 'comensal';
export const ROL_VENDEDOR = 'vendedor';

const ROLES = [
    ROL_ROOT,
    ROL_ADMIN,
    ROL_MOZO,
    ROL_COMENSAL,
    ROL_VENDEDOR
];

export function esAdmin(rol) {
    return rol === ROL_ADMIN;
}