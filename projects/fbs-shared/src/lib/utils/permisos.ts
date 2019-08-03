
export enum TipoPermiso {
    Ninguno = 0,
    Lectura = 1 << 0,
    Crear = 1 << 1,
    Modificar = 1 << 2,
    Eliminar = 1 << 3,
    Todos = TipoPermiso.Lectura |
        TipoPermiso.Crear |
        TipoPermiso.Modificar |
        TipoPermiso.Eliminar,
}

export function DefinirTipoPermiso(constructor: Function) {
    constructor.prototype.TipoPermiso = TipoPermiso;
}

// export function VerificarPermisos() {
//    return function(type) {
//        Object.defineProperty(type, '_permisos', {value: () => TipoPermiso.Ninguno});
//        Object.defineProperty(
//            type.prototype,
//            'verificarPermiso',
//            {
//                value: function(permiso: TipoPermiso) {
//                    return (type._permisos & permiso) == permiso;
//
//                }
//            });
//    }
// }

export interface VerificarPermisos {
    mPermiso: TipoPermiso;
    verificarPermiso: (permiso: TipoPermiso) => boolean;
}

export class VerificarPermisosClase implements VerificarPermisos {
    mPermiso: TipoPermiso;
    
    get permiso(): TipoPermiso {
        return this.mPermiso;
    }

    set permiso(permiso: TipoPermiso) {
        this.mPermiso = permiso;
    }

    verificarPermiso(permiso: TipoPermiso): boolean {
        return (this.mPermiso & permiso) == permiso;
    }
}



