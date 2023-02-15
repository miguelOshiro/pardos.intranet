import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export function numberIntegerValidator(control: AbstractControl) {

    if (control && (control.value !== null && control.value !== undefined)) {
        const regex = new RegExp('-?[0-9]+(\.[0-9][0-9]?)?');

        // /^[0-9]\d*$/   ^-?[0-9]\\d*(\\.\\d{1,2})?$
        if (!regex.test(control.value)) {
            return {
                isError: true
            }
        }
    }
    return null;
}

export function emailFieldValidator(control: AbstractControl) {

    if (control && (control.value !== null && control.value !== undefined)) {
        const regex = new RegExp(
            "/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/"
        );
        // /^[0-9]\d*$/   ^-?[0-9]\\d*(\\.\\d{1,2})?$
        // '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'
        // /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/
        if (!regex.test(control.value)) {
            return {
                isError: true
            }
        }
    }
    return null;
}

export function validateEmails(emails: string) {
    return (emails.split(', ')
        .map(email => Validators.email(<AbstractControl>{ value: email }))
        .find(_ => _ !== null) === undefined);
}

export function emailsValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value === '' || !control.value || validateEmails(control.value)) {
        return null
    }
    return { emails: true };
}
