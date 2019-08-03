import {HttpParams} from '@angular/common/http';

export enum TipoOrden {
    Asc = 1,
    Desc = 0,
}

export interface FiltroModel {
    llave: string;
    valor: string;
    operador?: Operator;
}

export interface OrdenModel {
    columna: string;
    tipoOrden: TipoOrden;
}

export enum Operator {
    Equal = '=',
    NoEqual = '<>', // !=
    GreaterThan = '>',
    GreaterThanOrEqual = '>=',
    LessThan = '<',
    LessThanOrEqual = '<=',
    NotGreaterThan = '!>',
    NotLessThan = '!<',
    In = 'IN',
    Not = 'NOT',
    IsNull = 'IS NULL',
    IsNotNull = 'IS NOT NULL',
    Like = 'LIKE',
    Exists = 'Exists',
    Between = 'Between',
}

export interface WhereClause {
    operator: Operator;
    field: string; // column_name or table.column_name
    value: any;
}

export interface QueryBuilder {
    toQueryMap: () => Map<string, string>;
    toQueryString: () => string;
    toHttpParams: () => HttpParams;
    toJson: () => any;
}

export class QueryOptions implements QueryBuilder {
    public pagina: number;
    public cantidadElementos: number;
    public totalElementos: number;

    /* Para este atributo, por convención se define:
        Una lista de objetos de tipo FiltroModel
    */
    public filtros: FiltroModel[];

    /* Para este atributo, por convención se define:
        Una lista de objetos de tipo OrdenModel
    */
    public ordenamientos: OrdenModel[];

    constructor(pagina = 0, cantidadElementos = 5) {
        this.pagina = pagina;
        this.cantidadElementos = cantidadElementos;
        this.filtros = [];
        this.ordenamientos = [];
    }

    setPageNumber(pageNumber: number) {
        this.pagina = pageNumber;
        return this;
    }

    setPageSize(pageSize: number) {
        this.cantidadElementos = pageSize;
        return this;
    }

    addFilter(filter: FiltroModel) {
        this.filtros.push(filter);
        return this;
    }

    reset() {
        this.cleanFilter();
        this.cleanOrder();
        this.pagina = 0;
        this.cantidadElementos = 10;
    }

    cleanFilter() {
        this.filtros = [];
    }

    cleanOrder() {
        this.ordenamientos = [];
    }

    addOrder(ordenamiento: OrdenModel) {
        this.ordenamientos.push(ordenamiento);
        return this;
    }

    toQueryMap() {
        const queryMap = new Map<string, any>();
        queryMap.set('pagina', this.pagina);
        queryMap.set('cantidadElementos', this.cantidadElementos);
        queryMap.set('filtros', this.filtros);
        queryMap.set('ordenamientos', this.ordenamientos);

        return queryMap;
    }

    toQueryString() {
        let queryString = '';
        this.toQueryMap().forEach((value: any, key: string) => {
            let valueConverted = value;
            if (typeof value != 'string')
            {
                valueConverted = JSON.stringify(value);
            }
            queryString = queryString.concat(`${key}=${valueConverted}&`);
        });

        return queryString.substring(0, queryString.length - 1);
    }

    toHttpParams(): HttpParams {
        let params = new HttpParams();
        params = params.set('pagina', this.pagina.toString())
        .set('cantidadElementos', this.cantidadElementos.toString())
        .set('filtros', this.filtros.toString())
        .set('ordenamientos', this.ordenamientos.toString());
        return params;
    }

    toJson(): any {
        return {
            pagina: this.pagina,
            cantidadElementos: this.cantidadElementos,
            filtros: this.filtros,
            ordenamientos: this.ordenamientos,
        };
    }
}
