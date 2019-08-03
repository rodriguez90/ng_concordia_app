import {ConfigModel} from '../../../projects/fbs-core/src/lib/config';

export interface AppConfig extends ConfigModel {

    urlEndPoints?: {
        authLogin?: string,
        authLogout?: string,
        authPasswordRestore?: string,
        authRefreshToken?: string,
        catalogo?: string,
        tipoCatalogo?: string,
        persona?: string,
        corresponsal?: string,
        empresa?: string,
        dashboard?: string,
        dispositivo?: string,
        fileManager?: string
        menus?: string,
        office?: string,
        position?: string,
        roles?: string,
        usuario: string,
        areaTrabajo?: string,
        supervisor?: string,
        log?: string,
        limiteExistencia?: string,
        limiteTransaccional?: string,
    };

    catalogTypes?: { // key value ex: 'Droga': id
        Identificacion?: any,
        TipoDispositivo?: any,
        Operacion?: any
    };
    limiteTransaccional: number;
    limiteDias: number;
}
