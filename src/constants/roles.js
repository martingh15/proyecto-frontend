//Login routes
export const ROL_ROOT  = 'root';
export const ROL_ADMIN = 'admin';

const ROLES = [
    ROL_ROOT,
    ROL_ADMIN
];

export function esAdmin(rol) {
    return rol === ROL_ADMIN;
}