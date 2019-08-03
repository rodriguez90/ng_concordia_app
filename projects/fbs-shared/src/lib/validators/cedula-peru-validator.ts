import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { regularExpresions } from './../utils/regular-expresions';

export class CedulaPeruValidators {
    static cedulaPeruValidator(error: ValidationErrors, digito: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            if ( digito === null) {
                return error;
            }
            let adicion: number  = 0;
            const hash: number[] = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
            const identificacionLongitud: number  = control.value.length;
            const identificacionComponente: string = control.value;
            const longitudIdentificacionComponente = identificacionComponente.length;
            const diff: number  = hash.length - longitudIdentificacionComponente;

            let i: number = 0;
            for (i = longitudIdentificacionComponente - 1; i >= 0 ; i--) {
                adicion += (identificacionComponente.charCodeAt(i) - '0'.charCodeAt(0)) * hash[i + diff];
               }
            adicion = 11 - (adicion % 11);

            if (adicion === 11) {
                adicion = 0;
            }

            const ultimoUnicode: number  = digito.toString().toUpperCase().charCodeAt(0);

            if (identificacionLongitud === 11) {

                if (!(adicion === (ultimoUnicode - '0'.charCodeAt(0)))) {
                    return error;
                }
            } else if ( digito !== null && (digito.toString().match(regularExpresions.SoloUnDigito) !== null)) {

                if ((adicion > 10) || (adicion < 0)) {

                    return error;
                }
                const hashNumeros: string[]  = ['6', '7', '8', '9', '0', '1', '1', '2', '3', '4', '5' ] ;
                if (hashNumeros[adicion] === undefined) {
                    return error;
                }
                if (hashNumeros[adicion].charCodeAt(0) !== ultimoUnicode) {

                    return error;
                }
             } else if (digito.toString().match(regularExpresions.SoloUnDigito) === null) {

                if ((adicion > 10) || (adicion < 0)) {
                    return error;
                }
                const hashLetras: string[] = ['K', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ] ;
                if (hashLetras[adicion].charCodeAt(0) === undefined || (!(hashLetras[adicion].charCodeAt(0) === ultimoUnicode))) {
                    return error;
                        }
                    }
            return null;
        };
    }
}
