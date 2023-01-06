import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class QuantityValidatorService {

  constructor() { }

  public validate(control: FormControl): {[s: string]: boolean } | null {
    
    if(control.value > 0) {

      return{
        validate: true
      }

    }

    return null

  }
}
