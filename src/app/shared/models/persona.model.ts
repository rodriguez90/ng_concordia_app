// app imports
import { Office } from './office.model';
import { CatalogoModelo } from './catalogo.model';
import { Company } from './company.model';

// libreria de terceros
import * as moment from 'moment';

// app imports
import {Model, User} from '../../../../projects/fbs-shared/src/lib/models';

/* Interfaz que encapsula los datos de una persona */
export interface Persona extends Model {
    firstName?: string;
    secondName?: string;
    firstLastName?: string;
    secondLastName?: string;
    email?: string;
    phoneNumber?: string;
    dni?: string;
    digito?: number;
    dniType?: CatalogoModelo;
    active?: boolean;
    office?: Office;
    user?: User;
    direccion?: string;
    fechaNacimiento?: moment.Moment;
    fullName(): string;
    officeName(): string;
    company(): Company;
    companyName(): string;
}

export function crearPersona(
    id: any,
    firstName: string,
    secondName: string | '',
    firstLastName: string,
    secondLastName: string | '',
    dni: string,
    digito: number,
    dniType: CatalogoModelo,
    active?: boolean,
    office?: Office,
    user?: User,
): Persona {

    let persona: Persona;
    persona = {
        id,
        firstName,
        secondName,
        firstLastName,
        secondLastName,
        dni,
        digito,
        dniType,
        email: '',
        phoneNumber: '',
        active: active || true,
        office,
        user,
        fullName: function(): string {
            return `${this.firstName} ${this.secondName} ${this.firstLastName} ${this.secondLastName}`;
        },
        officeName: function(): string {
            return this.office ? this.office.name : '';
        },
        company: function(): Company {
            return this.office ? this.office.company : null;
        },
        companyName: function(): string {
            return this.office && this.office.company ? this.office.company.name : '';
        }
    };
    return persona;
}
