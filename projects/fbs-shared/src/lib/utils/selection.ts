
export enum TipoSelecion {
    Simple = 0,
    Multiple = 1,
}

export interface Seleccionable {
    tipoSeleccion?: TipoSelecion;
    seleccionInicial?: any[];
    seleccion?: any[];
}
