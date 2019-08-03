
import {Model, User} from '../../../../projects/fbs-shared/src/lib/models';

// TODO: Los valores de este enum debe de coincidir con los id de la tabla Tipo Catálogo

export enum CatalogTypeConst {
  Identificacion = 2, // Tipos de identifiación
}

export interface TipoCatalogoModelo extends Model {
  name?: string;
  description?: string;
  active?: boolean;
}

export interface CatalogoModelo extends Model {
  name?: string;
  description?: string;
  active?: boolean;
  type?: TipoCatalogoModelo;
}

export function crearCatalogo(
    id: number,
    name: string,
    description: string,
    active: boolean
): CatalogoModelo {
  let catalog: CatalogoModelo;
  catalog = {
    id: id,
    name: name,
    description: description,
    active: active
  };
  return catalog;
}

export function createCatalogType(
    id: number,
    name: string,
    description: string,
    active: boolean
): TipoCatalogoModelo {
  let catalogType: TipoCatalogoModelo;
  catalogType = {
    id: id,
    name: name,
    description: description,
    active: active
  };
  return catalogType;
}
