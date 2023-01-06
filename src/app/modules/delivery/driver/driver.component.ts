import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { quantityValidator } from '../../../shared/directives/validators/quatity-validator.directive';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit{

  numb: number = 40;

  form!: FormGroup;
  formOneStatus$: Observable<string>;
  
  constructor(private fb: FormBuilder,
              ){

    this.createForm();
  }

  ngOnInit(): void {
    
  }

  get monday() {
    return this.form.get('monday');
  }

  get f()
{
    return this.form.controls;
}

  createForm() {

    this.form = new FormGroup({
      monday: new FormControl('', [Validators.required, quantityValidator()])
      // tuesday: ['', [Validators.required, Number, quantityValidator ]],
      // wednesday: ['', [Validators.required, Number, quantityValidator ]],
      // thursday: ['', [Validators.required, Number, quantityValidator ]],
      // friday: ['', [Validators.required, Number, quantityValidator ]],
      // saturday: ['', [Validators.required, Number, quantityValidator ]],
      // sunday: ['', [Validators.required, Number, quantityValidator ]],
    },
    {
      updateOn: 'change',
    }
    );

    this.formOneStatus$ = this.form.statusChanges.pipe(
      map((v) => v + Date.now().toString())
    );
  }

  // valueChange(value: number) {

  //   if(this.numb >= 100 && value > 0) {
  //     return this.numb = 100;
  //   }
  //   if(this.numb <= 100 && value < 0) {
  //     return this.numb = 0;
  //   }

  //   return;
  // }

  // onChange(event: any) {
  //   console.log(event);
  // }


  saveButton() {
    console.log('Save button');
  }

  save() {


  }
}
