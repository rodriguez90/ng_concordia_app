import { CatalogoModelo } from './catalogo.model';
import {Model, User} from '../../../../projects/fbs-shared/src/lib/models';
import {Corresponsal} from './corresponsal.model';

export interface Asignacion {
  dispositivoId?: number;
  corresponsalId?: number;
}

export interface Dispositivo extends Model {
  nombre?: string;
  imei?: string;
  mac?: string;
  numeroSerie?: string;
  tipoDispositivo?: CatalogoModelo;
  estaActivo?: boolean;
  corresponsal?: Corresponsal;
}

export function crearDispositivo(
  id: number,
  nombre: string,
  imei: string,
  mac: string,
  numeroSerie: string,
  tipoDispositivo: CatalogoModelo,
  estaActivo: boolean,
  // corresponsal?: Corresponsal
): Dispositivo {
  let dispositivo: Dispositivo;
  dispositivo = {
    id,
    nombre,
    imei,
    mac,
    numeroSerie,
    tipoDispositivo,
    estaActivo,
    // corresponsal
  };
  return dispositivo;
}

export interface TipoDispositivo extends Model {
  name?: string;
  description?: string;
  active?: boolean;
}

export function crearTipoDispositivo(
  id: number,
  name: string,
  description: string,
  active: boolean
): TipoDispositivo {
  let dispositivoTipo: TipoDispositivo;
  dispositivoTipo = {
    id,
    name,
    description,
    active
  };
  return dispositivoTipo;
}
