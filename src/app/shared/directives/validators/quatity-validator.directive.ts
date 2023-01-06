import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator, ValidationErrors, ValidatorFn, FormControl } from '@angular/forms';

@Directive({
  selector: '[appQuatityValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: QuatityValidatorDirective,
    multi: true,
  }],
})
export class QuatityValidatorDirective implements Validator{

  constructor() { }

  public validate(control: AbstractControl): ValidationErrors | null {
    return quantityValidator()(control);
  }
}


export function quantityValidator(): ValidatorFn {

  return (control: AbstractControl | FormControl): ValidationErrors | null => {
    console.log('validacion' + control.value);
    

    if (control.value > 0 && control.value < 100) {
      return null;
    } else {
      return {
        quantityValidator: {
          valid: false,
        },
      };
    }
  };

}


// const isValid = control.value > 0;

//     if (isValid) {
//       return null;
//     } else {
//       return {
//         quantityValidator: {
//           valid: false,
//         },
//       };