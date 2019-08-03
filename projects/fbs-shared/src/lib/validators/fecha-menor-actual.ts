import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment from 'moment';


export class FechaMenorActual {

    static validar(error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            if ((moment(control.value).dayOfYear() - moment().dayOfYear()) > 0) {
                return error;
            }

            return null;
        };
    }
}
