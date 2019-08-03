import { Persona } from './persona.model';
import {Supervisor} from './supervisor.model';
import {Dispositivo} from './dispositivo.model';

/* Interfaz que encapsula los datos de un corresponsal */
export interface Corresponsal extends Persona {
  supervisor?: Supervisor;
  latitud?: number;
  longitud?: number;
  dispositivo?: Dispositivo;
}
