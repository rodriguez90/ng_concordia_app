import {Model} from '../models';

export interface PaginationModel <T extends Model> {
    pagina?: number;
    cantidadElementos?: number;
    totalElementos?: number;
    datos?: T[];
}
