import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class RucValidators {
    static rucValidator(error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                return null;
            }
            if ((parseInt(control.value[0]) * 10 + parseInt(control.value[1])) < 0 ||
                (parseInt(control.value[0]) * 10 + parseInt(control.value[1])) > 24) {
                return error;
            }
            if (parseInt(control.value[2]) < 0 || parseInt(control.value[2]) > 5) {
                return error;
            }
            let coeficiente = 0;

            for (let i = 0; i < control.value.length - 1; i++) {
                if (i % 2 === 0) {
                    let x = parseInt(control.value[i]) * 2;
                    if (x >= 10) {
                        x = x - 9;
                    }
                    coeficiente = coeficiente + x;
                } else {
                    coeficiente = coeficiente + parseInt(control.value[i]);
                }
            }
            const coenf = coeficiente + 10 - parseInt(coeficiente.toString()[1]);
            if (coenf - coeficiente !== parseInt(control.value[9]) && (coenf - coeficiente) !== 10) {
                return error;
            }

            if (parseInt(control.value[12]) !== 1 && parseInt(control.value[11]) !== 0 && parseInt(control.value[10]) !== 0) {
                return error;
            }

            // if true, return no error (no error), else return error passed in the second parameter
            return null;
        };
    }
}
