import {CatalogoModelo} from './catalogo.model';
import {Office} from './office.model';
import {Corresponsal} from './corresponsal.model';
import {crearPersona, Persona} from './persona.model';
import {User} from '../../../../projects/fbs-shared/src/lib/models';

export interface Supervisor extends Persona {
    corresponsales?: Corresponsal[];
}


export function crearSupervisor(
    id: any,
    firstName: string,
    secondName: string,
    firstLastName: string,
    secondLastName: string,
    dni: string,
    digito: number,
    dniType: CatalogoModelo,
    active?: boolean,
    office?: Office,
    user?: User,
): Supervisor {
    return crearPersona(
        id,
        firstName,
        secondName,
        firstLastName,
        secondLastName,
        dni,
        digito,
        dniType,
        active,
        office,
        user) as Supervisor;
}
