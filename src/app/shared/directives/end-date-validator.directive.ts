import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Directive, Input} from'@angular/core';

@Directive({
    selector: '[isLessThanStartDate]',
    providers:[{provide: NG_VALIDATORS, useExisting: '', multi:true}]
})

export class EndDateValidatorDirective implements Validator {

    @Input('isLessThanStartDate') shouldbeless: any;
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        
        console.log(this.shouldbeless);
        console.log(control.value);
        const sDate = new Date(this.shouldbeless);
        const eDate = new Date(control.value);
        console.log((sDate > eDate)?{'startDateIsMore': true}: null);

        return (sDate > eDate)?{'startDateIsMore': true}: null;
    }
}
